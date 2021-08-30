package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BatchExamListeningDto;

@Repository
public interface BatchExamListeningDao{
	public List<BatchExamListeningDto> getBatchExamListeningList(BatchExamListeningDto dto) throws Exception;
	public BatchExamListeningDto getBatchExamListening(BatchExamListeningDto dto) throws Exception;
	public void insertBatchExamListening(BatchExamListeningDto dto) throws Exception;
	public void updateBatchExamListening(BatchExamListeningDto dto) throws Exception;
}