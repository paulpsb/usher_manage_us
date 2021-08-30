package com.usher.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usher.dao.PracticesPracticebookDao;
import com.usher.dao.PracticesPracticeexceptionDao;
import com.usher.dao.PracticesPracticegroupDao;
import com.usher.dao.PracticesPracticeproblemBoardDao;
import com.usher.dao.PracticesPracticeproblemDao;
import com.usher.dao.PracticesPracticequizresultDao;
import com.usher.dao.PracticesPracticeresultDao;
import com.usher.dao.PracticesPracticeresultStaticDao;
import com.usher.dao.PracticesPracticeresultStaticSendDao;
import com.usher.dao.PracticesPracticescheduleDao;
import com.usher.dao.PracticesPracticescheduleHomeworkDao;
import com.usher.dao.PracticesPracticesectionDao;
import com.usher.dao.PracticesPracticesectiontypeDao;
import com.usher.dao.PracticesPracticetypeDao;
import com.usher.dao.PracticesPracticevolumeDao;
import com.usher.dto.PracticesPracticebookDto;
import com.usher.dto.PracticesPracticeexceptionDto;
import com.usher.dto.PracticesPracticegroupDto;
import com.usher.dto.PracticesPracticeproblemBoardDto;
import com.usher.dto.PracticesPracticeproblemDto;
import com.usher.dto.PracticesPracticequizresultDto;
import com.usher.dto.PracticesPracticeresultDto;
import com.usher.dto.PracticesPracticeresultStaticDto;
import com.usher.dto.PracticesPracticeresultStaticSendDto;
import com.usher.dto.PracticesPracticescheduleDto;
import com.usher.dto.PracticesPracticescheduleHomeworkDto;
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.dto.PracticesPracticesectiontypeDto;
import com.usher.dto.PracticesPracticetypeDto;
import com.usher.dto.PracticesPracticevolumeDto;

@Service
public class PracticesService{
	@Autowired
	PracticesPracticesectionDao dao1;
	
	@Autowired
	PracticesPracticebookDao dao2;

	@Autowired
	PracticesPracticevolumeDao dao3;
	
	@Autowired
	PracticesPracticegroupDao dao4;
	
	@Autowired
	PracticesPracticeresultStaticDao dao9;
	
	@Autowired
	PracticesPracticeproblemDao dao10;

	@Autowired
	PracticesPracticeresultDao dao11;

	@Autowired
	PracticesPracticescheduleDao dao12;

	@Autowired
	PracticesPracticequizresultDao dao13;
	
	@Autowired
	PracticesPracticescheduleHomeworkDao dao14;
	
	@Autowired
	PracticesPracticeexceptionDao dao15;
	
	@Autowired
	PracticesPracticeproblemBoardDao dao16;
	
	@Autowired
	PracticesPracticetypeDao dao20;

	@Autowired
	PracticesPracticesectiontypeDao dao21;

	@Autowired
	PracticesPracticeresultStaticSendDao dao22;
	
	public List<PracticesPracticesectionDto> getPracticeSectionList() throws Exception{
		return dao1.getPracticeSectionList();
	}
	
	public PracticesPracticesectionDto getPracticeSection(PracticesPracticesectionDto dto) throws Exception{
		return dao1.getPracticeSection(dto);
	}
	
	public void insertPracticeSection(PracticesPracticesectionDto dto) throws Exception{
		dao1.insertPracticeSection(dto);
	}
	
	public void updatePracticeSection(PracticesPracticesectionDto dto) throws Exception{
		dao1.updatePracticeSection(dto);
	}
	
	public PracticesPracticebookDto getPracticeBookPageCount(PracticesPracticebookDto dto) throws Exception{
		return dao2.getPracticeBookPageCount(dto);
	}
	
	public List<PracticesPracticebookDto> getPracticeBookPageList(PracticesPracticebookDto dto) throws Exception{
		return dao2.getPracticeBookPageList(dto);
	}
	
	public List<PracticesPracticebookDto> getPracticeBookList(PracticesPracticebookDto dto) throws Exception{
		return dao2.getPracticeBookList(dto);
	}
	public PracticesPracticebookDto getPracticeBook(PracticesPracticebookDto dto) throws Exception{
		return dao2.getPracticeBook(dto);
	}
	public void insertPracticeBook(PracticesPracticebookDto dto) throws Exception{
		dao2.insertPracticeBook(dto);
	}
	public void updatePracticeBook(PracticesPracticebookDto dto) throws Exception{
		dao2.updatePracticeBook(dto);
	}
	
	public PracticesPracticevolumeDto getPracticeVolumePageCount(PracticesPracticevolumeDto dto) throws Exception{
		return dao3.getPracticeVolumePageCount(dto);
	}
	
	public List<PracticesPracticevolumeDto> getPracticeVolumePageList(PracticesPracticevolumeDto dto) throws Exception{
		return dao3.getPracticeVolumePageList(dto);
	}
	
	public List<PracticesPracticevolumeDto> getPracticeVolumeList(PracticesPracticevolumeDto dto) throws Exception{
		return dao3.getPracticeVolumeList(dto);
	}
	public PracticesPracticevolumeDto getPracticeVolume(PracticesPracticevolumeDto dto) throws Exception{
		return dao3.getPracticeVolume(dto);
	}
	public void insertPracticeVolume(PracticesPracticevolumeDto dto) throws Exception{
		dao3.insertPracticeVolume(dto);
	}
	public void updatePracticeVolume(PracticesPracticevolumeDto dto) throws Exception{
		dao3.updatePracticeVolume(dto);
	}
	
	public void updatePracticeVolumeOrder(PracticesPracticevolumeDto dto) throws Exception{
		dao3.updatePracticeVolumeOrder(dto);
	}
	public PracticesPracticegroupDto getPracticeGroupPageCount(PracticesPracticegroupDto dto) throws Exception{
		return dao4.getPracticeGroupPageCount(dto);
	}
	
	public List<PracticesPracticegroupDto> getPracticeGroupPageList(PracticesPracticegroupDto dto) throws Exception{
		return dao4.getPracticeGroupPageList(dto);
	}
	
	public List<PracticesPracticegroupDto> getPracticeGroupList(PracticesPracticegroupDto dto) throws Exception{
		return dao4.getPracticeGroupList(dto);
	}
	public PracticesPracticegroupDto getPracticeGroup(PracticesPracticegroupDto dto) throws Exception{
		return dao4.getPracticeGroup(dto);
	}
	public void insertPracticeGroup(PracticesPracticegroupDto dto) throws Exception{
		dao4.insertPracticeGroup(dto);
	}
	public void updatePracticeGroup(PracticesPracticegroupDto dto) throws Exception{
		dao4.updatePracticeGroup(dto);
	}
	
	public void updatePracticeGroupOrder(PracticesPracticegroupDto dto) throws Exception{
		dao4.updatePracticeGroupOrder(dto);
	}
	
	public PracticesPracticeresultStaticDto getPracticeResultStatic(PracticesPracticeresultStaticDto dto) throws Exception{
		return dao9.getPracticeResultStatic(dto);
	}
	public List<PracticesPracticeresultStaticDto> getPracticeResultStaticList(PracticesPracticeresultStaticDto dto) throws Exception{
		return dao9.getPracticeResultStaticList(dto);
	}
	public List<PracticesPracticeresultStaticDto> getPracticeResultStaticHomeworkList(PracticesPracticeresultStaticDto dto) throws Exception{
		return dao9.getPracticeResultStaticHomeworkList(dto);
	}
	public List<PracticesPracticeresultStaticDto> getPracticeResultStaticCourseGroupList(PracticesPracticeresultStaticDto dto) throws Exception{
		return dao9.getPracticeResultStaticCourseGroupList(dto);
	}
	public List<PracticesPracticeresultStaticDto> getPracticeResultStaticCourseEnrollmentDailyList(PracticesPracticeresultStaticDto dto) throws Exception{
		return dao9.getPracticeResultStaticCourseEnrollmentDailyList(dto);
	}
	public List<PracticesPracticeresultStaticDto> getPracticeResultStaticCourseDailyList(PracticesPracticeresultStaticDto dto) throws Exception{
		return dao9.getPracticeResultStaticCourseDailyList(dto);
	}
	public void insertPracticeResultStatic(PracticesPracticeresultStaticDto dto) throws Exception{
		dao9.insertPracticeResultStatic(dto);
	}
	public void updatePracticeResultStatic(PracticesPracticeresultStaticDto dto) throws Exception{
		dao9.updatePracticeResultStatic(dto);
	}
	
	public List<PracticesPracticeproblemDto> getProblemSectionList() throws Exception{
		return dao10.getProblemSectionList();
	}
	public List<PracticesPracticeproblemDto> getProblemBookList(PracticesPracticeproblemDto dto) throws Exception{
		return dao10.getProblemBookList(dto);
	}
	public List<PracticesPracticeproblemDto> getProblemVolumeList(PracticesPracticeproblemDto dto) throws Exception{
		return dao10.getProblemVolumeList(dto);
	}
	
	public List<PracticesPracticeproblemDto> getProblemGroupList(PracticesPracticeproblemDto dto) throws Exception{
		return dao10.getProblemGroupList(dto);
	}

	
	public List<PracticesPracticeproblemDto> getProblemArticleList(PracticesPracticeproblemDto dto) throws Exception{
		return dao10.getProblemArticleList(dto);
	}
	public List<PracticesPracticeproblemDto> getProblemList(PracticesPracticeproblemDto dto) throws Exception{
		return dao10.getProblemList(dto);
	}
	public PracticesPracticeproblemDto getProblem(PracticesPracticeproblemDto dto) throws Exception{
		return dao10.getProblem(dto);
	}
	public void insertProblem(PracticesPracticeproblemDto dto) throws Exception{
		dao10.insertProblem(dto);
	}
	public void updateProblem(PracticesPracticeproblemDto dto) throws Exception{
		dao10.updateProblem(dto);
	}
	public void updateProblemCorrection(PracticesPracticeproblemDto dto) throws Exception{
		dao10.updateProblemCorrection(dto);
	}
	public void deleteProblem(PracticesPracticeproblemDto dto) throws Exception{
		dao10.deleteProblem(dto);
	}
	public PracticesPracticeresultDto getPracticeResult(PracticesPracticeresultDto dto) throws Exception{
		return dao11.getPracticeResult(dto);
	}
	public List<PracticesPracticeresultDto> getDailyPracticeResultList(PracticesPracticeresultDto dto) throws Exception{
		return dao11.getDailyPracticeResultList(dto);
	}
	public List<PracticesPracticeresultDto> getMonthlyPracticeResultList(PracticesPracticeresultDto dto) throws Exception{
		return dao11.getMonthlyPracticeResultList(dto);
	}
	public List<PracticesPracticeresultDto> getIndependentPracticeResultList(PracticesPracticeresultDto dto) throws Exception{
		return dao11.getIndependentPracticeResultList(dto);
	}
	public List<PracticesPracticeresultDto> getPracticeResultAttendList(PracticesPracticeresultDto dto) throws Exception{
		return dao11.getPracticeResultAttendList(dto);
	}
	public List<PracticesPracticeresultDto> getPracticeResultSpeechList(PracticesPracticeresultDto dto) throws Exception{
		return dao11.getPracticeResultSpeechList(dto);
	}
	public List<PracticesPracticeresultDto> getPracticeResultVocaList(PracticesPracticeresultDto dto) throws Exception{
		return dao11.getPracticeResultVocaList(dto);
	}
	public List<PracticesPracticeresultDto> getPracticeResultVocaIntervalList(PracticesPracticeresultDto dto) throws Exception{
		return dao11.getPracticeResultVocaIntervalList(dto);
	}
	public List<PracticesPracticeresultDto> getPracticeResultVocaIntervalCourseGroupList(PracticesPracticeresultDto dto) throws Exception{
		return dao11.getPracticeResultVocaIntervalCourseGroupList(dto);
	}
	public List<PracticesPracticeresultDto> getPracticeResultPraticeTypeList(PracticesPracticeresultDto dto) throws Exception{
		return dao11.getPracticeResultPraticeTypeList(dto);
	}
	public List<PracticesPracticeresultDto> getPracticeResultPraticeTypeMonthlyList(PracticesPracticeresultDto dto) throws Exception{
		return dao11.getPracticeResultPraticeTypeMonthlyList(dto);
	}
	
	public List<PracticesPracticeresultDto> getPracticeResultList(PracticesPracticeresultDto dto) throws Exception{
		return dao11.getPracticeResultList(dto);
	}
	
	public List<PracticesPracticeresultDto> getPracticeResultListAsVoca(PracticesPracticeresultDto dto) throws Exception{
		return dao11.getPracticeResultListAsVoca(dto);
	}
	
	public PracticesPracticeresultDto getPracticeResultMockTestCount(PracticesPracticeresultDto dto) throws Exception{
		return dao11.getPracticeResultMockTestCount(dto);
	}
	public List<PracticesPracticeresultDto> getPracticeResultMockTestList(PracticesPracticeresultDto dto) throws Exception{
		return dao11.getPracticeResultMockTestList(dto);
	}
	public void updatePracticeResultAnswerRublic(PracticesPracticeresultDto dto) throws Exception{
		dao11.updatePracticeResultAnswerRublic(dto);
	}
	public void updatePracticeResultAnswerPen(PracticesPracticeresultDto dto) throws Exception{
		dao11.updatePracticeResultAnswerPen(dto);
	}
	public void updatePracticeResultAnswerSpk(PracticesPracticeresultDto dto) throws Exception{
		dao11.updatePracticeResultAnswerSpk(dto);
	}
	public PracticesPracticescheduleDto getPracticeScheduleAsID(PracticesPracticescheduleDto dto) throws Exception{
		return dao12.getPracticeScheduleAsID(dto);
	}
	
	public List<PracticesPracticescheduleDto> getPracticeScheduleList(PracticesPracticescheduleDto dto) throws Exception{
		return dao12.getPracticeScheduleList(dto);
	}
	public List<PracticesPracticescheduleDto> getPracticeTodayScheduleList(PracticesPracticescheduleDto dto) throws Exception{
		return dao12.getPracticeTodayScheduleList(dto);
	}
	public List<PracticesPracticescheduleDto> getPracticeScheduleOxList(PracticesPracticescheduleDto dto) throws Exception{
		return dao12.getPracticeScheduleOxList(dto);
	}
	public List<PracticesPracticescheduleDto> getPracticeScheduleVocaIntervalPracticeTypeList(PracticesPracticescheduleDto dto) throws Exception{
		return dao12.getPracticeScheduleVocaIntervalPracticeTypeList(dto);
	}
	
	public List<PracticesPracticescheduleDto> getPracticeScheduleVocaIntervalCourseGroupPracticeTypeList1(PracticesPracticescheduleDto dto) throws Exception{
		return dao12.getPracticeScheduleVocaIntervalCourseGroupPracticeTypeList1(dto);
	}

	public List<PracticesPracticescheduleDto> getPracticeScheduleVocaIntervalCourseGroupPracticeTypeList2(PracticesPracticescheduleDto dto) throws Exception{
		return dao12.getPracticeScheduleVocaIntervalCourseGroupPracticeTypeList2(dto);
	}

	public List<PracticesPracticescheduleDto> getPracticeScheduleOxPracticeTypeList(PracticesPracticescheduleDto dto) throws Exception{
		return dao12.getPracticeScheduleOxPracticeTypeList(dto);
	}

	public List<PracticesPracticescheduleDto> getPracticeScheduleArchieveList(PracticesPracticescheduleDto dto) throws Exception{
		return dao12.getPracticeScheduleArchieveList(dto);
	}
	
	public List<PracticesPracticescheduleDto> getPracticeScheduleArchievePracticeTypeList(PracticesPracticescheduleDto dto) throws Exception{
		return dao12.getPracticeScheduleArchievePracticeTypeList(dto);
	}
	public List<PracticesPracticescheduleDto> getPracticeScheduleCourseVocaList(PracticesPracticescheduleDto dto) throws Exception{
		return dao12.getPracticeScheduleCourseVocaList(dto);
	}
	
	public List<PracticesPracticescheduleDto> getPracticeScheduleCoursePracticeTypeList(PracticesPracticescheduleDto dto) throws Exception{
		return dao12.getPracticeScheduleCoursePracticeTypeList(dto);
	}
	public List<PracticesPracticescheduleDto> getPracticeScheduleCoursePracticeTypeMonthlyList(PracticesPracticescheduleDto dto) throws Exception{
		return dao12.getPracticeScheduleCoursePracticeTypeMonthlyList(dto);
	}
	
	public PracticesPracticescheduleDto getPracticeScheduleOxEnrollment(PracticesPracticescheduleDto dto) throws Exception{
		return dao12.getPracticeScheduleOxEnrollment(dto);
	}
	
	public void insertPracticeSchedule(PracticesPracticescheduleDto dto) throws Exception{
		dao12.insertPracticeSchedule(dto);
	}
	public void updatePracticeScheduleParagraph(PracticesPracticescheduleDto dto) throws Exception{
		dao12.updatePracticeScheduleParagraph(dto);
	}
	public void updatePracticeSchedule(PracticesPracticescheduleDto dto) throws Exception{
		dao12.updatePracticeSchedule(dto);
	}
	public void updatePracticeScheduleInterval(PracticesPracticescheduleDto dto) throws Exception{
		dao12.updatePracticeScheduleInterval(dto);
	}
	public void updatePracticeScheduleIntervalCourseGroup(PracticesPracticescheduleDto dto) throws Exception{
		dao12.updatePracticeScheduleIntervalCourseGroup(dto);
	}
	public List<PracticesPracticequizresultDto> getPracticeQuizResultCourseList(PracticesPracticequizresultDto dto) throws Exception{
		return dao13.getPracticeQuizResultCourseList(dto);
	}
	
	public List<PracticesPracticequizresultDto> getPracticeQuizResultDailyList(PracticesPracticequizresultDto dto) throws Exception{
		return dao13.getPracticeQuizResultDailyList(dto);
	}
	public List<PracticesPracticequizresultDto> getPracticeQuizResultMonthlyList(PracticesPracticequizresultDto dto) throws Exception{
		return dao13.getPracticeQuizResultMonthlyList(dto);
	}
	
	public void insertPracticeQuizResult(PracticesPracticequizresultDto dto) throws Exception{
		dao13.insertPracticeQuizResult(dto);
	}
	
	public List<PracticesPracticescheduleHomeworkDto> getPracticeScheduleHomeworkList(PracticesPracticescheduleHomeworkDto dto) throws Exception{
		return dao14.getPracticeScheduleHomeworkList(dto);
	}
	
	public List<PracticesPracticescheduleHomeworkDto> getPracticeScheduleHomeworkSectionList(PracticesPracticescheduleHomeworkDto dto) throws Exception{
		return dao14.getPracticeScheduleHomeworkSectionList(dto);
	}
	public List<PracticesPracticescheduleHomeworkDto> getPracticeScheduleHomeworkPracticeList(PracticesPracticescheduleHomeworkDto dto) throws Exception{
		return dao14.getPracticeScheduleHomeworkPracticeList(dto);
	}
	public List<PracticesPracticescheduleHomeworkDto> getPracticeScheduleHomeworkCourseList(PracticesPracticescheduleHomeworkDto dto) throws Exception{
		return dao14.getPracticeScheduleHomeworkCourseList(dto);
	}
	
	public void insertPracticeScheduleHomework(PracticesPracticescheduleHomeworkDto dto) throws Exception{
		dao14.insertPracticeScheduleHomework(dto);
	}
	public void updatePracticeScheduleHomeworkParagraph(PracticesPracticescheduleHomeworkDto dto) throws Exception{
		dao14.updatePracticeScheduleHomeworkParagraph(dto);
	}
	public void updatePracticeScheduleHomeworkParagraphAsSchedule(PracticesPracticescheduleHomeworkDto dto) throws Exception{
		dao14.updatePracticeScheduleHomeworkParagraphAsSchedule(dto);
	}
	public void updatePracticeScheduleHomework(PracticesPracticescheduleHomeworkDto dto) throws Exception{
		dao14.updatePracticeScheduleHomework(dto);
	}
	public void updatePracticeScheduleHomeworkAsSchedule(PracticesPracticescheduleHomeworkDto dto) throws Exception{
		dao14.updatePracticeScheduleHomeworkAsSchedule(dto);
	}
	
	public PracticesPracticeexceptionDto getPracticeException(PracticesPracticeexceptionDto dto) throws Exception{
		return dao15.getPracticeException(dto);
	}
	public void insertPracticeException(PracticesPracticeexceptionDto dto) throws Exception{
		dao15.insertPracticeException(dto);
	}
	
	public PracticesPracticeproblemBoardDto getPracticeProblemBoard(PracticesPracticeproblemBoardDto dto) throws Exception{
		return dao16.getPracticeProblemBoard(dto);
	}
	public void insertPracticeProblemBoard(PracticesPracticeproblemBoardDto dto) throws Exception{
		dao16.insertPracticeProblemBoard(dto);
	}
	public void updatePracticeProblemBoard(PracticesPracticeproblemBoardDto dto) throws Exception{
		dao16.updatePracticeProblemBoard(dto);
	}
	public void deletePracticeProblemBoard(PracticesPracticeproblemBoardDto dto) throws Exception{
		dao16.deletePracticeProblemBoard(dto);
	}
	
	public void deletePracticeException(PracticesPracticeexceptionDto dto) throws Exception{
		dao15.deletePracticeException(dto);
	}
	public List<PracticesPracticetypeDto> getPracticeTypeList() throws Exception{
		return dao20.getPracticeTypeList();				
	}
	public void insertPracticeType(PracticesPracticetypeDto dto) throws Exception{
		dao20.insertPracticeType(dto);
	}
	public void updatePracticeType(PracticesPracticetypeDto dto) throws Exception{
		dao20.updatePracticeType(dto);
	}
	
	public List<PracticesPracticesectiontypeDto> getPracticeSectionTypeList(PracticesPracticesectiontypeDto dto) throws Exception{
		return dao21.getPracticeSectionTypeList(dto);		
	}
	public PracticesPracticesectiontypeDto getPracticeSectionType(PracticesPracticesectiontypeDto dto) throws Exception{
		return dao21.getPracticeSectionType(dto);
	}
	public void insertPracticeSectionType(PracticesPracticesectiontypeDto dto) throws Exception{
		dao21.insertPracticeSectionType(dto);
	}
	public void updatePracticeSectionType(PracticesPracticesectiontypeDto dto) throws Exception{
		dao21.updatePracticeSectionType(dto);
	}
	public void deletePracticeSectionType(PracticesPracticesectiontypeDto dto) throws Exception{
		dao21.deletePracticeSectionType(dto);
	}
	
	public List<PracticesPracticeresultStaticSendDto> getPracticeResultStaticSendList(PracticesPracticeresultStaticSendDto dto) throws Exception{
		return dao22.getPracticeResultStaticSendList(dto);
	}
	public PracticesPracticeresultStaticSendDto getPracticeResultStaticSend(PracticesPracticeresultStaticSendDto dto) throws Exception{
		return dao22.getPracticeResultStaticSend(dto);
	}
	
	public void insertPracticeResultStaticSend(PracticesPracticeresultStaticSendDto dto) throws Exception{
		dao22.insertPracticeResultStaticSend(dto);
		dao22.insertPracticeResultStaticSendLog(dto);
	}
	public void updatePracticeResultStaticSend(PracticesPracticeresultStaticSendDto dto) throws Exception{
		dao22.updatePracticeResultStaticSend(dto);
		dao22.insertPracticeResultStaticSendLog(dto);
	}
}