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

import com.usher.dto.InternalExamsDictationDto;
import com.usher.service.InternalExamsService;

import com.usher.util.SessionUtil;


@Controller
public class ExamDictationController{
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/exam/dictation_list.do")
	public String dictation_list(HttpServletRequest request,
						InternalExamsDictationDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("dictationInfo", dto);
		String url = "";
		
		url = "exam/dictation_list";
		return url;
	}
	
	@RequestMapping(value="/exam/getDictationList.do")
	public @ResponseBody Map getDictationList(HttpServletRequest request,
						InternalExamsDictationDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);

		InternalExamsDictationDto dictationCount = internalExamsService.getDictationCount(dto);
		List<InternalExamsDictationDto> dictationList = internalExamsService.getDictationList(dto);
		resultMap.put("dictationCount", dictationCount);
		resultMap.put("dictationList", dictationList);

		return resultMap;
	}
	
	@RequestMapping(value="/exam/getDictation.do")
	public @ResponseBody InternalExamsDictationDto getDictation(HttpServletRequest request, InternalExamsDictationDto dto) throws Exception {
		return internalExamsService.getDictation(dto);
	}
	
	@RequestMapping(value="/exam/insertDictation.do")
	public @ResponseBody void insertDictation(HttpServletRequest request, InternalExamsDictationDto dto) throws Exception {
		internalExamsService.insertDictation(dto);
	}
	
	@RequestMapping(value="/exam/updateDictation.do")
	public @ResponseBody void updateDictation(HttpServletRequest request, InternalExamsDictationDto dto) throws Exception {
		internalExamsService.updateDictation(dto);
	}
	
	@RequestMapping(value="/exam/updateDictationContent.do")
	public @ResponseBody void updateDictationContent(HttpServletRequest request, InternalExamsDictationDto dto) throws Exception {
		internalExamsService.updateDictationContent(dto);
	}
	
	@RequestMapping(value="/exam/deleteDictation.do")
	public @ResponseBody void deleteDictation(HttpServletRequest request, InternalExamsDictationDto dto) throws Exception {
		internalExamsService.deleteDictation(dto);

	}
	
}