package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.NoticesRoutineDto;

@Repository
public interface NoticesRoutineDao{
	public NoticesRoutineDto getNoticesRoutineCount(NoticesRoutineDto dto) throws Exception;
	public List<NoticesRoutineDto> getNoticesRoutineList(NoticesRoutineDto dto) throws Exception;
	public List<NoticesRoutineDto> getNoticesRoutineAsCategoryList(NoticesRoutineDto dto) throws Exception;
	public NoticesRoutineDto getNoticesRoutine(NoticesRoutineDto dto) throws Exception;
	public void insertNoticesRoutine(NoticesRoutineDto dto) throws Exception;
	public void updateNoticesRoutine(NoticesRoutineDto dto) throws Exception;
	public void deleteNoticesRoutine(NoticesRoutineDto dto) throws Exception;
	public void deleteNoticesRoutineDetailsAll(NoticesRoutineDto dto) throws Exception;
	
	public void insertNoticesRoutineLog(NoticesRoutineDto dto) throws Exception;
	public void insertNoticesRoutineDetailsLog(NoticesRoutineDto dto) throws Exception;
}