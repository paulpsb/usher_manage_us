package com.usher.web.course;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.service.AuthService;
import com.usher.service.CoursesService;
import com.usher.util.SessionUtil;
import com.usher.dto.CoursesSemesterDto;
import com.usher.dto.CoursesCoursegroupDto;
import com.usher.dto.AuthUserDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.CoursesCourseTimetableDto;

@Controller
public class CourseTimetableController{
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	AuthService authService;
	
	@RequestMapping(value="/course/course_timetable.do")
	public String timetable(HttpServletRequest request,
			ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";

		url = "course/course_timetable";
		return url;
	}
	
	@RequestMapping(value="/course/getAuthUserSearchList.do")
	public @ResponseBody List<AuthUserDto> getAuthUserSearchList(HttpServletRequest request,
						AuthUserDto dto, 
						ModelMap modelMap) throws Exception {
		
		return authService.getUserSearchList(dto);
	}
	
	
	@RequestMapping(value="/course/getCourseGroupTimeTableList.do")
	public @ResponseBody List<CoursesCourseTimetableDto> getCourseGroupTimeTableList(HttpServletRequest request,
						CoursesCourseTimetableDto dto, 
						ModelMap modelMap) throws Exception {
		
		return coursesService.getCourseGroupTimeTableList(dto);
	}
	
	@RequestMapping(value="/course/getCourseGroupTimeTableDailyList.do")
	public @ResponseBody List<CoursesCourseTimetableDto> getCourseGroupTimeTableDailyList(HttpServletRequest request,
						CoursesCourseTimetableDto dto, 
						ModelMap modelMap) throws Exception {
		
		return coursesService.getCourseGroupTimeTableDailyList(dto);
	}
	
	
	@RequestMapping(value="/course/saveCourseTimeTable.do")
	public @ResponseBody void saveCourseTimeTable(HttpServletRequest request,
						CoursesCourseTimetableDto dto, 
						ModelMap modelMap) throws Exception {
		
		coursesService.deleteCourseTimeTable(dto);
		coursesService.deleteCourseTimeTableDailyAll(dto);
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			CoursesCourseTimetableDto sto = new CoursesCourseTimetableDto();
			sto.setSection(jsonObj.get("section").toString());
			sto.setStudy_type(jsonObj.get("study_type").toString());
			sto.setClass_hour(jsonObj.get("class_hour").toString());
			sto.setUser_id(Integer.parseInt(jsonObj.get("user_id").toString()));
			sto.setCourse_id(Integer.parseInt(jsonObj.get("course_id").toString()));
			coursesService.insertCourseTimeTable(sto);
		}
		coursesService.insertCourseTimeTableDailyAll(dto);
	}
	
	
	@RequestMapping(value="/course/saveCourseTimeTableDaily.do")
	public @ResponseBody void saveCourseTimeTableDaily(HttpServletRequest request,
						CoursesCourseTimetableDto dto, 
						ModelMap modelMap) throws Exception {
		
		coursesService.deleteCourseTimeTableDaily(dto);
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			CoursesCourseTimetableDto sto = new CoursesCourseTimetableDto();
			sto.setDate(dto.getDate());
			sto.setSection(jsonObj.get("section").toString());
			sto.setStudy_type(jsonObj.get("study_type").toString());
			sto.setClass_hour(jsonObj.get("class_hour").toString());
			sto.setUser_id(Integer.parseInt(jsonObj.get("user_id").toString()));
			sto.setCourse_id(Integer.parseInt(jsonObj.get("course_id").toString()));
			coursesService.insertCourseTimeTableDaily(sto);
		}
	}
}