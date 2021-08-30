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
import com.usher.dto.PracticesPracticeproblemDto;
import com.usher.dto.PracticesPracticescheduleDto;
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.dto.PracticesPracticesectiontypeDto;
import com.usher.dto.PracticesPracticetypeDto;
import com.usher.dto.CoursesCoursegroupDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.CoursesCoursePracticeDto;
import com.usher.dto.CoursesCourseTimetableDto;

@Controller
public class CoursePracticeDailyController{
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	PracticesService practicesService; 
	
	@RequestMapping(value="/course/course_practice_daily.do")
	public String course(HttpServletRequest request,
			ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";

		url = "course/course_practice_daily";
		return url;
	}
	
	@RequestMapping(value="/course/getCoursePracticeDailyList.do")
	public @ResponseBody Map getCoursePracticeDailyList(HttpServletRequest request, CoursesCoursePracticeDto dto) throws Exception {
		Map resultMap = new HashMap();
		
		List<PracticesPracticesectionDto> sectionList = practicesService.getPracticeSectionList();
		resultMap.put("sectionList", sectionList);
		List<PracticesPracticetypeDto> typeList = practicesService.getPracticeTypeList();
		resultMap.put("typeList", typeList);
		List<CoursesCoursePracticeDto> sectionTypeList = coursesService.getCoursesCoursePracticeList(dto);
		resultMap.put("sectionTypeList", sectionTypeList);
		List<CoursesCoursePracticeDto> coursePracticeList = coursesService.getCoursesCoursePracticeDailyList(dto);
		resultMap.put("coursePracticeList", coursePracticeList);
		
		CoursesCourseTimetableDto dto1 = new CoursesCourseTimetableDto();
		dto1.setCourse_id(dto.getCourse_id());
		dto1.setDate(dto.getDate());
		List<CoursesCourseTimetableDto> courseTimetableList = coursesService.getCourseTimeTableDailyList(dto1);
		resultMap.put("courseTimetableList", courseTimetableList);
		
		CoursesCourseDto dto2 = new CoursesCourseDto();
		dto2.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto2);
		resultMap.put("courseInfo", courseInfo);
		
		return resultMap;
	}
	
	@RequestMapping(value="/course/saveCoursePracticeDaily.do")
	public @ResponseBody void saveCoursePracticeDaily(HttpServletRequest request, CoursesCourseDto dto) throws Exception {
		String data_value = dto.getData_value();

		CoursesCoursePracticeDto dto1 = new CoursesCoursePracticeDto();
		dto1.setCourse_id(dto.getCourse_id());
		dto1.setDate(dto.getDate());
		coursesService.deleteCoursesCoursePracticeDaily(dto1);
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			CoursesCoursePracticeDto sto = new CoursesCoursePracticeDto();
			sto.setDate(dto.getDate());
			sto.setStatus(jsonObj.get("status").toString());
			sto.setPractice_type(jsonObj.get("practice_type").toString());
			sto.setSection(jsonObj.get("section").toString());
			sto.setCourse_id(dto.getCourse_id());
			sto.setStart_time(jsonObj.get("start_time").toString());
			sto.setEnd_time(jsonObj.get("end_time").toString());
			sto.setPass_score(Integer.parseInt(jsonObj.get("pass_score").toString()));
			
			coursesService.insertCoursesCoursePracticeDaily(sto);
		}
	}
}