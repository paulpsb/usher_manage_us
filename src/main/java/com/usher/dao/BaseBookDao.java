package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BaseBookDto;

@Repository
public interface BaseBookDao{
	public List<BaseBookDto> getBaseBookList(BaseBookDto dto) throws Exception;
	public BaseBookDto getBaseBook(BaseBookDto dto) throws Exception;
	public void insertBaseBook(BaseBookDto dto) throws Exception;
	public void updateBaseBook(BaseBookDto dto) throws Exception;
	public void deleteBaseBook(BaseBookDto dto) throws Exception;
}