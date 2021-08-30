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
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.dto.BatchDirectionDto;

import com.usher.service.BatchService;
import com.usher.util.SessionUtil;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BatchDirectionController{
	@Autowired
	BatchService batchService; 
	
	@RequestMapping(value="/batch/direction.do")
	public String schedule(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "batch/direction";
	}
	
	@RequestMapping(value="/batch/getDirection.do")
	public @ResponseBody BatchDirectionDto getDirection(HttpServletRequest request,
						BatchDirectionDto dto, 
						ModelMap modelMap) throws Exception {
		
		return batchService.getBatchDirection(dto);
	}
	
	@RequestMapping(value="/batch/saveDirection.do")
	public @ResponseBody void saveDirection(HttpServletRequest request,
						BatchDirectionDto dto, 
						ModelMap modelMap) throws Exception {
		
		if(dto.getId() > 0) {
			batchService.updateBatchDirection(dto);
		}else {
			batchService.insertBatchDirection(dto);
		}
	}
}