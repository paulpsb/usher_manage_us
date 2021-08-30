<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">신규 상담 현황(달력)</h1>
	<hr />
	<!-- end page-header -->
	
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">상담 현황(달력)</h4>
				</div>
				<div class="panel-body">
					<div class="table-responsive text-center">
						<table id="tbl_result" class="table table-bordered m-b-0">
							<colgroup>
								<col style="width:calc(100%/7);" />
								<col style="width:calc(100%/7);" />
								<col style="width:calc(100%/7);" />
								<col style="width:calc(100%/7);" />
								<col style="width:calc(100%/7);" />
								<col style="width:calc(100%/7);" />
								<col style="width:calc(100%/7);" />
							</colgroup>						
							<thead>
								<tr>
									<th class="text-center bg-info" style="vertical-align: middle;">
										
									</th>
									<th class="text-center bg-info" style="vertical-align: middle;">
										<button type="button" class="btn btn-default" onClick="click_prev()">◀</button>
									</th>
									<th class="text-center bg-info" colspan="3" style="vertical-align: middle;">
										<h4 id="calendar_title" class="text-white" style="margin:0;"></h4>
									</th>
									<th class="text-center bg-info" style="vertical-align: middle;">
										<button type="button" class="btn btn-default" onClick="click_next()">▶</button>
									</th>
									<th class="text-center bg-info" style="vertical-align: middle;">
										<button type="button" class="btn btn-default" onClick="click_adviser()">개인별 상담성공률 모아보기</button>
									</th>
								</tr>
								<tr>
									<th class="text-center bg-primary text-white">일</th>
									<th class="text-center bg-primary text-white">월</th>
									<th class="text-center bg-primary text-white">화</th>
									<th class="text-center bg-primary text-white">수</th>
									<th class="text-center bg-primary text-white">목</th>
									<th class="text-center bg-primary text-white">금</th>
									<th class="text-center bg-primary text-white">토</th>
								</tr>
							</thead>
							<tbody id="data_list">
																																															
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-adviser">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">개인별 상당 성공률 모아보기</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-12">
						<input type="text" id="start_exam_date" placeholder="Select Date" style="width:100px;"> ~
						<input type="text" id="end_exam_date" placeholder="Select Date" style="width:100px;"> 
						<button type="button" class="btn btn-primary btn-xs" onClick="search_adviser()">조회</button>
					</div>
				</div>
				<div class="row mt-3">
					<div class="col-12">
						<div class="table-responsive">
							<table class="table table-bordered m-b-10">
								<colgroup>
									<col style="width:25%;" />
									<col style="width:25%;" />
									<col style="width:25%;" />
									<col style="width:25%;" />
								</colgroup>
								<thead>					
									<tr>
										<th class="text-center table-info">상담자</th>
										<th class="text-center table-info">상담건수</th>
										<th class="text-center table-info">등록자수</th>
										<th class="text-center table-info">성공률</th>
									</tr>
								</thead>
								<tbody id="adviser_list"></tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script>
	$('#start_exam_date').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	}).on("changeDate", function(e) {

	});
	
	$('#end_exam_date').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	}).on("changeDate", function(e) {

	});
	
	
</script>
<script type="text/javascript" src="/ui/batch/consultation_schedule_list.js"></script>
