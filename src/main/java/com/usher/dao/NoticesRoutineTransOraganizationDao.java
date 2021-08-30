package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.NoticesRoutineTransOraganizationDto;

@Repository
public interface NoticesRoutineTransOraganizationDao{
	public NoticesRoutineTransOraganizationDto getRoutineTransOraganization(NoticesRoutineTransOraganizationDto dto) throws Exception;
	public List<NoticesRoutineTransOraganizationDto> getRoutineTransOraganizationScheuleList(NoticesRoutineTransOraganizationDto dto) throws Exception;
	public void insertRoutineTransOraganization(NoticesRoutineTransOraganizationDto dto) throws Exception;
	public void deleteRoutineTransOraganization(NoticesRoutineTransOraganizationDto dto) throws Exception;
}