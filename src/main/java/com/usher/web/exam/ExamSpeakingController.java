package com.usher.web.exam;

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
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.dto.AuthUserDto;
import com.usher.dto.InternalExamsSpeakingDto;
import com.usher.dto.InternalExamsPassageDto;
import com.usher.service.InternalExamsService;
import com.usher.util.ExcelUtil;
import com.usher.util.SessionUtil;


@Controller
public class ExamSpeakingController{
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/exam/speaking_list.do")
	public String passage_list(HttpServletRequest request,
						InternalExamsSpeakingDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("speakingInfo", dto);
		String url = "";
		
		url = "exam/speaking_list";
		return url;
	}
	
	@RequestMapping(value="/exam/getExamSpeakingList.do")
	public @ResponseBody Map getExamSpeakingList(HttpServletRequest request,
						InternalExamsSpeakingDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);

		InternalExamsSpeakingDto speakingCount = internalExamsService.getInternalExamsSpeakingCount(dto);
		List<InternalExamsSpeakingDto> speakingList = internalExamsService.getInternalExamsSpeakingList(dto);
		resultMap.put("speakingCount", speakingCount);
		resultMap.put("speakingList", speakingList);

		return resultMap;
	}
	
	@RequestMapping(value="/exam/selectExamSpeaking.do")
	public @ResponseBody InternalExamsSpeakingDto selectExamSpeaking(HttpServletRequest request, InternalExamsSpeakingDto dto) throws Exception {
		return internalExamsService.getInternalExamsSpeaking(dto);
	}
	
	@RequestMapping(value="/exam/excelExamSpeaking.do")
	public @ResponseBody void excelExamSpeaking(HttpServletRequest request, HttpServletResponse response, InternalExamsSpeakingDto dto) throws Exception {
		ExcelUtil ex = new ExcelUtil();
		List<InternalExamsSpeakingDto> speakingList = internalExamsService.getInternalExamsSpeakingExcelList(dto);
		ex.setList("speakingList", speakingList);
		
		ex.setExcelUrl("speaking.xlsx");
		
		ex.Export(request, response, "speaking.xlsx");
	}
	
	@RequestMapping(value="/exam/insertExamSpeaking.do")
	public @ResponseBody void insertExamSpeaking(HttpServletRequest request, InternalExamsSpeakingDto dto) throws Exception {
		internalExamsService.insertInternalExamsSpeaking(dto);
	}
	
	@RequestMapping(value="/exam/updateExamSpeaking.do")
	public @ResponseBody void updateExamSpeaking(HttpServletRequest request, InternalExamsSpeakingDto dto) throws Exception {
		internalExamsService.updateInternalExamsSpeaking(dto);
	}
	
	@RequestMapping(value="/exam/deleteExamSpeaking.do")
	public @ResponseBody void deleteExamSpeaking(HttpServletRequest request, InternalExamsSpeakingDto dto) throws Exception {
		internalExamsService.deleteInternalExamsSpeaking(dto);
	}
	

}