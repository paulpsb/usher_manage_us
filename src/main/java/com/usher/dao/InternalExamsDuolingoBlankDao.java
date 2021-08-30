package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsDuolingoBlankDto;

@Repository
public interface InternalExamsDuolingoBlankDao{
	public List<InternalExamsDuolingoBlankDto> getExamsDuolingoBlankList(InternalExamsDuolingoBlankDto dto) throws Exception;
	public InternalExamsDuolingoBlankDto getExamsDuolingoBlank(InternalExamsDuolingoBlankDto dto) throws Exception;
	public InternalExamsDuolingoBlankDto getExamsDuolingoBlankSort(InternalExamsDuolingoBlankDto dto) throws Exception;
	public void insertDuolingoBlank(InternalExamsDuolingoBlankDto dto) throws Exception;
	public void updateDuolingoBlank(InternalExamsDuolingoBlankDto dto) throws Exception;
	public void updateDuolingoBlankSort(InternalExamsDuolingoBlankDto dto) throws Exception;
	public void deleteDuolingoBlank(InternalExamsDuolingoBlankDto dto) throws Exception;
	public void deleteDuolingoBlankQuestionAll(InternalExamsDuolingoBlankDto dto) throws Exception;
}