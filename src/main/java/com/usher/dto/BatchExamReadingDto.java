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
public class BatchExamReadingDto{
	private int id;
	private String type;
	private int num;
	private int sub_num;
	private int q_num;
	private String passage;
	private String paragraph1;
	private String paragraph2;
	private String paragraph3;
	private String paragraph4;
	private String paragraph5;
	private String paragraph6;
	private String paragraph7;
	private String paragraph8;
	private String paragraph9;
	private String paragraph10;
	
	private String created;
	private int created_id;
	private String created_name;
	private String modified;
	private int modified_id;
	private String modified_name;

	private String paragraph;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public int getQ_num() {
		return q_num;
	}
	public void setQ_num(int q_num) {
		this.q_num = q_num;
	}
	public String getPassage() {
		return passage;
	}
	public void setPassage(String passage) {
		this.passage = passage;
	}
	public String getParagraph1() {
		return paragraph1;
	}
	public void setParagraph1(String paragraph1) {
		this.paragraph1 = paragraph1;
	}
	public String getParagraph2() {
		return paragraph2;
	}
	public void setParagraph2(String paragraph2) {
		this.paragraph2 = paragraph2;
	}
	public String getParagraph3() {
		return paragraph3;
	}
	public void setParagraph3(String paragraph3) {
		this.paragraph3 = paragraph3;
	}
	public String getParagraph4() {
		return paragraph4;
	}
	public void setParagraph4(String paragraph4) {
		this.paragraph4 = paragraph4;
	}
	public String getParagraph5() {
		return paragraph5;
	}
	public void setParagraph5(String paragraph5) {
		this.paragraph5 = paragraph5;
	}
	public String getParagraph6() {
		return paragraph6;
	}
	public void setParagraph6(String paragraph6) {
		this.paragraph6 = paragraph6;
	}
	public String getParagraph7() {
		return paragraph7;
	}
	public void setParagraph7(String paragraph7) {
		this.paragraph7 = paragraph7;
	}
	public String getParagraph8() {
		return paragraph8;
	}
	public void setParagraph8(String paragraph8) {
		this.paragraph8 = paragraph8;
	}
	public String getParagraph9() {
		return paragraph9;
	}
	public void setParagraph9(String paragraph9) {
		this.paragraph9 = paragraph9;
	}
	public String getParagraph10() {
		return paragraph10;
	}
	public void setParagraph10(String paragraph10) {
		this.paragraph10 = paragraph10;
	}
	public int getSub_num() {
		return sub_num;
	}
	public void setSub_num(int sub_num) {
		this.sub_num = sub_num;
	}
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
	}
	public int getCreated_id() {
		return created_id;
	}
	public void setCreated_id(int created_id) {
		this.created_id = created_id;
	}
	public String getCreated_name() {
		return created_name;
	}
	public void setCreated_name(String created_name) {
		this.created_name = created_name;
	}
	public String getModified() {
		return modified;
	}
	public void setModified(String modified) {
		this.modified = modified;
	}
	public int getModified_id() {
		return modified_id;
	}
	public void setModified_id(int modified_id) {
		this.modified_id = modified_id;
	}
	public String getModified_name() {
		return modified_name;
	}
	public void setModified_name(String modified_name) {
		this.modified_name = modified_name;
	}
	public String getParagraph() {
		return paragraph;
	}
	public void setParagraph(String paragraph) {
		this.paragraph = paragraph;
	}

	
}