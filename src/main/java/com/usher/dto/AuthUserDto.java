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
public class AuthUserDto{
	private int user_id = 0;
	private int group_id = 0;
	private String username;
	private String password;
	private String group_name;
	private String first_name;
	private String last_name;
	private String email;
	private boolean is_superuser;
	private boolean is_staff;
	private boolean is_active;
	
	private String login_yn;
	private String login_fail_msg;
	
	private String book;
	
	private String login_ip;

	private boolean is_voca;
	private boolean is_grammar;
	private boolean is_reading;
	private boolean is_listening;
	private boolean is_speaking;
	private boolean is_writing;
	
	private String user_color;
	
	private String start_time;
	private String end_time;
	
	private int total_count = 0;
	private int page = 0;
	private int row_num = 0;
	private int first_num = 0;
	
	private String gender;
	private String mobile_no;
	private String birthday;
	
	private String data_value;
	
	private String school_gubun;
	private String school_foreign_gubun;
	private String school_area1;
	private String school_area2;
	private String school_name;
	private String school_major;
	private String school_grade;
	private String school_state;
	private String school_check;
	
	private int notice_new_student_id;
	private int notice_schedule_id;
	private int notice_attend_id;
	private int course_id;
	private int task_id;
	private String section;
	private String practice_type;
	private String schedule_date;
	private String current_date;
	
	private String search_type;
	private int organization_id;
	
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public int getGroup_id() {
		return group_id;
	}
	public void setGroup_id(int group_id) {
		this.group_id = group_id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getGroup_name() {
		return group_name;
	}
	public void setGroup_name(String group_name) {
		this.group_name = group_name;
	}
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public boolean isIs_superuser() {
		return is_superuser;
	}
	public void setIs_superuser(boolean is_superuser) {
		this.is_superuser = is_superuser;
	}
	public boolean isIs_staff() {
		return is_staff;
	}
	public void setIs_staff(boolean is_staff) {
		this.is_staff = is_staff;
	}
	public boolean isIs_active() {
		return is_active;
	}
	public void setIs_active(boolean is_active) {
		this.is_active = is_active;
	}
	public String getLogin_yn() {
		return login_yn;
	}
	public void setLogin_yn(String login_yn) {
		this.login_yn = login_yn;
	}
	public String getLogin_fail_msg() {
		return login_fail_msg;
	}
	public void setLogin_fail_msg(String login_fail_msg) {
		this.login_fail_msg = login_fail_msg;
	}
	public String getBook() {
		return book;
	}
	public void setBook(String book) {
		this.book = book;
	}
	public String getLogin_ip() {
		return login_ip;
	}
	public void setLogin_ip(String login_ip) {
		this.login_ip = login_ip;
	}
	public boolean isIs_voca() {
		return is_voca;
	}
	public void setIs_voca(boolean is_voca) {
		this.is_voca = is_voca;
	}
	public boolean isIs_grammar() {
		return is_grammar;
	}
	public void setIs_grammar(boolean is_grammar) {
		this.is_grammar = is_grammar;
	}
	public boolean isIs_reading() {
		return is_reading;
	}
	public void setIs_reading(boolean is_reading) {
		this.is_reading = is_reading;
	}
	public boolean isIs_listening() {
		return is_listening;
	}
	public void setIs_listening(boolean is_listening) {
		this.is_listening = is_listening;
	}
	public boolean isIs_speaking() {
		return is_speaking;
	}
	public void setIs_speaking(boolean is_speaking) {
		this.is_speaking = is_speaking;
	}
	public boolean isIs_writing() {
		return is_writing;
	}
	public void setIs_writing(boolean is_writing) {
		this.is_writing = is_writing;
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
	public String getData_value() {
		return data_value;
	}
	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getMobile_no() {
		return mobile_no;
	}
	public void setMobile_no(String mobile_no) {
		this.mobile_no = mobile_no;
	}
	public String getBirthday() {
		return birthday;
	}
	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}
	public String getSchool_gubun() {
		return school_gubun;
	}
	public void setSchool_gubun(String school_gubun) {
		this.school_gubun = school_gubun;
	}
	public String getSchool_foreign_gubun() {
		return school_foreign_gubun;
	}
	public void setSchool_foreign_gubun(String school_foreign_gubun) {
		this.school_foreign_gubun = school_foreign_gubun;
	}
	public String getSchool_area1() {
		return school_area1;
	}
	public void setSchool_area1(String school_area1) {
		this.school_area1 = school_area1;
	}
	public String getSchool_area2() {
		return school_area2;
	}
	public void setSchool_area2(String school_area2) {
		this.school_area2 = school_area2;
	}
	public String getSchool_name() {
		return school_name;
	}
	public void setSchool_name(String school_name) {
		this.school_name = school_name;
	}
	public String getSchool_major() {
		return school_major;
	}
	public void setSchool_major(String school_major) {
		this.school_major = school_major;
	}
	public String getSchool_grade() {
		return school_grade;
	}
	public void setSchool_grade(String school_grade) {
		this.school_grade = school_grade;
	}
	public String getSchool_state() {
		return school_state;
	}
	public void setSchool_state(String school_state) {
		this.school_state = school_state;
	}
	public String getSchool_check() {
		return school_check;
	}
	public void setSchool_check(String school_check) {
		this.school_check = school_check;
	}
	public String getUser_color() {
		return user_color;
	}
	public void setUser_color(String user_color) {
		this.user_color = user_color;
	}
	public int getNotice_schedule_id() {
		return notice_schedule_id;
	}
	public void setNotice_schedule_id(int notice_schedule_id) {
		this.notice_schedule_id = notice_schedule_id;
	}
	public int getCourse_id() {
		return course_id;
	}
	public void setCourse_id(int course_id) {
		this.course_id = course_id;
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
	public String getSchedule_date() {
		return schedule_date;
	}
	public void setSchedule_date(String schedule_date) {
		this.schedule_date = schedule_date;
	}
	public String getCurrent_date() {
		return current_date;
	}
	public void setCurrent_date(String current_date) {
		this.current_date = current_date;
	}
	public int getNotice_attend_id() {
		return notice_attend_id;
	}
	public void setNotice_attend_id(int notice_attend_id) {
		this.notice_attend_id = notice_attend_id;
	}
	public String getStart_time() {
		return start_time;
	}
	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}
	public String getEnd_time() {
		return end_time;
	}
	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}
	public String getSearch_type() {
		return search_type;
	}
	public void setSearch_type(String search_type) {
		this.search_type = search_type;
	}
	public int getOrganization_id() {
		return organization_id;
	}
	public void setOrganization_id(int organization_id) {
		this.organization_id = organization_id;
	}
	public int getTask_id() {
		return task_id;
	}
	public void setTask_id(int task_id) {
		this.task_id = task_id;
	}
	public int getNotice_new_student_id() {
		return notice_new_student_id;
	}
	public void setNotice_new_student_id(int notice_new_student_id) {
		this.notice_new_student_id = notice_new_student_id;
	}
	
	
	
}
