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
public class BaseOrientationDto{
	private int id;
	private String orientation_code;
	private String orientation_name;
	private int orientation_sort;
	private String senior_institute;
	private String senior_chamgang;
	private String junior_institute;
	private String junior_chamgang;
	private String junior_special_institute;
	private String junior_special_chamgang;
	private String orientation_gubun;
	private String orientation_video_time;
	private String use_yn;
	private String data_value;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getOrientation_code() {
		return orientation_code;
	}
	public void setOrientation_code(String orientation_code) {
		this.orientation_code = orientation_code;
	}
	public String getOrientation_name() {
		return orientation_name;
	}
	public void setOrientation_name(String orientation_name) {
		this.orientation_name = orientation_name;
	}
	public int getOrientation_sort() {
		return orientation_sort;
	}
	public void setOrientation_sort(int orientation_sort) {
		this.orientation_sort = orientation_sort;
	}
	
	public String getSenior_institute() {
		return senior_institute;
	}
	public void setSenior_institute(String senior_institute) {
		this.senior_institute = senior_institute;
	}
	public String getSenior_chamgang() {
		return senior_chamgang;
	}
	public void setSenior_chamgang(String senior_chamgang) {
		this.senior_chamgang = senior_chamgang;
	}
	public String getJunior_institute() {
		return junior_institute;
	}
	public void setJunior_institute(String junior_institute) {
		this.junior_institute = junior_institute;
	}
	public String getJunior_chamgang() {
		return junior_chamgang;
	}
	public void setJunior_chamgang(String junior_chamgang) {
		this.junior_chamgang = junior_chamgang;
	}
	public String getData_value() {
		return data_value;
	}
	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	public String getOrientation_gubun() {
		return orientation_gubun;
	}
	public void setOrientation_gubun(String orientation_gubun) {
		this.orientation_gubun = orientation_gubun;
	}
	public String getOrientation_video_time() {
		return orientation_video_time;
	}
	public void setOrientation_video_time(String orientation_video_time) {
		this.orientation_video_time = orientation_video_time;
	}
	public String getUse_yn() {
		return use_yn;
	}
	public void setUse_yn(String use_yn) {
		this.use_yn = use_yn;
	}
	public String getJunior_special_institute() {
		return junior_special_institute;
	}
	public void setJunior_special_institute(String junior_special_institute) {
		this.junior_special_institute = junior_special_institute;
	}
	public String getJunior_special_chamgang() {
		return junior_special_chamgang;
	}
	public void setJunior_special_chamgang(String junior_special_chamgang) {
		this.junior_special_chamgang = junior_special_chamgang;
	}

	
	
}