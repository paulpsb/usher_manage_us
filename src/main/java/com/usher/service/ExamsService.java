package com.usher.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usher.dao.ExamsToeflDao;
import com.usher.dto.ExamsToeflDto;

@Service
public class ExamsService{
	@Autowired
	ExamsToeflDao dao1;
	
	public List<ExamsToeflDto> getExamsToeflUserOnlyList(ExamsToeflDto dto) throws Exception{
		return dao1.getExamsToeflUserOnlyList(dto);
	}
	public List<ExamsToeflDto> getExamsToeflList(ExamsToeflDto dto) throws Exception{
		return dao1.getExamsToeflList(dto);
	}
	public List<ExamsToeflDto> getExamsToeflUserMonthList(ExamsToeflDto dto) throws Exception{
		return dao1.getExamsToeflUserMonthList(dto);
	}
	public ExamsToeflDto getExamsToeflExcelCount(ExamsToeflDto dto) throws Exception{
		return dao1.getExamsToeflExcelCount(dto);
	}
	public List<ExamsToeflDto> getExamsToeflExcelList(ExamsToeflDto dto) throws Exception{
		return dao1.getExamsToeflExcelList(dto);
	}
	public ExamsToeflDto getExamsToeflExcel(ExamsToeflDto dto) throws Exception{
		return dao1.getExamsToeflExcel(dto);
	}
	public ExamsToeflDto getExamsToeflNotMatchCount() throws Exception{
		return dao1.getExamsToeflNotMatchCount();
	}
	public void insertExamsToefl(ExamsToeflDto dto) throws Exception{
		dao1.insertExamsToefl(dto);
	}
	public void insertExamsToeflExcel(ExamsToeflDto dto) throws Exception{
		dao1.insertExamsToeflExcel(dto);
	}
	public void updateExamsToeflExcel(ExamsToeflDto dto) throws Exception{
		dao1.updateExamsToeflExcel(dto);
	}
	public void deleteExamsToefl(ExamsToeflDto dto) throws Exception{
		dao1.deleteExamsToefl(dto);
	}
}