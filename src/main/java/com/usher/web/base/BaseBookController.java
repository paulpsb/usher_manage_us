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
import com.usher.dto.BaseAreaDto;
import com.usher.dto.BaseBookDto;
import com.usher.dto.BatchDirectionDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.BatchScheduleDto;
import com.usher.service.AwsS3Service;
import com.usher.service.BaseService;
import com.usher.service.BatchService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BaseBookController{
	@Autowired
	BaseService baseService; 
	
	@Autowired
	AwsS3Service awsS3Service;
	
	@RequestMapping(value="/base/book.do")
	public String book(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "base/book";
	}
	
	@RequestMapping(value="/base/getBaseBookList.do")
	public @ResponseBody List<BaseBookDto> getBaseBookList(HttpServletRequest request,
						BaseBookDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseBookList(dto);
	}
	
	@RequestMapping(value="/base/getBaseBook.do")
	public @ResponseBody BaseBookDto getBaseBook(HttpServletRequest request,
						BaseBookDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseBook(dto);
	}
	
	
	@RequestMapping(value="/base/insertBaseBook.do")
	public @ResponseBody void insertBaseBook(HttpServletRequest request,
						BaseBookDto dto,
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		baseService.insertBaseBook(dto);
	}
	
	@RequestMapping(value="/base/updateBaseBook.do")
	public @ResponseBody void updateBaseBook(HttpServletRequest request,
						BaseBookDto dto,
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		baseService.updateBaseBook(dto);
	}
	
	@RequestMapping(value="/base/deleteBaseBook.do")
	public @ResponseBody void deleteBaseBook(HttpServletRequest request,
						BaseBookDto dto,
						ModelMap modelMap) throws Exception {
		
		baseService.deleteBaseBook(dto);
	}
	
	@RequestMapping(value="/base/uploadBookFileUpload.do")
	public @ResponseBody String uploadBookFileUpload(@RequestPart MultipartFile file) throws Exception {
		
		return awsS3Service.uploadBaseObjectRename(file, "book");
		
	}
}