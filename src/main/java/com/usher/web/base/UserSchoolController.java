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
import com.usher.dto.BaseSchoolDto;
import com.usher.dto.BatchDirectionDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.BatchScheduleDto;
import com.usher.service.BaseService;
import com.usher.service.BatchService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class UserSchoolController{
	@Autowired
	BaseService baseService; 
	
	@RequestMapping(value="/base/user_school.do")
	public String user_school(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "base/user_school";
	}
	
	@RequestMapping(value="/base/getUserSchoolList.do")
	public @ResponseBody Map getUserSchoolList(HttpServletRequest request,
						BaseSchoolDto dto,
						ModelMap modelMap) throws Exception {
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);
		
		BaseSchoolDto schoolCount = baseService.getUserSchoolCount(dto);
		List<BaseSchoolDto> schoolList = baseService.getUserSchoolList(dto);
		resultMap.put("schoolCount", schoolCount);
		resultMap.put("schoolList", schoolList);
		return resultMap;
	}
	
	@RequestMapping(value="/base/getUserSchool.do")
	public @ResponseBody BaseSchoolDto getUserSchool(HttpServletRequest request,
						BaseSchoolDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getUserSchool(dto);
	}
	
	@RequestMapping(value="/base/getBaseSchoolMatchingList.do")
	public @ResponseBody List<BaseSchoolDto> getBaseSchoolMatchingList(HttpServletRequest request,
						BaseSchoolDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseSchoolMatchingList(dto);
	}
	
	@RequestMapping(value="/base/updateMatchingSchool.do")
	public @ResponseBody void updateMatchingSchool(HttpServletRequest request,
						BaseSchoolDto dto,
						ModelMap modelMap) throws Exception {
		
		BaseSchoolDto baseSchool = baseService.getBaseSchool(dto);
		String school_name = "";
		if(baseSchool.getSchool_foreign_gubun().equals("국내")) {
			school_name = baseSchool.getSchool_name_kr();
		}else {
			if(StringUtil.nvl(baseSchool.getSchool_name_en()).equals("")) {
				school_name = baseSchool.getSchool_name_kr();
			}else {
				school_name = baseSchool.getSchool_name_en();
			}
		}
		baseSchool.setSchool_name(school_name);
		baseSchool.setUser_school_id(dto.getUser_school_id());
		baseService.updateUserSchool(baseSchool);
	}
	
	@RequestMapping(value="/base/updateCreateSchool.do")
	public @ResponseBody void updateCreateSchool(HttpServletRequest request,
						BaseSchoolDto dto,
						ModelMap modelMap) throws Exception {
		
		String school_name = "";
		if(dto.getSchool_foreign_gubun().equals("국내")) {
			school_name = dto.getSchool_name_kr();
		}else {
			if(StringUtil.nvl(dto.getSchool_name_en()).equals("")) {
				school_name = dto.getSchool_name_kr();
			}else {
				school_name = dto.getSchool_name_en();
			}
		}
		dto.setSchool_name(school_name);
		
		baseService.insertBaseSchool(dto);
		baseService.updateUserSchool(dto);
	}
}