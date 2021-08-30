package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsUseranswerDto;


@Repository
public interface InternalExamsUseranswerDao{
	public InternalExamsUseranswerDto getExamUserAnswer(InternalExamsUseranswerDto dto) throws Exception;
}