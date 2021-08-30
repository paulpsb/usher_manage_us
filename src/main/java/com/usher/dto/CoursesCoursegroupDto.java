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
public class CoursesCoursegroupDto{
	private int id;
	private String name;
	private String test_type;
	private String student_type;
	private String lecture_type;
	private String days;
	private String time;
	private boolean open;
	private String start_date;
	private String end_date;
	private String schedule;
	private String life_cycle;
	private int semester_id;
	private String repetition_date;
	private String current_time;
	private String current_date;
	private String next_semester_date;
	
	private int course_id;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	public boolean isOpen() {
		return open;
	}
	public void setOpen(boolean open) {
		this.open = open;
	}
	public String getStart_date() {
		return start_date;
	}
	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}
	public String getEnd_date() {
		return end_date;
	}
	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}
	public String getSchedule() {
		return schedule;
	}
	public void setSchedule(String schedule) {
		this.schedule = schedule;
	}
	public String getLife_cycle() {
		return life_cycle;
	}
	public void setLife_cycle(String life_cycle) {
		this.life_cycle = life_cycle;
	}
	public int getSemester_id() {
		return semester_id;
	}
	public void setSemester_id(int semester_id) {
		this.semester_id = semester_id;
	}
	public String getCurrent_time() {
		return current_time;
	}
	public void setCurrent_time(String current_time) {
		this.current_time = current_time;
	}
	public String getCurrent_date() {
		return current_date;
	}
	public void setCurrent_date(String current_date) {
		this.current_date = current_date;
	}
	public String getNext_semester_date() {
		return next_semester_date;
	}
	public void setNext_semester_date(String next_semester_date) {
		this.next_semester_date = next_semester_date;
	}
	public String getRepetition_date() {
		return repetition_date;
	}
	public void setRepetition_date(String repetition_date) {
		this.repetition_date = repetition_date;
	}
	public int getCourse_id() {
		return course_id;
	}
	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}
	
	
}