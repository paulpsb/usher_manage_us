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
public class MockTestScheduleExamDto{
	private int id;
	private String section;
	private String book;
	private String volume;
	private String group;
	private String article;
	private int mock_test_exam_min;
	private int mock_test_schedule_id;
	
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
	public String getVolume() {
		return volume;
	}
	public void setVolume(String volume) {
		this.volume = volume;
	}
	public String getGroup() {
		return group;
	}
	public void setGroup(String group) {
		this.group = group;
	}
	public String getArticle() {
		return article;
	}
	public void setArticle(String article) {
		this.article = article;
	}
	public int getMock_test_schedule_id() {
		return mock_test_schedule_id;
	}
	public void setMock_test_schedule_id(int mock_test_schedule_id) {
		this.mock_test_schedule_id = mock_test_schedule_id;
	}
	public int getMock_test_exam_min() {
		return mock_test_exam_min;
	}
	public void setMock_test_exam_min(int mock_test_exam_min) {
		this.mock_test_exam_min = mock_test_exam_min;
	}

	
	
}