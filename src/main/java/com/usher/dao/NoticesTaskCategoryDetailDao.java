package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.NoticesTaskCategoryDetailDto;

@Repository
public interface NoticesTaskCategoryDetailDao{
	public List<NoticesTaskCategoryDetailDto> getNoticesTaskCategoryDetailList(NoticesTaskCategoryDetailDto dto) throws Exception;
	public List<NoticesTaskCategoryDetailDto> getNoticesTaskCategoryDetailUseList(NoticesTaskCategoryDetailDto dto) throws Exception;
	public NoticesTaskCategoryDetailDto getNoticesTaskCategoryDetail(NoticesTaskCategoryDetailDto dto) throws Exception;
	public void insertNoticesTaskCategoryDetail(NoticesTaskCategoryDetailDto dto) throws Exception;
	public void updateNoticesTaskCategoryDetail(NoticesTaskCategoryDetailDto dto) throws Exception;
	public void updateNoticesTaskCategoryDetailUsed(NoticesTaskCategoryDetailDto dto) throws Exception;
	public void deleteNoticesTaskCategoryDetail(NoticesTaskCategoryDetailDto dto) throws Exception;
}