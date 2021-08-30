<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
.section-drag {
	cursor: move;
	margin: auto;
	z-index: 995;
	text-align: center;
	filter: alpha(opacity=70);
	line-height: 20px;
	width:100%;
	border: 1px solid #555;
	border-radius: 3px;
	-moz-border-radius: 3px; /* FF */
	
}

.section-drop {
	margin: auto;
	z-index: 10;
	text-align: center;
	filter: alpha(opacity=70);
	line-height: 20px;
	width:100%;
	border: 1px solid #555;
	border-radius: 3px;
	-moz-border-radius: 3px; /* FF */
}

</style>
<!-- begin #content -->
<div id="content" class="content">
	<div class="row" id="search_area">
		<div class="col-2">
			<h1 class="page-header">시간표 관리</h1>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_semester_id">
				<option value="">년/월</option>
			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="search_test_type">
				<option value="TOEFL">토플</option>
				<option value="TOEIC">토익</option>
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_course_group_id">
				<option value="">반 그룹</option>
			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="search_type">
				<option value="all">전체</option>
				<option value="day">일자별</option>
			</select>
		</div>
		<div id="div_schedule" class="col-2" style="display:none;">
			<select class="form-control" id="search_schedule">
			</select>
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="search_course()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
		<div class="col-1">
			<button id="btn_save" type="button" class="btn btn-primary form-control" onclick="form_save()"><i class="fa fa-save fa-fw"></i> Save</button>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">시간표</h4>
				</div>
				<div class="panel-body">
					<div class="row mb-3">
						<div class="col-7">
							<div class="table-responsive">
								<table class="table table-bordered m-b-0" id="timeTableList">
								
								</table>
							</div>
						</div>
						<div class="col-5">
							<div class="row mb-3">
								<div class="col-4">
									<select class="form-control" id="search_study_type">
										<option value="CLASS">수업</option>
										<option value="STUDY">스터디</option>
									</select>
								</div>	
								<div class="col-4">
									<select class="form-control" id="search_group_id">
										<option value="4">강사</option>
										<option value="3">매니저</option>
									</select>
								</div>	
							</div>
							<div class="row mb-3">
								<div class="col-12">
									<table class="table table-bordered m-b-0">
										<colgroup>
											<col style="width:calc(100%/7)"/>
											<col style="width:calc(100%/7)"/>
											<col style="width:calc(100%/7)"/>
											<col style="width:calc(100%/7)"/>
											<col style="width:calc(100%/7)"/>
											<col style="width:calc(100%/7)"/>
											<col style="width:calc(100%/7)"/>
										</colgroup>
										<thead>
											<tr>
												<th class="text-center bg-black-transparent-5 text-white">VOCA</th>
												<th class="text-center bg-black-transparent-5 text-white">GR</th>
												<th class="text-center bg-black-transparent-5 text-white">RC</th>
												<th class="text-center bg-black-transparent-5 text-white">LC</th>
												<th class="text-center bg-black-transparent-5 text-white">WR</th>
												<th class="text-center bg-black-transparent-5 text-white">SP</th>
												<th class="text-center bg-black-transparent-5 text-white">ETC</th>
											</tr>
										</thead>
										<tbody  id="employeeTableList">
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-book">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">반별 교재</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive" style="max-height:600px;overflow-y:auto;">
					<table class="table table-th-valign-middle table-td-valign-middle table-bordered m-b-10">
						<colgroup>
							<col style="width:10%;" />
							<col style="width:90%;" />
						</colgroup>	
						<tbody id="book_list">	
		
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_book();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<!-- end #content -->
<script type="text/javascript" src="/ui/course/course_timetable.js"></script>
