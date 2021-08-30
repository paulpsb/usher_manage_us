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
public class NoticesNewStudentDetailDto{
	private int id;
	private int course_enrollment_id;
	private int user_id;
	private String student_name;
	private String student_level;
	private String check_orientation;
	private String training_desc;
	private boolean is_training_desc;
	private int notice_new_student_id;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCourse_enrollment_id() {
		return course_enrollment_id;
	}
	public void setCourse_enrollment_id(int course_enrollment_id) {
		this.course_enrollment_id = course_enrollment_id;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getStudent_name() {
		return student_name;
	}
	public void setStudent_name(String student_name) {
		this.student_name = student_name;
	}
	public String getStudent_level() {
		return student_level;
	}
	public void setStudent_level(String student_level) {
		this.student_level = student_level;
	}
	public String getCheck_orientation() {
		return check_orientation;
	}
	public void setCheck_orientation(String check_orientation) {
		this.check_orientation = check_orientation;
	}
	public String getTraining_desc() {
		return training_desc;
	}
	public void setTraining_desc(String training_desc) {
		this.training_desc = training_desc;
	}
	public boolean isIs_training_desc() {
		return is_training_desc;
	}
	public void setIs_training_desc(boolean is_training_desc) {
		this.is_training_desc = is_training_desc;
	}
	public int getNotice_new_student_id() {
		return notice_new_student_id;
	}
	public void setNotice_new_student_id(int notice_new_student_id) {
		this.notice_new_student_id = notice_new_student_id;
	}
	
	
}