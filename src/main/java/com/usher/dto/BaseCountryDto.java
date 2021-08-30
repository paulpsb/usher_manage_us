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
public class BaseCountryDto{
	private int id;
	private String country1;
	private String country2;
	private String old_country1;
	private String old_country2;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCountry1() {
		return country1;
	}
	public void setCountry1(String country1) {
		this.country1 = country1;
	}
	public String getCountry2() {
		return country2;
	}
	public void setCountry2(String country2) {
		this.country2 = country2;
	}
	public String getOld_country1() {
		return old_country1;
	}
	public void setOld_country1(String old_country1) {
		this.old_country1 = old_country1;
	}
	public String getOld_country2() {
		return old_country2;
	}
	public void setOld_country2(String old_country2) {
		this.old_country2 = old_country2;
	}
	
	
	
	
}