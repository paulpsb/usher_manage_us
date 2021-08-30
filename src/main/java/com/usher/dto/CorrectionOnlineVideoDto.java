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
public class CorrectionOnlineVideoDto{
	private int id;
	private String created;
	private String modified;
	private int practice_problem_id;
	private String online_lesson_title;
	private String online_lesson_video;
	private String online_lesson_time;
	private int online_lesson_sort;
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
	public String getModified() {
		return modified;
	}
	public void setModified(String modified) {
		this.modified = modified;
	}
	public int getPractice_problem_id() {
		return practice_problem_id;
	}
	public void setPractice_problem_id(int practice_problem_id) {
		this.practice_problem_id = practice_problem_id;
	}
	public String getOnline_lesson_title() {
		return online_lesson_title;
	}
	public void setOnline_lesson_title(String online_lesson_title) {
		this.online_lesson_title = online_lesson_title;
	}
	public String getOnline_lesson_video() {
		return online_lesson_video;
	}
	public void setOnline_lesson_video(String online_lesson_video) {
		this.online_lesson_video = online_lesson_video;
	}
	public String getOnline_lesson_time() {
		return online_lesson_time;
	}
	public void setOnline_lesson_time(String online_lesson_time) {
		this.online_lesson_time = online_lesson_time;
	}
	public int getOnline_lesson_sort() {
		return online_lesson_sort;
	}
	public void setOnline_lesson_sort(int online_lesson_sort) {
		this.online_lesson_sort = online_lesson_sort;
	}
	public String getData_value() {
		return data_value;
	}
	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	
	
}