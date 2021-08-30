<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
.section-drag {
	cursor: move;
	
	z-index: 995;
	text-align: center;
	filter: alpha(opacity=70);
	line-height: 20px;
	width:100%;
	border: 1px solid #555;
	border-radius: 3px;
	-moz-border-radius: 3px; /* FF */
	
}

.section-drop {
	margin: auto;
	z-index: 10;
	text-align: center;
	filter: alpha(opacity=70);
	line-height: 20px;
	width:100%;
	border: 1px solid #555;
	border-radius: 3px;
	-moz-border-radius: 3px; /* FF */
}

</style>
<!-- begin #content -->
<div id="content" class="content">
	<div class="row" id="search_area">
		<div class="col-2">
			<h1 class="page-header">TASK 설정<span class="text-danger">(동선)</span></h1>
		</div>
		<div class="col-2">
			<input type="radio" class="css-input-radio-checkbox" name="search_group" id="search_group_1" value="MANAGER" checked>
			<label class="css-input-radio-checkbox-label" for="search_group_1" style="padding:5px;">매니저</label>
		</div>
		<div class="col-2">
			<input type="radio" class="css-input-radio-checkbox" name="search_group" id="search_group_2" value="INSTRUCTOR">
			<label class="css-input-radio-checkbox-label" for="search_group_2" style="padding:5px;">강사</label>
		</div>
		<div class="col-2">
			<input type="radio" class="css-input-radio-checkbox" name="search_group" id="search_group_3" value="ORGANIZATION">
			<label class="css-input-radio-checkbox-label" for="search_group_3" style="padding:5px;">조직도</label>
		</div>
		<div class="col-3 text-right">
			<h4 id="search_organization" style="display:none">
				<span id="search_organization_name"></span>
				<button type="button" class="btn btn-white" onclick="showOrganization();">조직도 변경</button>
			</h4>
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="search_form()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">
						TASK 설정
					</h4>
				</div>
				<div class="panel-body">
					<div class="row mb-3">
						<div class="offset-3 col-2 text-right">
							<button type="button" class="btn btn-default" onclick="date_prev()"><</button>
						</div>
						<div class="col-2" >
							<input type="text" id="select_date_text" class="form-control text-center" readonly>
						</div>
						<div class="col-5">
							<button id="btn_next" type="button" class="btn btn-default" onclick="date_next()" disabled>></button>
							<div class="input-group date" id="datepicker-disabled-past" data-date-format="yyyy-dd-mm" data-date-end-date="Date.default" style="width:auto;display:inline-block;">
								<input id="search_date" type="hidden" placeholder="Select Date" />
								<button type="button" class="btn btn-default"><i class="fa fa-calendar"></i></button>
							</div>					
						</div>
					</div>
					<div class="row">
						<div class="col-10">
							<div class="table-responsive" id="task_table">
							</div>
						</div>
						<div class="col-2">
							<div class="row mb-3">
								<div class="col-12">
									<table class="table table-bordered m-b-0">
										<colgroup>
											<col style="width:100%;" />
										</colgroup>
										<thead>
											<tr>
												<th class="text-center bg-black-transparent-5 text-white">TASK</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<div class="row" style="margin:0px"  id="task_list">
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>		
		</div>
	</div>
</div>
<div class="modal fade" id="select_oraganization">
	<div class="modal-dialog" style="min-width:1650px;">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">조직도 선택</h4>
			</div>
			<div class="modal-body">
				<div class="form-group row mb-2">
					<div class="col-12" id="organization_list">
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<a id="btn_cancel_organization" href="javascript:form_oraganization_cancel();" class="btn btn-white">취소</a>
			</div>
		</div>
	</div>
</div>

<script>
	$('#datepicker-disabled-past').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	}).on("changeDate", function(e) {
		change_date();
		search_form();
	});
</script>
<!-- end #content -->
<script type="text/javascript" src="/ui/notice/task.js"></script>


