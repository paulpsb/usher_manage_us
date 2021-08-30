package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.PracticesPracticesectionDto;

@Repository
public interface PracticesPracticesectionDao{
	public List<PracticesPracticesectionDto> getPracticeSectionList() throws Exception;
	public PracticesPracticesectionDto getPracticeSection(PracticesPracticesectionDto dto) throws Exception;
	public void insertPracticeSection(PracticesPracticesectionDto dto) throws Exception;
	public void updatePracticeSection(PracticesPracticesectionDto dto) throws Exception;
}