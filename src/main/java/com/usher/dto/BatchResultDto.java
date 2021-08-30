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
public class BatchResultDto{
	private int id;
	private int user_id;
	private String user_multi_id;
	private String user_name;
	private int course_id;
	private String course_name;
	private int course_group_id;
	private int course_level;
	
	private int batch_select_count;
	private String batch_exam_date;
	private String batch_repeat_exam_yn;
	private String batch_concentration_yn;
	private int batch_delay_min;
	
	private String batch_grammar_exam_yn;
	private String batch_grammar_type;
	private int batch_grammar_num;
	private int batch_grammar_score1;
	private int batch_grammar_score1_prev;
	private int batch_grammar_total_score1;
	private int batch_grammar_score2;
	private int batch_grammar_score2_prev;
	private int batch_grammar_total_score2;
	private int batch_grammar_result_id;
	private String batch_reading_exam_yn;
	private String batch_reading_type;
	private int batch_reading_num;
	private int batch_reading_score;
	private int batch_reading_score_prev;
	private int batch_reading_total_score;
	private int batch_reading_result_id;
	private String batch_listening_exam_yn;
	private String batch_listening_type;
	private int batch_listening_num;
	private int batch_listening_score;
	private int batch_listening_score_prev;
	private int batch_listening_total_score;
	private int batch_listening_result_id;
	
	private String batch_courses;
	private int batch_courses_level;
	private String batch_user_courses;
	private int batch_user_courses_level;
	private String batch_select_courses;
	private int batch_select_courses_level;
	private int batch_select_courses_count;
	private String batch_select_type;
	private String batch_select_level;

	private String batch_repeat_grammar_exam_yn;
	private String batch_repeat_grammar_type;
	private int batch_repeat_grammar_num;
	private int batch_repeat_grammar_score1;
	private int batch_repeat_grammar_total_score1;
	private int batch_repeat_grammar_score2;
	private int batch_repeat_grammar_total_score2;
	private int batch_repeat_grammar_result_id;
	private String batch_repeat_reading_exam_yn;
	private String batch_repeat_reading_type;
	private int batch_repeat_reading_num;
	private int batch_repeat_reading_score;
	private int batch_repeat_reading_total_score;
	private int batch_repeat_reading_result_id;
	private String batch_repeat_listening_exam_yn;
	private String batch_repeat_listening_type;
	private int batch_repeat_listening_num;
	private int batch_repeat_listening_score;
	private int batch_repeat_listening_total_score;
	private int batch_repeat_listening_result_id;
	
	private String batch_repeat_courses;
	private int batch_repeat_courses_level;
	private String batch_repeat_user_courses;
	private int batch_repeat_user_courses_level;
	private String batch_repeat_select_courses;
	private int batch_repeat_select_courses_level;
	private String batch_repeat_select_type;
	private String batch_repeat_select_level;
	
	private String batch_user_level;
	private String batch_user_advice;
	private String batch_user_register_yn;
	private String batch_user_not_register_desc;
	private String batch_user_register_date;
	
	private String batch_adviser_courses;
	private int batch_adviser_courses_id;
	private String batch_adviser_courses_name;
	private String batch_adviser_courses_date;
	
	private String batch_adviser_advice;
	private int batch_adviser_advice_id;
	private String batch_adviser_advice_name;
	private String batch_adviser_advice_date;
	
	private String batch_adviser_register_yn;
	private String batch_adviser_not_register_desc;
	private String batch_adviser_register_date;
	private String batch_adviser_yn;
	private int batch_adviser_id;
	private String batch_adviser_name;
	private String batch_adviser_date;
	
	private String batch_desk_register_date;
	private String batch_desk_register_yn;
	private String batch_desk_not_register_desc;
	private int batch_desk_id;
	private String batch_desk_name;
	private String batch_desk_date;
	
	//추가사항
	private int batch_schedule_id;
	private String memoirs_yn;

	private String batch_toeic_exam_yn;
	private String batch_toeic_type;
	private int batch_toeic_num;
	private int batch_toeic_part5_score;
	private int batch_toeic_part5_total_score;
	private int batch_toeic_part6_score;
	private int batch_toeic_part6_total_score;
	private int batch_toeic_part7_score;
	private int batch_toeic_part7_total_score;
	private int batch_toeic_result_id;
	
	private String batch_adviser_test_type;
	private String batch_adviser_student_type;
	private String batch_adviser_course_group;
	
	private String batch_finally_test_type;
	private String batch_finally_student_type;
	private String batch_finally_course_group;
	private String batch_finally_courses;
	
	private String batch_finally_register_yn;
	private String batch_finally_not_register_desc;
	
	//성적
	private float teps_total_score;
	private float teps_rc_score;
	private float teps_lc_score;
	private float teps_grammar_score;
	private float teps_voca_score;
	private float sat_total_score;
	private float sat_rc_score;
	private float sat_wr_score;
	private float sat_math_score;
	private float toeic_total_score;
	private float toeic_rc_score;
	private float toeic_lc_score;
	private float ielts_total_score;
	private float ielts_rc_score;
	private float ielts_lc_score;
	private float ielts_sp_score;
	private float ielts_wr_score;
	private float ibt_total_score;
	private float ibt_rc_score;
	private float ibt_lc_score;
	private float ibt_sp_score;
	private float ibt_wr_score;
	private float ets_total_score;
	private float ets_rc_score;
	private float ets_lc_score;
	private float ets_sp_score;
	private float ets_wr_score;
	private float pbt_total_score;
	private float pbt_gr_score;
	private float pbt_rc_score;
	private float pbt_lc_score;
	private int scholastic_grade;

	//개인정보
	private String gender;
	private String mobile_no;
	private String birthday;
	private String test_type;
	private String student_type;
	private String course_group;
	private String name;
	private String email;
	private int goal_score;
	private String week_point;
	private int student_will;
	private int parent_will;
	private String army;
	private String purpose_gubun;
	private String purpose_detail;
	private String need_date;
	private String attend_start_date;
	private String attend_date;
	private String out_name ;
	private String out_course;
	private String out_month;
	private String foreign_country;
	private String foreign_month;
	private String tel_home_gubun;
	private String tel_home_number;
	private String tel_phone_gugun;
	private String tel_phone_number;
	private String tel_emergency_gubun;
	private String tel_emergency_number;
	private String commute_area1;
	private String commute_area2;
	private String commute_area3;
	private int commute_min;
	private String health_gubun;
	private String health_desc;
	private String personal_gubun;
	private String personal_desc;
	private String location;
	private String keyword;
	private String commute_gubun;
	
	//학교
	private String school_gubun;
	private String school_foreign_gubun;
	private String school_area1;
	private String school_area2;
	private String school_name;
	private String school_major;
	private String school_grade;
	private String school_state;
	private String school_check;
	
	private String sort_value;

	private String photo;
	
	private String chamgang_yn;
	
	private String batch_schedule_adviser_name;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public int getCourse_id() {
		return course_id;
	}

	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}

	public int getBatch_select_count() {
		return batch_select_count;
	}

	public void setBatch_select_count(int batch_select_count) {
		this.batch_select_count = batch_select_count;
	}

	public String getBatch_exam_date() {
		return batch_exam_date;
	}

	public void setBatch_exam_date(String batch_exam_date) {
		this.batch_exam_date = batch_exam_date;
	}

	public String getBatch_repeat_exam_yn() {
		return batch_repeat_exam_yn;
	}

	public void setBatch_repeat_exam_yn(String batch_repeat_exam_yn) {
		this.batch_repeat_exam_yn = batch_repeat_exam_yn;
	}

	public String getBatch_concentration_yn() {
		return batch_concentration_yn;
	}

	public void setBatch_concentration_yn(String batch_concentration_yn) {
		this.batch_concentration_yn = batch_concentration_yn;
	}

	public int getBatch_delay_min() {
		return batch_delay_min;
	}

	public void setBatch_delay_min(int batch_delay_min) {
		this.batch_delay_min = batch_delay_min;
	}

	public String getBatch_grammar_exam_yn() {
		return batch_grammar_exam_yn;
	}

	public void setBatch_grammar_exam_yn(String batch_grammar_exam_yn) {
		this.batch_grammar_exam_yn = batch_grammar_exam_yn;
	}

	public String getBatch_grammar_type() {
		return batch_grammar_type;
	}

	public void setBatch_grammar_type(String batch_grammar_type) {
		this.batch_grammar_type = batch_grammar_type;
	}

	public int getBatch_grammar_num() {
		return batch_grammar_num;
	}

	public void setBatch_grammar_num(int batch_grammar_num) {
		this.batch_grammar_num = batch_grammar_num;
	}

	public int getBatch_grammar_score1() {
		return batch_grammar_score1;
	}

	public void setBatch_grammar_score1(int batch_grammar_score1) {
		this.batch_grammar_score1 = batch_grammar_score1;
	}

	public int getBatch_grammar_total_score1() {
		return batch_grammar_total_score1;
	}

	public void setBatch_grammar_total_score1(int batch_grammar_total_score1) {
		this.batch_grammar_total_score1 = batch_grammar_total_score1;
	}

	public int getBatch_grammar_score2() {
		return batch_grammar_score2;
	}

	public void setBatch_grammar_score2(int batch_grammar_score2) {
		this.batch_grammar_score2 = batch_grammar_score2;
	}

	public int getBatch_grammar_total_score2() {
		return batch_grammar_total_score2;
	}

	public void setBatch_grammar_total_score2(int batch_grammar_total_score2) {
		this.batch_grammar_total_score2 = batch_grammar_total_score2;
	}

	public int getBatch_grammar_result_id() {
		return batch_grammar_result_id;
	}

	public void setBatch_grammar_result_id(int batch_grammar_result_id) {
		this.batch_grammar_result_id = batch_grammar_result_id;
	}

	public String getBatch_reading_exam_yn() {
		return batch_reading_exam_yn;
	}

	public void setBatch_reading_exam_yn(String batch_reading_exam_yn) {
		this.batch_reading_exam_yn = batch_reading_exam_yn;
	}

	public String getBatch_reading_type() {
		return batch_reading_type;
	}

	public void setBatch_reading_type(String batch_reading_type) {
		this.batch_reading_type = batch_reading_type;
	}

	public int getBatch_reading_num() {
		return batch_reading_num;
	}

	public void setBatch_reading_num(int batch_reading_num) {
		this.batch_reading_num = batch_reading_num;
	}

	public int getBatch_reading_score() {
		return batch_reading_score;
	}

	public void setBatch_reading_score(int batch_reading_score) {
		this.batch_reading_score = batch_reading_score;
	}

	public int getBatch_reading_total_score() {
		return batch_reading_total_score;
	}

	public void setBatch_reading_total_score(int batch_reading_total_score) {
		this.batch_reading_total_score = batch_reading_total_score;
	}

	public int getBatch_reading_result_id() {
		return batch_reading_result_id;
	}

	public void setBatch_reading_result_id(int batch_reading_result_id) {
		this.batch_reading_result_id = batch_reading_result_id;
	}

	public String getBatch_listening_exam_yn() {
		return batch_listening_exam_yn;
	}

	public void setBatch_listening_exam_yn(String batch_listening_exam_yn) {
		this.batch_listening_exam_yn = batch_listening_exam_yn;
	}

	public String getBatch_listening_type() {
		return batch_listening_type;
	}

	public void setBatch_listening_type(String batch_listening_type) {
		this.batch_listening_type = batch_listening_type;
	}

	public int getBatch_listening_num() {
		return batch_listening_num;
	}

	public void setBatch_listening_num(int batch_listening_num) {
		this.batch_listening_num = batch_listening_num;
	}

	public int getBatch_listening_score() {
		return batch_listening_score;
	}

	public void setBatch_listening_score(int batch_listening_score) {
		this.batch_listening_score = batch_listening_score;
	}

	public int getBatch_listening_total_score() {
		return batch_listening_total_score;
	}

	public void setBatch_listening_total_score(int batch_listening_total_score) {
		this.batch_listening_total_score = batch_listening_total_score;
	}

	public int getBatch_listening_result_id() {
		return batch_listening_result_id;
	}

	public void setBatch_listening_result_id(int batch_listening_result_id) {
		this.batch_listening_result_id = batch_listening_result_id;
	}

	public String getBatch_courses() {
		return batch_courses;
	}

	public void setBatch_courses(String batch_courses) {
		this.batch_courses = batch_courses;
	}

	public int getBatch_courses_level() {
		return batch_courses_level;
	}

	public void setBatch_courses_level(int batch_courses_level) {
		this.batch_courses_level = batch_courses_level;
	}

	public String getBatch_user_courses() {
		return batch_user_courses;
	}

	public void setBatch_user_courses(String batch_user_courses) {
		this.batch_user_courses = batch_user_courses;
	}

	public int getBatch_user_courses_level() {
		return batch_user_courses_level;
	}

	public void setBatch_user_courses_level(int batch_user_courses_level) {
		this.batch_user_courses_level = batch_user_courses_level;
	}

	public String getBatch_select_courses() {
		return batch_select_courses;
	}

	public void setBatch_select_courses(String batch_select_courses) {
		this.batch_select_courses = batch_select_courses;
	}

	public int getBatch_select_courses_level() {
		return batch_select_courses_level;
	}

	public void setBatch_select_courses_level(int batch_select_courses_level) {
		this.batch_select_courses_level = batch_select_courses_level;
	}

	public int getBatch_select_courses_count() {
		return batch_select_courses_count;
	}

	public void setBatch_select_courses_count(int batch_select_courses_count) {
		this.batch_select_courses_count = batch_select_courses_count;
	}

	public String getBatch_select_type() {
		return batch_select_type;
	}

	public void setBatch_select_type(String batch_select_type) {
		this.batch_select_type = batch_select_type;
	}

	public String getBatch_select_level() {
		return batch_select_level;
	}

	public void setBatch_select_level(String batch_select_level) {
		this.batch_select_level = batch_select_level;
	}

	public String getBatch_repeat_grammar_exam_yn() {
		return batch_repeat_grammar_exam_yn;
	}

	public void setBatch_repeat_grammar_exam_yn(String batch_repeat_grammar_exam_yn) {
		this.batch_repeat_grammar_exam_yn = batch_repeat_grammar_exam_yn;
	}

	public String getBatch_repeat_grammar_type() {
		return batch_repeat_grammar_type;
	}

	public void setBatch_repeat_grammar_type(String batch_repeat_grammar_type) {
		this.batch_repeat_grammar_type = batch_repeat_grammar_type;
	}

	public int getBatch_repeat_grammar_num() {
		return batch_repeat_grammar_num;
	}

	public void setBatch_repeat_grammar_num(int batch_repeat_grammar_num) {
		this.batch_repeat_grammar_num = batch_repeat_grammar_num;
	}

	public int getBatch_repeat_grammar_score1() {
		return batch_repeat_grammar_score1;
	}

	public void setBatch_repeat_grammar_score1(int batch_repeat_grammar_score1) {
		this.batch_repeat_grammar_score1 = batch_repeat_grammar_score1;
	}

	public int getBatch_repeat_grammar_total_score1() {
		return batch_repeat_grammar_total_score1;
	}

	public void setBatch_repeat_grammar_total_score1(int batch_repeat_grammar_total_score1) {
		this.batch_repeat_grammar_total_score1 = batch_repeat_grammar_total_score1;
	}

	public int getBatch_repeat_grammar_score2() {
		return batch_repeat_grammar_score2;
	}

	public void setBatch_repeat_grammar_score2(int batch_repeat_grammar_score2) {
		this.batch_repeat_grammar_score2 = batch_repeat_grammar_score2;
	}

	public int getBatch_repeat_grammar_total_score2() {
		return batch_repeat_grammar_total_score2;
	}

	public void setBatch_repeat_grammar_total_score2(int batch_repeat_grammar_total_score2) {
		this.batch_repeat_grammar_total_score2 = batch_repeat_grammar_total_score2;
	}

	public int getBatch_repeat_grammar_result_id() {
		return batch_repeat_grammar_result_id;
	}

	public void setBatch_repeat_grammar_result_id(int batch_repeat_grammar_result_id) {
		this.batch_repeat_grammar_result_id = batch_repeat_grammar_result_id;
	}

	public String getBatch_repeat_reading_exam_yn() {
		return batch_repeat_reading_exam_yn;
	}

	public void setBatch_repeat_reading_exam_yn(String batch_repeat_reading_exam_yn) {
		this.batch_repeat_reading_exam_yn = batch_repeat_reading_exam_yn;
	}

	public String getBatch_repeat_reading_type() {
		return batch_repeat_reading_type;
	}

	public void setBatch_repeat_reading_type(String batch_repeat_reading_type) {
		this.batch_repeat_reading_type = batch_repeat_reading_type;
	}

	public int getBatch_repeat_reading_num() {
		return batch_repeat_reading_num;
	}

	public void setBatch_repeat_reading_num(int batch_repeat_reading_num) {
		this.batch_repeat_reading_num = batch_repeat_reading_num;
	}

	public int getBatch_repeat_reading_score() {
		return batch_repeat_reading_score;
	}

	public void setBatch_repeat_reading_score(int batch_repeat_reading_score) {
		this.batch_repeat_reading_score = batch_repeat_reading_score;
	}

	public int getBatch_repeat_reading_total_score() {
		return batch_repeat_reading_total_score;
	}

	public void setBatch_repeat_reading_total_score(int batch_repeat_reading_total_score) {
		this.batch_repeat_reading_total_score = batch_repeat_reading_total_score;
	}

	public int getBatch_repeat_reading_result_id() {
		return batch_repeat_reading_result_id;
	}

	public void setBatch_repeat_reading_result_id(int batch_repeat_reading_result_id) {
		this.batch_repeat_reading_result_id = batch_repeat_reading_result_id;
	}

	public String getBatch_repeat_listening_exam_yn() {
		return batch_repeat_listening_exam_yn;
	}

	public void setBatch_repeat_listening_exam_yn(String batch_repeat_listening_exam_yn) {
		this.batch_repeat_listening_exam_yn = batch_repeat_listening_exam_yn;
	}

	public String getBatch_repeat_listening_type() {
		return batch_repeat_listening_type;
	}

	public void setBatch_repeat_listening_type(String batch_repeat_listening_type) {
		this.batch_repeat_listening_type = batch_repeat_listening_type;
	}

	public int getBatch_repeat_listening_num() {
		return batch_repeat_listening_num;
	}

	public void setBatch_repeat_listening_num(int batch_repeat_listening_num) {
		this.batch_repeat_listening_num = batch_repeat_listening_num;
	}

	public int getBatch_repeat_listening_score() {
		return batch_repeat_listening_score;
	}

	public void setBatch_repeat_listening_score(int batch_repeat_listening_score) {
		this.batch_repeat_listening_score = batch_repeat_listening_score;
	}

	public int getBatch_repeat_listening_total_score() {
		return batch_repeat_listening_total_score;
	}

	public void setBatch_repeat_listening_total_score(int batch_repeat_listening_total_score) {
		this.batch_repeat_listening_total_score = batch_repeat_listening_total_score;
	}

	public int getBatch_repeat_listening_result_id() {
		return batch_repeat_listening_result_id;
	}

	public void setBatch_repeat_listening_result_id(int batch_repeat_listening_result_id) {
		this.batch_repeat_listening_result_id = batch_repeat_listening_result_id;
	}

	public String getBatch_repeat_courses() {
		return batch_repeat_courses;
	}

	public void setBatch_repeat_courses(String batch_repeat_courses) {
		this.batch_repeat_courses = batch_repeat_courses;
	}

	public int getBatch_repeat_courses_level() {
		return batch_repeat_courses_level;
	}

	public void setBatch_repeat_courses_level(int batch_repeat_courses_level) {
		this.batch_repeat_courses_level = batch_repeat_courses_level;
	}

	public String getBatch_repeat_user_courses() {
		return batch_repeat_user_courses;
	}

	public void setBatch_repeat_user_courses(String batch_repeat_user_courses) {
		this.batch_repeat_user_courses = batch_repeat_user_courses;
	}

	public int getBatch_repeat_user_courses_level() {
		return batch_repeat_user_courses_level;
	}

	public void setBatch_repeat_user_courses_level(int batch_repeat_user_courses_level) {
		this.batch_repeat_user_courses_level = batch_repeat_user_courses_level;
	}

	public String getBatch_repeat_select_courses() {
		return batch_repeat_select_courses;
	}

	public void setBatch_repeat_select_courses(String batch_repeat_select_courses) {
		this.batch_repeat_select_courses = batch_repeat_select_courses;
	}

	public int getBatch_repeat_select_courses_level() {
		return batch_repeat_select_courses_level;
	}

	public void setBatch_repeat_select_courses_level(int batch_repeat_select_courses_level) {
		this.batch_repeat_select_courses_level = batch_repeat_select_courses_level;
	}

	public String getBatch_repeat_select_type() {
		return batch_repeat_select_type;
	}

	public void setBatch_repeat_select_type(String batch_repeat_select_type) {
		this.batch_repeat_select_type = batch_repeat_select_type;
	}

	public String getBatch_repeat_select_level() {
		return batch_repeat_select_level;
	}

	public void setBatch_repeat_select_level(String batch_repeat_select_level) {
		this.batch_repeat_select_level = batch_repeat_select_level;
	}

	public String getBatch_user_level() {
		return batch_user_level;
	}

	public void setBatch_user_level(String batch_user_level) {
		this.batch_user_level = batch_user_level;
	}

	public String getBatch_user_advice() {
		return batch_user_advice;
	}

	public void setBatch_user_advice(String batch_user_advice) {
		this.batch_user_advice = batch_user_advice;
	}

	public String getBatch_user_register_yn() {
		return batch_user_register_yn;
	}

	public void setBatch_user_register_yn(String batch_user_register_yn) {
		this.batch_user_register_yn = batch_user_register_yn;
	}

	public String getBatch_user_not_register_desc() {
		return batch_user_not_register_desc;
	}

	public void setBatch_user_not_register_desc(String batch_user_not_register_desc) {
		this.batch_user_not_register_desc = batch_user_not_register_desc;
	}

	public String getBatch_user_register_date() {
		return batch_user_register_date;
	}

	public void setBatch_user_register_date(String batch_user_register_date) {
		this.batch_user_register_date = batch_user_register_date;
	}

	public String getBatch_adviser_courses() {
		return batch_adviser_courses;
	}

	public void setBatch_adviser_courses(String batch_adviser_courses) {
		this.batch_adviser_courses = batch_adviser_courses;
	}

	public int getBatch_adviser_courses_id() {
		return batch_adviser_courses_id;
	}

	public void setBatch_adviser_courses_id(int batch_adviser_courses_id) {
		this.batch_adviser_courses_id = batch_adviser_courses_id;
	}

	public String getBatch_adviser_courses_name() {
		return batch_adviser_courses_name;
	}

	public void setBatch_adviser_courses_name(String batch_adviser_courses_name) {
		this.batch_adviser_courses_name = batch_adviser_courses_name;
	}

	public String getBatch_adviser_courses_date() {
		return batch_adviser_courses_date;
	}

	public void setBatch_adviser_courses_date(String batch_adviser_courses_date) {
		this.batch_adviser_courses_date = batch_adviser_courses_date;
	}

	public String getBatch_adviser_advice() {
		return batch_adviser_advice;
	}

	public void setBatch_adviser_advice(String batch_adviser_advice) {
		this.batch_adviser_advice = batch_adviser_advice;
	}

	public int getBatch_adviser_advice_id() {
		return batch_adviser_advice_id;
	}

	public void setBatch_adviser_advice_id(int batch_adviser_advice_id) {
		this.batch_adviser_advice_id = batch_adviser_advice_id;
	}

	public String getBatch_adviser_advice_name() {
		return batch_adviser_advice_name;
	}

	public void setBatch_adviser_advice_name(String batch_adviser_advice_name) {
		this.batch_adviser_advice_name = batch_adviser_advice_name;
	}

	public String getBatch_adviser_advice_date() {
		return batch_adviser_advice_date;
	}

	public void setBatch_adviser_advice_date(String batch_adviser_advice_date) {
		this.batch_adviser_advice_date = batch_adviser_advice_date;
	}

	public String getBatch_adviser_register_yn() {
		return batch_adviser_register_yn;
	}

	public void setBatch_adviser_register_yn(String batch_adviser_register_yn) {
		this.batch_adviser_register_yn = batch_adviser_register_yn;
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

	public String getBatch_adviser_yn() {
		return batch_adviser_yn;
	}

	public void setBatch_adviser_yn(String batch_adviser_yn) {
		this.batch_adviser_yn = batch_adviser_yn;
	}

	public int getBatch_adviser_id() {
		return batch_adviser_id;
	}

	public void setBatch_adviser_id(int batch_adviser_id) {
		this.batch_adviser_id = batch_adviser_id;
	}

	public String getBatch_adviser_name() {
		return batch_adviser_name;
	}

	public void setBatch_adviser_name(String batch_adviser_name) {
		this.batch_adviser_name = batch_adviser_name;
	}

	public String getBatch_adviser_date() {
		return batch_adviser_date;
	}

	public void setBatch_adviser_date(String batch_adviser_date) {
		this.batch_adviser_date = batch_adviser_date;
	}

	public String getBatch_desk_register_date() {
		return batch_desk_register_date;
	}

	public void setBatch_desk_register_date(String batch_desk_register_date) {
		this.batch_desk_register_date = batch_desk_register_date;
	}

	public String getBatch_desk_register_yn() {
		return batch_desk_register_yn;
	}

	public void setBatch_desk_register_yn(String batch_desk_register_yn) {
		this.batch_desk_register_yn = batch_desk_register_yn;
	}

	public String getBatch_desk_not_register_desc() {
		return batch_desk_not_register_desc;
	}

	public void setBatch_desk_not_register_desc(String batch_desk_not_register_desc) {
		this.batch_desk_not_register_desc = batch_desk_not_register_desc;
	}

	public int getBatch_desk_id() {
		return batch_desk_id;
	}

	public void setBatch_desk_id(int batch_desk_id) {
		this.batch_desk_id = batch_desk_id;
	}

	public String getBatch_desk_name() {
		return batch_desk_name;
	}

	public void setBatch_desk_name(String batch_desk_name) {
		this.batch_desk_name = batch_desk_name;
	}

	public String getBatch_desk_date() {
		return batch_desk_date;
	}

	public void setBatch_desk_date(String batch_desk_date) {
		this.batch_desk_date = batch_desk_date;
	}

	public int getBatch_schedule_id() {
		return batch_schedule_id;
	}

	public void setBatch_schedule_id(int batch_schedule_id) {
		this.batch_schedule_id = batch_schedule_id;
	}

	public String getMemoirs_yn() {
		return memoirs_yn;
	}

	public void setMemoirs_yn(String memoirs_yn) {
		this.memoirs_yn = memoirs_yn;
	}

	public int getBatch_toeic_part5_score() {
		return batch_toeic_part5_score;
	}

	public void setBatch_toeic_part5_score(int batch_toeic_part5_score) {
		this.batch_toeic_part5_score = batch_toeic_part5_score;
	}

	public int getBatch_toeic_part5_total_score() {
		return batch_toeic_part5_total_score;
	}

	public void setBatch_toeic_part5_total_score(int batch_toeic_part5_total_score) {
		this.batch_toeic_part5_total_score = batch_toeic_part5_total_score;
	}

	public int getBatch_toeic_part6_score() {
		return batch_toeic_part6_score;
	}

	public void setBatch_toeic_part6_score(int batch_toeic_part6_score) {
		this.batch_toeic_part6_score = batch_toeic_part6_score;
	}

	public int getBatch_toeic_part6_total_score() {
		return batch_toeic_part6_total_score;
	}

	public void setBatch_toeic_part6_total_score(int batch_toeic_part6_total_score) {
		this.batch_toeic_part6_total_score = batch_toeic_part6_total_score;
	}

	public int getBatch_toeic_part7_score() {
		return batch_toeic_part7_score;
	}

	public void setBatch_toeic_part7_score(int batch_toeic_part7_score) {
		this.batch_toeic_part7_score = batch_toeic_part7_score;
	}

	public int getBatch_toeic_part7_total_score() {
		return batch_toeic_part7_total_score;
	}

	public void setBatch_toeic_part7_total_score(int batch_toeic_part7_total_score) {
		this.batch_toeic_part7_total_score = batch_toeic_part7_total_score;
	}

	public String getBatch_toeic_exam_yn() {
		return batch_toeic_exam_yn;
	}

	public void setBatch_toeic_exam_yn(String batch_toeic_exam_yn) {
		this.batch_toeic_exam_yn = batch_toeic_exam_yn;
	}

	public String getBatch_adviser_test_type() {
		return batch_adviser_test_type;
	}

	public void setBatch_adviser_test_type(String batch_adviser_test_type) {
		this.batch_adviser_test_type = batch_adviser_test_type;
	}

	public String getBatch_adviser_student_type() {
		return batch_adviser_student_type;
	}

	public void setBatch_adviser_student_type(String batch_adviser_student_type) {
		this.batch_adviser_student_type = batch_adviser_student_type;
	}

	public String getBatch_adviser_course_group() {
		return batch_adviser_course_group;
	}

	public void setBatch_adviser_course_group(String batch_adviser_course_group) {
		this.batch_adviser_course_group = batch_adviser_course_group;
	}

	public float getTeps_total_score() {
		return teps_total_score;
	}

	public void setTeps_total_score(float teps_total_score) {
		this.teps_total_score = teps_total_score;
	}

	public float getTeps_rc_score() {
		return teps_rc_score;
	}

	public void setTeps_rc_score(float teps_rc_score) {
		this.teps_rc_score = teps_rc_score;
	}

	public float getTeps_lc_score() {
		return teps_lc_score;
	}

	public void setTeps_lc_score(float teps_lc_score) {
		this.teps_lc_score = teps_lc_score;
	}

	public float getTeps_grammar_score() {
		return teps_grammar_score;
	}

	public void setTeps_grammar_score(float teps_grammar_score) {
		this.teps_grammar_score = teps_grammar_score;
	}

	public float getTeps_voca_score() {
		return teps_voca_score;
	}

	public void setTeps_voca_score(float teps_voca_score) {
		this.teps_voca_score = teps_voca_score;
	}

	public float getSat_total_score() {
		return sat_total_score;
	}

	public void setSat_total_score(float sat_total_score) {
		this.sat_total_score = sat_total_score;
	}

	public float getSat_rc_score() {
		return sat_rc_score;
	}

	public void setSat_rc_score(float sat_rc_score) {
		this.sat_rc_score = sat_rc_score;
	}

	public float getSat_wr_score() {
		return sat_wr_score;
	}

	public void setSat_wr_score(float sat_wr_score) {
		this.sat_wr_score = sat_wr_score;
	}

	public float getSat_math_score() {
		return sat_math_score;
	}

	public void setSat_math_score(float sat_math_score) {
		this.sat_math_score = sat_math_score;
	}

	public float getToeic_total_score() {
		return toeic_total_score;
	}

	public void setToeic_total_score(float toeic_total_score) {
		this.toeic_total_score = toeic_total_score;
	}

	public float getToeic_rc_score() {
		return toeic_rc_score;
	}

	public void setToeic_rc_score(float toeic_rc_score) {
		this.toeic_rc_score = toeic_rc_score;
	}

	public float getToeic_lc_score() {
		return toeic_lc_score;
	}

	public void setToeic_lc_score(float toeic_lc_score) {
		this.toeic_lc_score = toeic_lc_score;
	}

	public float getIelts_total_score() {
		return ielts_total_score;
	}

	public void setIelts_total_score(float ielts_total_score) {
		this.ielts_total_score = ielts_total_score;
	}

	public float getIelts_rc_score() {
		return ielts_rc_score;
	}

	public void setIelts_rc_score(float ielts_rc_score) {
		this.ielts_rc_score = ielts_rc_score;
	}

	public float getIelts_lc_score() {
		return ielts_lc_score;
	}

	public void setIelts_lc_score(float ielts_lc_score) {
		this.ielts_lc_score = ielts_lc_score;
	}

	public float getIelts_sp_score() {
		return ielts_sp_score;
	}

	public void setIelts_sp_score(float ielts_sp_score) {
		this.ielts_sp_score = ielts_sp_score;
	}

	public float getIelts_wr_score() {
		return ielts_wr_score;
	}

	public void setIelts_wr_score(float ielts_wr_score) {
		this.ielts_wr_score = ielts_wr_score;
	}

	public float getIbt_total_score() {
		return ibt_total_score;
	}

	public void setIbt_total_score(float ibt_total_score) {
		this.ibt_total_score = ibt_total_score;
	}

	public float getIbt_rc_score() {
		return ibt_rc_score;
	}

	public void setIbt_rc_score(float ibt_rc_score) {
		this.ibt_rc_score = ibt_rc_score;
	}

	public float getIbt_lc_score() {
		return ibt_lc_score;
	}

	public void setIbt_lc_score(float ibt_lc_score) {
		this.ibt_lc_score = ibt_lc_score;
	}

	public float getIbt_sp_score() {
		return ibt_sp_score;
	}

	public void setIbt_sp_score(float ibt_sp_score) {
		this.ibt_sp_score = ibt_sp_score;
	}

	public float getIbt_wr_score() {
		return ibt_wr_score;
	}

	public void setIbt_wr_score(float ibt_wr_score) {
		this.ibt_wr_score = ibt_wr_score;
	}

	public float getEts_total_score() {
		return ets_total_score;
	}

	public void setEts_total_score(float ets_total_score) {
		this.ets_total_score = ets_total_score;
	}

	public float getEts_rc_score() {
		return ets_rc_score;
	}

	public void setEts_rc_score(float ets_rc_score) {
		this.ets_rc_score = ets_rc_score;
	}

	public float getEts_lc_score() {
		return ets_lc_score;
	}

	public void setEts_lc_score(float ets_lc_score) {
		this.ets_lc_score = ets_lc_score;
	}

	public float getEts_sp_score() {
		return ets_sp_score;
	}

	public void setEts_sp_score(float ets_sp_score) {
		this.ets_sp_score = ets_sp_score;
	}

	public float getEts_wr_score() {
		return ets_wr_score;
	}

	public void setEts_wr_score(float ets_wr_score) {
		this.ets_wr_score = ets_wr_score;
	}

	public int getScholastic_grade() {
		return scholastic_grade;
	}

	public void setScholastic_grade(int scholastic_grade) {
		this.scholastic_grade = scholastic_grade;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getMobile_no() {
		return mobile_no;
	}

	public void setMobile_no(String mobile_no) {
		this.mobile_no = mobile_no;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getTest_type() {
		return test_type;
	}

	public void setTest_type(String test_type) {
		this.test_type = test_type;
	}

	public String getStudent_type() {
		return student_type;
	}

	public void setStudent_type(String student_type) {
		this.student_type = student_type;
	}

	public String getCourse_group() {
		return course_group;
	}

	public void setCourse_group(String course_group) {
		this.course_group = course_group;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getGoal_score() {
		return goal_score;
	}

	public void setGoal_score(int goal_score) {
		this.goal_score = goal_score;
	}

	public String getWeek_point() {
		return week_point;
	}

	public void setWeek_point(String week_point) {
		this.week_point = week_point;
	}

	public int getStudent_will() {
		return student_will;
	}

	public void setStudent_will(int student_will) {
		this.student_will = student_will;
	}

	public int getParent_will() {
		return parent_will;
	}

	public void setParent_will(int parent_will) {
		this.parent_will = parent_will;
	}

	public String getArmy() {
		return army;
	}

	public void setArmy(String army) {
		this.army = army;
	}

	public String getPurpose_gubun() {
		return purpose_gubun;
	}

	public void setPurpose_gubun(String purpose_gubun) {
		this.purpose_gubun = purpose_gubun;
	}

	public String getPurpose_detail() {
		return purpose_detail;
	}

	public void setPurpose_detail(String purpose_detail) {
		this.purpose_detail = purpose_detail;
	}

	public String getNeed_date() {
		return need_date;
	}

	public void setNeed_date(String need_date) {
		this.need_date = need_date;
	}

	public String getAttend_start_date() {
		return attend_start_date;
	}

	public void setAttend_start_date(String attend_start_date) {
		this.attend_start_date = attend_start_date;
	}

	public String getAttend_date() {
		return attend_date;
	}

	public void setAttend_date(String attend_date) {
		this.attend_date = attend_date;
	}

	public String getOut_name() {
		return out_name;
	}

	public void setOut_name(String out_name) {
		this.out_name = out_name;
	}

	public String getOut_course() {
		return out_course;
	}

	public void setOut_course(String out_course) {
		this.out_course = out_course;
	}

	public String getOut_month() {
		return out_month;
	}

	public void setOut_month(String out_month) {
		this.out_month = out_month;
	}

	public String getForeign_country() {
		return foreign_country;
	}

	public void setForeign_country(String foreign_country) {
		this.foreign_country = foreign_country;
	}

	public String getForeign_month() {
		return foreign_month;
	}

	public void setForeign_month(String foreign_month) {
		this.foreign_month = foreign_month;
	}

	public String getTel_home_gubun() {
		return tel_home_gubun;
	}

	public void setTel_home_gubun(String tel_home_gubun) {
		this.tel_home_gubun = tel_home_gubun;
	}

	public String getTel_home_number() {
		return tel_home_number;
	}

	public void setTel_home_number(String tel_home_number) {
		this.tel_home_number = tel_home_number;
	}

	public String getTel_phone_gugun() {
		return tel_phone_gugun;
	}

	public void setTel_phone_gugun(String tel_phone_gugun) {
		this.tel_phone_gugun = tel_phone_gugun;
	}

	public String getTel_phone_number() {
		return tel_phone_number;
	}

	public void setTel_phone_number(String tel_phone_number) {
		this.tel_phone_number = tel_phone_number;
	}

	public String getTel_emergency_gubun() {
		return tel_emergency_gubun;
	}

	public void setTel_emergency_gubun(String tel_emergency_gubun) {
		this.tel_emergency_gubun = tel_emergency_gubun;
	}

	public String getTel_emergency_number() {
		return tel_emergency_number;
	}

	public void setTel_emergency_number(String tel_emergency_number) {
		this.tel_emergency_number = tel_emergency_number;
	}

	public String getCommute_area1() {
		return commute_area1;
	}

	public void setCommute_area1(String commute_area1) {
		this.commute_area1 = commute_area1;
	}

	public String getCommute_area2() {
		return commute_area2;
	}

	public void setCommute_area2(String commute_area2) {
		this.commute_area2 = commute_area2;
	}

	public String getCommute_area3() {
		return commute_area3;
	}

	public void setCommute_area3(String commute_area3) {
		this.commute_area3 = commute_area3;
	}

	public int getCommute_min() {
		return commute_min;
	}

	public void setCommute_min(int commute_min) {
		this.commute_min = commute_min;
	}

	public String getHealth_gubun() {
		return health_gubun;
	}

	public void setHealth_gubun(String health_gubun) {
		this.health_gubun = health_gubun;
	}

	public String getHealth_desc() {
		return health_desc;
	}

	public void setHealth_desc(String health_desc) {
		this.health_desc = health_desc;
	}

	public String getPersonal_gubun() {
		return personal_gubun;
	}

	public void setPersonal_gubun(String personal_gubun) {
		this.personal_gubun = personal_gubun;
	}

	public String getPersonal_desc() {
		return personal_desc;
	}

	public void setPersonal_desc(String personal_desc) {
		this.personal_desc = personal_desc;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getCommute_gubun() {
		return commute_gubun;
	}

	public void setCommute_gubun(String commute_gubun) {
		this.commute_gubun = commute_gubun;
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

	public String getSchool_major() {
		return school_major;
	}

	public void setSchool_major(String school_major) {
		this.school_major = school_major;
	}

	public String getSchool_grade() {
		return school_grade;
	}

	public void setSchool_grade(String school_grade) {
		this.school_grade = school_grade;
	}

	public String getSchool_state() {
		return school_state;
	}

	public void setSchool_state(String school_state) {
		this.school_state = school_state;
	}

	public String getSchool_check() {
		return school_check;
	}

	public void setSchool_check(String school_check) {
		this.school_check = school_check;
	}

	public String getSort_value() {
		return sort_value;
	}

	public void setSort_value(String sort_value) {
		this.sort_value = sort_value;
	}

	public String getBatch_finally_test_type() {
		return batch_finally_test_type;
	}

	public void setBatch_finally_test_type(String batch_finally_test_type) {
		this.batch_finally_test_type = batch_finally_test_type;
	}

	public String getBatch_finally_student_type() {
		return batch_finally_student_type;
	}

	public void setBatch_finally_student_type(String batch_finally_student_type) {
		this.batch_finally_student_type = batch_finally_student_type;
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

	public float getPbt_total_score() {
		return pbt_total_score;
	}

	public void setPbt_total_score(float pbt_total_score) {
		this.pbt_total_score = pbt_total_score;
	}

	public float getPbt_gr_score() {
		return pbt_gr_score;
	}

	public void setPbt_gr_score(float pbt_gr_score) {
		this.pbt_gr_score = pbt_gr_score;
	}

	public float getPbt_rc_score() {
		return pbt_rc_score;
	}

	public void setPbt_rc_score(float pbt_rc_score) {
		this.pbt_rc_score = pbt_rc_score;
	}

	public float getPbt_lc_score() {
		return pbt_lc_score;
	}

	public void setPbt_lc_score(float pbt_lc_score) {
		this.pbt_lc_score = pbt_lc_score;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getCourse_name() {
		return course_name;
	}

	public void setCourse_name(String course_name) {
		this.course_name = course_name;
	}

	public int getCourse_group_id() {
		return course_group_id;
	}

	public void setCourse_group_id(int course_group_id) {
		this.course_group_id = course_group_id;
	}

	public int getCourse_level() {
		return course_level;
	}

	public void setCourse_level(int course_level) {
		this.course_level = course_level;
	}

	public String getUser_multi_id() {
		return user_multi_id;
	}

	public void setUser_multi_id(String user_multi_id) {
		this.user_multi_id = user_multi_id;
	}

	public String getBatch_finally_not_register_desc() {
		return batch_finally_not_register_desc;
	}

	public void setBatch_finally_not_register_desc(String batch_finally_not_register_desc) {
		this.batch_finally_not_register_desc = batch_finally_not_register_desc;
	}

	public String getBatch_finally_register_yn() {
		return batch_finally_register_yn;
	}

	public void setBatch_finally_register_yn(String batch_finally_register_yn) {
		this.batch_finally_register_yn = batch_finally_register_yn;
	}

	public int getBatch_grammar_score1_prev() {
		return batch_grammar_score1_prev;
	}

	public void setBatch_grammar_score1_prev(int batch_grammar_score1_prev) {
		this.batch_grammar_score1_prev = batch_grammar_score1_prev;
	}

	public int getBatch_grammar_score2_prev() {
		return batch_grammar_score2_prev;
	}

	public void setBatch_grammar_score2_prev(int batch_grammar_score2_prev) {
		this.batch_grammar_score2_prev = batch_grammar_score2_prev;
	}

	public int getBatch_reading_score_prev() {
		return batch_reading_score_prev;
	}

	public void setBatch_reading_score_prev(int batch_reading_score_prev) {
		this.batch_reading_score_prev = batch_reading_score_prev;
	}

	public int getBatch_listening_score_prev() {
		return batch_listening_score_prev;
	}

	public void setBatch_listening_score_prev(int batch_listening_score_prev) {
		this.batch_listening_score_prev = batch_listening_score_prev;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getBatch_toeic_type() {
		return batch_toeic_type;
	}

	public void setBatch_toeic_type(String batch_toeic_type) {
		this.batch_toeic_type = batch_toeic_type;
	}

	public int getBatch_toeic_num() {
		return batch_toeic_num;
	}

	public void setBatch_toeic_num(int batch_toeic_num) {
		this.batch_toeic_num = batch_toeic_num;
	}

	public int getBatch_toeic_result_id() {
		return batch_toeic_result_id;
	}

	public void setBatch_toeic_result_id(int batch_toeic_result_id) {
		this.batch_toeic_result_id = batch_toeic_result_id;
	}

	public String getChamgang_yn() {
		return chamgang_yn;
	}

	public void setChamgang_yn(String chamgang_yn) {
		this.chamgang_yn = chamgang_yn;
	}

	public String getBatch_schedule_adviser_name() {
		return batch_schedule_adviser_name;
	}

	public void setBatch_schedule_adviser_name(String batch_schedule_adviser_name) {
		this.batch_schedule_adviser_name = batch_schedule_adviser_name;
	}
	
	
	
}