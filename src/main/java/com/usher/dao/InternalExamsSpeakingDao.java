package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsSpeakingDto;

@Repository
public interface InternalExamsSpeakingDao{
	public InternalExamsSpeakingDto getInternalExamsSpeakingCount(InternalExamsSpeakingDto dto) throws Exception;
	public List<InternalExamsSpeakingDto> getInternalExamsSpeakingList(InternalExamsSpeakingDto dto) throws Exception;
	public List<InternalExamsSpeakingDto> getInternalExamsSpeakingExcelList(InternalExamsSpeakingDto dto) throws Exception;
	
	public InternalExamsSpeakingDto getInternalExamsSpeaking(InternalExamsSpeakingDto dto) throws Exception;
	public InternalExamsSpeakingDto getInternalExamsSpeakingAsArticle(InternalExamsSpeakingDto dto) throws Exception;
	
	public void insertInternalExamsSpeaking(InternalExamsSpeakingDto dto) throws Exception;
	public void updateInternalExamsSpeaking(InternalExamsSpeakingDto dto) throws Exception;
	public void deleteInternalExamsSpeaking(InternalExamsSpeakingDto dto) throws Exception;
}