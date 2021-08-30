package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BaseCoursesCoursePracticeDto;

@Repository
public interface BaseCoursesCoursePracticeDao{
	public List<BaseCoursesCoursePracticeDto> getBaseCoursesCoursePracticeList(BaseCoursesCoursePracticeDto dto) throws Exception;
	public void insertBaseCoursesCoursePractice(BaseCoursesCoursePracticeDto dto) throws Exception;
	public void deleteBaseCoursesCoursePractice(BaseCoursesCoursePracticeDto dto) throws Exception;
}