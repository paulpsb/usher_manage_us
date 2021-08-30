package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CoursesCourseAchieveDto;

@Repository
public interface CoursesCourseAchieveDao{
	public List<CoursesCourseAchieveDto> getCourseAchieveList(CoursesCourseAchieveDto dto) throws Exception;
	public void insertCourseAchieve(CoursesCourseAchieveDto dto) throws Exception;
	public void deleteCourseAchieve(CoursesCourseAchieveDto dto) throws Exception;
	
}