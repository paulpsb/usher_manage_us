package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsDuolingoVocaDto;

@Repository
public interface InternalExamsDuolingoVocaDao{
	public List<InternalExamsDuolingoVocaDto> getExamsDuolingoVocaList(InternalExamsDuolingoVocaDto dto) throws Exception;
	public void insertDuolingoVoca(InternalExamsDuolingoVocaDto dto) throws Exception;
	public void updateDuolingoVoca(InternalExamsDuolingoVocaDto dto) throws Exception;
	public void deleteDuolingoVoca(InternalExamsDuolingoVocaDto dto) throws Exception;
}