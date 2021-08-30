package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsDuolingoImageDto;

@Repository
public interface InternalExamsDuolingoImageDao{
	public List<InternalExamsDuolingoImageDto> getExamsDuolingoImageList(InternalExamsDuolingoImageDto dto) throws Exception;
	public InternalExamsDuolingoImageDto getExamsDuolingoImage(InternalExamsDuolingoImageDto dto) throws Exception;
	public InternalExamsDuolingoImageDto getExamsDuolingoImageSort(InternalExamsDuolingoImageDto dto) throws Exception;
	public void insertDuolingoImage(InternalExamsDuolingoImageDto dto) throws Exception;
	public void updateDuolingoImage(InternalExamsDuolingoImageDto dto) throws Exception;
	public void updateDuolingoImageSort(InternalExamsDuolingoImageDto dto) throws Exception;
	public void deleteDuolingoImage(InternalExamsDuolingoImageDto dto) throws Exception;
}