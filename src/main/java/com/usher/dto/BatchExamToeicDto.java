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
public class BatchExamToeicDto{
	private int id;
	private String created;
	private int created_id;
	private String created_name;
	private String modified;
	private int modified_id;
	private String modified_name;
	
	private String type;
	private int num;
	private int question_count;
	private int question_start_num;
	private int objective_item_count;
	private String objective_item_type;
	private String group_name;
	
	private String data_value_question;
	private String data_value_image;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
	}
	public int getCreated_id() {
		return created_id;
	}
	public void setCreated_id(int created_id) {
		this.created_id = created_id;
	}
	public String getCreated_name() {
		return created_name;
	}
	public void setCreated_name(String created_name) {
		this.created_name = created_name;
	}
	public String getModified() {
		return modified;
	}
	public void setModified(String modified) {
		this.modified = modified;
	}
	public int getModified_id() {
		return modified_id;
	}
	public void setModified_id(int modified_id) {
		this.modified_id = modified_id;
	}
	public String getModified_name() {
		return modified_name;
	}
	public void setModified_name(String modified_name) {
		this.modified_name = modified_name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public int getQuestion_count() {
		return question_count;
	}
	public void setQuestion_count(int question_count) {
		this.question_count = question_count;
	}
	public int getQuestion_start_num() {
		return question_start_num;
	}
	public void setQuestion_start_num(int question_start_num) {
		this.question_start_num = question_start_num;
	}
	public int getObjective_item_count() {
		return objective_item_count;
	}
	public void setObjective_item_count(int objective_item_count) {
		this.objective_item_count = objective_item_count;
	}
	public String getObjective_item_type() {
		return objective_item_type;
	}
	public void setObjective_item_type(String objective_item_type) {
		this.objective_item_type = objective_item_type;
	}
	public String getGroup_name() {
		return group_name;
	}
	public void setGroup_name(String group_name) {
		this.group_name = group_name;
	}
	public String getData_value_question() {
		return data_value_question;
	}
	public void setData_value_question(String data_value_question) {
		this.data_value_question = data_value_question;
	}
	public String getData_value_image() {
		return data_value_image;
	}
	public void setData_value_image(String data_value_image) {
		this.data_value_image = data_value_image;
	}
	

	
}