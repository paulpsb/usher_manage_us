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

import com.usher.dto.InternalExamsTypingDto;
import com.usher.service.InternalExamsService;

import com.usher.util.SessionUtil;


@Controller
public class ExamTypingController{
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/exam/typing_list.do")
	public String typing_list(HttpServletRequest request,
						InternalExamsTypingDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("typingInfo", dto);
		String url = "";
		
		url = "exam/typing_list";
		return url;
	}
	
	@RequestMapping(value="/exam/getTypingList.do")
	public @ResponseBody Map getTypingList(HttpServletRequest request,
						InternalExamsTypingDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);

		InternalExamsTypingDto typingCount = internalExamsService.getTypingCount(dto);
		List<InternalExamsTypingDto> typingList = internalExamsService.getTypingList(dto);
		resultMap.put("typingCount", typingCount);
		resultMap.put("typingList", typingList);

		return resultMap;
	}
	
	@RequestMapping(value="/exam/getTyping.do")
	public @ResponseBody InternalExamsTypingDto getTyping(HttpServletRequest request, InternalExamsTypingDto dto) throws Exception {
		return internalExamsService.getTyping(dto);
	}
	
	@RequestMapping(value="/exam/insertTyping.do")
	public @ResponseBody void insertTyping(HttpServletRequest request, InternalExamsTypingDto dto) throws Exception {
		internalExamsService.insertTyping(dto);
	}
	
	@RequestMapping(value="/exam/updateTyping.do")
	public @ResponseBody void updateTyping(HttpServletRequest request, InternalExamsTypingDto dto) throws Exception {
		internalExamsService.updateTyping(dto);
	}
	
	@RequestMapping(value="/exam/updateTypingContent.do")
	public @ResponseBody void updateTypingContent(HttpServletRequest request, InternalExamsTypingDto dto) throws Exception {
		internalExamsService.updateTypingContent(dto);
	}
	
	@RequestMapping(value="/exam/deleteTyping.do")
	public @ResponseBody void deleteTyping(HttpServletRequest request, InternalExamsTypingDto dto) throws Exception {
		internalExamsService.deleteTyping(dto);

	}
	
}