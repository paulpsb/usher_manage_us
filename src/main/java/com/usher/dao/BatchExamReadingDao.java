package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BatchExamReadingDto;

@Repository
public interface BatchExamReadingDao{
	public List<BatchExamReadingDto> getBatchExamReadingNumList(BatchExamReadingDto dto) throws Exception;
	public BatchExamReadingDto getBatchExamReadingNum(BatchExamReadingDto dto) throws Exception;
	public List<BatchExamReadingDto> getBatchExamReadingList(BatchExamReadingDto dto) throws Exception;
	public BatchExamReadingDto getBatchExamReading(BatchExamReadingDto dto) throws Exception;
	public void insertBatchExamReading(BatchExamReadingDto dto) throws Exception;
	public void updateBatchExamReading(BatchExamReadingDto dto) throws Exception;
}