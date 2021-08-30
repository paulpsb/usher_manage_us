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
public class CorrectionUserProductDto{
	private int id;
	
	private String created;
	private int created_id;
	private String created_name;
	private String modified;
	private int modified_id;
	private String modified_name;
	
	private String status;
	
	private String section;
	private String practice_type;
	private String product_type;
	private int user_id;
	private String user_username;
	private String user_name;
	private String expire_date;
	private int product_count;
	private int use_count;
	private int expire_count;
	private int remain_count;
	
	private int total_count = 0;
	private int page = 0;
	private int row_num = 0;
	private int first_num = 0;
	
	private String book;
	
	private String use_type;
	
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
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
	public String getProduct_type() {
		return product_type;
	}
	public void setProduct_type(String product_type) {
		this.product_type = product_type;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getExpire_date() {
		return expire_date;
	}
	public void setExpire_date(String expire_date) {
		this.expire_date = expire_date;
	}
	public int getProduct_count() {
		return product_count;
	}
	public void setProduct_count(int product_count) {
		this.product_count = product_count;
	}
	public int getUse_count() {
		return use_count;
	}
	public void setUse_count(int use_count) {
		this.use_count = use_count;
	}
	public int getExpire_count() {
		return expire_count;
	}
	public void setExpire_count(int expire_count) {
		this.expire_count = expire_count;
	}
	public int getRemain_count() {
		return remain_count;
	}
	public void setRemain_count(int remain_count) {
		this.remain_count = remain_count;
	}
	public String getUser_username() {
		return user_username;
	}
	public void setUser_username(String user_username) {
		this.user_username = user_username;
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
	public String getBook() {
		return book;
	}
	public void setBook(String book) {
		this.book = book;
	}
	public String getUse_type() {
		return use_type;
	}
	public void setUse_type(String use_type) {
		this.use_type = use_type;
	}
	
	
}