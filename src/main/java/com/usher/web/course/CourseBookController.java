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

import com.usher.service.BaseService;
import com.usher.service.CoursesService;
import com.usher.util.SessionUtil;
import com.usher.dto.CoursesSemesterDto;
import com.usher.dto.PracticesPracticescheduleDto;
import com.usher.dto.CoursesCoursegroupDto;
import com.usher.dto.BaseBookDto;
import com.usher.dto.CoursesCourseBookDto;
import com.usher.dto.CoursesCourseDto;

@Controller
public class CourseBookController{
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	BaseService baseService;
	
	@RequestMapping(value="/course/course_book.do")
	public String course(HttpServletRequest request,
			ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";

		url = "course/course_book";
		return url;
	}
	
	@RequestMapping(value="/course/getCourseGroupBookList.do")
	public @ResponseBody List<CoursesCourseBookDto> getCourseGroupBookList(HttpServletRequest request, CoursesCourseBookDto dto) throws Exception {
		return coursesService.getCourseGroupBookList(dto);

	}

	@RequestMapping(value="/course/getCourseBookList.do")
	public @ResponseBody Map getCourseBookList(HttpServletRequest request, CoursesCourseBookDto dto) throws Exception {
		Map resultMap = new HashMap();
		
		List<CoursesCourseBookDto> courseBookList = coursesService.getCourseBookList(dto);
		resultMap.put("courseBookList", courseBookList);
		
		BaseBookDto dto1 = new BaseBookDto();
		dto1.setStatus("ACTIVE");
		List<BaseBookDto> baseBookList = baseService.getBaseBookList(dto1);
		resultMap.put("baseBookList", baseBookList);
		
		return resultMap;

	}

	
	@RequestMapping(value="/course/saveCourseBook.do")
	public @ResponseBody void updateCourseRoom(HttpServletRequest request, CoursesCourseBookDto dto) throws Exception {
		coursesService.deleteCourseBook(dto);
		
		String data_value = dto.getData_value();
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int book_id = Integer.parseInt(jsonObj.get("book_id").toString());
			CoursesCourseBookDto sto = new CoursesCourseBookDto();
			sto.setStatus("ACTIVE");
			sto.setCourse_id(dto.getCourse_id());
			sto.setBook_id(book_id);
			coursesService.insertCourseBook(sto);
		}
	}
	
}