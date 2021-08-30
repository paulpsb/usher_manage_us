package com.usher.web.course;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.service.BaseService;
import com.usher.service.CoursesService;
import com.usher.util.SessionUtil;
import com.usher.dto.CoursesSemesterDto;
import com.usher.dto.PracticesPracticescheduleDto;
import com.usher.dto.CoursesCoursegroupDto;
import com.usher.dto.BaseAddressDto;
import com.usher.dto.CoursesCourseDto;

@Controller
public class CourseController{
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	BaseService baseService; 
	
	@RequestMapping(value="/course/course.do")
	public String course(HttpServletRequest request,
			CoursesCourseDto dto,
			ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("courseInfo", dto);
		
		List<BaseAddressDto> addressList = baseService.getBaseAddressList();
		modelMap.addAttribute("addressList", addressList);
		
		String url = "";

		url = "course/course";
		return url;
	}
	
	@RequestMapping(value="/course/getCourse.do")
	public @ResponseBody CoursesCourseDto getCourse(HttpServletRequest request, CoursesCourseDto dto) throws Exception {
		return coursesService.getCourse(dto);

	}

	@RequestMapping(value="/course/updateCourseRoom.do")
	public @ResponseBody void updateCourseRoom(HttpServletRequest request, CoursesCourseDto dto) throws Exception {
		coursesService.updateCourseRoom(dto);

	}
	
	@RequestMapping(value="/course/updateCourseSection.do")
	public @ResponseBody void updateCourseSection(HttpServletRequest request, CoursesCourseDto dto) throws Exception {
		coursesService.updateCourseSection(dto);

	}
	
	@RequestMapping(value="/course/updateCourseZommUrl.do")
	public @ResponseBody void updateCourseZommUrl(HttpServletRequest request, CoursesCourseDto dto) throws Exception {
		coursesService.updateCourseZommUrl(dto);

	}
	

	@RequestMapping(value="/course/updateCourseInstructor.do")
	public @ResponseBody void updateCourseInstructor(HttpServletRequest request, CoursesCourseDto dto) throws Exception {
		coursesService.updateCourseInstructor(dto);

	}
	
	@RequestMapping(value="/course/updateCourseManager.do")
	public @ResponseBody void updateCourseManager(HttpServletRequest request, CoursesCourseDto dto) throws Exception {
		coursesService.updateCourseManager(dto);

	}
	
	
}