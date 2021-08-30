<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">첨삭/이용권 관리</h1>
	<hr />
	<!-- end page-header -->
	<div id="search_area" class="row mb-3">
		<div class="col-2">
			<select class="form-control" id="search_section">
				<option value="">전체</option>
				<option value="VOCA">VOCA</option>
				<option value="SPEAKING">SPEAKING</option>
				<option value="WRITING">WRITING</option>
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_practice_type">
				<option value="">전체</option>
				<option value="MOCK_TEST">이용/첨삭권</option>
				<option value="ONLINE">인강</option>
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_status">
				<option value="">전체</option>
				<option value="ACTIVE">사용중</option>
				<option value="COMPLETE">사용완료</option>
				<option value="EXPIRE">유효기간 만료</option>
			</select>
		</div>
		<div class="col-2">
			<input type="text" class="form-control" id="search_user_name">
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
		<div class="col-3 text-right">
			<button type="button" class="btn btn-sm btn-primary width-60 m-r-2" onclick="add_form()">추가</button>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">첨삭/이용권 목록</h4>
				</div>
				<div class="panel-body">
				<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:7%;" />
								<col style="width:6%;" />
								<col style="width:6%;" />
								<col style="width:7%;" />
								<col style="width:6%;" />
								<col style="width:6%;" />
								<col style="width:6%;" />
								<col style="width:6%;" />
								
								<col style="width:6%;" />
								<col style="width:6%;" />
								<col style="width:6%;" />
								<col style="width:6%;" />
								
								<col style="width:9%;" />
								<col style="width:9%;" />
								
								<col style="width:8%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center">section</th>
									<th class="text-center">종류</th>
									<th class="text-center">book</th>
									<th class="text-center">사용자</th>
									<th class="text-center">구분</th>
									<th class="text-center">차감/기간구분</th>
									<th class="text-center">상태</th>
									<th class="text-center">만료일</th>
									<th class="text-center">총 갯수</th>
									<th class="text-center">사용 갯수</th>
									<th class="text-center">만료 갯수</th>
									<th class="text-center">남은 갯수</th>
									<th class="text-center">등록자</th>
									<th class="text-center">수정자</th>
									<th class="text-center">관리</th>
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
<div class="modal fade" id="modal-user-product">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">첨삭/이용권 등록</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row mb-3" id="div_search_user">
					<div class="col-8">
						<input type="text" class="form-control" id="search_auth_username">
					</div>	
					<div class="col-4">
						<button type="button" class="btn btn-primary" onclick="auth_search()"><i class="fa fa-search fa-fw"></i> Search</button>
					</div>		
					<div class="table-responsive" style="max-height:300px;overflow-y:auto;">
						<table class="table table-bordered m-t-10 m-b-10">
							<colgroup>
								<col style="width:30%;" />
								<col style="width:20%;" />
								<col style="width:50%;" />
							</colgroup>	
							<thead>	
								<tr>
									<th class="text-center table-info">아이디</th>
									<th class="text-center table-info">성명</th>
									<th class="text-center table-info">관리</th>
								</tr>
							</thead>
							<tbody id="authList"></tbody>
							
						</table>
					</div>
				</div>
				<div class="row mb-3" id="div_test_type">
					<div class="table-responsive">
						<table class="table table-bordered m-b-10">
							<colgroup>
								<col style="width:30%;" />
								<col style="width:30%;" />
								<col style="width:30%;" />
								<col style="width:10%;" />
							</colgroup>	
							<thead>	
								<tr class="bg-info">
									<th class="text-center">Section</th>
									<th class="text-center">시험타입</th>
									<th class="text-center">시험타입명</th>
									<th class="text-center">&nbsp;</th>
								</tr>
							</thead>
							<tbody id="test_list">
							</tbody>
						</table>
					</div>
				</div>
				<div class="row mb-3" id="div_user_product">
					<div class="table-responsive">
						<table class="table table-bordered m-b-10">
							<colgroup>
								<col style="width:30%;" />
								<col style="width:70%;" />
							</colgroup>	
							<tbody>	
								<tr>
									<th class="text-center bg-grey">아이디</th>
									<td class="text-with-form-control" id="update_user_username"></td>
								</tr>
								<tr>
									<th class="text-center bg-grey">이름</th>
									<td class="text-with-form-control" id="update_user_name"></td>
								</tr>
								<tr>
									<th class="text-center bg-grey">section</th>
									<td class="text-with-form-control" id="update_section_name"></td>
								</tr>
								<tr>
									<th class="text-center bg-grey">종류</th>
									<td class="text-with-form-control" id="update_practice_type_name"></td>
								</tr>
								<tr>
									<th class="text-center bg-grey">book</th>
									<td class="text-with-form-control">
										<input type="hidden" id="update_user_id">
										<input type="hidden" id="update_section">
										<input type="hidden" id="update_practice_type">
										<select class="form-control" name="update_book" id="update_book">
											
										</select> 
									</td>
								</tr>
								<tr>
									<th class="text-center bg-grey">구매 구분</th>
									<td class="text-with-form-control">
										<select class="form-control" name="update_product_type" id="update_product_type">
											<option value="BONUS">보너스</option>
											<option value="BUY">구매</option>
										</select> 
									</td>
								</tr>
								<tr>
									<th class="text-center bg-grey">기간/차감 구분</th>
									<td class="text-with-form-control">
										<select class="form-control" name="update_use_type" id="update_use_type">
											<option value="COUNT">차감</option>
											<option value="DATE">기간</option>
										</select> 
									</td>
								</tr>
								<tr>
									<th class="text-center bg-grey">유효기간</th>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="update_expire_date" id="update_expire_date">
									</td>
								</tr>
								<tr>
									<th class="text-center bg-grey">첨삭수</th>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="update_product_count" id="update_product_count">
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_form();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<script>
	$('#insert_expire_date').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	});

	$('#update_expire_date').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	});
	
</script>
<!-- end #content -->
<script type="text/javascript" src="/ui/correction/user_product.js"></script>

