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
public class PracticesPracticescheduleHomeworkDto{
	private int id;
	private String status;
	private String section;
	private String practice_type;
	private String name;
	private String date;
	private int course_id;
	private int course_enrollment_id;
	private int practice_problem_id;
	private int practice_schedule_id;
	private int start_paragraph;
	private int exam_time;
	private int exam_count;
	private int end_paragraph;
	private String test_type;
	
	private String book;	
	private String volume;
	private String group;
	private String article;

	private String short_title;
	
	private String data_value;
	private String data_value1;
	
	private String practice_name;
	private int type_order;
	private String program_use;
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	public int getPractice_problem_id() {
		return practice_problem_id;
	}
	public void setPractice_problem_id(int practice_problem_id) {
		this.practice_problem_id = practice_problem_id;
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
	public String getShort_title() {
		return short_title;
	}
	public void setShort_title(String short_title) {
		this.short_title = short_title;
	}
	public String getData_value() {
		return data_value;
	}
	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	public String getData_value1() {
		return data_value1;
	}
	public void setData_value1(String data_value1) {
		this.data_value1 = data_value1;
	}
	public String getPractice_name() {
		return practice_name;
	}
	public void setPractice_name(String practice_name) {
		this.practice_name = practice_name;
	}
	public int getType_order() {
		return type_order;
	}
	public void setType_order(int type_order) {
		this.type_order = type_order;
	}
	public String getProgram_use() {
		return program_use;
	}
	public void setProgram_use(String program_use) {
		this.program_use = program_use;
	}
	public int getCourse_enrollment_id() {
		return course_enrollment_id;
	}
	public void setCourse_enrollment_id(int course_enrollment_id) {
		this.course_enrollment_id = course_enrollment_id;
	}
	public int getExam_time() {
		return exam_time;
	}
	public void setExam_time(int exam_time) {
		this.exam_time = exam_time;
	}
	public String getTest_type() {
		return test_type;
	}
	public void setTest_type(String test_type) {
		this.test_type = test_type;
	}
	public int getExam_count() {
		return exam_count;
	}
	public void setExam_count(int exam_count) {
		this.exam_count = exam_count;
	}
	public int getPractice_schedule_id() {
		return practice_schedule_id;
	}
	public void setPractice_schedule_id(int practice_schedule_id) {
		this.practice_schedule_id = practice_schedule_id;
	}
	

	
}