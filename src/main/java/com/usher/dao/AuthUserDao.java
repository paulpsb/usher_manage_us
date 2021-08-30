package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.AuthUserDto;

@Repository
public interface AuthUserDao{
	public AuthUserDto getUser(AuthUserDto dto) throws Exception;
	public AuthUserDto getUserAsID(AuthUserDto dto) throws Exception;
	public List<AuthUserDto> getUserList(AuthUserDto dto) throws Exception;
	public AuthUserDto getUserCount(AuthUserDto dto) throws Exception;
	public List<AuthUserDto> getUserSearchEmployeeList(AuthUserDto dto) throws Exception;
	public List<AuthUserDto> getUserSearchList(AuthUserDto dto) throws Exception;
	public List<AuthUserDto> getUserSearchAllList(AuthUserDto dto) throws Exception;
	public void updateUser(AuthUserDto dto) throws Exception;
	public void updateUserGroup(AuthUserDto dto) throws Exception;
	public AuthUserDto getUserSchool(AuthUserDto dto) throws Exception;
	public void insertUserSchool(AuthUserDto dto) throws Exception;
	public void updateUserSchool(AuthUserDto dto) throws Exception;
}