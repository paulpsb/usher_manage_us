package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.PracticesPracticeresultStaticSendDto;

@Repository
public interface PracticesPracticeresultStaticSendDao{
	public List<PracticesPracticeresultStaticSendDto> getPracticeResultStaticSendList(PracticesPracticeresultStaticSendDto dto) throws Exception;
	public PracticesPracticeresultStaticSendDto getPracticeResultStaticSend(PracticesPracticeresultStaticSendDto dto) throws Exception;
	
	public void insertPracticeResultStaticSend(PracticesPracticeresultStaticSendDto dto) throws Exception;
	public void updatePracticeResultStaticSend(PracticesPracticeresultStaticSendDto dto) throws Exception;
	public void insertPracticeResultStaticSendLog(PracticesPracticeresultStaticSendDto dto) throws Exception;
	
}