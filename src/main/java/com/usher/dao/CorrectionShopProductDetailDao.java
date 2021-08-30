package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.CorrectionShopProductDetailDto;

@Repository
public interface CorrectionShopProductDetailDao{
	public List<CorrectionShopProductDetailDto> getCorrectionShopProductDetailList(CorrectionShopProductDetailDto dto) throws Exception;
	public void insertCorrectionShopProductDetail(CorrectionShopProductDetailDto dto) throws Exception;
	public void deleteCorrectionShopProductDetail(CorrectionShopProductDetailDto dto) throws Exception;
}