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
public class BatchExamListeningQuestionDto{
	private int id;
	private String type;
	private int num;
	private int sub_num;
	private int article_num;
	
	private int question_num;
	private String category;
	private String question_type;
	private String question;
	private String choice_a;
	private String choice_b;
	private String choice_c;
	private String choice_d;
	private String choice_e;
	private String choice_f;
	private String choice_g;
	private String choice_h;
	private String choice_i;
	private String choice_a_check;
	private String choice_b_check;
	private String choice_c_check;
	private String choice_d_check;
	private String choice_e_check;
	private String choice_f_check;
	private String choice_g_check;
	private String choice_h_check;
	private String choice_i_check;
	private float score;
	private String answer;
	private String answer1;
	private String answer2;
	
	private String qcat1;
	private String qcat2;
	private String qcat3;
	
	private int question_count;

	private String created;
	private int created_id;
	private String created_name;
	private String modified;
	private int modified_id;
	private String modified_name;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public int getSub_num() {
		return sub_num;
	}

	public void setSub_num(int sub_num) {
		this.sub_num = sub_num;
	}

	public int getArticle_num() {
		return article_num;
	}

	public void setArticle_num(int article_num) {
		this.article_num = article_num;
	}

	public int getQuestion_num() {
		return question_num;
	}

	public void setQuestion_num(int question_num) {
		this.question_num = question_num;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getQuestion_type() {
		return question_type;
	}

	public void setQuestion_type(String question_type) {
		this.question_type = question_type;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getChoice_a() {
		return choice_a;
	}

	public void setChoice_a(String choice_a) {
		this.choice_a = choice_a;
	}

	public String getChoice_b() {
		return choice_b;
	}

	public void setChoice_b(String choice_b) {
		this.choice_b = choice_b;
	}

	public String getChoice_c() {
		return choice_c;
	}

	public void setChoice_c(String choice_c) {
		this.choice_c = choice_c;
	}

	public String getChoice_d() {
		return choice_d;
	}

	public void setChoice_d(String choice_d) {
		this.choice_d = choice_d;
	}

	public String getChoice_e() {
		return choice_e;
	}

	public void setChoice_e(String choice_e) {
		this.choice_e = choice_e;
	}

	public String getChoice_f() {
		return choice_f;
	}

	public void setChoice_f(String choice_f) {
		this.choice_f = choice_f;
	}

	public String getChoice_g() {
		return choice_g;
	}

	public void setChoice_g(String choice_g) {
		this.choice_g = choice_g;
	}

	public String getChoice_h() {
		return choice_h;
	}

	public void setChoice_h(String choice_h) {
		this.choice_h = choice_h;
	}

	public String getChoice_i() {
		return choice_i;
	}

	public void setChoice_i(String choice_i) {
		this.choice_i = choice_i;
	}

	public String getChoice_a_check() {
		return choice_a_check;
	}

	public void setChoice_a_check(String choice_a_check) {
		this.choice_a_check = choice_a_check;
	}

	public String getChoice_b_check() {
		return choice_b_check;
	}

	public void setChoice_b_check(String choice_b_check) {
		this.choice_b_check = choice_b_check;
	}

	public String getChoice_c_check() {
		return choice_c_check;
	}

	public void setChoice_c_check(String choice_c_check) {
		this.choice_c_check = choice_c_check;
	}

	public String getChoice_d_check() {
		return choice_d_check;
	}

	public void setChoice_d_check(String choice_d_check) {
		this.choice_d_check = choice_d_check;
	}

	public String getChoice_e_check() {
		return choice_e_check;
	}

	public void setChoice_e_check(String choice_e_check) {
		this.choice_e_check = choice_e_check;
	}

	public String getChoice_f_check() {
		return choice_f_check;
	}

	public void setChoice_f_check(String choice_f_check) {
		this.choice_f_check = choice_f_check;
	}

	public String getChoice_g_check() {
		return choice_g_check;
	}

	public void setChoice_g_check(String choice_g_check) {
		this.choice_g_check = choice_g_check;
	}

	public String getChoice_h_check() {
		return choice_h_check;
	}

	public void setChoice_h_check(String choice_h_check) {
		this.choice_h_check = choice_h_check;
	}

	public String getChoice_i_check() {
		return choice_i_check;
	}

	public void setChoice_i_check(String choice_i_check) {
		this.choice_i_check = choice_i_check;
	}

	public float getScore() {
		return score;
	}

	public void setScore(float score) {
		this.score = score;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getAnswer1() {
		return answer1;
	}

	public void setAnswer1(String answer1) {
		this.answer1 = answer1;
	}

	public String getQcat1() {
		return qcat1;
	}

	public void setQcat1(String qcat1) {
		this.qcat1 = qcat1;
	}

	public String getQcat2() {
		return qcat2;
	}

	public void setQcat2(String qcat2) {
		this.qcat2 = qcat2;
	}

	public int getQuestion_count() {
		return question_count;
	}

	public void setQuestion_count(int question_count) {
		this.question_count = question_count;
	}

	public String getCreated() {
		return created;
	}

	public void setCreated(String created) {
		this.created = created;
	}

	public int getCreated_id() {
		return created_id;
	}

	public void setCreated_id(int created_id) {
		this.created_id = created_id;
	}

	public String getCreated_name() {
		return created_name;
	}

	public void setCreated_name(String created_name) {
		this.created_name = created_name;
	}

	public String getModified() {
		return modified;
	}

	public void setModified(String modified) {
		this.modified = modified;
	}

	public int getModified_id() {
		return modified_id;
	}

	public void setModified_id(int modified_id) {
		this.modified_id = modified_id;
	}

	public String getModified_name() {
		return modified_name;
	}

	public void setModified_name(String modified_name) {
		this.modified_name = modified_name;
	}

	public String getAnswer2() {
		return answer2;
	}

	public void setAnswer2(String answer2) {
		this.answer2 = answer2;
	}

	public String getQcat3() {
		return qcat3;
	}

	public void setQcat3(String qcat3) {
		this.qcat3 = qcat3;
	}
	
	
}