package com.usher.util;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.ui.ModelMap;

import com.usher.dto.AuthUserDto;

public class SessionUtil{
	private SessionUtil(){}
	
	public static void setSessionStudent(HttpServletRequest request, AuthUserDto userInfo) throws SQLException{
		HttpSession session = request.getSession();
		session.setAttribute("userInfo", userInfo);
	}

	public static AuthUserDto getUserInfo(HttpServletRequest request)
	{
		HttpSession session = request.getSession();
		AuthUserDto userInfo = (AuthUserDto)session.getAttribute("userInfo");
		
		return userInfo;
	}

	public static boolean isSessionUserInfo(HttpServletRequest request, ModelMap modelMap)
	{
		HttpSession session = request.getSession();
		AuthUserDto userInfo = (AuthUserDto)session.getAttribute("userInfo");
		if(userInfo == null){
			return false;
		}
		
		modelMap.addAttribute("userInfo", userInfo);
		return true;
	}
	

	public static void killSession(HttpServletRequest request) throws SQLException
	{
		HttpSession session = request.getSession();
		session.removeAttribute("userInfo");
	}
}