<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<input type="hidden" id="course_id" value="${classInfo.course_id}">
<input type="hidden" id="section" value="${classInfo.section}">
<input type="hidden" id="class_date" value="${classInfo.date}">
<input type="hidden" id="user_id" value="${classInfo.user_id}">

<div class="bg-white">
	<div class="row bg-purple p-t-20 p-l-20">
		<div class="col-2">
			<h4>SP/WR 수업</h4>
		</div>
		<div class="col-1 text-right">
			<button type="button" class="btn btn-default btn-lg" onclick="date_prev()"><</button>
		</div>
		<div class="col-2" >
			<input type="text" id="select_date_text" class="form-control form-control-lg text-center" readonly>
		</div>
		<div class="col-1">
			<button id="btn_next" type="button" class="btn btn-default btn-lg" onclick="date_next()" disabled>></button>
			<div class="input-group date" id="datepicker-disabled-past" data-date-format="yyyy-dd-mm" data-date-end-date="Date.default" style="width:auto;display:inline-block;">
				<input id="search_date" type="hidden" placeholder="Select Date"  value="${classInfo.date}"/>
				<button type="button" class="btn btn-default btn-lg"><i class="fa fa-calendar"></i></button>
			</div>					
		</div>
		<div class="col-4 mb-4">
			<select id="search_schedule" class="form-control form-control-lg">
			</select>
		</div>
		<div class="offset-1 col-1">
			<button type="button" class="btn btn-primary btn-lg btn-block" onClick="close_class()">수업종료</button>
		</div>
		<div class="col-2 mb-2">
			<button type="button" class="subject speaking_problem btn btn-grey btn-lg btn-block" onClick="change_subject('speaking_problem')">Speaking 모든문제</button>
		</div>
		<div class="col-2">
			<button type="button" class="subject writing_problem btn btn-grey btn-lg btn-block" onClick="change_subject('writing_problem')">Writing 모든문제</button>
		</div>
		<div class="offset-1 col-7">
			<table style="width:100%;">
				<colgroup>
					<col style="width:20%;" />
					<col style="width:20%;" />
					<col style="width:20%;" />
					<col style="width:20%;" />
					<col style="width:20%;" />
				</colgroup>
				<tr>
					<td>
						<button type="button" class="subject analysis btn btn-info btn-lg btn-block" onClick="change_subject('analysis')">분석</button>
					</td>
					<td>
						<button type="button" class="subject exam_script btn btn-grey btn-lg btn-block" onClick="change_subject('exam_script')">(스크립트)+(음원)+문제</button>
					</td>
					<td>
						<button type="button" class="subject white_board btn btn-grey btn-lg btn-block" onClick="change_subject('white_board')">화이트 보드</button>
					</td>
					<td>
						<button type="button" class="subject twelve btn btn-grey btn-lg btn-block" onClick="change_subject('twelve')">Speaking 12간지</button>
					</td>
					<td>
						<button type="button" class="subject five_rules btn btn-grey btn-lg btn-block" onClick="change_subject('five_rules')">Writing 5Rules</button>
					</td>
				</tr>
			</table>
		</div>
	</div>
	<div style="padding-left:10px;padding-right:10px;">
		<div class="row mt-3">
			<div class="col-12 subject_content" id="subject_speaking_problem" style="display:none;">
				<div class="row">
					<div class="col-3">
						<div class="panel panel-inverse" style="border:1px solid #000;">
							<div class="panel-heading">
								<h4 class="panel-title">유형</h4>
							</div>
							<div class="list-group panel-body p-0">
								<div class="list-group-item  d-flex border-top-0">
									<div class="mr-3 f-s-16">
										<i class="far fa-question-circle text-muted fa-fw"></i> 
									</div>
									<div class="flex-fill">
										<div class="f-s-14 f-w-500">TASK1(독립형)</div>
										<div class="mb-1 f-s-12">
											<div class="text-inverse-lighter flex-1">단순의 질문을 보고,개인의 생각을 말하는 유형입니다.<br>(Speaking Only)<br>15초 준비, 45초 답변</div>
										</div>
									</div>
								</div>
								<div class="list-group-item  d-flex border-top-0">
									<div class="mr-3 f-s-16">
										<i class="far fa-question-circle text-muted fa-fw"></i> 
									</div>
									<div class="flex-fill">
										<div class="f-s-14 f-w-500">TASK2(통합형)</div>
										<div class="mb-1 f-s-12">
											<div class="text-inverse-lighter flex-1">리딩 지문을 읽고 대화를 듣고 말하는 유형입니다.<br>(Reading+Listening+Speaking)<br>30초 준비, 60초 답변</div>
										</div>
									</div>
								</div>
								<div class="list-group-item  d-flex border-top-0">
									<div class="mr-3 f-s-16">
										<i class="far fa-question-circle text-muted fa-fw"></i> 
									</div>
									<div class="flex-fill">
										<div class="f-s-14 f-w-500">TASK3(통합형)</div>
										<div class="mb-1 f-s-12">
											<div class="text-inverse-lighter flex-1">학술적인 리딩 지문을 읽고 강의를 듣고 말하는 유형입니다.<br>(Reading+Listening+Speaking)<br>30초 준비, 60초 답변</div>
										</div>
									</div>
								</div>
								<div class="list-group-item  d-flex border-top-0">
									<div class="mr-3 f-s-16">
										<i class="far fa-question-circle text-muted fa-fw"></i> 
									</div>
									<div class="flex-fill">
										<div class="f-s-14 f-w-500">TASK4(통합형)</div>
										<div class="mb-1 f-s-12">
											<div class="text-inverse-lighter flex-1">강의를 듣고 말하는 유형입니다.<br>(Listening+Speaking)<br>20초 준비, 60초 답변</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-9">
						<div class="row">
							<div class="col-12 text-right mb-3">
								<div class="radio radio-css radio-inline">
									<input type="radio" name="radio_speking_book" id="radio_speking_book_1" value="" checked>
									<label for="radio_speking_book_1">전체</label>
								</div>
								<div class="radio radio-css radio-inline">
									<input type="radio" name="radio_speking_book" id="radio_speking_book_2" value="task1">
									<label for="radio_speking_book_2">TASK1(독립형)</label>
								</div>
								<div class="radio radio-css radio-inline">
									<input type="radio" name="radio_speking_book" id="radio_speking_book_3" value="task2">
									<label for="radio_speking_book_3">TASK2(통합형)</label>
								</div>
								<div class="radio radio-css radio-inline">
									<input type="radio" name="radio_speking_book" id="radio_speking_book_4" value="task3">
									<label for="radio_speking_book_4">TASK3(통합형)</label>
								</div>
								<div class="radio radio-css radio-inline">
									<input type="radio" name="radio_speking_book" id="radio_speking_book_5" value="task4">
									<label for="radio_speking_book_5">TASK4(통합형)</label>
								</div>
							</div>
							<div class="col-12">
								<div class="table-responsive">
									<table class="table table-bordered m-b-0">
										<colgroup>
											<col style="width:5%;" />
											<col style="width:10%;" />
											<col style="width:10%;" />
											<col style="width:65%;" />
											<col style="width:10%;" />
										</colgroup>
										<thead>
											<tr class="table-info">
												<th class='text-center'>No.</th>
												<th class='text-center'>유형</th>
												<th class='text-center'>문제번호</th>
												<th class='text-center'>Question</th>
												<th class='text-center'>&nbsp;</th>
											</tr>
										</thead>
										<tbody id="speaking_list">
										</tbody>
									</table>
								</div>	
								<div>
									<ul class="pagination m-t-25 m-b-5" style="justify-content:center;" id="speaking_page">
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12 subject_content" id="subject_writing_problem" style="display:none;">
				<div class="row">
					<div class="col-3">
						<div class="panel panel-inverse" style="border:1px solid #000;">
							<div class="panel-heading">
								<h4 class="panel-title">유형</h4>
							</div>
							<div class="list-group panel-body p-0">
								<div class="list-group-item  d-flex border-top-0">
									<div class="mr-3 f-s-16">
										<i class="far fa-question-circle text-muted fa-fw"></i> 
									</div>
									<div class="flex-fill">
										<div class="f-s-14 f-w-500">독립형(INDEPENDENT)</div>
										<div class="mb-1 f-s-12">
											<div class="text-inverse-lighter flex-1">단문의 질문을 보고, 쓰는 유형입니다.<br>(Writing Only)<br>30분 동안 작성<br>(최소 300자 이상)</div>
										</div>
									</div>
								</div>
								<div class="list-group-item  d-flex border-top-0">
									<div class="mr-3 f-s-16">
										<i class="far fa-question-circle text-muted fa-fw"></i> 
									</div>
									<div class="flex-fill">
										<div class="f-s-14 f-w-500">통합형(INTEGRATED)</div>
										<div class="mb-1 f-s-12">
											<div class="text-inverse-lighter flex-1">리딩 지문을 읽고 강의를 듣고 쓰는 유형입니다.<br>(Reading+Listening+Speaking)<br>20분 동안 작성 (150 ~ 225자)</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-9">
						<div class="row">
							<div class="col-12 text-right mb-3">
								<div class="radio radio-css radio-inline">
									<input type="radio" name="radio_writing_book" id="radio_writing_book_1" value="" checked>
									<label for="radio_writing_book_1">전체</label>
								</div>
								<div class="radio radio-css radio-inline">
									<input type="radio" name="radio_writing_book" id="radio_writing_book_2" value="independent">
									<label for="radio_writing_book_2">INDEPENDENT(독립형)</label>
								</div>
								<div class="radio radio-css radio-inline">
									<input type="radio" name="radio_writing_book" id="radio_writing_book_3" value="integrated">
									<label for="radio_writing_book_3">INTEGRATED(통합형)</label>
								</div>
							</div>
							<div class="col-12">
								<div class="table-responsive">
									<table class="table table-bordered m-b-0">
										<colgroup>
											<col style="width:5%;" />
											<col style="width:10%;" />
											<col style="width:10%;" />
											<col style="width:65%;" />
											<col style="width:10%;" />
										</colgroup>
										<thead>
											<tr class="table-info">
												<th class='text-center'>No.</th>
												<th class='text-center'>유형</th>
												<th class='text-center'>문제번호</th>
												<th class='text-center'>Question</th>
												<th class='text-center'>&nbsp;</th>
											</tr>
										</thead>
										<tbody id="writing_list">
										</tbody>
									</table>
								</div>	
								<div>
									<ul class="pagination m-t-25 m-b-5" style="justify-content:center;" id="writing_page">
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12 subject_content" id="subject_analysis">
				<div class="table-responsive">
					<table class="table table-bordered m-b-0">
						<colgroup>
							<col style="width:4%;" />
							<col style="width:7%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:36%;" />
							<col style="width:6%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
						</colgroup>
						<thead>
							<tr class="table-info">
								<th class='text-center'>No.</th>
								<th class='text-center'>문제유형</th>
								<th class='text-center'>문제번호</th>
								<th class='text-center'>상태</th>
								<th class='text-center'>질문</th>
								<th class='text-center'>작성일</th>
								<th class='text-center'>작성자</th>
								<th class='text-center'>자가첨삭</th>
								<th class='text-center'>루브릭 채점</th>
								<th class='text-center'>첨삭</th>
								<th class='text-center'>오답노트</th>
							</tr>
						</thead>
						<tbody id="analysis_list">
						</tbody>
					</table>
				</div>	
				<div>
					<ul class="pagination m-t-25 m-b-5" style="justify-content:center;" id="analysis_page">
					</ul>
				</div>
			</div>
			<div class="col-12 subject_content" id="subject_exam_script" style="display:none;">
				<div class="row">
					<div class="col-6">
						<table class="table table-bordered">
							<colgroup>
								<col style="width:100%;" />
							</colgroup>
							<tbody>
								<tr>
									<th class="text-center bg-danger text-white">Question</th>
								</tr>
								<tr>
									<td style="padding-top:20px;padding-bottom:20px;">
										<p id="question"></p>
									</td>
								</tr>
								<tr>
									<th class="text-center bg-danger text-white">지문</th>
								</tr>
								<tr>
									<td style="padding-top:20px;padding-bottom:20px;">
										<p id="title" class="text-center"></p>
										<p id="passage"></p>
									</td>
								</tr>
								<tr>
									<th class="text-center bg-danger text-white">Sound</th>
								</tr>
								<tr>
									<td style="padding-top:20px;padding-bottom:20px;">
										<div id="div_sound"></div>
										<p id="sound_script"></p>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="col-6">
						<div class="row mb-3">
							<div class="offset-10 col-2">
								<button type="button" class="btn btn-primary btn-lg btn-block" onClick="save_exam_script()">저장</button>
							</div>
						</div>
						<div class="row">
							<div class="col-12">
								<textarea  class="ckeditor" cols="100" id="white_editor_script" name="white_editor_script" rows="35" style="width:100%;height:600px;"></textarea>
							</div>
						</div>
						
					</div>
				</div>
			</div>
			<div class="col-12 subject_content" id="subject_white_board" style="display:none;">
				<div class="row mb-3">
					<div class="offset-9 col-1">
						<button type="button" class="btn btn-primary btn-lg btn-block" onClick="save_white_board()">저장</button>
					</div>
				</div>
				<div class="row">
					<div class="offset-2 col-8">
						<textarea  class="ckeditor" cols="100" id="white_editor_borad" name="white_editor_borad" rows="50" style="width:100%;height:600px;"></textarea>
					</div>
				</div>
			</div>
			<div class="col-12 subject_content" id="subject_twelve" style="display:none;">
				<div class="row">
					<div class="offset-2 col-8" style="border:1px solid #000;padding:15px;" id="div_twelve">
						
					</div>
				</div>
			</div>
			<div class="col-12 subject_content" id="subject_five_rules" style="display:none;">
				<div class="row">
					<div class="offset-2 col-8" style="border:1px solid #000;padding:15px;" id="div_five_rules">
						
					</div>
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
		search_reload();
	});
	</script>
<script src="/assets/js/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="/ui/test/class/speaking_writing_class.js"></script>