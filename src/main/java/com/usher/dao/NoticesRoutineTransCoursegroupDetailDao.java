package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.NoticesRoutineTransCoursegroupDetailDto;

@Repository
public interface NoticesRoutineTransCoursegroupDetailDao{
	public List<NoticesRoutineTransCoursegroupDetailDto> getRoutineTransCoursegroupDetailList(NoticesRoutineTransCoursegroupDetailDto dto) throws Exception;
	public void insertRoutineTransCoursegroupDetail(NoticesRoutineTransCoursegroupDetailDto dto) throws Exception;
	public void deleteRoutineTransCoursegroupDetail(NoticesRoutineTransCoursegroupDetailDto dto) throws Exception;
}