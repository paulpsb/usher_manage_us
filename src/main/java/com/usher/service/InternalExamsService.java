package com.usher.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usher.dao.InternalExamsAnswerDao;
import com.usher.dao.InternalExamsChainDao;
import com.usher.dao.InternalExamsDictationDao;
import com.usher.dao.InternalExamsDuolingoBlankDao;
import com.usher.dao.InternalExamsDuolingoBlankQuestionDao;
import com.usher.dao.InternalExamsDuolingoDescribeDao;
import com.usher.dao.InternalExamsDuolingoDescribeQuestionDao;
import com.usher.dao.InternalExamsDuolingoImageDao;
import com.usher.dao.InternalExamsDuolingoSentenceDao;
import com.usher.dao.InternalExamsDuolingoVocaDao;
import com.usher.dao.InternalExamsDuolingoVocaLangDao;
import com.usher.dao.InternalExamsGrammarDao;
import com.usher.dao.InternalExamsListeningDao;
import com.usher.dao.InternalExamsListeningQuestionDao;
import com.usher.dao.InternalExamsMemorizationDao;
import com.usher.dao.InternalExamsMemorizationQuestionDao;
import com.usher.dao.InternalExamsPassageDao;
import com.usher.dao.InternalExamsPassagePhraseDao;
import com.usher.dao.InternalExamsPassageVocaDao;
import com.usher.dao.InternalExamsProblemDao;
import com.usher.dao.InternalExamsReadingDao;
import com.usher.dao.InternalExamsReadingQuestionDao;
import com.usher.dao.InternalExamsSpeakingDao;
import com.usher.dao.InternalExamsSttDao;
import com.usher.dao.InternalExamsTypingDao;
import com.usher.dao.InternalExamsUseranswerCommentDao;
import com.usher.dao.InternalExamsUseranswerDao;
import com.usher.dao.InternalExamsUseranswerNoteDao;
import com.usher.dao.InternalExamsUseranswerRubricDao;
import com.usher.dao.InternalExamsVocaspeechpartDao;
import com.usher.dao.InternalExamsVocawordDao;
import com.usher.dao.InternalExamsWritingDao;
import com.usher.dto.InternalExamsAnswerDto;
import com.usher.dto.InternalExamsChainDto;
import com.usher.dto.InternalExamsDictationDto;
import com.usher.dto.InternalExamsDuolingoBlankDto;
import com.usher.dto.InternalExamsDuolingoBlankQuestionDto;
import com.usher.dto.InternalExamsDuolingoDescribeDto;
import com.usher.dto.InternalExamsDuolingoDescribeQuestionDto;
import com.usher.dto.InternalExamsDuolingoImageDto;
import com.usher.dto.InternalExamsDuolingoSentenceDto;
import com.usher.dto.InternalExamsDuolingoVocaDto;
import com.usher.dto.InternalExamsDuolingoVocaLangDto;
import com.usher.dto.InternalExamsGrammarDto;
import com.usher.dto.InternalExamsListeningDto;
import com.usher.dto.InternalExamsListeningQuestionDto;
import com.usher.dto.InternalExamsMemorizationDto;
import com.usher.dto.InternalExamsMemorizationQuestionDto;
import com.usher.dto.InternalExamsPassageDto;
import com.usher.dto.InternalExamsPassagePhraseDto;
import com.usher.dto.InternalExamsPassageVocaDto;
import com.usher.dto.InternalExamsProblemDto;
import com.usher.dto.InternalExamsReadingDto;
import com.usher.dto.InternalExamsReadingQuestionDto;
import com.usher.dto.InternalExamsSpeakingDto;
import com.usher.dto.InternalExamsSttDto;
import com.usher.dto.InternalExamsTypingDto;
import com.usher.dto.InternalExamsUseranswerCommentDto;
import com.usher.dto.InternalExamsUseranswerDto;
import com.usher.dto.InternalExamsUseranswerNoteDto;
import com.usher.dto.InternalExamsUseranswerRubricDto;
import com.usher.dto.InternalExamsVocaspeechpartDto;
import com.usher.dto.InternalExamsVocawordDto;
import com.usher.dto.InternalExamsWritingDto;
@Service
public class InternalExamsService{
	@Autowired
	InternalExamsProblemDao dao0;
	
	@Autowired
	InternalExamsVocawordDao dao1;
	
	@Autowired
	InternalExamsVocaspeechpartDao dao2;
	
	@Autowired
	InternalExamsPassageDao dao3;

	@Autowired
	InternalExamsPassagePhraseDao dao4;

	@Autowired
	InternalExamsPassageVocaDao dao5;

	@Autowired
	InternalExamsListeningDao dao6;

	@Autowired
	InternalExamsListeningQuestionDao dao7;
	
	@Autowired
	InternalExamsChainDao dao8;
	
	@Autowired
	InternalExamsReadingDao dao9;

	@Autowired
	InternalExamsReadingQuestionDao dao10;
	
	@Autowired
	InternalExamsSpeakingDao dao11;
	
	@Autowired
	InternalExamsWritingDao dao12;
	
	@Autowired
	InternalExamsGrammarDao dao13;
	
	@Autowired
	InternalExamsTypingDao dao14;
	
	@Autowired
	InternalExamsDictationDao dao15;
	
	@Autowired
	InternalExamsAnswerDao dao21;
	
	@Autowired
	InternalExamsUseranswerDao dao22;

	@Autowired
	InternalExamsUseranswerCommentDao dao23;

	@Autowired
	InternalExamsUseranswerRubricDao dao24;

	@Autowired
	InternalExamsUseranswerNoteDao dao25;

	@Autowired
	InternalExamsMemorizationDao dao26;
	
	@Autowired
	InternalExamsMemorizationQuestionDao dao27;
	
	@Autowired
	InternalExamsSttDao dao28;
	
	@Autowired
	InternalExamsDuolingoVocaLangDao dao31;
	
	@Autowired
	InternalExamsDuolingoVocaDao dao32;
	
	@Autowired
	InternalExamsDuolingoSentenceDao dao33;
	
	@Autowired
	InternalExamsDuolingoBlankDao dao34;
	
	@Autowired
	InternalExamsDuolingoBlankQuestionDao dao35;
	
	@Autowired
	InternalExamsDuolingoImageDao dao36;

	@Autowired
	InternalExamsDuolingoDescribeDao dao37;
	
	@Autowired
	InternalExamsDuolingoDescribeQuestionDao dao38;
	
	public void updateExamsProblemPractice(InternalExamsProblemDto dto) throws Exception{
		dao0.updateExamsProblemPractice(dto);
		dao0.updateExamsProblemPassage(dto);
		dao0.updateExamsProblemChain(dto);
		dao0.updateExamsProblemListening(dto);
		dao0.updateExamsProblemReading(dto);
	}

	public void updateExamsProblemExam(InternalExamsProblemDto dto) throws Exception{
		dao0.updateExamsProblemPassage(dto);
		dao0.updateExamsProblemChain(dto);
		dao0.updateExamsProblemListening(dto);
		dao0.updateExamsProblemReading(dto);
	}
	
	public List<InternalExamsVocawordDto> getVocaWordBookList() throws Exception{
		return dao1.getVocaWordBookList();
	}
	public List<InternalExamsVocawordDto> getVocaWordDayList(InternalExamsVocawordDto dto) throws Exception{
		return dao1.getVocaWordDayList(dto);
	}
	public InternalExamsVocawordDto getVocaWordCount(InternalExamsVocawordDto dto) throws Exception{
		return dao1.getVocaWordCount(dto);
	}
	public List<InternalExamsVocawordDto> getVocaWordList(InternalExamsVocawordDto dto) throws Exception{
		return dao1.getVocaWordList(dto);
	}
	public InternalExamsVocawordDto getVocaWord(InternalExamsVocawordDto dto) throws Exception{
		return dao1.getVocaWord(dto);
	}
	
	public InternalExamsVocawordDto getVocaWordSpeechPartCount(InternalExamsVocawordDto dto) throws Exception{
		return dao1.getVocaWordSpeechPartCount(dto);
	}
	public void updateVocaWord(InternalExamsVocawordDto dto) throws Exception{
		dao1.updateVocaWord(dto);
	}
	public void updateVocaWordSpeechDifficulty(InternalExamsVocawordDto dto) throws Exception{
		dao1.updateVocaWordSpeechDifficulty(dto);
	}
	public void updateVocaWordSpeechException(InternalExamsVocawordDto dto) throws Exception{
		dao1.updateVocaWordSpeechException(dto);
	}
	public List<InternalExamsVocaspeechpartDto> getVocaSpeechPartList(InternalExamsVocaspeechpartDto dto) throws Exception{
		return dao2.getVocaSpeechPartList(dto);
	}
	public List<InternalExamsVocaspeechpartDto> getVocaSpeechPart(InternalExamsVocaspeechpartDto dto) throws Exception{
		return dao2.getVocaSpeechPart(dto);
	}
	public void insertVocaWordspeechpart(InternalExamsVocaspeechpartDto dto) throws Exception{
		dao2.insertVocaWordspeechpart(dto);
	}
	public void updateVocaWordspeechpart(InternalExamsVocaspeechpartDto dto) throws Exception{
		dao2.updateVocaWordspeechpart(dto);
	}
	public void deleteVocaWordspeechpart(InternalExamsVocaspeechpartDto dto) throws Exception{
		dao2.deleteVocaWordspeechpart(dto);
	}
	
	public InternalExamsPassageDto getPassageCount(InternalExamsPassageDto dto) throws Exception{
		return dao3.getPassageCount(dto);
	}
	public List<InternalExamsPassageDto> getPassageList(InternalExamsPassageDto dto) throws Exception{
		return dao3.getPassageList(dto);
	}
	public InternalExamsPassageDto getPassage(InternalExamsPassageDto dto) throws Exception{
		return dao3.getPassage(dto);
	}
	public void insertPassage(InternalExamsPassageDto dto) throws Exception{
		dao3.insertPassage(dto);
	}
	public void updatePassage(InternalExamsPassageDto dto) throws Exception{
		dao3.updatePassage(dto);
	}
	public void deletePassage(InternalExamsPassageDto dto) throws Exception{
		dao3.deletePassage(dto);
	}
	public void deletePassagePhraseAll(InternalExamsPassageDto dto) throws Exception{
		dao3.deletePassagePhraseAll(dto);
	}
	public void deletePassageVocaAll(InternalExamsPassageDto dto) throws Exception{
		dao3.deletePassageVocaAll(dto);
	}
	public List<InternalExamsPassagePhraseDto> getPassagePhraseList(InternalExamsPassagePhraseDto dto) throws Exception{
		return dao4.getPassagePhraseList(dto);
	}
	public void insertPassagePhrase(InternalExamsPassagePhraseDto dto) throws Exception{
		dao4.insertPassagePhrase(dto);
	}
	public void updatePassagePhrase(InternalExamsPassagePhraseDto dto) throws Exception{
		dao4.updatePassagePhrase(dto);
	}
	public void deletePassagePhrase(InternalExamsPassagePhraseDto dto) throws Exception{
		dao4.deletePassagePhrase(dto);
	}
	public List<InternalExamsPassageVocaDto> getPassageVocaList(InternalExamsPassageVocaDto dto) throws Exception{
		return dao5.getPassageVocaList(dto);
	}
	public void insertPassageVoca(InternalExamsPassageVocaDto dto) throws Exception{
		dao5.insertPassageVoca(dto);
	}
	public void updatePassageVoca(InternalExamsPassageVocaDto dto) throws Exception{
		dao5.updatePassageVoca(dto);
	}
	public void deletePassageVoca(InternalExamsPassageVocaDto dto) throws Exception{
		dao5.deletePassageVoca(dto);
	}
	public InternalExamsListeningDto getInternalExamsListeningCount(InternalExamsListeningDto dto) throws Exception{
		return dao6.getInternalExamsListeningCount(dto);
	}
	public List<InternalExamsListeningDto> getInternalExamsListeningList(InternalExamsListeningDto dto) throws Exception{
		return dao6.getInternalExamsListeningList(dto);
	}
	public InternalExamsListeningDto getInternalExamsListening(InternalExamsListeningDto dto) throws Exception{
		return dao6.getInternalExamsListening(dto);
	}
	public InternalExamsListeningDto getInternalExamsListeningOne(InternalExamsListeningDto dto) throws Exception{
		return dao6.getInternalExamsListeningOne(dto);
	}
	public void insertInternalExamsListening(InternalExamsListeningDto dto) throws Exception{
		dao6.insertInternalExamsListening(dto);
	}
	public void updateInternalExamsListening(InternalExamsListeningDto dto) throws Exception{
		dao6.updateInternalExamsListening(dto);
	}
	public void deleteInternalExamsListening(InternalExamsListeningDto dto) throws Exception{
		dao6.deleteInternalExamsListening(dto);
	}
	public void deleteInternalExamsListeningQuestionAll(InternalExamsListeningDto dto) throws Exception{
		dao6.deleteInternalExamsListeningQuestionAll(dto);
	}
	public List<InternalExamsListeningQuestionDto> getExamsListeningQuestionList(InternalExamsListeningQuestionDto dto) throws Exception{
		return dao7.getExamsListeningQuestionList(dto);
	}
	public InternalExamsListeningQuestionDto getExamsListeningQuestion(InternalExamsListeningQuestionDto dto) throws Exception{
		return dao7.getExamsListeningQuestion(dto);
	}
	public InternalExamsListeningQuestionDto getExamsListeningQuestionNum(InternalExamsListeningQuestionDto dto) throws Exception{
		return dao7.getExamsListeningQuestionNum(dto);
	}
	public InternalExamsListeningQuestionDto getExamsListeningQuestionReview(InternalExamsListeningQuestionDto dto) throws Exception{
		return dao7.getExamsListeningQuestionReview(dto);
	}
	public List<InternalExamsListeningQuestionDto> getExamsListeningQuestionCourseList(InternalExamsListeningQuestionDto dto) throws Exception{
		return dao7.getExamsListeningQuestionCourseList(dto);
	}
	public void insertExamsListeningQuestion(InternalExamsListeningQuestionDto dto) throws Exception{
		dao7.insertExamsListeningQuestion(dto);
	}
	public void updateExamsListeningQuestion(InternalExamsListeningQuestionDto dto) throws Exception{
		dao7.updateExamsListeningQuestion(dto);
	}
	public void deleteExamsListeningQuestion(InternalExamsListeningQuestionDto dto) throws Exception{
		dao7.deleteExamsListeningQuestion(dto);
	}
	
	public InternalExamsChainDto getChainCount(InternalExamsChainDto dto) throws Exception{
		return dao8.getChainCount(dto);
	}
	public List<InternalExamsChainDto> getChainList(InternalExamsChainDto dto) throws Exception{
		return dao8.getChainList(dto);
	}
	public InternalExamsChainDto getChain(InternalExamsChainDto dto) throws Exception{
		return dao8.getChain(dto);
	}
	public InternalExamsChainDto getChainOne(InternalExamsChainDto dto) throws Exception{
		return dao8.getChainOne(dto);
	}
	public void insertChain(InternalExamsChainDto dto) throws Exception{
		dao8.insertChain(dto);
	}
	public void updateChain(InternalExamsChainDto dto) throws Exception{
		dao8.updateChain(dto);
	}
	public void updateChainContent(InternalExamsChainDto dto) throws Exception{
		dao8.updateChainContent(dto);
	}
	public void updateChainAnswer(InternalExamsChainDto dto) throws Exception{
		dao8.updateChainAnswer(dto);
	}

	public void deleteChain(InternalExamsChainDto dto) throws Exception{
		dao8.deleteChain(dto);
	}
	
	public InternalExamsReadingDto getInternalExamsReadingCount(InternalExamsReadingDto dto) throws Exception{
		return dao9.getInternalExamsReadingCount(dto);
	}
	public List<InternalExamsReadingDto> getInternalExamsReadingList(InternalExamsReadingDto dto) throws Exception{
		return dao9.getInternalExamsReadingList(dto);
	}
	public InternalExamsReadingDto getInternalExamsReading(InternalExamsReadingDto dto) throws Exception{
		return dao9.getInternalExamsReading(dto);
	}
	public InternalExamsReadingDto getInternalExamsReadingOne(InternalExamsReadingDto dto) throws Exception{
		return dao9.getInternalExamsReadingOne(dto);
	}
	public void insertInternalExamsReading(InternalExamsReadingDto dto) throws Exception{
		dao9.insertInternalExamsReading(dto);
	}
	public void updateInternalExamsReading(InternalExamsReadingDto dto) throws Exception{
		dao9.updateInternalExamsReading(dto);
	}
	public void deleteInternalExamsReading(InternalExamsReadingDto dto) throws Exception{
		dao9.deleteInternalExamsReading(dto);
	}
	public void deleteInternalExamsReadingQuestionAll(InternalExamsReadingDto dto) throws Exception{
		dao9.deleteInternalExamsReadingQuestionAll(dto);
	}
	public List<InternalExamsReadingQuestionDto> getExamsReadingQuestionList(InternalExamsReadingQuestionDto dto) throws Exception{
		return dao10.getExamsReadingQuestionList(dto);
	}
	public InternalExamsReadingQuestionDto getExamsReadingQuestion(InternalExamsReadingQuestionDto dto) throws Exception{
		return dao10.getExamsReadingQuestion(dto);
	}
	public InternalExamsReadingQuestionDto getExamsReadingQuestionNum(InternalExamsReadingQuestionDto dto) throws Exception{
		return dao10.getExamsReadingQuestionNum(dto);
	}
	public InternalExamsReadingQuestionDto getExamsReadingQuestionReview(InternalExamsReadingQuestionDto dto) throws Exception{
		return dao10.getExamsReadingQuestionReview(dto);
	}
	public List<InternalExamsReadingQuestionDto> getExamsReadingQuestionCourseList(InternalExamsReadingQuestionDto dto) throws Exception{
		return dao10.getExamsReadingQuestionCourseList(dto);
	}
	public void insertExamsReadingQuestion(InternalExamsReadingQuestionDto dto) throws Exception{
		dao10.insertExamsReadingQuestion(dto);
	}
	public void updateExamsReadingQuestion(InternalExamsReadingQuestionDto dto) throws Exception{
		dao10.updateExamsReadingQuestion(dto);
	}
	public void deleteExamsReadingQuestion(InternalExamsReadingQuestionDto dto) throws Exception{
		dao10.deleteExamsReadingQuestion(dto);
	}
	public InternalExamsSpeakingDto getInternalExamsSpeakingCount(InternalExamsSpeakingDto dto) throws Exception{
		return dao11.getInternalExamsSpeakingCount(dto);
	}
	public List<InternalExamsSpeakingDto> getInternalExamsSpeakingList(InternalExamsSpeakingDto dto) throws Exception{
		return dao11.getInternalExamsSpeakingList(dto);
	}
	
	public List<InternalExamsSpeakingDto> getInternalExamsSpeakingExcelList(InternalExamsSpeakingDto dto) throws Exception{
		return dao11.getInternalExamsSpeakingExcelList(dto);
	}
	
	public InternalExamsSpeakingDto getInternalExamsSpeaking(InternalExamsSpeakingDto dto) throws Exception{
		return dao11.getInternalExamsSpeaking(dto);
	}
	public InternalExamsSpeakingDto getInternalExamsSpeakingAsArticle(InternalExamsSpeakingDto dto) throws Exception{
		return dao11.getInternalExamsSpeakingAsArticle(dto);
	}
	public void insertInternalExamsSpeaking(InternalExamsSpeakingDto dto) throws Exception{
		dao11.insertInternalExamsSpeaking(dto);
	}
	public void updateInternalExamsSpeaking(InternalExamsSpeakingDto dto) throws Exception{
		dao11.updateInternalExamsSpeaking(dto);
	}
	public void deleteInternalExamsSpeaking(InternalExamsSpeakingDto dto) throws Exception{
		dao11.deleteInternalExamsSpeaking(dto);
	}
	public InternalExamsWritingDto getInternalExamsWritingCount(InternalExamsWritingDto dto) throws Exception{
		return dao12.getInternalExamsWritingCount(dto);
	}
	public List<InternalExamsWritingDto> getInternalExamsWritingList(InternalExamsWritingDto dto) throws Exception{
		return dao12.getInternalExamsWritingList(dto);
	}
	
	public List<InternalExamsWritingDto> getInternalExamsWritingExcelList(InternalExamsWritingDto dto) throws Exception{
		return dao12.getInternalExamsWritingExcelList(dto);
	}
	
	public InternalExamsWritingDto getInternalExamsWriting(InternalExamsWritingDto dto) throws Exception{
		return dao12.getInternalExamsWriting(dto);
	}
	public InternalExamsWritingDto getInternalExamsWritingAsArticle(InternalExamsWritingDto dto) throws Exception{
		return dao12.getInternalExamsWritingAsArticle(dto);
	}
	public void insertInternalExamsWriting(InternalExamsWritingDto dto) throws Exception{
		dao12.insertInternalExamsWriting(dto);
	}
	public void updateInternalExamsWriting(InternalExamsWritingDto dto) throws Exception{
		dao12.updateInternalExamsWriting(dto);
	}
	public void deleteInternalExamsWriting(InternalExamsWritingDto dto) throws Exception{
		dao12.deleteInternalExamsWriting(dto);
	}	
	
	public List<InternalExamsGrammarDto> getExamsGrammarList(InternalExamsGrammarDto dto) throws Exception{
		return dao13.getExamsGrammarList(dto);
	}
	public List<InternalExamsGrammarDto> getExamsGrammarCourseList(InternalExamsGrammarDto dto) throws Exception{
		return dao13.getExamsGrammarCourseList(dto);
	}
	public InternalExamsGrammarDto getExamsGrammar(InternalExamsGrammarDto dto) throws Exception{
		return dao13.getExamsGrammar(dto);
	}
	public InternalExamsGrammarDto getExamsGrammarNum(InternalExamsGrammarDto dto) throws Exception{
		return dao13.getExamsGrammarNum(dto);
	}
	public InternalExamsGrammarDto getInternalExamsGrammarReview(InternalExamsGrammarDto dto) throws Exception{
		return dao13.getInternalExamsGrammarReview(dto);
	}
	public void insertExamsGrammar(InternalExamsGrammarDto dto) throws Exception{
		dao13.insertExamsGrammar(dto);
	}
	public void updateExamsGrammar(InternalExamsGrammarDto dto) throws Exception{
		dao13.updateExamsGrammar(dto);
	}
	public void deleteExamsGrammar(InternalExamsGrammarDto dto) throws Exception{
		dao13.deleteExamsGrammar(dto);
	}
	
	public InternalExamsTypingDto getTypingCount(InternalExamsTypingDto dto) throws Exception{
		return dao14.getTypingCount(dto);
	}
	public List<InternalExamsTypingDto> getTypingList(InternalExamsTypingDto dto) throws Exception{
		return dao14.getTypingList(dto);
	}
	public InternalExamsTypingDto getTyping(InternalExamsTypingDto dto) throws Exception{
		return dao14.getTyping(dto);
	}
	public void insertTyping(InternalExamsTypingDto dto) throws Exception{
		dao14.insertTyping(dto);
	}
	public void updateTyping(InternalExamsTypingDto dto) throws Exception{
		dao14.updateTyping(dto);
	}
	public void updateTypingContent(InternalExamsTypingDto dto) throws Exception{
		dao14.updateTypingContent(dto);
	}
	public void deleteTyping(InternalExamsTypingDto dto) throws Exception{
		dao14.deleteTyping(dto);
	}
	
	public InternalExamsDictationDto getDictationCount(InternalExamsDictationDto dto) throws Exception{
		return dao15.getDictationCount(dto);
	}
	public List<InternalExamsDictationDto> getDictationList(InternalExamsDictationDto dto) throws Exception{
		return dao15.getDictationList(dto);
	}
	public InternalExamsDictationDto getDictation(InternalExamsDictationDto dto) throws Exception{
		return dao15.getDictation(dto);
	}
	public InternalExamsDictationDto getDictationOne(InternalExamsDictationDto dto) throws Exception{
		return dao15.getDictationOne(dto);
	}
	public void insertDictation(InternalExamsDictationDto dto) throws Exception{
		dao15.insertDictation(dto);
	}
	public void updateDictation(InternalExamsDictationDto dto) throws Exception{
		dao15.updateDictation(dto);
	}
	public void updateDictationContent(InternalExamsDictationDto dto) throws Exception{
		dao15.updateDictationContent(dto);
	}
	public void deleteDictation(InternalExamsDictationDto dto) throws Exception{
		dao15.deleteDictation(dto);
	}
	
	public InternalExamsAnswerDto getExamAnswer(InternalExamsAnswerDto dto) throws Exception{
		return dao21.getExamAnswer(dto);
	}
	public InternalExamsUseranswerDto getExamUserAnswer(InternalExamsUseranswerDto dto) throws Exception{
		return dao22.getExamUserAnswer(dto);
	}
	
	public InternalExamsUseranswerCommentDto getExamUserAnswerComment(InternalExamsUseranswerCommentDto dto) throws Exception{
		return dao23.getExamUserAnswerComment(dto);
	}
	public void insertExamUserAnswerComment(InternalExamsUseranswerCommentDto dto) throws Exception{
		dao23.insertExamUserAnswerComment(dto);
	}
	public void insertExamUserAnswerCommentLog(InternalExamsUseranswerCommentDto dto) throws Exception{
		dao23.insertExamUserAnswerCommentLog(dto);
	}
	public void updateExamUserAnswerComment(InternalExamsUseranswerCommentDto dto) throws Exception{
		dao23.updateExamUserAnswerComment(dto);
	}
	public InternalExamsUseranswerRubricDto getExamUserAnswerRubric(InternalExamsUseranswerRubricDto dto) throws Exception{
		return dao24.getExamUserAnswerRubric(dto);
	}
	public void insertExamUserAnswerRubric(InternalExamsUseranswerRubricDto dto) throws Exception{
		dao24.insertExamUserAnswerRubric(dto);
	}
	public void insertExamUserAnswerRubricLog(InternalExamsUseranswerRubricDto dto) throws Exception{
		dao24.insertExamUserAnswerRubricLog(dto);
	}
	public void updateExamUserAnswerRubric(InternalExamsUseranswerRubricDto dto) throws Exception{
		dao24.updateExamUserAnswerRubric(dto);
	}
	public InternalExamsUseranswerNoteDto getExamUserAnswerNote(InternalExamsUseranswerNoteDto dto) throws Exception{
		return dao25.getExamUserAnswerNote(dto);
	}
	
	public InternalExamsMemorizationDto getInternalExamsMemorizationCount(InternalExamsMemorizationDto dto) throws Exception{
		return dao26.getInternalExamsMemorizationCount(dto);
	}
	public List<InternalExamsMemorizationDto> getInternalExamsMemorizationList(InternalExamsMemorizationDto dto) throws Exception{
		return dao26.getInternalExamsMemorizationList(dto);
	}
	public List<InternalExamsMemorizationDto> getInternalExamsMemorizationExamList(InternalExamsMemorizationDto dto) throws Exception{
		return dao26.getInternalExamsMemorizationExamList(dto);
	}
	public InternalExamsMemorizationDto getInternalExamsMemorization(InternalExamsMemorizationDto dto) throws Exception{
		return dao26.getInternalExamsMemorization(dto);
	}
	public void insertInternalExamsMemorization(InternalExamsMemorizationDto dto) throws Exception{
		dao26.insertInternalExamsMemorization(dto);
	}
	public void updateInternalExamsMemorization(InternalExamsMemorizationDto dto) throws Exception{
		dao26.updateInternalExamsMemorization(dto);
	}
	public void deleteInternalExamsMemorization(InternalExamsMemorizationDto dto) throws Exception{
		dao26.deleteInternalExamsMemorization(dto);
	}
	public void deleteInternalExamsMemorizationQuestionAll(InternalExamsMemorizationDto dto) throws Exception{
		dao26.deleteInternalExamsMemorizationQuestionAll(dto);
	}
	
	public InternalExamsMemorizationQuestionDto getInternalExamsMemorizationQuestionNum(InternalExamsMemorizationQuestionDto dto) throws Exception{
		return dao27.getInternalExamsMemorizationQuestionNum(dto);
	}
	public List<InternalExamsMemorizationQuestionDto> getInternalExamsMemorizationQuestionList(InternalExamsMemorizationQuestionDto dto) throws Exception{
		return dao27.getInternalExamsMemorizationQuestionList(dto);
	}
	public void insertInternalExamsMemorizationQuestion(InternalExamsMemorizationQuestionDto dto) throws Exception{
		dao27.insertInternalExamsMemorizationQuestion(dto);
	}
	
	public InternalExamsSttDto getSttCount(InternalExamsSttDto dto) throws Exception{
		return dao28.getSttCount(dto);
	}
	public List<InternalExamsSttDto> getSttList(InternalExamsSttDto dto) throws Exception{
		return dao28.getSttList(dto);
	}
	public InternalExamsSttDto getStt(InternalExamsSttDto dto) throws Exception{
		return dao28.getStt(dto);
	}
	
	public void insertStt(InternalExamsSttDto dto) throws Exception{
		dao28.insertStt(dto);
	}
	public void updateStt(InternalExamsSttDto dto) throws Exception{
		dao28.updateStt(dto);
	}
	public void deleteStt(InternalExamsSttDto dto) throws Exception{
		dao28.deleteStt(dto);
	}
	
	public List<InternalExamsDuolingoVocaLangDto> getExamsDuolingoVocaLangList(InternalExamsDuolingoVocaLangDto dto) throws Exception{
		return dao31.getExamsDuolingoVocaLangList(dto);
	}
	public void insertDuolingoVocaLang(InternalExamsDuolingoVocaLangDto dto) throws Exception{
		dao31.insertDuolingoVocaLang(dto);
	}
	public void updateDuolingoVocaLang(InternalExamsDuolingoVocaLangDto dto) throws Exception{
		dao31.updateDuolingoVocaLang(dto);
	}
	public void deleteDuolingoVocaLang(InternalExamsDuolingoVocaLangDto dto) throws Exception{
		dao31.deleteDuolingoVocaLang(dto);
	}
	
	public List<InternalExamsDuolingoVocaDto> getExamsDuolingoVocaList(InternalExamsDuolingoVocaDto dto) throws Exception{
		return dao32.getExamsDuolingoVocaList(dto);
	}
	public void insertDuolingoVoca(InternalExamsDuolingoVocaDto dto) throws Exception{
		dao32.insertDuolingoVoca(dto);
	}
	public void updateDuolingoVoca(InternalExamsDuolingoVocaDto dto) throws Exception{
		dao32.updateDuolingoVoca(dto);
	}
	public void deleteDuolingoVoca(InternalExamsDuolingoVocaDto dto) throws Exception{
		dao32.deleteDuolingoVoca(dto);
	}
	
	public List<InternalExamsDuolingoSentenceDto> getExamsDuolingoSentenceList(InternalExamsDuolingoSentenceDto dto) throws Exception{
		return dao33.getExamsDuolingoSentenceList(dto);
	}
	public void insertDuolingoSentence(InternalExamsDuolingoSentenceDto dto) throws Exception{
		dao33.insertDuolingoSentence(dto);
	}
	public void updateDuolingoSentence(InternalExamsDuolingoSentenceDto dto) throws Exception{
		dao33.updateDuolingoSentence(dto);
	}
	public void deleteDuolingoSentence(InternalExamsDuolingoSentenceDto dto) throws Exception{
		dao33.deleteDuolingoSentence(dto);
	}
	
	public List<InternalExamsDuolingoBlankDto> getExamsDuolingoBlankList(InternalExamsDuolingoBlankDto dto) throws Exception{
		return dao34.getExamsDuolingoBlankList(dto);
	}
	public InternalExamsDuolingoBlankDto getExamsDuolingoBlank(InternalExamsDuolingoBlankDto dto) throws Exception{
		return dao34.getExamsDuolingoBlank(dto);
	}
	public InternalExamsDuolingoBlankDto getExamsDuolingoBlankSort(InternalExamsDuolingoBlankDto dto) throws Exception{
		return dao34.getExamsDuolingoBlankSort(dto);
	}
	
	public void insertDuolingoBlank(InternalExamsDuolingoBlankDto dto) throws Exception{
		dao34.insertDuolingoBlank(dto);
	}
	public void updateDuolingoBlank(InternalExamsDuolingoBlankDto dto) throws Exception{
		dao34.updateDuolingoBlank(dto);
	}
	public void updateDuolingoBlankSort(InternalExamsDuolingoBlankDto dto) throws Exception{
		dao34.updateDuolingoBlankSort(dto);
	}
	public void deleteDuolingoBlank(InternalExamsDuolingoBlankDto dto) throws Exception{
		dao34.deleteDuolingoBlank(dto);
	}
	public void deleteDuolingoBlankQuestionAll(InternalExamsDuolingoBlankDto dto) throws Exception{
		dao34.deleteDuolingoBlankQuestionAll(dto);
	}
	
	public InternalExamsDuolingoBlankQuestionDto getExamsDuolingoBlankQuestionNum(InternalExamsDuolingoBlankQuestionDto dto) throws Exception{
		return dao35.getExamsDuolingoBlankQuestionNum(dto);
	}
	public List<InternalExamsDuolingoBlankQuestionDto> getExamsDuolingoBlankQuestionList(InternalExamsDuolingoBlankQuestionDto dto) throws Exception{
		return dao35.getExamsDuolingoBlankQuestionList(dto);
	}
	public void insertDuolingoBlankQuestion(InternalExamsDuolingoBlankQuestionDto dto) throws Exception{
		dao35.insertDuolingoBlankQuestion(dto);
	}
	public void updateDuolingoBlankQuestion(InternalExamsDuolingoBlankQuestionDto dto) throws Exception{
		dao35.updateDuolingoBlankQuestion(dto);
	}
	public void deleteDuolingoBlankQuestion(InternalExamsDuolingoBlankQuestionDto dto) throws Exception{
		dao35.deleteDuolingoBlankQuestion(dto);
	}
	
	public List<InternalExamsDuolingoImageDto> getExamsDuolingoImageList(InternalExamsDuolingoImageDto dto) throws Exception{
		return dao36.getExamsDuolingoImageList(dto);
	}
	public InternalExamsDuolingoImageDto getExamsDuolingoImage(InternalExamsDuolingoImageDto dto) throws Exception{
		return dao36.getExamsDuolingoImage(dto);
	}
	public InternalExamsDuolingoImageDto getExamsDuolingoImageSort(InternalExamsDuolingoImageDto dto) throws Exception{
		return dao36.getExamsDuolingoImageSort(dto);
	}
	public void insertDuolingoImage(InternalExamsDuolingoImageDto dto) throws Exception{
		dao36.insertDuolingoImage(dto);
	}
	public void updateDuolingoImage(InternalExamsDuolingoImageDto dto) throws Exception{
		dao36.updateDuolingoImage(dto);
	}
	public void updateDuolingoImageSort(InternalExamsDuolingoImageDto dto) throws Exception{
		dao36.updateDuolingoImageSort(dto);
	}
	public void deleteDuolingoImage(InternalExamsDuolingoImageDto dto) throws Exception{
		dao36.deleteDuolingoImage(dto);
	}
	
	public List<InternalExamsDuolingoDescribeDto> getExamsDuolingoDescribeList(InternalExamsDuolingoDescribeDto dto) throws Exception{
		return dao37.getExamsDuolingoDescribeList(dto);
	}
	public InternalExamsDuolingoDescribeDto getExamsDuolingoDescribe(InternalExamsDuolingoDescribeDto dto) throws Exception{
		return dao37.getExamsDuolingoDescribe(dto);
	}
	public InternalExamsDuolingoDescribeDto getExamsDuolingoDescribeSort(InternalExamsDuolingoDescribeDto dto) throws Exception{
		return dao37.getExamsDuolingoDescribeSort(dto);
	}
	public void insertDuolingoDescribe(InternalExamsDuolingoDescribeDto dto) throws Exception{
		dao37.insertDuolingoDescribe(dto);
	}
	public void updateDuolingoDescribe(InternalExamsDuolingoDescribeDto dto) throws Exception{
		dao37.updateDuolingoDescribe(dto);
	}
	public void updateDuolingoDescribeSort(InternalExamsDuolingoDescribeDto dto) throws Exception{
		dao37.updateDuolingoDescribeSort(dto);
	}
	public void deleteDuolingoDescribe(InternalExamsDuolingoDescribeDto dto) throws Exception{
		dao37.deleteDuolingoDescribe(dto);
	}
	public void deleteDuolingoDescribeQuestionAll(InternalExamsDuolingoDescribeDto dto) throws Exception{
		dao37.deleteDuolingoDescribeQuestionAll(dto);
	}
	
	public List<InternalExamsDuolingoDescribeQuestionDto> getExamsDuolingoDescribeQuestionList(InternalExamsDuolingoDescribeQuestionDto dto) throws Exception{
		return dao38.getExamsDuolingoDescribeQuestionList(dto);
	}
	public void insertDuolingoDescribeQuestion(InternalExamsDuolingoDescribeQuestionDto dto) throws Exception{
		dao38.insertDuolingoDescribeQuestion(dto);
	}
	public void updateDuolingoDescribeQuestion(InternalExamsDuolingoDescribeQuestionDto dto) throws Exception{
		dao38.updateDuolingoDescribeQuestion(dto);
	}
	public void deleteDuolingoDescribeQuestion(InternalExamsDuolingoDescribeQuestionDto dto) throws Exception{
		dao38.deleteDuolingoDescribeQuestion(dto);
	}
}