package com.usher.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usher.dao.StudentsStudentDao;
import com.usher.dto.StudentsStudentDto;

@Service
public class StudentsService{
	@Autowired
	StudentsStudentDao dao1;

	public List<StudentsStudentDto> getStudentsStudentSearchList(StudentsStudentDto dto) throws Exception{
		return dao1.getStudentsStudentSearchList(dto);
	}
	public List<StudentsStudentDto> getStudentsStudentSearchEnrollmentList(StudentsStudentDto dto) throws Exception{
		return dao1.getStudentsStudentSearchEnrollmentList(dto);
	}
	public List<StudentsStudentDto> getStudentsStudentSemesterList(StudentsStudentDto dto) throws Exception{
		return dao1.getStudentsStudentSemesterList(dto);
	}
	public StudentsStudentDto getExcelUser(StudentsStudentDto dto) throws Exception{
		return dao1.getExcelUser(dto);
	}
}