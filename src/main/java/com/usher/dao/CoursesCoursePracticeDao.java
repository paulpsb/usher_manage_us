package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CoursesCoursePracticeDto;

@Repository
public interface CoursesCoursePracticeDao{
	
	public List<CoursesCoursePracticeDto> getCoursesCourseSectionList(CoursesCoursePracticeDto dto) throws Exception;
	public List<CoursesCoursePracticeDto> getCoursesCoursePracticeList(CoursesCoursePracticeDto dto) throws Exception;
	public List<CoursesCoursePracticeDto> getCoursesCoursePracticeDailyList(CoursesCoursePracticeDto dto) throws Exception;
	public List<CoursesCoursePracticeDto> getCoursesCourseGroupPracticeList(CoursesCoursePracticeDto dto) throws Exception;
	public List<CoursesCoursePracticeDto> getCoursesCourseGroupPracticeDailyList(CoursesCoursePracticeDto dto) throws Exception;
	public List<CoursesCoursePracticeDto> getCoursesCoursePracticeDailyAllList(CoursesCoursePracticeDto dto) throws Exception;
	public List<CoursesCoursePracticeDto> getCoursesCoursePracticeTodayList(CoursesCoursePracticeDto dto) throws Exception;
	public List<CoursesCoursePracticeDto> getCoursesCoursePracticeAsTeacherList(CoursesCoursePracticeDto dto) throws Exception;
	public void insertCoursesCoursePractice(CoursesCoursePracticeDto dto) throws Exception;
	public void insertCoursesCoursePracticeDailyAll(CoursesCoursePracticeDto dto) throws Exception;
	public void insertCoursesCoursePracticeDaily(CoursesCoursePracticeDto dto) throws Exception;
	public void deleteCoursesCoursePractice(CoursesCoursePracticeDto dto) throws Exception;
	public void deleteCoursesCoursePracticeDailyAll(CoursesCoursePracticeDto dto) throws Exception;
	public void deleteCoursesCoursePracticeDaily(CoursesCoursePracticeDto dto) throws Exception;
}