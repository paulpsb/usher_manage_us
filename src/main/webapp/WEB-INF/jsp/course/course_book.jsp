<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">반 교재 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area" class="row mb-3">
		<div class="col-md-2">
			<select class="form-control" id="search_semester_id">
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
					<h4 class="panel-title">반 교재 관리</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-bordered m-b-0">
							<colgroup>
								<col style="width:10%;" />
								<col style="width:85%;" />
								<col style="width:5%;" />
							</colgroup>							
							<thead>
								<tr class="table-info">
									<th class="text-center">반 명</th>
									<th class="text-center">교재</th>
									<th class="text-center">&nbsp;</th>
								</tr>
							</thead>
							<tbody id="dataList">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-book">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">반별 교재</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive" style="max-height:600px;overflow-y:auto;">
					<table class="table table-th-valign-middle table-td-valign-middle table-bordered m-b-10">
						<colgroup>
							<col style="width:10%;" />
							<col style="width:90%;" />
						</colgroup>	
						<tbody id="book_list">	
		
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_book();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/course/course_book.js"></script>
