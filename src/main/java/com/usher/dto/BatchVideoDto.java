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
public class BatchVideoDto{
	private int id;
	private String created;
	private String modified;
	private String test_type;
	private String student_type;
	private String base_batch_course;
	private String base_user_course;
	private String select_course;
	private String select_type;
	private String finally_course;
	private String video_url;
	
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
	
	public String getStudent_type() {
		return student_type;
	}
	public void setStudent_type(String student_type) {
		this.student_type = student_type;
	}
	public String getTest_type() {
		return test_type;
	}
	public void setTest_type(String test_type) {
		this.test_type = test_type;
	}
	public String getBase_batch_course() {
		return base_batch_course;
	}
	public void setBase_batch_course(String base_batch_course) {
		this.base_batch_course = base_batch_course;
	}
	public String getBase_user_course() {
		return base_user_course;
	}
	public void setBase_user_course(String base_user_course) {
		this.base_user_course = base_user_course;
	}
	public String getSelect_course() {
		return select_course;
	}
	public void setSelect_course(String select_course) {
		this.select_course = select_course;
	}
	public String getSelect_type() {
		return select_type;
	}
	public void setSelect_type(String select_type) {
		this.select_type = select_type;
	}
	public String getFinally_course() {
		return finally_course;
	}
	public void setFinally_course(String finally_course) {
		this.finally_course = finally_course;
	}
	public String getVideo_url() {
		return video_url;
	}
	public void setVideo_url(String video_url) {
		this.video_url = video_url;
	}
	
	
	
}