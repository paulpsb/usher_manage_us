package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsVocaspeechpartDto;

@Repository
public interface InternalExamsVocaspeechpartDao{
	public List<InternalExamsVocaspeechpartDto> getVocaSpeechPartList(InternalExamsVocaspeechpartDto dto) throws Exception;
	public List<InternalExamsVocaspeechpartDto> getVocaSpeechPart(InternalExamsVocaspeechpartDto dto) throws Exception;
	public void insertVocaWordspeechpart(InternalExamsVocaspeechpartDto dto) throws Exception;
	public void updateVocaWordspeechpart(InternalExamsVocaspeechpartDto dto) throws Exception;
	public void deleteVocaWordspeechpart(InternalExamsVocaspeechpartDto dto) throws Exception;
}