package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.PracticesPracticegroupDto;

@Repository
public interface PracticesPracticegroupDao{
	public PracticesPracticegroupDto getPracticeGroupPageCount(PracticesPracticegroupDto dto) throws Exception;
	public List<PracticesPracticegroupDto> getPracticeGroupPageList(PracticesPracticegroupDto dto) throws Exception;
	public List<PracticesPracticegroupDto> getPracticeGroupList(PracticesPracticegroupDto dto) throws Exception;
	public PracticesPracticegroupDto getPracticeGroup(PracticesPracticegroupDto dto) throws Exception;
	public void insertPracticeGroup(PracticesPracticegroupDto dto) throws Exception;
	public void updatePracticeGroup(PracticesPracticegroupDto dto) throws Exception;
	public void updatePracticeGroupOrder(PracticesPracticegroupDto dto) throws Exception;
}