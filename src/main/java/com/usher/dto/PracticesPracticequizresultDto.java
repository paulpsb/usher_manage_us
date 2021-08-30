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
public class PracticesPracticequizresultDto{
	private int id;
	private String status;
	private String section;
	private String practice_type;
	private boolean pass_result;
	private String result;
	private String date;
	private int course_enrollment_id;
	private int practice_schedule_id;
	
	private int course_id;
	private int user_id;
	private int student_id;
	private int seat_row;
	private int seat_col;
	private String student_name;
	private String registration_type;
	private String attend_status;
	private String will_time;
	private String come_time;
	private boolean is_exam;
	private String passage;
	private String chamgang_yn;
	
	private String book;
	private String volume;
	private String group;
	private String article;

	private int start_paragraph;
	private int end_paragraph;
	
	private String data_value;
	
	private String is_today;
	
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
	public boolean isPass_result() {
		return pass_result;
	}
	public void setPass_result(boolean pass_result) {
		this.pass_result = pass_result;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
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
	public int getPractice_schedule_id() {
		return practice_schedule_id;
	}
	public void setPractice_schedule_id(int practice_schedule_id) {
		this.practice_schedule_id = practice_schedule_id;
	}
	public int getCourse_id() {
		return course_id;
	}
	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public int getStudent_id() {
		return student_id;
	}
	public void setStudent_id(int student_id) {
		this.student_id = student_id;
	}
	public int getSeat_row() {
		return seat_row;
	}
	public void setSeat_row(int seat_row) {
		this.seat_row = seat_row;
	}
	public int getSeat_col() {
		return seat_col;
	}
	public void setSeat_col(int seat_col) {
		this.seat_col = seat_col;
	}
	public String getStudent_name() {
		return student_name;
	}
	public void setStudent_name(String student_name) {
		this.student_name = student_name;
	}
	public String getRegistration_type() {
		return registration_type;
	}
	public void setRegistration_type(String registration_type) {
		this.registration_type = registration_type;
	}
	public String getAttend_status() {
		return attend_status;
	}
	public void setAttend_status(String attend_status) {
		this.attend_status = attend_status;
	}
	public String getWill_time() {
		return will_time;
	}
	public void setWill_time(String will_time) {
		this.will_time = will_time;
	}
	public String getCome_time() {
		return come_time;
	}
	public void setCome_time(String come_time) {
		this.come_time = come_time;
	}
	public boolean isIs_exam() {
		return is_exam;
	}
	public void setIs_exam(boolean is_exam) {
		this.is_exam = is_exam;
	}
	public String getPassage() {
		return passage;
	}
	public void setPassage(String passage) {
		this.passage = passage;
	}
	public String getChamgang_yn() {
		return chamgang_yn;
	}
	public void setChamgang_yn(String chamgang_yn) {
		this.chamgang_yn = chamgang_yn;
	}
	public String getBook() {
		return book;
	}
	public void setBook(String book) {
		this.book = book;
	}
	public String getVolume() {
		return volume;
	}
	public void setVolume(String volume) {
		this.volume = volume;
	}
	public String getGroup() {
		return group;
	}
	public void setGroup(String group) {
		this.group = group;
	}
	public String getArticle() {
		return article;
	}
	public void setArticle(String article) {
		this.article = article;
	}
	public int getStart_paragraph() {
		return start_paragraph;
	}
	public void setStart_paragraph(int start_paragraph) {
		this.start_paragraph = start_paragraph;
	}
	public int getEnd_paragraph() {
		return end_paragraph;
	}
	public void setEnd_paragraph(int end_paragraph) {
		this.end_paragraph = end_paragraph;
	}
	public String getData_value() {
		return data_value;
	}
	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	public String getIs_today() {
		return is_today;
	}
	public void setIs_today(String is_today) {
		this.is_today = is_today;
	}
	
	
}