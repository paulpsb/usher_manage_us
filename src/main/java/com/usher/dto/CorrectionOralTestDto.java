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
public class CorrectionOralTestDto{
	private int id;
	private String section;
	private String book;
	private String oral_test_type;
	private String oral_test_title;
	private String oral_test_url;
	private int oral_test_sort;

	private String data_value;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getOral_test_type() {
		return oral_test_type;
	}

	public void setOral_test_type(String oral_test_type) {
		this.oral_test_type = oral_test_type;
	}

	public String getOral_test_title() {
		return oral_test_title;
	}

	public void setOral_test_title(String oral_test_title) {
		this.oral_test_title = oral_test_title;
	}

	public String getOral_test_url() {
		return oral_test_url;
	}

	public void setOral_test_url(String oral_test_url) {
		this.oral_test_url = oral_test_url;
	}

	public int getOral_test_sort() {
		return oral_test_sort;
	}

	public void setOral_test_sort(int oral_test_sort) {
		this.oral_test_sort = oral_test_sort;
	}

	public String getData_value() {
		return data_value;
	}

	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	
	
}