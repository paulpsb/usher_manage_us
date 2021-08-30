package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CoursesCourseStatsDto;

@Repository
public interface CoursesCourseStatsDao{
	public List<CoursesCourseStatsDto> getCourseStatsSemesterList(CoursesCourseStatsDto dto) throws Exception;
	public List<CoursesCourseStatsDto> getCourseStatsSemesterBetweenList(CoursesCourseStatsDto dto) throws Exception;
	public List<CoursesCourseStatsDto> getCourseStatsTeacherList(CoursesCourseStatsDto dto) throws Exception;
	public List<CoursesCourseStatsDto> getCourseStatsList(CoursesCourseStatsDto dto) throws Exception;
}