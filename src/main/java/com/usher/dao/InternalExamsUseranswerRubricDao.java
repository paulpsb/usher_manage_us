package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsUseranswerRubricDto;


@Repository
public interface InternalExamsUseranswerRubricDao{
	public InternalExamsUseranswerRubricDto getExamUserAnswerRubric(InternalExamsUseranswerRubricDto dto) throws Exception;
	public void insertExamUserAnswerRubric(InternalExamsUseranswerRubricDto dto) throws Exception;
	public void insertExamUserAnswerRubricLog(InternalExamsUseranswerRubricDto dto) throws Exception;
	public void updateExamUserAnswerRubric(InternalExamsUseranswerRubricDto dto) throws Exception;
}