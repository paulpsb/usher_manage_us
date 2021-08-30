package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CorrectionTestTypeDto;

@Repository
public interface CorrectionTestTypeDao{
	public List<CorrectionTestTypeDto> getCorrectionTestTypeList(CorrectionTestTypeDto dto) throws Exception;
	public void insertCorrectionTestType(CorrectionTestTypeDto dto) throws Exception;
	public void updateCorrectionTestType(CorrectionTestTypeDto dto) throws Exception;
	public void deleteCorrectionTestType(CorrectionTestTypeDto dto) throws Exception;
}