package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BatchExamsUseranswerDto;

@Repository
public interface BatchExamsUseranswerDao{
	public BatchExamsUseranswerDto getBatchExamsUseranswer(BatchExamsUseranswerDto dto) throws Exception;
}