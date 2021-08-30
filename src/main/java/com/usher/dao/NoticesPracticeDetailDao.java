package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.NoticesPracticeDetailDto;

@Repository
public interface NoticesPracticeDetailDao{
	public List<NoticesPracticeDetailDto> getNoticesPracticeDetailAsCoursePracticeList(NoticesPracticeDetailDto dto) throws Exception;
	public List<NoticesPracticeDetailDto> getNoticesPracticeDetailList(NoticesPracticeDetailDto dto) throws Exception;
	public void updatNoticesPracticeDetailComment(NoticesPracticeDetailDto dto) throws Exception;
}