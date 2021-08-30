package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.BaseAddressDto;

@Repository
public interface BaseAddressDao{
	public List<BaseAddressDto> getBaseAddressList() throws Exception;
	public BaseAddressDto getBaseAddress(BaseAddressDto dto) throws Exception;
	public void insertBaseAddress(BaseAddressDto dto) throws Exception;
	public void updateBaseAddress(BaseAddressDto dto) throws Exception;
	public void deleteBaseAddress(BaseAddressDto dto) throws Exception;
}