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
public class NoticesRoutineTransOraganizationDetailDto{
	private int id;
	private int routine_day;
	private String routine_date;
	private String routine_start_time;
	private int routine_trans_oraganization_id;
	private int routine_id;
	private String routine_title;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getRoutine_day() {
		return routine_day;
	}
	public void setRoutine_day(int routine_day) {
		this.routine_day = routine_day;
	}
	public String getRoutine_date() {
		return routine_date;
	}
	public void setRoutine_date(String routine_date) {
		this.routine_date = routine_date;
	}
	public String getRoutine_start_time() {
		return routine_start_time;
	}
	public void setRoutine_start_time(String routine_start_time) {
		this.routine_start_time = routine_start_time;
	}
	public int getRoutine_trans_oraganization_id() {
		return routine_trans_oraganization_id;
	}
	public void setRoutine_trans_oraganization_id(int routine_trans_oraganization_id) {
		this.routine_trans_oraganization_id = routine_trans_oraganization_id;
	}
	public int getRoutine_id() {
		return routine_id;
	}
	public void setRoutine_id(int routine_id) {
		this.routine_id = routine_id;
	}
	public String getRoutine_title() {
		return routine_title;
	}
	public void setRoutine_title(String routine_title) {
		this.routine_title = routine_title;
	}
	
	
}