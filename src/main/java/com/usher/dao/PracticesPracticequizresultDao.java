package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.PracticesPracticequizresultDto;

@Repository
public interface PracticesPracticequizresultDao{
	public List<PracticesPracticequizresultDto> getPracticeQuizResultCourseList(PracticesPracticequizresultDto dto) throws Exception;
	public List<PracticesPracticequizresultDto> getPracticeQuizResultDailyList(PracticesPracticequizresultDto dto) throws Exception;
	public List<PracticesPracticequizresultDto> getPracticeQuizResultMonthlyList(PracticesPracticequizresultDto dto) throws Exception;
	public void insertPracticeQuizResult(PracticesPracticequizresultDto dto) throws Exception;
}