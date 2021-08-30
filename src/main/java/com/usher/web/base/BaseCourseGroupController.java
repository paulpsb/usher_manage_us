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
import com.usher.dto.BaseCoursesCoursegroupDto;
import com.usher.dto.BatchDirectionDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.BatchScheduleDto;
import com.usher.service.BaseService;
import com.usher.service.BatchService;
import com.usher.util.SessionUtil;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BaseCourseGroupController{
	@Autowired
	BaseService baseService; 
	
	@RequestMapping(value="/base/coursegroup.do")
	public String coursegroup(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "base/coursegroup";
	}
	
	@RequestMapping(value="/base/getBaseCoursesCoursegroupList.do")
	public @ResponseBody List<BaseCoursesCoursegroupDto> getBaseCoursesCoursegroupList(HttpServletRequest request, BaseCoursesCoursegroupDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseCoursesCoursegroupList(dto);
	}
	
	@RequestMapping(value="/base/getBaseCoursesCoursegroup.do")
	public @ResponseBody BaseCoursesCoursegroupDto getBaseCoursesCoursegroup(HttpServletRequest request, BaseCoursesCoursegroupDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseCoursesCoursegroup(dto);
	}
	
	@RequestMapping(value="/base/insertBaseCoursesCoursegroup.do")
	public @ResponseBody void insertBaseCoursesCoursegroup(HttpServletRequest request,
						BaseCoursesCoursegroupDto dto,
						ModelMap modelMap) throws Exception {
		baseService.insertBaseCoursesCoursegroup(dto);
	}
	
	@RequestMapping(value="/base/updateBaseCoursesCoursegroup.do")
	public @ResponseBody void updateBaseCoursesCoursegroup(HttpServletRequest request,
						BaseCoursesCoursegroupDto dto,
						ModelMap modelMap) throws Exception {
		baseService.updateBaseCoursesCoursegroup(dto);
	}
	
	@RequestMapping(value="/base/deleteBaseCoursesCoursegroup.do")
	public @ResponseBody void deleteBaseCoursesCoursegroup(HttpServletRequest request,
						BaseCoursesCoursegroupDto dto,
						ModelMap modelMap) throws Exception {
		baseService.deleteBaseCoursesCourseAll(dto);
		baseService.deleteBaseCoursesCoursegroup(dto);
	}
	
}