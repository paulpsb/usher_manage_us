<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<input type="hidden" id="course_id" value="${courseInfo.id}">
<input type="hidden" id="course_schedule" value="${courseInfo.schedule}">
<!-- begin #content -->
<div id="content" class="content">
	<div id="search_area" class="row">
		<div class="col-8" id="search_archeive">
		</div>
		<div class="col-4 text-right">
			<h4>
				<span>${courseInfo.course_group_name} ${courseInfo.name}반(담당강사:${courseInfo.instructor_name} / 담당매니저:${courseInfo.manager_name})</span>
				<button type="button" class="btn btn-white" onclick="showCourses('Y');">반 변경</button>
			</h4>
		</div>	
	</div>
	<div class="row">
		<div class="col-xl-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">목표설정</h4>
				</div>
				<div class="panel-body">
					<div class="table-responsive" id="table_info">
						
					</div>
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
<div class="modal fade" id="modal-concentration">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">집중과목 수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-12">
						<h4 id="course_title"></h4>
						<input type="hidden" id="course_enrollment_id"> 
					</div>
				</div>
				<div class="row">
					<div class="col-12 mb-5">
						<div class="progressbar-wrapper">
							<ul class="progressbar" id="progressbar_course">
								
							</ul>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-12">
						<h4 id="user_title"></h4>
					</div>
				</div>
				<div class="row">
					<div class="col-12 mb-5">
						<div class="progressbar-wrapper">
							<ul class="progressbar" id="progressbar_user">
								
							</ul>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-12">
						<h4>학생사유</h4>
					</div>
				</div>
				<div class="row">
					<div class="col-12 mb-5">
						<textarea id="txt_concentration" class="form-control" style="height:100px;" readonly></textarea>
					</div>
				</div>
				<div class="row">
					<div class="col-12">
						<h4>강사/매니져 코멘트(강제로 집중과목 바꿀경우)</h4>
					</div>
				</div>
				<div class="row">
					<div class="col-12 mb-5">
						<textarea id="txt_teacher_concentration" class="form-control" style="height:100px;"></textarea>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_concentration();" class="btn btn-success">집중과목 수정</a>
			</div>			
		</div>
	</div>
</div>
<div class="modal fade" id="modal-practice">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">목표설정 수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-12">
						<h4>학생사유</h4>
						<input type="hidden" id="practice_id"> 
						<!-- 
						<input type="hidden" id="pass_user_score"> 
						<input type="hidden" id="pass_course_score">
						<input type="hidden" id="practice_book"> 
						<input type="hidden" id="orginal_book">
						 -->
					</div>
				</div>
				<div class="row">
					<div class="col-12 mb-5">
						<textarea id="txt_practice" class="form-control" style="height:100px;" readonly></textarea>
					</div>
				</div>
				<div class="row">
					<div class="col-12">
						<h4>강사/매니져 코멘트</h4>
					</div>
				</div>
				<div class="row">
					<div class="col-12 mb-5">
						<textarea id="txt_teacher_practice" class="form-control" style="height:100px;"></textarea>
					</div>
				</div>
				<div class="row">
					<div class="col-12">
						<h4>강제변경</h4>
					</div>
				</div>
				<div class="row" id="div_practice">
			
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:save_practice();" class="btn btn-success">승인</a>
				<!-- 
				<a href="javascript:save_practice_fail();" class="btn btn-danger">거부</a>
				 -->
			</div>			
		</div>
	</div>
</div>
<!-- ================== BEGIN PAGE LEVEL JS ================== -->
<script src="/assets/plugins/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="/assets/plugins/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
<script src="/assets/plugins/datatables.net-fixedcolumns/js/dataTables.fixedColumns.js"></script>
<script src="/assets/plugins/datatables.net-fixedcolumns-bs4/js/fixedColumns.bootstrap4.js"></script>

<!-- end #content -->
<script type="text/javascript" src="/ui/enrollment/achievement_new_goal.js"></script>
<script type="text/javascript" src="/ui/enrollment/achievement_new_common.js"></script>
