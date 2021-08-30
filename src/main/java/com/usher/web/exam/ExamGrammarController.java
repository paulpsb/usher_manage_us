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
import com.usher.dto.InternalExamsGrammarDto;
import com.usher.service.InternalExamsService;

import com.usher.util.SessionUtil;


@Controller
public class ExamGrammarController{
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/exam/grammar_list.do")
	public String grammar_list(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";
		
		url = "exam/grammar_list";
		return url;
	}
	
	
	@RequestMapping(value="/exam/getExamGrammarList.do")
	public @ResponseBody List<InternalExamsGrammarDto> getExamGrammarList(HttpServletRequest request,
					InternalExamsGrammarDto dto, 
						ModelMap modelMap) throws Exception {
		
		return internalExamsService.getExamsGrammarList(dto);
	}
	
	@RequestMapping(value="/exam/getExamGrammar.do")
	public @ResponseBody InternalExamsGrammarDto getExamGrammar(HttpServletRequest request,
						InternalExamsGrammarDto dto, 
						ModelMap modelMap) throws Exception {
		
		return internalExamsService.getExamsGrammar(dto);
	}
	
	@RequestMapping(value="/exam/insertExamGrammar.do")
	public @ResponseBody InternalExamsGrammarDto insertExamGrammar(HttpServletRequest request,
						InternalExamsGrammarDto dto, 
						ModelMap modelMap) throws Exception {
		InternalExamsGrammarDto num = internalExamsService.getExamsGrammarNum(dto);
		
		dto.setQuestion_num(num.getQuestion_num());
		
		internalExamsService.insertExamsGrammar(dto);
		
		return dto;
	}
	
	
	@RequestMapping(value="/exam/updateExamGrammar.do")
	public @ResponseBody void updateExamGrammar(HttpServletRequest request,
						InternalExamsGrammarDto dto, 
						ModelMap modelMap) throws Exception {
		
		internalExamsService.updateExamsGrammar(dto);
	}
	
	@RequestMapping(value="/exam/deleteExamGrammar.do")
	public @ResponseBody void deleteExamGrammar(HttpServletRequest request,
						InternalExamsGrammarDto dto, 
						ModelMap modelMap) throws Exception {
		
		internalExamsService.deleteExamsGrammar(dto);
	}
	
}