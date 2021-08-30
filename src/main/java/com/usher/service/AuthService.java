package com.usher.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usher.dao.AuthOrganizationDao;
import com.usher.dao.AuthUserDao;
import com.usher.dao.AuthUserOrganizationDao;
import com.usher.dto.AuthOrganizationDto;
import com.usher.dto.AuthUserDto;
import com.usher.dto.AuthUserOrganizationDto;
import com.usher.util.SessionUtil;

@Service
public class AuthService{
	@Autowired
	AuthUserDao dao1;

	@Autowired
	AuthOrganizationDao dao11;
	
	@Autowired
	AuthUserOrganizationDao dao12;
	
	public AuthUserDto getUser(AuthUserDto dto) throws Exception{
		return dao1.getUser(dto);
	}
	public AuthUserDto getUserAsID(AuthUserDto dto) throws Exception{
		return dao1.getUserAsID(dto);
	}
	public List<AuthUserDto> getUserList(AuthUserDto dto) throws Exception{
		return dao1.getUserList(dto);
	}
	public AuthUserDto getUserCount(AuthUserDto dto) throws Exception{
		return dao1.getUserCount(dto);
	}
	public List<AuthUserDto> getUserSearchEmployeeList(AuthUserDto dto) throws Exception{
		return dao1.getUserSearchEmployeeList(dto);
	}
	public List<AuthUserDto> getUserSearchList(AuthUserDto dto) throws Exception{
		return dao1.getUserSearchList(dto);
	}
	public List<AuthUserDto> getUserSearchAllList(AuthUserDto dto) throws Exception{
		return dao1.getUserSearchAllList(dto);
	}
	public void updateUser(AuthUserDto dto) throws Exception{
		dao1.updateUser(dto);
	}
	public void updateUserGroup(AuthUserDto dto) throws Exception{
		dao1.updateUserGroup(dto);
	}
	
	public AuthUserDto getUserSchool(AuthUserDto dto) throws Exception{
		return dao1.getUserSchool(dto);
	}
	public void insertUserSchool(AuthUserDto dto) throws Exception{
		dao1.insertUserSchool(dto);
	}
	public void updateUserSchool(AuthUserDto dto) throws Exception{
		dao1.updateUserSchool(dto);
	}
	
	public AuthUserDto setUserSession(HttpServletRequest request, AuthUserDto dto)  throws Exception{
		SessionUtil.killSession(request);
		AuthUserDto userInfo = dao1.getUser(dto);
		
		return userInfo;
	}
	
	public List<AuthOrganizationDto> getAuthOrganizationList() throws Exception{
		return dao11.getAuthOrganizationList();				
	}	
	
	
	public List<AuthOrganizationDto> getAuthOrganizationTeamList() throws Exception{
		return dao11.getAuthOrganizationTeamList();
	}

	public List<AuthOrganizationDto> getAuthOrganizationDownList() throws Exception{
		return dao11.getAuthOrganizationDownList();
	}
	public AuthOrganizationDto getAuthOrganization(AuthOrganizationDto dto) throws Exception{
		return dao11.getAuthOrganization(dto);
	}
	public AuthOrganizationDto getAuthOrganizationSort(AuthOrganizationDto dto) throws Exception{
		return dao11.getAuthOrganizationSort(dto);
	}
	public void insertAuthOrganization(AuthOrganizationDto dto) throws Exception{
		dao11.insertAuthOrganization(dto);
	}
	public void updateAuthOrganization(AuthOrganizationDto dto) throws Exception{
		dao11.updateAuthOrganization(dto);
	}
	public void deleteAuthOrganization(AuthOrganizationDto dto) throws Exception{
		dao11.deleteAuthOrganizationAsMenu(dto);
		dao11.deleteAuthOrganizationAsUser(dto);
		dao11.deleteAuthOrganization(dto);
	}

	public List<AuthUserOrganizationDto> getAuthUserOrganizationList(AuthUserOrganizationDto dto) throws Exception{
		return dao12.getAuthUserOrganizationList(dto);
	}
	
	public List<AuthUserOrganizationDto> getAuthUserOrganizationAllList() throws Exception{
		return dao12.getAuthUserOrganizationAllList();
	}
	public AuthUserOrganizationDto getAuthUserOrganization(AuthUserOrganizationDto dto) throws Exception{
		return dao12.getAuthUserOrganization(dto);
	}
	public void insertAuthUserOrganization(AuthUserOrganizationDto dto) throws Exception{
		dao12.insertAuthUserOrganization(dto);
	}
	public void updateAuthUserOrganization(AuthUserOrganizationDto dto) throws Exception{
		dao12.updateAuthUserOrganization(dto);
	}
	public void deleteAuthUserOrganization(AuthUserOrganizationDto dto) throws Exception{
		dao12.deleteAuthUserOrganization(dto);
	}
}