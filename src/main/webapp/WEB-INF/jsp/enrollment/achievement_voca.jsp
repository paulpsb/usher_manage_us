<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- end breadcrumb -->
	<!-- begin page-header -->
	<h1 class="page-header">실전 단어한판</h1>
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
	<div id="search_area" class="row mb-3">
		<div class="col-9">
			<!-- begin panel -->
			<div class="panel panel-inverse">
				<div class="panel-heading">
					<h4 class="panel-title">실전 단어한판 현황</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive" id="table_info">
					</div>
				</div>
			</div>
		</div>
		<div class="col-3">
			<!-- begin panel -->
			<div class="panel panel-inverse" data-sortable-id="chart-1">
				<div class="panel-heading">
					<h4 class="panel-title" id="chart_01_title">차트</h4>
				</div>
				<div class="panel-body" id="div_chart_01">
					<canvas id="chart_01" height="300" style="width:100%"></canvas>
				</div>
			</div>

			<div class="panel panel-inverse" data-sortable-id="chart-2">
				<div class="panel-heading">
					<h4 class="panel-title" id="chart_02_title">차트</h4>
				</div>
				<div class="panel-body" id="div_chart_02">
					<canvas id="chart_02" height="300" style="width:100%"></canvas>
				</div>
			</div>

		</div>
	</div>	
</div>
<div class="modal fade" id="modal-result">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">시험 결과</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<ul id="result_list">
				</ul>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/enrollment/achievement_voca.js"></script>