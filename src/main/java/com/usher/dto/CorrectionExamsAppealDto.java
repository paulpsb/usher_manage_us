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
public class CorrectionExamsAppealDto{
	private int id;
	private String appeal_date;
	private String appeal_question;
	private String appeal_comment;
	private int appeal_answer_id;
	private String appeal_answer_name;
	private String appeal_answer_date;
	private String appeal_answer;
	private String appeal_answer_comment;
	private String appeal_answer_yn;
	private String appeal_answer_review_yn;
	private String appeal_answer_review_score;
	private int correction_exams_answer_id;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getAppeal_date() {
		return appeal_date;
	}
	public void setAppeal_date(String appeal_date) {
		this.appeal_date = appeal_date;
	}
	public String getAppeal_question() {
		return appeal_question;
	}
	public void setAppeal_question(String appeal_question) {
		this.appeal_question = appeal_question;
	}
	public int getAppeal_answer_id() {
		return appeal_answer_id;
	}
	public void setAppeal_answer_id(int appeal_answer_id) {
		this.appeal_answer_id = appeal_answer_id;
	}
	public String getAppeal_answer_name() {
		return appeal_answer_name;
	}
	public void setAppeal_answer_name(String appeal_answer_name) {
		this.appeal_answer_name = appeal_answer_name;
	}
	public String getAppeal_answer_date() {
		return appeal_answer_date;
	}
	public void setAppeal_answer_date(String appeal_answer_date) {
		this.appeal_answer_date = appeal_answer_date;
	}
	public String getAppeal_answer() {
		return appeal_answer;
	}
	public void setAppeal_answer(String appeal_answer) {
		this.appeal_answer = appeal_answer;
	}
	public String getAppeal_answer_comment() {
		return appeal_answer_comment;
	}
	public void setAppeal_answer_comment(String appeal_answer_comment) {
		this.appeal_answer_comment = appeal_answer_comment;
	}
	public String getAppeal_answer_yn() {
		return appeal_answer_yn;
	}
	public void setAppeal_answer_yn(String appeal_answer_yn) {
		this.appeal_answer_yn = appeal_answer_yn;
	}
	public String getAppeal_answer_review_yn() {
		return appeal_answer_review_yn;
	}
	public void setAppeal_answer_review_yn(String appeal_answer_review_yn) {
		this.appeal_answer_review_yn = appeal_answer_review_yn;
	}
	public String getAppeal_answer_review_score() {
		return appeal_answer_review_score;
	}
	public void setAppeal_answer_review_score(String appeal_answer_review_score) {
		this.appeal_answer_review_score = appeal_answer_review_score;
	}
	public int getCorrection_exams_answer_id() {
		return correction_exams_answer_id;
	}
	public void setCorrection_exams_answer_id(int correction_exams_answer_id) {
		this.correction_exams_answer_id = correction_exams_answer_id;
	}
	public String getAppeal_comment() {
		return appeal_comment;
	}
	public void setAppeal_comment(String appeal_comment) {
		this.appeal_comment = appeal_comment;
	}

	
}