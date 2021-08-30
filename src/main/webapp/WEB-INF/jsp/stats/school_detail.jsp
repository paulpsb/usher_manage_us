<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<input type="hidden" id="foreign_gubun" value="${schoolInfo.foreign_gubun}">
	<input type="hidden" id="school_gubun" value="${schoolInfo.school_gubun}">
	<input type="hidden" id="area1" value="${schoolInfo.area1}">
	<input type="hidden" id="area2" value="${schoolInfo.area2}">
	<input type="hidden" id="school_name" value="${schoolInfo.school_name}">
	<div class="row">
		<div class="col-12">
			<div class="note note-primary">
				<div class="note-content" style="padding:10px;">
					<h4 style="margin-bottom:0px;">${schoolInfo.school_name} 전체현황</h4>
				</div>
			</div>
		</div>
		<div class="col-3">
			<div class="table-responsive">
				<table class="table table-bordered m-b-0">
					<colgroup>
						<col style="width:15%;" />
						<col style="width:15%;" />
						<col style="width:15%;" />
						<col style="width:17%;" />
						<col style="width:17%;" />
						<col style="width:16%;" />
					</colgroup>
					<thead>
						<tr>
							<th class='text-center bg-grey-darker text-white' colspan="6" id="dataYear1"></th>
						</tr>
						<tr>
							<th class='text-center bg-blue text-white'>&nbsp;</th>
							<th class='text-center bg-blue text-white'>총원</th>
							<th class='text-center bg-blue text-white'>신규</th>
							<th class='text-center bg-blue text-white'>재수강(률)</th>
							<th class='text-center bg-blue text-white'>환불(률)</th>
							<th class='text-center bg-blue text-white'>현재원</th>
						</tr>
					</thead>
					<tbody id="dataList1">
					</tbody>
				</table>
			</div>		
		</div>	
		<div class="col-3">
			<div class="table-responsive">
				<table class="table table-bordered m-b-0">
					<colgroup>
						<col style="width:15%;" />
						<col style="width:15%;" />
						<col style="width:15%;" />
						<col style="width:17%;" />
						<col style="width:17%;" />
						<col style="width:16%;" />
					</colgroup>
					<thead>
						<tr>
							<th class='text-center bg-grey-darker text-white' colspan="6" id="dataYear2"></th>
						</tr>
						<tr>
							<th class='text-center bg-blue text-white'>&nbsp;</th>
							<th class='text-center bg-blue text-white'>총원</th>
							<th class='text-center bg-blue text-white'>신규</th>
							<th class='text-center bg-blue text-white'>재수강(률)</th>
							<th class='text-center bg-blue text-white'>환불(률)</th>
							<th class='text-center bg-blue text-white'>현재원</th>
						</tr>
					</thead>
					<tbody id="dataList2">
					</tbody>
				</table>
			</div>		
		</div>	
		<div class="col-3">
			<div class="table-responsive">
				<table class="table table-bordered m-b-0">
					<colgroup>
						<col style="width:15%;" />
						<col style="width:15%;" />
						<col style="width:15%;" />
						<col style="width:17%;" />
						<col style="width:17%;" />
						<col style="width:16%;" />
					</colgroup>
					<thead>
						<tr>
							<th class='text-center bg-grey-darker text-white' colspan="6" id="dataYear3"></th>
						</tr>
						<tr>
							<th class='text-center bg-blue text-white'>&nbsp;</th>
							<th class='text-center bg-blue text-white'>총원</th>
							<th class='text-center bg-blue text-white'>신규</th>
							<th class='text-center bg-blue text-white'>재수강(률)</th>
							<th class='text-center bg-blue text-white'>환불(률)</th>
							<th class='text-center bg-blue text-white'>현재원</th>
						</tr>
					</thead>
					<tbody id="dataList3">
					</tbody>
				</table>
			</div>		
		</div>	
		<div class="col-3">
			<div class="table-responsive">
				<table class="table table-bordered m-b-0">
					<colgroup>
						<col style="width:15%;" />
						<col style="width:15%;" />
						<col style="width:15%;" />
						<col style="width:17%;" />
						<col style="width:17%;" />
						<col style="width:16%;" />
					</colgroup>
					<thead>
						<tr>
							<th class='text-center bg-grey-darker text-white' colspan="6" id="dataYear4"></th>
						</tr>
						<tr>
							<th class='text-center bg-blue text-white'>&nbsp;</th>
							<th class='text-center bg-blue text-white'>총원</th>
							<th class='text-center bg-blue text-white'>신규</th>
							<th class='text-center bg-blue text-white'>재수강(률)</th>
							<th class='text-center bg-blue text-white'>환불(률)</th>
							<th class='text-center bg-blue text-white'>현재원</th>
						</tr>
					</thead>
					<tbody id="dataList4">
					</tbody>
				</table>
			</div>		
		</div>	
	</div>
	<div class="row">
		<div class="col-12 mt-3">
			<div class="note note-primary">
				<div class="note-content" style="padding:10px;">
					<h4 style="margin-bottom:0px;">${schoolInfo.school_name} 학생 리스트</h4>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<label class="col-form-label col-1"><h5>기간</h5></label>
		<div class="col-5">
			<div class="form-inline">
				<div class="form-group m-r-10">
					<select id="search_start_year" class="form-control">
					</select>
				</div>
				<div class="form-group m-r-10">
					<select  id="search_start_month" class="form-control">
					</select>
				</div>
				&nbsp;~&nbsp;
				<div class="form-group m-r-10 m-l-10">
					<select id="search_end_year" class="form-control">
					</select>
				</div>
				<div class="form-group m-r-10">
					<select id="search_end_month" class="form-control">
					</select>
				</div>
			</div>
		</div>
		<label class="col-form-label col-1"><h5>이름</h5></label>
		<div class="col-2">
			<input type="text" id="search_user_name" class="form-control">
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="search_student()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
	</div>	
	<div class="row">
		<div class="col-12 mb-5">
			<div class="table-responsive">
				<table class="table table-bordered m-b-0">
					<colgroup>
						<col style="width:6%;" />
						<col style="width:6%;" />
						<col style="width:11%;" />
						<col style="width:11%;" />
						<col style="width:5%;" />
						<col style="width:5%;" />
						<col style="width:4%;" />
						<col style="width:4%;" />
						<col style="width:4%;" />
						<col style="width:4%;" />
						<col style="width:4%;" />
						<col style="width:4%;" />
						<col style="width:4%;" />
						<col style="width:4%;" />
						<col style="width:4%;" />
						<col style="width:4%;" />
						<col style="width:4%;" />
						<col style="width:4%;" />
						<col style="width:8%;" />
					</colgroup>
					<thead>
						<tr>
							<th class='text-center bg-blue text-white' rowspan="2">이름</th>
							<th class='text-center bg-blue text-white' rowspan="2">어학연수<br>경험유무</th>
							<th class='text-center bg-blue text-white' rowspan="2">최초시작</th>
							<th class='text-center bg-blue text-white' rowspan="2">최종수강</th>
							<th class='text-center bg-blue text-white' rowspan="2">총<br>수강개월</th>
							<th class='text-center bg-blue text-white' rowspan="2">수능<br>등급</th>
							<th class='text-center bg-blue text-white' colspan="2">시작점수(보유점수)</th>
							<th class='text-center bg-blue text-white' colspan="5">시작토플점수(보유점수)</th>
							<th class='text-center bg-blue text-white' colspan="5">최종 실제토플점수</th>
							<th class='text-center bg-blue text-white' rowspan="2">시험일자</th>
						</tr>
						<tr>
							<th class='text-center bg-blue text-white'>토익</th>
							<th class='text-center bg-blue text-white'>텝스</th>
							<th class='text-center bg-blue text-white'>리딩</th>
							<th class='text-center bg-blue text-white'>리스닝</th>
							<th class='text-center bg-blue text-white'>스피킹</th>
							<th class='text-center bg-blue text-white'>라이팅</th>
							<th class='text-center bg-blue text-white'>총점</th>
							<th class='text-center bg-blue text-white'>리딩</th>
							<th class='text-center bg-blue text-white'>리스닝</th>
							<th class='text-center bg-blue text-white'>스피킹</th>
							<th class='text-center bg-blue text-white'>라이팅</th>
							<th class='text-center bg-blue text-white'>총점</th>
						</tr>
					</thead>
					<tbody id="student_list">
					</tbody>
				</table>
			</div>		
		</div>
	</div>	
</div>

<script type="text/javascript" src="/ui/stats/school_detail.js"></script>