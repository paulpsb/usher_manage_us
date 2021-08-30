package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CoursesCoursegroupDto;

@Repository
public interface CoursesCoursegroupDao{
	public List<CoursesCoursegroupDto> getCoursegroupList(CoursesCoursegroupDto dto) throws Exception;
	public CoursesCoursegroupDto getCoursegroup(CoursesCoursegroupDto dto) throws Exception;
	public CoursesCoursegroupDto getCoursegroupAsPrevDate(CoursesCoursegroupDto dto) throws Exception;
	public CoursesCoursegroupDto getCoursegroupAsPrevDateCourse(CoursesCoursegroupDto dto) throws Exception;
	public void updateCourseGroupRepetitionDate(CoursesCoursegroupDto dto) throws Exception;
}