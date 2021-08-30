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
public class BaseKakaoSendMessageDto{
	private int id;
	private String created;
	private int created_id;
	private String created_name;
	private String modified;
	private int modified_id;
	private String modified_name;
	private String send_message_gubun;
	private String send_message_name;
	private String send_message_header;
	private String send_message_footer;
	private String send_message_desc;
	
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

	public String getSend_message_gubun() {
		return send_message_gubun;
	}

	public void setSend_message_gubun(String send_message_gubun) {
		this.send_message_gubun = send_message_gubun;
	}

	public String getSend_message_name() {
		return send_message_name;
	}

	public void setSend_message_name(String send_message_name) {
		this.send_message_name = send_message_name;
	}

	public String getSend_message_header() {
		return send_message_header;
	}

	public void setSend_message_header(String send_message_header) {
		this.send_message_header = send_message_header;
	}

	public String getSend_message_footer() {
		return send_message_footer;
	}

	public void setSend_message_footer(String send_message_footer) {
		this.send_message_footer = send_message_footer;
	}

	public String getData_value() {
		return data_value;
	}

	public void setData_value(String data_value) {
		this.data_value = data_value;
	}

	public String getSend_message_desc() {
		return send_message_desc;
	}

	public void setSend_message_desc(String send_message_desc) {
		this.send_message_desc = send_message_desc;
	}

	
	
	
}