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
import com.usher.dto.InternalExamsDuolingoDescribeDto;
import com.usher.dto.InternalExamsDuolingoDescribeQuestionDto;
import com.usher.service.InternalExamsService;

import com.usher.util.SessionUtil;


@Controller
public class ExamDuolingoDescribeController{
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/exam/duolingo_describe_list.do")
	public String duolingo_describe_list(HttpServletRequest request,
						InternalExamsDuolingoDescribeDto dto, 
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("describeInfo", dto);
		String url = "";
		
		url = "exam/duolingo_describe_list";
		return url;
	}
	
	@RequestMapping(value="/exam/getExamsDuolingoDescribeList.do")
	public @ResponseBody List<InternalExamsDuolingoDescribeDto>  getExamsDuolingoDescribeList(HttpServletRequest request,
					InternalExamsDuolingoDescribeDto dto, 
						ModelMap modelMap) throws Exception {
		return internalExamsService.getExamsDuolingoDescribeList(dto);
	}
	
	@RequestMapping(value="/exam/getExamsDuolingoDescribe.do")
	public @ResponseBody Map  getExamsDuolingoDescribe(HttpServletRequest request,
					InternalExamsDuolingoDescribeDto dto, 
						ModelMap modelMap) throws Exception {
		Map resultMap = new HashMap();
		
		InternalExamsDuolingoDescribeDto describeInfo = internalExamsService.getExamsDuolingoDescribe(dto);
		resultMap.put("describeInfo", describeInfo);
		
		InternalExamsDuolingoDescribeQuestionDto dto1 = new InternalExamsDuolingoDescribeQuestionDto();
		dto1.setDescribe_id(dto.getId());
		List<InternalExamsDuolingoDescribeQuestionDto> describeQuestionList = internalExamsService.getExamsDuolingoDescribeQuestionList(dto1);
		resultMap.put("describeQuestionList", describeQuestionList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/exam/insertExamsDuolingoDescribe.do")
	public @ResponseBody void insertExamsDuolingoDescribe(HttpServletRequest request, InternalExamsDuolingoDescribeDto dto) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		
		InternalExamsDuolingoDescribeDto sortInto = internalExamsService.getExamsDuolingoDescribeSort(dto);
		dto.setDescribe_sort(sortInto.getDescribe_sort());
		
		internalExamsService.insertDuolingoDescribe(dto);
		
		int describe_id = dto.getId();
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			String describe_question            = jsonObj.get("describe_question").toString();
			String describe_question_keyword    = jsonObj.get("describe_question_keyword").toString();
			int describe_question_score_keyword = Integer.parseInt(jsonObj.get("describe_question_score_keyword").toString());
			int describe_question_score_word    = Integer.parseInt(jsonObj.get("describe_question_score_word").toString());
			int describe_question_sort          = Integer.parseInt(jsonObj.get("describe_question_sort").toString());

			InternalExamsDuolingoDescribeQuestionDto sto = new InternalExamsDuolingoDescribeQuestionDto();
			sto.setCreated_id(userInfo.getUser_id());
			sto.setModified_id(userInfo.getUser_id());
			sto.setDescribe_id(describe_id);
			sto.setDescribe_question(describe_question);
			sto.setDescribe_question_keyword(describe_question_keyword);
			sto.setDescribe_question_score_keyword(describe_question_score_keyword);
			sto.setDescribe_question_score_word(describe_question_score_word);
			sto.setDescribe_question_sort(describe_question_sort);
			internalExamsService.insertDuolingoDescribeQuestion(sto);
		}
	}
	
	
	@RequestMapping(value="/exam/updateExamsDuolingoDescribe.do")
	public @ResponseBody void updateExamsDuolingoDescribe(HttpServletRequest request, InternalExamsDuolingoDescribeDto dto) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		
		internalExamsService.updateDuolingoDescribe(dto);
		internalExamsService.deleteDuolingoDescribeQuestionAll(dto);
		int describe_id = dto.getId();
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			String describe_question            = jsonObj.get("describe_question").toString();
			String describe_question_keyword    = jsonObj.get("describe_question_keyword").toString();
			int describe_question_score_keyword = Integer.parseInt(jsonObj.get("describe_question_score_keyword").toString());
			int describe_question_score_word    = Integer.parseInt(jsonObj.get("describe_question_score_word").toString());
			int describe_question_sort          = Integer.parseInt(jsonObj.get("describe_question_sort").toString());

			InternalExamsDuolingoDescribeQuestionDto sto = new InternalExamsDuolingoDescribeQuestionDto();
			sto.setCreated_id(userInfo.getUser_id());
			sto.setModified_id(userInfo.getUser_id());
			sto.setDescribe_id(describe_id);
			sto.setDescribe_question(describe_question);
			sto.setDescribe_question_keyword(describe_question_keyword);
			sto.setDescribe_question_score_keyword(describe_question_score_keyword);
			sto.setDescribe_question_score_word(describe_question_score_word);
			sto.setDescribe_question_sort(describe_question_sort);
			internalExamsService.insertDuolingoDescribeQuestion(sto);
		}
	}
	
	@RequestMapping(value="/exam/deleteExamsDuolingoDescribe.do")
	public @ResponseBody void deleteExamsDuolingoDescribe(HttpServletRequest request, InternalExamsDuolingoDescribeDto dto) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		internalExamsService.deleteDuolingoDescribe(dto);
		internalExamsService.deleteDuolingoDescribeQuestionAll(dto);
	}
	
	
	@RequestMapping(value="/exam/updateExamsDuolingoDescribeSort.do")
	public @ResponseBody void updateExamsDuolingoDescribeSort(HttpServletRequest request, InternalExamsDuolingoDescribeDto dto) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int describe_id      = Integer.parseInt(jsonObj.get("describe_id").toString());
			int describe_sort    = Integer.parseInt(jsonObj.get("describe_sort").toString());

			InternalExamsDuolingoDescribeDto sto = new InternalExamsDuolingoDescribeDto();
			sto.setCreated_id(userInfo.getUser_id());
			sto.setModified_id(userInfo.getUser_id());
			sto.setId(describe_id);
			sto.setDescribe_sort(describe_sort);
			internalExamsService.updateDuolingoDescribeSort(sto);
		}
	}
}