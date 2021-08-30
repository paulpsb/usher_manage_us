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
public class BaseKakaoSendMessageDetailDto{
	private int id;
	private String created;
	private int created_id;
	private String created_name;
	private String modified;
	private int modified_id;
	private String modified_name;
	
	private int send_message_id;
	private String send_message_detail_gubun;
	private String send_message_detail_no;
	private String send_message_detail_title;
	private String send_message_detail_desc;
	private int send_message_detail_sort;
	
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
	public int getSend_message_id() {
		return send_message_id;
	}
	public void setSend_message_id(int send_message_id) {
		this.send_message_id = send_message_id;
	}
	public String getSend_message_detail_gubun() {
		return send_message_detail_gubun;
	}
	public void setSend_message_detail_gubun(String send_message_detail_gubun) {
		this.send_message_detail_gubun = send_message_detail_gubun;
	}
	public String getSend_message_detail_no() {
		return send_message_detail_no;
	}
	public void setSend_message_detail_no(String send_message_detail_no) {
		this.send_message_detail_no = send_message_detail_no;
	}
	public String getSend_message_detail_title() {
		return send_message_detail_title;
	}
	public void setSend_message_detail_title(String send_message_detail_title) {
		this.send_message_detail_title = send_message_detail_title;
	}
	public String getSend_message_detail_desc() {
		return send_message_detail_desc;
	}
	public void setSend_message_detail_desc(String send_message_detail_desc) {
		this.send_message_detail_desc = send_message_detail_desc;
	}
	public int getSend_message_detail_sort() {
		return send_message_detail_sort;
	}
	public void setSend_message_detail_sort(int send_message_detail_sort) {
		this.send_message_detail_sort = send_message_detail_sort;
	}
	
	
}