package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BaseKakaoSendMessageDto;

@Repository
public interface BaseKakaoSendMessageDao{
	public List<BaseKakaoSendMessageDto> getBaseKakaoSendMessageList() throws Exception;
	public BaseKakaoSendMessageDto getBaseKakaoSendMessage(BaseKakaoSendMessageDto dto) throws Exception;
	public void insertBaseKakaoSendMessage(BaseKakaoSendMessageDto dto) throws Exception;
	public void updateBaseKakaoSendMessage(BaseKakaoSendMessageDto dto) throws Exception;
	public void deleteBaseKakaoSendMessage(BaseKakaoSendMessageDto dto) throws Exception;
	public void deleteBaseKakaoSendMessageDetailAll(BaseKakaoSendMessageDto dto) throws Exception;
}