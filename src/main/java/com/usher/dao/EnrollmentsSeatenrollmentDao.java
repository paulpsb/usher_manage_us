package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.EnrollmentsCourseenrollmentDto;
import com.usher.dto.EnrollmentsSeatenrollmentDto;

@Repository
public interface EnrollmentsSeatenrollmentDao{
	public List<EnrollmentsSeatenrollmentDto> getSeatenrollmentList(EnrollmentsSeatenrollmentDto dto) throws Exception;
	public void insertSeatenrollment(EnrollmentsSeatenrollmentDto dto) throws Exception;
	public void deleteSeatenrollment(EnrollmentsSeatenrollmentDto dto) throws Exception;	
}