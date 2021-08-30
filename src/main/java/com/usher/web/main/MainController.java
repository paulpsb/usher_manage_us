package com.usher.web.main;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.dto.CoursesCoursePracticeDto;
import com.usher.dto.CoursesCourseTimetableDto;
import com.usher.dto.CoursesCoursegroupDto;
import com.usher.dto.DashboardDto;
import com.usher.dto.ExamsToeflDto;
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.service.CoursesService;
import com.usher.service.DashboardService;
import com.usher.service.ExamsService;
import com.usher.service.PracticesService;
import com.usher.util.SessionUtil;


@Controller
public class MainController{
	@Autowired
	DashboardService dashboardService;
	
	@Autowired
	PracticesService practicesService;
	
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	ExamsService examsService;
	
	@RequestMapping(value="/main/dashboard.do")
	public String dashboard(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";
		
		url = "main/dashboard";
		return url;
	}
	
	@RequestMapping(value="/main/dashboard_new.do")
	public String dashboard_new(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";
		
		url = "main/dashboard_new";
		return url;
	}
	@RequestMapping(value="/main/getDashboardList.do")
	public @ResponseBody Map getDashboardList(HttpServletRequest request, DashboardDto dto) throws Exception {
		
		DashboardDto nextDateInfo = dashboardService.getDashboardNextDate(dto);
		dto.setNext_date(nextDateInfo.getNext_date());
		Map resultMap = new HashMap();
		
		List<DashboardDto> dashboardList = dashboardService.getDashboardList(dto);
		List<DashboardDto> dashboardVocaList = dashboardService.getDashboardVocaList(dto);
		List<DashboardDto> dashboardSpeechList = dashboardService.getDashboardSpeechList(dto);
		List<DashboardDto> dashboardGoalList = dashboardService.getDashboardGoalList(dto);
		
		resultMap.put("dashboardList", dashboardList);
		resultMap.put("dashboardVocaList", dashboardVocaList);
		resultMap.put("dashboardSpeechList", dashboardSpeechList);
		resultMap.put("dashboardGoalList", dashboardGoalList);

		
		return resultMap;
	}
	
	@RequestMapping(value="/main/getDashboardNewList.do")
	public @ResponseBody Map getDashboardNewList(HttpServletRequest request, DashboardDto dto) throws Exception {
		
		DashboardDto nextDateInfo = dashboardService.getDashboardNextDate(dto);
		dto.setNext_date(nextDateInfo.getNext_date());
		DashboardDto prevDateInfo = dashboardService.getDashboardPrevDate(dto);
		dto.setPrev_date(prevDateInfo.getPrev_date());
		
		
		Map resultMap = new HashMap();
		CoursesCoursegroupDto dto1 = new CoursesCoursegroupDto();
		dto1.setId(dto.getCourse_group_id());
		CoursesCoursegroupDto courseGroupInfo = coursesService.getCoursegroup(dto1);
		resultMap.put("courseGroupInfo", courseGroupInfo);
		
		List<PracticesPracticesectionDto> sectionList = practicesService.getPracticeSectionList();
		resultMap.put("sectionList", sectionList);
		
		List<DashboardDto> dashboardList = dashboardService.getDashboardList(dto);
		List<DashboardDto> dashboardVocaList = dashboardService.getDashboardVocaList(dto);
		List<DashboardDto> dashboardSpeechList = dashboardService.getDashboardSpeechNewList(dto);
		List<DashboardDto> dashboardGoalList = dashboardService.getDashboardGoalConcentrationList(dto);
		List<DashboardDto> dashboardSylabusList = dashboardService.getDashboardSylabusList(dto);
		List<DashboardDto> dashboardProblemList = dashboardService.getDashboardProblemList(dto);
		/*
		List<DashboardDto> dashboardAchieveCountList = dashboardService.getDashboardAchieveCountList(dto);
		List<DashboardDto> dashboardAchieveList = dashboardService.getDashboardAchieveList(dto);
		List<DashboardDto> dashboardConfidenceCountList = dashboardService.getDashboardConfidenceCountList(dto);
		List<DashboardDto> dashboardConfidenceList = dashboardService.getDashboardConfidenceList(dto);
		List<DashboardDto> dashboardNotEffectCountList = dashboardService.getDashboardNotEffectCountList(dto);
		List<DashboardDto> dashboardJuniorLevelUpList = dashboardService.getDashboardJuniorLevelUpList(dto);
		List<DashboardDto> dashboardJuniorNotSendList = dashboardService.getDashboardJuniorNotSendList(dto);
		List<DashboardDto> dashboardNotSchoolList = dashboardService.getDashboardNotSchoolList(dto);
		ExamsToeflDto dashbordToeflExamNotMatching = examsService.getExamsToeflNotMatchCount();
		*/
		
		resultMap.put("dashboardList", dashboardList);
		resultMap.put("dashboardVocaList", dashboardVocaList);
		resultMap.put("dashboardSpeechList", dashboardSpeechList);
		resultMap.put("dashboardGoalList", dashboardGoalList);
		resultMap.put("dashboardSylabusList", dashboardSylabusList);
		resultMap.put("dashboardProblemList", dashboardProblemList);
		/*
		resultMap.put("dashboardAchieveCountList", dashboardAchieveCountList);
		resultMap.put("dashboardAchieveList", dashboardAchieveList);
		resultMap.put("dashboardConfidenceCountList", dashboardConfidenceCountList);
		resultMap.put("dashboardConfidenceList", dashboardConfidenceList);
		resultMap.put("dashboardNotEffectCountList", dashboardNotEffectCountList);
		resultMap.put("dashboardJuniorLevelUpList", dashboardJuniorLevelUpList);
		resultMap.put("dashboardJuniorNotSendList", dashboardJuniorNotSendList);
		resultMap.put("dashboardNotSchoolList", dashboardNotSchoolList);
		resultMap.put("dashbordToeflExamNotMatching", dashbordToeflExamNotMatching);
		*/
		return resultMap;
	}
	
	
	@RequestMapping(value="/main/getDashboardAchieveList.do")
	public @ResponseBody Map getDashboardAchieveList(HttpServletRequest request, DashboardDto dto) throws Exception {
		Map resultMap = new HashMap();
		/*
		CoursesCoursegroupDto dto1 = new CoursesCoursegroupDto();
		dto1.setId(dto.getCourse_group_id());
		CoursesCoursegroupDto courseGroupInfo = coursesService.getCoursegroup(dto1);
		resultMap.put("courseGroupInfo", courseGroupInfo);
		
		CoursesCourseTimetableDto dto2 =new CoursesCourseTimetableDto();
		dto2.setCourse_group_id(dto.getCourse_group_id());
		dto2.setDate(dto.getDate());
		List<CoursesCourseTimetableDto> achieveCourseTimeTable = coursesService.getCourseGroupTimeTableDailyList(dto2);
		resultMap.put("courseTimeTable", achieveCourseTimeTable);
		
		
		CoursesCoursePracticeDto dto3 = new CoursesCoursePracticeDto();
		dto3.setCourse_group_id(dto.getCourse_group_id());
		dto3.setDate(dto.getDate());
		List<CoursesCoursePracticeDto> achieveCoursePracticeList = coursesService.getCoursesCourseGroupPracticeList(dto3);
		resultMap.put("coursePracticeList", achieveCoursePracticeList);
		
		List<CoursesCoursePracticeDto> achieveCoursePracticeDailyList = coursesService.getCoursesCourseGroupPracticeDailyList(dto3);
		resultMap.put("coursePracticeDailyList", achieveCoursePracticeDailyList);
		
		List<DashboardDto> courseDashboardList = dashboardService.getDashboardList(dto);
		List<DashboardDto> courseAttendList = dashboardService.getAchieveAttendList(dto);
		List<DashboardDto> courseSylabusList = dashboardService.getAchieveSylabusList(dto);
		List<DashboardDto> courseResultList = dashboardService.getAchieveResultList(dto);
		List<DashboardDto> courseGiveUpList = dashboardService.getAchieveGiveUpList(dto);
		resultMap.put("courseDashboardList", courseDashboardList);
		resultMap.put("courseAttendList", courseAttendList);
		resultMap.put("courseSylabusList", courseSylabusList);
		resultMap.put("courseResultList", courseResultList);
		resultMap.put("courseGiveUpList", courseGiveUpList);
		*/
		return resultMap;
	}
}