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
public class AppealCorrectionController{
	@Autowired
	AuthService authService;


	@Autowired
	BaseService baseService;
	
	@Autowired
	CorrectionExamsService correctionExamsService;

	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/correction/appeal_correct_list.do")
	public String appeal_correct_list(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		CorrectionExamsAnswerDto dto = new CorrectionExamsAnswerDto();
		List<CorrectionExamsAnswerDto> courseList = correctionExamsService.getCorrectionExamsAnswerCourseList(dto);
		modelMap.addAttribute("courseList", courseList);
		return "correction/appeal_correct_list";
	}
	
	@RequestMapping(value="/correction/getAppealCorrectionList.do")
	public @ResponseBody Map getAppealCorrectionList(HttpServletRequest request,
						CorrectionExamsAnswerDto dto, 
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return null;
		}
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);

		CorrectionExamsAnswerDto resultCount = correctionExamsService.getCorrectionExamsAnswerAppealCount(dto);
		List<CorrectionExamsAnswerDto> resultList = correctionExamsService.getCorrectionExamsAnswerAppealList(dto);
		resultMap.put("resultCount", resultCount);
		resultMap.put("resultList", resultList);

		return resultMap;
	}
	
}