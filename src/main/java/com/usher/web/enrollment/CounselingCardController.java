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
import com.usher.service.BatchService;
import com.usher.service.CoursesService;
import com.usher.service.EnrollmentsService;
import com.usher.service.ExamsService;
import com.usher.service.PracticesService;
import com.usher.dto.EnrollmentsCourseenrollmentDto;
import com.usher.dto.EnrollmentsCourseenrollmentPracticeDto;
import com.usher.dto.EnrollmentsRepetitionenrollmentDto;
import com.usher.dto.EnrollmentsSeatenrollmentDto;
import com.usher.dto.ExamsToeflDto;
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.dto.PracticesPracticesectiontypeDto;
import com.usher.dto.AuthUserDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.util.ExcelUtil;
import com.usher.util.SessionUtil;


@Controller
public class CounselingCardController{
	@Autowired
	EnrollmentsService enrollmentsService;
	
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	BatchService batchService;
	
	@Autowired
	ExamsService examsService;
	
	@RequestMapping(value="/enrollment/counseling_card.do")
	public String counseling_card(HttpServletRequest request,
						BatchResultDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("batchInfo", dto);
		
		String url = "";
		
		url = "enrollment/counseling_card";
		return url;
	}
	
	
	@RequestMapping(value="/enrollment/getCounselingCard.do")
	public @ResponseBody Map getCourseEnrollmentProgram(HttpServletRequest request, BatchResultDto dto) throws Exception {
		Map resultMap = new HashMap();
		BatchResultDto counselingInfo = batchService.getBatchResultUserAsAdvice(dto);
		if(counselingInfo == null) {
			counselingInfo = batchService.getBatchResultUserAsNotAdvice(dto);
		}
		resultMap.put("counselingInfo", counselingInfo);
		
		EnrollmentsRepetitionenrollmentDto dto1 = new EnrollmentsRepetitionenrollmentDto();
		dto1.setUser_id(dto.getUser_id());
		List<EnrollmentsRepetitionenrollmentDto> enrollmentList = enrollmentsService.getEnrollmentsRepetitionUserList(dto1);
		resultMap.put("enrollmentList", enrollmentList);
		
		
		List<BatchResultDto> batchExamList = batchService.getBatchResultUserOnlyList(dto);
		resultMap.put("batchExamList", batchExamList);
		
		ExamsToeflDto dto2 = new ExamsToeflDto();
		dto2.setUser_id(dto.getUser_id());
		List<ExamsToeflDto> toeflExamList = examsService.getExamsToeflUserOnlyList(dto2);
		resultMap.put("toeflExamList", toeflExamList);
		return resultMap;
	}
}