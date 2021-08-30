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
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.service.BaseService;
import com.usher.service.BatchService;
import com.usher.service.CoursesService;
import com.usher.service.EnrollmentsService;
import com.usher.service.ExamsService;
import com.usher.service.GoalService;
import com.usher.service.PracticesService;
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
public class AchievementNewController{
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
	
	@RequestMapping(value="/enrollment/achievement_new.do")
	public String achievement_new(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";
		
		url = "enrollment/achievement_new";
		return url;
	}
	
	@RequestMapping(value="/enrollment/achievement_new_action.do")
	public String achievement_new_action(HttpServletRequest request, EnrollmentsOrientationenrollmentDto dto, ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		
		CoursesCourseDto dto5 = new CoursesCourseDto();
		dto5.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto5);
		modelMap.addAttribute("courseInfo", courseInfo);
		
		
		if(StringUtil.nvl(dto.getPractice_type()).equals("PASSAGE"))
		{
			dto.setPractice_type("PASSAGE_PHRASE");
		}
		PracticesPracticesectiontypeDto dto1 = new PracticesPracticesectiontypeDto();
		dto1.setSection(dto.getSection());
		dto1.setPractice_type(dto.getPractice_type());

		PracticesPracticesectiontypeDto practiceInfo = practicesService.getPracticeSectionType(dto1);
		if(StringUtil.nvl(dto.getPractice_type()).equals("PASSAGE_PHRASE"))
		{
			if(practiceInfo != null)
			{
				practiceInfo.setPractice_name("구문/단어");
			}
		}

		modelMap.addAttribute("practiceInfo", practiceInfo);

		CoursesCourseTimetableDto dto3 = new CoursesCourseTimetableDto();
		dto3.setSection(dto.getSection());
		if(StringUtil.nvl(dto.getPractice_type()).equals("PASSAGE"))
		{
				dto3.setPractice_type("PASSAGE_PHRASE");
		}else {
				if(StringUtil.nvl(dto.getSection()).equals("VOCA")) {
					dto3.setPractice_type("VOCA");
				}else {
					dto3.setPractice_type(dto.getPractice_type());
				}
		}
		dto3.setCourse_id(dto.getCourse_id());
		CoursesCourseTimetableDto teacherInfo = coursesService.getCourseGroupTimeTableTeacher(dto3);
		if(teacherInfo == null) {
			teacherInfo = new CoursesCourseTimetableDto();
			teacherInfo.setUser_name("");
		}else {
			if(!StringUtil.nvl(teacherInfo.getUser_name()).equals("")) {
				String user_name = teacherInfo.getUser_name();
				teacherInfo.setUser_name("책임자 : "+user_name);
			}else {
				teacherInfo.setUser_name("");
			}
		}

		modelMap.addAttribute("teacherInfo", teacherInfo);
		
		modelMap.addAttribute("archieveInfo", dto);
		
		return "enrollment/achievement_new_"+dto.getOrientation_code();
	}
	
	@RequestMapping(value="/enrollment/getAchieveOtList.do")
	public @ResponseBody Map getAchieveOtList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		CoursesCoursePracticeDto dto7 = new CoursesCoursePracticeDto();
		dto7.setCourse_id(dto.getCourse_id());
		
		List<CoursesCoursePracticeDto> sectionList = coursesService.getCoursesCourseSectionList(dto7);
		resultMap.put("sectionList", sectionList);
		List<CoursesCoursePracticeDto> practiceAllList = coursesService.getCoursesCoursePracticeList(dto7);
		resultMap.put("practiceAllList", practiceAllList);
		List<CoursesCoursePracticeDto> practiceList = coursesService.getCoursesCoursePracticeDailyAllList(dto7);
		resultMap.put("practiceList", practiceList);
		
		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentAchieveList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		
		BaseOrientationDto dto2 = new BaseOrientationDto();
		dto2.setOrientation_gubun("BASE");
		dto2.setUse_yn("Y");
		List<BaseOrientationDto> baseOrientationList = baseService.getBaseOrientationList(dto2);
		resultMap.put("baseOrientationList", baseOrientationList);
		
		BaseOrientationDto dto3 = new BaseOrientationDto();
		dto3.setOrientation_gubun("PROGRAM");
		dto3.setUse_yn("Y");
		List<BaseOrientationDto> programOrientationList = baseService.getBaseOrientationList(dto3);
		resultMap.put("programOrientationList", programOrientationList);
		
		EnrollmentsOrientationenrollmentDto dto4 = new EnrollmentsOrientationenrollmentDto();
		dto4.setCourse_id(dto.getCourse_id());
		
		List<EnrollmentsOrientationenrollmentDto> orientationList = enrollmentsService.getEnrollmentsOrientationList(dto4);
		resultMap.put("orientationList", orientationList);
		
		CoursesCourseDto dto5 = new CoursesCourseDto();
		dto5.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto5);
		resultMap.put("courseInfo", courseInfo);
		
		EnrollmentsCourseenrollmentDto dto6 = new EnrollmentsCourseenrollmentDto();
		dto6.setCourse_id(dto.getCourse_id());
		if(courseInfo.getStudent_type().equals("JUNIOR")) {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentDaillyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}else {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentMonthlyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}
		return resultMap;
	}
	
	@RequestMapping(value="/enrollment/getAchieveGoalList.do")
	public @ResponseBody Map getAchieveGoalList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentAchieveList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		
		List<PracticesPracticesectionDto> sectionList1 = practicesService.getPracticeSectionList();
		resultMap.put("sectionList1", sectionList1);
		
		CoursesCoursePracticeDto dto1 = new CoursesCoursePracticeDto();
		dto1.setCourse_id(dto.getCourse_id());
		List<CoursesCoursePracticeDto> sectionList = coursesService.getCoursesCourseSectionList(dto1);
		resultMap.put("sectionList", sectionList);
		List<CoursesCoursePracticeDto> practiceAllList = coursesService.getCoursesCoursePracticeList(dto1);
		resultMap.put("practiceAllList", practiceAllList);
		List<CoursesCoursePracticeDto> practiceList = coursesService.getCoursesCoursePracticeTodayList(dto1);
		resultMap.put("practiceList", practiceList);
		
		GoalsGoalconcentrationDto dto2 = new GoalsGoalconcentrationDto();
		dto2.setCourse_id(dto.getCourse_id());
		List<GoalsGoalconcentrationDto> concentrationList = goalService.getGoalConcentrationList(dto2);
		resultMap.put("concentrationList", concentrationList);
		
		GoalsGoalconcentrationPracticeDto dto3 = new GoalsGoalconcentrationPracticeDto();
		dto3.setCourse_id(dto.getCourse_id());
		List<GoalsGoalconcentrationPracticeDto> concentrationPracticeList = goalService.getGoalConcentrationPracticeList(dto3);
		resultMap.put("concentrationPracticeList", concentrationPracticeList);
		
		CoursesCourseDto dto5 = new CoursesCourseDto();
		dto5.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto5);
		resultMap.put("courseInfo", courseInfo);
		
		EnrollmentsCourseenrollmentDto dto6 = new EnrollmentsCourseenrollmentDto();
		dto6.setCourse_id(dto.getCourse_id());
		if(courseInfo.getStudent_type().equals("JUNIOR")) {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentDaillyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}else {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentMonthlyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}
		return resultMap;
	}
	
	@RequestMapping(value="/enrollment/getAchieveToeflExamBatchList.do")
	public @ResponseBody Map getAchieveToeflExamBatchList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		CoursesCourseDto dto5 = new CoursesCourseDto();
		dto5.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto5);
		resultMap.put("courseInfo", courseInfo);
		
		CoursesCoursePracticeDto dto7 = new CoursesCoursePracticeDto();
		dto7.setCourse_id(dto.getCourse_id());
		
		List<CoursesCoursePracticeDto> sectionList = coursesService.getCoursesCourseSectionList(dto7);
		resultMap.put("sectionList", sectionList);
		List<CoursesCoursePracticeDto> practiceAllList = coursesService.getCoursesCoursePracticeList(dto7);
		resultMap.put("practiceAllList", practiceAllList);
		List<CoursesCoursePracticeDto> practiceList = coursesService.getCoursesCoursePracticeDailyAllList(dto7);
		resultMap.put("practiceList", practiceList);
		
		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentAchieveList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		
		CoursesSemesterDto dto4 = new CoursesSemesterDto();
		dto4.setId(courseInfo.getSemester_id());
		CoursesSemesterDto semesterInfo = coursesService.getSemesterDate(dto4);
		resultMap.put("semesterInfo", semesterInfo);
		
		BatchResultDto dto3 = new BatchResultDto();
		dto3.setCourse_id(dto.getCourse_id());
		dto3.setBatch_exam_date(semesterInfo.getDate());
		List<BatchResultDto> batchList = batchService.getBatchResultCourseList(dto3);
		resultMap.put("batchList", batchList);
		
		dto3.setBatch_exam_date(semesterInfo.getPre_date1());
		List<BatchResultDto> batchList1 = batchService.getBatchResultCourseList(dto3);
		resultMap.put("batchList1", batchList1);
		
		dto3.setBatch_exam_date(semesterInfo.getPre_date2());
		List<BatchResultDto> batchList2 = batchService.getBatchResultCourseList(dto3);
		resultMap.put("batchList2", batchList2);
		
		dto3.setBatch_exam_date(semesterInfo.getPre_date3());
		List<BatchResultDto> batchList3 = batchService.getBatchResultCourseList(dto3);
		resultMap.put("batchList3", batchList3);
		
		dto3.setBatch_exam_date(semesterInfo.getPre_date4());
		List<BatchResultDto> batchList4 = batchService.getBatchResultCourseList(dto3);
		resultMap.put("batchList4", batchList4);
		
		dto3.setBatch_exam_date(semesterInfo.getPre_date5());
		List<BatchResultDto> batchList5 = batchService.getBatchResultCourseList(dto3);
		resultMap.put("batchList5", batchList5);
		
		EnrollmentsCourseenrollmentDto dto6 = new EnrollmentsCourseenrollmentDto();
		dto6.setCourse_id(dto.getCourse_id());
		if(courseInfo.getStudent_type().equals("JUNIOR")) {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentDaillyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}else {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentMonthlyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}
		return resultMap;
	}
	
	@RequestMapping(value="/enrollment/getAchieveToeflExamMockList.do")
	public @ResponseBody Map getAchieveToeflExamMockList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		CoursesCourseDto dto5 = new CoursesCourseDto();
		dto5.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto5);
		resultMap.put("courseInfo", courseInfo);
		
		CoursesCoursePracticeDto dto7 = new CoursesCoursePracticeDto();
		dto7.setCourse_id(dto.getCourse_id());
		
		List<CoursesCoursePracticeDto> sectionList = coursesService.getCoursesCourseSectionList(dto7);
		resultMap.put("sectionList", sectionList);
		List<CoursesCoursePracticeDto> practiceAllList = coursesService.getCoursesCoursePracticeList(dto7);
		resultMap.put("practiceAllList", practiceAllList);
		List<CoursesCoursePracticeDto> practiceList = coursesService.getCoursesCoursePracticeDailyAllList(dto7);
		resultMap.put("practiceList", practiceList);
		
		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentAchieveList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		
		CoursesSemesterDto dto4 = new CoursesSemesterDto();
		dto4.setId(courseInfo.getSemester_id());
		CoursesSemesterDto semesterInfo = coursesService.getSemesterDate(dto4);
		resultMap.put("semesterInfo", semesterInfo);
		
		ExamsToeflDto dto3 = new ExamsToeflDto();
		dto3.setCourse_id(dto.getCourse_id());
		dto3.setExams_toefl_type("MOCK");
		dto3.setDate(semesterInfo.getDate());
		List<ExamsToeflDto> mockList = examsService.getExamsToeflList(dto3);
		resultMap.put("mockList", mockList);
		
		dto3.setDate(semesterInfo.getPre_date1());
		List<ExamsToeflDto> mockList1 = examsService.getExamsToeflList(dto3);
		resultMap.put("mockList1", mockList1);
		
		dto3.setDate(semesterInfo.getPre_date2());
		List<ExamsToeflDto> mockList2 = examsService.getExamsToeflList(dto3);
		resultMap.put("mockList2", mockList2);
		
		dto3.setDate(semesterInfo.getPre_date3());
		List<ExamsToeflDto> mockList3 = examsService.getExamsToeflList(dto3);
		resultMap.put("mockList3", mockList3);
		
		dto3.setDate(semesterInfo.getPre_date4());
		List<ExamsToeflDto> mockList4 = examsService.getExamsToeflList(dto3);
		resultMap.put("mockList4", mockList4);
		
		dto3.setDate(semesterInfo.getPre_date5());
		List<ExamsToeflDto> mockList5 = examsService.getExamsToeflList(dto3);
		resultMap.put("mockList5", mockList5);
		
		EnrollmentsCourseenrollmentDto dto6 = new EnrollmentsCourseenrollmentDto();
		dto6.setCourse_id(dto.getCourse_id());
		if(courseInfo.getStudent_type().equals("JUNIOR")) {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentDaillyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}else {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentMonthlyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}
		return resultMap;
	}
	
	@RequestMapping(value="/enrollment/getAchieveToeflExamRealList.do")
	public @ResponseBody Map getAchieveToeflExamRealList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		CoursesCourseDto dto5 = new CoursesCourseDto();
		dto5.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto5);
		resultMap.put("courseInfo", courseInfo);
		
		CoursesCoursePracticeDto dto7 = new CoursesCoursePracticeDto();
		dto7.setCourse_id(dto.getCourse_id());
		
		List<CoursesCoursePracticeDto> sectionList = coursesService.getCoursesCourseSectionList(dto7);
		resultMap.put("sectionList", sectionList);
		List<CoursesCoursePracticeDto> practiceAllList = coursesService.getCoursesCoursePracticeList(dto7);
		resultMap.put("practiceAllList", practiceAllList);
		List<CoursesCoursePracticeDto> practiceList = coursesService.getCoursesCoursePracticeDailyAllList(dto7);
		resultMap.put("practiceList", practiceList);
		
		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentAchieveList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		
		CoursesSemesterDto dto4 = new CoursesSemesterDto();
		dto4.setId(courseInfo.getSemester_id());
		CoursesSemesterDto semesterInfo = coursesService.getSemesterDate(dto4);
		resultMap.put("semesterInfo", semesterInfo);
		
		ExamsToeflDto dto3 = new ExamsToeflDto();
		dto3.setCourse_id(dto.getCourse_id());
		dto3.setExams_toefl_type("REAL");
		dto3.setDate(semesterInfo.getDate());
		List<ExamsToeflDto> realList = examsService.getExamsToeflList(dto3);
		resultMap.put("realList", realList);
		
		dto3.setDate(semesterInfo.getPre_date1());
		List<ExamsToeflDto> realList1 = examsService.getExamsToeflList(dto3);
		resultMap.put("realList1", realList1);
		
		dto3.setDate(semesterInfo.getPre_date2());
		List<ExamsToeflDto> realList2 = examsService.getExamsToeflList(dto3);
		resultMap.put("realList2", realList2);
		
		dto3.setDate(semesterInfo.getPre_date3());
		List<ExamsToeflDto> realList3 = examsService.getExamsToeflList(dto3);
		resultMap.put("realList3", realList3);
		
		dto3.setDate(semesterInfo.getPre_date4());
		List<ExamsToeflDto> realList4 = examsService.getExamsToeflList(dto3);
		resultMap.put("realList4", realList4);
		
		dto3.setDate(semesterInfo.getPre_date5());
		List<ExamsToeflDto> realList5 = examsService.getExamsToeflList(dto3);
		resultMap.put("realList5", realList5);
		
		EnrollmentsCourseenrollmentDto dto6 = new EnrollmentsCourseenrollmentDto();
		dto6.setCourse_id(dto.getCourse_id());
		if(courseInfo.getStudent_type().equals("JUNIOR")) {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentDaillyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}else {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentMonthlyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}
		return resultMap;
	}
	
	@RequestMapping(value="/enrollment/getExamsToeflUserMonthList.do")
	public @ResponseBody List<ExamsToeflDto> getExamsToeflUserMonthList(HttpServletRequest request, ExamsToeflDto dto) throws Exception {
		return examsService.getExamsToeflUserMonthList(dto);
	}
	
	@RequestMapping(value="/enrollment/saveExamsToefl.do")
	public @ResponseBody void saveExamsToefl(HttpServletRequest request, ExamsToeflDto dto) throws Exception {
		examsService.deleteExamsToefl(dto);
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			
			int user_id = Integer.parseInt(jsonObj.get("user_id").toString());
			String date = jsonObj.get("date").toString();
			String exams_toefl_type = jsonObj.get("exams_toefl_type").toString();
			int listening = Integer.parseInt(jsonObj.get("listening").toString());
			int reading = Integer.parseInt(jsonObj.get("reading").toString());
			int writing = Integer.parseInt(jsonObj.get("writing").toString());
			int speaking = Integer.parseInt(jsonObj.get("speaking").toString());
			int total_score = Integer.parseInt(jsonObj.get("total_score").toString());
			
			ExamsToeflDto sto = new ExamsToeflDto();
			sto.setUser_id(user_id);
			sto.setDate(date);
			sto.setExams_toefl_type(exams_toefl_type);
			sto.setListening(listening);
			sto.setReading(reading);
			sto.setWriting(writing);
			sto.setSpeaking(speaking);
			sto.setTotal_score(total_score);
			examsService.insertExamsToefl(sto);
		}
		
	}

	@RequestMapping(value="/enrollment/getAchieveGoalConcentration.do")
	public @ResponseBody Map getAchieveGoalConcentration(HttpServletRequest request, GoalsGoalconcentrationDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		List<PracticesPracticesectionDto> sectionList = practicesService.getPracticeSectionList();
		resultMap.put("sectionList", sectionList);
		
		GoalsGoalconcentrationDto concentrationInfo = goalService.getGoalConcentration(dto);
		resultMap.put("concentrationInfo", concentrationInfo);
		
		CoursesCourseDto dto2 = new CoursesCourseDto();
		dto2.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto2);
		resultMap.put("courseInfo", courseInfo);
		
		return resultMap;
	}
	
	@RequestMapping(value="/enrollment/saveAchieveGoalConcentration.do")
	public @ResponseBody void saveAchieveGoalConcentration(HttpServletRequest request, GoalsGoalconcentrationDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setWriter_id(userInfo.getUser_id());
		goalService.updateGoalConcentration(dto);
	}
	
	@RequestMapping(value="/enrollment/getAchieveGoalConcentrationPactice.do")
	public @ResponseBody GoalsGoalconcentrationPracticeDto getAchieveGoalConcentrationPactice(HttpServletRequest request, GoalsGoalconcentrationPracticeDto dto) throws Exception {
		
		return goalService.getGoalConcentrationPractice(dto);
	}
	
	@RequestMapping(value="/enrollment/saveAchieveGoalConcentrationPactice.do")
	public @ResponseBody void saveAchieveGoalConcentrationPactice(HttpServletRequest request, GoalsGoalconcentrationPracticeDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setWriter_id(userInfo.getUser_id());
		goalService.updateGoalConcentrationPractice(dto);
	}
	
	@RequestMapping(value="/enrollment/getAchieveAllList.do")
	public @ResponseBody Map getAllList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentAchieveList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		
		CoursesCourseDto dto1 = new CoursesCourseDto();
		dto1.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto1);
		resultMap.put("courseInfo", courseInfo);
		
		CoursesCoursePracticeDto dto11 = new CoursesCoursePracticeDto();
		dto11.setCourse_id(dto.getCourse_id());
		List<CoursesCoursePracticeDto> sectionList = coursesService.getCoursesCourseSectionList(dto11);
		resultMap.put("sectionList", sectionList);
		List<CoursesCoursePracticeDto> practiceAllList = coursesService.getCoursesCoursePracticeList(dto11);
		resultMap.put("practiceAllList", practiceAllList);
		List<CoursesCoursePracticeDto> practiceList = coursesService.getCoursesCoursePracticeDailyAllList(dto11);
		resultMap.put("practiceList", practiceList);
		
		PracticesPracticescheduleDto dto2 = new PracticesPracticescheduleDto();
		dto2.setCourse_id(dto.getCourse_id());
		dto2.setDate(dto.getDate());
		List<PracticesPracticescheduleDto> scheduleVocaList = practicesService.getPracticeScheduleCourseVocaList(dto2);
		resultMap.put("scheduleVocaList", scheduleVocaList);
		List<PracticesPracticescheduleDto> scheduleList = practicesService.getPracticeScheduleCoursePracticeTypeList(dto2);
		resultMap.put("scheduleList", scheduleList);		
		
		PracticesPracticeresultDto dto3 = new PracticesPracticeresultDto();
		dto3.setCourse_id(dto.getCourse_id());
		dto3.setDate(dto.getDate());
		List<PracticesPracticeresultDto> attendList = practicesService.getPracticeResultAttendList(dto3);
		List<PracticesPracticeresultDto> speechList = practicesService.getPracticeResultSpeechList(dto3);
		resultMap.put("attendList", attendList);
		resultMap.put("speechList", speechList);

		PracticesPracticeresultStaticDto dto4 = new PracticesPracticeresultStaticDto();
		dto4.setCourse_id(dto.getCourse_id());
		dto4.setDate(dto.getDate());
		List<PracticesPracticeresultStaticDto> resultList = practicesService.getPracticeResultStaticList(dto4);
		resultMap.put("resultList", resultList);
		
		EnrollmentsCourseenrollmentDto dto6 = new EnrollmentsCourseenrollmentDto();
		dto6.setCourse_id(dto.getCourse_id());
		if(courseInfo.getStudent_type().equals("JUNIOR")) {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentDaillyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}else {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentMonthlyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}
		
		PracticesPracticeresultStaticSendDto dto7 = new PracticesPracticeresultStaticSendDto();
		dto7.setCourse_id(dto.getCourse_id());
		dto7.setDate(dto.getDate());
		List<PracticesPracticeresultStaticSendDto> sendList = practicesService.getPracticeResultStaticSendList(dto7);
		resultMap.put("sendList", sendList);
		return resultMap;
	}
	
	@RequestMapping(value="/enrollment/getAchieveHomeworkList.do")
	public @ResponseBody Map getAchieveHomeworkList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentAchieveList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		
		CoursesCourseDto dto1 = new CoursesCourseDto();
		dto1.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto1);
		resultMap.put("courseInfo", courseInfo);
		
		PracticesPracticescheduleHomeworkDto dto11 = new PracticesPracticescheduleHomeworkDto();
		dto11.setCourse_id(dto.getCourse_id());
		dto11.setDate(dto.getDate());
		
		

		
		List<PracticesPracticescheduleHomeworkDto> sectionList = practicesService.getPracticeScheduleHomeworkSectionList(dto11);
		resultMap.put("sectionList", sectionList);
		List<PracticesPracticescheduleHomeworkDto> practiceList = practicesService.getPracticeScheduleHomeworkPracticeList(dto11);
		resultMap.put("practiceList", practiceList);
		List<PracticesPracticescheduleHomeworkDto> scheduleList = practicesService.getPracticeScheduleHomeworkCourseList(dto11);
		resultMap.put("scheduleList", scheduleList);		
		
		CoursesCoursePracticeDto dto12 = new CoursesCoursePracticeDto();
		dto12.setCourse_id(dto.getCourse_id());
		List<CoursesCoursePracticeDto> sectionList1 = coursesService.getCoursesCourseSectionList(dto12);
		resultMap.put("sectionList1", sectionList1);
		List<CoursesCoursePracticeDto> practiceAllList = coursesService.getCoursesCoursePracticeList(dto12);
		resultMap.put("practiceAllList", practiceAllList);

		
		PracticesPracticeresultDto dto3 = new PracticesPracticeresultDto();
		dto3.setCourse_id(dto.getCourse_id());
		dto3.setDate(dto.getDate());
		List<PracticesPracticeresultDto> attendList = practicesService.getPracticeResultAttendList(dto3);
		resultMap.put("attendList", attendList);

		PracticesPracticeresultStaticDto dto4 = new PracticesPracticeresultStaticDto();
		dto4.setCourse_id(dto.getCourse_id());
		dto4.setDate(dto.getDate());
		List<PracticesPracticeresultStaticDto> resultList = practicesService.getPracticeResultStaticHomeworkList(dto4);
		resultMap.put("resultList", resultList);
		
		EnrollmentsCourseenrollmentDto dto6 = new EnrollmentsCourseenrollmentDto();
		dto6.setCourse_id(dto.getCourse_id());
		if(courseInfo.getStudent_type().equals("JUNIOR")) {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentDaillyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}else {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentMonthlyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}
		
		return resultMap;
	}
	
	@RequestMapping(value="/enrollment/getAchieveVocaList.do")
	public @ResponseBody Map getAchieveVocaList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentAchieveList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		
		CoursesCourseDto dto1 = new CoursesCourseDto();
		dto1.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto1);
		resultMap.put("courseInfo", courseInfo);
		
		CoursesCoursePracticeDto dto11 = new CoursesCoursePracticeDto();
		dto11.setCourse_id(dto.getCourse_id());
		List<CoursesCoursePracticeDto> sectionList = coursesService.getCoursesCourseSectionList(dto11);
		resultMap.put("sectionList", sectionList);
		List<CoursesCoursePracticeDto> practiceAllList = coursesService.getCoursesCoursePracticeList(dto11);
		resultMap.put("practiceAllList", practiceAllList);
		List<CoursesCoursePracticeDto> practiceList = coursesService.getCoursesCoursePracticeDailyAllList(dto11);
		resultMap.put("practiceList", practiceList);
		
		PracticesPracticescheduleDto dto2 = new PracticesPracticescheduleDto();
		dto2.setCourse_id(dto.getCourse_id());
		List<PracticesPracticescheduleDto> scheduleVocaList = practicesService.getPracticeScheduleCourseVocaList(dto2);
		resultMap.put("scheduleVocaList", scheduleVocaList);

		PracticesPracticeresultDto dto3 = new PracticesPracticeresultDto();
		dto3.setCourse_id(dto.getCourse_id());
		List<PracticesPracticeresultDto> attendList = practicesService.getPracticeResultAttendList(dto3);
		List<PracticesPracticeresultDto> speechList = practicesService.getPracticeResultSpeechList(dto3);
		resultMap.put("attendList", attendList);
		resultMap.put("speechList", speechList);

		PracticesPracticeresultStaticDto dto4 = new PracticesPracticeresultStaticDto();
		dto4.setCourse_id(dto.getCourse_id());
		dto4.setSection("VOCA");
		//dto4.setPractice_type("VOCA");
		List<PracticesPracticeresultStaticDto> resultList = practicesService.getPracticeResultStaticList(dto4);
		resultMap.put("resultList", resultList);
		
		EnrollmentsCourseenrollmentDto dto6 = new EnrollmentsCourseenrollmentDto();
		dto6.setCourse_id(dto.getCourse_id());
		if(courseInfo.getStudent_type().equals("JUNIOR")) {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentDaillyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}else {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentMonthlyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}
		
		return resultMap;
	}
	
	
	@RequestMapping(value="/enrollment/getAchieveAllPracticeList.do")
	public @ResponseBody Map getAchieveAllPracticeList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentAchieveList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		
		CoursesCourseDto dto1 = new CoursesCourseDto();
		dto1.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto1);
		resultMap.put("courseInfo", courseInfo);
		
		CoursesCoursePracticeDto dto11 = new CoursesCoursePracticeDto();
		dto11.setCourse_id(dto.getCourse_id());
		List<CoursesCoursePracticeDto> sectionList = coursesService.getCoursesCourseSectionList(dto11);
		resultMap.put("sectionList", sectionList);
		List<CoursesCoursePracticeDto> practiceAllList = coursesService.getCoursesCoursePracticeList(dto11);
		resultMap.put("practiceAllList", practiceAllList);
		List<CoursesCoursePracticeDto> practiceList = coursesService.getCoursesCoursePracticeDailyAllList(dto11);
		resultMap.put("practiceList", practiceList);
		
		PracticesPracticescheduleDto dto2 = new PracticesPracticescheduleDto();
		dto2.setSection(dto.getSection());
		dto2.setCourse_id(dto.getCourse_id());
		List<PracticesPracticescheduleDto> scheduleList = practicesService.getPracticeScheduleCoursePracticeTypeList(dto2);
		resultMap.put("scheduleList", scheduleList);		
		
		PracticesPracticeresultDto dto3 = new PracticesPracticeresultDto();
		dto3.setSection(dto.getSection());
		dto3.setCourse_id(dto.getCourse_id());
		List<PracticesPracticeresultDto> attendList = practicesService.getPracticeResultAttendList(dto3);
		resultMap.put("attendList", attendList);

		PracticesPracticeresultStaticDto dto4 = new PracticesPracticeresultStaticDto();
		dto4.setSection(dto.getSection());
		dto4.setCourse_id(dto.getCourse_id());
		List<PracticesPracticeresultStaticDto> resultList = practicesService.getPracticeResultStaticList(dto4);
		resultMap.put("resultList", resultList);
		
		EnrollmentsCourseenrollmentDto dto6 = new EnrollmentsCourseenrollmentDto();
		dto6.setCourse_id(dto.getCourse_id());
		if(courseInfo.getStudent_type().equals("JUNIOR")) {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentDaillyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}else {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentMonthlyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}
		
		return resultMap;
	}
	
	
	
	@RequestMapping(value="/enrollment/getAchievePracticeList.do")
	public @ResponseBody Map getAchievePracticeList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentAchieveList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		
		CoursesCourseDto dto1 = new CoursesCourseDto();
		dto1.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto1);
		resultMap.put("courseInfo", courseInfo);
		
		CoursesCoursePracticeDto dto11 = new CoursesCoursePracticeDto();
		dto11.setCourse_id(dto.getCourse_id());
		List<CoursesCoursePracticeDto> sectionList = coursesService.getCoursesCourseSectionList(dto11);
		resultMap.put("sectionList", sectionList);
		List<CoursesCoursePracticeDto> practiceAllList = coursesService.getCoursesCoursePracticeList(dto11);
		resultMap.put("practiceAllList", practiceAllList);
		List<CoursesCoursePracticeDto> practiceList = coursesService.getCoursesCoursePracticeDailyAllList(dto11);
		resultMap.put("practiceList", practiceList);
		
		PracticesPracticescheduleDto dto2 = new PracticesPracticescheduleDto();
		dto2.setSection(dto.getSection());
		dto2.setPractice_type(dto.getPractice_type());
		dto2.setCourse_id(dto.getCourse_id());
		List<PracticesPracticescheduleDto> scheduleList = practicesService.getPracticeScheduleCoursePracticeTypeList(dto2);
		resultMap.put("scheduleList", scheduleList);		
		
		PracticesPracticeresultDto dto3 = new PracticesPracticeresultDto();
		dto3.setSection(dto.getSection());
		dto3.setPractice_type(dto.getPractice_type());
		dto3.setCourse_id(dto.getCourse_id());
		List<PracticesPracticeresultDto> attendList = practicesService.getPracticeResultAttendList(dto3);
		resultMap.put("attendList", attendList);

		PracticesPracticeresultStaticDto dto4 = new PracticesPracticeresultStaticDto();
		dto4.setSection(dto.getSection());
		dto4.setPractice_type(dto.getPractice_type());
		dto4.setCourse_id(dto.getCourse_id());
		List<PracticesPracticeresultStaticDto> resultList = practicesService.getPracticeResultStaticList(dto4);
		resultMap.put("resultList", resultList);
		
		EnrollmentsCourseenrollmentDto dto6 = new EnrollmentsCourseenrollmentDto();
		dto6.setCourse_id(dto.getCourse_id());
		if(courseInfo.getStudent_type().equals("JUNIOR")) {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentDaillyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}else {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentMonthlyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}
		
		return resultMap;
	}
	
	@RequestMapping(value="/enrollment/getAchieveSendList.do")
	public @ResponseBody Map getAchieveSendList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentAchieveList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		
		CoursesCourseDto dto1 = new CoursesCourseDto();
		dto1.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto1);
		resultMap.put("courseInfo", courseInfo);
		
		CoursesCoursePracticeDto dto11 = new CoursesCoursePracticeDto();
		dto11.setCourse_id(dto.getCourse_id());
		List<CoursesCoursePracticeDto> sectionList = coursesService.getCoursesCourseSectionList(dto11);
		resultMap.put("sectionList", sectionList);
		List<CoursesCoursePracticeDto> practiceAllList = coursesService.getCoursesCoursePracticeList(dto11);
		resultMap.put("practiceAllList", practiceAllList);
		List<CoursesCoursePracticeDto> practiceList = coursesService.getCoursesCoursePracticeDailyAllList(dto11);
		resultMap.put("practiceList", practiceList);
		
		PracticesPracticeresultDto dto3 = new PracticesPracticeresultDto();
		dto3.setSection(dto.getSection());
		dto3.setPractice_type(dto.getPractice_type());
		dto3.setCourse_id(dto.getCourse_id());
		List<PracticesPracticeresultDto> attendList = practicesService.getPracticeResultAttendList(dto3);
		resultMap.put("attendList", attendList);

		PracticesPracticeresultStaticSendDto dto4 = new PracticesPracticeresultStaticSendDto();
		dto4.setCourse_id(dto.getCourse_id());
		List<PracticesPracticeresultStaticSendDto> resultList = practicesService.getPracticeResultStaticSendList(dto4);
		resultMap.put("resultList", resultList);
		
		EnrollmentsCourseenrollmentDto dto6 = new EnrollmentsCourseenrollmentDto();
		dto6.setCourse_id(dto.getCourse_id());
		if(courseInfo.getStudent_type().equals("JUNIOR")) {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentDaillyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}else {
			List<EnrollmentsCourseenrollmentDto> classCountList = enrollmentsService.getCourseenrollmentMonthlyCountList(dto6);
			resultMap.put("classCountList", classCountList);
		}
		
		return resultMap;
	}
	
	@RequestMapping(value="/enrollment/savePracticeQuizResult.do")
	public @ResponseBody void insertPracticeQuizResult(HttpServletRequest request, PracticesPracticequizresultDto dto) throws Exception {
		practicesService.insertPracticeQuizResult(dto);
		
		boolean pass_result    = dto.isPass_result();
		boolean out_pass_result = false;
		boolean user_pass_result = false;
		boolean week_pass_result = false;

		int pratice_schedule_id = dto.getPractice_schedule_id();
		
		int score = 0;
		int score1 = 0;
		int score2 = 0;
		
		int total_score = 1;
		int total_score1 = 0;
		int total_score2 = 0;
		PracticesPracticescheduleDto s_scheduleInfo = new PracticesPracticescheduleDto();
		s_scheduleInfo.setId(pratice_schedule_id);
		
		PracticesPracticescheduleDto scheduleInfo = practicesService.getPracticeScheduleAsID(s_scheduleInfo);

		GoalsGoalconcentrationPracticeDto s_goalPracticeInfo = new GoalsGoalconcentrationPracticeDto();
		s_goalPracticeInfo.setSection(scheduleInfo.getSection());
		s_goalPracticeInfo.setPractice_type(dto.getPractice_type());
		s_goalPracticeInfo.setCourse_id(scheduleInfo.getCourse_id());
		s_goalPracticeInfo.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		
		GoalsGoalconcentrationPracticeDto goalPracticeInfo = goalService.getGoalToPractice(s_goalPracticeInfo);
		
		if(pass_result) {
			score = 1;
			if(goalPracticeInfo.getDelay_yn().equals("Y")) {
				out_pass_result = true;
			}
		}
		
		PracticesPracticeresultStaticDto s_resultStaticInfo = new PracticesPracticeresultStaticDto();
		s_resultStaticInfo.setSection(scheduleInfo.getSection());
		s_resultStaticInfo.setPractice_type(scheduleInfo.getPractice_type());
		s_resultStaticInfo.setBook(scheduleInfo.getBook());
		s_resultStaticInfo.setVolume(scheduleInfo.getVolume());
		s_resultStaticInfo.setGroup(scheduleInfo.getGroup());
		s_resultStaticInfo.setArticle(scheduleInfo.getArticle());
		s_resultStaticInfo.setPassage(dto.getPassage());
		s_resultStaticInfo.setParagraph(scheduleInfo.getEnd_paragraph());
		s_resultStaticInfo.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		PracticesPracticeresultStaticDto resultStatic = practicesService.getPracticeResultStatic(s_resultStaticInfo);
		
		PracticesPracticeresultStaticDto resultStaticInfo = new PracticesPracticeresultStaticDto();
		resultStaticInfo.setSection(scheduleInfo.getSection());
		resultStaticInfo.setPractice_type(scheduleInfo.getPractice_type());
		resultStaticInfo.setBook(scheduleInfo.getBook());
		resultStaticInfo.setVolume(scheduleInfo.getVolume());
		resultStaticInfo.setGroup(scheduleInfo.getGroup());
		resultStaticInfo.setArticle(scheduleInfo.getArticle());
		resultStaticInfo.setPassage(dto.getPassage());
		resultStaticInfo.setParagraph(scheduleInfo.getEnd_paragraph());
		resultStaticInfo.setCourse_enrollment_id(dto.getCourse_enrollment_id());
		
		resultStaticInfo.setScore(score);
		resultStaticInfo.setScore1(score1);
		resultStaticInfo.setScore2(score2);
		
		resultStaticInfo.setTotal_score(total_score);
		resultStaticInfo.setTotal_score1(total_score1);
		resultStaticInfo.setTotal_score2(total_score2);
		
		resultStaticInfo.setPass_result(pass_result);
		resultStaticInfo.setOut_pass_result(out_pass_result);
		resultStaticInfo.setUser_pass_result(user_pass_result);
		resultStaticInfo.setWeek_pass_result(week_pass_result);
		
		if(resultStatic == null) {
			practicesService.insertPracticeResultStatic(resultStaticInfo);
		}else {
			resultStaticInfo.setId(resultStatic.getId());
			practicesService.updatePracticeResultStatic(resultStaticInfo);
		}
	}
	
	@RequestMapping(value="/enrollment/getSendAchieve.do")
	public @ResponseBody PracticesPracticeresultStaticSendDto getSendAchieve(HttpServletRequest request, PracticesPracticeresultStaticSendDto dto) throws Exception {
		return practicesService.getPracticeResultStaticSend(dto);
	}
	
	@RequestMapping(value="/enrollment/sendAchieve.do")
	public @ResponseBody void sendAchieve(HttpServletRequest request, PracticesPracticeresultStaticSendDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setWriter_id(userInfo.getUser_id());
		PracticesPracticeresultStaticSendDto sendInfo = practicesService.getPracticeResultStaticSend(dto);
		if(sendInfo == null) {
			practicesService.insertPracticeResultStaticSend(dto);
		}else {
			dto.setId(sendInfo.getId());
			practicesService.updatePracticeResultStaticSend(dto);
		}
		
		List<String> list = new ArrayList<String>();
		list.add(dto.getCourse_name());
		list.add(dto.getUser_name());
		list.add(dto.getDate());
		list.add(dto.getCourse_enrollment_id()+"");
		list.add(dto.getDate());
		
		String variable = String.join("|", list);
		SendUtil.sendKakao(dto.getResv_mobile(), "SJT_047140", variable);
		//SendUtil.sendKakao("01026066856", "SJT_047140", variable);
		//SendUtil.sendKakao("01047064579", "SJT_047140", variable);
		//SendUtil.sendKakao(dto.getResv_mobile(), "SJT_047140", variable);
	}
}