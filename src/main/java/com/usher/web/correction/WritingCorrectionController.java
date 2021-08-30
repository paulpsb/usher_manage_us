package com.usher.web.correction;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.dto.AuthUserDto;
import com.usher.dto.BaseExamRuburicDto;
import com.usher.dto.BaseExamRuburicStandardDto;
import com.usher.dto.CorrectionExamsAnswerDto;
import com.usher.dto.CorrectionExamsAppealDto;
import com.usher.dto.CorrectionExamsCommentDto;
import com.usher.dto.CorrectionExamsNoteDto;
import com.usher.dto.CorrectionExamsPenDto;
import com.usher.dto.CorrectionExamsRuburicDto;
import com.usher.dto.CorrectionUserProductDto;
import com.usher.dto.InternalExamsAnswerDto;
import com.usher.dto.InternalExamsChainDto;
import com.usher.dto.InternalExamsSpeakingDto;
import com.usher.dto.InternalExamsUseranswerCommentDto;
import com.usher.dto.InternalExamsUseranswerDto;
import com.usher.dto.InternalExamsUseranswerRubricDto;
import com.usher.dto.InternalExamsWritingDto;
import com.usher.dto.PracticesPracticeresultDto;
import com.usher.service.AuthService;
import com.usher.service.BaseService;
import com.usher.service.CorrectionExamsService;
import com.usher.service.InternalExamsService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;


@Controller
public class WritingCorrectionController{
	@Autowired
	AuthService authService;

	@Autowired
	BaseService baseService;
	
	@Autowired
	CorrectionExamsService correctionExamsService;

	@Autowired
	InternalExamsService internalExamsService;
	
	@RequestMapping(value="/correction/writing_correct_list.do")
	public String writing_correct_list(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		CorrectionExamsAnswerDto dto = new CorrectionExamsAnswerDto();
		dto.setSection("WRITING");
		List<CorrectionExamsAnswerDto> courseList = correctionExamsService.getCorrectionExamsAnswerCourseList(dto);
		modelMap.addAttribute("courseList", courseList);
		return "correction/writing_correct_list";
	}
	
	@RequestMapping(value="/correction/getWritingCorrectionList.do")
	public @ResponseBody Map getWritingCorrectionList(HttpServletRequest request,
						CorrectionExamsAnswerDto dto, 
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return null;
		}
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);

		CorrectionExamsAnswerDto resultCount = correctionExamsService.getCorrectionExamsAnswerCount(dto);
		List<CorrectionExamsAnswerDto> resultList = correctionExamsService.getCorrectionExamsAnswerList(dto);
		List<CorrectionExamsAnswerDto> reviewList = correctionExamsService.getCorrectionExamsAnswerAppealReviewList(dto);
		resultMap.put("resultCount", resultCount);
		resultMap.put("resultList", resultList);
		resultMap.put("reviewList", reviewList);

		return resultMap;
	}
	
	@RequestMapping(value="/correction/getWritingCorrectionPenCountList.do")
	public @ResponseBody Map getWritingCorrectionPenCountList(HttpServletRequest request,
						CorrectionExamsAnswerDto dto, 
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return null;
		}
		
		Map resultMap = new HashMap();

		List<CorrectionExamsAnswerDto> monthlyList = correctionExamsService.getCorrectionExamsAnswerMonthlyPenCountList(dto);
		List<CorrectionExamsAnswerDto> dailyList = correctionExamsService.getCorrectionExamsAnswerDailyPenCountList(dto);
		resultMap.put("monthlyList", monthlyList);
		resultMap.put("dailyList", dailyList);

		return resultMap;
	}
	
	@RequestMapping(value="/correction/correct/correct_writing.do")
	public String correct_writing(HttpServletRequest request,
						CorrectionExamsAnswerDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		modelMap.addAttribute("resultInfo", dto);
		
		return "correction/correct/correct_writing";
	}
	
	@RequestMapping(value="/correction/correct/correct_writing_rubric.do")
	public String correct_writing_rubric(HttpServletRequest request,
						CorrectionExamsAnswerDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		modelMap.addAttribute("resultInfo", dto);
		
		return "correction/correct/correct_writing_rubric";
	}
	
	@RequestMapping(value="/correction/correct/correct_writing_pen.do")
	public String correct_writing_pen(HttpServletRequest request,
						CorrectionExamsAnswerDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		CorrectionExamsAnswerDto resultInfo = correctionExamsService.getCorrectionExamsAnswer(dto);
		modelMap.addAttribute("resultInfo", resultInfo);
		
		CorrectionExamsPenDto dto2 = new CorrectionExamsPenDto();
		dto2.setCorrection_exams_answer_id(dto.getId());
		CorrectionExamsPenDto penInfo = correctionExamsService.getCorrectionExamsPen(dto2);
		if(penInfo == null) {
			penInfo = new CorrectionExamsPenDto();
			penInfo.setPen_comment(resultInfo.getAnswer().replaceAll("(\\r\\n|\\r|\\n|\\n\\r)", "<br>"));
		}
		modelMap.addAttribute("penInfo", penInfo);
		
		return "correction/correct/correct_writing_pen";
	}
	
	@RequestMapping(value="/correction/correct/getWritingResult.do")
	public @ResponseBody Map getWritingResult(HttpServletRequest request,
			CorrectionExamsAnswerDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		
		CorrectionExamsAnswerDto resultInfo = correctionExamsService.getCorrectionExamsAnswer(dto);
		resultMap.put("resultInfo", resultInfo);
		
		BaseExamRuburicDto dto4 = new BaseExamRuburicDto();
		dto4.setSection(resultInfo.getSection());
		dto4.setBook(resultInfo.getBook());
		List<BaseExamRuburicDto> examRuburicInfo = baseService.getBaseExamRuburicList(dto4); 
		resultMap.put("examRuburicInfo", examRuburicInfo);
		
		CorrectionExamsRuburicDto dto1 = new CorrectionExamsRuburicDto();
		dto1.setCorrection_exams_answer_id(dto.getId());
		CorrectionExamsRuburicDto ruburiInfo = correctionExamsService.getCorrectionExamsRuburic(dto1);
		resultMap.put("ruburiInfo", ruburiInfo);
		
		CorrectionExamsPenDto dto2 = new CorrectionExamsPenDto();
		dto2.setCorrection_exams_answer_id(dto.getId());
		CorrectionExamsPenDto penInfo = correctionExamsService.getCorrectionExamsPen(dto2);
		resultMap.put("penInfo", penInfo);
		
		CorrectionExamsNoteDto dto3 = new CorrectionExamsNoteDto();
		dto3.setCorrection_exams_answer_id(dto.getId());
		CorrectionExamsNoteDto noteInfo = correctionExamsService.getCorrectionExamsAnswer(dto3);
		resultMap.put("noteInfo", noteInfo);

		CorrectionExamsCommentDto dto5 = new CorrectionExamsCommentDto();
		dto5.setCorrection_exams_answer_id(dto.getId());
		List<CorrectionExamsCommentDto> commentList = correctionExamsService.getCorrectionExamsCommentList(dto5);
		resultMap.put("commentList", commentList);
		
		CorrectionExamsAppealDto dto6 = new CorrectionExamsAppealDto();
		dto6.setCorrection_exams_answer_id(dto.getId());
		List<CorrectionExamsAppealDto> appealList = correctionExamsService.getCorrectionExamsAppealList(dto6);
		resultMap.put("appealList", appealList);
		
		BaseExamRuburicStandardDto dto7 = new BaseExamRuburicStandardDto();
		dto7.setSection(resultInfo.getSection());
		dto7.setBook(resultInfo.getBook());
		BaseExamRuburicStandardDto examRuburicStandardInfo = baseService.getBaseExamRuburicStandard(dto7); 
		resultMap.put("examRuburicStandardInfo", examRuburicStandardInfo);
		
		return resultMap;
	}
	
	@RequestMapping(value="/correction/correct/saveWritingTestPen.do")
	public @ResponseBody void saveWritingTestPen(HttpServletRequest request,CorrectionExamsPenDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setPen_id(userInfo.getUser_id());
		correctionExamsService.insertCorrectionExamsPen(dto);
		
		CorrectionExamsAnswerDto dto1 = new CorrectionExamsAnswerDto();
		dto1.setId(dto.getCorrection_exams_answer_id());
		dto1.setAnswer_correct_pen_id(userInfo.getUser_id());
		dto1.setAnswer_correct_pen_count(dto.getAnswer_correct_pen_count());
		
		correctionExamsService.updateCorrectionExamsAnswerCorrectPen(dto1);
		
		CorrectionExamsAnswerDto resultInfo = correctionExamsService.getCorrectionExamsAnswer(dto1);
		if(resultInfo.getAnswer_rublic_yn().equals("Y") && resultInfo.getAnswer_correct_pen_yn().equals("Y")){
			dto1.setStatus("COMPLETE");
			correctionExamsService.updateCorrectionExamsAnswerStatus(dto1);
		}
	}
	
	@RequestMapping(value="/correction/correct/saveWritingTestRubric.do")
	public @ResponseBody void saveWritingTestRubric(HttpServletRequest request,CorrectionExamsRuburicDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setRubric_id(userInfo.getUser_id());
		correctionExamsService.insertCorrectionExamsRuburic(dto);
		
		CorrectionExamsAnswerDto dto1 = new CorrectionExamsAnswerDto();
		dto1.setId(dto.getCorrection_exams_answer_id());
		dto1.setAnswer_rublic_id(userInfo.getUser_id());
		dto1.setAnswer_rublic_score(dto.getRubric_total_score());
		correctionExamsService.updateCorrectionExamsAnswerRubric(dto1);
		
		CorrectionExamsAnswerDto resultInfo = correctionExamsService.getCorrectionExamsAnswer(dto1);
		if(resultInfo.getAnswer_rublic_yn().equals("Y") && resultInfo.getAnswer_correct_pen_yn().equals("Y")){
			dto1.setStatus("COMPLETE");
			correctionExamsService.updateCorrectionExamsAnswerStatus(dto1);
		}
	}
	
	@RequestMapping(value="/correction/correct/correct_writing_comment.do")
	public String writing_comment(HttpServletRequest request,
						CorrectionExamsCommentDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/main/main.do";
		}
		
		CorrectionExamsCommentDto commentInfo = correctionExamsService.getCorrectionExamsComment(dto);
		
		modelMap.addAttribute("commentInfo", commentInfo);

		return "correction/correct/correct_writing_comment";
	}
	
	@RequestMapping(value="/correction/correct/saveWritingComment.do")
	public @ResponseBody void saveWritingComment(HttpServletRequest request,
						CorrectionExamsCommentDto dto, 
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return;
		}
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setComment_id(userInfo.getUser_id());
		correctionExamsService.updateCorrectionExamsComment(dto);
	}
	
	@RequestMapping(value="/correction/correct/deleteWritingComment.do")
	public @ResponseBody void deleteWritingComment(HttpServletRequest request,
						CorrectionExamsCommentDto dto, 
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return;
		}
		
		correctionExamsService.deleteCorrectionExamsComment(dto);
	}

	@RequestMapping(value="/correction/correct/correct_writing_script.do")
	public String correct_speaking_script(HttpServletRequest request,
						CorrectionExamsAnswerDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		CorrectionExamsAnswerDto resultInfo = correctionExamsService.getCorrectionExamsAnswer(dto);
		modelMap.addAttribute("resultInfo", resultInfo);
		
		
		
		return "correction/correct/correct_writing_script";
	}
	
	@RequestMapping(value="/correction/correct/getInternalExamsWritingAsArticle.do")
	public @ResponseBody InternalExamsWritingDto getInternalExamsWritingAsArticle(HttpServletRequest request, InternalExamsWritingDto dto) throws Exception {
		return internalExamsService.getInternalExamsWritingAsArticle(dto);
	}
	
	@RequestMapping(value="/correction/correct/correct_writing_appeal.do")
	public String correct_writing_appeal(HttpServletRequest request,
						CorrectionExamsAppealDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/main/main.do";
		}
		
		CorrectionExamsAppealDto appealInfo = correctionExamsService.getCorrectionExamsAppeal(dto);
		
		modelMap.addAttribute("appealInfo", appealInfo);

		return "correction/correct/correct_writing_appeal";
	}
	
	@RequestMapping(value="/correction/correct/getCorrectionExamsWritingAppeal.do")
	public @ResponseBody CorrectionExamsAppealDto getCorrectionExamsWritingAppeal(HttpServletRequest request, CorrectionExamsAppealDto dto) throws Exception {
		return correctionExamsService.getCorrectionExamsAppeal(dto);
	}
	
	@RequestMapping(value="/correction/correct/updateCorrectionExamsWritingAppeal.do")
	public @ResponseBody void updateCorrectionExamsWritingAppeal(HttpServletRequest request, CorrectionExamsAppealDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setAppeal_answer_id(userInfo.getUser_id());
		correctionExamsService.updateCorrectionExamsAppeal(dto);
		CorrectionExamsAnswerDto dto1 = new CorrectionExamsAnswerDto();
		dto1.setId(dto.getCorrection_exams_answer_id());
		dto1.setAnswer_appeal_status("COMPLETE");
		correctionExamsService.updateCorrectionExamsAnswerAppealStatus(dto1);
		
	}
}
