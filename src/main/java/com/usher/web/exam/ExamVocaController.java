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

import com.usher.dao.InternalExamsVocaspeechpartDao;
import com.usher.dto.InternalExamsVocaspeechpartDto;
import com.usher.dto.InternalExamsVocawordDto;
import com.usher.service.InternalExamsService;

import com.usher.util.SessionUtil;


@Controller
public class ExamVocaController{
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/exam/voca.do")
	public String seat(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		List<InternalExamsVocawordDto> list = internalExamsService.getVocaWordBookList();
		modelMap.addAttribute("bookList", list);
		String url = "";
		
		url = "exam/voca";
		return url;
	}
	
	@RequestMapping(value="/exam/getVocaWordDayList.do")
	public @ResponseBody List<InternalExamsVocawordDto> getVocaWordDayList(HttpServletRequest request, InternalExamsVocawordDto dto) throws Exception {
		return internalExamsService.getVocaWordDayList(dto);
	}
	
	@RequestMapping(value="/exam/getVocaList.do")
	public @ResponseBody Map getVocaList(HttpServletRequest request,
						InternalExamsVocawordDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);
		InternalExamsVocawordDto vocaWordCount = internalExamsService.getVocaWordCount(dto);
		List<InternalExamsVocawordDto> vocaWordList = internalExamsService.getVocaWordList(dto);
		resultMap.put("vocaWordCount", vocaWordCount);
		resultMap.put("vocaWordList", vocaWordList);
		
		InternalExamsVocaspeechpartDto dto1 = new InternalExamsVocaspeechpartDto();
		dto1.setBook(dto.getBook());
		dto1.setDay(dto.getDay());
		dto1.setRow_num(dto.getRow_num());
		dto1.setFirst_num(dto.getFirst_num());
		List<InternalExamsVocaspeechpartDto> vocaSpeechList = internalExamsService.getVocaSpeechPartList(dto1);
		resultMap.put("vocaSpeechList", vocaSpeechList);
		return resultMap;
	}
	
	@RequestMapping(value="/exam/getVoca.do")
	public @ResponseBody Map getVoca(HttpServletRequest request,
						InternalExamsVocawordDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		InternalExamsVocawordDto vocaInfo = internalExamsService.getVocaWord(dto);
		resultMap.put("vocaInfo", vocaInfo);
		InternalExamsVocaspeechpartDto dto1 = new InternalExamsVocaspeechpartDto();
		dto1.setVoca_word_id(dto.getId());
		List<InternalExamsVocaspeechpartDto> vocaSpeechList = internalExamsService.getVocaSpeechPart(dto1);
		resultMap.put("vocaSpeechList", vocaSpeechList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/exam/updateVoca.do")
	public @ResponseBody void updateVoca(HttpServletRequest request, InternalExamsVocawordDto dto) throws Exception {

		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int id = Integer.parseInt(jsonObj.get("id").toString());
			String speech_part = jsonObj.get("speech_part").toString();
			String meaning = jsonObj.get("meaning").toString();
			String synonym = jsonObj.get("synonym").toString();
			String speech_delete = jsonObj.get("speech_delete").toString();
			
			InternalExamsVocaspeechpartDto dto1 = new InternalExamsVocaspeechpartDto();
			dto1.setId(id);
			dto1.setSpeech_part(speech_part);
			dto1.setMeaning(meaning);
			dto1.setSynonym(synonym);
			dto1.setVoca_word_id(dto.getId());
			
			if(speech_delete.equals("Y")) {
				internalExamsService.deleteVocaWordspeechpart(dto1);
			}else {
				if(id > 0) {
					internalExamsService.updateVocaWordspeechpart(dto1);
				}else {
					internalExamsService.insertVocaWordspeechpart(dto1);
				}
			}
		}
		
		InternalExamsVocawordDto speechCount = internalExamsService.getVocaWordSpeechPartCount(dto);
		
		dto.setSpeech_part_count(speechCount.getSpeech_part_count());
		internalExamsService.updateVocaWord(dto);
	}
	
	@RequestMapping(value="/exam/updateVocaWordSpeechDifficulty.do")
	public @ResponseBody void updateVocaWordSpeechDifficulty(HttpServletRequest request, InternalExamsVocawordDto dto) throws Exception {
		internalExamsService.updateVocaWordSpeechDifficulty(dto);
	}
	
	@RequestMapping(value="/exam/updateVocaWordSpeechException.do")
	public @ResponseBody void updateVocaWordSpeechException(HttpServletRequest request, InternalExamsVocawordDto dto) throws Exception {
		internalExamsService.updateVocaWordSpeechException(dto);
	}

}