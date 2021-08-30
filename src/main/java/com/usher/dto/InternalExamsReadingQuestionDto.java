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
public class InternalExamsReadingQuestionDto{
	private int id;
	private int reading_id;
	private int question_num;
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
	private float score;
	private String answer;
	private String answer1;
	private String category;
	private int marker1;
	private int marker2;
	private String marker;
	
	private String passage;
	private String paragraph1;
	private String paragraph2;
	private String paragraph3;
	private String paragraph4;
	private String paragraph5;
	private String paragraph6;
	private String paragraph7;
	private String paragraph8;
	private String paragraph9;
	private String paragraph10;
	private String qcat1;
	private String qcat2;
	private int qcat1c;
	private int qcat2c;
	
	private String flag;
	
	private String paragraph;
	
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
	public int getReading_id() {
		return reading_id;
	}
	public void setReading_id(int reading_id) {
		this.reading_id = reading_id;
	}
	public int getQuestion_num() {
		return question_num;
	}
	public void setQuestion_num(int question_num) {
		this.question_num = question_num;
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
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public int getMarker1() {
		return marker1;
	}
	public void setMarker1(int marker1) {
		this.marker1 = marker1;
	}
	public int getMarker2() {
		return marker2;
	}
	public void setMarker2(int marker2) {
		this.marker2 = marker2;
	}
	public String getMarker() {
		return marker;
	}
	public void setMarker(String marker) {
		this.marker = marker;
	}
	public String getPassage() {
		return passage;
	}
	public void setPassage(String passage) {
		this.passage = passage;
	}
	public String getParagraph1() {
		return paragraph1;
	}
	public void setParagraph1(String paragraph1) {
		this.paragraph1 = paragraph1;
	}
	public String getParagraph2() {
		return paragraph2;
	}
	public void setParagraph2(String paragraph2) {
		this.paragraph2 = paragraph2;
	}
	public String getParagraph3() {
		return paragraph3;
	}
	public void setParagraph3(String paragraph3) {
		this.paragraph3 = paragraph3;
	}
	public String getParagraph4() {
		return paragraph4;
	}
	public void setParagraph4(String paragraph4) {
		this.paragraph4 = paragraph4;
	}
	public String getParagraph5() {
		return paragraph5;
	}
	public void setParagraph5(String paragraph5) {
		this.paragraph5 = paragraph5;
	}
	public String getParagraph6() {
		return paragraph6;
	}
	public void setParagraph6(String paragraph6) {
		this.paragraph6 = paragraph6;
	}
	public String getParagraph7() {
		return paragraph7;
	}
	public void setParagraph7(String paragraph7) {
		this.paragraph7 = paragraph7;
	}
	public String getParagraph8() {
		return paragraph8;
	}
	public void setParagraph8(String paragraph8) {
		this.paragraph8 = paragraph8;
	}
	public String getParagraph9() {
		return paragraph9;
	}
	public void setParagraph9(String paragraph9) {
		this.paragraph9 = paragraph9;
	}
	public String getParagraph10() {
		return paragraph10;
	}
	public void setParagraph10(String paragraph10) {
		this.paragraph10 = paragraph10;
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
	public int getQcat1c() {
		return qcat1c;
	}
	public void setQcat1c(int qcat1c) {
		this.qcat1c = qcat1c;
	}
	public int getQcat2c() {
		return qcat2c;
	}
	public void setQcat2c(int qcat2c) {
		this.qcat2c = qcat2c;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getParagraph() {
		return paragraph;
	}
	public void setParagraph(String paragraph) {
		this.paragraph = paragraph;
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
	public void setFail_users(String fail_users) {
		this.fail_users = fail_users;
	}
	
	
}