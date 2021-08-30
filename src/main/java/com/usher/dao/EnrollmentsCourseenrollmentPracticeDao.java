package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.EnrollmentsCourseenrollmentPracticeDto;

@Repository
public interface EnrollmentsCourseenrollmentPracticeDao{
	public List<EnrollmentsCourseenrollmentPracticeDto> getEnrollmentsCourseenrollmentPracticeList(EnrollmentsCourseenrollmentPracticeDto dto) throws Exception;
	public void insertEnrollmentsCourseenrollmentPractice(EnrollmentsCourseenrollmentPracticeDto dto) throws Exception;
	public void deleteEnrollmentsCourseenrollmentPractice(EnrollmentsCourseenrollmentPracticeDto dto) throws Exception;
}