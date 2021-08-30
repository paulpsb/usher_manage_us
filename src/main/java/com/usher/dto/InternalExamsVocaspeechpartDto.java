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
public class InternalExamsVocaspeechpartDto{
	private int id = 0;
	private String speech_part;
	private String meaning;
	private String synonym;
	private String extra_meaning;
	private String extra_synonym;
	private int voca_word_id = 0;
	
	private String book;
	private int day = 0;
	
	private int total_count = 0;
	private int page = 0;
	private int row_num = 0;
	private int first_num = 0;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSpeech_part() {
		return speech_part;
	}
	public void setSpeech_part(String speech_part) {
		this.speech_part = speech_part;
	}
	public String getMeaning() {
		return meaning;
	}
	public void setMeaning(String meaning) {
		this.meaning = meaning;
	}
	public String getSynonym() {
		return synonym;
	}
	public void setSynonym(String synonym) {
		this.synonym = synonym;
	}
	public String getExtra_meaning() {
		return extra_meaning;
	}
	public void setExtra_meaning(String extra_meaning) {
		this.extra_meaning = extra_meaning;
	}
	public String getExtra_synonym() {
		return extra_synonym;
	}
	public void setExtra_synonym(String extra_synonym) {
		this.extra_synonym = extra_synonym;
	}
	public int getVoca_word_id() {
		return voca_word_id;
	}
	public void setVoca_word_id(int voca_word_id) {
		this.voca_word_id = voca_word_id;
	}
	public String getBook() {
		return book;
	}
	public void setBook(String book) {
		this.book = book;
	}
	public int getDay() {
		return day;
	}
	public void setDay(int day) {
		this.day = day;
	}
	public int getTotal_count() {
		return total_count;
	}
	public void setTotal_count(int total_count) {
		this.total_count = total_count;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getRow_num() {
		return row_num;
	}
	public void setRow_num(int row_num) {
		this.row_num = row_num;
	}
	public int getFirst_num() {
		return first_num;
	}
	public void setFirst_num(int first_num) {
		this.first_num = first_num;
	}
	
	
	
	
}