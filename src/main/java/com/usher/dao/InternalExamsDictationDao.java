package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsDictationDto;

@Repository
public interface InternalExamsDictationDao{
	public InternalExamsDictationDto getDictationCount(InternalExamsDictationDto dto) throws Exception;
	public List<InternalExamsDictationDto> getDictationList(InternalExamsDictationDto dto) throws Exception;
	public InternalExamsDictationDto getDictation(InternalExamsDictationDto dto) throws Exception;
	public InternalExamsDictationDto getDictationOne(InternalExamsDictationDto dto) throws Exception;
	public void insertDictation(InternalExamsDictationDto dto) throws Exception;
	public void updateDictation(InternalExamsDictationDto dto) throws Exception;
	public void updateDictationContent(InternalExamsDictationDto dto) throws Exception;
	public void deleteDictation(InternalExamsDictationDto dto) throws Exception;

}