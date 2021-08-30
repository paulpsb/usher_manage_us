<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">개강 인원 현황</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area" class="row mb-3">
		<div class="col-md-2">
			<select class="form-control" id="search_semester_id">
			</select>
		</div>
		<div class="col-md-2">
			<select class="form-control" id="search_course_group_id">
			</select>
		</div>		
		<div class="col-md-1">
			<button type="button" class="btn btn-primary form-control" onclick="search_course()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
	</div>
	
	<div class="row">
		<div class="col-xl-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">개강 인원 파악</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive text-center">
						<table id="tbl_result" class="table table-bordered m-b-0">
							<colgroup>
								<col style="width:calc(100%/9);" />
								<col style="width:calc(100%/9);" />
								<col style="width:calc(100%/9);" />
								<col style="width:calc(100%/9);" />
								<col style="width:calc(100%/9);" />
								<col style="width:calc(100%/9);" />
								<col style="width:calc(100%/9);" />
								<col style="width:calc(100%/9);" />
								<col style="width:calc(100%/9);" />
							</colgroup>						
							<thead>
								<tr>
									<th class="text-center bg-info" colspan="3">기존</th>
									<th class="text-center bg-info" colspan="3">신규</th>
									<th class="text-center bg-info" colspan="3">합계</th>
								</tr>
								<tr>
									<th class="text-center bg-info">구분</th>
									<th class="text-center bg-info">반</th>
									<th class="text-center bg-info">인원(현강/참강)</th>
									<th class="text-center bg-info">구분</th>
									<th class="text-center bg-info">반</th>
									<th class="text-center bg-info">인원(현강/참강)</th>
									<th class="text-center bg-info">구분</th>
									<th class="text-center bg-info">반</th>
									<th class="text-center bg-info">인원(현강/참강)</th>
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
<script type="text/javascript" src="/ui/course/course_student.js"></script>
