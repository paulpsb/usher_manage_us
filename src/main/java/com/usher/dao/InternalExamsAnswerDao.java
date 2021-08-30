package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsAnswerDto;


@Repository
public interface InternalExamsAnswerDao{
	public InternalExamsAnswerDto getExamAnswer(InternalExamsAnswerDto dto) throws Exception;
}