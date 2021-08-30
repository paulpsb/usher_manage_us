package com.usher.web.enrollment;

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
import com.usher.service.CoursesService;
import com.usher.service.EnrollmentsService;
import com.usher.service.PracticesService;
import com.usher.dto.EnrollmentsCourseenrollmentDto;
import com.usher.dto.EnrollmentsCourseenrollmentPracticeDto;
import com.usher.dto.EnrollmentsSeatenrollmentDto;
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.dto.PracticesPracticesectiontypeDto;
import com.usher.dto.AuthUserDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.util.ExcelUtil;
import com.usher.util.SessionUtil;


@Controller
public class CourseEnrollmentController{
	@Autowired
	EnrollmentsService enrollmentsService;
	
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	AuthService authService;
	
	@Autowired
	PracticesService practicesService; 
	
	@RequestMapping(value="/enrollment/course_enrollment.do")
	public String course_enrollment(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";
		
		url = "enrollment/course_enrollment";
		return url;
	}
	
	
	@RequestMapping(value="/enrollment/getCourseEnrollmentList.do")
	public @ResponseBody List<EnrollmentsCourseenrollmentDto>  getCourseEnrollmentList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		return enrollmentsService.getCourseenrollmentList(dto);
	}
	
	@RequestMapping(value="/enrollment/getCourseEnrollmentProgram.do")
	public @ResponseBody Map getCourseEnrollmentProgram(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		Map resultMap = new HashMap();
		EnrollmentsCourseenrollmentDto enrollmentInfo = enrollmentsService.getCourseenrollment(dto);
		resultMap.put("enrollmentInfo", enrollmentInfo);
		
		List<PracticesPracticesectionDto> sectionList = practicesService.getPracticeSectionList();
		resultMap.put("sectionList", sectionList);
		
		PracticesPracticesectiontypeDto dto1 = new PracticesPracticesectiontypeDto();
		dto1.setProgram_use("Y");
		List<PracticesPracticesectiontypeDto> practiceList = practicesService.getPracticeSectionTypeList(dto1);
		resultMap.put("practiceList", practiceList);
		
		EnrollmentsCourseenrollmentPracticeDto dto2 = new EnrollmentsCourseenrollmentPracticeDto();
		dto2.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		List<EnrollmentsCourseenrollmentPracticeDto> enrollmentPracticeList = enrollmentsService.getEnrollmentsCourseenrollmentPracticeList(dto2);
		resultMap.put("enrollmentPracticeList", enrollmentPracticeList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/enrollment/saveCourseEnrollmentProgram.do")
	public @ResponseBody void saveCourseEnrollmentProgram(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		enrollmentsService.updateCourseenrollmentProgramUse(dto);
		
		EnrollmentsCourseenrollmentPracticeDto dto1 = new EnrollmentsCourseenrollmentPracticeDto();
		dto1.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		enrollmentsService.deleteEnrollmentsCourseenrollmentPractice(dto1);
		
		if(dto.getProgram_not_use().equals("Y")) {
			int course_enrollment_id = dto.getCourse_enrollment_id();
			String data_value = dto.getData_value();
			
			JSONParser jsonParser = new JSONParser();
			Object obj = jsonParser.parse(data_value);
			JSONArray jsonArray = (JSONArray)obj;
			for(int i=0;i<jsonArray.size();i++){
				JSONObject jsonObj = (JSONObject)jsonArray.get(i);
				String status = jsonObj.get("status").toString();
				String section = jsonObj.get("section").toString();
				String practice_type = jsonObj.get("practice_type").toString();
				
				EnrollmentsCourseenrollmentPracticeDto sto = new EnrollmentsCourseenrollmentPracticeDto();
				sto.setStatus(status);
				sto.setSection(section);
				sto.setPractice_type(practice_type);
				sto.setCourse_enrollment_id(course_enrollment_id);
				
				enrollmentsService.insertEnrollmentsCourseenrollmentPractice(sto);
			}
			
		}
	}
	
	@RequestMapping(value="/enrollment/getCourseEnrollmentExcel.do")
	public void  getCourseEnrollmentExcel(HttpServletRequest request, HttpServletResponse response, EnrollmentsCourseenrollmentDto dto, Model model) throws Exception {
		CoursesCourseDto dto2 = new CoursesCourseDto();
		dto2.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto2);
		
		ExcelUtil ex = new ExcelUtil();

		List<EnrollmentsCourseenrollmentDto> excelList = enrollmentsService.getCourseenrollmentHandphoneBagList(dto);
		for(int i=0;i<excelList.size(); i++)
		{
			EnrollmentsCourseenrollmentDto eto = excelList.get(i);
			ex.setData("student_"+eto.getHandphone_bag(), eto.getStudent_name());
		}
		ex.setExcelUrl("handphone_bag.xlsx");
		
		ex.Export(request, response, "핸드폰가방이름표_"+courseInfo.getName()+"반.xlsx");
	}
	
	@RequestMapping(value="/enrollment/saveCourseEnrollmentList.do")
	public @ResponseBody void saveCourseEnrollmentList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int course_enrollment_id = Integer.parseInt(jsonObj.get("course_enrollment_id").toString());
			String chamgang_yn = jsonObj.get("chamgang_yn").toString();
			int bag_no = Integer.parseInt(jsonObj.get("bag_no").toString());
			int bag_sub_no = Integer.parseInt(jsonObj.get("bag_sub_no").toString());

			EnrollmentsCourseenrollmentDto dto2 = new EnrollmentsCourseenrollmentDto();
			dto2.setId(course_enrollment_id);
			dto2.setChamgang_yn(chamgang_yn);
			dto2.setBag_no(bag_no);
			dto2.setBag_sub_no(bag_sub_no);
			
			enrollmentsService.updateCourseenrollmentList(dto2);
		}
	}
	
	
	@RequestMapping(value="/enrollment/moveCourseEnrollment.do")
	public @ResponseBody void  moveCourseEnrollment(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		enrollmentsService.updateCourseenrollmentCourse(dto);
		
		EnrollmentsCourseenrollmentDto locationInfo = enrollmentsService.getCourseenrollmentAllocation(dto);
		
		EnrollmentsCourseenrollmentDto dto1 = new EnrollmentsCourseenrollmentDto();
		dto1.setAllocation_id(locationInfo.getId());
		dto1.setCurrent_course_id(dto.getCourse_id());
		
		enrollmentsService.updateCourseenrollmentAllocation(dto1);
		enrollmentsService.insertCourseenrollmentAllocationLog(dto1);
	}
	
	
	@RequestMapping(value="/enrollment/saveUserSchool.do")
	public @ResponseBody void  saveUserSchool(HttpServletRequest request, AuthUserDto dto) throws Exception {
		AuthUserDto schoolInfo = authService.getUserSchool(dto);
		if(schoolInfo == null) {
			authService.insertUserSchool(dto);
		}else {
			authService.updateUserSchool(dto);
		}
		
	}
}