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
public class NoticesTaskDto{
	private int id;
	private String task_status;
	private int task_estimated_time;
	private int task_user_id;
	private String task_user_name;
	private String task_date;
	private String task_time;
	private String task_title;
	private String task_reference_title;
	private String task_reference_content;
	private String task_reference_image;
	private String task_reference_image_name;
	private String task_reference_url;
	private String task_reference_file;
	private String task_reference_file_name;
	private boolean task_report_image;
	private boolean task_report_url;
	private boolean task_report_file;
	private String task_content;
	private String task_image;
	private String task_image_name;
	private String task_url;
	private String task_file;
	private String task_file_name;
	private String task_return_content;
	private int task_category_detail_id;
	
	private String task_start_date;
	private String task_end_date;
	
	private int total_count = 0;
	private int page = 0;
	private int row_num = 0;
	private int first_num = 0;
	
	private int detail_user_id;
	private String detail_user_name;
	private String detail_date;
	private String detail_time;
	private int task_id;
	private int task_seq;
	private String task_detail_status;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTask_status() {
		return task_status;
	}
	public void setTask_status(String task_status) {
		this.task_status = task_status;
	}
	public int getTask_estimated_time() {
		return task_estimated_time;
	}
	public void setTask_estimated_time(int task_estimated_time) {
		this.task_estimated_time = task_estimated_time;
	}
	public int getTask_user_id() {
		return task_user_id;
	}
	public void setTask_user_id(int task_user_id) {
		this.task_user_id = task_user_id;
	}
	public String getTask_date() {
		return task_date;
	}
	public void setTask_date(String task_date) {
		this.task_date = task_date;
	}
	public String getTask_time() {
		return task_time;
	}
	public void setTask_time(String task_time) {
		this.task_time = task_time;
	}
	public String getTask_title() {
		return task_title;
	}
	public void setTask_title(String task_title) {
		this.task_title = task_title;
	}
	public String getTask_reference_title() {
		return task_reference_title;
	}
	public void setTask_reference_title(String task_reference_title) {
		this.task_reference_title = task_reference_title;
	}
	public String getTask_reference_content() {
		return task_reference_content;
	}
	public void setTask_reference_content(String task_reference_content) {
		this.task_reference_content = task_reference_content;
	}
	public String getTask_reference_image() {
		return task_reference_image;
	}
	public void setTask_reference_image(String task_reference_image) {
		this.task_reference_image = task_reference_image;
	}
	public String getTask_reference_image_name() {
		return task_reference_image_name;
	}
	public void setTask_reference_image_name(String task_reference_image_name) {
		this.task_reference_image_name = task_reference_image_name;
	}
	public String getTask_reference_url() {
		return task_reference_url;
	}
	public void setTask_reference_url(String task_reference_url) {
		this.task_reference_url = task_reference_url;
	}
	public String getTask_reference_file() {
		return task_reference_file;
	}
	public void setTask_reference_file(String task_reference_file) {
		this.task_reference_file = task_reference_file;
	}
	public String getTask_reference_file_name() {
		return task_reference_file_name;
	}
	public void setTask_reference_file_name(String task_reference_file_name) {
		this.task_reference_file_name = task_reference_file_name;
	}
	public boolean isTask_report_image() {
		return task_report_image;
	}
	public void setTask_report_image(boolean task_report_image) {
		this.task_report_image = task_report_image;
	}
	public boolean isTask_report_url() {
		return task_report_url;
	}
	public void setTask_report_url(boolean task_report_url) {
		this.task_report_url = task_report_url;
	}
	public boolean isTask_report_file() {
		return task_report_file;
	}
	public void setTask_report_file(boolean task_report_file) {
		this.task_report_file = task_report_file;
	}
	public String getTask_content() {
		return task_content;
	}
	public void setTask_content(String task_content) {
		this.task_content = task_content;
	}
	public String getTask_image() {
		return task_image;
	}
	public void setTask_image(String task_image) {
		this.task_image = task_image;
	}
	public String getTask_image_name() {
		return task_image_name;
	}
	public void setTask_image_name(String task_image_name) {
		this.task_image_name = task_image_name;
	}
	public String getTask_url() {
		return task_url;
	}
	public void setTask_url(String task_url) {
		this.task_url = task_url;
	}
	public String getTask_file() {
		return task_file;
	}
	public void setTask_file(String task_file) {
		this.task_file = task_file;
	}
	public String getTask_file_name() {
		return task_file_name;
	}
	public void setTask_file_name(String task_file_name) {
		this.task_file_name = task_file_name;
	}
	public String getTask_return_content() {
		return task_return_content;
	}
	public void setTask_return_content(String task_return_content) {
		this.task_return_content = task_return_content;
	}
	public int getTask_category_detail_id() {
		return task_category_detail_id;
	}
	public void setTask_category_detail_id(int task_category_detail_id) {
		this.task_category_detail_id = task_category_detail_id;
	}
	public int getTotal_count() {
		return total_count;
	}
	public void setTotal_count(int total_count) {
		this.total_count = total_count;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getRow_num() {
		return row_num;
	}
	public void setRow_num(int row_num) {
		this.row_num = row_num;
	}
	public int getFirst_num() {
		return first_num;
	}
	public void setFirst_num(int first_num) {
		this.first_num = first_num;
	}
	public String getTask_start_date() {
		return task_start_date;
	}
	public void setTask_start_date(String task_start_date) {
		this.task_start_date = task_start_date;
	}
	public String getTask_end_date() {
		return task_end_date;
	}
	public void setTask_end_date(String task_end_date) {
		this.task_end_date = task_end_date;
	}
	public String getTask_user_name() {
		return task_user_name;
	}
	public void setTask_user_name(String task_user_name) {
		this.task_user_name = task_user_name;
	}
	public int getDetail_user_id() {
		return detail_user_id;
	}
	public void setDetail_user_id(int detail_user_id) {
		this.detail_user_id = detail_user_id;
	}
	public String getDetail_user_name() {
		return detail_user_name;
	}
	public void setDetail_user_name(String detail_user_name) {
		this.detail_user_name = detail_user_name;
	}
	public String getDetail_date() {
		return detail_date;
	}
	public void setDetail_date(String detail_date) {
		this.detail_date = detail_date;
	}
	public String getDetail_time() {
		return detail_time;
	}
	public void setDetail_time(String detail_time) {
		this.detail_time = detail_time;
	}
	public int getTask_id() {
		return task_id;
	}
	public void setTask_id(int task_id) {
		this.task_id = task_id;
	}
	public int getTask_seq() {
		return task_seq;
	}
	public void setTask_seq(int task_seq) {
		this.task_seq = task_seq;
	}
	public String getTask_detail_status() {
		return task_detail_status;
	}
	public void setTask_detail_status(String task_detail_status) {
		this.task_detail_status = task_detail_status;
	}
	
	
}