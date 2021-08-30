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
import com.usher.dto.InternalExamsListeningDto;
import com.usher.dto.InternalExamsListeningQuestionDto;
import com.usher.dto.InternalExamsPassageDto;
import com.usher.service.InternalExamsService;

import com.usher.util.SessionUtil;


@Controller
public class ExamListeningController{
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/exam/listening_list.do")
	public String passage_list(HttpServletRequest request,
						InternalExamsListeningDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("listeningInfo", dto);
		String url = "";
		
		url = "exam/listening_list";
		return url;
	}
	
	@RequestMapping(value="/exam/getExamListeningList.do")
	public @ResponseBody Map getExamListeningList(HttpServletRequest request,
						InternalExamsListeningDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);

		InternalExamsListeningDto listeningCount = internalExamsService.getInternalExamsListeningCount(dto);
		List<InternalExamsListeningDto> listeningList = internalExamsService.getInternalExamsListeningList(dto);
		resultMap.put("listeningCount", listeningCount);
		resultMap.put("listeningList", listeningList);

		return resultMap;
	}
	
	@RequestMapping(value="/exam/selectExamListening.do")
	public @ResponseBody InternalExamsListeningDto selectExamListening(HttpServletRequest request, InternalExamsListeningDto dto) throws Exception {
		return internalExamsService.getInternalExamsListening(dto);
	}
	
	@RequestMapping(value="/exam/insertExamListening.do")
	public @ResponseBody void insertExamListening(HttpServletRequest request, InternalExamsListeningDto dto) throws Exception {
		internalExamsService.insertInternalExamsListening(dto);
	}
	
	@RequestMapping(value="/exam/updateExamListening.do")
	public @ResponseBody void updateExamListening(HttpServletRequest request, InternalExamsListeningDto dto) throws Exception {
		internalExamsService.updateInternalExamsListening(dto);
	}
	
	@RequestMapping(value="/exam/deleteExamListening.do")
	public @ResponseBody void deleteExamListening(HttpServletRequest request, InternalExamsListeningDto dto) throws Exception {
		internalExamsService.deleteInternalExamsListening(dto);
		internalExamsService.deleteInternalExamsListeningQuestionAll(dto);
	}
	
	
	@RequestMapping(value="/exam/listening_question.do")
	public String listening_question(HttpServletRequest request,
						InternalExamsListeningDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("listeningInfo", dto);
		String url = "";
		
		url = "exam/listening_question";
		return url;
	}
	
	
	@RequestMapping(value="/exam/getExamListeningQuestionList.do")
	public @ResponseBody Map getExamListeningQuestionList(HttpServletRequest request,
						InternalExamsListeningDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		InternalExamsListeningDto listeningInfo = internalExamsService.getInternalExamsListening(dto);
		
		InternalExamsListeningQuestionDto dto1 = new InternalExamsListeningQuestionDto();
		dto1.setListening_id(listeningInfo.getId());
		
		List<InternalExamsListeningQuestionDto> questionList = internalExamsService.getExamsListeningQuestionList(dto1);
		
		resultMap.put("listeningInfo", listeningInfo);
		resultMap.put("questionList", questionList);

		return resultMap;
	}
	
	@RequestMapping(value="/exam/getExamListeningQuestion.do")
	public @ResponseBody InternalExamsListeningQuestionDto getExamListeningQuestion(HttpServletRequest request,
						InternalExamsListeningQuestionDto dto, 
						ModelMap modelMap) throws Exception {
		
		

		return internalExamsService.getExamsListeningQuestion(dto);
	}
	
	
	@RequestMapping(value="/exam/insertExamListeningQuestion.do")
	public @ResponseBody InternalExamsListeningQuestionDto insertExamListeningQuestion(HttpServletRequest request,
						InternalExamsListeningQuestionDto dto, 
						ModelMap modelMap) throws Exception {
		InternalExamsListeningQuestionDto num = internalExamsService.getExamsListeningQuestionNum(dto);
		
		dto.setQuestion_num(num.getQuestion_num());
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		
		internalExamsService.insertExamsListeningQuestion(dto);
		
		return dto;
	}
	
	
	@RequestMapping(value="/exam/updateExamListeningQuestion.do")
	public @ResponseBody void updateExamListeningQuestion(HttpServletRequest request,
						InternalExamsListeningQuestionDto dto, 
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setModified_id(userInfo.getUser_id());
		
		internalExamsService.updateExamsListeningQuestion(dto);
	}
	
	@RequestMapping(value="/exam/deleteExamListeningQuestion.do")
	public @ResponseBody void deleteExamListeningQuestion(HttpServletRequest request,
						InternalExamsListeningQuestionDto dto, 
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setModified_id(userInfo.getUser_id());
		
		internalExamsService.deleteExamsListeningQuestion(dto);
	}
	
}