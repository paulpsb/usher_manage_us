<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<input type="hidden" id="user_id" value="${statsInfo.user_id}">
<input type="hidden" id="user_name" value="${statsInfo.user_name}">
<input type="hidden" id="stats_date" value="${statsInfo.stats_date}">
<!-- begin #content -->
<div id="content" class="content">
	<div class="row" id="search_area">
		<div class="col-4">
			<h1 class="page-header">노티스 월간 현황(직원별)</h1>
		</div>
		<div class="col-4">
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
		<div class="col-3 text-right">
			<h4>
				<span id="select_user_name"></span>
				<button type="button" class="btn btn-white" onclick="showOraganization('Y');">직원 변경</button>
			</h4>
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
<div class="modal fade" id="select_oraganization">
	<div class="modal-dialog" style="min-width:1650px;">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">조직도 선택</h4>
			</div>
			<div class="modal-body">
				<div class="form-group row mb-2">
					<div class="col-12" id="organization_list">
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<a id="btn_cancel_organization" href="javascript:form_oraganization_cancel();" class="btn btn-white" style="display:none;">취소</a>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="/ui/notice/notice_stats_monthly_user.js"></script>
