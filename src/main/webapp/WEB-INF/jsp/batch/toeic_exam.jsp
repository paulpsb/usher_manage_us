<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
.select-image {
	border: 5px solid #555;
}

</style>
<!-- begin #content -->
<div id="content" class="content">
	<div id="div_file"></div>
	
	<!-- begin page-header -->
	<h1 class="page-header">배치고사 Grammar 시험문제 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area" class="row mb-3">
		<div class="offset-3 col-2">
			<select class="form-control" id="search_type">
				<option value="TOEIC DIAGNOSTIC">TOEIC DIAGNOSTIC</option>
			</select>
		</div>
		<div class="col-1">
			<select class="form-control" id="search_num">
				
			</select>
		</div>
		<div class="col-4">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> 조회</button>
			<button type="button" class="btn btn-primary" onclick="create_num()"><i class="fa fa-list fa-fw"></i> 회차 생성</button>
		</div>		
		<div class="col-2 text-right">
			<button type="button" class="btn btn-primary" onclick="form_submit()"><i class="fa fa-save fa-fw"></i> 저장</button>
		</div>		
	</div>
	<div class="row">
		<div class="col-2">
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-1">
						<div class="panel-heading">
							<h4 class="panel-title">이미지 썸네일</h4>
							<div class="panel-heading-btn">
								<button type="button" class="btn btn-xs btn-primary" onclick="add_image()"><i class="fa fa-plus fa-fw"></i> 이미지 추가</button>
							</div>
						</div>
						<div class="panel-body" style="overflow-y:auto" id="div_thumnail_list">
							<div class="form-group row m-b-15" id="thumnail_list">
								
							</div>				
						</div>
					</div>
				</div>
			</div>				
		</div>
		<div class="col-7">
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-2">
						<div class="panel-heading">
							<h4 class="panel-title">선택 이미지</h4>
						</div>
						<div class="panel-body" style="overflow-y:auto" id="div_view_image">
							<div class="form-group row m-b-15">
								<div class="col-md-12 text-center" id="view_image" >
									
								</div>
							</div>	
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-3">
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-2">
						<div class="panel-heading">
							<h4 class="panel-title">문제</h4>
							<div class="panel-heading-btn">
								<button type="button" class="btn btn-xs btn-primary" onclick="create_question()">문제 생성</button>
							</div>
						</div>
						<div class="panel-body">
							<div class="table-responsive">
								<table class="table table-bordered table-td-valign-middle m-b-0">
									<colgroup>
										<col style="width:20%;" />
										<col style="width:30%;" />
										<col style="width:20%;" />
										<col style="width:30%;" />
									</colgroup>							
									<tbody>
										<tr>
											<th class="text-center table-info">문항갯수</th>
											<td>
												<input type="text" class="form-control" name="question_count" id="question_count">
											</td>
											<th class="text-center table-info">시작번호</th>
											<td>
												<input type="text" class="form-control" name="question_start_num" id="question_start_num">
											</td>
										</tr>							
										<tr>
											<th class="text-center table-info">객관식 선지</th>
											<td>
												<input type="text" class="form-control" name="objective_item_count" id="objective_item_count">
											</td>
											<th class="text-center table-info">숫자/알파벳</th>
											<td>
												<select class="form-control" name="objective_item_type" id="objective_item_type">
													<option value="A">알파벳</option>
													<option value="N">숫자</option>
												</select>
											</td>
										</tr>
										<tr>
											<th class="text-center table-info">그룹</th>
											<td colspan="3">
												<input type="text" class="form-control" name="group_name" id="group_name">
											</td>
										</tr>							
									</tbody>
								</table>
							</div>
							<div class="table-responsive" style="overflow-y:auto" id="div_question">
								<table class="table table-bordered table-td-valign-middle m-b-0">
									<colgroup>
										<col style="width:10%;" />
										<col style="width:30%;" />
										<col style="width:60%;" />
									</colgroup>							
									<thead>
										<tr>
											<th class="text-center table-info">번호</th>
											<th class="text-center table-info">그룹</th>
											<th class="text-center table-info">답란</th>
										</tr>							
									</thead>
									<tbody id="toeic_question_list"></tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/batch/toeic_exam.js"></script>
