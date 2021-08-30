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
public class BaseExamRuburicDto{
	private int id;
	private String section;
	private String book;
	private int ruburic_num;
	private String ruburic_category_title;
	private String ruburic_category_sub;
	private String ruburic_content_title;
	private String ruburic_content_sub;
	
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
	public int getRuburic_num() {
		return ruburic_num;
	}
	public void setRuburic_num(int ruburic_num) {
		this.ruburic_num = ruburic_num;
	}
	public String getRuburic_category_title() {
		return ruburic_category_title;
	}
	public void setRuburic_category_title(String ruburic_category_title) {
		this.ruburic_category_title = ruburic_category_title;
	}
	public String getRuburic_category_sub() {
		return ruburic_category_sub;
	}
	public void setRuburic_category_sub(String ruburic_category_sub) {
		this.ruburic_category_sub = ruburic_category_sub;
	}
	public String getRuburic_content_title() {
		return ruburic_content_title;
	}
	public void setRuburic_content_title(String ruburic_content_title) {
		this.ruburic_content_title = ruburic_content_title;
	}
	public String getRuburic_content_sub() {
		return ruburic_content_sub;
	}
	public void setRuburic_content_sub(String ruburic_content_sub) {
		this.ruburic_content_sub = ruburic_content_sub;
	}
}