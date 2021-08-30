package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.NoticesAttendDto;

@Repository
public interface NoticesAttendDao{
	public List<NoticesAttendDto> getNoticesAttendUserList(NoticesAttendDto dto) throws Exception;
	public NoticesAttendDto getNoticesAttend(NoticesAttendDto dto) throws Exception;
}