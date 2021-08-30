package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.PracticesPracticeproblemBoardDto;

@Repository
public interface PracticesPracticeproblemBoardDao{
	public PracticesPracticeproblemBoardDto getPracticeProblemBoard(PracticesPracticeproblemBoardDto dto) throws Exception;
	public void insertPracticeProblemBoard(PracticesPracticeproblemBoardDto dto) throws Exception;
	public void updatePracticeProblemBoard(PracticesPracticeproblemBoardDto dto) throws Exception;
	public void deletePracticeProblemBoard(PracticesPracticeproblemBoardDto dto) throws Exception;
}