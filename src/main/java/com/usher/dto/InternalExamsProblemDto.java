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
public class InternalExamsProblemDto{
	private String section;
	private String book;
	private String volume;
	private String group;
	private String article;
	
	private String old_section;
	private String old_book;
	private String old_volume;
	private String old_group;
	private String old_article;
	
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
	public String getOld_section() {
		return old_section;
	}
	public void setOld_section(String old_section) {
		this.old_section = old_section;
	}
	public String getOld_book() {
		return old_book;
	}
	public void setOld_book(String old_book) {
		this.old_book = old_book;
	}
	public String getOld_volume() {
		return old_volume;
	}
	public void setOld_volume(String old_volume) {
		this.old_volume = old_volume;
	}
	public String getOld_group() {
		return old_group;
	}
	public void setOld_group(String old_group) {
		this.old_group = old_group;
	}
	public String getOld_article() {
		return old_article;
	}
	public void setOld_article(String old_article) {
		this.old_article = old_article;
	}
	
	
	
}