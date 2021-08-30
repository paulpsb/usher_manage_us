package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BoardMemoirsDto;

@Repository
public interface BoardMemoirsDao{
	public BoardMemoirsDto getBoardMemoirsAvg(BoardMemoirsDto dto) throws Exception;
	public List<BoardMemoirsDto> getBoardMemoirsList(BoardMemoirsDto dto) throws Exception;
	public BoardMemoirsDto getBoardMemoirsCount(BoardMemoirsDto dto) throws Exception;
	public BoardMemoirsDto getBoardMemoirs(BoardMemoirsDto dto) throws Exception;
	public void updateBoardMemoirs(BoardMemoirsDto dto) throws Exception;
}