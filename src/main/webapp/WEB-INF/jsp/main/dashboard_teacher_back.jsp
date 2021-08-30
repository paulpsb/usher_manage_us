<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<input type="hidden" id="user_id" value="${teacherInfo.user_id}">
<!-- begin #content -->
<div id="content" class="content">
	<div class="row">
		<div class="offset-1 col-10">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">강사홈</h4>
					<div class="panel-heading-btn">
						<h4 class="panel-title">${teacherInfo.last_name}${teacherInfo.first_name}</h4>
					</div>
				</div>
				<div class="panel-body">
					<div class="row mb-3">
						<div class="offset-2 col-3 text-right">
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
					</div>
					<div class="table-responsive">
						<table class="table table-bordered m-b-0">
							<colgroup>
								<col style="width:10%;" />
								<col style="width:15%;" />
								<col style="width:75%;" />
							</colgroup>
							<tbody id="timetableDataList">
							</tbody>
						</table>
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
		search_form();
	});
</script>
<!-- end #content -->
<script type="text/javascript" src="/ui/main/dashboard_teacher.js"></script>
