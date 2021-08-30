package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.GoalsGoalconcentrationPracticeDto;

@Repository
public interface GoalsGoalconcentrationPracticeDao{
	public List<GoalsGoalconcentrationPracticeDto> getGoalConcentrationPracticeList(GoalsGoalconcentrationPracticeDto dto) throws Exception;
	public GoalsGoalconcentrationPracticeDto getGoalConcentrationPractice(GoalsGoalconcentrationPracticeDto dto) throws Exception;
	public GoalsGoalconcentrationPracticeDto getGoalToPractice(GoalsGoalconcentrationPracticeDto dto) throws Exception;
	public void updateGoalConcentrationPractice(GoalsGoalconcentrationPracticeDto dto) throws Exception;
}