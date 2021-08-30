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
public class PracticesPracticeresultDto{
	private int id;
	private String created;
	private String modified;
	private String status;	
	private String section;	
	private String practice_type;
	private String practice_name;
	private int score;
	private boolean pass_result;
	private boolean real;
	private String result_url;
	private String date;
	private int course_enrollment_id;
	private int practice_problem_id;
	private int practice_schedule_id;
	private int practice_statistics_id;
	private int answer_id;
	private String end_time;
	private String start_time;
	private int total_score;
	private int exception_score;
	
	private String book;
	private String volume;
	private String group;
	private String article;
	private int total_score_voca;
	private int student_id;
	
	private String practice_date;
	private String practice_time;
	
	private String exam_yn;
	
	private int repeat_count;
	
	private int total_minitues;
	
	private String course_name;
	private String student_name;
	private String question;

	private int course_group_id;
	private int course_id;
	private int user_id;
	
	private int real_score;
	private int score1;
	private int score2;
	private int score3;
	private int score4;
	private int score5;
	private int score6;
	private int score7;
	private int score8;
	private int score9;
	private int score10;
	private int score11;
	private int score12;
	private int score13;
	private int score14;
	private int score15;
	private int score16;
	
	private int real_total_score;
	private int total_score1;
	private int total_score2;
	private int total_score3;
	private int total_score4;
	private int total_score5;
	private int total_score6;
	private int total_score7;
	private int total_score8;
	private int total_score9;
	private int total_score10;
	private int total_score11;
	private int total_score12;
	private int total_score13;
	private int total_score14;
	private int total_score15;
	private int total_score16;
	
	private int practice_result_id1;
	private int practice_result_id2;
	private int practice_result_id3;
	private int practice_result_id4;
	private int practice_result_id5;
	private int practice_result_id6;
	private int practice_result_id7;
	private int practice_result_id8;
	private int practice_result_id9;
	private int practice_result_id10;
	private int practice_result_id11;
	private int practice_result_id12;
	private int practice_result_id13;
	private int practice_result_id14;
	private int practice_result_id15;
	
	private int start_paragraph;
	private int end_paragraph;
	
	private String attendance_reason_type;
	private String timem;
	
	private String student_pen_yn;
	private String answer_rublic_yn;
	private String answer_pen_yn;
	private String answer_spk_yn;
	private String student_note_yn;
	
	private String result;
	private String answer;
	private String useranswer;
	
	private int total_count = 0;
	private int page = 0;
	private int row_num = 0;
	private int first_num = 0;
	
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
	public String getPractice_type() {
		return practice_type;
	}
	public void setPractice_type(String practice_type) {
		this.practice_type = practice_type;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public boolean isPass_result() {
		return pass_result;
	}
	public void setPass_result(boolean pass_result) {
		this.pass_result = pass_result;
	}
	public boolean isReal() {
		return real;
	}
	public void setReal(boolean real) {
		this.real = real;
	}
	public String getResult_url() {
		return result_url;
	}
	public void setResult_url(String result_url) {
		this.result_url = result_url;
	}
	public int getCourse_enrollment_id() {
		return course_enrollment_id;
	}
	public void setCourse_enrollment_id(int course_enrollment_id) {
		this.course_enrollment_id = course_enrollment_id;
	}
	public int getPractice_problem_id() {
		return practice_problem_id;
	}
	public void setPractice_problem_id(int practice_problem_id) {
		this.practice_problem_id = practice_problem_id;
	}
	public int getPractice_schedule_id() {
		return practice_schedule_id;
	}
	public void setPractice_schedule_id(int practice_schedule_id) {
		this.practice_schedule_id = practice_schedule_id;
	}
	public int getPractice_statistics_id() {
		return practice_statistics_id;
	}
	public void setPractice_statistics_id(int practice_statistics_id) {
		this.practice_statistics_id = practice_statistics_id;
	}
	public int getAnswer_id() {
		return answer_id;
	}
	public void setAnswer_id(int answer_id) {
		this.answer_id = answer_id;
	}
	public String getEnd_time() {
		return end_time;
	}
	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}
	public String getStart_time() {
		return start_time;
	}
	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}
	public int getTotal_score() {
		return total_score;
	}
	public void setTotal_score(int total_score) {
		this.total_score = total_score;
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
	public int getTotal_score_voca() {
		return total_score_voca;
	}
	public void setTotal_score_voca(int total_score_voca) {
		this.total_score_voca = total_score_voca;
	}
	public String getExam_yn() {
		return exam_yn;
	}
	public void setExam_yn(String exam_yn) {
		this.exam_yn = exam_yn;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getArticle() {
		return article;
	}
	public void setArticle(String article) {
		this.article = article;
	}
	public int getStudent_id() {
		return student_id;
	}
	public void setStudent_id(int student_id) {
		this.student_id = student_id;
	}
	public String getPractice_date() {
		return practice_date;
	}
	public void setPractice_date(String practice_date) {
		this.practice_date = practice_date;
	}
	public String getPractice_time() {
		return practice_time;
	}
	public void setPractice_time(String practice_time) {
		this.practice_time = practice_time;
	}
	public int getRepeat_count() {
		return repeat_count;
	}
	public void setRepeat_count(int repeat_count) {
		this.repeat_count = repeat_count;
	}
	public int getException_score() {
		return exception_score;
	}
	public void setException_score(int exception_score) {
		this.exception_score = exception_score;
	}
	public int getTotal_minitues() {
		return total_minitues;
	}
	public void setTotal_minitues(int total_minitues) {
		this.total_minitues = total_minitues;
	}
	public int getCourse_group_id() {
		return course_group_id;
	}
	public void setCourse_group_id(int course_group_id) {
		this.course_group_id = course_group_id;
	}
	public int getReal_score() {
		return real_score;
	}
	public void setReal_score(int real_score) {
		this.real_score = real_score;
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
	public int getScore3() {
		return score3;
	}
	public void setScore3(int score3) {
		this.score3 = score3;
	}
	public int getScore4() {
		return score4;
	}
	public void setScore4(int score4) {
		this.score4 = score4;
	}
	public int getScore5() {
		return score5;
	}
	public void setScore5(int score5) {
		this.score5 = score5;
	}
	public int getScore6() {
		return score6;
	}
	public void setScore6(int score6) {
		this.score6 = score6;
	}
	public int getScore7() {
		return score7;
	}
	public void setScore7(int score7) {
		this.score7 = score7;
	}
	public int getScore8() {
		return score8;
	}
	public void setScore8(int score8) {
		this.score8 = score8;
	}
	public int getScore9() {
		return score9;
	}
	public void setScore9(int score9) {
		this.score9 = score9;
	}
	public int getScore10() {
		return score10;
	}
	public void setScore10(int score10) {
		this.score10 = score10;
	}
	public int getScore11() {
		return score11;
	}
	public void setScore11(int score11) {
		this.score11 = score11;
	}
	public int getScore12() {
		return score12;
	}
	public void setScore12(int score12) {
		this.score12 = score12;
	}
	public int getScore13() {
		return score13;
	}
	public void setScore13(int score13) {
		this.score13 = score13;
	}
	public int getScore14() {
		return score14;
	}
	public void setScore14(int score14) {
		this.score14 = score14;
	}
	public int getScore15() {
		return score15;
	}
	public void setScore15(int score15) {
		this.score15 = score15;
	}
	public int getScore16() {
		return score16;
	}
	public void setScore16(int score16) {
		this.score16 = score16;
	}
	public int getReal_total_score() {
		return real_total_score;
	}
	public void setReal_total_score(int real_total_score) {
		this.real_total_score = real_total_score;
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
	public int getTotal_score3() {
		return total_score3;
	}
	public void setTotal_score3(int total_score3) {
		this.total_score3 = total_score3;
	}
	public int getTotal_score4() {
		return total_score4;
	}
	public void setTotal_score4(int total_score4) {
		this.total_score4 = total_score4;
	}
	public int getTotal_score5() {
		return total_score5;
	}
	public void setTotal_score5(int total_score5) {
		this.total_score5 = total_score5;
	}
	public int getTotal_score6() {
		return total_score6;
	}
	public void setTotal_score6(int total_score6) {
		this.total_score6 = total_score6;
	}
	public int getTotal_score7() {
		return total_score7;
	}
	public void setTotal_score7(int total_score7) {
		this.total_score7 = total_score7;
	}
	public int getTotal_score8() {
		return total_score8;
	}
	public void setTotal_score8(int total_score8) {
		this.total_score8 = total_score8;
	}
	public int getTotal_score9() {
		return total_score9;
	}
	public void setTotal_score9(int total_score9) {
		this.total_score9 = total_score9;
	}
	public int getTotal_score10() {
		return total_score10;
	}
	public void setTotal_score10(int total_score10) {
		this.total_score10 = total_score10;
	}
	public int getTotal_score11() {
		return total_score11;
	}
	public void setTotal_score11(int total_score11) {
		this.total_score11 = total_score11;
	}
	public int getTotal_score12() {
		return total_score12;
	}
	public void setTotal_score12(int total_score12) {
		this.total_score12 = total_score12;
	}
	public int getTotal_score13() {
		return total_score13;
	}
	public void setTotal_score13(int total_score13) {
		this.total_score13 = total_score13;
	}
	public int getTotal_score14() {
		return total_score14;
	}
	public void setTotal_score14(int total_score14) {
		this.total_score14 = total_score14;
	}
	public int getTotal_score15() {
		return total_score15;
	}
	public void setTotal_score15(int total_score15) {
		this.total_score15 = total_score15;
	}
	public int getTotal_score16() {
		return total_score16;
	}
	public void setTotal_score16(int total_score16) {
		this.total_score16 = total_score16;
	}
	public String getCourse_name() {
		return course_name;
	}
	public void setCourse_name(String course_name) {
		this.course_name = course_name;
	}
	public String getStudent_name() {
		return student_name;
	}
	public void setStudent_name(String student_name) {
		this.student_name = student_name;
	}
	public int getPractice_result_id1() {
		return practice_result_id1;
	}
	public void setPractice_result_id1(int practice_result_id1) {
		this.practice_result_id1 = practice_result_id1;
	}
	public int getPractice_result_id2() {
		return practice_result_id2;
	}
	public void setPractice_result_id2(int practice_result_id2) {
		this.practice_result_id2 = practice_result_id2;
	}
	public int getPractice_result_id3() {
		return practice_result_id3;
	}
	public void setPractice_result_id3(int practice_result_id3) {
		this.practice_result_id3 = practice_result_id3;
	}
	public int getPractice_result_id4() {
		return practice_result_id4;
	}
	public void setPractice_result_id4(int practice_result_id4) {
		this.practice_result_id4 = practice_result_id4;
	}
	public int getPractice_result_id5() {
		return practice_result_id5;
	}
	public void setPractice_result_id5(int practice_result_id5) {
		this.practice_result_id5 = practice_result_id5;
	}
	public int getPractice_result_id6() {
		return practice_result_id6;
	}
	public void setPractice_result_id6(int practice_result_id6) {
		this.practice_result_id6 = practice_result_id6;
	}
	public int getPractice_result_id7() {
		return practice_result_id7;
	}
	public void setPractice_result_id7(int practice_result_id7) {
		this.practice_result_id7 = practice_result_id7;
	}
	public int getPractice_result_id8() {
		return practice_result_id8;
	}
	public void setPractice_result_id8(int practice_result_id8) {
		this.practice_result_id8 = practice_result_id8;
	}
	public int getPractice_result_id9() {
		return practice_result_id9;
	}
	public void setPractice_result_id9(int practice_result_id9) {
		this.practice_result_id9 = practice_result_id9;
	}
	public int getPractice_result_id10() {
		return practice_result_id10;
	}
	public void setPractice_result_id10(int practice_result_id10) {
		this.practice_result_id10 = practice_result_id10;
	}
	public int getPractice_result_id11() {
		return practice_result_id11;
	}
	public void setPractice_result_id11(int practice_result_id11) {
		this.practice_result_id11 = practice_result_id11;
	}
	public int getPractice_result_id12() {
		return practice_result_id12;
	}
	public void setPractice_result_id12(int practice_result_id12) {
		this.practice_result_id12 = practice_result_id12;
	}
	public int getPractice_result_id13() {
		return practice_result_id13;
	}
	public void setPractice_result_id13(int practice_result_id13) {
		this.practice_result_id13 = practice_result_id13;
	}
	public int getPractice_result_id14() {
		return practice_result_id14;
	}
	public void setPractice_result_id14(int practice_result_id14) {
		this.practice_result_id14 = practice_result_id14;
	}
	public int getPractice_result_id15() {
		return practice_result_id15;
	}
	public void setPractice_result_id15(int practice_result_id15) {
		this.practice_result_id15 = practice_result_id15;
	}
	public String getPractice_name() {
		return practice_name;
	}
	public void setPractice_name(String practice_name) {
		this.practice_name = practice_name;
	}
	public int getCourse_id() {
		return course_id;
	}
	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}
	public String getGroup() {
		return group;
	}
	public void setGroup(String group) {
		this.group = group;
	}
	public int getStart_paragraph() {
		return start_paragraph;
	}
	public void setStart_paragraph(int start_paragraph) {
		this.start_paragraph = start_paragraph;
	}
	public int getEnd_paragraph() {
		return end_paragraph;
	}
	public void setEnd_paragraph(int end_paragraph) {
		this.end_paragraph = end_paragraph;
	}
	public String getAttendance_reason_type() {
		return attendance_reason_type;
	}
	public void setAttendance_reason_type(String attendance_reason_type) {
		this.attendance_reason_type = attendance_reason_type;
	}
	public String getTimem() {
		return timem;
	}
	public void setTimem(String timem) {
		this.timem = timem;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getStudent_pen_yn() {
		return student_pen_yn;
	}
	public void setStudent_pen_yn(String student_pen_yn) {
		this.student_pen_yn = student_pen_yn;
	}
	public String getAnswer_rublic_yn() {
		return answer_rublic_yn;
	}
	public void setAnswer_rublic_yn(String answer_rublic_yn) {
		this.answer_rublic_yn = answer_rublic_yn;
	}
	public String getAnswer_pen_yn() {
		return answer_pen_yn;
	}
	public void setAnswer_pen_yn(String answer_pen_yn) {
		this.answer_pen_yn = answer_pen_yn;
	}
	public String getAnswer_spk_yn() {
		return answer_spk_yn;
	}
	public void setAnswer_spk_yn(String answer_spk_yn) {
		this.answer_spk_yn = answer_spk_yn;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public String getUseranswer() {
		return useranswer;
	}
	public void setUseranswer(String useranswer) {
		this.useranswer = useranswer;
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
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
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
	public String getStudent_note_yn() {
		return student_note_yn;
	}
	public void setStudent_note_yn(String student_note_yn) {
		this.student_note_yn = student_note_yn;
	}
	
	
	
	
}