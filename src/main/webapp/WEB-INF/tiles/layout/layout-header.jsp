<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- begin #top-menu -->
<div id="top-menu" class="top-menu" style="z-index:999;">
	<!-- begin nav -->
	<ul class="nav">
		<li class="has-sub">
			<a href="/main/dashboard.do">
				<i class="ion-ios-grid bg-gradient-aqua"></i>
				<span>오늘의 현황</span>
			</a>
		</li>
		<li class="has-sub">
			<a href="javascript:;">
				<i class="ion-ios-calendar bg-pink"></i>
				<span>개강 관리</span>
				<b class="caret"></b>
			</a>
			<ul class="sub-menu">
				<li><a href="/course/course_group.do">반그룹 관리</a></li>
				<li><a href="/course/course.do">반 관리</a></li>
				<li><a href="/course/course_book.do">반 교재 관리</a></li>
				<li><a href="/course/course_student.do">개강 인원 파악</a></li>
				<li><a href="/course/course_stats.do">강사/매니저 평가</a></li>
				<li><a href="/course/course_achieve.do">반별 성취점수/장학금 관리</a></li>
				<li><a href="/course/course_timetable.do">시간표</a></li>
				<li><a href="/course/course_practice.do">반별 내신관리(전체)</a></li>
				<li><a href="/course/course_practice_daily.do">반별 내신관리(일자별)</a></li>
				<li><a href="/course/course_schedule.do">Syllabus</a></li>
			</ul>
		</li>
		<li class="has-sub">
			<a href="javascript:;">
				<i class="ion-ios-grid bg-green"></i>
				<span>학생 관리</span>
				<b class="caret"></b>
			</a>
			<ul class="sub-menu">
				<li><a href="/enrollment/course_enrollment.do">학생목록</a></li>
				<li><a href="/enrollment/seat.do">자리배치</a></li>
				<!--<li><a href="/enrollment/practice_result.do">성적현황</a></li>-->
				<li><a href="/enrollment/toefl_excel.do">모의 토플 엑셀업로드</a></li>
				<!-- <li><a href="/enrollment/independent_study.do">특강단어자습관리</a></li> 
				<li><a href="/enrollment/achievement_voca.do">실전 단어한판</a></li>-->
				<li><a href="/enrollment/repetition_enrollment.do">재수강 관리</a></li>
				<li><a href="/enrollment/repetition_enrollment_summary.do">재수강율(요약)</a></li>
				<li><a href="/enrollment/course_retake.do">재수강 트래킹</a></li>
				<li><a href="/enrollment/achievement_new.do">성취표</a></li>
			</ul>			
		</li>
		<li class="has-sub">
			<a href="javascript:;">
				<i class="ion-ios-list bg-green"></i>
				<span>시험관리</span>
				<b class="caret"></b>
			</a>
			<ul class="sub-menu">
				<li><a href="/test/ox_test.do">O/X 퀴즈</a></li>
				<li><a href="/test/voca_interval_test.do">단어 인터널 트레이닝(반별)</a></li>
				<li><a href="/test/voca_interval_test_course_group.do">단어 인터널 트레이닝(반 그룹별)</a></li>
				<li><a href="/test/voca_interval_test_achieve.do">단어 인터널 트레이닝 조회</a></li>
			</ul>			
		</li>	
		 	
		<li class="has-sub">
			<a href="javascript:;">
				<i class="ion-ios-map bg-gradient-orange"></i>
				<span>배치고사 관리</span>
				<b class="caret"></b>
			</a>
			<ul class="sub-menu">
				<li><a href="/batch/schedule.do">Schedule 관리</a></li>
				<li><a href="/batch/course_result.do">배치고사 성적현황</a></li>
			</ul>
		</li>	
		<li class="menu-control menu-control-left">
			<a href="javascript:;" data-click="prev-menu"><i class="fa fa-angle-left"></i></a>
		</li>
		<li class="menu-control menu-control-right">
			<a href="javascript:;" data-click="next-menu"><i class="fa fa-angle-right"></i></a>
		</li>
	</ul>
	<!-- end nav -->
</div>
<!-- end #top-menu -->
