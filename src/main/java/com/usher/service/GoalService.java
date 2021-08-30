package com.usher.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usher.dao.GoalsGoalconcentrationDao;
import com.usher.dao.GoalsGoalconcentrationPracticeDao;
import com.usher.dto.GoalsGoalconcentrationDto;
import com.usher.dto.GoalsGoalconcentrationPracticeDto;

@Service
public class GoalService{
	@Autowired
	GoalsGoalconcentrationDao dao1;
	
	@Autowired
	GoalsGoalconcentrationPracticeDao dao2;
	
	public GoalsGoalconcentrationDto getGoalConcentration(GoalsGoalconcentrationDto dto) throws Exception{
		return dao1.getGoalConcentration(dto);
	}
	public List<GoalsGoalconcentrationDto> getGoalConcentrationList(GoalsGoalconcentrationDto dto) throws Exception{
		return dao1.getGoalConcentrationList(dto);
	}

	public void updateGoalConcentration(GoalsGoalconcentrationDto dto) throws Exception{
		dao1.updateGoalConcentration(dto);
	}
	
	public List<GoalsGoalconcentrationPracticeDto> getGoalConcentrationPracticeList(GoalsGoalconcentrationPracticeDto dto) throws Exception{
		return dao2.getGoalConcentrationPracticeList(dto);
	}
	public GoalsGoalconcentrationPracticeDto getGoalConcentrationPractice(GoalsGoalconcentrationPracticeDto dto) throws Exception{
		return dao2.getGoalConcentrationPractice(dto);
	}
	public GoalsGoalconcentrationPracticeDto getGoalToPractice(GoalsGoalconcentrationPracticeDto dto) throws Exception{
		return dao2.getGoalToPractice(dto);
	}
	public void updateGoalConcentrationPractice(GoalsGoalconcentrationPracticeDto dto) throws Exception{
		dao2.updateGoalConcentrationPractice(dto);
	}
}