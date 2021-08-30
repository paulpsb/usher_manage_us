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
public class NoticesRoutineTransOraganizationDto{
	private int id;
	private int routine_organization_id;
	private String routine_organization_name;
	private String routine_category;
	private int routine_schedule;
	private int routine_day;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getRoutine_organization_id() {
		return routine_organization_id;
	}
	public void setRoutine_organization_id(int routine_organization_id) {
		this.routine_organization_id = routine_organization_id;
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
	public String getRoutine_organization_name() {
		return routine_organization_name;
	}
	public void setRoutine_organization_name(String routine_organization_name) {
		this.routine_organization_name = routine_organization_name;
	}

	
}