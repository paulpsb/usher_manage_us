package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CoursesSemesterDto;

@Repository
public interface CoursesSemesterDao{
	public List<CoursesSemesterDto> getSemesterList() throws Exception;
	public CoursesSemesterDto getSemesterDate(CoursesSemesterDto dto) throws Exception;
	
}