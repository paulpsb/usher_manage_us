package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.NoticesRoutineTransOraganizationDetailDto;

@Repository
public interface NoticesRoutineTransOraganizationDetailDao{
	public List<NoticesRoutineTransOraganizationDetailDto> getRoutineTransOraganizationDetailList(NoticesRoutineTransOraganizationDetailDto dto) throws Exception;
	public void insertRoutineTransOraganizationDetail(NoticesRoutineTransOraganizationDetailDto dto) throws Exception;
	public void deleteRoutineTransOraganizationDetail(NoticesRoutineTransOraganizationDetailDto dto) throws Exception;
}