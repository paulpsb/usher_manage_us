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
		<div class="col-4">
			<h1 class="page-header">학생목록</h1>
		</div>
		<div class="col-4 text-right">
			<h4>
				<span id="select_course_name"></span>
				<button type="button" class="btn btn-white" onclick="showCourses('Y');">반 변경</button>
			</h4>
		</div>
		<div class="col-3">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
			<button type="button" class="btn btn-primary" onclick="auto_number()">번호 자동지정</button>
			<button type="button" class="btn btn-primary" onclick="form_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
		</div>
		<div class="col-1 text-right">
			<button type="button" class="btn btn-primary" onclick="form_excel()"><i class="fa fa-file-excel fa-fw"></i> Excel</button>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title" id="tableTitle"></h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-striped m-b-0">
							<colgroup>
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:5%;" />
								<col style="width:12%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:10%;" />
								<col style="width:8%;" />
							</colgroup>						
							<thead>
								<tr>
									<th class="text-center">이름</th>
									<th class="text-center">기존/신규</th>
									<th class="text-center">ID</th>
									<th class="text-center">연락처</th>
									<th colspan="2" class="text-center">학교</th>
									<th class="text-center">Light반 여부</th>
									<th class="text-center">참강여부</th>
									<th colspan="2" class="text-center">휴대폰 위치</th>
									<th class="text-center">관리</th>
									<th class="text-center">반이동</th>
								</tr>
							</thead>
							<tbody id="data_list">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>	
</div>
<div class="modal fade" id="modal-school">
	<div class="modal-dialog modal-lg" style="max_width:900px;" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">학교 수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="form-group row" id="div_school_search">
					<div class="col-3 col-form-label text-sm-right pr-0">
						<label for="id-form-field-1" class="mb-0">학교명</label>
					</div>
					<div class="col-6">
						<input type="text" class="form-control" id="search_school_name">
					</div>
					<div class="col-3">
						<button class="btn btn-info" onclick="search_school_list()">
							<i class="fa fa-search"></i>
						</button>
					</div>
				</div>			
				<div class="table-responsive"  id="div_school_list">
					<table class="table table-bordered m-b-10">
						<thead class="text-dark-m3 bgc-grey-l4" style="display:block;">
							<tr>
								<th style="width:85px;"  class="text-center">국내/외</th>
								<th style="width:100px;" class="text-center">구분</th>
								<th style="width:150px;" class="text-center">시도/대륙</th>
								<th style="width:150px;" class="text-center">시.군.구/나라</th>
								<th style="width:380px;" class="text-center" colspan="2">학교명</th>
							</tr>
						</thead>
						<tbody id="school_list" style="display:block;overflow-x:hidden;overflow-y:auto;height:400px;">
							
						</tbody>
					</table>
					<div class="col-12" id="div_add_school_title">
						<p>※학교가 없을 경우, <a href="javascript:add_school_show()"><span class="text-info">여기</span></a>를 클릭하세요.<button type="button" class="btn btn-info btn-sm" onclick="add_school_show()">학교등록</button></p>
					</div>					
				</div>
				<div class="table-responsive" id="div_add_school">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:25%;" />
							<col style="width:75%;" />
						</colgroup>	
						<tbody>				
							<tr>
								<th class="text-center table-info">국내/외</th>
								<td>
									<select id="add_school_foreign_gubun" class="form-control">
										<option value="">선택</option>
										<option value="국내">국내</option>
										<option value="해외">해외</option>
									</select>								
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">구분</th>
								<td>
									<select id="add_school_gubun" class="form-control">
										<option value="">선택</option>
										<option value="초등학교">초등학교</option>
										<option value="중학교">중학교</option>
										<option value="고등학교">고등학교</option>
										<option value="대학교">대학교</option>
										<option value="대학원">대학원</option>
										<option value="그외">그외</option>
									</select>			
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">시도/대륙</th>
								<td>
									<select id="add_school_area1" class="form-control">
										<option value="">선택</option>
									</select>								
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">시.군.구/나라</th>
								<td>
									<select id="add_school_area2" class="form-control">
										<option value="">선택</option>
									</select>							
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">학교명</th>
								<td>
									<input type="text" class="form-control" id="add_school_name">							
								</td>
							</tr>
						</tbody>
					</table>
				</div>				
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a  id="btn_add_school"  href="javascript:add_school();" class="btn btn-success">등록</a>
			</div>
		</div>
	</div>
</div>
<form id="excelFrm" name="excelFrm" method="post" enctype="multipart/form-data">
	<input type="hidden" name="course_id" id="excel_course_id">
</form>
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
<div class="modal fade" id="modal-practice">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">Light반 등록/수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:20%;" />
							<col style="width:30%;" />
							<col style="width:20%;" />
							<col style="width:30%;" />
						</colgroup>	
						<tbody>	
							<tr>
								<th class="text-center table-info">이름</th>
								<td class="text-center" id="practice_student_name"></td>
								<th class="text-center table-info">Light반 여부</th>
								<td class="text-center">
									<input type="hidden" name="practice_course_enrollment_id" id="practice_course_enrollment_id">
									<div class="switcher">
										<input type="checkbox" name="program_not_use" id="program_not_use">
										<label for="program_not_use"></label>
									</div>
								</td>
							</tr>
						</tbody>
					</table>			
				</div>			
				<div class="table-responsive"  id="div_section_practice">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:20%;" />
							<col style="width:80%;" />
						</colgroup>	
						<thead>
							<tr>
								<th class="text-center table-info">섹션</th>
								<th class="text-center table-info">시험 타입</th>
							</tr>
						</thead>
						<tbody id="section_practice_list">	
						</tbody>
					</table>			
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a  id="btn_add_school"  href="javascript:save_practice();" class="btn btn-success">등록</a>
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
<script type="text/javascript" src="/ui/enrollment/course_enrollment.js"></script>
