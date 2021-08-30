package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BaseKakaoSendMessageDetailDto;

@Repository
public interface BaseKakaoSendMessageDetailDao{
	public List<BaseKakaoSendMessageDetailDto> getBaseKakaoSendMessageDetailList(BaseKakaoSendMessageDetailDto dto) throws Exception;
	public void insertBaseKakaoSendMessageDetail(BaseKakaoSendMessageDetailDto dto) throws Exception;
	public void updateBaseKakaoSendMessageDetail(BaseKakaoSendMessageDetailDto dto) throws Exception;
	public void deleteBaseKakaoSendMessageDetail(BaseKakaoSendMessageDetailDto dto) throws Exception;
}