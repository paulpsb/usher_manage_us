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
public class BaseSchoolController{
	@Autowired
	BaseService baseService; 
	
	@RequestMapping(value="/base/school.do")
	public String country(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "base/school";
	}
	
	@RequestMapping(value="/base/getBaseSchoolList.do")
	public @ResponseBody Map getBaseSchoolList(HttpServletRequest request,
						BaseSchoolDto dto,
						ModelMap modelMap) throws Exception {
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);
		
		BaseSchoolDto schoolCount = baseService.getBaseSchoolCount(dto);
		List<BaseSchoolDto> schoolList = baseService.getBaseSchoolList(dto);
		resultMap.put("schoolCount", schoolCount);
		resultMap.put("schoolList", schoolList);
		return resultMap;
	}
	
	@RequestMapping(value="/base/getBaseSchool.do")
	public @ResponseBody BaseSchoolDto getBaseSchool(HttpServletRequest request,
						BaseSchoolDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseSchool(dto);
	}
	
	@RequestMapping(value="/base/insertBaseSchool.do")
	public @ResponseBody void insertBaseSchool(HttpServletRequest request,
						BaseSchoolDto dto,
						ModelMap modelMap) throws Exception {
		
		baseService.insertBaseSchool(dto);
	}
	
	@RequestMapping(value="/base/updateBaseSchool.do")
	public @ResponseBody void updateBaseSchool(HttpServletRequest request,
						BaseSchoolDto dto,
						ModelMap modelMap) throws Exception {
		
		BaseSchoolDto baseSchool = baseService.getBaseSchool(dto);
		
		String old_school_name = "";
		if(baseSchool.getSchool_foreign_gubun().equals("국내")) {
			old_school_name = baseSchool.getSchool_name_kr();
		}else {
			if(StringUtil.nvl(baseSchool.getSchool_name_en()).equals("")) {
				old_school_name = baseSchool.getSchool_name_kr();
			}else {
				old_school_name = baseSchool.getSchool_name_en();
			}
		}
		
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
		dto.setOld_school_foreign_gubun(baseSchool.getSchool_foreign_gubun());
		dto.setOld_school_gubun(baseSchool.getSchool_gubun());
		dto.setOld_school_area1(baseSchool.getSchool_area1());
		dto.setOld_school_area2(baseSchool.getSchool_area2());
		dto.setOld_school_name(old_school_name);

		baseService.updateBaseSchool(dto);
		baseService.updateBaseSchoolAsUserSchool(dto);
	}
}