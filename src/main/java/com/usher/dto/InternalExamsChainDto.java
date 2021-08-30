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
public class InternalExamsChainDto{
	private int id;
	private String section;
	private String book;
	private String volume;
	private String group;
	private String article;
	private String netpg_book;
	private String netpg_jindo;
	
	private String contents;
	private String modifier_set;
	private String color_set;

	private int paragraph1;
	private int paragraph2;
	private int paragraph3;
	private int paragraph4;
	private int paragraph5;
	private int paragraph6;
	private int paragraph7;
	private int paragraph8;
	private int paragraph9;
	private int paragraph10;

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
	public String getNetpg_book() {
		return netpg_book;
	}
	public void setNetpg_book(String netpg_book) {
		this.netpg_book = netpg_book;
	}
	public String getNetpg_jindo() {
		return netpg_jindo;
	}
	public void setNetpg_jindo(String netpg_jindo) {
		this.netpg_jindo = netpg_jindo;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public String getModifier_set() {
		return modifier_set;
	}
	public void setModifier_set(String modifier_set) {
		this.modifier_set = modifier_set;
	}
	public String getColor_set() {
		return color_set;
	}
	public void setColor_set(String color_set) {
		this.color_set = color_set;
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
	public int getParagraph1() {
		return paragraph1;
	}
	public void setParagraph1(int paragraph1) {
		this.paragraph1 = paragraph1;
	}
	public int getParagraph2() {
		return paragraph2;
	}
	public void setParagraph2(int paragraph2) {
		this.paragraph2 = paragraph2;
	}
	public int getParagraph3() {
		return paragraph3;
	}
	public void setParagraph3(int paragraph3) {
		this.paragraph3 = paragraph3;
	}
	public int getParagraph4() {
		return paragraph4;
	}
	public void setParagraph4(int paragraph4) {
		this.paragraph4 = paragraph4;
	}
	public int getParagraph5() {
		return paragraph5;
	}
	public void setParagraph5(int paragraph5) {
		this.paragraph5 = paragraph5;
	}
	public int getParagraph6() {
		return paragraph6;
	}
	public void setParagraph6(int paragraph6) {
		this.paragraph6 = paragraph6;
	}
	public int getParagraph7() {
		return paragraph7;
	}
	public void setParagraph7(int paragraph7) {
		this.paragraph7 = paragraph7;
	}
	public int getParagraph8() {
		return paragraph8;
	}
	public void setParagraph8(int paragraph8) {
		this.paragraph8 = paragraph8;
	}
	public int getParagraph9() {
		return paragraph9;
	}
	public void setParagraph9(int paragraph9) {
		this.paragraph9 = paragraph9;
	}
	public int getParagraph10() {
		return paragraph10;
	}
	public void setParagraph10(int paragraph10) {
		this.paragraph10 = paragraph10;
	}
	
	
}