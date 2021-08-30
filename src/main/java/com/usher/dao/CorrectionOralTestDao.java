package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CorrectionOralTestDto;

@Repository
public interface CorrectionOralTestDao{
	public List<CorrectionOralTestDto> getCorrectionOralTestSectionList() throws Exception;
	public List<CorrectionOralTestDto> getCorrectionOralTestBookList(CorrectionOralTestDto dto) throws Exception;
	public List<CorrectionOralTestDto> getCorrectionOralTestList(CorrectionOralTestDto dto) throws Exception;
	public void insertCorrectionOralTest(CorrectionOralTestDto dto) throws Exception;
	public void updateCorrectionOralTest(CorrectionOralTestDto dto) throws Exception;
	public void deleteCorrectionOralTest(CorrectionOralTestDto dto) throws Exception;
}