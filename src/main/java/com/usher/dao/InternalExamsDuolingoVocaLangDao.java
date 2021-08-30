package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsDuolingoVocaLangDto;

@Repository
public interface InternalExamsDuolingoVocaLangDao{
	public List<InternalExamsDuolingoVocaLangDto> getExamsDuolingoVocaLangList(InternalExamsDuolingoVocaLangDto dto) throws Exception;
	public void insertDuolingoVocaLang(InternalExamsDuolingoVocaLangDto dto) throws Exception;
	public void updateDuolingoVocaLang(InternalExamsDuolingoVocaLangDto dto) throws Exception;
	public void deleteDuolingoVocaLang(InternalExamsDuolingoVocaLangDto dto) throws Exception;
}