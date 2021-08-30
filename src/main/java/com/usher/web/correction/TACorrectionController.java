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
import com.usher.dto.BaseExamRuburicStandardDto;
import com.usher.dto.CorrectionExamsAnswerDto;
import com.usher.dto.CorrectionExamsAppealDto;
import com.usher.dto.CorrectionExamsCommentDto;
import com.usher.dto.CorrectionExamsNoteDto;
import com.usher.dto.CorrectionExamsPenDto;
import com.usher.dto.CorrectionExamsRuburicDto;
import com.usher.dto.CorrectionUserProductDto;
import com.usher.dto.InternalExamsChainDto;
import com.usher.dto.InternalExamsSpeakingDto;
import com.usher.dto.InternalExamsSpeakingDto;
import com.usher.service.AuthService;
import com.usher.service.BaseService;
import com.usher.service.CorrectionExamsService;
import com.usher.service.InternalExamsService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;


@Controller
public class TACorrectionController{
	@Autowired
	AuthService authService;


	@Autowired
	BaseService baseService;
	
	@Autowired
	CorrectionExamsService correctionExamsService;

	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/correction/ta_correct_list.do")
	public String speaking_correct_lis(HttpServletRequest request,
						CorrectionExamsAnswerDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("correctInfo", dto);
		return "correction/ta_correct_list";
	}
	
	@RequestMapping(value="/correction/getTACorrectionList.do")
	public @ResponseBody Map getTACorrectionList(HttpServletRequest request,
						CorrectionExamsAnswerDto dto, 
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return null;
		}
		
		Map resultMap = new HashMap();


		List<CorrectionExamsAnswerDto> resultList = correctionExamsService.getCorrectionExamsAnswerTAList(dto);
		List<CorrectionExamsAnswerDto> reviewList = correctionExamsService.getCorrectionExamsAnswerAppealTAReviewList(dto);
		resultMap.put("resultList", resultList);
		resultMap.put("reviewList", reviewList);

		return resultMap;
	}
}