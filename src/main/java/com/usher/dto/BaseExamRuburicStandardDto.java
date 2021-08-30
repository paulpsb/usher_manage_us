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
public class BaseExamRuburicStandardDto{
	private int id;
	private String section;
	private String book;
	private String ruburic_standard;
	
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
	public String getRuburic_standard() {
		return ruburic_standard;
	}
	public void setRuburic_standard(String ruburic_standard) {
		this.ruburic_standard = ruburic_standard;
	}
	
	
	
}