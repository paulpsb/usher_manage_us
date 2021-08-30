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
public class MockTestScheduleDto{
	private int id;
	private String date;
	private String start_time;
	private String end_time;
	private int mock_test_min;
	private boolean mock_test;
	private int mock_test_reading_min;
	private int mock_test_listening_min;
	private int mock_test_writing_min;
	private int mock_test_speaking_min;
	private int course_id;
	
	private String data_value;

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

	public String getStart_time() {
		return start_time;
	}

	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}

	public String getEnd_time() {
		return end_time;
	}

	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}

	public int getMock_test_min() {
		return mock_test_min;
	}

	public void setMock_test_min(int mock_test_min) {
		this.mock_test_min = mock_test_min;
	}

	public boolean isMock_test() {
		return mock_test;
	}

	public void setMock_test(boolean mock_test) {
		this.mock_test = mock_test;
	}

	public int getMock_test_reading_min() {
		return mock_test_reading_min;
	}

	public void setMock_test_reading_min(int mock_test_reading_min) {
		this.mock_test_reading_min = mock_test_reading_min;
	}

	public int getMock_test_listening_min() {
		return mock_test_listening_min;
	}

	public void setMock_test_listening_min(int mock_test_listening_min) {
		this.mock_test_listening_min = mock_test_listening_min;
	}

	public int getMock_test_writing_min() {
		return mock_test_writing_min;
	}

	public void setMock_test_writing_min(int mock_test_writing_min) {
		this.mock_test_writing_min = mock_test_writing_min;
	}

	public int getMock_test_speaking_min() {
		return mock_test_speaking_min;
	}

	public void setMock_test_speaking_min(int mock_test_speaking_min) {
		this.mock_test_speaking_min = mock_test_speaking_min;
	}

	public int getCourse_id() {
		return course_id;
	}

	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}

	public String getData_value() {
		return data_value;
	}

	public void setData_value(String data_value) {
		this.data_value = data_value;
	}

	
}