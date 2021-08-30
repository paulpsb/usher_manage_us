package com.usher.web.course;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.service.CoursesService;
import com.usher.service.PracticesService;
import com.usher.util.SessionUtil;
import com.usher.dto.CoursesSemesterDto;
import com.usher.dto.PracticesPracticescheduleDto;
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.dto.PracticesPracticesectiontypeDto;
import com.usher.dto.CoursesCoursegroupDto;
import com.usher.dto.CoursesCourseAchieveDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.CoursesCoursePracticeDto;

@Controller
public class CourseAchieveController{
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	PracticesService practicesService; 
	
	@RequestMapping(value="/course/course_achieve.do")
	public String course_achieve(HttpServletRequest request,
			ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";

		url = "course/course_achieve";
		return url;
	}
	
	@RequestMapping(value="/course/getCourseAchieveList.do")
	public @ResponseBody Map getCourseAchieveList(HttpServletRequest request, CoursesCourseAchieveDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		
		List<PracticesPracticesectionDto> sectionList = practicesService.getPracticeSectionList();
		resultMap.put("sectionList", sectionList);
		
		PracticesPracticesectiontypeDto dto1 = new PracticesPracticesectiontypeDto();
		List<PracticesPracticesectiontypeDto> sectionTypeList = practicesService.getPracticeSectionTypeList(dto1);
		resultMap.put("sectionTypeList", sectionTypeList);
		
		List<CoursesCourseAchieveDto> courseAchieveList = coursesService.getCourseAchieveList(dto);
		resultMap.put("courseAchieveList", courseAchieveList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/course/saveCourseAchieve.do")
	public @ResponseBody void saveCourseAchieve(HttpServletRequest request,
						CoursesCourseAchieveDto dto,
						ModelMap modelMap) throws Exception {
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		coursesService.deleteCourseAchieve(dto);
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			String section = jsonObj.get("section").toString();
			String practice_type = jsonObj.get("practice_type").toString();
			int achieve_point = Integer.parseInt(jsonObj.get("achieve_point").toString());
			int scholarship = Integer.parseInt(jsonObj.get("scholarship").toString());
			int late_amt = Integer.parseInt(jsonObj.get("late_amt").toString());
			int absent_amt = Integer.parseInt(jsonObj.get("absent_amt").toString());
			
			CoursesCourseAchieveDto sto = new CoursesCourseAchieveDto();
			sto.setStatus("ACTIVE");
			sto.setSection(section);
			sto.setPractice_type(practice_type);
			sto.setCourse_id(dto.getCourse_id());
			sto.setAchieve_point(achieve_point);
			sto.setScholarship(scholarship);
			sto.setLate_amt(late_amt);
			sto.setAbsent_amt(absent_amt);
			coursesService.insertCourseAchieve(sto);
			

			
		}
	}
}