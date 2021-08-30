package com.usher.web.enrollment;

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
import com.usher.service.EnrollmentsService;

import com.usher.dto.EnrollmentsCourseenrollmentDto;
import com.usher.dto.EnrollmentsSeatenrollmentDto;
import com.usher.dto.CoursesCourseDto;

import com.usher.util.SessionUtil;


@Controller
public class SeatController{
	@Autowired
	EnrollmentsService enrollmentsService;
	
	@Autowired
	CoursesService coursesService;
	
	@RequestMapping(value="/enrollment/seat.do")
	public String seat(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";
		
		url = "enrollment/seat";
		return url;
	}
	
	
	@RequestMapping(value="/enrollment/getSeatList.do")
	public @ResponseBody Map getSeatList(HttpServletRequest request, CoursesCourseDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		CoursesCourseDto courseInfo = coursesService.getCourse(dto);
		
		EnrollmentsCourseenrollmentDto dto1 = new EnrollmentsCourseenrollmentDto();
		dto1.setCourse_id(dto.getId());
		
		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentList(dto1);
		
		EnrollmentsSeatenrollmentDto dto2 = new EnrollmentsSeatenrollmentDto();
		dto2.setCourse_id(dto.getId());
		List<EnrollmentsSeatenrollmentDto> seatEnrollmentList = enrollmentsService.getSeatenrollmentList(dto2);
		resultMap.put("courseInfo", courseInfo);
		resultMap.put("enrollmentList", enrollmentList);
		resultMap.put("seatEnrollmentList", seatEnrollmentList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/enrollment/saveSeatList.do")
	public @ResponseBody void saveSeatList(HttpServletRequest request, CoursesCourseDto dto) throws Exception {
		
		coursesService.updateCourse(dto);
		
		EnrollmentsSeatenrollmentDto dto1 = new EnrollmentsSeatenrollmentDto();
		dto1.setCourse_id(dto.getId());
		
		enrollmentsService.deleteSeatenrollment(dto1);
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);

			EnrollmentsSeatenrollmentDto dto2 = new EnrollmentsSeatenrollmentDto();
			dto2.setSeat_row(Integer.parseInt(jsonObj.get("seat_row").toString()));
			dto2.setSeat_col(Integer.parseInt(jsonObj.get("seat_col").toString()));
			dto2.setCourse_id(Integer.parseInt(jsonObj.get("course_id").toString()));
			dto2.setSemester_enrollment_id(Integer.parseInt(jsonObj.get("semester_enrollment_id").toString()));
			
			enrollmentsService.insertSeatenrollment(dto2);			

		}
	}
}