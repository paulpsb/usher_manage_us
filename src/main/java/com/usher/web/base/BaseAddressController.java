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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.usher.dto.AuthUserDto;
import com.usher.dto.BaseAddressDto;
import com.usher.dto.BaseAreaDto;
import com.usher.dto.BatchDirectionDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.BatchScheduleDto;
import com.usher.service.AwsS3Service;
import com.usher.service.BaseService;
import com.usher.service.BatchService;
import com.usher.util.SessionUtil;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BaseAddressController{
	@Autowired
	BaseService baseService; 
	
	@Autowired
	AwsS3Service awsS3Service;
	
	@RequestMapping(value="/base/address.do")
	public String address(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "base/address";
	}
	
	@RequestMapping(value="/base/getBaseAddressList.do")
	public @ResponseBody List<BaseAddressDto> getBaseAddressList(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseAddressList();
	}
	
	@RequestMapping(value="/base/getBaseAddress.do")
	public @ResponseBody BaseAddressDto getBaseAddress(HttpServletRequest request,
						BaseAddressDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseAddress(dto);
	}
	
	
	@RequestMapping(value="/base/insertBaseAddress.do")
	public @ResponseBody void insertBaseAddress(HttpServletRequest request,
						BaseAddressDto dto,
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		baseService.insertBaseAddress(dto);
	}
	
	@RequestMapping(value="/base/updateBaseAddress.do")
	public @ResponseBody void updateBaseAddress(HttpServletRequest request,
						BaseAddressDto dto,
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		baseService.updateBaseAddress(dto);
	}
	
	@RequestMapping(value="/base/deleteBaseAddress.do")
	public @ResponseBody void deleteBaseAddress(HttpServletRequest request,
						BaseAddressDto dto,
						ModelMap modelMap) throws Exception {
		
		baseService.deleteBaseAddress(dto);
	}
	
	@RequestMapping(value="/base/uploadAddressFileUpload.do")
	public @ResponseBody String uploadAddressFileUpload(@RequestPart MultipartFile file) throws Exception {
		
		return awsS3Service.uploadBaseObjectRename(file, "address");
		
	}
}