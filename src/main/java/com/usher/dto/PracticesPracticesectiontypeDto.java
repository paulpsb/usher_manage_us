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
public class PracticesPracticesectiontypeDto{
	private int id;
	private String status;
	private String section;
	private String short_title_kr;
	private String practice_type;
	private String practice_name;
	private String program_use;
	private int type_order;
	
	private String study_url;
	private String exam_url;
	private String homework_url;
	
	private String study_result_url;
	private String exam_result_url;
	private String homework_result_url;

	private String is_study;
	private String is_exam;
	private String is_homework;
	private String is_homework_achieve;
	
	private String data_value;
	
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
	public int getType_order() {
		return type_order;
	}
	public void setType_order(int type_order) {
		this.type_order = type_order;
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
	public String getShort_title_kr() {
		return short_title_kr;
	}
	public void setShort_title_kr(String short_title_kr) {
		this.short_title_kr = short_title_kr;
	}
	public String getProgram_use() {
		return program_use;
	}
	public void setProgram_use(String program_use) {
		this.program_use = program_use;
	}
	public String getStudy_url() {
		return study_url;
	}
	public void setStudy_url(String study_url) {
		this.study_url = study_url;
	}
	public String getExam_url() {
		return exam_url;
	}
	public void setExam_url(String exam_url) {
		this.exam_url = exam_url;
	}
	public String getHomework_url() {
		return homework_url;
	}
	public void setHomework_url(String homework_url) {
		this.homework_url = homework_url;
	}
	public String getStudy_result_url() {
		return study_result_url;
	}
	public void setStudy_result_url(String study_result_url) {
		this.study_result_url = study_result_url;
	}
	public String getExam_result_url() {
		return exam_result_url;
	}
	public void setExam_result_url(String exam_result_url) {
		this.exam_result_url = exam_result_url;
	}
	public String getHomework_result_url() {
		return homework_result_url;
	}
	public void setHomework_result_url(String homework_result_url) {
		this.homework_result_url = homework_result_url;
	}
	public String getIs_study() {
		return is_study;
	}
	public void setIs_study(String is_study) {
		this.is_study = is_study;
	}
	public String getIs_exam() {
		return is_exam;
	}
	public void setIs_exam(String is_exam) {
		this.is_exam = is_exam;
	}
	public String getIs_homework() {
		return is_homework;
	}
	public void setIs_homework(String is_homework) {
		this.is_homework = is_homework;
	}
	public String getIs_homework_achieve() {
		return is_homework_achieve;
	}
	public void setIs_homework_achieve(String is_homework_achieve) {
		this.is_homework_achieve = is_homework_achieve;
	}
	
	
}