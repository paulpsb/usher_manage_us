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
import com.usher.dto.InternalExamsDuolingoVocaDto;
import com.usher.service.InternalExamsService;

import com.usher.util.SessionUtil;


@Controller
public class ExamDuolingoVocaController{
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/exam/duolingo_voca_list.do")
	public String duolingo_voca_list(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";
		
		url = "exam/duolingo_voca_list";
		return url;
	}
	
	@RequestMapping(value="/exam/getExamsDuolingoVocaList.do")
	public @ResponseBody List<InternalExamsDuolingoVocaDto>  getExamsDuolingoVocaList(HttpServletRequest request,
					InternalExamsDuolingoVocaDto dto, 
						ModelMap modelMap) throws Exception {
		return internalExamsService.getExamsDuolingoVocaList(dto);
	}
	
	@RequestMapping(value="/exam/saveExamsDuolingoVoca.do")
	public @ResponseBody void saveExamsDuolingoVoca(HttpServletRequest request, InternalExamsDuolingoVocaDto dto) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			String flag                  = jsonObj.get("flag").toString();
			int voca_word_id             = Integer.parseInt(jsonObj.get("voca_word_id").toString());
			String status                = jsonObj.get("status").toString();
			String section               = jsonObj.get("section").toString();
			String book                  = jsonObj.get("book").toString();
			String volume                = jsonObj.get("volume").toString();
			String group                 = jsonObj.get("group").toString();
			String article               = jsonObj.get("article").toString();
			String voca_lang_code        = jsonObj.get("voca_lang_code").toString();
			String voca_word             = jsonObj.get("voca_word").toString();
			String voca_word_translation = jsonObj.get("voca_word_translation").toString();
			int voca_word_sort           = Integer.parseInt(jsonObj.get("voca_word_sort").toString());
			
			InternalExamsDuolingoVocaDto sto = new InternalExamsDuolingoVocaDto();
			sto.setCreated_id(userInfo.getUser_id());
			sto.setModified_id(userInfo.getUser_id());
			sto.setId(voca_word_id);
			sto.setStatus(status);
			sto.setSection(section);
			sto.setBook(book);
			sto.setVolume(volume);
			sto.setGroup(group);
			sto.setArticle(article);
			sto.setVoca_lang_code(voca_lang_code);
			sto.setVoca_word(voca_word);
			sto.setVoca_word_translation(voca_word_translation);
			sto.setVoca_word_sort(voca_word_sort);
			
			if(flag.equals("I")) {
				internalExamsService.insertDuolingoVoca(sto);
			}else if(flag.equals("U")) {
				internalExamsService.updateDuolingoVoca(sto);
			}else if(flag.equals("D")) {
				internalExamsService.deleteDuolingoVoca(sto);
			}
		}
	}
}