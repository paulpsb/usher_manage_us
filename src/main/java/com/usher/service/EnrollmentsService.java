package com.usher.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usher.dao.EnrollmentsCourseenrollmentDao;
import com.usher.dao.EnrollmentsCourseenrollmentPracticeDao;
import com.usher.dao.EnrollmentsOrientationenrollmentDao;
import com.usher.dao.EnrollmentsRepetitionenrollmentDao;
import com.usher.dao.EnrollmentsRepetitionenrollmentLogDao;
import com.usher.dao.EnrollmentsSeatenrollmentDao;
import com.usher.dto.EnrollmentsCourseenrollmentDto;
import com.usher.dto.EnrollmentsCourseenrollmentPracticeDto;
import com.usher.dto.EnrollmentsOrientationenrollmentDto;
import com.usher.dto.EnrollmentsRepetitionenrollmentDto;
import com.usher.dto.EnrollmentsRepetitionenrollmentLogDto;
import com.usher.dto.EnrollmentsSeatenrollmentDto;

@Service
public class EnrollmentsService{
	@Autowired
	EnrollmentsCourseenrollmentDao dao1;
	
	@Autowired
	EnrollmentsCourseenrollmentPracticeDao dao11;
	
	@Autowired
	EnrollmentsSeatenrollmentDao dao2;
	
	@Autowired
	EnrollmentsOrientationenrollmentDao dao3;
	
	@Autowired
	EnrollmentsRepetitionenrollmentDao dao4;

	@Autowired
	EnrollmentsRepetitionenrollmentLogDao dao5;

	public List<EnrollmentsCourseenrollmentDto> getCourseenrollmentList(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollmentList(dto);
	}
	
	public EnrollmentsCourseenrollmentDto getCourseenrollment(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollment(dto);
	}
	public List<EnrollmentsCourseenrollmentDto> getCourseenrollmentPaidList(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollmentPaidList(dto);
	}
	
	public List<EnrollmentsCourseenrollmentDto> getCourseenrollmentMoveList(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollmentMoveList(dto);
	}
	
	public List<EnrollmentsCourseenrollmentDto> getCourseenrollmentRefundList(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollmentRefundList(dto);
	}
	
	public List<EnrollmentsCourseenrollmentDto> getCourseenrollmentHandphoneBagList(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollmentHandphoneBagList(dto);
	}
	
	public List<EnrollmentsCourseenrollmentDto> getCourseenrollmentAchieveList(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollmentAchieveList(dto);
	}
	public List<EnrollmentsCourseenrollmentDto> getCourseenrollmentAchieveCourseGroupList(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollmentAchieveCourseGroupList(dto);
	}
	
	public List<EnrollmentsCourseenrollmentDto> getCourseenrollmentRepetitionList(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollmentRepetitionList(dto);
	}
	public List<EnrollmentsCourseenrollmentDto> getCourseenrollmentRepetitionCourseGroupList(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollmentRepetitionCourseGroupList(dto);
	}
	public List<EnrollmentsCourseenrollmentDto> getCourseenrollmentRepetitionSemesterList(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollmentRepetitionSemesterList(dto);
	}
	public List<EnrollmentsCourseenrollmentDto> getCourseenrollmentDaillyCountList(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollmentDaillyCountList(dto);
	}
	public List<EnrollmentsCourseenrollmentDto> getCourseenrollmentDaillyCourseGroupCountList(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollmentDaillyCourseGroupCountList(dto);
	}
	public List<EnrollmentsCourseenrollmentDto> getCourseenrollmentMonthlyCountList(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollmentMonthlyCountList(dto);
	}
	public List<EnrollmentsCourseenrollmentDto> getCourseenrollmentMonthlyCourseGroupCountList(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollmentMonthlyCourseGroupCountList(dto);
	}
	
	public EnrollmentsCourseenrollmentDto getCourseenrollmentAttend(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollmentAttend(dto);
	}
	
	public List<EnrollmentsCourseenrollmentDto> getCourseenrollmentExamList(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollmentExamList(dto);
	}
	
	
	public List<EnrollmentsCourseenrollmentDto> getCourseenrollmentExamCourseGroupList(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollmentExamCourseGroupList(dto);
	}
	
	public List<EnrollmentsCourseenrollmentDto> getCourseenrollmentSemesterList(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollmentSemesterList(dto);
	}
	public void updateCourseenrollmentList(EnrollmentsCourseenrollmentDto dto) throws Exception{
		dao1.updateCourseenrollmentList(dto);
	}
	
	public void updateCourseenrollmentCourse(EnrollmentsCourseenrollmentDto dto) throws Exception{
		dao1.updateCourseenrollmentCourse(dto);
	}
	public void updateCourseenrollmentProgramUse(EnrollmentsCourseenrollmentDto dto) throws Exception{
		dao1.updateCourseenrollmentProgramUse(dto);
	}
	public EnrollmentsCourseenrollmentDto getCourseenrollmentAllocation(EnrollmentsCourseenrollmentDto dto) throws Exception{
		return dao1.getCourseenrollmentAllocation(dto);
	}
	public void updateCourseenrollmentAllocation(EnrollmentsCourseenrollmentDto dto) throws Exception{
		dao1.updateCourseenrollmentAllocation(dto);
	}
	public void insertCourseenrollmentAllocationLog(EnrollmentsCourseenrollmentDto dto) throws Exception{
		dao1.insertCourseenrollmentAllocationLog(dto);
	}
	public void updateUserPersonGoalScore(EnrollmentsCourseenrollmentDto dto) throws Exception{
		dao1.updateUserPersonGoalScore(dto);
	}
	public void updateUserPersonAttendStartDate(EnrollmentsCourseenrollmentDto dto) throws Exception{
		dao1.updateUserPersonAttendStartDate(dto);
	}
	public void updateUserPersonNeedDate(EnrollmentsCourseenrollmentDto dto) throws Exception{
		dao1.updateUserPersonNeedDate(dto);
	}
	public void updateUserPersonAttendDate(EnrollmentsCourseenrollmentDto dto) throws Exception{
		dao1.updateUserPersonAttendDate(dto);
	}
	public List<EnrollmentsSeatenrollmentDto> getSeatenrollmentList(EnrollmentsSeatenrollmentDto dto) throws Exception{
		return dao2.getSeatenrollmentList(dto);
	}
	public void insertSeatenrollment(EnrollmentsSeatenrollmentDto dto) throws Exception{
		dao2.insertSeatenrollment(dto);
	}
	public void deleteSeatenrollment(EnrollmentsSeatenrollmentDto dto1) throws Exception{
		dao2.deleteSeatenrollment(dto1);
	}
	
	public List<EnrollmentsOrientationenrollmentDto> getEnrollmentsOrientationList(EnrollmentsOrientationenrollmentDto dto) throws Exception{
		return dao3.getEnrollmentsOrientationList(dto);
	}

	public List<EnrollmentsRepetitionenrollmentDto> getEnrollmentsRepetitionSemesterList(EnrollmentsRepetitionenrollmentDto dto) throws Exception{
		return dao4.getEnrollmentsRepetitionSemesterList(dto);
	}
	
	public List<EnrollmentsRepetitionenrollmentDto> getEnrollmentsRepetitionCourseGroupList(EnrollmentsRepetitionenrollmentDto dto) throws Exception{
		return dao4.getEnrollmentsRepetitionCourseGroupList(dto);
	}

	public List<EnrollmentsRepetitionenrollmentDto> getEnrollmentsRepetitionList(EnrollmentsRepetitionenrollmentDto dto) throws Exception{
		return dao4.getEnrollmentsRepetitionList(dto);
	}
	public EnrollmentsRepetitionenrollmentDto getEnrollmentsRepetition(EnrollmentsRepetitionenrollmentDto dto) throws Exception{
		return dao4.getEnrollmentsRepetition(dto);
	}
	public List<EnrollmentsRepetitionenrollmentDto> getEnrollmentsRepetitionUserList(EnrollmentsRepetitionenrollmentDto dto) throws Exception{
		return dao4.getEnrollmentsRepetitionUserList(dto);
	}
	public void insertRepetitaionGoalScore(EnrollmentsRepetitionenrollmentDto dto) throws Exception{
		dao4.insertRepetitaionGoalScore(dto);
		
		EnrollmentsRepetitionenrollmentLogDto dto1 = new EnrollmentsRepetitionenrollmentLogDto();
		dto1.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		dao5.insertRepetitaionGoalScoreLog(dto1);
	}
	public void insertRepetitaionAttendStartDate(EnrollmentsRepetitionenrollmentDto dto) throws Exception{
		dao4.insertRepetitaionAttendStartDate(dto);
		
		EnrollmentsRepetitionenrollmentLogDto dto1 = new EnrollmentsRepetitionenrollmentLogDto();
		dto1.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		dao5.insertRepetitaionAttendStartDateLog(dto1);
		
	}
	public void insertRepetitaionNeedDate(EnrollmentsRepetitionenrollmentDto dto) throws Exception{
		dao4.insertRepetitaionNeedDate(dto);
		
		EnrollmentsRepetitionenrollmentLogDto dto1 = new EnrollmentsRepetitionenrollmentLogDto();
		dto1.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		dao5.insertRepetitaionNeedDateLog(dto1);
		
	}
	public void insertRepetitaionAttendDate(EnrollmentsRepetitionenrollmentDto dto) throws Exception{
		dao4.insertRepetitaionAttendDate(dto);
		
		EnrollmentsRepetitionenrollmentLogDto dto1 = new EnrollmentsRepetitionenrollmentLogDto();
		dto1.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		dao5.insertRepetitaionAttendDateLog(dto1);
		
	}
	public void insertRepetitaionGoalRepetitionAdvise(EnrollmentsRepetitionenrollmentDto dto) throws Exception{
		dao4.insertRepetitaionGoalRepetitionAdvise(dto);
		
		EnrollmentsRepetitionenrollmentLogDto dto1 = new EnrollmentsRepetitionenrollmentLogDto();
		dto1.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		dao5.insertRepetitaionGoalRepetitionAdviseLog(dto1);
		
	}
	public void insertRepetitaionFirstRepetitionResult(EnrollmentsRepetitionenrollmentDto dto) throws Exception{
		dao4.insertRepetitaionFirstRepetitionResult(dto);
		
		EnrollmentsRepetitionenrollmentLogDto dto1 = new EnrollmentsRepetitionenrollmentLogDto();
		dto1.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		dao5.insertRepetitaionFirstRepetitionResultLog(dto1);
		
	}
	public void insertRepetitaionFirstRepetitionAdvise(EnrollmentsRepetitionenrollmentDto dto) throws Exception{
		dao4.insertRepetitaionFirstRepetitionAdvise(dto);
		
		EnrollmentsRepetitionenrollmentLogDto dto1 = new EnrollmentsRepetitionenrollmentLogDto();
		dto1.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		dao5.insertRepetitaionFirstRepetitionAdviseLog(dto1);
		
	}
	public void insertRepetitaionSecondRepetitionResult(EnrollmentsRepetitionenrollmentDto dto) throws Exception{
		dao4.insertRepetitaionSecondRepetitionResult(dto);
		
		EnrollmentsRepetitionenrollmentLogDto dto1 = new EnrollmentsRepetitionenrollmentLogDto();
		dto1.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		dao5.insertRepetitaionSecondRepetitionResultLog(dto1);
		
	}
	public void insertRepetitaionSecondRepetitionAdvise(EnrollmentsRepetitionenrollmentDto dto) throws Exception{
		dao4.insertRepetitaionSecondRepetitionAdvise(dto);
		
		EnrollmentsRepetitionenrollmentLogDto dto1 = new EnrollmentsRepetitionenrollmentLogDto();
		dto1.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		dao5.insertRepetitaionSecondRepetitionAdviseLog(dto1);
		
	}

	public void insertRepetitaionThirdRepetitionResult(EnrollmentsRepetitionenrollmentDto dto) throws Exception{
		dao4.insertRepetitaionThirdRepetitionResult(dto);
		
		EnrollmentsRepetitionenrollmentLogDto dto1 = new EnrollmentsRepetitionenrollmentLogDto();
		dto1.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		dao5.insertRepetitaionThirdRepetitionResultLog(dto1);
		
	}
	public void insertRepetitaionThirdRepetitionAdvise(EnrollmentsRepetitionenrollmentDto dto) throws Exception{
		dao4.insertRepetitaionThirdRepetitionAdvise(dto);
		
		EnrollmentsRepetitionenrollmentLogDto dto1 = new EnrollmentsRepetitionenrollmentLogDto();
		dto1.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		dao5.insertRepetitaionThirdRepetitionAdviseLog(dto1);
		
	}
	public void insertRepetitaionUnregisteredReason(EnrollmentsRepetitionenrollmentDto dto) throws Exception{
		dao4.insertRepetitaionUnregisteredReason(dto);
		
		EnrollmentsRepetitionenrollmentLogDto dto1 = new EnrollmentsRepetitionenrollmentLogDto();
		dto1.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		dao5.insertRepetitaionUnregisteredReasonLog(dto1);
		
	}
	
	public List<EnrollmentsCourseenrollmentPracticeDto> getEnrollmentsCourseenrollmentPracticeList(EnrollmentsCourseenrollmentPracticeDto dto) throws Exception{
		return dao11.getEnrollmentsCourseenrollmentPracticeList(dto);
	}
	public void insertEnrollmentsCourseenrollmentPractice(EnrollmentsCourseenrollmentPracticeDto dto) throws Exception{
		dao11.insertEnrollmentsCourseenrollmentPractice(dto);
	}
	public void deleteEnrollmentsCourseenrollmentPractice(EnrollmentsCourseenrollmentPracticeDto dto) throws Exception{
		dao11.deleteEnrollmentsCourseenrollmentPractice(dto);
	}
}