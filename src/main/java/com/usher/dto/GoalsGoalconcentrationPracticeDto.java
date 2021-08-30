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
public class GoalsGoalconcentrationPracticeDto{
	private int id;
	private String section;
	private String section_name;
	private String practice_type;
	private String practice_name;

	private int course_enrollment_id;
	private int course_id;

	private int pass_user_score;
	private int pass_course_score;

	private String date;

	private boolean accept_result;

	private String comments;
	private int writer_id;
	private String writer_nm;
	private String writer_comments;

	private String data_value;

	private String start_time;
	private String end_time;
	
	private String program_use;
	private String book;
	
	private String delay_yn;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getPractice_type() {
		return practice_type;
	}

	public void setPractice_type(String practice_type) {
		this.practice_type = practice_type;
	}

	public String getPractice_name() {
		return practice_name;
	}

	public void setPractice_name(String practice_name) {
		this.practice_name = practice_name;
	}

	public int getCourse_enrollment_id() {
		return course_enrollment_id;
	}

	public void setCourse_enrollment_id(int course_enrollment_id) {
		this.course_enrollment_id = course_enrollment_id;
	}

	public int getCourse_id() {
		return course_id;
	}

	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}

	public int getPass_user_score() {
		return pass_user_score;
	}

	public void setPass_user_score(int pass_user_score) {
		this.pass_user_score = pass_user_score;
	}

	public int getPass_course_score() {
		return pass_course_score;
	}

	public void setPass_course_score(int pass_course_score) {
		this.pass_course_score = pass_course_score;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public boolean isAccept_result() {
		return accept_result;
	}

	public void setAccept_result(boolean accept_result) {
		this.accept_result = accept_result;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public int getWriter_id() {
		return writer_id;
	}

	public void setWriter_id(int writer_id) {
		this.writer_id = writer_id;
	}

	public String getWriter_nm() {
		return writer_nm;
	}

	public void setWriter_nm(String writer_nm) {
		this.writer_nm = writer_nm;
	}

	public String getWriter_comments() {
		return writer_comments;
	}

	public void setWriter_comments(String writer_comments) {
		this.writer_comments = writer_comments;
	}

	public String getData_value() {
		return data_value;
	}

	public void setData_value(String data_value) {
		this.data_value = data_value;
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

	public String getProgram_use() {
		return program_use;
	}

	public void setProgram_use(String program_use) {
		this.program_use = program_use;
	}

	public String getBook() {
		return book;
	}

	public void setBook(String book) {
		this.book = book;
	}

	public String getDelay_yn() {
		return delay_yn;
	}

	public void setDelay_yn(String delay_yn) {
		this.delay_yn = delay_yn;
	}
	
	
}