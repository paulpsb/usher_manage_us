package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsVocawordDto;

@Repository
public interface InternalExamsVocawordDao{
	public List<InternalExamsVocawordDto> getVocaWordBookList() throws Exception;
	public List<InternalExamsVocawordDto> getVocaWordDayList(InternalExamsVocawordDto dto) throws Exception;
	public InternalExamsVocawordDto getVocaWordCount(InternalExamsVocawordDto dto) throws Exception;
	public List<InternalExamsVocawordDto> getVocaWordList(InternalExamsVocawordDto dto) throws Exception;
	public InternalExamsVocawordDto getVocaWord(InternalExamsVocawordDto dto) throws Exception;
	public InternalExamsVocawordDto getVocaWordSpeechPartCount(InternalExamsVocawordDto dto) throws Exception;
	public void updateVocaWord(InternalExamsVocawordDto dto) throws Exception;
	public void updateVocaWordSpeechDifficulty(InternalExamsVocawordDto dto) throws Exception;
	public void updateVocaWordSpeechException(InternalExamsVocawordDto dto) throws Exception;

}