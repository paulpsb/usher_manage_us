package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsReadingQuestionDto;

@Repository
public interface InternalExamsReadingQuestionDao{
	public List<InternalExamsReadingQuestionDto> getExamsReadingQuestionList(InternalExamsReadingQuestionDto dto) throws Exception;
	public InternalExamsReadingQuestionDto getExamsReadingQuestion(InternalExamsReadingQuestionDto dto) throws Exception;
	public InternalExamsReadingQuestionDto getExamsReadingQuestionNum(InternalExamsReadingQuestionDto dto) throws Exception;
	public InternalExamsReadingQuestionDto getExamsReadingQuestionReview(InternalExamsReadingQuestionDto dto) throws Exception;
	public List<InternalExamsReadingQuestionDto> getExamsReadingQuestionCourseList(InternalExamsReadingQuestionDto dto) throws Exception;
	
	public void insertExamsReadingQuestion(InternalExamsReadingQuestionDto dto) throws Exception;
	public void updateExamsReadingQuestion(InternalExamsReadingQuestionDto dto) throws Exception;
	public void deleteExamsReadingQuestion(InternalExamsReadingQuestionDto dto) throws Exception;
}