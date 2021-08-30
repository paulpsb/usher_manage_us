package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.PracticesPracticeproblemDto;

@Repository
public interface PracticesPracticeproblemDao{
	public List<PracticesPracticeproblemDto> getProblemSectionList() throws Exception;
	public List<PracticesPracticeproblemDto> getProblemBookList(PracticesPracticeproblemDto dto) throws Exception;
	public List<PracticesPracticeproblemDto> getProblemVolumeList(PracticesPracticeproblemDto dto) throws Exception;
	public List<PracticesPracticeproblemDto> getProblemGroupList(PracticesPracticeproblemDto dto) throws Exception;
	public List<PracticesPracticeproblemDto> getProblemArticleList(PracticesPracticeproblemDto dto) throws Exception;
	public List<PracticesPracticeproblemDto> getProblemList(PracticesPracticeproblemDto dto) throws Exception;
	public PracticesPracticeproblemDto getProblem(PracticesPracticeproblemDto dto) throws Exception;
	public void insertProblem(PracticesPracticeproblemDto dto) throws Exception;
	public void updateProblem(PracticesPracticeproblemDto dto) throws Exception;
	public void updateProblemCorrection(PracticesPracticeproblemDto dto) throws Exception;
	public void deleteProblem(PracticesPracticeproblemDto dto) throws Exception;
}