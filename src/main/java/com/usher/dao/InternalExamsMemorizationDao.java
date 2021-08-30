package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsMemorizationDto;

@Repository
public interface InternalExamsMemorizationDao{
	public InternalExamsMemorizationDto getInternalExamsMemorizationCount(InternalExamsMemorizationDto dto) throws Exception;
	public List<InternalExamsMemorizationDto> getInternalExamsMemorizationList(InternalExamsMemorizationDto dto) throws Exception;
	public List<InternalExamsMemorizationDto> getInternalExamsMemorizationExamList(InternalExamsMemorizationDto dto) throws Exception;
	public InternalExamsMemorizationDto getInternalExamsMemorization(InternalExamsMemorizationDto dto) throws Exception;
	public void insertInternalExamsMemorization(InternalExamsMemorizationDto dto) throws Exception;
	public void updateInternalExamsMemorization(InternalExamsMemorizationDto dto) throws Exception;
	public void deleteInternalExamsMemorization(InternalExamsMemorizationDto dto) throws Exception;
	public void deleteInternalExamsMemorizationQuestionAll(InternalExamsMemorizationDto dto) throws Exception;
}