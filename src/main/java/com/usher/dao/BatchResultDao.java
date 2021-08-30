package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BatchResultDto;

@Repository
public interface BatchResultDao{
	public List<BatchResultDto> getBatchResultUserOnlyList(BatchResultDto dto) throws Exception;
	public List<BatchResultDto> getBatchResultCountList(BatchResultDto dto) throws Exception;
	public List<BatchResultDto> getBatchResultList(BatchResultDto dto) throws Exception;
	public List<BatchResultDto> getBatchResultUserList(BatchResultDto dto) throws Exception;
	public List<BatchResultDto> getBatchResultUserMultiList(BatchResultDto dto) throws Exception;
	public List<BatchResultDto> getBatchResultCourseGroupList(BatchResultDto dto) throws Exception;
	public List<BatchResultDto> getBatchResultCourseList(BatchResultDto dto) throws Exception;
	
	public BatchResultDto getBatchResult(BatchResultDto dto) throws Exception;
	public BatchResultDto getBatchResultAsID(BatchResultDto dto) throws Exception;
	
	public BatchResultDto getBatchResultUserAsAdvice(BatchResultDto dto) throws Exception;
	public BatchResultDto getBatchResultUserAsNotAdvice(BatchResultDto dto) throws Exception;
	
	public void updateBatchResultAdviserAdvice(BatchResultDto dto) throws Exception;
	public void updateBatchResultAdviserCourse(BatchResultDto dto) throws Exception;
	public void updateBatchResultAdviserRegister(BatchResultDto dto) throws Exception;
	public void updateBatchResultDeskRegister(BatchResultDto dto) throws Exception;
	public void updateBatchResultFinallyNotRegister(BatchResultDto dto) throws Exception;
	public void updateBatchResultAttendDate(BatchResultDto dto) throws Exception;
	public void updateBatchResultFinallyNotRegisterAsId(BatchResultDto dto) throws Exception;
	public void updateBatchResultSendKaKaoBefore(BatchResultDto dto) throws Exception;
	public void updateBatchResultSendKaKaoCurrent(BatchResultDto dto) throws Exception;
	public void updateBatchResultSendPhone(BatchResultDto dto) throws Exception;
	
	public void insertBatchResultLog(BatchResultDto dto) throws Exception;
	
}