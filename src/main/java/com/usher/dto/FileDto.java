package com.usher.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author paulpsb79
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileDto{
	private String awsFileName;
	
	private int startSecond;
	private int secondsToCopy;
	
	
	private String fileName;

	private String wavFileName;
	private String mp3FileName;

	private String data_value;
	
	public String getAwsFileName() {
		return awsFileName;
	}


	public void setAwsFileName(String awsFileName) {
		this.awsFileName = awsFileName;
	}


	public int getStartSecond() {
		return startSecond;
	}


	public void setStartSecond(int startSecond) {
		this.startSecond = startSecond;
	}


	public int getSecondsToCopy() {
		return secondsToCopy;
	}


	public void setSecondsToCopy(int secondsToCopy) {
		this.secondsToCopy = secondsToCopy;
	}


	public String getFileName() {
		return fileName;
	}


	public void setFileName(String fileName) {
		this.fileName = fileName;
	}


	public String getWavFileName() {
		return wavFileName;
	}


	public void setWavFileName(String wavFileName) {
		this.wavFileName = wavFileName;
	}


	public String getData_value() {
		return data_value;
	}


	public void setData_value(String data_value) {
		this.data_value = data_value;
	}


	public String getMp3FileName() {
		return mp3FileName;
	}


	public void setMp3FileName(String mp3FileName) {
		this.mp3FileName = mp3FileName;
	}
	
	
}