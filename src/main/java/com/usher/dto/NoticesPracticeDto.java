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
public class NoticesPracticeDto{
	private int id;
	private String section;
	private String practice_type;
	private String book;
	private String volume;
	private String group;
	private String article;
	private int paragraph;
	private String date;
	
	private int course_id;
	private int course_count;
	private int course_first_success_count;
	private int course_first_giveup_count;
	private int course_last_success_count;
	private int course_last_giveup_count;
	
	private String comments;
	private boolean is_comments;
	private boolean is_success;
	
	private int user_id;
	
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
	public int getParagraph() {
		return paragraph;
	}
	public void setParagraph(int paragraph) {
		this.paragraph = paragraph;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public int getCourse_id() {
		return course_id;
	}
	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}
	public int getCourse_count() {
		return course_count;
	}
	public void setCourse_count(int course_count) {
		this.course_count = course_count;
	}
	public int getCourse_first_success_count() {
		return course_first_success_count;
	}
	public void setCourse_first_success_count(int course_first_success_count) {
		this.course_first_success_count = course_first_success_count;
	}
	public int getCourse_first_giveup_count() {
		return course_first_giveup_count;
	}
	public void setCourse_first_giveup_count(int course_first_giveup_count) {
		this.course_first_giveup_count = course_first_giveup_count;
	}
	public int getCourse_last_success_count() {
		return course_last_success_count;
	}
	public void setCourse_last_success_count(int course_last_success_count) {
		this.course_last_success_count = course_last_success_count;
	}
	public int getCourse_last_giveup_count() {
		return course_last_giveup_count;
	}
	public void setCourse_last_giveup_count(int course_last_giveup_count) {
		this.course_last_giveup_count = course_last_giveup_count;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public boolean isIs_comments() {
		return is_comments;
	}
	public void setIs_comments(boolean is_comments) {
		this.is_comments = is_comments;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getData_value() {
		return data_value;
	}
	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	public boolean isIs_success() {
		return is_success;
	}
	public void setIs_success(boolean is_success) {
		this.is_success = is_success;
	}
	
	
}