package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BaseSchoolDto;

@Repository
public interface BaseSchoolDao{
	public BaseSchoolDto getBaseSchoolCount(BaseSchoolDto dto) throws Exception;
	public List<BaseSchoolDto> getBaseSchoolList(BaseSchoolDto dto) throws Exception;
	public List<BaseSchoolDto> getBaseSchoolMatchingList(BaseSchoolDto dto) throws Exception;
	public List<BaseSchoolDto> getBaseSchoolSearchList(BaseSchoolDto dto) throws Exception;
	
	public BaseSchoolDto getBaseSchool(BaseSchoolDto dto) throws Exception;
	public void insertBaseSchool(BaseSchoolDto dto) throws Exception;
	public void updateBaseSchool(BaseSchoolDto dto) throws Exception;
	public void updateBaseSchoolAsUserSchool(BaseSchoolDto dto) throws Exception;

	public BaseSchoolDto getUserSchoolCount(BaseSchoolDto dto) throws Exception;
	public List<BaseSchoolDto> getUserSchoolList(BaseSchoolDto dto) throws Exception;
	public BaseSchoolDto getUserSchool(BaseSchoolDto dto) throws Exception;
	public void updateUserSchool(BaseSchoolDto dto) throws Exception;
}