package com.usher.web.base;

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
import com.usher.dto.BaseCountryDto;
import com.usher.dto.BaseExamRuburicDto;
import com.usher.dto.BaseExamRuburicStandardDto;
import com.usher.dto.BatchDirectionDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.BatchScheduleDto;
import com.usher.service.BaseService;
import com.usher.service.BatchService;
import com.usher.util.SessionUtil;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BaseExamRuburicStandardController{
	@Autowired
	BaseService baseService; 
	
	@RequestMapping(value="/base/exam_ruburic_standard.do")
	public String exam_ruburic_standard(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "base/exam_ruburic_standard";
	}
	
	@RequestMapping(value="/base/getBaseExamRuburicStandardList.do")
	public @ResponseBody List<BaseExamRuburicStandardDto> getBaseExamRuburicStandardList(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseExamRuburicStandardList();
	}
	
	@RequestMapping(value="/base/getBaseExamRuburicStandard.do")
	public @ResponseBody BaseExamRuburicStandardDto getBaseExamRuburic(HttpServletRequest request,
						BaseExamRuburicStandardDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseExamRuburicStandard(dto);
	}
	
	@RequestMapping(value="/base/insertBaseExamRuburicStandard.do")
	public @ResponseBody void insertBaseExamRuburicStandard(HttpServletRequest request,
						BaseExamRuburicStandardDto dto,
						ModelMap modelMap) throws Exception {
		
		baseService.insertBaseExamRuburicStandard(dto);
	}
}