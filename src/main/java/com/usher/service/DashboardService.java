package com.usher.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usher.dao.CoursesSemesterDao;
import com.usher.dao.DashboardDao;
import com.usher.dao.CoursesCoursegroupDao;
import com.usher.dao.CoursesCourseDao;
import com.usher.dto.CoursesSemesterDto;
import com.usher.dto.DashboardDto;
import com.usher.dto.CoursesCoursegroupDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.util.SessionUtil;

@Service
public class DashboardService{
	@Autowired
	DashboardDao dao1;

	public DashboardDto getDashboardNextDate(DashboardDto dto) throws Exception{
		return dao1.getDashboardNextDate(dto);
	}
	
	public DashboardDto getDashboardPrevDate(DashboardDto dto) throws Exception{
		return dao1.getDashboardPrevDate(dto);
	}
	
	public List<DashboardDto> getDashboardList(DashboardDto dto) throws Exception{
		return dao1.getDashboardList(dto);
	}
	
	public List<DashboardDto> getDashboardVocaList(DashboardDto dto) throws Exception{
		return dao1.getDashboardVocaList(dto);
	}
	
	
	public List<DashboardDto> getDashboardSpeechNewList(DashboardDto dto) throws Exception{
		return dao1.getDashboardSpeechNewList(dto);
	}

	public List<DashboardDto> getDashboardSpeechList(DashboardDto dto) throws Exception{
		return dao1.getDashboardSpeechList(dto);
	}
	
	public List<DashboardDto> getDashboardGoalList(DashboardDto dto) throws Exception{
		return dao1.getDashboardGoalList(dto);
	}
	
	public List<DashboardDto> getDashboardGoalConcentrationList(DashboardDto dto) throws Exception{
		return dao1.getDashboardGoalConcentrationList(dto);
	}
	
	public List<DashboardDto> getDashboardSylabusList(DashboardDto dto) throws Exception{
		return dao1.getDashboardSylabusList(dto);
	}
	
	public List<DashboardDto> getDashboardProblemList(DashboardDto dto) throws Exception{
		return dao1.getDashboardProblemList(dto);
	}
	
	public List<DashboardDto> getDashboardAchieveCountList(DashboardDto dto) throws Exception{
		return dao1.getDashboardAchieveCountList(dto);
	}
	public List<DashboardDto> getDashboardAchieveList(DashboardDto dto) throws Exception{
		return dao1.getDashboardAchieveList(dto);
	}
	public List<DashboardDto> getDashboardConfidenceCountList(DashboardDto dto) throws Exception{
		return dao1.getDashboardConfidenceCountList(dto);
	}
	public List<DashboardDto> getDashboardConfidenceList(DashboardDto dto) throws Exception{
		return dao1.getDashboardConfidenceList(dto);
	}
	
	public List<DashboardDto> getDashboardNotEffectCountList(DashboardDto dto) throws Exception{
		return dao1.getDashboardNotEffectCountList(dto);
	}
	
	public List<DashboardDto> getDashboardJuniorLevelUpList(DashboardDto dto) throws Exception{
		return dao1.getDashboardJuniorLevelUpList(dto);
	}
	public List<DashboardDto> getDashboardJuniorNotSendList(DashboardDto dto) throws Exception{
		return dao1.getDashboardJuniorNotSendList(dto);
	}
	public List<DashboardDto> getDashboardNotSchoolList(DashboardDto dto) throws Exception{
		return dao1.getDashboardNotSchoolList(dto);
	}
	
	public List<DashboardDto> getAchieveAttendList(DashboardDto dto) throws Exception{
		return dao1.getAchieveAttendList(dto);
	}
	
	public List<DashboardDto> getAchieveSylabusList(DashboardDto dto) throws Exception{
		return dao1.getAchieveSylabusList(dto);
	}
	
	public List<DashboardDto> getAchieveResultList(DashboardDto dto) throws Exception{
		return dao1.getAchieveResultList(dto);
	}
	
	public List<DashboardDto> getAchieveGiveUpList(DashboardDto dto) throws Exception{
		return dao1.getAchieveGiveUpList(dto);
	}
}