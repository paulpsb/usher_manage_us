package com.usher.web.exam;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.dto.AuthUserDto;
import com.usher.dto.InternalExamsWritingDto;
import com.usher.dto.InternalExamsPassageDto;
import com.usher.service.InternalExamsService;
import com.usher.util.ExcelUtil;
import com.usher.util.SessionUtil;


@Controller
public class ExamWritingController{
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/exam/writing_list.do")
	public String passage_list(HttpServletRequest request,
						InternalExamsWritingDto dto,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		modelMap.addAttribute("writingInfo", dto);
		String url = "";
		
		url = "exam/writing_list";
		return url;
	}
	
	@RequestMapping(value="/exam/getExamWritingList.do")
	public @ResponseBody Map getExamWritingList(HttpServletRequest request,
						InternalExamsWritingDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);

		InternalExamsWritingDto writingCount = internalExamsService.getInternalExamsWritingCount(dto);
		List<InternalExamsWritingDto> writingList = internalExamsService.getInternalExamsWritingList(dto);
		resultMap.put("writingCount", writingCount);
		resultMap.put("writingList", writingList);

		return resultMap;
	}
	
	@RequestMapping(value="/exam/excelExamWriting.do")
	public @ResponseBody void excelExamWriting(HttpServletRequest request, HttpServletResponse response, InternalExamsWritingDto dto) throws Exception {
		ExcelUtil ex = new ExcelUtil();
		List<InternalExamsWritingDto> writingList = internalExamsService.getInternalExamsWritingExcelList(dto);
		
		ex.setList("writingList", writingList);
		
		ex.setExcelUrl("writing.xlsx");
		
		ex.Export(request, response, "writing.xlsx");
	}
	
	@RequestMapping(value="/exam/selectExamWriting.do")
	public @ResponseBody InternalExamsWritingDto selectExamWriting(HttpServletRequest request, InternalExamsWritingDto dto) throws Exception {
		return internalExamsService.getInternalExamsWriting(dto);
	}
	
	@RequestMapping(value="/exam/insertExamWriting.do")
	public @ResponseBody void insertExamWriting(HttpServletRequest request, InternalExamsWritingDto dto) throws Exception {
		internalExamsService.insertInternalExamsWriting(dto);
	}
	
	@RequestMapping(value="/exam/updateExamWriting.do")
	public @ResponseBody void updateExamWriting(HttpServletRequest request, InternalExamsWritingDto dto) throws Exception {
		internalExamsService.updateInternalExamsWriting(dto);
	}
	
	@RequestMapping(value="/exam/deleteExamWriting.do")
	public @ResponseBody void deleteExamWriting(HttpServletRequest request, InternalExamsWritingDto dto) throws Exception {
		internalExamsService.deleteInternalExamsWriting(dto);
	}
	

}