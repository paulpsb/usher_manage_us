package com.usher.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usher.dao.BaseAddressDao;
import com.usher.dao.BaseAreaDao;
import com.usher.dao.BaseBookDao;
import com.usher.dao.BaseCountryDao;
import com.usher.dao.BaseCoursegroupTimescheduleDao;
import com.usher.dao.BaseCoursesCourseDao;
import com.usher.dao.BaseCoursesCoursePracticeDao;
import com.usher.dao.BaseCoursesCoursegroupDao;
import com.usher.dao.BaseExamRuburicDao;
import com.usher.dao.BaseExamRuburicStandardDao;
import com.usher.dao.BaseKakaoSendCodeDao;
import com.usher.dao.BaseKakaoSendMessageDao;
import com.usher.dao.BaseKakaoSendMessageDetailDao;
import com.usher.dao.BaseOrientationDao;
import com.usher.dao.BaseSchoolDao;
import com.usher.dto.BaseAddressDto;
import com.usher.dto.BaseAreaDto;
import com.usher.dto.BaseBookDto;
import com.usher.dto.BaseCountryDto;
import com.usher.dto.BaseCoursegroupTimescheduleDto;
import com.usher.dto.BaseCoursesCourseDto;
import com.usher.dto.BaseCoursesCoursePracticeDto;
import com.usher.dto.BaseCoursesCoursegroupDto;
import com.usher.dto.BaseExamRuburicDto;
import com.usher.dto.BaseExamRuburicStandardDto;
import com.usher.dto.BaseKakaoSendCodeDto;
import com.usher.dto.BaseKakaoSendMessageDetailDto;
import com.usher.dto.BaseKakaoSendMessageDto;
import com.usher.dto.BaseOrientationDto;
import com.usher.dto.BaseSchoolDto;


@Service
public class BaseService{
	@Autowired
	BaseAreaDao dao1;
	
	@Autowired
	BaseCountryDao dao2;

	@Autowired
	BaseSchoolDao dao3;

	@Autowired
	BaseOrientationDao dao4;

	@Autowired
	BaseExamRuburicDao dao5;

	@Autowired
	BaseCoursegroupTimescheduleDao dao6;
	
	@Autowired
	BaseExamRuburicStandardDao dao7;
	
	@Autowired
	BaseCoursesCoursegroupDao dao11;
	
	@Autowired
	BaseCoursesCourseDao dao12;
	
	@Autowired
	BaseCoursesCoursePracticeDao dao13;
	
	@Autowired
	BaseBookDao dao21;
	
	@Autowired
	BaseAddressDao dao31;
	
	@Autowired
	BaseKakaoSendCodeDao dao32;
	
	@Autowired
	BaseKakaoSendMessageDao dao33;
	
	@Autowired
	BaseKakaoSendMessageDetailDao dao34;
	
	public List<BaseAreaDto> getBaseArea1List() throws Exception{
		return dao1.getBaseArea1List();			
	}
	public BaseAreaDto getBaseArea1(BaseAreaDto dto) throws Exception{
		return dao1.getBaseArea1(dto);
	}
	public List<BaseAreaDto> getBaseArea2List(BaseAreaDto dto) throws Exception{
		return dao1.getBaseArea2List(dto);
	}
	public BaseAreaDto getBaseArea2(BaseAreaDto dto) throws Exception{
		return dao1.getBaseArea2(dto);
	}
	public void insertBaseArea1(BaseAreaDto dto) throws Exception{
		dao1.insertBaseArea1(dto);
	}
	public void updateBaseArea1(BaseAreaDto dto) throws Exception{
		dao1.updateBaseArea1(dto);
	}
	public void updateBaseArea1AsBaseArea2(BaseAreaDto dto) throws Exception{
		dao1.updateBaseArea1AsBaseArea2(dto);
	}
	public void updateBaseArea1AsUserSchool(BaseAreaDto dto) throws Exception{
		dao1.updateBaseArea1AsUserSchool(dto);
	}
	public void insertBaseArea2(BaseAreaDto dto) throws Exception{
		dao1.insertBaseArea2(dto);
	}
	public void updateBaseArea2(BaseAreaDto dto) throws Exception{
		dao1.updateBaseArea2(dto);
	}
	public void updateBaseArea2AsUserSchool(BaseAreaDto dto) throws Exception{
		dao1.updateBaseArea2AsUserSchool(dto);
	}
	
	public List<BaseCountryDto> getBaseCountry1List() throws Exception{
		return dao2.getBaseCountry1List();				
	}
	public BaseCountryDto getBaseCountry1(BaseCountryDto dto) throws Exception{
		return dao2.getBaseCountry1(dto);
	}
	public List<BaseCountryDto> getBaseCountry2List(BaseCountryDto dto) throws Exception{
		return dao2.getBaseCountry2List(dto);
	}
	public BaseCountryDto getBaseCountry2(BaseCountryDto dto) throws Exception{
		return dao2.getBaseCountry2(dto);
	}
	public void insertBaseCountry1(BaseCountryDto dto) throws Exception{
		dao2.insertBaseCountry1(dto);
	}
	public void updateBaseCountry1(BaseCountryDto dto) throws Exception{
		dao2.updateBaseCountry1(dto);
	}
	public void updateBaseCountry1AsBaseCountry2(BaseCountryDto dto) throws Exception{
		dao2.updateBaseCountry1AsBaseCountry2(dto);
	}
	public void updateBaseCountry1AsUserSchool(BaseCountryDto dto) throws Exception{
		dao2.updateBaseCountry1AsUserSchool(dto);
	}
	public void insertBaseCountry2(BaseCountryDto dto) throws Exception{
		dao2.insertBaseCountry2(dto);
	}
	public void updateBaseCountry2(BaseCountryDto dto) throws Exception{
		dao2.updateBaseCountry2(dto);
	}
	public void updateBaseCountry2AsUserSchool(BaseCountryDto dto) throws Exception{
		dao2.updateBaseCountry2AsUserSchool(dto);
	}
	
	public BaseSchoolDto getBaseSchoolCount(BaseSchoolDto dto) throws Exception{
		return dao3.getBaseSchoolCount(dto);
	}
	public List<BaseSchoolDto> getBaseSchoolList(BaseSchoolDto dto) throws Exception{
		return dao3.getBaseSchoolList(dto);
	}
	public List<BaseSchoolDto> getBaseSchoolMatchingList(BaseSchoolDto dto) throws Exception{
		return dao3.getBaseSchoolMatchingList(dto);
	}
	public List<BaseSchoolDto> getBaseSchoolSearchList(BaseSchoolDto dto) throws Exception{
		return dao3.getBaseSchoolSearchList(dto);
	}
	public BaseSchoolDto getBaseSchool(BaseSchoolDto dto) throws Exception{
		return dao3.getBaseSchool(dto);
	}
	public void insertBaseSchool(BaseSchoolDto dto) throws Exception{
		dao3.insertBaseSchool(dto);
	}
	public void updateBaseSchool(BaseSchoolDto dto) throws Exception{
		dao3.updateBaseSchool(dto);
	}
	public void updateBaseSchoolAsUserSchool(BaseSchoolDto dto) throws Exception{
		dao3.updateBaseSchoolAsUserSchool(dto);
	}
	public BaseSchoolDto getUserSchoolCount(BaseSchoolDto dto) throws Exception{
		return dao3.getUserSchoolCount(dto);
	}
	public List<BaseSchoolDto> getUserSchoolList(BaseSchoolDto dto) throws Exception{
		return dao3.getUserSchoolList(dto);
	}
	public BaseSchoolDto getUserSchool(BaseSchoolDto dto) throws Exception{
		return dao3.getUserSchool(dto);
	}
	public void updateUserSchool(BaseSchoolDto dto) throws Exception{
		dao3.updateUserSchool(dto);
	}
	public List<BaseOrientationDto> getBaseOrientationList(BaseOrientationDto dto) throws Exception{
		return dao4.getBaseOrientationList(dto);
	}
	public void insertBaseOrientation(BaseOrientationDto dto) throws Exception{
		dao4.insertBaseOrientation(dto);
	}
	public void updateBaseOrientation(BaseOrientationDto dto) throws Exception{
		dao4.updateBaseOrientation(dto);
	}
	
	public List<BaseExamRuburicDto> getBaseExamRuburicList(BaseExamRuburicDto dto) throws Exception{
		return dao5.getBaseExamRuburicList(dto);
	}
	public BaseExamRuburicDto getBaseExamRuburic(BaseExamRuburicDto dto) throws Exception{
		return dao5.getBaseExamRuburic(dto);
	}
	public void insertBaseExamRuburic(BaseExamRuburicDto dto) throws Exception{
		dao5.insertBaseExamRuburic(dto);
	}
	public void updateBaseExamRuburic(BaseExamRuburicDto dto) throws Exception{
		dao5.updateBaseExamRuburic(dto);
	}
	public void deleteBaseExamRuburic(BaseExamRuburicDto dto) throws Exception{
		dao5.deleteBaseExamRuburic(dto);
	}
	public List<BaseCoursegroupTimescheduleDto> getBaseCoursegroupTimescheduleList(BaseCoursegroupTimescheduleDto dto) throws Exception{
		return dao6.getBaseCoursegroupTimescheduleList(dto);
	}
	public void insertBaseCoursegroupTimeschedule(BaseCoursegroupTimescheduleDto dto) throws Exception{
		dao6.insertBaseCoursegroupTimeschedule(dto);
	}
	public void deleteBaseCoursegroupTimeschedule(BaseCoursegroupTimescheduleDto dto) throws Exception{
		dao6.deleteBaseCoursegroupTimeschedule(dto);
	}
	
	public List<BaseExamRuburicStandardDto> getBaseExamRuburicStandardList() throws Exception{
		return dao7.getBaseExamRuburicStandardList();
	}
	public BaseExamRuburicStandardDto getBaseExamRuburicStandard(BaseExamRuburicStandardDto dto) throws Exception{
		return dao7.getBaseExamRuburicStandard(dto);
	}
	public void insertBaseExamRuburicStandard(BaseExamRuburicStandardDto dto) throws Exception{
		dao7.insertBaseExamRuburicStandard(dto);
	}
	
	public List<BaseCoursesCoursegroupDto> getBaseCoursesCoursegroupList(BaseCoursesCoursegroupDto dto) throws Exception{
		return dao11.getBaseCoursesCoursegroupList(dto);
	}
	public BaseCoursesCoursegroupDto getBaseCoursesCoursegroup(BaseCoursesCoursegroupDto dto) throws Exception{
		return dao11.getBaseCoursesCoursegroup(dto);
	}
	public void insertBaseCoursesCoursegroup(BaseCoursesCoursegroupDto dto) throws Exception{
		dao11.insertBaseCoursesCoursegroup(dto);
	}
	public void updateBaseCoursesCoursegroup(BaseCoursesCoursegroupDto dto) throws Exception{
		dao11.updateBaseCoursesCoursegroup(dto);
	}
	public void deleteBaseCoursesCoursegroup(BaseCoursesCoursegroupDto dto) throws Exception{
		dao11.deleteBaseCoursesCoursegroup(dto);
	}
	public void deleteBaseCoursesCourseAll(BaseCoursesCoursegroupDto dto) throws Exception{
		dao11.deleteBaseCoursesCourseAll(dto);
	}
	
	public List<BaseCoursesCourseDto> getBaseCoursesCourseList(BaseCoursesCourseDto dto) throws Exception{
		return dao12.getBaseCoursesCourseList(dto);
	}
	public List<BaseCoursesCourseDto> getBaseCoursesCourseAllList(BaseCoursesCourseDto dto) throws Exception{
		return dao12.getBaseCoursesCourseAllList(dto);
	}
	public BaseCoursesCourseDto getBaseCoursesCourse(BaseCoursesCourseDto dto) throws Exception{
		return dao12.getBaseCoursesCourse(dto);
	}
	public BaseCoursesCourseDto getBaseCoursesCourseAll(BaseCoursesCourseDto dto) throws Exception{
		return dao12.getBaseCoursesCourseAll(dto);
	}
	public void insertBaseCoursesCourse(BaseCoursesCourseDto dto) throws Exception{
		dao12.insertBaseCoursesCourse(dto);
	}
	public void updateBaseCoursesCourse(BaseCoursesCourseDto dto) throws Exception{
		dao12.updateBaseCoursesCourse(dto);
	}
	public void deleteBaseCoursesCourse(BaseCoursesCourseDto dto) throws Exception{
		dao12.deleteBaseCoursesCourse(dto);
	}
	public List<BaseCoursesCoursePracticeDto> getBaseCoursesCoursePracticeList(BaseCoursesCoursePracticeDto dto) throws Exception{
		return dao13.getBaseCoursesCoursePracticeList(dto);
	}
	public void insertBaseCoursesCoursePractice(BaseCoursesCoursePracticeDto dto) throws Exception{
		dao13.insertBaseCoursesCoursePractice(dto);
	}
	public void deleteBaseCoursesCoursePractice(BaseCoursesCoursePracticeDto dto) throws Exception{
		dao13.deleteBaseCoursesCoursePractice(dto);
	}
	
	public List<BaseBookDto> getBaseBookList(BaseBookDto dto) throws Exception{
		return dao21.getBaseBookList(dto);
	}
	public BaseBookDto getBaseBook(BaseBookDto dto) throws Exception{
		return dao21.getBaseBook(dto);
	}
	public void insertBaseBook(BaseBookDto dto) throws Exception{
		dao21.insertBaseBook(dto);
	}
	public void updateBaseBook(BaseBookDto dto) throws Exception{
		dao21.updateBaseBook(dto);
	}
	public void deleteBaseBook(BaseBookDto dto) throws Exception{
		dao21.deleteBaseBook(dto);
	}
	
	public List<BaseAddressDto> getBaseAddressList() throws Exception{
		return dao31.getBaseAddressList();			
	}
	public BaseAddressDto getBaseAddress(BaseAddressDto dto) throws Exception{
		return dao31.getBaseAddress(dto);
	}
	public void insertBaseAddress(BaseAddressDto dto) throws Exception{
		dao31.insertBaseAddress(dto);
	}
	public void updateBaseAddress(BaseAddressDto dto) throws Exception{
		dao31.updateBaseAddress(dto);
	}
	public void deleteBaseAddress(BaseAddressDto dto) throws Exception{
		dao31.deleteBaseAddress(dto);
	}

	public List<BaseKakaoSendCodeDto> getBaseKakaoSendCodeList() throws Exception{
		return dao32.getBaseKakaoSendCodeList();				
	}
	public void insertBaseKakaoSendCode(BaseKakaoSendCodeDto dto) throws Exception{
		dao32.insertBaseKakaoSendCode(dto);
	}
	public void updateBaseKakaoSendCode(BaseKakaoSendCodeDto dto) throws Exception{
		dao32.updateBaseKakaoSendCode(dto);
	}
	public void deleteBaseKakaoSendCode(BaseKakaoSendCodeDto dto) throws Exception{
		dao32.deleteBaseKakaoSendCode(dto);
	}
	
	public List<BaseKakaoSendMessageDto> getBaseKakaoSendMessageList() throws Exception{
		return dao33.getBaseKakaoSendMessageList();				
	}
	public BaseKakaoSendMessageDto getBaseKakaoSendMessage(BaseKakaoSendMessageDto dto) throws Exception{
		return dao33.getBaseKakaoSendMessage(dto);
	}
	public void insertBaseKakaoSendMessage(BaseKakaoSendMessageDto dto) throws Exception{
		dao33.insertBaseKakaoSendMessage(dto);
	}
	public void updateBaseKakaoSendMessage(BaseKakaoSendMessageDto dto) throws Exception{
		dao33.updateBaseKakaoSendMessage(dto);
	}
	public void deleteBaseKakaoSendMessage(BaseKakaoSendMessageDto dto) throws Exception{
		dao33.deleteBaseKakaoSendMessageDetailAll(dto);
		dao33.deleteBaseKakaoSendMessage(dto);
	}
	
	public List<BaseKakaoSendMessageDetailDto> getBaseKakaoSendMessageDetailList(BaseKakaoSendMessageDetailDto dto) throws Exception{
		return dao34.getBaseKakaoSendMessageDetailList(dto);
	}
	public void insertBaseKakaoSendMessageDetail(BaseKakaoSendMessageDetailDto dto) throws Exception{
		dao34.insertBaseKakaoSendMessageDetail(dto);
	}
	public void updateBaseKakaoSendMessageDetail(BaseKakaoSendMessageDetailDto dto) throws Exception{
		dao34.updateBaseKakaoSendMessageDetail(dto);
	}
	public void deleteBaseKakaoSendMessageDetail(BaseKakaoSendMessageDetailDto dto) throws Exception{
		dao34.deleteBaseKakaoSendMessageDetail(dto);
	}
}