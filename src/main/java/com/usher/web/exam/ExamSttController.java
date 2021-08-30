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

import com.usher.dto.InternalExamsSttDto;
import com.usher.service.InternalExamsService;

import com.usher.util.SessionUtil;


@Controller
public class ExamSttController{
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/exam/stt_list.do")
	public String stt_list(HttpServletRequest request,
						InternalExamsSttDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("sttInfo", dto);
		String url = "";
		
		url = "exam/stt_list";
		return url;
	}
	
	@RequestMapping(value="/exam/getSttList.do")
	public @ResponseBody Map getSttList(HttpServletRequest request,
						InternalExamsSttDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);

		InternalExamsSttDto sttCount = internalExamsService.getSttCount(dto);
		List<InternalExamsSttDto> sttList = internalExamsService.getSttList(dto);
		resultMap.put("sttCount", sttCount);
		resultMap.put("sttList", sttList);

		return resultMap;
	}
	
	@RequestMapping(value="/exam/getStt.do")
	public @ResponseBody InternalExamsSttDto getStt(HttpServletRequest request, InternalExamsSttDto dto) throws Exception {
		return internalExamsService.getStt(dto);
	}
	
	@RequestMapping(value="/exam/insertStt.do")
	public @ResponseBody void insertStt(HttpServletRequest request, InternalExamsSttDto dto) throws Exception {
		internalExamsService.insertStt(dto);
	}
	
	@RequestMapping(value="/exam/updateStt.do")
	public @ResponseBody void updateStt(HttpServletRequest request, InternalExamsSttDto dto) throws Exception {
		internalExamsService.updateStt(dto);
	}
	
	@RequestMapping(value="/exam/deleteStt.do")
	public @ResponseBody void deleteStt(HttpServletRequest request, InternalExamsSttDto dto) throws Exception {
		internalExamsService.deleteStt(dto);

	}
	
}