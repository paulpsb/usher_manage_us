package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsChainDto;

@Repository
public interface InternalExamsChainDao{
	public InternalExamsChainDto getChainCount(InternalExamsChainDto dto) throws Exception;
	public List<InternalExamsChainDto> getChainList(InternalExamsChainDto dto) throws Exception;
	public InternalExamsChainDto getChain(InternalExamsChainDto dto) throws Exception;
	public InternalExamsChainDto getChainOne(InternalExamsChainDto dto) throws Exception;
	
	public void insertChain(InternalExamsChainDto dto) throws Exception;
	public void updateChain(InternalExamsChainDto dto) throws Exception;
	public void updateChainContent(InternalExamsChainDto dto) throws Exception;
	
	public void updateChainAnswer(InternalExamsChainDto dto) throws Exception;
	public void deleteChain(InternalExamsChainDto dto) throws Exception;

}