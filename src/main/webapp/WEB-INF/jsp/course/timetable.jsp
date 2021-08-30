<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
.redips-drag {
	cursor: move;
	margin: auto;
	z-index: 10;
	text-align: center;
	opacity: 0.7;
	min-width:100px;
	filter: alpha(opacity=70);
	line-height: 20px;
	border: 1px solid #555;
	border-radius: 3px;
	-moz-border-radius: 3px; /* FF */
}

.vc {
	background-color: #AAC8E2;
}
.gr {
	background-color: #E7D783;
}
.rc {
	background-color: #E99AE6;
}
.lc {
	background-color: #C4AFFF;
}

</style>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">시간표 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<input type="hidden" id="course_id">
	<input type="hidden" id="column_count">
	<input type="hidden" id="row_count">
	<input type="hidden" id="use_seat_count">
	<input type="hidden" id="not_use_seat_count">
	<input type="hidden" id="total_seat_count">
	
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
			<button type="button" class="btn btn-primary form-control" onclick="search_student()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
	</div>
	<div class="row" id="redips-drag">
		<div class="col-xl-8">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">시간표</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-bordered m-b-0" id="timetableList">
						
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xl-4">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">과목</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-bordered m-b-0">
							<colgroup>
								<col style="width:25%;" />
								<col style="width:25%;" />
								<col style="width:25%;" />
								<col style="width:25%;" />
							</colgroup>
							<thead>
								<tr class="height-50">
									<th colspan="4" class="redips-trash text-center bg-blue text-white"><h4><i class="fa fa-trash"></i> 휴지통</h4></th>
								</tr>
								<tr>
									<th class="redips-mark text-center bg-black-transparent-5 text-white">VOCA</th>
									<th class="redips-mark text-center bg-black-transparent-5 text-white">GRAMMAR</th>
									<th class="redips-mark text-center bg-black-transparent-5 text-white">READING</th>
									<th class="redips-mark text-center bg-black-transparent-5 text-white">LISTENING</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="center bg-grey text-dark">
										<div id="vc" class="redips-drag redips-clone vc">VC 홍길동</div>
									</td>
									<td class="center bg-grey text-dark">
										<div id="gr" class="redips-drag redips-clone gr">GR 홍길동</div>
									</td>
									<td class="center bg-grey text-dark">
										<div id="rc" class="redips-drag redips-clone rc">RC 홍길동</div>
									</td>
									<td class="center bg-grey text-dark">
										<div id="lc" class="redips-drag redips-clone lc">LC 홍길동</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>	
</div>
<!-- end #content -->
<script type="text/javascript" src="/assets/plugins/redips-drag/redips-drag-min.js"></script>
<script type="text/javascript" src="/ui/course/timetable.js"></script>
