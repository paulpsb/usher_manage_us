package com.usher.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usher.dao.CorrectionExamsAnswerDao;
import com.usher.dao.CorrectionExamsAppealDao;
import com.usher.dao.CorrectionExamsCommentDao;
import com.usher.dao.CorrectionExamsNoteDao;
import com.usher.dao.CorrectionExamsPenDao;
import com.usher.dao.CorrectionExamsRuburicDao;
import com.usher.dao.CorrectionOnlineVideoDao;
import com.usher.dao.CorrectionOralTestDao;
import com.usher.dao.CorrectionShopProductDao;
import com.usher.dao.CorrectionShopProductDetailDao;
import com.usher.dao.CorrectionTestBookDao;
import com.usher.dao.CorrectionTestTypeDao;
import com.usher.dao.CorrectionUserProductDao;
import com.usher.dto.CorrectionExamsAnswerDto;
import com.usher.dto.CorrectionExamsAppealDto;
import com.usher.dto.CorrectionExamsCommentDto;
import com.usher.dto.CorrectionExamsNoteDto;
import com.usher.dto.CorrectionExamsPenDto;
import com.usher.dto.CorrectionExamsRuburicDto;
import com.usher.dto.CorrectionOnlineVideoDto;
import com.usher.dto.CorrectionOralTestDto;
import com.usher.dto.CorrectionShopProductDetailDto;
import com.usher.dto.CorrectionShopProductDto;
import com.usher.dto.CorrectionTestBookDto;
import com.usher.dto.CorrectionTestTypeDto;
import com.usher.dto.CorrectionUserProductDto;
import com.usher.util.SessionUtil;

@Service
public class CorrectionExamsService{
	@Autowired
	CorrectionUserProductDao dao0;
	
	@Autowired
	CorrectionExamsAnswerDao dao1;
	
	@Autowired
	CorrectionExamsRuburicDao dao2;
	
	@Autowired
	CorrectionExamsPenDao dao3;
	
	@Autowired
	CorrectionExamsNoteDao dao4;
	
	@Autowired
	CorrectionExamsCommentDao dao5;
	
	@Autowired
	CorrectionExamsAppealDao dao6;
	
	@Autowired
	CorrectionShopProductDao dao11;
	
	@Autowired
	CorrectionShopProductDetailDao dao12;
	
	@Autowired
	CorrectionOnlineVideoDao dao21;
	
	@Autowired
	CorrectionTestTypeDao dao31;
	
	@Autowired
	CorrectionTestBookDao dao32;
	
	@Autowired
	CorrectionOralTestDao dao41;
	
	public CorrectionUserProductDto getCorrectionUserProductCount(CorrectionUserProductDto dto) throws Exception{
		return dao0.getCorrectionUserProductCount(dto);
	}
	public List<CorrectionUserProductDto> getCorrectionUserProductList(CorrectionUserProductDto dto) throws Exception{
		return dao0.getCorrectionUserProductList(dto);
	}
	public CorrectionUserProductDto getCorrectionUserProduct(CorrectionUserProductDto dto) throws Exception{
		return dao0.getCorrectionUserProduct(dto);
	}
	public void insertCorrectionUserProduct(CorrectionUserProductDto dto) throws Exception{
		dao0.insertCorrectionUserProduct(dto);
	}
	public void updateCorrectionUserProduct(CorrectionUserProductDto dto) throws Exception{
		dao0.updateCorrectionUserProduct(dto);
	}
	public void deleteCorrectionUserProduct(CorrectionUserProductDto dto) throws Exception{
		dao0.deleteCorrectionUserProduct(dto);
	}
	
	public List<CorrectionExamsAnswerDto> getCorrectionExamsAnswerCourseList(CorrectionExamsAnswerDto dto) throws Exception{
		return dao1.getCorrectionExamsAnswerCourseList(dto);
	}
	public CorrectionExamsAnswerDto getCorrectionExamsAnswerCount(CorrectionExamsAnswerDto dto) throws Exception{
		return dao1.getCorrectionExamsAnswerCount(dto);
	}
	public List<CorrectionExamsAnswerDto> getCorrectionExamsAnswerList(CorrectionExamsAnswerDto dto) throws Exception{
		return dao1.getCorrectionExamsAnswerList(dto);
	}
	public CorrectionExamsAnswerDto getCorrectionExamsAnswerAppealCount(CorrectionExamsAnswerDto dto) throws Exception{
		return dao1.getCorrectionExamsAnswerAppealCount(dto);
	}
	public List<CorrectionExamsAnswerDto> getCorrectionExamsAnswerAppealList(CorrectionExamsAnswerDto dto) throws Exception{
		return dao1.getCorrectionExamsAnswerAppealList(dto);
	}

	public List<CorrectionExamsAnswerDto> getCorrectionExamsAnswerAppealReviewList(CorrectionExamsAnswerDto dto) throws Exception{
		return dao1.getCorrectionExamsAnswerAppealReviewList(dto);
	}
	public CorrectionExamsAnswerDto getCorrectionExamsAnswer(CorrectionExamsAnswerDto dto) throws Exception{
		return dao1.getCorrectionExamsAnswer(dto);
	}
	public CorrectionExamsAnswerDto getCorrectionExamsAnswerAsResult(CorrectionExamsAnswerDto dto) throws Exception{
		return dao1.getCorrectionExamsAnswerAsResult(dto);
	}
	public List<CorrectionExamsAnswerDto> getCorrectionExamsAnswerMonthlyPenCountList(CorrectionExamsAnswerDto dto) throws Exception{
		return dao1.getCorrectionExamsAnswerMonthlyPenCountList(dto);
	}
	public List<CorrectionExamsAnswerDto> getCorrectionExamsAnswerDailyPenCountList(CorrectionExamsAnswerDto dto) throws Exception{
		return dao1.getCorrectionExamsAnswerDailyPenCountList(dto);
	}
	public List<CorrectionExamsAnswerDto> getCorrectionExamsAnswerTAList(CorrectionExamsAnswerDto dto) throws Exception{
		return dao1.getCorrectionExamsAnswerTAList(dto);
	}
	public List<CorrectionExamsAnswerDto> getCorrectionExamsAnswerAppealTAReviewList(CorrectionExamsAnswerDto dto) throws Exception{
		return dao1.getCorrectionExamsAnswerAppealTAReviewList(dto);
	}
	public void updateCorrectionExamsAnswerCorrectPen(CorrectionExamsAnswerDto dto) throws Exception{
		dao1.updateCorrectionExamsAnswerCorrectPen(dto);
	}
	public void updateCorrectionExamsAnswerRubric(CorrectionExamsAnswerDto dto) throws Exception{
		dao1.updateCorrectionExamsAnswerRubric(dto);
	}
	public void updateCorrectionExamsAnswerStatus(CorrectionExamsAnswerDto dto) throws Exception{
		dao1.updateCorrectionExamsAnswerStatus(dto);
	}
	public void updateCorrectionExamsAnswerAppealStatus(CorrectionExamsAnswerDto dto) throws Exception{
		dao1.updateCorrectionExamsAnswerAppealStatus(dto);
	}
	public CorrectionExamsRuburicDto getCorrectionExamsRuburic(CorrectionExamsRuburicDto dto) throws Exception{
		return dao2.getCorrectionExamsRuburic(dto);
	}
	public void insertCorrectionExamsRuburic(CorrectionExamsRuburicDto dto) throws Exception{
		dao2.insertCorrectionExamsRuburicLog(dto);
		dao2.insertCorrectionExamsRuburic(dto);
	}
	public CorrectionExamsPenDto getCorrectionExamsPen(CorrectionExamsPenDto dto) throws Exception{
		return dao3.getCorrectionExamsPen(dto);
	}
	public void insertCorrectionExamsPen(CorrectionExamsPenDto dto) throws Exception{
		dao3.insertCorrectionExamsPenLog(dto);
		dao3.insertCorrectionExamsPen(dto);
	}
	
	public CorrectionExamsNoteDto getCorrectionExamsAnswer(CorrectionExamsNoteDto dto) throws Exception{
		return dao4.getCorrectionExamsNote(dto);
	}
	
	public List<CorrectionExamsCommentDto> getCorrectionExamsCommentList(CorrectionExamsCommentDto dto) throws Exception{
		return dao5.getCorrectionExamsCommentList(dto);
	}
	public CorrectionExamsCommentDto getCorrectionExamsComment(CorrectionExamsCommentDto dto) throws Exception{
		return dao5.getCorrectionExamsComment(dto);
	}
	public void updateCorrectionExamsComment(CorrectionExamsCommentDto dto) throws Exception{
		dao5.updateCorrectionExamsComment(dto);
	}
	public void deleteCorrectionExamsComment(CorrectionExamsCommentDto dto) throws Exception{
		dao5.deleteCorrectionExamsComment(dto);
	}
	public List<CorrectionExamsAppealDto> getCorrectionExamsAppealList(CorrectionExamsAppealDto dto) throws Exception{
		return dao6.getCorrectionExamsAppealList(dto);
	}
	public CorrectionExamsAppealDto getCorrectionExamsAppeal(CorrectionExamsAppealDto dto) throws Exception{
		return dao6.getCorrectionExamsAppeal(dto);
	}
	public void updateCorrectionExamsAppeal(CorrectionExamsAppealDto dto) throws Exception{
		dao6.updateCorrectionExamsAppeal(dto);
	}
	public CorrectionShopProductDto getCorrectionShopProductCount(CorrectionShopProductDto dto) throws Exception{
		return dao11.getCorrectionShopProductCount(dto);
	}
	public List<CorrectionShopProductDto> getCorrectionShopProductList(CorrectionShopProductDto dto) throws Exception{
		return dao11.getCorrectionShopProductList(dto);
	}
	public CorrectionShopProductDto getCorrectionShopProduct(CorrectionShopProductDto dto) throws Exception{
		return dao11.getCorrectionShopProduct(dto);
	}
	public void insertCorrectionShopProduct(CorrectionShopProductDto dto) throws Exception{
		dao11.insertCorrectionShopProduct(dto);
	}
	public void updateCorrectionShopProduct(CorrectionShopProductDto dto) throws Exception{
		dao11.updateCorrectionShopProduct(dto);
	}
	public void deleteCorrectionShopProduct(CorrectionShopProductDto dto) throws Exception{
		dao11.deleteCorrectionShopProduct(dto);
	}
	public List<CorrectionShopProductDetailDto> getCorrectionShopProductDetailList(CorrectionShopProductDetailDto dto) throws Exception{
		return dao12.getCorrectionShopProductDetailList(dto);
	}
	public void insertCorrectionShopProductDetail(CorrectionShopProductDetailDto dto) throws Exception{
		dao12.insertCorrectionShopProductDetail(dto);
	}
	public void deleteCorrectionShopProductDetail(CorrectionShopProductDetailDto dto) throws Exception{
		dao12.deleteCorrectionShopProductDetail(dto);
	}
	public List<CorrectionOnlineVideoDto> getCorrectionOnlineVideoList(CorrectionOnlineVideoDto dto) throws Exception{
		return dao21.getCorrectionOnlineVideoList(dto);
	}
	public void insertCorrectionOnlineVideo(CorrectionOnlineVideoDto dto) throws Exception{
		dao21.insertCorrectionOnlineVideo(dto);
	}
	public void updateCorrectionOnlineVideo(CorrectionOnlineVideoDto dto) throws Exception{
		dao21.updateCorrectionOnlineVideo(dto);
	}
	public void deleteCorrectionOnlineVideo(CorrectionOnlineVideoDto dto) throws Exception{
		dao21.deleteCorrectionOnlineVideo(dto);
	}
	
	public List<CorrectionTestTypeDto> getCorrectionTestTypeList(CorrectionTestTypeDto dto) throws Exception{
		return dao31.getCorrectionTestTypeList(dto);
	}
	public void insertCorrectionTestType(CorrectionTestTypeDto dto) throws Exception{
		dao31.insertCorrectionTestType(dto);
	}
	public void updateCorrectionTestType(CorrectionTestTypeDto dto) throws Exception{
		dao31.updateCorrectionTestType(dto);
	}
	public void deleteCorrectionTestType(CorrectionTestTypeDto dto) throws Exception{
		dao31.deleteCorrectionTestType(dto);
	}
	
	public List<CorrectionTestBookDto> getCorrectionTestBookList(CorrectionTestBookDto dto) throws Exception{
		return dao32.getCorrectionTestBookList(dto);
	}
	public void insertCorrectionTestBook(CorrectionTestBookDto dto) throws Exception{
		dao32.insertCorrectionTestBook(dto);
	}
	public void deleteCorrectionTestBook(CorrectionTestBookDto dto) throws Exception{
		dao32.deleteCorrectionTestBook(dto);
	}
	
	public List<CorrectionOralTestDto> getCorrectionOralTestSectionList() throws Exception{
		return dao41.getCorrectionOralTestSectionList();
	}
	public List<CorrectionOralTestDto> getCorrectionOralTestBookList(CorrectionOralTestDto dto) throws Exception{
		return dao41.getCorrectionOralTestBookList(dto);
	}
	
	public List<CorrectionOralTestDto> getCorrectionOralTestList(CorrectionOralTestDto dto) throws Exception{
		return dao41.getCorrectionOralTestList(dto);
	}
	public void insertCorrectionOralTest(CorrectionOralTestDto dto) throws Exception{
		dao41.insertCorrectionOralTest(dto);
	}
	public void updateCorrectionOralTest(CorrectionOralTestDto dto) throws Exception{
		dao41.updateCorrectionOralTest(dto);
	}
	public void deleteCorrectionOralTest(CorrectionOralTestDto dto) throws Exception{
		dao41.deleteCorrectionOralTest(dto);
	}
}