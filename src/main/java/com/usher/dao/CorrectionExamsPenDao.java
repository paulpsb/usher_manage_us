package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CorrectionExamsPenDto;

@Repository
public interface CorrectionExamsPenDao{
	public CorrectionExamsPenDto getCorrectionExamsPen(CorrectionExamsPenDto dto) throws Exception;
	public void insertCorrectionExamsPen(CorrectionExamsPenDto dto) throws Exception;
	public void insertCorrectionExamsPenLog(CorrectionExamsPenDto dto) throws Exception;
}