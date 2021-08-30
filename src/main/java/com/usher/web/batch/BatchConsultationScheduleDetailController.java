package com.usher.web.batch;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.dto.AuthUserDto;
import com.usher.dto.BatchDirectionDto;
import com.usher.dto.BatchResultDto;
import com.usher.dto.BatchResultSendDto;
import com.usher.dto.BatchScheduleDto;
import com.usher.dto.BatchStatsDto;
import com.usher.service.BatchService;
import com.usher.util.SendUtil;
import com.usher.util.SessionUtil;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Controller
public class BatchConsultationScheduleDetailController{
	@Autowired
	BatchService batchService; 
	
	@RequestMapping(value="/batch/consultation_schedule_detail.do")
	public String consultation_monthly_list(HttpServletRequest request, BatchStatsDto dto,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}	
		
		modelMap.addAttribute("statsInfo", dto);
		return "batch/consultation_schedule_detail";
	}
	
	@RequestMapping(value="/batch/getBatchStatsDailyList.do")
	public @ResponseBody List<BatchStatsDto> getBatchStatsDailyList(HttpServletRequest request, BatchStatsDto dto) throws Exception {
		
		return batchService.getBatchStatsDailyList(dto);
	}
	
	@RequestMapping(value="/batch/getBatchResultSendList.do")
	public @ResponseBody List<BatchResultSendDto> getBatchResultSendList(HttpServletRequest request, BatchResultSendDto dto) throws Exception {
		
		return batchService.getBatchResultSendList(dto);
	}
	
	

	@RequestMapping(value="/batch/getBatchResultAsID.do")
	public @ResponseBody BatchResultDto getBatchResultAsID(HttpServletRequest request, BatchResultDto dto) throws Exception {
		
		return batchService.getBatchResultAsID(dto);
	}

	
	@RequestMapping(value="/batch/updateBatchResultFinallyNotRegisterAsId.do")
	public @ResponseBody void updateBatchResultFinallyNotRegisterAsId(HttpServletRequest request, BatchResultDto dto) throws Exception {
		
		batchService.updateBatchResultFinallyNotRegisterAsId(dto);
	}

	@RequestMapping(value="/batch/insertBatchResultSend.do")
	public @ResponseBody void insertBatchResultSend(HttpServletRequest request, BatchResultSendDto dto) throws Exception {
		AuthUserDto userInfo = SessionUtil.getUserInfo(request);
		dto.setBatch_send_id(userInfo.getUser_id());
		batchService.insertBatchResultSend(dto);
		BatchResultDto dto1 = new BatchResultDto();
		dto1.setId(dto.getBatch_result_id());
		
		BatchResultDto batchResult = batchService.getBatchResultAsID(dto1);
		String mobile = "";
		if(batchResult.getBatch_finally_student_type().equals("JUNIOR"))
		{
			mobile = batchResult.getTel_emergency_number();
		}else {
			mobile = batchResult.getMobile_no();
		}
		if(dto.getBatch_send_type().equals("send_kakao_before")) {
			SendUtil.sendKakao(mobile, "SJT_047971", dto.getBatch_send_argument());
			batchService.updateBatchResultSendKaKaoBefore(dto1);
		}else if(dto.getBatch_send_type().equals("send_kakao_current")) {
			SendUtil.sendKakao(mobile, "SJT_047972", dto.getBatch_send_argument());
			batchService.updateBatchResultSendKaKaoCurrent(dto1);
		}else if(dto.getBatch_send_type().equals("send_phone")) {
			batchService.updateBatchResultSendPhone(dto1);
		}
		

	}
}