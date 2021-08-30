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
public class GoalsGoalconcentrationDto{
	private int id;
	private boolean is_voca;
	private boolean is_grammar;
	private boolean is_reading;
	private boolean is_listening;
	private boolean is_speaking;
	private boolean is_writing;
	private String date;
	private int course_enrollment_id;
	private int course_id;
	private int enrollment_level;
	private int course_level;
	
	private String comments;
	private int writer_id;
	private String writer_nm;
	private String writer_comments;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public boolean isIs_voca() {
		return is_voca;
	}
	public void setIs_voca(boolean is_voca) {
		this.is_voca = is_voca;
	}
	public boolean isIs_grammar() {
		return is_grammar;
	}
	public void setIs_grammar(boolean is_grammar) {
		this.is_grammar = is_grammar;
	}
	public boolean isIs_reading() {
		return is_reading;
	}
	public void setIs_reading(boolean is_reading) {
		this.is_reading = is_reading;
	}
	public boolean isIs_listening() {
		return is_listening;
	}
	public void setIs_listening(boolean is_listening) {
		this.is_listening = is_listening;
	}
	public boolean isIs_speaking() {
		return is_speaking;
	}
	public void setIs_speaking(boolean is_speaking) {
		this.is_speaking = is_speaking;
	}
	public boolean isIs_writing() {
		return is_writing;
	}
	public void setIs_writing(boolean is_writing) {
		this.is_writing = is_writing;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public int getCourse_enrollment_id() {
		return course_enrollment_id;
	}
	public void setCourse_enrollment_id(int course_enrollment_id) {
		this.course_enrollment_id = course_enrollment_id;
	}
	public int getEnrollment_level() {
		return enrollment_level;
	}
	public void setEnrollment_level(int enrollment_level) {
		this.enrollment_level = enrollment_level;
	}
	public int getCourse_level() {
		return course_level;
	}
	public void setCourse_level(int course_level) {
		this.course_level = course_level;
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
	public int getCourse_id() {
		return course_id;
	}
	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}
	
	
	
}