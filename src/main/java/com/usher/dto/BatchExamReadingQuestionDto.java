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
public class BatchExamReadingQuestionDto{
	private int id;
	private String created;
	private int created_id;
	private String created_name;
	private String modified;
	private int modified_id;
	private String modified_name;
	private String type;
	private int num;
	private int sub_num;
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
	
	public String getMarker() {
		return marker;
	}
	public void setMarker(String marker) {
		this.marker = marker;
	}
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
	
	
}