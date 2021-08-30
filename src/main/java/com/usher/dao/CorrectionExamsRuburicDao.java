package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CorrectionExamsRuburicDto;

@Repository
public interface CorrectionExamsRuburicDao{
	public CorrectionExamsRuburicDto getCorrectionExamsRuburic(CorrectionExamsRuburicDto dto) throws Exception;
	public void insertCorrectionExamsRuburic(CorrectionExamsRuburicDto dto) throws Exception;
	public void insertCorrectionExamsRuburicLog(CorrectionExamsRuburicDto dto) throws Exception;
}