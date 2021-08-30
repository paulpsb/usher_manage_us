<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">상품 관리</h1>
	<hr />
	<!-- end page-header -->
	<div id="search_area" class="row mb-3">
		<div class="col-2">
			<select class="form-control" id="search_status">
				<option value="">전체</option>
				<option value="ACTIVE">판매중</option>
				<option value="INACTIVE">판매대기</option>
			</select>
		</div>
		<div class="col-2">
			<input type="text" class="form-control" id="search_product_name">
		</div>
		<div class="col-2">
			<button type="button" class="btn btn-sm btn-primary width-60 m-r-2" onclick="form_search()">조회</button>
		</div>
		<div class="col-6 text-right">
			<button type="button" class="btn btn-sm btn-primary width-60 m-r-2" onclick="add_form()">추가</button>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">상품 목록</h4>
				</div>
				<div class="panel-body">
				<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:10%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center">상품구분</th>
									<th class="text-center">상품명</th>
									<th class="text-center">상품설명</th>
									<th class="text-center">기본가격</th>
									<th class="text-center">판매가격</th>
									<th class="text-center">정렬순서</th>
									<th class="text-center">상태</th>
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
<div class="modal fade" id="modal-shop-product">
	<div class="modal-dialog modal-lg" style="max-width:1200px;">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">상품 등록/수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row mb-3">
					<div class="table-responsive">
						<input type="hidden" id="update_user_id">
						<table class="table table-bordered m-b-10">
							<colgroup>
								<col style="width:10%;" />
								<col style="width:15%;" />
								<col style="width:10%;" />
								<col style="width:15%;" />
								<col style="width:10%;" />
								<col style="width:15%;" />
								<col style="width:10%;" />
								<col style="width:15%;" />
							</colgroup>	
							<tbody>	
								<tr>
									<th class="text-center bg-grey">section</th>
									<td class="text-with-form-control">
										<select class="form-control" id="section">
											<option value="">전체</option>
											<option value="VOCA">VOCA</option>
											<option value="GRAMMAR">GRAMMAR</option>
											<option value="READING">READING</option>
											<option value="LISTENING">LISTENING</option>
											<option value="SPEAKING">SPEAKING</option>
											<option value="WRITING">WRITING</option>
										</select>
									</td>
									<th class="text-center bg-grey">시험타입</th>
									<td class="text-with-form-control">
										<select class="form-control" id="practice_type">
											<option value="ONLINE">인강</option>
											<option value="MOCK_TEST">시험</option>
											<option value="EXAM_TEST">모의시험</option>
										</select>
									</td>
									<th class="text-center bg-grey">상품명</th>
									<td class="text-with-form-control" colspan="3">
										
										<input type="hidden" id="product_id">
										<input type="text" class="form-control" id="product_name">
									</td>
								</tr>
								<tr>
								<tr>
									<th class="text-center bg-grey">상품설명</th>
									<td class="text-with-form-control" colspan="3">
										<input type="text" class="form-control" id="product_desc">
									</td>
									<th class="text-center bg-grey">상품타입</th>
									<td class="text-with-form-control">
										<select class="form-control" id="product_type">
											<option value="ETC">기본</option>
											<option value="TEST">모의고사</option>
										</select>
									</td>
									<th class="text-center bg-grey">판매구분</th>
									<td class="text-with-form-control">
										<select class="form-control" id="status">
											<option value="ACTIVE">판매중</option>
											<option value="INACTIVE">판매대기</option>
										</select>
									</td>
								</tr>
								<tr>
									<th class="text-center bg-grey">기본가격</th>
									<td class="text-with-form-control">
										<input type="text" class="form-control text-right" id="product_basic_price" >
									</td>
									<th class="text-center bg-grey">판매가격</th>
									<td class="text-with-form-control">
										<input type="text" class="form-control text-right" id="product_price">
									</td>
									<th class="text-center bg-grey">이미지</th>
									<td class="text-with-form-control" colspan="3">
										<input type="text" class="form-control" id="product_image">
									</td>
								</tr>
								<tr>
									<th class="text-center bg-grey">정렬순서</th>
									<td class="text-with-form-control">
										<input type="text" class="form-control" id="sorting">
									</td>
									<th class="text-center bg-grey">모의시험</th>
									<td class="checkbox checkbox-css" colspan="5">
										<input type="checkbox" value="Y" id="reading_yn">
										<label for="reading_yn">READING</label>
										<input type="checkbox" value="Y" id="listening_yn">
										<label for="listening_yn">LISTENING</label>
										<input type="checkbox" value="Y" id="speaking_yn">
										<label for="speaking_yn">SPEAKING</label>
										<input type="checkbox" value="Y" id="writing_yn">
										<label for="writing_yn">WRITING</label>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="row mb-3">
					<div class="col-12 text-right">
						<button type="button" class="btn btn-sm btn-primary width-60 m-r-2" onclick="add_detail_form()">추가</button>
					</div>
				</div>
				<div class="row mb-3">
					<div class="table-responsive">
						<table class="table table-bordered m-b-10">
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
								<tr class="bg-info">
									<th class="text-center">Section</th>
									<th class="text-center">시험타입</th>
									<th class="text-center">Book</th>
									<th class="text-center">기간/차감구분</th>
									<th class="text-center">유효기간</th>
									<th class="text-center">수량</th>
									<th class="text-center">&nbsp;</th>
								</tr>
							</thead>
							<tbody id="detail_list">
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
<div class="modal fade" id="modal-test-type">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">시험 등록</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row mb-3">
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
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="/ui/correction/shop_product.js"></script>

