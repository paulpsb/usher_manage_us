package com.usher.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.usher.dto.StudentsStudentDto;

@Repository
public interface StudentsStudentDao{
	public List<StudentsStudentDto> getStudentsStudentSearchList(StudentsStudentDto dto) throws Exception;
	public List<StudentsStudentDto> getStudentsStudentSearchEnrollmentList(StudentsStudentDto dto) throws Exception;
	public List<StudentsStudentDto> getStudentsStudentSemesterList(StudentsStudentDto dto) throws Exception;
	public StudentsStudentDto getExcelUser(StudentsStudentDto dto) throws Exception;
}