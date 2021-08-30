package com.usher.web.enrollment;

import java.util.ArrayList;
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
import com.usher.service.BoardService;
import com.usher.service.CoursesService;
import com.usher.service.EnrollmentsService;

import com.usher.dto.EnrollmentsCourseenrollmentDto;
import com.usher.dto.EnrollmentsRepetitionenrollmentDto;
import com.usher.dto.EnrollmentsSeatenrollmentDto;
import com.usher.dto.AuthUserDto;
import com.usher.dto.BoardMemoirsDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.CoursesCoursegroupDto;
import com.usher.util.ExcelUtil;
import com.usher.util.SessionUtil;


@Controller
public class RepetitionEnrollmentSummaryController{
	@Autowired
	EnrollmentsService enrollmentsService;
	
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	AuthService authService;
	
	@Autowired
	BoardService boardService;
	
	@RequestMapping(value="/enrollment/repetition_enrollment_summary.do")
	public String course_enrollment(HttpServletRequest request,
						CoursesCourseDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("courseInfo", dto);
		String url = "";
		
		url = "enrollment/repetition_enrollment_summary";
		return url;
	}
	
	/*
	@RequestMapping(value="/enrollment/getRepetitionEnrollmentSummaryList.do")
	public @ResponseBody Map  getRepetitionEnrollmentSummaryList(HttpServletRequest request, EnrollmentsRepetitionenrollmentDto dto) throws Exception {
		Map resultMap = new HashMap();
		
		CoursesCourseDto dto2 = new CoursesCourseDto();
		dto2.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto2);
		resultMap.put("courseInfo", courseInfo);
		
		String course_name = courseInfo.getName();
		String student_type = courseInfo.getStudent_type();
		String test_type = courseInfo.getTest_type();
		
		dto.setSemester_date(courseInfo.getNext_semester_date());
		List<EnrollmentsRepetitionenrollmentDto> repetitionList = enrollmentsService.getEnrollmentsRepetitionList(dto);
		resultMap.put("repetitionList", repetitionList);
		
		EnrollmentsCourseenrollmentDto dto1 = new EnrollmentsCourseenrollmentDto();
		dto1.setCourse_id(dto.getCourse_id());
		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentList(dto1);
		
		resultMap.put("enrollmentList", enrollmentList);
		
		EnrollmentsCourseenrollmentDto dto3 = new EnrollmentsCourseenrollmentDto();
		dto3.setCourse_id(dto.getCourse_id());
		if(courseInfo.getStudent_type().equals("JUNIOR")) {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentDaillyCountList(dto3);
			resultMap.put("classCountList", classCountList);
		}else {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentMonthlyCountList(dto3);
			resultMap.put("classCountList", classCountList);
		}
		
		return resultMap;
	}
	*/
	
	@RequestMapping(value="/enrollment/getRepetitionEnrollmentSummaryList.do")
	public @ResponseBody Map  getRepetitionEnrollmentSummaryList(HttpServletRequest request, EnrollmentsRepetitionenrollmentDto dto) throws Exception {
		Map resultMap = new HashMap();
		CoursesCoursegroupDto dto4 = new CoursesCoursegroupDto();
		dto4.setId(dto.getCourse_group_id());
		CoursesCoursegroupDto courseGroupInfo = coursesService.getCoursegroup(dto4);
		resultMap.put("courseGroupInfo", courseGroupInfo);
		
		CoursesCourseDto dto2 = new CoursesCourseDto();
		dto2.setCourse_group_id(dto.getCourse_group_id());
		List<CoursesCourseDto> courseList = coursesService.getCourseList(dto2);
		resultMap.put("courseList", courseList);
		
		dto.setSemester_date(courseGroupInfo.getNext_semester_date());
		List<EnrollmentsRepetitionenrollmentDto> repetitionList = enrollmentsService.getEnrollmentsRepetitionCourseGroupList(dto);
		resultMap.put("repetitionList", repetitionList);
		
		EnrollmentsCourseenrollmentDto dto1 = new EnrollmentsCourseenrollmentDto();
		dto1.setCourse_group_id(dto.getCourse_group_id());
		dto1.setSemester_in_data(dto.getSemester_in_data());
		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentRepetitionCourseGroupList(dto1);
		List<EnrollmentsCourseenrollmentDto> semesterEnrollmentList = enrollmentsService.getCourseenrollmentRepetitionSemesterList(dto1);
		resultMap.put("enrollmentList", enrollmentList);
		resultMap.put("semesterEnrollmentList", semesterEnrollmentList);
		
		EnrollmentsCourseenrollmentDto dto3 = new EnrollmentsCourseenrollmentDto();
		dto3.setCourse_group_id(dto.getCourse_group_id());
		if(courseGroupInfo.getStudent_type().equals("JUNIOR")) {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentDaillyCourseGroupCountList(dto3);
			resultMap.put("classCountList", classCountList);
		}else {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentMonthlyCourseGroupCountList(dto3);
			resultMap.put("classCountList", classCountList);
		}
		
		return resultMap;
	}
}