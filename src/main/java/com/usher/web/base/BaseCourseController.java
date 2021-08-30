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
import com.usher.dto.BaseCoursesCourseDto;
import com.usher.dto.BaseCoursesCoursegroupDto;
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
public class BaseCourseController{
	@Autowired
	BaseService baseService; 
	
	@RequestMapping(value="/base/course.do")
	public String course(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "base/course";
	}
	
	@RequestMapping(value="/base/getBaseCoursesCourseList.do")
	public @ResponseBody List<BaseCoursesCourseDto> getBaseCoursesCourseList(HttpServletRequest request, BaseCoursesCourseDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseCoursesCourseList(dto);
	}
	
	@RequestMapping(value="/base/getBaseCoursesCourse.do")
	public @ResponseBody BaseCoursesCourseDto getBaseCoursesCourse(HttpServletRequest request, BaseCoursesCourseDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseCoursesCourse(dto);
	}
	
	@RequestMapping(value="/base/saveBaseCoursesCourse.do")
	public @ResponseBody void insertBaseCoursesCourse(HttpServletRequest request,
						BaseCoursesCourseDto dto,
						ModelMap modelMap) throws Exception {
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			String flag = jsonObj.get("flag").toString();
			int base_course_group_id = Integer.parseInt(jsonObj.get("base_course_group_id").toString());
			int course_id = Integer.parseInt(jsonObj.get("course_id").toString());
			String course_name = jsonObj.get("course_name").toString();
			int difficulty = Integer.parseInt(jsonObj.get("difficulty").toString());
			int inner_difficulty = Integer.parseInt(jsonObj.get("inner_difficulty").toString());
			int lecture_code = Integer.parseInt(jsonObj.get("lecture_code").toString());
			String life_cycle = jsonObj.get("life_cycle").toString();
			
			BaseCoursesCourseDto sto = new BaseCoursesCourseDto();
			sto.setId(course_id);
			sto.setName(course_name);
			sto.setDifficulty(difficulty);
			sto.setInner_difficulty(inner_difficulty);
			sto.setLecture_code(lecture_code);
			sto.setBase_course_group_id(base_course_group_id);
			sto.setLife_cycle(life_cycle);
			
			if(flag.equals("I")) {
				baseService.insertBaseCoursesCourse(sto);
			}else if(flag.equals("U")) {
				baseService.updateBaseCoursesCourse(sto);
			}else if(flag.equals("D")) {
				baseService.deleteBaseCoursesCourse(sto);
			}
		}
	}
	
}