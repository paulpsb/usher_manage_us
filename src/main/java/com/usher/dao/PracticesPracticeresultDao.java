package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.PracticesPracticeresultDto;

@Repository
public interface PracticesPracticeresultDao{
	
	public PracticesPracticeresultDto getPracticeResult(PracticesPracticeresultDto dto) throws Exception;
	public List<PracticesPracticeresultDto> getDailyPracticeResultList(PracticesPracticeresultDto dto) throws Exception;
	public List<PracticesPracticeresultDto> getMonthlyPracticeResultList(PracticesPracticeresultDto dto) throws Exception;
	public List<PracticesPracticeresultDto> getIndependentPracticeResultList(PracticesPracticeresultDto dto) throws Exception;
	
	public List<PracticesPracticeresultDto> getPracticeResultAttendList(PracticesPracticeresultDto dto) throws Exception;
	public List<PracticesPracticeresultDto> getPracticeResultSpeechList(PracticesPracticeresultDto dto) throws Exception;
	public List<PracticesPracticeresultDto> getPracticeResultVocaList(PracticesPracticeresultDto dto) throws Exception;
	public List<PracticesPracticeresultDto> getPracticeResultVocaIntervalList(PracticesPracticeresultDto dto) throws Exception;
	public List<PracticesPracticeresultDto> getPracticeResultVocaIntervalCourseGroupList(PracticesPracticeresultDto dto) throws Exception;
	public List<PracticesPracticeresultDto> getPracticeResultPraticeTypeList(PracticesPracticeresultDto dto) throws Exception;
	public List<PracticesPracticeresultDto> getPracticeResultPraticeTypeMonthlyList(PracticesPracticeresultDto dto) throws Exception;
	
	public List<PracticesPracticeresultDto> getPracticeResultList(PracticesPracticeresultDto dto) throws Exception;
	public List<PracticesPracticeresultDto> getPracticeResultListAsVoca(PracticesPracticeresultDto dto) throws Exception;
	
	public PracticesPracticeresultDto getPracticeResultMockTestCount(PracticesPracticeresultDto dto) throws Exception;
	public List<PracticesPracticeresultDto> getPracticeResultMockTestList(PracticesPracticeresultDto dto) throws Exception;
	
	public void updatePracticeResultAnswerRublic(PracticesPracticeresultDto dto) throws Exception;
	public void updatePracticeResultAnswerPen(PracticesPracticeresultDto dto) throws Exception;
	public void updatePracticeResultAnswerSpk(PracticesPracticeresultDto dto) throws Exception;
}