package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsUseranswerCommentDto;


@Repository
public interface InternalExamsUseranswerCommentDao{
	public InternalExamsUseranswerCommentDto getExamUserAnswerComment(InternalExamsUseranswerCommentDto dto) throws Exception;
	public void insertExamUserAnswerComment(InternalExamsUseranswerCommentDto dto) throws Exception;
	public void insertExamUserAnswerCommentLog(InternalExamsUseranswerCommentDto dto) throws Exception;
	public void updateExamUserAnswerComment(InternalExamsUseranswerCommentDto dto) throws Exception;
}