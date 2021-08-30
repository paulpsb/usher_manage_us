package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BaseKakaoSendCodeDto;

@Repository
public interface BaseKakaoSendCodeDao{
	public List<BaseKakaoSendCodeDto> getBaseKakaoSendCodeList() throws Exception;
	public void insertBaseKakaoSendCode(BaseKakaoSendCodeDto dto) throws Exception;
	public void updateBaseKakaoSendCode(BaseKakaoSendCodeDto dto) throws Exception;
	public void deleteBaseKakaoSendCode(BaseKakaoSendCodeDto dto) throws Exception;
}