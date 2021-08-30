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
public class CoursesCourseDto{
	private int id;
	private String status;
	private String name;
	private int difficulty;
	private int inner_difficulty;
	private boolean open;
	private String building_name;
	private String room_no;
	private String life_cycle;
	private int course_group_id;
	private int semester_id;
	private String test_type;
	private int row_count;
	private int column_count;
	private String schedule;
	private String zoom_url;
	private String zoom_ot_url;
	private String student_type;
	private String lecture_type;
	private String chamgang_building_name;
	private String chamgang_room_no;
	
	private String data_value;
	
	private String cur_date;
	private String cur_time;
	
	private boolean is_voca;
	private boolean is_grammar;
	private boolean is_reading;
	private boolean is_listening;
	private boolean is_speaking;
	private boolean is_writing;
	
	private int instructor_id;
	private String instructor_name;

	private int manager_id;
	private String manager_name;

	
	private int course_id;
	private String section;
	private String practice_type;
	private String course_name;
	
	private String course_group_name;
	private String date;
	
	private String semester_date;
	
	private String next_semester_date;
	
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	public boolean isOpen() {
		return open;
	}
	public void setOpen(boolean open) {
		this.open = open;
	}
	public String getBuilding_name() {
		return building_name;
	}
	public void setBuilding_name(String building_name) {
		this.building_name = building_name;
	}
	public String getRoom_no() {
		return room_no;
	}
	public void setRoom_no(String room_no) {
		this.room_no = room_no;
	}
	public String getLife_cycle() {
		return life_cycle;
	}
	public void setLife_cycle(String life_cycle) {
		this.life_cycle = life_cycle;
	}
	public int getCourse_group_id() {
		return course_group_id;
	}
	public void setCourse_group_id(int course_group_id) {
		this.course_group_id = course_group_id;
	}
	public int getRow_count() {
		return row_count;
	}
	public void setRow_count(int row_count) {
		this.row_count = row_count;
	}
	public int getColumn_count() {
		return column_count;
	}
	public void setColumn_count(int column_count) {
		this.column_count = column_count;
	}
	public String getData_value() {
		return data_value;
	}
	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	public int getSemester_id() {
		return semester_id;
	}
	public void setSemester_id(int semester_id) {
		this.semester_id = semester_id;
	}
	public String getTest_type() {
		return test_type;
	}
	public void setTest_type(String test_type) {
		this.test_type = test_type;
	}
	public String getSchedule() {
		return schedule;
	}
	public void setSchedule(String schedule) {
		this.schedule = schedule;
	}
	public String getZoom_url() {
		return zoom_url;
	}
	public void setZoom_url(String zoom_url) {
		this.zoom_url = zoom_url;
	}
	public String getStudent_type() {
		return student_type;
	}
	public void setStudent_type(String student_type) {
		this.student_type = student_type;
	}
	public String getCur_date() {
		return cur_date;
	}
	public void setCur_date(String cur_date) {
		this.cur_date = cur_date;
	}
	public String getLecture_type() {
		return lecture_type;
	}
	public void setLecture_type(String lecture_type) {
		this.lecture_type = lecture_type;
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
	public int getCourse_id() {
		return course_id;
	}
	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getCourse_group_name() {
		return course_group_name;
	}
	public void setCourse_group_name(String course_group_name) {
		this.course_group_name = course_group_name;
	}
	public String getSection() {
		return section;
	}
	public void setSection(String section) {
		this.section = section;
	}
	public String getCourse_name() {
		return course_name;
	}
	public void setCourse_name(String course_name) {
		this.course_name = course_name;
	}
	public String getPractice_type() {
		return practice_type;
	}
	public void setPractice_type(String practice_type) {
		this.practice_type = practice_type;
	}
	public int getInstructor_id() {
		return instructor_id;
	}
	public void setInstructor_id(int instructor_id) {
		this.instructor_id = instructor_id;
	}
	public String getInstructor_name() {
		return instructor_name;
	}
	public void setInstructor_name(String instructor_name) {
		this.instructor_name = instructor_name;
	}
	public int getManager_id() {
		return manager_id;
	}
	public void setManager_id(int manager_id) {
		this.manager_id = manager_id;
	}
	public String getManager_name() {
		return manager_name;
	}
	public void setManager_name(String manager_name) {
		this.manager_name = manager_name;
	}
	public String getNext_semester_date() {
		return next_semester_date;
	}
	public void setNext_semester_date(String next_semester_date) {
		this.next_semester_date = next_semester_date;
	}
	public String getSemester_date() {
		return semester_date;
	}
	public void setSemester_date(String semester_date) {
		this.semester_date = semester_date;
	}
	public String getCur_time() {
		return cur_time;
	}
	public void setCur_time(String cur_time) {
		this.cur_time = cur_time;
	}
	public String getZoom_ot_url() {
		return zoom_ot_url;
	}
	public void setZoom_ot_url(String zoom_ot_url) {
		this.zoom_ot_url = zoom_ot_url;
	}
	public String getChamgang_building_name() {
		return chamgang_building_name;
	}
	public void setChamgang_building_name(String chamgang_building_name) {
		this.chamgang_building_name = chamgang_building_name;
	}
	public String getChamgang_room_no() {
		return chamgang_room_no;
	}
	public void setChamgang_room_no(String chamgang_room_no) {
		this.chamgang_room_no = chamgang_room_no;
	}
	
	
}