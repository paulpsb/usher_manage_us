package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BatchExamToeicDto;
import com.usher.dto.BatchExamToeicImageDto;
import com.usher.dto.BatchExamToeicQuestionDto;

@Repository
public interface BatchExamToeicDao{
	public List<BatchExamToeicDto> getBatchExamToeicNumList(BatchExamToeicDto dto) throws Exception;
	public BatchExamToeicDto getBatchExamToeic(BatchExamToeicDto dto) throws Exception;
	public BatchExamToeicDto getBatchExamToeicMaxNum(BatchExamToeicDto dto) throws Exception;
	public void insertBatchExamToeic(BatchExamToeicDto dto) throws Exception;
	public void updateBatchExamToeic(BatchExamToeicDto dto) throws Exception;
	public void deleteBatchExamToeicImage(BatchExamToeicDto dto) throws Exception;
	public void deleteBatchExamToeicQuestion(BatchExamToeicDto dto) throws Exception;


}