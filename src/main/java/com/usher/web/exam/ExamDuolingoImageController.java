package com.usher.web.exam;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.usher.dto.AuthUserDto;
import com.usher.dto.InternalExamsChainDto;
import com.usher.dto.InternalExamsDuolingoImageDto;
import com.usher.service.AwsS3Service;
import com.usher.service.InternalExamsService;

import com.usher.util.SessionUtil;


@Controller
public class ExamDuolingoImageController{
	@Autowired
	InternalExamsService internalExamsService;
	
	@Autowired
	AwsS3Service awsS3Service;
	
	@RequestMapping(value="/exam/duolingo_image_list.do")
	public String duolingo_image_list(HttpServletRequest request,
						InternalExamsDuolingoImageDto dto, 
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("imageInfo", dto);
		String url = "";
		
		url = "exam/duolingo_image_list";
		return url;
	}
	
	@RequestMapping(value="/exam/getExamsDuolingoImageList.do")
	public @ResponseBody List<InternalExamsDuolingoImageDto>  getExamsDuolingoImageList(HttpServletRequest request,
					InternalExamsDuolingoImageDto dto, 
						ModelMap modelMap) throws Exception {
		return internalExamsService.getExamsDuolingoImageList(dto);
	}
	
	@RequestMapping(value="/exam/getExamsDuolingoImage.do")
	public @ResponseBody InternalExamsDuolingoImageDto  getExamsDuolingoImage(HttpServletRequest request,
					InternalExamsDuolingoImageDto dto, 
						ModelMap modelMap) throws Exception {
		return internalExamsService.getExamsDuolingoImage(dto);
	}
	
	@RequestMapping(value="/exam/insertExamsDuolingoImage.do")
	public @ResponseBody void insertExamsDuolingoImage(HttpServletRequest request, InternalExamsDuolingoImageDto dto) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		
		InternalExamsDuolingoImageDto sortInto = internalExamsService.getExamsDuolingoImageSort(dto);
		dto.setImage_sort(sortInto.getImage_sort());
		
		internalExamsService.insertDuolingoImage(dto);
	}
	
	
	@RequestMapping(value="/exam/updateExamsDuolingoImage.do")
	public @ResponseBody void updateExamsDuolingoImage(HttpServletRequest request, InternalExamsDuolingoImageDto dto) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		
		internalExamsService.updateDuolingoImage(dto);
	}
	
	@RequestMapping(value="/exam/deleteExamsDuolingoImage.do")
	public @ResponseBody void deleteExamsDuolingoImage(HttpServletRequest request, InternalExamsDuolingoImageDto dto) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		internalExamsService.deleteDuolingoImage(dto);
	}
	
	
	@RequestMapping(value="/exam/updateExamsDuolingoImageSort.do")
	public @ResponseBody void updateExamsDuolingoImageSort(HttpServletRequest request, InternalExamsDuolingoImageDto dto) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int image_id      = Integer.parseInt(jsonObj.get("image_id").toString());
			int image_sort    = Integer.parseInt(jsonObj.get("image_sort").toString());

			InternalExamsDuolingoImageDto sto = new InternalExamsDuolingoImageDto();
			sto.setCreated_id(userInfo.getUser_id());
			sto.setModified_id(userInfo.getUser_id());
			sto.setId(image_id);
			sto.setImage_sort(image_sort);
			internalExamsService.updateDuolingoImageSort(sto);
		}
	}
	
	@RequestMapping(value="/exam/uploadExamsDuolingoFileUpload.do")
	public @ResponseBody String uploadExamsDuolingoFileUpload(@RequestPart MultipartFile file) throws Exception {
		
		return awsS3Service.uploadBaseObjectRename(file, "duolingo");
		
	}
}