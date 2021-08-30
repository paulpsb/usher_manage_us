<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">이의신청 모아 보기</h1>
	<hr />
	
	<div id="search_area" class="row mb-3">
		<div class="col-1">
			<select class="form-control" id="search_section">
				<option value="">과목</option>
				<option value="SPEAKING">SPEAKING</option>
				<option value="WRITING">WRITING</option>
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
			<select class="form-control" id="search_appeal_answer_yn">
				<option value="">이의신청 여부</option>
				<option value="N">이의신청 대기</option>
				<option value="Y">이의신청 완료</option>
			</select>
		</div>
		<div class="col-1">
			<input type="text" class="form-control" id="search_user_name">
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> 조회</button>
		</div>	
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">이의신청 목록</h4>
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
								<col style="width:17%;" />
								<col style="width:6%;" />
								<col style="width:5%;" />
								<col style="width:6%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:16%;" />
								<col style="width:16%;" />
							</colgroup>
							<thead>
								<tr class="table-info">
									<th class='text-center'>No.</th>
									<th class='text-center'>과목</th>
									<th class='text-center'>문제유형</th>
									<th class='text-center'>문제번호</th>
									<th class='text-center'>질문</th>
									<th class='text-center'>첨삭일시</th>
									<th class='text-center'>첨삭자</th>
									<th class='text-center'>작성일시</th>
									<th class='text-center'>작성자</th>
									<th class='text-center'>별점</th>
									<th class='text-center'>클레임</th>
									<th class='text-center'>피드백</th>
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
<script type="text/javascript" src="/ui/correction/appeal_correct_list.js"></script>