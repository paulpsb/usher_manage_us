package com.usher.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usher.dao.StatsSchoolDao;
import com.usher.dto.StatsSchoolDto;

@Service
public class StatsService{
	@Autowired
	StatsSchoolDao dao1;
	
	public List<StatsSchoolDto> getStatsBatchSchoolArea1List(StatsSchoolDto dto) throws Exception{
		return dao1.getStatsBatchSchoolArea1List(dto);
	}
	public List<StatsSchoolDto> getStatsBatchSchoolArea2List(StatsSchoolDto dto) throws Exception{
		return dao1.getStatsBatchSchoolArea2List(dto);
	}
	public List<StatsSchoolDto> getStatsBatchSchoolSchoolsList(StatsSchoolDto dto) throws Exception{
		return dao1.getStatsBatchSchoolSchoolsList(dto);
	}
	

	public List<StatsSchoolDto> getStatsSchoolArea1List(StatsSchoolDto dto) throws Exception{
		return dao1.getStatsSchoolArea1List(dto);
	}
	public List<StatsSchoolDto> getStatsSchoolArea2List(StatsSchoolDto dto) throws Exception{
		return dao1.getStatsSchoolArea2List(dto);
	}
	public List<StatsSchoolDto> getStatsSchoolSchoolsList(StatsSchoolDto dto) throws Exception{
		return dao1.getStatsSchoolSchoolsList(dto);
	}
	
	public List<StatsSchoolDto> getStatsSchoolDetailList(StatsSchoolDto dto) throws Exception{
		return dao1.getStatsSchoolDetailList(dto);
	}
	public List<StatsSchoolDto> getStatsSchoolStudentList(StatsSchoolDto dto) throws Exception{
		return dao1.getStatsSchoolStudentList(dto);
	}
	
	public StatsSchoolDto getStatsSchoolStudentInfo(StatsSchoolDto dto) throws Exception{
		return dao1.getStatsSchoolStudentInfo(dto);
	}
}