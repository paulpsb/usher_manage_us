<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">학교현황</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area">
		
	</div>
	<div class="row">
		<div class="col-12" style="overflow-x:auto;">
			<table style="width:2000px;">
				<colgroup>
					<col style="width:250px;" />
					<col style="width:250px;" />
					<col style="width:250px;" />
					<col style="width:250px;" />
					<col style="width:250px;" />
					<col style="width:250px;" />
					<col style="width:250px;" />
					<col style="width:250px;" />
				</colgroup>						
				<tbody>
					<tr>
						<td colspan="8">
							<div class="note note-primary">
								<div class="note-content" style="padding:10px;">
									<h4 style="margin-bottom:0px;">학교 별 <span id="school_total_count"></span></h4>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td colspan="8">
							<h5>국내 <span id="school_total_d_count"></span></h5>
						</td>
					</tr>
					<tr>
						<td>
							<table class="table table-bordered m-b-0" style="width:250px;">
								<thead style="float:left; width:250px;">
									<tr>
										<th class="text-center table-info" colspan="2" style="width:250px;">시/도</th>
									</tr>
								</thead>
								<tbody id="domesticArea1" class="bg-white" style="overflow-y:scroll; overflow-x:hidden; float:left; width:250px; height:250px">
								</tbody>
							</table>
						</td>
						<td>
							<table class="table table-bordered m-b-0" style="width:250px;">
								<thead style="float:left; width:250px;">
									<tr>
										<th class="text-center table-info" colspan="2" style="width:250px;">시/군/구</th>
									</tr>
								</thead>
								<tbody id="domesticArea2" class="bg-white" style="overflow-y:scroll; overflow-x:hidden; float:left; width:250px; height:250px">
								</tbody>
							</table>
						</td>
						<td>
							<table class="table table-bordered m-b-0" style="width:250px;">
								<thead style="float:left; width:250px;">
									<tr>
										<th class="text-center table-info" colspan="2" style="width:250px;">초등학교 <span id="domesticSchoolCount1"></span></th>
									</tr>
								</thead>
								<tbody id="domesticSchool1" class="bg-white" style="overflow-y:scroll; overflow-x:hidden; float:left; width:250px; height:250px">
								</tbody>
							</table>
						</td>
						<td>
							<table class="table table-bordered m-b-0" style="width:250px;">
								<thead style="float:left; width:250px;">
									<tr>
										<th class="text-center table-info" colspan="2" style="width:250px;">중학교 <span id="domesticSchoolCount2"></span></th>
									</tr>
								</thead>
								<tbody id="domesticSchool2" class="bg-white" style="overflow-y:scroll; overflow-x:hidden; float:left; width:250px; height:250px">
								</tbody>
							</table>
						</td>
						<td>
							<table class="table table-bordered m-b-0" style="width:250px;">
								<thead style="float:left; width:250px;">
									<tr>
										<th class="text-center table-info" colspan="2" style="width:250px;">고등학교 <span id="domesticSchoolCount3"></span></th>
									</tr>
								</thead>
								<tbody id="domesticSchool3" class="bg-white" style="overflow-y:scroll; overflow-x:hidden; float:left; width:250px; height:250px">
								</tbody>
							</table>
						</td>
						<td>
							<table class="table table-bordered m-b-0" style="width:250px;">
								<thead style="float:left; width:250px;">
									<tr>
										<th class="text-center table-info" colspan="2" style="width:250px;">대학교 <span id="domesticSchoolCount4"></span></th>
									</tr>
								</thead>
								<tbody id="domesticSchool4" class="bg-white" style="overflow-y:scroll; overflow-x:hidden; float:left; width:250px; height:250px">
								</tbody>
							</table>
						</td>
						<td>
							<table class="table table-bordered m-b-0" style="width:250px;">
								<thead style="float:left; width:250px;">
									<tr>
										<th class="text-center table-info" colspan="2" style="width:250px;">대학원 <span id="domesticSchoolCount5"></span></th>
									</tr>
								</thead>
								<tbody id="domesticSchool5" class="bg-white" style="overflow-y:scroll; overflow-x:hidden; float:left; width:250px; height:250px">
								</tbody>
							</table>
						</td>
						<td>
							<table class="table table-bordered m-b-0" style="width:250px;">
								<thead style="float:left; width:250px;">
									<tr>
										<th class="text-center table-info" colspan="2" style="width:250px;">기타/그외 <span id="domesticSchoolCount6"></span></th>
									</tr>
								</thead>
								<tbody id="domesticSchool6" class="bg-white" style="overflow-y:scroll; overflow-x:hidden; float:left; width:250px; height:250px">
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td colspan="8">
							<h5>국외 <span id="school_total_f_count"></span></h5>
						</td>
					</tr>					
					<tr>
						<td>
							<table class="table table-bordered m-b-0" style="width:250px;">
								<thead style="float:left; width:250px;">
									<tr>
										<th class="text-center table-info" colspan="2" style="width:250px;">대륙</th>
									</tr>
								</thead>
								<tbody id="foreginArea1" class="bg-white" style="overflow-y:scroll; overflow-x:hidden; float:left; width:250px; height:250px">
								</tbody>
							</table>
						</td>
						<td>
							<table class="table table-bordered m-b-0" style="width:250px;">
								<thead style="float:left; width:250px;">
									<tr>
										<th class="text-center table-info" colspan="2" style="width:250px;">국가</th>
									</tr>
								</thead>
								<tbody id="foreginArea2" class="bg-white" style="overflow-y:scroll; overflow-x:hidden; float:left; width:250px; height:250px">
								</tbody>
							</table>
						</td>
						<td>
							<table class="table table-bordered m-b-0" style="width:250px;">
								<thead style="float:left; width:250px;">
									<tr>
										<th class="text-center table-info" colspan="2" style="width:250px;">초등학교 <span id="foreginSchoolCount1"></span></th>
									</tr>
								</thead>
								<tbody id="foreginSchool1" class="bg-white" style="overflow-y:scroll; overflow-x:hidden; float:left; width:250px; height:250px">
								</tbody>
							</table>
						</td>
						<td>
							<table class="table table-bordered m-b-0" style="width:250px;">
								<thead style="float:left; width:250px;">
									<tr>
										<th class="text-center table-info" colspan="2" style="width:250px;">중학교 <span id="foreginSchoolCount2"></span></th>
									</tr>
								</thead>
								<tbody id="foreginSchool2" class="bg-white" style="overflow-y:scroll; overflow-x:hidden; float:left; width:250px; height:250px">
								</tbody>
							</table>
						</td>
						<td>
							<table class="table table-bordered m-b-0" style="width:250px;">
								<thead style="float:left; width:250px;">
									<tr>
										<th class="text-center table-info" colspan="2" style="width:250px;">고등학교 <span id="foreginSchoolCount3"></span></th>
									</tr>
								</thead>
								<tbody id="foreginSchool3" class="bg-white" style="overflow-y:scroll; overflow-x:hidden; float:left; width:250px; height:250px">
								</tbody>
							</table>
						</td>
						<td>
							<table class="table table-bordered m-b-0" style="width:250px;">
								<thead style="float:left; width:250px;">
									<tr>
										<th class="text-center table-info" colspan="2" style="width:250px;">대학교 <span id="foreginSchoolCount4"></span></th>
									</tr>
								</thead>
								<tbody id="foreginSchool4" class="bg-white" style="overflow-y:scroll; overflow-x:hidden; float:left; width:250px; height:250px">
								</tbody>
							</table>
						</td>
						<td>
							<table class="table table-bordered m-b-0" style="width:250px;">
								<thead style="float:left; width:250px;">
									<tr>
										<th class="text-center table-info" colspan="2" style="width:250px;">대학원 <span id="foreginSchoolCount5"></span></th>
									</tr>
								</thead>
								<tbody id="foreginSchool5" class="bg-white" style="overflow-y:scroll; overflow-x:hidden; float:left; width:250px; height:250px">
								</tbody>
							</table>
						</td>
						<td>
							<table class="table table-bordered m-b-0" style="width:250px;">
								<thead style="float:left; width:250px;">
									<tr>
										<th class="text-center table-info" colspan="2" style="width:250px;">그외/기타 <span id="foreginSchoolCount6"></span></th>
									</tr>
								</thead>
								<tbody id="foreginSchool6" class="bg-white" style="overflow-y:scroll; overflow-x:hidden; float:left; width:250px; height:250px">
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>	
		</div>
	</div>
</div>

<script type="text/javascript" src="/ui/stats/school.js"></script>