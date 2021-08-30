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
import com.usher.dto.BatchDirectionDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.BatchScheduleDto;
import com.usher.service.BaseService;
import com.usher.service.BatchService;
import com.usher.util.SessionUtil;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BaseCountryController{
	@Autowired
	BaseService baseService; 
	
	@RequestMapping(value="/base/country.do")
	public String country(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "base/country";
	}
	
	@RequestMapping(value="/base/getBaseCountry1List.do")
	public @ResponseBody List<BaseCountryDto> getBaseCountry1List(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseCountry1List();
	}
	
	@RequestMapping(value="/base/getBaseCountry1.do")
	public @ResponseBody BaseCountryDto getBaseCountry1(HttpServletRequest request,
						BaseCountryDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseCountry1(dto);
	}
	
	@RequestMapping(value="/base/getBaseCountry2List.do")
	public @ResponseBody List<BaseCountryDto> getBaseCountry2List(HttpServletRequest request,
						BaseCountryDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseCountry2List(dto);
	}
	
	@RequestMapping(value="/base/getBaseCountry2.do")
	public @ResponseBody BaseCountryDto getBaseCountry2(HttpServletRequest request,
						BaseCountryDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseCountry2(dto);
	}
	
	@RequestMapping(value="/base/insertBaseCountry1.do")
	public @ResponseBody void insertBaseCountry1(HttpServletRequest request,
						BaseCountryDto dto,
						ModelMap modelMap) throws Exception {
		
		baseService.insertBaseCountry1(dto);
	}
	
	@RequestMapping(value="/base/updateBaseCountry1.do")
	public @ResponseBody void updateBaseCountry1(HttpServletRequest request,
						BaseCountryDto dto,
						ModelMap modelMap) throws Exception {
		
		BaseCountryDto baseCountry = baseService.getBaseCountry1(dto);
		dto.setOld_country1(baseCountry.getCountry1());
		dto.setOld_country2(baseCountry.getCountry2());
		baseService.updateBaseCountry1(dto);
		baseService.updateBaseCountry1AsBaseCountry2(dto);
		baseService.updateBaseCountry1AsUserSchool(dto);
	}
	
	@RequestMapping(value="/base/insertBaseCountry2.do")
	public @ResponseBody void insertBaseCountry2(HttpServletRequest request,
						BaseCountryDto dto,
						ModelMap modelMap) throws Exception {
		
		baseService.insertBaseCountry2(dto);
	}
	
	@RequestMapping(value="/base/updateBaseCountry2.do")
	public @ResponseBody void updateBaseCountry2(HttpServletRequest request,
						BaseCountryDto dto,
						ModelMap modelMap) throws Exception {
		
		BaseCountryDto baseCountry = baseService.getBaseCountry2(dto);
		dto.setOld_country1(baseCountry.getCountry1());
		dto.setOld_country2(baseCountry.getCountry2());
		baseService.updateBaseCountry2(dto);
		baseService.updateBaseCountry2AsUserSchool(dto);
	}
}