package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CoursesCourseTimetableDto;

@Repository
public interface CoursesCourseTimetableDao{
	public CoursesCourseTimetableDto getCourseGroupTimeTableTeacher(CoursesCourseTimetableDto dto) throws Exception;
	public List<CoursesCourseTimetableDto> getCourseGroupTimeTableList(CoursesCourseTimetableDto dto) throws Exception;
	public List<CoursesCourseTimetableDto> getCourseGroupTimeTableDailyList(CoursesCourseTimetableDto dto) throws Exception;
	public List<CoursesCourseTimetableDto> getCourseTimeTableList(CoursesCourseTimetableDto dto) throws Exception;
	public List<CoursesCourseTimetableDto> getCourseTimeTableDailyList(CoursesCourseTimetableDto dto) throws Exception;
	public List<CoursesCourseTimetableDto> getCourseGroupTimeTableAsTeacherList(CoursesCourseTimetableDto dto) throws Exception;
	public List<CoursesCourseTimetableDto> getCourseGroupTimeTableAsTeacherAllList(CoursesCourseTimetableDto dto) throws Exception;
	public void insertCourseTimeTable(CoursesCourseTimetableDto dto) throws Exception;
	public void insertCourseTimeTableDailyAll(CoursesCourseTimetableDto dto) throws Exception;
	public void insertCourseTimeTableDaily(CoursesCourseTimetableDto dto) throws Exception;
	public void deleteCourseTimeTable(CoursesCourseTimetableDto dto) throws Exception;
	public void deleteCourseTimeTableDailyAll(CoursesCourseTimetableDto dto) throws Exception;
	public void deleteCourseTimeTableDaily(CoursesCourseTimetableDto dto) throws Exception;
	
}