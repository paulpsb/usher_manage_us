package com.usher.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ExcelService{
	public List<Map<String, String>> uploadExcel(MultipartFile excelFile) throws Exception{
		OPCPackage opcPackage = OPCPackage.open(excelFile.getInputStream());
		XSSFWorkbook workbook = new XSSFWorkbook(opcPackage);
		
		XSSFSheet sheet = workbook.getSheetAt(0);
		
		List<Map<String, String>> resultList = new ArrayList<Map<String, String>>();
		for(int i=1; i<=sheet.getLastRowNum(); i++)
		{
			Map<String, String> resultInfo = new HashMap<String, String>();
			XSSFRow row = sheet.getRow(i);
			for(int j=0; j<20; j++)
			{
				XSSFCell cell = row.getCell(j);
				if(null != cell) {
					String cellTitle = "COL"+j;
					String cellValue = "";
					if(cell.getCellType() == Cell.CELL_TYPE_NUMERIC)
					{
						cellValue = (int)cell.getNumericCellValue()+"";
					}else {
						cellValue = cell.getStringCellValue(); 
					}
					
					resultInfo.put(cellTitle, cellValue);
				}
			}
			resultList.add(resultInfo);
		}
		
		return resultList;
	}
}