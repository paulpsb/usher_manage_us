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
public class StatsSchoolDto{
	private String test_type;
	private String student_type;
	private String course_group;
	private String course_days;
	private String area1;
	private String area2;
	private String foreign_gubun;
	private String school_gubun;
	private String school_name;
	private String start_ym;
	private String end_ym;
	
	private int stat_count1;
	private int stat_count2;
	private int stat_count3;
	private int stat_count4;
	private int stat_count5;
	
	private int stat_rate1;
	private int stat_rate2;
	private int stat_rate3;
	private int stat_rate4;
	private int stat_rate5;
	
	private int user_id;
	private String username;
	private int course_enrollment_id;
	private String date;

	private String user_name;
	private String foreign_yn;
	private String first_semester_ym;
	private String first_course_name;
	private String last_semester_ym;
	private String last_course_name;
	private String course_month;
	
	private int scholastic_grade;
	private int toeic_total_score;
	private int teps_total_score;
	private int start_toefl_score;
	private int start_toefl_rc_score;
	private int start_toefl_lc_score;
	private int start_toefl_sp_score;
	private int start_toefl_wr_score;
	private int end_toefl_score;
	private int end_toefl_rc_score;
	private int end_toefl_lc_score;
	private int end_toefl_sp_score;
	private int end_toefl_wr_score;
	
	private String exam_year;
	private String exam_month;
	private String exam_day;
	
	
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
	public String getArea1() {
		return area1;
	}
	public void setArea1(String area1) {
		this.area1 = area1;
	}
	public String getArea2() {
		return area2;
	}
	public void setArea2(String area2) {
		this.area2 = area2;
	}
	public String getForeign_gubun() {
		return foreign_gubun;
	}
	public void setForeign_gubun(String foreign_gubun) {
		this.foreign_gubun = foreign_gubun;
	}
	public String getSchool_gubun() {
		return school_gubun;
	}
	public void setSchool_gubun(String school_gubun) {
		this.school_gubun = school_gubun;
	}
	public String getStart_ym() {
		return start_ym;
	}
	public void setStart_ym(String start_ym) {
		this.start_ym = start_ym;
	}
	public String getEnd_ym() {
		return end_ym;
	}
	public void setEnd_ym(String end_ym) {
		this.end_ym = end_ym;
	}
	public int getStat_count1() {
		return stat_count1;
	}
	public void setStat_count1(int stat_count1) {
		this.stat_count1 = stat_count1;
	}
	public int getStat_count2() {
		return stat_count2;
	}
	public void setStat_count2(int stat_count2) {
		this.stat_count2 = stat_count2;
	}
	public int getStat_count3() {
		return stat_count3;
	}
	public void setStat_count3(int stat_count3) {
		this.stat_count3 = stat_count3;
	}
	public int getStat_rate1() {
		return stat_rate1;
	}
	public void setStat_rate1(int stat_rate1) {
		this.stat_rate1 = stat_rate1;
	}
	public int getStat_rate2() {
		return stat_rate2;
	}
	public void setStat_rate2(int stat_rate2) {
		this.stat_rate2 = stat_rate2;
	}
	public int getStat_rate3() {
		return stat_rate3;
	}
	public void setStat_rate3(int stat_rate3) {
		this.stat_rate3 = stat_rate3;
	}
	public String getSchool_name() {
		return school_name;
	}
	public void setSchool_name(String school_name) {
		this.school_name = school_name;
	}
	public int getStat_count4() {
		return stat_count4;
	}
	public void setStat_count4(int stat_count4) {
		this.stat_count4 = stat_count4;
	}
	public int getStat_count5() {
		return stat_count5;
	}
	public void setStat_count5(int stat_count5) {
		this.stat_count5 = stat_count5;
	}
	public int getStat_rate4() {
		return stat_rate4;
	}
	public void setStat_rate4(int stat_rate4) {
		this.stat_rate4 = stat_rate4;
	}
	public int getStat_rate5() {
		return stat_rate5;
	}
	public void setStat_rate5(int stat_rate5) {
		this.stat_rate5 = stat_rate5;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getForeign_yn() {
		return foreign_yn;
	}
	public void setForeign_yn(String foreign_yn) {
		this.foreign_yn = foreign_yn;
	}
	public String getFirst_course_name() {
		return first_course_name;
	}
	public void setFirst_course_name(String first_course_name) {
		this.first_course_name = first_course_name;
	}
	public String getLast_course_name() {
		return last_course_name;
	}
	public void setLast_course_name(String last_course_name) {
		this.last_course_name = last_course_name;
	}
	public String getCourse_month() {
		return course_month;
	}
	public void setCourse_month(String course_month) {
		this.course_month = course_month;
	}
	public int getScholastic_grade() {
		return scholastic_grade;
	}
	public void setScholastic_grade(int scholastic_grade) {
		this.scholastic_grade = scholastic_grade;
	}
	public int getToeic_total_score() {
		return toeic_total_score;
	}
	public void setToeic_total_score(int toeic_total_score) {
		this.toeic_total_score = toeic_total_score;
	}
	public int getTeps_total_score() {
		return teps_total_score;
	}
	public void setTeps_total_score(int teps_total_score) {
		this.teps_total_score = teps_total_score;
	}
	public int getStart_toefl_score() {
		return start_toefl_score;
	}
	public void setStart_toefl_score(int start_toefl_score) {
		this.start_toefl_score = start_toefl_score;
	}
	public int getStart_toefl_rc_score() {
		return start_toefl_rc_score;
	}
	public void setStart_toefl_rc_score(int start_toefl_rc_score) {
		this.start_toefl_rc_score = start_toefl_rc_score;
	}
	public int getStart_toefl_lc_score() {
		return start_toefl_lc_score;
	}
	public void setStart_toefl_lc_score(int start_toefl_lc_score) {
		this.start_toefl_lc_score = start_toefl_lc_score;
	}
	public int getStart_toefl_sp_score() {
		return start_toefl_sp_score;
	}
	public void setStart_toefl_sp_score(int start_toefl_sp_score) {
		this.start_toefl_sp_score = start_toefl_sp_score;
	}
	public int getStart_toefl_wr_score() {
		return start_toefl_wr_score;
	}
	public void setStart_toefl_wr_score(int start_toefl_wr_score) {
		this.start_toefl_wr_score = start_toefl_wr_score;
	}
	public int getEnd_toefl_score() {
		return end_toefl_score;
	}
	public void setEnd_toefl_score(int end_toefl_score) {
		this.end_toefl_score = end_toefl_score;
	}
	public int getEnd_toefl_rc_score() {
		return end_toefl_rc_score;
	}
	public void setEnd_toefl_rc_score(int end_toefl_rc_score) {
		this.end_toefl_rc_score = end_toefl_rc_score;
	}
	public int getEnd_toefl_lc_score() {
		return end_toefl_lc_score;
	}
	public void setEnd_toefl_lc_score(int end_toefl_lc_score) {
		this.end_toefl_lc_score = end_toefl_lc_score;
	}
	public int getEnd_toefl_sp_score() {
		return end_toefl_sp_score;
	}
	public void setEnd_toefl_sp_score(int end_toefl_sp_score) {
		this.end_toefl_sp_score = end_toefl_sp_score;
	}
	public int getEnd_toefl_wr_score() {
		return end_toefl_wr_score;
	}
	public void setEnd_toefl_wr_score(int end_toefl_wr_score) {
		this.end_toefl_wr_score = end_toefl_wr_score;
	}
	public String getExam_year() {
		return exam_year;
	}
	public void setExam_year(String exam_year) {
		this.exam_year = exam_year;
	}
	public String getExam_month() {
		return exam_month;
	}
	public void setExam_month(String exam_month) {
		this.exam_month = exam_month;
	}
	public String getExam_day() {
		return exam_day;
	}
	public void setExam_day(String exam_day) {
		this.exam_day = exam_day;
	}
	public String getCourse_days() {
		return course_days;
	}
	public void setCourse_days(String course_days) {
		this.course_days = course_days;
	}
	public String getFirst_semester_ym() {
		return first_semester_ym;
	}
	public void setFirst_semester_ym(String first_semester_ym) {
		this.first_semester_ym = first_semester_ym;
	}
	public String getLast_semester_ym() {
		return last_semester_ym;
	}
	public void setLast_semester_ym(String last_semester_ym) {
		this.last_semester_ym = last_semester_ym;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getCourse_enrollment_id() {
		return course_enrollment_id;
	}
	public void setCourse_enrollment_id(int course_enrollment_id) {
		this.course_enrollment_id = course_enrollment_id;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
}