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
import com.usher.dto.BatchStatsDto;
import com.usher.service.BatchService;
import com.usher.util.SessionUtil;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BatchConsultationStatsController{
	@Autowired
	BatchService batchService; 
	
	@RequestMapping(value="/batch/consultation_stats_list.do")
	public String consultation(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "batch/consultation_stats_list";
	}
	
	@RequestMapping(value="/batch/consultation_stats_form.do")
	public String consultation_chanmgang(HttpServletRequest request, BatchStatsDto dto, ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		modelMap.addAttribute("statsInfo", dto);
		return "batch/consultation_stats_form";
	}
	
	@RequestMapping(value="/batch/getBatchStatsExamMonthList.do")
	public @ResponseBody List<BatchStatsDto> getBatchResultScheduleList(HttpServletRequest request) throws Exception {
		
		return batchService.getBatchStatsExamMonthList();
	}
	
	@RequestMapping(value="/batch/getBatchStatsMonthlyList.do")
	public @ResponseBody Map getBatchStatsMonthlyList(HttpServletRequest request, BatchStatsDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		
		List<BatchStatsDto> monthlyList = batchService.getBatchStatsMonthlyList(dto);
		List<BatchStatsDto> resultList = batchService.getBatchStatsList(dto);
		
		resultMap.put("monthlyList", monthlyList);
		resultMap.put("resultList", resultList);
		return resultMap;
	}
	
	@RequestMapping(value="/batch/getBatchStatsList.do")
	public @ResponseBody List<BatchStatsDto> getBatchStatsList(HttpServletRequest request, BatchStatsDto dto) throws Exception {
		
		return batchService.getBatchStatsList(dto);
	}
}