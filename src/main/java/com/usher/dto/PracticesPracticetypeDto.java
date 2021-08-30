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
public class PracticesPracticetypeDto{
	private int id;
	private String status;
	private String practice_type;
	private String practice_name;
	private String program_use;
	private int type_order;
	private String paragraph_use;
	private String type_comment;
	
	private String data_value;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getPractice_type() {
		return practice_type;
	}
	public void setPractice_type(String practice_type) {
		this.practice_type = practice_type;
	}
	public int getType_order() {
		return type_order;
	}
	public void setType_order(int type_order) {
		this.type_order = type_order;
	}
	public String getData_value() {
		return data_value;
	}
	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	public String getPractice_name() {
		return practice_name;
	}
	public void setPractice_name(String practice_name) {
		this.practice_name = practice_name;
	}
	public String getProgram_use() {
		return program_use;
	}
	public void setProgram_use(String program_use) {
		this.program_use = program_use;
	}
	public String getParagraph_use() {
		return paragraph_use;
	}
	public void setParagraph_use(String paragraph_use) {
		this.paragraph_use = paragraph_use;
	}
	public String getType_comment() {
		return type_comment;
	}
	public void setType_comment(String type_comment) {
		this.type_comment = type_comment;
	}
	
	
}