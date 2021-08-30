package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsMemorizationQuestionDto;

@Repository
public interface InternalExamsMemorizationQuestionDao{
	public InternalExamsMemorizationQuestionDto getInternalExamsMemorizationQuestionNum(InternalExamsMemorizationQuestionDto dto) throws Exception;
	public List<InternalExamsMemorizationQuestionDto> getInternalExamsMemorizationQuestionList(InternalExamsMemorizationQuestionDto dto) throws Exception;
	public void insertInternalExamsMemorizationQuestion(InternalExamsMemorizationQuestionDto dto) throws Exception;
}