package com.usher.web.correction;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.dto.AuthUserDto;
import com.usher.dto.CorrectionExamsAnswerDto;
import com.usher.dto.CorrectionExamsNoteDto;
import com.usher.dto.CorrectionExamsPenDto;
import com.usher.dto.CorrectionExamsRuburicDto;
import com.usher.dto.CorrectionUserProductDto;
import com.usher.dto.InternalExamsChainDto;
import com.usher.dto.InternalExamsSpeakingDto;
import com.usher.service.AuthService;
import com.usher.service.CorrectionExamsService;
import com.usher.service.InternalExamsService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;


@Controller
public class UserProductCorrectionController{
	@Autowired
	AuthService authService;

	@Autowired
	CorrectionExamsService correctionExamsService;

	@RequestMapping(value="/correction/user_product.do")
	public String speaking(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		return "correction/user_product";
	}
	
	@RequestMapping(value="/correction/getUserProductList.do")
	public @ResponseBody Map getUserProductList(HttpServletRequest request,
						CorrectionUserProductDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);

		CorrectionUserProductDto productCount = correctionExamsService.getCorrectionUserProductCount(dto);
		List<CorrectionUserProductDto> productList = correctionExamsService.getCorrectionUserProductList(dto);
		resultMap.put("productCount", productCount);
		resultMap.put("productList", productList);

		return resultMap;
	}
	
	@RequestMapping(value="/correction/getUserProduct.do")
	public @ResponseBody CorrectionUserProductDto getUserProduct(HttpServletRequest request,
						CorrectionUserProductDto dto, 
						ModelMap modelMap) throws Exception {
		
		return correctionExamsService.getCorrectionUserProduct(dto);
	}
	
	@RequestMapping(value="/correction/insertUserProduct.do")
	public @ResponseBody void insertUserProduct(HttpServletRequest request,
						CorrectionUserProductDto dto, 
						ModelMap modelMap) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		
		correctionExamsService.insertCorrectionUserProduct(dto);
	}
	
	@RequestMapping(value="/correction/updateUserProduct.do")
	public @ResponseBody void updateUserProduct(HttpServletRequest request,
						CorrectionUserProductDto dto, 
						ModelMap modelMap) throws Exception {
		
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setCreated_id(userInfo.getUser_id());
		dto.setModified_id(userInfo.getUser_id());
		
		correctionExamsService.updateCorrectionUserProduct(dto);
	}

	@RequestMapping(value="/correction/deleteUserProduct.do")
	public @ResponseBody void deleteUserProduct(HttpServletRequest request,
						CorrectionUserProductDto dto, 
						ModelMap modelMap) throws Exception {
		
		correctionExamsService.deleteCorrectionUserProduct(dto);
	}
	
	
	@RequestMapping(value="/correction/getCorrectionExamsAnswerAsResult.do")
	public @ResponseBody CorrectionExamsAnswerDto getCorrectionExamsAnswerAsResult(HttpServletRequest request,
						CorrectionExamsAnswerDto dto, 
						ModelMap modelMap) throws Exception {
		
		return correctionExamsService.getCorrectionExamsAnswerAsResult(dto);
	}
}