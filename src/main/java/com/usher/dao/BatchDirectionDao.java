package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BatchDirectionDto;

@Repository
public interface BatchDirectionDao{
	public BatchDirectionDto getBatchDirection(BatchDirectionDto dto) throws Exception;
	public void insertBatchDirection(BatchDirectionDto dto) throws Exception;
	public void updateBatchDirection(BatchDirectionDto dto) throws Exception;
}