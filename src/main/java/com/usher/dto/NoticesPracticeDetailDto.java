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
public class NoticesPracticeDetailDto{
	private int id;
	private int course_enrollment_id;
	private String student_name;
	
	private int first_score;
	private int first_score1;
	private int first_score2;
	private int first_total_score;
	private int first_total_score1;
	private int first_total_score2;
	private String first_fail_type;
	
	private int last_score;
	private int last_score1;
	private int last_score2;
	private int last_total_score;
	private int last_total_score1;
	private int last_total_score2;
	private String last_fail_type;
	
	private String comments;
	private boolean is_comments;

	private int notices_practice_id;

	private String section;
	private String practice_type;
	private String date;
	private int course_id;
	
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

	public String getStudent_name() {
		return student_name;
	}

	public void setStudent_name(String student_name) {
		this.student_name = student_name;
	}

	public int getFirst_score() {
		return first_score;
	}

	public void setFirst_score(int first_score) {
		this.first_score = first_score;
	}

	public int getFirst_score1() {
		return first_score1;
	}

	public void setFirst_score1(int first_score1) {
		this.first_score1 = first_score1;
	}

	public int getFirst_score2() {
		return first_score2;
	}

	public void setFirst_score2(int first_score2) {
		this.first_score2 = first_score2;
	}

	public int getFirst_total_score() {
		return first_total_score;
	}

	public void setFirst_total_score(int first_total_score) {
		this.first_total_score = first_total_score;
	}

	public int getFirst_total_score1() {
		return first_total_score1;
	}

	public void setFirst_total_score1(int first_total_score1) {
		this.first_total_score1 = first_total_score1;
	}

	public int getFirst_total_score2() {
		return first_total_score2;
	}

	public void setFirst_total_score2(int first_total_score2) {
		this.first_total_score2 = first_total_score2;
	}

	public String getFirst_fail_type() {
		return first_fail_type;
	}

	public void setFirst_fail_type(String first_fail_type) {
		this.first_fail_type = first_fail_type;
	}

	public int getLast_score() {
		return last_score;
	}

	public void setLast_score(int last_score) {
		this.last_score = last_score;
	}

	public int getLast_score1() {
		return last_score1;
	}

	public void setLast_score1(int last_score1) {
		this.last_score1 = last_score1;
	}

	public int getLast_score2() {
		return last_score2;
	}

	public void setLast_score2(int last_score2) {
		this.last_score2 = last_score2;
	}

	public int getLast_total_score() {
		return last_total_score;
	}

	public void setLast_total_score(int last_total_score) {
		this.last_total_score = last_total_score;
	}

	public int getLast_total_score1() {
		return last_total_score1;
	}

	public void setLast_total_score1(int last_total_score1) {
		this.last_total_score1 = last_total_score1;
	}

	public int getLast_total_score2() {
		return last_total_score2;
	}

	public void setLast_total_score2(int last_total_score2) {
		this.last_total_score2 = last_total_score2;
	}

	public String getLast_fail_type() {
		return last_fail_type;
	}

	public void setLast_fail_type(String last_fail_type) {
		this.last_fail_type = last_fail_type;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public boolean isIs_comments() {
		return is_comments;
	}

	public void setIs_comments(boolean is_comments) {
		this.is_comments = is_comments;
	}

	public int getNotices_practice_id() {
		return notices_practice_id;
	}

	public void setNotices_practice_id(int notices_practice_id) {
		this.notices_practice_id = notices_practice_id;
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

	public int getCourse_id() {
		return course_id;
	}

	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}
	
	
}