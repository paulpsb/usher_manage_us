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
public class PracticeTestTypeBookController{
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
	
	
	@RequestMapping(value="/correction/book_practice.do")
	public String book_practice(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		return "correction/book_practice";
	}
	
	@RequestMapping(value="/correction/getCorrectionTestBookList.do")
	public @ResponseBody Map getCorrectionTestBookList(HttpServletRequest request,
						CorrectionTestBookDto dto, 
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return null;
		}
		
		Map resultMap = new HashMap();
		
		PracticesPracticeproblemDto dto1 = new PracticesPracticeproblemDto();
		dto1.setSection(dto.getSection());
		dto1.setCorrection_yn("Y");
		List<PracticesPracticeproblemDto> bookList = practicesService.getProblemBookList(dto1);
		resultMap.put("bookList", bookList);

		CorrectionTestTypeDto dto2 = new CorrectionTestTypeDto();
		dto2.setSection(dto.getSection());
		List<CorrectionTestTypeDto>  testTypeList = correctionExamsService.getCorrectionTestTypeList(dto2);
		resultMap.put("testTypeList", testTypeList);
		
		List<CorrectionTestBookDto> testBookList = correctionExamsService.getCorrectionTestBookList(dto);
		resultMap.put("testBookList", testBookList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/correction/saveCorrectionTestBookList.do")
	public @ResponseBody void saveCorrectionTestBookList(HttpServletRequest request,
						CorrectionTestBookDto dto, 
						ModelMap modelMap) throws Exception {
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;

		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			String section              = jsonObj.get("section").toString();
			String practice_type        = jsonObj.get("practice_type").toString();
			String test_type            = jsonObj.get("test_type").toString();
			String book                 = jsonObj.get("book").toString();
			String use_yn               = jsonObj.get("use_yn").toString();
			
			CorrectionTestBookDto sto = new CorrectionTestBookDto();
			sto.setSection(section);
			sto.setPractice_type(practice_type);
			sto.setTest_type(test_type);
			sto.setBook(book);
			
			if(use_yn.equals("Y")) {
				correctionExamsService.insertCorrectionTestBook(sto);
			}else {
				correctionExamsService.deleteCorrectionTestBook(sto);
			}
			
		}
	}
}