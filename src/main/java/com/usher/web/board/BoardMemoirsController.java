package com.usher.web.board;

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

import com.usher.service.BoardService;
import com.usher.util.SessionUtil;

import com.usher.dto.BoardMemoirsDto;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BoardMemoirsController{
	@Autowired
	BoardService boardService; 
	
	@RequestMapping(value="/board/memoirs_list.do")
	public String memoirs_list(HttpServletRequest request,
						BoardMemoirsDto dto, 
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		modelMap.addAttribute("memoirsInfo", dto);
		
		return "board/memoirs_list";
	}
	
	@RequestMapping(value="/board/getBoardMemoirsList.do")
	public @ResponseBody Map getBoardMemoirsList(HttpServletRequest request,
						BoardMemoirsDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);
		
		BoardMemoirsDto memoirsCount = boardService.getBoardMemoirsCount(dto);
		List<BoardMemoirsDto> momoirsList = boardService.getBoardMemoirsList(dto);
		resultMap.put("memoirsCount", memoirsCount);
		resultMap.put("momoirsList", momoirsList);
		return resultMap;
	}
	
	@RequestMapping(value="/board/memoirs_form.do")
	public String memoirs_form(HttpServletRequest request,
						BoardMemoirsDto dto, 
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		modelMap.addAttribute("memoirsInfo", dto);
		return "board/memoirs_form";
	}
	
	@RequestMapping(value="/board/getBoardMemoirs.do")
	public @ResponseBody BoardMemoirsDto getBoardMemoirs(HttpServletRequest request,
						BoardMemoirsDto dto, 
						ModelMap modelMap) throws Exception {
		
		return boardService.getBoardMemoirs(dto);
	}
	
	@RequestMapping(value="/board/saveBoardMemoirs.do")
	public @ResponseBody void saveBoardMemoirs(HttpServletRequest request,
						BoardMemoirsDto dto, 
						ModelMap modelMap) throws Exception {
		
		boardService.updateBoardMemoirs(dto);
	}
}