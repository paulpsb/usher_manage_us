package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.NoticesRoutineTransCoursegroupDto;

@Repository
public interface NoticesRoutineTransCoursegroupDao{
	public NoticesRoutineTransCoursegroupDto getRoutineTransCoursegroup(NoticesRoutineTransCoursegroupDto dto) throws Exception;
	public List<NoticesRoutineTransCoursegroupDto> getRoutineTransCoursegroupScheuleList(NoticesRoutineTransCoursegroupDto dto) throws Exception;
	public void insertRoutineTransCoursegroup(NoticesRoutineTransCoursegroupDto dto) throws Exception;
	public void deleteRoutineTransCoursegroup(NoticesRoutineTransCoursegroupDto dto) throws Exception;
}