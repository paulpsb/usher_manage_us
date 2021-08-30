<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<div class="row">
		<div class="col-4">
			<h1 class="page-header">반별 내신관리(일자별)</h1>
		</div>
		<div class="col-4 text-right">
			<h4>
				<span id="select_course_name"></span>
				<button type="button" class="btn btn-white" onclick="showCourses('Y');">반 변경</button>
			</h4>
		</div>	
		<div id="div_schedule" class="col-1">
			<select class="form-control" id="search_schedule">
			</select>
		</div>	
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
		<div class="col-1 text-right">
			<button id="btn_save" type="button" class="btn btn-primary form-control" onclick="form_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
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
<script type="text/javascript" src="/ui/course/course_practice_daily.js"></script>

