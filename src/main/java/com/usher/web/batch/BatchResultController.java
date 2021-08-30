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
import com.usher.dto.BatchExamGrammarDto;
import com.usher.dto.BatchExamListeningDto;
import com.usher.dto.BatchExamListeningQuestionDto;
import com.usher.dto.BatchExamReadingDto;
import com.usher.dto.BatchExamReadingQuestionDto;
import com.usher.dto.BatchResultDto;
import com.usher.service.BatchService;
import com.usher.util.SessionUtil;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BatchResultController{
	@Autowired
	BatchService batchService; 
	
	@RequestMapping(value="/batch/course_result.do")
	public String course_result(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}

		String url = "batch/course_result";
		return url;
	}
	
	@RequestMapping(value="/batch/getBatchResultCourseGroupList.do")
	public @ResponseBody List<BatchResultDto> getBatchResult(HttpServletRequest request,
						BatchResultDto dto,
						ModelMap modelMap) throws Exception {
		
		return batchService.getBatchResultCourseGroupList(dto);
	}
}