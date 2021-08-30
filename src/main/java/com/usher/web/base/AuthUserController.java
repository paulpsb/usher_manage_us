package com.usher.web.base;

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
import org.springframework.mobile.device.Device;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.dto.AuthUserDto;
import com.usher.dto.BaseAreaDto;
import com.usher.dto.BatchDirectionDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.BatchScheduleDto;
import com.usher.dto.BoardMemoirsDto;
import com.usher.service.AuthService;
import com.usher.service.BaseService;
import com.usher.service.BatchService;
import com.usher.util.SessionUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class AuthUserController{
	@Autowired
	AuthService authService; 
	
	@RequestMapping(value="/base/auth_user.do")
	public String auth_user(HttpServletRequest request,
						ModelMap modelMap,
						Device device) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		

		String mobile = "";
		if (device.isMobile()) {
			mobile = "mobile/";
		}
		
		return mobile+"base/auth_user";
	}
	
	@RequestMapping(value="/base/auth_user_color.do")
	public String auth_user_color(HttpServletRequest request,
						ModelMap modelMap,
						Device device) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "base/auth_user_color";
	}
	
	@RequestMapping(value="/base/getAuthUserList.do")
	public @ResponseBody Map getAuthUserList(HttpServletRequest request,
						AuthUserDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);
		
		AuthUserDto userCount = authService.getUserCount(dto);
		List<AuthUserDto> userList = authService.getUserList(dto);
		resultMap.put("userCount", userCount);
		resultMap.put("userList", userList);
		return resultMap;
	}
	
	@RequestMapping(value="/base/getAuthUserStudentList.do")
	public @ResponseBody List<AuthUserDto> getAuthUserStudentList(HttpServletRequest request,
						AuthUserDto dto, 
						ModelMap modelMap) throws Exception {
		
		return authService.getUserSearchList(dto);
	}
	
	@RequestMapping(value="/base/updateUserGroup.do")
	public @ResponseBody void updateUserGroup(HttpServletRequest request,
						AuthUserDto dto, 
						ModelMap modelMap) throws Exception {
		
		authService.updateUserGroup(dto);
	}
	
	@RequestMapping(value="/base/updateUser.do")
	public @ResponseBody void updateUser(HttpServletRequest request,
						AuthUserDto dto, 
						ModelMap modelMap) throws Exception {
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int user_id          = Integer.parseInt(jsonObj.get("user_id").toString());
			boolean is_active    = Boolean.parseBoolean(jsonObj.get("is_active").toString());
			boolean is_voca      = Boolean.parseBoolean(jsonObj.get("is_voca").toString());
			boolean is_grammar   = Boolean.parseBoolean(jsonObj.get("is_grammar").toString());
			boolean is_reading   = Boolean.parseBoolean(jsonObj.get("is_reading").toString());
			boolean is_listening = Boolean.parseBoolean(jsonObj.get("is_listening").toString());
			boolean is_speaking  = Boolean.parseBoolean(jsonObj.get("is_speaking").toString());
			boolean is_writing   = Boolean.parseBoolean(jsonObj.get("is_writing").toString());
			String  user_color   = jsonObj.get("user_color").toString();
			String  start_time   = jsonObj.get("start_time").toString();
			String  end_time     = jsonObj.get("end_time").toString();
			AuthUserDto sto = new AuthUserDto();
			sto.setUser_id(user_id);
			sto.setIs_active(is_active);
			sto.setIs_voca(is_voca);
			sto.setIs_grammar(is_grammar);
			sto.setIs_reading(is_reading);
			sto.setIs_listening(is_listening);
			sto.setIs_speaking(is_speaking);
			sto.setIs_writing(is_writing);
			sto.setUser_color(user_color);
			sto.setStart_time(start_time);
			sto.setEnd_time(end_time);
			authService.updateUser(sto);
		}
	}
}