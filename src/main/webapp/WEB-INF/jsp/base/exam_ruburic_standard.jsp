<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">첨삭 루브릭 채점기준 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<div class="form-group row">
		<div class="col-11 text-right">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> 조회</button>
			<button type="button" class="btn btn-primary" onclick="form_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
		</div>		
	</div>
	<div class="form-group row">
		<div class="offset-1 col-4">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">첨삭 루브릭 목록</h4>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:35%;" />
								<col style="width:35%;" />
								<col style="width:30%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center">section</th>
									<th class="text-center">교재</th>
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
		<div class="col-6">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">첨삭 루브릭 채점기준</h4>
				</div>
				<div class="panel-body">
					<div class="form-group row m-b-15">
						<div class="col-12">
							<div class="table-responsive">
								<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
									<colgroup>
										<col style="width:20%;" />
										<col style="width:30%;" />
										<col style="width:20%;" />
										<col style="width:30%;" />
									</colgroup>
									<thead>
										<tr>
											<th class="text-center table-info">section</th>
											<td id="div_section"></td>
											<th class="text-center table-info">Book</th>
											<td id="div_book"></td>
										</tr>
									</thead>
								</table>
							</div>					
						</div>
					</div>
					<div class="form-group row m-b-15">
						<div class="col-12">
							<textarea class="ckeditor" id="ruburic_standard" name="ruburic_standard" rows="30"></textarea>
						</div>
					</div>					
				</div>
			</div>
		</div>
	</div>	
</div>
<!-- end #content -->
<script src="/assets/plugins/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="/ui/base/exam_ruburic_standard.js"></script>
