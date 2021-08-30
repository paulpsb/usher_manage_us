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
import com.usher.dto.AuthUserOrganizationDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.CoursesCourseTimetableDto;
import com.usher.dto.NoticesRoutineDetailsDto;
import com.usher.dto.NoticesRoutineDto;
import com.usher.dto.NoticesTaskCategoryDetailDto;
import com.usher.dto.NoticesTaskCategoryDto;
import com.usher.dto.NoticesTaskDetailDto;
import com.usher.dto.NoticesTaskDto;
import com.usher.service.AuthService;
import com.usher.service.CoursesService;
import com.usher.service.NoticesService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class NoticeTaskStatsController{
	@Autowired
	AuthService authService; 
	
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	NoticesService noticesService; 
	
	@RequestMapping(value="/notice/task_stats.do")
	public String task(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "notice/task_stats";
	}
	
	@RequestMapping(value="/notice/getTaskList.do")
	public @ResponseBody Map getTaskUserList(HttpServletRequest request,
						NoticesTaskDto dto,
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);
		NoticesTaskDto taskCount = noticesService.getNoticesTaskCount(dto);
		List<NoticesTaskDto> taskList = noticesService.getNoticesTaskList(dto);
		List<NoticesTaskDto> statusList = noticesService.getNoticesTaskStatusList(dto);
		
		resultMap.put("taskCount", taskCount);
		resultMap.put("taskList", taskList);
		resultMap.put("statusList", statusList);
				
		return resultMap;
	}
	
	@RequestMapping(value="/notice/getTask.do")
	public @ResponseBody NoticesTaskDto getTask(HttpServletRequest request,
						NoticesTaskDto dto,
						ModelMap modelMap) throws Exception {
		
		return noticesService.getNoticesTask(dto);
	}
	
	@RequestMapping(value="/notice/getTaskDetailList.do")
	public @ResponseBody List<NoticesTaskDetailDto> getTaskDetailList(HttpServletRequest request,
						NoticesTaskDetailDto dto,
						ModelMap modelMap) throws Exception {
		
		return noticesService.getNoticesTaskDetailList(dto);
	}
	
	@RequestMapping(value="/notice/updateNoticesTaskCompete.do")
	public @ResponseBody NoticesTaskDto updateNoticesTaskCompete(HttpServletRequest request,
						NoticesTaskDto dto,
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		
		noticesService.updateNoticesTaskComplete(dto);
		int detail_user_id = userInfo.getUser_id();
		
		NoticesTaskDto taskInfo = noticesService.getNoticesTask(dto);
		
		int task_id = dto.getId();
		NoticesTaskDetailDto dto4 = new NoticesTaskDetailDto();
		dto4.setTask_id(task_id);
		NoticesTaskDetailDto taskDetailSeq = noticesService.getNoticesTaskDetailSeq(dto4);
		int task_seq = taskDetailSeq.getTask_seq();
		
		NoticesTaskDetailDto dto5 = new NoticesTaskDetailDto();
		dto5.setDetail_user_id(detail_user_id);
		dto5.setTask_id(task_id);
		dto5.setTask_seq(task_seq);
		dto5.setTask_status(taskInfo.getTask_status());
		dto5.setTask_user_id(taskInfo.getTask_user_id());
		dto5.setTask_date(taskInfo.getTask_date());
		dto5.setTask_time(taskInfo.getTask_time());
		dto5.setTask_title(taskInfo.getTask_title());
		dto5.setTask_reference_title(taskInfo.getTask_reference_title());
		dto5.setTask_reference_content(taskInfo.getTask_reference_content());
		dto5.setTask_reference_image(taskInfo.getTask_reference_image());
		dto5.setTask_reference_image_name(taskInfo.getTask_reference_image_name());
		dto5.setTask_reference_url(taskInfo.getTask_reference_url());
		dto5.setTask_reference_file(taskInfo.getTask_reference_file());
		dto5.setTask_reference_file_name(taskInfo.getTask_reference_file_name());
		dto5.setTask_report_image(taskInfo.isTask_report_image());
		dto5.setTask_report_url(taskInfo.isTask_report_url());
		dto5.setTask_report_file(taskInfo.isTask_report_file());
		dto5.setTask_content(taskInfo.getTask_content());
		dto5.setTask_image(taskInfo.getTask_image());
		dto5.setTask_image_name(taskInfo.getTask_image_name());
		dto5.setTask_url(taskInfo.getTask_url());
		dto5.setTask_file(taskInfo.getTask_file());
		dto5.setTask_file_name(taskInfo.getTask_file_name());
		
		dto5.setTask_return_content(taskInfo.getTask_return_content());
		dto5.setTask_category_detail_id(dto.getTask_category_detail_id());
		noticesService.insertNoticesTaskDetail(dto5);
		
		return taskInfo;
	}
	
	@RequestMapping(value="/notice/updateNoticesTaskReturn.do")
	public @ResponseBody NoticesTaskDto updateNoticesTaskReturn(HttpServletRequest request,
						NoticesTaskDto dto,
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		
		noticesService.updateNoticesTaskReturn(dto);
		int detail_user_id = userInfo.getUser_id();
		
		NoticesTaskDto taskInfo = noticesService.getNoticesTask(dto);
		
		int task_id = dto.getId();
		NoticesTaskDetailDto dto4 = new NoticesTaskDetailDto();
		dto4.setTask_id(task_id);
		NoticesTaskDetailDto taskDetailSeq = noticesService.getNoticesTaskDetailSeq(dto4);
		int task_seq = taskDetailSeq.getTask_seq();
		
		NoticesTaskDetailDto dto5 = new NoticesTaskDetailDto();
		dto5.setDetail_user_id(detail_user_id);
		dto5.setTask_id(task_id);
		dto5.setTask_seq(task_seq);
		dto5.setTask_status(taskInfo.getTask_status());
		dto5.setTask_user_id(taskInfo.getTask_user_id());
		dto5.setTask_date(taskInfo.getTask_date());
		dto5.setTask_time(taskInfo.getTask_time());
		dto5.setTask_title(taskInfo.getTask_title());
		dto5.setTask_reference_title(taskInfo.getTask_reference_title());
		dto5.setTask_reference_content(taskInfo.getTask_reference_content());
		dto5.setTask_reference_image(taskInfo.getTask_reference_image());
		dto5.setTask_reference_image_name(taskInfo.getTask_reference_image_name());
		dto5.setTask_reference_url(taskInfo.getTask_reference_url());
		dto5.setTask_reference_file(taskInfo.getTask_reference_file());
		dto5.setTask_reference_file_name(taskInfo.getTask_reference_file_name());
		dto5.setTask_report_image(taskInfo.isTask_report_image());
		dto5.setTask_report_url(taskInfo.isTask_report_url());
		dto5.setTask_report_file(taskInfo.isTask_report_file());
		dto5.setTask_content(taskInfo.getTask_content());
		dto5.setTask_image(taskInfo.getTask_image());
		dto5.setTask_image_name(taskInfo.getTask_image_name());
		dto5.setTask_url(taskInfo.getTask_url());
		dto5.setTask_file(taskInfo.getTask_file());
		dto5.setTask_file_name(taskInfo.getTask_file_name());
		
		dto5.setTask_return_content(taskInfo.getTask_return_content());
		dto5.setTask_category_detail_id(dto.getTask_category_detail_id());
		noticesService.insertNoticesTaskDetail(dto5);
		
		return taskInfo;
	}
}