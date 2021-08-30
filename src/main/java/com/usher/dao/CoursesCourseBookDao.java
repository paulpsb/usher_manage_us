package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CoursesCourseBookDto;

@Repository
public interface CoursesCourseBookDao{
	public List<CoursesCourseBookDto> getCourseGroupBookList(CoursesCourseBookDto dto) throws Exception;
	public List<CoursesCourseBookDto> getCourseBookList(CoursesCourseBookDto dto) throws Exception;
	public CoursesCourseBookDto getCourseBook(CoursesCourseBookDto dto) throws Exception;
	public void insertCourseBook(CoursesCourseBookDto dto) throws Exception;
	public void deleteCourseBook(CoursesCourseBookDto dto) throws Exception;
}