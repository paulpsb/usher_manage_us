<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">지문 관리</h1>
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
					<h4 class="panel-title">지문 목록</h4>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:8%;" />
								<col style="width:8%;" />
								<col style="width:8%;" />
								<col style="width:8%;" />
								<col style="width:8%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:5%;" />
								<col style="width:25%;" />
								<col style="width:5%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center" rowspan="2">section</th>
									<th class="text-center" rowspan="2">book</th>
									<th class="text-center" rowspan="2">volume</th>
									<th class="text-center" rowspan="2">group</th>
									<th class="text-center" rowspan="2">article</th>
									<th class="text-center" colspan="6">점수</th>
									<th class="text-center" rowspan="2">제목</th>
									<th class="text-center" rowspan="2">관리</th>
								</tr>
								<tr class="table-active">
									<th class="text-center">VOCA</th>
									<th class="text-center">백지</th>
									<th class="text-center">묶기</th>
									<th class="text-center">구문</th>
									<th class="text-center">단어</th>
									<th class="text-center">총</th>
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
<div class="modal fade" id="modal-problem">
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
							<col style="width:10%;" />
							<col style="width:15%;" />
							<col style="width:15%;" />
							<col style="width:15%;" />
							<col style="width:15%;" />
							<col style="width:15%;" />
							<col style="width:15%;" />
						</colgroup>	
						<tbody id="data_list">	
							<tr>
								<th class="text-center bg-grey" colspan="2">section</th>
								<td class="text-with-form-control" colspan="5">
									<input type="hidden" name="flag" id="flag"> 
									<input type="hidden" name="problem_id" id="problem_id">
									<select class="form-control" name="section" id="section">
									</select> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey" colspan="2">book</th>
								<td class="text-with-form-control" colspan="5">
									<select class="form-control" name="book" id="book"> 
									</select>
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey" colspan="2">volume</th>
								<td class="text-with-form-control" colspan="5">
									<select class="form-control" name="volume" id="volume">
									</select> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey" colspan="2">group</th>
								<td class="text-with-form-control" colspan="5">
									<select class="form-control" name="group" id="group">
									</select> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey" colspan="2">article</th>
								<td class="text-with-form-control" colspan="5">
									<input type="text" class="form-control" name="article" id="article"> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey" rowspan="2">점수</th>
								<th class="text-center bg-grey">VOCA</th>
								<th class="text-center bg-grey">백지</th>
								<th class="text-center bg-grey">묶기</th>
								<th class="text-center bg-grey">구문</th>
								<th class="text-center bg-grey">단어</th>
								<th class="text-center bg-grey">총</th>
							</tr>
							<tr>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="total_score_voca" id="total_score_voca"> 
								</td>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="total_score_blueprint" id="total_score_blueprint"> 
								</td>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="total_score_grammar_syntax" id="total_score_grammar_syntax"> 
								</td>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="total_score_passage_phrase" id="total_score_passage_phrase"> 
								</td>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="total_score_passage_voca" id="total_score_passage_voca"> 
								</td>
								<td class="text-with-form-control">
									<input type="text" class="form-control" name="total_score" id="total_score"> 
								</td>
							</tr>			
							<tr>
								<th class="text-center bg-grey" colspan="2">제목</th>
								<td class="text-with-form-control" colspan="5">
									<input type="text" class="form-control" name="short_title" id="short_title"> 
								</td>
							</tr>							
							<tr>
								<th class="text-center bg-grey" colspan="2">외부 사용</th>
								<td class="text-with-form-control" colspan="5">
									<select class="form-control" name="correction_yn" id="correction_yn">
										<option value="Y">사용</option>
										<option value="N">미사용</option>
									</select>  
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
<script type="text/javascript" src="/ui/subject/problem.js"></script>
