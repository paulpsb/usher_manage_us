package com.usher.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BaseCoursegroupTimescheduleDto;

@Repository
public interface BaseCoursegroupTimescheduleDao{
	public List<BaseCoursegroupTimescheduleDto> getBaseCoursegroupTimescheduleList(BaseCoursegroupTimescheduleDto dto) throws Exception;
	public void insertBaseCoursegroupTimeschedule(BaseCoursegroupTimescheduleDto dto) throws Exception;
	public void deleteBaseCoursegroupTimeschedule(BaseCoursegroupTimescheduleDto dto) throws Exception;
}
