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
public class CorrectionExamsAnswerDto{
	private int id;
	private String status;
	private String section;
	private String book;
	private String volume;
	private String group;
	private String article;
	private String date;
	private int user_id;
	private String user_name;
	private String user_username;
	private String question;
	private String answer;
	private String answer_pen_date;
	private String answer_pen;
	private String answer_student_pen_yn;
	private String answer_correct_pen_yn;
	private String answer_correct_pen_date;
	private String answer_correct_pen_month;
	private String answer_rublic_yn;
	private String answer_rublic_date;
	private int answer_rublic_score;
	private String answer_student_note_yn;
	private String course_name;
	private int course_id;
	private int course_enrollment_id;
	private int practice_result_id;
	private int practice_schedule_id;
	private int practice_problem_id;
	private int exam_time;
	private String request_date;
	
	private int answer_correct_pen_id;
	private String answer_correct_pen_user_id;
	private String answer_correct_pen_name;
	private int answer_rublic_id;
	private String answer_rublic_name;
	
	private String answer_appeal_status;
	private String answer_appeal_date;
	private String appeal_answer_month;
	private int answer_appeal_time;
	private String answer_review_yn;
	private int answer_review_score;
	
	private int legacy_id;
	
	private int rublic_time;
	
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
	
	private int total_count = 0;
	private int page = 0;
	private int row_num = 0;
	private int first_num = 0;
	
	private String comment_answer_yn;
	
	private int answer_count;
	private int answer_correct_pen_count;
	
	private String marketin_correction_answer_type;
	private String marketin_correction_answer_date;
	
	private String out_yn;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getSection() {
		return section;
	}
	public void setSection(String section) {
		this.section = section;
	}
	public String getBook() {
		return book;
	}
	public void setBook(String book) {
		this.book = book;
	}
	public String getArticle() {
		return article;
	}
	public void setArticle(String article) {
		this.article = article;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public String getAnswer_pen_date() {
		return answer_pen_date;
	}
	public void setAnswer_pen_date(String answer_pen_date) {
		this.answer_pen_date = answer_pen_date;
	}
	public String getAnswer_pen() {
		return answer_pen;
	}
	public void setAnswer_pen(String answer_pen) {
		this.answer_pen = answer_pen;
	}
	public String getAnswer_student_pen_yn() {
		return answer_student_pen_yn;
	}
	public void setAnswer_student_pen_yn(String answer_student_pen_yn) {
		this.answer_student_pen_yn = answer_student_pen_yn;
	}
	public String getAnswer_correct_pen_yn() {
		return answer_correct_pen_yn;
	}
	public void setAnswer_correct_pen_yn(String answer_correct_pen_yn) {
		this.answer_correct_pen_yn = answer_correct_pen_yn;
	}
	public String getAnswer_student_note_yn() {
		return answer_student_note_yn;
	}
	public void setAnswer_student_note_yn(String answer_student_note_yn) {
		this.answer_student_note_yn = answer_student_note_yn;
	}
	public String getCourse_name() {
		return course_name;
	}
	public void setCourse_name(String course_name) {
		this.course_name = course_name;
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
	public int getPractice_result_id() {
		return practice_result_id;
	}
	public void setPractice_result_id(int practice_result_id) {
		this.practice_result_id = practice_result_id;
	}
	public int getPractice_schedule_id() {
		return practice_schedule_id;
	}
	public void setPractice_schedule_id(int practice_schedule_id) {
		this.practice_schedule_id = practice_schedule_id;
	}
	public int getPractice_problem_id() {
		return practice_problem_id;
	}
	public void setPractice_problem_id(int practice_problem_id) {
		this.practice_problem_id = practice_problem_id;
	}
	public int getTotal_count() {
		return total_count;
	}
	public void setTotal_count(int total_count) {
		this.total_count = total_count;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getRow_num() {
		return row_num;
	}
	public void setRow_num(int row_num) {
		this.row_num = row_num;
	}
	public int getFirst_num() {
		return first_num;
	}
	public void setFirst_num(int first_num) {
		this.first_num = first_num;
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
	public int getExam_time() {
		return exam_time;
	}
	public void setExam_time(int exam_time) {
		this.exam_time = exam_time;
	}
	public String getAnswer_rublic_yn() {
		return answer_rublic_yn;
	}
	public void setAnswer_rublic_yn(String answer_rublic_yn) {
		this.answer_rublic_yn = answer_rublic_yn;
	}
	public int getAnswer_correct_pen_id() {
		return answer_correct_pen_id;
	}
	public void setAnswer_correct_pen_id(int answer_correct_pen_id) {
		this.answer_correct_pen_id = answer_correct_pen_id;
	}
	public String getAnswer_correct_pen_name() {
		return answer_correct_pen_name;
	}
	public void setAnswer_correct_pen_name(String answer_correct_pen_name) {
		this.answer_correct_pen_name = answer_correct_pen_name;
	}
	public int getAnswer_rublic_id() {
		return answer_rublic_id;
	}
	public void setAnswer_rublic_id(int answer_rublic_id) {
		this.answer_rublic_id = answer_rublic_id;
	}
	public String getAnswer_rublic_name() {
		return answer_rublic_name;
	}
	public void setAnswer_rublic_name(String answer_rublic_name) {
		this.answer_rublic_name = answer_rublic_name;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getUser_username() {
		return user_username;
	}
	public void setUser_username(String user_username) {
		this.user_username = user_username;
	}
	public String getAnswer_correct_pen_date() {
		return answer_correct_pen_date;
	}
	public void setAnswer_correct_pen_date(String answer_correct_pen_date) {
		this.answer_correct_pen_date = answer_correct_pen_date;
	}
	public String getAnswer_rublic_date() {
		return answer_rublic_date;
	}
	public void setAnswer_rublic_date(String answer_rublic_date) {
		this.answer_rublic_date = answer_rublic_date;
	}
	public int getAnswer_rublic_score() {
		return answer_rublic_score;
	}
	public void setAnswer_rublic_score(int answer_rublic_score) {
		this.answer_rublic_score = answer_rublic_score;
	}
	public int getLegacy_id() {
		return legacy_id;
	}
	public void setLegacy_id(int legacy_id) {
		this.legacy_id = legacy_id;
	}
	public String getComment_answer_yn() {
		return comment_answer_yn;
	}
	public void setComment_answer_yn(String comment_answer_yn) {
		this.comment_answer_yn = comment_answer_yn;
	}
	public String getRequest_date() {
		return request_date;
	}
	public void setRequest_date(String request_date) {
		this.request_date = request_date;
	}
	public int getRublic_time() {
		return rublic_time;
	}
	public void setRublic_time(int rublic_time) {
		this.rublic_time = rublic_time;
	}
	public String getAnswer_appeal_status() {
		return answer_appeal_status;
	}
	public void setAnswer_appeal_status(String answer_appeal_status) {
		this.answer_appeal_status = answer_appeal_status;
	}
	public String getAnswer_appeal_date() {
		return answer_appeal_date;
	}
	public void setAnswer_appeal_date(String answer_appeal_date) {
		this.answer_appeal_date = answer_appeal_date;
	}
	public String getAnswer_review_yn() {
		return answer_review_yn;
	}
	public void setAnswer_review_yn(String answer_review_yn) {
		this.answer_review_yn = answer_review_yn;
	}
	public int getAnswer_review_score() {
		return answer_review_score;
	}
	public void setAnswer_review_score(int answer_review_score) {
		this.answer_review_score = answer_review_score;
	}
	public int getAnswer_appeal_time() {
		return answer_appeal_time;
	}
	public void setAnswer_appeal_time(int answer_appeal_time) {
		this.answer_appeal_time = answer_appeal_time;
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
	public String getAppeal_comment() {
		return appeal_comment;
	}
	public void setAppeal_comment(String appeal_comment) {
		this.appeal_comment = appeal_comment;
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
	public int getAnswer_count() {
		return answer_count;
	}
	public void setAnswer_count(int answer_count) {
		this.answer_count = answer_count;
	}
	public int getAnswer_correct_pen_count() {
		return answer_correct_pen_count;
	}
	public void setAnswer_correct_pen_count(int answer_correct_pen_count) {
		this.answer_correct_pen_count = answer_correct_pen_count;
	}
	public String getAnswer_correct_pen_user_id() {
		return answer_correct_pen_user_id;
	}
	public void setAnswer_correct_pen_user_id(String answer_correct_pen_user_id) {
		this.answer_correct_pen_user_id = answer_correct_pen_user_id;
	}
	public String getAnswer_correct_pen_month() {
		return answer_correct_pen_month;
	}
	public void setAnswer_correct_pen_month(String answer_correct_pen_month) {
		this.answer_correct_pen_month = answer_correct_pen_month;
	}
	public String getAppeal_answer_month() {
		return appeal_answer_month;
	}
	public void setAppeal_answer_month(String appeal_answer_month) {
		this.appeal_answer_month = appeal_answer_month;
	}
	public String getMarketin_correction_answer_type() {
		return marketin_correction_answer_type;
	}
	public void setMarketin_correction_answer_type(String marketin_correction_answer_type) {
		this.marketin_correction_answer_type = marketin_correction_answer_type;
	}
	public String getMarketin_correction_answer_date() {
		return marketin_correction_answer_date;
	}
	public void setMarketin_correction_answer_date(String marketin_correction_answer_date) {
		this.marketin_correction_answer_date = marketin_correction_answer_date;
	}
	public String getOut_yn() {
		return out_yn;
	}
	public void setOut_yn(String out_yn) {
		this.out_yn = out_yn;
	}
	
	
}