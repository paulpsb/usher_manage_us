<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">첨삭 루브릭 관리</h1>
	<hr />
	<!-- end page-header -->

	<div id="search_area" class="row mb-3">
		<div class="col-2">
			<select class="form-control" id="search_section">
				<option value="WRITING">WRITING</option>
				<option value="SPEAKING">SPEAKING</option>
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_book">
				
			</select>
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
		<div class="col-7 text-right">
			<button type="button" class="btn btn-sm btn-primary width-60 m-r-2" onclick="form_add()">추가</button>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">첨삭 루브릭 목록</h4>
				</div>
				<div class="panel-body">
				<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:5%;" />
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:34%;" />
								<col style="width:5%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center">section</th>
									<th class="text-center">교재</th>
									<th class="text-center">No.</th>
									<th class="text-center">카테고리1</th>
									<th class="text-center">카테고리2</th>
									<th class="text-center">제목</th>
									<th class="text-center">설명</th>
									<th class="text-center">관리</th>
								</tr>
							</thead>
							<tbody id="data_list">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-ruburic">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">첨삭 루브릭 등록/수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-th-valign-middle table-td-valign-middle table-bordered m-b-10">
						<colgroup>
							<col style="width:10%;" />
							<col style="width:40%;" />
							<col style="width:10%;" />
							<col style="width:40%;" />
						</colgroup>	
						<tbody id="data_list">	
							<tr>
								<th class="text-center bg-grey">Section</th>
								<td class="text-with-form-control">
									<input type="hidden" name="ruburic_id" id="ruburic_id">
									<input type="text" class="form-control" name="section" id="section" disabled>  
								</td>
								<th class="text-center bg-grey">교재</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="book" id="book" disabled>  
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">No.</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="ruburic_num" id="ruburic_num">  
								</td>
								<td colspan="2">&nbsp;</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">카테고리1</th>
								<td class="text-with-form-control" colspan="3">
									<input type="text" class="form-control" name="ruburic_category_title" id="ruburic_category_title">
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">카테고리2</th>
								<td class="text-with-form-control" colspan="3">
									<input type="text" class="form-control" name="ruburic_category_sub" id="ruburic_category_sub">
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">제목</th>
								<td class="text-with-form-control" colspan="3">
									<input type="text" class="form-control" name="ruburic_content_title" id="ruburic_content_title">
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">설명</th>
								<td class="text-with-form-control" colspan="3">
									<input type="text" class="form-control" name="ruburic_content_sub" id="ruburic_content_sub">
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
<script type="text/javascript" src="/ui/base/exam_ruburic.js"></script>
