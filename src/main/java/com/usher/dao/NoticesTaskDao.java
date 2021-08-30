package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.NoticesTaskDto;

@Repository
public interface NoticesTaskDao{
	public NoticesTaskDto getNoticesTaskCount(NoticesTaskDto dto) throws Exception;
	public List<NoticesTaskDto> getNoticesTaskList(NoticesTaskDto dto) throws Exception;
	public List<NoticesTaskDto> getNoticesTaskStatusList(NoticesTaskDto dto) throws Exception;
	public List<NoticesTaskDto> getNoticesTaskDailyList(NoticesTaskDto dto) throws Exception;
	public List<NoticesTaskDto> getNoticesTaskUserDailyList(NoticesTaskDto dto) throws Exception;
	public NoticesTaskDto getNoticesTask(NoticesTaskDto dto) throws Exception;	
	public void insertNoticesTask(NoticesTaskDto dto) throws Exception;
	public void updateNoticesTask(NoticesTaskDto dto) throws Exception;
	public void updateNoticesTaskMove(NoticesTaskDto dto) throws Exception;
	public void updateNoticesTaskReturn(NoticesTaskDto dto) throws Exception;
	public void updateNoticesTaskComplete(NoticesTaskDto dto) throws Exception;
	public void deleteNoticesTask(NoticesTaskDto dto) throws Exception;
	public void deleteNoticesTaskDetailAll(NoticesTaskDto dto) throws Exception;
}