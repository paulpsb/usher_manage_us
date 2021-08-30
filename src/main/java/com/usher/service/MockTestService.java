package com.usher.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usher.dao.MockTestDirectionDao;
import com.usher.dao.MockTestScheduleDao;
import com.usher.dao.MockTestScheduleExamDao;
import com.usher.dto.MockTestDirectionDto;
import com.usher.dto.MockTestScheduleDto;
import com.usher.dto.MockTestScheduleExamDto;

@Service
public class MockTestService{
	@Autowired
	MockTestDirectionDao dao0;
	
	@Autowired
	MockTestScheduleDao dao1;
	
	@Autowired
	MockTestScheduleExamDao dao2;
	
	public MockTestDirectionDto getMockTestDirection(MockTestDirectionDto dto) throws Exception{
		return dao0.getMockTestDirection(dto);
	}
	
	public void insertMockTestDirection(MockTestDirectionDto dto) throws Exception{
		dao0.insertMockTestDirection(dto);
	}
	
	public void updateMockTestDirection(MockTestDirectionDto dto) throws Exception{
		dao0.updateMockTestDirection(dto);
	}
		
	public MockTestScheduleDto getMockTestSchedule(MockTestScheduleDto dto) throws Exception{
		return dao1.getMockTestSchedule(dto);
	}
	
	public void insertMockTestSchedule(MockTestScheduleDto dto) throws Exception{
		dao1.insertMockTestSchedule(dto);
	}
	
	public void insertMockTestScheduleExam(MockTestScheduleExamDto dto) throws Exception{
		dao2.insertMockTestScheduleExam(dto);
	}
}