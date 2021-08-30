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
public class NoticesRoutineDetailsDto{
	private int id;
	private String routine_detail_title;
	private String routine_detail_content;
	private String routine_detail_reference_image;
	private String routine_detail_reference_image_name;
	private String routine_detail_reference_url;
	private String routine_detail_reference_file;
	private String routine_detail_reference_file_name;
	private boolean routine_detail_report_image;
	private boolean routine_detail_report_url;
	private boolean routine_detail_report_ox;
	private boolean routine_detail_report_file;
	private int routine_id;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getRoutine_detail_content() {
		return routine_detail_content;
	}
	public void setRoutine_detail_content(String routine_detail_content) {
		this.routine_detail_content = routine_detail_content;
	}
	public String getRoutine_detail_reference_image() {
		return routine_detail_reference_image;
	}
	public void setRoutine_detail_reference_image(String routine_detail_reference_image) {
		this.routine_detail_reference_image = routine_detail_reference_image;
	}
	public String getRoutine_detail_reference_url() {
		return routine_detail_reference_url;
	}
	public void setRoutine_detail_reference_url(String routine_detail_reference_url) {
		this.routine_detail_reference_url = routine_detail_reference_url;
	}
	public boolean isRoutine_detail_report_image() {
		return routine_detail_report_image;
	}
	public void setRoutine_detail_report_image(boolean routine_detail_report_image) {
		this.routine_detail_report_image = routine_detail_report_image;
	}
	public boolean isRoutine_detail_report_url() {
		return routine_detail_report_url;
	}
	public void setRoutine_detail_report_url(boolean routine_detail_report_url) {
		this.routine_detail_report_url = routine_detail_report_url;
	}
	public boolean isRoutine_detail_report_ox() {
		return routine_detail_report_ox;
	}
	public void setRoutine_detail_report_ox(boolean routine_detail_report_ox) {
		this.routine_detail_report_ox = routine_detail_report_ox;
	}
	public boolean isRoutine_detail_report_file() {
		return routine_detail_report_file;
	}
	public void setRoutine_detail_report_file(boolean routine_detail_report_file) {
		this.routine_detail_report_file = routine_detail_report_file;
	}
	public int getRoutine_id() {
		return routine_id;
	}
	public void setRoutine_id(int routine_id) {
		this.routine_id = routine_id;
	}
	public String getRoutine_detail_reference_file() {
		return routine_detail_reference_file;
	}
	public void setRoutine_detail_reference_file(String routine_detail_reference_file) {
		this.routine_detail_reference_file = routine_detail_reference_file;
	}
	public String getRoutine_detail_reference_image_name() {
		return routine_detail_reference_image_name;
	}
	public void setRoutine_detail_reference_image_name(String routine_detail_reference_image_name) {
		this.routine_detail_reference_image_name = routine_detail_reference_image_name;
	}
	public String getRoutine_detail_reference_file_name() {
		return routine_detail_reference_file_name;
	}
	public void setRoutine_detail_reference_file_name(String routine_detail_reference_file_name) {
		this.routine_detail_reference_file_name = routine_detail_reference_file_name;
	}
	public String getRoutine_detail_title() {
		return routine_detail_title;
	}
	public void setRoutine_detail_title(String routine_detail_title) {
		this.routine_detail_title = routine_detail_title;
	}
	
	
}