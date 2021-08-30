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

import com.usher.dto.BatchResultDto;
import com.usher.dto.StudentsStudentDto;
import com.usher.service.BatchService;
import com.usher.service.StudentsService;
import com.usher.util.SessionUtil;


@Controller
public class SearchStudentController{
	@Autowired
	StudentsService studentsService;
	
	@Autowired
	BatchService batchService; 
	
	@RequestMapping(value="/main/search_student.do")
	public String login(HttpServletRequest request,
					StudentsStudentDto dto,
					ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("searchInfo", dto);
		String url = "";
		
		url = "main/search_student";
		return url;
	}
	
	@RequestMapping(value="/main/getSearchStudentList.do")
	public @ResponseBody Map getSearchStudentList(HttpServletRequest request, StudentsStudentDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		
		List<StudentsStudentDto> searchList = studentsService.getStudentsStudentSearchList(dto);
		List<StudentsStudentDto> enrollmentList = studentsService.getStudentsStudentSearchEnrollmentList(dto);
		resultMap.put("searchList", searchList);
		resultMap.put("enrollmentList", enrollmentList);
		return resultMap;
	}
	
	@RequestMapping(value="/main/getBatchResultUserList.do")
	public @ResponseBody List<BatchResultDto> getBatchResult(HttpServletRequest request,
						BatchResultDto dto,
						ModelMap modelMap) throws Exception {
		
		return batchService.getBatchResultUserList(dto);
	}
}