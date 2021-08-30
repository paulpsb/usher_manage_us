<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">TA 첨삭 관리</h1>
	<hr />
	
	<input type="hidden" id="answer_correct_pen_user_id" value="${correctInfo.answer_correct_pen_user_id}">
	<input type="hidden" id="section" value="${correctInfo.section}">
	<input type="hidden" id="book" value="${correctInfo.book}">
	<input type="hidden" id="answer_correct_pen_date" value="${correctInfo.answer_correct_pen_date}">
	<input type="hidden" id="answer_correct_pen_month" value="${correctInfo.answer_correct_pen_month}">
	<input type="hidden" id="appeal_answer_date" value="${correctInfo.appeal_answer_date}">
	<input type="hidden" id="appeal_answer_month" value="${correctInfo.appeal_answer_month}">
	<input type="hidden" id="marketin_correction_answer_type" value="${correctInfo.marketin_correction_answer_type}">
	<input type="hidden" id="marketin_correction_answer_date" value="${correctInfo.marketin_correction_answer_date}">
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title" id="correction_title">TA 첨삭 목록</h4>
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
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="/ui/correction/ta_correct_list.js"></script>