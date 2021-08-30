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
import com.usher.service.CoursesService;
import com.usher.service.EnrollmentsService;
import com.usher.service.GoalService;
import com.usher.service.PracticesService;
import com.usher.dto.EnrollmentsCourseenrollmentDto;
import com.usher.dto.EnrollmentsOrientationenrollmentDto;
import com.usher.dto.EnrollmentsSeatenrollmentDto;
import com.usher.dto.GoalsGoalconcentrationDto;
import com.usher.dto.GoalsGoalconcentrationPracticeDto;
import com.usher.dto.PracticesPracticeproblemDto;
import com.usher.dto.PracticesPracticequizresultDto;
import com.usher.dto.PracticesPracticeresultDto;
import com.usher.dto.PracticesPracticeresultStaticDto;
import com.usher.dto.PracticesPracticescheduleDto;
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.dto.PracticesPracticesectiontypeDto;
import com.usher.dto.PracticesPracticetypeDto;
import com.usher.dto.AuthUserDto;
import com.usher.dto.BaseOrientationDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.CoursesCoursePracticeDto;
import com.usher.dto.CoursesCourseTimetableDto;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;


@Controller
public class AchievementController{
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
	
	@RequestMapping(value="/enrollment/achievement.do")
	public String course_enrollment(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		String url = "";
		
		url = "enrollment/achievement";
		return url;
	}
	
	@RequestMapping(value="/enrollment/getPracticeScheduleArchieveList.do")
	public @ResponseBody List<PracticesPracticescheduleDto> getPracticeScheduleArchieveList (HttpServletRequest request, PracticesPracticescheduleDto dto) throws Exception {

		return practicesService.getPracticeScheduleArchieveList(dto);
	}
	
	@RequestMapping(value="/enrollment/getPracticeScheduleArchievePracticeTypeList.do")
	public @ResponseBody List<PracticesPracticescheduleDto> getPracticeScheduleArchievePracticeTypeList (HttpServletRequest request, PracticesPracticescheduleDto dto) throws Exception {

		return practicesService.getPracticeScheduleArchievePracticeTypeList(dto);
	}
	
	@RequestMapping(value="/enrollment/getPracticeResultList.do")
	public @ResponseBody Map getPracticeResultList (HttpServletRequest request, PracticesPracticeresultDto dto) throws Exception {
		Map resultMap = new HashMap();
		if(dto.getPractice_type().equals("SPEECH")) {
			List<PracticesPracticeresultDto> practiceList =  practicesService.getPracticeResultListAsVoca(dto);
			resultMap.put("practiceList", practiceList);
		}else {
			List<PracticesPracticeresultDto> practiceList =  practicesService.getPracticeResultList(dto);
			resultMap.put("practiceList", practiceList);
		}
		List<PracticesPracticetypeDto> typeList = practicesService.getPracticeTypeList();
		resultMap.put("typeList", typeList);
		return resultMap;
	}
	
	@RequestMapping(value="/enrollment/achievement/step.do")
	public String step(HttpServletRequest request,
						EnrollmentsOrientationenrollmentDto dto,
						ModelMap modelMap) throws Exception {
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
		return "enrollment/achievement/"+dto.getOrientation_code();
	}
	
	@RequestMapping(value="/enrollment/achievement/getGoalList.do")
	public @ResponseBody Map getGoalList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		
		List<PracticesPracticesectionDto> sectionList = practicesService.getPracticeSectionList();
		resultMap.put("sectionList", sectionList);
		
		CoursesCoursePracticeDto dto1 = new CoursesCoursePracticeDto();
		dto1.setCourse_id(dto.getCourse_id());
		List<CoursesCoursePracticeDto> practiceList = coursesService.getCoursesCoursePracticeList(dto1);
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
	
	@RequestMapping(value="/enrollment/achievement/getGoalConcentration.do")
	public @ResponseBody Map getGoalConcentration(HttpServletRequest request, GoalsGoalconcentrationDto dto) throws Exception {
		
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
	
	@RequestMapping(value="/enrollment/achievement/saveGoalConcentration.do")
	public @ResponseBody void saveGoalConcentration(HttpServletRequest request, GoalsGoalconcentrationDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setWriter_id(userInfo.getUser_id());
		goalService.updateGoalConcentration(dto);
	}
	
	@RequestMapping(value="/enrollment/achievement/getGoalConcentrationPactice.do")
	public @ResponseBody GoalsGoalconcentrationPracticeDto getGoalConcentrationPactice(HttpServletRequest request, GoalsGoalconcentrationPracticeDto dto) throws Exception {
		
		return goalService.getGoalConcentrationPractice(dto);
	}
	
	@RequestMapping(value="/enrollment/achievement/saveGoalConcentrationPactice.do")
	public @ResponseBody void saveGoalConcentrationPactice(HttpServletRequest request, GoalsGoalconcentrationPracticeDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setWriter_id(userInfo.getUser_id());
		goalService.updateGoalConcentrationPractice(dto);
	}
	
	@RequestMapping(value="/enrollment/achievement/getOtList.do")
	public @ResponseBody Map getOtList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentList(dto);
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
	
	@RequestMapping(value="/enrollment/achievement/getAllList.do")
	public @ResponseBody Map getAllList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentPaidList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		List<EnrollmentsCourseenrollmentDto> enrollmentMoveList = enrollmentsService.getCourseenrollmentMoveList(dto);
		resultMap.put("enrollmentMoveList", enrollmentMoveList);
		List<EnrollmentsCourseenrollmentDto> enrollmentRefundList = enrollmentsService.getCourseenrollmentRefundList(dto);
		resultMap.put("enrollmentRefundList", enrollmentRefundList);
		
		CoursesCourseDto dto1 = new CoursesCourseDto();
		dto1.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto1);
		resultMap.put("courseInfo", courseInfo);
		
		List<PracticesPracticesectionDto> sectionList = practicesService.getPracticeSectionList();
		resultMap.put("sectionList", sectionList);
		
		CoursesCoursePracticeDto coursePractice = new CoursesCoursePracticeDto();
		coursePractice.setCourse_id(dto.getCourse_id());
		List<CoursesCoursePracticeDto> practiceList = coursesService.getCoursesCoursePracticeList(coursePractice);
		resultMap.put("practiceList", practiceList);
		
		PracticesPracticescheduleDto dto2 = new PracticesPracticescheduleDto();
		dto2.setCourse_id(dto.getCourse_id());
		List<PracticesPracticescheduleDto> scheduleVocaList = practicesService.getPracticeScheduleCourseVocaList(dto2);
		resultMap.put("scheduleVocaList", scheduleVocaList);

		List<PracticesPracticescheduleDto> scheduleList = practicesService.getPracticeScheduleCoursePracticeTypeList(dto2);
		resultMap.put("scheduleList", scheduleList);		
		
		PracticesPracticeresultDto dto3 = new PracticesPracticeresultDto();
		dto3.setCourse_id(dto.getCourse_id());
		
		List<PracticesPracticeresultDto> attendList = practicesService.getPracticeResultAttendList(dto3);
		List<PracticesPracticeresultDto> speechList = practicesService.getPracticeResultSpeechList(dto3);
		List<PracticesPracticeresultDto> vocaList = practicesService.getPracticeResultVocaList(dto3);
		List<PracticesPracticeresultDto> resultList = practicesService.getPracticeResultPraticeTypeList(dto3);
		resultMap.put("attendList", attendList);
		resultMap.put("speechList", speechList);
		resultMap.put("vocaList", vocaList);
		resultMap.put("resultList", resultList);

		PracticesPracticequizresultDto dto4 = new PracticesPracticequizresultDto();
		dto4.setCourse_id(dto.getCourse_id());
		
		List<PracticesPracticequizresultDto> resultQuizList = practicesService.getPracticeQuizResultDailyList(dto4);
		resultMap.put("resultQuizList", resultQuizList);
		
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
	
	@RequestMapping(value="/enrollment/achievement/getPraticeAllList.do")
	public @ResponseBody Map getPraticeAllList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentPaidList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		List<EnrollmentsCourseenrollmentDto> enrollmentMoveList = enrollmentsService.getCourseenrollmentMoveList(dto);
		resultMap.put("enrollmentMoveList", enrollmentMoveList);
		List<EnrollmentsCourseenrollmentDto> enrollmentRefundList = enrollmentsService.getCourseenrollmentRefundList(dto);
		resultMap.put("enrollmentRefundList", enrollmentRefundList);
		
		CoursesCourseDto dto1 = new CoursesCourseDto();
		dto1.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto1);
		resultMap.put("courseInfo", courseInfo);
		
		List<PracticesPracticesectionDto> sectionList = new ArrayList<PracticesPracticesectionDto>();
		PracticesPracticesectionDto sectionInfo = new PracticesPracticesectionDto();
		sectionInfo.setSection(dto.getSection());
		sectionList.add(sectionInfo);
		resultMap.put("sectionList", sectionList);
		
		CoursesCoursePracticeDto coursePractice = new CoursesCoursePracticeDto();
		coursePractice.setCourse_id(dto.getCourse_id());
		coursePractice.setSection(dto.getSection());
		List<CoursesCoursePracticeDto> practiceList = coursesService.getCoursesCoursePracticeList(coursePractice);
		resultMap.put("practiceList", practiceList);
		
		PracticesPracticescheduleDto dto2 = new PracticesPracticescheduleDto();
		dto2.setCourse_id(dto.getCourse_id());
		dto2.setSection(dto.getSection());
		List<PracticesPracticescheduleDto> scheduleList = practicesService.getPracticeScheduleCoursePracticeTypeList(dto2);
		resultMap.put("scheduleList", scheduleList);		
		
		PracticesPracticeresultDto dto3 = new PracticesPracticeresultDto();
		dto3.setCourse_id(dto.getCourse_id());
		dto3.setSection(dto.getSection());
		
		List<PracticesPracticeresultDto> attendList = practicesService.getPracticeResultAttendList(dto3);
		List<PracticesPracticeresultDto> resultList = practicesService.getPracticeResultPraticeTypeList(dto3);
		resultMap.put("attendList", attendList);
		resultMap.put("resultList", resultList);
		
		PracticesPracticequizresultDto dto4 = new PracticesPracticequizresultDto();
		dto4.setCourse_id(dto.getCourse_id());
		dto4.setSection(dto.getSection());
		dto4.setPractice_type(dto.getPractice_type());
		
		List<PracticesPracticequizresultDto> resultQuizList = practicesService.getPracticeQuizResultDailyList(dto4);
		resultMap.put("resultQuizList", resultQuizList);
		
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
	
	@RequestMapping(value="/enrollment/achievement/getVocaList.do")
	public @ResponseBody Map getVocaList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentPaidList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		List<EnrollmentsCourseenrollmentDto> enrollmentMoveList = enrollmentsService.getCourseenrollmentMoveList(dto);
		resultMap.put("enrollmentMoveList", enrollmentMoveList);
		List<EnrollmentsCourseenrollmentDto> enrollmentRefundList = enrollmentsService.getCourseenrollmentRefundList(dto);
		resultMap.put("enrollmentRefundList", enrollmentRefundList);
		
		CoursesCourseDto dto1 = new CoursesCourseDto();
		dto1.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto1);
		resultMap.put("courseInfo", courseInfo);
		
		PracticesPracticescheduleDto dto2 = new PracticesPracticescheduleDto();
		dto2.setCourse_id(dto.getCourse_id());
		List<PracticesPracticescheduleDto> scheduleList = practicesService.getPracticeScheduleCourseVocaList(dto2);
		resultMap.put("scheduleList", scheduleList);
		
		PracticesPracticeresultDto dto3 = new PracticesPracticeresultDto();
		dto3.setCourse_id(dto.getCourse_id());
		
		List<PracticesPracticeresultDto> attendList = practicesService.getPracticeResultAttendList(dto3);
		List<PracticesPracticeresultDto> speechList = practicesService.getPracticeResultSpeechList(dto3);
		List<PracticesPracticeresultDto> vocaList = practicesService.getPracticeResultVocaList(dto3);
		resultMap.put("attendList", attendList);
		resultMap.put("speechList", speechList);
		resultMap.put("vocaList", vocaList);

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
	
	@RequestMapping(value="/enrollment/achievement/getProgramList.do")
	public @ResponseBody Map getProgramList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentPaidList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		List<EnrollmentsCourseenrollmentDto> enrollmentMoveList = enrollmentsService.getCourseenrollmentMoveList(dto);
		resultMap.put("enrollmentMoveList", enrollmentMoveList);
		List<EnrollmentsCourseenrollmentDto> enrollmentRefundList = enrollmentsService.getCourseenrollmentRefundList(dto);
		resultMap.put("enrollmentRefundList", enrollmentRefundList);
		
		CoursesCourseDto dto1 = new CoursesCourseDto();
		dto1.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto1);
		resultMap.put("courseInfo", courseInfo);
		
		PracticesPracticescheduleDto dto2 = new PracticesPracticescheduleDto();
		dto2.setCourse_id(dto.getCourse_id());
		dto2.setSection(dto.getSection());
		dto2.setPractice_type(dto.getPractice_type());
		List<PracticesPracticescheduleDto> scheduleList = practicesService.getPracticeScheduleCoursePracticeTypeList(dto2);
		resultMap.put("scheduleList", scheduleList);
		
		PracticesPracticeresultDto dto3 = new PracticesPracticeresultDto();
		dto3.setCourse_id(dto.getCourse_id());
		dto3.setSection(dto.getSection());
		dto3.setPractice_type(dto.getPractice_type());
		
		List<PracticesPracticeresultDto> attendList = practicesService.getPracticeResultAttendList(dto3);
		List<PracticesPracticeresultDto> resultList = practicesService.getPracticeResultPraticeTypeList(dto3);
		resultMap.put("attendList", attendList);
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
	
	@RequestMapping(value="/enrollment/achievement/getProgramMonthlyList.do")
	public @ResponseBody Map getProgramMonthlyList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentPaidList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		List<EnrollmentsCourseenrollmentDto> enrollmentMoveList = enrollmentsService.getCourseenrollmentMoveList(dto);
		resultMap.put("enrollmentMoveList", enrollmentMoveList);
		List<EnrollmentsCourseenrollmentDto> enrollmentRefundList = enrollmentsService.getCourseenrollmentRefundList(dto);
		resultMap.put("enrollmentRefundList", enrollmentRefundList);
		
		CoursesCourseDto dto1 = new CoursesCourseDto();
		dto1.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto1);
		resultMap.put("courseInfo", courseInfo);
		
		PracticesPracticescheduleDto dto2 = new PracticesPracticescheduleDto();
		dto2.setCourse_id(dto.getCourse_id());
		dto2.setSection(dto.getSection());
		dto2.setPractice_type(dto.getPractice_type());
		List<PracticesPracticescheduleDto> scheduleList = practicesService.getPracticeScheduleCoursePracticeTypeMonthlyList(dto2);
		resultMap.put("scheduleList", scheduleList);
		
		PracticesPracticeresultDto dto3 = new PracticesPracticeresultDto();
		dto3.setCourse_id(dto.getCourse_id());
		dto3.setSection(dto.getSection());
		dto3.setPractice_type(dto.getPractice_type());
		
		List<PracticesPracticeresultDto> attendList = practicesService.getPracticeResultAttendList(dto3);
		List<PracticesPracticeresultDto> resultList = practicesService.getPracticeResultPraticeTypeMonthlyList(dto3);
		resultMap.put("attendList", attendList);
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
	
	@RequestMapping(value="/enrollment/achievement/getProgramPassageList.do")
	public @ResponseBody Map getProgramPassageList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentPaidList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		List<EnrollmentsCourseenrollmentDto> enrollmentMoveList = enrollmentsService.getCourseenrollmentMoveList(dto);
		resultMap.put("enrollmentMoveList", enrollmentMoveList);
		List<EnrollmentsCourseenrollmentDto> enrollmentRefundList = enrollmentsService.getCourseenrollmentRefundList(dto);
		resultMap.put("enrollmentRefundList", enrollmentRefundList);
		
		CoursesCourseDto dto1 = new CoursesCourseDto();
		dto1.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto1);
		resultMap.put("courseInfo", courseInfo);
		
		PracticesPracticescheduleDto dto2 = new PracticesPracticescheduleDto();
		dto2.setCourse_id(dto.getCourse_id());
		dto2.setSection(dto.getSection());
		dto2.setPractice_type("PASSAGE_PHRASE");
		List<PracticesPracticescheduleDto> scheduleList = practicesService.getPracticeScheduleCoursePracticeTypeList(dto2);
		resultMap.put("scheduleList", scheduleList);
		
		PracticesPracticeresultDto dto3 = new PracticesPracticeresultDto();
		dto3.setCourse_id(dto.getCourse_id());
		dto3.setSection(dto.getSection());
		dto3.setPractice_type(dto.getPractice_type());
		
		List<PracticesPracticeresultDto> attendList = practicesService.getPracticeResultAttendList(dto3);
		resultMap.put("attendList", attendList);

		PracticesPracticeresultDto dto4 = new PracticesPracticeresultDto();
		dto4.setCourse_id(dto.getCourse_id());
		dto4.setSection(dto.getSection());
		dto4.setPractice_type("PASSAGE_PHRASE");
		List<PracticesPracticeresultDto> phraseList = practicesService.getPracticeResultPraticeTypeList(dto4);
		resultMap.put("phraseList", phraseList);
	
		PracticesPracticeresultDto dto5 = new PracticesPracticeresultDto();
		dto5.setCourse_id(dto.getCourse_id());
		dto5.setSection(dto.getSection());
		dto5.setPractice_type("PASSAGE_VOCA");
		List<PracticesPracticeresultDto> vocaList = practicesService.getPracticeResultPraticeTypeList(dto5);
		resultMap.put("vocaList", vocaList);		

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
	
	@RequestMapping(value="/enrollment/achievement/getQuizDailyList.do")
	public @ResponseBody Map getQuizDailyList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentPaidList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		List<EnrollmentsCourseenrollmentDto> enrollmentMoveList = enrollmentsService.getCourseenrollmentMoveList(dto);
		resultMap.put("enrollmentMoveList", enrollmentMoveList);
		List<EnrollmentsCourseenrollmentDto> enrollmentRefundList = enrollmentsService.getCourseenrollmentRefundList(dto);
		resultMap.put("enrollmentRefundList", enrollmentRefundList);
		
		CoursesCourseDto dto1 = new CoursesCourseDto();
		dto1.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto1);
		resultMap.put("courseInfo", courseInfo);
		
		PracticesPracticescheduleDto dto2 = new PracticesPracticescheduleDto();
		dto2.setCourse_id(dto.getCourse_id());
		dto2.setSection(dto.getSection());
		dto2.setPractice_type(dto.getPractice_type());
		List<PracticesPracticescheduleDto> scheduleList = practicesService.getPracticeScheduleCoursePracticeTypeList(dto2);
		resultMap.put("scheduleList", scheduleList);
		
		PracticesPracticeresultDto dto3 = new PracticesPracticeresultDto();
		dto3.setCourse_id(dto.getCourse_id());
		dto3.setSection(dto.getSection());
		dto3.setPractice_type(dto.getPractice_type());
		
		List<PracticesPracticeresultDto> attendList = practicesService.getPracticeResultAttendList(dto3);
		resultMap.put("attendList", attendList);
		
		PracticesPracticequizresultDto dto4 = new PracticesPracticequizresultDto();
		dto4.setCourse_id(dto.getCourse_id());
		dto4.setSection(dto.getSection());
		dto4.setPractice_type(dto.getPractice_type());
		
		List<PracticesPracticequizresultDto> resultList = practicesService.getPracticeQuizResultDailyList(dto4);
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
	
	@RequestMapping(value="/enrollment/achievement/getQuizMonthlyList.do")
	public @ResponseBody Map getQuizMonthlyList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentPaidList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		List<EnrollmentsCourseenrollmentDto> enrollmentMoveList = enrollmentsService.getCourseenrollmentMoveList(dto);
		resultMap.put("enrollmentMoveList", enrollmentMoveList);
		List<EnrollmentsCourseenrollmentDto> enrollmentRefundList = enrollmentsService.getCourseenrollmentRefundList(dto);
		resultMap.put("enrollmentRefundList", enrollmentRefundList);
		
		CoursesCourseDto dto1 = new CoursesCourseDto();
		dto1.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto1);
		resultMap.put("courseInfo", courseInfo);
		
		PracticesPracticequizresultDto dto4 = new PracticesPracticequizresultDto();
		dto4.setCourse_id(dto.getCourse_id());
		dto4.setSection(dto.getSection());
		dto4.setPractice_type(dto.getPractice_type());
		
		List<PracticesPracticequizresultDto> resultList = practicesService.getPracticeQuizResultMonthlyList(dto4);
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
	
	@RequestMapping(value="/enrollment/achievement/getQuizMonthlyGrList.do")
	public @ResponseBody Map getQuizMonthlyGrList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		Map resultMap = new HashMap();

		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentPaidList(dto);
		resultMap.put("enrollmentList", enrollmentList);
		List<EnrollmentsCourseenrollmentDto> enrollmentMoveList = enrollmentsService.getCourseenrollmentMoveList(dto);
		resultMap.put("enrollmentMoveList", enrollmentMoveList);
		List<EnrollmentsCourseenrollmentDto> enrollmentRefundList = enrollmentsService.getCourseenrollmentRefundList(dto);
		resultMap.put("enrollmentRefundList", enrollmentRefundList);
		
		CoursesCourseDto dto1 = new CoursesCourseDto();
		dto1.setId(dto.getCourse_id());
		CoursesCourseDto courseInfo = coursesService.getCourse(dto1);
		resultMap.put("courseInfo", courseInfo);
		
		PracticesPracticequizresultDto dto4 = new PracticesPracticequizresultDto();
		dto4.setCourse_id(dto.getCourse_id());
		dto4.setSection(dto.getSection());
		dto4.setPractice_type(dto.getPractice_type());
		
		List<PracticesPracticequizresultDto> resultList = practicesService.getPracticeQuizResultMonthlyList(dto4);
		resultMap.put("resultList", resultList);
		
		PracticesPracticeproblemDto dto5 = new PracticesPracticeproblemDto();
		dto5.setSection(dto.getSection());
		if(dto.getPractice_type().equals("GRAMMAR_TRANSLATION")) {
			dto5.setBook("sw19");
		}else {
			dto5.setBook("actual_test");
		}
		List<PracticesPracticeproblemDto> problemList = practicesService.getProblemList(dto5);
		resultMap.put("problemList", problemList);
		
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
	
	@RequestMapping(value="/enrollment/getPracticeScheduleOxEnrollment.do")
	public @ResponseBody PracticesPracticescheduleDto getPracticeScheduleOxEnrollment (HttpServletRequest request, PracticesPracticescheduleDto dto) throws Exception {

		return practicesService.getPracticeScheduleOxEnrollment(dto);
	}
	

}