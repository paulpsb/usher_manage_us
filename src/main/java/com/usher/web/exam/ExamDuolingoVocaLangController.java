package com.usher.web.exam;

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

import com.usher.dto.AuthUserDto;
import com.usher.dto.InternalExamsChainDto;
import com.usher.dto.InternalExamsDuolingoVocaLangDto;
import com.usher.service.InternalExamsService;

import com.usher.util.SessionUtil;


@Controller
public class ExamDuolingoVocaLangController{
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/exam/duolingo_voca_lang_list.do")
	public String duolingo_voca_lang_list(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";
		
		url = "exam/duolingo_voca_lang_list";
		return url;
	}
	
	@RequestMapping(value="/exam/getExamsDuolingoVocaLangList.do")
	public @ResponseBody List<InternalExamsDuolingoVocaLangDto>  getExamsDuolingoVocaLangList(HttpServletRequest request,
					InternalExamsDuolingoVocaLangDto dto, 
						ModelMap modelMap) throws Exception {
		return internalExamsService.getExamsDuolingoVocaLangList(dto);
	}
	
	@RequestMapping(value="/exam/saveExamsDuolingoVocaLang.do")
	public @ResponseBody void saveExamsDuolingoVocaLang(HttpServletRequest request, InternalExamsDuolingoVocaLangDto dto) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			String flag                       = jsonObj.get("flag").toString();
			int voca_lang_id                  = Integer.parseInt(jsonObj.get("voca_lang_id").toString());
			String status                     = jsonObj.get("status").toString();
			String voca_lang_code             = jsonObj.get("voca_lang_code").toString();
			String voca_lang_name             = jsonObj.get("voca_lang_name").toString();
			String voca_lang_translation_code = jsonObj.get("voca_lang_translation_code").toString();
			int voca_lang_sort                = Integer.parseInt(jsonObj.get("voca_lang_sort").toString());
			
			InternalExamsDuolingoVocaLangDto sto = new InternalExamsDuolingoVocaLangDto();
			sto.setCreated_id(userInfo.getUser_id());
			sto.setModified_id(userInfo.getUser_id());
			sto.setId(voca_lang_id);
			sto.setStatus(status);
			sto.setVoca_lang_code(voca_lang_code);
			sto.setVoca_lang_name(voca_lang_name);
			sto.setVoca_lang_translation_code(voca_lang_translation_code);
			sto.setVoca_lang_sort(voca_lang_sort);
			
			if(flag.equals("I")) {
				internalExamsService.insertDuolingoVocaLang(sto);
			}else if(flag.equals("U")) {
				internalExamsService.updateDuolingoVocaLang(sto);
			}else if(flag.equals("D")) {
				internalExamsService.deleteDuolingoVocaLang(sto);
			}
		}
	}
}