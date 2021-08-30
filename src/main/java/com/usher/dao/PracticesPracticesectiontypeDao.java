package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.PracticesPracticesectiontypeDto;

@Repository
public interface PracticesPracticesectiontypeDao{
	public List<PracticesPracticesectiontypeDto> getPracticeSectionTypeList(PracticesPracticesectiontypeDto dto) throws Exception;
	public PracticesPracticesectiontypeDto getPracticeSectionType(PracticesPracticesectiontypeDto dto) throws Exception;
	
	public void insertPracticeSectionType(PracticesPracticesectiontypeDto dto) throws Exception;
	public void updatePracticeSectionType(PracticesPracticesectiontypeDto dto) throws Exception;
	public void deletePracticeSectionType(PracticesPracticesectiontypeDto dto) throws Exception;
}