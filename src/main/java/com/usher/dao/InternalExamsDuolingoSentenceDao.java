package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsDuolingoSentenceDto;

@Repository
public interface InternalExamsDuolingoSentenceDao{
	public List<InternalExamsDuolingoSentenceDto> getExamsDuolingoSentenceList(InternalExamsDuolingoSentenceDto dto) throws Exception;
	public void insertDuolingoSentence(InternalExamsDuolingoSentenceDto dto) throws Exception;
	public void updateDuolingoSentence(InternalExamsDuolingoSentenceDto dto) throws Exception;
	public void deleteDuolingoSentence(InternalExamsDuolingoSentenceDto dto) throws Exception;
}