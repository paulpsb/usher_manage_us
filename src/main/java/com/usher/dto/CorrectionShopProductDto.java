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
public class CorrectionShopProductDto{
	private int id;
	private String created;
	private String modified;
	private String status;
	private String section;
	private String practice_type;
	private String product_type;
	private String product_name;
	private String product_desc;
	private int product_basic_price;
	private int product_price;
	private String product_image;
	private int sorting;
	private String reading_yn;
	private String listening_yn;
	private String speaking_yn;
	private String writing_yn;
	
	private int total_count = 0;
	private int page = 0;
	private int row_num = 0;
	private int first_num = 0;
	
	
	private String data_value;


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


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getProduct_type() {
		return product_type;
	}


	public void setProduct_type(String product_type) {
		this.product_type = product_type;
	}


	public String getProduct_name() {
		return product_name;
	}


	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}


	public String getProduct_desc() {
		return product_desc;
	}


	public void setProduct_desc(String product_desc) {
		this.product_desc = product_desc;
	}


	public int getProduct_basic_price() {
		return product_basic_price;
	}


	public void setProduct_basic_price(int product_basic_price) {
		this.product_basic_price = product_basic_price;
	}


	public int getProduct_price() {
		return product_price;
	}


	public void setProduct_price(int product_price) {
		this.product_price = product_price;
	}


	public String getProduct_image() {
		return product_image;
	}


	public void setProduct_image(String product_image) {
		this.product_image = product_image;
	}


	public int getSorting() {
		return sorting;
	}


	public void setSorting(int sorting) {
		this.sorting = sorting;
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


	public String getReading_yn() {
		return reading_yn;
	}


	public void setReading_yn(String reading_yn) {
		this.reading_yn = reading_yn;
	}


	public String getListening_yn() {
		return listening_yn;
	}


	public void setListening_yn(String listening_yn) {
		this.listening_yn = listening_yn;
	}


	public String getSpeaking_yn() {
		return speaking_yn;
	}


	public void setSpeaking_yn(String speaking_yn) {
		this.speaking_yn = speaking_yn;
	}


	public String getWriting_yn() {
		return writing_yn;
	}


	public void setWriting_yn(String writing_yn) {
		this.writing_yn = writing_yn;
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
	
	
}