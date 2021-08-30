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
import com.usher.service.InternalExamsService;
import com.usher.service.PracticesService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class SectionController{
	@Autowired
	PracticesService practicesService; 
	
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/subject/section.do")
	public String section(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "subject/section";
	}
	
	@RequestMapping(value="/subject/getSectionList.do")
	public @ResponseBody List<PracticesPracticesectionDto> getSectionList(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		return practicesService.getPracticeSectionList();
	}
	
	@RequestMapping(value="/subject/saveSection.do")
	public @ResponseBody void saveSection(HttpServletRequest request,
						PracticesPracticesectionDto dto,
						ModelMap modelMap) throws Exception {
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int section_id = Integer.parseInt(jsonObj.get("section_id").toString());
			String section = jsonObj.get("section").toString();
			String short_title = jsonObj.get("short_title").toString();
			String short_title_kr = jsonObj.get("short_title_kr").toString();
			int section_order = Integer.parseInt(jsonObj.get("section_order").toString());
			
			
			PracticesPracticesectionDto sto = new PracticesPracticesectionDto();
			sto.setId(section_id);
			sto.setStatus("ACTIVE");
			sto.setSection(section);
			sto.setShort_title(short_title);
			sto.setShort_title_kr(short_title_kr);
			sto.setSection_order(section_order);

			if(section_id > 0) {
				practicesService.updatePracticeSection(sto);
				
				PracticesPracticesectionDto qto = practicesService.getPracticeSection(sto);
				InternalExamsProblemDto ito = new InternalExamsProblemDto();
				ito.setSection(sto.getSection());
				ito.setOld_section(qto.getSection());
				
				internalExamsService.updateExamsProblemPractice(ito);
			}else {
				practicesService.insertPracticeSection(sto);
			}

		}
	}

}