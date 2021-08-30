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
import com.usher.dto.BaseCoursesCoursePracticeDto;
import com.usher.dto.BaseCoursesCoursegroupDto;
import com.usher.dto.BatchDirectionDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.BatchScheduleDto;
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.dto.PracticesPracticesectiontypeDto;
import com.usher.service.BaseService;
import com.usher.service.BatchService;
import com.usher.service.PracticesService;
import com.usher.util.SessionUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BaseCoursePracticeController{
	@Autowired
	BaseService baseService; 
	
	@Autowired
	PracticesService practicesService; 
	
	@RequestMapping(value="/base/course_practice.do")
	public String course(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "base/course_practice";
	}
	
	@RequestMapping(value="/base/getBaseCoursesCourseAllList.do")
	public @ResponseBody List<BaseCoursesCourseDto> getBaseCoursesCourseAllList(HttpServletRequest request, BaseCoursesCourseDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseCoursesCourseAllList(dto);
	}
	
	@RequestMapping(value="/base/getBaseCoursesCourseAll.do")
	public @ResponseBody BaseCoursesCourseDto getBaseCoursesCourseAll(HttpServletRequest request, BaseCoursesCourseDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseCoursesCourseAll(dto);
	}
	
	@RequestMapping(value="/base/getBaseCoursesCoursePracticeList.do")
	public @ResponseBody Map getBaseCoursesCoursePracticeList(HttpServletRequest request, BaseCoursesCoursePracticeDto dto,
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		
		List<PracticesPracticesectionDto> sectionList = practicesService.getPracticeSectionList();
		resultMap.put("sectionList", sectionList);
		
		PracticesPracticesectiontypeDto dto1 = new PracticesPracticesectiontypeDto();
		dto1.setProgram_use("Y");
		List<PracticesPracticesectiontypeDto> practiceList = practicesService.getPracticeSectionTypeList(dto1);
		resultMap.put("practiceList", practiceList);
		
		
		
		List<BaseCoursesCoursePracticeDto>coursePracticeList =  baseService.getBaseCoursesCoursePracticeList(dto);
		resultMap.put("coursePracticeList", coursePracticeList);
		
		return resultMap;
	}

	@RequestMapping(value="/base/saveBaseCoursesCoursePractice.do")
	public @ResponseBody void saveBaseCoursesCoursePractice(HttpServletRequest request,
						BaseCoursesCoursePracticeDto dto,
						ModelMap modelMap) throws Exception {
		
		baseService.deleteBaseCoursesCoursePractice(dto);
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			String status = jsonObj.get("status").toString();
			String section = jsonObj.get("section").toString();
			String practice_type = jsonObj.get("practice_type").toString();
			
			BaseCoursesCoursePracticeDto sto = new BaseCoursesCoursePracticeDto();
			sto.setStatus(status);
			sto.setSection(section);
			sto.setPractice_type(practice_type);
			sto.setBase_course_id(dto.getBase_course_id());
			
			baseService.insertBaseCoursesCoursePractice(sto);
		}
	}
	
}