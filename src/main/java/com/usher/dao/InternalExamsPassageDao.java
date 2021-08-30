package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsPassageDto;

@Repository
public interface InternalExamsPassageDao{
	public InternalExamsPassageDto getPassageCount(InternalExamsPassageDto dto) throws Exception;
	public List<InternalExamsPassageDto> getPassageList(InternalExamsPassageDto dto) throws Exception;
	public InternalExamsPassageDto getPassage(InternalExamsPassageDto dto) throws Exception;
	public void insertPassage(InternalExamsPassageDto dto) throws Exception;
	public void updatePassage(InternalExamsPassageDto dto) throws Exception;
	public void deletePassage(InternalExamsPassageDto dto) throws Exception;
	public void deletePassagePhraseAll(InternalExamsPassageDto dto) throws Exception;
	public void deletePassageVocaAll(InternalExamsPassageDto dto) throws Exception;

}