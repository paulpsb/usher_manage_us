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
public class BatchConsultationScheduleListController{
	@Autowired
	BatchService batchService; 
	
	@RequestMapping(value="/batch/consultation_schedule_list.do")
	public String consultation_schedule_list(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "batch/consultation_schedule_list";
	}
	
	@RequestMapping(value="/batch/getBatchStatsScheduleList.do")
	public @ResponseBody Map getBatchStatsScheduleList(HttpServletRequest request, BatchStatsDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		
		List<BatchStatsDto> resultList = batchService.getBatchStatsResultList(dto);
		List<BatchStatsDto> prepareList = batchService.getBatchStatsPrepareList(dto);
		
		resultMap.put("resultList", resultList);
		resultMap.put("prepareList", prepareList);
		return resultMap;
	}
	
	@RequestMapping(value="/batch/getBatchStatsAdviserCountList.do")
	public @ResponseBody List<BatchStatsDto> getBatchStatsAdviserCountList(HttpServletRequest request, BatchStatsDto dto) throws Exception {
		
		return batchService.getBatchStatsAdviserCountList(dto);
	}
}