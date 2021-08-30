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
import com.usher.dto.InternalExamsChainDto;
import com.usher.dto.InternalExamsDuolingoBlankDto;
import com.usher.dto.InternalExamsDuolingoBlankQuestionDto;
import com.usher.service.InternalExamsService;

import com.usher.util.SessionUtil;


@Controller
public class ExamDuolingoBlankController{
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/exam/duolingo_blank_list.do")
	public String duolingo_blank_list(HttpServletRequest request,
						InternalExamsDuolingoBlankDto dto, 
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("blankInfo", dto);
		String url = "";
		
		url = "exam/duolingo_blank_list";
		return url;
	}
	
	@RequestMapping(value="/exam/duolingo_blank_form.do")
	public String duolingo_blank_form(HttpServletRequest request,
						InternalExamsDuolingoBlankDto dto, 
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("blankInfo", dto);
		String url = "";
		
		url = "exam/duolingo_blank_form";
		return url;
	}
	
	@RequestMapping(value="/exam/getExamsDuolingoBlankList.do")
	public @ResponseBody List<InternalExamsDuolingoBlankDto>  getExamsDuolingoBlankList(HttpServletRequest request,
					InternalExamsDuolingoBlankDto dto, 
						ModelMap modelMap) throws Exception {
		return internalExamsService.getExamsDuolingoBlankList(dto);
	}
	
	@RequestMapping(value="/exam/getExamsDuolingoBlank.do")
	public @ResponseBody Map  getExamsDuolingoBlank(HttpServletRequest request,
					InternalExamsDuolingoBlankDto dto, 
						ModelMap modelMap) throws Exception {
		Map resultMap = new HashMap();
		
		InternalExamsDuolingoBlankDto blankInfo = internalExamsService.getExamsDuolingoBlank(dto);
		resultMap.put("blankInfo", blankInfo);
		
		InternalExamsDuolingoBlankQuestionDto dto1 = new InternalExamsDuolingoBlankQuestionDto();
		dto1.setDuolingo_blank_id(dto.getId());
		InternalExamsDuolingoBlankQuestionDto blankQuestionInfo = internalExamsService.getExamsDuolingoBlankQuestionNum(dto1);
		resultMap.put("blankQuestionInfo", blankQuestionInfo);
		
		List<InternalExamsDuolingoBlankQuestionDto> blankQuestionList = internalExamsService.getExamsDuolingoBlankQuestionList(dto1);
		resultMap.put("blankQuestionList", blankQuestionList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/exam/insertExamsDuolingoBlank.do")
	public @ResponseBody void insertExamsDuolingoBlank(HttpServletRequest request, InternalExamsDuolingoBlankDto dto) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		
		InternalExamsDuolingoBlankDto sortInto = internalExamsService.getExamsDuolingoBlankSort(dto);
		dto.setBlank_sort(sortInto.getBlank_sort());
		
		internalExamsService.insertDuolingoBlank(dto);
		
		int duolingo_blank_id = dto.getId();
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int question_num             = Integer.parseInt(jsonObj.get("question_num").toString());
			String question                = jsonObj.get("question").toString();

			InternalExamsDuolingoBlankQuestionDto sto = new InternalExamsDuolingoBlankQuestionDto();
			sto.setCreated_id(userInfo.getUser_id());
			sto.setModified_id(userInfo.getUser_id());
			sto.setDuolingo_blank_id(duolingo_blank_id);
			sto.setQuestion_num(question_num);
			sto.setQuestion(question);
			
			internalExamsService.insertDuolingoBlankQuestion(sto);
		}
	}
	
	
	@RequestMapping(value="/exam/updateExamsDuolingoBlank.do")
	public @ResponseBody void updateExamsDuolingoBlank(HttpServletRequest request, InternalExamsDuolingoBlankDto dto) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		
		internalExamsService.updateDuolingoBlank(dto);
		internalExamsService.deleteDuolingoBlankQuestionAll(dto);
		int duolingo_blank_id = dto.getId();
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int question_num             = Integer.parseInt(jsonObj.get("question_num").toString());
			String question              = jsonObj.get("question").toString();

			InternalExamsDuolingoBlankQuestionDto sto = new InternalExamsDuolingoBlankQuestionDto();
			sto.setCreated_id(userInfo.getUser_id());
			sto.setModified_id(userInfo.getUser_id());
			sto.setDuolingo_blank_id(duolingo_blank_id);
			sto.setQuestion_num(question_num);
			sto.setQuestion(question);
			
			internalExamsService.insertDuolingoBlankQuestion(sto);
		}
	}
	
	@RequestMapping(value="/exam/deleteExamsDuolingoBlank.do")
	public @ResponseBody void deleteExamsDuolingoBlank(HttpServletRequest request, InternalExamsDuolingoBlankDto dto) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		internalExamsService.deleteDuolingoBlank(dto);
		internalExamsService.deleteDuolingoBlankQuestionAll(dto);
	}
	
	
	@RequestMapping(value="/exam/updateExamsDuolingoBlankSort.do")
	public @ResponseBody void updateExamsDuolingoBlankSort(HttpServletRequest request, InternalExamsDuolingoBlankDto dto) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int blank_id      = Integer.parseInt(jsonObj.get("blank_id").toString());
			int blank_sort    = Integer.parseInt(jsonObj.get("blank_sort").toString());

			InternalExamsDuolingoBlankDto sto = new InternalExamsDuolingoBlankDto();
			sto.setCreated_id(userInfo.getUser_id());
			sto.setModified_id(userInfo.getUser_id());
			sto.setId(blank_id);
			sto.setBlank_sort(blank_sort);
			internalExamsService.updateDuolingoBlankSort(sto);
		}
	}
}