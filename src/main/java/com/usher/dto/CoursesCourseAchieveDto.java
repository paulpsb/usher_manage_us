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
public class CoursesCourseAchieveDto{
	private int id;
	private String status;
	private String section;
	private String practice_type;
	private int course_id;
	private int achieve_point;
	private int scholarship;
	private int late_amt;
	private int absent_amt;
	
	private String data_value;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
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
	public int getCourse_id() {
		return course_id;
	}
	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}
	public int getAchieve_point() {
		return achieve_point;
	}
	public void setAchieve_point(int achieve_point) {
		this.achieve_point = achieve_point;
	}
	public String getData_value() {
		return data_value;
	}
	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	public int getScholarship() {
		return scholarship;
	}
	public void setScholarship(int scholarship) {
		this.scholarship = scholarship;
	}
	public int getLate_amt() {
		return late_amt;
	}
	public void setLate_amt(int late_amt) {
		this.late_amt = late_amt;
	}
	public int getAbsent_amt() {
		return absent_amt;
	}
	public void setAbsent_amt(int absent_amt) {
		this.absent_amt = absent_amt;
	}
	
	
}