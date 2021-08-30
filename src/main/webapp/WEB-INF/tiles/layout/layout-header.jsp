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
		<!-- 
		<li class="has-sub">
			<a href="javascript:;">
				<i class="fa fa-book"></i>
				<span>시험 과목 관리 </span>
				<b class="caret"></b>
			</a>
			<ul class="sub-menu">
				<li class="has-sub">
					<a href="javascript:;">
						시험 타입 관리
						<b class="caret"></b>
					</a>
					<ul class="sub-menu">			
						<li><a href="/subject/type.do">시험 타입 관리</a></li>
						<li><a href="/subject/section_type.do">섹션별 시험 타입 관리</a></li>
						<li><a href="/subject/section_type_url.do">섹션별 시험 타입 URL 관리</a></li>
					</ul>
				</li>
				<li class="has-sub">
					<a href="javascript:;">
						시험 과목 관리
						<b class="caret"></b>
					</a>
					<ul class="sub-menu">			
						<li><a href="/subject/section.do">섹션 관리</a></li>
						<li><a href="/subject/book.do">교재 관리</a></li>
						<li><a href="/subject/volume.do">볼륨 관리</a></li>
						<li><a href="/subject/group.do">그룹 관리</a></li>
						<li><a href="/subject/problem.do">지문 관리</a></li>
					</ul>
				</li>
			</ul>
		</li>		
		<li class="has-sub">
			<a href="javascript:;">
				<i class="ion-ios-color-filter bg-indigo"></i>
				<span>시험 문제 관리</span>
				<b class="caret"></b>
			</a>
			<ul class="sub-menu">
				<li><a href="/exam/voca.do">VOCA 시험 문제 관리</a></li>
				<li><a href="/exam/passage_list.do">구문/단어 시험 문제 관리</a></li>
				<li><a href="/exam/chain_list.do">묶기 시험 문제 관리</a></li>
				<li><a href="/exam/grammar_list.do">Grammar 시험 문제 관리</a></li>
				<li><a href="/exam/listening_list.do">Listening 시험 문제 관리</a></li>
				<li><a href="/exam/reading_list.do">Reading 시험 문제 관리</a></li>
				<li><a href="/exam/speaking_list.do">Speaking 시험 문제 관리</a></li>
				<li><a href="/exam/writing_list.do">Writing 시험 문제 관리</a></li>
				<li><a href="/exam/typing_list.do">Typing 시험 문제 관리</a></li>
				<li><a href="/exam/dictation_list.do">Dictation 시험 문제 관리</a></li>
				<li><a href="/exam/memorization_list.do">암기 시험 문제 관리</a></li>
				<li><a href="/exam/stt_list.do">STT 시험 문제 관리</a></li>
				<li class="has-sub">
					<a href="javascript:;">
						듀오링고 시험 관리
						<b class="caret"></b>
					</a>
					<ul class="sub-menu">			
						<li><a href="/exam/duolingo_voca_lang_list.do">듀오링고 단어 언어 관리</a></li>
						<li><a href="/exam/duolingo_voca_list.do">듀오링고 단어시험 관리</a></li>
						<li><a href="/exam/duolingo_sentence_list.do">듀오링고 문장시험 관리</a></li>
						<li><a href="/exam/duolingo_blank_list.do">듀오링고 빈칸시험 관리</a></li>
						<li><a href="/exam/duolingo_image_list.do">듀오링고 이미지시험 관리</a></li>
						<li><a href="/exam/duolingo_describe_list.do">듀오링고 질문답하기시험 관리</a></li>
					</ul>
				</li>
			</ul>			
		</li>	
		 -->	
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
				<!-- 
				<li><a href="/test/mock_test_direction.do">모의고사 Direction 관리</a></li>
				<li><a href="/test/mock_test_schedule.do">모의고사 스케쥴 관리</a></li>
				<li><a href="/test/correct_writing_list.do">Writing 첨삭 관리</a></li>
				<li><a href="/test/correct_speaking_list.do">Speaking 첨삭 관리</a></li>
				-->
			</ul>			
		</li>	
		<!-- 	
		<li class="has-sub">
			<a href="javascript:;">
				<i class="ion-ios-map bg-gradient-orange"></i>
				<span>배치고사 관리</span>
				<b class="caret"></b>
			</a>
			<ul class="sub-menu">
				<li><a href="/batch/direction.do">Direction 관리</a></li>
				<li class="has-sub">
					<a href="javascript:;">
						문제 관리
						<b class="caret"></b>
					</a>
					<ul class="sub-menu">
						<li><a href="/batch/reading_exam.do">Reading 문제 관리</a></li>
						<li><a href="/batch/grammar_exam.do">Grammar 문제 관리</a></li>
						<li><a href="/batch/listening_exam.do">Listening 문제 관리</a></li>
						<li><a href="/batch/toeic_exam.do">TOEIC 문제 관리</a></li>
					</ul>
				</li>
				<li><a href="/batch/schedule.do">Schedule 관리</a></li>
				<li><a href="/batch/consultation.do">상담 관리</a></li>
				
				<li><a href="/batch/course_result.do">배치고사 성적현황</a></li>

				<li><a href="/batch/consultation_schedule_detail.do">신규 상담 현황(상세)</a></li>
				<li><a href="/batch/consultation_schedule_list.do">신규 상담 현황(달력)</a></li>
			</ul>
		</li>	
		<li class="has-sub">
			<a href="javascript:;">
				<i class="ion-ios-list bg-indigo"></i>
				<span>게시판 관리</span>
				<b class="caret"></b>
			</a>
			<ul class="sub-menu">
				<li><a href="/board/memoirs_list.do">수기 게시판 관리</a></li>
			</ul>
		</li>	
		<li class="has-sub">
			<a href="javascript:;">
				<i class="ion-ios-podium bg-gradient-orange"></i>
				<span>현황</span>
				<b class="caret"></b>
			</a>
			<ul class="sub-menu">
				<li><a href="/stats/school.do">학교 현황</a></li>
			</ul>
		</li>	
		<li class="has-sub">
			<a href="javascript:;">
				<i class="ion-ios-attach bg-green"></i>
				<span>첨삭 관리</span>
				<b class="caret"></b>
			</a>
			<ul class="sub-menu">
				<li><a href="/correction/writing_correct_list.do">Writing 첨삭 관리</a></li>
				<li><a href="/correction/speaking_correct_list.do">Speaking 첨삭 관리</a></li>
				<li><a href="/correction/appeal_correct_list.do">이의신청 모아 보기</a></li>			
			</ul>			
		</li>	
		<li class="has-sub">
			<a href="javascript:;">
				<i class="ion-ios-list bg-green"></i>
				<span>외부 관리</span>
				<b class="caret"></b>
			</a>
			<ul class="sub-menu">
				<li class="has-sub">
					<a href="javascript:;">
						기초 관리
						<b class="caret"></b>
					</a>
					<ul class="sub-menu">
						<li><a href="/correction/problem_correction.do">지문관리</a></li>
						<li><a href="/correction/practice_test_type.do">시험 관리</a></li>
						<li><a href="/correction/book_practice.do">BOOK별 시험(인강)관리</a></li>
						<li><a href="/correction/online_video.do">지문별 인강 관리</a></li>
						<li><a href="/correction/oral_test.do">Oral Test 관리</a></li>
					</ul>
				</li>
				<li class="has-sub">
					<a href="javascript:;">
						상품 관리
						<b class="caret"></b>
					</a>
					<ul class="sub-menu">
						<li><a href="/correction/shop_product.do">상품 관리</a></li>
						<li><a href="/correction/user_product.do">첨삭/이용권 관리</a></li>
					</ul>
				</li>
			</ul>			
		</li>		
		<li class="has-sub">
			<a href="javascript:;">
				<i class="ion-ios-calendar bg-pink"></i>
				<span>노티스 관리</span>
				<b class="caret"></b>
			</a>
			<ul class="sub-menu">
				<li class="has-sub">
					<a href="javascript:;">
						노티스 관리
						<b class="caret"></b>
					</a>
					<ul class="sub-menu">
						<li><a href="/notice/routine.do">루틴 관리</a></li>
						<li><a href="/notice/task_manage.do">TASK 관리</a></li>
					</ul>
				</li>
				<li class="has-sub">
					<a href="javascript:;">
						노티스 설정
						<b class="caret"></b>
					</a>
					<ul class="sub-menu">
						<li><a href="/notice/routine_coursegroup_daily.do">루틴 설정(반 그룹)</a></li>
						<li><a href="/notice/routine_oraganization_daily.do">루틴 설정(조직도)</a></li>
						<li><a href="/notice/routine_coursegroup_schedule_monthly.do">Monthly 루틴 스케쥴 설정</a></li>
						<li><a href="/notice/task.do">TASK 설정(동선)</a></li>
					</ul>
				</li>
				<li class="has-sub">
					<a href="javascript:;">
						노티스 현황
						<b class="caret"></b>
					</a>
					<ul class="sub-menu">
						<li><a href="/notice/task_stats.do">TASK 현황</a></li>
						<li><a href="/notice/notice_stats_monthly_oraganization.do">노티스 월간 현황(조직별)</a></li>
						<li><a href="/notice/notice_stats_monthly_user.do">노티스 월간 현황(직원별)</a></li>
						<li><a href="/notice/notice_stats_daily_oraganization.do">노티스 일일 현황(조직별)</a></li>
						<li><a href="/notice/notice_stats_daily_user.do">노티스 일일 현황(직원별)</a></li>
						<li><a href="/notice/notice_work_log.do">노티스 작업 로그</a></li>
						
					</ul>
				</li>
			</ul>
		</li>		
		<li class="has-sub">
			<a href="javascript:;">
				<i class="ion-ios-flower"></i>
				<span>기본정보 관리 </span>
				<b class="caret"></b>
			</a>
			<ul class="sub-menu">
				<li class="has-sub">
					<a href="javascript:;">
						학원 관리
						<b class="caret"></b>
					</a>
					<ul class="sub-menu">
						<li><a href="/base/address.do">건물 관리</a></li>
						<li><a href="/base/kakao_send_code.do">카카오 메시지 코드관리</a></li>
						<li><a href="/base/kakao_send_message.do">카카오 메시지 관리</a></li>
					</ul>
				</li>			
				<li class="has-sub">
					<a href="javascript:;">
						반 관리
						<b class="caret"></b>
					</a>
					<ul class="sub-menu">
						<li><a href="/base/coursegroup.do">반 그룹 관리</a></li>
						<li><a href="/base/course.do">반 관리</a></li>
						<li><a href="/base/course_practice.do">반 시험 관리</a></li>
						<li><a href="/base/coursegroup_timeschedule.do">반그룹별 시간관리</a></li>
					</ul>
				</li>
				<li class="has-sub">
					<a href="javascript:;">
						회원 관리
						<b class="caret"></b>
					</a>
					<ul class="sub-menu">
						<li><a href="/base/auth_user.do">직원 관리</a></li>
						<li><a href="/base/student.do">학생 관리</a></li>
					</ul>
				</li>
				<li class="has-sub">
					<a href="javascript:;">
						조직 관리
						<b class="caret"></b>
					</a>
					<ul class="sub-menu">
						<li><a href="/base/auth_organization.do">조직도 관리</a></li>
						<li><a href="/base/auth_user_organization.do">조직별 회원 관리</a></li>
					</ul>
				</li>				
				<li class="has-sub">
					<a href="javascript:;">
						지역 관리
						<b class="caret"></b>
					</a>
					<ul class="sub-menu">
						<li><a href="/base/area.do">지역 관리</a></li>
						<li><a href="/base/country.do">해외지역 관리</a></li>
					</ul>
				</li>
				<li class="has-sub">
					<a href="javascript:;">
						학교 관리
						<b class="caret"></b>
					</a>
					<ul class="sub-menu">
						<li><a href="/base/school.do">학교 관리</a></li>
						<li><a href="/base/user_school.do">학교 비매칭 관리</a></li>
					</ul>
				</li>
				<li class="has-sub">
					<a href="javascript:;">
						기초 항목 관리
						<b class="caret"></b>
					</a>
					<ul class="sub-menu">
						<li><a href="/base/book.do">책 관리</a></li>				
						<li><a href="/base/orientation.do">OT 항목 관리</a></li>				
						<li><a href="/base/exam_ruburic.do">첨삭 루브릭 관리</a></li>				
						<li><a href="/base/exam_ruburic_standard.do">첨삭 루브릭 채점기준 관리</a></li>
					</ul>
				</li>
			</ul>
		</li>
		 -->
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
