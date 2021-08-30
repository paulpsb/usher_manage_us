<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<input type="hidden" id="user_id" value="${teacherInfo.user_id}">
<input type="hidden" id="section" value="${scheduleInfo.section}">
<input type="hidden" id="schedule_date" value="${scheduleInfo.schedule_date}">
<!-- begin #content -->
<div id="content" class="content" style="padding:0;">
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">강사홈</h4>
					<div class="panel-heading-btn">
						<h4 class="panel-title">${teacherInfo.last_name}${teacherInfo.first_name}</h4>
					</div>
				</div>
				<div class="panel-body">
					<div class="row mb-3">
						<div class="col-2 text-right">
							<button type="button" class="btn btn-default" onclick="date_prev()"><</button>
						</div>
						<div class="col-6" >
							<input type="text" id="select_date_text" class="form-control text-center" readonly>
						</div>
						<div class="col-4">
							<button id="btn_next" type="button" class="btn btn-default" onclick="date_next()" disabled>></button>
							<div class="input-group date" id="datepicker-disabled-past" data-date-format="yyyy-dd-mm" data-date-end-date="Date.default" style="width:auto;display:inline-block;">
								<input id="search_date" type="hidden" placeholder="Select Date" />
								<button type="button" class="btn btn-default"><i class="fa fa-calendar"></i></button>
							</div>					
						</div>
					</div>
					<div class="row mb-3">
						<div class="col-4">
							<button type="button" id="btn_type_class" class="search_type btn btn-primary btn-block" style="font-size:0.7rem;" onClick="change_type('class');">수업/스터디<br>TASK</button>
						</div>
						<div class="col-4" >
							<button type="button" id="btn_type_daily" class="search_type btn btn-default btn-block" style="font-size:0.7rem;" onClick="change_type('daily');">Daily<br>Routine</button>
						</div>
						<div class="col-4">
							<button type="button" id="btn_type_monthly" class="search_type btn btn-default btn-block" style="font-size:0.7rem;" onClick="change_type('monthly');">Monthly<br>Routine</button>
						</div>
					</div>
					<div class="table-responsive">
						<table class="table table-bordered m-b-0">
							<colgroup>
								<col style="width:25%;" />
								<col style="width:75%;" />
							</colgroup>
							<thead>
								<tr class="table-info">
									<th class='text-center' colspan="2" id="table_title">수업/스터디</th>
								</tr>
							</thead>
							<tbody id="timetableDataList">
							</tbody>
						</table>
					</div>					
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-notice-schedule">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title text-center" id="notice_schedule_title"></h4>
			</div>
			<div class="modal-body" style="max-height:700px;overflow-y:auto;">
				<div class="row">
					<div class="col-12">
						<div id="accordion" class="accordion">
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
<script>
	$('#datepicker-disabled-past').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	}).on("changeDate", function(e) {
		change_date();
		search_form();
	});
</script>
<!-- end #content -->
<script type="text/javascript" src="/ui/mobile/main/dashboard_teacher.js"></script>
