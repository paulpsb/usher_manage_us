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
public class StudentsStudentDto{
	private int user_id;
	private int student_id;
	private String student_name;
	private String username;
	private String mobile_no;
	private String mobile_parent_no;
	private String batch_yn;
	private String school_gubun;
	private String school_foreign_gubun;
	private String school_area1;
	private String school_area2;
	private String school_name;
	private String memoirs_yn;
	private int memoirs_id;

	private int semester_enrollment_id;
	private int course_enrollment_id;
	private int semester_id;
	private int course_group_id;
	private int course_id;	
	private String semester_month;
	private String course_group_name;
	private String course_name;
	
	private String semester_date;
	private String prev_semester_date;
	
	private String chamgang_yn;
	private String status;
	
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
	public String getStudent_name() {
		return student_name;
	}
	public void setStudent_name(String student_name) {
		this.student_name = student_name;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
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
	public String getMemoirs_yn() {
		return memoirs_yn;
	}
	public void setMemoirs_yn(String memoirs_yn) {
		this.memoirs_yn = memoirs_yn;
	}
	public int getMemoirs_id() {
		return memoirs_id;
	}
	public void setMemoirs_id(int memoirs_id) {
		this.memoirs_id = memoirs_id;
	}
	public int getSemester_enrollment_id() {
		return semester_enrollment_id;
	}
	public void setSemester_enrollment_id(int semester_enrollment_id) {
		this.semester_enrollment_id = semester_enrollment_id;
	}
	public int getCourse_enrollment_id() {
		return course_enrollment_id;
	}
	public void setCourse_enrollment_id(int course_enrollment_id) {
		this.course_enrollment_id = course_enrollment_id;
	}
	public int getSemester_id() {
		return semester_id;
	}
	public void setSemester_id(int semester_id) {
		this.semester_id = semester_id;
	}
	public int getCourse_group_id() {
		return course_group_id;
	}
	public void setCourse_group_id(int course_group_id) {
		this.course_group_id = course_group_id;
	}
	public int getCourse_id() {
		return course_id;
	}
	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}
	public String getSemester_month() {
		return semester_month;
	}
	public void setSemester_month(String semester_month) {
		this.semester_month = semester_month;
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
	public String getSemester_date() {
		return semester_date;
	}
	public void setSemester_date(String semester_date) {
		this.semester_date = semester_date;
	}
	public String getPrev_semester_date() {
		return prev_semester_date;
	}
	public void setPrev_semester_date(String prev_semester_date) {
		this.prev_semester_date = prev_semester_date;
	}
	public String getChamgang_yn() {
		return chamgang_yn;
	}
	public void setChamgang_yn(String chamgang_yn) {
		this.chamgang_yn = chamgang_yn;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
}