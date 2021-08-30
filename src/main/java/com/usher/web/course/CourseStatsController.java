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

import com.usher.service.BatchService;
import com.usher.service.CoursesService;
import com.usher.service.EnrollmentsService;
import com.usher.service.PracticesService;
import com.usher.service.StudentsService;
import com.usher.util.SessionUtil;
import com.usher.dto.CoursesSemesterDto;
import com.usher.dto.EnrollmentsRepetitionenrollmentDto;
import com.usher.dto.PracticesPracticescheduleDto;
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.dto.PracticesPracticesectiontypeDto;
import com.usher.dto.StudentsStudentDto;
import com.usher.dto.CoursesCoursegroupDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.BatchStatsDto;
import com.usher.dto.CoursesCourseAchieveDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.CoursesCoursePracticeDto;
import com.usher.dto.CoursesCourseStatsDto;

@Controller
public class CourseStatsController{
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	PracticesService practicesService; 
	
	@Autowired
	BatchService batchService;
	
	@Autowired
	EnrollmentsService enrollmentsService;
	
	@Autowired
	StudentsService studentsService;
	
	@RequestMapping(value="/course/course_stats.do")
	public String course_stats(HttpServletRequest request,
			ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";

		url = "course/course_stats";
		return url;
	}
	
	@RequestMapping(value="/course/getCourseStatsSemesterList.do")
	public @ResponseBody List<CoursesCourseStatsDto> getCourseStatsSemesterList(HttpServletRequest request,
						CoursesCourseStatsDto dto,
						ModelMap modelMap) throws Exception {
		
		return coursesService.getCourseStatsSemesterList(dto);
	}

	@RequestMapping(value="/course/getCourseStatsList.do")
	public @ResponseBody Map getCourseStatsList(HttpServletRequest request, CoursesCourseStatsDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		
		List<CoursesCourseStatsDto> courseSemesterList = coursesService.getCourseStatsSemesterBetweenList(dto);
		resultMap.put("courseSemesterList", courseSemesterList);
		List<CoursesCourseStatsDto> courseUserList = coursesService.getCourseStatsTeacherList(dto);
		resultMap.put("courseUserList", courseUserList);
		List<CoursesCourseStatsDto> courseStatsList = coursesService.getCourseStatsList(dto);
		resultMap.put("courseStatsList", courseStatsList);
		return resultMap;
	}
	
}