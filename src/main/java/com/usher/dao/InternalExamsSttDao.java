package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsSttDto;

@Repository
public interface InternalExamsSttDao{
	public InternalExamsSttDto getSttCount(InternalExamsSttDto dto) throws Exception;
	public List<InternalExamsSttDto> getSttList(InternalExamsSttDto dto) throws Exception;
	public InternalExamsSttDto getStt(InternalExamsSttDto dto) throws Exception;
	
	public void insertStt(InternalExamsSttDto dto) throws Exception;
	public void updateStt(InternalExamsSttDto dto) throws Exception;
	public void deleteStt(InternalExamsSttDto dto) throws Exception;

}