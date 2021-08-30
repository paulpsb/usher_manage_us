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
public class CoursesCoursePracticeDto{
	private int id;
	private String date;
	private String status;
	private String section;
	private String short_title_kr;
	
	private String practice_type;
	private String practice_name;
	private String program_use;
	private String start_time;
	private String end_time;
	private int pass_score;
	
	private String paragraph_use;
	private String type_comment;
	
	private int course_id = 0;
	private int course_group_id;
	
	private int user_id;
	
	private String data_value;

	private String is_homework;
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

	public String getPractice_type() {
		return practice_type;
	}

	public void setPractice_type(String practice_type) {
		this.practice_type = practice_type;
	}



	public String getSection() {
		return section;
	}

	public void setSection(String section) {
		this.section = section;
	}

	public int getCourse_id() {
		return course_id;
	}

	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}

	public String getData_value() {
		return data_value;
	}

	public void setData_value(String data_value) {
		this.data_value = data_value;
	}

	public String getPractice_name() {
		return practice_name;
	}

	public void setPractice_name(String practice_name) {
		this.practice_name = practice_name;
	}

	public String getProgram_use() {
		return program_use;
	}

	public void setProgram_use(String program_use) {
		this.program_use = program_use;
	}

	public int getPass_score() {
		return pass_score;
	}

	public void setPass_score(int pass_score) {
		this.pass_score = pass_score;
	}

	public String getShort_title_kr() {
		return short_title_kr;
	}

	public void setShort_title_kr(String short_title_kr) {
		this.short_title_kr = short_title_kr;
	}

	public String getStart_time() {
		return start_time;
	}

	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}

	public String getEnd_time() {
		return end_time;
	}

	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getParagraph_use() {
		return paragraph_use;
	}

	public void setParagraph_use(String paragraph_use) {
		this.paragraph_use = paragraph_use;
	}

	public String getType_comment() {
		return type_comment;
	}

	public void setType_comment(String type_comment) {
		this.type_comment = type_comment;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public int getCourse_group_id() {
		return course_group_id;
	}

	public void setCourse_group_id(int course_group_id) {
		this.course_group_id = course_group_id;
	}

	public String getIs_homework() {
		return is_homework;
	}

	public void setIs_homework(String is_homework) {
		this.is_homework = is_homework;
	}
	
	
	
}