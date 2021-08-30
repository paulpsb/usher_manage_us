package com.usher.web.test;

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
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.dto.InternalExamsProblemDto;
import com.usher.dto.MockTestScheduleDto;
import com.usher.dto.MockTestScheduleExamDto;
import com.usher.dto.PracticesPracticebookDto;
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.dto.PracticesPracticevolumeDto;
import com.usher.service.InternalExamsService;
import com.usher.service.MockTestService;
import com.usher.service.PracticesService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class MockTestScheduleController{
	@Autowired
	MockTestService mockTestService; 
	
	@RequestMapping(value="/test/mock_test_schedule.do")
	public String book(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "test/mock_test_schedule";
	}
	
	@RequestMapping(value="/test/saveMockTestSchedule.do")
	public @ResponseBody void saveMockTestSchedule(HttpServletRequest request,
						MockTestScheduleDto dto,
						ModelMap modelMap) throws Exception {
		
		mockTestService.insertMockTestSchedule(dto);
		
		int mock_test_schedule_id = dto.getId();
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			String section = jsonObj.get("section").toString();
			String book = jsonObj.get("book").toString();
			String volume = jsonObj.get("volume").toString();
			String group = jsonObj.get("group").toString();
			String article = jsonObj.get("article").toString();
			int mock_test_exam_min = Integer.parseInt(jsonObj.get("mock_test_exam_min").toString());
			MockTestScheduleExamDto sto = new MockTestScheduleExamDto();
			sto.setSection(section);
			sto.setBook(book);
			sto.setVolume(volume);
			sto.setGroup(group);
			sto.setArticle(article);
			sto.setMock_test_schedule_id(mock_test_schedule_id);
			sto.setMock_test_exam_min(mock_test_exam_min);
			mockTestService.insertMockTestScheduleExam(sto);

		}
	}
}