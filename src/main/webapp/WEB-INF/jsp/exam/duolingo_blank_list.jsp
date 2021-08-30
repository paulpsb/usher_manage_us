<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">듀오링고 빈칸시험 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<input type="hidden" name="v_section" id="v_section" value="${blankInfo.section}">
	<input type="hidden" name="v_book" id="v_book" value="${blankInfo.book}">
	<input type="hidden" name="v_volume" id="v_volume" value="${blankInfo.volume}">
	<input type="hidden" name="v_group" id="v_group" value="${blankInfo.group}">
	<input type="hidden" name="v_article" id="v_article" value="${blankInfo.article}">
	<div id="search_area" class="row mb-3">
		<div class="col-2">
			<select class="form-control" id="search_book">
				<option value="BLANK">BLANK</option>
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
					<h4 class="panel-title">듀오링고 빈칸시험 목록</h4>
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
<!-- end #content -->
<script type="text/javascript" src="/ui/exam/duolingo_blank_list.js"></script>
