package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.NoticesScheduleDetailDto;

@Repository
public interface NoticesScheduleDetailDao{
	public List<NoticesScheduleDetailDto> getNoticesScheduleDetailList(NoticesScheduleDetailDto dto) throws Exception;
	public NoticesScheduleDetailDto getNoticesScheduleDetail(NoticesScheduleDetailDto dto) throws Exception;
	public void updateNoticesScheduleDetail(NoticesScheduleDetailDto dto) throws Exception;
}