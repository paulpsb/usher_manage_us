<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<input type="hidden" id="course_id">
<input type="hidden" id="column_count">
<input type="hidden" id="row_count">
<input type="hidden" id="use_seat_count">
<input type="hidden" id="not_use_seat_count">
<input type="hidden" id="total_seat_count">

<div id="content" class="content">
	<div class="row">
		<div class="col-6">
			<h1 class="page-header">성적현황</h1>
		</div>
		<div class="col-5 text-right">
			<h4>
				<span id="select_course_name"></span>
				<button type="button" class="btn btn-white" onclick="showCourses('Y');">반 변경</button>
			</h4>
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="search_student()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
	</div>
	<hr />
	<div class="row mb-3">
		<div class="col-2">
			<div class="panel panel-inverse" data-sortable-id="table-basic-2">
				<div class="panel-heading">
					<h4 class="panel-title">학생목록</h4>

				</div>
				<div class="student_list panel-body" style="overflow-y:auto;">
					<ul id="student_list1">
					</ul>
				</div>
			</div>		
		</div>
		<div class="col-5">
			<div class="row bg-blue mb-3">
				<div class="col-4 mt-3 mb-2">
					<button id="btn_prev" type="button" class="btn btn-white btn-md m-r-5 m-b-5" onclick="student_prev();">◀ 이전 학생</button>
				</div>
				<div class="col-4 mt-3 mb-2 text-center text-white">
					<h4 id="select_student"></h4>					
				</div>
				<div class="col-4 mt-3 mb-2 text-right">
					<button id="btn_next" type="button" class="btn btn-white btn-md m-r-5 m-b-5" onclick="student_next();">다음 학생 ▶</button>
				</div>
			</div>			
			<div id="calendar" class="vertical-box-column calendar"></div>
		</div>
		<div class="col-3">
			<div class="panel panel-inverse" data-sortable-id="table-basic-2">
				<div class="panel-heading">
					<h4 class="panel-title" id="dailyTitle">&nbsp;</h4>

				</div>
				<div id="dailyList" class="student_list panel-body" style="overflow-y:auto;">

				</div>
			</div>		
		</div>
		<div class="col-2">
			<div class="panel panel-inverse" data-sortable-id="table-basic-2">
				<div class="panel-heading">
					<h4 class="panel-title">학생목록</h4>

				</div>
				<div class="student_list panel-body" style="overflow-y:auto;">
					<ul id="student_list2">
					</ul>			
				</div>
			</div>		
		</div>
	</div>
</div>
<div class="modal fade" id="select_courses" style="z-index:9999999;">
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
<!-- end #content -->
<script type="text/javascript" src="/ui/enrollment/practice_result.js"></script>
