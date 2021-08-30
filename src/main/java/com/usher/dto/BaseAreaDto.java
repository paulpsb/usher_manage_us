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
public class BaseAreaDto{
	private int id;
	private String area1;
	private String area2;
	private String old_area1;
	private String old_area2;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getArea1() {
		return area1;
	}
	public void setArea1(String area1) {
		this.area1 = area1;
	}
	public String getArea2() {
		return area2;
	}
	public void setArea2(String area2) {
		this.area2 = area2;
	}
	public String getOld_area1() {
		return old_area1;
	}
	public void setOld_area1(String old_area1) {
		this.old_area1 = old_area1;
	}
	public String getOld_area2() {
		return old_area2;
	}
	public void setOld_area2(String old_area2) {
		this.old_area2 = old_area2;
	}
	
	
	
}