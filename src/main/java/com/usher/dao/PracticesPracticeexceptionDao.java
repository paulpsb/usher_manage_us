package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.PracticesPracticeexceptionDto;

@Repository
public interface PracticesPracticeexceptionDao{
	public PracticesPracticeexceptionDto getPracticeException(PracticesPracticeexceptionDto dto) throws Exception;
	public void insertPracticeException(PracticesPracticeexceptionDto dto) throws Exception;
	public void deletePracticeException(PracticesPracticeexceptionDto dto) throws Exception;
}