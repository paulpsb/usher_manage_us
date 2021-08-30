<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">Speaking 첨삭 관리</h1>
	<hr />
	
	<div id="search_area" class="row mb-3">
		<div class="col-1">
			<select class="form-control" id="search_book">
				<option value="">유형</option>
				<option value="task1">TASK1</option>
				<option value="task2">TASK2</option>
				<option value="task3">TASK3</option>
				<option value="task4">TASK4</option>
			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="search_status">
				<option value="">첨삭여부</option>
				<option value="REQUEST">첨삭대기</option>
				<option value="COMPLETE">첨삭완료</option>
				<option value="WRITE">첨삭안함</option>
			</select>
		</div>
		
		<div class="col-1">
			<select class="form-control" id="search_course_name">
				<option value="">반 선택</option>
				<c:forEach var="courseInfo" items="${courseList}">
					<option value="<c:out value="${courseInfo.course_name}" />"><c:out value="${courseInfo.course_name}" /></option>
				</c:forEach>				
			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="search_comment_answer_yn">
				<option value="">답변대기 여부</option>
				<option value="Y">답변대기</option>
			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="search_answer_appeal_status">
				<option value="">이의신청 여부</option>
				<option value="REQUEST">이의신청 대기</option>
			</select>
		</div>
		<div class="col-1">
			<input type="text" class="form-control" id="search_user_name">
		</div>
		<div class="col-1">
			<div class="checkbox checkbox-css">
				<input type="checkbox" id="search_out_yn" />
				<label for="search_out_yn">외부인원만 보기</label>
			</div>
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> 조회</button>
		</div>	
		<div class="col-4 text-right">
			<a href="http://marketing.usher.co.kr/stats/dashboard.do" target="_blank" class="btn btn-primary" >TA 평가</a>
			<button type="button" class="btn btn-primary" onclick="open_ta_pen()">TA 첨삭현황</button>
		</div>	
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">Speaking 첨삭 목록</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-bordered m-b-0">
							<colgroup>
								<col style="width:4%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:25%;" />
								<col style="width:6%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
							</colgroup>
							<thead>
								<tr class="table-info">
									<th class='text-center'>No.</th>
									<th class='text-center'>문제유형</th>
									<th class='text-center'>문제번호</th>
									<th class='text-center'>상태</th>
									<th class='text-center'>질문</th>
									<th class='text-center'>작성일</th>
									<th class='text-center'>작성자</th>
									<th class='text-center'>반</th>
									<th class='text-center'>자가딕테이션</th>
									<th class='text-center'>요청시간</th>
									<th class='text-center'>루브릭 채점</th>
									<th class='text-center'>첨삭</th>
									<th class='text-center'>오답노트</th>
									<th class='text-center'>평점/이의제기</th>
									<th class='text-center'>질문/답변</th>
								</tr>
							</thead>
							<tbody id="dataList">
							</tbody>
						</table>
					</div>	
					<div>
						<ul class="pagination m-t-25 m-b-5" style="justify-content:center;" id="pageList">
						</ul>
					</div>		
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-ta-pen">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">TA 첨삭현황</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row mb-3">
					<div class="col-5">
						<select id="search_year" class="form-control">
						</select>
					</div>	
					<div class="col-3">
						<select id="search_month" class="form-control">
						</select>
					</div>	
					<div class="col-4">
						<button type="button" class="btn btn-primary" onclick="search_ta_list()"><i class="fa fa-search fa-fw"></i> Search</button>
					</div>		
					<div class="table-responsive" style="overflow-y:scroll;">
						<table class="table table-bordered m-t-10 m-b-0" id="ta_head_list">
							
							
						</table>
					</div>
					<div class="table-responsive" style="max-height:300px;overflow-y:scroll;">
						<table class="table table-bordered m-t-0 m-b-0" id="ta_data_list">
							
							
						</table>
					</div>
					<div class="table-responsive" style=";overflow-y:scroll;">
						<table class="table table-bordered m-t-0 m-b-10" id="ta_tile_list">
							
							
						</table>
					</div>
				</div>					
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="/ui/correction/speaking_correct_list.js"></script>