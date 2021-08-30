<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- end breadcrumb -->
	<!-- begin page-header -->
	<h1 class="page-header">오늘의 현황</h1>
	<!-- end page-header -->
	
	<div id="search_area" class="row mb-3">
		<div class="col-md-2">
			<select class="form-control" id="search_semester_id">
				<option value="">년/월</option>
			</select>
		</div>
		<div class="col-md-2">
			<select class="form-control" id="search_test_type">
				<option value="TOEFL">토플</option>
				<option value="TOEIC">토익</option>
			</select>
		</div>
		<div class="col-md-2">
			<select class="form-control" id="search_course_group_id">
				<option value="">반 그룹</option>
			</select>
		</div>
		<div class="col-md-1">
			<button type="button" class="btn btn-primary form-control" onclick="search_dashboard()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
	</div>
		
	<!-- begin panel -->
	<div class="panel panel-inverse">
		<div class="panel-heading">
			<h4 class="panel-title">오늘의 현황</h4>
			<div class="panel-heading-btn">
				<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
			</div>
		</div>
		<div class="panel-body">
			<div class="row mb-3">
				<div class="col-1" >
					<div class="checkbox checkbox-css">
						<input type="checkbox" id="chk_private" value="" >
						<label for="chk_private">공개형</label>
					</div>
				</div>
				<div class="col-4">
					<table class="table m-b-0" id="search_area">
						<colgroup>
							<col style="width:25%;" />
							<col style="width:25%;" />
							<col style="width:25%;" />
							<col style="width:25%;" />
						</colgroup>	
						<thead>
							<tr>
								<th style="border:0 none #000;">
									<input type="radio" class="css-input-radio-checkbox" name="search_main_type" id="search_main_type_1" value="dashboard_info" checked>
									<label class="css-input-radio-checkbox-label" for="search_main_type_1">오늘의 현황</label>
								</th>
								<th style="border:0 none #000;">
									<!-- 
									<input type="radio" class="css-input-radio-checkbox" name="search_main_type" id="search_main_type_2" value="dashboard_achieve" >
									<label class="css-input-radio-checkbox-label" for="search_main_type_2">반성취도</label>
									 -->
								</th>
								<th style="border:0 none #000;">
								</th>
								<th style="border:0 none #000;">
								</th>
							</tr>
						</thead>
					</table>
				</div>				
				<div class="col-1 text-right">
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
				<div class="col-3">
					<table class="table table-bordered m-b-0">
						<colgroup>
							<col style="width:25%;" />
							<col style="width:25%;" />
							<col style="width:25%;" />
							<col style="width:25%;" />
						</colgroup>	
						<thead>
							<tr>
								<th class="bg-green-lighter">80% 이상</th>
								<th class="bg-blue-lighter">60% 이상</th>
								<th class="bg-yellow-lighter">40% 이상</th>
								<th class="bg-red-lighter">40% 이하</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
			<div class="table-responsive" id="div_dashboard">
				
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
		search_dashboard();
	});
	</script>
	<!-- end panel -->
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/main/dashboard.js"></script>
<script type="text/javascript" src="/ui/main/dashboard_stats_info.js"></script>
<script type="text/javascript" src="/ui/main/dashboard_stats_achieve.js"></script>