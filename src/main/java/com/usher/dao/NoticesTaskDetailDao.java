package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.NoticesTaskDetailDto;

@Repository
public interface NoticesTaskDetailDao{
	public List<NoticesTaskDetailDto> getNoticesTaskDetailList(NoticesTaskDetailDto dto) throws Exception;
	public NoticesTaskDetailDto getNoticesTaskDetailSeq(NoticesTaskDetailDto dto) throws Exception;
	public void insertNoticesTaskDetail(NoticesTaskDetailDto dto) throws Exception;
}