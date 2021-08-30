package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BatchExamToeicQuestionDto;

@Repository
public interface BatchExamToeicQuestionDao{
	public List<BatchExamToeicQuestionDto> getBatchExamToeicQuestionList(BatchExamToeicQuestionDto dto) throws Exception;
	public void insertBatchExamToeicQuestion(BatchExamToeicQuestionDto dto) throws Exception;
}