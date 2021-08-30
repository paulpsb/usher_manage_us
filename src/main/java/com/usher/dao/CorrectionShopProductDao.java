package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CorrectionShopProductDto;

@Repository
public interface CorrectionShopProductDao{
	public CorrectionShopProductDto getCorrectionShopProductCount(CorrectionShopProductDto dto) throws Exception;
	public List<CorrectionShopProductDto> getCorrectionShopProductList(CorrectionShopProductDto dto) throws Exception;
	public CorrectionShopProductDto getCorrectionShopProduct(CorrectionShopProductDto dto) throws Exception;
	public void insertCorrectionShopProduct(CorrectionShopProductDto dto) throws Exception;
	public void updateCorrectionShopProduct(CorrectionShopProductDto dto) throws Exception;
	public void deleteCorrectionShopProduct(CorrectionShopProductDto dto) throws Exception;
}