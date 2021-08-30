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

import com.usher.dto.AuthOrganizationDto;
import com.usher.dto.AuthUserDto;
import com.usher.dto.AuthUserOrganizationDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.CoursesCoursePracticeDto;
import com.usher.dto.CoursesCourseTimetableDto;
import com.usher.dto.NoticesAttendDto;
import com.usher.dto.NoticesPracticeDto;
import com.usher.dto.NoticesRoutineDetailsDto;
import com.usher.dto.NoticesRoutineDto;
import com.usher.dto.NoticesScheduleDto;
import com.usher.dto.NoticesStatsDto;
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
public class NoticeStatsController{
	@Autowired
	AuthService authService; 
	
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	NoticesService noticesService; 
	
	@RequestMapping(value="/notice/notice_stats_monthly_oraganization.do")
	public String notice_stats_monthly_oraganization(HttpServletRequest request,
						NoticesStatsDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		modelMap.addAttribute("statsInfo", dto);
		return "notice/notice_stats_monthly_oraganization";
	}
	
	@RequestMapping(value="/notice/notice_stats_daily_oraganization.do")
	public String notice_stats_daily_oraganization(HttpServletRequest request,
						NoticesStatsDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		modelMap.addAttribute("statsInfo", dto);
		return "notice/notice_stats_daily_oraganization";
	}
	
	@RequestMapping(value="/notice/notice_stats_monthly_user.do")
	public String notice_stats_monthly_user(HttpServletRequest request,
						NoticesStatsDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		modelMap.addAttribute("statsInfo", dto);
		return "notice/notice_stats_monthly_user";
	}
	
	@RequestMapping(value="/notice/notice_stats_daily_user.do")
	public String notice_stats_daily_user(HttpServletRequest request,
						NoticesStatsDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		modelMap.addAttribute("statsInfo", dto);
		return "notice/notice_stats_daily_user";
	}
	
	@RequestMapping(value="/notice/getNoticeStatsMonthlyOraganizationList.do")
	public @ResponseBody Map getNoticeStatsMonthlyOraganizationList(HttpServletRequest request, NoticesStatsDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		
		List<AuthOrganizationDto>  authOrganizationList = authService.getAuthOrganizationList();
		resultMap.put("authOrganizationList", authOrganizationList);
		
		List<AuthUserOrganizationDto> authUserOrganizationAllList = authService.getAuthUserOrganizationAllList();
		resultMap.put("authUserOrganizationAllList", authUserOrganizationAllList);
		
		List<NoticesStatsDto> newStudentList = noticesService.getNoticesMonthlyStatsNewStudentList(dto);
		resultMap.put("newStudentList", newStudentList);
		List<NoticesStatsDto> attendList = noticesService.getNoticesMonthlyStatsAttendList(dto);
		resultMap.put("attendList", attendList);
		List<NoticesStatsDto> practiceList = noticesService.getNoticesMonthlyStatsPracticeList(dto);
		resultMap.put("practiceList", practiceList);
		List<NoticesStatsDto> monthlyList = noticesService.getNoticesMonthlyStatsRoutineMonthlyList(dto);
		resultMap.put("monthlyList", monthlyList);
		List<NoticesStatsDto> dailyList = noticesService.getNoticesMonthlyStatsRoutineDailyList(dto);
		resultMap.put("dailyList", dailyList);
		List<NoticesStatsDto> taskList = noticesService.getNoticesMonthlyStatsTaskList(dto);
		resultMap.put("taskList", taskList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/notice/getNoticeStatsDailyOraganizationList.do")
	public @ResponseBody Map getNoticeStatsDailyOraganizationList(HttpServletRequest request, NoticesStatsDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		
		List<AuthOrganizationDto>  authOrganizationList = authService.getAuthOrganizationList();
		resultMap.put("authOrganizationList", authOrganizationList);
		
		List<AuthUserOrganizationDto> authUserOrganizationAllList = authService.getAuthUserOrganizationAllList();
		resultMap.put("authUserOrganizationAllList", authUserOrganizationAllList);
		
		List<NoticesStatsDto> newStudentList = noticesService.getNoticesDailyStatsNewStudentList(dto);
		resultMap.put("newStudentList", newStudentList);
		List<NoticesStatsDto> attendList = noticesService.getNoticesDailyStatsAttendList(dto);
		resultMap.put("attendList", attendList);
		List<NoticesStatsDto> practiceList = noticesService.getNoticesDailyStatsPracticeList(dto);
		resultMap.put("practiceList", practiceList);
		List<NoticesStatsDto> monthlyList = noticesService.getNoticesDailyStatsRoutineMonthlyList(dto);
		resultMap.put("monthlyList", monthlyList);
		List<NoticesStatsDto> dailyList = noticesService.getNoticesDailyStatsRoutineDailyList(dto);
		resultMap.put("dailyList", dailyList);
		List<NoticesStatsDto> taskList = noticesService.getNoticesDailyStatsTaskList(dto);
		resultMap.put("taskList", taskList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/notice/getNoticeStatsMonthlyUserList.do")
	public @ResponseBody Map getNoticeStatsMonthlyUserList(HttpServletRequest request, NoticesStatsDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		
		List<NoticesStatsDto> newStudentList = noticesService.getNoticesMonthlyUserStatsNewStudentList(dto);
		resultMap.put("newStudentList", newStudentList);
		List<NoticesStatsDto> attendList = noticesService.getNoticesMonthlyUserStatsAttendList(dto);
		resultMap.put("attendList", attendList);
		List<NoticesStatsDto> practiceList = noticesService.getNoticesMonthlyUserStatsPracticeList(dto);
		resultMap.put("practiceList", practiceList);
		List<NoticesStatsDto> monthlyList = noticesService.getNoticesMonthlyUserStatsRoutineMonthlyList(dto);
		resultMap.put("monthlyList", monthlyList);
		List<NoticesStatsDto> dailyList = noticesService.getNoticesMonthlyUserStatsRoutineDailyList(dto);
		resultMap.put("dailyList", dailyList);
		List<NoticesStatsDto> taskList = noticesService.getNoticesMonthlyUserStatsTaskList(dto);
		resultMap.put("taskList", taskList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/notice/notice_work_log.do")
	public String notice_work_log(HttpServletRequest request,
						NoticesStatsDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		modelMap.addAttribute("statsInfo", dto);
		return "notice/notice_work_log";
	}
	
	@RequestMapping(value="/notice/getNoticeWorkLogList.do")
	public @ResponseBody Map getNoticeWorkLogList(HttpServletRequest request,
			NoticesStatsDto dto,
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);
		NoticesStatsDto logCount = noticesService.getNoticesLogCount(dto);
		List<NoticesStatsDto> logList = noticesService.getNoticesLogList(dto);
		
		resultMap.put("logCount", logCount);
		resultMap.put("logList", logList);
				
		return resultMap;
	}
}