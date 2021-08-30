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
public class PracticesPracticesectionDto{
	private int id;
	private String status;
	private String section;
	private String short_title;
	private String short_title_kr;
	private int section_order;
	
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
	public String getSection() {
		return section;
	}
	public void setSection(String section) {
		this.section = section;
	}
	public String getShort_title() {
		return short_title;
	}
	public void setShort_title(String short_title) {
		this.short_title = short_title;
	}
	public String getShort_title_kr() {
		return short_title_kr;
	}
	public void setShort_title_kr(String short_title_kr) {
		this.short_title_kr = short_title_kr;
	}
	public int getSection_order() {
		return section_order;
	}
	public void setSection_order(int section_order) {
		this.section_order = section_order;
	}
	public String getData_value() {
		return data_value;
	}
	public void setData_value(String data_value) {
		this.data_value = data_value;
	}

	
}