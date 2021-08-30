package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsWritingDto;

@Repository
public interface InternalExamsWritingDao{
	public InternalExamsWritingDto getInternalExamsWritingCount(InternalExamsWritingDto dto) throws Exception;
	public List<InternalExamsWritingDto> getInternalExamsWritingList(InternalExamsWritingDto dto) throws Exception;
	public List<InternalExamsWritingDto> getInternalExamsWritingExcelList(InternalExamsWritingDto dto) throws Exception;
	
	public InternalExamsWritingDto getInternalExamsWriting(InternalExamsWritingDto dto) throws Exception;
	public InternalExamsWritingDto getInternalExamsWritingAsArticle(InternalExamsWritingDto dto) throws Exception;
	
	public void insertInternalExamsWriting(InternalExamsWritingDto dto) throws Exception;
	public void updateInternalExamsWriting(InternalExamsWritingDto dto) throws Exception;
	public void deleteInternalExamsWriting(InternalExamsWritingDto dto) throws Exception;
}