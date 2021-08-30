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
public class BaseSchoolDto{
	private int id;
	private int user_school_id;
	private String school_foreign_gubun;
	private String school_gubun;
	private String school_area1;
	private String school_area2;
	private String school_name_kr;
	private String school_name_en;
	private String school_name;
	
	private String old_school_foreign_gubun;
	private String old_school_gubun;
	private String old_school_area1;
	private String old_school_area2;
	private String old_school_name_kr;
	private String old_school_name_en;
	private String old_school_name;
	
	private int total_count = 0;
	private int page = 0;
	private int row_num = 0;
	private int first_num = 0;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSchool_foreign_gubun() {
		return school_foreign_gubun;
	}
	public void setSchool_foreign_gubun(String school_foreign_gubun) {
		this.school_foreign_gubun = school_foreign_gubun;
	}
	public String getSchool_gubun() {
		return school_gubun;
	}
	public void setSchool_gubun(String school_gubun) {
		this.school_gubun = school_gubun;
	}
	public String getSchool_area1() {
		return school_area1;
	}
	public void setSchool_area1(String school_area1) {
		this.school_area1 = school_area1;
	}
	public String getSchool_area2() {
		return school_area2;
	}
	public void setSchool_area2(String school_area2) {
		this.school_area2 = school_area2;
	}
	public String getSchool_name_kr() {
		return school_name_kr;
	}
	public void setSchool_name_kr(String school_name_kr) {
		this.school_name_kr = school_name_kr;
	}
	public String getSchool_name_en() {
		return school_name_en;
	}
	public void setSchool_name_en(String school_name_en) {
		this.school_name_en = school_name_en;
	}
	public String getOld_school_foreign_gubun() {
		return old_school_foreign_gubun;
	}
	public void setOld_school_foreign_gubun(String old_school_foreign_gubun) {
		this.old_school_foreign_gubun = old_school_foreign_gubun;
	}
	public String getOld_school_gubun() {
		return old_school_gubun;
	}
	public void setOld_school_gubun(String old_school_gubun) {
		this.old_school_gubun = old_school_gubun;
	}
	public String getOld_school_area1() {
		return old_school_area1;
	}
	public void setOld_school_area1(String old_school_area1) {
		this.old_school_area1 = old_school_area1;
	}
	public String getOld_school_area2() {
		return old_school_area2;
	}
	public void setOld_school_area2(String old_school_area2) {
		this.old_school_area2 = old_school_area2;
	}
	public String getOld_school_name_kr() {
		return old_school_name_kr;
	}
	public void setOld_school_name_kr(String old_school_name_kr) {
		this.old_school_name_kr = old_school_name_kr;
	}
	public String getOld_school_name_en() {
		return old_school_name_en;
	}
	public void setOld_school_name_en(String old_school_name_en) {
		this.old_school_name_en = old_school_name_en;
	}
	public String getSchool_name() {
		return school_name;
	}
	public void setSchool_name(String school_name) {
		this.school_name = school_name;
	}
	public String getOld_school_name() {
		return old_school_name;
	}
	public void setOld_school_name(String old_school_name) {
		this.old_school_name = old_school_name;
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
	public int getUser_school_id() {
		return user_school_id;
	}
	public void setUser_school_id(int user_school_id) {
		this.user_school_id = user_school_id;
	}
	
	
}