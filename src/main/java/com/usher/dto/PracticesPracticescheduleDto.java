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
public class PracticesPracticescheduleDto{
	private int id;
	private String status;
	private String section;
	private String practice_type;
	private String score_type;
	private String name;
	private int total_score;
	private String life_cycle;
	private String date;
	private int course_id;
	private int practice_problem_id;
	private int exam_time;
	private int exam_count;
	private int start_paragraph;
	private int end_paragraph;
	
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
	
	private int course_enrollment_id;
	private int course_group_id;
	private int interval_time;
	
	private String practice_schedule_current_time;
	private String practice_schedule_start_time;
	private String practice_schedule_end_time;
	private String practice_schedule_start_yn;
	
	private int remain_time;
	
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
	public String getScore_type() {
		return score_type;
	}
	public void setScore_type(String score_type) {
		this.score_type = score_type;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getTotal_score() {
		return total_score;
	}
	public void setTotal_score(int total_score) {
		this.total_score = total_score;
	}
	public String getLife_cycle() {
		return life_cycle;
	}
	public void setLife_cycle(String life_cycle) {
		this.life_cycle = life_cycle;
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
	public void setArtcle(String article) {
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
	public int getExam_time() {
		return exam_time;
	}
	public void setExam_time(int exam_time) {
		this.exam_time = exam_time;
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
	public void setArticle(String article) {
		this.article = article;
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
	public int getExam_count() {
		return exam_count;
	}
	public void setExam_count(int exam_count) {
		this.exam_count = exam_count;
	}
	public String getPractice_schedule_start_time() {
		return practice_schedule_start_time;
	}
	public void setPractice_schedule_start_time(String practice_schedule_start_time) {
		this.practice_schedule_start_time = practice_schedule_start_time;
	}
	public String getPractice_schedule_end_time() {
		return practice_schedule_end_time;
	}
	public void setPractice_schedule_end_time(String practice_schedule_end_time) {
		this.practice_schedule_end_time = practice_schedule_end_time;
	}
	public String getPractice_schedule_start_yn() {
		return practice_schedule_start_yn;
	}
	public void setPractice_schedule_start_yn(String practice_schedule_start_yn) {
		this.practice_schedule_start_yn = practice_schedule_start_yn;
	}
	public String getPractice_schedule_current_time() {
		return practice_schedule_current_time;
	}
	public void setPractice_schedule_current_time(String practice_schedule_current_time) {
		this.practice_schedule_current_time = practice_schedule_current_time;
	}
	public int getInterval_time() {
		return interval_time;
	}
	public void setInterval_time(int interval_time) {
		this.interval_time = interval_time;
	}
	public int getRemain_time() {
		return remain_time;
	}
	public void setRemain_time(int remain_time) {
		this.remain_time = remain_time;
	}
	public int getCourse_group_id() {
		return course_group_id;
	}
	public void setCourse_group_id(int course_group_id) {
		this.course_group_id = course_group_id;
	}
	
	
}