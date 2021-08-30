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

import com.usher.dto.AuthUserDto;
import com.usher.dto.NoticesRoutineDetailsDto;
import com.usher.dto.NoticesRoutineDto;
import com.usher.service.NoticesService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class NoticeRoutineController{
	@Autowired
	NoticesService noticesService; 
	
	@RequestMapping(value="/notice/routine.do")
	public String routine(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "notice/routine";
	}
	
	@RequestMapping(value="/notice/getRoutineList.do")
	public @ResponseBody Map getRoutineList(HttpServletRequest request,
						NoticesRoutineDto dto,
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);
		NoticesRoutineDto routineCount = noticesService.getNoticesRoutineCount(dto);
		List<NoticesRoutineDto> routineList = noticesService.getNoticesRoutineList(dto);
		
		resultMap.put("routineCount", routineCount);
		resultMap.put("routineList", routineList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/notice/getRoutine.do")
	public @ResponseBody Map getRoutine(HttpServletRequest request,
						NoticesRoutineDto dto,
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		
		NoticesRoutineDto routineInfo = noticesService.getNoticesRoutine(dto);
		resultMap.put("routineInfo", routineInfo);
		
		NoticesRoutineDetailsDto dto1 = new NoticesRoutineDetailsDto();
		dto1.setRoutine_id(dto.getId());
		List<NoticesRoutineDetailsDto> routineDetailList = noticesService.getNoticesRoutineDetailsList(dto1);
		resultMap.put("routineDetailList", routineDetailList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/notice/saveRoutine.do")
	public @ResponseBody void saveRoutine(HttpServletRequest request,
						NoticesRoutineDto dto,
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		if(dto.getId() > 0) {
			noticesService.updateNoticesRoutine(dto);
		}else {
			noticesService.insertNoticesRoutine(dto);
		}
		
		int routine_id = dto.getId();
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int routine_detail_id = Integer.parseInt(jsonObj.get("routine_detail_id").toString());
			String routine_detail_title                = jsonObj.get("routine_detail_title").toString();
			String routine_detail_content              = jsonObj.get("routine_detail_content").toString();
			String routine_detail_reference_image      = jsonObj.get("routine_detail_reference_image").toString();
			String routine_detail_reference_image_name = jsonObj.get("routine_detail_reference_image_name").toString();
			String routine_detail_reference_url        = jsonObj.get("routine_detail_reference_url").toString();
			String routine_detail_reference_file       = jsonObj.get("routine_detail_reference_file").toString();
			String routine_detail_reference_file_name  = jsonObj.get("routine_detail_reference_file_name").toString();
			boolean routine_detail_report_image        = Boolean.parseBoolean(jsonObj.get("routine_detail_report_image").toString());
			boolean routine_detail_report_url          = Boolean.parseBoolean(jsonObj.get("routine_detail_report_url").toString());
			boolean routine_detail_report_ox           = Boolean.parseBoolean(jsonObj.get("routine_detail_report_ox").toString());
			boolean routine_detail_report_file         = Boolean.parseBoolean(jsonObj.get("routine_detail_report_file").toString());
			
			NoticesRoutineDetailsDto sto1 = new NoticesRoutineDetailsDto();
			sto1.setId(routine_detail_id);
			sto1.setRoutine_detail_title(routine_detail_title);
			sto1.setRoutine_detail_content(routine_detail_content);
			sto1.setRoutine_detail_reference_image(routine_detail_reference_image);
			sto1.setRoutine_detail_reference_image_name(routine_detail_reference_image_name);
			sto1.setRoutine_detail_reference_url(routine_detail_reference_url);
			sto1.setRoutine_detail_reference_file(routine_detail_reference_file);
			sto1.setRoutine_detail_reference_file_name(routine_detail_reference_file_name);
			sto1.setRoutine_detail_report_image(routine_detail_report_image);
			sto1.setRoutine_detail_report_url(routine_detail_report_url);
			sto1.setRoutine_detail_report_ox(routine_detail_report_ox);
			sto1.setRoutine_detail_report_file(routine_detail_report_file);
			sto1.setRoutine_id(routine_id);
			
			if(routine_detail_id > 0) {
				noticesService.updateNoticesRoutineDetails(sto1);
			}else {
				noticesService.insertNoticesRoutineDetails(sto1);
			}
		}
		
		NoticesRoutineDto dto1 = new NoticesRoutineDto();
		dto1.setId(routine_id);
		dto1.setLog_id(userInfo.getUser_id());
		noticesService.insertNoticesRoutineLog(dto1);
	}

	@RequestMapping(value="/notice/deleteRoutine.do")
	public @ResponseBody void deleteRoutine(HttpServletRequest request,
						NoticesRoutineDto dto,
						ModelMap modelMap) throws Exception {
		
		noticesService.deleteNoticesRoutine(dto);
	}

	@RequestMapping(value="/notice/deleteRoutineDetails.do")
	public @ResponseBody void deleteRoutineDetails(HttpServletRequest request,
						NoticesRoutineDetailsDto dto,
						ModelMap modelMap) throws Exception {
		
		noticesService.deleteNoticesRoutineDetails(dto);
	}
	
	
}