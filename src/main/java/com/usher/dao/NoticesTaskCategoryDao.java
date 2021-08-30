package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.NoticesTaskCategoryDto;

@Repository
public interface NoticesTaskCategoryDao{
	
	public NoticesTaskCategoryDto getNoticesTaskCategoryCount(NoticesTaskCategoryDto dto) throws Exception;
	public List<NoticesTaskCategoryDto> getNoticesTaskCategoryList(NoticesTaskCategoryDto dto) throws Exception;
	public List<NoticesTaskCategoryDto> getNoticesTaskCategoryUseList() throws Exception;
	public NoticesTaskCategoryDto getNoticesTaskCategory(NoticesTaskCategoryDto dto) throws Exception;
	public void insertNoticesTaskCategory(NoticesTaskCategoryDto dto) throws Exception;
	public void updateNoticesTaskCategory(NoticesTaskCategoryDto dto) throws Exception;
	public void deleteNoticesTaskCategory(NoticesTaskCategoryDto dto) throws Exception;
	public void deleteNoticesTaskCategoryDetailAll(NoticesTaskCategoryDto dto) throws Exception;
}