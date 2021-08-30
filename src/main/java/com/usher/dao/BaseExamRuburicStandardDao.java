package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BaseExamRuburicStandardDto;

@Repository
public interface BaseExamRuburicStandardDao{
	public List<BaseExamRuburicStandardDto> getBaseExamRuburicStandardList() throws Exception;
	public BaseExamRuburicStandardDto getBaseExamRuburicStandard(BaseExamRuburicStandardDto dto) throws Exception;
	public void insertBaseExamRuburicStandard(BaseExamRuburicStandardDto dto) throws Exception;
}