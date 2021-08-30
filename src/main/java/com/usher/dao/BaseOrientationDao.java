package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BaseOrientationDto;

@Repository
public interface BaseOrientationDao{
	public List<BaseOrientationDto> getBaseOrientationList(BaseOrientationDto dto) throws Exception;
	public void insertBaseOrientation(BaseOrientationDto dto) throws Exception;
	public void updateBaseOrientation(BaseOrientationDto dto) throws Exception;
}