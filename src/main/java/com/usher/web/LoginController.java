package com.usher.web;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import com.usher.dto.AuthUserDto;
import com.usher.service.AuthService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class LoginController{
	@Autowired
	AuthService authService; 
	
	@RequestMapping(value="/login.do")
	public String login(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/main/dashboard_teacher.do";
		}		
		
		return "login";
	}
	
	@RequestMapping(value="/loginCheck.do")
	public @ResponseBody AuthUserDto loginCheck(HttpServletRequest request,
						AuthUserDto dto, 
						ModelMap modelMap) throws Exception {
		Map resultMap = new HashMap();
		System.out.println("홈페이지 연동시작");
		
		//홈페이지와의 연동을 한다.
		String url = "http://www.usher.co.kr/outLogin.php?mb_id="+dto.getUsername()+"&&mb_password="+URLEncoder.encode(dto.getPassword(),"UTF-8");
		URL uri = new URL(url);
		HttpURLConnection connection = (HttpURLConnection) uri.openConnection();
		connection.setRequestMethod("GET");
		connection.setDoOutput(true);//boolean형. 디폴트가 false
		System.out.println("홈페이지 연동종료");
		String resultMsg = "";
		
		if(connection.getResponseCode() == HttpURLConnection.HTTP_OK)
		{
			BufferedReader input = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			String line;
			StringBuffer buffer = new StringBuffer();
			while ((line = input.readLine()) != null) {
				buffer.append(line);
			}
			resultMsg = buffer.toString();
		}
		connection.disconnect();
		resultMsg = StringUtil.replaceAll(resultMsg, "({", "{");
		resultMsg = StringUtil.replaceAll(resultMsg, "})", "}");

		JSONParser jsonParser = new JSONParser();
		JSONObject jsonObj = (JSONObject)jsonParser.parse(resultMsg);
		if(jsonObj.get("STATUS").equals("Y"))
		{
			//사용자 정보를 찾는다.
			AuthUserDto userInfo = authService.getUser(dto);
			userInfo.setLogin_ip(StringUtil.getClientIP(request));
			if(userInfo.getGroup_name().toLowerCase().equals("student")) {
				dto.setLogin_yn("N");
				dto.setLogin_fail_msg("학생은 사용이 불가능합니다.");
			}else {
				SessionUtil.setSessionStudent(request, userInfo);
				dto.setLogin_yn("Y");
			}
		}else{
			dto.setLogin_yn("N");
			dto.setLogin_fail_msg("사용자 정보가 존재하지 않습니다. 아이디나 비밀번호를 확인하십시오.");
		}
		return dto;
	}
	
	@RequestMapping(value="/logout.do")
	public String logout(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		SessionUtil.killSession(request);
		
		return "redirect:/login.do";
	}
}