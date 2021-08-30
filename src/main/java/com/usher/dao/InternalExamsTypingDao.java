package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsTypingDto;

@Repository
public interface InternalExamsTypingDao{
	public InternalExamsTypingDto getTypingCount(InternalExamsTypingDto dto) throws Exception;
	public List<InternalExamsTypingDto> getTypingList(InternalExamsTypingDto dto) throws Exception;
	public InternalExamsTypingDto getTyping(InternalExamsTypingDto dto) throws Exception;
	public void insertTyping(InternalExamsTypingDto dto) throws Exception;
	public void updateTyping(InternalExamsTypingDto dto) throws Exception;
	public void updateTypingContent(InternalExamsTypingDto dto) throws Exception;
	public void deleteTyping(InternalExamsTypingDto dto) throws Exception;

}