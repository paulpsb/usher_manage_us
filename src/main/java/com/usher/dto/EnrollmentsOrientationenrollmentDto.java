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
public class EnrollmentsOrientationenrollmentDto{
	private int id;
	private int course_enrollment_id;
	private String orientation_code;
	private String orientation_name;
	private String orientation_accept;
	private int orientation_sort;
	private String orientation_gubun;
	private String senior_institute;
	private String senior_chamgang;
	private String junior_institute;
	private String junior_chamgang;
	private String orientation_video_time;
	private String orientation_reason;
	
	private int course_id;
	
	private String data_value;

	private String section;
	private String practice_type;
	private String date;
	
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

	public String getOrientation_code() {
		return orientation_code;
	}

	public void setOrientation_code(String orientation_code) {
		this.orientation_code = orientation_code;
	}

	public String getOrientation_name() {
		return orientation_name;
	}

	public void setOrientation_name(String orientation_name) {
		this.orientation_name = orientation_name;
	}

	public String getOrientation_accept() {
		return orientation_accept;
	}

	public void setOrientation_accept(String orientation_accept) {
		this.orientation_accept = orientation_accept;
	}

	public int getOrientation_sort() {
		return orientation_sort;
	}

	public void setOrientation_sort(int orientation_sort) {
		this.orientation_sort = orientation_sort;
	}

	public String getSenior_institute() {
		return senior_institute;
	}

	public void setSenior_institute(String senior_institute) {
		this.senior_institute = senior_institute;
	}

	public String getSenior_chamgang() {
		return senior_chamgang;
	}

	public void setSenior_chamgang(String senior_chamgang) {
		this.senior_chamgang = senior_chamgang;
	}

	public String getJunior_institute() {
		return junior_institute;
	}

	public void setJunior_institute(String junior_institute) {
		this.junior_institute = junior_institute;
	}

	public String getJunior_chamgang() {
		return junior_chamgang;
	}

	public void setJunior_chamgang(String junior_chamgang) {
		this.junior_chamgang = junior_chamgang;
	}

	public String getData_value() {
		return data_value;
	}

	public void setData_value(String data_value) {
		this.data_value = data_value;
	}

	public String getOrientation_gubun() {
		return orientation_gubun;
	}

	public void setOrientation_gubun(String orientation_gubun) {
		this.orientation_gubun = orientation_gubun;
	}

	public String getOrientation_video_time() {
		return orientation_video_time;
	}

	public void setOrientation_video_time(String orientation_video_time) {
		this.orientation_video_time = orientation_video_time;
	}

	public String getOrientation_reason() {
		return orientation_reason;
	}

	public void setOrientation_reason(String orientation_reason) {
		this.orientation_reason = orientation_reason;
	}

	public int getCourse_id() {
		return course_id;
	}

	public void setCourse_id(int course_id) {
		this.course_id = course_id;
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

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}
	
	
}