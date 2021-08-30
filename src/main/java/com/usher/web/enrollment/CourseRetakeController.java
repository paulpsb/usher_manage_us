package com.usher.web.enrollment;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import com.usher.service.AuthService;
import com.usher.service.CoursesService;
import com.usher.service.EnrollmentsService;
import com.usher.service.PracticesService;
import com.usher.dto.EnrollmentsCourseenrollmentDto;
import com.usher.dto.EnrollmentsCourseenrollmentPracticeDto;
import com.usher.dto.EnrollmentsSeatenrollmentDto;
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.dto.PracticesPracticesectiontypeDto;
import com.usher.dto.AuthUserDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.CoursesCourseRetakeDto;
import com.usher.util.ExcelUtil;
import com.usher.util.SessionUtil;


@Controller
public class CourseRetakeController{
	@Autowired
	EnrollmentsService enrollmentsService;
	
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	AuthService authService;
	
	@Autowired
	PracticesService practicesService; 
	
	@RequestMapping(value="/enrollment/course_retake.do")
	public String course_retake(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";
		
		url = "enrollment/course_retake";
		return url;
	}
	
	
	@RequestMapping(value="/enrollment/getCourseRetakeList.do")
	public @ResponseBody Map getCourseRetakeList(HttpServletRequest request, CoursesCourseRetakeDto dto) throws Exception {
		Map resultMap = new HashMap();
		
		List<CoursesCourseRetakeDto> courseGroupList = coursesService.getCoursesCourseRetakeCourseGroupList(dto);
		resultMap.put("courseGroupList", courseGroupList);
		
		List<CoursesCourseRetakeDto> courseList = coursesService.getCoursesCourseRetakeCourseList(dto);
		resultMap.put("courseList", courseList);

		List<CoursesCourseRetakeDto> enrollmentList = coursesService.getCoursesCourseRetakeList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		
		CoursesCourseRetakeDto nextSemesterInfo = coursesService.getCoursesCourseRetakeNextSemester(dto);
		resultMap.put("nextSemesterInfo", nextSemesterInfo);
		if(nextSemesterInfo == null) {
			nextSemesterInfo = new CoursesCourseRetakeDto();
		}
		CoursesCourseRetakeDto dto1 = new CoursesCourseRetakeDto();
		dto1.setSemester_date(nextSemesterInfo.getSemester_date());
		List<CoursesCourseRetakeDto> nextEnrollmentList = coursesService.getCoursesCourseRetakeList(dto1);
		resultMap.put("nextEnrollmentList", nextEnrollmentList);
		
		List<CoursesCourseRetakeDto> trackingList = coursesService.getCoursesCourseRetakeDueList(dto1);
		resultMap.put("trackingList", trackingList);

		return resultMap;
	}
	
}