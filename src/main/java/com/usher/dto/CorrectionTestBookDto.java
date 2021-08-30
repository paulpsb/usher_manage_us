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
public class CorrectionTestBookDto{
	private int id;
	private String section;
	private String practice_type;
	private String book;
	private String test_type;

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

	public String getPractice_type() {
		return practice_type;
	}

	public void setPractice_type(String practice_type) {
		this.practice_type = practice_type;
	}

	public String getBook() {
		return book;
	}

	public void setBook(String book) {
		this.book = book;
	}

	public String getTest_type() {
		return test_type;
	}

	public void setTest_type(String test_type) {
		this.test_type = test_type;
	}

	public String getData_value() {
		return data_value;
	}

	public void setData_value(String data_value) {
		this.data_value = data_value;
	}

	
}