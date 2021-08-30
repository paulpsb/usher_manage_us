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
public class InternalExamsListeningQuestionDto{
	private int id;
	private String created;
	private int created_id;
	private String created_name;
	private String modified;
	private int modified_id;
	private String modified_name;
	
	private int listening_id;

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
	private String answer3;
	
	private String qcat1;
	private String qcat2;
	private String qcat3;
	private String qcat4;
	
	private int question_count;

	private int practice_problem_id;
	private int course_id;
	private int course_enrollment_id;
	private int total_count;
	private int accept_count;
	private int fail_count;
	private int accept_rate;
	private int fail_rate;
	private String fail_users;
	private int answer_count_a;
	private int answer_count_b;
	private int answer_count_c;
	private int answer_count_d;
	private int answer_count_e;
	private int answer_count_f;
	private int answer_count_g;
	private int answer_count_h;
	private int answer_count_i;
	
	private String sort_id;
	private String sort_asc;
	
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

	public int getListening_id() {
		return listening_id;
	}

	public void setListening_id(int listening_id) {
		this.listening_id = listening_id;
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

	public String getAnswer3() {
		return answer3;
	}

	public void setAnswer3(String answer3) {
		this.answer3 = answer3;
	}

	public String getQcat4() {
		return qcat4;
	}

	public void setQcat4(String qcat4) {
		this.qcat4 = qcat4;
	}

	public int getPractice_problem_id() {
		return practice_problem_id;
	}

	public void setPractice_problem_id(int practice_problem_id) {
		this.practice_problem_id = practice_problem_id;
	}

	public int getCourse_id() {
		return course_id;
	}

	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}

	public int getCourse_enrollment_id() {
		return course_enrollment_id;
	}

	public void setCourse_enrollment_id(int course_enrollment_id) {
		this.course_enrollment_id = course_enrollment_id;
	}

	public int getTotal_count() {
		return total_count;
	}

	public void setTotal_count(int total_count) {
		this.total_count = total_count;
	}

	public int getAccept_count() {
		return accept_count;
	}

	public void setAccept_count(int accept_count) {
		this.accept_count = accept_count;
	}

	public int getFail_count() {
		return fail_count;
	}

	public void setFail_count(int fail_count) {
		this.fail_count = fail_count;
	}

	public int getAccept_rate() {
		return accept_rate;
	}

	public void setAccept_rate(int accept_rate) {
		this.accept_rate = accept_rate;
	}

	public int getFail_rate() {
		return fail_rate;
	}

	public void setFail_rate(int fail_rate) {
		this.fail_rate = fail_rate;
	}

	public String getFail_users() {
		return fail_users;
	}

	public void setFail_users(String fail_users) {
		this.fail_users = fail_users;
	}

	public int getAnswer_count_a() {
		return answer_count_a;
	}

	public void setAnswer_count_a(int answer_count_a) {
		this.answer_count_a = answer_count_a;
	}

	public int getAnswer_count_b() {
		return answer_count_b;
	}

	public void setAnswer_count_b(int answer_count_b) {
		this.answer_count_b = answer_count_b;
	}

	public int getAnswer_count_c() {
		return answer_count_c;
	}

	public void setAnswer_count_c(int answer_count_c) {
		this.answer_count_c = answer_count_c;
	}

	public int getAnswer_count_d() {
		return answer_count_d;
	}

	public void setAnswer_count_d(int answer_count_d) {
		this.answer_count_d = answer_count_d;
	}

	public int getAnswer_count_e() {
		return answer_count_e;
	}

	public void setAnswer_count_e(int answer_count_e) {
		this.answer_count_e = answer_count_e;
	}

	public int getAnswer_count_f() {
		return answer_count_f;
	}

	public void setAnswer_count_f(int answer_count_f) {
		this.answer_count_f = answer_count_f;
	}

	public int getAnswer_count_g() {
		return answer_count_g;
	}

	public void setAnswer_count_g(int answer_count_g) {
		this.answer_count_g = answer_count_g;
	}

	public int getAnswer_count_h() {
		return answer_count_h;
	}

	public void setAnswer_count_h(int answer_count_h) {
		this.answer_count_h = answer_count_h;
	}

	public int getAnswer_count_i() {
		return answer_count_i;
	}

	public void setAnswer_count_i(int answer_count_i) {
		this.answer_count_i = answer_count_i;
	}

	public String getSort_id() {
		return sort_id;
	}

	public void setSort_id(String sort_id) {
		this.sort_id = sort_id;
	}

	public String getSort_asc() {
		return sort_asc;
	}

	public void setSort_asc(String sort_asc) {
		this.sort_asc = sort_asc;
	}
	
	
}