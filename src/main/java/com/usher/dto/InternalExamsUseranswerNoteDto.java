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
public class InternalExamsUseranswerNoteDto{
	private int id;
	private String created;
	private String modified;
	private String note_comment;
	private String arrange_comment;
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
	public String getNote_comment() {
		return note_comment;
	}
	public void setNote_comment(String note_comment) {
		this.note_comment = note_comment;
	}
	public String getArrange_comment() {
		return arrange_comment;
	}
	public void setArrange_comment(String arrange_comment) {
		this.arrange_comment = arrange_comment;
	}
	public int getPractice_result_id() {
		return practice_result_id;
	}
	public void setPractice_result_id(int practice_result_id) {
		this.practice_result_id = practice_result_id;
	}
	
	
}