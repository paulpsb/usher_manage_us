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
import com.usher.dto.BaseAreaDto;
import com.usher.dto.BatchDirectionDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.BatchScheduleDto;
import com.usher.service.BaseService;
import com.usher.service.BatchService;
import com.usher.util.SessionUtil;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BaseAreaController{
	@Autowired
	BaseService baseService; 
	
	@RequestMapping(value="/base/area.do")
	public String area(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "base/area";
	}
	
	@RequestMapping(value="/base/getBaseArea1List.do")
	public @ResponseBody List<BaseAreaDto> getBaseArea1List(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseArea1List();
	}
	
	@RequestMapping(value="/base/getBaseArea1.do")
	public @ResponseBody BaseAreaDto getBaseArea1(HttpServletRequest request,
						BaseAreaDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseArea1(dto);
	}
	
	@RequestMapping(value="/base/getBaseArea2List.do")
	public @ResponseBody List<BaseAreaDto> getBaseArea2List(HttpServletRequest request,
						BaseAreaDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseArea2List(dto);
	}
	
	@RequestMapping(value="/base/getBaseArea2.do")
	public @ResponseBody BaseAreaDto getBaseArea2(HttpServletRequest request,
						BaseAreaDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseArea2(dto);
	}
	
	@RequestMapping(value="/base/insertBaseArea1.do")
	public @ResponseBody void insertBaseArea1(HttpServletRequest request,
						BaseAreaDto dto,
						ModelMap modelMap) throws Exception {
		
		baseService.insertBaseArea1(dto);
	}
	
	@RequestMapping(value="/base/updateBaseArea1.do")
	public @ResponseBody void updateBaseArea1(HttpServletRequest request,
						BaseAreaDto dto,
						ModelMap modelMap) throws Exception {
		
		BaseAreaDto baseArea = baseService.getBaseArea1(dto);
		dto.setOld_area1(baseArea.getArea1());
		dto.setOld_area2(baseArea.getArea2());
		baseService.updateBaseArea1(dto);
		baseService.updateBaseArea1AsBaseArea2(dto);
		baseService.updateBaseArea1AsUserSchool(dto);
	}
	
	@RequestMapping(value="/base/insertBaseArea2.do")
	public @ResponseBody void insertBaseArea2(HttpServletRequest request,
						BaseAreaDto dto,
						ModelMap modelMap) throws Exception {
		
		baseService.insertBaseArea2(dto);
	}
	
	@RequestMapping(value="/base/updateBaseArea2.do")
	public @ResponseBody void updateBaseArea2(HttpServletRequest request,
						BaseAreaDto dto,
						ModelMap modelMap) throws Exception {
		
		BaseAreaDto baseArea = baseService.getBaseArea2(dto);
		dto.setOld_area1(baseArea.getArea1());
		dto.setOld_area2(baseArea.getArea2());
		baseService.updateBaseArea2(dto);
		baseService.updateBaseArea2AsUserSchool(dto);
	}
}