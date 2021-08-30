package com.usher.web.test;

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

import com.usher.dto.BatchDirectionDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.GoalsGoalconcentrationPracticeDto;
import com.usher.dto.MockTestDirectionDto;
import com.usher.dto.PracticesPracticequizresultDto;
import com.usher.dto.PracticesPracticeresultStaticDto;
import com.usher.dto.PracticesPracticescheduleDto;
import com.usher.service.BatchService;
import com.usher.service.CoursesService;
import com.usher.service.GoalService;
import com.usher.service.MockTestService;
import com.usher.service.PracticesService;
import com.usher.util.SessionUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class OxTestController{
	@Autowired
	PracticesService practicesService; 
	
	@Autowired
	GoalService goalService;
	
	@Autowired
	CoursesService coursesService;
	
	
	@RequestMapping(value="/test/ox_test.do")
	public String schedule(HttpServletRequest request,
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
		
		return "test/ox_test";
	}

	@RequestMapping(value="/test/getPracticeScheduleOxList.do")
	public @ResponseBody List<PracticesPracticescheduleDto> getPracticeScheduleOxList(HttpServletRequest request, PracticesPracticescheduleDto dto) throws Exception {
		return practicesService.getPracticeScheduleOxList(dto);
	}
	
	@RequestMapping(value="/test/getPracticeScheduleOxPracticeTypeList.do")
	public @ResponseBody List<PracticesPracticescheduleDto> getPracticeScheduleOxPracticeTypeList(HttpServletRequest request, PracticesPracticescheduleDto dto) throws Exception {
		return practicesService.getPracticeScheduleOxPracticeTypeList(dto);
	}

	@RequestMapping(value="/test/getPracticeQuizResultCourseList.do")
	public @ResponseBody List<PracticesPracticequizresultDto> getPracticeQuizResultCourseList(HttpServletRequest request, PracticesPracticequizresultDto dto) throws Exception {
		return practicesService.getPracticeQuizResultCourseList(dto);
	}
	
	@RequestMapping(value="/test/insertPracticeQuizResult.do")
	public @ResponseBody void insertPracticeQuizResult(HttpServletRequest request, PracticesPracticequizresultDto dto) throws Exception {
		practicesService.insertPracticeQuizResult(dto);
		
		boolean pass_result    = dto.isPass_result();
		boolean out_pass_result = false;
		boolean user_pass_result = false;
		boolean week_pass_result = false;

		int pratice_schedule_id = dto.getPractice_schedule_id();
		
		int score = 0;
		int score1 = 0;
		int score2 = 0;
		
		int total_score = 1;
		int total_score1 = 0;
		int total_score2 = 0;
		PracticesPracticescheduleDto s_scheduleInfo = new PracticesPracticescheduleDto();
		s_scheduleInfo.setId(pratice_schedule_id);
		
		PracticesPracticescheduleDto scheduleInfo = practicesService.getPracticeScheduleAsID(s_scheduleInfo);

		GoalsGoalconcentrationPracticeDto s_goalPracticeInfo = new GoalsGoalconcentrationPracticeDto();
		s_goalPracticeInfo.setSection(scheduleInfo.getSection());
		s_goalPracticeInfo.setPractice_type(dto.getPractice_type());
		s_goalPracticeInfo.setCourse_id(scheduleInfo.getCourse_id());
		s_goalPracticeInfo.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		
		GoalsGoalconcentrationPracticeDto goalPracticeInfo = goalService.getGoalToPractice(s_goalPracticeInfo);
		
		if(pass_result) {
			score = 1;
			if(goalPracticeInfo.getDelay_yn().equals("Y")) {
				out_pass_result = true;
			}
		}
		
		PracticesPracticeresultStaticDto s_resultStaticInfo = new PracticesPracticeresultStaticDto();
		s_resultStaticInfo.setSection(scheduleInfo.getSection());
		s_resultStaticInfo.setPractice_type(scheduleInfo.getPractice_type());
		s_resultStaticInfo.setBook(scheduleInfo.getBook());
		s_resultStaticInfo.setVolume(scheduleInfo.getVolume());
		s_resultStaticInfo.setGroup(scheduleInfo.getGroup());
		s_resultStaticInfo.setArticle(scheduleInfo.getArticle());
		s_resultStaticInfo.setPassage(dto.getPassage());
		s_resultStaticInfo.setParagraph(scheduleInfo.getEnd_paragraph());
		s_resultStaticInfo.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		PracticesPracticeresultStaticDto resultStatic = practicesService.getPracticeResultStatic(s_resultStaticInfo);
		
		PracticesPracticeresultStaticDto resultStaticInfo = new PracticesPracticeresultStaticDto();
		resultStaticInfo.setSection(scheduleInfo.getSection());
		resultStaticInfo.setPractice_type(scheduleInfo.getPractice_type());
		resultStaticInfo.setBook(scheduleInfo.getBook());
		resultStaticInfo.setVolume(scheduleInfo.getVolume());
		resultStaticInfo.setGroup(scheduleInfo.getGroup());
		resultStaticInfo.setArticle(scheduleInfo.getArticle());
		resultStaticInfo.setPassage(dto.getPassage());
		resultStaticInfo.setParagraph(scheduleInfo.getEnd_paragraph());
		resultStaticInfo.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		
		resultStaticInfo.setScore(score);
		resultStaticInfo.setScore1(score1);
		resultStaticInfo.setScore2(score2);
		
		resultStaticInfo.setTotal_score(total_score);
		resultStaticInfo.setTotal_score1(total_score1);
		resultStaticInfo.setTotal_score2(total_score2);
		
		resultStaticInfo.setPass_result(pass_result);
		resultStaticInfo.setOut_pass_result(out_pass_result);
		resultStaticInfo.setUser_pass_result(user_pass_result);
		resultStaticInfo.setWeek_pass_result(week_pass_result);
		
		if(resultStatic == null) {
			practicesService.insertPracticeResultStatic(resultStaticInfo);
		}else {
			resultStaticInfo.setId(resultStatic.getId());
			practicesService.updatePracticeResultStatic(resultStaticInfo);
		}
	}
	
	
	@RequestMapping(value="/test/insertPracticeQuizResultAll.do")
	public @ResponseBody void insertPracticeQuizResultAll(HttpServletRequest request, PracticesPracticequizresultDto dto) throws Exception {
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int course_enrollment_id          = Integer.parseInt(jsonObj.get("course_enrollment_id").toString());
			boolean pass_result    = Boolean.parseBoolean(jsonObj.get("pass_result").toString());
			String result = jsonObj.get("result").toString();
			
			PracticesPracticequizresultDto sto = new PracticesPracticequizresultDto();
			sto.setSection(dto.getSection());
			sto.setPractice_type(dto.getPractice_type());
			sto.setPractice_schedule_id(dto.getPractice_schedule_id());
			sto.setPassage(dto.getPassage());
			sto.setCourse_enrollment_id(course_enrollment_id);
			sto.setPass_result(pass_result);
			sto.setResult(result);
		
			practicesService.insertPracticeQuizResult(sto);
			
			
			boolean out_pass_result = false;
			boolean user_pass_result = false;
			boolean week_pass_result = false;

			int pratice_schedule_id = dto.getPractice_schedule_id();
			
			int score = 0;
			int score1 = 0;
			int score2 = 0;
			
			int total_score = 1;
			int total_score1 = 0;
			int total_score2 = 0;
			PracticesPracticescheduleDto s_scheduleInfo = new PracticesPracticescheduleDto();
			s_scheduleInfo.setId(pratice_schedule_id);
			
			PracticesPracticescheduleDto scheduleInfo = practicesService.getPracticeScheduleAsID(s_scheduleInfo);

			GoalsGoalconcentrationPracticeDto s_goalPracticeInfo = new GoalsGoalconcentrationPracticeDto();
			s_goalPracticeInfo.setSection(scheduleInfo.getSection());
			s_goalPracticeInfo.setPractice_type(dto.getPractice_type());
			s_goalPracticeInfo.setCourse_id(scheduleInfo.getCourse_id());
			s_goalPracticeInfo.setCourse_enrollment_id(course_enrollment_id);
			
			GoalsGoalconcentrationPracticeDto goalPracticeInfo = goalService.getGoalToPractice(s_goalPracticeInfo);
			
			if(pass_result) {
				score = 1;
				if(goalPracticeInfo.getDelay_yn().equals("Y")) {
					out_pass_result = true;
				}
			}
			
			PracticesPracticeresultStaticDto s_resultStaticInfo = new PracticesPracticeresultStaticDto();
			s_resultStaticInfo.setSection(scheduleInfo.getSection());
			s_resultStaticInfo.setPractice_type(scheduleInfo.getPractice_type());
			s_resultStaticInfo.setBook(scheduleInfo.getBook());
			s_resultStaticInfo.setVolume(scheduleInfo.getVolume());
			s_resultStaticInfo.setGroup(scheduleInfo.getGroup());
			s_resultStaticInfo.setArticle(scheduleInfo.getArticle());
			s_resultStaticInfo.setPassage(dto.getPassage());
			s_resultStaticInfo.setParagraph(scheduleInfo.getEnd_paragraph());
			s_resultStaticInfo.setCourse_enrollment_id(dto.getCourse_enrollment_id());
			PracticesPracticeresultStaticDto resultStatic = practicesService.getPracticeResultStatic(s_resultStaticInfo);
			
			PracticesPracticeresultStaticDto resultStaticInfo = new PracticesPracticeresultStaticDto();
			resultStaticInfo.setSection(scheduleInfo.getSection());
			resultStaticInfo.setPractice_type(scheduleInfo.getPractice_type());
			resultStaticInfo.setBook(scheduleInfo.getBook());
			resultStaticInfo.setVolume(scheduleInfo.getVolume());
			resultStaticInfo.setGroup(scheduleInfo.getGroup());
			resultStaticInfo.setArticle(scheduleInfo.getArticle());
			resultStaticInfo.setPassage(dto.getPassage());
			resultStaticInfo.setParagraph(scheduleInfo.getEnd_paragraph());
			resultStaticInfo.setCourse_enrollment_id(course_enrollment_id);
			
			resultStaticInfo.setScore(score);
			resultStaticInfo.setScore1(score1);
			resultStaticInfo.setScore2(score2);
			
			resultStaticInfo.setTotal_score(total_score);
			resultStaticInfo.setTotal_score1(total_score1);
			resultStaticInfo.setTotal_score2(total_score2);
			
			resultStaticInfo.setPass_result(pass_result);
			resultStaticInfo.setOut_pass_result(out_pass_result);
			resultStaticInfo.setUser_pass_result(user_pass_result);
			resultStaticInfo.setWeek_pass_result(week_pass_result);
			
			if(resultStatic == null) {
				practicesService.insertPracticeResultStatic(resultStaticInfo);
			}else {
				resultStaticInfo.setId(resultStatic.getId());
				practicesService.updatePracticeResultStatic(resultStaticInfo);
			}
		}
		
	}
	
}