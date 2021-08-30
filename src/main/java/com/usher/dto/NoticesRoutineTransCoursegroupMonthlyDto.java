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
public class NoticesRoutineTransCoursegroupMonthlyDto{
	private int id;
	private String test_type;
	private String student_type;
	private String lecture_type;
	private int routine_schedule;
	private int routine_course_group_schedule;
	private int routine_day;
	private int routine_start_day;
	private int routine_end_day;
	
	private String data_value;
	
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
	public int getRoutine_start_day() {
		return routine_start_day;
	}
	public void setRoutine_start_day(int routine_start_day) {
		this.routine_start_day = routine_start_day;
	}
	public int getRoutine_end_day() {
		return routine_end_day;
	}
	public void setRoutine_end_day(int routine_end_day) {
		this.routine_end_day = routine_end_day;
	}
	public String getData_value() {
		return data_value;
	}
	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	public int getRoutine_course_group_schedule() {
		return routine_course_group_schedule;
	}
	public void setRoutine_course_group_schedule(int routine_course_group_schedule) {
		this.routine_course_group_schedule = routine_course_group_schedule;
	}
	
	
}