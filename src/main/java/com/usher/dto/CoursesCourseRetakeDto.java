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
public class CoursesCourseRetakeDto{
	private int course_group_id;
	private int course_id;
	private String semester_date;
	private int user_id;
	private int course_enrollment_id;
	private String test_type;
	private String student_type;
	private String lecture_type;
	private String status;
	private String course_group_name;
	private String course_name;
	private String start_date;
	private String end_date;
	private String days;
	private int difficulty;
	private int inner_difficulty;
	private String last_name;
	private String first_name;
	private String repetition_result;
	private String repetition_desc;
	private String repetition_date;
	private String refund_status;
	private String refund_reason;
	
	private String instructor_name;
	private String manager_name;	
	
	public String getSemester_date() {
		return semester_date;
	}
	public void setSemester_date(String semester_date) {
		this.semester_date = semester_date;
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
	public String getStart_date() {
		return start_date;
	}
	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}
	public String getEnd_date() {
		return end_date;
	}
	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}
	public String getDays() {
		return days;
	}
	public void setDays(String days) {
		this.days = days;
	}
	public int getDifficulty() {
		return difficulty;
	}
	public void setDifficulty(int difficulty) {
		this.difficulty = difficulty;
	}
	public int getInner_difficulty() {
		return inner_difficulty;
	}
	public void setInner_difficulty(int inner_difficulty) {
		this.inner_difficulty = inner_difficulty;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getRepetition_result() {
		return repetition_result;
	}
	public void setRepetition_result(String repetition_result) {
		this.repetition_result = repetition_result;
	}
	public String getRepetition_desc() {
		return repetition_desc;
	}
	public void setRepetition_desc(String repetition_desc) {
		this.repetition_desc = repetition_desc;
	}
	public String getRepetition_date() {
		return repetition_date;
	}
	public void setRepetition_date(String repetition_date) {
		this.repetition_date = repetition_date;
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
	public String getTest_type() {
		return test_type;
	}
	public void setTest_type(String test_type) {
		this.test_type = test_type;
	}
	public String getStudent_type() {
		return student_type;
	}
	public void setStudent_type(String student_type) {
		this.student_type = student_type;
	}
	public String getLecture_type() {
		return lecture_type;
	}
	public void setLecture_type(String lecture_type) {
		this.lecture_type = lecture_type;
	}
	public int getCourse_group_id() {
		return course_group_id;
	}
	public void setCourse_group_id(int course_group_id) {
		this.course_group_id = course_group_id;
	}
	public int getCourse_id() {
		return course_id;
	}
	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}
	public String getInstructor_name() {
		return instructor_name;
	}
	public void setInstructor_name(String instructor_name) {
		this.instructor_name = instructor_name;
	}
	public String getManager_name() {
		return manager_name;
	}
	public void setManager_name(String manager_name) {
		this.manager_name = manager_name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
}