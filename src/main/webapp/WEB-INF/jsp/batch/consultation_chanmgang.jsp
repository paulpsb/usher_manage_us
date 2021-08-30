<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">상담관리(참강)</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area">

	</div>
	
	<div class="row">
		<div class="col-xl-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">상담목록</h4>
					<!-- 
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
					 -->
				</div>
				<div class="panel-body">
					<div class="row mb-3">
						<div class="col-4 text-right">
							<button type="button" class="btn btn-default" onclick="date_prev()"><</button>
						</div>
						<div class="col-2" >
							<input type="text" id="select_date_text" class="form-control text-center" readonly>
						</div>
						<div class="col-1">
							<button id="btn_next" type="button" class="btn btn-default" onclick="date_next()" disabled>></button>
							<div class="input-group date" id="datepicker-disabled-past" data-date-format="yyyy-dd-mm" data-date-end-date="Date.default" style="width:auto;display:inline-block;">
								<input id="search_date" type="hidden" placeholder="Select Date" />
								<button type="button" class="btn btn-default"><i class="fa fa-calendar"></i></button>
							</div>					
						</div>
						<input type="hidden" id="search_batch_schedule" value="0">
						<!-- 
						<div class="col-2" >
							<select id="search_batch_schedule" class="form-control text-center">
							</select>
						</div>
						<div class="col-1" >
							<button type="button" id="btn_advice_complete" class="btn btn-primary form-control" onclick="go_question_all()">질문 모아 보기</button>
						</div>						
						<div class="col-1" >
							<button type="button" id="btn_advice_complete" class="btn btn-primary form-control" onclick="save_advice_schedule()">상담완료</button>
						</div>
						 -->						
					</div>
					<div class="table-responsive">
						<table class="table table-bordered m-b-0">
							<colgroup>
								<col style="width:4%;" />
								<col style="width:4%;" />
								<col style="width:4%;" />
								<col style="width:4%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:4%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
							</colgroup>							
							<thead>
								<tr>
									<th class="text-center table-info" rowspan="2">&nbsp;</th>
									<th class="text-center table-info" colspan="5">학생 정보</th>
									<th class="text-center table-info" colspan="6">학생 시험 정보</th>
									<th class="text-center table-info" colspan="4">학생 반배치 정보</th>
									<th class="text-center table-warning" colspan="2">상담자</th>
									<th class="text-center table-active">데스크</th>
								</tr>							
								<tr>
									<th class="batch_sort text-center table-info">
										이름
											<input type="hidden" name="sort_id" value="c.name">
											<input type="hidden" name="sort_asc" value="">
											<div class="show_new_student" style="float:right"></div>
									</th>
									<th class="batch_sort text-center table-info">
										성별
										<input type="hidden" name="sort_id" value="c.gender">
										<input type="hidden" name="sort_asc" value="">
										<div class="show_new_student" style="float:right"></div>
									</th>
									<th class="batch_sort text-center table-info">
										목표<br>점수
										<input type="hidden" name="sort_id" value="c.goal_score">
										<input type="hidden" name="sort_asc" value="">
										<div class="show_new_student" style="float:right"></div>
									</th>
									<th class="batch_sort text-center table-info">
										희망<br>수강
										<input type="hidden" name="sort_id" value="c.attend_start_date">
										<input type="hidden" name="sort_asc" value="">
										<div class="show_new_student" style="float:right"></div>
									</th>
									<th class="batch_sort text-center table-info">
										학원수강<br>기간
										<input type="hidden" name="sort_id" value="c.attend_date">
										<input type="hidden" name="sort_asc" value="">
										<div class="show_new_student" style="float:right"></div>
									</th>
									<th class="batch_sort text-center table-info">
										지각<br>여부
										<input type="hidden" name="sort_id" value="a.batch_delay_min">
										<input type="hidden" name="sort_asc" value="">
										<div class="show_new_student" style="float:right"></div>
									</th>
									<th class="batch_sort text-center table-info">
										집중<br>여부
										<input type="hidden" name="sort_id" value="a.batch_concentration_yn">
										<input type="hidden" name="sort_asc" value="">
										<div class="show_new_student" style="float:right"></div>
									</th>
									<th class="batch_sort text-center table-info">
										재시험<br>희망
										<input type="hidden" name="sort_id" value="a.batch_repeat_exam_yn">
										<input type="hidden" name="sort_asc" value="">
										<div class="show_new_student" style="float:right"></div>
									</th>
									<th class="text-center table-info">보유 점수</th>
									<th class="text-center table-info">배치고사<br>점수</th>
									<th class="batch_sort text-center table-info">
										보유점수기준<br>적합 반
										<input type="hidden" name="sort_id" value="a.batch_user_courses_level">
										<input type="hidden" name="sort_asc" value="">
										<div class="show_new_student" style="float:right"></div>
									</th>
									<th class="batch_sort text-center table-info">
										배치점수기준<br>적합 반
										<input type="hidden" name="sort_id" value="a.batch_select_courses_level">
										<input type="hidden" name="sort_asc" value="">
										<div class="show_new_student" style="float:right"></div>
									</th>
									<th class="batch_sort text-center table-info">
										학생<br>의사
										<input type="hidden" name="sort_id" value="a.batch_select_courses_level">
										<input type="hidden" name="sort_asc" value="">
										<div class="show_new_student" style="float:right"></div>
									</th>
									<th class="batch_sort text-center table-info">
										학생<br>상중하
										<input type="hidden" name="sort_id" value="a.batch_user_level">
										<input type="hidden" name="sort_asc" value="">
										<div class="show_new_student" style="float:right"></div>
									</th>
									<th class="batch_sort text-center table-info">
										수기확인<br>여부
										<input type="hidden" name="sort_id" value="a.memoirs_yn">
										<input type="hidden" name="sort_asc" value="">
										<div class="show_new_student" style="float:right"></div>
									</th>
									<th class="text-center table-warning">상담카드<br>/반 변경</th>
									<th class="batch_sort text-center table-warning">
										상담결과
										<input type="hidden" name="sort_id" value="a.batch_adviser_register_yn">
										<input type="hidden" name="sort_asc" value="">
										<div class="show_new_student" style="float:right"></div>
									</th>
									<th class="batch_sort text-center table-active">
										등록결과
										<input type="hidden" name="sort_id" value="a.batch_desk_register_yn">
										<input type="hidden" name="sort_asc" value="">
										<div class="show_new_student" style="float:right"></div>
									</th>
								</tr>
							</thead>
						</table>
					</div>
					<div class="table-responsive" id="table_data_list" style="height:250px;overflow-y:auto;">
						<table class="table table-bordered m-b-0">
							<colgroup>
								<col style="width:4%;" />
								<col style="width:4%;" />
								<col style="width:4%;" />
								<col style="width:4%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:4%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
							</colgroup>								
							<tbody id="data_list"></tbody>
						</table>
					</div>					
				</div>
			</div>
		</div>
	</div>
</div>
<input type="hidden" id="user_id">
<input type="hidden" id="batch_exam_date">
<div class="modal fade" id="modal-advice">
	<div class="modal-dialog" style="max-width:1200px;">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title text-center" style="width:100%;padding-left:210px;">
					개별 상세상담<span id="advice_title"></span>
				</h4>
				<button type="button" class="btn btn-default" onclick="go_prev()" style="position:absolute;width:120px;float:left;margin-left:120px;"><i class="fa fa-arrow-left fa-fw"></i></button>
				<button type="button" class="btn btn-default" onclick="go_modify()" style="position:absolute;width:150px;margin-left:620px;"><i class="fa fa-share fa-fw"></i> 개인정보 수정</button>
				<button type="button" class="btn btn-default" onclick="go_next()" style="position:relative;width:150px;float:right;margin-right:150px;"><i class="fa fa-arrow-right fa-fw"></i></button>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="padding-top:0px;font-size:3rem;">×</button>
			</div>
			<div class="modal-body" style="height:845px;overflow-y:auto;">
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:10%;" />
							<col style="width:18%;" />
							<col style="width:18%;" />
							<col style="width:18%;" />
							<col style="width:18%;" />
							<col style="width:18%;" />
						</colgroup>					
						<tr>
							<th class="text-center table-warning" style="vertical-align: middle;" rowspan="4">개인정보</th>
							<th class="text-center table-info">이름</th>
							<th class="text-center table-info">성별</th>
							<th class="text-center table-info">생년월일</th>
							<th class="text-center table-info">E-Mail</th>
							<th class="text-center table-info">통학시간</th>
						</tr>					
						<tr style="font-size:1rem;">
							<td class="text-center" id="student_name"></td>
							<td class="text-center" id="gender"></td>
							<td class="text-center" id="birthday"></td>
							<td class="text-center" id="email"></td>
							<td class="text-center" id="commute_min"></td>
						</tr>
						<tr>
							<th class="text-center table-info">연락처(Home)</th>
							<th class="text-center table-info">연락처(phone)</th>
							<th class="text-center table-info">연락처(부모님)</th>
							<th class="text-center table-info" colspan="2">주소</th>
						</tr>					
						<tr>
							<td class="text-center" id="tel_home"></td>
							<td class="text-center" id="tel_phone"></td>
							<td class="text-center" id="tel_emergency"></td>
							<td class="text-center" id="commute_area"  colspan="2"></td>
						</tr>
					</table>
				</div>
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:25%;" />
							<col style="width:25%;" />
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:10%;" />
						</colgroup>					
						<tr>
							<th class="text-center table-warning" style="vertical-align: middle;" rowspan="2">교육</th>
							<th class="text-center table-info">국내/외</th>
							<th class="text-center table-info">학교</th>
							<th class="text-center table-info">전공</th>
							<th class="text-center table-info">학년</th>
							<th class="text-center table-info">상태</th>
							<th class="text-center table-info">군필여부</th>
						</tr>					
						<tr>
							<td class="text-center" id="school_foreign_gubun"></td>
							<td class="text-center" id="school_name"></td>
							<td class="text-center" id="school_major"></td>
							<td class="text-center" id="school_grade"></td>
							<td class="text-center" id="school_state"></td>
							<td class="text-center" id="army"></td>
						</tr>
					</table>
				</div>				
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:15%;" />
							<col style="width:10%;" />
							<col style="width:12%;" />
							<col style="width:15%;" />
							<col style="width:12%;" />
							<col style="width:14%;" />
						</colgroup>					
						<tr>
							<th class="text-center table-warning" style="vertical-align: middle;" rowspan="2">목표</th>
							<th class="text-center table-info">국내/외</th>
							<th class="text-center table-info">목적</th>
							<th class="text-center table-info">목표점수</th>
							<th class="text-center table-info">희망수강일</th>
							<th class="text-center table-info">학원수강기간</th>
							<th class="text-center table-info">점수필요기한</th>
							<th class="text-center table-info">약점파트</th>
						</tr>					
						<tr>
							<td class="text-center" id="purpose_gubun"></td>
							<td class="text-center" id="purpose_detail"></td>
							<td class="text-center" id="goal_score"></td>
							<td class="text-center" id="attend_start_date"></td>
							<td class="text-center" id="attend_date"></td>
							<td class="text-center" id="need_date"></td>
							<td class="text-center" id="week_point"></td>
						</tr>
					</table>
				</div>				
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:10%;" />
							<col style="width:20%;" />
							<col style="width:16%;" />
							<col style="width:20%;" />
							<col style="width:17%;" />
							<col style="width:17%;" />
						</colgroup>					
						<tr>
							<th class="text-center table-warning" style="vertical-align: middle;" rowspan="2">경험</th>
							<th class="text-center table-info">해외거주경험</th>
							<th class="text-center table-info">해외거주경험(개월)</th>
							<th class="text-center table-info">타 학원 경험</th>
							<th class="text-center table-info">타 학원 반</th>
							<th class="text-center table-info">타 학원 다닌 기간</th>
						</tr>					
						<tr>
							<td class="text-center" id="foreign_country"></td>
							<td class="text-center" id="foreign_month"></td>
							<td class="text-center" id="out_name"></td>
							<td class="text-center" id="out_course"></td>
							<td class="text-center" id="out_month"></td>
						</tr>
					</table>
				</div>		
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:10%;" />
							<col style="width:18%;" />
							<col style="width:18%;" />
							<col style="width:18%;" />
							<col style="width:18%;" />
							<col style="width:18%;" />
						</colgroup>					
						<tr>
							<th class="text-center table-warning" style="vertical-align: middle;" rowspan="4">최종배치고사</th>
							<th class="text-center table-info">지각여부</th>
							<th class="text-center table-info">집중여부</th>
							<th class="text-center table-info">재시험여부</th>
							<th class="text-center table-info">보유점수</th>
							<th class="text-center table-info">배치고사점수</th>
						</tr>					
						<tr>
							<td class="text-center" id="batch_delay_min"></td>
							<td class="text-center" id="batch_concentration_yn"></td>
							<td class="text-center" id="batch_repeat_exam_yn"></td>
							<td id="user_score"></td>
							<td id="batch_score"></td>
						</tr>
						<tr>
							<th class="text-center table-info">보유점수기준적합반</th>
							<th class="text-center table-info">배치고사기준적합반</th>
							<th class="text-center table-info">학생의사</th>
							<th class="text-center table-info">강제 배치반</th>
							<th class="text-center table-info">학생 상중하</th>
						</tr>					
						<tr>
							<td class="text-center" id="batch_user_courses"></td>
							<td class="text-center" id="batch_courses"></td>
							<td class="text-center" id="batch_select_courses"></td>
							<td class="text-center" id="batch_adviser_courses_1"></td>
							<td class="text-center" id="batch_user_level"></td>
						</tr>
					</table>
				</div>
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:8%;" />
							<col style="width:24%;" />
							<col style="width:24%;" />
							<col style="width:24%;" />
						</colgroup>					
						<tr>
							<th class="text-center table-warning" style="vertical-align: middle;" rowspan="2">경험</th>
							<th class="text-center table-info">유입경로</th>
							<th class="text-center table-info">의지(주니어)</th>
							<th class="text-center table-info">건강상태</th>
							<th class="text-center table-info">학원에서 알아야 할 개인사정</th>
							<th class="text-center table-info">질문사항</th>
						</tr>					
						<tr>
							<td class="text-center" id="location"></td>
							<td class="text-center" id="student_will"></td>
							<td class="text-center" id="health_desc"></td>
							<td class="text-center" id="personal_desc"></td>
							<td class="text-center" id="batch_user_advice"></td>
						</tr>
					</table>
				</div>	
				<div class="table-responsive">
					<table class="table m-b-10">
						<colgroup>
							<col style="width:20%;" />
							<col style="width:20%;" />
							<col style="width:20%;" />
							<col style="width:20%;" />
							<col style="width:20%;" />
						</colgroup>					
						<tr>
							<th class="text-center table-warning" style="vertical-align: middle;" colspan="4">상담자 코멘트</th>
							<th class="text-right table-warning" style="vertical-align: middle;">
								<button type="button" class="btn btn-primary" onclick="save_advice()"><i class="fa fa-save fa-fw"></i> 저장</button>
							</th>
						</tr>					
						<tr>
							<td colspan="5">
								<textarea class="form-control" rows="3" id="batch_adviser_advice"></textarea>
								<p id="batch_adviser_advice_log"></p>
							</td>
						</tr>
						<tr>
							<th class="text-center table-warning" style="vertical-align: middle;" colspan="5">강제 반 변경</th>
						</tr>					
						<tr>
							<td>
								<select class="form-control" id="batch_adviser_test_type">
									<option value="">선택</option>
								</select>
							</td>
							<td>
								<select class="form-control" id="batch_adviser_student_type">
									<option value="">선택</option>
								</select>
							</td>
							<td>
								<select class="form-control" id="batch_adviser_course_group">
									<option value="">선택</option>
								</select>
							</td>
							<td>
								<select class="form-control" id="batch_adviser_courses">
									<option value="">선택</option>
								</select>
							</td>
							<td>
								<button type="button" class="btn btn-primary" onclick="save_courses()"><i class="fa fa-save fa-fw"></i> 저장</button>
							</td>
						</tr>
						<tr>
							<td colspan="5"><p id="batch_adviser_courses_log"></p></td>
						</tr>
					</table>
				</div>								
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="modal-adviser-register">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">등록여부</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:15%;" />
							<col style="width:15%;" />
							<col style="width:15%;" />
							<col style="width:15%;" />
						</colgroup>					
						<tr>
							<th class="text-center table-info">이름</th>
							<th class="text-center table-info">성별</th>
							<th class="text-center table-info">목표점수</th>
							<th class="text-center table-info">희망 수강</th>
							<th class="text-center table-info">배치결과</th>
							<th class="text-center table-info">등록여부<br>(학생 최초 의사)</th>
							<th class="text-center table-info">등록여부<br>(상담자 확인)</th>
							<th class="text-center table-info">등록여부<br>(데스크 확인)</th>
						</tr>
						<tr>
							<td class="text-center" id="adviser_student_name"></td>
							<td class="text-center" id="adviser_gender"></td>
							<td class="text-center" id="adviser_goal_score"></td>
							<td class="text-center" id="adviser_attend_date"></td>
							<td class="text-center" id="adviser_batch_courses"></td>
							<td class="text-center" id="adviser_user_register"></td>
							<td class="text-center" id="adviser_adviser_register"></td>
							<td class="text-center" id="adviser_desk_register"></td>
						</tr>
					</table>
				</div>
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:15%;" />
							<col style="width:15%;" />
							<col style="width:70%;" />
						</colgroup>					
						<tr>
							<th class="text-center table-info" rowspan="6">등록여부<br>(상담자 확인)</th>
							<th>학생 최초 의사</th>
							<td id="adviser_user_register1"></td>
						</tr>
						<tr>
							<th>등록여부</th>
							<td>
								<div class="radio radio-css radio-inline">
									<input type="radio" name="batch_adviser_register_yn" id="batch_adviser_register_yn_Y" value="Y">
									<label for="batch_adviser_register_yn_Y">당일등록</label>
								</div>
								<div class="radio radio-css radio-inline">
									<input type="radio" name="batch_adviser_register_yn" id="batch_adviser_register_yn_S" value="S">
									<label for="batch_adviser_register_yn_S">등록예정</label>
								</div>							
								<div class="radio radio-css radio-inline">
									<input type="radio" name="batch_adviser_register_yn" id="batch_adviser_register_yn_Q" value="Q">
									<label for="batch_adviser_register_yn_Q">고민</label>
								</div>							
								<div class="radio radio-css radio-inline">
									<input type="radio" name="batch_adviser_register_yn" id="batch_adviser_register_yn_N" value="N">
									<label for="batch_adviser_register_yn_N">거절</label>
								</div>							
							</td>
						</tr>
						<tr>
							<th>등록일자</th>
							<td>
								<input type="text" id="batch_adviser_register_date" placeholder="Select Date" style="width:120px;">
								<span id="adviser_register_txt">학생에게 등록예정일자를 물어보고 기입해주세요.</span>
							</td>
						</tr>
						<tr>
							<th>시작일자</th>
							<td>
								<input type="text" id="batch_adviser_attend_start_date" placeholder="Select Date" style="width:120px;">
								<span>학생의 등원 시작일을 기입해주세요.</span>
							</td>
						</tr>
						<tr>
							<th>특이사항</th>
							<td>
								<textarea class="form-control" rows="3" id="batch_adviser_not_register_desc"></textarea>
							</td>
						</tr>
						<tr>
							<td class="text-right" colspan="2">
								<button type="button" class="btn btn-primary" onclick="save_adviser_register()"><i class="fa fa-save fa-fw"></i> 저장</button>
							</td>
						</tr>
					</table>
				</div>				
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-desk-register">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">등록여부</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:15%;" />
							<col style="width:15%;" />
							<col style="width:15%;" />
							<col style="width:15%;" />
						</colgroup>					
						<tr>
							<th class="text-center table-info">이름</th>
							<th class="text-center table-info">성별</th>
							<th class="text-center table-info">목표점수</th>
							<th class="text-center table-info">희망 수강</th>
							<th class="text-center table-info">배치결과</th>
							<th class="text-center table-info">등록여부<br>(학생 최초 의사)</th>
							<th class="text-center table-info">등록여부<br>(상담자 확인)</th>
							<th class="text-center table-info">등록여부<br>(데스크 확인)</th>
						</tr>
						<tr>
							<td class="text-center" id="desk_student_name"></td>
							<td class="text-center" id="desk_gender"></td>
							<td class="text-center" id="desk_goal_score"></td>
							<td class="text-center" id="desk_attend_date"></td>
							<td class="text-center" id="desk_batch_courses"></td>
							<td class="text-center" id="desk_user_register"></td>
							<td class="text-center" id="desk_adviser_register"></td>
							<td class="text-center" id="desk_desk_register"></td>
						</tr>
					</table>
				</div>
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:15%;" />
							<col style="width:15%;" />
							<col style="width:70%;" />
						</colgroup>					
						<tr>
							<th class="text-center table-info" rowspan="7">등록여부<br>(데스크 확인)</th>
							<th>학생 최초 의사</th>
							<td id="desk_user_register1"></td>
						</tr>
						<tr>
							<th>상담자 확인</th>
							<td id="desk_adviser_register1"></td>
						</tr>
						<tr>
							<th>등록여부</th>
							<td>
								<div class="radio radio-css radio-inline">
									<input type="radio" name="batch_desk_register_yn" id="batch_desk_register_yn_Y" value="Y">
									<label for="batch_desk_register_yn_Y">당일등록</label>
								</div>
								<div class="radio radio-css radio-inline">
									<input type="radio" name="batch_desk_register_yn" id="batch_desk_register_yn_S" value="S">
									<label for="batch_desk_register_yn_S">등록예정</label>
								</div>							
								<div class="radio radio-css radio-inline">
									<input type="radio" name="batch_desk_register_yn" id="batch_desk_register_yn_Q" value="Q">
									<label for="batch_desk_register_yn_Q">고민</label>
								</div>							
								<div class="radio radio-css radio-inline">
									<input type="radio" name="batch_desk_register_yn" id="batch_desk_register_yn_N" value="N">
									<label for="batch_desk_register_yn_N">거절</label>
								</div>							
							</td>
						</tr>
						<tr>
							<th>등록일자</th>
							<td>
								<input type="text" id="batch_desk_register_date" placeholder="Select Date" style="width:120px;">
								<span id="desk_register_txt">학생에게 등록예정일자를 물어보고 기입해주세요.</span>
							</td>
						</tr>
						<tr>
							<th>시작일자</th>
							<td>
								<input type="text" id="batch_desk_attend_start_date" placeholder="Select Date" style="width:120px;">
								<span>학생의 등원 시작일을 기입해주세요.</span>
							</td>
						</tr>
						<tr>
							<th>특이사항</th>
							<td>
								<textarea class="form-control" rows="3" id="batch_desk_not_register_desc"></textarea>
							</td>
						</tr>
						<tr>
							<td class="text-right" colspan="2">
								<button type="button" class="btn btn-primary" onclick="save_desk_register()"><i class="fa fa-save fa-fw"></i> 저장</button>
							</td>
						</tr>
					</table>
				</div>				
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-question">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">질문 모아 보기</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:15%;" />
							<col style="width:15%;" />
							<col style="width:50%;" />
						</colgroup>
						<thead>					
							<tr>
								<th class="text-center table-info">이름</th>
								<th class="text-center table-info">과목</th>
								<th class="text-center table-info">그룹</th>
								<th class="text-center table-info">배치반</th>
								<th class="text-center table-info">질문</th>
							</tr>
						</thead>
						<tbody id="question_list"></tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script>
	$('#datepicker-disabled-past').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	}).on("changeDate", function(e) {
		change_date();
		search_schedule();
	});
	
	$('#batch_adviser_register_date').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	}).on("changeDate", function(e) {

	});
	
	$('#batch_desk_register_date').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	}).on("changeDate", function(e) {

	});
	
	$('#batch_desk_attend_start_date').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	}).on("changeDate", function(e) {

	});
	
	$('#batch_adviser_attend_start_date').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	}).on("changeDate", function(e) {

	});
</script>
<!-- end #content -->
<script type="text/javascript" src="/ui/batch/consultation_chanmgang.js"></script>
