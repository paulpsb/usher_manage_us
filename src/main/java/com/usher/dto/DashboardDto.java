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
public class DashboardDto{
	private int semester_id;
	private int student_id;
	private int course_id;
	private int semester_enrollment_id;
	private int course_group_id;
	private int course_enrollment_id;
	private String date;
	private String bef_date;
	private String bef_week_date;
	private String next_date;
	private String prev_date;
	private String name;
	private String status;
	private String current_new;
	private String next_new;
	private String current_status;
	private String refund_status;
	private String refund_reason;
	private String attend_status;
	private String reason_type;
	private String extra_reason;
	private String will_time;
	private String come_time;
	private String passage;
	
	private boolean pass_result;
	private boolean goal_plan;
	private boolean goal_achive;
	private boolean goal_confirmed;
	
	private String chamgang_yn;
	
	private int goal_not_count;
	
	private String section_short;
	private int section_all_count;
	
	private String section;
	private String practice_type;
	private String book;	
	private String volume;
	private String group;
	private String article;
	private int paragraph;
	
	private int section_order;
	private int section_all_not_count;
	private int section_cur_count;
	private int section_cur_not_count;
	private int section_next_count;
	private int section_next_not_count;

	private int total_count;
	private int success_count;
	
	private int total_prev_count;
	private int total_curr_count;
	private int total_rate;
	
	private String end_time;
	
	private String achieve_level;
	
	private String username;
	
	private String kakao_send_yn;
	
	public int getSemester_id() {
		return semester_id;
	}
	public void setSemester_id(int semester_id) {
		this.semester_id = semester_id;
	}
	public int getStudent_id() {
		return student_id;
	}
	public void setStudent_id(int student_id) {
		this.student_id = student_id;
	}
	public int getCourse_id() {
		return course_id;
	}
	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}
	public int getSemester_enrollment_id() {
		return semester_enrollment_id;
	}
	public void setSemester_enrollment_id(int semester_enrollment_id) {
		this.semester_enrollment_id = semester_enrollment_id;
	}
	public int getCourse_group_id() {
		return course_group_id;
	}
	public void setCourse_group_id(int course_group_id) {
		this.course_group_id = course_group_id;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getRefund_status() {
		return refund_status;
	}
	public void setRefund_status(String refund_status) {
		this.refund_status = refund_status;
	}
	public String getRefund_reason() {
		return refund_reason;
	}
	public void setRefund_reason(String refund_reason) {
		this.refund_reason = refund_reason;
	}
	public String getAttend_status() {
		return attend_status;
	}
	public void setAttend_status(String attend_status) {
		this.attend_status = attend_status;
	}
	public String getReason_type() {
		return reason_type;
	}
	public void setReason_type(String reason_type) {
		this.reason_type = reason_type;
	}
	public String getExtra_reason() {
		return extra_reason;
	}
	public void setExtra_reason(String extra_reason) {
		this.extra_reason = extra_reason;
	}
	public String getWill_time() {
		return will_time;
	}
	public void setWill_time(String will_time) {
		this.will_time = will_time;
	}
	public String getCome_time() {
		return come_time;
	}
	public void setCome_time(String come_time) {
		this.come_time = come_time;
	}
	public String getCurrent_status() {
		return current_status;
	}
	public void setCurrent_status(String current_status) {
		this.current_status = current_status;
	}
	public String getBook() {
		return book;
	}
	public void setBook(String book) {
		this.book = book;
	}
	public boolean isPass_result() {
		return pass_result;
	}
	public void setPass_result(boolean pass_result) {
		this.pass_result = pass_result;
	}
	public String getBef_date() {
		return bef_date;
	}
	public void setBef_date(String bef_date) {
		this.bef_date = bef_date;
	}
	public String getBef_week_date() {
		return bef_week_date;
	}
	public void setBef_week_date(String bef_week_date) {
		this.bef_week_date = bef_week_date;
	}
	public String getNext_date() {
		return next_date;
	}
	public void setNext_date(String next_date) {
		this.next_date = next_date;
	}
	public boolean isGoal_plan() {
		return goal_plan;
	}
	public void setGoal_plan(boolean goal_plan) {
		this.goal_plan = goal_plan;
	}
	public boolean isGoal_achive() {
		return goal_achive;
	}
	public void setGoal_achive(boolean goal_achive) {
		this.goal_achive = goal_achive;
	}
	public boolean isGoal_confirmed() {
		return goal_confirmed;
	}
	public void setGoal_confirmed(boolean goal_confirmed) {
		this.goal_confirmed = goal_confirmed;
	}
	public String getCurrent_new() {
		return current_new;
	}
	public void setCurrent_new(String current_new) {
		this.current_new = current_new;
	}
	public String getNext_new() {
		return next_new;
	}
	public void setNext_new(String next_new) {
		this.next_new = next_new;
	}
	public String getChamgang_yn() {
		return chamgang_yn;
	}
	public void setChamgang_yn(String chamgang_yn) {
		this.chamgang_yn = chamgang_yn;
	}
	public int getCourse_enrollment_id() {
		return course_enrollment_id;
	}
	public void setCourse_enrollment_id(int course_enrollment_id) {
		this.course_enrollment_id = course_enrollment_id;
	}
	public int getGoal_not_count() {
		return goal_not_count;
	}
	public void setGoal_not_count(int goal_not_count) {
		this.goal_not_count = goal_not_count;
	}
	public int getSection_all_count() {
		return section_all_count;
	}
	public void setSection_all_count(int section_all_count) {
		this.section_all_count = section_all_count;
	}
	public int getSection_all_not_count() {
		return section_all_not_count;
	}
	public void setSection_all_not_count(int section_all_not_count) {
		this.section_all_not_count = section_all_not_count;
	}
	public int getSection_cur_count() {
		return section_cur_count;
	}
	public void setSection_cur_count(int section_cur_count) {
		this.section_cur_count = section_cur_count;
	}
	public int getSection_cur_not_count() {
		return section_cur_not_count;
	}
	public void setSection_cur_not_count(int section_cur_not_count) {
		this.section_cur_not_count = section_cur_not_count;
	}
	public int getSection_next_count() {
		return section_next_count;
	}
	public void setSection_next_count(int section_next_count) {
		this.section_next_count = section_next_count;
	}
	public int getSection_next_not_count() {
		return section_next_not_count;
	}
	public void setSection_next_not_count(int section_next_not_count) {
		this.section_next_not_count = section_next_not_count;
	}
	public String getSection_short() {
		return section_short;
	}
	public void setSection_short(String section_short) {
		this.section_short = section_short;
	}
	public int getSection_order() {
		return section_order;
	}
	public void setSection_order(int section_order) {
		this.section_order = section_order;
	}
	public String getPassage() {
		return passage;
	}
	public void setPassage(String passage) {
		this.passage = passage;
	}
	public int getTotal_count() {
		return total_count;
	}
	public void setTotal_count(int total_count) {
		this.total_count = total_count;
	}
	public int getSuccess_count() {
		return success_count;
	}
	public void setSuccess_count(int success_count) {
		this.success_count = success_count;
	}
	public String getEnd_time() {
		return end_time;
	}
	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}
	public String getSection() {
		return section;
	}
	public void setSection(String section) {
		this.section = section;
	}
	public String getPrev_date() {
		return prev_date;
	}
	public void setPrev_date(String prev_date) {
		this.prev_date = prev_date;
	}
	public int getTotal_prev_count() {
		return total_prev_count;
	}
	public void setTotal_prev_count(int total_prev_count) {
		this.total_prev_count = total_prev_count;
	}
	public int getTotal_curr_count() {
		return total_curr_count;
	}
	public void setTotal_curr_count(int total_curr_count) {
		this.total_curr_count = total_curr_count;
	}
	public int getTotal_rate() {
		return total_rate;
	}
	public void setTotal_rate(int total_rate) {
		this.total_rate = total_rate;
	}
	public String getAchieve_level() {
		return achieve_level;
	}
	public void setAchieve_level(String achieve_level) {
		this.achieve_level = achieve_level;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPractice_type() {
		return practice_type;
	}
	public void setPractice_type(String practice_type) {
		this.practice_type = practice_type;
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
	public int getParagraph() {
		return paragraph;
	}
	public void setParagraph(int paragraph) {
		this.paragraph = paragraph;
	}
	public String getKakao_send_yn() {
		return kakao_send_yn;
	}
	public void setKakao_send_yn(String kakao_send_yn) {
		this.kakao_send_yn = kakao_send_yn;
	}
	
	
}