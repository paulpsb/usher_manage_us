package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BaseCoursesCoursegroupDto;

@Repository
public interface BaseCoursesCoursegroupDao{
	public List<BaseCoursesCoursegroupDto> getBaseCoursesCoursegroupList(BaseCoursesCoursegroupDto dto) throws Exception;
	public BaseCoursesCoursegroupDto getBaseCoursesCoursegroup(BaseCoursesCoursegroupDto dto) throws Exception;
	public void insertBaseCoursesCoursegroup(BaseCoursesCoursegroupDto dto) throws Exception;
	public void updateBaseCoursesCoursegroup(BaseCoursesCoursegroupDto dto) throws Exception;
	public void deleteBaseCoursesCoursegroup(BaseCoursesCoursegroupDto dto) throws Exception;
	public void deleteBaseCoursesCourseAll(BaseCoursesCoursegroupDto dto) throws Exception;
}