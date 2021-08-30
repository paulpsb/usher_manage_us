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

import com.usher.dto.NoticesRoutineDetailsDto;
import com.usher.dto.NoticesRoutineDto;
import com.usher.dto.NoticesTaskCategoryDetailDto;
import com.usher.dto.NoticesTaskCategoryDto;
import com.usher.dto.NoticesTaskDetailDto;
import com.usher.service.NoticesService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class NoticeTaskManageController{
	@Autowired
	NoticesService noticesService; 
	
	@RequestMapping(value="/notice/task_manage.do")
	public String task_manage(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "notice/task_manage";
	}
	
	@RequestMapping(value="/notice/getNoticesTaskCategoryList.do")
	public @ResponseBody Map getNoticesTaskCategoryList(HttpServletRequest request,
						NoticesTaskCategoryDto dto,
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);
		NoticesTaskCategoryDto taskCategoryCount = noticesService.getNoticesTaskCategoryCount(dto);
		List<NoticesTaskCategoryDto> taskCategoryList = noticesService.getNoticesTaskCategoryList(dto);
		
		resultMap.put("taskCategoryCount", taskCategoryCount);
		resultMap.put("taskCategoryList", taskCategoryList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/notice/getNoticesTaskCategory.do")
	public @ResponseBody NoticesTaskCategoryDto getNoticesTaskCategory(HttpServletRequest request,
						NoticesTaskCategoryDto dto,
						ModelMap modelMap) throws Exception {
		
		return noticesService.getNoticesTaskCategory(dto);
	}
	
	@RequestMapping(value="/notice/getNoticesTaskCategoryDetailList.do")
	public @ResponseBody List<NoticesTaskCategoryDetailDto> getNoticesTaskCategoryDetailList(HttpServletRequest request,
						NoticesTaskCategoryDetailDto dto,
						ModelMap modelMap) throws Exception {
		
		return noticesService.getNoticesTaskCategoryDetailList(dto);
	}
	
	@RequestMapping(value="/notice/getNoticesTaskCategoryDetail.do")
	public @ResponseBody NoticesTaskCategoryDetailDto getNoticesTaskCategoryDetail(HttpServletRequest request,
						NoticesTaskCategoryDetailDto dto,
						ModelMap modelMap) throws Exception {
		
		return noticesService.getNoticesTaskCategoryDetail(dto);
	}
	
	@RequestMapping(value="/notice/insertNoticesTaskCategory.do")
	public @ResponseBody void insertNoticesTaskCategory(HttpServletRequest request,
						NoticesTaskCategoryDto dto,
						ModelMap modelMap) throws Exception {
		
		noticesService.insertNoticesTaskCategory(dto);
	}
	
	@RequestMapping(value="/notice/updateNoticesTaskCategory.do")
	public @ResponseBody void updateNoticesTaskCategory(HttpServletRequest request,
						NoticesTaskCategoryDto dto,
						ModelMap modelMap) throws Exception {
		
		noticesService.updateNoticesTaskCategory(dto);
	}
	
	@RequestMapping(value="/notice/deleteNoticesTaskCategory.do")
	public @ResponseBody void deleteNoticesTaskCategory(HttpServletRequest request,
						NoticesTaskCategoryDto dto,
						ModelMap modelMap) throws Exception {
		
		noticesService.deleteNoticesTaskCategory(dto);
	}
	
	
	@RequestMapping(value="/notice/insertNoticesTaskCategoryDetail.do")
	public @ResponseBody void insertNoticesTaskCategoryDetail(HttpServletRequest request,
						NoticesTaskCategoryDetailDto dto,
						ModelMap modelMap) throws Exception {
		
		noticesService.insertNoticesTaskCategoryDetail(dto);
	}
	
	@RequestMapping(value="/notice/updateNoticesTaskCategoryDetail.do")
	public @ResponseBody void updateNoticesTaskCategoryDetail(HttpServletRequest request,
						NoticesTaskCategoryDetailDto dto,
						ModelMap modelMap) throws Exception {
		
		noticesService.updateNoticesTaskCategoryDetail(dto);
	}
	
	@RequestMapping(value="/notice/deleteNoticesTaskCategoryDetail.do")
	public @ResponseBody void deleteNoticesTaskCategoryDetail(HttpServletRequest request,
						NoticesTaskCategoryDetailDto dto,
						ModelMap modelMap) throws Exception {
		
		noticesService.deleteNoticesTaskCategoryDetail(dto);
	}
}