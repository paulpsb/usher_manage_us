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
import com.usher.dto.BatchScheduleDto;
import com.usher.dto.BatchExamGrammarDto;
import com.usher.dto.BatchExamReadingDto;
import com.usher.dto.BatchExamReadingQuestionDto;
import com.usher.service.BatchService;
import com.usher.util.SessionUtil;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BatchScheduleController{
	@Autowired
	BatchService batchService; 
	
	@RequestMapping(value="/batch/schedule.do")
	public String reading_exam(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "batch/schedule";
	}
	
	
	@RequestMapping(value="/batch/getBatchScheduleMonthlyList.do")
	public @ResponseBody List<BatchScheduleDto> getBatchScheduleMonthlyList(HttpServletRequest request,
						BatchScheduleDto dto, 
						ModelMap modelMap) throws Exception {
		
		return batchService.getBatchScheduleMonthlyList(dto);
	}

	
	@RequestMapping(value="/batch/getBatchSchedule.do")
	public @ResponseBody BatchScheduleDto getBatchSchedule(HttpServletRequest request,
						BatchScheduleDto dto, 
						ModelMap modelMap) throws Exception {
		
		return batchService.getBatchSchedule(dto);
	}

	
	@RequestMapping(value="/batch/saveBatchSchedule.do")
	public @ResponseBody void saveBatchSchedule(HttpServletRequest request,
						BatchScheduleDto dto, 
						ModelMap modelMap) throws Exception {
		
		if(dto.getId() > 0) {
			batchService.updateBatchSchedule(dto);
		}else {
			//나중엔 월별로 변경한다.
			/*
			dto.setBatch_grammar_type("DIAGNOSTIC");
			dto.setBatch_grammar_num(1);
			dto.setBatch_reading_type("TPO");
			dto.setBatch_reading_num(1);
			*/
			batchService.insertBatchSchedule(dto);
		}
	}
}

