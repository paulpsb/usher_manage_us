<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">딕테이션 시험문제 관리</h1>
	<hr />
	<!-- end page-header -->
	
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
					<h4 class="panel-title">딕테이션 시험문제 목록</h4>
				</div>
				<div class="panel-body">
				<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:14%;" />
								<col style="width:14%;" />
								<col style="width:14%;" />
								<col style="width:14%;" />
								<col style="width:14%;" />
								<col style="width:14%;" />
								<col style="width:16%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center">section</th>
									<th class="text-center">교재</th>
									<th class="text-center">볼륨</th>
									<th class="text-center">그룹</th>
									<th class="text-center">지문</th>
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
<div class="modal fade" id="modal-dictation">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">딕테이션 수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-th-valign-middle table-td-valign-middle table-bordered m-b-10">
						<colgroup>
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:10%;" />
							<col style="width:10%;" />
						</colgroup>	
						<tbody id="data_list">	
							<tr>
								<th class="text-center bg-grey">section</th>
								<td class="text-with-form-control" colspan="2">
									<input type="hidden" name="dictation_id" id="dictation_id">
									<select class="form-control" name="section" id="section">
									</select> 
								</td>
								<th class="text-center bg-grey">교재</th>
								<td class="text-with-form-control" colspan="3">
									<select class="form-control" name="book" id="book">
									</select> 
								</td>
								<th class="text-center bg-grey">볼륨</th>
								<td class="text-with-form-control" colspan="2">
									<select class="form-control" name="volume" id="volume">
									</select> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">그룹</th>
								<td class="text-with-form-control" colspan="2">
									<select class="form-control" name="group" id="group">
									</select> 
								</td>
								<th class="text-center bg-grey">지문</th>
								<td class="text-with-form-control" colspan="3">
									<select class="form-control" name="article" id="article">
									</select> 
								</td>
								<td colspan="3">&nbsp;</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey">문단</th>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="paragraph1" id="paragraph1">  
								</td>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="paragraph2" id="paragraph2">  
								</td>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="paragraph3" id="paragraph3">  
								</td>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="paragraph4" id="paragraph4">  
								</td>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="paragraph5" id="paragraph5">  
								</td>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="paragraph6" id="paragraph6">  
								</td>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="paragraph7" id="paragraph7">  
								</td>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="paragraph8" id="paragraph8">  
								</td>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="paragraph9" id="paragraph9">  
									<input type="hidden" name="paragraph10" id="paragraph10">  
								</td>
							</tr>	
							<tr>
								<th class="text-center bg-grey" colspan="10">지문</th>
							</tr>	
							<tr>
								<td colspan="10">
									<div  id="div_contents" style="height:400px;overflow-y:auto;"></div>
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
<div class="modal fade" id="modal-dictation-content">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">지문 수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-th-valign-middle table-td-valign-middle table-bordered m-b-10">
						<colgroup>
							<col style="width:100%;" />
						</colgroup>	
						<tbody id="data_list">	
							<tr>
								<td class="text-with-form-control">
									<input type="hidden" name="dictation_content_id" id="dictation_content_id">
									<textarea class="form-control" name="contents" id="contents" style="height:500px;"></textarea>
								</td>
							</tr>			
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_form_content();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-dictation-sound">
	<div class="modal-dialog modal-lg" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">딕테이션 음원확인</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-th-valign-middle table-td-valign-middle table-bordered m-b-10">
						<colgroup>
							<col style="width:10%;" />
							<col style="width:80%;" />
						</colgroup>	
						<thead>
							<tr>
								<th>지문</th>
								<th id="dictation_title"></th>
							</tr>	
						</thead>
					</table>
				</div>
				<div class="table-responsive" style="height:450px;overflow-y:auto;">
					<table class="table table-th-valign-middle table-td-valign-middle table-bordered m-b-10">
						<colgroup>
							<col style="width:5%;" />
							<col style="width:85%;" />
							<col style="width:10%;" />
						</colgroup>	
						<tbody id="dictation_list">	
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/exam/dictation_list.js"></script>
