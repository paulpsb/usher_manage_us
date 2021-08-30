package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.AuthMenuDto;

@Repository
public interface AuthMenuDao{
	public List<AuthMenuDto> getMenuList(AuthMenuDto dto) throws Exception;
}