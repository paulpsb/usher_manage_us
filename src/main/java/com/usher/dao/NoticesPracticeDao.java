package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.NoticesPracticeDto;

@Repository
public interface NoticesPracticeDao{
	public List<NoticesPracticeDto> getNoticesPracticeUserList(NoticesPracticeDto dto) throws Exception;
	public List<NoticesPracticeDto> getNoticesPracticeAsCoursePracticeList(NoticesPracticeDto dto) throws Exception;
	public NoticesPracticeDto getNoticesPractice(NoticesPracticeDto dto) throws Exception;
	public void updatNoticesPracticeComment(NoticesPracticeDto dto) throws Exception;
}