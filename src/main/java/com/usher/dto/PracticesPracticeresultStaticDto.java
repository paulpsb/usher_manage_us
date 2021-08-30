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
public class PracticesPracticeresultStaticDto{
	private int id;
	private String section;	
	private String practice_type;	
	private String book;	
	private String volume;
	private String group;
	private String article;
	private String passage;	
	private int paragraph;
	private String date;
	private String timem;
	private int score;
	private int score1;
	private int score2;
	private int total_score;
	private int total_score1;
	private int total_score2;
	private int course_enrollment_id;
	private boolean pass_result;
	private boolean out_pass_result;
	private boolean user_pass_result;
	private boolean week_pass_result;
	
	private int course_id;
	private int course_group_id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSection() {
		return section;
	}
	public void setSection(String section) {
		this.section = section;
	}
	public String getPractice_type() {
		return practice_type;
	}
	public void setPractice_type(String practice_type) {
		this.practice_type = practice_type;
	}
	public String getBook() {
		return book;
	}
	public void setBook(String book) {
		this.book = book;
	}
	public String getVolume() {
		return volume;
	}
	public void setVolume(String volume) {
		this.volume = volume;
	}
	public String getGroup() {
		return group;
	}
	public void setGroup(String group) {
		this.group = group;
	}
	public String getArticle() {
		return article;
	}
	public void setArticle(String article) {
		this.article = article;
	}
	public String getPassage() {
		return passage;
	}
	public void setPassage(String passage) {
		this.passage = passage;
	}
	public int getParagraph() {
		return paragraph;
	}
	public void setParagraph(int paragraph) {
		this.paragraph = paragraph;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public int getScore1() {
		return score1;
	}
	public void setScore1(int score1) {
		this.score1 = score1;
	}
	public int getScore2() {
		return score2;
	}
	public void setScore2(int score2) {
		this.score2 = score2;
	}
	public int getTotal_score() {
		return total_score;
	}
	public void setTotal_score(int total_score) {
		this.total_score = total_score;
	}
	public int getTotal_score1() {
		return total_score1;
	}
	public void setTotal_score1(int total_score1) {
		this.total_score1 = total_score1;
	}
	public int getTotal_score2() {
		return total_score2;
	}
	public void setTotal_score2(int total_score2) {
		this.total_score2 = total_score2;
	}
	public int getCourse_enrollment_id() {
		return course_enrollment_id;
	}
	public void setCourse_enrollment_id(int course_enrollment_id) {
		this.course_enrollment_id = course_enrollment_id;
	}
	public boolean isPass_result() {
		return pass_result;
	}
	public void setPass_result(boolean pass_result) {
		this.pass_result = pass_result;
	}
	public boolean isOut_pass_result() {
		return out_pass_result;
	}
	public void setOut_pass_result(boolean out_pass_result) {
		this.out_pass_result = out_pass_result;
	}
	public boolean isUser_pass_result() {
		return user_pass_result;
	}
	public void setUser_pass_result(boolean user_pass_result) {
		this.user_pass_result = user_pass_result;
	}
	public boolean isWeek_pass_result() {
		return week_pass_result;
	}
	public void setWeek_pass_result(boolean week_pass_result) {
		this.week_pass_result = week_pass_result;
	}
	public int getCourse_id() {
		return course_id;
	}
	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}
	public int getCourse_group_id() {
		return course_group_id;
	}
	public void setCourse_group_id(int course_group_id) {
		this.course_group_id = course_group_id;
	}
	public String getTimem() {
		return timem;
	}
	public void setTimem(String timem) {
		this.timem = timem;
	}

	
	
	
	
}
