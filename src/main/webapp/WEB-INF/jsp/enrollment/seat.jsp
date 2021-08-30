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
			<h1 class="page-header">자리배치</h1>
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
	<!-- 
	<div class="row bg-blue mb-3">
		<div class="col-md-12 mt-3 mb-2 text-right">
			<button type="button" class="btn btn-white btn-md m-r-5 m-b-5" onclick="create_seat(10,10);">10 X 10</button>
			<button type="button" class="btn btn-white btn-md m-r-5 m-b-5" onclick="create_seat(11,11);">11 X 11</button>
			<button type="button" class="btn btn-white btn-md m-r-5 m-b-5" onclick="create_seat(12,12);">12 X 12</button>
			<button type="button" class="btn btn-white btn-md m-r-5 m-b-5" onclick="create_seat(13,13);">13 X 13</button>
			<button type="button" class="btn btn-white btn-md m-r-5 m-b-5" onclick="create_seat(14,14);">14 X 14</button>
			<button type="button" class="btn btn-white btn-md m-r-5 m-b-5" onclick="create_seat(15,15);">15 X 15</button>
			<button type="button" class="btn btn-white btn-md m-r-5 m-b-5" onclick="create_seat(16,16);">16 X 16</button>
			<button type="button" class="btn btn-white btn-md m-r-5 m-b-5" onclick="create_seat(17,17);">17 X 17</button>
		</div>
	</div>
	 -->	
	<!-- begin vertical-box -->
	<div class="vertical-box">
		<!-- begin event-list -->
		<div class="vertical-box-column p-r-30 d-none d-lg-table-cell" style="width: 450px">
			<div class="row mb-3">
			<div class="col-md-6">
				<h5 class="m-t-0 m-b-15" id="seat_setting">자리설정</h5>
			</div>
			<div class="col-md-6 text-right">
				<button type="button" class="btn btn-primary" onclick="form_submit()">저장</button>
			</div>
			</div>
			<div id="external-events" class="fc-event-list">

			</div>
		</div>
		<!-- end event-list -->
		<!-- begin calendar -->
		<div class="vertical-box-column calendar" style="width:1100px;">
			<div class="col-md-12 bg-white" style="border:0px none #fff; overflow-y:auto;overflow-x:hidden;" id="divSeat">
				<table class="table" id="seatList">
				</table>
			</div>		
			<div class="col-md-12 bg-white" style="overflow-y:auto;">
				<table class="table" id="seatLabelList">
				</table>
			</div>		
			<div class="col-md-12  bg-dark text-white text-center" style="padding:5px;"><h5>칠판</h5></div>		
		</div>
		<!-- end calendar -->
	</div>
	<!-- end vertical-box -->	
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
<script type="text/javascript" src="/ui/enrollment/seat.js"></script>
