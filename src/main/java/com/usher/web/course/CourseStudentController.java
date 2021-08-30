package com.usher.web.course;

import java.util.HashMap;
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

import com.usher.service.BatchService;
import com.usher.service.CoursesService;
import com.usher.service.EnrollmentsService;
import com.usher.service.PracticesService;
import com.usher.service.StudentsService;
import com.usher.util.SessionUtil;
import com.usher.dto.CoursesSemesterDto;
import com.usher.dto.EnrollmentsRepetitionenrollmentDto;
import com.usher.dto.PracticesPracticescheduleDto;
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.dto.PracticesPracticesectiontypeDto;
import com.usher.dto.StudentsStudentDto;
import com.usher.dto.CoursesCoursegroupDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.BatchStatsDto;
import com.usher.dto.CoursesCourseAchieveDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.CoursesCoursePracticeDto;

@Controller
public class CourseStudentController{
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	PracticesService practicesService; 
	
	@Autowired
	BatchService batchService;
	
	@Autowired
	EnrollmentsService enrollmentsService;
	
	@Autowired
	StudentsService studentsService;
	
	@RequestMapping(value="/course/course_student.do")
	public String course_student(HttpServletRequest request,
			ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";

		url = "course/course_student";
		return url;
	}
	
	@RequestMapping(value="/course/getCourseStudentList.do")
	public @ResponseBody Map getCourseStudentList(HttpServletRequest request, BatchStatsDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		
		List<BatchStatsDto> courseNewList = batchService.getBatchStatsCourseNewList(dto);
		resultMap.put("courseNewList", courseNewList);
		List<BatchStatsDto> courseExistsList = batchService.getBatchStatsCourseExistsList(dto);
		resultMap.put("courseExistsList", courseExistsList);
		List<BatchStatsDto> enrollmentNewList = batchService.getBatchStatsEnrollmentNewList(dto);
		resultMap.put("enrollmentNewList", enrollmentNewList);
		return resultMap;
	}
	
	@RequestMapping(value="/course/getCourseStudentSpecialList.do")
	public @ResponseBody Map getCourseStudentSpecialList(HttpServletRequest request, BatchStatsDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		
		List<BatchStatsDto> courseNewList = batchService.getBatchStatsCourseNewSpecialList(dto);
		resultMap.put("courseNewList", courseNewList);
		List<BatchStatsDto> courseExistsList = batchService.getBatchStatsCourseExistsSpecialList(dto);
		resultMap.put("courseExistsList", courseExistsList);
		List<BatchStatsDto> enrollmentNewList = batchService.getBatchStatsEnrollmentNewList(dto);
		resultMap.put("enrollmentNewList", enrollmentNewList);
		return resultMap;
	}
	
	@RequestMapping(value="/course/course_student_form.do")
	public String course_student_form(HttpServletRequest request, BatchStatsDto dto, ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		modelMap.addAttribute("statsInfo", dto);
		return "course/course_student_form";
	}
	
	@RequestMapping(value="/course/getCourseNewStudentList.do")
	public @ResponseBody List<BatchStatsDto> getCourseNewStudentList(HttpServletRequest request, BatchStatsDto dto) throws Exception {
		
		return batchService.getBatchStatsNewList(dto);
	}
	
	@RequestMapping(value="/course/course_student_exists_form.do")
	public String course_student_exists_form(HttpServletRequest request, BatchStatsDto dto, ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		modelMap.addAttribute("statsInfo", dto);
		return "course/course_student_exists_form";
	}
	
	@RequestMapping(value="/course/getCourseExistsStudentList.do")
	public @ResponseBody Map getCourseExistsStudentList(HttpServletRequest request, BatchStatsDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		
		List<BatchStatsDto> courseExistsList = batchService.getBatchStatsCourseExistsList(dto);
		resultMap.put("courseExistsList", courseExistsList);

		EnrollmentsRepetitionenrollmentDto dto1 = new EnrollmentsRepetitionenrollmentDto();
		dto1.setSemester_date(dto.getSemester_date());
		dto1.setPrev_semester_date(dto.getPrev_semester_date());
		List<EnrollmentsRepetitionenrollmentDto> repetitionList = enrollmentsService.getEnrollmentsRepetitionSemesterList(dto1);
		resultMap.put("repetitionList", repetitionList);
		
		StudentsStudentDto dto2 = new StudentsStudentDto();
		dto2.setSemester_date(dto.getSemester_date());
		dto2.setPrev_semester_date(dto.getPrev_semester_date());
		List<StudentsStudentDto> studentList = studentsService.getStudentsStudentSemesterList(dto2);
		resultMap.put("studentList", studentList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/course/course_student_not_form.do")
	public String course_student_not_form(HttpServletRequest request, BatchResultDto dto, ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		modelMap.addAttribute("batchInfo", dto);
		return "course/course_student_not_form";
	}
	
	@RequestMapping(value="/course/getBatchResultUserMultiList.do")
	public @ResponseBody List<BatchResultDto> getBatchResultUserMultiList(HttpServletRequest request,
						BatchResultDto dto,
						ModelMap modelMap) throws Exception {
		
		return batchService.getBatchResultUserMultiList(dto);
	}
}