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
public class CoursesCourseStatsDto{
	private int semester_start_id;
	private int semester_end_id;
	
	private int id;
	private int semester_id;
	private String semester_date;
	private int course_group_id;
	private String course_group_name;
	private int course_id;
	private String course_name;
	private String test_type;
	private String student_type;
	private String lecture_type;
	private String days;
	private int difficulty;
	private int inner_difficulty;
	private int course_teacher_id;
	private String course_teacher_name;
	private int course_manage_id;
	private String course_manage_name;
	private int repeat_class_count;
	private int repeat_class_total_count;
	private int attendance_count;
	private int attendance_total_count;
	private int exam_voca_class_id;
	private String exam_voca_class_name;
	private int exam_voca_study_id;
	private String exam_voca_study_name;
	private int exam_voca_pass_count;
	private int exam_voca_total_count;
	private int exam_gr_class_id;
	private String exam_gr_class_name;
	private int exam_gr_study_id;
	private String exam_gr_study_name;
	private int exam_gr_pass_count;
	private int exam_gr_total_count;
	private int exam_rc_class_id;
	private String exam_rc_class_name;
	private int exam_rc_study_id;
	private String exam_rc_study_name;
	private int exam_rc_pass_count;
	private int exam_rc_total_count;
	private int exam_lc_class_id;
	private String exam_lc_class_name;
	private int exam_lc_study_id;
	private String exam_lc_study_name;
	private int exam_lc_pass_count;
	private int exam_lc_total_count;
	private int exam_sp_class_id;
	private String exam_sp_class_name;
	private int exam_sp_study_id;
	private String exam_sp_study_name;
	private int exam_sp_pass_count;
	private int exam_sp_total_count;
	private int exam_wr_class_id;
	private String exam_wr_class_name;
	private int exam_wr_study_id;
	private String exam_wr_study_name;
	private int exam_wr_pass_count;
	private int exam_wr_total_count;
	
	public int getSemester_id() {
		return semester_id;
	}
	public void setSemester_id(int semester_id) {
		this.semester_id = semester_id;
	}
	public String getSemester_date() {
		return semester_date;
	}
	public void setSemester_date(String semester_date) {
		this.semester_date = semester_date;
	}
	public int getCourse_group_id() {
		return course_group_id;
	}
	public void setCourse_group_id(int course_group_id) {
		this.course_group_id = course_group_id;
	}
	public String getCourse_group_name() {
		return course_group_name;
	}
	public void setCourse_group_name(String course_group_name) {
		this.course_group_name = course_group_name;
	}
	public int getCourse_id() {
		return course_id;
	}
	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}
	public String getCourse_name() {
		return course_name;
	}
	public void setCourse_name(String course_name) {
		this.course_name = course_name;
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
	public int getCourse_teacher_id() {
		return course_teacher_id;
	}
	public void setCourse_teacher_id(int course_teacher_id) {
		this.course_teacher_id = course_teacher_id;
	}
	public String getCourse_teacher_name() {
		return course_teacher_name;
	}
	public void setCourse_teacher_name(String course_teacher_name) {
		this.course_teacher_name = course_teacher_name;
	}
	public int getCourse_manage_id() {
		return course_manage_id;
	}
	public void setCourse_manage_id(int course_manage_id) {
		this.course_manage_id = course_manage_id;
	}
	public String getCourse_manage_name() {
		return course_manage_name;
	}
	public void setCourse_manage_name(String course_manage_name) {
		this.course_manage_name = course_manage_name;
	}
	public int getRepeat_class_count() {
		return repeat_class_count;
	}
	public void setRepeat_class_count(int repeat_class_count) {
		this.repeat_class_count = repeat_class_count;
	}
	public int getRepeat_class_total_count() {
		return repeat_class_total_count;
	}
	public void setRepeat_class_total_count(int repeat_class_total_count) {
		this.repeat_class_total_count = repeat_class_total_count;
	}
	public int getAttendance_count() {
		return attendance_count;
	}
	public void setAttendance_count(int attendance_count) {
		this.attendance_count = attendance_count;
	}
	public int getAttendance_total_count() {
		return attendance_total_count;
	}
	public void setAttendance_total_count(int attendance_total_count) {
		this.attendance_total_count = attendance_total_count;
	}
	public int getExam_voca_class_id() {
		return exam_voca_class_id;
	}
	public void setExam_voca_class_id(int exam_voca_class_id) {
		this.exam_voca_class_id = exam_voca_class_id;
	}
	public String getExam_voca_class_name() {
		return exam_voca_class_name;
	}
	public void setExam_voca_class_name(String exam_voca_class_name) {
		this.exam_voca_class_name = exam_voca_class_name;
	}
	public int getExam_voca_study_id() {
		return exam_voca_study_id;
	}
	public void setExam_voca_study_id(int exam_voca_study_id) {
		this.exam_voca_study_id = exam_voca_study_id;
	}
	public String getExam_voca_study_name() {
		return exam_voca_study_name;
	}
	public void setExam_voca_study_name(String exam_voca_study_name) {
		this.exam_voca_study_name = exam_voca_study_name;
	}
	public int getExam_voca_pass_count() {
		return exam_voca_pass_count;
	}
	public void setExam_voca_pass_count(int exam_voca_pass_count) {
		this.exam_voca_pass_count = exam_voca_pass_count;
	}
	public int getExam_voca_total_count() {
		return exam_voca_total_count;
	}
	public void setExam_voca_total_count(int exam_voca_total_count) {
		this.exam_voca_total_count = exam_voca_total_count;
	}
	public int getExam_gr_class_id() {
		return exam_gr_class_id;
	}
	public void setExam_gr_class_id(int exam_gr_class_id) {
		this.exam_gr_class_id = exam_gr_class_id;
	}
	public String getExam_gr_class_name() {
		return exam_gr_class_name;
	}
	public void setExam_gr_class_name(String exam_gr_class_name) {
		this.exam_gr_class_name = exam_gr_class_name;
	}
	public int getExam_gr_study_id() {
		return exam_gr_study_id;
	}
	public void setExam_gr_study_id(int exam_gr_study_id) {
		this.exam_gr_study_id = exam_gr_study_id;
	}
	public String getExam_gr_study_name() {
		return exam_gr_study_name;
	}
	public void setExam_gr_study_name(String exam_gr_study_name) {
		this.exam_gr_study_name = exam_gr_study_name;
	}
	public int getExam_gr_pass_count() {
		return exam_gr_pass_count;
	}
	public void setExam_gr_pass_count(int exam_gr_pass_count) {
		this.exam_gr_pass_count = exam_gr_pass_count;
	}
	public int getExam_gr_total_count() {
		return exam_gr_total_count;
	}
	public void setExam_gr_total_count(int exam_gr_total_count) {
		this.exam_gr_total_count = exam_gr_total_count;
	}
	public int getExam_rc_class_id() {
		return exam_rc_class_id;
	}
	public void setExam_rc_class_id(int exam_rc_class_id) {
		this.exam_rc_class_id = exam_rc_class_id;
	}
	public String getExam_rc_class_name() {
		return exam_rc_class_name;
	}
	public void setExam_rc_class_name(String exam_rc_class_name) {
		this.exam_rc_class_name = exam_rc_class_name;
	}
	public int getExam_rc_study_id() {
		return exam_rc_study_id;
	}
	public void setExam_rc_study_id(int exam_rc_study_id) {
		this.exam_rc_study_id = exam_rc_study_id;
	}
	public String getExam_rc_study_name() {
		return exam_rc_study_name;
	}
	public void setExam_rc_study_name(String exam_rc_study_name) {
		this.exam_rc_study_name = exam_rc_study_name;
	}
	public int getExam_rc_pass_count() {
		return exam_rc_pass_count;
	}
	public void setExam_rc_pass_count(int exam_rc_pass_count) {
		this.exam_rc_pass_count = exam_rc_pass_count;
	}
	public int getExam_rc_total_count() {
		return exam_rc_total_count;
	}
	public void setExam_rc_total_count(int exam_rc_total_count) {
		this.exam_rc_total_count = exam_rc_total_count;
	}
	public int getExam_lc_class_id() {
		return exam_lc_class_id;
	}
	public void setExam_lc_class_id(int exam_lc_class_id) {
		this.exam_lc_class_id = exam_lc_class_id;
	}
	public String getExam_lc_class_name() {
		return exam_lc_class_name;
	}
	public void setExam_lc_class_name(String exam_lc_class_name) {
		this.exam_lc_class_name = exam_lc_class_name;
	}
	public int getExam_lc_study_id() {
		return exam_lc_study_id;
	}
	public void setExam_lc_study_id(int exam_lc_study_id) {
		this.exam_lc_study_id = exam_lc_study_id;
	}
	public String getExam_lc_study_name() {
		return exam_lc_study_name;
	}
	public void setExam_lc_study_name(String exam_lc_study_name) {
		this.exam_lc_study_name = exam_lc_study_name;
	}
	public int getExam_lc_pass_count() {
		return exam_lc_pass_count;
	}
	public void setExam_lc_pass_count(int exam_lc_pass_count) {
		this.exam_lc_pass_count = exam_lc_pass_count;
	}
	public int getExam_lc_total_count() {
		return exam_lc_total_count;
	}
	public void setExam_lc_total_count(int exam_lc_total_count) {
		this.exam_lc_total_count = exam_lc_total_count;
	}
	public int getExam_sp_class_id() {
		return exam_sp_class_id;
	}
	public void setExam_sp_class_id(int exam_sp_class_id) {
		this.exam_sp_class_id = exam_sp_class_id;
	}
	public String getExam_sp_class_name() {
		return exam_sp_class_name;
	}
	public void setExam_sp_class_name(String exam_sp_class_name) {
		this.exam_sp_class_name = exam_sp_class_name;
	}
	public int getExam_sp_study_id() {
		return exam_sp_study_id;
	}
	public void setExam_sp_study_id(int exam_sp_study_id) {
		this.exam_sp_study_id = exam_sp_study_id;
	}
	public String getExam_sp_study_name() {
		return exam_sp_study_name;
	}
	public void setExam_sp_study_name(String exam_sp_study_name) {
		this.exam_sp_study_name = exam_sp_study_name;
	}
	public int getExam_sp_pass_count() {
		return exam_sp_pass_count;
	}
	public void setExam_sp_pass_count(int exam_sp_pass_count) {
		this.exam_sp_pass_count = exam_sp_pass_count;
	}
	public int getExam_sp_total_count() {
		return exam_sp_total_count;
	}
	public void setExam_sp_total_count(int exam_sp_total_count) {
		this.exam_sp_total_count = exam_sp_total_count;
	}
	public int getExam_wr_class_id() {
		return exam_wr_class_id;
	}
	public void setExam_wr_class_id(int exam_wr_class_id) {
		this.exam_wr_class_id = exam_wr_class_id;
	}
	public String getExam_wr_class_name() {
		return exam_wr_class_name;
	}
	public void setExam_wr_class_name(String exam_wr_class_name) {
		this.exam_wr_class_name = exam_wr_class_name;
	}
	public int getExam_wr_study_id() {
		return exam_wr_study_id;
	}
	public void setExam_wr_study_id(int exam_wr_study_id) {
		this.exam_wr_study_id = exam_wr_study_id;
	}
	public String getExam_wr_study_name() {
		return exam_wr_study_name;
	}
	public void setExam_wr_study_name(String exam_wr_study_name) {
		this.exam_wr_study_name = exam_wr_study_name;
	}
	public int getExam_wr_pass_count() {
		return exam_wr_pass_count;
	}
	public void setExam_wr_pass_count(int exam_wr_pass_count) {
		this.exam_wr_pass_count = exam_wr_pass_count;
	}
	public int getExam_wr_total_count() {
		return exam_wr_total_count;
	}
	public void setExam_wr_total_count(int exam_wr_total_count) {
		this.exam_wr_total_count = exam_wr_total_count;
	}
	public int getSemester_start_id() {
		return semester_start_id;
	}
	public void setSemester_start_id(int semester_start_id) {
		this.semester_start_id = semester_start_id;
	}
	public int getSemester_end_id() {
		return semester_end_id;
	}
	public void setSemester_end_id(int semester_end_id) {
		this.semester_end_id = semester_end_id;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	
}