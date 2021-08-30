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
public class CorrectionTestTypeDto{
	private int id;
	private String section;
	private String practice_type;
	private String test_type;
	private String test_name;
	private String test_exam_url;
	private String test_result_url;
	private int test_order;
	
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

	public String getTest_type() {
		return test_type;
	}

	public void setTest_type(String test_type) {
		this.test_type = test_type;
	}

	public String getTest_name() {
		return test_name;
	}

	public void setTest_name(String test_name) {
		this.test_name = test_name;
	}

	public String getTest_exam_url() {
		return test_exam_url;
	}

	public void setTest_exam_url(String test_exam_url) {
		this.test_exam_url = test_exam_url;
	}

	public String getTest_result_url() {
		return test_result_url;
	}

	public void setTest_result_url(String test_result_url) {
		this.test_result_url = test_result_url;
	}

	public String getData_value() {
		return data_value;
	}

	public void setData_value(String data_value) {
		this.data_value = data_value;
	}

	public int getTest_order() {
		return test_order;
	}

	public void setTest_order(int test_order) {
		this.test_order = test_order;
	}
	
	
}