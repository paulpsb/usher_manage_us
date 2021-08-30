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
public class PracticesPracticeproblemBoardDto{
	private int id;
	private int practice_problem_id;
	private String board;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getPractice_problem_id() {
		return practice_problem_id;
	}
	public void setPractice_problem_id(int practice_problem_id) {
		this.practice_problem_id = practice_problem_id;
	}
	public String getBoard() {
		return board;
	}
	public void setBoard(String board) {
		this.board = board;
	}
	
	
}