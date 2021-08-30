package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.DashboardDto;

@Repository
public interface DashboardDao{
	public DashboardDto getDashboardNextDate(DashboardDto dto) throws Exception;
	public DashboardDto getDashboardPrevDate(DashboardDto dto) throws Exception;
	public List<DashboardDto> getDashboardList(DashboardDto dto) throws Exception;
	public List<DashboardDto> getDashboardVocaList(DashboardDto dto) throws Exception;
	public List<DashboardDto> getDashboardSpeechNewList(DashboardDto dto) throws Exception;
	public List<DashboardDto> getDashboardSpeechList(DashboardDto dto) throws Exception;
	public List<DashboardDto> getDashboardGoalList(DashboardDto dto) throws Exception;
	public List<DashboardDto> getDashboardGoalConcentrationList(DashboardDto dto) throws Exception;
	public List<DashboardDto> getDashboardSylabusList(DashboardDto dto) throws Exception;
	public List<DashboardDto> getDashboardProblemList(DashboardDto dto) throws Exception;
	
	public List<DashboardDto> getDashboardAchieveCountList(DashboardDto dto) throws Exception;
	public List<DashboardDto> getDashboardAchieveList(DashboardDto dto) throws Exception;
	public List<DashboardDto> getDashboardConfidenceCountList(DashboardDto dto) throws Exception;
	public List<DashboardDto> getDashboardConfidenceList(DashboardDto dto) throws Exception;
	public List<DashboardDto> getDashboardNotEffectCountList(DashboardDto dto) throws Exception;
	public List<DashboardDto> getDashboardJuniorLevelUpList(DashboardDto dto) throws Exception;
	public List<DashboardDto> getDashboardJuniorNotSendList(DashboardDto dto) throws Exception;
	
	public List<DashboardDto> getDashboardNotSchoolList(DashboardDto dto) throws Exception;
	
	public List<DashboardDto> getAchieveAttendList(DashboardDto dto) throws Exception;
	public List<DashboardDto> getAchieveSylabusList(DashboardDto dto) throws Exception;
	public List<DashboardDto> getAchieveResultList(DashboardDto dto) throws Exception;
	public List<DashboardDto> getAchieveGiveUpList(DashboardDto dto) throws Exception;
}