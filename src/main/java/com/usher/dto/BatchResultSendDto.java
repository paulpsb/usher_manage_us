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
public class BatchResultSendDto{
	private int id;
	private int batch_result_id;
	private int batch_send_id;
	private String batch_send_name;
	private String batch_send_type;
	private String batch_send_date;
	private String batch_send_desc;
	private String batch_send_argument;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getBatch_result_id() {
		return batch_result_id;
	}
	public void setBatch_result_id(int batch_result_id) {
		this.batch_result_id = batch_result_id;
	}
	public int getBatch_send_id() {
		return batch_send_id;
	}
	public void setBatch_send_id(int batch_send_id) {
		this.batch_send_id = batch_send_id;
	}
	public String getBatch_send_name() {
		return batch_send_name;
	}
	public void setBatch_send_name(String batch_send_name) {
		this.batch_send_name = batch_send_name;
	}
	public String getBatch_send_type() {
		return batch_send_type;
	}
	public void setBatch_send_type(String batch_send_type) {
		this.batch_send_type = batch_send_type;
	}
	public String getBatch_send_date() {
		return batch_send_date;
	}
	public void setBatch_send_date(String batch_send_date) {
		this.batch_send_date = batch_send_date;
	}
	public String getBatch_send_desc() {
		return batch_send_desc;
	}
	public void setBatch_send_desc(String batch_send_desc) {
		this.batch_send_desc = batch_send_desc;
	}
	public String getBatch_send_argument() {
		return batch_send_argument;
	}
	public void setBatch_send_argument(String batch_send_argument) {
		this.batch_send_argument = batch_send_argument;
	}
	
	
	
}