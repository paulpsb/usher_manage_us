package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsProblemDto;

@Repository
public interface InternalExamsProblemDao{
	public void updateExamsProblemPractice(InternalExamsProblemDto dto) throws Exception;
	public void updateExamsProblemPassage(InternalExamsProblemDto dto) throws Exception;
	public void updateExamsProblemChain(InternalExamsProblemDto dto) throws Exception;
	public void updateExamsProblemListening(InternalExamsProblemDto dto) throws Exception;
	public void updateExamsProblemReading(InternalExamsProblemDto dto) throws Exception;

}