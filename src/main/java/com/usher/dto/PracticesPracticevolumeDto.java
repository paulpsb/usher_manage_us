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
public class PracticesPracticevolumeDto{
	private int id;
	private String status;
	private String section;
	private String book;
	private String volume;
	private int volume_order;
	private int practice_section_id;
	private int practice_book_id;
	
	private String data_value;

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

	public String getBook() {
		return book;
	}

	public void setBook(String book) {
		this.book = book;
	}

	public String getVolume() {
		return volume;
	}

	public void setVolume(String volume) {
		this.volume = volume;
	}

	public int getVolume_order() {
		return volume_order;
	}

	public void setVolume_order(int volume_order) {
		this.volume_order = volume_order;
	}

	public int getPractice_section_id() {
		return practice_section_id;
	}

	public void setPractice_section_id(int practice_section_id) {
		this.practice_section_id = practice_section_id;
	}

	public int getPractice_book_id() {
		return practice_book_id;
	}

	public void setPractice_book_id(int practice_book_id) {
		this.practice_book_id = practice_book_id;
	}

	public String getData_value() {
		return data_value;
	}

	public void setData_value(String data_value) {
		this.data_value = data_value;
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