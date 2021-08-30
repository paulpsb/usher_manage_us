package com.usher.web.enrollment;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import com.usher.service.AuthService;
import com.usher.service.BoardService;
import com.usher.service.CoursesService;
import com.usher.service.EnrollmentsService;

import com.usher.dto.EnrollmentsCourseenrollmentDto;
import com.usher.dto.EnrollmentsRepetitionenrollmentDto;
import com.usher.dto.EnrollmentsSeatenrollmentDto;
import com.usher.dto.AuthUserDto;
import com.usher.dto.BoardMemoirsDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.util.ExcelUtil;
import com.usher.util.SessionUtil;


@Controller
public class RepetitionEnrollmentController{
	@Autowired
	EnrollmentsService enrollmentsService;
	
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	AuthService authService;
	
	@Autowired
	BoardService boardService;
	
	@RequestMapping(value="/enrollment/repetition_enrollment.do")
	public String course_enrollment(HttpServletRequest request,
						CoursesCourseDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		if(dto.getCourse_id() > 0) {
			CoursesCourseDto dto1 = new CoursesCourseDto();
			dto1.setId(dto.getCourse_id());
			CoursesCourseDto courseInfo = coursesService.getCourse(dto1);
			
			dto.setCourse_name(courseInfo.getCourse_group_name()+" "+courseInfo.getName()+"반");
			modelMap.addAttribute("courseInfo", dto);
		}else {
			modelMap.addAttribute("courseInfo", dto);
		}
		String url = "";
		
		url = "enrollment/repetition_enrollment";
		return url;
	}
	
	
	@RequestMapping(value="/enrollment/getRepetitionEnrollmentList.do")
	public @ResponseBody Map  getRepetitionEnrollmentList(HttpServletRequest request, EnrollmentsRepetitionenrollmentDto dto) throws Exception {
		String[] juniors = {"U", "S", "H", "E", "R"};
		String[] seniors = {"완초1", "완초2", "Intermediate", "K1", "K2"};
		
		Map resultMap = new HashMap();
		
		CoursesCourseDto dto2 = new CoursesCourseDto();
		dto2.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto2);
		resultMap.put("courseInfo", courseInfo);
		
		String course_name = courseInfo.getName();
		String student_type = courseInfo.getStudent_type();
		String test_type = courseInfo.getTest_type();
		
		dto.setSemester_date(courseInfo.getNext_semester_date());
		List<EnrollmentsRepetitionenrollmentDto> repetitionList = enrollmentsService.getEnrollmentsRepetitionList(dto);
		resultMap.put("repetitionList", repetitionList);
		
		EnrollmentsCourseenrollmentDto dto1 = new EnrollmentsCourseenrollmentDto();
		dto1.setCourse_id(dto.getCourse_id());
		dto1.setSemester_in_data(dto.getSemester_in_data());
		List<EnrollmentsCourseenrollmentDto> list1 = enrollmentsService.getCourseenrollmentRepetitionList(dto1);
		List<EnrollmentsCourseenrollmentDto> enrollmentList = new ArrayList<EnrollmentsCourseenrollmentDto>();
		for(int i=0; i<list1.size(); i++) {
			EnrollmentsCourseenrollmentDto qvo = list1.get(i);
			qvo.setStudent_goal_month(0);
			qvo.setStudent_goal_score(0);
			qvo.setCourse_goal_month(0);
			qvo.setCourse_goal_score(0);
			
			if(qvo.getGoal_score() > 0) {
				//보유점수 기준 체크
				int result_stundet_level = get_score_result(qvo);
				if(result_stundet_level > 0) {
					String student_course_name = "";
					if(student_type.equals("JUNIOR")) {
						student_course_name = juniors[result_stundet_level];
					}else {
						student_course_name = seniors[result_stundet_level];
					}
					
					BoardMemoirsDto rto1 = new BoardMemoirsDto();
					rto1.setTest_type(test_type);
					rto1.setFirst_course(student_course_name);
					rto1.setEnd_toefl_score(qvo.getGoal_score());
					
					BoardMemoirsDto tvo1 = boardService.getBoardMemoirsAvg(rto1);
					qvo.setStudent_goal_month(tvo1.getAvg_course_month());
					qvo.setStudent_goal_score(tvo1.getAvg_toefl_score());
				}
				
				//반기준
				BoardMemoirsDto rto2 = new BoardMemoirsDto();
				rto2.setTest_type(test_type);
				rto2.setFirst_course(course_name);
				rto2.setEnd_toefl_score(qvo.getGoal_score());
				BoardMemoirsDto tvo2 = boardService.getBoardMemoirsAvg(rto2);
				qvo.setCourse_goal_month(tvo2.getAvg_course_month());
				qvo.setCourse_goal_score(tvo2.getAvg_toefl_score());
			}
			enrollmentList.add(qvo);
		}
		resultMap.put("enrollmentList", enrollmentList);
		
		List<EnrollmentsCourseenrollmentDto> semesterEnrollmentList = enrollmentsService.getCourseenrollmentRepetitionSemesterList(dto1);
		resultMap.put("semesterEnrollmentList", semesterEnrollmentList);
		
		EnrollmentsCourseenrollmentDto dto3 = new EnrollmentsCourseenrollmentDto();
		dto3.setCourse_id(dto.getCourse_id());
		if(courseInfo.getStudent_type().equals("JUNIOR")) {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentDaillyCountList(dto3);
			resultMap.put("classCountList", classCountList);
		}else {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentMonthlyCountList(dto3);
			resultMap.put("classCountList", classCountList);
		}
		
		return resultMap;
	}
	
	public int get_score_result(EnrollmentsCourseenrollmentDto dto) {
		int result = -1;
		
		float teps_total_score = dto.getTeps_total_score();
		float sat_total_score = dto.getSat_total_score();
		float toeic_total_score = dto.getToeic_total_score();
		float ielts_total_score = dto.getIelts_total_score();
		float ibt_total_score = dto.getIbt_total_score();
		float ets_total_score = dto.getEts_total_score();
		float pbt_total_score = dto.getPbt_total_score();
		int scholastic_grade = dto.getScholastic_grade();
		
		if(teps_total_score > 0){
			if(teps_total_score >= 900){
				if(result < 3) result = 3;
			}else if(teps_total_score >= 800){
				if(result < 2) result = 2;
			}
		}
		
		if(sat_total_score > 0){
			if(sat_total_score >= 650){
				if(result < 3) result = 3;
			}
		}
		
		if(toeic_total_score > 0){
			if(toeic_total_score >= 900){
				if(result < 3) result = 3;
			}else if(toeic_total_score >= 800){
				if(result < 2) result = 2;
			}
		}
		
		if(ielts_total_score > 0){
			if(ielts_total_score >= 7.0){
				if(result < 3) result = 3;
			}else if(ielts_total_score >= 6.5){
				if(result < 2) result = 2;
			}
		}
		
		if(ibt_total_score > 0){
			if(ibt_total_score >= 80){
				if(result < 3) result = 3;
			}else if(ibt_total_score >= 70){
				if(result < 2) result = 2;
			}
		}
		
		if(ets_total_score > 0){
			if(ets_total_score >= 80){
				if(result < 3) result = 3;
			}else if(ets_total_score >= 70){
				if(result < 2) result = 2;
			}
		}
		
		if(pbt_total_score > 0){
			if(pbt_total_score >= 600){
				if(result < 3) result = 3;
			}else if(pbt_total_score >= 550){
				if(result < 2) result = 2;
			}
		}
		
		if(scholastic_grade > 0){
			if(scholastic_grade == 1){
				if(result < 2) result = 2;
			}else if(scholastic_grade == 2){
				if(result < 1) result = 1;
			}				
		}
		return result;
	}
	@RequestMapping(value="/enrollment/getRepetitionEnrollment.do")
	public @ResponseBody EnrollmentsRepetitionenrollmentDto  getRepetitionEnrollment(HttpServletRequest request, EnrollmentsRepetitionenrollmentDto dto) throws Exception {
		
		
		return enrollmentsService.getEnrollmentsRepetition(dto);
	}
	
	@RequestMapping(value="/enrollment/insertRepetitaionGoalScore.do")
	public @ResponseBody void  insertRepetitaionGoalScore(HttpServletRequest request, EnrollmentsRepetitionenrollmentDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setGoal_score_id(userInfo.getUser_id());
		dto.setGoal_score_name(userInfo.getLast_name()+userInfo.getFirst_name());
		enrollmentsService.insertRepetitaionGoalScore(dto);
		
		EnrollmentsCourseenrollmentDto dto1 = new EnrollmentsCourseenrollmentDto();
		dto1.setUser_id(dto.getUser_id());
		dto1.setGoal_score(Integer.parseInt(dto.getGoal_score()));
		enrollmentsService.updateUserPersonGoalScore(dto1);
	}
	
	@RequestMapping(value="/enrollment/insertRepetitaionAttendStartDate.do")
	public @ResponseBody void  insertRepetitaionAttendStartDate(HttpServletRequest request, EnrollmentsRepetitionenrollmentDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setAttend_start_date_id(userInfo.getUser_id());
		dto.setAttend_start_date_name(userInfo.getLast_name()+userInfo.getFirst_name());
		enrollmentsService.insertRepetitaionAttendStartDate(dto);
		
		EnrollmentsCourseenrollmentDto dto1 = new EnrollmentsCourseenrollmentDto();
		dto1.setUser_id(dto.getUser_id());
		dto1.setAttend_start_date(dto.getAttend_start_date());
		enrollmentsService.updateUserPersonAttendStartDate(dto1);
	}
	
	@RequestMapping(value="/enrollment/insertRepetitaionNeedDate.do")
	public @ResponseBody void  insertRepetitaionNeedDate(HttpServletRequest request, EnrollmentsRepetitionenrollmentDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setNeed_date_id(userInfo.getUser_id());
		dto.setNeed_date_name(userInfo.getLast_name()+userInfo.getFirst_name());
		enrollmentsService.insertRepetitaionNeedDate(dto);
		
		EnrollmentsCourseenrollmentDto dto1 = new EnrollmentsCourseenrollmentDto();
		dto1.setUser_id(dto.getUser_id());
		dto1.setNeed_date(dto.getNeed_date());
		enrollmentsService.updateUserPersonNeedDate(dto1);
	}
	
	@RequestMapping(value="/enrollment/insertRepetitaionAttendDate.do")
	public @ResponseBody void  insertRepetitaionAttendDate(HttpServletRequest request, EnrollmentsRepetitionenrollmentDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setAttend_date_id(userInfo.getUser_id());
		dto.setAttend_date_name(userInfo.getLast_name()+userInfo.getFirst_name());
		enrollmentsService.insertRepetitaionAttendDate(dto);
		
		EnrollmentsCourseenrollmentDto dto1 = new EnrollmentsCourseenrollmentDto();
		dto1.setUser_id(dto.getUser_id());
		dto1.setAttend_date(dto.getAttend_date());
		enrollmentsService.updateUserPersonAttendDate(dto1);
	}
	
	@RequestMapping(value="/enrollment/insertRepetitaionGoalRepetitionAdvise.do")
	public @ResponseBody void  insertRepetitaionGoalRepetitionAdvise(HttpServletRequest request, EnrollmentsRepetitionenrollmentDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setGoal_repetition_advise_id(userInfo.getUser_id());
		dto.setGoal_repetition_advise_name(userInfo.getLast_name()+userInfo.getFirst_name());
		enrollmentsService.insertRepetitaionGoalRepetitionAdvise(dto);
	}
	
	@RequestMapping(value="/enrollment/insertRepetitaionFirstRepetitionResult.do")
	public @ResponseBody void  insertRepetitaionFirstRepetitionResult(HttpServletRequest request, EnrollmentsRepetitionenrollmentDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setFirst_repetition_result_id(userInfo.getUser_id());
		dto.setFirst_repetition_result_name(userInfo.getLast_name()+userInfo.getFirst_name());
		enrollmentsService.insertRepetitaionFirstRepetitionResult(dto);
	}
	
	@RequestMapping(value="/enrollment/insertRepetitaionFirstRepetitionAdvise.do")
	public @ResponseBody void  insertRepetitaionFirstRepetitionAdvise(HttpServletRequest request, EnrollmentsRepetitionenrollmentDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setFirst_repetition_advise_id(userInfo.getUser_id());
		dto.setFirst_repetition_advise_name(userInfo.getLast_name()+userInfo.getFirst_name());
		enrollmentsService.insertRepetitaionFirstRepetitionAdvise(dto);
	}
	
	@RequestMapping(value="/enrollment/insertRepetitaionSecondRepetitionResult.do")
	public @ResponseBody void  insertRepetitaionSecondRepetitionResult(HttpServletRequest request, EnrollmentsRepetitionenrollmentDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setSecond_repetition_result_id(userInfo.getUser_id());
		dto.setSecond_repetition_result_name(userInfo.getLast_name()+userInfo.getFirst_name());
		enrollmentsService.insertRepetitaionSecondRepetitionResult(dto);
	}
	
	@RequestMapping(value="/enrollment/insertRepetitaionSecondRepetitionAdvise.do")
	public @ResponseBody void  insertRepetitaionSecondRepetitionAdvise(HttpServletRequest request, EnrollmentsRepetitionenrollmentDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setSecond_repetition_advise_id(userInfo.getUser_id());
		dto.setSecond_repetition_advise_name(userInfo.getLast_name()+userInfo.getFirst_name());
		enrollmentsService.insertRepetitaionSecondRepetitionAdvise(dto);
	}
	
	@RequestMapping(value="/enrollment/insertRepetitaionThirdRepetitionResult.do")
	public @ResponseBody void  insertRepetitaionThirdRepetitionResult(HttpServletRequest request, EnrollmentsRepetitionenrollmentDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setThird_repetition_result_id(userInfo.getUser_id());
		dto.setThird_repetition_result_name(userInfo.getLast_name()+userInfo.getFirst_name());
		enrollmentsService.insertRepetitaionThirdRepetitionResult(dto);
	}
	
	@RequestMapping(value="/enrollment/insertRepetitaionThirdRepetitionAdvise.do")
	public @ResponseBody void  insertRepetitaionThirdRepetitionAdvise(HttpServletRequest request, EnrollmentsRepetitionenrollmentDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setThird_repetition_advise_id(userInfo.getUser_id());
		dto.setThird_repetition_advise_name(userInfo.getLast_name()+userInfo.getFirst_name());
		enrollmentsService.insertRepetitaionThirdRepetitionAdvise(dto);
	}
	
	@RequestMapping(value="/enrollment/insertRepetitaionUnregisteredReason.do")
	public @ResponseBody void  insertRepetitaionUnregisteredReason(HttpServletRequest request, EnrollmentsRepetitionenrollmentDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setUnregistered_reason_id(userInfo.getUser_id());
		dto.setUnregistered_reason_name(userInfo.getLast_name()+userInfo.getFirst_name());
		enrollmentsService.insertRepetitaionUnregisteredReason(dto);
	}
}