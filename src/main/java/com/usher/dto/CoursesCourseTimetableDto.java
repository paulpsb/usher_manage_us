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
public class CoursesCourseTimetableDto{
	private int id;
	private String date;
	private String section;
	private String section_name;
	private String study_type;
	private String study_type_name;
	private String class_hour;
	private int user_id;
	private String user_name;
	private String user_color;
	
	private int course_id;
	private String course_name;
	private int course_group_id;
	private String course_group_name;
	private String short_title_kr;
	
	private String data_value;
	
	private String practice_type;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getSection() {
		return section;
	}

	public void setSection(String section) {
		this.section = section;
	}

	public String getSection_name() {
		return section_name;
	}

	public void setSection_name(String section_name) {
		this.section_name = section_name;
	}

	public String getStudy_type() {
		return study_type;
	}

	public void setStudy_type(String study_type) {
		this.study_type = study_type;
	}

	public String getStudy_type_name() {
		return study_type_name;
	}

	public void setStudy_type_name(String study_type_name) {
		this.study_type_name = study_type_name;
	}

	public String getClass_hour() {
		return class_hour;
	}

	public void setClass_hour(String class_hour) {
		this.class_hour = class_hour;
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

	public int getCourse_id() {
		return course_id;
	}

	public void setCourse_id(int course_id) {
		this.course_id = course_id;
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

	public String getCourse_group_name() {
		return course_group_name;
	}

	public void setCourse_group_name(String course_group_name) {
		this.course_group_name = course_group_name;
	}

	public String getShort_title_kr() {
		return short_title_kr;
	}

	public void setShort_title_kr(String short_title_kr) {
		this.short_title_kr = short_title_kr;
	}

	public String getData_value() {
		return data_value;
	}

	public void setData_value(String data_value) {
		this.data_value = data_value;
	}

	public String getPractice_type() {
		return practice_type;
	}

	public void setPractice_type(String practice_type) {
		this.practice_type = practice_type;
	}

	public String getUser_color() {
		return user_color;
	}

	public void setUser_color(String user_color) {
		this.user_color = user_color;
	}

	
}