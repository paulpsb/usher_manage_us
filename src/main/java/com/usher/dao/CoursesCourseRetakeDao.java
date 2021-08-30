package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CoursesCourseRetakeDto;

@Repository
public interface CoursesCourseRetakeDao{
	
	public CoursesCourseRetakeDto getCoursesCourseRetakeNextSemester(CoursesCourseRetakeDto dto) throws Exception;
	public List<CoursesCourseRetakeDto> getCoursesCourseRetakeCourseGroupList(CoursesCourseRetakeDto dto) throws Exception;
	public List<CoursesCourseRetakeDto> getCoursesCourseRetakeCourseList(CoursesCourseRetakeDto dto) throws Exception;
	public List<CoursesCourseRetakeDto> getCoursesCourseRetakeList(CoursesCourseRetakeDto dto) throws Exception;
	public List<CoursesCourseRetakeDto> getCoursesCourseRetakeDueList(CoursesCourseRetakeDto dto) throws Exception;
}