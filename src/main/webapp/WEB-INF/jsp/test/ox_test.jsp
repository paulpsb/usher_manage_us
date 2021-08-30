<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<input type="hidden" id="course_id" value="${courseInfo.course_id}">
<input type="hidden" id="section" value="${courseInfo.section}">
<input type="hidden" id="practice_type" value="${courseInfo.practice_type}">
<input type="hidden" id="course_name" value="${courseInfo.course_name}">

<!-- begin #content -->
<div id="content" class="content">
	<div class="row bg-blue" style="padding:5px;padding-top:8px;padding-bottom:0px;">
		<div class="col-2 text-white">
			<h4>
				<span id="select_course_name"></span>
				<button type="button" class="btn btn-white" onclick="showCourses('Y');">반 변경</button>
			</h4>
		</div>
		<div class="col-8" id="div_practice">

		</div>
		<div class="col-2 text-white">
			<select class="form-control" id="search_schedule_id">
				
			</select>
		</div>
	</div>	
	<div class="row">
		<div class="col-9 bg-white">
			<table class="table" style="width:1119px;margin-left:auto;margin-right:auto;border:0px none #ccc;">
				<tbody id="seat_list" style="border:0px none #ccc;overflow-y:scroll; overflow-x:hidden; float:left; width:1119px; height:705px;">
				</tbody>
				<tfoot style="border:0px none #ccc;float:left; width:1119px;">
					<tr>
						<td style="width:700px;padding-top:13px;" colspan="7" class="bg-dark text-white text-center"><h4>칠판</h4></td>
						<td style="width:200px;" colspan="2" class="bg-dark text-white text-center">
							<button id="btn_mode_random" type="button" class="btn_mode btn btn-white form-control" onclick="random_mode_student();">Random Mode</button>
						</td>
						<td style="width:219px;" colspan="2" class="bg-dark text-white text-center">
							<button id="btn_mode_select" type="button" class="btn_mode btn btn-danger form-control">Select Mode</button>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
		<div class="col-3">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">시험 결과 누적</h4>
				</div>
				<div class="panel-body">
					<h5>실시 : <span id="exam_count"></span>명, 미실시 : <span id="exam_not_count"></span>명</h5>
					<hr>
					<div id="div_quiz_list" style="overflow-x:none;overflow-y:auto;">
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
<!-- end #content -->
<div class="modal fade" id="modal-select-mode" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-lg" style="top:30%;left:35%;width:25%;">
		<div class="modal-content">
			<div class="modal-header">
				<h3 class="modal-title text-center" style="width:100%;" id="mode_select_student_name"></h3>
				<button type="button" class="close" onClick="close_select_mode()">×</button>
			</div>
			<div class="modal-body">
				<div class="form-group row m-b-15">
					<div class="col-12 text-center">
						<h4 class="text-blue" id="mode_select_schedule_name"></h4>
						<select class="form-control" id="mode_select_passage">
							
						</select>
					</div>
				</div>	
				<div class="form-group row m-b-15">
					<div class="col-12 text-center">
						<h4 id="mode_select_result_count"></h4>
					</div>
				</div>	
				<div class="form-group row m-b-15">
					<div class="col-6 text-center">
						<button type="button" class="btn btn-success btn-block" style="height:300px;" onclick="complete_mode_student('O')">
							<p style="margin:0;padding:0;font-size:10rem;">O</p>
						</button>
						<button type="button" class="btn btn-success btn-block" style="height:50px;" onclick="complete_all_mode_student('O')">
							<p style="margin:0;padding:0;font-size:1.5rem;">일괄 O</p>
						</button>
					</div>
					<div class="col-6 text-center">
						<button type="button" class="btn btn-danger btn-block" style="height:300px;" onclick="complete_mode_student('X')">
							<p style="margin:0;padding:0;font-size:10rem;">X</p>
						</button>
						<button type="button" class="btn btn-danger btn-block" style="height:50px;" onclick="complete_all_mode_student('X')">
							<p style="margin:0;padding:0;font-size:1.5rem;">일괄 X</p>
						</button>						
					</div>
				</div>	
			</div>
		</div>
	</div>
</div>

<!-- end #content -->
<div class="modal fade" id="modal-random-mode" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-lg" style="top:30%;left:35%;width:25%;">
		<div class="modal-content">
			<div class="modal-header">
				<select class="form-control form-control-lg" id="mode_random_order" style="width:130px;">
					<option value="A">기존>신규</option>
					<option value="B">신규>기존</option>
					<option value="C">참강>현강</option>
					<option value="D">현강>참강</option>
					<option value="E">All Random</option>
				</select>
				<h3 class="modal-title text-center" style="width:100%;" id="mode_random_student_name"></h3>
				<button type="button" class="close" onClick="close_random_mode()">×</button>
			</div>
			<div class="modal-body">
				<div class="form-group row m-b-15">
					<div class="col-9">
						<h4 class="text-blue" id="mode_random_schedule_name" class="mt-2 text-center"></h4>
						<select class="form-control" id="mode_random_passage">
							
						</select>
						<h4 id="mode_random_result_count" class="mt-2 text-center"></h4>
					</div>
					<div class="col-3 text-center">
						<button id="btn_next" type="button" class="btn btn-default btn-block" style="height:55px;" onclick="next_random_mode()">
							<p style="margin:0;padding:0;font-size:1rem;" id="btn_random_next">다음</p>
						</button>
					</div>
				</div>	
				<div class="form-group row m-b-15">
					<div class="col-6 text-center">
						<button type="button" class="btn btn-success btn-block" style="height:300px;" onclick="complete_random_mode_student('O')">
							<p style="margin:0;padding:0;font-size:10rem;">O</p>
						</button>
						<button type="button" class="btn btn-success btn-block" style="height:50px;" onclick="complete_all_student('O')">
							<p style="margin:0;padding:0;font-size:1.5rem;">일괄 O</p>
						</button>
					</div>
					<div class="col-6 text-center">
						<button type="button" class="btn btn-danger btn-block" style="height:300px;" onclick="complete_random_mode_student('X')">
							<p style="margin:0;padding:0;font-size:10rem;">X</p>
						</button>
						<button type="button" class="btn btn-danger btn-block" style="height:50px;" onclick="complete_all_student('X')">
							<p style="margin:0;padding:0;font-size:1.5rem;">일괄 X</p>
						</button>
					</div>
				</div>	
			</div>
		</div>
	</div>
</div>

<div id="alert-combo" style='position:absolute; left:35%; top:20%; right:35%; display:none; z-index:10000;background-color:#ffffff;padding:20px;'>
	<div class="panel panel-inverse" data-sortable-id="table-basic-1">
		<div class="panel-body">
			<div class="form-group row mb-5">
				<div class="col-12 text-center">
					<h2>주의!</h2>
				</div>
			</div>
			<div class="form-group row mb-5">
				<div class="col-12 text-center">
					<h3>면적채우기 타입 OX퀴즈입니다.</h3>
					<h3>OX 체크시 선택창(콤보)를 잘 확인해서</h3>
					<h3>시험을 쳐주시기 바랍니다.</h3>
				</div>
			</div>

			<div class="form-group row m-b-15">
				<div class="offset-4 col-4">
					<button id="btn_cancel_course" type="button" class="btn btn-info form-control" onclick="close_alert_combo()">확인</button>
				</div>
			</div>	
		</div>
	</div>
</div>

<script type="text/javascript" src="/ui/test/ox_test.js"></script>