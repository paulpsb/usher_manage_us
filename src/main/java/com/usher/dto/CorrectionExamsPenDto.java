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
public class CorrectionExamsPenDto{
	private int id;
	private String created;
	private String modified;
	private int pen_id;
	private String pen_name;
	private String pen_comment;
	private String pen_comment_review;
	private int correction_exams_answer_id;
	private int answer_correct_pen_count;
	
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
	public int getPen_id() {
		return pen_id;
	}
	public void setPen_id(int pen_id) {
		this.pen_id = pen_id;
	}
	public String getPen_name() {
		return pen_name;
	}
	public void setPen_name(String pen_name) {
		this.pen_name = pen_name;
	}
	public String getPen_comment() {
		return pen_comment;
	}
	public void setPen_comment(String pen_comment) {
		this.pen_comment = pen_comment;
	}
	public int getCorrection_exams_answer_id() {
		return correction_exams_answer_id;
	}
	public void setCorrection_exams_answer_id(int correction_exams_answer_id) {
		this.correction_exams_answer_id = correction_exams_answer_id;
	}
	public String getPen_comment_review() {
		return pen_comment_review;
	}
	public void setPen_comment_review(String pen_comment_review) {
		this.pen_comment_review = pen_comment_review;
	}
	public int getAnswer_correct_pen_count() {
		return answer_correct_pen_count;
	}
	public void setAnswer_correct_pen_count(int answer_correct_pen_count) {
		this.answer_correct_pen_count = answer_correct_pen_count;
	}
	
	
}