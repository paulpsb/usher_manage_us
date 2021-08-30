package com.usher.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usher.dao.CounselsCounselDao;
import com.usher.dto.CounselsCounselDto;
import com.usher.util.SessionUtil;

@Service
public class CounselsService{
	@Autowired
	CounselsCounselDao dao1;
	
	public List<CounselsCounselDto> getCounselsCounselList(CounselsCounselDto dto) throws Exception{
		return dao1.getCounselsCounselList(dto);
	}

	public void insertCounselsCounsel(CounselsCounselDto dto) throws Exception{
		dao1.insertCounselsCounsel(dto);
	}
	
}