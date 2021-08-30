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

import com.usher.dto.AuthOrganizationDto;
import com.usher.dto.AuthUserDto;
import com.usher.dto.BaseAreaDto;
import com.usher.dto.BatchDirectionDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.BatchScheduleDto;
import com.usher.dto.BoardMemoirsDto;
import com.usher.service.AuthService;
import com.usher.service.BaseService;
import com.usher.service.BatchService;
import com.usher.util.SessionUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class AuthOrganizationController{
	@Autowired
	AuthService authService; 
	
	@RequestMapping(value="/base/auth_organization.do")
	public String auth_organization(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "base/auth_organization";
	}
	
	
	@RequestMapping(value="/base/getAuthOrganizationList.do")
	public @ResponseBody List<AuthOrganizationDto> getAuthOrganizationList(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		return authService.getAuthOrganizationList();
	}
	
	@RequestMapping(value="/base/getAuthOrganization.do")
	public @ResponseBody AuthOrganizationDto getAuthOrganization(HttpServletRequest request,
						AuthOrganizationDto dto, 
						ModelMap modelMap) throws Exception {
		
		return authService.getAuthOrganization(dto);
	}
	
	@RequestMapping(value="/base/insertAuthOrganization.do")
	public @ResponseBody void insertAuthOrganization(HttpServletRequest request,
						AuthOrganizationDto dto, 
						ModelMap modelMap) throws Exception {
		
		AuthOrganizationDto sortInfo = authService.getAuthOrganizationSort(dto);
		dto.setOrganization_sort(sortInfo.getOrganization_sort());
		authService.insertAuthOrganization(dto);
	}
	
	@RequestMapping(value="/base/updateAuthOrganization.do")
	public @ResponseBody void updateAuthOrganization(HttpServletRequest request,
						AuthOrganizationDto dto, 
						ModelMap modelMap) throws Exception {
		
		authService.updateAuthOrganization(dto);
	}
	
	@RequestMapping(value="/base/deleteAuthOrganization.do")
	public @ResponseBody String deleteAuthOrganization(HttpServletRequest request,
						AuthOrganizationDto dto, 
						ModelMap modelMap) throws Exception {
		
		AuthOrganizationDto organizaionInfo = authService.getAuthOrganization(dto);
		if(organizaionInfo.getOrganization_down_count() > 0) {
			return "NO";
		}
		
		authService.deleteAuthOrganization(dto);
		return "OK";
	}
}