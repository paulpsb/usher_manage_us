<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<input type="file"   id="image_file" accept="image/*" style="display:none;" onChange="load_image(this);">
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">듀오링고 이미지시험 관리</h1>
	<hr />
	<!-- end page-header -->

	<div id="search_area" class="row mb-3">
		<div class="col-2">
			<select class="form-control" id="search_book">
				<option value="IMAGE">IMAGE</option>
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_volume">
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_group">
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_article">
			</select>
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
		<div class="col-3 text-right">
			<button type="button" class="btn btn-primary width-60 m-r-2" onclick="form_add()">추가</button>
			<button type="button" class="btn btn-primary" onclick="form_save_sort()"><i class="fa fa-save fa-fw"></i>정렬 저장</button>
		</div>		
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">듀오링고 이미지시험 목록</h4>
				</div>
				<div class="panel-body">
				<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:5%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:15%;" />
								<col style="width:25%;" />
								<col style="width:10%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center">&nbsp;</th>
									<th class="text-center">교재</th>
									<th class="text-center">볼륨</th>
									<th class="text-center">그룹</th>
									<th class="text-center">지문</th>
									<th class="text-center">제목</th>
									<th class="text-center">관리</th>
								</tr>
							</thead>
							<tbody id="itemBoxWrap">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-image">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">이미지 등록/수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-th-valign-middle table-td-valign-middle table-bordered m-b-10">
						<colgroup>
							<col style="width:40%;" />
							<col style="width:10%;" />
							<col style="width:20%;" />
							<col style="width:10%;" />
							<col style="width:20%;" />
						</colgroup>	
						<thead>
							<tr>
								<th class="text-center bg-primary">이미지</th>
								<th class="text-center bg-primary" colspan="4">모범답안</th>
							</tr>			
						</thead>
						<tbody>	
							<tr>
								<td class="text-with-form-control text-center" rowspan="3">
									<div style="width:100%;margin-bottom:5px;" id="div_image_url"></div>
									<input type="hidden" name="image_url" id="image_url">
									<button type="button" class="btn btn-sm btn-primary" onclick="add_image()">이미지 등록</button>
								</td>
								<th class="text-center bg-grey">제목</th>
								<td class="text-with-form-control" colspan="4">
									<input type="text" class="form-control" name="image_title" id="image_title">
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">단어수</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="score_word" id="score_word">
								</td>
								<th class="text-center bg-grey">키워드 수</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="score_keyword" id="score_keyword">
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">키워드</th>
								<td class="text-with-form-control" colspan="4">
									<textarea class="form-control" name="image_keyword" id="image_keyword" style="height:150px;"></textarea>
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
<script type="text/javascript" src="/ui/exam/duolingo_image_list.js"></script>
