package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CorrectionExamsAppealDto;

@Repository
public interface CorrectionExamsAppealDao{
	public List<CorrectionExamsAppealDto> getCorrectionExamsAppealList(CorrectionExamsAppealDto dto) throws Exception;
	public CorrectionExamsAppealDto getCorrectionExamsAppeal(CorrectionExamsAppealDto dto) throws Exception;
	public void updateCorrectionExamsAppeal(CorrectionExamsAppealDto dto) throws Exception;
}