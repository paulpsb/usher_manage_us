<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<div id="search_area" class="row">
		<div class="col-9" id="search_archeive">
		</div>
		<div class="col-1">
		</div>
		<div class="col-2">
			<h4>
				<span id="select_course_name"></span>
				<button type="button" class="btn btn-white" onclick="showCourses('Y');">반 변경</button>
			</h4>
		</div>		
	</div>
	<div id="page_info"></div>	
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
			
			<!-- 
			<div class="form-group row m-b-15">
				<label class="col-form-label col-3">시험</label>
				<div class="col-9">
					<select class="form-control" id="search_test_type">
						<option value="TOEFL">토플</option>
						<option value="TOEIC">토익</option>			
					</select>
				</div>
			</div>
			<div class="form-group row m-b-15">
				<label class="col-form-label col-3">반 그룹</label>
				<div class="col-9">
					<select class="form-control" id="search_course_group_id">
					</select>
				</div>
			</div>
			<div class="form-group row m-b-15">
				<label class="col-form-label col-3">반</label>
				<div class="col-9">
					<select class="form-control" id="search_course_id">
					</select>
				</div>
			</div>	
			-->	
			<div class="form-group row m-b-15">
				<!-- 
				<div class="offset-4 col-4">
					<button type="button" class="btn btn-primary form-control" onclick="form_course_select()">선택</button>
				</div>
				 -->
				<div class="offset-8 col-4">
					<button id="btn_cancel_course" style="display:none;" type="button" class="btn btn-danger form-control" onclick="form_course_cancel()">취소</button>
				</div>
			</div>		
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/enrollment/achievement.js"></script>
