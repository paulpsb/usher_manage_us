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

import com.usher.dto.InternalExamsProblemDto;
import com.usher.dto.PracticesPracticegroupDto;
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.dto.PracticesPracticevolumeDto;
import com.usher.service.InternalExamsService;
import com.usher.service.PracticesService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class GroupController{
	@Autowired
	PracticesService practicesService; 
	
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/subject/group.do")
	public String group(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "subject/group";
	}
	
	@RequestMapping(value="/subject/getGroupList.do")
	public @ResponseBody Map getGroupList(HttpServletRequest request,
						PracticesPracticegroupDto dto,
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);
		PracticesPracticegroupDto groupCount = practicesService.getPracticeGroupPageCount(dto);
		List<PracticesPracticegroupDto> groupList = practicesService.getPracticeGroupPageList(dto);
		
		resultMap.put("groupCount", groupCount);
		resultMap.put("groupList", groupList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/subject/getPracticeGroup.do")
	public @ResponseBody PracticesPracticegroupDto getPracticeGroup(HttpServletRequest request,
						PracticesPracticegroupDto dto,
						ModelMap modelMap) throws Exception {
		return practicesService.getPracticeGroup(dto);
	}
	
	@RequestMapping(value="/subject/insertPracticeGroup.do")
	public @ResponseBody void insertPracticeGroup(HttpServletRequest request,
						PracticesPracticegroupDto dto,
						ModelMap modelMap) throws Exception {
		practicesService.insertPracticeGroup(dto);
	}
	
	@RequestMapping(value="/subject/updatePracticeGroup.do")
	public @ResponseBody void updatePracticeGroup(HttpServletRequest request,
						PracticesPracticegroupDto dto,
						ModelMap modelMap) throws Exception {
		practicesService.updatePracticeGroup(dto);
		
		PracticesPracticegroupDto qto = practicesService.getPracticeGroup(dto);
		InternalExamsProblemDto ito = new InternalExamsProblemDto();
		ito.setSection(dto.getSection());
		ito.setBook(dto.getBook());
		ito.setVolume(dto.getVolume());
		ito.setGroup(dto.getGroup());
		ito.setOld_section(qto.getSection());
		ito.setOld_book(qto.getBook());
		ito.setOld_volume(qto.getVolume());
		ito.setOld_group(qto.getGroup());
		
		internalExamsService.updateExamsProblemPractice(ito);
		
	}
	
	@RequestMapping(value="/subject/saveGroupOrder.do")
	public @ResponseBody void saveGroupOrder(HttpServletRequest request,
						PracticesPracticegroupDto dto,
						ModelMap modelMap) throws Exception {
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int group_id = Integer.parseInt(jsonObj.get("group_id").toString());
			int group_order = Integer.parseInt(jsonObj.get("group_order").toString());
			
			
			PracticesPracticegroupDto sto = new PracticesPracticegroupDto();
			sto.setId(group_id);
			sto.setGroup_order(group_order);

			practicesService.updatePracticeGroupOrder(sto);

		}
	}

}