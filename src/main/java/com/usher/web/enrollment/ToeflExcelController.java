package com.usher.web.enrollment;

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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.usher.service.BaseService;
import com.usher.service.BatchService;
import com.usher.service.CoursesService;
import com.usher.service.EnrollmentsService;
import com.usher.service.ExamsService;
import com.usher.service.ExcelService;
import com.usher.service.GoalService;
import com.usher.service.PracticesService;
import com.usher.service.StudentsService;
import com.usher.dto.EnrollmentsCourseenrollmentDto;
import com.usher.dto.EnrollmentsOrientationenrollmentDto;
import com.usher.dto.EnrollmentsSeatenrollmentDto;
import com.usher.dto.ExamsToeflDto;
import com.usher.dto.GoalsGoalconcentrationDto;
import com.usher.dto.GoalsGoalconcentrationPracticeDto;
import com.usher.dto.PracticesPracticeproblemDto;
import com.usher.dto.PracticesPracticequizresultDto;
import com.usher.dto.PracticesPracticeresultDto;
import com.usher.dto.PracticesPracticeresultStaticDto;
import com.usher.dto.PracticesPracticeresultStaticSendDto;
import com.usher.dto.PracticesPracticescheduleDto;
import com.usher.dto.PracticesPracticescheduleHomeworkDto;
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.dto.PracticesPracticesectiontypeDto;
import com.usher.dto.StudentsStudentDto;
import com.usher.dto.AuthUserDto;
import com.usher.dto.BaseOrientationDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.CoursesCoursePracticeDto;
import com.usher.dto.CoursesCourseTimetableDto;
import com.usher.dto.CoursesSemesterDto;
import com.usher.util.SendUtil;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;


@Controller
public class ToeflExcelController{
	@Autowired
	BaseService baseService; 
	
	@Autowired
	EnrollmentsService enrollmentsService;
	
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	PracticesService practicesService;
	
	@Autowired
	GoalService goalService;
	
	@Autowired
	BatchService batchService;
	
	@Autowired
	ExamsService examsService;
	
	@Autowired
	ExcelService excelService;
	
	@Autowired
	StudentsService studentsService;
	
	@RequestMapping(value="/enrollment/toefl_excel.do")
	public String toefl_excel(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";
		
		url = "enrollment/toefl_excel";
		return url;
	}
	
	@RequestMapping(value="/enrollment/getToeflExcelList.do")
	public @ResponseBody Map getToeflExcelList(HttpServletRequest request,
						ExamsToeflDto dto, 
						ModelMap modelMap) throws Exception {
		
		Map resultMap = new HashMap();
		int page = dto.getPage();
		int row_num = dto.getRow_num();
		int first_num = (page -1) * row_num;
		dto.setFirst_num(first_num);

		ExamsToeflDto sttCount = examsService.getExamsToeflExcelCount(dto);
		List<ExamsToeflDto> sttList = examsService.getExamsToeflExcelList(dto);
		resultMap.put("dataCount", sttCount);
		resultMap.put("dataList", sttList);

		return resultMap;
	}
	
	@RequestMapping(value="/enrollment/uploadExcelToeflExam.do")
	public @ResponseBody void uploadExcelKeywordClass(@RequestPart MultipartFile file) throws Exception {
		List<Map<String, String>> list = excelService.uploadExcel(file);
		
		for(int i=0; i < list.size(); i++)
		{
			Map<String, String> evo = list.get(i);
			String toefl_excel_user_id = evo.get("COL1");
			String toefl_excel_user_name = evo.get("COL2");
			String toefl_excel_date = evo.get("COL4");
			String toefl_excel_rc = evo.get("COL5");
			String toefl_excel_lc = evo.get("COL6");
			String toefl_excel_sp = evo.get("COL7");
			String toefl_excel_wr = evo.get("COL8");
			
			//Duplicate Check
			ExamsToeflDto cto = new ExamsToeflDto();
			cto.setToefl_excel_user_id(toefl_excel_user_id);
			cto.setDate(toefl_excel_date);
			ExamsToeflDto checkToefl = examsService.getExamsToeflExcel(cto);
			if(checkToefl != null) continue;
			
			int reading = 0;
			int listening = 0;
			int speaking = 0;
			int writing = 0;
			
			if(!toefl_excel_rc.equals("재녹음") && !toefl_excel_rc.equals("채점중")) {
				reading = Integer.parseInt(toefl_excel_rc.replace(".00", ""));
			}
			if(!toefl_excel_lc.equals("재녹음") && !toefl_excel_lc.equals("채점중")) {
				listening = Integer.parseInt(toefl_excel_lc.replace(".00", ""));
			}
			
			if(!toefl_excel_sp.equals("재녹음") && !toefl_excel_sp.equals("채점중")) {
				speaking = Integer.parseInt(toefl_excel_sp.replace(".00", ""));
			}
			if(!toefl_excel_wr.equals("재녹음") && !toefl_excel_sp.equals("채점중")) {
				writing = Integer.parseInt(toefl_excel_wr.replace(".00", ""));
			}
			
			int total_score = reading + listening + speaking + writing;
			ExamsToeflDto sto = new ExamsToeflDto();
			sto.setToefl_excel_user_id(toefl_excel_user_id);
			sto.setToefl_excel_user_name(toefl_excel_user_name);
			sto.setToefl_excel_upload("Y");
			sto.setDate(toefl_excel_date);
			sto.setReading(reading);
			sto.setListening(listening);
			sto.setWriting(writing);
			sto.setSpeaking(speaking);
			sto.setTotal_score(total_score);
			sto.setExams_toefl_type("MOCK");
			//ID Check
			int user_id_length = toefl_excel_user_id.length();
			String mobile_no = toefl_excel_user_id.substring(user_id_length-4);
			
			StudentsStudentDto dto1 = new StudentsStudentDto();
			dto1.setStudent_name(toefl_excel_user_name);
			dto1.setMobile_no(mobile_no);
			StudentsStudentDto userInfo = studentsService.getExcelUser(dto1);
			if(userInfo != null) {
				sto.setUser_id(userInfo.getUser_id());
				sto.setToefl_excel_matching("Y");
			}else {
				sto.setUser_id(0);
				sto.setToefl_excel_matching("N");
			}
			
			examsService.insertExamsToeflExcel(sto);
		}
		
	}
	
	@RequestMapping(value="/enrollment/updateExamsToeflExcel.do")
	public @ResponseBody void updateExamsToeflExcel(HttpServletRequest request,
						ExamsToeflDto dto, 
						ModelMap modelMap) throws Exception {
		examsService.updateExamsToeflExcel(dto);
		
	}
}