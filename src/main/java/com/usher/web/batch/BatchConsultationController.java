package com.usher.web.batch;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.dto.AuthUserDto;
import com.usher.dto.BatchDirectionDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.BatchScheduleDto;
import com.usher.service.BatchService;
import com.usher.util.SessionUtil;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BatchConsultationController{
	@Autowired
	BatchService batchService; 
	
	@RequestMapping(value="/batch/consultation.do")
	public String consultation(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "batch/consultation";
	}
	
	@RequestMapping(value="/batch/consultation_chanmgang.do")
	public String consultation_chanmgang(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "batch/consultation_chanmgang";
	}
	
	@RequestMapping(value="/batch/getBatchResultScheduleList.do")
	public @ResponseBody List<BatchScheduleDto> getBatchResultScheduleList(HttpServletRequest request,
						BatchScheduleDto dto,
						ModelMap modelMap) throws Exception {
		
		return batchService.getBatchScheduleAsDate(dto);
	}
	
	@RequestMapping(value="/batch/getBatchConsultation.do")
	public @ResponseBody Map getBatchConsultation(HttpServletRequest request,
						BatchResultDto dto,
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		
		List<BatchResultDto> countList = batchService.getBatchResultCountList(dto);
		List<BatchResultDto> resultList = batchService.getBatchResultList(dto);
		
		resultMap.put("countList", countList);
		resultMap.put("resultList", resultList);
		return resultMap;
	}
	
	
	@RequestMapping(value="/batch/getBatchResult.do")
	public @ResponseBody BatchResultDto getBatchResult(HttpServletRequest request,
						BatchResultDto dto,
						ModelMap modelMap) throws Exception {
		
		return batchService.getBatchResult(dto);
	}
	
	@RequestMapping(value="/batch/updateBatchScheduleAdvise.do")
	public @ResponseBody void updateBatchScheduleAdvise(HttpServletRequest request,
						BatchScheduleDto dto,
						ModelMap modelMap) throws Exception {
		
		batchService.updateBatchScheduleAdvise(dto);
	}
	
	@RequestMapping(value="/batch/updateBatchResultAdviserAdvice.do")
	public @ResponseBody void updateBatchResultAdviserAdvice(HttpServletRequest request,
						BatchResultDto dto,
						ModelMap modelMap) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setBatch_adviser_id(userInfo.getUser_id());
		dto.setBatch_adviser_advice_id(userInfo.getUser_id());
		batchService.updateBatchResultAdviserAdvice(dto);
	}
	
	@RequestMapping(value="/batch/updateBatchResultAdviserCourse.do")
	public @ResponseBody void updateBatchResultAdviserCourse(HttpServletRequest request,
						BatchResultDto dto,
						ModelMap modelMap) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setBatch_adviser_id(userInfo.getUser_id());
		dto.setBatch_adviser_courses_id(userInfo.getUser_id());
		batchService.updateBatchResultAdviserCourse(dto);
	}
	
	
	@RequestMapping(value="/batch/updateBatchResultAdviserRegister.do")
	public @ResponseBody void updateBatchResultAdviserRegister(HttpServletRequest request,
						BatchResultDto dto,
						ModelMap modelMap) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setBatch_adviser_id(userInfo.getUser_id());
		batchService.updateBatchResultAdviserRegister(dto);
	}
	
	@RequestMapping(value="/batch/updateBatchResultDeskRegister.do")
	public @ResponseBody void updateBatchResultDeskRegister(HttpServletRequest request,
						BatchResultDto dto,
						ModelMap modelMap) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setBatch_desk_id(userInfo.getUser_id());
		batchService.updateBatchResultDeskRegister(dto);
	}
	
	@RequestMapping(value="/batch/updateBatchResultFinallyNotRegister.do")
	public @ResponseBody void updateBatchResultFinallyNotRegister(HttpServletRequest request,
						BatchResultDto dto,
						ModelMap modelMap) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setBatch_desk_id(userInfo.getUser_id());
		batchService.updateBatchResultFinallyNotRegister(dto);
	}
	
	
}

