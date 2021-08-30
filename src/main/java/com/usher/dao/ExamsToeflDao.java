package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.ExamsToeflDto;

@Repository
public interface ExamsToeflDao{
	
	public List<ExamsToeflDto> getExamsToeflUserOnlyList(ExamsToeflDto dto) throws Exception;
	public List<ExamsToeflDto> getExamsToeflList(ExamsToeflDto dto) throws Exception;
	public List<ExamsToeflDto> getExamsToeflUserMonthList(ExamsToeflDto dto) throws Exception;
	public ExamsToeflDto getExamsToeflExcelCount(ExamsToeflDto dto) throws Exception;
	public List<ExamsToeflDto> getExamsToeflExcelList(ExamsToeflDto dto) throws Exception;
	public ExamsToeflDto getExamsToeflExcel(ExamsToeflDto dto) throws Exception;
	public ExamsToeflDto getExamsToeflNotMatchCount() throws Exception;
	public void insertExamsToefl(ExamsToeflDto dto) throws Exception;
	public void insertExamsToeflExcel(ExamsToeflDto dto) throws Exception;
	public void updateExamsToeflExcel(ExamsToeflDto dto) throws Exception;
	public void deleteExamsToefl(ExamsToeflDto dto) throws Exception;
}