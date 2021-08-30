package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.AuthGroupDto;

@Repository
public interface AuthGroupDao{
	public List<AuthGroupDto> getGroupList(AuthGroupDto dto) throws Exception;
}