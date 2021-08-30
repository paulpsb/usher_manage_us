package com.usher.web.enrollment;

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
import com.usher.dto.EnrollmentsCourseenrollmentDto;
import com.usher.dto.EnrollmentsSeatenrollmentDto;
import com.usher.dto.PracticesPracticeresultDto;
import com.usher.dto.CoursesCourseDto;

import com.usher.util.SessionUtil;


@Controller
public class IndependentStudyController{
	@Autowired
	EnrollmentsService enrollmentsService;
	
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	PracticesService practicesService;
	
	@RequestMapping(value="/enrollment/independent_study.do")
	public String practice_result(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";
		
		url = "enrollment/independent_study";
		return url;
	}
	
	@RequestMapping(value="/enrollment/getIndependentPracticeResultList.do")
	public @ResponseBody List<PracticesPracticeresultDto> getIndependentPracticeResultList(HttpServletRequest request, PracticesPracticeresultDto dto) throws Exception {
		return practicesService.getIndependentPracticeResultList(dto);
	}
}