package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsListeningDto;

@Repository
public interface InternalExamsListeningDao{
	public InternalExamsListeningDto getInternalExamsListeningCount(InternalExamsListeningDto dto) throws Exception;
	public List<InternalExamsListeningDto> getInternalExamsListeningList(InternalExamsListeningDto dto) throws Exception;
	public InternalExamsListeningDto getInternalExamsListening(InternalExamsListeningDto dto) throws Exception;
	public InternalExamsListeningDto getInternalExamsListeningOne(InternalExamsListeningDto dto) throws Exception;
	public void insertInternalExamsListening(InternalExamsListeningDto dto) throws Exception;
	public void updateInternalExamsListening(InternalExamsListeningDto dto) throws Exception;
	public void deleteInternalExamsListening(InternalExamsListeningDto dto) throws Exception;
	public void deleteInternalExamsListeningQuestionAll(InternalExamsListeningDto dto) throws Exception;

}