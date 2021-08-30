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
import com.usher.dto.InternalExamsMemorizationDto;
import com.usher.dto.InternalExamsMemorizationQuestionDto;
import com.usher.service.InternalExamsService;

import com.usher.util.SessionUtil;


@Controller
public class ExamMemorizationController{
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/exam/memorization_list.do")
	public String memorization_list(HttpServletRequest request,
						InternalExamsMemorizationDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("memorizationInfo", dto);
		String url = "";
		
		url = "exam/memorization_list";
		return url;
	}
	
	@RequestMapping(value="/exam/getExamMemorizationList.do")
	public @ResponseBody Map getExamMemorizationList(HttpServletRequest request,
						InternalExamsMemorizationDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);

		InternalExamsMemorizationDto memorizationCount = internalExamsService.getInternalExamsMemorizationCount(dto);
		List<InternalExamsMemorizationDto> memorizationList = internalExamsService.getInternalExamsMemorizationList(dto);
		resultMap.put("memorizationCount", memorizationCount);
		resultMap.put("memorizationList", memorizationList);

		return resultMap;
	}
	
	@RequestMapping(value="/exam/insertInternalExamsMemorization.do")
	public @ResponseBody InternalExamsMemorizationDto insertInternalExamsMemorization(HttpServletRequest request, InternalExamsMemorizationDto dto) throws Exception {
		internalExamsService.insertInternalExamsMemorization(dto);
		
		return dto;
	}
	
	@RequestMapping(value="/exam/deleteInternalExamsMemorization.do")
	public @ResponseBody void deleteInternalExamsMemorization(HttpServletRequest request, InternalExamsMemorizationDto dto) throws Exception {
		internalExamsService.deleteInternalExamsMemorization(dto);
		internalExamsService.deleteInternalExamsMemorizationQuestionAll(dto);
	}

	@RequestMapping(value="/exam/memorization_form.do")
	public String memorization_form(HttpServletRequest request,
						InternalExamsMemorizationDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("memorizationInfo", dto);
		String url = "";
		
		url = "exam/memorization_form";
		return url;
	}	
	
	
	
	@RequestMapping(value="/exam/getInternalExamsMemorization.do")
	public @ResponseBody Map getInternalExamsMemorization(HttpServletRequest request,
						InternalExamsMemorizationDto dto, 
						ModelMap modelMap) throws Exception {
		Map resultMap = new HashMap();

		InternalExamsMemorizationDto memorizationInfo = internalExamsService.getInternalExamsMemorization(dto);
		resultMap.put("memorizationInfo", memorizationInfo);
		
		InternalExamsMemorizationQuestionDto dto1 = new InternalExamsMemorizationQuestionDto();
		dto1.setMemorization_id(dto.getId());
		List<InternalExamsMemorizationQuestionDto> memorizationQuestionList = internalExamsService.getInternalExamsMemorizationQuestionList(dto1);
		resultMap.put("memorizationQuestionList", memorizationQuestionList);
		
		InternalExamsMemorizationQuestionDto memorizationQuestionInfo = internalExamsService.getInternalExamsMemorizationQuestionNum(dto1);
		resultMap.put("memorizationQuestionInfo", memorizationQuestionInfo);
		
		return resultMap;
	}
	
	
	@RequestMapping(value="/exam/saveInternalExamsMemorization.do")
	public @ResponseBody void saveInternalExamsMemorization(HttpServletRequest request,
						InternalExamsMemorizationDto dto, 
						ModelMap modelMap) throws Exception {
		
		internalExamsService.updateInternalExamsMemorization(dto);
		internalExamsService.deleteInternalExamsMemorizationQuestionAll(dto);
		
		String data_value = dto.getData_value();
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int question_num = Integer.parseInt(jsonObj.get("question_num").toString());
			String question = jsonObj.get("question").toString();
			String is_easy_mode = jsonObj.get("is_easy_mode").toString();
			String is_hard_mod = jsonObj.get("is_hard_mod").toString();
			String score_type = jsonObj.get("score_type").toString();
			int score_weight = Integer.parseInt(jsonObj.get("score_weight").toString());
			
			InternalExamsMemorizationQuestionDto sto = new InternalExamsMemorizationQuestionDto();
			sto.setMemorization_id(dto.getId());
			sto.setQuestion_num(question_num);
			sto.setQuestion(question);
			sto.setIs_easy_mode(is_easy_mode);
			sto.setIs_hard_mod(is_hard_mod);
			sto.setScore_type(score_type);
			sto.setScore_weight(score_weight);
			
			internalExamsService.insertInternalExamsMemorizationQuestion(sto);
			
		}
		
		
	}
	
}