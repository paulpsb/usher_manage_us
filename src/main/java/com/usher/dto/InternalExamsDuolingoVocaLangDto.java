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
public class InternalExamsDuolingoVocaLangDto{
	private int id;
	private String created;
	private int created_id;
	private String created_name;
	private String modified;
	private int modified_id;
	private String modified_name;
	private String status;
	private String voca_lang_code;
	private String voca_lang_name;
	private String voca_lang_translation_code;
	private int voca_lang_sort;
	
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getVoca_lang_code() {
		return voca_lang_code;
	}

	public void setVoca_lang_code(String voca_lang_code) {
		this.voca_lang_code = voca_lang_code;
	}

	public String getVoca_lang_name() {
		return voca_lang_name;
	}

	public void setVoca_lang_name(String voca_lang_name) {
		this.voca_lang_name = voca_lang_name;
	}

	public String getVoca_lang_translation_code() {
		return voca_lang_translation_code;
	}

	public void setVoca_lang_translation_code(String voca_lang_translation_code) {
		this.voca_lang_translation_code = voca_lang_translation_code;
	}

	public int getVoca_lang_sort() {
		return voca_lang_sort;
	}

	public void setVoca_lang_sort(int voca_lang_sort) {
		this.voca_lang_sort = voca_lang_sort;
	}

	public String getData_value() {
		return data_value;
	}

	public void setData_value(String data_value) {
		this.data_value = data_value;
	}
	
	
}