package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.StatsSchoolDto;

@Repository
public interface StatsSchoolDao{
	public List<StatsSchoolDto> getStatsBatchSchoolArea1List(StatsSchoolDto dto) throws Exception;
	public List<StatsSchoolDto> getStatsBatchSchoolArea2List(StatsSchoolDto dto) throws Exception;
	public List<StatsSchoolDto> getStatsBatchSchoolSchoolsList(StatsSchoolDto dto) throws Exception;
	
	public List<StatsSchoolDto> getStatsSchoolArea1List(StatsSchoolDto dto) throws Exception;
	public List<StatsSchoolDto> getStatsSchoolArea2List(StatsSchoolDto dto) throws Exception;
	public List<StatsSchoolDto> getStatsSchoolSchoolsList(StatsSchoolDto dto) throws Exception;
	
	public List<StatsSchoolDto> getStatsSchoolDetailList(StatsSchoolDto dto) throws Exception;
	public List<StatsSchoolDto> getStatsSchoolStudentList(StatsSchoolDto dto) throws Exception;
	
	public StatsSchoolDto getStatsSchoolStudentInfo(StatsSchoolDto dto) throws Exception;
}