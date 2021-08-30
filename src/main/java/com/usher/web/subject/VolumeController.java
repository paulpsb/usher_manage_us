package com.usher.web.subject;

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

import com.usher.dto.PracticesPracticevolumeDto;
import com.usher.dto.InternalExamsProblemDto;
import com.usher.dto.PracticesPracticebookDto;
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.service.InternalExamsService;
import com.usher.service.PracticesService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class VolumeController{
	@Autowired
	PracticesService practicesService; 
	
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/subject/volume.do")
	public String volume(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "subject/volume";
	}
	
	@RequestMapping(value="/subject/getVolumeList.do")
	public @ResponseBody Map getVolumeList(HttpServletRequest request,
						PracticesPracticevolumeDto dto,
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);
		PracticesPracticevolumeDto volumeCount = practicesService.getPracticeVolumePageCount(dto);
		List<PracticesPracticevolumeDto> volumeList = practicesService.getPracticeVolumePageList(dto);
		
		resultMap.put("volumeCount", volumeCount);
		resultMap.put("volumeList", volumeList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/subject/getPracticeVolume.do")
	public @ResponseBody PracticesPracticevolumeDto getPracticeVolume(HttpServletRequest request,
						PracticesPracticevolumeDto dto,
						ModelMap modelMap) throws Exception {
		return practicesService.getPracticeVolume(dto);
	}
	
	@RequestMapping(value="/subject/insertPracticeVolume.do")
	public @ResponseBody void insertPracticeVolume(HttpServletRequest request,
						PracticesPracticevolumeDto dto,
						ModelMap modelMap) throws Exception {
		practicesService.insertPracticeVolume(dto);
	}
	
	@RequestMapping(value="/subject/updatePracticeVolume.do")
	public @ResponseBody void updatePracticeVolume(HttpServletRequest request,
						PracticesPracticevolumeDto dto,
						ModelMap modelMap) throws Exception {
		practicesService.updatePracticeVolume(dto);
		
		
		PracticesPracticevolumeDto qto = practicesService.getPracticeVolume(dto);
		InternalExamsProblemDto ito = new InternalExamsProblemDto();
		ito.setSection(qto.getSection());
		ito.setBook(dto.getBook());
		ito.setVolume(dto.getVolume());
		ito.setOld_section(qto.getSection());
		ito.setOld_book(qto.getBook());
		ito.setOld_volume(qto.getVolume());
		
		internalExamsService.updateExamsProblemPractice(ito);
		
	}
	
	@RequestMapping(value="/subject/saveVolumeOrder.do")
	public @ResponseBody void saveVolumeOrder(HttpServletRequest request,
						PracticesPracticevolumeDto dto,
						ModelMap modelMap) throws Exception {
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int volume_id = Integer.parseInt(jsonObj.get("volume_id").toString());
			int volume_order = Integer.parseInt(jsonObj.get("volume_order").toString());
			
			
			PracticesPracticevolumeDto sto = new PracticesPracticevolumeDto();
			sto.setId(volume_id);
			sto.setVolume_order(volume_order);

			practicesService.updatePracticeVolumeOrder(sto);

		}
	}

}