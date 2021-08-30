package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BaseExamRuburicDto;

@Repository
public interface BaseExamRuburicDao{
	public List<BaseExamRuburicDto> getBaseExamRuburicList(BaseExamRuburicDto dto) throws Exception;
	public BaseExamRuburicDto getBaseExamRuburic(BaseExamRuburicDto dto) throws Exception;
	public void insertBaseExamRuburic(BaseExamRuburicDto dto) throws Exception;
	public void updateBaseExamRuburic(BaseExamRuburicDto dto) throws Exception;
	public void deleteBaseExamRuburic(BaseExamRuburicDto dto) throws Exception;
}