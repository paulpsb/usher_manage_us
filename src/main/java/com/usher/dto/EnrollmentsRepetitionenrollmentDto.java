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
public class EnrollmentsRepetitionenrollmentDto{
	private int id;
	private int semester_id;
	private int course_group_id;
	private int course_id;
	private String semester_name;
	private String course_group_name;
	private String course_name;
	private String status;
	
	private int user_id;
	private int student_id;
	private int course_enrollment_id;
	
	private String goal_score;
	private int goal_score_id;
	private String goal_score_name;
	private String goal_score_date;
	private String attend_start_date;
	private int attend_start_date_id;
	private String attend_start_date_name;
	private String attend_start_date_date;
	private String need_date;
	private int need_date_id;
	private String need_date_name;
	private String need_date_date;
	private String attend_date;
	private int attend_date_id;
	private String attend_date_name;
	private String attend_date_date;
	private String goal_repetition_advise;
	private int goal_repetition_advise_id;
	private String goal_repetition_advise_name;
	private String goal_repetition_advise_date;
	
	private String first_repetition_result;
	private int first_repetition_result_id;
	private String first_repetition_result_name;
	private String first_repetition_result_date;
	private String first_repetition_advise;
	private int first_repetition_advise_id;
	private String first_repetition_advise_name;
	private String first_repetition_advise_date;
	
	private String second_repetition_result;
	private int second_repetition_result_id;
	private String second_repetition_result_name;
	private String second_repetition_result_date;
	private String second_repetition_advise;
	private int second_repetition_advise_id;
	private String second_repetition_advise_name;
	private String second_repetition_advise_date;

	private String third_student_repetition_result;
	private String third_student_repetition_result_desc;
	private String third_student_repetition_reason;
	private String third_student_repetition_reason_desc;
	private String third_student_repetition_course;
	private String third_student_repetition_due_date;
	private String third_student_repetition_date;

	private String third_repetition_result;
	private int third_repetition_result_id;
	private String third_repetition_result_name;
	private String third_repetition_result_date;
	private String third_repetition_result_due_date;
	private String third_repetition_advise;
	private int third_repetition_advise_id;
	private String third_repetition_advise_name;
	private String third_repetition_advise_date;
	
	private String unregistered_reason;
	private int unregistered_reason_id;
	private String unregistered_reason_name;
	private String unregistered_reason_date;
	
	private String prev_semester_date;
	private String semester_date;
	private String complete_repetition_result;
	
	private String semester_in_data;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCourse_id() {
		return course_id;
	}
	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public int getCourse_enrollment_id() {
		return course_enrollment_id;
	}
	public void setCourse_enrollment_id(int course_enrollment_id) {
		this.course_enrollment_id = course_enrollment_id;
	}
	public String getGoal_score() {
		return goal_score;
	}
	public void setGoal_score(String goal_score) {
		this.goal_score = goal_score;
	}
	public int getGoal_score_id() {
		return goal_score_id;
	}
	public void setGoal_score_id(int goal_score_id) {
		this.goal_score_id = goal_score_id;
	}
	public String getGoal_score_name() {
		return goal_score_name;
	}
	public void setGoal_score_name(String goal_score_name) {
		this.goal_score_name = goal_score_name;
	}
	public String getGoal_score_date() {
		return goal_score_date;
	}
	public void setGoal_score_date(String goal_score_date) {
		this.goal_score_date = goal_score_date;
	}
	public String getAttend_start_date() {
		return attend_start_date;
	}
	public void setAttend_start_date(String attend_start_date) {
		this.attend_start_date = attend_start_date;
	}
	public int getAttend_start_date_id() {
		return attend_start_date_id;
	}
	public void setAttend_start_date_id(int attend_start_date_id) {
		this.attend_start_date_id = attend_start_date_id;
	}
	public String getAttend_start_date_name() {
		return attend_start_date_name;
	}
	public void setAttend_start_date_name(String attend_start_date_name) {
		this.attend_start_date_name = attend_start_date_name;
	}
	public String getAttend_start_date_date() {
		return attend_start_date_date;
	}
	public void setAttend_start_date_date(String attend_start_date_date) {
		this.attend_start_date_date = attend_start_date_date;
	}
	public String getNeed_date() {
		return need_date;
	}
	public void setNeed_date(String need_date) {
		this.need_date = need_date;
	}
	public int getNeed_date_id() {
		return need_date_id;
	}
	public void setNeed_date_id(int need_date_id) {
		this.need_date_id = need_date_id;
	}
	public String getNeed_date_name() {
		return need_date_name;
	}
	public void setNeed_date_name(String need_date_name) {
		this.need_date_name = need_date_name;
	}
	public String getNeed_date_date() {
		return need_date_date;
	}
	public void setNeed_date_date(String need_date_date) {
		this.need_date_date = need_date_date;
	}
	public String getAttend_date() {
		return attend_date;
	}
	public void setAttend_date(String attend_date) {
		this.attend_date = attend_date;
	}
	public int getAttend_date_id() {
		return attend_date_id;
	}
	public void setAttend_date_id(int attend_date_id) {
		this.attend_date_id = attend_date_id;
	}
	public String getAttend_date_name() {
		return attend_date_name;
	}
	public void setAttend_date_name(String attend_date_name) {
		this.attend_date_name = attend_date_name;
	}
	public String getAttend_date_date() {
		return attend_date_date;
	}
	public void setAttend_date_date(String attend_date_date) {
		this.attend_date_date = attend_date_date;
	}
	public String getGoal_repetition_advise() {
		return goal_repetition_advise;
	}
	public void setGoal_repetition_advise(String goal_repetition_advise) {
		this.goal_repetition_advise = goal_repetition_advise;
	}
	public int getGoal_repetition_advise_id() {
		return goal_repetition_advise_id;
	}
	public void setGoal_repetition_advise_id(int goal_repetition_advise_id) {
		this.goal_repetition_advise_id = goal_repetition_advise_id;
	}
	public String getGoal_repetition_advise_name() {
		return goal_repetition_advise_name;
	}
	public void setGoal_repetition_advise_name(String goal_repetition_advise_name) {
		this.goal_repetition_advise_name = goal_repetition_advise_name;
	}
	public String getGoal_repetition_advise_date() {
		return goal_repetition_advise_date;
	}
	public void setGoal_repetition_advise_date(String goal_repetition_advise_date) {
		this.goal_repetition_advise_date = goal_repetition_advise_date;
	}
	public String getFirst_repetition_result() {
		return first_repetition_result;
	}
	public void setFirst_repetition_result(String first_repetition_result) {
		this.first_repetition_result = first_repetition_result;
	}
	public int getFirst_repetition_result_id() {
		return first_repetition_result_id;
	}
	public void setFirst_repetition_result_id(int first_repetition_result_id) {
		this.first_repetition_result_id = first_repetition_result_id;
	}
	public String getFirst_repetition_result_name() {
		return first_repetition_result_name;
	}
	public void setFirst_repetition_result_name(String first_repetition_result_name) {
		this.first_repetition_result_name = first_repetition_result_name;
	}
	public String getFirst_repetition_result_date() {
		return first_repetition_result_date;
	}
	public void setFirst_repetition_result_date(String first_repetition_result_date) {
		this.first_repetition_result_date = first_repetition_result_date;
	}
	public String getSecond_repetition_result() {
		return second_repetition_result;
	}
	public void setSecond_repetition_result(String second_repetition_result) {
		this.second_repetition_result = second_repetition_result;
	}
	public int getSecond_repetition_result_id() {
		return second_repetition_result_id;
	}
	public void setSecond_repetition_result_id(int second_repetition_result_id) {
		this.second_repetition_result_id = second_repetition_result_id;
	}
	public String getSecond_repetition_result_name() {
		return second_repetition_result_name;
	}
	public void setSecond_repetition_result_name(String second_repetition_result_name) {
		this.second_repetition_result_name = second_repetition_result_name;
	}
	public String getSecond_repetition_result_date() {
		return second_repetition_result_date;
	}
	public void setSecond_repetition_result_date(String second_repetition_result_date) {
		this.second_repetition_result_date = second_repetition_result_date;
	}
	public String getSecond_repetition_advise() {
		return second_repetition_advise;
	}
	public void setSecond_repetition_advise(String second_repetition_advise) {
		this.second_repetition_advise = second_repetition_advise;
	}
	public int getSecond_repetition_advise_id() {
		return second_repetition_advise_id;
	}
	public void setSecond_repetition_advise_id(int second_repetition_advise_id) {
		this.second_repetition_advise_id = second_repetition_advise_id;
	}
	public String getSecond_repetition_advise_name() {
		return second_repetition_advise_name;
	}
	public void setSecond_repetition_advise_name(String second_repetition_advise_name) {
		this.second_repetition_advise_name = second_repetition_advise_name;
	}
	public String getSecond_repetition_advise_date() {
		return second_repetition_advise_date;
	}
	public void setSecond_repetition_advise_date(String second_repetition_advise_date) {
		this.second_repetition_advise_date = second_repetition_advise_date;
	}
	public String getThird_student_repetition_result() {
		return third_student_repetition_result;
	}
	public void setThird_student_repetition_result(String third_student_repetition_result) {
		this.third_student_repetition_result = third_student_repetition_result;
	}
	public String getThird_student_repetition_result_desc() {
		return third_student_repetition_result_desc;
	}
	public void setThird_student_repetition_result_desc(String third_student_repetition_result_desc) {
		this.third_student_repetition_result_desc = third_student_repetition_result_desc;
	}
	public String getThird_student_repetition_reason() {
		return third_student_repetition_reason;
	}
	public void setThird_student_repetition_reason(String third_student_repetition_reason) {
		this.third_student_repetition_reason = third_student_repetition_reason;
	}
	public String getThird_student_repetition_reason_desc() {
		return third_student_repetition_reason_desc;
	}
	public void setThird_student_repetition_reason_desc(String third_student_repetition_reason_desc) {
		this.third_student_repetition_reason_desc = third_student_repetition_reason_desc;
	}
	public String getThird_student_repetition_course() {
		return third_student_repetition_course;
	}
	public void setThird_student_repetition_course(String third_student_repetition_course) {
		this.third_student_repetition_course = third_student_repetition_course;
	}
	public String getThird_student_repetition_due_date() {
		return third_student_repetition_due_date;
	}
	public void setThird_student_repetition_due_date(String third_student_repetition_due_date) {
		this.third_student_repetition_due_date = third_student_repetition_due_date;
	}
	public String getThird_student_repetition_date() {
		return third_student_repetition_date;
	}
	public void setThird_student_repetition_date(String third_student_repetition_date) {
		this.third_student_repetition_date = third_student_repetition_date;
	}
	public String getThird_repetition_result() {
		return third_repetition_result;
	}
	public void setThird_repetition_result(String third_repetition_result) {
		this.third_repetition_result = third_repetition_result;
	}
	public int getThird_repetition_result_id() {
		return third_repetition_result_id;
	}
	public void setThird_repetition_result_id(int third_repetition_result_id) {
		this.third_repetition_result_id = third_repetition_result_id;
	}
	public String getThird_repetition_result_name() {
		return third_repetition_result_name;
	}
	public void setThird_repetition_result_name(String third_repetition_result_name) {
		this.third_repetition_result_name = third_repetition_result_name;
	}
	public String getThird_repetition_result_date() {
		return third_repetition_result_date;
	}
	public void setThird_repetition_result_date(String third_repetition_result_date) {
		this.third_repetition_result_date = third_repetition_result_date;
	}
	public String getThird_repetition_advise() {
		return third_repetition_advise;
	}
	public void setThird_repetition_advise(String third_repetition_advise) {
		this.third_repetition_advise = third_repetition_advise;
	}
	public int getThird_repetition_advise_id() {
		return third_repetition_advise_id;
	}
	public void setThird_repetition_advise_id(int third_repetition_advise_id) {
		this.third_repetition_advise_id = third_repetition_advise_id;
	}
	public String getThird_repetition_advise_name() {
		return third_repetition_advise_name;
	}
	public void setThird_repetition_advise_name(String third_repetition_advise_name) {
		this.third_repetition_advise_name = third_repetition_advise_name;
	}
	public String getThird_repetition_advise_date() {
		return third_repetition_advise_date;
	}
	public void setThird_repetition_advise_date(String third_repetition_advise_date) {
		this.third_repetition_advise_date = third_repetition_advise_date;
	}
	public String getUnregistered_reason() {
		return unregistered_reason;
	}
	public void setUnregistered_reason(String unregistered_reason) {
		this.unregistered_reason = unregistered_reason;
	}
	public int getUnregistered_reason_id() {
		return unregistered_reason_id;
	}
	public void setUnregistered_reason_id(int unregistered_reason_id) {
		this.unregistered_reason_id = unregistered_reason_id;
	}
	public String getUnregistered_reason_name() {
		return unregistered_reason_name;
	}
	public void setUnregistered_reason_name(String unregistered_reason_name) {
		this.unregistered_reason_name = unregistered_reason_name;
	}
	public String getUnregistered_reason_date() {
		return unregistered_reason_date;
	}
	public void setUnregistered_reason_date(String unregistered_reason_date) {
		this.unregistered_reason_date = unregistered_reason_date;
	}
	public String getSemester_date() {
		return semester_date;
	}
	public void setSemester_date(String semester_date) {
		this.semester_date = semester_date;
	}
	public String getComplete_repetition_result() {
		return complete_repetition_result;
	}
	public void setComplete_repetition_result(String complete_repetition_result) {
		this.complete_repetition_result = complete_repetition_result;
	}
	public int getCourse_group_id() {
		return course_group_id;
	}
	public void setCourse_group_id(int course_group_id) {
		this.course_group_id = course_group_id;
	}
	public String getFirst_repetition_advise() {
		return first_repetition_advise;
	}
	public void setFirst_repetition_advise(String first_repetition_advise) {
		this.first_repetition_advise = first_repetition_advise;
	}
	public int getFirst_repetition_advise_id() {
		return first_repetition_advise_id;
	}
	public void setFirst_repetition_advise_id(int first_repetition_advise_id) {
		this.first_repetition_advise_id = first_repetition_advise_id;
	}
	public String getFirst_repetition_advise_name() {
		return first_repetition_advise_name;
	}
	public void setFirst_repetition_advise_name(String first_repetition_advise_name) {
		this.first_repetition_advise_name = first_repetition_advise_name;
	}
	public String getFirst_repetition_advise_date() {
		return first_repetition_advise_date;
	}
	public void setFirst_repetition_advise_date(String first_repetition_advise_date) {
		this.first_repetition_advise_date = first_repetition_advise_date;
	}
	public String getPrev_semester_date() {
		return prev_semester_date;
	}
	public void setPrev_semester_date(String prev_semester_date) {
		this.prev_semester_date = prev_semester_date;
	}
	public int getStudent_id() {
		return student_id;
	}
	public void setStudent_id(int student_id) {
		this.student_id = student_id;
	}
	public int getSemester_id() {
		return semester_id;
	}
	public void setSemester_id(int semester_id) {
		this.semester_id = semester_id;
	}
	public String getSemester_name() {
		return semester_name;
	}
	public void setSemester_name(String semester_name) {
		this.semester_name = semester_name;
	}
	public String getCourse_group_name() {
		return course_group_name;
	}
	public void setCourse_group_name(String course_group_name) {
		this.course_group_name = course_group_name;
	}
	public String getCourse_name() {
		return course_name;
	}
	public void setCourse_name(String course_name) {
		this.course_name = course_name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getThird_repetition_result_due_date() {
		return third_repetition_result_due_date;
	}
	public void setThird_repetition_result_due_date(String third_repetition_result_due_date) {
		this.third_repetition_result_due_date = third_repetition_result_due_date;
	}
	public String getSemester_in_data() {
		return semester_in_data;
	}
	public void setSemester_in_data(String semester_in_data) {
		this.semester_in_data = semester_in_data;
	}
	
	
	
	
}