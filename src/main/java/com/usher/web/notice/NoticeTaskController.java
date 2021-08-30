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
public class NoticeTaskController{
	@Autowired
	AuthService authService; 
	
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	NoticesService noticesService; 
	
	@RequestMapping(value="/notice/task.do")
	public String task(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "notice/task";
	}
	
	@RequestMapping(value="/notice/getTaskUserList.do")
	public @ResponseBody Map getTaskUserList(HttpServletRequest request,
						AuthUserDto dto,
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		
		CoursesCourseDto currentInfo = coursesService.getCourseCurrent();
		resultMap.put("currentInfo", currentInfo);
		
		CoursesCourseTimetableDto dto1 = new CoursesCourseTimetableDto();
		dto1.setDate(dto.getSchedule_date());
		List<CoursesCourseTimetableDto> timetableList = coursesService.getCourseGroupTimeTableAsTeacherAllList(dto1);
		resultMap.put("timetableList", timetableList);
		
		String search_type = dto.getSearch_type();
		if(search_type.equals("ORGANIZATION")) {
			AuthUserOrganizationDto dto2 = new AuthUserOrganizationDto();
			dto2.setOrganization_id(dto.getOrganization_id());
			List<AuthUserOrganizationDto> userList = authService.getAuthUserOrganizationList(dto2);
			resultMap.put("userList", userList);
		}else {
			AuthUserDto dto2 = new AuthUserDto();
			if(search_type.equals("MANAGER")) {
				dto2.setGroup_id(3);
			}else {
				dto2.setGroup_id(4);
			}
			List<AuthUserDto> userList = authService.getUserSearchList(dto2);
			resultMap.put("userList", userList);
		}
		
		NoticesTaskCategoryDetailDto dto3 = new NoticesTaskCategoryDetailDto();
		dto3.setSchedule_date(dto.getSchedule_date());
		List<NoticesTaskCategoryDetailDto> taskList = noticesService.getNoticesTaskCategoryDetailUseList(dto3);
		resultMap.put("taskList", taskList);
		
		NoticesTaskDto dto4 = new NoticesTaskDto();
		dto4.setTask_date(dto.getSchedule_date());
		List<NoticesTaskDto> taskUserList = noticesService.getNoticesTaskDailyList(dto4);
		resultMap.put("taskUserList", taskUserList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/notice/insertNoticesTask.do")
	public @ResponseBody NoticesTaskDto insertNoticesTask(HttpServletRequest request,
						NoticesTaskDto dto,
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		int detail_user_id = userInfo.getUser_id();

		NoticesTaskCategoryDetailDto dto1 = new NoticesTaskCategoryDetailDto();
		
		dto1.setId(dto.getTask_category_detail_id());
		NoticesTaskCategoryDetailDto taskCategoryDetail = noticesService.getNoticesTaskCategoryDetail(dto1);
		
		NoticesTaskDto dto2 = new NoticesTaskDto();
		dto2.setTask_estimated_time(taskCategoryDetail.getReference_time());
		dto2.setTask_user_id(dto.getTask_user_id());
		dto2.setTask_date(dto.getTask_date());
		dto2.setTask_title(taskCategoryDetail.getTask_category_title());
		dto2.setTask_reference_title(taskCategoryDetail.getReference_title());
		dto2.setTask_reference_content(taskCategoryDetail.getReference_contents());
		dto2.setTask_reference_image(taskCategoryDetail.getReference_image());
		dto2.setTask_reference_image_name(taskCategoryDetail.getReference_image_name());
		dto2.setTask_reference_url(taskCategoryDetail.getReference_url());
		dto2.setTask_reference_file(taskCategoryDetail.getReference_file());
		dto2.setTask_reference_file_name(taskCategoryDetail.getReference_file_name());
		dto2.setTask_report_image(taskCategoryDetail.isReport_image());
		dto2.setTask_report_url(taskCategoryDetail.isReport_url());
		dto2.setTask_report_file(taskCategoryDetail.isReport_file());
		dto2.setTask_category_detail_id(dto.getTask_category_detail_id());
		noticesService.insertNoticesTask(dto2);
		
		NoticesTaskDto taskInfo = noticesService.getNoticesTask(dto2);
		
		int task_id = dto2.getId();
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
		
		dto1.setIs_used(true);
		noticesService.updateNoticesTaskCategoryDetailUsed(dto1);
		
		return taskInfo;
		
	}
	
	@RequestMapping(value="/notice/deleteNoticesTask.do")
	public @ResponseBody NoticesTaskDto deleteNoticesTask(HttpServletRequest request,
						NoticesTaskDto dto,
						ModelMap modelMap) throws Exception {
		
		NoticesTaskDto taskInfo = noticesService.getNoticesTask(dto);
		NoticesTaskCategoryDetailDto dto1 = new NoticesTaskCategoryDetailDto();
		dto1.setId(taskInfo.getTask_category_detail_id());
		dto1.setIs_used(false);
		noticesService.updateNoticesTaskCategoryDetailUsed(dto1);
		noticesService.deleteNoticesTask(dto);
		
		return taskInfo;
	}
}