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
public class NoticesStatsDto{
	private int user_id;
	private String user_name;
	private String stats_date;
	private String course_group_name;
	private String course_name;
	private int total_count;
	private int success_count;
	private int giveup_count;
	private int ignore_count;
	private int problem_count;
	private int request_count;
	private int timeing_count;
	private int working_count;
	private int response_count;
	private int return_count;
	private int complete_count;
	
	int notice_id;
	String notice_type;
	String notice_category;
	String section;
	String practice_type;
	String notice_date;
	String notice_time;
	String notice_title;
	int notice_course_id;
	int notice_user_id;
	String notice_user_name;
	String notice_course_name;
	String notice_sub_title;
	String status;
	String is_success;
	
	
	private int page_total_count = 0;
	private int page = 0;
	private int row_num = 0;
	private int first_num = 0;
	
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	
	public String getStats_date() {
		return stats_date;
	}
	public void setStats_date(String stats_date) {
		this.stats_date = stats_date;
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
	public int getGiveup_count() {
		return giveup_count;
	}
	public void setGiveup_count(int giveup_count) {
		this.giveup_count = giveup_count;
	}
	public int getIgnore_count() {
		return ignore_count;
	}
	public void setIgnore_count(int ignore_count) {
		this.ignore_count = ignore_count;
	}
	public int getProblem_count() {
		return problem_count;
	}
	public void setProblem_count(int problem_count) {
		this.problem_count = problem_count;
	}
	public int getRequest_count() {
		return request_count;
	}
	public void setRequest_count(int request_count) {
		this.request_count = request_count;
	}
	public int getTimeing_count() {
		return timeing_count;
	}
	public void setTimeing_count(int timeing_count) {
		this.timeing_count = timeing_count;
	}
	public int getWorking_count() {
		return working_count;
	}
	public void setWorking_count(int working_count) {
		this.working_count = working_count;
	}
	public int getResponse_count() {
		return response_count;
	}
	public void setResponse_count(int response_count) {
		this.response_count = response_count;
	}
	public int getReturn_count() {
		return return_count;
	}
	public void setReturn_count(int return_count) {
		this.return_count = return_count;
	}
	public int getComplete_count() {
		return complete_count;
	}
	public void setComplete_count(int complete_count) {
		this.complete_count = complete_count;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public int getNotice_id() {
		return notice_id;
	}
	public void setNotice_id(int notice_id) {
		this.notice_id = notice_id;
	}
	public String getNotice_type() {
		return notice_type;
	}
	public void setNotice_type(String notice_type) {
		this.notice_type = notice_type;
	}
	public String getNotice_category() {
		return notice_category;
	}
	public void setNotice_category(String notice_category) {
		this.notice_category = notice_category;
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
	public String getNotice_date() {
		return notice_date;
	}
	public void setNotice_date(String notice_date) {
		this.notice_date = notice_date;
	}
	public String getNotice_time() {
		return notice_time;
	}
	public void setNotice_time(String notice_time) {
		this.notice_time = notice_time;
	}
	public String getNotice_title() {
		return notice_title;
	}
	public void setNotice_title(String notice_title) {
		this.notice_title = notice_title;
	}
	public int getNotice_user_id() {
		return notice_user_id;
	}
	public void setNotice_user_id(int notice_user_id) {
		this.notice_user_id = notice_user_id;
	}
	public String getNotice_user_name() {
		return notice_user_name;
	}
	public void setNotice_user_name(String notice_user_name) {
		this.notice_user_name = notice_user_name;
	}
	public String getNotice_course_name() {
		return notice_course_name;
	}
	public void setNotice_course_name(String notice_course_name) {
		this.notice_course_name = notice_course_name;
	}
	public String getNotice_sub_title() {
		return notice_sub_title;
	}
	public void setNotice_sub_title(String notice_sub_title) {
		this.notice_sub_title = notice_sub_title;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getPage_total_count() {
		return page_total_count;
	}
	public void setPage_total_count(int page_total_count) {
		this.page_total_count = page_total_count;
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
	public String getIs_success() {
		return is_success;
	}
	public void setIs_success(String is_success) {
		this.is_success = is_success;
	}
	public int getNotice_course_id() {
		return notice_course_id;
	}
	public void setNotice_course_id(int notice_course_id) {
		this.notice_course_id = notice_course_id;
	}

	
	
}