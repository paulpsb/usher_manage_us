package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsListeningQuestionDto;

@Repository
public interface InternalExamsListeningQuestionDao{
	public List<InternalExamsListeningQuestionDto> getExamsListeningQuestionList(InternalExamsListeningQuestionDto dto) throws Exception;
	public InternalExamsListeningQuestionDto getExamsListeningQuestion(InternalExamsListeningQuestionDto dto) throws Exception;
	public InternalExamsListeningQuestionDto getExamsListeningQuestionNum(InternalExamsListeningQuestionDto dto) throws Exception;
	public InternalExamsListeningQuestionDto getExamsListeningQuestionReview(InternalExamsListeningQuestionDto dto) throws Exception;
	public List<InternalExamsListeningQuestionDto> getExamsListeningQuestionCourseList(InternalExamsListeningQuestionDto dto) throws Exception;
	
	public void insertExamsListeningQuestion(InternalExamsListeningQuestionDto dto) throws Exception;
	public void updateExamsListeningQuestion(InternalExamsListeningQuestionDto dto) throws Exception;
	public void deleteExamsListeningQuestion(InternalExamsListeningQuestionDto dto) throws Exception;
}