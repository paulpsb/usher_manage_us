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
<input type="hidden" id="routine_organization_id" value="${routineInfo.routine_organization_id}">
<input type="hidden" id="routine_organization_name" value="${routineInfo.routine_organization_name}">
<input type="hidden" id="routine_category" value="${routineInfo.routine_category}">
<input type="hidden" id="routine_schedule" value="${routineInfo.routine_schedule}">
<input type="hidden" id="routine_day" value="${routineInfo.routine_day}">
<!-- begin #content -->
<div id="content" class="content">
	<div class="row" id="search_area">
		<div class="col-2">
			<h1 class="page-header">루틴 설정(조직도)</h1>
		</div>
		<div class="col-2">
			<input type="radio" class="css-input-radio-checkbox" name="search_routine_category" id="search_routine_category_1" value="DAILY">
			<label class="css-input-radio-checkbox-label" for="search_routine_category_1" style="padding:5px;">Daily</label>
		</div>
		<div class="col-2">
			<input type="radio" class="css-input-radio-checkbox" name="search_routine_category" id="search_routine_category_2" value="MONTHLY" checked>
			<label class="css-input-radio-checkbox-label" for="search_routine_category_2" style="padding:5px;">Monthly</label>
		</div>
		<div class="col-2">
			<input type="radio" class="css-input-radio-checkbox" name="search_routine_category" id="search_routine_category_3" value="YEARLY">
			<label class="css-input-radio-checkbox-label" for="search_routine_category_3" style="padding:5px;">Yearly</label>
		</div>
		<div class="col-3 text-right">
			<h4>
				<span id="select_oraganization_name"></span>
				<button type="button" class="btn btn-white" onclick="showOraganization('Y');">조직 변경</button>
			</h4>
		</div>
		<div class="col-1">
			<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">
						루틴 설정 Monthly
					</h4>
				</div>
				<div class="panel-body">
					<div id="search_area">
						<div class="row"  id="search_schedule">
						</div>
					</div>
					<div class="row">
						<div class="col-10">
							<div class="table-responsive">
								<table class="table table-bordered m-b-0" id="dailyTableList">
									<colgroup>
										<col style="width:20%;" />
										<col style="width:20%;" />
										<col style="width:20%;" />
										<col style="width:20%;" />
										<col style="width:20%;" />
									</colgroup>
									<tbody id="daily_list">
									</tbody>
								</table>
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
												<th class="text-center bg-black-transparent-5 text-white">Routine</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<div class="row" style="margin:0px"  id="routine_list">
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
				<a id="btn_cancel_organization" href="javascript:form_oraganization_cancel();" class="btn btn-white" style="display:none;">취소</a>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modal-routin-schedule">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="title_routine_file">스케쥴 일자 등록</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<div class="row mb-3">
					<div class="col-4">
						<input type="text" class="form-control" name="add_routine_schedule" id="add_routine_schedule">  
					</div>	
					<div class="col-8">
						일자를 입력하세요.
					</div>	
				</div>			
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
				<a href="javascript:save_schedule();" class="btn btn-success">등록</a>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/notice/routine_oraganization_monthly.js"></script>


