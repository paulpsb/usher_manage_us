package com.usher.web.stats;

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

import com.usher.dto.PracticesPracticebookDto;
import com.usher.dto.StatsSchoolDto;
import com.usher.service.StatsService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class SchoolStatsController{
	@Autowired
	StatsService statsService; 
	
	@RequestMapping(value="/stats/school.do")
	public String school(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "stats/school";
	}
	
	@RequestMapping(value="/stats/getStatsBatchSchoolAllList.do")
	public @ResponseBody Map getStatsBatchSchoolAllList(HttpServletRequest request,
						StatsSchoolDto dto,
						ModelMap modelMap) throws Exception {
		Map resultMap = new HashMap();

		dto.setForeign_gubun("국내");
		List<StatsSchoolDto> domesticArea1List = statsService.getStatsBatchSchoolArea1List(dto);
		resultMap.put("domesticArea1List", domesticArea1List);
		
		if(domesticArea1List.size() > 0) {
			dto.setArea1(domesticArea1List.get(0).getArea1());
		}
		List<StatsSchoolDto> domesticArea2List = statsService.getStatsBatchSchoolArea2List(dto);
		resultMap.put("domesticArea2List", domesticArea2List);
		
		if(domesticArea2List.size() > 0) {
			dto.setArea2(domesticArea2List.get(0).getArea2());
		}
		List<StatsSchoolDto> domesticSchoolList = statsService.getStatsBatchSchoolSchoolsList(dto);
		resultMap.put("domesticSchoolList", domesticSchoolList);
		
		dto.setForeign_gubun("해외");
		List<StatsSchoolDto> foreginArea1List = statsService.getStatsBatchSchoolArea1List(dto);
		resultMap.put("foreginArea1List", foreginArea1List);

		if(foreginArea1List.size() > 0) {
			dto.setArea1(foreginArea1List.get(0).getArea1());
		}
		List<StatsSchoolDto> foreginArea2List = statsService.getStatsBatchSchoolArea2List(dto);
		resultMap.put("foreginArea2List", foreginArea2List);
		
		if(foreginArea2List.size() > 0) {
			dto.setArea2(foreginArea2List.get(0).getArea2());
		}
		List<StatsSchoolDto> foreginSchoolList = statsService.getStatsBatchSchoolSchoolsList(dto);
		resultMap.put("foreginSchoolList", foreginSchoolList);
		
		return resultMap;
	}
	
	
	@RequestMapping(value="/stats/getStatsBatchSchoolArea1AllList.do")
	public @ResponseBody Map getStatsBatchSchoolArea1AllList(HttpServletRequest request,
						StatsSchoolDto dto,
						ModelMap modelMap) throws Exception {
		Map resultMap = new HashMap();
		
		List<StatsSchoolDto> area2List = statsService.getStatsBatchSchoolArea2List(dto);
		resultMap.put("area2List", area2List);
		
		if(area2List.size() > 0) {
			dto.setArea2(area2List.get(0).getArea2());
		}
		List<StatsSchoolDto> schoolList = statsService.getStatsBatchSchoolSchoolsList(dto);
		resultMap.put("schoolList", schoolList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/stats/getStatsBatchSchoolArea2AllList.do")
	public @ResponseBody Map getBatchStatsSchoolArea2AllList(HttpServletRequest request,
						StatsSchoolDto dto,
						ModelMap modelMap) throws Exception {
		Map resultMap = new HashMap();
		
		List<StatsSchoolDto> schoolList = statsService.getStatsBatchSchoolSchoolsList(dto);
		resultMap.put("schoolList", schoolList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/stats/getStatsSchoolAllList.do")
	public @ResponseBody Map getStatsSchoolAllList(HttpServletRequest request,
						StatsSchoolDto dto,
						ModelMap modelMap) throws Exception {
		Map resultMap = new HashMap();

		dto.setForeign_gubun("국내");
		List<StatsSchoolDto> domesticArea1List = statsService.getStatsSchoolArea1List(dto);
		resultMap.put("domesticArea1List", domesticArea1List);
		
		if(domesticArea1List.size() > 0) {
			dto.setArea1(domesticArea1List.get(0).getArea1());
		}
		List<StatsSchoolDto> domesticArea2List = statsService.getStatsSchoolArea2List(dto);
		resultMap.put("domesticArea2List", domesticArea2List);
		
		if(domesticArea2List.size() > 0) {
			dto.setArea2(domesticArea2List.get(0).getArea2());
		}
		List<StatsSchoolDto> domesticSchoolList = statsService.getStatsSchoolSchoolsList(dto);
		resultMap.put("domesticSchoolList", domesticSchoolList);
		
		dto.setForeign_gubun("해외");
		List<StatsSchoolDto> foreginArea1List = statsService.getStatsSchoolArea1List(dto);
		resultMap.put("foreginArea1List", foreginArea1List);

		if(foreginArea1List.size() > 0) {
			dto.setArea1(foreginArea1List.get(0).getArea1());
		}
		List<StatsSchoolDto> foreginArea2List = statsService.getStatsSchoolArea2List(dto);
		resultMap.put("foreginArea2List", foreginArea2List);
		
		if(foreginArea2List.size() > 0) {
			dto.setArea2(foreginArea2List.get(0).getArea2());
		}
		List<StatsSchoolDto> foreginSchoolList = statsService.getStatsSchoolSchoolsList(dto);
		resultMap.put("foreginSchoolList", foreginSchoolList);
		
		return resultMap;
	}
	
	
	@RequestMapping(value="/stats/getStatsSchoolArea1AllList.do")
	public @ResponseBody Map getStatsSchoolArea1AllList(HttpServletRequest request,
						StatsSchoolDto dto,
						ModelMap modelMap) throws Exception {
		Map resultMap = new HashMap();
		
		List<StatsSchoolDto> area2List = statsService.getStatsSchoolArea2List(dto);
		resultMap.put("area2List", area2List);
		
		if(area2List.size() > 0) {
			dto.setArea2(area2List.get(0).getArea2());
		}
		List<StatsSchoolDto> schoolList = statsService.getStatsSchoolSchoolsList(dto);
		resultMap.put("schoolList", schoolList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/stats/getStatsSchoolArea2AllList.do")
	public @ResponseBody Map getStatsSchoolArea2AllList(HttpServletRequest request,
						StatsSchoolDto dto,
						ModelMap modelMap) throws Exception {
		Map resultMap = new HashMap();
		
		List<StatsSchoolDto> schoolList = statsService.getStatsSchoolSchoolsList(dto);
		resultMap.put("schoolList", schoolList);
		
		return resultMap;
	}
	
	
	@RequestMapping(value="/stats/school_detail.do")
	public String school_detail(HttpServletRequest request,
						StatsSchoolDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		modelMap.addAttribute("schoolInfo", dto);
		return "stats/school_detail";
	}
	
	@RequestMapping(value="/stats/getStatsSchoolDetailList.do")
	public @ResponseBody List<StatsSchoolDto> getStatsSchoolDetailList(HttpServletRequest request,
						StatsSchoolDto dto,
						ModelMap modelMap) throws Exception {
		return statsService.getStatsSchoolDetailList(dto);
	}
	
	@RequestMapping(value="/stats/getStatsSchoolStudentList.do")
	public @ResponseBody List<StatsSchoolDto> getStatsSchoolStudentList(HttpServletRequest request,
						StatsSchoolDto dto,
						ModelMap modelMap) throws Exception {
		return statsService.getStatsSchoolStudentList(dto);
	}
	
	@RequestMapping(value="/stats/getStatsSchoolStudentInfo.do")
	public @ResponseBody StatsSchoolDto getStatsSchoolStudentInfo(HttpServletRequest request,
						StatsSchoolDto dto,
						ModelMap modelMap) throws Exception {
		return statsService.getStatsSchoolStudentInfo(dto);
	}
}