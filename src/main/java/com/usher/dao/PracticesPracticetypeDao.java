package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.PracticesPracticetypeDto;

@Repository
public interface PracticesPracticetypeDao{
	public List<PracticesPracticetypeDto> getPracticeTypeList() throws Exception;
	public void insertPracticeType(PracticesPracticetypeDto dto) throws Exception;
	public void updatePracticeType(PracticesPracticetypeDto dto) throws Exception;
}