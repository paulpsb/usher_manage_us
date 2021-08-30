<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">개강인원파악 상세현황(기존)</h1>
	<hr />
	<!-- end page-header -->
	
	<input type="hidden" id="semester_date" value="${statsInfo.semester_date}">
	<input type="hidden" id="prev_semester_date" value="${statsInfo.prev_semester_date}">
	<input type="hidden" id="real_search_register" value="${statsInfo.real_search_register}">
	<input type="hidden" id="course_name" value="${statsInfo.course_name}">
	<input type="hidden" id="course_group_name" value="${statsInfo.course_group_name}">

	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title" >개강인원파악 상세현황(기존 : <span id="span_title"></span> )</h4>
				</div>
				<div class="panel-body">
					<div class="table-responsive text-center">
						<table id="example"  class="table table-bordered table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:3%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:6%;" />
								
								<col style="width:6%;" />
								<col style="width:6%;" />
								
								<col style="width:5%;" />
								<col style="width:5%;" />
								
								<col style="width:10%;" />
								
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:8%;" />
							</colgroup>							
							<thead>
								<tr>
									<th class="text-center table-info">No.</th>
									<th class="text-center table-info">이름</th>
									<th class="text-center table-info">ID</th>
									<th class="text-center table-info">전화번호</th>
									
									<th class="text-center table-info">수강월</th>
									<th class="text-center table-info">반</th>
									
									<th class="text-center table-info" colspan="2" >성취표</th>
									
									<th class="text-center table-info">학교</th>
									
									<th class="text-center table-success" >목표 재수강</th>
									<th class="text-center table-info" >1주차<br>재수강 가능성</th>
									<th class="text-center table-warning" >2주차<br>재수강 가능성</th>
									<th class="text-center table-primary" >3주차<br>재수강 학생조사</th>
									<th class="text-center table-primary" >마지막주(설득)<br>재수강 조사</th>
									<th class="text-center table-danger" >실제 등록</th>
									<th class="text-center table-danger" >사유</th>
								</tr>
							</thead>
							<tbody id="result_list">
																																															
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="/ui/course/course_student_exists_form.js"></script>
