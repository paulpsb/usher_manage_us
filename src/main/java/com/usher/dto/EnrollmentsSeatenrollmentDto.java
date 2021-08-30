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
public class EnrollmentsSeatenrollmentDto{
	private int semester_id;
	private int course_id;
	private int course_enrollment_id;
	private int semester_enrollment_id;
	private int user_id;
	private int student_id;
	private int seat_row;
	private int seat_col;
	private String status;
	private String schedule;
	private String refund_status;
	private String refund_reason;
	private String registration_type;
	private String username;
	private String first_name;
	private String last_name;
	private String email;
	private boolean is_staff;
	private boolean is_active;
	
	private String chamgang_yn;
	
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
	public int getSeat_row() {
		return seat_row;
	}
	public void setSeat_row(int seat_row) {
		this.seat_row = seat_row;
	}
	public int getSeat_col() {
		return seat_col;
	}
	public void setSeat_col(int seat_col) {
		this.seat_col = seat_col;
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
	
	
}