package com.usher.web.exam;

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

import com.usher.dto.AuthUserDto;
import com.usher.dto.InternalExamsReadingDto;
import com.usher.dto.InternalExamsReadingQuestionDto;
import com.usher.dto.InternalExamsPassageDto;
import com.usher.service.InternalExamsService;

import com.usher.util.SessionUtil;


@Controller
public class ExamReadingController{
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/exam/reading_list.do")
	public String passage_list(HttpServletRequest request,
						InternalExamsReadingDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("readingInfo", dto);
		String url = "";
		
		url = "exam/reading_list";
		return url;
	}
	
	@RequestMapping(value="/exam/getExamReadingList.do")
	public @ResponseBody Map getExamReadingList(HttpServletRequest request,
						InternalExamsReadingDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);

		InternalExamsReadingDto readingCount = internalExamsService.getInternalExamsReadingCount(dto);
		List<InternalExamsReadingDto> readingList = internalExamsService.getInternalExamsReadingList(dto);
		resultMap.put("readingCount", readingCount);
		resultMap.put("readingList", readingList);

		return resultMap;
	}
	
	@RequestMapping(value="/exam/selectExamReading.do")
	public @ResponseBody InternalExamsReadingDto selectExamReading(HttpServletRequest request, InternalExamsReadingDto dto) throws Exception {
		return internalExamsService.getInternalExamsReading(dto);
	}
	
	@RequestMapping(value="/exam/insertExamReading.do")
	public @ResponseBody void insertExamReading(HttpServletRequest request, InternalExamsReadingDto dto) throws Exception {
		internalExamsService.insertInternalExamsReading(dto);
	}
	
	@RequestMapping(value="/exam/updateExamReading.do")
	public @ResponseBody void updateExamReading(HttpServletRequest request, InternalExamsReadingDto dto) throws Exception {
		internalExamsService.updateInternalExamsReading(dto);
	}
	
	@RequestMapping(value="/exam/deleteExamReading.do")
	public @ResponseBody void deleteExamReading(HttpServletRequest request, InternalExamsReadingDto dto) throws Exception {
		internalExamsService.deleteInternalExamsReading(dto);
		internalExamsService.deleteInternalExamsReadingQuestionAll(dto);
	}

	@RequestMapping(value="/exam/reading_form.do")
	public String reading_form(HttpServletRequest request,
						InternalExamsReadingDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("readingInfo", dto);
		String url = "";
		
		url = "exam/reading_form";
		return url;
	}	
	
	@RequestMapping(value="/exam/reading_question.do")
	public String reading_question(HttpServletRequest request,
						InternalExamsReadingDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("readingInfo", dto);
		String url = "";
		
		url = "exam/reading_question";
		return url;
	}
	
	
	@RequestMapping(value="/exam/getExamReadingQuestionList.do")
	public @ResponseBody Map getExamReadingQuestionList(HttpServletRequest request,
						InternalExamsReadingDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		InternalExamsReadingDto readingInfo = internalExamsService.getInternalExamsReading(dto);
		
		InternalExamsReadingQuestionDto dto1 = new InternalExamsReadingQuestionDto();
		dto1.setReading_id(readingInfo.getId());
		
		List<InternalExamsReadingQuestionDto> questionList = internalExamsService.getExamsReadingQuestionList(dto1);
		
		resultMap.put("readingInfo", readingInfo);
		resultMap.put("questionList", questionList);

		return resultMap;
	}
	
	@RequestMapping(value="/exam/getExamReadingQuestion.do")
	public @ResponseBody InternalExamsReadingQuestionDto getExamReadingQuestion(HttpServletRequest request,
						InternalExamsReadingQuestionDto dto, 
						ModelMap modelMap) throws Exception {
		
		

		return internalExamsService.getExamsReadingQuestion(dto);
	}
	
	
	@RequestMapping(value="/exam/insertExamReadingQuestion.do")
	public @ResponseBody InternalExamsReadingQuestionDto insertExamReadingQuestion(HttpServletRequest request,
						InternalExamsReadingQuestionDto dto, 
						ModelMap modelMap) throws Exception {
		InternalExamsReadingQuestionDto num = internalExamsService.getExamsReadingQuestionNum(dto);
		
		dto.setQuestion_num(num.getQuestion_num());
		
		internalExamsService.insertExamsReadingQuestion(dto);
		
		return dto;
	}
	
	
	@RequestMapping(value="/exam/updateExamReadingQuestion.do")
	public @ResponseBody void updateExamReadingQuestion(HttpServletRequest request,
						InternalExamsReadingQuestionDto dto, 
						ModelMap modelMap) throws Exception {
		
		internalExamsService.updateExamsReadingQuestion(dto);
	}
	
	@RequestMapping(value="/exam/deleteExamReadingQuestion.do")
	public @ResponseBody void deleteExamReadingQuestion(HttpServletRequest request,
						InternalExamsReadingQuestionDto dto, 
						ModelMap modelMap) throws Exception {
		
		internalExamsService.deleteExamsReadingQuestion(dto);
	}
	
}