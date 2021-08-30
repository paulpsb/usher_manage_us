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
import com.usher.service.EnrollmentsService;
import com.usher.service.PracticesService;
import com.usher.util.SessionUtil;
import com.usher.dto.CoursesSemesterDto;
import com.usher.dto.EnrollmentsCourseenrollmentDto;
import com.usher.dto.PracticesPracticeproblemDto;
import com.usher.dto.PracticesPracticescheduleDto;
import com.usher.dto.PracticesPracticescheduleHomeworkDto;
import com.usher.dto.PracticesPracticesectiontypeDto;
import com.usher.dto.CoursesCoursegroupDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.CoursesCoursePracticeDto;

@Controller
public class CourseScheduleHomeworkController{
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	PracticesService practicesService; 
	
	@Autowired
	EnrollmentsService enrollmentsService;
	
	@RequestMapping(value="/course/course_schedule_homework.do")
	public String course_schedule_homework(HttpServletRequest request,
			CoursesCourseDto dto,
			ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		if(dto.getCourse_id() > 0) {
			CoursesCourseDto dto1 = new CoursesCourseDto();
			dto1.setId(dto.getCourse_id());
			CoursesCourseDto courseInfo = coursesService.getCourse(dto1);
			
			dto.setCourse_name(courseInfo.getCourse_group_name()+" "+courseInfo.getName()+"반");
			dto.setSchedule(courseInfo.getSchedule());
			dto.setCur_date(courseInfo.getCur_date());
			modelMap.addAttribute("courseInfo", dto);
		}else {
			modelMap.addAttribute("courseInfo", dto);
		}
		String url = "";

		url = "course/course_schedule_homework";
		return url;
	}
	

	@RequestMapping(value="/course/getScheduleHomeworkList.do")
	public @ResponseBody Map getScheduleHomeworkList(HttpServletRequest request, PracticesPracticescheduleHomeworkDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		
		CoursesCourseDto dto1  = new CoursesCourseDto();
		dto1.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto1);
		resultMap.put("courseInfo", courseInfo);
		
		CoursesCoursePracticeDto dto2 = new CoursesCoursePracticeDto();
		dto2.setCourse_id(dto.getCourse_id());
		dto2.setSection(dto.getSection());
		dto2.setProgram_use("Y");
		dto2.setIs_homework("Y");
		
		List<CoursesCoursePracticeDto> typeList = coursesService.getCoursesCoursePracticeList(dto2);
		resultMap.put("typeList", typeList);
		
		List<PracticesPracticescheduleHomeworkDto> scheduleList =  practicesService.getPracticeScheduleHomeworkList(dto);
		resultMap.put("scheduleList", scheduleList);
		
		/*
		EnrollmentsCourseenrollmentDto dto3 = new EnrollmentsCourseenrollmentDto();
		dto3.setCourse_id(dto.getCourse_id());
		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentList(dto3);
		resultMap.put("enrollmentList", enrollmentList);
		*/
		return resultMap;
	}
	
	@RequestMapping(value="/course/updateScheduleHomework.do")
	public @ResponseBody void updateSchedule(HttpServletRequest request, PracticesPracticescheduleHomeworkDto dto) throws Exception {
		practicesService.updatePracticeScheduleHomework(dto);

	}

	@RequestMapping(value="/course/saveScheduleHomework.do")
	public @ResponseBody void saveScheduleHomework(HttpServletRequest request, PracticesPracticescheduleHomeworkDto dto) throws Exception {
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			PracticesPracticescheduleHomeworkDto sto = new PracticesPracticescheduleHomeworkDto();
			
			sto.setStatus(jsonObj.get("status").toString());
			sto.setSection(jsonObj.get("section").toString());
			sto.setPractice_type(jsonObj.get("practice_type").toString());
			sto.setName(jsonObj.get("name").toString());
			sto.setDate(jsonObj.get("date").toString());
			sto.setCourse_id(Integer.parseInt(jsonObj.get("course_id").toString()));
			sto.setCourse_enrollment_id(Integer.parseInt(jsonObj.get("course_enrollment_id").toString()));
			sto.setPractice_problem_id(Integer.parseInt(jsonObj.get("practice_problem_id").toString()));
			sto.setStart_paragraph(Integer.parseInt(jsonObj.get("start_paragraph").toString()));
			sto.setEnd_paragraph(Integer.parseInt(jsonObj.get("end_paragraph").toString()));
			sto.setExam_time(Integer.parseInt(jsonObj.get("exam_time").toString()));
			sto.setExam_count(Integer.parseInt(jsonObj.get("exam_count").toString()));
			sto.setTest_type(jsonObj.get("test_type").toString());
			practicesService.insertPracticeScheduleHomework(sto);
		}
		
		String data_value1 = dto.getData_value1();
		JSONParser jsonParser1 = new JSONParser();
		Object obj1 = jsonParser1.parse(data_value1);
		JSONArray jsonArray1 = (JSONArray)obj1;
		for(int i=0;i<jsonArray1.size();i++){
			JSONObject jsonObj1 = (JSONObject)jsonArray1.get(i);
			PracticesPracticescheduleHomeworkDto sto = new PracticesPracticescheduleHomeworkDto();
			sto.setId(Integer.parseInt(jsonObj1.get("schedule_id").toString()));
			sto.setStart_paragraph(Integer.parseInt(jsonObj1.get("start_paragraph").toString()));
			sto.setEnd_paragraph(Integer.parseInt(jsonObj1.get("end_paragraph").toString()));
			sto.setExam_time(Integer.parseInt(jsonObj1.get("exam_time").toString()));
			sto.setExam_count(Integer.parseInt(jsonObj1.get("exam_count").toString()));
			sto.setTest_type(jsonObj1.get("test_type").toString());
			
			practicesService.updatePracticeScheduleHomeworkParagraph(sto);
		}

	}
}