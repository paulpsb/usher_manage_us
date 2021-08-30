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
import com.usher.dto.NoticesRoutineTransCoursegroupMonthlyDto;
import com.usher.service.BaseService;
import com.usher.service.NoticesService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class NoticeRoutineCourseGroupMonthlyController{
	@Autowired
	NoticesService noticesService; 
	
	@Autowired
	BaseService baseService; 
	
	@RequestMapping(value="/notice/routine_coursegroup_schedule_monthly.do")
	public String routine_coursegroup_schedule_monthly(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "notice/routine_coursegroup_schedule_monthly";
	}
	
	@RequestMapping(value="/notice/getRoutineCourseGroupMonthlyList.do")
	public @ResponseBody Map getRoutineCourseGroupMonthlyList(HttpServletRequest request,
						NoticesRoutineTransCoursegroupMonthlyDto dto,
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		
		List<NoticesRoutineTransCoursegroupMonthlyDto> monthlyGroupList = noticesService.getNoticesRoutineTransCoursegroupMonthlyGroupList(dto);
		resultMap.put("monthlyGroupList", monthlyGroupList);
		
		List<NoticesRoutineTransCoursegroupMonthlyDto> monthlyList = noticesService.getNoticesRoutineTransCoursegroupMonthlyList(dto);
		resultMap.put("monthlyList", monthlyList);
		
		NoticesRoutineTransCoursegroupDto dto1 = new NoticesRoutineTransCoursegroupDto();
		dto1.setTest_type(dto.getTest_type());
		dto1.setStudent_type(dto.getStudent_type());
		dto1.setLecture_type(dto.getLecture_type());
		dto1.setRoutine_category("MONTHLY");
		List<NoticesRoutineTransCoursegroupDto> groupScheduleList =  noticesService.getRoutineTransCoursegroupScheuleList(dto1);
		resultMap.put("groupScheduleList", groupScheduleList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/notice/getNoticesRoutineTransCoursegroupMonthlyAsGroupList.do")
	public @ResponseBody List<NoticesRoutineTransCoursegroupMonthlyDto> getNoticesRoutineTransCoursegroupMonthlyAsGroupList(HttpServletRequest request,
						NoticesRoutineTransCoursegroupMonthlyDto dto,
						ModelMap modelMap) throws Exception {
		
		return noticesService.getNoticesRoutineTransCoursegroupMonthlyAsGroupList(dto);
	}
	
	@RequestMapping(value="/notice/saveNoticesRoutineTransCoursegroupMonthly.do")
	public @ResponseBody void saveNoticesRoutineTransCoursegroupMonthly(HttpServletRequest request,
						NoticesRoutineTransCoursegroupMonthlyDto dto,
						ModelMap modelMap) throws Exception {
		
		noticesService.deleteNoticesRoutineTransCoursegroupMonthly(dto);
		
		String test_type = dto.getTest_type();
		String student_type = dto.getStudent_type();
		String lecture_type = dto.getLecture_type();
		int routine_schedule = dto.getRoutine_schedule();
		int routine_course_group_schedule = dto.getRoutine_course_group_schedule();
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int routine_day = Integer.parseInt(jsonObj.get("routine_day").toString());
			int routine_start_day = Integer.parseInt(jsonObj.get("routine_start_day").toString());
			int routine_end_day = Integer.parseInt(jsonObj.get("routine_end_day").toString());
			
			NoticesRoutineTransCoursegroupMonthlyDto sto = new NoticesRoutineTransCoursegroupMonthlyDto();
			sto.setTest_type(test_type);
			sto.setStudent_type(student_type);
			sto.setLecture_type(lecture_type);
			sto.setRoutine_schedule(routine_schedule);
			sto.setRoutine_course_group_schedule(routine_course_group_schedule);
			sto.setRoutine_day(routine_day);
			sto.setRoutine_start_day(routine_start_day);
			sto.setRoutine_end_day(routine_end_day);
			
			noticesService.insertNoticesRoutineTransCoursegroupMonthly(sto);
		}
	}
	
	@RequestMapping(value="/notice/deleteNoticesRoutineTransCoursegroupMonthly.do")
	public @ResponseBody void deleteNoticesRoutineTransCoursegroupMonthly(HttpServletRequest request,
						NoticesRoutineTransCoursegroupMonthlyDto dto,
						ModelMap modelMap) throws Exception {
		
		noticesService.deleteNoticesRoutineTransCoursegroupMonthly(dto);
	}
}