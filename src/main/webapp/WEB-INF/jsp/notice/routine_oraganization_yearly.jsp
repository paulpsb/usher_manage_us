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
			<input type="radio" class="css-input-radio-checkbox" name="search_routine_category" id="search_routine_category_2" value="MONTHLY">
			<label class="css-input-radio-checkbox-label" for="search_routine_category_2" style="padding:5px;">Monthly</label>
		</div>
		<div class="col-2">
			<input type="radio" class="css-input-radio-checkbox" name="search_routine_category" id="search_routine_category_3" value="YEARLY" checked>
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
						루틴 설정 Yearly
					</h4>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col-10">
							<div id="search_area">
								<div class="row"  id="search_schedule">
									<div class="col-1">
										<input type="radio" class="css-input-radio-checkbox" name="search_routine_month" id="search_routine_month_01" value="01" checked>
										<label class="css-input-radio-checkbox-label" for="search_routine_month_01" style="padding:5px;">1월</label>
									</div>
									<div class="col-1">
										<input type="radio" class="css-input-radio-checkbox" name="search_routine_month" id="search_routine_month_02" value="02">
										<label class="css-input-radio-checkbox-label" for="search_routine_month_02" style="padding:5px;">2월</label>
									</div>
									<div class="col-1">
										<input type="radio" class="css-input-radio-checkbox" name="search_routine_month" id="search_routine_month_03" value="03">
										<label class="css-input-radio-checkbox-label" for="search_routine_month_03" style="padding:5px;">3월</label>
									</div>
									<div class="col-1">
										<input type="radio" class="css-input-radio-checkbox" name="search_routine_month" id="search_routine_month_04" value="04">
										<label class="css-input-radio-checkbox-label" for="search_routine_month_04" style="padding:5px;">4월</label>
									</div>
									<div class="col-1">
										<input type="radio" class="css-input-radio-checkbox" name="search_routine_month" id="search_routine_month_05" value="05">
										<label class="css-input-radio-checkbox-label" for="search_routine_month_05" style="padding:5px;">5월</label>
									</div>
									<div class="col-1">
										<input type="radio" class="css-input-radio-checkbox" name="search_routine_month" id="search_routine_month_06" value="06">
										<label class="css-input-radio-checkbox-label" for="search_routine_month_06" style="padding:5px;">6월</label>
									</div>
									<div class="col-1">
										<input type="radio" class="css-input-radio-checkbox" name="search_routine_month" id="search_routine_month_07" value="07">
										<label class="css-input-radio-checkbox-label" for="search_routine_month_07" style="padding:5px;">7월</label>
									</div>
									<div class="col-1">
										<input type="radio" class="css-input-radio-checkbox" name="search_routine_month" id="search_routine_month_08" value="08">
										<label class="css-input-radio-checkbox-label" for="search_routine_month_08" style="padding:5px;">8월</label>
									</div>
									<div class="col-1">
										<input type="radio" class="css-input-radio-checkbox" name="search_routine_month" id="search_routine_month_09" value="09">
										<label class="css-input-radio-checkbox-label" for="search_routine_month_09" style="padding:5px;">9월</label>
									</div>
									<div class="col-1">
										<input type="radio" class="css-input-radio-checkbox" name="search_routine_month" id="search_routine_month_10" value="10">
										<label class="css-input-radio-checkbox-label" for="search_routine_month_10" style="padding:5px;">10월</label>
									</div>
									<div class="col-1">
										<input type="radio" class="css-input-radio-checkbox" name="search_routine_month" id="search_routine_month_11" value="11">
										<label class="css-input-radio-checkbox-label" for="search_routine_month_11" style="padding:5px;">11월</label>
									</div>
									<div class="col-1">
										<input type="radio" class="css-input-radio-checkbox" name="search_routine_month" id="search_routine_month_12" value="12">
										<label class="css-input-radio-checkbox-label" for="search_routine_month_12" style="padding:5px;">12월</label>
									</div>
								</div>
							</div>
							<div class="table-responsive">
								<table class="table table-bordered m-b-0" id="dailyTableList">
									<colgroup>
										<col style="width:calc(100/7%);" />
										<col style="width:calc(100/7%);" />
										<col style="width:calc(100/7%);" />
										<col style="width:calc(100/7%);" />
										<col style="width:calc(100/7%);" />
										<col style="width:calc(100/7%);" />
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
<!-- end #content -->
<script type="text/javascript" src="/ui/notice/routine_oraganization_yearly.js"></script>


