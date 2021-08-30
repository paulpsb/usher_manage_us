package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CorrectionExamsNoteDto;

@Repository
public interface CorrectionExamsNoteDao{
	public CorrectionExamsNoteDto getCorrectionExamsNote(CorrectionExamsNoteDto dto) throws Exception;
}