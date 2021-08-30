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
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.dto.AuthUserDto;
import com.usher.dto.BaseAddressDto;
import com.usher.dto.BaseAreaDto;
import com.usher.dto.BaseKakaoSendCodeDto;
import com.usher.dto.BaseKakaoSendMessageDetailDto;
import com.usher.dto.BaseKakaoSendMessageDto;
import com.usher.dto.BatchDirectionDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.BatchScheduleDto;
import com.usher.service.BaseService;
import com.usher.service.BatchService;
import com.usher.util.SessionUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BaseKakaoSendMessageController{
	@Autowired
	BaseService baseService; 
	
	@RequestMapping(value="/base/kakao_send_message.do")
	public String kakao_send_message(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "base/kakao_send_message";
	}
	
	@RequestMapping(value="/base/getBaseKakaoSendMessageList.do")
	public @ResponseBody List<BaseKakaoSendMessageDto> getBaseKakaoSendMessageList(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseKakaoSendMessageList();
	}
	
	@RequestMapping(value="/base/getBaseKakaoSendMessage.do")
	public @ResponseBody BaseKakaoSendMessageDto getBaseKakaoSendMessage(HttpServletRequest request,
						BaseKakaoSendMessageDto dto,
						ModelMap modelMap) throws Exception {
		return baseService.getBaseKakaoSendMessage(dto);
	}
	
	@RequestMapping(value="/base/saveBaseKakaoSendMessage.do")
	public @ResponseBody void saveBaseKakaoSendMessage(HttpServletRequest request,
						BaseKakaoSendMessageDto dto,
						ModelMap modelMap) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		if(dto.getId() > 0) {
			baseService.updateBaseKakaoSendMessage(dto);
		}else {
			baseService.insertBaseKakaoSendMessage(dto);
		}
	}
	
	@RequestMapping(value="/base/deleteBaseKakaoSendMessage.do")
	public @ResponseBody void deleteBaseKakaoSendMessage(HttpServletRequest request,
						BaseKakaoSendMessageDto dto,
						ModelMap modelMap) throws Exception {
		
		baseService.deleteBaseKakaoSendMessage(dto);
	}
}