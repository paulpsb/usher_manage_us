package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsPassagePhraseDto;

@Repository
public interface InternalExamsPassagePhraseDao{
	public List<InternalExamsPassagePhraseDto> getPassagePhraseList(InternalExamsPassagePhraseDto dto) throws Exception;
	public void insertPassagePhrase(InternalExamsPassagePhraseDto dto) throws Exception;
	public void updatePassagePhrase(InternalExamsPassagePhraseDto dto) throws Exception;
	public void deletePassagePhrase(InternalExamsPassagePhraseDto dto) throws Exception;

}