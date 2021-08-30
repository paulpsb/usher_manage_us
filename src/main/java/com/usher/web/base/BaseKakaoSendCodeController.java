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
public class BaseKakaoSendCodeController{
	@Autowired
	BaseService baseService; 
	
	@RequestMapping(value="/base/kakao_send_code.do")
	public String kakao_send_code(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "base/kakao_send_code";
	}
	
	@RequestMapping(value="/base/getBaseKakaoSendCodeList.do")
	public @ResponseBody List<BaseKakaoSendCodeDto> getBaseKakaoSendCodeList(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseKakaoSendCodeList();
	}
	
	
	@RequestMapping(value="/base/saveBaseKakaoSendCode.do")
	public @ResponseBody void saveBaseKakaoSendCode(HttpServletRequest request,
						BaseKakaoSendCodeDto dto,
						ModelMap modelMap) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			String flag               = jsonObj.get("flag").toString();
			int send_code_id          = Integer.parseInt(jsonObj.get("send_code_id").toString());
			String send_code          = jsonObj.get("send_code").toString();
			String send_value         = jsonObj.get("send_value").toString();
			String send_default_value = jsonObj.get("send_default_value").toString();
			
			BaseKakaoSendCodeDto sto = new BaseKakaoSendCodeDto();
			sto.setCreated_id(userInfo.getUser_id());
			sto.setModified_id(userInfo.getUser_id());
			sto.setId(send_code_id);
			sto.setSend_code(send_code);
			sto.setSend_value(send_value);
			sto.setSend_default_value(send_default_value);
			
			if(flag.equals("I")) {
				baseService.insertBaseKakaoSendCode(sto);
			}else if(flag.equals("U")) {
				baseService.updateBaseKakaoSendCode(sto);
			}else if(flag.equals("D")) {
				baseService.deleteBaseKakaoSendCode(sto);
			}
			
		}
	}
	
	
}