package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.MockTestScheduleDto;

@Repository
public interface MockTestScheduleDao{
	public MockTestScheduleDto getMockTestSchedule(MockTestScheduleDto dto) throws Exception;
	public void insertMockTestSchedule(MockTestScheduleDto dto) throws Exception;
}