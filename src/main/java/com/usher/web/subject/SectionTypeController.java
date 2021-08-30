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
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.dto.PracticesPracticesectiontypeDto;
import com.usher.dto.PracticesPracticetypeDto;
import com.usher.service.InternalExamsService;
import com.usher.service.PracticesService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class SectionTypeController{
	@Autowired
	PracticesService practicesService; 
	
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/subject/section_type.do")
	public String section_type(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "subject/section_type";
	}
	
	@RequestMapping(value="/subject/section_type_url.do")
	public String section_type_url(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "subject/section_type_url";
	}
	
	@RequestMapping(value="/subject/getSectionTypeList.do")
	public @ResponseBody List<PracticesPracticesectiontypeDto> getSectionTypeList(HttpServletRequest request,
						PracticesPracticesectiontypeDto dto,
						ModelMap modelMap) throws Exception {
		return practicesService.getPracticeSectionTypeList(dto);
	}
	
	@RequestMapping(value="/subject/updateSectionTypeUrl.do")
	public @ResponseBody void updateSectionTypeUrl(HttpServletRequest request,
						PracticesPracticesectiontypeDto dto,
						ModelMap modelMap) throws Exception {
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int id = Integer.parseInt(jsonObj.get("section_type_id").toString());
			String is_study = jsonObj.get("is_study").toString();
			String is_exam = jsonObj.get("is_exam").toString();
			String is_homework = jsonObj.get("is_homework").toString();
			String is_homework_achieve = jsonObj.get("is_homework_achieve").toString();
			String study_url = jsonObj.get("study_url").toString();
			String exam_url = jsonObj.get("exam_url").toString();
			String homework_url = jsonObj.get("homework_url").toString();
			String study_result_url = jsonObj.get("study_result_url").toString();
			String exam_result_url = jsonObj.get("exam_result_url").toString();
			String homework_result_url = jsonObj.get("homework_result_url").toString();
			
			
			PracticesPracticesectiontypeDto sto = new PracticesPracticesectiontypeDto();
			sto.setId(id);
			sto.setIs_exam(is_exam);
			sto.setIs_study(is_study);
			sto.setIs_homework(is_homework);
			sto.setIs_homework_achieve(is_homework_achieve);
			sto.setExam_url(exam_url);
			sto.setStudy_url(study_url);
			sto.setHomework_url(homework_url);
			sto.setExam_result_url(exam_result_url);
			sto.setStudy_result_url(study_result_url);
			sto.setHomework_result_url(homework_result_url);
			practicesService.updatePracticeSectionType(sto);
		}
	}
	
	@RequestMapping(value="/subject/saveSectionType.do")
	public @ResponseBody void saveSectionType(HttpServletRequest request,
						PracticesPracticesectiontypeDto dto,
						ModelMap modelMap) throws Exception {
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		practicesService.deletePracticeSectionType(dto);
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			String section = jsonObj.get("section").toString();
			String practice_type = jsonObj.get("practice_type").toString();
			
			
			PracticesPracticesectiontypeDto sto = new PracticesPracticesectiontypeDto();
			sto.setStatus("ACTIVE");
			sto.setSection(section);
			sto.setPractice_type(practice_type);

			practicesService.insertPracticeSectionType(sto);
		}
	}

}