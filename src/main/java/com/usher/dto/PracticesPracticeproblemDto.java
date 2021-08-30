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
public class PracticesPracticeproblemDto{
	private int id;
	private String status;
	private String section;
	private String book;
	private String volume;
	private String group;
	private String article;
	private int total_score_voca;
	private int total_score_blueprint;
	private int total_score_grammar_syntax;
	private int total_score_passage_phrase;
	private int total_score_passage_voca;
	private int total_score;
	
	private String short_title;
	
	private String correction_yn;
	private String data_value;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public int getTotal_score_voca() {
		return total_score_voca;
	}
	public void setTotal_score_voca(int total_score_voca) {
		this.total_score_voca = total_score_voca;
	}
	public int getTotal_score_blueprint() {
		return total_score_blueprint;
	}
	public void setTotal_score_blueprint(int total_score_blueprint) {
		this.total_score_blueprint = total_score_blueprint;
	}
	public int getTotal_score_grammar_syntax() {
		return total_score_grammar_syntax;
	}
	public void setTotal_score_grammar_syntax(int total_score_grammar_syntax) {
		this.total_score_grammar_syntax = total_score_grammar_syntax;
	}
	public int getTotal_score_passage_phrase() {
		return total_score_passage_phrase;
	}
	public void setTotal_score_passage_phrase(int total_score_passage_phrase) {
		this.total_score_passage_phrase = total_score_passage_phrase;
	}
	public int getTotal_score_passage_voca() {
		return total_score_passage_voca;
	}
	public void setTotal_score_passage_voca(int total_score_passage_voca) {
		this.total_score_passage_voca = total_score_passage_voca;
	}
	public String getShort_title() {
		return short_title;
	}
	public void setShort_title(String short_title) {
		this.short_title = short_title;
	}
	public int getTotal_score() {
		return total_score;
	}
	public void setTotal_score(int total_score) {
		this.total_score = total_score;
	}
	public String getData_value() {
		return data_value;
	}
	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	public String getCorrection_yn() {
		return correction_yn;
	}
	public void setCorrection_yn(String correction_yn) {
		this.correction_yn = correction_yn;
	}
	
	
}