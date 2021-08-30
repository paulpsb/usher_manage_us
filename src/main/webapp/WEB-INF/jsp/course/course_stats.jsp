<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<div class="row">
		<div class="col-6">
			<h1 class="page-header">강사/매니저 평가</h1>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_semester_start_id">
			</select>
		</div>	
		<div class="col-1 text-center">
			~
		</div>
		<div class="col-2">
			<select class="form-control" id="search_semester_end_id">
			</select>
		</div>	
		<div class="col-1 text-right">
			<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">강사/매니저 평가</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body" id="data_list">
				</div>
			</div>
		</div>
	</div>		
</div>
<script type="text/javascript" src="/ui/course/course_stats.js"></script>

