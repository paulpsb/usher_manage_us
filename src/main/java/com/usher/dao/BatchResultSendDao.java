package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BatchResultSendDto;

@Repository
public interface BatchResultSendDao{
	public List<BatchResultSendDto> getBatchResultSendList(BatchResultSendDto dto) throws Exception;
	public void insertBatchResultSend(BatchResultSendDto dto) throws Exception;
	
}