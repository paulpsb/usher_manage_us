<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<input type="hidden" id="counseling_user_id" value="${batchInfo.user_id}">

<div id="content" class="content">
	<h1 class="page-header">상담카드</h1>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">상담카드</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col-6">
							<h2>상담내역</h2>
						</div>
						<div class="col-6 text-right">
							<button type="button" class="btn btn-default" onclick="go_modify()"><i class="fa fa-share fa-fw"></i> 개인정보 수정</button>
							<button type="button" class="btn btn-default" onclick="go_modify_score()"><i class="fa fa-share fa-fw"></i> 개인성적 수정</button>
						</div>
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
								<td class="text-center" style="vertical-align: middle;padding:2px;" rowspan="4" id="user_photo">
								</td>
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
						<table class="table table-bordered m-b-10">
							<colgroup>
								<col style="width:10%;" />
								<col style="width:90%;" />
							</colgroup>					
							<tr>
								<th class="text-center table-warning" style="vertical-align: middle;">상담자 코멘트</th>
								<td id="batch_adviser_advice">
								</td>
							</tr>
						</table>
					</div>
					<div class="row">
						<div class="col-4">
							<h2>반배치고사</h2>
							<div class="table-responsive">
								<table class="table table-bordered m-b-10">
									<colgroup>
										<col style="width:20%;" />
										<col style="width:20%;" />
										<col style="width:12%;" />
										<col style="width:12%;" />
										<col style="width:12%;" />
										<col style="width:12%;" />
										<col style="width:12%;" />
									</colgroup>	
									<thead>
										<tr class="table-info">
											<th class="text-center" style="vertical-align: middle;" rowspan="2">일자</th>
											<th class="text-center" style="vertical-align: middle;" rowspan="2">반</th>
											<th class="text-center" style="vertical-align: middle;" colspan="3">GR</th>
											<th class="text-center" style="vertical-align: middle;" rowspan="2">RC</th>
											<th class="text-center" style="vertical-align: middle;" rowspan="2">LC</th>
										</tr>
										<tr class="table-info">
											<th class="text-center" style="vertical-align: middle;">SW1</th>
											<th class="text-center" style="vertical-align: middle;">SW2</th>
											<th class="text-center" style="vertical-align: middle;">SW1+SW2</th>
										</tr>
									</thead>
									<tbody id="batch_exam_list"></tbody>				
								</table>
							</div>
						</div>
						<div class="col-4">
							<h2>모의토플</h2>
							<div class="table-responsive">
								<table class="table table-bordered m-b-10">
									<colgroup>
										<col style="width:25%;" />
										<col style="width:15%;" />
										<col style="width:15%;" />
										<col style="width:15%;" />
										<col style="width:15%;" />
										<col style="width:15%;" />
									</colgroup>	
									<thead>
										<tr class="table-info">
											<th class="text-center" style="vertical-align: middle;" rowspan="2">일자</th>
											<th class="text-center" style="vertical-align: middle;" rowspan="2">RC</th>
											<th class="text-center" style="vertical-align: middle;" rowspan="2">LC</th>
											<th class="text-center" style="vertical-align: middle;" rowspan="2">SP</th>
											<th class="text-center" style="vertical-align: middle;" rowspan="2">WR</th>
											<th class="text-center" style="vertical-align: middle;" rowspan="2">합계</th>
										</tr>
									</thead>
									<tbody id="toefl_mock_exam_list"></tbody>					
								</table>
							</div>
						</div>
						<div class="col-4">
							<h2>실제토플</h2>
							<div class="table-responsive">
								<table class="table table-bordered m-b-10">
									<colgroup>
										<col style="width:25%;" />
										<col style="width:15%;" />
										<col style="width:15%;" />
										<col style="width:15%;" />
										<col style="width:15%;" />
										<col style="width:15%;" />
									</colgroup>	
									<thead>
										<tr class="table-info">
											<th class="text-center" style="vertical-align: middle;" rowspan="2">일자</th>
											<th class="text-center" style="vertical-align: middle;" rowspan="2">RC</th>
											<th class="text-center" style="vertical-align: middle;" rowspan="2">LC</th>
											<th class="text-center" style="vertical-align: middle;" rowspan="2">SP</th>
											<th class="text-center" style="vertical-align: middle;" rowspan="2">WR</th>
											<th class="text-center" style="vertical-align: middle;" rowspan="2">합계</th>
										</tr>
									</thead>
									<tbody id="toefl_real_exam_list"></tbody>				
								</table>
							</div>
						</div>
					</div>
					<h2>수강 및 상담이력</h2>
					<div class="table-responsive">
						<table class="table table-bordered m-b-10">
							<colgroup>
								<col style="width:10%;" />
								<col style="width:15%;" />
								<col style="width:25%;" />
								<col style="width:25%;" />
								<col style="width:25%;" />
							</colgroup>	
							<thead>
								<tr class="table-info">
									<th class="text-center" style="vertical-align: middle;">수강월</th>
									<th class="text-center" style="vertical-align: middle;">반</th>
									<th class="text-center" style="vertical-align: middle;">1주차 상담</th>
									<th class="text-center" style="vertical-align: middle;">2주차 상담</th>
									<th class="text-center" style="vertical-align: middle;">마지막주 상담</th>
								</tr>
							</thead>
							<tbody id="enrollment_list"></tbody>				
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>	
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/enrollment/counseling_card.js"></script>
