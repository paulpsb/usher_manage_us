package com.usher.util;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.web.servlet.view.document.AbstractXlsxStreamingView;

import net.sf.jxls.transformer.XLSTransformer;

public class ExcelUtil{
	protected HSSFWorkbook workbook;
	
	private String excelUrl;
	
	private Map map = new HashMap();
	
	public ExcelUtil(){}
	
	
	
	/**
	 * 엑셀경로
	 * @param excelUrl
	 */
	public void setExcelUrl(String excelUrl)
	{
		this.excelUrl = excelUrl;
	}
	
	/**
	 * 리스트 넣기
	 * @param key
	 * @param value
	 */
	public void setList(String key, List value)
	{
		this.map.put(key, value);
	}
	
	/**
	 * 데이터 넣기
	 * @param key : 데이터 
	 * @param value : 데이터
	 */
	public void setData(String key, Object value)
	{
		this.map.put(key, value);
	}

	/**
	 * 엑셀 Export
	 * @param request
	 * @param response
	 * @param fileName
	 * @return
	 */
	
	public void Export(HttpServletRequest request, HttpServletResponse response, String fileName) {
		PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
		Resource resource = resolver.getResource("classpath:excel/"+this.excelUrl);
		XLSTransformer transformer = new XLSTransformer();
		InputStream is = null;
		OutputStream os = null;
		try {
			is = resource.getInputStream();
			 
			response.resetBuffer();
			response.setContentType("application/octect-stream; charset=ISO-8859-1");

			if (request.getHeader("User-Agent").indexOf("MSIE 5.5") != -1) {
				response.setHeader("Content-Disposition", "filename=" + encodeFileName(fileName));
			} else {
				response.setHeader("Content-Disposition", "attachment;filename=" + encodeFileName(fileName));
			}
			
			os = response.getOutputStream();
			
			Workbook excel = transformer.transformXLS(is, this.map);
			excel.write(os);
			os.flush();

		}catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e.getMessage());
		} finally {
			if (os != null) {
				try {
					os.close();
				} catch (IOException e) {}
			}
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {}
			}
		}
	}
	
	/**
	 * 파일 Url Encoding
	 * @param name
	 * @return
	 */
	private String encodeFileName(String name) {
		try {
			return URLEncoder.encode(name, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e.getMessage(), e);
		}
	}	
}