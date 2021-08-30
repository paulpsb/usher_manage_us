package com.usher.web.batch;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.usher.dto.AuthUserDto;
import com.usher.dto.BatchDirectionDto;
import com.usher.dto.BatchExamGrammarDto;
import com.usher.dto.BatchExamListeningDto;
import com.usher.dto.BatchExamListeningQuestionDto;
import com.usher.dto.BatchExamReadingDto;
import com.usher.dto.BatchExamReadingQuestionDto;
import com.usher.dto.BatchExamToeicDto;
import com.usher.dto.BatchExamToeicImageDto;
import com.usher.dto.BatchExamToeicQuestionDto;
import com.usher.service.AwsS3Service;
import com.usher.service.BatchService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BatchExamController{
	@Autowired
	BatchService batchService; 
	
	@Autowired
	AwsS3Service awsS3Service;
	
	@RequestMapping(value="/batch/listening_exam.do")
	public String listening_exam(HttpServletRequest request,
						BatchExamListeningDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("listeningInfo", dto);
		String url = "";
		
		url = "batch/listening_exam";
		return url;
	}
	
	@RequestMapping(value="/batch/getExamListeningList.do")
	public @ResponseBody List<BatchExamListeningDto> getExamListeningList(HttpServletRequest request,
						BatchExamListeningDto dto, 
						ModelMap modelMap) throws Exception {
		
		return batchService.getBatchExamListeningList(dto);
	}
	

	@RequestMapping(value="/batch/getBatchExamListening.do")
	public @ResponseBody BatchExamListeningDto getBatchExamListening(HttpServletRequest request, BatchExamListeningDto dto) throws Exception {
		return batchService.getBatchExamListening(dto);
	}
	
	@RequestMapping(value="/batch/insertBatchExamListening.do")
	public @ResponseBody void insertBatchExamListening(HttpServletRequest request, BatchExamListeningDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());		
		batchService.insertBatchExamListening(dto);
	}
	
	@RequestMapping(value="/batch/updateBatchExamListening.do")
	public @ResponseBody void updateBatchExamListening(HttpServletRequest request, BatchExamListeningDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());		
		batchService.updateBatchExamListening(dto);
	}
	
	@RequestMapping(value="/batch/listening_exam_question.do")
	public String listening_question(HttpServletRequest request,
						BatchExamListeningDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		BatchExamListeningDto listeningInfo = batchService.getBatchExamListening(dto);
		modelMap.addAttribute("listeningInfo", listeningInfo);
		String url = "";
		
		url = "batch/listening_exam_question";
		return url;
	}
	
	@RequestMapping(value="/batch/getBatchExamListeningQuestionList.do")
	public @ResponseBody List<BatchExamListeningQuestionDto> getBatchExamListeningQuestionList(HttpServletRequest request,
						BatchExamListeningQuestionDto dto, 
						ModelMap modelMap) throws Exception {
		return batchService.getBatchExamListeningQuestionList(dto);
	}
	
	
	@RequestMapping(value="/batch/getBatchExamListeningQuestion.do")
	public @ResponseBody BatchExamListeningQuestionDto getBatchExamListeningQuestion(HttpServletRequest request,
						BatchExamListeningQuestionDto dto, 
						ModelMap modelMap) throws Exception {
		
		

		return batchService.getBatchExamListeningQuestion(dto);
	}
	
	@RequestMapping(value="/batch/insertBatchExamListeningQuestion.do")
	public @ResponseBody BatchExamListeningQuestionDto insertBatchExamListeningQuestion(HttpServletRequest request,
						BatchExamListeningQuestionDto dto, 
						ModelMap modelMap) throws Exception {
		BatchExamListeningQuestionDto num = batchService.getBatchExamListeningQuestionNum(dto);
		
		dto.setQuestion_num(num.getQuestion_num());
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		
		batchService.insertBatchExamListeningQuestion(dto);
		
		return dto;
	}
	
	@RequestMapping(value="/batch/updateExamListeningQuestion.do")
	public @ResponseBody void updateBatchExamListeningQuestion(HttpServletRequest request,
						BatchExamListeningQuestionDto dto, 
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setModified_id(userInfo.getUser_id());
		
		batchService.updateBatchExamListeningQuestion(dto);
	}
	
	@RequestMapping(value="/batch/deleteBatchExamListeningQuestion.do")
	public @ResponseBody void deleteBatchExamListeningQuestion(HttpServletRequest request,
						BatchExamListeningQuestionDto dto, 
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setModified_id(userInfo.getUser_id());
		
		batchService.deleteBatchExamListeningQuestion(dto);
	}
	
	
	@RequestMapping(value="/batch/reading_exam.do")
	public String reading_exam(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "batch/reading_exam";
	}
	
	@RequestMapping(value="/batch/getBatchExamReadingNumList.do")
	public @ResponseBody List<BatchExamReadingDto> getBatchExamReadingNumList(HttpServletRequest request,
						BatchExamReadingDto dto, 
						ModelMap modelMap) throws Exception {
		
		return batchService.getBatchExamReadingNumList(dto);
	}
	
	@RequestMapping(value="/batch/getBatchExamReading.do")
	public @ResponseBody BatchExamReadingDto getBatchExamReading(HttpServletRequest request,
						BatchExamReadingDto dto, 
						ModelMap modelMap) throws Exception {
		
		return batchService.getBatchExamReading(dto);
	}
	
	@RequestMapping(value="/batch/createBatchExamReading.do")
	public @ResponseBody BatchExamReadingDto createBatchExamReading(HttpServletRequest request,
						BatchExamReadingDto dto, 
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		BatchExamReadingDto numInfo = batchService.getBatchExamReadingNum(dto);
		dto.setNum(numInfo.getNum());
		for(int i=1; i<=3; i++)
		{
			dto.setSub_num(i);
			batchService.insertBatchExamReading(dto);
		}
		return dto;
	}
	
	@RequestMapping(value="/batch/updateBatchExamReading.do")
	public @ResponseBody void updateBatchExamReading(HttpServletRequest request,
						BatchExamReadingDto dto, 
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setModified_id(userInfo.getUser_id());
		
		batchService.updateBatchExamReading(dto);
	}
	
	@RequestMapping(value="/batch/reading_exam_question.do")
	public String reading_exam_question(HttpServletRequest request,
						BatchExamReadingDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		modelMap.addAttribute("examInfo", dto);
		return "batch/reading_exam_question";
	}
	
	@RequestMapping(value="/batch/getBatchExamReadingQuestion.do")
	public @ResponseBody BatchExamReadingQuestionDto getBatchExamReadingQuestion(HttpServletRequest request,
						BatchExamReadingQuestionDto dto, 
						ModelMap modelMap) throws Exception {
		
		return batchService.getBatchExamReadingQuestion(dto);
	}
	
	@RequestMapping(value="/batch/saveBatchExamReadingQuestion.do")
	public @ResponseBody void saveBatchExamReadingQuestion(HttpServletRequest request,
						BatchExamReadingQuestionDto dto, 
						ModelMap modelMap) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		
		if(dto.getFlag().equals("I")) {
			batchService.insertBatchExamReadingQuestion(dto);
		}else {
			batchService.updateBatchExamReadingQuestion(dto);
		}
	}
	
	@RequestMapping(value="/batch/grammar_exam.do")
	public String grammar_exam(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "batch/grammar_exam";
	}
	
	@RequestMapping(value="/batch/getBatchExamGrammarNumList.do")
	public @ResponseBody List<BatchExamGrammarDto> getBatchExamGrammarNumList(HttpServletRequest request,
						BatchExamGrammarDto dto, 
						ModelMap modelMap) throws Exception {
		
		return batchService.getBatchExamGrammarNumList(dto);
	}
	
	@RequestMapping(value="/batch/getBatchExamGrammarQuestionList.do")
	public @ResponseBody List<BatchExamGrammarDto> getBatchExamGrammarQuestionList(HttpServletRequest request,
						BatchExamGrammarDto dto, 
						ModelMap modelMap) throws Exception {
		
		return batchService.getBatchExamGrammarQuestionList(dto);
	}
	
	@RequestMapping(value="/batch/getBatchExamGrammar.do")
	public @ResponseBody BatchExamGrammarDto getBatchExamGrammar(HttpServletRequest request,
						BatchExamGrammarDto dto, 
						ModelMap modelMap) throws Exception {
		
		return batchService.getBatchExamGrammar(dto);
	}
	
	@RequestMapping(value="/batch/createBatchExamGrammarNum.do")
	public @ResponseBody BatchExamGrammarDto createBatchExamGrammarNum(HttpServletRequest request,
						BatchExamGrammarDto dto, 
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		BatchExamGrammarDto numInfo = batchService.getBatchExamGrammarNum(dto);
		dto.setNum(numInfo.getNum());
		dto.setQuestion_num(1);
		batchService.insertBatchExamGrammar(dto);
		return dto;
	}
	
	@RequestMapping(value="/batch/createBatchExamGrammarQuestionNum.do")
	public @ResponseBody BatchExamGrammarDto createBatchExamGrammarQuestionNum(HttpServletRequest request,
						BatchExamGrammarDto dto, 
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		BatchExamGrammarDto numInfo = batchService.getBatchExamGrammarQuestionNum(dto);
		dto.setQuestion_num(numInfo.getQuestion_num());
		batchService.insertBatchExamGrammar(dto);
		return dto;
	}
	
	@RequestMapping(value="/batch/updateBatchExamGrammar.do")
	public @ResponseBody void updateBatchExamGrammar(HttpServletRequest request,
						BatchExamGrammarDto dto, 
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setModified_id(userInfo.getUser_id());
		
		batchService.updateBatchExamGrammar(dto);
	}
	
	@RequestMapping(value="/batch/toeic_exam.do")
	public String toeic_exam(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "batch/toeic_exam";
	}
	
	@RequestMapping(value="/batch/getBatchExamToeicNumList.do")
	public @ResponseBody List<BatchExamToeicDto> getBatchExamToeicNumList(HttpServletRequest request,
						BatchExamToeicDto dto, 
						ModelMap modelMap) throws Exception {
		
		return batchService.getBatchExamToeicNumList(dto);
	}
	
	@RequestMapping(value="/batch/getBatchExamToeic.do")
	public @ResponseBody Map getBatchExamToeic(HttpServletRequest request,
						BatchExamToeicDto dto, 
						ModelMap modelMap) throws Exception {
		Map resultMap = new HashMap();
		BatchExamToeicDto examToeicInfo = batchService.getBatchExamToeic(dto);
		resultMap.put("examToeicInfo", examToeicInfo);
		
		BatchExamToeicImageDto dto1 = new BatchExamToeicImageDto();
		dto1.setType(dto.getType());
		dto1.setNum(dto.getNum());
		List<BatchExamToeicImageDto> examToeicImageList = batchService.getBatchExamToeicImageList(dto1);
		resultMap.put("examToeicImageList", examToeicImageList);
		
		BatchExamToeicQuestionDto dto2 = new BatchExamToeicQuestionDto();
		dto2.setType(dto.getType());
		dto2.setNum(dto.getNum());
		List<BatchExamToeicQuestionDto> examToeicQuestionList = batchService.getBatchExamToeicQuestionList(dto2);
		resultMap.put("examToeicQuestionList", examToeicQuestionList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/batch/createBatchExamToeicNum.do")
	public @ResponseBody BatchExamToeicDto createBatchExamGrammarNum(HttpServletRequest request,
						BatchExamToeicDto dto, 
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		BatchExamToeicDto numInfo = batchService.getBatchExamToeicMaxNum(dto);
		dto.setNum(numInfo.getNum());
		batchService.insertBatchExamToeic(dto);
		return dto;
	}
	
	@RequestMapping(value="/batch/uploadBatchToeicFileUpload.do")
	public @ResponseBody String uploadBatchToeicFileUpload(@RequestPart MultipartFile file) throws Exception {
		
		String year = StringUtil.getToDayFormat("yyyy");
		String month = StringUtil.getToDayFormat("MM");
		String toDay = StringUtil.getToDayFormat("yyyy-MM-dd");
		
		String storedFolderName = "toeic/" + year + "/" + month + "/" + toDay;
				
		return awsS3Service.uploadBaseObject(file, storedFolderName);
		
	}
	
	@RequestMapping(value="/batch/saveBatchExamToeic.do")
	public @ResponseBody void saveBatchExamToeic(HttpServletRequest request,
						BatchExamToeicDto dto, 
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setModified_id(userInfo.getUser_id());
		batchService.updateBatchExamToeic(dto);
		batchService.deleteBatchExamToeicImage(dto);
		batchService.deleteBatchExamToeicQuestion(dto);
		
		String data_value_question = dto.getData_value_question();
		String data_value_image = dto.getData_value_image();
		
		JSONParser jsonParserImage = new JSONParser();
		Object objImage = jsonParserImage.parse(data_value_image);
		JSONArray jsonArrayImage= (JSONArray)objImage;
		for(int i=0;i<jsonArrayImage.size();i++){
			JSONObject jsonObjImage= (JSONObject)jsonArrayImage.get(i);
			
			String image_url   = jsonObjImage.get("image_url").toString();
			int image_sorting  = Integer.parseInt(jsonObjImage.get("image_sorting").toString());
			
			BatchExamToeicImageDto sto1 = new BatchExamToeicImageDto();
			sto1.setCreated_id(userInfo.getUser_id());
			sto1.setModified_id(userInfo.getUser_id());
			sto1.setType(dto.getType());
			sto1.setNum(dto.getNum());
			sto1.setImage_url(image_url);
			sto1.setImage_sorting(image_sorting);
			batchService.insertBatchExamToeicImage(sto1);
		}
		
		JSONParser jsonParserQuestion = new JSONParser();
		Object objQuestion = jsonParserQuestion.parse(data_value_question);
		JSONArray jsonArrayQuestion = (JSONArray)objQuestion;
		for(int i=0;i<jsonArrayQuestion.size();i++){
			JSONObject jsonObjQuestion = (JSONObject)jsonArrayQuestion.get(i);
			
			int question_num           = Integer.parseInt(jsonObjQuestion.get("question_num").toString());
			String question_type       = jsonObjQuestion.get("question_type").toString();
			String question_category   = jsonObjQuestion.get("question_category").toString();
			String answer              = jsonObjQuestion.get("answer").toString();
			
			BatchExamToeicQuestionDto sto2 = new BatchExamToeicQuestionDto();
			sto2.setCreated_id(userInfo.getUser_id());
			sto2.setModified_id(userInfo.getUser_id());
			sto2.setType(dto.getType());
			sto2.setNum(dto.getNum());
			sto2.setQuestion_num(question_num);
			sto2.setQuestion_type(question_type);
			sto2.setQuestion_category(question_category);
			sto2.setAnswer(answer);
			batchService.insertBatchExamToeicQuestion(sto2);
		}
		
		
		
	}
}