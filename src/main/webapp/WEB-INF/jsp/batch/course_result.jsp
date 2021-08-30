<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">배치고사 성적현황</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area" class="row mb-3">
		<div class="offset-2 col-2">
			<select class="form-control" id="search_semester_id">
				<option value="">년/월</option>
			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="search_test_type">
				<option value="TOEFL">토플</option>
				<option value="TOEIC">토익</option>
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_course_group_id">
				<option value="">반 그룹</option>
			</select>
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="form_excel()"><i class="fa fa-file-excel fa-fw"></i> excel</button>
		</div>
	</div>
	<div class="row">
		<div class="offset-2 col-8">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">배치고사 성적현황</h4>
				</div>
				<div class="panel-body">
					<div class="table-responsive text-center">
						<table id="tbl_result" class="table table-bordered m-b-0" style="width:860px;margin-left:auto;margin-right:auto;">
							<thead style="float:left; width:860px;">
								<tr>
									<th class="text-center table-info" rowspan="2" style="width:120px;">&nbsp;</th>
									<th class="text-center table-info" rowspan="2" style="width:120px;">이름</th>
									<th class="text-center table-info" rowspan="2" style="width:120px;">반배치반</th>
									<th class="text-center table-info" colspan="3" style="width:300px;">Grammar</th>
									<th class="text-center table-info" rowspan="2" style="width:100px;">Reading</th>
									<th class="text-center table-info" rowspan="2" style="width:100px;">Listening</th>
								</tr>
								<tr>
									<th class="text-center table-info" style="width:100px;">SW1</th>
									<th class="text-center table-info" style="width:100px;">SW2</th>
									<th class="text-center table-info" style="width:100px;">SW1 + SW2</th>
								</tr>
							</thead>
							<tbody id="data_list" style="overflow-y:scroll; overflow-x:hidden; float:left; width:860px; height:100px">
																																															
							</tbody>
						</table>
					</div>
					<div>
						<ul class="pagination m-t-25 m-b-5" style="justify-content:center;" id="pageList">
						</ul>
					</div>	
				</div>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/batch/course_result.js"></script>
