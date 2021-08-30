package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.GoalsGoalconcentrationDto;

@Repository
public interface GoalsGoalconcentrationDao{
	public GoalsGoalconcentrationDto getGoalConcentration(GoalsGoalconcentrationDto dto) throws Exception;
	public List<GoalsGoalconcentrationDto> getGoalConcentrationList(GoalsGoalconcentrationDto dto) throws Exception;
	public void updateGoalConcentration(GoalsGoalconcentrationDto dto) throws Exception;
}