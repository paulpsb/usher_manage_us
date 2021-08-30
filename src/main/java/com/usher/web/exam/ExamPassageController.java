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

import com.usher.dto.InternalExamsPassageDto;
import com.usher.dto.InternalExamsPassagePhraseDto;
import com.usher.dto.InternalExamsPassageVocaDto;
import com.usher.service.InternalExamsService;

import com.usher.util.SessionUtil;


@Controller
public class ExamPassageController{
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/exam/passage_list.do")
	public String passage_list(HttpServletRequest request,
						InternalExamsPassageDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("passageInfo", dto);
		String url = "";
		
		url = "exam/passage_list";
		return url;
	}
	
	@RequestMapping(value="/exam/getPassageList.do")
	public @ResponseBody Map getPassageList(HttpServletRequest request,
						InternalExamsPassageDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);

		InternalExamsPassageDto passageCount = internalExamsService.getPassageCount(dto);
		List<InternalExamsPassageDto> passageList = internalExamsService.getPassageList(dto);
		resultMap.put("passageCount", passageCount);
		resultMap.put("passageList", passageList);

		return resultMap;
	}
	
	@RequestMapping(value="/exam/selectPassage.do")
	public @ResponseBody InternalExamsPassageDto selectPassage(HttpServletRequest request, InternalExamsPassageDto dto) throws Exception {
		return internalExamsService.getPassage(dto);
	}
	
	
	@RequestMapping(value="/exam/updatePassage.do")
	public @ResponseBody void updatePassage(HttpServletRequest request, InternalExamsPassageDto dto) throws Exception {
		internalExamsService.updatePassage(dto);
	}
	
	@RequestMapping(value="/exam/deletePassage.do")
	public @ResponseBody void deletePassage(HttpServletRequest request, InternalExamsPassageDto dto) throws Exception {
		internalExamsService.deletePassage(dto);
		internalExamsService.deletePassagePhraseAll(dto);
		internalExamsService.deletePassageVocaAll(dto);
	}
	
	@RequestMapping(value="/exam/passage_form.do")
	public String passage_form(HttpServletRequest request,
						InternalExamsPassageDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("passageInfo", dto);
		String url = "";
		
		url = "exam/passage_form";
		return url;
	}
	
	@RequestMapping(value="/exam/getPassage.do")
	public @ResponseBody Map getPassage(HttpServletRequest request,
						InternalExamsPassageDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		InternalExamsPassageDto passageInfo = internalExamsService.getPassage(dto);
		resultMap.put("passageInfo", passageInfo);
		
		InternalExamsPassagePhraseDto dto1 = new InternalExamsPassagePhraseDto();
		dto1.setPassage_id(dto.getId());
		List<InternalExamsPassagePhraseDto> phraseList = internalExamsService.getPassagePhraseList(dto1);
		resultMap.put("phraseList", phraseList);
		
		InternalExamsPassageVocaDto dto2 = new InternalExamsPassageVocaDto();
		dto2.setPassage_id(dto.getId());
		List<InternalExamsPassageVocaDto> vocaList = internalExamsService.getPassageVocaList(dto2);
		resultMap.put("vocaList", vocaList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/exam/savePassage.do")
	public @ResponseBody void savePassage(HttpServletRequest request, InternalExamsPassageDto dto) throws Exception {
		String data_value_phrase = dto.getData_value_phrase();
		String data_value_voca = dto.getData_value_voca();
		
		if(dto.getId() > 0) {
			internalExamsService.updatePassage(dto);
		}else {
			internalExamsService.insertPassage(dto);
		}
		
		JSONParser jsonParser1 = new JSONParser();
		Object obj1 = jsonParser1.parse(data_value_phrase);
		JSONArray jsonArray1 = (JSONArray)obj1;
		for(int i=0;i<jsonArray1.size();i++){
			JSONObject jsonObj1 = (JSONObject)jsonArray1.get(i);
			int id = Integer.parseInt(jsonObj1.get("phrase_id").toString());
			int paragraph = Integer.parseInt(jsonObj1.get("phrase_paragraph").toString());
			int question_num = Integer.parseInt(jsonObj1.get("phrase_question_num").toString());
			String spell = jsonObj1.get("phrase_spell").toString();
			String meaning = jsonObj1.get("phrase_meaning").toString();
			String phrase_delete = jsonObj1.get("phrase_delete").toString();
			
			InternalExamsPassagePhraseDto dto1 = new InternalExamsPassagePhraseDto();
			dto1.setId(id);
			dto1.setSpell(spell);
			dto1.setMeaning(meaning);
			dto1.setPassage_id(dto.getId());
			dto1.setParagraph(paragraph);
			dto1.setQuestion_num(question_num);
			if(phrase_delete.equals("Y")) {
				internalExamsService.deletePassagePhrase(dto1);
			}else {
				if(id > 0) {
					internalExamsService.updatePassagePhrase(dto1);
				}else {
					internalExamsService.insertPassagePhrase(dto1);
				}
			}
		}
		
		JSONParser jsonParser2 = new JSONParser();
		Object obj2 = jsonParser2.parse(data_value_voca);
		JSONArray jsonArray2 = (JSONArray)obj2;
		for(int i=0;i<jsonArray2.size();i++){
			JSONObject jsonObj2 = (JSONObject)jsonArray2.get(i);
			int id = Integer.parseInt(jsonObj2.get("voca_id").toString());
			int paragraph = Integer.parseInt(jsonObj2.get("voca_paragraph").toString());
			int question_num = Integer.parseInt(jsonObj2.get("voca_question_num").toString());
			String spell = jsonObj2.get("voca_spell").toString();
			String meaning = jsonObj2.get("voca_meaning").toString();
			String phrase_delete = jsonObj2.get("voca_delete").toString();
			
			InternalExamsPassageVocaDto dto2 = new InternalExamsPassageVocaDto();
			dto2.setId(id);
			dto2.setSpell(spell);
			dto2.setMeaning(meaning);
			dto2.setPassage_id(dto.getId());
			dto2.setParagraph(paragraph);
			dto2.setQuestion_num(question_num);
			if(phrase_delete.equals("Y")) {
				internalExamsService.deletePassageVoca(dto2);
			}else {
				if(id > 0) {
					internalExamsService.updatePassageVoca(dto2);
				}else {
					internalExamsService.insertPassageVoca(dto2);
				}
			}
		}
	}
}