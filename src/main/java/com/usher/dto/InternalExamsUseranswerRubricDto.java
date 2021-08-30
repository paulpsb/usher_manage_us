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
public class InternalExamsUseranswerRubricDto{
	private int id;
	private String created;
	private String modified;
	private int rubric_id;
	private String rubric_name;
	private int rubric_score01;
	private int rubric_score02;
	private int rubric_score03;
	private int rubric_score04;
	private int rubric_score05;
	private int rubric_score06;
	private int rubric_score07;
	private int rubric_score08;
	private int rubric_score09;
	private int rubric_score10;
	private int rubric_total_score;
	private int practice_result_id;
	
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
	public int getRubric_id() {
		return rubric_id;
	}
	public void setRubric_id(int rubric_id) {
		this.rubric_id = rubric_id;
	}
	public String getRubric_name() {
		return rubric_name;
	}
	public void setRubric_name(String rubric_name) {
		this.rubric_name = rubric_name;
	}
	public int getRubric_score01() {
		return rubric_score01;
	}
	public void setRubric_score01(int rubric_score01) {
		this.rubric_score01 = rubric_score01;
	}
	public int getRubric_score02() {
		return rubric_score02;
	}
	public void setRubric_score02(int rubric_score02) {
		this.rubric_score02 = rubric_score02;
	}
	public int getRubric_score03() {
		return rubric_score03;
	}
	public void setRubric_score03(int rubric_score03) {
		this.rubric_score03 = rubric_score03;
	}
	public int getRubric_score04() {
		return rubric_score04;
	}
	public void setRubric_score04(int rubric_score04) {
		this.rubric_score04 = rubric_score04;
	}
	public int getRubric_score05() {
		return rubric_score05;
	}
	public void setRubric_score05(int rubric_score05) {
		this.rubric_score05 = rubric_score05;
	}
	public int getRubric_score06() {
		return rubric_score06;
	}
	public void setRubric_score06(int rubric_score06) {
		this.rubric_score06 = rubric_score06;
	}
	public int getRubric_score07() {
		return rubric_score07;
	}
	public void setRubric_score07(int rubric_score07) {
		this.rubric_score07 = rubric_score07;
	}
	public int getRubric_score08() {
		return rubric_score08;
	}
	public void setRubric_score08(int rubric_score08) {
		this.rubric_score08 = rubric_score08;
	}
	public int getRubric_score09() {
		return rubric_score09;
	}
	public void setRubric_score09(int rubric_score09) {
		this.rubric_score09 = rubric_score09;
	}
	public int getRubric_score10() {
		return rubric_score10;
	}
	public void setRubric_score10(int rubric_score10) {
		this.rubric_score10 = rubric_score10;
	}
	public int getRubric_total_score() {
		return rubric_total_score;
	}
	public void setRubric_total_score(int rubric_total_score) {
		this.rubric_total_score = rubric_total_score;
	}
	public int getPractice_result_id() {
		return practice_result_id;
	}
	public void setPractice_result_id(int practice_result_id) {
		this.practice_result_id = practice_result_id;
	}
	
	
	
}