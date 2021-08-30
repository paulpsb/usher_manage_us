package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsGrammarDto;

@Repository
public interface InternalExamsGrammarDao{
	public List<InternalExamsGrammarDto> getExamsGrammarList(InternalExamsGrammarDto dto) throws Exception;
	public List<InternalExamsGrammarDto> getExamsGrammarCourseList(InternalExamsGrammarDto dto) throws Exception;
	
	public InternalExamsGrammarDto getExamsGrammar(InternalExamsGrammarDto dto) throws Exception;
	public InternalExamsGrammarDto getExamsGrammarNum(InternalExamsGrammarDto dto) throws Exception;
	public InternalExamsGrammarDto getInternalExamsGrammarReview(InternalExamsGrammarDto dto) throws Exception;
	public void insertExamsGrammar(InternalExamsGrammarDto dto) throws Exception;
	public void updateExamsGrammar(InternalExamsGrammarDto dto) throws Exception;
	public void deleteExamsGrammar(InternalExamsGrammarDto dto) throws Exception;
}