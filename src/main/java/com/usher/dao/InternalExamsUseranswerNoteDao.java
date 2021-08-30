package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.InternalExamsUseranswerNoteDto;


@Repository
public interface InternalExamsUseranswerNoteDao{
	public InternalExamsUseranswerNoteDto getExamUserAnswerNote(InternalExamsUseranswerNoteDto dto) throws Exception;
}