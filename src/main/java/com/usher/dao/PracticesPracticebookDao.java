package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.PracticesPracticebookDto;

@Repository
public interface PracticesPracticebookDao{
	public PracticesPracticebookDto getPracticeBookPageCount(PracticesPracticebookDto dto) throws Exception;
	public List<PracticesPracticebookDto> getPracticeBookPageList(PracticesPracticebookDto dto) throws Exception;
	public List<PracticesPracticebookDto> getPracticeBookList(PracticesPracticebookDto dto) throws Exception;
	public PracticesPracticebookDto getPracticeBook(PracticesPracticebookDto dto) throws Exception;
	public void insertPracticeBook(PracticesPracticebookDto dto) throws Exception;
	public void updatePracticeBook(PracticesPracticebookDto dto) throws Exception;
}