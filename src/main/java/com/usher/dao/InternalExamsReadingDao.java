package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsReadingDto;

@Repository
public interface InternalExamsReadingDao{
	public InternalExamsReadingDto getInternalExamsReadingCount(InternalExamsReadingDto dto) throws Exception;
	public List<InternalExamsReadingDto> getInternalExamsReadingList(InternalExamsReadingDto dto) throws Exception;
	public InternalExamsReadingDto getInternalExamsReading(InternalExamsReadingDto dto) throws Exception;
	public InternalExamsReadingDto getInternalExamsReadingOne(InternalExamsReadingDto dto) throws Exception;
	public void insertInternalExamsReading(InternalExamsReadingDto dto) throws Exception;
	public void updateInternalExamsReading(InternalExamsReadingDto dto) throws Exception;
	public void deleteInternalExamsReading(InternalExamsReadingDto dto) throws Exception;
	public void deleteInternalExamsReadingQuestionAll(InternalExamsReadingDto dto) throws Exception;

}