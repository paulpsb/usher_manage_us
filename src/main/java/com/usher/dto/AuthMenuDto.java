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
public class AuthMenuDto{
	private int id;
	private String menu_name;
	private int menu_level;
	private String menu_icon;
	private String menu_url;
	private int menu_order;
	private int menu_down_count;
	private int menu_level1_id;
	private int menu_level2_id;
	private int menu_level3_id;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getMenu_name() {
		return menu_name;
	}
	public void setMenu_name(String menu_name) {
		this.menu_name = menu_name;
	}
	public int getMenu_level() {
		return menu_level;
	}
	public void setMenu_level(int menu_level) {
		this.menu_level = menu_level;
	}
	public String getMenu_icon() {
		return menu_icon;
	}
	public void setMenu_icon(String menu_icon) {
		this.menu_icon = menu_icon;
	}
	public String getMenu_url() {
		return menu_url;
	}
	public void setMenu_url(String menu_url) {
		this.menu_url = menu_url;
	}
	public int getMenu_order() {
		return menu_order;
	}
	public void setMenu_order(int menu_order) {
		this.menu_order = menu_order;
	}
	public int getMenu_down_count() {
		return menu_down_count;
	}
	public void setMenu_down_count(int menu_down_count) {
		this.menu_down_count = menu_down_count;
	}
	public int getMenu_level1_id() {
		return menu_level1_id;
	}
	public void setMenu_level1_id(int menu_level1_id) {
		this.menu_level1_id = menu_level1_id;
	}
	public int getMenu_level2_id() {
		return menu_level2_id;
	}
	public void setMenu_level2_id(int menu_level2_id) {
		this.menu_level2_id = menu_level2_id;
	}
	public int getMenu_level3_id() {
		return menu_level3_id;
	}
	public void setMenu_level3_id(int menu_level3_id) {
		this.menu_level3_id = menu_level3_id;
	}

	
	
	
}