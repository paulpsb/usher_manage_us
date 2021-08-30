package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CorrectionOnlineVideoDto;

@Repository
public interface CorrectionOnlineVideoDao{
	public List<CorrectionOnlineVideoDto> getCorrectionOnlineVideoList(CorrectionOnlineVideoDto dto) throws Exception;
	public void insertCorrectionOnlineVideo(CorrectionOnlineVideoDto dto) throws Exception;
	public void updateCorrectionOnlineVideo(CorrectionOnlineVideoDto dto) throws Exception;
	public void deleteCorrectionOnlineVideo(CorrectionOnlineVideoDto dto) throws Exception;
}