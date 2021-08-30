package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.NoticesAttendDetailDto;

@Repository
public interface NoticesAttendDetailDao{
	public List<NoticesAttendDetailDto> getNoticesAttendDetailList(NoticesAttendDetailDto dto) throws Exception;
	public void updateNoticesAttendDetail(NoticesAttendDetailDto dto) throws Exception;
}