package com.usher.util;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import java.io.*;
import java.net.InetAddress;
import java.net.URLEncoder;
import java.net.UnknownHostException;


/**
 * 문자열 Util
 *
 */
public class StringUtil{
	private StringUtil(){
		
	}
	
	private final static String[] delim = {",", "\n", "\t"};
	private static SimpleDateFormat FORMAT_TIMESTAMP = new SimpleDateFormat("yyyyMMddHHmmss");
	
	/**
	 * NVL
	 * @param str
	 * @return
	 */
	public static String nvl(String str){
		return str==null?"":str;
	}
	
	/**
	 * 빈값을 Null값으로 치환
	 * @param str
	 * @return
	 */
	public static String ChangeNull(String str){
		if(str.equals("")){
			return null;
		}
		return str;
	}
	/**
	 * NVL
	 * @param str
	 * @param defaultValue
	 * @return
	 */
	public static String nvl(String str, String defaultValue){
		return str==null?nvl(defaultValue):str;
	}
	
	/**
	 * 패턴으로 짤라서 Array로 반환
	 * @param str
	 * @return
	 */
	public static String[] split(String str){
		String[] result = null;
		
		String splitStr = str;
		for(int i=0,size=delim.length;i<size;i++){
			splitStr = splitStr.replaceAll(delim[i], " ");			
		}
		
		result = splitStr.split(" ");
		
		return result;
	}
	
	/**
	 * Replace All
	 * @param source
	 * @param pattern
	 * @param replace
	 * @return
	 */
	public static String replaceAll(String source, String pattern, String replace){
        if(source==null) throw new NullPointerException();
        
    	int len = pattern.length();
    	StringBuffer sb = new StringBuffer();
    	int found = -1;
        int start = 0;
 
        while( (found = source.indexOf(pattern, start) ) != -1) {
            sb.append(source.substring(start, found));
            sb.append(replace);
            start = found + len;
        }
 
        sb.append(source.substring(start));
 
        return sb.toString();

	}

	/**
	 * Replace
	 * @param source
	 * @param pattern
	 * @param replace
	 * @return
	 */
	public static String replace(String source, String pattern, String replace){
        if(source==null) throw new NullPointerException();
        
    	int len = pattern.length();
    	StringBuffer sb = new StringBuffer();
    	int found = -1;
        int start = 0;
 
        if( (found = source.indexOf(pattern, start) ) != -1) {
            sb.append(source.substring(start, found));
            sb.append(replace);
            start = found + len;
        }
 
        sb.append(source.substring(start));
 
        return sb.toString();

	}

	public static String lpad(String str, int len, String append)
	{
	    String rtn = str;
	    if (str.length() < len){
		for (int i = (len - str.length()); i > 0; i--){
		    rtn = append + rtn;
		}
	    }else{
		rtn = str.substring(0, len);
	    }
	    return rtn;
	}
	
	public static String rpad(String str, int len, String append)
	{
	    String rtn = str;
	    if (str.length() < len){
		for (int i = (len - str.length()); i > 0; i--){
		    rtn = rtn + append;
		}
	    }else{
		rtn = str.substring(0, len);
	    }
	    return rtn;
	}
	
	/**
	 * 현재일시 가져오기
	 */
	public static Date getDate(Object value){
		if(value == null){
			return null;
		}
		String stValue = value.toString();
		try{
			return FORMAT_TIMESTAMP.parse(stValue);
		}catch(Exception e){
			return null;
		}		
	}

	
	/**
	 * 서버 호스트명 가져오기
	 */
	public static String getHostNm() {
		InetAddress ip = null;
		try {
			ip = InetAddress.getLocalHost();
		}catch(UnknownHostException e){
			e.printStackTrace();
		}
		
		return ip.getHostName();
	}
	
	/**
	 * 현재일자 가져오기
	 */
	public static String getToDay(){
		java.util.Date yymmdd = new java.util.Date();
		SimpleDateFormat myformat = new SimpleDateFormat("yyyyMMdd");
		String ymd = myformat.format(yymmdd);
		return ymd;
	}	
	
	public static String getClientIP(HttpServletRequest request) {
	    String ip = request.getRemoteAddr();

	    if (ip == null) {
	        ip = request.getHeader("Proxy-Client-IP");
	    }
	    if (ip == null) {
	        ip = request.getHeader("WL-Proxy-Client-IP");
	    }
	    if (ip == null) {
	        ip = request.getHeader("HTTP_CLIENT_IP");
	    }
	    if (ip == null) {
	        ip = request.getHeader("HTTP_X_FORWARDED_FOR");
	    }
	    if (ip == null) {
	        ip = request.getHeader("X-Forwarded-For");
	    }

	    return ip;
	}
	
	/**
	 * 변환 파일명 반환
	 */
	public static String renameFile(String fileType)
	{
		long curentTime = System.currentTimeMillis();
		SimpleDateFormat sim = new SimpleDateFormat("yyyyMMddHHmmss");
		int randomNumber = (int)(Math.random()*10000);
		
		String uFileName = ""+randomNumber+sim.format(new Date(curentTime));
		String ext = "."+fileType;
		
		String tempName = uFileName + ext;
		
		return tempName;
	}	
	
	/**
	 * 변환 파일명 반환
	 */
	public static String getRenameFile(String fileName)
	{
		long curentTime = System.currentTimeMillis();
		SimpleDateFormat sim = new SimpleDateFormat("yyyyMMddHHmmss");
		int randomNumber = (int)(Math.random()*10000);
		
		String uFileName = ""+randomNumber+sim.format(new Date(curentTime));
		String ext = null;
		
		int dot = fileName.lastIndexOf(".");
		
		if(dot != -1){
			ext  = fileName.substring(dot);
		}else{
			ext  = "";
		}
		
		String tempName = uFileName + ext;
		
		return tempName;
	}	
	
	public static String getTempPath()
	{
		
		//return "D:/test/";
		return "/home/ubuntu/app/temp/";
	}	
	
	/**
	 * 현재일자 가져오기
	 */
	public static String getToDayFormat(String format){
		java.util.Date yymmdd = new java.util.Date();
		SimpleDateFormat myformat = new SimpleDateFormat(format);
		String ymd = myformat.format(yymmdd);
		return ymd;
	}	
}