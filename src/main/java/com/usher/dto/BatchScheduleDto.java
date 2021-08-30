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
public class BatchScheduleDto{
	private int id;
	private String created;
	private String modified;
	private String date;
	private String start_time;
	private String end_time;
	
	private boolean batch_grammar;
	private String batch_grammar_type;
	private int batch_grammar_num;
	private int batch_grammar_min;
	private String batch_grammar_start_time;
	private String batch_grammar_end_time;
	
	private boolean batch_reading;
	private String batch_reading_type;
	private int batch_reading_num;
	private int batch_reading_min;
	private String batch_reading_start_time;
	private String batch_reading_end_time;

	private boolean batch_listening;
	private String batch_listening_type;
	private int batch_listening_num;
	private int batch_listening_min;
	private String batch_listening_start_time;
	private String batch_listening_end_time;
	
	private boolean batch_toeic;
	private String batch_toeic_type;
	private int batch_toeic_num;
	private int batch_toeic_min;
	private String batch_toeic_start_time;
	private String batch_toeic_end_time;
	
	private int course_id;
	
	private String course_name;
	
	private int batch_adviser_id;
	private String batch_adviser_name;
	
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
	public String getModified() {
		return modified;
	}
	public void setModified(String modified) {
		this.modified = modified;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getStart_time() {
		return start_time;
	}
	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}
	public String getEnd_time() {
		return end_time;
	}
	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}
	public boolean isBatch_grammar() {
		return batch_grammar;
	}
	public void setBatch_grammar(boolean batch_grammar) {
		this.batch_grammar = batch_grammar;
	}
	public int getBatch_grammar_min() {
		return batch_grammar_min;
	}
	public void setBatch_grammar_min(int batch_grammar_min) {
		this.batch_grammar_min = batch_grammar_min;
	}
	public boolean isBatch_reading() {
		return batch_reading;
	}
	public void setBatch_reading(boolean batch_reading) {
		this.batch_reading = batch_reading;
	}
	public int getBatch_reading_min() {
		return batch_reading_min;
	}
	public void setBatch_reading_min(int batch_reading_min) {
		this.batch_reading_min = batch_reading_min;
	}
	public int getCourse_id() {
		return course_id;
	}
	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}
	public String getBatch_grammar_type() {
		return batch_grammar_type;
	}
	public void setBatch_grammar_type(String batch_grammar_type) {
		this.batch_grammar_type = batch_grammar_type;
	}
	public int getBatch_grammar_num() {
		return batch_grammar_num;
	}
	public void setBatch_grammar_num(int batch_grammar_num) {
		this.batch_grammar_num = batch_grammar_num;
	}
	public String getBatch_reading_type() {
		return batch_reading_type;
	}
	public void setBatch_reading_type(String batch_reading_type) {
		this.batch_reading_type = batch_reading_type;
	}
	public int getBatch_reading_num() {
		return batch_reading_num;
	}
	public void setBatch_reading_num(int batch_reading_num) {
		this.batch_reading_num = batch_reading_num;
	}
	public String getBatch_grammar_start_time() {
		return batch_grammar_start_time;
	}
	public void setBatch_grammar_start_time(String batch_grammar_start_time) {
		this.batch_grammar_start_time = batch_grammar_start_time;
	}
	public String getBatch_grammar_end_time() {
		return batch_grammar_end_time;
	}
	public void setBatch_grammar_end_time(String batch_grammar_end_time) {
		this.batch_grammar_end_time = batch_grammar_end_time;
	}
	public String getBatch_reading_start_time() {
		return batch_reading_start_time;
	}
	public void setBatch_reading_start_time(String batch_reading_start_time) {
		this.batch_reading_start_time = batch_reading_start_time;
	}
	public String getBatch_reading_end_time() {
		return batch_reading_end_time;
	}
	public void setBatch_reading_end_time(String batch_reading_end_time) {
		this.batch_reading_end_time = batch_reading_end_time;
	}
	public boolean isBatch_listening() {
		return batch_listening;
	}
	public void setBatch_listening(boolean batch_listening) {
		this.batch_listening = batch_listening;
	}
	public String getBatch_listening_type() {
		return batch_listening_type;
	}
	public void setBatch_listening_type(String batch_listening_type) {
		this.batch_listening_type = batch_listening_type;
	}
	public int getBatch_listening_num() {
		return batch_listening_num;
	}
	public void setBatch_listening_num(int batch_listening_num) {
		this.batch_listening_num = batch_listening_num;
	}
	public int getBatch_listening_min() {
		return batch_listening_min;
	}
	public void setBatch_listening_min(int batch_listening_min) {
		this.batch_listening_min = batch_listening_min;
	}
	public String getBatch_listening_start_time() {
		return batch_listening_start_time;
	}
	public void setBatch_listening_start_time(String batch_listening_start_time) {
		this.batch_listening_start_time = batch_listening_start_time;
	}
	public String getBatch_listening_end_time() {
		return batch_listening_end_time;
	}
	public void setBatch_listening_end_time(String batch_listening_end_time) {
		this.batch_listening_end_time = batch_listening_end_time;
	}
	public String getCourse_name() {
		return course_name;
	}
	public void setCourse_name(String course_name) {
		this.course_name = course_name;
	}
	public int getBatch_adviser_id() {
		return batch_adviser_id;
	}
	public void setBatch_adviser_id(int batch_adviser_id) {
		this.batch_adviser_id = batch_adviser_id;
	}
	public String getBatch_adviser_name() {
		return batch_adviser_name;
	}
	public void setBatch_adviser_name(String batch_adviser_name) {
		this.batch_adviser_name = batch_adviser_name;
	}
	public boolean isBatch_toeic() {
		return batch_toeic;
	}
	public void setBatch_toeic(boolean batch_toeic) {
		this.batch_toeic = batch_toeic;
	}
	public String getBatch_toeic_type() {
		return batch_toeic_type;
	}
	public void setBatch_toeic_type(String batch_toeic_type) {
		this.batch_toeic_type = batch_toeic_type;
	}
	public int getBatch_toeic_num() {
		return batch_toeic_num;
	}
	public void setBatch_toeic_num(int batch_toeic_num) {
		this.batch_toeic_num = batch_toeic_num;
	}
	public int getBatch_toeic_min() {
		return batch_toeic_min;
	}
	public void setBatch_toeic_min(int batch_toeic_min) {
		this.batch_toeic_min = batch_toeic_min;
	}
	public String getBatch_toeic_start_time() {
		return batch_toeic_start_time;
	}
	public void setBatch_toeic_start_time(String batch_toeic_start_time) {
		this.batch_toeic_start_time = batch_toeic_start_time;
	}
	public String getBatch_toeic_end_time() {
		return batch_toeic_end_time;
	}
	public void setBatch_toeic_end_time(String batch_toeic_end_time) {
		this.batch_toeic_end_time = batch_toeic_end_time;
	}
	
	
	
	
	
}