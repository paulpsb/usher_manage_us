package com.usher.web.notice;

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

import com.usher.dto.BaseCoursegroupTimescheduleDto;
import com.usher.dto.NoticesRoutineDetailsDto;
import com.usher.dto.NoticesRoutineDto;
import com.usher.dto.NoticesRoutineTransOraganizationDetailDto;
import com.usher.dto.NoticesRoutineTransOraganizationDto;
import com.usher.service.BaseService;
import com.usher.service.NoticesService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class NoticeRoutineOraganizationController{
	@Autowired
	NoticesService noticesService; 
	
	@Autowired
	BaseService baseService; 
	
	@RequestMapping(value="/notice/routine_oraganization_daily.do")
	public String routine_oraganization_daily(HttpServletRequest request,
						NoticesRoutineTransOraganizationDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		modelMap.addAttribute("routineInfo", dto);
		
		return "notice/routine_oraganization_daily";
	}
	
	@RequestMapping(value="/notice/routine_oraganization_monthly.do")
	public String routine_oraganization_monthly(HttpServletRequest request,
						NoticesRoutineTransOraganizationDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		int routine_schedule = 20;
		dto.setRoutine_schedule(routine_schedule);
		dto.setRoutine_category("MONTHLY");
		
		NoticesRoutineTransOraganizationDto routineOraganizationInfo = noticesService.getRoutineTransOraganization(dto);
		if(routineOraganizationInfo == null) {
			noticesService.insertRoutineTransOraganization(dto);
		}
		
		modelMap.addAttribute("routineInfo", dto);
		
		return "notice/routine_oraganization_monthly";
	}

	@RequestMapping(value="/notice/routine_oraganization_monthly_day.do")
	public String routine_oraganization_monthly_day(HttpServletRequest request,
						NoticesRoutineTransOraganizationDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		modelMap.addAttribute("routineInfo", dto);
		
		return "notice/routine_oraganization_monthly_day";
	}
	
	@RequestMapping(value="/notice/routine_oraganization_yearly.do")
	public String routine_oraganization_yearly(HttpServletRequest request,
						NoticesRoutineTransOraganizationDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		modelMap.addAttribute("routineInfo", dto);
		
		return "notice/routine_oraganization_yearly";
	}
	
	@RequestMapping(value="/notice/getRoutineOraganizationList.do")
	public @ResponseBody Map getRoutine(HttpServletRequest request,
						NoticesRoutineTransOraganizationDto dto,
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		
		NoticesRoutineTransOraganizationDto routineOraganizationInfo = noticesService.getRoutineTransOraganization(dto);
		if(routineOraganizationInfo == null) {
			noticesService.insertRoutineTransOraganization(dto);
			routineOraganizationInfo = noticesService.getRoutineTransOraganization(dto);
		}
		resultMap.put("routineOraganizationInfo", routineOraganizationInfo);
		
		NoticesRoutineTransOraganizationDetailDto dto1 = new NoticesRoutineTransOraganizationDetailDto();
		dto1.setRoutine_trans_oraganization_id(routineOraganizationInfo.getId());
		List<NoticesRoutineTransOraganizationDetailDto> routineOraganizationDetailList = noticesService.getRoutineTransOraganizationDetailList(dto1);
		resultMap.put("routineOraganizationDetailList", routineOraganizationDetailList);
		
		NoticesRoutineDto dto2 = new NoticesRoutineDto();
		dto2.setRoutine_category(dto.getRoutine_category());
		dto2.setRoutine_type("ORGANIZATION");
		dto2.setRoutine_organization_id(dto.getRoutine_organization_id());
		List<NoticesRoutineDto> routineList = noticesService.getNoticesRoutineAsCategoryList(dto2);
		resultMap.put("routineList", routineList);
		
		BaseCoursegroupTimescheduleDto dto3 = new BaseCoursegroupTimescheduleDto();
		dto3.setTest_type("TOEFL");
		dto3.setStudent_type("SENIOR");
		dto3.setLecture_type("REGULAR");
		List<BaseCoursegroupTimescheduleDto> timescheduleList = baseService.getBaseCoursegroupTimescheduleList(dto3);
		resultMap.put("timescheduleList", timescheduleList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/notice/getRoutineTransOraganizationScheuleList.do")
	public @ResponseBody List<NoticesRoutineTransOraganizationDto> getRoutineTransOraganizationScheuleList(HttpServletRequest request,
						NoticesRoutineTransOraganizationDto dto,
						ModelMap modelMap) throws Exception {
		
		return noticesService.getRoutineTransOraganizationScheuleList(dto);
	}
	
	@RequestMapping(value="/notice/insertRoutineTransOraganization.do")
	public @ResponseBody void insertRoutineTransOraganization(HttpServletRequest request,
						NoticesRoutineTransOraganizationDto dto,
						ModelMap modelMap) throws Exception {
		
		NoticesRoutineTransOraganizationDto routineOraganizationInfo = noticesService.getRoutineTransOraganization(dto);
		if(routineOraganizationInfo == null) {
			noticesService.insertRoutineTransOraganization(dto);
		}
	}

	@RequestMapping(value="/notice/insertRoutineTransOraganizationDetail.do")
	public @ResponseBody NoticesRoutineTransOraganizationDetailDto insertRoutineTransOraganizationDetail(HttpServletRequest request,
						NoticesRoutineTransOraganizationDetailDto dto,
						ModelMap modelMap) throws Exception {
		
		
		noticesService.insertRoutineTransOraganizationDetail(dto);
		
		return dto;
	}
	
	@RequestMapping(value="/notice/deleteRoutineTransOraganizationDetail.do")
	public @ResponseBody void deleteRoutineTransOraganizationDetail(HttpServletRequest request,
						NoticesRoutineTransOraganizationDetailDto dto,
						ModelMap modelMap) throws Exception {
		
		
		noticesService.deleteRoutineTransOraganizationDetail(dto);
	}
}