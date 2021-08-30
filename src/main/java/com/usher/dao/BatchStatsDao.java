package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BatchStatsDto;

@Repository
public interface BatchStatsDao{
	public List<BatchStatsDto> getBatchStatsExamMonthList() throws Exception;
	public List<BatchStatsDto> getBatchStatsMonthlyList(BatchStatsDto dto) throws Exception;
	public List<BatchStatsDto> getBatchStatsDailyList(BatchStatsDto dto) throws Exception;
	public List<BatchStatsDto> getBatchStatsList(BatchStatsDto dto) throws Exception;
	public List<BatchStatsDto> getBatchStatsCourseNewList(BatchStatsDto dto) throws Exception;
	public List<BatchStatsDto> getBatchStatsCourseNewSpecialList(BatchStatsDto dto) throws Exception;
	public List<BatchStatsDto> getBatchStatsEnrollmentNewList(BatchStatsDto dto) throws Exception;
	public List<BatchStatsDto> getBatchStatsCourseExistsList(BatchStatsDto dto) throws Exception;
	public List<BatchStatsDto> getBatchStatsCourseExistsSpecialList(BatchStatsDto dto) throws Exception;
	public List<BatchStatsDto> getBatchStatsNewList(BatchStatsDto dto) throws Exception;
	
	public List<BatchStatsDto> getBatchStatsResultList(BatchStatsDto dto) throws Exception;
	public List<BatchStatsDto> getBatchStatsPrepareList(BatchStatsDto dto) throws Exception;
	
	public List<BatchStatsDto> getBatchStatsAdviserCountList(BatchStatsDto dto) throws Exception;
}