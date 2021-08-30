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

import com.usher.dto.BatchVideoDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.EnrollmentsSeatenrollmentDto;
import com.usher.service.BatchService;
import com.usher.util.SessionUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BatchVideoController{
	@Autowired
	BatchService batchService; 
	
	@RequestMapping(value="/batch/video.do")
	public String batch_video(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "batch/video";
	}
	
	
	@RequestMapping(value="/batch/getBatchVideoList.do")
	public @ResponseBody List<BatchVideoDto> getBatchVideoList(HttpServletRequest request,
						BatchVideoDto dto, 
						ModelMap modelMap) throws Exception {
		
		return batchService.getBatchVideoList(dto);
	}
	
	@RequestMapping(value="/batch/saveBatchVideo.do")
	public @ResponseBody void saveBatchVideo(HttpServletRequest request) throws Exception {
		
		String data_value = request.getParameter("data_value");
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			BatchVideoDto dto = new BatchVideoDto();
			dto.setTest_type(jsonObj.get("test_type").toString());
			dto.setStudent_type(jsonObj.get("student_type").toString());
			dto.setBase_batch_course(jsonObj.get("base_batch_course").toString());
			dto.setBase_user_course(jsonObj.get("base_user_course").toString());
			dto.setSelect_course(jsonObj.get("select_course").toString());
			dto.setSelect_type(jsonObj.get("select_type").toString());
			dto.setFinally_course(jsonObj.get("finally_course").toString());
			dto.setVideo_url(jsonObj.get("video_url").toString());
			
			BatchVideoDto batchVideo = batchService.getBatchVideo(dto);
			if(batchVideo != null) {
				dto.setId(batchVideo.getId());
				batchService.updateBatchVideo(dto);
			}else {
				batchService.insertBatchVideo(dto);
			}

		}
	}
	
}

