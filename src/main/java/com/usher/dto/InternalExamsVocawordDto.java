package com.usher.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InternalExamsVocawordDto{
	private int id = 0;
	private String book;
	private int day = 0;
	private String spell;
	private int importance = 0;
	private int speech_part_count = 0;
	private String phonetic_alphabet;
	private String example;
	private String example_ko;
	private int audio_file_name = 0;
	private String speech_difficulty;
	private String speech_exception;
	
	private int total_count = 0;
	private int page = 0;
	private int row_num = 0;
	private int first_num = 0;
	
	private String data_value;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public String getSpell() {
		return spell;
	}
	public void setSpell(String spell) {
		this.spell = spell;
	}
	public int getImportance() {
		return importance;
	}
	public void setImportance(int importance) {
		this.importance = importance;
	}
	public int getSpeech_part_count() {
		return speech_part_count;
	}
	public void setSpeech_part_count(int speech_part_count) {
		this.speech_part_count = speech_part_count;
	}
	public String getPhonetic_alphabet() {
		return phonetic_alphabet;
	}
	public void setPhonetic_alphabet(String phonetic_alphabet) {
		this.phonetic_alphabet = phonetic_alphabet;
	}
	public String getExample() {
		return example;
	}
	public void setExample(String example) {
		this.example = example;
	}
	public String getExample_ko() {
		return example_ko;
	}
	public void setExample_ko(String example_ko) {
		this.example_ko = example_ko;
	}
	public int getAudio_file_name() {
		return audio_file_name;
	}
	public void setAudio_file_name(int audio_file_name) {
		this.audio_file_name = audio_file_name;
	}
	public String getSpeech_difficulty() {
		return speech_difficulty;
	}
	public void setSpeech_difficulty(String speech_difficulty) {
		this.speech_difficulty = speech_difficulty;
	}
	public String getSpeech_exception() {
		return speech_exception;
	}
	public void setSpeech_exception(String speech_exception) {
		this.speech_exception = speech_exception;
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
	public String getData_value() {
		return data_value;
	}
	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	

}