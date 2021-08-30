package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsDuolingoBlankQuestionDto;

@Repository
public interface InternalExamsDuolingoBlankQuestionDao{
	
	public InternalExamsDuolingoBlankQuestionDto getExamsDuolingoBlankQuestionNum(InternalExamsDuolingoBlankQuestionDto dto) throws Exception;
	public List<InternalExamsDuolingoBlankQuestionDto> getExamsDuolingoBlankQuestionList(InternalExamsDuolingoBlankQuestionDto dto) throws Exception;
	public void insertDuolingoBlankQuestion(InternalExamsDuolingoBlankQuestionDto dto) throws Exception;
	public void updateDuolingoBlankQuestion(InternalExamsDuolingoBlankQuestionDto dto) throws Exception;
	public void deleteDuolingoBlankQuestion(InternalExamsDuolingoBlankQuestionDto dto) throws Exception;
}