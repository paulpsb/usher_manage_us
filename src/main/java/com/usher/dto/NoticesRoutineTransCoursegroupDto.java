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
public class NoticesRoutineTransCoursegroupDto{
	private int id;
	private String test_type;
	private String student_type;
	private String lecture_type;
	private String routine_category;
	private int routine_schedule;
	private int routine_day;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public String getRoutine_category() {
		return routine_category;
	}
	public void setRoutine_category(String routine_category) {
		this.routine_category = routine_category;
	}
	public int getRoutine_schedule() {
		return routine_schedule;
	}
	public void setRoutine_schedule(int routine_schedule) {
		this.routine_schedule = routine_schedule;
	}
	public int getRoutine_day() {
		return routine_day;
	}
	public void setRoutine_day(int routine_day) {
		this.routine_day = routine_day;
	}
	
	
}