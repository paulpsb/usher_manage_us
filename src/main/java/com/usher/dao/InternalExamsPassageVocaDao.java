package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsPassageVocaDto;

@Repository
public interface InternalExamsPassageVocaDao{
	public List<InternalExamsPassageVocaDto> getPassageVocaList(InternalExamsPassageVocaDto dto) throws Exception;
	public void insertPassageVoca(InternalExamsPassageVocaDto dto) throws Exception;
	public void updatePassageVoca(InternalExamsPassageVocaDto dto) throws Exception;
	public void deletePassageVoca(InternalExamsPassageVocaDto dto) throws Exception;

}