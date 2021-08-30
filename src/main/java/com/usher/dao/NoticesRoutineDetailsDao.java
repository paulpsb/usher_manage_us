package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.NoticesRoutineDetailsDto;

@Repository
public interface NoticesRoutineDetailsDao{
	public List<NoticesRoutineDetailsDto> getNoticesRoutineDetailsList(NoticesRoutineDetailsDto dto) throws Exception;
	public void insertNoticesRoutineDetails(NoticesRoutineDetailsDto dto) throws Exception;
	public void updateNoticesRoutineDetails(NoticesRoutineDetailsDto dto) throws Exception;
	public void deleteNoticesRoutineDetails(NoticesRoutineDetailsDto dto) throws Exception;
	
}