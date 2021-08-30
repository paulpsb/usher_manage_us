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
public class ExamsToeflDto{
	private int id;
	private int user_id;
	private String date;
	private String exams_toefl_type;
	private int listening;
	private int reading;
	private int writing;
	private int speaking;
	private int total_score;
	
	private int course_id;
	
	private String toefl_excel_user_id;
	private String toefl_excel_user_name;
	private String toefl_excel_matching;
	private String toefl_excel_upload;
	
	private String data_value;
	
	private int total_count = 0;
	private int page = 0;
	private int row_num = 0;
	private int first_num = 0;
	
	private int toefl_not_matching_count;
	
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
	public String getExams_toefl_type() {
		return exams_toefl_type;
	}
	public void setExams_toefl_type(String exams_toefl_type) {
		this.exams_toefl_type = exams_toefl_type;
	}
	public int getListening() {
		return listening;
	}
	public void setListening(int listening) {
		this.listening = listening;
	}
	public int getReading() {
		return reading;
	}
	public void setReading(int reading) {
		this.reading = reading;
	}
	public int getWriting() {
		return writing;
	}
	public void setWriting(int writing) {
		this.writing = writing;
	}
	public int getSpeaking() {
		return speaking;
	}
	public void setSpeaking(int speaking) {
		this.speaking = speaking;
	}
	public int getTotal_score() {
		return total_score;
	}
	public void setTotal_score(int total_score) {
		this.total_score = total_score;
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
	public String getData_value() {
		return data_value;
	}
	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	public String getToefl_excel_user_id() {
		return toefl_excel_user_id;
	}
	public void setToefl_excel_user_id(String toefl_excel_user_id) {
		this.toefl_excel_user_id = toefl_excel_user_id;
	}
	public String getToefl_excel_user_name() {
		return toefl_excel_user_name;
	}
	public void setToefl_excel_user_name(String toefl_excel_user_name) {
		this.toefl_excel_user_name = toefl_excel_user_name;
	}
	public String getToefl_excel_matching() {
		return toefl_excel_matching;
	}
	public void setToefl_excel_matching(String toefl_excel_matching) {
		this.toefl_excel_matching = toefl_excel_matching;
	}
	public String getToefl_excel_upload() {
		return toefl_excel_upload;
	}
	public void setToefl_excel_upload(String toefl_excel_upload) {
		this.toefl_excel_upload = toefl_excel_upload;
	}
	public int getTotal_count() {
		return total_count;
	}
	public void setTotal_count(int total_count) {
		this.total_count = total_count;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getRow_num() {
		return row_num;
	}
	public void setRow_num(int row_num) {
		this.row_num = row_num;
	}
	public int getFirst_num() {
		return first_num;
	}
	public void setFirst_num(int first_num) {
		this.first_num = first_num;
	}
	public int getToefl_not_matching_count() {
		return toefl_not_matching_count;
	}
	public void setToefl_not_matching_count(int toefl_not_matching_count) {
		this.toefl_not_matching_count = toefl_not_matching_count;
	}
	
	
	
}