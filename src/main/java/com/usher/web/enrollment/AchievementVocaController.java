package com.usher.web.enrollment;

import java.util.ArrayList;
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

import com.usher.service.BaseService;
import com.usher.service.CoursesService;
import com.usher.service.EnrollmentsService;
import com.usher.service.GoalService;
import com.usher.service.PracticesService;
import com.usher.dto.EnrollmentsCourseenrollmentDto;
import com.usher.dto.EnrollmentsOrientationenrollmentDto;
import com.usher.dto.EnrollmentsSeatenrollmentDto;
import com.usher.dto.GoalsGoalconcentrationDto;
import com.usher.dto.GoalsGoalconcentrationPracticeDto;
import com.usher.dto.PracticesPracticeproblemDto;
import com.usher.dto.PracticesPracticequizresultDto;
import com.usher.dto.PracticesPracticeresultDto;
import com.usher.dto.PracticesPracticeresultStaticDto;
import com.usher.dto.PracticesPracticescheduleDto;
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.dto.PracticesPracticesectiontypeDto;
import com.usher.dto.PracticesPracticetypeDto;
import com.usher.dto.AuthUserDto;
import com.usher.dto.BaseOrientationDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.CoursesCoursePracticeDto;
import com.usher.dto.CoursesCourseTimetableDto;
import com.usher.dto.CoursesCoursegroupDto;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;


@Controller
public class AchievementVocaController{
	@Autowired
	BaseService baseService; 
	
	@Autowired
	EnrollmentsService enrollmentsService;
	
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	PracticesService practicesService;
	
	@Autowired
	GoalService goalService;
	
	@RequestMapping(value="/enrollment/achievement_voca.do")
	public String course_enrollment(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";
		
		url = "enrollment/achievement_voca";
		return url;
	}
	
	@RequestMapping(value="/enrollment/getAchieveVocaAsDataList.do")
	public @ResponseBody Map getAchieveVocaAsDataList(HttpServletRequest request, CoursesCoursegroupDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		
		CoursesCoursegroupDto courseGroupInfo = coursesService.getCoursegroup(dto);
		resultMap.put("courseGroupInfo", courseGroupInfo);
		
		EnrollmentsCourseenrollmentDto dto1 = new EnrollmentsCourseenrollmentDto();
		dto1.setCourse_group_id(dto.getId());
		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentAchieveCourseGroupList(dto1);
		resultMap.put("enrollmentList", enrollmentList);
		if(courseGroupInfo.getStudent_type().equals("JUNIOR")) {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentDaillyCourseGroupCountList(dto1);
			resultMap.put("classCountList", classCountList);
		}else {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentMonthlyCourseGroupCountList(dto1);
			resultMap.put("classCountList", classCountList);
		}
		PracticesPracticeresultStaticDto dto2 = new PracticesPracticeresultStaticDto();
		dto2.setCourse_group_id(dto.getId());
		List<PracticesPracticeresultStaticDto> resultList = practicesService.getPracticeResultStaticCourseGroupList(dto2);
		resultMap.put("resultList", resultList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/enrollment/getAchieveVocaDailyList.do")
	public @ResponseBody Map getAchieveVocaDailyList(HttpServletRequest request, PracticesPracticeresultStaticDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		List<PracticesPracticeresultStaticDto> enrollmentDailyList = practicesService.getPracticeResultStaticCourseEnrollmentDailyList(dto);
		List<PracticesPracticeresultStaticDto> courseDailyList = practicesService.getPracticeResultStaticCourseDailyList(dto);
		resultMap.put("enrollmentDailyList", enrollmentDailyList);
		resultMap.put("courseDailyList", courseDailyList);
		
		return resultMap;
	}
}