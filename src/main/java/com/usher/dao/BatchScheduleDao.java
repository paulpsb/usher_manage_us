package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BatchScheduleDto;

@Repository
public interface BatchScheduleDao{
	public List<BatchScheduleDto> getBatchScheduleMonthlyList(BatchScheduleDto dto) throws Exception;
	public BatchScheduleDto getBatchSchedule(BatchScheduleDto dto) throws Exception;
	public List<BatchScheduleDto> getBatchScheduleAsDate(BatchScheduleDto dto) throws Exception;
	public void insertBatchSchedule(BatchScheduleDto dto) throws Exception;
	public void updateBatchSchedule(BatchScheduleDto dto) throws Exception;
	public void updateBatchScheduleAdvise(BatchScheduleDto dto) throws Exception;
}