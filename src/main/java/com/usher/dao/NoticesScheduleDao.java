package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.NoticesScheduleDto;

@Repository
public interface NoticesScheduleDao{
	public List<NoticesScheduleDto> getNoticesScheduleUserList(NoticesScheduleDto dto) throws Exception;
	public List<NoticesScheduleDto> getNoticesScheduleUserMonthlyUncompleteList(NoticesScheduleDto dto) throws Exception;
	public NoticesScheduleDto getNoticesSchedule(NoticesScheduleDto dto) throws Exception;
	public void updateNoticesScheduleUser(NoticesScheduleDto dto) throws Exception;
}