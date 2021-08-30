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
public class MockTestDirectionDto{
	private int id;
	private String section;
	private String title;
	private String direction;
	private String usher_title;
	private String usher_direction;
	
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
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDirection() {
		return direction;
	}
	public void setDirection(String direction) {
		this.direction = direction;
	}
	public String getUsher_title() {
		return usher_title;
	}
	public void setUsher_title(String usher_title) {
		this.usher_title = usher_title;
	}
	public String getUsher_direction() {
		return usher_direction;
	}
	public void setUsher_direction(String usher_direction) {
		this.usher_direction = usher_direction;
	}

	
}