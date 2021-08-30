package com.usher.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usher.dao.BatchDirectionDao;
import com.usher.dao.BatchExamGrammarDao;
import com.usher.dao.BatchExamListeningDao;
import com.usher.dao.BatchExamListeningQuestionDao;
import com.usher.dao.BatchExamReadingDao;
import com.usher.dao.BatchExamReadingQuestionDao;
import com.usher.dao.BatchExamToeicDao;
import com.usher.dao.BatchExamToeicImageDao;
import com.usher.dao.BatchExamToeicQuestionDao;
import com.usher.dao.BatchExamsUseranswerDao;
import com.usher.dao.BatchResultDao;
import com.usher.dao.BatchResultSendDao;
import com.usher.dao.BatchScheduleDao;
import com.usher.dao.BatchStatsDao;
import com.usher.dao.BatchVideoDao;
import com.usher.dto.BatchDirectionDto;
import com.usher.dto.BatchExamGrammarDto;
import com.usher.dto.BatchExamListeningDto;
import com.usher.dto.BatchExamListeningQuestionDto;
import com.usher.dto.BatchExamReadingDto;
import com.usher.dto.BatchExamReadingQuestionDto;
import com.usher.dto.BatchExamToeicDto;
import com.usher.dto.BatchExamToeicImageDto;
import com.usher.dto.BatchExamToeicQuestionDto;
import com.usher.dto.BatchExamsUseranswerDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.BatchResultSendDto;
import com.usher.dto.BatchScheduleDto;
import com.usher.dto.BatchStatsDto;
import com.usher.dto.BatchVideoDto;




@Service
public class BatchService{
	@Autowired
	BatchDirectionDao dao1;
	
	@Autowired 
	BatchExamReadingDao dao2;
	
	@Autowired 
	BatchExamReadingQuestionDao dao3;
	
	@Autowired 
	BatchExamGrammarDao dao4;
	
	@Autowired 
	BatchScheduleDao dao5;
	
	@Autowired 
	BatchVideoDao dao6;

	@Autowired 
	BatchResultDao dao7;
	
	@Autowired 
	BatchExamsUseranswerDao dao8;
	
	@Autowired 
	BatchExamListeningDao dao9;
	
	@Autowired 
	BatchExamListeningQuestionDao dao10;
	
	@Autowired 
	BatchStatsDao dao11;
	
	@Autowired 
	BatchResultSendDao dao12;
	
	@Autowired 
	BatchExamToeicDao dao13;
	
	@Autowired 
	BatchExamToeicImageDao dao14;
	
	@Autowired 
	BatchExamToeicQuestionDao dao15;
	
	public BatchDirectionDto getBatchDirection(BatchDirectionDto dto) throws Exception{
		return dao1.getBatchDirection(dto);
	}
	
	public void insertBatchDirection(BatchDirectionDto dto) throws Exception{
		dao1.insertBatchDirection(dto);
	}
	
	public void updateBatchDirection(BatchDirectionDto dto) throws Exception{
		dao1.updateBatchDirection(dto);
	}
	
	public List<BatchExamReadingDto> getBatchExamReadingNumList(BatchExamReadingDto dto) throws Exception{
		return dao2.getBatchExamReadingNumList(dto);
	}
	
	public BatchExamReadingDto getBatchExamReadingNum(BatchExamReadingDto dto) throws Exception{
		return dao2.getBatchExamReadingNum(dto);
	}
	public List<BatchExamReadingDto> getBatchExamReadingList(BatchExamReadingDto dto) throws Exception{
		return dao2.getBatchExamReadingList(dto);
	}
	public BatchExamReadingDto getBatchExamReading(BatchExamReadingDto dto) throws Exception{
		return dao2.getBatchExamReading(dto);
	}
	
	public void insertBatchExamReading(BatchExamReadingDto dto) throws Exception{
		dao2.insertBatchExamReading(dto);
	}
	
	public void updateBatchExamReading(BatchExamReadingDto dto) throws Exception{
		dao2.updateBatchExamReading(dto);
	}
	
	public List<BatchExamReadingQuestionDto> getBatchExamReadingQuestionList(BatchExamReadingQuestionDto dto) throws Exception{
		return dao3.getBatchExamReadingQuestionList(dto);
	}
	public BatchExamReadingQuestionDto getBatchExamReadingQuestion(BatchExamReadingQuestionDto dto) throws Exception{
		return dao3.getBatchExamReadingQuestion(dto);
	}
	
	public void insertBatchExamReadingQuestion(BatchExamReadingQuestionDto dto) throws Exception{
		dao3.insertBatchExamReadingQuestion(dto);
	}
	
	public void updateBatchExamReadingQuestion(BatchExamReadingQuestionDto dto) throws Exception{
		dao3.updateBatchExamReadingQuestion(dto);
	}
	
	public List<BatchExamGrammarDto> getBatchExamGrammarNumList(BatchExamGrammarDto dto) throws Exception{
		return dao4.getBatchExamGrammarNumList(dto);
	}
	
	public List<BatchExamGrammarDto> getBatchExamGrammarQuestionList(BatchExamGrammarDto dto) throws Exception{
		return dao4.getBatchExamGrammarQuestionList(dto);
	}
	
	public BatchExamGrammarDto getBatchExamGrammarNum(BatchExamGrammarDto dto) throws Exception{
		return dao4.getBatchExamGrammarNum(dto);
	}
	
	public BatchExamGrammarDto getBatchExamGrammarQuestionNum(BatchExamGrammarDto dto) throws Exception{
		return dao4.getBatchExamGrammarQuestionNum(dto);
	}
	
	public List<BatchExamGrammarDto> getBatchExamGrammarList(BatchExamGrammarDto dto) throws Exception{
		return dao4.getBatchExamGrammarList(dto);
	}
	public BatchExamGrammarDto getBatchExamGrammar(BatchExamGrammarDto dto) throws Exception{
		return dao4.getBatchExamGrammar(dto);
	}
	
	public void insertBatchExamGrammar(BatchExamGrammarDto dto) throws Exception{
		dao4.insertBatchExamGrammar(dto);
	}
	
	public void updateBatchExamGrammar(BatchExamGrammarDto dto) throws Exception{
		dao4.updateBatchExamGrammar(dto);
	}
	
	public List<BatchScheduleDto> getBatchScheduleMonthlyList(BatchScheduleDto dto) throws Exception{
		return dao5.getBatchScheduleMonthlyList(dto);
	}
	
	
	public BatchScheduleDto getBatchSchedule(BatchScheduleDto dto) throws Exception{
		return dao5.getBatchSchedule(dto);
	}
	
	public List<BatchScheduleDto> getBatchScheduleAsDate(BatchScheduleDto dto) throws Exception{
		return dao5.getBatchScheduleAsDate(dto);
	}
	
	public void insertBatchSchedule(BatchScheduleDto dto) throws Exception{
		dao5.insertBatchSchedule(dto);
	}
	
	public void updateBatchSchedule(BatchScheduleDto dto) throws Exception{
		dao5.updateBatchSchedule(dto);
	}
	
	public void updateBatchScheduleAdvise(BatchScheduleDto dto) throws Exception{
		dao5.updateBatchScheduleAdvise(dto);
	}
	public List<BatchVideoDto> getBatchVideoList(BatchVideoDto dto) throws Exception{
		return dao6.getBatchVideoList(dto);
	}
	
	public BatchVideoDto getBatchVideo(BatchVideoDto dto) throws Exception{
		return dao6.getBatchVideo(dto);
	}
	
	public void insertBatchVideo(BatchVideoDto dto) throws Exception{
		dao6.insertBatchVideo(dto);
	}
	
	public void updateBatchVideo(BatchVideoDto dto) throws Exception{
		dao6.updateBatchVideo(dto);
	}
	
	public void deleteBatchVideo(BatchVideoDto dto) throws Exception{
		dao6.deleteBatchVideo(dto);
	}
	
	public List<BatchResultDto> getBatchResultUserOnlyList(BatchResultDto dto) throws Exception{
		return dao7.getBatchResultUserOnlyList(dto);
	}
	public List<BatchResultDto> getBatchResultCountList(BatchResultDto dto) throws Exception{
		return dao7.getBatchResultCountList(dto);
	}
	
	public List<BatchResultDto> getBatchResultList(BatchResultDto dto) throws Exception{
		return dao7.getBatchResultList(dto);
		
	}
	public List<BatchResultDto> getBatchResultUserList(BatchResultDto dto) throws Exception{
		return dao7.getBatchResultUserList(dto);
	}
	public List<BatchResultDto> getBatchResultUserMultiList(BatchResultDto dto) throws Exception{
		return dao7.getBatchResultUserMultiList(dto);
	}
	public List<BatchResultDto> getBatchResultCourseGroupList(BatchResultDto dto) throws Exception{
		return dao7.getBatchResultCourseGroupList(dto);
		
	}
	public List<BatchResultDto> getBatchResultCourseList(BatchResultDto dto) throws Exception{
		return dao7.getBatchResultCourseList(dto);
	}
	public BatchResultDto getBatchResult(BatchResultDto dto) throws Exception{
		return dao7.getBatchResult(dto);
	}
	
	public BatchResultDto getBatchResultAsID(BatchResultDto dto) throws Exception{
		return dao7.getBatchResultAsID(dto);
	}
	
	public BatchResultDto getBatchResultUserAsAdvice(BatchResultDto dto) throws Exception{
		return dao7.getBatchResultUserAsAdvice(dto);
	}
	public BatchResultDto getBatchResultUserAsNotAdvice(BatchResultDto dto) throws Exception{
		return dao7.getBatchResultUserAsNotAdvice(dto);
	}
	
	public void updateBatchResultAdviserAdvice(BatchResultDto dto) throws Exception{
		dao7.insertBatchResultLog(dto);
		dao7.updateBatchResultAdviserAdvice(dto);
	}
	
	public void updateBatchResultAdviserCourse(BatchResultDto dto) throws Exception{
		dao7.insertBatchResultLog(dto);
		dao7.updateBatchResultAdviserCourse(dto);
	}
	
	public void updateBatchResultAdviserRegister(BatchResultDto dto) throws Exception{
		dao7.insertBatchResultLog(dto);
		dao7.updateBatchResultAdviserRegister(dto);
		dao7.updateBatchResultAttendDate(dto);
	}
	
	public void updateBatchResultDeskRegister(BatchResultDto dto) throws Exception{
		dao7.insertBatchResultLog(dto);
		dao7.updateBatchResultDeskRegister(dto);
		dao7.updateBatchResultAttendDate(dto);
	}

	public void updateBatchResultFinallyNotRegister(BatchResultDto dto) throws Exception{
		dao7.insertBatchResultLog(dto);
		dao7.updateBatchResultFinallyNotRegister(dto);
	}
	public void updateBatchResultFinallyNotRegisterAsId(BatchResultDto dto) throws Exception{
		dao7.updateBatchResultFinallyNotRegisterAsId(dto);
	}
	public void updateBatchResultSendKaKaoBefore(BatchResultDto dto) throws Exception{
		dao7.updateBatchResultSendKaKaoBefore(dto);
	}
	public void updateBatchResultSendKaKaoCurrent(BatchResultDto dto) throws Exception{
		dao7.updateBatchResultSendKaKaoCurrent(dto);
	}
	public void updateBatchResultSendPhone(BatchResultDto dto) throws Exception{
		dao7.updateBatchResultSendPhone(dto);
	}
	
	public BatchExamsUseranswerDto getBatchExamsUseranswer(BatchExamsUseranswerDto dto) throws Exception{
		return dao8.getBatchExamsUseranswer(dto);
	}
	
	public List<BatchExamListeningDto> getBatchExamListeningList(BatchExamListeningDto dto) throws Exception{
		return dao9.getBatchExamListeningList(dto);
	}
	public BatchExamListeningDto getBatchExamListening(BatchExamListeningDto dto) throws Exception{
		return dao9.getBatchExamListening(dto);
	}
	public void insertBatchExamListening(BatchExamListeningDto dto) throws Exception{
		dao9.insertBatchExamListening(dto);
	}
	public void updateBatchExamListening(BatchExamListeningDto dto) throws Exception{
		dao9.updateBatchExamListening(dto);
	}
	
	public List<BatchExamListeningQuestionDto> getBatchExamListeningQuestionList(BatchExamListeningQuestionDto dto) throws Exception{
		return dao10.getBatchExamListeningQuestionList(dto);
	}
	public BatchExamListeningQuestionDto getBatchExamListeningQuestion(BatchExamListeningQuestionDto dto) throws Exception{
		return dao10.getBatchExamListeningQuestion(dto);
	}
	public BatchExamListeningQuestionDto getBatchExamListeningQuestionNum(BatchExamListeningQuestionDto dto) throws Exception{
		return dao10.getBatchExamListeningQuestionNum(dto);
	}
	public void insertBatchExamListeningQuestion(BatchExamListeningQuestionDto dto) throws Exception{
		dao10.insertBatchExamListeningQuestion(dto);
	}
	public void updateBatchExamListeningQuestion(BatchExamListeningQuestionDto dto) throws Exception{
		dao10.updateBatchExamListeningQuestion(dto);
	}
	public void deleteBatchExamListeningQuestion(BatchExamListeningQuestionDto dto) throws Exception{
		dao10.deleteBatchExamListeningQuestion(dto);
	}
	
	public List<BatchStatsDto> getBatchStatsExamMonthList() throws Exception{
		return dao11.getBatchStatsExamMonthList();
	}
	public List<BatchStatsDto> getBatchStatsMonthlyList(BatchStatsDto dto) throws Exception{
		return dao11.getBatchStatsMonthlyList(dto);
	}
	public List<BatchStatsDto> getBatchStatsDailyList(BatchStatsDto dto) throws Exception{
		return dao11.getBatchStatsDailyList(dto);
	}
	public List<BatchStatsDto> getBatchStatsList(BatchStatsDto dto) throws Exception{
		return dao11.getBatchStatsList(dto);
	}
	public List<BatchStatsDto> getBatchStatsCourseNewList(BatchStatsDto dto) throws Exception{
		return dao11.getBatchStatsCourseNewList(dto);
	}
	public List<BatchStatsDto> getBatchStatsCourseNewSpecialList(BatchStatsDto dto) throws Exception{
		return dao11.getBatchStatsCourseNewSpecialList(dto);
	}
	public List<BatchStatsDto> getBatchStatsEnrollmentNewList(BatchStatsDto dto) throws Exception{
		return dao11.getBatchStatsEnrollmentNewList(dto);
	}
	public List<BatchStatsDto> getBatchStatsCourseExistsList(BatchStatsDto dto) throws Exception{
		return dao11.getBatchStatsCourseExistsList(dto);
	}
	public List<BatchStatsDto> getBatchStatsCourseExistsSpecialList(BatchStatsDto dto) throws Exception{
		return dao11.getBatchStatsCourseExistsSpecialList(dto);
	}
	public List<BatchStatsDto> getBatchStatsNewList(BatchStatsDto dto) throws Exception{
		return dao11.getBatchStatsNewList(dto);
	}
	public List<BatchStatsDto> getBatchStatsResultList(BatchStatsDto dto) throws Exception{
		return dao11.getBatchStatsResultList(dto);
	}
	public List<BatchStatsDto> getBatchStatsPrepareList(BatchStatsDto dto) throws Exception{
		return dao11.getBatchStatsPrepareList(dto);
	}
	public List<BatchStatsDto> getBatchStatsAdviserCountList(BatchStatsDto dto) throws Exception{
		return dao11.getBatchStatsAdviserCountList(dto);
	}
	public List<BatchResultSendDto> getBatchResultSendList(BatchResultSendDto dto) throws Exception{
		return dao12.getBatchResultSendList(dto);
	}
	public void insertBatchResultSend(BatchResultSendDto dto) throws Exception{
		dao12.insertBatchResultSend(dto);
	}
	
	public List<BatchExamToeicDto> getBatchExamToeicNumList(BatchExamToeicDto dto) throws Exception{
		return dao13.getBatchExamToeicNumList(dto);
	}
	public BatchExamToeicDto getBatchExamToeic(BatchExamToeicDto dto) throws Exception{
		return dao13.getBatchExamToeic(dto);
	}
	public BatchExamToeicDto getBatchExamToeicMaxNum(BatchExamToeicDto dto) throws Exception{
		return dao13.getBatchExamToeicMaxNum(dto);
	}
	public void insertBatchExamToeic(BatchExamToeicDto dto) throws Exception{
		dao13.insertBatchExamToeic(dto);
	}
	public void updateBatchExamToeic(BatchExamToeicDto dto) throws Exception{
		dao13.updateBatchExamToeic(dto);
	}
	public void deleteBatchExamToeicImage(BatchExamToeicDto dto) throws Exception{
		dao13.deleteBatchExamToeicImage(dto);
	}
	public void deleteBatchExamToeicQuestion(BatchExamToeicDto dto) throws Exception{
		dao13.deleteBatchExamToeicQuestion(dto);
	}
	
	public List<BatchExamToeicImageDto> getBatchExamToeicImageList(BatchExamToeicImageDto dto) throws Exception{
		return dao14.getBatchExamToeicImageList(dto);
	}
	public void insertBatchExamToeicImage(BatchExamToeicImageDto dto) throws Exception{
		dao14.insertBatchExamToeicImage(dto);
	}
	
	public List<BatchExamToeicQuestionDto> getBatchExamToeicQuestionList(BatchExamToeicQuestionDto dto) throws Exception{
		return dao15.getBatchExamToeicQuestionList(dto);
	}
	public void insertBatchExamToeicQuestion(BatchExamToeicQuestionDto dto) throws Exception{
		dao15.insertBatchExamToeicQuestion(dto);
	}
}