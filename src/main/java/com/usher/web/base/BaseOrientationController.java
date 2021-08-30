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

import com.usher.dto.BaseOrientationDto;
import com.usher.dto.InternalExamsProblemDto;
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.service.BaseService;
import com.usher.service.InternalExamsService;
import com.usher.service.PracticesService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BaseOrientationController{
	@Autowired
	BaseService baseService; 
	
	@RequestMapping(value="/base/orientation.do")
	public String section(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "base/orientation";
	}
	
	@RequestMapping(value="/base/getOrientationList.do")
	public @ResponseBody List<BaseOrientationDto> getOrientationList(HttpServletRequest request,BaseOrientationDto dto,
						ModelMap modelMap) throws Exception {
		return baseService.getBaseOrientationList(dto);
	}
	
	@RequestMapping(value="/base/saveOrientation.do")
	public @ResponseBody void saveOrientation(HttpServletRequest request,
						BaseOrientationDto dto,
						ModelMap modelMap) throws Exception {
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int orientation_id = Integer.parseInt(jsonObj.get("orientation_id").toString());
			String orientation_code = jsonObj.get("orientation_code").toString();
			String orientation_name = jsonObj.get("orientation_name").toString();
			int orientation_sort = Integer.parseInt(jsonObj.get("orientation_sort").toString());
			String senior_institute = jsonObj.get("senior_institute").toString();
			String senior_chamgang = jsonObj.get("senior_chamgang").toString();
			String junior_institute = jsonObj.get("junior_institute").toString();
			String junior_chamgang = jsonObj.get("junior_chamgang").toString();
			String junior_special_institute = jsonObj.get("junior_special_institute").toString();
			String junior_special_chamgang = jsonObj.get("junior_special_chamgang").toString();
			String orientation_gubun  = jsonObj.get("orientation_gubun").toString();
			String orientation_video_time  = jsonObj.get("orientation_video_time").toString();
			String use_yn = jsonObj.get("use_yn").toString();
			
			BaseOrientationDto dto1 = new BaseOrientationDto();
			dto1.setId(orientation_id);
			dto1.setOrientation_code(orientation_code);
			dto1.setOrientation_name(orientation_name);
			dto1.setOrientation_sort(orientation_sort);
			dto1.setSenior_institute(senior_institute);
			dto1.setSenior_chamgang(senior_chamgang);
			dto1.setJunior_institute(junior_institute);
			dto1.setJunior_chamgang(junior_chamgang);
			dto1.setJunior_special_institute(junior_special_institute);
			dto1.setJunior_special_chamgang(junior_special_chamgang);
			dto1.setOrientation_gubun(orientation_gubun);
			dto1.setOrientation_video_time(orientation_video_time);
			dto1.setUse_yn(use_yn);
			if(orientation_id > 0) {
				baseService.updateBaseOrientation(dto1);
			}else {
				baseService.insertBaseOrientation(dto1);
			}
		}
	}

}