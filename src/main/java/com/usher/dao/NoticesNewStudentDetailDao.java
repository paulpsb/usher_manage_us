package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.NoticesNewStudentDetailDto;

@Repository
public interface NoticesNewStudentDetailDao{
	public List<NoticesNewStudentDetailDto> getNoticesNewStudentDetailList(NoticesNewStudentDetailDto dto) throws Exception;
	public void updatNewStudentTraining(NoticesNewStudentDetailDto dto) throws Exception;
}