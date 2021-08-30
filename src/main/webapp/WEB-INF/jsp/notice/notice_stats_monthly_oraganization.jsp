<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<div class="row">
		<div class="col-3">
			<h1 class="page-header">노티스 월간 현황(조직별)</h1>
		</div>
		<div class="col-2 text-right">
			<button type="button" class="btn btn-default" onclick="click_prev()"><</button>
		</div>
		<div class="col-2 text-center">
			<h4 class="panel-title" style="padding-top:6px;" id="stats_month"></h4>
		</div>
		<div class="col-2">
			<button id="btn_next" type="button" class="btn btn-default" onclick="click_next()">></button>
		</div>
		<div class="col-2 text-right">
			<div class="radio radio-css radio-inline">
				<input type="radio" name="view_gubun" id="view_gubun_summery" value="summery" checked>
				<label for="view_gubun_summery">요약</label>
			</div>
			<div class="radio radio-css radio-inline">
				<input type="radio" name="view_gubun" id="view_gubun_detail" value="detail">
				<label for="view_gubun_detail">상세</label>
			</div>
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">노티스 월간 현황(조직별)</h4>
				</div>
				<div class="panel-body">
					<div class="row mb-3">
						<div class="col-4">
							<h5>%의 순서는 <label class="badge badge-default">신규/출결/성적</label>&nbsp;<label class="badge badge-default">Routine/Task</label> 순서입니다.</h5>
						</div>
						<div class="offset-4 col-4">
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
					<div class="row mb-3">
						<div class="col-12" id="organization_list">
						</div>
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
<script type="text/javascript" src="/ui/notice/notice_stats_monthly_oraganization.js"></script>
