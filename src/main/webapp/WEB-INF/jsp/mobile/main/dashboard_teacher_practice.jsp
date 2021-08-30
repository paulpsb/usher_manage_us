<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<input type="hidden" id="user_id" value="${teacherInfo.user_id}">
<input type="hidden" id="course_id" value="${teacherInfo.course_id}">
<input type="hidden" id="section" value="${teacherInfo.section}">
<input type="hidden" id="practice_type" value="${teacherInfo.practice_type}">
<input type="hidden" id="schedule_date" value="${teacherInfo.schedule_date}">
<input type="hidden" id="current_date" value="${teacherInfo.current_date}">
<!-- begin #content -->
<div id="content" class="content" style="padding:0;">
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title" id="practice_title">대안 작성</h4>
				</div>
				<div class="panel-body">
					<div class="row mb-3">
						<div class="col-6 mb-3" id="search_practice_list">
					
						</div>					
						<div class="col-6 text-right">
							<button type="button" class="btn btn-primary" onclick="go_home()">홈으로</button>
							<button id="btn_save" style="display:none;" type="button" class="btn btn-primary" onclick="practice_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
						</div>					
						<div class="col-12 mb-3">
							<h5>대안</h5>
						</div>					
						<div class="col-12 mb-3">
							<textarea class="form-control" id="comments"></textarea>
						</div>					
						<div class="col-12">
							<div class="table-responsive">
								<table class="table table-bordered m-b-0">
									<colgroup>
										<col style="width:15%;" />
										<col style="width:15%;" />
										<col style="width:15%;" />
										<col style="width:55%;" />
									</colgroup>							
									<thead>
										<tr>
											<th class="text-center table-info">이름</th>
											<th class="text-center table-info">최초</th>
											<th class="text-center table-info">최종</th>
											<th class="text-center table-info">대안</th>
										</tr>							
									</thead>
									<tbody id="practice_detail_list"></tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="/ui/mobile/main/dashboard_teacher_practice.js"></script>
