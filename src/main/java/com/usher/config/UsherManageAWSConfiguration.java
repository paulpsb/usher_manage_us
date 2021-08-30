package com.usher.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class UsherManageAWSConfiguration{
	
	@Value("${AWS.ACESSKEY}")
	private String accessKey;
	
	@Value("${AWS.SECRETKEY}")
	private String secretKey;
	
	@Bean
	public BasicAWSCredentials AwsCredentials() {
		BasicAWSCredentials AwsCreds = new BasicAWSCredentials(accessKey, secretKey);
		return AwsCreds;
	}
	
	@Bean
	public AmazonS3 AwsS3Client() {
		AmazonS3 s3Builder = AmazonS3ClientBuilder.standard()
				.withRegion(Regions.AP_NORTHEAST_2)
				.withCredentials(new AWSStaticCredentialsProvider(this.AwsCredentials()))
				.build();
		return s3Builder;
	}
}