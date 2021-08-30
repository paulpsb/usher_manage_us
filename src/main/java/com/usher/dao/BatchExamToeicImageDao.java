package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BatchExamToeicImageDto;

@Repository
public interface BatchExamToeicImageDao{
	public List<BatchExamToeicImageDto> getBatchExamToeicImageList(BatchExamToeicImageDto dto) throws Exception;
	public void insertBatchExamToeicImage(BatchExamToeicImageDto dto) throws Exception;
}