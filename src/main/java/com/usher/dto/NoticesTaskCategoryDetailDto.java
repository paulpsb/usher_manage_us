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
public class NoticesTaskCategoryDetailDto{
	private int id;
	private String task_category_title;
	private String reference_title;
	private int reference_time;
	private String reference_contents;
	private String reference_image;
	private String reference_image_name;
	private String reference_url;
	private String reference_file;
	private String reference_file_name;
	private boolean report_image;
	private boolean report_url;
	private boolean report_file;
	private int task_category_id;
	private boolean is_used;
	
	private String schedule_date;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getReference_title() {
		return reference_title;
	}
	public void setReference_title(String reference_title) {
		this.reference_title = reference_title;
	}
	public String getReference_contents() {
		return reference_contents;
	}
	public void setReference_contents(String reference_contents) {
		this.reference_contents = reference_contents;
	}
	public String getReference_image() {
		return reference_image;
	}
	public void setReference_image(String reference_image) {
		this.reference_image = reference_image;
	}
	public String getReference_image_name() {
		return reference_image_name;
	}
	public void setReference_image_name(String reference_image_name) {
		this.reference_image_name = reference_image_name;
	}
	public String getReference_url() {
		return reference_url;
	}
	public void setReference_url(String reference_url) {
		this.reference_url = reference_url;
	}
	public String getReference_file() {
		return reference_file;
	}
	public void setReference_file(String reference_file) {
		this.reference_file = reference_file;
	}
	public String getReference_file_name() {
		return reference_file_name;
	}
	public void setReference_file_name(String reference_file_name) {
		this.reference_file_name = reference_file_name;
	}
	public boolean isReport_image() {
		return report_image;
	}
	public void setReport_image(boolean report_image) {
		this.report_image = report_image;
	}
	public boolean isReport_url() {
		return report_url;
	}
	public void setReport_url(boolean report_url) {
		this.report_url = report_url;
	}
	public boolean isReport_file() {
		return report_file;
	}
	public void setReport_file(boolean report_file) {
		this.report_file = report_file;
	}
	public int getTask_category_id() {
		return task_category_id;
	}
	public void setTask_category_id(int task_category_id) {
		this.task_category_id = task_category_id;
	}
	public int getReference_time() {
		return reference_time;
	}
	public void setReference_time(int reference_time) {
		this.reference_time = reference_time;
	}
	public String getSchedule_date() {
		return schedule_date;
	}
	public void setSchedule_date(String schedule_date) {
		this.schedule_date = schedule_date;
	}
	public String getTask_category_title() {
		return task_category_title;
	}
	public void setTask_category_title(String task_category_title) {
		this.task_category_title = task_category_title;
	}
	public boolean isIs_used() {
		return is_used;
	}
	public void setIs_used(boolean is_used) {
		this.is_used = is_used;
	}
	
	
}