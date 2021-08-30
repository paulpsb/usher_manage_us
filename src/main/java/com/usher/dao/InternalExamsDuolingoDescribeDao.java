package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsDuolingoDescribeDto;

@Repository
public interface InternalExamsDuolingoDescribeDao{
	public List<InternalExamsDuolingoDescribeDto> getExamsDuolingoDescribeList(InternalExamsDuolingoDescribeDto dto) throws Exception;
	public InternalExamsDuolingoDescribeDto getExamsDuolingoDescribe(InternalExamsDuolingoDescribeDto dto) throws Exception;
	public InternalExamsDuolingoDescribeDto getExamsDuolingoDescribeSort(InternalExamsDuolingoDescribeDto dto) throws Exception;
	public void insertDuolingoDescribe(InternalExamsDuolingoDescribeDto dto) throws Exception;
	public void updateDuolingoDescribe(InternalExamsDuolingoDescribeDto dto) throws Exception;
	public void updateDuolingoDescribeSort(InternalExamsDuolingoDescribeDto dto) throws Exception;
	public void deleteDuolingoDescribe(InternalExamsDuolingoDescribeDto dto) throws Exception;
	public void deleteDuolingoDescribeQuestionAll(InternalExamsDuolingoDescribeDto dto) throws Exception;
}