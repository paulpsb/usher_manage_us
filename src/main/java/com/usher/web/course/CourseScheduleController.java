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

import com.usher.service.CoursesService;
import com.usher.service.PracticesService;
import com.usher.util.SessionUtil;
import com.usher.dto.CoursesSemesterDto;
import com.usher.dto.PracticesPracticeproblemDto;
import com.usher.dto.PracticesPracticescheduleDto;
import com.usher.dto.PracticesPracticescheduleHomeworkDto;
import com.usher.dto.PracticesPracticesectiontypeDto;
import com.usher.dto.CoursesCoursegroupDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.CoursesCoursePracticeDto;

@Controller
public class CourseScheduleController{
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	PracticesService practicesService; 
	
	@RequestMapping(value="/course/course_schedule.do")
	public String course(HttpServletRequest request,
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

		url = "course/course_schedule";
		return url;
	}
	

	@RequestMapping(value="/course/getScheduleList.do")
	public @ResponseBody Map getScheduleList(HttpServletRequest request, PracticesPracticescheduleDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		
		CoursesCourseDto dto1  = new CoursesCourseDto();
		dto1.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto1);
		resultMap.put("courseInfo", courseInfo);
		
		/*
		PracticesPracticesectiontypeDto dto2 = new PracticesPracticesectiontypeDto();
		dto2.setSection(dto.getSection());
		List<PracticesPracticesectiontypeDto> typeList = practicesService.getPracticeSectionTypeList(dto2);
		resultMap.put("typeList", typeList);
		*/
		CoursesCoursePracticeDto dto2 = new CoursesCoursePracticeDto();
		dto2.setCourse_id(dto.getCourse_id());
		dto2.setSection(dto.getSection());
		List<CoursesCoursePracticeDto> typeList = coursesService.getCoursesCoursePracticeList(dto2);
		resultMap.put("typeList", typeList);
		
		List<PracticesPracticescheduleDto> scheduleList =  practicesService.getPracticeScheduleList(dto);
		resultMap.put("scheduleList", scheduleList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/course/updateSchedule.do")
	public @ResponseBody void updateSchedule(HttpServletRequest request, PracticesPracticescheduleDto dto) throws Exception {
		int practice_schedule_id = dto.getId();
		System.out.println("practice_schedule_id==>"+practice_schedule_id);
		practicesService.updatePracticeSchedule(dto);

		PracticesPracticescheduleHomeworkDto sto1 = new PracticesPracticescheduleHomeworkDto();
		sto1.setPractice_schedule_id(practice_schedule_id);
		sto1.setStatus(dto.getStatus());
		
		practicesService.updatePracticeScheduleHomeworkAsSchedule(sto1);
	}

	@RequestMapping(value="/course/saveSchedule.do")
	public @ResponseBody void saveSchedule(HttpServletRequest request, PracticesPracticescheduleDto dto) throws Exception {
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			
			String status = jsonObj.get("status").toString();
			String section = jsonObj.get("section").toString();
			String practice_type = jsonObj.get("practice_type").toString();
			String score_type = jsonObj.get("score_type").toString();
			String name = jsonObj.get("name").toString();
			int total_score = Integer.parseInt(jsonObj.get("total_score").toString());
			String life_cycle = jsonObj.get("life_cycle").toString();
			String date = jsonObj.get("date").toString();
			String homework_date =jsonObj.get("homework_date").toString();
			int course_id = Integer.parseInt(jsonObj.get("course_id").toString());
			int practice_problem_id = Integer.parseInt(jsonObj.get("practice_problem_id").toString());
			int exam_time = Integer.parseInt(jsonObj.get("exam_time").toString());
			int exam_count = Integer.parseInt(jsonObj.get("exam_count").toString());;
			int start_paragraph = Integer.parseInt(jsonObj.get("start_paragraph").toString());
			int end_paragraph = Integer.parseInt(jsonObj.get("end_paragraph").toString());
			
			PracticesPracticescheduleDto sto = new PracticesPracticescheduleDto();
			
			sto.setStatus(status);
			sto.setSection(section);
			sto.setPractice_type(practice_type);
			sto.setScore_type(score_type);
			sto.setName(name);
			sto.setTotal_score(total_score);
			sto.setLife_cycle(life_cycle);
			sto.setDate(date);
			sto.setCourse_id(course_id);
			sto.setPractice_problem_id(practice_problem_id);
			sto.setExam_time(exam_time);
			sto.setExam_count(exam_count);
			sto.setStart_paragraph(start_paragraph);
			sto.setEnd_paragraph(end_paragraph);
			practicesService.insertPracticeSchedule(sto);
			
			if(!homework_date.equals("None")) {
				PracticesPracticescheduleHomeworkDto sto1 = new PracticesPracticescheduleHomeworkDto();
				
				if(practice_type.equals("TENTIMES")){
					exam_count = exam_time;
					exam_time = 10;
				}
				sto1.setStatus(status);
				sto1.setSection(section);
				sto1.setPractice_type(practice_type);
				sto1.setName(name);
				sto1.setDate(homework_date);
				sto1.setCourse_id(course_id);
				sto1.setCourse_enrollment_id(0);
				sto1.setPractice_problem_id(practice_problem_id);
				sto1.setStart_paragraph(start_paragraph);
				sto1.setEnd_paragraph(end_paragraph);
				sto1.setExam_time(exam_time);
				sto1.setExam_count(exam_count);
				sto1.setTest_type("ALL");
				sto1.setPractice_schedule_id(sto.getId());
				practicesService.insertPracticeScheduleHomework(sto1);
			}
			
			
		}
		
		String data_value1 = dto.getData_value1();
		JSONParser jsonParser1 = new JSONParser();
		Object obj1 = jsonParser1.parse(data_value1);
		JSONArray jsonArray1 = (JSONArray)obj1;
		for(int i=0;i<jsonArray1.size();i++){
			JSONObject jsonObj1 = (JSONObject)jsonArray1.get(i);
			PracticesPracticescheduleDto sto = new PracticesPracticescheduleDto();
			sto.setId(Integer.parseInt(jsonObj1.get("schedule_id").toString()));
			sto.setStart_paragraph(Integer.parseInt(jsonObj1.get("start_paragraph").toString()));
			sto.setEnd_paragraph(Integer.parseInt(jsonObj1.get("end_paragraph").toString()));
			sto.setExam_time(Integer.parseInt(jsonObj1.get("exam_time").toString()));
			sto.setExam_count(Integer.parseInt(jsonObj1.get("exam_count").toString()));
			practicesService.updatePracticeScheduleParagraph(sto);
			
			PracticesPracticescheduleHomeworkDto sto1 = new PracticesPracticescheduleHomeworkDto();
			sto1.setPractice_schedule_id(Integer.parseInt(jsonObj1.get("schedule_id").toString()));
			sto1.setStart_paragraph(Integer.parseInt(jsonObj1.get("start_paragraph").toString()));
			sto1.setEnd_paragraph(Integer.parseInt(jsonObj1.get("end_paragraph").toString()));
			
			practicesService.updatePracticeScheduleHomeworkParagraphAsSchedule(sto1);
		}

	}
}