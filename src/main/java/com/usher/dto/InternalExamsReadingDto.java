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
public class InternalExamsReadingDto{
	private int id;
	private String section;
	private String book;
	private String volume;
	private String group;
	private String article;
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
	private String type;
	private int num;
	
	private int total_count = 0;
	private int page = 0;
	private int row_num = 0;
	private int first_num = 0;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSection() {
		return section;
	}
	public void setSection(String section) {
		this.section = section;
	}
	public String getBook() {
		return book;
	}
	public void setBook(String book) {
		this.book = book;
	}
	public String getVolume() {
		return volume;
	}
	public void setVolume(String volume) {
		this.volume = volume;
	}
	public String getGroup() {
		return group;
	}
	public void setGroup(String group) {
		this.group = group;
	}
	public String getArticle() {
		return article;
	}
	public void setArticle(String article) {
		this.article = article;
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
	
	
}