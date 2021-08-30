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
public class InternalExamsUseranswerCommentDto{
	private int id;
	private String created;
	private String modified;
	private int comment_id;
	private String comment_name;
	private String comment_type;
	private String comment;
	private int practice_result_id;
	
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
	public int getComment_id() {
		return comment_id;
	}
	public void setComment_id(int comment_id) {
		this.comment_id = comment_id;
	}
	public String getComment_name() {
		return comment_name;
	}
	public void setComment_name(String comment_name) {
		this.comment_name = comment_name;
	}
	public String getComment_type() {
		return comment_type;
	}
	public void setComment_type(String comment_type) {
		this.comment_type = comment_type;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public int getPractice_result_id() {
		return practice_result_id;
	}
	public void setPractice_result_id(int practice_result_id) {
		this.practice_result_id = practice_result_id;
	}
	
	
	
}