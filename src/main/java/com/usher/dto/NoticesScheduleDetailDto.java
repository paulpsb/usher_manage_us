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
public class NoticesScheduleDetailDto{
	private int id;
	private String modified;
	
	private String schedule_detail_reference_title;
	private String schedule_detail_reference_content;
	private String schedule_detail_reference_image;
	private String schedule_detail_reference_image_name;
	private String schedule_detail_reference_url;
	private String schedule_detail_reference_file;
	private String schedule_detail_reference_file_name;
	
	private boolean schedule_detail_use_report_image;
	private boolean schedule_detail_use_report_url;
	private boolean schedule_detail_use_report_ox;
	private boolean schedule_detail_use_report_file;

	private String schedule_detail_content;
	
	private boolean schedule_detail_is_report_image;
	private boolean schedule_detail_is_report_url;
	private boolean schedule_detail_is_report_ox;
	private boolean schedule_detail_is_report_file;

	private String schedule_detail_image;
	private String schedule_detail_image_name;
	private String schedule_detail_url;
	private String schedule_detail_ox;
	private String schedule_detail_file;
	private String schedule_detail_file_name;
	
	private int routin_detail_id;
	private int schedule_id;
	
	private boolean schedule_detail_is_success;
	private boolean schedule_detail_is_ignore;
	private boolean schedule_detail_is_problem;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSchedule_detail_reference_content() {
		return schedule_detail_reference_content;
	}
	public void setSchedule_detail_reference_content(String schedule_detail_reference_content) {
		this.schedule_detail_reference_content = schedule_detail_reference_content;
	}
	public String getSchedule_detail_reference_image() {
		return schedule_detail_reference_image;
	}
	public void setSchedule_detail_reference_image(String schedule_detail_reference_image) {
		this.schedule_detail_reference_image = schedule_detail_reference_image;
	}
	public String getSchedule_detail_reference_image_name() {
		return schedule_detail_reference_image_name;
	}
	public void setSchedule_detail_reference_image_name(String schedule_detail_reference_image_name) {
		this.schedule_detail_reference_image_name = schedule_detail_reference_image_name;
	}
	public String getSchedule_detail_reference_url() {
		return schedule_detail_reference_url;
	}
	public void setSchedule_detail_reference_url(String schedule_detail_reference_url) {
		this.schedule_detail_reference_url = schedule_detail_reference_url;
	}
	public String getSchedule_detail_reference_file() {
		return schedule_detail_reference_file;
	}
	public void setSchedule_detail_reference_file(String schedule_detail_reference_file) {
		this.schedule_detail_reference_file = schedule_detail_reference_file;
	}
	public String getSchedule_detail_reference_file_name() {
		return schedule_detail_reference_file_name;
	}
	public void setSchedule_detail_reference_file_name(String schedule_detail_reference_file_name) {
		this.schedule_detail_reference_file_name = schedule_detail_reference_file_name;
	}
	public boolean isSchedule_detail_use_report_image() {
		return schedule_detail_use_report_image;
	}
	public void setSchedule_detail_use_report_image(boolean schedule_detail_use_report_image) {
		this.schedule_detail_use_report_image = schedule_detail_use_report_image;
	}
	public boolean isSchedule_detail_use_report_url() {
		return schedule_detail_use_report_url;
	}
	public void setSchedule_detail_use_report_url(boolean schedule_detail_use_report_url) {
		this.schedule_detail_use_report_url = schedule_detail_use_report_url;
	}
	public boolean isSchedule_detail_use_report_ox() {
		return schedule_detail_use_report_ox;
	}
	public void setSchedule_detail_use_report_ox(boolean schedule_detail_use_report_ox) {
		this.schedule_detail_use_report_ox = schedule_detail_use_report_ox;
	}
	public boolean isSchedule_detail_use_report_file() {
		return schedule_detail_use_report_file;
	}
	public void setSchedule_detail_use_report_file(boolean schedule_detail_use_report_file) {
		this.schedule_detail_use_report_file = schedule_detail_use_report_file;
	}
	public String getSchedule_detail_content() {
		return schedule_detail_content;
	}
	public void setSchedule_detail_content(String schedule_detail_content) {
		this.schedule_detail_content = schedule_detail_content;
	}
	public boolean isSchedule_detail_is_report_image() {
		return schedule_detail_is_report_image;
	}
	public void setSchedule_detail_is_report_image(boolean schedule_detail_is_report_image) {
		this.schedule_detail_is_report_image = schedule_detail_is_report_image;
	}
	public boolean isSchedule_detail_is_report_url() {
		return schedule_detail_is_report_url;
	}
	public void setSchedule_detail_is_report_url(boolean schedule_detail_is_report_url) {
		this.schedule_detail_is_report_url = schedule_detail_is_report_url;
	}
	public boolean isSchedule_detail_is_report_ox() {
		return schedule_detail_is_report_ox;
	}
	public void setSchedule_detail_is_report_ox(boolean schedule_detail_is_report_ox) {
		this.schedule_detail_is_report_ox = schedule_detail_is_report_ox;
	}
	public boolean isSchedule_detail_is_report_file() {
		return schedule_detail_is_report_file;
	}
	public void setSchedule_detail_is_report_file(boolean schedule_detail_is_report_file) {
		this.schedule_detail_is_report_file = schedule_detail_is_report_file;
	}
	public String getSchedule_detail_image() {
		return schedule_detail_image;
	}
	public void setSchedule_detail_image(String schedule_detail_image) {
		this.schedule_detail_image = schedule_detail_image;
	}
	public String getSchedule_detail_image_name() {
		return schedule_detail_image_name;
	}
	public void setSchedule_detail_image_name(String schedule_detail_image_name) {
		this.schedule_detail_image_name = schedule_detail_image_name;
	}
	public String getSchedule_detail_url() {
		return schedule_detail_url;
	}
	public void setSchedule_detail_url(String schedule_detail_url) {
		this.schedule_detail_url = schedule_detail_url;
	}
	public String getSchedule_detail_ox() {
		return schedule_detail_ox;
	}
	public void setSchedule_detail_ox(String schedule_detail_ox) {
		this.schedule_detail_ox = schedule_detail_ox;
	}
	public String getSchedule_detail_file() {
		return schedule_detail_file;
	}
	public void setSchedule_detail_file(String schedule_detail_file) {
		this.schedule_detail_file = schedule_detail_file;
	}
	public String getSchedule_detail_file_name() {
		return schedule_detail_file_name;
	}
	public void setSchedule_detail_file_name(String schedule_detail_file_name) {
		this.schedule_detail_file_name = schedule_detail_file_name;
	}
	public int getRoutin_detail_id() {
		return routin_detail_id;
	}
	public void setRoutin_detail_id(int routin_detail_id) {
		this.routin_detail_id = routin_detail_id;
	}
	public int getSchedule_id() {
		return schedule_id;
	}
	public void setSchedule_id(int schedule_id) {
		this.schedule_id = schedule_id;
	}
	public String getSchedule_detail_reference_title() {
		return schedule_detail_reference_title;
	}
	public void setSchedule_detail_reference_title(String schedule_detail_reference_title) {
		this.schedule_detail_reference_title = schedule_detail_reference_title;
	}
	public boolean isSchedule_detail_is_success() {
		return schedule_detail_is_success;
	}
	public void setSchedule_detail_is_success(boolean schedule_detail_is_success) {
		this.schedule_detail_is_success = schedule_detail_is_success;
	}
	public boolean isSchedule_detail_is_ignore() {
		return schedule_detail_is_ignore;
	}
	public void setSchedule_detail_is_ignore(boolean schedule_detail_is_ignore) {
		this.schedule_detail_is_ignore = schedule_detail_is_ignore;
	}
	public String getModified() {
		return modified;
	}
	public void setModified(String modified) {
		this.modified = modified;
	}
	public boolean isSchedule_detail_is_problem() {
		return schedule_detail_is_problem;
	}
	public void setSchedule_detail_is_problem(boolean schedule_detail_is_problem) {
		this.schedule_detail_is_problem = schedule_detail_is_problem;
	}

	
}