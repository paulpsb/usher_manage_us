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
public class EnrollmentsRepetitionenrollmentLogDto{
	private int id;
	private int course_enrollment_id;
	private String log_type;
	private String log_value;
	private int log_create_id;
	private String log_create_name;
	private String log_create_date;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCourse_enrollment_id() {
		return course_enrollment_id;
	}
	public void setCourse_enrollment_id(int course_enrollment_id) {
		this.course_enrollment_id = course_enrollment_id;
	}
	public String getLog_type() {
		return log_type;
	}
	public void setLog_type(String log_type) {
		this.log_type = log_type;
	}
	public String getLog_value() {
		return log_value;
	}
	public void setLog_value(String log_value) {
		this.log_value = log_value;
	}
	public int getLog_create_id() {
		return log_create_id;
	}
	public void setLog_create_id(int log_create_id) {
		this.log_create_id = log_create_id;
	}
	public String getLog_create_name() {
		return log_create_name;
	}
	public void setLog_create_name(String log_create_name) {
		this.log_create_name = log_create_name;
	}
	public String getLog_create_date() {
		return log_create_date;
	}
	public void setLog_create_date(String log_create_date) {
		this.log_create_date = log_create_date;
	}
	
	
}