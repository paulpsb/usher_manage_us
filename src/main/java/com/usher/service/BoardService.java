package com.usher.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usher.dao.BoardMemoirsDao;

import com.usher.dto.BoardMemoirsDto;




@Service
public class BoardService{
	@Autowired
	BoardMemoirsDao dao1;
	
	public BoardMemoirsDto getBoardMemoirsAvg(BoardMemoirsDto dto) throws Exception{
		return dao1.getBoardMemoirsAvg(dto);
	}
	public List<BoardMemoirsDto> getBoardMemoirsList(BoardMemoirsDto dto) throws Exception{
		return dao1.getBoardMemoirsList(dto);
	}
	
	public BoardMemoirsDto getBoardMemoirsCount(BoardMemoirsDto dto) throws Exception{
		return dao1.getBoardMemoirsCount(dto);
	}
	
	public BoardMemoirsDto getBoardMemoirs(BoardMemoirsDto dto) throws Exception{
		return dao1.getBoardMemoirs(dto);
	}
	
	public void updateBoardMemoirs(BoardMemoirsDto dto) throws Exception{
		dao1.updateBoardMemoirs(dto);
	}
}