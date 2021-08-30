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
import com.usher.dto.CorrectionShopProductDetailDto;
import com.usher.dto.CorrectionShopProductDto;
import com.usher.dto.CorrectionTestBookDto;
import com.usher.dto.CorrectionTestTypeDto;
import com.usher.dto.InternalExamsChainDto;
import com.usher.dto.InternalExamsSpeakingDto;
import com.usher.service.AuthService;
import com.usher.service.CorrectionExamsService;
import com.usher.service.InternalExamsService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;


@Controller
public class ShopProductCorrectionController{
	@Autowired
	AuthService authService;

	@Autowired
	CorrectionExamsService correctionExamsService;

	@RequestMapping(value="/correction/shop_product.do")
	public String speaking(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		return "correction/shop_product";
	}
	
	@RequestMapping(value="/correction/getShopProductTestList.do")
	public @ResponseBody Map getShopProductTestList(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		
		CorrectionTestTypeDto dto1 = new CorrectionTestTypeDto();
		List<CorrectionTestTypeDto> testTypeList = correctionExamsService.getCorrectionTestTypeList(dto1);
		resultMap.put("testTypeList", testTypeList);
		
		CorrectionTestBookDto dto2 = new CorrectionTestBookDto();
		List<CorrectionTestBookDto> testBookList = correctionExamsService.getCorrectionTestBookList(dto2);
		
		resultMap.put("productList", testBookList);

		return resultMap;
	}
	
	@RequestMapping(value="/correction/getShopProductList.do")
	public @ResponseBody Map getShopProductList(HttpServletRequest request,
						CorrectionShopProductDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);

		CorrectionShopProductDto productCount = correctionExamsService.getCorrectionShopProductCount(dto);
		List<CorrectionShopProductDto> productList = correctionExamsService.getCorrectionShopProductList(dto);
		resultMap.put("productCount", productCount);
		resultMap.put("productList", productList);

		return resultMap;
	}
	
	@RequestMapping(value="/correction/getShopProduct.do")
	public @ResponseBody Map getShopProduct(HttpServletRequest request,
						CorrectionShopProductDto dto, 
						ModelMap modelMap) throws Exception {
		Map resultMap = new HashMap();
		
		CorrectionShopProductDto shopProduct = correctionExamsService.getCorrectionShopProduct(dto);
		resultMap.put("shopProduct", shopProduct);
		CorrectionShopProductDetailDto dto1 = new CorrectionShopProductDetailDto();
		dto1.setCorrection_shop_product_id(shopProduct.getId());
		
		List<CorrectionShopProductDetailDto> shopProductDetailList = correctionExamsService.getCorrectionShopProductDetailList(dto1);
		resultMap.put("shopProductDetailList", shopProductDetailList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/correction/insertShopProduct.do")
	public @ResponseBody void insertShopProduct(HttpServletRequest request,
						CorrectionShopProductDto dto, 
						ModelMap modelMap) throws Exception {
		
		correctionExamsService.insertCorrectionShopProduct(dto);
		
		int correction_shop_product_id = dto.getId();
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			String status          = jsonObj.get("status").toString();
			String section         = jsonObj.get("section").toString();
			String practice_type   = jsonObj.get("practice_type").toString();
			String practice_name   = jsonObj.get("practice_name").toString();
			String book            = jsonObj.get("book").toString();
			String product_type    = jsonObj.get("product_type").toString();
			int product_limit_date = Integer.parseInt(jsonObj.get("product_limit_date").toString());
			int product_qty        = Integer.parseInt(jsonObj.get("product_qty").toString());
			
			CorrectionShopProductDetailDto sto = new CorrectionShopProductDetailDto();
			sto.setCorrection_shop_product_id(correction_shop_product_id);
			sto.setStatus(status);
			sto.setSection(section);
			sto.setPractice_type(practice_type);
			sto.setPractice_name(practice_name);
			sto.setBook(book);
			sto.setProduct_type(product_type);
			sto.setProduct_limit_date(product_limit_date);
			sto.setProduct_qty(product_qty);
			correctionExamsService.insertCorrectionShopProductDetail(sto);
		}
	}
	
	@RequestMapping(value="/correction/updateShopProduct.do")
	public @ResponseBody void updateShopProduct(HttpServletRequest request,
						CorrectionShopProductDto dto, 
						ModelMap modelMap) throws Exception {
		
		correctionExamsService.updateCorrectionShopProduct(dto);
		
		int correction_shop_product_id = dto.getId();
		String data_value = dto.getData_value();
		
		CorrectionShopProductDetailDto dto1 = new CorrectionShopProductDetailDto();
		dto1.setCorrection_shop_product_id(correction_shop_product_id);
		correctionExamsService.deleteCorrectionShopProductDetail(dto1);
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			String status          = jsonObj.get("status").toString();
			String section         = jsonObj.get("section").toString();
			String practice_type   = jsonObj.get("practice_type").toString();
			String practice_name   = jsonObj.get("practice_name").toString();
			String book            = jsonObj.get("book").toString();
			String product_type    = jsonObj.get("product_type").toString();
			int product_limit_date = Integer.parseInt(jsonObj.get("product_limit_date").toString());
			int product_qty        = Integer.parseInt(jsonObj.get("product_qty").toString());
			
			CorrectionShopProductDetailDto sto = new CorrectionShopProductDetailDto();
			sto.setCorrection_shop_product_id(correction_shop_product_id);
			sto.setStatus(status);
			sto.setSection(section);
			sto.setPractice_type(practice_type);
			sto.setPractice_name(practice_name);
			sto.setBook(book);
			sto.setProduct_type(product_type);
			sto.setProduct_limit_date(product_limit_date);
			sto.setProduct_qty(product_qty);
			correctionExamsService.insertCorrectionShopProductDetail(sto);
		}
	}

	@RequestMapping(value="/correction/deleteShopProduct.do")
	public @ResponseBody void deleteShopProduct(HttpServletRequest request,
						CorrectionShopProductDto dto, 
						ModelMap modelMap) throws Exception {
		
		correctionExamsService.deleteCorrectionShopProduct(dto);
		
		int correction_shop_product_id = dto.getId();
		
		CorrectionShopProductDetailDto dto1 = new CorrectionShopProductDetailDto();
		dto1.setCorrection_shop_product_id(correction_shop_product_id);
		correctionExamsService.deleteCorrectionShopProductDetail(dto1);
	}

}