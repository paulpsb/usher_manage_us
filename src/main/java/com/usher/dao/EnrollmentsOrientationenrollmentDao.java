package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.EnrollmentsOrientationenrollmentDto;

@Repository
public interface EnrollmentsOrientationenrollmentDao{
	public List<EnrollmentsOrientationenrollmentDto> getEnrollmentsOrientationList(EnrollmentsOrientationenrollmentDto dto) throws Exception;
}