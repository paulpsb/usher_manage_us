package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BatchExamReadingQuestionDto;

@Repository
public interface BatchExamReadingQuestionDao{
	public List<BatchExamReadingQuestionDto> getBatchExamReadingQuestionList(BatchExamReadingQuestionDto dto) throws Exception;
	public BatchExamReadingQuestionDto getBatchExamReadingQuestion(BatchExamReadingQuestionDto dto) throws Exception;
	public void insertBatchExamReadingQuestion(BatchExamReadingQuestionDto dto) throws Exception;
	public void updateBatchExamReadingQuestion(BatchExamReadingQuestionDto dto) throws Exception;
}