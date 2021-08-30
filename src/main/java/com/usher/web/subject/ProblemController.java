package com.usher.web.subject;

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

import com.usher.dto.InternalExamsProblemDto;
import com.usher.dto.PracticesPracticeproblemDto;
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.service.InternalExamsService;
import com.usher.service.PracticesService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class ProblemController{
	@Autowired
	PracticesService practicesService; 
	
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/subject/problem.do")
	public String schedule(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "subject/problem";
	}
	
	
	@RequestMapping(value="/subject/getProblemList.do")
	public @ResponseBody List<PracticesPracticeproblemDto> getProblemList(HttpServletRequest request,
						PracticesPracticeproblemDto dto,
						ModelMap modelMap) throws Exception {
		return practicesService.getProblemList(dto);
	}
	
	@RequestMapping(value="/subject/getProblem.do")
	public @ResponseBody PracticesPracticeproblemDto getProblem(HttpServletRequest request,
						PracticesPracticeproblemDto dto,
						ModelMap modelMap) throws Exception {
		return practicesService.getProblem(dto);
	}
	
	
	@RequestMapping(value="/subject/insertProblem.do")
	public @ResponseBody void insertProblem(HttpServletRequest request,
						PracticesPracticeproblemDto dto,
						ModelMap modelMap) throws Exception {
		practicesService.insertProblem(dto);
	}
	
	@RequestMapping(value="/subject/updateProblem.do")
	public @ResponseBody void updateProblem(HttpServletRequest request,
						PracticesPracticeproblemDto dto,
						ModelMap modelMap) throws Exception {
		practicesService.updateProblem(dto);
		
		PracticesPracticeproblemDto rto = practicesService.getProblem(dto);
		
		InternalExamsProblemDto ito = new InternalExamsProblemDto();
		ito.setSection(dto.getSection());
		ito.setBook(dto.getBook());
		ito.setVolume(dto.getVolume());
		ito.setGroup(dto.getGroup());
		ito.setArticle(dto.getArticle());
		ito.setOld_section(rto.getSection());
		ito.setOld_book(rto.getBook());
		ito.setOld_volume(rto.getVolume());
		ito.setOld_group(rto.getGroup());
		ito.setOld_article(rto.getArticle());
		
		internalExamsService.updateExamsProblemExam(ito);
		
	}
	
	@RequestMapping(value="/subject/deleteProblem.do")
	public @ResponseBody void deleteProblem(HttpServletRequest request,
						PracticesPracticeproblemDto dto,
						ModelMap modelMap) throws Exception {
		practicesService.deleteProblem(dto);
	}
}