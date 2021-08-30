<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- end breadcrumb -->
	<!-- begin page-header -->
	<h1 class="page-header">특강 단어 자습 관리</h1>
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
			<button type="button" class="btn btn-primary form-control" onclick="search_result()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
	</div>
		
	<!-- begin panel -->
	<div class="panel panel-inverse">
		<div class="panel-heading">
			<h4 class="panel-title">오늘의 특강 단어 자습 현황</h4>
			<div class="panel-heading-btn">
				<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
			</div>
		</div>
		<div class="panel-body">
			<div class="row mb-3">
				<div class="col-2" >
				</div>
				<div class="col-3 text-right">
					<button type="button" class="btn btn-default" onclick="date_prev()"><</button>
				</div>
				<div class="col-2" >
					<input type="text" id="select_date_text" class="form-control text-center" readonly>
				</div>
				<div class="col-2">
					<button id="btn_next" type="button" class="btn btn-default" onclick="date_next()" disabled>></button>
					<div class="input-group date" id="datepicker-disabled-past" data-date-format="yyyy-dd-mm" data-date-end-date="Date.default" style="width:auto;display:inline-block;">
						<input id="search_date" type="hidden" placeholder="Select Date" />
						<button type="button" class="btn btn-default"><i class="fa fa-calendar"></i></button>
					</div>					
				</div>
				<div class="col-3">
				</div>
			</div>
			<div class="table-responsive">
				<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
					<colgroup>
						<col style="width:2%;" />
						<col style="width:4%;" />
						<col style="width:7%;" />
						<col style="width:7%;" />
						<col style="width:5%;" />
						<col style="width:5%;" />
						<col style="width:5%;" />
						<col style="width:5%;" />
						<col style="width:5%;" />
						<col style="width:5%;" />
						<col style="width:5%;" />
						<col style="width:5%;" />
						<col style="width:5%;" />
						<col style="width:5%;" />
						<col style="width:5%;" />
						<col style="width:5%;" />
						<col style="width:5%;" />
						<col style="width:5%;" />
						<col style="width:5%;" />
						<col style="width:5%;" />
						<col style="width:5%;" />
						<col style="width:5%;" />
					</colgroup>
					<thead>
						<tr class="table-active">
							<th class="text-center">반</th>
							<th class="text-center">이름</th>
							<th class="text-center">실제시험</th>
							<th class="text-center">오늘모의</th>
							<th class="text-center">1-15</th>
							<th class="text-center">16-30</th>
							<th class="text-center">31-45</th>
							<th class="text-center">46-60</th>
							<th class="text-center">61-75</th>
							<th class="text-center">76-90</th>
							<th class="text-center">91-105</th>
							<th class="text-center">106-120</th>
							<th class="text-center">121-135</th>
							<th class="text-center">136-150</th>
							<th class="text-center">151-165</th>
							<th class="text-center">166-180</th>
							<th class="text-center">181-195</th>
							<th class="text-center">196-210</th>
							<th class="text-center">211-225</th>
							<th class="text-center">226-246</th>
						</tr>
					</thead>
					<tbody id="dataList">
					</tbody>
				</table>
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
		search_result();
	});
	</script>
	<!-- end panel -->
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/enrollment/independent_study.js"></script>