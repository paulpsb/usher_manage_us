package com.usher.web.test;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.dto.AuthUserDto;
import com.usher.dto.BatchDirectionDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.GoalsGoalconcentrationPracticeDto;
import com.usher.dto.InternalExamsChainDto;
import com.usher.dto.InternalExamsDictationDto;
import com.usher.dto.InternalExamsListeningDto;
import com.usher.dto.InternalExamsListeningQuestionDto;
import com.usher.dto.InternalExamsReadingDto;
import com.usher.dto.InternalExamsReadingQuestionDto;
import com.usher.dto.MockTestDirectionDto;
import com.usher.dto.PracticesPracticequizresultDto;
import com.usher.dto.PracticesPracticeresultDto;
import com.usher.dto.PracticesPracticeresultStaticDto;
import com.usher.dto.PracticesPracticescheduleDto;
import com.usher.service.BatchService;
import com.usher.service.CoursesService;
import com.usher.service.GoalService;
import com.usher.service.InternalExamsService;
import com.usher.service.MockTestService;
import com.usher.service.PracticesService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class ClassListeningController{
	@Autowired
	PracticesService practicesService; 
	
	@Autowired
	GoalService goalService;
	
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/test/class/listening_class.do")
	public String reading_class(HttpServletRequest request,
						PracticesPracticeresultDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		if(dto.getUser_id() > 0) {
			
		}else {
			dto.setUser_id(userInfo.getUser_id());
		}
		
		modelMap.addAttribute("classInfo", dto);
		
		return "test/class/listening_class";
	}
	
	@RequestMapping(value="/test/class/getListeningPracticeScheduleList.do")
	public @ResponseBody List<PracticesPracticescheduleDto> getListeningPracticeScheduleList(HttpServletRequest request, PracticesPracticescheduleDto dto) throws Exception {
		return practicesService.getPracticeTodayScheduleList(dto);
	}
	
	@RequestMapping(value="/test/class/getListeningExamInfo.do")
	public @ResponseBody Map getListeningExamInfo(HttpServletRequest request,InternalExamsListeningDto dto) throws Exception {
		Map resultMap = new HashMap();
		
		InternalExamsListeningDto examInfo = internalExamsService.getInternalExamsListeningOne(dto);
		resultMap.put("examInfo", examInfo);
		
		InternalExamsListeningQuestionDto dto1 = new InternalExamsListeningQuestionDto();
		dto1.setListening_id(examInfo.getId());
		List<InternalExamsListeningQuestionDto> questionList = internalExamsService.getExamsListeningQuestionList(dto1);
		resultMap.put("questionList", questionList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/test/class/getExamsListeningQuestionCourseList.do")
	public @ResponseBody List<InternalExamsListeningQuestionDto> getExamsReadingQuestionCourseList(HttpServletRequest request, InternalExamsListeningQuestionDto dto) throws Exception {
		return internalExamsService.getExamsListeningQuestionCourseList(dto);
	}
	
	@RequestMapping(value="/test/class/getListeningExamQuestionReview.do")
	public @ResponseBody InternalExamsListeningQuestionDto getListeningExamQuestionReview(HttpServletRequest request, InternalExamsListeningQuestionDto dto) throws Exception {
		return internalExamsService.getExamsListeningQuestionReview(dto);
	}
	
	@RequestMapping(value="/test/class/getDictationOne.do")
	public @ResponseBody InternalExamsDictationDto getDictationOne(HttpServletRequest request, InternalExamsDictationDto dto) throws Exception {
		return internalExamsService.getDictationOne(dto);
	}
	
}