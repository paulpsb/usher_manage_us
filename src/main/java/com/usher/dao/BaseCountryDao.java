package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BaseCountryDto;

@Repository
public interface BaseCountryDao{
	public List<BaseCountryDto> getBaseCountry1List() throws Exception;
	public BaseCountryDto getBaseCountry1(BaseCountryDto dto) throws Exception;
	public List<BaseCountryDto> getBaseCountry2List(BaseCountryDto dto) throws Exception;
	public BaseCountryDto getBaseCountry2(BaseCountryDto dto) throws Exception;
	public void insertBaseCountry1(BaseCountryDto dto) throws Exception;
	public void updateBaseCountry1(BaseCountryDto dto) throws Exception;
	public void updateBaseCountry1AsBaseCountry2(BaseCountryDto dto) throws Exception;
	public void updateBaseCountry1AsUserSchool(BaseCountryDto dto) throws Exception;
	public void insertBaseCountry2(BaseCountryDto dto) throws Exception;
	public void updateBaseCountry2(BaseCountryDto dto) throws Exception;
	public void updateBaseCountry2AsUserSchool(BaseCountryDto dto) throws Exception;
}