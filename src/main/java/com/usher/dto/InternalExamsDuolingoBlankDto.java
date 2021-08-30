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
public class InternalExamsDuolingoBlankDto{
	private int id;
	private String created;
	private int created_id;
	private String created_name;
	private String modified;
	private int modified_id;
	private String modified_name;
	private String status;
	private String section;
	private String book;
	private String volume;
	private String group;
	private String article;
	private String blank_title;
	private String blank_contents;
	private int blank_sort;
	
	private String data_value;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCreated() {
		return created;
	}

	public void setCreated(String created) {
		this.created = created;
	}

	public int getCreated_id() {
		return created_id;
	}

	public void setCreated_id(int created_id) {
		this.created_id = created_id;
	}

	public String getCreated_name() {
		return created_name;
	}

	public void setCreated_name(String created_name) {
		this.created_name = created_name;
	}

	public String getModified() {
		return modified;
	}

	public void setModified(String modified) {
		this.modified = modified;
	}

	public int getModified_id() {
		return modified_id;
	}

	public void setModified_id(int modified_id) {
		this.modified_id = modified_id;
	}

	public String getModified_name() {
		return modified_name;
	}

	public void setModified_name(String modified_name) {
		this.modified_name = modified_name;
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

	public String getBlank_title() {
		return blank_title;
	}

	public void setBlank_title(String blank_title) {
		this.blank_title = blank_title;
	}

	public String getBlank_contents() {
		return blank_contents;
	}

	public void setBlank_contents(String blank_contents) {
		this.blank_contents = blank_contents;
	}

	public int getBlank_sort() {
		return blank_sort;
	}

	public void setBlank_sort(int blank_sort) {
		this.blank_sort = blank_sort;
	}

	public String getData_value() {
		return data_value;
	}

	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	
	
}