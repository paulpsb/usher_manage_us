package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.PracticesPracticeresultStaticDto;

@Repository
public interface PracticesPracticeresultStaticDao{
	public PracticesPracticeresultStaticDto getPracticeResultStatic(PracticesPracticeresultStaticDto dto) throws Exception;
	public List<PracticesPracticeresultStaticDto> getPracticeResultStaticList(PracticesPracticeresultStaticDto dto) throws Exception;
	public List<PracticesPracticeresultStaticDto> getPracticeResultStaticHomeworkList(PracticesPracticeresultStaticDto dto) throws Exception;
	public List<PracticesPracticeresultStaticDto> getPracticeResultStaticCourseGroupList(PracticesPracticeresultStaticDto dto) throws Exception;
	public List<PracticesPracticeresultStaticDto> getPracticeResultStaticCourseEnrollmentDailyList(PracticesPracticeresultStaticDto dto) throws Exception;
	public List<PracticesPracticeresultStaticDto> getPracticeResultStaticCourseDailyList(PracticesPracticeresultStaticDto dto) throws Exception;
	
	public void insertPracticeResultStatic(PracticesPracticeresultStaticDto dto) throws Exception;
	public void updatePracticeResultStatic(PracticesPracticeresultStaticDto dto) throws Exception;
	
}