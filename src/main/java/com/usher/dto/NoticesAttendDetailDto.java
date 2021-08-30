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
public class NoticesAttendDetailDto{
	private int id;
	private int course_id;
	private int course_enrollment_id;
	private String student_name;
	private String attend_date;
	private String attend_status;
	private String student_reason;
	private String teacher_reason;

	private int notice_attend_id;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getStudent_name() {
		return student_name;
	}

	public void setStudent_name(String student_name) {
		this.student_name = student_name;
	}

	public String getAttend_date() {
		return attend_date;
	}

	public void setAttend_date(String attend_date) {
		this.attend_date = attend_date;
	}

	public String getAttend_status() {
		return attend_status;
	}

	public void setAttend_status(String attend_status) {
		this.attend_status = attend_status;
	}

	public String getStudent_reason() {
		return student_reason;
	}

	public void setStudent_reason(String student_reason) {
		this.student_reason = student_reason;
	}

	public String getTeacher_reason() {
		return teacher_reason;
	}

	public void setTeacher_reason(String teacher_reason) {
		this.teacher_reason = teacher_reason;
	}

	public int getNotice_attend_id() {
		return notice_attend_id;
	}

	public void setNotice_attend_id(int notice_attend_id) {
		this.notice_attend_id = notice_attend_id;
	}
	
	
	
}