package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CorrectionTestBookDto;

@Repository
public interface CorrectionTestBookDao{
	public List<CorrectionTestBookDto> getCorrectionTestBookList(CorrectionTestBookDto dto) throws Exception;
	public void insertCorrectionTestBook(CorrectionTestBookDto dto) throws Exception;
	public void deleteCorrectionTestBook(CorrectionTestBookDto dto) throws Exception;
}