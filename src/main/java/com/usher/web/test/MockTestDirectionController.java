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

import com.usher.dto.BatchDirectionDto;
import com.usher.dto.MockTestDirectionDto;
import com.usher.service.BatchService;
import com.usher.service.MockTestService;
import com.usher.util.SessionUtil;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class MockTestDirectionController{
	@Autowired
	MockTestService mockTestService; 
	
	@RequestMapping(value="/test/mock_test_direction.do")
	public String schedule(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "test/mock_test_direction";
	}
	
	@RequestMapping(value="/test/getMockTestDirection.do")
	public @ResponseBody MockTestDirectionDto getMockTestDirection(HttpServletRequest request,
						MockTestDirectionDto dto, 
						ModelMap modelMap) throws Exception {
		
		return mockTestService.getMockTestDirection(dto);
	}
	
	@RequestMapping(value="/test/saveMockTestDirection.do")
	public @ResponseBody void saveDirection(HttpServletRequest request,
						MockTestDirectionDto dto, 
						ModelMap modelMap) throws Exception {
		
		if(dto.getId() > 0) {
			mockTestService.updateMockTestDirection(dto);
		}else {
			mockTestService.insertMockTestDirection(dto);
		}
	}
}