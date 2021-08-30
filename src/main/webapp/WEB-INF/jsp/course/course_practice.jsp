<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<div class="row">
		<div class="col-6">
			<h1 class="page-header">반별 내신관리(전체)</h1>
		</div>
		<div class="col-4 text-right">
			<h4>
				<span id="select_course_name"></span>
				<button type="button" class="btn btn-white" onclick="showCourses('Y');">반 변경</button>
			</h4>
		</div>	
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
		<div class="col-1 text-right">
			<button type="button" id="btn_save" class="btn btn-primary form-control" onclick="form_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">반별 내신</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="row mb-3">
						<div class="col-6">
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
						<div class="col-6">
							<div class="row mb-3">
								<div class="progressbar-wrapper mb-3">
									<ul class="progressbar" id="progressbar_section">
									</ul>
								</div>
							</div>							
							<table class="table table-bordered m-b-0">
								<colgroup>
									<col style="width:15%;" />
									<col style="width:85%;" />
								</colgroup>
								<tbody id="practiceDataList">
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>		
</div>
<div class="modal fade" id="select_courses">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">반 선택</h4>
			</div>
			<div class="modal-body">
				<div class="form-group row m-b-15">
					<label class="col-form-label col-3 text-right"><h4>년/월</h4></label>
					<div class="col-6">
						<select class="form-control" id="search_semester_id">
						</select>
					</div>
				</div>
				<div id="site_map">
				</div>
			</div>
			<div class="modal-footer" id="btn_cancel_course" style="display:none;">
				<a href="javascript:form_course_cancel();" class="btn btn-white">취소</a>
			</div>
		</div>
	</div>
</div>
<!-- 
<div id="select_courses" style='position:absolute; left:35%; top:20%; right:35%; display:none; z-index:10000;background-color:#ffffff;padding:20px;'>
	<div class="panel panel-inverse" data-sortable-id="table-basic-1">
		<div class="panel-heading">
			<h4 class="panel-title">반 선택</h4>
		</div>
		<div class="panel-body">
			<div class="form-group row m-b-15">
				<label class="col-form-label col-3">년/월</label>
				<div class="col-9">
					<select class="form-control" id="search_semester_id">
					</select>
				</div>
			</div>
			<div id="site_map">
			</div>
			<div class="form-group row m-b-15">
				<div class="offset-8 col-4">
					<button id="btn_cancel_course" style="display:none;" type="button" class="btn btn-danger form-control" onclick="form_course_cancel()">취소</button>
				</div>
			</div>		
		</div>
	</div>
</div>
 -->
<script type="text/javascript" src="/ui/course/course_practice.js"></script>

