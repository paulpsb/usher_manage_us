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
public class InternalExamsPassageDto{
	private int id;
	private String section;
	private String book;
	private String volume;
	private String group;
	private String article;
	private String netpg_book;
	private String netpg_jindo;
	
	private int voca_paragraph1;
	private int voca_paragraph2;
	private int voca_paragraph3;
	private int voca_paragraph4;
	private int voca_paragraph5;
	private int voca_paragraph6;
	private int voca_paragraph7;
	private int voca_paragraph8;
	private int voca_paragraph9;
	private int voca_paragraph10;
	
	private int phrase_paragraph1;
	private int phrase_paragraph2;
	private int phrase_paragraph3;
	private int phrase_paragraph4;
	private int phrase_paragraph5;
	private int phrase_paragraph6;
	private int phrase_paragraph7;
	private int phrase_paragraph8;
	private int phrase_paragraph9;
	private int phrase_paragraph10;

	private int total_count = 0;
	private int page = 0;
	private int row_num = 0;
	private int first_num = 0;
	
	private String data_value_voca;
	private String data_value_phrase;
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
	public String getData_value_voca() {
		return data_value_voca;
	}
	public void setData_value_voca(String data_value_voca) {
		this.data_value_voca = data_value_voca;
	}
	public String getData_value_phrase() {
		return data_value_phrase;
	}
	public void setData_value_phrase(String data_value_phrase) {
		this.data_value_phrase = data_value_phrase;
	}
	public int getVoca_paragraph1() {
		return voca_paragraph1;
	}
	public void setVoca_paragraph1(int voca_paragraph1) {
		this.voca_paragraph1 = voca_paragraph1;
	}
	public int getVoca_paragraph2() {
		return voca_paragraph2;
	}
	public void setVoca_paragraph2(int voca_paragraph2) {
		this.voca_paragraph2 = voca_paragraph2;
	}
	public int getVoca_paragraph3() {
		return voca_paragraph3;
	}
	public void setVoca_paragraph3(int voca_paragraph3) {
		this.voca_paragraph3 = voca_paragraph3;
	}
	public int getVoca_paragraph4() {
		return voca_paragraph4;
	}
	public void setVoca_paragraph4(int voca_paragraph4) {
		this.voca_paragraph4 = voca_paragraph4;
	}
	public int getVoca_paragraph5() {
		return voca_paragraph5;
	}
	public void setVoca_paragraph5(int voca_paragraph5) {
		this.voca_paragraph5 = voca_paragraph5;
	}
	public int getVoca_paragraph6() {
		return voca_paragraph6;
	}
	public void setVoca_paragraph6(int voca_paragraph6) {
		this.voca_paragraph6 = voca_paragraph6;
	}
	public int getVoca_paragraph7() {
		return voca_paragraph7;
	}
	public void setVoca_paragraph7(int voca_paragraph7) {
		this.voca_paragraph7 = voca_paragraph7;
	}
	public int getVoca_paragraph8() {
		return voca_paragraph8;
	}
	public void setVoca_paragraph8(int voca_paragraph8) {
		this.voca_paragraph8 = voca_paragraph8;
	}
	public int getVoca_paragraph9() {
		return voca_paragraph9;
	}
	public void setVoca_paragraph9(int voca_paragraph9) {
		this.voca_paragraph9 = voca_paragraph9;
	}
	public int getVoca_paragraph10() {
		return voca_paragraph10;
	}
	public void setVoca_paragraph10(int voca_paragraph10) {
		this.voca_paragraph10 = voca_paragraph10;
	}
	public int getPhrase_paragraph1() {
		return phrase_paragraph1;
	}
	public void setPhrase_paragraph1(int phrase_paragraph1) {
		this.phrase_paragraph1 = phrase_paragraph1;
	}
	public int getPhrase_paragraph2() {
		return phrase_paragraph2;
	}
	public void setPhrase_paragraph2(int phrase_paragraph2) {
		this.phrase_paragraph2 = phrase_paragraph2;
	}
	public int getPhrase_paragraph3() {
		return phrase_paragraph3;
	}
	public void setPhrase_paragraph3(int phrase_paragraph3) {
		this.phrase_paragraph3 = phrase_paragraph3;
	}
	public int getPhrase_paragraph4() {
		return phrase_paragraph4;
	}
	public void setPhrase_paragraph4(int phrase_paragraph4) {
		this.phrase_paragraph4 = phrase_paragraph4;
	}
	public int getPhrase_paragraph5() {
		return phrase_paragraph5;
	}
	public void setPhrase_paragraph5(int phrase_paragraph5) {
		this.phrase_paragraph5 = phrase_paragraph5;
	}
	public int getPhrase_paragraph6() {
		return phrase_paragraph6;
	}
	public void setPhrase_paragraph6(int phrase_paragraph6) {
		this.phrase_paragraph6 = phrase_paragraph6;
	}
	public int getPhrase_paragraph7() {
		return phrase_paragraph7;
	}
	public void setPhrase_paragraph7(int phrase_paragraph7) {
		this.phrase_paragraph7 = phrase_paragraph7;
	}
	public int getPhrase_paragraph8() {
		return phrase_paragraph8;
	}
	public void setPhrase_paragraph8(int phrase_paragraph8) {
		this.phrase_paragraph8 = phrase_paragraph8;
	}
	public int getPhrase_paragraph9() {
		return phrase_paragraph9;
	}
	public void setPhrase_paragraph9(int phrase_paragraph9) {
		this.phrase_paragraph9 = phrase_paragraph9;
	}
	public int getPhrase_paragraph10() {
		return phrase_paragraph10;
	}
	public void setPhrase_paragraph10(int phrase_paragraph10) {
		this.phrase_paragraph10 = phrase_paragraph10;
	}
	
	
	

	
}