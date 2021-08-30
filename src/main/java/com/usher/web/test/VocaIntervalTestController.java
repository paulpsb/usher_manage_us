package com.usher.web.test;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.dto.BatchDirectionDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.CoursesCoursegroupDto;
import com.usher.dto.EnrollmentsCourseenrollmentDto;
import com.usher.dto.GoalsGoalconcentrationPracticeDto;
import com.usher.dto.MockTestDirectionDto;
import com.usher.dto.PracticesPracticeexceptionDto;
import com.usher.dto.PracticesPracticequizresultDto;
import com.usher.dto.PracticesPracticeresultDto;
import com.usher.dto.PracticesPracticeresultStaticDto;
import com.usher.dto.PracticesPracticescheduleDto;
import com.usher.service.BatchService;
import com.usher.service.CoursesService;
import com.usher.service.EnrollmentsService;
import com.usher.service.GoalService;
import com.usher.service.MockTestService;
import com.usher.service.PracticesService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class VocaIntervalTestController{
	@Autowired
	PracticesService practicesService; 
	
	@Autowired
	GoalService goalService;
	
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	EnrollmentsService enrollmentsService;
	
	@RequestMapping(value="/test/voca_interval_test.do")
	public String voca_interval_test(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "test/voca_interval_test";
	}

	@RequestMapping(value="/test/voca_interval_test_course_group.do")
	public String voca_interval_test_course_group(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "test/voca_interval_test_course_group";
	}
	
	@RequestMapping(value="/test/voca_interval_test_achieve.do")
	public String voca_interval_test_achieve(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "test/voca_interval_test_achieve";
	}
	
	@RequestMapping(value="/test/getPracticeScheduleVocaIntervalPracticeTypeList.do")
	public @ResponseBody List<PracticesPracticescheduleDto> getPracticeScheduleVocaIntervalPracticeTypeList(HttpServletRequest request, PracticesPracticescheduleDto dto) throws Exception {
		return practicesService.getPracticeScheduleVocaIntervalPracticeTypeList(dto);
	}
	
	@RequestMapping(value="/test/getPracticeScheduleVocaIntervalCourseGroupPracticeTypeList.do")
	public @ResponseBody Map getPracticeScheduleVocaIntervalCourseGroupPracticeTypeList(HttpServletRequest request, PracticesPracticescheduleDto dto) throws Exception {
		Map resultMap = new HashMap();
		List<PracticesPracticescheduleDto> scheduleList1 = practicesService.getPracticeScheduleVocaIntervalCourseGroupPracticeTypeList1(dto);
		resultMap.put("scheduleList1", scheduleList1);
		List<PracticesPracticescheduleDto> scheduleList2 = practicesService.getPracticeScheduleVocaIntervalCourseGroupPracticeTypeList2(dto);
		resultMap.put("scheduleList2", scheduleList2);
		return resultMap;
	}
	
	@RequestMapping(value="/test/updatePracticeScheduleInterval.do")
	public @ResponseBody void updatePracticeScheduleInterval(HttpServletRequest request, PracticesPracticescheduleDto dto) throws Exception {
		
		practicesService.updatePracticeScheduleInterval(dto);
	}
	
	@RequestMapping(value="/test/getPracticeException.do")
	public @ResponseBody PracticesPracticeexceptionDto getPracticeException(HttpServletRequest request, PracticesPracticeexceptionDto dto) throws Exception {
		
		return practicesService.getPracticeException(dto);
	}
	
	@RequestMapping(value="/test/insertPracticeException.do")
	public @ResponseBody void insertPracticeException(HttpServletRequest request, PracticesPracticeexceptionDto dto) throws Exception {
		
		practicesService.insertPracticeException(dto);
	}
	
	@RequestMapping(value="/test/deletePracticeException.do")
	public @ResponseBody void deletePracticeException(HttpServletRequest request, PracticesPracticeexceptionDto dto) throws Exception {
		
		practicesService.deletePracticeException(dto);
	}
	
	@RequestMapping(value="/test/updatePracticeScheduleIntervalCourseGroup.do")
	public @ResponseBody void updatePracticeScheduleIntervalCourseGroup(HttpServletRequest request, PracticesPracticescheduleDto dto) throws Exception {
		
		practicesService.updatePracticeScheduleIntervalCourseGroup(dto);
	}
	
	@RequestMapping(value="/test/getPracticeResultVocaIntervalList.do")
	public @ResponseBody Map getPracticeResultVocaIntervalList(HttpServletRequest request, PracticesPracticeresultDto dto) throws Exception {
		Map resultMap = new HashMap();
		
		List<PracticesPracticeresultDto>  resultList = practicesService.getPracticeResultVocaIntervalList(dto);
		resultMap.put("resultList", resultList);
		
		EnrollmentsCourseenrollmentDto dto1 = new EnrollmentsCourseenrollmentDto();
		CoursesCoursegroupDto dto2 = new CoursesCoursegroupDto();
		dto2.setCourse_id(dto.getCourse_id());
		if(!StringUtil.nvl(dto.getDate()).equals("")) {
			dto1.setDate(dto.getDate());
			dto2.setSchedule(dto.getDate());
		}
		CoursesCoursegroupDto couseGroupSchedule = coursesService.getCoursegroupAsPrevDateCourse(dto2);
		
		dto1.setSection("VOCA");
		dto1.setPractice_type("VOCA_INTERVAL");
		dto1.setCourse_id(dto.getCourse_id());
		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentExamList(dto1);
		resultMap.put("enrollmentList", enrollmentList);
		
		String schedule = "";
		if(couseGroupSchedule == null) {
			schedule = "9999-12-31";
		}else {
			schedule = couseGroupSchedule.getSchedule();
		}
		PracticesPracticeresultStaticDto dto3 = new PracticesPracticeresultStaticDto();
		dto3.setSection("VOCA");
		dto3.setPractice_type("VOCA");
		dto3.setCourse_id(dto.getCourse_id());
		dto3.setDate(dto.getDate());
		List<PracticesPracticeresultStaticDto> preResultList = practicesService.getPracticeResultStaticList(dto3);
		resultMap.put("preResultList", preResultList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/test/getPracticeResultVocaIntervalCourseGroupList.do")
	public @ResponseBody Map getPracticeResultVocaIntervalCourseGroupList(HttpServletRequest request, PracticesPracticeresultDto dto) throws Exception {
		Map resultMap = new HashMap();
		
		List<PracticesPracticeresultDto>  resultList = practicesService.getPracticeResultVocaIntervalCourseGroupList(dto);
		resultMap.put("resultList", resultList);
		
		EnrollmentsCourseenrollmentDto dto1 = new EnrollmentsCourseenrollmentDto();
		CoursesCoursegroupDto dto2 = new CoursesCoursegroupDto();
		dto2.setId(dto.getCourse_group_id());
		if(!StringUtil.nvl(dto.getDate()).equals("")) {
			dto1.setDate(dto.getDate());
			dto2.setSchedule(dto.getDate());
		}
		CoursesCoursegroupDto couseGroupSchedule = coursesService.getCoursegroupAsPrevDate(dto2);
		
		dto1.setSection("VOCA");
		dto1.setPractice_type("VOCA_INTERVAL");
		dto1.setCourse_group_id(dto.getCourse_group_id());
		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentExamCourseGroupList(dto1);
		resultMap.put("enrollmentList", enrollmentList);
		
		String schedule = "";
		if(couseGroupSchedule == null) {
			schedule = "9999-12-31";
		}else {
			schedule = couseGroupSchedule.getSchedule();
		}
		
		PracticesPracticeresultStaticDto dto3 = new PracticesPracticeresultStaticDto();
		dto3.setSection("VOCA");
		dto3.setPractice_type("VOCA");
		dto3.setCourse_group_id(dto.getCourse_group_id());
		dto3.setDate(dto.getDate());
		List<PracticesPracticeresultStaticDto> preResultList = practicesService.getPracticeResultStaticCourseGroupList(dto3);
		resultMap.put("preResultList", preResultList);
	
		return resultMap;
	}
}