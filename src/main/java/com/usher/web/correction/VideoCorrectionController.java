package com.usher.web.correction;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.usher.dto.AuthUserDto;
import com.usher.dto.CorrectionExamsAnswerDto;
import com.usher.dto.CorrectionExamsNoteDto;
import com.usher.dto.CorrectionExamsPenDto;
import com.usher.dto.CorrectionExamsRuburicDto;
import com.usher.dto.CorrectionOnlineVideoDto;
import com.usher.dto.CorrectionUserProductDto;
import com.usher.dto.InternalExamsChainDto;
import com.usher.dto.InternalExamsSpeakingDto;
import com.usher.service.AuthService;
import com.usher.service.CorrectionExamsService;
import com.usher.service.InternalExamsService;
import com.usher.util.SessionUtil;
import com.usher.util.StringUtil;


@Controller
public class VideoCorrectionController{
	@Autowired
	AuthService authService;

	@Autowired
	CorrectionExamsService correctionExamsService;

	@RequestMapping(value="/correction/online_video.do")
	public String online_video(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		if(!SessionUtil.isSessionUserInfo(request, modelMap)) {
			return "redirect:/login.do";
		}
		
		return "correction/online_video";
	}
	
	@RequestMapping(value="/correction/getCorrectionOnlineVideoList.do")
	public @ResponseBody List<CorrectionOnlineVideoDto> getCorrectionOnlineVideoList(HttpServletRequest request,
						CorrectionOnlineVideoDto dto, 
						ModelMap modelMap) throws Exception {
		return correctionExamsService.getCorrectionOnlineVideoList(dto);
	}
	
	@RequestMapping(value="/correction/saveCorrectionOnlineVideo.do")
	public @ResponseBody void saveCorrectionOnlineVideo(HttpServletRequest request,
						CorrectionOnlineVideoDto dto, 
						ModelMap modelMap) throws Exception {
		
		String data_value = dto.getData_value();
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		for(int i=0;i<jsonArray.size();i++){
			JSONObject jsonObj = (JSONObject)jsonArray.get(i);
			String online_video_flag      = jsonObj.get("online_video_flag").toString();
			int    online_video_id        = Integer.parseInt(jsonObj.get("online_video_id").toString());
			int    practice_problem_id    = Integer.parseInt(jsonObj.get("practice_problem_id").toString());
			String online_lesson_title    = jsonObj.get("online_lesson_title").toString();
			String online_lesson_video    = jsonObj.get("online_lesson_video").toString();
			String online_lesson_time     = jsonObj.get("online_lesson_time").toString();
			int    online_lesson_sort     = Integer.parseInt(jsonObj.get("online_lesson_sort").toString());
			
			CorrectionOnlineVideoDto sto = new CorrectionOnlineVideoDto();
			sto.setId(online_video_id);
			sto.setPractice_problem_id(practice_problem_id);
			sto.setOnline_lesson_title(online_lesson_title);
			sto.setOnline_lesson_video(online_lesson_video);
			sto.setOnline_lesson_time(online_lesson_time);
			sto.setOnline_lesson_sort(online_lesson_sort);
			if(online_video_flag.equals("I")) {
				correctionExamsService.insertCorrectionOnlineVideo(sto);
			}else if(online_video_flag.equals("U")) {
				correctionExamsService.updateCorrectionOnlineVideo(sto);
			}else if(online_video_flag.equals("D")) {
				correctionExamsService.deleteCorrectionOnlineVideo(sto);
			}
		}

	}
	
}