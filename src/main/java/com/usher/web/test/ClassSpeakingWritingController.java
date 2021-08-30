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
import com.usher.dto.InternalExamsMemorizationDto;
import com.usher.dto.InternalExamsMemorizationQuestionDto;
import com.usher.dto.InternalExamsReadingDto;
import com.usher.dto.InternalExamsReadingQuestionDto;
import com.usher.dto.InternalExamsSpeakingDto;
import com.usher.dto.InternalExamsWritingDto;
import com.usher.dto.MockTestDirectionDto;
import com.usher.dto.PracticesPracticeproblemBoardDto;
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
public class ClassSpeakingWritingController{
	@Autowired
	PracticesService practicesService; 
	
	@Autowired
	GoalService goalService;
	
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	InternalExamsService internalExamsService;
	
	@Autowired
	MockTestService mockTestService;
	
	@RequestMapping(value="/test/class/speaking_writing_class.do")
	public String speaking_writing_class(HttpServletRequest request,
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
		
		return "test/class/speaking_writing_class";
	}
	
	@RequestMapping(value="/test/class/getSpeakingWritingPracticeScheduleList.do")
	public @ResponseBody List<PracticesPracticescheduleDto> getSpeakingWritingPracticeScheduleList(HttpServletRequest request, PracticesPracticescheduleDto dto) throws Exception {
		List<PracticesPracticescheduleDto> resultList = new ArrayList<PracticesPracticescheduleDto>();
		
		dto.setSection("SPEAKING");
		List<PracticesPracticescheduleDto> list1 = practicesService.getPracticeTodayScheduleList(dto);
		for(int i=0,size=list1.size(); i<size; i++)
		{
			resultList.add(list1.get(i));
		}
		
		
		dto.setSection("WRITING");
		List<PracticesPracticescheduleDto> list2 = practicesService.getPracticeTodayScheduleList(dto);
		for(int i=0,size=list2.size(); i<size; i++)
		{
			resultList.add(list2.get(i));
		}
		
		return resultList;
	}
	
	@RequestMapping(value="/test/class/getPracticeProblemBoard.do")
	public @ResponseBody PracticesPracticeproblemBoardDto getPracticeProblemBoard(HttpServletRequest request, PracticesPracticeproblemBoardDto dto) throws Exception {
		PracticesPracticeproblemBoardDto resultInfo = practicesService.getPracticeProblemBoard(dto);
		if(resultInfo == null) {
			resultInfo = new PracticesPracticeproblemBoardDto();
			resultInfo.setBoard("");
		}
		return resultInfo;
	}
	
	@RequestMapping(value="/test/class/savePracticeProblemBoard.do")
	public @ResponseBody void savePracticeProblemBoard(HttpServletRequest request, PracticesPracticeproblemBoardDto dto) throws Exception {
		PracticesPracticeproblemBoardDto resultInfo = practicesService.getPracticeProblemBoard(dto);
		if(resultInfo == null) {
			practicesService.insertPracticeProblemBoard(dto);
		}else {
			practicesService.updatePracticeProblemBoard(dto);
		}
		
	}
	

	@RequestMapping(value="/test/class/getSpeakingWritingTwelve.do")
	public @ResponseBody String getSpeakingWritingTwelve(HttpServletRequest request) throws Exception {
		StringBuffer sb = new StringBuffer();
		
		InternalExamsMemorizationDto dto1 = new InternalExamsMemorizationDto();
		dto1.setSection("SPEAKING");
		dto1.setPractice_type("TWELVE");
		List<InternalExamsMemorizationDto> examList = internalExamsService.getInternalExamsMemorizationExamList(dto1);
		for(int i=0; i<examList.size(); i++)
		{
			InternalExamsMemorizationDto examInfo = examList.get(i);
			String content = examInfo.getContents();
			
			InternalExamsMemorizationQuestionDto dto2 = new InternalExamsMemorizationQuestionDto();
			dto2.setMemorization_id(examInfo.getId());
			List<InternalExamsMemorizationQuestionDto> questionList = internalExamsService.getInternalExamsMemorizationQuestionList(dto2);
			for(int j=0; j<questionList.size(); j++)
			{
				InternalExamsMemorizationQuestionDto questionInfo = questionList.get(j);
				int num = questionInfo.getQuestion_num();
				String q_num = "[SQ"+num+"]";
				String question = questionInfo.getQuestion();
				content = StringUtil.replace(content,q_num, question);
			}
			sb.append(content+"<br><br>");
			
		}
		return sb.toString();
	}
	
	@RequestMapping(value="/test/class/getSpeakingWritingFiveRules.do")
	public @ResponseBody String getSpeakingWritingFiveRules(HttpServletRequest request) throws Exception {
		StringBuffer sb = new StringBuffer();
		
		InternalExamsMemorizationDto dto1 = new InternalExamsMemorizationDto();
		dto1.setSection("WRITING");
		dto1.setPractice_type("FIVERULES");
		List<InternalExamsMemorizationDto> examList = internalExamsService.getInternalExamsMemorizationExamList(dto1);
		for(int i=0; i<examList.size(); i++)
		{
			InternalExamsMemorizationDto examInfo = examList.get(i);
			String content = examInfo.getContents();
			
			InternalExamsMemorizationQuestionDto dto2 = new InternalExamsMemorizationQuestionDto();
			dto2.setMemorization_id(examInfo.getId());
			List<InternalExamsMemorizationQuestionDto> questionList = internalExamsService.getInternalExamsMemorizationQuestionList(dto2);
			for(int j=0; j<questionList.size(); j++)
			{
				InternalExamsMemorizationQuestionDto questionInfo = questionList.get(j);
				int num = questionInfo.getQuestion_num();
				String q_num = "[SQ"+num+"]";
				String question = questionInfo.getQuestion();
				content = StringUtil.replace(content,q_num, question);
				
			}
			sb.append(content+"<br><br>");
			
		}
		return sb.toString();
	}
	
	@RequestMapping(value="/test/class/exam/speaking.do")
	public String speaking(HttpServletRequest request,
						InternalExamsSpeakingDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		modelMap.addAttribute("speakingExamInfo", dto);
		
		MockTestDirectionDto dto1 = new MockTestDirectionDto();
		dto1.setSection("SPEAKING");
		MockTestDirectionDto directionInfo = mockTestService.getMockTestDirection(dto1);
		modelMap.addAttribute("directionInfo", directionInfo);
		
		return "test/class/exam/speaking";
	}
	
	@RequestMapping(value="/test/class/exam/writing.do")
	public String writing(HttpServletRequest request,
						InternalExamsWritingDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		modelMap.addAttribute("writingExamInfo", dto);
		
		MockTestDirectionDto dto1 = new MockTestDirectionDto();
		dto1.setSection("WRITING");
		MockTestDirectionDto directionInfo = mockTestService.getMockTestDirection(dto1);
		modelMap.addAttribute("directionInfo", directionInfo);
		
		return "test/class/exam/writing";
	}
}