package com.usher.service;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.usher.util.StringUtil;


@Service
public class AwsS3Service{
	@Autowired
	private AmazonS3 s3Client;
	
	@Value("${AWS.BUKCET}")
	private String bucketName;
	
	@Value("${AWS.BUKCET.NOTICE}")
	private String bucketNoticeName;
	
	@Value("${AWS.BUKCET.BASE}")
	private String bucketBaseName;
	
	public String uploadObject(MultipartFile multipartFile, String storedFileName) throws Exception{

		ObjectMetadata omd = new ObjectMetadata(); 
		omd.setContentType(multipartFile.getContentType());
		omd.setContentLength(multipartFile.getSize());
		omd.setHeader("filename", multipartFile.getOriginalFilename());
		
		s3Client.putObject(new PutObjectRequest(bucketName, storedFileName, multipartFile.getInputStream(), omd));
		
		return bucketName + "/" + storedFileName;
	}
	
	public String uploadNoticeObject(MultipartFile multipartFile, String storedFolderName) throws Exception{
		String originalFileName = multipartFile.getOriginalFilename();
		String newFileName = StringUtil.getRenameFile(originalFileName);
		String storedFileName = storedFolderName+"/"+newFileName;
		ObjectMetadata omd = new ObjectMetadata(); 
		omd.setContentType(multipartFile.getContentType());
		omd.setContentLength(multipartFile.getSize());
		omd.setHeader("filename", newFileName);
		
		s3Client.putObject(new PutObjectRequest(bucketNoticeName, storedFileName, multipartFile.getInputStream(), omd));
		
		return bucketNoticeName + "/" + storedFileName+"||"+originalFileName;
	}
	
	public String uploadWavObject(File file, String storedFileName) throws Exception{

		s3Client.putObject(bucketName, storedFileName, file);
		
		return bucketName + "/" + storedFileName;
	}
	
	public String uploadBaseObject(MultipartFile multipartFile, String storedFilePath) throws Exception{

		ObjectMetadata omd = new ObjectMetadata(); 
		omd.setContentType(multipartFile.getContentType());
		omd.setContentLength(multipartFile.getSize());
		omd.setHeader("filename", multipartFile.getOriginalFilename());
		
		s3Client.putObject(new PutObjectRequest(bucketBaseName, storedFilePath+"/"+multipartFile.getOriginalFilename(), multipartFile.getInputStream(), omd));
		
		return bucketBaseName + "/" + storedFilePath+"/"+multipartFile.getOriginalFilename();
	}
	
	public String uploadBaseObjectRename(MultipartFile multipartFile, String storedFolderName) throws Exception{

		String originalFileName = multipartFile.getOriginalFilename();
		String newFileName = StringUtil.getRenameFile(originalFileName);
		String storedFileName = storedFolderName+"/"+newFileName;
		ObjectMetadata omd = new ObjectMetadata(); 
		omd.setContentType(multipartFile.getContentType());
		omd.setContentLength(multipartFile.getSize());
		omd.setHeader("filename", newFileName);
		
		s3Client.putObject(new PutObjectRequest(bucketBaseName, storedFileName, multipartFile.getInputStream(), omd));
		
		return bucketBaseName + "/" + storedFileName;
	}
	
	public String downloadWavObject(String fileName) throws Exception
	{
		fileName = fileName.replace(bucketName+"/", "");
		String fileNewPath = StringUtil.getTempPath();
		String fileNewName = StringUtil.renameFile("wav");
		
		File downloadFile = new File(fileNewPath+fileNewName);
		S3Object s3Object = s3Client.getObject(bucketName, fileName);
		S3ObjectInputStream inputStream = s3Object.getObjectContent();
		
		FileUtils.copyInputStreamToFile(inputStream, downloadFile);
		return fileNewName;
	}

}