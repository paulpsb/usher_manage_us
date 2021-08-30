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
public class BaseCoursesCoursePracticeDto{
	private int id;
	private int base_course_id;
	private String status;
	private String section;
	private String practice_type;
	
	private String data_value;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getBase_course_id() {
		return base_course_id;
	}
	public void setBase_course_id(int base_course_id) {
		this.base_course_id = base_course_id;
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
	public String getData_value() {
		return data_value;
	}
	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	
	
}