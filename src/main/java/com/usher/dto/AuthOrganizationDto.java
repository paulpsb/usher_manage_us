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
public class AuthOrganizationDto{
	private int id;
	private String organization_name;
	private int organization_up_id;
	private String organization_up_name;
	private String organization_icon;
	private int organization_level;
	private int organization_sort;
	
	private int organization_down_count;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getOrganization_name() {
		return organization_name;
	}
	public void setOrganization_name(String organization_name) {
		this.organization_name = organization_name;
	}
	public int getOrganization_up_id() {
		return organization_up_id;
	}
	public void setOrganization_up_id(int organization_up_id) {
		this.organization_up_id = organization_up_id;
	}
	public String getOrganization_icon() {
		return organization_icon;
	}
	public void setOrganization_icon(String organization_icon) {
		this.organization_icon = organization_icon;
	}
	public int getOrganization_level() {
		return organization_level;
	}
	public void setOrganization_level(int organization_level) {
		this.organization_level = organization_level;
	}
	public int getOrganization_sort() {
		return organization_sort;
	}
	public void setOrganization_sort(int organization_sort) {
		this.organization_sort = organization_sort;
	}
	public int getOrganization_down_count() {
		return organization_down_count;
	}
	public void setOrganization_down_count(int organization_down_count) {
		this.organization_down_count = organization_down_count;
	}
	public String getOrganization_up_name() {
		return organization_up_name;
	}
	public void setOrganization_up_name(String organization_up_name) {
		this.organization_up_name = organization_up_name;
	}

	
}