package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.PracticesPracticevolumeDto;

@Repository
public interface PracticesPracticevolumeDao{
	public PracticesPracticevolumeDto getPracticeVolumePageCount(PracticesPracticevolumeDto dto) throws Exception;
	public List<PracticesPracticevolumeDto> getPracticeVolumePageList(PracticesPracticevolumeDto dto) throws Exception;
	public List<PracticesPracticevolumeDto> getPracticeVolumeList(PracticesPracticevolumeDto dto) throws Exception;
	public PracticesPracticevolumeDto getPracticeVolume(PracticesPracticevolumeDto dto) throws Exception;
	public void insertPracticeVolume(PracticesPracticevolumeDto dto) throws Exception;
	public void updatePracticeVolume(PracticesPracticevolumeDto dto) throws Exception;
	public void updatePracticeVolumeOrder(PracticesPracticevolumeDto dto) throws Exception;
}