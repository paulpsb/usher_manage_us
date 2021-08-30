package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.AuthUserOrganizationDto;

@Repository
public interface AuthUserOrganizationDao{
	public List<AuthUserOrganizationDto> getAuthUserOrganizationList(AuthUserOrganizationDto dto) throws Exception;
	public List<AuthUserOrganizationDto> getAuthUserOrganizationAllList() throws Exception;
	public AuthUserOrganizationDto getAuthUserOrganization(AuthUserOrganizationDto dto) throws Exception;
	public void insertAuthUserOrganization(AuthUserOrganizationDto dto) throws Exception;
	public void updateAuthUserOrganization(AuthUserOrganizationDto dto) throws Exception;
	public void deleteAuthUserOrganization(AuthUserOrganizationDto dto) throws Exception;
}