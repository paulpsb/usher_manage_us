<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">배치 동영상 관리</h1>
	<hr />
	<div id="search_area" class="row mb-3">
		<div class="col-1">
			<select class="form-control" id="search_test_type">
				<option value="TOEFL">토플</option>
				<option value="TOEIC">토익</option>
			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="search_student_type">
				<option value="SENIOR">성인</option>
				<option value="JUNIOR">주니어</option>
			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="search_select_course">
				<option value="batch">배치고사</option>
				<option value="user">보유점수</option>
			</select>
		</div>		
		<div class="col-4">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> 조회</button>
		</div>		
		<div class="col-5 text-right">
			<button type="button" class="btn btn-primary" onclick="form_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
		</div>		
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">배치 동영상 목록</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-striped m-b-0">
							<colgroup>
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:40%;" />
							</colgroup>
							<thead>
								<tr>
									<th class='text-center'>배치고사기준</th>
									<th class='text-center'>보유점수기준</th>
									<th class='text-center'>선택1</th>
									<th class='text-center'>선택2</th>
									<th class='text-center'>최종반배치</th>
									<th class='text-center'>동영상 URL</th>
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
<script type="text/javascript" src="/ui/batch/video.js"></script>