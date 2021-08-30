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
public class NoticesRoutineDto{
	private int id;
	private String routine_category;
	private String created;
	private String modified;
	private int created_id;
	private int modified_id;
	private String created_name;
	private String modified_name;
	private int routine_organization_id;
	private String routine_organization_name;
	private String routine_title;
	private String routine_type;
	
	private int total_count = 0;
	private int page = 0;
	private int row_num = 0;
	private int first_num = 0;
	
	private String data_value;
	
	private int log_id;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getRoutine_category() {
		return routine_category;
	}
	public void setRoutine_category(String routine_category) {
		this.routine_category = routine_category;
	}
	public String getRoutine_title() {
		return routine_title;
	}
	public void setRoutine_title(String routine_title) {
		this.routine_title = routine_title;
	}
	
	public int getRoutine_organization_id() {
		return routine_organization_id;
	}
	public void setRoutine_organization_id(int routine_organization_id) {
		this.routine_organization_id = routine_organization_id;
	}
	public String getRoutine_organization_name() {
		return routine_organization_name;
	}
	public void setRoutine_organization_name(String routine_organization_name) {
		this.routine_organization_name = routine_organization_name;
	}
	public String getRoutine_type() {
		return routine_type;
	}
	public void setRoutine_type(String routine_type) {
		this.routine_type = routine_type;
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
	public String getData_value() {
		return data_value;
	}
	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	public int getLog_id() {
		return log_id;
	}
	public void setLog_id(int log_id) {
		this.log_id = log_id;
	}
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
	}
	public String getModified() {
		return modified;
	}
	public void setModified(String modified) {
		this.modified = modified;
	}
	public int getCreated_id() {
		return created_id;
	}
	public void setCreated_id(int created_id) {
		this.created_id = created_id;
	}
	public int getModified_id() {
		return modified_id;
	}
	public void setModified_id(int modified_id) {
		this.modified_id = modified_id;
	}
	public String getCreated_name() {
		return created_name;
	}
	public void setCreated_name(String created_name) {
		this.created_name = created_name;
	}
	public String getModified_name() {
		return modified_name;
	}
	public void setModified_name(String modified_name) {
		this.modified_name = modified_name;
	}
	
	
	
	
}