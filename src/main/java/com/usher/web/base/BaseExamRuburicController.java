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
import com.usher.dto.BatchDirectionDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.BatchScheduleDto;
import com.usher.service.BaseService;
import com.usher.service.BatchService;
import com.usher.util.SessionUtil;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BaseExamRuburicController{
	@Autowired
	BaseService baseService; 
	
	@RequestMapping(value="/base/exam_ruburic.do")
	public String country(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "base/exam_ruburic";
	}
	
	@RequestMapping(value="/base/getBaseExamRuburicList.do")
	public @ResponseBody List<BaseExamRuburicDto> getBaseExamRuburicList(HttpServletRequest request, BaseExamRuburicDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseExamRuburicList(dto);
	}
	
	@RequestMapping(value="/base/getBaseExamRuburic.do")
	public @ResponseBody BaseExamRuburicDto getBaseExamRuburic(HttpServletRequest request,
						BaseExamRuburicDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseExamRuburic(dto);
	}
	
	@RequestMapping(value="/base/insertBaseExamRuburic.do")
	public @ResponseBody void insertBaseExamRuburic(HttpServletRequest request,
						BaseExamRuburicDto dto,
						ModelMap modelMap) throws Exception {
		
		baseService.insertBaseExamRuburic(dto);
	}
	
	@RequestMapping(value="/base/updateBaseExamRuburic.do")
	public @ResponseBody void updateBaseExamRuburic(HttpServletRequest request,
						BaseExamRuburicDto dto,
						ModelMap modelMap) throws Exception {
		
		baseService.updateBaseExamRuburic(dto);
	}
	
	@RequestMapping(value="/base/deleteBaseExamRuburic.do")
	public @ResponseBody void deleteBaseExamRuburic(HttpServletRequest request,
						BaseExamRuburicDto dto,
						ModelMap modelMap) throws Exception {
		
		baseService.deleteBaseExamRuburic(dto);
	}
	
}