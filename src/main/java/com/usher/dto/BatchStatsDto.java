package com.usher.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author paulpsb79
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BatchStatsDto{
	
	private int batch_result_id;
	private int user_id;
	private int student_id;
	private String username;
	private String semester_registration_date;
	private String semester_date;
	private String prev_semester_date;
	private String batch_finally_test_type;
	private String batch_finally_student_type;
	private String batch_finally_course_group;
	private String batch_finally_courses;
	private String student_name;
	private String batch_resv_date;
	private String batch_change_date;
	private String batch_exam_date;
	private String adviser_name;
	private String course_group_name;
	private String course_name;
	private String batch_adviser_advice;
	private String attend_start_date;
	private String batch_adviser_register_yn;
	private String batch_adviser_register;
	private String batch_adviser_not_register_desc;
	private String batch_adviser_register_date;
	private String batch_send_kakao_before_yn;
	private String batch_send_kakao_current_yn;
	private String batch_send_phone_yn;
	private String batch_finally_register_yn;
	private String batch_finally_not_register_desc;
	
	private String student_send;
	private String real_register;
	private String finally_register;
	private String finally_register_detail;
	private String real_search_register;
	
	
	private String start_time;
	private String end_time;
	private String batch_adviser_name;
	private int total_count;
	private int success_count;
	private int fail_count;
	private int register_q_y_count;
	private int register_q_n_count;
	private int register_s_y_count;
	private int register_s_n_count;
	
	private int batch_schedule_id;
	
	private String start_exam_date;
	private String end_exam_date;
	
	private String mobile_no;
	private String mobile_parent_no;
	private String batch_yn;
	private String school_gubun;
	private String school_foreign_gubun;
	private String school_area1;
	private String school_area2;
	private String school_name;
	
	private String chamgang_yn;
	
	public String getSemester_date() {
		return semester_date;
	}
	public void setSemester_date(String semester_date) {
		this.semester_date = semester_date;
	}
	public String getBatch_finally_student_type() {
		return batch_finally_student_type;
	}
	public void setBatch_finally_student_type(String batch_finally_student_type) {
		this.batch_finally_student_type = batch_finally_student_type;
	}
	public String getStudent_name() {
		return student_name;
	}
	public void setStudent_name(String student_name) {
		this.student_name = student_name;
	}
	public String getBatch_resv_date() {
		return batch_resv_date;
	}
	public void setBatch_resv_date(String batch_resv_date) {
		this.batch_resv_date = batch_resv_date;
	}
	public String getBatch_change_date() {
		return batch_change_date;
	}
	public void setBatch_change_date(String batch_change_date) {
		this.batch_change_date = batch_change_date;
	}
	public String getBatch_exam_date() {
		return batch_exam_date;
	}
	public void setBatch_exam_date(String batch_exam_date) {
		this.batch_exam_date = batch_exam_date;
	}
	public String getAdviser_name() {
		return adviser_name;
	}
	public void setAdviser_name(String adviser_name) {
		this.adviser_name = adviser_name;
	}
	public String getCourse_group_name() {
		return course_group_name;
	}
	public void setCourse_group_name(String course_group_name) {
		this.course_group_name = course_group_name;
	}
	public String getCourse_name() {
		return course_name;
	}
	public void setCourse_name(String course_name) {
		this.course_name = course_name;
	}
	public String getBatch_adviser_advice() {
		return batch_adviser_advice;
	}
	public void setBatch_adviser_advice(String batch_adviser_advice) {
		this.batch_adviser_advice = batch_adviser_advice;
	}
	public String getAttend_start_date() {
		return attend_start_date;
	}
	public void setAttend_start_date(String attend_start_date) {
		this.attend_start_date = attend_start_date;
	}
	public String getBatch_adviser_register() {
		return batch_adviser_register;
	}
	public void setBatch_adviser_register(String batch_adviser_register) {
		this.batch_adviser_register = batch_adviser_register;
	}
	public String getBatch_adviser_not_register_desc() {
		return batch_adviser_not_register_desc;
	}
	public void setBatch_adviser_not_register_desc(String batch_adviser_not_register_desc) {
		this.batch_adviser_not_register_desc = batch_adviser_not_register_desc;
	}
	public String getBatch_adviser_register_date() {
		return batch_adviser_register_date;
	}
	public void setBatch_adviser_register_date(String batch_adviser_register_date) {
		this.batch_adviser_register_date = batch_adviser_register_date;
	}
	public String getStudent_send() {
		return student_send;
	}
	public void setStudent_send(String student_send) {
		this.student_send = student_send;
	}
	public String getReal_register() {
		return real_register;
	}
	public void setReal_register(String real_register) {
		this.real_register = real_register;
	}
	public String getFinally_register() {
		return finally_register;
	}
	public void setFinally_register(String finally_register) {
		this.finally_register = finally_register;
	}
	public String getFinally_register_detail() {
		return finally_register_detail;
	}
	public void setFinally_register_detail(String finally_register_detail) {
		this.finally_register_detail = finally_register_detail;
	}
	public String getSemester_registration_date() {
		return semester_registration_date;
	}
	public void setSemester_registration_date(String semester_registration_date) {
		this.semester_registration_date = semester_registration_date;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getReal_search_register() {
		return real_search_register;
	}
	public void setReal_search_register(String real_search_register) {
		this.real_search_register = real_search_register;
	}
	public String getStart_time() {
		return start_time;
	}
	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}
	public String getEnd_time() {
		return end_time;
	}
	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}
	public String getBatch_adviser_name() {
		return batch_adviser_name;
	}
	public void setBatch_adviser_name(String batch_adviser_name) {
		this.batch_adviser_name = batch_adviser_name;
	}
	public int getSuccess_count() {
		return success_count;
	}
	public void setSuccess_count(int success_count) {
		this.success_count = success_count;
	}
	public int getFail_count() {
		return fail_count;
	}
	public void setFail_count(int fail_count) {
		this.fail_count = fail_count;
	}

	public String getBatch_finally_test_type() {
		return batch_finally_test_type;
	}
	public void setBatch_finally_test_type(String batch_finally_test_type) {
		this.batch_finally_test_type = batch_finally_test_type;
	}
	public String getBatch_finally_course_group() {
		return batch_finally_course_group;
	}
	public void setBatch_finally_course_group(String batch_finally_course_group) {
		this.batch_finally_course_group = batch_finally_course_group;
	}
	public String getBatch_finally_courses() {
		return batch_finally_courses;
	}
	public void setBatch_finally_courses(String batch_finally_courses) {
		this.batch_finally_courses = batch_finally_courses;
	}
	public String getBatch_adviser_register_yn() {
		return batch_adviser_register_yn;
	}
	public void setBatch_adviser_register_yn(String batch_adviser_register_yn) {
		this.batch_adviser_register_yn = batch_adviser_register_yn;
	}
	public String getBatch_send_kakao_before_yn() {
		return batch_send_kakao_before_yn;
	}
	public void setBatch_send_kakao_before_yn(String batch_send_kakao_before_yn) {
		this.batch_send_kakao_before_yn = batch_send_kakao_before_yn;
	}
	public String getBatch_send_kakao_current_yn() {
		return batch_send_kakao_current_yn;
	}
	public void setBatch_send_kakao_current_yn(String batch_send_kakao_current_yn) {
		this.batch_send_kakao_current_yn = batch_send_kakao_current_yn;
	}
	public String getBatch_send_phone_yn() {
		return batch_send_phone_yn;
	}
	public void setBatch_send_phone_yn(String batch_send_phone_yn) {
		this.batch_send_phone_yn = batch_send_phone_yn;
	}
	public String getBatch_finally_register_yn() {
		return batch_finally_register_yn;
	}
	public void setBatch_finally_register_yn(String batch_finally_register_yn) {
		this.batch_finally_register_yn = batch_finally_register_yn;
	}
	public String getBatch_finally_not_register_desc() {
		return batch_finally_not_register_desc;
	}
	public void setBatch_finally_not_register_desc(String batch_finally_not_register_desc) {
		this.batch_finally_not_register_desc = batch_finally_not_register_desc;
	}
	public int getBatch_schedule_id() {
		return batch_schedule_id;
	}
	public void setBatch_schedule_id(int batch_schedule_id) {
		this.batch_schedule_id = batch_schedule_id;
	}
	public int getRegister_q_y_count() {
		return register_q_y_count;
	}
	public void setRegister_q_y_count(int register_q_y_count) {
		this.register_q_y_count = register_q_y_count;
	}
	public int getRegister_q_n_count() {
		return register_q_n_count;
	}
	public void setRegister_q_n_count(int register_q_n_count) {
		this.register_q_n_count = register_q_n_count;
	}
	public int getRegister_s_y_count() {
		return register_s_y_count;
	}
	public void setRegister_s_y_count(int register_s_y_count) {
		this.register_s_y_count = register_s_y_count;
	}
	public int getRegister_s_n_count() {
		return register_s_n_count;
	}
	public void setRegister_s_n_count(int register_s_n_count) {
		this.register_s_n_count = register_s_n_count;
	}
	public int getBatch_result_id() {
		return batch_result_id;
	}
	public void setBatch_result_id(int batch_result_id) {
		this.batch_result_id = batch_result_id;
	}
	public int getTotal_count() {
		return total_count;
	}
	public void setTotal_count(int total_count) {
		this.total_count = total_count;
	}
	public String getStart_exam_date() {
		return start_exam_date;
	}
	public void setStart_exam_date(String start_exam_date) {
		this.start_exam_date = start_exam_date;
	}
	public String getEnd_exam_date() {
		return end_exam_date;
	}
	public void setEnd_exam_date(String end_exam_date) {
		this.end_exam_date = end_exam_date;
	}
	public String getPrev_semester_date() {
		return prev_semester_date;
	}
	public void setPrev_semester_date(String prev_semester_date) {
		this.prev_semester_date = prev_semester_date;
	}
	public String getMobile_no() {
		return mobile_no;
	}
	public void setMobile_no(String mobile_no) {
		this.mobile_no = mobile_no;
	}
	public String getMobile_parent_no() {
		return mobile_parent_no;
	}
	public void setMobile_parent_no(String mobile_parent_no) {
		this.mobile_parent_no = mobile_parent_no;
	}
	public String getBatch_yn() {
		return batch_yn;
	}
	public void setBatch_yn(String batch_yn) {
		this.batch_yn = batch_yn;
	}
	public String getSchool_gubun() {
		return school_gubun;
	}
	public void setSchool_gubun(String school_gubun) {
		this.school_gubun = school_gubun;
	}
	public String getSchool_foreign_gubun() {
		return school_foreign_gubun;
	}
	public void setSchool_foreign_gubun(String school_foreign_gubun) {
		this.school_foreign_gubun = school_foreign_gubun;
	}
	public String getSchool_area1() {
		return school_area1;
	}
	public void setSchool_area1(String school_area1) {
		this.school_area1 = school_area1;
	}
	public String getSchool_area2() {
		return school_area2;
	}
	public void setSchool_area2(String school_area2) {
		this.school_area2 = school_area2;
	}
	public String getSchool_name() {
		return school_name;
	}
	public void setSchool_name(String school_name) {
		this.school_name = school_name;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getStudent_id() {
		return student_id;
	}
	public void setStudent_id(int student_id) {
		this.student_id = student_id;
	}
	public String getChamgang_yn() {
		return chamgang_yn;
	}
	public void setChamgang_yn(String chamgang_yn) {
		this.chamgang_yn = chamgang_yn;
	}
	
	
	
}