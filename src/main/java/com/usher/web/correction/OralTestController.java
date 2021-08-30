package com.usher.web.correction;

import java.util.ArrayList;
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
import com.usher.dto.BaseExamRuburicDto;
import com.usher.dto.CorrectionExamsAnswerDto;
import com.usher.dto.CorrectionExamsAppealDto;
import com.usher.dto.CorrectionExamsCommentDto;
import com.usher.dto.CorrectionExamsNoteDto;
import com.usher.dto.CorrectionExamsPenDto;
import com.usher.dto.CorrectionExamsRuburicDto;
import com.usher.dto.CorrectionOralTestDto;
import com.usher.dto.CorrectionTestBookDto;
import com.usher.dto.CorrectionTestTypeDto;
import com.usher.dto.CorrectionUserProductDto;
import com.usher.dto.InternalExamsChainDto;
import com.usher.dto.InternalExamsSpeakingDto;
import com.usher.dto.PracticesPracticeproblemDto;
import com.usher.dto.PracticesPracticesectiontypeDto;
import com.usher.dto.InternalExamsSpeakingDto;
import com.usher.service.AuthService;
import com.usher.service.BaseService;
import com.usher.service.CorrectionExamsService;
import com.usher.service.InternalExamsService;
import com.usher.service.PracticesService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;


@Controller
public class OralTestController{
	@Autowired
	AuthService authService;


	@Autowired
	BaseService baseService;
	
	@Autowired
	CorrectionExamsService correctionExamsService;

	@Autowired
	InternalExamsService internalExamsService;
	
	@Autowired
	PracticesService practicesService; 
	
	
	@RequestMapping(value="/correction/oral_test.do")
	public String oral_test(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		return "correction/oral_test";
	}
	
	@RequestMapping(value="/correction/getCorrectionOralTestSectionList.do")
	public @ResponseBody List<CorrectionOralTestDto> getCorrectionOralTestSectionList(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		return correctionExamsService.getCorrectionOralTestSectionList();
	}
	
	@RequestMapping(value="/correction/getCorrectionOralTestBookList.do")
	public @ResponseBody List<CorrectionOralTestDto> getCorrectionOralTestBookList(HttpServletRequest request,
						CorrectionOralTestDto dto, 
						ModelMap modelMap) throws Exception {
		
		return correctionExamsService.getCorrectionOralTestBookList(dto);
	}
	
	@RequestMapping(value="/correction/getCorrectionOralTestList.do")
	public @ResponseBody List<CorrectionOralTestDto> getCorrectionOralTestList(HttpServletRequest request,
						CorrectionOralTestDto dto, 
						ModelMap modelMap) throws Exception {
		
		return correctionExamsService.getCorrectionOralTestList(dto);
	}
	
	@RequestMapping(value="/correction/saveCorrectionOralTestList.do")
	public @ResponseBody void saveCorrectionTestBookList(HttpServletRequest request,
						CorrectionOralTestDto dto, 
						ModelMap modelMap) throws Exception {
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;

		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			String flag                 = jsonObj.get("flag").toString();
			int    id                   = Integer.parseInt(jsonObj.get("oral_test_id").toString());
			String section              = jsonObj.get("section").toString();
			String book                 = jsonObj.get("book").toString();
			String oral_test_type       = jsonObj.get("oral_test_type").toString();
			String oral_test_title      = jsonObj.get("oral_test_title").toString();
			String oral_test_url        = jsonObj.get("oral_test_url").toString();
			int    oral_test_sort       = Integer.parseInt(jsonObj.get("oral_test_sort").toString());
			
			CorrectionOralTestDto sto   = new CorrectionOralTestDto();
			sto.setId(id);
			sto.setSection(section);
			sto.setBook(book);
			sto.setOral_test_type(oral_test_type);
			sto.setOral_test_title(oral_test_title);
			sto.setOral_test_url(oral_test_url);
			sto.setOral_test_sort(oral_test_sort);
			if(flag.equals("I")) {
				correctionExamsService.insertCorrectionOralTest(sto);
			}else if(flag.equals("U")) {
				correctionExamsService.updateCorrectionOralTest(sto);
			}else if(flag.equals("D")) {
				correctionExamsService.deleteCorrectionOralTest(sto);
			}
			
			
		}
	}
}