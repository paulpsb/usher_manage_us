package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CorrectionUserProductDto;

@Repository
public interface CorrectionUserProductDao{
	public CorrectionUserProductDto getCorrectionUserProductCount(CorrectionUserProductDto dto) throws Exception;
	public List<CorrectionUserProductDto> getCorrectionUserProductList(CorrectionUserProductDto dto) throws Exception;
	public CorrectionUserProductDto getCorrectionUserProduct(CorrectionUserProductDto dto) throws Exception;
	public void insertCorrectionUserProduct(CorrectionUserProductDto dto) throws Exception;
	public void updateCorrectionUserProduct(CorrectionUserProductDto dto) throws Exception;
	public void deleteCorrectionUserProduct(CorrectionUserProductDto dto) throws Exception;
}