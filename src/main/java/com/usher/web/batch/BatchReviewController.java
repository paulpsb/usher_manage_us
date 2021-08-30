package com.usher.web.batch;

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
import com.usher.dto.BatchExamGrammarDto;
import com.usher.dto.BatchExamReadingDto;
import com.usher.dto.BatchExamReadingQuestionDto;
import com.usher.dto.BatchExamsUseranswerDto;
import com.usher.dto.BatchResultDto;
import com.usher.service.BatchService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BatchReviewController{
	@Autowired
	BatchService batchService; 
	
	@RequestMapping(value="/batch/review/grammar_review.do")
	public String grammar_review(HttpServletRequest request,
						BatchResultDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		modelMap.addAttribute("resultInfo", dto);
		return "batch/review/grammar_review";
	}
	
	@RequestMapping(value="/popup/review/grammar_review_question.do")
	public String grammar_test_question(HttpServletRequest request,
						BatchExamGrammarDto dto,
						ModelMap modelMap) throws Exception {
		
		BatchExamGrammarDto questionInfo = batchService.getBatchExamGrammar(dto);

		modelMap.addAttribute("questionInfo", questionInfo);
		
		return "batch/review/grammar_review_question";
	}
	
	@RequestMapping(value="/batch/review/rc_review.do")
	public String reading_review(HttpServletRequest request,
						BatchResultDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		modelMap.addAttribute("resultInfo", dto);
		return "batch/review/rc_review";
	}
	
	@RequestMapping(value="/batch/review/rc_review_passage.do")
	public String rc_passage(HttpServletRequest request,
						BatchExamReadingDto dto,
						ModelMap modelMap) throws Exception {
		
		BatchExamReadingDto examInfo = batchService.getBatchExamReading(dto);

		List<String> paragraphList = new ArrayList<String>();
		if(!StringUtil.nvl(examInfo.getParagraph1()).equals("")) paragraphList.add(examInfo.getParagraph1());
		if(!StringUtil.nvl(examInfo.getParagraph2()).equals("")) paragraphList.add(examInfo.getParagraph2());
		if(!StringUtil.nvl(examInfo.getParagraph3()).equals("")) paragraphList.add(examInfo.getParagraph3());
		if(!StringUtil.nvl(examInfo.getParagraph4()).equals("")) paragraphList.add(examInfo.getParagraph4());
		if(!StringUtil.nvl(examInfo.getParagraph5()).equals("")) paragraphList.add(examInfo.getParagraph5());
		if(!StringUtil.nvl(examInfo.getParagraph6()).equals("")) paragraphList.add(examInfo.getParagraph6());
		if(!StringUtil.nvl(examInfo.getParagraph7()).equals("")) paragraphList.add(examInfo.getParagraph7());
		if(!StringUtil.nvl(examInfo.getParagraph8()).equals("")) paragraphList.add(examInfo.getParagraph8());
		if(!StringUtil.nvl(examInfo.getParagraph9()).equals("")) paragraphList.add(examInfo.getParagraph9());
		if(!StringUtil.nvl(examInfo.getParagraph10()).equals("")) paragraphList.add(examInfo.getParagraph10());
		
		StringBuffer sb = new StringBuffer();
		for(int i=0; i<paragraphList.size(); i++) {
			if(i>0) {
				sb.append("<br /><br />");
			}
			sb.append(paragraphList.get(i));
		}

		examInfo.setParagraph(sb.toString());
		
		modelMap.addAttribute("examInfo", examInfo);
		
		return "batch/review/rc_review_passage";
	}
	
	@RequestMapping(value="/batch/review/rc_review_question.do")
	public String rc_test_question(HttpServletRequest request,
						BatchExamReadingQuestionDto dto,
						ModelMap modelMap) throws Exception {
		
		BatchExamReadingQuestionDto questionInfo = batchService.getBatchExamReadingQuestion(dto);

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
						paragraph = "<span class='arrow'>→</span> " + paragraph;
					}
				}else if(category.equals("B")) {
					if(!StringUtil.nvl(questionInfo.getQuestion()).equals("")) {
						String question = questionInfo.getQuestion().replaceAll("<p[^>]*>", "").replaceAll("</p[^>]*>", "");
						
						questionInfo.setQuestion(question);
					}

					if(paragraph_idx == marker1 || paragraph_idx == marker2) {
						paragraph = "<span class='arrow'>→</span> " + paragraph;
					}
				}else if(category.equals("C")) {
					paragraph = StringUtil.replace(paragraph, "[SQ1]", " <span id='SQA' onclick='ans(\"A\");; return false;'>■</span> ");
					paragraph = StringUtil.replace(paragraph, "[SQ2]", " <span id='SQB' onclick='ans(\"B\");; return false;'>■</span> ");
					paragraph = StringUtil.replace(paragraph, "[SQ3]", " <span id='SQC' onclick='ans(\"C\");; return false;'>■</span> ");
					paragraph = StringUtil.replace(paragraph, "[SQ4]", " <span id='SQD' onclick='ans(\"D\");; return false;'>■</span> ");
				}else if(category.equals("D")) {
					
				}else if(category.equals("E")) {
					
				}
				sb.append(paragraph);
			}

		}

		questionInfo.setParagraph(sb.toString());
		
		modelMap.addAttribute("questionInfo", questionInfo);
		
		return "batch/review/rc_review_question_"+category;
	}	
	
	@RequestMapping(value="/batch/review/getBatchGrammarReviewResult.do")
	public @ResponseBody Map getBatchGrammarReviewResult(HttpServletRequest request,
						BatchResultDto dto,
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		BatchResultDto resultInfo = batchService.getBatchResultAsID(dto);
		
		resultMap.put("resultInfo", resultInfo);
		
		BatchExamsUseranswerDto dto1 = new BatchExamsUseranswerDto();
		dto1.setId(resultInfo.getBatch_grammar_result_id());
		BatchExamsUseranswerDto answerInfo = batchService.getBatchExamsUseranswer(dto1);
		
		resultMap.put("answerInfo", answerInfo);
		
		BatchExamGrammarDto dto2 = new BatchExamGrammarDto();
		dto2.setType(resultInfo.getBatch_grammar_type());
		dto2.setNum(resultInfo.getBatch_grammar_num());
		
		List<BatchExamGrammarDto> grammarList = batchService.getBatchExamGrammarList(dto2);
		
		resultMap.put("grammarList", grammarList);
		return resultMap;
	}
	
	@RequestMapping(value="/batch/review/getBatchReadingReviewResult.do")
	public @ResponseBody Map getBatchReadingReviewResult(HttpServletRequest request,
						BatchResultDto dto,
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		BatchResultDto resultInfo = batchService.getBatchResultAsID(dto);
		
		resultMap.put("resultInfo", resultInfo);
		
		BatchExamsUseranswerDto dto1 = new BatchExamsUseranswerDto();
		dto1.setId(resultInfo.getBatch_reading_result_id());
		BatchExamsUseranswerDto answerInfo = batchService.getBatchExamsUseranswer(dto1);
		
		resultMap.put("answerInfo", answerInfo);
		
		//reading
		BatchExamReadingDto dto2 = new BatchExamReadingDto();
		dto2.setType(resultInfo.getBatch_reading_type());
		dto2.setNum(resultInfo.getBatch_reading_num());
		List<BatchExamReadingDto> readingList = batchService.getBatchExamReadingList(dto2);
		resultMap.put("readingList", readingList);
		
		for(int i=0; i<readingList.size(); i++)
		{
			BatchExamReadingDto dto3 = readingList.get(i);
			
			BatchExamReadingQuestionDto dto4 = new BatchExamReadingQuestionDto();
			dto4.setType(dto3.getType());
			dto4.setNum(dto3.getNum());
			dto4.setSub_num(dto3.getSub_num());
			
			List<BatchExamReadingQuestionDto> readingQuestionList = batchService.getBatchExamReadingQuestionList(dto4);
			resultMap.put("readingQuestionList"+dto3.getSub_num(), readingQuestionList);
		}

		return resultMap;
	}
}