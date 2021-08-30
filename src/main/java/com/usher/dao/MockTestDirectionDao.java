package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.MockTestDirectionDto;

@Repository
public interface MockTestDirectionDao{
	public MockTestDirectionDto getMockTestDirection(MockTestDirectionDto dto) throws Exception;
	public void insertMockTestDirection(MockTestDirectionDto dto) throws Exception;
	public void updateMockTestDirection(MockTestDirectionDto dto) throws Exception;
}