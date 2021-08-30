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
public class CoursesSemesterDto{
	private int id;
	private String date;
	private String date_code;
	
	private String pre_date;
	private String last_date;
	private String pre_date1;
	private String pre_date2;
	private String pre_date3;
	private String pre_date4;
	private String pre_date5;
	
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
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getDate_code() {
		return date_code;
	}
	public void setDate_code(String date_code) {
		this.date_code = date_code;
	}
	public String getPre_date() {
		return pre_date;
	}
	public void setPre_date(String pre_date) {
		this.pre_date = pre_date;
	}
	public String getLast_date() {
		return last_date;
	}
	public void setLast_date(String last_date) {
		this.last_date = last_date;
	}
	public String getPre_date1() {
		return pre_date1;
	}
	public void setPre_date1(String pre_date1) {
		this.pre_date1 = pre_date1;
	}
	public String getPre_date2() {
		return pre_date2;
	}
	public void setPre_date2(String pre_date2) {
		this.pre_date2 = pre_date2;
	}
	public String getPre_date3() {
		return pre_date3;
	}
	public void setPre_date3(String pre_date3) {
		this.pre_date3 = pre_date3;
	}
	public String getPre_date4() {
		return pre_date4;
	}
	public void setPre_date4(String pre_date4) {
		this.pre_date4 = pre_date4;
	}
	public String getPre_date5() {
		return pre_date5;
	}
	public void setPre_date5(String pre_date5) {
		this.pre_date5 = pre_date5;
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
	
	
}