package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BatchExamListeningQuestionDto;

@Repository
public interface BatchExamListeningQuestionDao{
	public List<BatchExamListeningQuestionDto> getBatchExamListeningQuestionList(BatchExamListeningQuestionDto dto) throws Exception;
	public BatchExamListeningQuestionDto getBatchExamListeningQuestion(BatchExamListeningQuestionDto dto) throws Exception;
	public BatchExamListeningQuestionDto getBatchExamListeningQuestionNum(BatchExamListeningQuestionDto dto) throws Exception;
	public void insertBatchExamListeningQuestion(BatchExamListeningQuestionDto dto) throws Exception;
	public void updateBatchExamListeningQuestion(BatchExamListeningQuestionDto dto) throws Exception;
	public void deleteBatchExamListeningQuestion(BatchExamListeningQuestionDto dto) throws Exception;
}