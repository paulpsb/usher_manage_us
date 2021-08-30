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
import com.usher.dto.BaseCoursegroupTimescheduleDto;
import com.usher.dto.BaseExamRuburicDto;
import com.usher.dto.BatchDirectionDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.BatchScheduleDto;
import com.usher.service.BaseService;
import com.usher.service.BatchService;
import com.usher.util.SessionUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BaseCoursegroupTimescheduleController{
	@Autowired
	BaseService baseService; 
	
	@RequestMapping(value="/base/coursegroup_timeschedule.do")
	public String country(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "base/coursegroup_timeschedule";
	}
	
	@RequestMapping(value="/base/getBaseCoursegroupTimescheduleList.do")
	public @ResponseBody List<BaseCoursegroupTimescheduleDto> getBaseCoursegroupTimescheduleList(HttpServletRequest request, BaseCoursegroupTimescheduleDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseCoursegroupTimescheduleList(dto);
	}
	
	
	@RequestMapping(value="/base/saveBaseCoursegroupTimeschedule.do")
	public @ResponseBody void deleteBaseExamRuburic(HttpServletRequest request,
			BaseCoursegroupTimescheduleDto dto,
						ModelMap modelMap) throws Exception {
		
		baseService.deleteBaseCoursegroupTimeschedule(dto);
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			
			BaseCoursegroupTimescheduleDto sto = new BaseCoursegroupTimescheduleDto();
			sto.setTest_type(dto.getTest_type());
			sto.setStudent_type(dto.getStudent_type());
			sto.setLecture_type(dto.getLecture_type());
			sto.setStart_time(jsonObj.get("start_time").toString());
			sto.setEnd_time(jsonObj.get("end_time").toString());
			
			baseService.insertBaseCoursegroupTimeschedule(sto);
		}
	}
	
}