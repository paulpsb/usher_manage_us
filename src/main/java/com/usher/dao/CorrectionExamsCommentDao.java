package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CorrectionExamsCommentDto;

@Repository
public interface CorrectionExamsCommentDao{
	public List<CorrectionExamsCommentDto> getCorrectionExamsCommentList(CorrectionExamsCommentDto dto) throws Exception;
	public CorrectionExamsCommentDto getCorrectionExamsComment(CorrectionExamsCommentDto dto) throws Exception;
	
	public void updateCorrectionExamsComment(CorrectionExamsCommentDto dto) throws Exception;
	public void deleteCorrectionExamsComment(CorrectionExamsCommentDto dto) throws Exception;
}