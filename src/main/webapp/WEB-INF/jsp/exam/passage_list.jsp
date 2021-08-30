<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">구문/단어 시험문제 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<input type="hidden" name="v_page" id="v_page" value="${passageInfo.page}">
	<input type="hidden" name="v_section" id="v_section" value="${passageInfo.section}">
	<input type="hidden" name="v_book" id="v_book" value="${passageInfo.book}">
	<input type="hidden" name="v_volume" id="v_volume" value="${passageInfo.volume}">
	<div id="search_area" class="row mb-3">
		<div class="col-2">
			<select class="form-control" id="search_section">
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_book">
			</select>
		</div>
		<div class="col-2">
			<select class="form-control" id="search_volume">
			</select>
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
		<div class="col-5 text-right">
			<button type="button" class="btn btn-sm btn-primary width-60 m-r-2" onclick="add_form()">추가</button>
		</div>		
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">구문/단어 시험문제 목록</h4>
				</div>
				<div class="panel-body">
				<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:12%;" />
								<col style="width:16%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center" rowspan="2">section</th>
									<th class="text-center" rowspan="2">교재</th>
									<th class="text-center" rowspan="2">볼륨</th>
									<th class="text-center" rowspan="2">그룹</th>
									<th class="text-center" rowspan="2">지문</th>
									<th class="text-center" colspan="2">API</th>
									<th class="text-center" rowspan="2">관리</th>
								</tr>
								<tr class="table-active">
									<th class="text-center">book</th>
									<th class="text-center">jindo</th>
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
<div class="modal fade" id="modal-passage">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">지문 수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-th-valign-middle table-td-valign-middle table-bordered m-b-10">
						<colgroup>
							<col style="width:20%;" />
							<col style="width:80%;" />
						</colgroup>	
						<tbody id="data_list">	
							<tr>
								<th class="text-center bg-grey">section</th>
								<td class="text-with-form-control">
									<input type="hidden" name="passage_id" id="passage_id">
									<select class="form-control" name="section" id="section">
									</select> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">교재</th>
								<td class="text-with-form-control">
									<select class="form-control" name="book" id="book">
									</select> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">볼륨</th>
								<td class="text-with-form-control">
									<select class="form-control" name="volume" id="volume">
									</select> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">그룹</th>
								<td class="text-with-form-control">
									<select class="form-control" name="group" id="group">
									</select> 
								</td>
							</tr>	
							<tr>
								<th class="text-center bg-grey">지문</th>
								<td class="text-with-form-control">
									<select class="form-control" name="article" id="article">
									</select> 
								</td>
							</tr>	
							<tr>
								<th class="text-center bg-grey">api book</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="netpg_book" id="netpg_book" disabled>  
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">api jindo</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="netpg_jindo" id="netpg_jindo" disabled>  
								</td>
							</tr>			
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_form();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/exam/passage_list.js"></script>
