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
public class BaseCoursesCourseDto{
	private int id;
	private String test_type;
	private String student_type;
	private String lecture_type;
	private String course_group_name;
	private String days;
	private String time;
	private String life_cycle;
	private String created;
	private String modified;
	private String name;
	private int difficulty;
	private int inner_difficulty;
	private int lecture_code;
	private int base_course_group_id;
	
	private String data_value;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
	}
	public String getModified() {
		return modified;
	}
	public void setModified(String modified) {
		this.modified = modified;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getDifficulty() {
		return difficulty;
	}
	public void setDifficulty(int difficulty) {
		this.difficulty = difficulty;
	}
	public int getInner_difficulty() {
		return inner_difficulty;
	}
	public void setInner_difficulty(int inner_difficulty) {
		this.inner_difficulty = inner_difficulty;
	}
	public int getLecture_code() {
		return lecture_code;
	}
	public void setLecture_code(int lecture_code) {
		this.lecture_code = lecture_code;
	}
	public int getBase_course_group_id() {
		return base_course_group_id;
	}
	public void setBase_course_group_id(int base_course_group_id) {
		this.base_course_group_id = base_course_group_id;
	}
	public String getData_value() {
		return data_value;
	}
	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
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
	public String getLecture_type() {
		return lecture_type;
	}
	public void setLecture_type(String lecture_type) {
		this.lecture_type = lecture_type;
	}
	public String getCourse_group_name() {
		return course_group_name;
	}
	public void setCourse_group_name(String course_group_name) {
		this.course_group_name = course_group_name;
	}
	public String getDays() {
		return days;
	}
	public void setDays(String days) {
		this.days = days;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getLife_cycle() {
		return life_cycle;
	}
	public void setLife_cycle(String life_cycle) {
		this.life_cycle = life_cycle;
	}
	
	
}