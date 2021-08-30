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
public class BookController{
	@Autowired
	PracticesService practicesService; 
	
	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/subject/book.do")
	public String book(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		return "subject/book";
	}
	
	@RequestMapping(value="/subject/getBookList.do")
	public @ResponseBody Map getBookList(HttpServletRequest request,
						PracticesPracticebookDto dto,
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);
		PracticesPracticebookDto bookCount = practicesService.getPracticeBookPageCount(dto);
		List<PracticesPracticebookDto> bookList = practicesService.getPracticeBookPageList(dto);
		
		resultMap.put("bookCount", bookCount);
		resultMap.put("bookList", bookList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/subject/saveBook.do")
	public @ResponseBody void saveBook(HttpServletRequest request,
						PracticesPracticebookDto dto,
						ModelMap modelMap) throws Exception {
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int book_id = Integer.parseInt(jsonObj.get("book_id").toString());
			String book = jsonObj.get("book").toString();
			int book_order = Integer.parseInt(jsonObj.get("book_order").toString());
			int practice_section_id = Integer.parseInt(jsonObj.get("practice_section_id").toString());
			
			
			PracticesPracticebookDto sto = new PracticesPracticebookDto();
			sto.setId(book_id);
			sto.setStatus("ACTIVE");
			sto.setBook(book);
			sto.setBook_order(book_order);
			sto.setPractice_section_id(practice_section_id);

			if(book_id > 0) {
				practicesService.updatePracticeBook(sto);
				
				PracticesPracticebookDto qto = practicesService.getPracticeBook(sto);
				InternalExamsProblemDto ito = new InternalExamsProblemDto();
				ito.setSection(qto.getSection());
				ito.setBook(sto.getBook());
				ito.setOld_section(qto.getSection());
				ito.setOld_book(qto.getBook());
				
				internalExamsService.updateExamsProblemPractice(ito);
				
			}else {
				practicesService.insertPracticeBook(sto);
			}

		}
	}

}