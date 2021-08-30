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
public class InternalExamsMemorizationQuestionDto{
	private int id;
	private int memorization_id;
	private int question_num;
	
	private String question;
	private String is_easy_mode;
	private String is_hard_mod;
	
	private String score_type;
	
	private int score_weight;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getMemorization_id() {
		return memorization_id;
	}
	public void setMemorization_id(int memorization_id) {
		this.memorization_id = memorization_id;
	}
	public int getQuestion_num() {
		return question_num;
	}
	public void setQuestion_num(int question_num) {
		this.question_num = question_num;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String getIs_easy_mode() {
		return is_easy_mode;
	}
	public void setIs_easy_mode(String is_easy_mode) {
		this.is_easy_mode = is_easy_mode;
	}
	public String getIs_hard_mod() {
		return is_hard_mod;
	}
	public void setIs_hard_mod(String is_hard_mod) {
		this.is_hard_mod = is_hard_mod;
	}
	public String getScore_type() {
		return score_type;
	}
	public void setScore_type(String score_type) {
		this.score_type = score_type;
	}
	public int getScore_weight() {
		return score_weight;
	}
	public void setScore_weight(int score_weight) {
		this.score_weight = score_weight;
	}
	
	
	
}