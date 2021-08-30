package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CorrectionExamsAnswerDto;

@Repository
public interface CorrectionExamsAnswerDao{
	public List<CorrectionExamsAnswerDto> getCorrectionExamsAnswerCourseList(CorrectionExamsAnswerDto dto) throws Exception;
	public CorrectionExamsAnswerDto getCorrectionExamsAnswerCount(CorrectionExamsAnswerDto dto) throws Exception;
	public List<CorrectionExamsAnswerDto> getCorrectionExamsAnswerList(CorrectionExamsAnswerDto dto) throws Exception;
	public CorrectionExamsAnswerDto getCorrectionExamsAnswerAppealCount(CorrectionExamsAnswerDto dto) throws Exception;
	public List<CorrectionExamsAnswerDto> getCorrectionExamsAnswerAppealList(CorrectionExamsAnswerDto dto) throws Exception;
	public List<CorrectionExamsAnswerDto> getCorrectionExamsAnswerAppealReviewList(CorrectionExamsAnswerDto dto) throws Exception;
	public CorrectionExamsAnswerDto getCorrectionExamsAnswer(CorrectionExamsAnswerDto dto) throws Exception;
	public CorrectionExamsAnswerDto getCorrectionExamsAnswerAsResult(CorrectionExamsAnswerDto dto) throws Exception;
	public List<CorrectionExamsAnswerDto> getCorrectionExamsAnswerMonthlyPenCountList(CorrectionExamsAnswerDto dto) throws Exception;
	public List<CorrectionExamsAnswerDto> getCorrectionExamsAnswerDailyPenCountList(CorrectionExamsAnswerDto dto) throws Exception;
	public List<CorrectionExamsAnswerDto> getCorrectionExamsAnswerTAList(CorrectionExamsAnswerDto dto) throws Exception;
	public List<CorrectionExamsAnswerDto> getCorrectionExamsAnswerAppealTAReviewList(CorrectionExamsAnswerDto dto) throws Exception;
	public void updateCorrectionExamsAnswerCorrectPen(CorrectionExamsAnswerDto dto) throws Exception;
	public void updateCorrectionExamsAnswerRubric(CorrectionExamsAnswerDto dto) throws Exception;
	public void updateCorrectionExamsAnswerStatus(CorrectionExamsAnswerDto dto) throws Exception;
	public void updateCorrectionExamsAnswerAppealStatus(CorrectionExamsAnswerDto dto) throws Exception;
}