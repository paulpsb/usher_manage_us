<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<div class="row">
		<div class="col-8">
			<h1 class="page-header">Schedule 관리</h1>
		</div>
		<div class="col-4 text-right">
			<button type="button" class="btn btn-danger" onclick="add_schedule_course()"><i class="fa fa-list fa-fw"></i> Schedule 등록(기존)</button>
			<button type="button" class="btn btn-primary" onclick="add_schedule()"><i class="fa fa-list fa-fw"></i> Schedule 등록(신규)</button>
		</div>		
	</div>
	<!-- begin page-header -->
	<hr />
	<!-- end page-header -->
	
	<div class="row mb-3">
		<div class="offset-2 col-8">
			<div id="calendar" class="vertical-box-column calendar"></div>
		</div>
	</div>
</div>
<!-- end #content -->
<div class="modal fade" id="modal-schedule">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">Schedule(신규) 등록/수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="form-group row">
					<label class="col-2 col-form-label">일자</label>
					<div class="col-6">
						<input id="schedule_id" type="hidden">
						<input id="date" type="text" class="form-control" >
					</div>
				</div>
				<div class="form-group row">
					<label class="col-2 col-form-label">시작 시간</label>
					<div class="col-4">
						<div class="input-group bootstrap-timepicker">
							<input id="start_time" type="text" class="form-control">
							<span class="input-group-addon"><i class="fa fa-clock"></i></span>
						</div>
					</div>
					<label class="col-2 col-form-label">종료 시간</label>
					<div class="col-3">
						<div class="input-group bootstrap-timepicker">
							<input id="end_time" type="text" class="form-control">
							<span class="input-group-addon"><i class="fa fa-clock"></i></span>
						</div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-2 col-form-label">상담자</label>
					<input type="hidden" id="batch_adviser_id">
					<label class="col-5 col-form-label" id="batch_adviser_name"></label>
					<div class="col-5">
						<a href="javascript:search_adviser();" class="btn btn-info">찾기</a>
					</div>
				</div>
				
				<div class="form-group row">
					<label class="col-2 col-form-label">Grammar</label>
					<div class="col-2">
						<div class="checkbox checkbox-css">
							<input type="checkbox" id="batch_grammar" value="1">
							<label for="batch_grammar">Open</label>
						</div>
					</div>
					<label class="col-2 col-form-label">시험시간</label>
					<div class="col-3">
						<input id="batch_grammar_min" type="text" class="form-control">
					</div>
				</div>
				<div class="form-group row">
					<div class="offset-2 col-4">
						<select id="batch_grammar_type" class="form-control">
							<option value="SW DIAGNOSTIC">SW DIAGNOSTIC</option>
						</select>
					</div>
					<div class="col-3">
						<select id="batch_grammar_num" class="form-control">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
						</select>
					</div>
				</div>				
				<div class="form-group row">
					<label class="col-2 col-form-label">Reading</label>
					<div class="col-2">
						<div class="checkbox checkbox-css">
							<input type="checkbox" id="batch_reading" value="1">
							<label for="batch_reading">Open</label>
						</div>
					</div>
					<label class="col-2 col-form-label">시험시간</label>
					<div class="col-3">
						<input id="batch_reading_min" type="text" class="form-control">
					</div>
				</div>
				<div class="form-group row">
					<div class="offset-2 col-4">
						<select id="batch_reading_type" class="form-control">
							<option value="RC DIAGNOSTIC">RC DIAGNOSTIC</option>
						</select>
					</div>
					<div class="col-3">
						<select id="batch_reading_num" class="form-control">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
						</select>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-2 col-form-label">TOEIC</label>
					<div class="col-2">
						<div class="checkbox checkbox-css">
							<input type="checkbox" id="batch_toeic" value="1">
							<label for="batch_toeic">Open</label>
						</div>
					</div>
					<label class="col-2 col-form-label">시험시간</label>
					<div class="col-3">
						<input id="batch_toeic_min" type="text" class="form-control">
					</div>
				</div>
				<div class="form-group row">
					<div class="offset-2 col-4">
						<select id="batch_toeic_type" class="form-control">
							<option value="TOEIC DIAGNOSTIC">TOEIC DIAGNOSTIC</option>
						</select>
					</div>
					<div class="col-3">
						<select id="batch_toeic_num" class="form-control">
							<option value="1">1</option>
						</select>
					</div>
				</div>				
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_schedule();" class="btn btn-success">Save</a>
			</div>
		</div>
	</div>
</div>

<!-- end #content -->
<div class="modal fade" id="modal-schedule-course">
	<div class="modal-dialog" style="max-width:750px;">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">Schedule(기존) 등록/수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="form-group row">
					<label class="col-2 col-form-label">일자</label>
					<div class="col-5">
						<input id="course_schedule_id" type="hidden">
						<input id="course_date" type="text" class="form-control" >
					</div>
					<label class="col-5 col-form-label" id="course_name"></label>
				</div>
				<div class="form-group row" id="div_course">
					<label class="col-2 col-form-label">반</label>
					<div class="col-2">
						<select class="form-control" id="search_semester_id">
							<option value="">년/월</option>
						</select>					
					</div>
					<div class="col-2">
						<select class="form-control" id="search_test_type">
							<option value="TOEFL">토플</option>
							<option value="TOEIC">토익</option>
						</select>					
					</div>
					<div class="col-3">
						<select class="form-control" id="search_course_group_id">
							<option value="">반 그룹</option>
						</select>					
					</div>
					<div class="col-3">
						<select class="form-control" id="search_course_id">
							<option value="">반</option>
						</select>					
					</div>
				</div>				
				<div class="form-group row">
					<label class="col-2 col-form-label">Grammar</label>
					<div class="col-2">
						<div class="checkbox checkbox-css">
							<input type="checkbox" id="course_batch_grammar" value="1">
							<label for="course_batch_grammar">Open</label>
						</div>
					</div>
					<div class="col-5">
						<select id="course_batch_grammar_type" class="form-control">
							<option value="SW DIAGNOSTIC">SW DIAGNOSTIC</option>
						</select>
					</div>
					<div class="col-3">
						<select id="course_batch_grammar_num" class="form-control">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
						</select>
					</div>
				</div>
				<div class="form-group row">
					<label class="offset-2 col-2 col-form-label">시험시간</label>
					<div class="col-2">
						<div class="input-group bootstrap-timepicker">
							<input id="course_batch_grammar_start_time" type="text" class="form-control">
							<span class="input-group-addon"><i class="fa fa-clock"></i></span>
						</div>
					</div>
					<label class="col-1 col-form-label text-center">~</label>
					<div class="col-2">
						<div class="input-group bootstrap-timepicker">
							<input id="course_batch_grammar_end_time" type="text" class="form-control">
							<span class="input-group-addon"><i class="fa fa-clock"></i></span>
						</div>
					</div>
					<div class="col-2">
						<input id="course_batch_grammar_min" type="text" class="form-control">
					</div>
					<label class="col-1 col-form-label">분</label>
				</div>				
				<div class="form-group row">
					<label class="col-2 col-form-label">Reading</label>
					<div class="col-2">
						<div class="checkbox checkbox-css">
							<input type="checkbox" id="course_batch_reading" value="1">
							<label for="course_batch_reading">Open</label>
						</div>
					</div>
					<div class="col-5">
						<select id="course_batch_reading_type" class="form-control">
							<option value="RC DIAGNOSTIC">RC DIAGNOSTIC</option>
						</select>
					</div>
					<div class="col-3">
						<select id="course_batch_reading_num" class="form-control">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
						</select>
					</div>
				</div>
				<div class="form-group row">
					<label class="offset-2 col-2 col-form-label">시험시간</label>
					<div class="col-2">
						<div class="input-group bootstrap-timepicker">
							<input id="course_batch_reading_start_time" type="text" class="form-control">
							<span class="input-group-addon"><i class="fa fa-clock"></i></span>
						</div>
					</div>
					<label class="col-1 col-form-label text-center">~</label>
					<div class="col-2">
						<div class="input-group bootstrap-timepicker">
							<input id="course_batch_reading_end_time" type="text" class="form-control">
							<span class="input-group-addon"><i class="fa fa-clock"></i></span>
						</div>
					</div>
					<div class="col-2">
						<input id="course_batch_reading_min" type="text" class="form-control">
					</div>
					<label class="col-1 col-form-label">분</label>
				</div>
				<div class="form-group row">
					<label class="col-2 col-form-label">Listening</label>
					<div class="col-2">
						<div class="checkbox checkbox-css">
							<input type="checkbox" id="course_batch_listening" value="1">
							<label for="course_batch_listening">Open</label>
						</div>
					</div>
					<div class="col-5">
						<select id="course_batch_listening_type" class="form-control">
							<option value="LC DIAGNOSTIC">LC DIAGNOSTIC</option>
						</select>
					</div>
					<div class="col-3">
						<select id="course_batch_listening_num" class="form-control">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
						</select>
					</div>
				</div>
				<div class="form-group row">
					<label class="offset-2 col-2 col-form-label">시험시간</label>
					<div class="col-2">
						<div class="input-group bootstrap-timepicker">
							<input id="course_batch_listening_start_time" type="text" class="form-control">
							<span class="input-group-addon"><i class="fa fa-clock"></i></span>
						</div>
					</div>
					<label class="col-1 col-form-label text-center">~</label>
					<div class="col-2">
						<div class="input-group bootstrap-timepicker">
							<input id="course_batch_listening_end_time" type="text" class="form-control">
							<span class="input-group-addon"><i class="fa fa-clock"></i></span>
						</div>
					</div>
					<div class="col-2">
						<input id="course_batch_listening_min" type="text" class="form-control">
					</div>
					<label class="col-1 col-form-label">분</label>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_schedule_course();" class="btn btn-success">Save</a>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-auth">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">상담자 조회</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row mb-3">
					<div class="col-8">
						<input type="text" class="form-control" id="search_auth_username">
					</div>	
					<div class="col-4">
						<button type="button" class="btn btn-primary" onclick="auth_search()"><i class="fa fa-search fa-fw"></i> Search</button>
					</div>		
				</div>			
				<div class="table-responsive" style="max-height:300px;overflow-y:auto;">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:40%;" />
							<col style="width:30%;" />
							<col style="width:30%;" />
						</colgroup>	
						<thead>	
							<tr>
								<th class="text-center table-info">아이디</th>
								<th class="text-center table-info">성명</th>
								<th class="text-center table-info">&nbsp;</th>
							</tr>
						</thead>
						<tbody id="authList"></tbody>
						
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
			</div>
		</div>
	</div>
</div>
<script src="/ui/batch/schedule.js"></script>
