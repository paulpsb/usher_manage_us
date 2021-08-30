package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BatchVideoDto;

@Repository
public interface BatchVideoDao{
	public List<BatchVideoDto> getBatchVideoList(BatchVideoDto dto) throws Exception;
	public BatchVideoDto getBatchVideo(BatchVideoDto dto) throws Exception;
	public void insertBatchVideo(BatchVideoDto dto) throws Exception;
	public void updateBatchVideo(BatchVideoDto dto) throws Exception;
	public void deleteBatchVideo(BatchVideoDto dto) throws Exception;
}