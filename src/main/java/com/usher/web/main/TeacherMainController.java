package com.usher.web.main;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mobile.device.Device;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.dto.CoursesCourseTimetableDto;
import com.usher.dto.NoticesAttendDetailDto;
import com.usher.dto.NoticesAttendDto;
import com.usher.dto.NoticesNewStudentDetailDto;
import com.usher.dto.NoticesNewStudentDto;
import com.usher.dto.NoticesPracticeDetailDto;
import com.usher.dto.NoticesPracticeDto;
import com.usher.dto.NoticesScheduleDetailDto;
import com.usher.dto.NoticesScheduleDto;
import com.usher.dto.NoticesTaskDetailDto;
import com.usher.dto.NoticesTaskDto;
import com.usher.dto.AuthUserDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.CoursesCoursePracticeDto;
import com.usher.service.AuthService;
import com.usher.service.CoursesService;
import com.usher.service.NoticesService;
import com.usher.service.PracticesService;
import com.usher.util.SessionUtil;


@Controller
public class TeacherMainController{
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	AuthService authService;
	
	@Autowired
	NoticesService noticesService;
	
	@RequestMapping(value="/main/dashboard_teacher.do")
	public String dashboard_teacher(HttpServletRequest request,
						AuthUserDto dto,
						ModelMap modelMap, 
						Device device) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		if(dto.getUser_id() > 0) {
			
		}else {
			dto.setUser_id(userInfo.getUser_id());
		}
		
		AuthUserDto teacherInfo = authService.getUserAsID(dto);
		
		modelMap.addAttribute("teacherInfo", teacherInfo);
		modelMap.addAttribute("scheduleInfo", dto);
		String url = "";
		
		String mobile = "";
		if (device.isMobile()) {
			mobile = "mobile/";
		}
		
		url = mobile+"main/dashboard_teacher";
		return url;
	}
	
	@RequestMapping(value="/main/dashboard_teacher_practice.do")
	public String dashboard_teacher_practice(HttpServletRequest request,
						AuthUserDto dto,
						ModelMap modelMap, 
						Device device) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		if(dto.getUser_id() > 0) {
			
		}else {
			dto.setUser_id(userInfo.getUser_id());
		}
		
		//AuthUserDto teacherInfo = authService.getUserAsID(dto);
		
		modelMap.addAttribute("teacherInfo", dto);
		String url = "";
		
		String mobile = "";
		if (device.isMobile()) {
			mobile = "mobile/";
		}
		
		url = mobile+"main/dashboard_teacher_practice";
		return url;
	}
	
	@RequestMapping(value="/main/dashboard_teacher_schedule.do")
	public String dashboard_teacher_schedule(HttpServletRequest request,
						AuthUserDto dto,
						ModelMap modelMap, 
						Device device) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		if(dto.getUser_id() > 0) {
			
		}else {
			dto.setUser_id(userInfo.getUser_id());
		}
		
		//AuthUserDto teacherInfo = authService.getUserAsID(dto);
		
		modelMap.addAttribute("teacherInfo", dto);
		String url = "";
		
		String mobile = "";
		if (device.isMobile()) {
			mobile = "mobile/";
		}
		
		url = mobile+"main/dashboard_teacher_schedule";
		return url;
	}
	
	
	@RequestMapping(value="/main/dashboard_teacher_new_student.do")
	public String dashboard_teacher_new_student(HttpServletRequest request,
						AuthUserDto dto,
						ModelMap modelMap, 
						Device device) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		if(dto.getUser_id() > 0) {
			
		}else {
			dto.setUser_id(userInfo.getUser_id());
		}
		
		//AuthUserDto teacherInfo = authService.getUserAsID(dto);
		
		modelMap.addAttribute("teacherInfo", dto);
		String url = "";
		
		String mobile = "";
		if (device.isMobile()) {
			mobile = "mobile/";
		}
		
		url = mobile+"main/dashboard_teacher_new_student";
		return url;
	}

	
	@RequestMapping(value="/main/dashboard_teacher_attend.do")
	public String dashboard_teacher_attend(HttpServletRequest request,
						AuthUserDto dto,
						ModelMap modelMap, 
						Device device) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		if(dto.getUser_id() > 0) {
			
		}else {
			dto.setUser_id(userInfo.getUser_id());
		}
		
		//AuthUserDto teacherInfo = authService.getUserAsID(dto);
		
		modelMap.addAttribute("teacherInfo", dto);
		String url = "";
		
		String mobile = "";
		if (device.isMobile()) {
			mobile = "mobile/";
		}
		
		url = mobile+"main/dashboard_teacher_attend";
		return url;
	}
	
	@RequestMapping(value="/main/dashboard_teacher_task.do")
	public String dashboard_teacher_task(HttpServletRequest request,
						AuthUserDto dto,
						ModelMap modelMap, 
						Device device) throws Exception {
		
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		if(dto.getUser_id() > 0) {
			
		}else {
			dto.setUser_id(userInfo.getUser_id());
		}
		
		//AuthUserDto teacherInfo = authService.getUserAsID(dto);
		
		modelMap.addAttribute("teacherInfo", dto);
		String url = "";
		
		String mobile = "";
		if (device.isMobile()) {
			mobile = "mobile/";
		}
		
		url = mobile+"main/dashboard_teacher_task";
		return url;
	}
	
	@RequestMapping(value="/main/getTeacherScheduleList.do")
	public @ResponseBody Map getTeacherScheduleList(HttpServletRequest request, CoursesCourseTimetableDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		CoursesCourseDto currentInfo = coursesService.getCourseCurrent();
		resultMap.put("currentInfo", currentInfo);
		
		List<CoursesCourseTimetableDto> timetableList = coursesService.getCourseGroupTimeTableAsTeacherList(dto);
		resultMap.put("timetableList", timetableList);
		
		CoursesCoursePracticeDto dto1 = new CoursesCoursePracticeDto();
		dto1.setUser_id(dto.getUser_id());
		dto1.setDate(dto.getDate());
		List<CoursesCoursePracticeDto> practiceList = coursesService.getCoursesCoursePracticeAsTeacherList(dto1);
		resultMap.put("practiceList", practiceList);
		
		NoticesScheduleDto dto2 = new NoticesScheduleDto();
		dto2.setSchedule_user_id(dto.getUser_id());
		dto2.setSchedule_date(dto.getDate());
		List<NoticesScheduleDto> noticeScheduleList = noticesService.getNoticesScheduleUserList(dto2);
		resultMap.put("noticeScheduleList", noticeScheduleList);
		
		List<NoticesScheduleDto> noticeScheduleUncompleteList = noticesService.getNoticesScheduleUserMonthlyUncompleteList(dto2);
		resultMap.put("noticeScheduleUncompleteList", noticeScheduleUncompleteList);

		NoticesPracticeDto dto3 = new NoticesPracticeDto();
		dto3.setUser_id(dto.getUser_id());
		dto3.setDate(dto.getDate());
		List<NoticesPracticeDto> noticePracticeList = noticesService.getNoticesPracticeUserList(dto3);
		resultMap.put("noticePracticeList", noticePracticeList);
		
		NoticesAttendDto dto4 = new NoticesAttendDto();
		dto4.setUser_id(dto.getUser_id());
		dto4.setAttend_date(dto.getDate());
		List<NoticesAttendDto> noticeAttendList = noticesService.getNoticesAttendUserList(dto4);
		resultMap.put("noticeAttendList", noticeAttendList);
		
		NoticesTaskDto dto5 = new NoticesTaskDto();
		dto5.setTask_user_id(dto.getUser_id());
		dto5.setTask_date(dto.getDate());
		List<NoticesTaskDto> noticeTaskList = noticesService.getNoticesTaskUserDailyList(dto5);
		resultMap.put("noticeTaskList", noticeTaskList);
		
		NoticesNewStudentDto dto6 = new NoticesNewStudentDto();
		dto6.setUser_id(dto.getUser_id());
		dto6.setNew_date(dto.getDate());
		List<NoticesNewStudentDto> newStudentList = noticesService.getNoticesNewStudentUserList(dto6);
		resultMap.put("newStudentList", newStudentList);
		return resultMap;
	}
	
	@RequestMapping(value="/main/getTeacherNoticeScheduleList.do")
	public @ResponseBody Map getTeacherNoticeScheduleList(HttpServletRequest request, NoticesScheduleDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		
		NoticesScheduleDto scheduleInfo = noticesService.getNoticesSchedule(dto);
		resultMap.put("scheduleInfo", scheduleInfo);
		
		NoticesScheduleDetailDto dto1 = new NoticesScheduleDetailDto();
		dto1.setSchedule_id(dto.getId());
		List<NoticesScheduleDetailDto> scheduleDetailList = noticesService.getNoticesScheduleDetailList(dto1);
		resultMap.put("scheduleDetailList", scheduleDetailList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/main/getNoticesScheduleDetail.do")
	public @ResponseBody NoticesScheduleDetailDto getNoticesScheduleDetail(HttpServletRequest request, NoticesScheduleDetailDto dto) throws Exception {
		
		return noticesService.getNoticesScheduleDetail(dto);
	}
	
	
	@RequestMapping(value="/main/updateNoticesScheduleDetail.do")
	public @ResponseBody NoticesScheduleDto updateNoticesScheduleDetail(HttpServletRequest request, NoticesScheduleDetailDto dto) throws Exception {
		noticesService.updateNoticesScheduleDetail(dto);
		
		List<NoticesScheduleDetailDto> scheduleDetailList = noticesService.getNoticesScheduleDetailList(dto);
		int success_count = 0;
		int ignore_count = 0;
		int problem_count = 0;
		for(int i=0; i<scheduleDetailList.size(); i++)
		{
			NoticesScheduleDetailDto scheduleDetailInfo = scheduleDetailList.get(i);
			
			boolean schedule_detail_is_success = scheduleDetailInfo.isSchedule_detail_is_success();
			boolean schedule_detail_is_ignore  = scheduleDetailInfo.isSchedule_detail_is_ignore(); 
			boolean schedule_detail_is_problem = scheduleDetailInfo.isSchedule_detail_is_problem();
			
			if(schedule_detail_is_success) success_count++;
			if(schedule_detail_is_ignore) ignore_count++;
			if(schedule_detail_is_problem) problem_count++;
		}
		
		NoticesScheduleDto dto1 = new NoticesScheduleDto();
		dto1.setId(dto.getSchedule_id());
		dto1.setSchedule_success_count(success_count);
		dto1.setSchedule_ignore_count(ignore_count);
		dto1.setSchedule_problem_count(problem_count);
		noticesService.updateNoticesScheduleUser(dto1);
		return noticesService.getNoticesSchedule(dto1);
	}
	
	@RequestMapping(value="/main/getTeacherNoticePracticeList.do")
	public @ResponseBody List<NoticesPracticeDto> getTeacherNoticePracticeList(HttpServletRequest request, NoticesPracticeDto dto) throws Exception {
		return noticesService.getNoticesPracticeAsCoursePracticeList(dto);
	}
	
	@RequestMapping(value="/main/getTeacherNoticePractice.do")
	public @ResponseBody Map getTeacherNoticePractice(HttpServletRequest request, NoticesPracticeDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		
		NoticesPracticeDto practiceInfo = noticesService.getNoticesPractice(dto);
		resultMap.put("practiceInfo", practiceInfo);
		
		NoticesPracticeDetailDto dto1 = new NoticesPracticeDetailDto();
		dto1.setNotices_practice_id(dto.getId());
		List<NoticesPracticeDetailDto> practiceDetailList = noticesService.getNoticesPracticeDetailList(dto1);
		resultMap.put("practiceDetailList", practiceDetailList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/main/updatNoticesPracticeComment.do")
	public @ResponseBody List<NoticesPracticeDto> updatNoticesPracticeComment(HttpServletRequest request, NoticesPracticeDto dto) throws Exception {
		
		noticesService.updatNoticesPracticeComment(dto);
		
		int notices_practice_id = dto.getId();
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int course_enrollment_id  = Integer.parseInt(jsonObj.get("course_enrollment_id").toString());
			String comments           = jsonObj.get("comments").toString();
			boolean is_comments       = Boolean.parseBoolean(jsonObj.get("is_comments").toString());
			
			NoticesPracticeDetailDto sto = new NoticesPracticeDetailDto();
			sto.setNotices_practice_id(notices_practice_id);
			sto.setCourse_enrollment_id(course_enrollment_id);
			sto.setComments(comments);
			sto.setIs_comments(is_comments);
			
			noticesService.updatNoticesPracticeDetailComment(sto);
		}
		
		return noticesService.getNoticesPracticeAsCoursePracticeList(dto);
	}
	
	
	@RequestMapping(value="/main/getTeacherNoticeAttendList.do")
	public @ResponseBody Map getTeacherNoticeAttendList(HttpServletRequest request, NoticesAttendDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		
		NoticesAttendDto attendInfo = noticesService.getNoticesAttend(dto);
		resultMap.put("attendInfo", attendInfo);
		
		NoticesAttendDetailDto dto1 = new NoticesAttendDetailDto();
		dto1.setNotice_attend_id(dto.getId());
		List<NoticesAttendDetailDto> attendDetailList = noticesService.getNoticesAttendDetailList(dto1);
		resultMap.put("attendDetailList", attendDetailList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/main/updatNoticesAttend.do")
	public @ResponseBody void updatNoticesAttend(HttpServletRequest request, NoticesAttendDto dto) throws Exception {
		
		int notice_attend_id = dto.getId();
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int course_enrollment_id  = Integer.parseInt(jsonObj.get("course_enrollment_id").toString());
			String teacher_reason           = jsonObj.get("teacher_reason").toString();
			
			NoticesAttendDetailDto sto = new NoticesAttendDetailDto();
			sto.setCourse_enrollment_id(course_enrollment_id);
			sto.setNotice_attend_id(notice_attend_id);
			sto.setTeacher_reason(teacher_reason);
			noticesService.updateNoticesAttendDetail(sto);
		}
		
	}
	
	@RequestMapping(value="/main/getNoticesTask.do")
	public @ResponseBody NoticesTaskDto getNoticesTask(HttpServletRequest request,
						NoticesTaskDto dto,
						ModelMap modelMap) throws Exception {
		return noticesService.getNoticesTask(dto);
	}
	@RequestMapping(value="/main/moveNoticesTask.do")
	public @ResponseBody NoticesTaskDto moveNoticesTask(HttpServletRequest request,
						NoticesTaskDto dto,
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		
		noticesService.updateNoticesTaskMove(dto);
		int detail_user_id = userInfo.getUser_id();
		
		NoticesTaskDto taskInfo = noticesService.getNoticesTask(dto);
		
		int task_id = dto.getId();
		NoticesTaskDetailDto dto4 = new NoticesTaskDetailDto();
		dto4.setTask_id(task_id);
		NoticesTaskDetailDto taskDetailSeq = noticesService.getNoticesTaskDetailSeq(dto4);
		int task_seq = taskDetailSeq.getTask_seq();
		
		NoticesTaskDetailDto dto5 = new NoticesTaskDetailDto();
		dto5.setDetail_user_id(detail_user_id);
		dto5.setTask_id(task_id);
		dto5.setTask_seq(task_seq);
		dto5.setTask_status(taskInfo.getTask_status());
		dto5.setTask_user_id(taskInfo.getTask_user_id());
		dto5.setTask_date(taskInfo.getTask_date());
		dto5.setTask_time(taskInfo.getTask_time());
		dto5.setTask_title(taskInfo.getTask_title());
		dto5.setTask_reference_title(taskInfo.getTask_reference_title());
		dto5.setTask_reference_content(taskInfo.getTask_reference_content());
		dto5.setTask_reference_image(taskInfo.getTask_reference_image());
		dto5.setTask_reference_image_name(taskInfo.getTask_reference_image_name());
		dto5.setTask_reference_url(taskInfo.getTask_reference_url());
		dto5.setTask_reference_file(taskInfo.getTask_reference_file());
		dto5.setTask_reference_file_name(taskInfo.getTask_reference_file_name());
		dto5.setTask_report_image(taskInfo.isTask_report_image());
		dto5.setTask_report_url(taskInfo.isTask_report_url());
		dto5.setTask_report_file(taskInfo.isTask_report_file());
		dto5.setTask_content(taskInfo.getTask_content());
		dto5.setTask_image(taskInfo.getTask_image());
		dto5.setTask_image_name(taskInfo.getTask_image_name());
		dto5.setTask_url(taskInfo.getTask_url());
		dto5.setTask_file(taskInfo.getTask_file());
		dto5.setTask_file_name(taskInfo.getTask_file_name());
		
		dto5.setTask_return_content(taskInfo.getTask_return_content());
		dto5.setTask_category_detail_id(dto.getTask_category_detail_id());
		noticesService.insertNoticesTaskDetail(dto5);
		
		return taskInfo;
	}
	
	@RequestMapping(value="/main/updateNoticesTask.do")
	public @ResponseBody NoticesTaskDto updateNoticesTask(HttpServletRequest request,
						NoticesTaskDto dto,
						ModelMap modelMap) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		
		noticesService.updateNoticesTask(dto);
		int detail_user_id = userInfo.getUser_id();
		
		NoticesTaskDto taskInfo = noticesService.getNoticesTask(dto);
		
		int task_id = dto.getId();
		NoticesTaskDetailDto dto4 = new NoticesTaskDetailDto();
		dto4.setTask_id(task_id);
		NoticesTaskDetailDto taskDetailSeq = noticesService.getNoticesTaskDetailSeq(dto4);
		int task_seq = taskDetailSeq.getTask_seq();
		
		NoticesTaskDetailDto dto5 = new NoticesTaskDetailDto();
		dto5.setDetail_user_id(detail_user_id);
		dto5.setTask_id(task_id);
		dto5.setTask_seq(task_seq);
		dto5.setTask_status(taskInfo.getTask_status());
		dto5.setTask_user_id(taskInfo.getTask_user_id());
		dto5.setTask_date(taskInfo.getTask_date());
		dto5.setTask_time(taskInfo.getTask_time());
		dto5.setTask_title(taskInfo.getTask_title());
		dto5.setTask_reference_title(taskInfo.getTask_reference_title());
		dto5.setTask_reference_content(taskInfo.getTask_reference_content());
		dto5.setTask_reference_image(taskInfo.getTask_reference_image());
		dto5.setTask_reference_image_name(taskInfo.getTask_reference_image_name());
		dto5.setTask_reference_url(taskInfo.getTask_reference_url());
		dto5.setTask_reference_file(taskInfo.getTask_reference_file());
		dto5.setTask_reference_file_name(taskInfo.getTask_reference_file_name());
		dto5.setTask_report_image(taskInfo.isTask_report_image());
		dto5.setTask_report_url(taskInfo.isTask_report_url());
		dto5.setTask_report_file(taskInfo.isTask_report_file());
		dto5.setTask_content(taskInfo.getTask_content());
		dto5.setTask_image(taskInfo.getTask_image());
		dto5.setTask_image_name(taskInfo.getTask_image_name());
		dto5.setTask_url(taskInfo.getTask_url());
		dto5.setTask_file(taskInfo.getTask_file());
		dto5.setTask_file_name(taskInfo.getTask_file_name());
		
		dto5.setTask_return_content(taskInfo.getTask_return_content());
		dto5.setTask_category_detail_id(dto.getTask_category_detail_id());
		noticesService.insertNoticesTaskDetail(dto5);
		
		return taskInfo;
	}
	
	@RequestMapping(value="/main/getTeacherNoticeNewStudent.do")
	public @ResponseBody Map getTeacherNoticeNewStudent(HttpServletRequest request, NoticesNewStudentDto dto) throws Exception {
		
		Map resultMap = new HashMap();
		
		NoticesNewStudentDto newStudent = noticesService.getNoticesNewStudent(dto);
		resultMap.put("newStudent", newStudent);
		
		NoticesNewStudentDetailDto dto1 = new NoticesNewStudentDetailDto();
		dto1.setNotice_new_student_id(dto.getId());
		List<NoticesNewStudentDetailDto> newStudentDetailList = noticesService.getNoticesNewStudentDetailList(dto1);
		resultMap.put("newStudentDetailList", newStudentDetailList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/main/updatNoticesNewStudent.do")
	public @ResponseBody NoticesNewStudentDto updatNoticesNewStudent(HttpServletRequest request, NoticesNewStudentDto dto) throws Exception {
		
		noticesService.updatetNoticesNewStudent(dto);
		
		int notice_new_student_id = dto.getId();
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			int course_enrollment_id  = Integer.parseInt(jsonObj.get("course_enrollment_id").toString());
			String training_desc      = jsonObj.get("training_desc").toString();
			boolean is_training_desc  = Boolean.parseBoolean(jsonObj.get("is_training_desc").toString());
			
			NoticesNewStudentDetailDto sto = new NoticesNewStudentDetailDto();
			sto.setNotice_new_student_id(notice_new_student_id);
			sto.setCourse_enrollment_id(course_enrollment_id);
			sto.setIs_training_desc(is_training_desc);
			sto.setTraining_desc(training_desc);
			
			noticesService.updatNewStudentTraining(sto);
		}
		
		return noticesService.getNoticesNewStudent(dto);
	}
}