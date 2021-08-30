package com.usher.web.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.SequenceInputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.usher.dto.AuthOrganizationDto;
import com.usher.dto.AuthUserDto;
import com.usher.dto.BaseAreaDto;
import com.usher.dto.BaseCountryDto;
import com.usher.dto.BaseCoursegroupTimescheduleDto;
import com.usher.dto.BaseSchoolDto;
import com.usher.dto.BatchExamReadingDto;
import com.usher.dto.CounselsCounselDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.CoursesCoursegroupDto;
import com.usher.dto.CoursesSemesterDto;
import com.usher.dto.EnrollmentsCourseenrollmentDto;
import com.usher.dto.FileDto;
import com.usher.dto.PracticesPracticebookDto;
import com.usher.dto.PracticesPracticegroupDto;
import com.usher.dto.PracticesPracticeproblemDto;
import com.usher.dto.PracticesPracticesectionDto;
import com.usher.dto.PracticesPracticesectiontypeDto;
import com.usher.dto.PracticesPracticevolumeDto;
import com.usher.service.AuthService;
import com.usher.service.AwsS3Service;
import com.usher.service.BaseService;
import com.usher.service.BatchService;
import com.usher.service.CounselsService;
import com.usher.service.CoursesService;
import com.usher.service.EnrollmentsService;
import com.usher.service.PracticesService;
import com.usher.util.SendUtil;
import com.usher.util.StringUtil;

import it.sauronsoftware.jave.AudioAttributes;
import it.sauronsoftware.jave.Encoder;
import it.sauronsoftware.jave.EncoderException;
import it.sauronsoftware.jave.EncodingAttributes;
import it.sauronsoftware.jave.FFMPEGLocator;
import it.sauronsoftware.jave.InputFormatException;


@Controller
public class CommonController{
	@Autowired
	CoursesService coursesService;
	
	@Autowired
	BatchService batchService;
	
	@Autowired
	PracticesService practicesService; 
	
	@Autowired
	CounselsService counselsService;
	
	@Autowired
	BaseService baseService;
	
	@Autowired
	EnrollmentsService enrollmentsService;
	
	@Autowired
	AwsS3Service awsS3Service;
	
	@Autowired
	AuthService authService;
	
	@RequestMapping(value="/common/getAuthOrganizationTeamList.do")
	public @ResponseBody List<AuthOrganizationDto> getAuthOrganizationTeamList(HttpServletRequest request) throws Exception {
		
		return authService.getAuthOrganizationTeamList();
	}
	
	@RequestMapping(value="/common/getAuthOrganizationDownList.do")
	public @ResponseBody List<AuthOrganizationDto> getAuthOrganizationDownList(HttpServletRequest request) throws Exception {
		
		return authService.getAuthOrganizationDownList();
	}
	
	@RequestMapping(value="/common/getCourseEnrollmentList.do")
	public @ResponseBody List<EnrollmentsCourseenrollmentDto>  getCourseEnrollmentList(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		return enrollmentsService.getCourseenrollmentList(dto);
	}
	
	@RequestMapping(value="/common/getUserSearchEmployeeList.do")
	public @ResponseBody List<AuthUserDto> getUserSearchEmployeeList(HttpServletRequest request, AuthUserDto dto) throws Exception {
		
		return authService.getUserSearchEmployeeList(dto);
	}
	
	@RequestMapping(value="/common/getUserSearchAllList.do")
	public @ResponseBody List<AuthUserDto> getUserSearchAllList(HttpServletRequest request, AuthUserDto dto) throws Exception {
		
		return authService.getUserSearchAllList(dto);
	}
	
	@RequestMapping(value="/common/getSemesterList.do")
	public @ResponseBody List<CoursesSemesterDto> getCommonSemesterList(HttpServletRequest request) throws Exception {
		
		return coursesService.getSemesterList();
	}
	
	
	@RequestMapping(value="/common/getCourseenrollmentAttend.do")
	public @ResponseBody EnrollmentsCourseenrollmentDto getCourseenrollmentAttend(HttpServletRequest request, EnrollmentsCourseenrollmentDto dto) throws Exception {
		
		return enrollmentsService.getCourseenrollmentAttend(dto);
	}
	
	@RequestMapping(value="/common/getCoursegroupList.do")
	public @ResponseBody List<CoursesCoursegroupDto> getCommonCoursegroupList(HttpServletRequest request, CoursesCoursegroupDto dto) throws Exception {
		
		return coursesService.getCoursegroupList(dto);
	}

	@RequestMapping(value="/common/getCourseList.do")
	public @ResponseBody List<CoursesCourseDto> getCommonCourseList(HttpServletRequest request, CoursesCourseDto dto) throws Exception {
		
		return coursesService.getCourseList(dto);
	}
	
	@RequestMapping(value="/common/getCourse.do")
	public @ResponseBody CoursesCourseDto getCommonCourse(HttpServletRequest request, CoursesCourseDto dto) throws Exception {
		
		return coursesService.getCourse(dto);
	}
	
	@RequestMapping(value="/common/getCourseAllList.do")
	public @ResponseBody Map getCourseAllList(HttpServletRequest request, CoursesCoursegroupDto dto) throws Exception {
		Map resultMap = new HashMap();
		List<CoursesCoursegroupDto> coursegroupList = coursesService.getCoursegroupList(dto);
		resultMap.put("coursegroupList", coursegroupList);
		
		CoursesCourseDto dto1 = new CoursesCourseDto();
		dto1.setSemester_id(dto.getSemester_id());
		List<CoursesCourseDto> courseList = coursesService.getCourseAllList(dto1);
		resultMap.put("courseList", courseList);
		
		
		return resultMap;
	}
	
	@RequestMapping(value="/common/getCourseEnrollmentAllList.do")
	public @ResponseBody Map getCourseEnrollmentAllList(HttpServletRequest request, CoursesCoursegroupDto dto) throws Exception {
		Map resultMap = new HashMap();
		List<CoursesCoursegroupDto> coursegroupList = coursesService.getCoursegroupList(dto);
		resultMap.put("coursegroupList", coursegroupList);
		
		CoursesCourseDto dto1 = new CoursesCourseDto();
		dto1.setSemester_id(dto.getSemester_id());
		List<CoursesCourseDto> courseList = coursesService.getCourseAllList(dto1);
		resultMap.put("courseList", courseList);
		
		EnrollmentsCourseenrollmentDto dto2 = new EnrollmentsCourseenrollmentDto();
		dto2.setSemester_id(dto.getSemester_id());
		List<EnrollmentsCourseenrollmentDto> enrollmentList = enrollmentsService.getCourseenrollmentSemesterList(dto2);
		resultMap.put("enrollmentList", enrollmentList);
		
		return resultMap;
	}
	
	@RequestMapping(value="/common/getBaseCoursegroupTimescheduleList.do")
	public @ResponseBody List<BaseCoursegroupTimescheduleDto> getBaseCoursegroupTimescheduleList(HttpServletRequest request, BaseCoursegroupTimescheduleDto dto) throws Exception {
		
		return baseService.getBaseCoursegroupTimescheduleList(dto);
	}
	
	
	@RequestMapping(value="/common/getPracticeSectionList.do")
	public @ResponseBody List<PracticesPracticesectionDto> getPracticeSectionList(HttpServletRequest request) throws Exception {
		return practicesService.getPracticeSectionList();
	}
	
	
	@RequestMapping(value="/common/getPracticeSectionTypeList.do")
	public @ResponseBody List<PracticesPracticesectiontypeDto> getPracticeSectionTypeList(HttpServletRequest request, PracticesPracticesectiontypeDto dto) throws Exception {
		return practicesService.getPracticeSectionTypeList(dto);
	}
	
	@RequestMapping(value="/common/getPracticeBookList.do")
	public @ResponseBody List<PracticesPracticebookDto> getPracticeBookList(HttpServletRequest request,PracticesPracticebookDto dto) throws Exception {
		return practicesService.getPracticeBookList(dto);
	}
	
	@RequestMapping(value="/common/getPracticeVolumeList.do")
	public @ResponseBody List<PracticesPracticevolumeDto> getPracticeVolumeList(HttpServletRequest request,PracticesPracticevolumeDto dto) throws Exception {
		return practicesService.getPracticeVolumeList(dto);
	}

	@RequestMapping(value="/common/getPracticeGroupList.do")
	public @ResponseBody List<PracticesPracticegroupDto> getPracticeGroupList(HttpServletRequest request,PracticesPracticegroupDto dto) throws Exception {
		return practicesService.getPracticeGroupList(dto);
	}
	
	@RequestMapping(value="/common/getProblemSectionList.do")
	public @ResponseBody List<PracticesPracticeproblemDto> getProblemSectionList(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		return practicesService.getProblemSectionList();
	}
	
	@RequestMapping(value="/common/getProblemBookList.do")
	public @ResponseBody List<PracticesPracticeproblemDto> getProblemBookList(HttpServletRequest request,
						PracticesPracticeproblemDto dto,
						ModelMap modelMap) throws Exception {
		return practicesService.getProblemBookList(dto);
	}
	
	@RequestMapping(value="/common/getProblemVolumeList.do")
	public @ResponseBody List<PracticesPracticeproblemDto> getProblemVolumeList(HttpServletRequest request,
						PracticesPracticeproblemDto dto,
						ModelMap modelMap) throws Exception {
		return practicesService.getProblemVolumeList(dto);
	}
	
	@RequestMapping(value="/common/getProblemGroupList.do")
	public @ResponseBody List<PracticesPracticeproblemDto> getProblemGroupList(HttpServletRequest request,
						PracticesPracticeproblemDto dto,
						ModelMap modelMap) throws Exception {
		return practicesService.getProblemGroupList(dto);
	}

	@RequestMapping(value="/common/getProblemArticleList.do")
	public @ResponseBody List<PracticesPracticeproblemDto> getProblemArticleList(HttpServletRequest request,
						PracticesPracticeproblemDto dto,
						ModelMap modelMap) throws Exception {
		return practicesService.getProblemArticleList(dto);
	}
	
	@RequestMapping(value="/common/getProblemList.do")
	public @ResponseBody List<PracticesPracticeproblemDto> getProblemList(HttpServletRequest request,
						PracticesPracticeproblemDto dto,
						ModelMap modelMap) throws Exception {
		return practicesService.getProblemList(dto);
	}
	
	
	@RequestMapping(value="/common/api/counsel.do")
	public @ResponseBody void counsel(HttpServletRequest request,
						CounselsCounselDto dto,
						ModelMap modelMap) throws Exception {
		
		counselsService.insertCounselsCounsel(dto);
		
		String handphone = StringUtil.nvl(dto.getMobile_no());
		String email     = StringUtil.nvl(dto.getE_mail());
		
		String mail_content = SendUtil.getEmailTemplete();
		//메일 발송
		if(!email.equals("")) {
			//SendUtil.sendEmail(email, "어셔어학원 ZOOM 온라인 참여강의 온라인 상담 안내문", mail_content);
		}
		
		if(!handphone.equals("")) {
			//SendUtil.sendKakao(handphone, "SJT_044954", "");
		}
		
	}
	
	
	@RequestMapping(value="/common/getArea1.do")
	public @ResponseBody List<BaseAreaDto> getArea1(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseArea1List();
	}
	
	@RequestMapping(value="/common/getCountry1.do")
	public @ResponseBody List<BaseCountryDto> getCountry1(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseCountry1List();
	}
	
	@RequestMapping(value="/common/getArea2.do")
	public @ResponseBody List<BaseAreaDto> getArea2(HttpServletRequest request, BaseAreaDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseArea2List(dto);
	}
	
	@RequestMapping(value="/common/getCountry2.do")
	public @ResponseBody List<BaseCountryDto> getCountry2(HttpServletRequest request, BaseCountryDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseCountry2List(dto);
	}
	
	@RequestMapping(value="/common/getBaseSchoolList.do")
	public @ResponseBody List<BaseSchoolDto> getBaseSchoolList(HttpServletRequest request, BaseSchoolDto dto,
						ModelMap modelMap) throws Exception {
		
		return baseService.getBaseSchoolSearchList(dto);
	}
	
	@RequestMapping(value="/common/downloadFile.do")
	public ModelAndView downloadFile(HttpServletRequest request,HttpServletResponse response, FileDto dto) throws Exception{
		
		String fileName = dto.getFileName();
		String filePath = StringUtil.getTempPath()+fileName;
		File files = new File(filePath);
		
		FileInputStream fin = new FileInputStream(files);;
		
		int ifilesize = (int)files.length();
		byte b[] = new byte[ifilesize];
	
		String strClient = request.getHeader("User-Agent");
	
		response.setContentLength(ifilesize);
		response.reset() ;
		response.setContentType("application/octet-stream");
	
		if(strClient.indexOf("MSIE 5.5") > -1) {
			response.setHeader("Content-Disposition", "filename=" + new String(fileName.getBytes(),"ISO-8859-1") + ";");
		} else {
			response.setHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes("EUC-KR"),"ISO-8859-1") + ";");
		}
		response.setHeader("Content-Length", ""+ifilesize );

		ServletOutputStream outs = response.getOutputStream();
		response.setHeader("Content-Transfer-Encoding", "binary;");
		response.setHeader("Pragma", "no-cache;");
		response.setHeader("Expires", "-1;");
		response.setHeader("Cache-control","private");
	
		if (ifilesize > 0 && files.isFile()) {
			int read = 0;
	
			while((read = fin.read(b)) != -1) {
			outs.write(b,0,read);
			}
		}
		
		return null;
	}
	@RequestMapping(value="/common/getAwsDownload.do")
	public @ResponseBody FileDto getAwsDownload(HttpServletRequest request, FileDto dto, ModelMap modelMap) throws Exception {
		
		String fileName = awsS3Service.downloadWavObject(dto.getAwsFileName());
		String mp3Name = StringUtil.renameFile("mp3");
		
		dto.setFileName(fileName);
		dto.setMp3FileName(mp3Name);
		
		String fileWavPath = StringUtil.getTempPath()+fileName;
		String fileMp3Path = StringUtil.getTempPath()+mp3Name;
		
		File source = new File(fileWavPath);
		File target = new File(fileMp3Path);
		
		AudioAttributes audio = new AudioAttributes();
		audio.setCodec("libmp3lame");
		audio.setBitRate(new Integer(128000));
		audio.setChannels(new Integer(2));
		audio.setSamplingRate(new Integer(44100));
		
		EncodingAttributes attrs = new EncodingAttributes();
		attrs.setFormat("mp3");
		attrs.setAudioAttributes(audio);
		
		Encoder encoder = new Encoder(new MyFFMPEGExecutableLocator());
		
		encoder.encode(source, target, attrs);
		
		return dto;
		
	}
	
	@RequestMapping(value="/common/getMp3Cutter.do")
	public @ResponseBody FileDto getMp3Cutter(HttpServletRequest request, FileDto dto, ModelMap modelMap) throws Exception {
		String sourceFileName = StringUtil.getTempPath()+dto.getWavFileName();
		String fileName = StringUtil.renameFile("wav");
		String destinationFileName = StringUtil.getTempPath()+fileName;
		int startSecond = dto.getStartSecond();
		int secondsToCopy = dto.getSecondsToCopy();
		
		AudioInputStream inputStream = null;
		AudioInputStream shortenedStream = null;

		try {
			File file = new File(sourceFileName);
			
			AudioFileFormat fileFormat = AudioSystem.getAudioFileFormat(file);
			AudioFormat format = fileFormat.getFormat();
			
			inputStream = AudioSystem.getAudioInputStream(file);
			int bytesPerSecond = format.getFrameSize() * (int)format.getFrameRate();
			inputStream.skip(startSecond * bytesPerSecond);
			
			long framesOfAudioToCopy = secondsToCopy * (int)format.getFrameRate();
			shortenedStream = new AudioInputStream(inputStream, format, framesOfAudioToCopy);
			
			File destinationFile = new File(destinationFileName);
			AudioSystem.write(shortenedStream, fileFormat.getType(), destinationFile);
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (inputStream != null) try { inputStream.close(); } catch (Exception e) {  e.printStackTrace();}
			if (shortenedStream != null) try { shortenedStream.close(); } catch (Exception e) { e.printStackTrace(); }
		}
			
		
		dto.setFileName(fileName);
		
		return dto;
		
	}
	
	@RequestMapping(value="/common/getFileUpload.do")
	public @ResponseBody String getFileUpload(@RequestPart MultipartFile file) throws Exception {
		
		String fileName = StringUtil.renameFile("wav");
		String destinationFileName = StringUtil.getTempPath()+fileName;
		File dest = new File(destinationFileName);
		file.transferTo(dest);
		
		return fileName;
		
	}
	
	@RequestMapping(value="/common/getFileUploadNoticeTask.do")
	public @ResponseBody String getFileUploadNoticeTask(@RequestPart MultipartFile file) throws Exception {
		
		String year = StringUtil.getToDayFormat("yyyy");
		String month = StringUtil.getToDayFormat("MM");
		String toDay = StringUtil.getToDayFormat("yyyy-MM-dd");
		
		String storedFolderName = "task/" + year + "/" + month + "/" + toDay;
				
		return awsS3Service.uploadNoticeObject(file, storedFolderName);
		
	}
	
	@RequestMapping(value="/common/getFileUploadNoticeUpload.do")
	public @ResponseBody String getFileUploadNoticeUpload(@RequestPart MultipartFile file) throws Exception {
		
		String year = StringUtil.getToDayFormat("yyyy");
		String month = StringUtil.getToDayFormat("MM");
		String toDay = StringUtil.getToDayFormat("yyyy-MM-dd");
		
		String storedFolderName = "upload/" + year + "/" + month + "/" + toDay;
				
		return awsS3Service.uploadNoticeObject(file, storedFolderName);
		
	}
	
	
	@RequestMapping(value="/common/setMergeWav.do")
	public @ResponseBody FileDto setMergeWav(HttpServletRequest request, FileDto dto) throws Exception {
		List<String> arrTempFile = new ArrayList<String>();
		arrTempFile.add(dto.getFileName());
		String destinationFileName = "";
		
		String data_value = dto.getData_value(); 
		
		JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data_value);
		JSONArray jsonArray = (JSONArray)obj;
		List<AudioInputStream> audioInputStreams = new ArrayList<AudioInputStream>();
		if(jsonArray.size() > 1)
		{
			destinationFileName = StringUtil.renameFile("wav");

			for(int i=0;i<jsonArray.size();i++){
				JSONObject jsonObj = (JSONObject)jsonArray.get(i);
				String fileName = jsonObj.get("fileName").toString();
				arrTempFile.add(fileName);
				audioInputStreams.add(AudioSystem.getAudioInputStream(new File(StringUtil.getTempPath()+fileName)));
			}
			
			AudioInputStream appendedFiles = null;
			String fileName = StringUtil.getTempPath()+destinationFileName;
			for (int i = 0; i< audioInputStreams.size() - 1; i++) {
				 if (i==0) {
					 appendedFiles = new AudioInputStream(
			                    new SequenceInputStream(audioInputStreams.get(i), audioInputStreams.get(i+1)),
			                    audioInputStreams.get(i).getFormat(),
			                    audioInputStreams.get(i).getFrameLength() + audioInputStreams.get(i+1).getFrameLength());
					 continue;
				 }
				 appendedFiles =
			                new AudioInputStream(
			                        new SequenceInputStream(appendedFiles, audioInputStreams.get(i+1)),
			                        appendedFiles.getFormat(),
			                        appendedFiles.getFrameLength() + audioInputStreams.get(i+1).getFrameLength());
			}
			try {
		        AudioSystem.write(appendedFiles,
		        		AudioFileFormat.Type.WAVE,
		                new File(fileName));
		    } catch (Exception e) {
		    	e.printStackTrace();
		    }
			
		}else {
			JSONObject jsonObj = (JSONObject)jsonArray.get(0);
			destinationFileName = jsonObj.get("fileName").toString();
			arrTempFile.add(destinationFileName);
		}
		
		File file = new File(StringUtil.getTempPath()+destinationFileName);
		String year = StringUtil.getToDayFormat("yyyy");
		String month = StringUtil.getToDayFormat("MM");
		String toDay = StringUtil.getToDayFormat("yyyy-MM-dd");
		
		String storedFileName = "upload/" + year + "/" + month + "/" + toDay + "/" + StringUtil.renameFile("wav");
		
		String awsFileName = awsS3Service.uploadWavObject(file, storedFileName);
		
		FileDto resultDto = new FileDto();
		resultDto.setAwsFileName(awsFileName);
		
		
		for(int i=0; i<arrTempFile.size(); i++)
		{
			String deleteFile = StringUtil.getTempPath()+arrTempFile.get(i);
			
			File delFile = new File(deleteFile);
			delFile.delete();
			System.out.println(deleteFile+" is delete!!!");
		}
		return resultDto;
		
	}
	
	class MyFFMPEGExecutableLocator extends FFMPEGLocator{
		@Override
		protected String getFFMPEGExecutablePath() {
			// TODO Auto-generated method stub
			String path = "/usr/bin/ffmpeg";  //OSX, Linux기준
	
			//String path = "D:/ffmpeg/bin/ffmpeg.exe";//Windows 기준
		return path;
		}
	}

}