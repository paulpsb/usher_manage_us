package com.usher.web.test;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.dto.AuthUserDto;
import com.usher.dto.BatchDirectionDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.GoalsGoalconcentrationPracticeDto;
import com.usher.dto.InternalExamsAnswerDto;
import com.usher.dto.InternalExamsChainDto;
import com.usher.dto.InternalExamsListeningDto;
import com.usher.dto.InternalExamsListeningQuestionDto;
import com.usher.dto.InternalExamsReadingDto;
import com.usher.dto.InternalExamsReadingQuestionDto;
import com.usher.dto.InternalExamsUseranswerCommentDto;
import com.usher.dto.InternalExamsUseranswerDto;
import com.usher.dto.InternalExamsUseranswerNoteDto;
import com.usher.dto.InternalExamsUseranswerRubricDto;
import com.usher.dto.InternalExamsVocaspeechpartDto;
import com.usher.dto.InternalExamsVocawordDto;
import com.usher.dto.MockTestDirectionDto;
import com.usher.dto.PracticesPracticequizresultDto;
import com.usher.dto.PracticesPracticeresultDto;
import com.usher.dto.PracticesPracticeresultStaticDto;
import com.usher.dto.PracticesPracticescheduleDto;
import com.usher.service.AwsS3Service;
import com.usher.service.BatchService;
import com.usher.service.CoursesService;
import com.usher.service.GoalService;
import com.usher.service.InternalExamsService;
import com.usher.service.MockTestService;
import com.usher.service.PracticesService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class CorrectSpeakingController{
	@Autowired
	PracticesService practicesService; 
	
	@Autowired
	GoalService goalService;
	
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	InternalExamsService internalExamsService;
	

	
	@RequestMapping(value="/test/correct_speaking_list.do")
	public String correct_speaking_list(HttpServletRequest request,
						PracticesPracticeresultDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		modelMap.addAttribute("resultInfo", dto);
		
		return "test/correct_speaking_list";
	}
	
	@RequestMapping(value="/test/getCorrectSpeakingList.do")
	public @ResponseBody Map getCorrectSpeakingList(HttpServletRequest request,
			PracticesPracticeresultDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);
		PracticesPracticeresultDto correctSpeakingCount = practicesService.getPracticeResultMockTestCount(dto);
		List<PracticesPracticeresultDto> correctSpeakingList = practicesService.getPracticeResultMockTestList(dto);
		resultMap.put("correctSpeakingCount", correctSpeakingCount);
		resultMap.put("correctSpeakingList", correctSpeakingList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/test/correct/correct_speaking.do")
	public String correct_speaking(HttpServletRequest request,
						PracticesPracticeresultDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		PracticesPracticeresultDto resultInfo = practicesService.getPracticeResult(dto);
		modelMap.addAttribute("resultInfo", resultInfo);
		
		InternalExamsAnswerDto dto1 = new InternalExamsAnswerDto();
		dto1.setId(resultInfo.getAnswer_id());
		InternalExamsAnswerDto answerInfo = internalExamsService.getExamAnswer(dto1);
		modelMap.addAttribute("answerInfo", answerInfo);
		
		InternalExamsUseranswerDto dto2 = new InternalExamsUseranswerDto();
		dto2.setPractice_result_id(resultInfo.getId());
		InternalExamsUseranswerDto userAnswerInfo = internalExamsService.getExamUserAnswer(dto2);
		modelMap.addAttribute("userAnswerInfo", userAnswerInfo);
		
		return "test/correct/correct_speaking";
	}
	
	@RequestMapping(value="/test/correct/correct_speaking_rubric.do")
	public String correct_speaking_rubric(HttpServletRequest request,
						PracticesPracticeresultDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		PracticesPracticeresultDto resultInfo = practicesService.getPracticeResult(dto);
		modelMap.addAttribute("resultInfo", resultInfo);
		
		InternalExamsAnswerDto dto1 = new InternalExamsAnswerDto();
		dto1.setId(resultInfo.getAnswer_id());
		InternalExamsAnswerDto answerInfo = internalExamsService.getExamAnswer(dto1);
		modelMap.addAttribute("answerInfo", answerInfo);
		
		InternalExamsUseranswerDto dto2 = new InternalExamsUseranswerDto();
		dto2.setPractice_result_id(resultInfo.getId());
		InternalExamsUseranswerDto userAnswerInfo = internalExamsService.getExamUserAnswer(dto2);
		modelMap.addAttribute("userAnswerInfo", userAnswerInfo);
		
		return "test/correct/correct_speaking_rubric";
	}
	
	@RequestMapping(value="/test/correct/correct_speaking_comment_twe.do")
	public String correct_speaking_comment_twe(HttpServletRequest request,
						PracticesPracticeresultDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		PracticesPracticeresultDto resultInfo = practicesService.getPracticeResult(dto);
		modelMap.addAttribute("resultInfo", resultInfo);
		
		InternalExamsAnswerDto dto1 = new InternalExamsAnswerDto();
		dto1.setId(resultInfo.getAnswer_id());
		InternalExamsAnswerDto answerInfo = internalExamsService.getExamAnswer(dto1);
		modelMap.addAttribute("answerInfo", answerInfo);
		
		InternalExamsUseranswerDto dto2 = new InternalExamsUseranswerDto();
		dto2.setPractice_result_id(resultInfo.getId());
		InternalExamsUseranswerDto userAnswerInfo = internalExamsService.getExamUserAnswer(dto2);
		modelMap.addAttribute("userAnswerInfo", userAnswerInfo);
		
		InternalExamsUseranswerCommentDto dto3 = new InternalExamsUseranswerCommentDto();
		dto3.setPractice_result_id(resultInfo.getId());
		dto3.setComment_type("spk");
		InternalExamsUseranswerCommentDto commentInfo =  internalExamsService.getExamUserAnswerComment(dto3);
		modelMap.addAttribute("commentInfo", commentInfo);
		
		InternalExamsUseranswerNoteDto dto4 = new InternalExamsUseranswerNoteDto();
		dto4.setPractice_result_id(resultInfo.getId());
		InternalExamsUseranswerNoteDto noteInfo = internalExamsService.getExamUserAnswerNote(dto4);
		modelMap.addAttribute("noteInfo", noteInfo);
		
		return "test/correct/correct_speaking_comment_twe";
	}
	
	@RequestMapping(value="/test/correct/getSpeakingTestResult.do")
	public @ResponseBody Map getSpeakingTestResult(HttpServletRequest request,PracticesPracticeresultDto dto) throws Exception {
		Map resultMap = new HashMap();
		
		PracticesPracticeresultDto resultInfo = practicesService.getPracticeResult(dto);
		resultMap.put("resultInfo", resultInfo);
		
		InternalExamsAnswerDto dto1 = new InternalExamsAnswerDto();
		dto1.setId(resultInfo.getAnswer_id());
		InternalExamsAnswerDto answerInfo = internalExamsService.getExamAnswer(dto1);
		resultMap.put("answerInfo", answerInfo);
		
		InternalExamsUseranswerDto dto2 = new InternalExamsUseranswerDto();
		dto2.setPractice_result_id(resultInfo.getId());
		InternalExamsUseranswerDto userAnswerInfo = internalExamsService.getExamUserAnswer(dto2);
		resultMap.put("userAnswerInfo", userAnswerInfo);
		
		InternalExamsUseranswerRubricDto dto3 = new InternalExamsUseranswerRubricDto();
		dto3.setPractice_result_id(resultInfo.getId());
		InternalExamsUseranswerRubricDto rubricInfo = internalExamsService.getExamUserAnswerRubric(dto3);
		resultMap.put("rubricInfo", rubricInfo);
		
		InternalExamsUseranswerCommentDto dto4 = new InternalExamsUseranswerCommentDto();
		dto4.setPractice_result_id(resultInfo.getId());
		dto4.setComment_type("spk");
		InternalExamsUseranswerCommentDto commentInfo =  internalExamsService.getExamUserAnswerComment(dto4);
		resultMap.put("commentInfo", commentInfo);
		
		InternalExamsUseranswerNoteDto dto5 = new InternalExamsUseranswerNoteDto();
		dto5.setPractice_result_id(resultInfo.getId());
		InternalExamsUseranswerNoteDto noteInfo = internalExamsService.getExamUserAnswerNote(dto5);
		resultMap.put("noteInfo", noteInfo);
	
		return resultMap;
	}
	
	@RequestMapping(value="/test/correct/getSpeakingTestComment.do")
	public @ResponseBody Map getSpeakingTestComment(HttpServletRequest request,PracticesPracticeresultDto dto) throws Exception {
		Map resultMap = new HashMap();
		
		PracticesPracticeresultDto resultInfo = practicesService.getPracticeResult(dto);
		resultMap.put("resultInfo", resultInfo);
		
		InternalExamsAnswerDto dto1 = new InternalExamsAnswerDto();
		dto1.setId(resultInfo.getAnswer_id());
		InternalExamsAnswerDto answerInfo = internalExamsService.getExamAnswer(dto1);
		resultMap.put("answerInfo", answerInfo);
		
		InternalExamsUseranswerDto dto2 = new InternalExamsUseranswerDto();
		dto2.setPractice_result_id(resultInfo.getId());
		InternalExamsUseranswerDto userAnswerInfo = internalExamsService.getExamUserAnswer(dto2);
		resultMap.put("userAnswerInfo", userAnswerInfo);

		InternalExamsUseranswerCommentDto dto4 = new InternalExamsUseranswerCommentDto();
		dto4.setPractice_result_id(resultInfo.getId());
		dto4.setComment_type("spk");
		InternalExamsUseranswerCommentDto commentInfo =  internalExamsService.getExamUserAnswerComment(dto4);
		resultMap.put("commentInfo", commentInfo);
		
		InternalExamsUseranswerNoteDto dto5 = new InternalExamsUseranswerNoteDto();
		dto5.setPractice_result_id(resultInfo.getId());
		InternalExamsUseranswerNoteDto noteInfo = internalExamsService.getExamUserAnswerNote(dto5);
		resultMap.put("noteInfo", noteInfo);
		
		return resultMap;
	}
	
	@RequestMapping(value="/test/correct/getSpeakingTestRubric.do")
	public @ResponseBody Map getSpeakingTestRubric(HttpServletRequest request,PracticesPracticeresultDto dto) throws Exception {
		Map resultMap = new HashMap();
		
		PracticesPracticeresultDto resultInfo = practicesService.getPracticeResult(dto);
		resultMap.put("resultInfo", resultInfo);
		
		InternalExamsAnswerDto dto1 = new InternalExamsAnswerDto();
		dto1.setId(resultInfo.getAnswer_id());
		InternalExamsAnswerDto answerInfo = internalExamsService.getExamAnswer(dto1);
		resultMap.put("answerInfo", answerInfo);
		
		InternalExamsUseranswerDto dto2 = new InternalExamsUseranswerDto();
		dto2.setPractice_result_id(resultInfo.getId());
		InternalExamsUseranswerDto userAnswerInfo = internalExamsService.getExamUserAnswer(dto2);
		resultMap.put("userAnswerInfo", userAnswerInfo);
		
		InternalExamsUseranswerRubricDto dto3 = new InternalExamsUseranswerRubricDto();
		dto3.setPractice_result_id(resultInfo.getId());
		InternalExamsUseranswerRubricDto rubricInfo = internalExamsService.getExamUserAnswerRubric(dto3);
		resultMap.put("rubricInfo", rubricInfo);
		
		
		
		return resultMap;
	}
	
	@RequestMapping(value="/test/correct/saveSpeakingTestComment.do")
	public @ResponseBody void saveSpeakingTestComment(HttpServletRequest request,InternalExamsUseranswerCommentDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setComment_id(userInfo.getUser_id());
		InternalExamsUseranswerCommentDto commentInfo =  internalExamsService.getExamUserAnswerComment(dto);
		if(commentInfo == null) {
			internalExamsService.insertExamUserAnswerComment(dto);
		}else {
			internalExamsService.insertExamUserAnswerCommentLog(dto);
			internalExamsService.updateExamUserAnswerComment(dto);
		}
		PracticesPracticeresultDto dto1 = new PracticesPracticeresultDto();
		dto1.setId(dto.getPractice_result_id());
		practicesService.updatePracticeResultAnswerSpk(dto1);
	}
	
	@RequestMapping(value="/test/correct/saveSpeakingTestRubric.do")
	public @ResponseBody void saveSpeakingTestRubric(HttpServletRequest request,InternalExamsUseranswerRubricDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setRubric_id(userInfo.getUser_id());
		InternalExamsUseranswerRubricDto rubricInfo = internalExamsService.getExamUserAnswerRubric(dto);
		if(rubricInfo == null) {
			internalExamsService.insertExamUserAnswerRubric(dto);
		}else {
			internalExamsService.insertExamUserAnswerRubricLog(dto);
			internalExamsService.updateExamUserAnswerRubric(dto);
		}
		
		PracticesPracticeresultDto dto1 = new PracticesPracticeresultDto();
		dto1.setScore(dto.getRubric_total_score());
		dto1.setTotal_score(30);
		dto1.setId(dto.getPractice_result_id());
		practicesService.updatePracticeResultAnswerRublic(dto1);
	}
}