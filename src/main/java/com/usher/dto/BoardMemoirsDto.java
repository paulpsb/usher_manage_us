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
public class BoardMemoirsDto{
	private int id;
	private String created;
	private String modified;
	private String test_type;
	private String student_type;
	private String study_abroad;
	private String first_course;
	private String last_course;
	private int course_month;
	private int start_toeic_score;
	private int start_teps_score;
	private int start_scholastic_score;
	private int start_toefl_score;
	private int start_toefl_rc_score;
	private int start_toefl_lc_score;
	private int start_toefl_sp_score;
	private int start_toefl_wr_score;
	private int end_toefl_score;
	private int end_toefl_rc_score;
	private int end_toefl_lc_score;
	private int end_toefl_sp_score;
	private int end_toefl_wr_score;
	private String exam_year;
	private String exam_month;
	private String exam_day;
	private String title;
	private String content;
	private int hit;
	private String write_id;
	private String write_name;
	private String modify_yn;
	private String service_type;
	
	private int total_count = 0;
	private int page = 0;
	private int row_num = 0;
	private int first_num = 0;
	
	private float avg_toefl_score;
	private float avg_course_month;
	private int avg_course_count;
	
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
	public String getModified() {
		return modified;
	}
	public void setModified(String modified) {
		this.modified = modified;
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
	public String getStudy_abroad() {
		return study_abroad;
	}
	public void setStudy_abroad(String study_abroad) {
		this.study_abroad = study_abroad;
	}
	public String getFirst_course() {
		return first_course;
	}
	public void setFirst_course(String first_course) {
		this.first_course = first_course;
	}
	public String getLast_course() {
		return last_course;
	}
	public void setLast_course(String last_course) {
		this.last_course = last_course;
	}
	public int getCourse_month() {
		return course_month;
	}
	public void setCourse_month(int course_month) {
		this.course_month = course_month;
	}
	public int getStart_toeic_score() {
		return start_toeic_score;
	}
	public void setStart_toeic_score(int start_toeic_score) {
		this.start_toeic_score = start_toeic_score;
	}
	public int getStart_teps_score() {
		return start_teps_score;
	}
	public void setStart_teps_score(int start_teps_score) {
		this.start_teps_score = start_teps_score;
	}
	public int getStart_scholastic_score() {
		return start_scholastic_score;
	}
	public void setStart_scholastic_score(int start_scholastic_score) {
		this.start_scholastic_score = start_scholastic_score;
	}
	public int getStart_toefl_score() {
		return start_toefl_score;
	}
	public void setStart_toefl_score(int start_toefl_score) {
		this.start_toefl_score = start_toefl_score;
	}
	public int getStart_toefl_rc_score() {
		return start_toefl_rc_score;
	}
	public void setStart_toefl_rc_score(int start_toefl_rc_score) {
		this.start_toefl_rc_score = start_toefl_rc_score;
	}
	public int getStart_toefl_lc_score() {
		return start_toefl_lc_score;
	}
	public void setStart_toefl_lc_score(int start_toefl_lc_score) {
		this.start_toefl_lc_score = start_toefl_lc_score;
	}
	public int getStart_toefl_sp_score() {
		return start_toefl_sp_score;
	}
	public void setStart_toefl_sp_score(int start_toefl_sp_score) {
		this.start_toefl_sp_score = start_toefl_sp_score;
	}
	public int getStart_toefl_wr_score() {
		return start_toefl_wr_score;
	}
	public void setStart_toefl_wr_score(int start_toefl_wr_score) {
		this.start_toefl_wr_score = start_toefl_wr_score;
	}
	public int getEnd_toefl_score() {
		return end_toefl_score;
	}
	public void setEnd_toefl_score(int end_toefl_score) {
		this.end_toefl_score = end_toefl_score;
	}
	public int getEnd_toefl_rc_score() {
		return end_toefl_rc_score;
	}
	public void setEnd_toefl_rc_score(int end_toefl_rc_score) {
		this.end_toefl_rc_score = end_toefl_rc_score;
	}
	public int getEnd_toefl_lc_score() {
		return end_toefl_lc_score;
	}
	public void setEnd_toefl_lc_score(int end_toefl_lc_score) {
		this.end_toefl_lc_score = end_toefl_lc_score;
	}
	public int getEnd_toefl_sp_score() {
		return end_toefl_sp_score;
	}
	public void setEnd_toefl_sp_score(int end_toefl_sp_score) {
		this.end_toefl_sp_score = end_toefl_sp_score;
	}
	public int getEnd_toefl_wr_score() {
		return end_toefl_wr_score;
	}
	public void setEnd_toefl_wr_score(int end_toefl_wr_score) {
		this.end_toefl_wr_score = end_toefl_wr_score;
	}
	public String getExam_year() {
		return exam_year;
	}
	public void setExam_year(String exam_year) {
		this.exam_year = exam_year;
	}
	public String getExam_month() {
		return exam_month;
	}
	public void setExam_month(String exam_month) {
		this.exam_month = exam_month;
	}
	public String getExam_day() {
		return exam_day;
	}
	public void setExam_day(String exam_day) {
		this.exam_day = exam_day;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getHit() {
		return hit;
	}
	public void setHit(int hit) {
		this.hit = hit;
	}
	public String getWrite_id() {
		return write_id;
	}
	public void setWrite_id(String write_id) {
		this.write_id = write_id;
	}
	public String getWrite_name() {
		return write_name;
	}
	public void setWrite_name(String write_name) {
		this.write_name = write_name;
	}
	public String getModify_yn() {
		return modify_yn;
	}
	public void setModify_yn(String modify_yn) {
		this.modify_yn = modify_yn;
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
	public String getService_type() {
		return service_type;
	}
	public void setService_type(String service_type) {
		this.service_type = service_type;
	}
	public float getAvg_toefl_score() {
		return avg_toefl_score;
	}
	public void setAvg_toefl_score(float avg_toefl_score) {
		this.avg_toefl_score = avg_toefl_score;
	}
	public float getAvg_course_month() {
		return avg_course_month;
	}
	public void setAvg_course_month(float avg_course_month) {
		this.avg_course_month = avg_course_month;
	}
	public int getAvg_course_count() {
		return avg_course_count;
	}
	public void setAvg_course_count(int avg_course_count) {
		this.avg_course_count = avg_course_count;
	}
	
	
	
}