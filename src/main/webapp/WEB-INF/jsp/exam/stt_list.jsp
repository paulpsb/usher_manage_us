<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">STT 시험문제 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<input type="hidden" name="v_page" id="v_page" value="${sttInfo.page}">
	<input type="hidden" name="v_section" id="v_section" value="${sttInfo.section}">
	<input type="hidden" name="v_book" id="v_book" value="${sttInfo.book}">
	<input type="hidden" name="v_volume" id="v_volume" value="${sttInfo.volume}">
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
					<h4 class="panel-title">묶기 시험문제 목록</h4>
				</div>
				<div class="panel-body">
				<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:13%;" />
								<col style="width:13%;" />
								<col style="width:13%;" />
								<col style="width:13%;" />
								<col style="width:13%;" />
								<col style="width:25%;" />
								<col style="width:10%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center">section</th>
									<th class="text-center">교재</th>
									<th class="text-center">볼륨</th>
									<th class="text-center">그룹</th>
									<th class="text-center">지문</th>
									<th class="text-center">제목</th>
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
<div class="modal fade" id="modal-add-stt">
	<div class="modal-dialog modal-lg" style="max-width:1020px;">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">STT 등록</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-th-valign-middle table-td-valign-middle table-bordered m-b-10">
						<colgroup>
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
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
						<tbody>	
							<tr>
								<th class="text-center bg-grey">section</th>
								<td class="text-with-form-control" colspan="3">
									<select class="form-control" name="section" id="section">
									</select> 
								</td>
								<th class="text-center bg-grey">교재</th>
								<td class="text-with-form-control" colspan="3">
									<select class="form-control" name="book" id="book">
									</select> 
								</td>
								<th class="text-center bg-grey">볼륨</th>
								<td class="text-with-form-control" colspan="3">
									<select class="form-control" name="volume" id="volume">
									</select> 
								</td>
								<th class="text-center bg-grey">그룹</th>
								<td class="text-with-form-control" colspan="3">
									<select class="form-control" name="group" id="group">
									</select> 
								</td>
								<th class="text-center bg-grey">지문</th>
								<td class="text-with-form-control" colspan="3">
									<select class="form-control" name="article" id="article">
									</select> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey" colspan="2">문단</th>
								<td class="text-with-form-control" colspan="2">
									<input type="text" class="form-control" name="add_paragraph1" id="add_paragraph1">  
								</td>
								<td class="text-with-form-control" colspan="2">
									<input type="text" class="form-control" name="add_paragraph2" id="add_paragraph2">  
								</td>
								<td class="text-with-form-control" colspan="2">
									<input type="text" class="form-control" name="add_paragraph3" id="add_paragraph3">  
								</td>
								<td class="text-with-form-control" colspan="2">
									<input type="text" class="form-control" name="add_paragraph4" id="add_paragraph4">  
								</td>
								<td class="text-with-form-control" colspan="2">
									<input type="text" class="form-control" name="add_paragraph5" id="add_paragraph5">  
								</td>
								<td class="text-with-form-control" colspan="2">
									<input type="text" class="form-control" name="add_paragraph6" id="add_paragraph6">  
								</td>
								<td class="text-with-form-control" colspan="2">
									<input type="text" class="form-control" name="add_paragraph7" id="add_paragraph7">  
								</td>
								<td class="text-with-form-control" colspan="2">
									<input type="text" class="form-control" name="add_paragraph8" id="add_paragraph8">  
								</td>
								<td class="text-with-form-control" colspan="2">
									<input type="text" class="form-control" name="add_paragraph9" id="add_paragraph9">  
									<input type="hidden" name="add_paragraph10" id="add_paragraph10">  
								</td>
							</tr>	
							<tr>
								<th class="text-center bg-grey" colspan="20">지문</th>
							</tr>	
							<tr>
								<td colspan="10">
									<div style="height:400px;overflow-y:auto;">
										<textarea class="form-control" name="add_contents" id="add_contents" style="height:400px;"></textarea>
									</div>
								</td>
								<td colspan="10">
									<div  id="div_add_contents" style="width:470px;height:400px;overflow-y:auto;"></div>
								</td>
							</tr>	
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:form_insert();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-mod-stt">
	<div class="modal-dialog modal-lg" style="max-width:1020px;">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">STT 수정</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<input type="hidden" id="stt_id">
					<table class="table table-th-valign-middle table-td-valign-middle table-bordered m-b-10">
						<colgroup>
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
							<col style="width:5%;" />
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
						<tbody>	
							<tr>
								<th class="text-center bg-grey">section</th>
								<td class="text-with-form-control" colspan="3" id="mod_section">
								</td>
								<th class="text-center bg-grey">교재</th>
								<td class="text-with-form-control" colspan="3" id="mod_book">
								</td>
								<th class="text-center bg-grey">볼륨</th>
								<td class="text-with-form-control" colspan="3" id="mod_volume">
								</td>
								<th class="text-center bg-grey">그룹</th>
								<td class="text-with-form-control" colspan="3" id="mod_group">
								</td>
								<th class="text-center bg-grey">지문</th>
								<td class="text-with-form-control" colspan="3" id="mod_article">
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey" colspan="2">문단</th>
								<td class="text-with-form-control" colspan="2">
									<input type="text" class="form-control" name="mod_paragraph1" id="mod_paragraph1">  
								</td>
								<td class="text-with-form-control" colspan="2">
									<input type="text" class="form-control" name="mod_paragraph2" id="mod_paragraph2">  
								</td>
								<td class="text-with-form-control" colspan="2">
									<input type="text" class="form-control" name="mod_paragraph3" id="mod_paragraph3">  
								</td>
								<td class="text-with-form-control" colspan="2">
									<input type="text" class="form-control" name="mod_paragraph4" id="mod_paragraph4">  
								</td>
								<td class="text-with-form-control" colspan="2">
									<input type="text" class="form-control" name="mod_paragraph5" id="mod_paragraph5">  
								</td>
								<td class="text-with-form-control" colspan="2">
									<input type="text" class="form-control" name="mod_paragraph6" id="mod_paragraph6">  
								</td>
								<td class="text-with-form-control" colspan="2">
									<input type="text" class="form-control" name="mod_paragraph7" id="mod_paragraph7">  
								</td>
								<td class="text-with-form-control" colspan="2">
									<input type="text" class="form-control" name="mod_paragraph8" id="mod_paragraph8">  
								</td>
								<td class="text-with-form-control" colspan="2">
									<input type="text" class="form-control" name="mod_paragraph9" id="mod_paragraph9">  
									<input type="hidden" name="mod_paragraph10" id="mod_paragraph10">  
								</td>
							</tr>	
							<tr>
								<th class="text-center bg-grey" colspan="20">지문</th>
							</tr>	
							<tr>
								<td colspan="10">
									<div style="height:400px;overflow-y:auto;">
										<textarea class="form-control" name="mod_contents" id="mod_contents" style="height:400px;"></textarea>
									</div>
								</td>
								<td colspan="10">
									<div  id="div_mod_contents" style="width:470px;height:400px;overflow-y:auto;"></div>
								</td>
							</tr>	
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:form_modify();" class="btn btn-success">저장</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/exam/stt_list.js"></script>

