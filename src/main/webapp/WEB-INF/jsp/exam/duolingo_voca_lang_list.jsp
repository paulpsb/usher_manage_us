<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">듀오링고 단어 언어 관리</h1>
	<hr />
	<!-- end page-header -->

	<div id="search_area" class="row mb-3">
		<div class="col-10 text-right">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
			<button type="button" class="btn btn-primary" onclick="form_add()"><i class="fa fa-plus fa-fw"></i> Add</button>
			<button type="button" class="btn btn-primary" onclick="form_save()"><i class="fa fa-save fa-fw"></i> Save</button>
		</div>
	</div>
	<div class="row">
		<div class="offset-2 col-8">
			<div class="panel panel-inverse" data-sortable-id="table-basic-11">
				<div class="panel-heading">
					<h4 class="panel-title">듀오링고 단어 언어  목록</h4>
					<div class="panel-heading-btn">
						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
					</div>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:10%;" />
								<col style="width:25%;" />
								<col style="width:30%;" />
								<col style="width:25%;" />
								<col style="width:10%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center">&nbsp;</th>
									<th class="text-center">언어코드</th>
									<th class="text-center">언어명</th>
									<th class="text-center">번역 언어코드</th>
									<th class="text-center">&nbsp;</th>
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
<script type="text/javascript" src="/ui/exam/duolingo_voca_lang_list.js"></script>
