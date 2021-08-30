package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.AuthOrganizationDto;

@Repository
public interface AuthOrganizationDao{
	public List<AuthOrganizationDto> getAuthOrganizationList() throws Exception;
	public List<AuthOrganizationDto> getAuthOrganizationTeamList() throws Exception;
	public List<AuthOrganizationDto> getAuthOrganizationDownList() throws Exception;
	public AuthOrganizationDto getAuthOrganization(AuthOrganizationDto dto) throws Exception;
	public AuthOrganizationDto getAuthOrganizationSort(AuthOrganizationDto dto) throws Exception;
	public void insertAuthOrganization(AuthOrganizationDto dto) throws Exception;
	public void updateAuthOrganization(AuthOrganizationDto dto) throws Exception;
	public void deleteAuthOrganization(AuthOrganizationDto dto) throws Exception;
	public void deleteAuthOrganizationAsMenu(AuthOrganizationDto dto) throws Exception;
	public void deleteAuthOrganizationAsUser(AuthOrganizationDto dto) throws Exception;
}