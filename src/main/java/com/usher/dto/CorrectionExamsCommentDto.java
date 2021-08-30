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
public class CorrectionExamsCommentDto{
	private int id;
	private String created;
	private String modified;
	private String comment_type;
	private String date;
	private String question;
	private int comment_id;
	private String comment_name;
	private String comment_date;
	private String comment;
	private String comment_yn;
	private int correction_exams_answer_id;
	
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
	public String getComment_type() {
		return comment_type;
	}
	public void setComment_type(String comment_type) {
		this.comment_type = comment_type;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
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
	public String getComment_date() {
		return comment_date;
	}
	public void setComment_date(String comment_date) {
		this.comment_date = comment_date;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getComment_yn() {
		return comment_yn;
	}
	public void setComment_yn(String comment_yn) {
		this.comment_yn = comment_yn;
	}
	public int getCorrection_exams_answer_id() {
		return correction_exams_answer_id;
	}
	public void setCorrection_exams_answer_id(int correction_exams_answer_id) {
		this.correction_exams_answer_id = correction_exams_answer_id;
	}
	
	
}
