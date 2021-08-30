<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<input type="file"   id="image_file" accept="image/*" style="display:none;" onChange="load_image(this);">
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">책 관리</h1>
	<hr />
	<!-- end page-header -->

	<div id="search_area" class="row mb-3">
		<div class="col-2">
			<select class="form-control" id="search_section">
				<option value="">BOOK</option>
				<option value="VOCA">VOCA</option>
				<option value="GRAMMAR">GRAMMAR</option>
				<option value="READING">READING</option>
				<option value="LISTENING">LISTENING</option>
				<option value="WRITING">WRITING</option>
				<option value="SPEAKING">SPEAKING</option>
				<option value="ETC">ETC</option>
			</select>
		</div>	
		<div class="col-2">
			<select class="form-control" id="search_staus">
				<option value="">사용여부</option>
				<option value="ACTIVE">사용</option>
				<option value="INACTIVE">미사용</option>
			</select>
		</div>	
		<div class="col-2">
			<input type="text" class="form-control" id="search_book_name">
		</div>	
		<div class="col-2">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>		
		<div class="col-4 text-right">
			<button type="button" class="btn btn-primary" onclick="form_add()"><i class="fa fa-plus fa-fw"></i> 추가</button>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">책 목록</h4>
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
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:20%;" />
								<col style="width:20%;" />
								<col style="width:10%;" />
							</colgroup>
							<thead>
								<tr>
									<th class='text-center'>SECTION</th>
									<th class='text-center'>BOOK</th>
									<th class='text-center'>가격</th>
									<th class='text-center'>교보가격</th>
									<th class='text-center'>사용여부</th>
									<th class='text-center'>정렬순서</th>
									<th class='text-center'>등록일시/등록자</th>
									<th class='text-center'>수정일시/수정자</th>
									<th class='text-center'>&nbsp;</th>
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
<div class="modal fade" id="modal-book">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">책 등록/수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive" style="max-height:600px;overflow-y:auto;">
					<table class="table table-bordered m-b-10">
						<colgroup>
							<col style="width:20%;" />
							<col style="width:80%;" />
						</colgroup>	
						<tbody>	
							<tr>
								<th class="text-center table-info">Section</th>
								<td class="text-with-form-control">
									<select class="form-control" id="section">
										<option value="VOCA">VOCA</option>
										<option value="GRAMMAR">GRAMMAR</option>
										<option value="READING">READING</option>
										<option value="LISTENING">LISTENING</option>
										<option value="WRITING">WRITING</option>
										<option value="SPEAKING">SPEAKING</option>
										<option value="ETC">ETC</option>
									</select>
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">책</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control" id="book_name">
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">가격</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control" id="book_amount">
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">가격(교보)</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control" id="book_kyobo_amount">
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">교보 URL</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control" id="book_url">
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">정렬순서</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control" id="book_sort">
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">사용여부</th>
								<td class="text-with-form-control">
									<div class="switcher">
										<input type="checkbox" name="status" id="status" value="1">
										<label for="status"></label>
									</div>
								</td>
							</tr>
							<tr>
								<th class="text-center table-info">이미지</th>
								<td class="with-btn">
									<input type="hidden" id="book_image">
									<button class="btn btn-sm btn-primary m-2" onClick="add_image()">이미지 찾기</button>
								</td>
							</tr>								
							<tr>
								<td class="text-center" id="td_book_image" colspan="2">
								</td>
							</tr>								
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:form_save();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/base/book.js"></script>

