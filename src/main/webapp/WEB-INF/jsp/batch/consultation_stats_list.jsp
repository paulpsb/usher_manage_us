<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">신규 상담 현황</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area" class="row mb-3">
		<div class="offset-2 col-2">
			<select class="form-control" id="semester_date">
				
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="batch_finally_student_type">
				<option value="SENIOR">성인</option>
				<option value="JUNIOR">주니어</option>
			</select>
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
	</div>
	<div class="row">
		<div class="offset-2 col-8">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">신규 상담 현황</h4>
				</div>
				<div class="panel-body">
					<div class="table-responsive text-center">
						<table id="tbl_result" class="table table-bordered m-b-0">
							<colgroup>
								<col style="width:20%;" />
								<col style="width:20%;" />
								<col style="width:20%;" />
								<col style="width:20%;" />
								<col style="width:20%;" />
							</colgroup>						
							<thead>
								<tr>
									<th class="text-center bg-info">총 상담 인원</th>
									<th class="text-center bg-lime" id="result_count"></th>
									<th class="text-center">&nbsp;</th>
									<th class="text-center">&nbsp;</th>
									<th class="text-center">&nbsp;</th>
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
<!-- end #content -->
<script type="text/javascript" src="/ui/batch/consultation_stats_list.js"></script>
