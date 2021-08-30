package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.NoticesNewStudentDto;

@Repository
public interface NoticesNewStudentDao{
	public List<NoticesNewStudentDto> getNoticesNewStudentUserList(NoticesNewStudentDto dto) throws Exception;
	public NoticesNewStudentDto getNoticesNewStudent(NoticesNewStudentDto dto) throws Exception;
	public void updatetNoticesNewStudent(NoticesNewStudentDto dto) throws Exception;
	
}