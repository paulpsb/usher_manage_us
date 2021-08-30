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
public class NoticesScheduleDto{
	private int id;
	private String schedule_category;
	private String schedule_date;
	private String schedule_time;
	private String schedule_title;
	private int schedule_user_id;
	private int schedule_target_id;
	private int schedule_reference_id;
	private int schedule_work_count;
	private int schedule_success_count;
	private int schedule_ignore_count;
	private int schedule_problem_count;
	private int routine_id;
	private int course_group_id;
	private int course_id;
	private String course_name;
	private String course_group_name;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSchedule_category() {
		return schedule_category;
	}
	public void setSchedule_category(String schedule_category) {
		this.schedule_category = schedule_category;
	}
	public String getSchedule_date() {
		return schedule_date;
	}
	public void setSchedule_date(String schedule_date) {
		this.schedule_date = schedule_date;
	}
	public String getSchedule_time() {
		return schedule_time;
	}
	public void setSchedule_time(String schedule_time) {
		this.schedule_time = schedule_time;
	}
	public String getSchedule_title() {
		return schedule_title;
	}
	public void setSchedule_title(String schedule_title) {
		this.schedule_title = schedule_title;
	}
	public int getSchedule_user_id() {
		return schedule_user_id;
	}
	public void setSchedule_user_id(int schedule_user_id) {
		this.schedule_user_id = schedule_user_id;
	}
	public int getSchedule_target_id() {
		return schedule_target_id;
	}
	public void setSchedule_target_id(int schedule_target_id) {
		this.schedule_target_id = schedule_target_id;
	}
	public int getSchedule_reference_id() {
		return schedule_reference_id;
	}
	public void setSchedule_reference_id(int schedule_reference_id) {
		this.schedule_reference_id = schedule_reference_id;
	}
	public int getSchedule_work_count() {
		return schedule_work_count;
	}
	public void setSchedule_work_count(int schedule_work_count) {
		this.schedule_work_count = schedule_work_count;
	}
	public int getSchedule_success_count() {
		return schedule_success_count;
	}
	public void setSchedule_success_count(int schedule_success_count) {
		this.schedule_success_count = schedule_success_count;
	}
	public int getRoutine_id() {
		return routine_id;
	}
	public void setRoutine_id(int routine_id) {
		this.routine_id = routine_id;
	}
	public int getCourse_group_id() {
		return course_group_id;
	}
	public void setCourse_group_id(int course_group_id) {
		this.course_group_id = course_group_id;
	}
	public int getCourse_id() {
		return course_id;
	}
	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}
	public String getCourse_name() {
		return course_name;
	}
	public void setCourse_name(String course_name) {
		this.course_name = course_name;
	}
	public String getCourse_group_name() {
		return course_group_name;
	}
	public void setCourse_group_name(String course_group_name) {
		this.course_group_name = course_group_name;
	}
	public int getSchedule_ignore_count() {
		return schedule_ignore_count;
	}
	public void setSchedule_ignore_count(int schedule_ignore_count) {
		this.schedule_ignore_count = schedule_ignore_count;
	}
	public int getSchedule_problem_count() {
		return schedule_problem_count;
	}
	public void setSchedule_problem_count(int schedule_problem_count) {
		this.schedule_problem_count = schedule_problem_count;
	}
	
	
}