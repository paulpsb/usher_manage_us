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

import com.usher.dto.InternalExamsChainDto;
import com.usher.service.InternalExamsService;

import com.usher.util.SessionUtil;


@Controller
public class ExamChainController{
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/exam/chain_list.do")
	public String chain_list(HttpServletRequest request,
						InternalExamsChainDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("chainInfo", dto);
		String url = "";
		
		url = "exam/chain_list";
		return url;
	}
	
	@RequestMapping(value="/exam/getChainList.do")
	public @ResponseBody Map getChainList(HttpServletRequest request,
						InternalExamsChainDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);

		InternalExamsChainDto chainCount = internalExamsService.getChainCount(dto);
		List<InternalExamsChainDto> chainList = internalExamsService.getChainList(dto);
		resultMap.put("chainCount", chainCount);
		resultMap.put("chainList", chainList);

		return resultMap;
	}
	
	@RequestMapping(value="/exam/modify/chain_form.do")
	public String chain_form(HttpServletRequest request,
						InternalExamsChainDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("chainInfo", dto);
		String url = "";
		
		url = "exam/modify/chain_form";
		return url;
	}
	
	@RequestMapping(value="/exam/getChain.do")
	public @ResponseBody InternalExamsChainDto getChain(HttpServletRequest request, InternalExamsChainDto dto) throws Exception {
		return internalExamsService.getChain(dto);
	}
	
	@RequestMapping(value="/exam/insertChain.do")
	public @ResponseBody void insertChain(HttpServletRequest request, InternalExamsChainDto dto) throws Exception {
		internalExamsService.insertChain(dto);
	}
	
	@RequestMapping(value="/exam/updateChain.do")
	public @ResponseBody void updateChain(HttpServletRequest request, InternalExamsChainDto dto) throws Exception {
		internalExamsService.updateChain(dto);
	}
	
	@RequestMapping(value="/exam/updateChainContent.do")
	public @ResponseBody void updateChainContent(HttpServletRequest request, InternalExamsChainDto dto) throws Exception {
		internalExamsService.updateChainContent(dto);
	}
	
	@RequestMapping(value="/exam/updateChainAnswer.do")
	public @ResponseBody void updateChainAnswer(HttpServletRequest request, InternalExamsChainDto dto) throws Exception {
		internalExamsService.updateChainAnswer(dto);
	}

	@RequestMapping(value="/exam/deleteChain.do")
	public @ResponseBody void deleteChain(HttpServletRequest request, InternalExamsChainDto dto) throws Exception {
		internalExamsService.deleteChain(dto);

	}
	
}