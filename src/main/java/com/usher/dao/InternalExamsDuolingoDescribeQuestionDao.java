package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsDuolingoDescribeQuestionDto;

@Repository
public interface InternalExamsDuolingoDescribeQuestionDao{
	public List<InternalExamsDuolingoDescribeQuestionDto> getExamsDuolingoDescribeQuestionList(InternalExamsDuolingoDescribeQuestionDto dto) throws Exception;
	public void insertDuolingoDescribeQuestion(InternalExamsDuolingoDescribeQuestionDto dto) throws Exception;
	public void updateDuolingoDescribeQuestion(InternalExamsDuolingoDescribeQuestionDto dto) throws Exception;
	public void deleteDuolingoDescribeQuestion(InternalExamsDuolingoDescribeQuestionDto dto) throws Exception;
}