package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CounselsCounselDto;

@Repository
public interface CounselsCounselDao{
	public List<CounselsCounselDto> getCounselsCounselList(CounselsCounselDto dto) throws Exception;
	public void insertCounselsCounsel(CounselsCounselDto dto) throws Exception;
	
}