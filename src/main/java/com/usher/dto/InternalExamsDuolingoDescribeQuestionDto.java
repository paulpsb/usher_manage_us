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
public class InternalExamsDuolingoDescribeQuestionDto{
	private int id;
	private String created;
	private int created_id;
	private String created_name;
	private String modified;
	private int modified_id;
	private String modified_name;
	private int describe_id;
	private String describe_question;
	private String describe_question_keyword;
	private int describe_question_score_keyword;
	private int describe_question_score_word;
	private int describe_question_sort;
	
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
	public int getDescribe_id() {
		return describe_id;
	}
	public void setDescribe_id(int describe_id) {
		this.describe_id = describe_id;
	}
	public String getDescribe_question() {
		return describe_question;
	}
	public void setDescribe_question(String describe_question) {
		this.describe_question = describe_question;
	}
	public String getDescribe_question_keyword() {
		return describe_question_keyword;
	}
	public void setDescribe_question_keyword(String describe_question_keyword) {
		this.describe_question_keyword = describe_question_keyword;
	}
	public int getDescribe_question_score_keyword() {
		return describe_question_score_keyword;
	}
	public void setDescribe_question_score_keyword(int describe_question_score_keyword) {
		this.describe_question_score_keyword = describe_question_score_keyword;
	}
	public int getDescribe_question_score_word() {
		return describe_question_score_word;
	}
	public void setDescribe_question_score_word(int describe_question_score_word) {
		this.describe_question_score_word = describe_question_score_word;
	}
	public int getDescribe_question_sort() {
		return describe_question_sort;
	}
	public void setDescribe_question_sort(int describe_question_sort) {
		this.describe_question_sort = describe_question_sort;
	}
	
	
	
}