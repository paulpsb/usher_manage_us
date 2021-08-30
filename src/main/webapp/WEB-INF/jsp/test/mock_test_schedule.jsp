<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">모의고사 스케쥴 관리</h1>
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
		<div class="col-md-2">
			<select class="form-control" id="search_course_id">
				<option value="">반</option>
			</select>
		</div>
		<div class="col-4 text-right">
			<button type="button" class="btn btn-primary" onclick="init_form()"><i class="fa fa-reply fa-fw"></i> 초기화</button>
		</div>			
	</div>
	<div class="row">
		<div class="col-md-6">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">모의 시험 관리</h4>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-th-valign-middle table-td-valign-middle table-bordered m-b-10">
							<colgroup>
								<col style="width:20%;" />
								<col style="width:30%;" />
								<col style="width:20%;" />
								<col style="width:30%;" />
							</colgroup>	
							<tbody id="data_list">	
								<tr>
									<th class="text-center bg-grey">총 시험시간</th>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="mock_test_min" id="mock_test_min">
									</td>
								</tr>			
								<tr>
									<th class="text-center bg-grey">READING</th>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="mock_test_reading_min" id="mock_test_reading_min">
									</td>
									<th class="text-center bg-grey">LISTENING</th>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="mock_test_listening_min" id="mock_test_listening_min">
									</td>
								</tr>			
								<tr>
									<th class="text-center bg-grey">WRITING</th>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="mock_test_writing_min" id="mock_test_writing_min">
									</td>
									<th class="text-center bg-grey">SPEAKING</th>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="mock_test_speaking_min" id="mock_test_speaking_min">
									</td>
								</tr>			
							</tbody>
						</table>
					</div>				
					<div class="form-group row m-b-15">
						<div class="col-md-12 text-right">
							<button type="button" class="btn btn-primary" onclick="add_form()"><i class="fa fa-plus-circle fa-fw"></i> 추가</button>
							<button type="button" class="btn btn-primary" onclick="start_form()"><i class="fa fa-play-circle fa-fw"></i> 시험시작</button>
						</div>
					</div>	
					<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:10%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center">섹션</th>
									<th class="text-center">교재</th>
									<th class="text-center">볼륨</th>
									<th class="text-center">그룹</th>
									<th class="text-center">지문</th>
									<th class="text-center">시간</th>
									<th class="text-center">관리</th>
								</tr>
							</thead>
							<tbody id="dataList">
							</tbody>
						</table>
					</div>									
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">모의 시험</h4>
				</div>
				<div class="panel-body">
					<div class="form-group row m-b-15">
						<div class="col-md-12 text-center">
							<div id="timer" style="width:100%;font-size:10rem;">
								00:00:00
							</div>
						</div>
					</div>					
				</div>
			</div>
		</div>
	</div>		
</div>
<div class="modal fade" id="modal-mock">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">지문 추가</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-th-valign-middle table-td-valign-middle table-bordered m-b-10">
						<colgroup>
							<col style="width:20%;" />
							<col style="width:80%;" />
						</colgroup>	
						<tbody id="data_list">	
							<tr>
								<th class="text-center bg-grey">섹션</th>
								<td class="text-with-form-control">
									<select class="form-control" name="section" id="section">
									</select> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">교재</th>
								<td class="text-with-form-control">
									<select class="form-control" name="book" id="book">
									</select> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">볼륨</th>
								<td class="text-with-form-control">
									<select class="form-control" name="volume" id="volume">
									</select> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">그룹</th>
								<td class="text-with-form-control">
									<select class="form-control" name="group" id="group">
									</select> 
								</td>
							</tr>	
							<tr>
								<th class="text-center bg-grey">지문</th>
								<td class="text-with-form-control">
									<select class="form-control" name="article" id="article">
									</select> 
								</td>
							</tr>	
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:add_exam();" class="btn btn-success">추가</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/test/mock_test_schedule.js"></script>
