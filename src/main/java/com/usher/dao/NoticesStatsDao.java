package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.NoticesStatsDto;

@Repository
public interface NoticesStatsDao{
	public List<NoticesStatsDto> getNoticesMonthlyStatsNewStudentList(NoticesStatsDto dto) throws Exception;
	public List<NoticesStatsDto> getNoticesMonthlyStatsAttendList(NoticesStatsDto dto) throws Exception;
	public List<NoticesStatsDto> getNoticesMonthlyStatsPracticeList(NoticesStatsDto dto) throws Exception;
	public List<NoticesStatsDto> getNoticesMonthlyStatsRoutineMonthlyList(NoticesStatsDto dto) throws Exception;
	public List<NoticesStatsDto> getNoticesMonthlyStatsRoutineDailyList(NoticesStatsDto dto) throws Exception;
	public List<NoticesStatsDto> getNoticesMonthlyStatsTaskList(NoticesStatsDto dto) throws Exception;
	
	public List<NoticesStatsDto> getNoticesMonthlyUserStatsNewStudentList(NoticesStatsDto dto) throws Exception;
	public List<NoticesStatsDto> getNoticesMonthlyUserStatsAttendList(NoticesStatsDto dto) throws Exception;
	public List<NoticesStatsDto> getNoticesMonthlyUserStatsPracticeList(NoticesStatsDto dto) throws Exception;
	public List<NoticesStatsDto> getNoticesMonthlyUserStatsRoutineMonthlyList(NoticesStatsDto dto) throws Exception;
	public List<NoticesStatsDto> getNoticesMonthlyUserStatsRoutineDailyList(NoticesStatsDto dto) throws Exception;
	public List<NoticesStatsDto> getNoticesMonthlyUserStatsTaskList(NoticesStatsDto dto) throws Exception;
	
	public List<NoticesStatsDto> getNoticesDailyStatsNewStudentList(NoticesStatsDto dto) throws Exception;
	public List<NoticesStatsDto> getNoticesDailyStatsAttendList(NoticesStatsDto dto) throws Exception;
	public List<NoticesStatsDto> getNoticesDailyStatsPracticeList(NoticesStatsDto dto) throws Exception;
	public List<NoticesStatsDto> getNoticesDailyStatsRoutineMonthlyList(NoticesStatsDto dto) throws Exception;
	public List<NoticesStatsDto> getNoticesDailyStatsRoutineDailyList(NoticesStatsDto dto) throws Exception;
	public List<NoticesStatsDto> getNoticesDailyStatsTaskList(NoticesStatsDto dto) throws Exception;
	
	public NoticesStatsDto getNoticesLogCount(NoticesStatsDto dto) throws Exception;
	public List<NoticesStatsDto> getNoticesLogList(NoticesStatsDto dto) throws Exception;
}