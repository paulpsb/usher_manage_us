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
	<input type="hidden" name="passage_id" id="passage_id" value="${passageInfo.id}">
	<div id="search_area" class="row mb-3">
		<div class="col-12 text-right">
			<button type="button" class="btn btn-sm btn-primary m-r-2" onclick="move_form()">목록으로 이동</button>
			<button type="button" class="btn btn-sm btn-primary width-60 m-r-2" onclick="save_form()">저장</button>
		</div>		
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">구문/단어 시험</h4>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:6%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:6%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:6%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:6%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
								<col style="width:6%;" />
								<col style="width:7%;" />
								<col style="width:7%;" />
							</colgroup>
								<tr>
									<th class="text-center bg-grey" >section</th>
									<td class="text-with-form-control" colspan="2">
										<select class="form-control" name="section" id="section">
										</select> 
									</td>
									<th class="text-center bg-grey">book</th>
									<td class="text-with-form-control" colspan="2">
										<select class="form-control" name="book" id="book">
										</select> 
									</td>
									<th class="text-center bg-grey">volume</th>
									<td class="text-with-form-control" colspan="2">
										<select class="form-control" name="volume" id="volume">
										</select> 
									</td>
									<th class="text-center bg-grey">group</th>
									<td class="text-with-form-control" colspan="2">
										<select class="form-control" name="group" id="group">
										</select> 
									</td>
									<th class="text-center bg-grey">article</th>
									<td class="text-with-form-control" colspan="2">
										<select class="form-control" name="article" id="article">
										</select> 
									</td>
								</tr>
								<tr>
									<th class="text-center bg-grey">api book</th>
									<td class="text-with-form-control" colspan="2">
										<input type="text" class="form-control" name="netpg_book" id="netpg_book" disabled>  
									</td>
									<th class="text-center bg-grey">api jindo</th>
									<td class="text-with-form-control" colspan="2">
										<input type="text" class="form-control" name="netpg_jindo" id="netpg_jindo" disabled>  
									</td>
									<td colspan="6">&nbsp;</td>
								</tr>
								<tr>
									<th class="text-center bg-grey">문단(구문)</th>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="phrase_count_paragraph[]" id="phrase_paragraph1">  
									</td>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="phrase_count_paragraph[]" id="phrase_paragraph2">  
									</td>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="phrase_count_paragraph[]" id="phrase_paragraph3">  
									</td>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="phrase_count_paragraph[]" id="phrase_paragraph4">  
									</td>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="phrase_count_paragraph[]" id="phrase_paragraph5">  
									</td>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="phrase_count_paragraph[]" id="phrase_paragraph6">  
									</td>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="phrase_count_paragraph[]" id="phrase_paragraph7">  
									</td>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="phrase_count_paragraph[]" id="phrase_paragraph8">  
									</td>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="phrase_count_paragraph[]" id="phrase_paragraph9">  
									</td>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="phrase_count_paragraph[]" id="phrase_paragraph10">  
									</td>
									<td colspan="4">&nbsp;</td>
								</tr>								
								<tr>
									<th class="text-center bg-grey">문단(단어)</th>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="voca_count_paragraph[]" id="voca_paragraph1">  
									</td>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="voca_count_paragraph[]" id="voca_paragraph2">  
									</td>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="voca_count_paragraph[]" id="voca_paragraph3">  
									</td>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="voca_count_paragraph[]" id="voca_paragraph4">  
									</td>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="voca_count_paragraph[]" id="voca_paragraph5">  
									</td>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="voca_count_paragraph[]" id="voca_paragraph6">  
									</td>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="voca_count_paragraph[]" id="voca_paragraph7">  
									</td>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="voca_count_paragraph[]" id="voca_paragraph8">  
									</td>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="voca_count_paragraph[]" id="voca_paragraph9">  
									</td>
									<td class="text-with-form-control">
										<input type="text" class="form-control" name="voca_count_paragraph[]" id="voca_paragraph10">  
									</td>
									<td colspan="4">&nbsp;</td>
								</tr>								
							<tbody id="dataList">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>	
	<div class="row">
		<div class="col-6">
			<div class="panel panel-inverse" data-sortable-id="table-basic-2">
				<div class="panel-heading">
					<h4 class="panel-title">구문 시험문제 목록</h4>
				</div>
				<div class="panel-body">
					<div id="search_area" class="row mb-1">
						<div class="col-12 text-right">
							<button type="button" class="btn btn-sm btn-primary width-60 m-r-2" onclick="add_phrase()">추가</button>
						</div>		
					</div>				
					<div class="table-responsive" style="height:500px;overflow-y:auto;">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:35%;" />
								<col style="width:35%;" />
								<col style="width:10%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center">문단</th>
									<th class="text-center">순번</th>
									<th class="text-center">구문</th>
									<th class="text-center">뜻</th>
									<th class="text-center">관리</th>
								</tr>
							</thead>
							<tbody id="phrase_data_list">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="col-6">
			<div class="panel panel-inverse" data-sortable-id="table-basic-3">
				<div class="panel-heading">
					<h4 class="panel-title">단어 시험문제 목록</h4>
				</div>
				<div class="panel-body">
					<div id="search_area" class="row mb-1">
						<div class="col-12 text-right">
							<button type="button" class="btn btn-sm btn-primary width-60 m-r-2" onclick="add_voca()">추가</button>
						</div>		
					</div>					
					<div class="table-responsive" style="height:500px;overflow-y:auto;">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:35%;" />
								<col style="width:35%;" />
								<col style="width:10%;" />
							</colgroup>

							<thead>
								<tr class="table-active">
									<th class="text-center">문단</th>
									<th class="text-center">순번</th>
									<th class="text-center">단어</th>
									<th class="text-center">뜻</th>
									<th class="text-center">관리</th>
								</tr>
							</thead>
							<tbody id="voca_data_list">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>		
	</div>
</div>

<!-- end #content -->
<script type="text/javascript" src="/ui/exam/passage_form.js"></script>
