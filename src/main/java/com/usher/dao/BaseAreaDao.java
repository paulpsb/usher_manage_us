package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BaseAreaDto;

@Repository
public interface BaseAreaDao{
	public List<BaseAreaDto> getBaseArea1List() throws Exception;
	public BaseAreaDto getBaseArea1(BaseAreaDto dto) throws Exception;
	public List<BaseAreaDto> getBaseArea2List(BaseAreaDto dto) throws Exception;
	public BaseAreaDto getBaseArea2(BaseAreaDto dto) throws Exception;
	public void insertBaseArea1(BaseAreaDto dto) throws Exception;
	public void updateBaseArea1(BaseAreaDto dto) throws Exception;
	public void updateBaseArea1AsBaseArea2(BaseAreaDto dto) throws Exception;
	public void updateBaseArea1AsUserSchool(BaseAreaDto dto) throws Exception;
	public void insertBaseArea2(BaseAreaDto dto) throws Exception;
	public void updateBaseArea2(BaseAreaDto dto) throws Exception;
	public void updateBaseArea2AsUserSchool(BaseAreaDto dto) throws Exception;
}