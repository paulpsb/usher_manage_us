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
import com.usher.dto.InternalExamsDuolingoSentenceDto;
import com.usher.service.InternalExamsService;

import com.usher.util.SessionUtil;


@Controller
public class ExamDuolingoSentenceController{
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/exam/duolingo_sentence_list.do")
	public String duolingo_sentence_list(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";
		
		url = "exam/duolingo_sentence_list";
		return url;
	}
	
	@RequestMapping(value="/exam/getExamsDuolingoSentenceList.do")
	public @ResponseBody List<InternalExamsDuolingoSentenceDto>  getExamsDuolingoSentenceList(HttpServletRequest request,
					InternalExamsDuolingoSentenceDto dto, 
						ModelMap modelMap) throws Exception {
		return internalExamsService.getExamsDuolingoSentenceList(dto);
	}
	
	@RequestMapping(value="/exam/saveExamsDuolingoSentence.do")
	public @ResponseBody void saveExamsDuolingoSentence(HttpServletRequest request, InternalExamsDuolingoSentenceDto dto) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			String flag                  = jsonObj.get("flag").toString();
			int sentence_id              = Integer.parseInt(jsonObj.get("sentence_id").toString());
			String status                = jsonObj.get("status").toString();
			String section               = jsonObj.get("section").toString();
			String book                  = jsonObj.get("book").toString();
			String volume                = jsonObj.get("volume").toString();
			String group                 = jsonObj.get("group").toString();
			String article               = jsonObj.get("article").toString();
			String sentence_doc          = jsonObj.get("sentence_doc").toString();
			int sentence_sort            = Integer.parseInt(jsonObj.get("sentence_sort").toString());
			
			InternalExamsDuolingoSentenceDto sto = new InternalExamsDuolingoSentenceDto();
			sto.setCreated_id(userInfo.getUser_id());
			sto.setModified_id(userInfo.getUser_id());
			sto.setId(sentence_id);
			sto.setStatus(status);
			sto.setSection(section);
			sto.setBook(book);
			sto.setVolume(volume);
			sto.setGroup(group);
			sto.setArticle(article);
			sto.setSentence_doc(sentence_doc);
			sto.setSentence_sort(sentence_sort);
			
			if(flag.equals("I")) {
				internalExamsService.insertDuolingoSentence(sto);
			}else if(flag.equals("U")) {
				internalExamsService.updateDuolingoSentence(sto);
			}else if(flag.equals("D")) {
				internalExamsService.deleteDuolingoSentence(sto);
			}
		}
	}
}