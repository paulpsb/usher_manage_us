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
import com.usher.dto.NoticesRoutineTransCoursegroupDetailDto;
import com.usher.dto.NoticesRoutineTransCoursegroupDto;
import com.usher.service.BaseService;
import com.usher.service.NoticesService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class NoticeRoutineCourseGroupController{
	@Autowired
	NoticesService noticesService; 
	
	@Autowired
	BaseService baseService; 
	
	@RequestMapping(value="/notice/routine_coursegroup_daily.do")
	public String routine_coursegroup_daily(HttpServletRequest request,
						NoticesRoutineTransCoursegroupDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		modelMap.addAttribute("routineInfo", dto);
		
		return "notice/routine_coursegroup_daily";
	}
	
	@RequestMapping(value="/notice/routine_coursegroup_monthly.do")
	public String routine_coursegroup_monthly(HttpServletRequest request,
						NoticesRoutineTransCoursegroupDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		int routine_schedule = 20;
		String test_type = dto.getTest_type();
		String student_type = dto.getStudent_type();
		String lecture_type = dto.getLecture_type();
		
		if(test_type.equals("TOEFL")) {
			if(student_type.equals("JUNIOR")) {
				if(lecture_type.equals("SPECIAL")) {
					routine_schedule = 15;
				}else {
					routine_schedule = 8;
				}
			}
		}
		if(dto.getRoutine_day() > 0 ) routine_schedule = dto.getRoutine_day();
		
		dto.setRoutine_schedule(routine_schedule);
		dto.setRoutine_category("MONTHLY");
		
		NoticesRoutineTransCoursegroupDto routineCoursegroupInfo = noticesService.getRoutineTransCoursegroup(dto);
		if(routineCoursegroupInfo == null) {
			noticesService.insertRoutineTransCoursegroup(dto);
		}
		
		modelMap.addAttribute("routineInfo", dto);
		
		return "notice/routine_coursegroup_monthly";
	}

	@RequestMapping(value="/notice/routine_coursegroup_monthly_day.do")
	public String routine_coursegroup_monthly_day(HttpServletRequest request,
						NoticesRoutineTransCoursegroupDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		modelMap.addAttribute("routineInfo", dto);
		
		return "notice/routine_coursegroup_monthly_day";
	}
	
	@RequestMapping(value="/notice/routine_coursegroup_yearly.do")
	public String routine_coursegroup_yearly(HttpServletRequest request,
						NoticesRoutineTransCoursegroupDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		modelMap.addAttribute("routineInfo", dto);
		
		return "notice/routine_coursegroup_yearly";
	}
	
	@RequestMapping(value="/notice/getRoutineCourseGroupList.do")
	public @ResponseBody Map getRoutine(HttpServletRequest request,
						NoticesRoutineTransCoursegroupDto dto,
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		
		NoticesRoutineTransCoursegroupDto routineCoursegroupInfo = noticesService.getRoutineTransCoursegroup(dto);
		if(routineCoursegroupInfo == null) {
			noticesService.insertRoutineTransCoursegroup(dto);
			routineCoursegroupInfo = noticesService.getRoutineTransCoursegroup(dto);
		}
		resultMap.put("routineCoursegroupInfo", routineCoursegroupInfo);
		
		NoticesRoutineTransCoursegroupDetailDto dto1 = new NoticesRoutineTransCoursegroupDetailDto();
		dto1.setRoutine_trans_coursegroup_id(routineCoursegroupInfo.getId());
		List<NoticesRoutineTransCoursegroupDetailDto> routineCoursegroupDetailList = noticesService.getRoutineTransCoursegroupDetailList(dto1);
		resultMap.put("routineCoursegroupDetailList", routineCoursegroupDetailList);
		
		NoticesRoutineDto dto2 = new NoticesRoutineDto();
		dto2.setRoutine_category(dto.getRoutine_category());
		dto2.setRoutine_type("CLASS");
		dto2.setRoutine_organization_id(0);
		List<NoticesRoutineDto> routineList = noticesService.getNoticesRoutineAsCategoryList(dto2);
		resultMap.put("routineList", routineList);
		
		BaseCoursegroupTimescheduleDto dto3 = new BaseCoursegroupTimescheduleDto();
		dto3.setTest_type(dto.getTest_type());
		dto3.setStudent_type(dto.getStudent_type());
		dto3.setLecture_type(dto.getLecture_type());
		List<BaseCoursegroupTimescheduleDto> timescheduleList = baseService.getBaseCoursegroupTimescheduleList(dto3);
		resultMap.put("timescheduleList", timescheduleList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/notice/getRoutineTransCoursegroupScheuleList.do")
	public @ResponseBody List<NoticesRoutineTransCoursegroupDto> getRoutineTransCoursegroupScheuleList(HttpServletRequest request,
						NoticesRoutineTransCoursegroupDto dto,
						ModelMap modelMap) throws Exception {
		
		return noticesService.getRoutineTransCoursegroupScheuleList(dto);
	}
	
	@RequestMapping(value="/notice/insertRoutineTransCoursegroup.do")
	public @ResponseBody void insertRoutineTransCoursegroup(HttpServletRequest request,
						NoticesRoutineTransCoursegroupDto dto,
						ModelMap modelMap) throws Exception {
		
		NoticesRoutineTransCoursegroupDto routineCoursegroupInfo = noticesService.getRoutineTransCoursegroup(dto);
		if(routineCoursegroupInfo == null) {
			noticesService.insertRoutineTransCoursegroup(dto);
		}
	}

	@RequestMapping(value="/notice/insertRoutineTransCoursegroupDetail.do")
	public @ResponseBody NoticesRoutineTransCoursegroupDetailDto insertRoutineTransCoursegroupDetail(HttpServletRequest request,
						NoticesRoutineTransCoursegroupDetailDto dto,
						ModelMap modelMap) throws Exception {
		
		
		noticesService.insertRoutineTransCoursegroupDetail(dto);
		
		return dto;
	}
	
	@RequestMapping(value="/notice/deleteRoutineTransCoursegroupDetail.do")
	public @ResponseBody void deleteRoutineTransCoursegroupDetail(HttpServletRequest request,
						NoticesRoutineTransCoursegroupDetailDto dto,
						ModelMap modelMap) throws Exception {
		
		
		noticesService.deleteRoutineTransCoursegroupDetail(dto);
	}
}