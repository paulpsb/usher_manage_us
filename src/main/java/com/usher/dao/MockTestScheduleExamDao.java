package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.MockTestScheduleExamDto;

@Repository
public interface MockTestScheduleExamDao{
	public void insertMockTestScheduleExam(MockTestScheduleExamDto dto) throws Exception;
}