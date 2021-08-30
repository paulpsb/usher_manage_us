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
import com.usher.dto.AuthUserOrganizationDto;
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
public class AuthUserOrganizationController{
	@Autowired
	AuthService authService; 
	
	@RequestMapping(value="/base/auth_user_organization.do")
	public String auth_user_organization(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "base/auth_user_organization";
	}
	
	@RequestMapping(value="/base/getAuthOrganizationAllList.do")
	public @ResponseBody Map getAuthOrganizationAllList(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		Map resultMap = new HashMap();
		List<AuthOrganizationDto>  authOrganizationList = authService.getAuthOrganizationList();
		resultMap.put("authOrganizationList", authOrganizationList);
		
		List<AuthUserOrganizationDto> authUserOrganizationAllList = authService.getAuthUserOrganizationAllList();
		resultMap.put("authUserOrganizationAllList", authUserOrganizationAllList);
		
		return resultMap;
	}
	
	
	@RequestMapping(value="/base/getAuthUserOrganizationList.do")
	public @ResponseBody List<AuthUserOrganizationDto> getAuthUserOrganizationList(HttpServletRequest request,
						AuthUserOrganizationDto dto,
						ModelMap modelMap) throws Exception {
		
		return authService.getAuthUserOrganizationList(dto);
	}
	
	@RequestMapping(value="/base/insertAuthUserOrganization.do")
	public @ResponseBody void insertAuthUserOrganization(HttpServletRequest request,
						AuthUserOrganizationDto dto, 
						ModelMap modelMap) throws Exception {
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int organization_id = Integer.parseInt(jsonObj.get("organization_id").toString());
			int user_id         = Integer.parseInt(jsonObj.get("user_id").toString());
			String status       = jsonObj.get("status").toString();
			
			AuthUserOrganizationDto sto = new AuthUserOrganizationDto();
			sto.setStatus(status);
			sto.setOrganization_id(organization_id);
			sto.setUser_id(user_id);
			
			AuthUserOrganizationDto info = authService.getAuthUserOrganization(sto);
			if(info == null) {
				authService.insertAuthUserOrganization(sto);
			}
		}
		
	}
	
	@RequestMapping(value="/base/updateAuthUserOrganization.do")
	public @ResponseBody void updateAuthUserOrganization(HttpServletRequest request,
						AuthUserOrganizationDto dto, 
						ModelMap modelMap) throws Exception {
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int organization_id = Integer.parseInt(jsonObj.get("organization_id").toString());
			int user_id         = Integer.parseInt(jsonObj.get("user_id").toString());
			String status = jsonObj.get("status").toString();
			
			AuthUserOrganizationDto sto = new AuthUserOrganizationDto();
			sto.setStatus(status);
			sto.setOrganization_id(organization_id);
			sto.setUser_id(user_id);
			
			authService.updateAuthUserOrganization(sto);
		}
		
		
	}
	
	@RequestMapping(value="/base/deleteAuthUserOrganization.do")
	public @ResponseBody void deleteAuthUserOrganization(HttpServletRequest request,
						AuthUserOrganizationDto dto, 
						ModelMap modelMap) throws Exception {
		
		authService.deleteAuthUserOrganization(dto);
	}
}