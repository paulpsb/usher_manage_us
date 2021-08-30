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
import com.usher.dto.PracticesPracticetypeDto;
import com.usher.service.InternalExamsService;
import com.usher.service.PracticesService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class TypeController{
	@Autowired
	PracticesService practicesService; 
	
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/subject/type.do")
	public String type(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "subject/type";
	}
	
	@RequestMapping(value="/subject/getTypeList.do")
	public @ResponseBody List<PracticesPracticetypeDto> getTypeList(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		return practicesService.getPracticeTypeList();
	}
	
	@RequestMapping(value="/subject/saveType.do")
	public @ResponseBody void saveType(HttpServletRequest request,
						PracticesPracticetypeDto dto,
						ModelMap modelMap) throws Exception {
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int type_id = Integer.parseInt(jsonObj.get("type_id").toString());
			String practice_type = jsonObj.get("practice_type").toString();
			String practice_name = jsonObj.get("practice_name").toString();
			String program_use =  jsonObj.get("program_use").toString();
			int type_order = Integer.parseInt(jsonObj.get("type_order").toString());
			String paragraph_use =  jsonObj.get("paragraph_use").toString();
			String type_comment =  jsonObj.get("type_comment").toString();
			
			
			PracticesPracticetypeDto sto = new PracticesPracticetypeDto();
			sto.setId(type_id);
			sto.setStatus("ACTIVE");
			sto.setPractice_type(practice_type);
			sto.setPractice_name(practice_name);
			sto.setProgram_use(program_use);
			sto.setType_order(type_order);
			sto.setParagraph_use(paragraph_use);
			sto.setType_comment(type_comment);
			if(type_id > 0) {
				practicesService.updatePracticeType(sto);
			}else {
				practicesService.insertPracticeType(sto);
			}

		}
	}

}