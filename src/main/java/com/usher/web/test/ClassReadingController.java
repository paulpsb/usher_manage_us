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
import com.usher.dto.InternalExamsChainDto;
import com.usher.dto.InternalExamsReadingDto;
import com.usher.dto.InternalExamsReadingQuestionDto;
import com.usher.dto.MockTestDirectionDto;
import com.usher.dto.PracticesPracticequizresultDto;
import com.usher.dto.PracticesPracticeresultDto;
import com.usher.dto.PracticesPracticeresultStaticDto;
import com.usher.dto.PracticesPracticescheduleDto;
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
public class ClassReadingController{
	@Autowired
	PracticesService practicesService; 
	
	@Autowired
	GoalService goalService;
	
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/test/class/reading_class.do")
	public String reading_class(HttpServletRequest request,
						PracticesPracticeresultDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		if(dto.getUser_id() > 0) {
			
		}else {
			dto.setUser_id(userInfo.getUser_id());
		}
		
		modelMap.addAttribute("classInfo", dto);
		
		return "test/class/reading_class";
	}
	
	@RequestMapping(value="/test/class/getReadingPracticeScheduleList.do")
	public @ResponseBody List<PracticesPracticescheduleDto> getReadingPracticeScheduleList(HttpServletRequest request, PracticesPracticescheduleDto dto) throws Exception {
		return practicesService.getPracticeTodayScheduleList(dto);
	}
	
	@RequestMapping(value="/test/class/getReadingExamInfo.do")
	public @ResponseBody Map getReadingResult(HttpServletRequest request,InternalExamsReadingDto dto) throws Exception {
		Map resultMap = new HashMap();
		
		InternalExamsReadingDto examInfo = internalExamsService.getInternalExamsReadingOne(dto);
		resultMap.put("examInfo", examInfo);
		
		InternalExamsReadingQuestionDto dto1 = new InternalExamsReadingQuestionDto();
		dto1.setReading_id(examInfo.getId());
		List<InternalExamsReadingQuestionDto> questionList = internalExamsService.getExamsReadingQuestionList(dto1);
		resultMap.put("questionList", questionList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/test/class/getExamsReadingQuestionCourseList.do")
	public @ResponseBody List<InternalExamsReadingQuestionDto> getExamsReadingQuestionCourseList(HttpServletRequest request, InternalExamsReadingQuestionDto dto) throws Exception {
		return internalExamsService.getExamsReadingQuestionCourseList(dto);
	}
	
	@RequestMapping(value="/test/class/getReadingExamChain.do")
	public @ResponseBody InternalExamsChainDto getReadingExamChain(HttpServletRequest request, InternalExamsChainDto dto) throws Exception {
		return internalExamsService.getChainOne(dto);
	}
	
	@RequestMapping(value="/test/class/getReadingExamQuestionReview.do")
	public @ResponseBody InternalExamsReadingQuestionDto getReadingExamQuestionReview(HttpServletRequest request, InternalExamsReadingQuestionDto dto) throws Exception {
		InternalExamsReadingQuestionDto questionInfo = internalExamsService.getExamsReadingQuestionReview(dto);
		
		List<String> paragraphList = new ArrayList<String>();
		paragraphList.add(StringUtil.nvl(questionInfo.getParagraph1()));
		paragraphList.add(StringUtil.nvl(questionInfo.getParagraph2()));
		paragraphList.add(StringUtil.nvl(questionInfo.getParagraph3()));
		paragraphList.add(StringUtil.nvl(questionInfo.getParagraph4()));
		paragraphList.add(StringUtil.nvl(questionInfo.getParagraph5()));
		paragraphList.add(StringUtil.nvl(questionInfo.getParagraph6()));
		paragraphList.add(StringUtil.nvl(questionInfo.getParagraph7()));
		paragraphList.add(StringUtil.nvl(questionInfo.getParagraph8()));
		paragraphList.add(StringUtil.nvl(questionInfo.getParagraph9()));
		paragraphList.add(StringUtil.nvl(questionInfo.getParagraph10()));
		
		int marker1 = questionInfo.getMarker1();
		int marker2 = questionInfo.getMarker2();
		
		if(marker1 > 0 && marker2 > 0) {
			questionInfo.setMarker("Paragraph "+marker1+" and paragraph "+marker2+" are marked with →");
		}else if(marker1 > 0) {
			questionInfo.setMarker("Paragraph "+marker1+" is with →");
		}
		String category = questionInfo.getCategory();
		StringBuffer sb = new StringBuffer();
		boolean isFirst = true;
		for(int i=0; i<paragraphList.size(); i++) {
			int paragraph_idx = i+1;
			
			if(!paragraphList.get(i).equals(""))
			{
				if(!isFirst)
				{
					sb.append("<br /><br />");
				}
				
				isFirst = false;
				
				String paragraph = paragraphList.get(i).replaceAll("<p[^>]*>", "").replaceAll("</p[^>]*>", "");
				if(category.equals("A")) {
					if(!StringUtil.nvl(questionInfo.getQuestion()).equals("")) {
						String question = questionInfo.getQuestion().replaceAll("<p[^>]*>", "").replaceAll("</p[^>]*>", "");
						
						questionInfo.setQuestion(question);
					}
					
					if(paragraph_idx == marker1 || paragraph_idx == marker2) {
						paragraph = "<span class='arrow' style='font-weight:900;'>→</span> " + paragraph;
					}
				}else if(category.equals("B")) {
					if(!StringUtil.nvl(questionInfo.getQuestion()).equals("")) {
						String question = questionInfo.getQuestion().replaceAll("<p[^>]*>", "").replaceAll("</p[^>]*>", "");
						
						questionInfo.setQuestion(question);
					}

					if(paragraph_idx == marker1 || paragraph_idx == marker2) {
						paragraph = "<span class='arrow' style='font-weight:900;'>→</span> " + paragraph;
					}
				}else if(category.equals("C")) {
					paragraph = StringUtil.replace(paragraph, "[SQ1]", " <span id='SQA' style='font-weight:bold;'>■</span> ");
					paragraph = StringUtil.replace(paragraph, "[SQ2]", " <span id='SQB' style='font-weight:bold;'>■</span> ");
					paragraph = StringUtil.replace(paragraph, "[SQ3]", " <span id='SQC' style='font-weight:bold;'>■</span> ");
					paragraph = StringUtil.replace(paragraph, "[SQ4]", " <span id='SQD' style='font-weight:bold;'>■</span> ");
				}else if(category.equals("D")) {
					
				}else if(category.equals("E")) {
					
				}
				sb.append(paragraph);
			}

		}

		questionInfo.setParagraph(sb.toString());
		
		return questionInfo;
	}
}