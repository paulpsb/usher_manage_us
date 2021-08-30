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
public class NoticesNewStudentDto{
	private int id;
	private int course_group_id;
	private int course_id;
	private String course_group_name;
	private String course_name;
	private String new_date;
	private String new_time;
	private int target_id;
	private int reference_id;
	private int student_count;
	private int student_training_count;
	
	private int user_id;
	
	private String data_value;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getNew_date() {
		return new_date;
	}

	public void setNew_date(String new_date) {
		this.new_date = new_date;
	}

	public String getNew_time() {
		return new_time;
	}

	public void setNew_time(String new_time) {
		this.new_time = new_time;
	}

	public int getTarget_id() {
		return target_id;
	}

	public void setTarget_id(int target_id) {
		this.target_id = target_id;
	}

	public int getReference_id() {
		return reference_id;
	}

	public void setReference_id(int reference_id) {
		this.reference_id = reference_id;
	}

	public int getStudent_count() {
		return student_count;
	}

	public void setStudent_count(int student_count) {
		this.student_count = student_count;
	}

	public int getStudent_training_count() {
		return student_training_count;
	}

	public void setStudent_training_count(int student_training_count) {
		this.student_training_count = student_training_count;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getData_value() {
		return data_value;
	}

	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	
	
	
}