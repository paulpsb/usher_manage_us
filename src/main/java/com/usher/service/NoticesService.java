package com.usher.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usher.dao.NoticesAttendDao;
import com.usher.dao.NoticesAttendDetailDao;
import com.usher.dao.NoticesNewStudentDao;
import com.usher.dao.NoticesNewStudentDetailDao;
import com.usher.dao.NoticesPracticeDao;
import com.usher.dao.NoticesPracticeDetailDao;
import com.usher.dao.NoticesRoutineDao;
import com.usher.dao.NoticesRoutineDetailsDao;
import com.usher.dao.NoticesRoutineTransCoursegroupDao;
import com.usher.dao.NoticesRoutineTransCoursegroupDetailDao;
import com.usher.dao.NoticesRoutineTransCoursegroupMonthlyDao;
import com.usher.dao.NoticesRoutineTransOraganizationDao;
import com.usher.dao.NoticesRoutineTransOraganizationDetailDao;
import com.usher.dao.NoticesScheduleDao;
import com.usher.dao.NoticesScheduleDetailDao;
import com.usher.dao.NoticesStatsDao;
import com.usher.dao.NoticesTaskCategoryDao;
import com.usher.dao.NoticesTaskCategoryDetailDao;
import com.usher.dao.NoticesTaskDao;
import com.usher.dao.NoticesTaskDetailDao;
import com.usher.dto.NoticesAttendDetailDto;
import com.usher.dto.NoticesAttendDto;
import com.usher.dto.NoticesNewStudentDetailDto;
import com.usher.dto.NoticesNewStudentDto;
import com.usher.dto.NoticesPracticeDetailDto;
import com.usher.dto.NoticesPracticeDto;
import com.usher.dto.NoticesRoutineDetailsDto;
import com.usher.dto.NoticesRoutineDto;
import com.usher.dto.NoticesRoutineTransCoursegroupDetailDto;
import com.usher.dto.NoticesRoutineTransCoursegroupDto;
import com.usher.dto.NoticesRoutineTransCoursegroupMonthlyDto;
import com.usher.dto.NoticesRoutineTransOraganizationDetailDto;
import com.usher.dto.NoticesRoutineTransOraganizationDto;
import com.usher.dto.NoticesScheduleDetailDto;
import com.usher.dto.NoticesScheduleDto;
import com.usher.dto.NoticesStatsDto;
import com.usher.dto.NoticesTaskCategoryDetailDto;
import com.usher.dto.NoticesTaskCategoryDto;
import com.usher.dto.NoticesTaskDetailDto;
import com.usher.dto.NoticesTaskDto;


@Service
public class NoticesService{
	@Autowired
	NoticesRoutineDao dao01;
	
	@Autowired
	NoticesRoutineDetailsDao dao02;
	
	@Autowired
	NoticesRoutineTransCoursegroupDao dao11;
	
	@Autowired
	NoticesRoutineTransCoursegroupDetailDao dao12;
	
	@Autowired
	NoticesRoutineTransCoursegroupMonthlyDao dao13;

	@Autowired
	NoticesRoutineTransOraganizationDao dao14;
	
	@Autowired
	NoticesRoutineTransOraganizationDetailDao dao15;
	
	@Autowired
	NoticesScheduleDao dao21;
	
	@Autowired
	NoticesScheduleDetailDao dao22;

	@Autowired
	NoticesPracticeDao dao23;
	
	@Autowired
	NoticesPracticeDetailDao dao24;
	
	@Autowired
	NoticesAttendDao dao25;
	
	@Autowired
	NoticesAttendDetailDao dao26;

	@Autowired
	NoticesNewStudentDao dao27;
	
	@Autowired
	NoticesNewStudentDetailDao dao28;
	
	@Autowired
	NoticesTaskCategoryDao dao31;
	
	@Autowired
	NoticesTaskCategoryDetailDao dao32;
	
	@Autowired
	NoticesTaskDao dao33;
	
	@Autowired
	NoticesTaskDetailDao dao34;
	
	@Autowired
	NoticesStatsDao dao41;
	
	public NoticesRoutineDto getNoticesRoutineCount(NoticesRoutineDto dto) throws Exception{
		return dao01.getNoticesRoutineCount(dto);
	}
	public List<NoticesRoutineDto> getNoticesRoutineList(NoticesRoutineDto dto) throws Exception{
		return dao01.getNoticesRoutineList(dto);
	}
	public List<NoticesRoutineDto> getNoticesRoutineAsCategoryList(NoticesRoutineDto dto) throws Exception{
		return dao01.getNoticesRoutineAsCategoryList(dto);
	}
	public NoticesRoutineDto getNoticesRoutine(NoticesRoutineDto dto) throws Exception{
		return dao01.getNoticesRoutine(dto);
	}
	public void insertNoticesRoutine(NoticesRoutineDto dto) throws Exception{
		dao01.insertNoticesRoutine(dto);
	}
	public void updateNoticesRoutine(NoticesRoutineDto dto) throws Exception{
		dao01.updateNoticesRoutine(dto);
	}
	public void deleteNoticesRoutine(NoticesRoutineDto dto) throws Exception{
		dao01.deleteNoticesRoutineDetailsAll(dto);
		dao01.deleteNoticesRoutine(dto);
	}
	
	public void insertNoticesRoutineLog(NoticesRoutineDto dto) throws Exception{
		dao01.insertNoticesRoutineLog(dto);
		dao01.insertNoticesRoutineDetailsLog(dto);
	}
	
	
	public List<NoticesRoutineDetailsDto> getNoticesRoutineDetailsList(NoticesRoutineDetailsDto dto) throws Exception{
		return dao02.getNoticesRoutineDetailsList(dto);
	}
	public void insertNoticesRoutineDetails(NoticesRoutineDetailsDto dto) throws Exception{
		dao02.insertNoticesRoutineDetails(dto);
	}
	public void updateNoticesRoutineDetails(NoticesRoutineDetailsDto dto) throws Exception{
		dao02.updateNoticesRoutineDetails(dto);
	}
	public void deleteNoticesRoutineDetails(NoticesRoutineDetailsDto dto) throws Exception{
		dao02.deleteNoticesRoutineDetails(dto);
	}
	
	public NoticesRoutineTransCoursegroupDto getRoutineTransCoursegroup(NoticesRoutineTransCoursegroupDto dto) throws Exception{
		return dao11.getRoutineTransCoursegroup(dto);
	}
	public List<NoticesRoutineTransCoursegroupDto> getRoutineTransCoursegroupScheuleList(NoticesRoutineTransCoursegroupDto dto) throws Exception{
		return dao11.getRoutineTransCoursegroupScheuleList(dto);
	}
	public void insertRoutineTransCoursegroup(NoticesRoutineTransCoursegroupDto dto) throws Exception{
		dao11.insertRoutineTransCoursegroup(dto);
	}
	public void deleteRoutineTransCoursegroup(NoticesRoutineTransCoursegroupDto dto) throws Exception{
		dao11.deleteRoutineTransCoursegroup(dto);
	}
	
	public List<NoticesRoutineTransCoursegroupDetailDto> getRoutineTransCoursegroupDetailList(NoticesRoutineTransCoursegroupDetailDto dto) throws Exception{
		return dao12.getRoutineTransCoursegroupDetailList(dto);
	}
	public void insertRoutineTransCoursegroupDetail(NoticesRoutineTransCoursegroupDetailDto dto) throws Exception{
		dao12.insertRoutineTransCoursegroupDetail(dto);
	}
	public void deleteRoutineTransCoursegroupDetail(NoticesRoutineTransCoursegroupDetailDto dto) throws Exception{
		dao12.deleteRoutineTransCoursegroupDetail(dto);
	}
	
	public List<NoticesRoutineTransCoursegroupMonthlyDto> getNoticesRoutineTransCoursegroupMonthlyGroupList(NoticesRoutineTransCoursegroupMonthlyDto dto) throws Exception{
		return dao13.getNoticesRoutineTransCoursegroupMonthlyGroupList(dto);
	}
	public List<NoticesRoutineTransCoursegroupMonthlyDto> getNoticesRoutineTransCoursegroupMonthlyList(NoticesRoutineTransCoursegroupMonthlyDto dto) throws Exception{
		return dao13.getNoticesRoutineTransCoursegroupMonthlyList(dto);
	}
	public List<NoticesRoutineTransCoursegroupMonthlyDto> getNoticesRoutineTransCoursegroupMonthlyAsGroupList(NoticesRoutineTransCoursegroupMonthlyDto dto) throws Exception{
		return dao13.getNoticesRoutineTransCoursegroupMonthlyAsGroupList(dto);
	}
	public void insertNoticesRoutineTransCoursegroupMonthly(NoticesRoutineTransCoursegroupMonthlyDto dto) throws Exception{
		dao13.insertNoticesRoutineTransCoursegroupMonthly(dto);
	}
	public void deleteNoticesRoutineTransCoursegroupMonthly(NoticesRoutineTransCoursegroupMonthlyDto dto) throws Exception{
		dao13.deleteNoticesRoutineTransCoursegroupMonthly(dto);
	}
	
	public NoticesRoutineTransOraganizationDto getRoutineTransOraganization(NoticesRoutineTransOraganizationDto dto) throws Exception{
		return dao14.getRoutineTransOraganization(dto);
	}
	public List<NoticesRoutineTransOraganizationDto> getRoutineTransOraganizationScheuleList(NoticesRoutineTransOraganizationDto dto) throws Exception{
		return dao14.getRoutineTransOraganizationScheuleList(dto);
	}
	public void insertRoutineTransOraganization(NoticesRoutineTransOraganizationDto dto) throws Exception{
		dao14.insertRoutineTransOraganization(dto);
	}
	public void deleteRoutineTransOraganization(NoticesRoutineTransOraganizationDto dto) throws Exception{
		dao14.deleteRoutineTransOraganization(dto);
	}
	
	public List<NoticesRoutineTransOraganizationDetailDto> getRoutineTransOraganizationDetailList(NoticesRoutineTransOraganizationDetailDto dto) throws Exception{
		return dao15.getRoutineTransOraganizationDetailList(dto);
	}
	public void insertRoutineTransOraganizationDetail(NoticesRoutineTransOraganizationDetailDto dto) throws Exception{
		dao15.insertRoutineTransOraganizationDetail(dto);
	}
	public void deleteRoutineTransOraganizationDetail(NoticesRoutineTransOraganizationDetailDto dto) throws Exception{
		dao15.deleteRoutineTransOraganizationDetail(dto);
	}
	
	public List<NoticesScheduleDto> getNoticesScheduleUserList(NoticesScheduleDto dto) throws Exception{
		return dao21.getNoticesScheduleUserList(dto);
	}
	public List<NoticesScheduleDto> getNoticesScheduleUserMonthlyUncompleteList(NoticesScheduleDto dto) throws Exception{
		return dao21.getNoticesScheduleUserMonthlyUncompleteList(dto);
	}
	public NoticesScheduleDto getNoticesSchedule(NoticesScheduleDto dto) throws Exception{
		return dao21.getNoticesSchedule(dto);
	}
	public void updateNoticesScheduleUser(NoticesScheduleDto dto) throws Exception{
		dao21.updateNoticesScheduleUser(dto);
	}
	
	public List<NoticesScheduleDetailDto> getNoticesScheduleDetailList(NoticesScheduleDetailDto dto) throws Exception{
		return dao22.getNoticesScheduleDetailList(dto);
	}
	public NoticesScheduleDetailDto getNoticesScheduleDetail(NoticesScheduleDetailDto dto) throws Exception{
		return dao22.getNoticesScheduleDetail(dto);
	}
	public void updateNoticesScheduleDetail(NoticesScheduleDetailDto dto) throws Exception{
		dao22.updateNoticesScheduleDetail(dto);
	}
	
	public List<NoticesPracticeDto> getNoticesPracticeUserList(NoticesPracticeDto dto) throws Exception{
		return dao23.getNoticesPracticeUserList(dto);
	}
	public List<NoticesPracticeDto> getNoticesPracticeAsCoursePracticeList(NoticesPracticeDto dto) throws Exception{
		return dao23.getNoticesPracticeAsCoursePracticeList(dto);
	}
	public NoticesPracticeDto getNoticesPractice(NoticesPracticeDto dto) throws Exception{
		return dao23.getNoticesPractice(dto);
	}
	public void updatNoticesPracticeComment(NoticesPracticeDto dto) throws Exception{
		dao23.updatNoticesPracticeComment(dto);
	}
	
	public List<NoticesPracticeDetailDto> getNoticesPracticeDetailAsCoursePracticeList(NoticesPracticeDetailDto dto) throws Exception{
		return dao24.getNoticesPracticeDetailAsCoursePracticeList(dto);
	}
	public List<NoticesPracticeDetailDto> getNoticesPracticeDetailList(NoticesPracticeDetailDto dto) throws Exception{
		return dao24.getNoticesPracticeDetailList(dto);
	}
	public void updatNoticesPracticeDetailComment(NoticesPracticeDetailDto dto) throws Exception{
		dao24.updatNoticesPracticeDetailComment(dto);
	}
	
	public List<NoticesAttendDto> getNoticesAttendUserList(NoticesAttendDto dto) throws Exception{
		return dao25.getNoticesAttendUserList(dto);
	}
	public NoticesAttendDto getNoticesAttend(NoticesAttendDto dto) throws Exception{
		return dao25.getNoticesAttend(dto);
	}
	
	public List<NoticesAttendDetailDto> getNoticesAttendDetailList(NoticesAttendDetailDto dto) throws Exception{
		return dao26.getNoticesAttendDetailList(dto);
	}
	public void updateNoticesAttendDetail(NoticesAttendDetailDto dto) throws Exception{
		dao26.updateNoticesAttendDetail(dto);
	}
	
	public List<NoticesNewStudentDto> getNoticesNewStudentUserList(NoticesNewStudentDto dto) throws Exception{
		return dao27.getNoticesNewStudentUserList(dto);
	}
	public NoticesNewStudentDto getNoticesNewStudent(NoticesNewStudentDto dto) throws Exception{
		return dao27.getNoticesNewStudent(dto);
	}
	public void updatetNoticesNewStudent(NoticesNewStudentDto dto) throws Exception{
		dao27.updatetNoticesNewStudent(dto);
	}
	public List<NoticesNewStudentDetailDto> getNoticesNewStudentDetailList(NoticesNewStudentDetailDto dto) throws Exception{
		return dao28.getNoticesNewStudentDetailList(dto);
	}
	public void updatNewStudentTraining(NoticesNewStudentDetailDto dto) throws Exception{
		dao28.updatNewStudentTraining(dto);
	}
	
	public NoticesTaskCategoryDto getNoticesTaskCategoryCount(NoticesTaskCategoryDto dto) throws Exception{
		return dao31.getNoticesTaskCategoryCount(dto);
	}

	public List<NoticesTaskCategoryDto> getNoticesTaskCategoryList(NoticesTaskCategoryDto dto) throws Exception{
		return dao31.getNoticesTaskCategoryList(dto);
	}
	
	public List<NoticesTaskCategoryDto> getNoticesTaskCategoryUseList() throws Exception{
		return dao31.getNoticesTaskCategoryUseList();				
	}
	public NoticesTaskCategoryDto getNoticesTaskCategory(NoticesTaskCategoryDto dto) throws Exception{
		return dao31.getNoticesTaskCategory(dto);
	}
	public void insertNoticesTaskCategory(NoticesTaskCategoryDto dto) throws Exception{
		dao31.insertNoticesTaskCategory(dto);
	}
	public void updateNoticesTaskCategory(NoticesTaskCategoryDto dto) throws Exception{
		dao31.updateNoticesTaskCategory(dto);
	}
	public void deleteNoticesTaskCategory(NoticesTaskCategoryDto dto) throws Exception{
		dao31.deleteNoticesTaskCategoryDetailAll(dto);
		dao31.deleteNoticesTaskCategory(dto);
	}
	
	public List<NoticesTaskCategoryDetailDto> getNoticesTaskCategoryDetailList(NoticesTaskCategoryDetailDto dto) throws Exception{
		return dao32.getNoticesTaskCategoryDetailList(dto);
	}
	public List<NoticesTaskCategoryDetailDto> getNoticesTaskCategoryDetailUseList(NoticesTaskCategoryDetailDto dto) throws Exception{
		return dao32.getNoticesTaskCategoryDetailUseList(dto);
	}
	public NoticesTaskCategoryDetailDto getNoticesTaskCategoryDetail(NoticesTaskCategoryDetailDto dto) throws Exception{
		return dao32.getNoticesTaskCategoryDetail(dto);
	}
	public void insertNoticesTaskCategoryDetail(NoticesTaskCategoryDetailDto dto) throws Exception{
		dao32.insertNoticesTaskCategoryDetail(dto);
	}
	public void updateNoticesTaskCategoryDetail(NoticesTaskCategoryDetailDto dto) throws Exception{
		dao32.updateNoticesTaskCategoryDetail(dto);
	}
	public void updateNoticesTaskCategoryDetailUsed(NoticesTaskCategoryDetailDto dto) throws Exception{
		dao32.updateNoticesTaskCategoryDetailUsed(dto);
	}
	
	public void deleteNoticesTaskCategoryDetail(NoticesTaskCategoryDetailDto dto) throws Exception{
		dao32.deleteNoticesTaskCategoryDetail(dto);
	}
	
	public NoticesTaskDto getNoticesTaskCount(NoticesTaskDto dto) throws Exception{
		return dao33.getNoticesTaskCount(dto);
	}
	public List<NoticesTaskDto> getNoticesTaskList(NoticesTaskDto dto) throws Exception{
		return dao33.getNoticesTaskList(dto);
	}
	public List<NoticesTaskDto> getNoticesTaskDailyList(NoticesTaskDto dto) throws Exception{
		return dao33.getNoticesTaskDailyList(dto);
	}
	public List<NoticesTaskDto> getNoticesTaskStatusList(NoticesTaskDto dto) throws Exception{
		return dao33.getNoticesTaskStatusList(dto);
	}
	public List<NoticesTaskDto> getNoticesTaskUserDailyList(NoticesTaskDto dto) throws Exception{
		return dao33.getNoticesTaskUserDailyList(dto);
	}
	
	public NoticesTaskDto getNoticesTask(NoticesTaskDto dto) throws Exception{
		return dao33.getNoticesTask(dto);
	}
	public void insertNoticesTask(NoticesTaskDto dto) throws Exception{
		dao33.insertNoticesTask(dto);
	}
	public void updateNoticesTask(NoticesTaskDto dto) throws Exception{
		dao33.updateNoticesTask(dto);
	}
	public void updateNoticesTaskMove(NoticesTaskDto dto) throws Exception{
		dao33.updateNoticesTaskMove(dto);
	}
	public void updateNoticesTaskReturn(NoticesTaskDto dto) throws Exception{
		dao33.updateNoticesTaskReturn(dto);
	}
	public void updateNoticesTaskComplete(NoticesTaskDto dto) throws Exception{
		dao33.updateNoticesTaskComplete(dto);
	}
	
	public void deleteNoticesTask(NoticesTaskDto dto) throws Exception{
		dao33.deleteNoticesTaskDetailAll(dto);
		dao33.deleteNoticesTask(dto);
	}
	
	public List<NoticesTaskDetailDto> getNoticesTaskDetailList(NoticesTaskDetailDto dto) throws Exception{
		return dao34.getNoticesTaskDetailList(dto);
	}
	public NoticesTaskDetailDto getNoticesTaskDetailSeq(NoticesTaskDetailDto dto) throws Exception{
		return dao34.getNoticesTaskDetailSeq(dto);
	}
	public void insertNoticesTaskDetail(NoticesTaskDetailDto dto) throws Exception{
		dao34.insertNoticesTaskDetail(dto);
	}
	
	public List<NoticesStatsDto> getNoticesMonthlyStatsNewStudentList(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesMonthlyStatsNewStudentList(dto);
	}
	public List<NoticesStatsDto> getNoticesMonthlyStatsAttendList(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesMonthlyStatsAttendList(dto);
	}
	public List<NoticesStatsDto> getNoticesMonthlyStatsPracticeList(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesMonthlyStatsPracticeList(dto);
	}
	public List<NoticesStatsDto> getNoticesMonthlyStatsRoutineMonthlyList(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesMonthlyStatsRoutineMonthlyList(dto);
	}
	public List<NoticesStatsDto> getNoticesMonthlyStatsRoutineDailyList(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesMonthlyStatsRoutineDailyList(dto);
	}
	public List<NoticesStatsDto> getNoticesMonthlyStatsTaskList(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesMonthlyStatsTaskList(dto);
	}
	
	public List<NoticesStatsDto> getNoticesMonthlyUserStatsNewStudentList(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesMonthlyUserStatsNewStudentList(dto);
	}
	public List<NoticesStatsDto> getNoticesMonthlyUserStatsAttendList(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesMonthlyUserStatsAttendList(dto);
	}
	public List<NoticesStatsDto> getNoticesMonthlyUserStatsPracticeList(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesMonthlyUserStatsPracticeList(dto);
	}
	public List<NoticesStatsDto> getNoticesMonthlyUserStatsRoutineMonthlyList(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesMonthlyUserStatsRoutineMonthlyList(dto);
	}
	public List<NoticesStatsDto> getNoticesMonthlyUserStatsRoutineDailyList(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesMonthlyUserStatsRoutineDailyList(dto);
	}
	public List<NoticesStatsDto> getNoticesMonthlyUserStatsTaskList(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesMonthlyUserStatsTaskList(dto);
	}
	
	public List<NoticesStatsDto> getNoticesDailyStatsNewStudentList(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesDailyStatsNewStudentList(dto);
	}
	public List<NoticesStatsDto> getNoticesDailyStatsAttendList(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesDailyStatsAttendList(dto);
	}
	public List<NoticesStatsDto> getNoticesDailyStatsPracticeList(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesDailyStatsPracticeList(dto);
	}
	public List<NoticesStatsDto> getNoticesDailyStatsRoutineMonthlyList(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesDailyStatsRoutineMonthlyList(dto);
	}
	public List<NoticesStatsDto> getNoticesDailyStatsRoutineDailyList(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesDailyStatsRoutineDailyList(dto);
	}
	public List<NoticesStatsDto> getNoticesDailyStatsTaskList(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesDailyStatsTaskList(dto);
	}
	public NoticesStatsDto getNoticesLogCount(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesLogCount(dto);
	}
	public List<NoticesStatsDto> getNoticesLogList(NoticesStatsDto dto) throws Exception{
		return dao41.getNoticesLogList(dto);
	}
}