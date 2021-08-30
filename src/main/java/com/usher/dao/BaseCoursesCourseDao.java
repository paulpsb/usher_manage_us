package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BaseCoursesCourseDto;

@Repository
public interface BaseCoursesCourseDao{
	public List<BaseCoursesCourseDto> getBaseCoursesCourseList(BaseCoursesCourseDto dto) throws Exception;
	public List<BaseCoursesCourseDto> getBaseCoursesCourseAllList(BaseCoursesCourseDto dto) throws Exception;
	public BaseCoursesCourseDto getBaseCoursesCourse(BaseCoursesCourseDto dto) throws Exception;
	public BaseCoursesCourseDto getBaseCoursesCourseAll(BaseCoursesCourseDto dto) throws Exception;
	public void insertBaseCoursesCourse(BaseCoursesCourseDto dto) throws Exception;
	public void updateBaseCoursesCourse(BaseCoursesCourseDto dto) throws Exception;
	public void deleteBaseCoursesCourse(BaseCoursesCourseDto dto) throws Exception;
}