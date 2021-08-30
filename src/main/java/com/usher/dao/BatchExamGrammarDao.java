package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BatchExamGrammarDto;

@Repository
public interface BatchExamGrammarDao{
	public List<BatchExamGrammarDto> getBatchExamGrammarNumList(BatchExamGrammarDto dto) throws Exception;
	public List<BatchExamGrammarDto> getBatchExamGrammarQuestionList(BatchExamGrammarDto dto) throws Exception;
	public BatchExamGrammarDto getBatchExamGrammarNum(BatchExamGrammarDto dto) throws Exception;
	public BatchExamGrammarDto getBatchExamGrammarQuestionNum(BatchExamGrammarDto dto) throws Exception;
	public List<BatchExamGrammarDto> getBatchExamGrammarList(BatchExamGrammarDto dto) throws Exception;
	public BatchExamGrammarDto getBatchExamGrammar(BatchExamGrammarDto dto) throws Exception;
	public void insertBatchExamGrammar(BatchExamGrammarDto dto) throws Exception;
	public void updateBatchExamGrammar(BatchExamGrammarDto dto) throws Exception;
}