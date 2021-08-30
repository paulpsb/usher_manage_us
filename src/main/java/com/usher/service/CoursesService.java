package com.usher.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usher.dao.CoursesSemesterDao;
import com.usher.dao.CoursesCoursegroupDao;
import com.usher.dao.CoursesCourseAchieveDao;
import com.usher.dao.CoursesCourseBookDao;
import com.usher.dao.CoursesCourseDao;
import com.usher.dao.CoursesCoursePracticeDao;
import com.usher.dao.CoursesCourseRetakeDao;
import com.usher.dao.CoursesCourseStatsDao;
import com.usher.dao.CoursesCourseTimetableDao;
import com.usher.dto.CoursesSemesterDto;
import com.usher.dto.CoursesCoursegroupDto;
import com.usher.dto.CoursesCourseAchieveDto;
import com.usher.dto.CoursesCourseBookDto;
import com.usher.dto.CoursesCourseDto;
import com.usher.dto.CoursesCoursePracticeDto;
import com.usher.dto.CoursesCourseRetakeDto;
import com.usher.dto.CoursesCourseStatsDto;
import com.usher.dto.CoursesCourseTimetableDto;
import com.usher.util.SessionUtil;

@Service
public class CoursesService{
	@Autowired
	CoursesSemesterDao dao1;

	@Autowired
	CoursesCoursegroupDao dao2;

	@Autowired
	CoursesCourseDao dao3;

	@Autowired
	CoursesCoursePracticeDao dao4;
	
	@Autowired
	CoursesCourseTimetableDao dao5;

	@Autowired
	CoursesCourseAchieveDao dao6;
	
	@Autowired
	CoursesCourseRetakeDao dao7;
	
	@Autowired
	CoursesCourseStatsDao dao8;
	
	@Autowired
	CoursesCourseBookDao dao9;
	
	public List<CoursesSemesterDto> getSemesterList() throws Exception{
		return dao1.getSemesterList();
	}
	
	public CoursesSemesterDto getSemesterDate(CoursesSemesterDto dto) throws Exception{
		return dao1.getSemesterDate(dto);
	}
	public List<CoursesCoursegroupDto> getCoursegroupList(CoursesCoursegroupDto dto) throws Exception{
		return dao2.getCoursegroupList(dto);
	}
	public CoursesCoursegroupDto getCoursegroup(CoursesCoursegroupDto dto) throws Exception{
		return dao2.getCoursegroup(dto);
	}
	public CoursesCoursegroupDto getCoursegroupAsPrevDate(CoursesCoursegroupDto dto) throws Exception{
		return dao2.getCoursegroupAsPrevDate(dto);
	}
	public CoursesCoursegroupDto getCoursegroupAsPrevDateCourse(CoursesCoursegroupDto dto) throws Exception{
		return dao2.getCoursegroupAsPrevDateCourse(dto);
	}
	public void updateCourseGroupRepetitionDate(CoursesCoursegroupDto dto) throws Exception{
		dao2.updateCourseGroupRepetitionDate(dto);
	}
	
	public CoursesCourseDto getCourseCurrent() throws Exception{
		return dao3.getCourseCurrent();
	}
	
	public List<CoursesCourseDto> getCourseList(CoursesCourseDto dto) throws Exception{
		return dao3.getCourseList(dto);
	}
	public List<CoursesCourseDto> getCourseAllList(CoursesCourseDto dto) throws Exception{
		return dao3.getCourseAllList(dto);
	}
	
	public CoursesCourseDto getCourse(CoursesCourseDto dto) throws Exception{
		return dao3.getCourse(dto);
	}
	
	public void updateCourse(CoursesCourseDto dto) throws Exception{
		dao3.updateCourse(dto);
	}
	public void updateCourseRoom(CoursesCourseDto dto) throws Exception{
		dao3.updateCourseRoom(dto);
	}
	public void updateCourseZommUrl(CoursesCourseDto dto) throws Exception{
		dao3.updateCourseZommUrl(dto);
	}
	public void updateCourseSection(CoursesCourseDto dto) throws Exception{
		dao3.updateCourseSection(dto);
	}
	public void updateCourseInstructor(CoursesCourseDto dto) throws Exception{
		dao3.updateCourseInstructor(dto);
	}
	public void updateCourseManager(CoursesCourseDto dto) throws Exception{
		dao3.updateCourseManager(dto);
	}
	public List<CoursesCoursePracticeDto> getCoursesCourseSectionList(CoursesCoursePracticeDto dto) throws Exception{
		return dao4.getCoursesCourseSectionList(dto);
	}
	public List<CoursesCoursePracticeDto> getCoursesCoursePracticeList(CoursesCoursePracticeDto dto) throws Exception{
		return dao4.getCoursesCoursePracticeList(dto);
	}
	public List<CoursesCoursePracticeDto> getCoursesCoursePracticeDailyList(CoursesCoursePracticeDto dto) throws Exception{
		return dao4.getCoursesCoursePracticeDailyList(dto);
	}
	public List<CoursesCoursePracticeDto> getCoursesCourseGroupPracticeList(CoursesCoursePracticeDto dto) throws Exception{
		return dao4.getCoursesCourseGroupPracticeList(dto);
	}
	public List<CoursesCoursePracticeDto> getCoursesCourseGroupPracticeDailyList(CoursesCoursePracticeDto dto) throws Exception{
		return dao4.getCoursesCourseGroupPracticeDailyList(dto);
	}
	public List<CoursesCoursePracticeDto> getCoursesCoursePracticeDailyAllList(CoursesCoursePracticeDto dto) throws Exception{
		return dao4.getCoursesCoursePracticeDailyAllList(dto);
	}
	public List<CoursesCoursePracticeDto> getCoursesCoursePracticeTodayList(CoursesCoursePracticeDto dto) throws Exception{
		return dao4.getCoursesCoursePracticeTodayList(dto);
	}
	public List<CoursesCoursePracticeDto> getCoursesCoursePracticeAsTeacherList(CoursesCoursePracticeDto dto) throws Exception{
		return dao4.getCoursesCoursePracticeAsTeacherList(dto);
	}
	public void insertCoursesCoursePractice(CoursesCoursePracticeDto dto) throws Exception{
		dao4.insertCoursesCoursePractice(dto);
	}
	public void insertCoursesCoursePracticeDailyAll(CoursesCoursePracticeDto dto) throws Exception{
		dao4.insertCoursesCoursePracticeDailyAll(dto);
	}
	public void insertCoursesCoursePracticeDaily(CoursesCoursePracticeDto dto) throws Exception{
		dao4.insertCoursesCoursePracticeDaily(dto);
	}
	public void deleteCoursesCoursePractice(CoursesCoursePracticeDto dto) throws Exception{
		dao4.deleteCoursesCoursePractice(dto);
	}
	public void deleteCoursesCoursePracticeDailyAll(CoursesCoursePracticeDto dto) throws Exception{
		dao4.deleteCoursesCoursePracticeDailyAll(dto);
	}
	public void deleteCoursesCoursePracticeDaily(CoursesCoursePracticeDto dto) throws Exception{
		dao4.deleteCoursesCoursePracticeDaily(dto);
	}
	
	public CoursesCourseTimetableDto getCourseGroupTimeTableTeacher(CoursesCourseTimetableDto dto) throws Exception{
		return dao5.getCourseGroupTimeTableTeacher(dto);
		
	}
	public List<CoursesCourseTimetableDto> getCourseGroupTimeTableList(CoursesCourseTimetableDto dto) throws Exception{
		return dao5.getCourseGroupTimeTableList(dto);
	}
	public List<CoursesCourseTimetableDto> getCourseGroupTimeTableDailyList(CoursesCourseTimetableDto dto) throws Exception{
		return dao5.getCourseGroupTimeTableDailyList(dto);
	}
	public List<CoursesCourseTimetableDto> getCourseTimeTableList(CoursesCourseTimetableDto dto) throws Exception{
		return dao5.getCourseTimeTableList(dto);
	}
	public List<CoursesCourseTimetableDto> getCourseTimeTableDailyList(CoursesCourseTimetableDto dto) throws Exception{
		return dao5.getCourseTimeTableDailyList(dto);
	}
	public List<CoursesCourseTimetableDto> getCourseGroupTimeTableAsTeacherList(CoursesCourseTimetableDto dto) throws Exception{
		return dao5.getCourseGroupTimeTableAsTeacherList(dto);
	}
	public List<CoursesCourseTimetableDto> getCourseGroupTimeTableAsTeacherAllList(CoursesCourseTimetableDto dto) throws Exception{
		return dao5.getCourseGroupTimeTableAsTeacherAllList(dto);
	}
	
	public void insertCourseTimeTable(CoursesCourseTimetableDto dto) throws Exception{
		dao5.insertCourseTimeTable(dto);
	}
	public void insertCourseTimeTableDailyAll(CoursesCourseTimetableDto dto) throws Exception{
		dao5.insertCourseTimeTableDailyAll(dto);
	}
	public void insertCourseTimeTableDaily(CoursesCourseTimetableDto dto) throws Exception{
		dao5.insertCourseTimeTableDaily(dto);
	}
	public void deleteCourseTimeTable(CoursesCourseTimetableDto dto) throws Exception{
		dao5.deleteCourseTimeTable(dto);
	}
	public void deleteCourseTimeTableDailyAll(CoursesCourseTimetableDto dto) throws Exception{
		dao5.deleteCourseTimeTableDailyAll(dto);
	}
	public void deleteCourseTimeTableDaily(CoursesCourseTimetableDto dto) throws Exception{
		dao5.deleteCourseTimeTableDaily(dto);
	}
	public List<CoursesCourseAchieveDto> getCourseAchieveList(CoursesCourseAchieveDto dto) throws Exception{
		return dao6.getCourseAchieveList(dto);
	}
	public void insertCourseAchieve(CoursesCourseAchieveDto dto) throws Exception{
		dao6.insertCourseAchieve(dto);
	}
	public void deleteCourseAchieve(CoursesCourseAchieveDto dto) throws Exception{
		dao6.deleteCourseAchieve(dto);
	}
	
	public CoursesCourseRetakeDto getCoursesCourseRetakeNextSemester(CoursesCourseRetakeDto dto) throws Exception{
		return dao7.getCoursesCourseRetakeNextSemester(dto);
	}
	public List<CoursesCourseRetakeDto> getCoursesCourseRetakeCourseGroupList(CoursesCourseRetakeDto dto) throws Exception{
		return dao7.getCoursesCourseRetakeCourseGroupList(dto);
	}
	public List<CoursesCourseRetakeDto> getCoursesCourseRetakeCourseList(CoursesCourseRetakeDto dto) throws Exception{
		return dao7.getCoursesCourseRetakeCourseList(dto);
	}
	public List<CoursesCourseRetakeDto> getCoursesCourseRetakeList(CoursesCourseRetakeDto dto) throws Exception{
		return dao7.getCoursesCourseRetakeList(dto);
	}
	public List<CoursesCourseRetakeDto> getCoursesCourseRetakeDueList(CoursesCourseRetakeDto dto) throws Exception{
		return dao7.getCoursesCourseRetakeDueList(dto);
	}
	
	public List<CoursesCourseStatsDto> getCourseStatsSemesterList(CoursesCourseStatsDto dto) throws Exception{
		return dao8.getCourseStatsSemesterList(dto);
	}
	public List<CoursesCourseStatsDto> getCourseStatsSemesterBetweenList(CoursesCourseStatsDto dto) throws Exception{
		return dao8.getCourseStatsSemesterBetweenList(dto);
	}
	public List<CoursesCourseStatsDto> getCourseStatsTeacherList(CoursesCourseStatsDto dto) throws Exception{
		return dao8.getCourseStatsTeacherList(dto);
	}
	public List<CoursesCourseStatsDto> getCourseStatsList(CoursesCourseStatsDto dto) throws Exception{
		return dao8.getCourseStatsList(dto);
	}
	
	public List<CoursesCourseBookDto> getCourseGroupBookList(CoursesCourseBookDto dto) throws Exception{
		return dao9.getCourseGroupBookList(dto);
	}
	public List<CoursesCourseBookDto> getCourseBookList(CoursesCourseBookDto dto) throws Exception{
		return dao9.getCourseBookList(dto);
	}
	public CoursesCourseBookDto getCourseBook(CoursesCourseBookDto dto) throws Exception{
		return dao9.getCourseBook(dto);
	}
	public void insertCourseBook(CoursesCourseBookDto dto) throws Exception{
		dao9.insertCourseBook(dto);
	}
	public void deleteCourseBook(CoursesCourseBookDto dto) throws Exception{
		dao9.deleteCourseBook(dto);
	}
}