package com.usher.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author paulpsb79
 *
 */
public class EnrollmentsCourseenrollmentDto{
	public int id;
	public int semester_id;
	public int course_id;
	public int course_enrollment_id;
	public int semester_enrollment_id;
	public int user_id;
	public int student_id;
	public String date;
	public String status;
	public String schedule;
	public String refund_status;
	public String refund_reason;
	public String registration_type;
	public String username;
	public String first_name;
	public String last_name;
	public String email;
	public String mobile_no;
	public boolean is_staff;
	public boolean is_active;
	public String chamgang_yn;
	public int bag_no;
	public int bag_sub_no;
	public String program_not_use;
	
	public int allocation_id;
	public int current_course_id;
	public int first_course_id;
	public int last_month_course_enrollment_id;
	
	public String data_value;
	
	public String class_gubun;
	
	public String handphone_bag;
	public String student_name;
	
	
	public String section;
	public String practice_type;
	
	public String gender;
	public String birthday;
	public String purpose_detail;
	public int goal_score;
	public String attend_start_date;
	public String attend_date;
	public String need_date;
	public String tel_emergency_number;
    private String school_gubun;
    private String school_foreign_gubun;
    private String school_area1;
    private String school_area2;	
	public String school_name;
	public String school_grade;
	public int batch_grammar_score1;
	public int batch_grammar_score2;
	public int batch_reading_score;
	public int batch_max_grammar_score1;
	public int batch_max_grammar_score2;
	public int batch_max_reading_score;
	public String batch_user_level;
	
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
	private String batch_adviser_advice;
	
	private String student_type;
	private int difficulty;
	private int class_count;
	
	private String user_first_date;
	private String user_end_date;
	private String course_start_date;
	private String course_end_date;
	private String move_date;
	
	private String cur_date;
	
	private int course_difficulty;
	private int course_inner_difficulty;
	private String course_name;
	private int course_group_id;
	
	private float student_goal_score;
	private float student_goal_month;
	private float course_goal_score;
	private float course_goal_month;
	
	private String refund_date;
	
	private String practice_exception_yn;
	private String practice_exception_reason;
	
	private String photo;
	
	private String semester_in_data;
	private String start_date;
	private String end_date;
	private String memoirs_yn;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getSemester_id() {
		return semester_id;
	}
	public void setSemester_id(int semester_id) {
		this.semester_id = semester_id;
	}
	public int getCourse_id() {
		return course_id;
	}
	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}
	public int getCourse_enrollment_id() {
		return course_enrollment_id;
	}
	public void setCourse_enrollment_id(int course_enrollment_id) {
		this.course_enrollment_id = course_enrollment_id;
	}
	public int getSemester_enrollment_id() {
		return semester_enrollment_id;
	}
	public void setSemester_enrollment_id(int semester_enrollment_id) {
		this.semester_enrollment_id = semester_enrollment_id;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public int getStudent_id() {
		return student_id;
	}
	public void setStudent_id(int student_id) {
		this.student_id = student_id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getSchedule() {
		return schedule;
	}
	public void setSchedule(String schedule) {
		this.schedule = schedule;
	}
	public String getRefund_status() {
		return refund_status;
	}
	public void setRefund_status(String refund_status) {
		this.refund_status = refund_status;
	}
	public String getRefund_reason() {
		return refund_reason;
	}
	public void setRefund_reason(String refund_reason) {
		this.refund_reason = refund_reason;
	}
	public String getRegistration_type() {
		return registration_type;
	}
	public void setRegistration_type(String registration_type) {
		this.registration_type = registration_type;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public boolean isIs_staff() {
		return is_staff;
	}
	public void setIs_staff(boolean is_staff) {
		this.is_staff = is_staff;
	}
	public boolean isIs_active() {
		return is_active;
	}
	public void setIs_active(boolean is_active) {
		this.is_active = is_active;
	}
	public String getChamgang_yn() {
		return chamgang_yn;
	}
	public void setChamgang_yn(String chamgang_yn) {
		this.chamgang_yn = chamgang_yn;
	}
	public int getBag_no() {
		return bag_no;
	}
	public void setBag_no(int bag_no) {
		this.bag_no = bag_no;
	}
	public int getBag_sub_no() {
		return bag_sub_no;
	}
	public void setBag_sub_no(int bag_sub_no) {
		this.bag_sub_no = bag_sub_no;
	}
	public String getData_value() {
		return data_value;
	}
	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	public String getMobile_no() {
		return mobile_no;
	}
	public void setMobile_no(String mobile_no) {
		this.mobile_no = mobile_no;
	}
	public String getHandphone_bag() {
		return handphone_bag;
	}
	public void setHandphone_bag(String handphone_bag) {
		this.handphone_bag = handphone_bag;
	}
	public String getStudent_name() {
		return student_name;
	}
	public void setStudent_name(String student_name) {
		this.student_name = student_name;
	}
	public String getSection() {
		return section;
	}
	public void setSection(String section) {
		this.section = section;
	}
	public String getPractice_type() {
		return practice_type;
	}
	public void setPractice_type(String practice_type) {
		this.practice_type = practice_type;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getBirthday() {
		return birthday;
	}
	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}
	public String getPurpose_detail() {
		return purpose_detail;
	}
	public void setPurpose_detail(String purpose_detail) {
		this.purpose_detail = purpose_detail;
	}
	public int getGoal_score() {
		return goal_score;
	}
	public void setGoal_score(int goal_score) {
		this.goal_score = goal_score;
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
	public String getTel_emergency_number() {
		return tel_emergency_number;
	}
	public void setTel_emergency_number(String tel_emergency_number) {
		this.tel_emergency_number = tel_emergency_number;
	}
	public String getSchool_name() {
		return school_name;
	}
	public void setSchool_name(String school_name) {
		this.school_name = school_name;
	}
	public String getSchool_grade() {
		return school_grade;
	}
	public void setSchool_grade(String school_grade) {
		this.school_grade = school_grade;
	}
	public int getBatch_grammar_score1() {
		return batch_grammar_score1;
	}
	public void setBatch_grammar_score1(int batch_grammar_score1) {
		this.batch_grammar_score1 = batch_grammar_score1;
	}
	public int getBatch_grammar_score2() {
		return batch_grammar_score2;
	}
	public void setBatch_grammar_score2(int batch_grammar_score2) {
		this.batch_grammar_score2 = batch_grammar_score2;
	}
	public int getBatch_reading_score() {
		return batch_reading_score;
	}
	public void setBatch_reading_score(int batch_reading_score) {
		this.batch_reading_score = batch_reading_score;
	}
	public String getBatch_user_level() {
		return batch_user_level;
	}
	public void setBatch_user_level(String batch_user_level) {
		this.batch_user_level = batch_user_level;
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
	public int getScholastic_grade() {
		return scholastic_grade;
	}
	public void setScholastic_grade(int scholastic_grade) {
		this.scholastic_grade = scholastic_grade;
	}
	public String getStudent_type() {
		return student_type;
	}
	public void setStudent_type(String student_type) {
		this.student_type = student_type;
	}
	public int getDifficulty() {
		return difficulty;
	}
	public void setDifficulty(int difficulty) {
		this.difficulty = difficulty;
	}
	public int getClass_count() {
		return class_count;
	}
	public void setClass_count(int class_count) {
		this.class_count = class_count;
	}
	public String getUser_first_date() {
		return user_first_date;
	}
	public void setUser_first_date(String user_first_date) {
		this.user_first_date = user_first_date;
	}
	public String getUser_end_date() {
		return user_end_date;
	}
	public void setUser_end_date(String user_end_date) {
		this.user_end_date = user_end_date;
	}
	public String getCourse_start_date() {
		return course_start_date;
	}
	public void setCourse_start_date(String course_start_date) {
		this.course_start_date = course_start_date;
	}
	public String getCourse_end_date() {
		return course_end_date;
	}
	public void setCourse_end_date(String course_end_date) {
		this.course_end_date = course_end_date;
	}
	public String getMove_date() {
		return move_date;
	}
	public void setMove_date(String move_date) {
		this.move_date = move_date;
	}
	public int getAllocation_id() {
		return allocation_id;
	}
	public void setAllocation_id(int allocation_id) {
		this.allocation_id = allocation_id;
	}
	public int getCurrent_course_id() {
		return current_course_id;
	}
	public void setCurrent_course_id(int current_course_id) {
		this.current_course_id = current_course_id;
	}
	public int getFirst_course_id() {
		return first_course_id;
	}
	public void setFirst_course_id(int first_course_id) {
		this.first_course_id = first_course_id;
	}
	public int getLast_month_course_enrollment_id() {
		return last_month_course_enrollment_id;
	}
	public void setLast_month_course_enrollment_id(int last_month_course_enrollment_id) {
		this.last_month_course_enrollment_id = last_month_course_enrollment_id;
	}
	public String getClass_gubun() {
		return class_gubun;
	}
	public void setClass_gubun(String class_gubun) {
		this.class_gubun = class_gubun;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getCur_date() {
		return cur_date;
	}
	public void setCur_date(String cur_date) {
		this.cur_date = cur_date;
	}
	public int getCourse_difficulty() {
		return course_difficulty;
	}
	public void setCourse_difficulty(int course_difficulty) {
		this.course_difficulty = course_difficulty;
	}
	public int getCourse_inner_difficulty() {
		return course_inner_difficulty;
	}
	public void setCourse_inner_difficulty(int course_inner_difficulty) {
		this.course_inner_difficulty = course_inner_difficulty;
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
	public String getNeed_date() {
		return need_date;
	}
	public void setNeed_date(String need_date) {
		this.need_date = need_date;
	}
	public int getBatch_max_grammar_score1() {
		return batch_max_grammar_score1;
	}
	public void setBatch_max_grammar_score1(int batch_max_grammar_score1) {
		this.batch_max_grammar_score1 = batch_max_grammar_score1;
	}
	public int getBatch_max_grammar_score2() {
		return batch_max_grammar_score2;
	}
	public void setBatch_max_grammar_score2(int batch_max_grammar_score2) {
		this.batch_max_grammar_score2 = batch_max_grammar_score2;
	}
	public int getBatch_max_reading_score() {
		return batch_max_reading_score;
	}
	public void setBatch_max_reading_score(int batch_max_reading_score) {
		this.batch_max_reading_score = batch_max_reading_score;
	}
	public String getBatch_adviser_advice() {
		return batch_adviser_advice;
	}
	public void setBatch_adviser_advice(String batch_adviser_advice) {
		this.batch_adviser_advice = batch_adviser_advice;
	}
	public float getStudent_goal_score() {
		return student_goal_score;
	}
	public void setStudent_goal_score(float student_goal_score) {
		this.student_goal_score = student_goal_score;
	}
	public float getStudent_goal_month() {
		return student_goal_month;
	}
	public void setStudent_goal_month(float student_goal_month) {
		this.student_goal_month = student_goal_month;
	}
	public float getCourse_goal_score() {
		return course_goal_score;
	}
	public void setCourse_goal_score(float course_goal_score) {
		this.course_goal_score = course_goal_score;
	}
	public float getCourse_goal_month() {
		return course_goal_month;
	}
	public void setCourse_goal_month(float course_goal_month) {
		this.course_goal_month = course_goal_month;
	}
	public String getProgram_not_use() {
		return program_not_use;
	}
	public void setProgram_not_use(String program_not_use) {
		this.program_not_use = program_not_use;
	}
	public String getRefund_date() {
		return refund_date;
	}
	public void setRefund_date(String refund_date) {
		this.refund_date = refund_date;
	}
	public String getPractice_exception_yn() {
		return practice_exception_yn;
	}
	public void setPractice_exception_yn(String practice_exception_yn) {
		this.practice_exception_yn = practice_exception_yn;
	}
	public String getPractice_exception_reason() {
		return practice_exception_reason;
	}
	public void setPractice_exception_reason(String practice_exception_reason) {
		this.practice_exception_reason = practice_exception_reason;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getSemester_in_data() {
		return semester_in_data;
	}
	public void setSemester_in_data(String semester_in_data) {
		this.semester_in_data = semester_in_data;
	}
	public String getStart_date() {
		return start_date;
	}
	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}
	public String getEnd_date() {
		return end_date;
	}
	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}
	public String getMemoirs_yn() {
		return memoirs_yn;
	}
	public void setMemoirs_yn(String memoirs_yn) {
		this.memoirs_yn = memoirs_yn;
	}
	
}
