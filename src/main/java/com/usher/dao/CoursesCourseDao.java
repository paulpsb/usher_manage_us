package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CoursesCourseDto;
import com.usher.dto.EnrollmentsSeatenrollmentDto;

@Repository
public interface CoursesCourseDao{
	public CoursesCourseDto getCourseCurrent() throws Exception;
	public List<CoursesCourseDto> getCourseList(CoursesCourseDto dto) throws Exception;
	public List<CoursesCourseDto> getCourseAllList(CoursesCourseDto dto) throws Exception;
	
	public CoursesCourseDto getCourse(CoursesCourseDto dto) throws Exception;
	public void updateCourse(CoursesCourseDto dto) throws Exception;
	public void updateCourseRoom(CoursesCourseDto dto) throws Exception;
	public void updateCourseZommUrl(CoursesCourseDto dto) throws Exception;
	public void updateCourseSection(CoursesCourseDto dto) throws Exception;
	public void updateCourseInstructor(CoursesCourseDto dto) throws Exception;
	public void updateCourseManager(CoursesCourseDto dto) throws Exception;
	
}