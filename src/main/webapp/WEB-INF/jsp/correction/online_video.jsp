<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">지문별 인강 관리</h1>
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
			
	</div>
	<div class="row">
		<div class="col-6">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">지문 목록</h4>
				</div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:18%;" />
								<col style="width:18%;" />
								<col style="width:18%;" />
								<col style="width:18%;" />
								<col style="width:18%;" />
								<col style="width:10%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center">section</th>
									<th class="text-center">book</th>
									<th class="text-center">volume</th>
									<th class="text-center">group</th>
									<th class="text-center">article</th>
									<th class="text-center">&nbsp;</th>
								</tr>
							</thead>
							<tbody id="dataList">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="col-6">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">지문별 인강 목록</h4>
				</div>
				<div class="panel-body">
					<div class="row mb-3">
						<div class="col-12 text-right">
							<button type="button" class="btn btn-sm btn-primary width-60 m-r-2" onclick="form_add()">추가</button>
							<button type="button" class="btn btn-sm btn-primary width-60 m-r-2" onclick="form_save()">저장</button>
						</div>	
					</div>
					<div class="table-responsive">
						<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">
							<colgroup>
								<col style="width:55%;" />
								<col style="width:15%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
								<col style="width:10%;" />
							</colgroup>
							<thead>
								<tr class="table-active">
									<th class="text-center">제목</th>
									<th class="text-center">인강ID</th>
									<th class="text-center">시간</th>
									<th class="text-center">Sort</th>
									<th class="text-center">&nbsp;</th>
								</tr>
							</thead>
							<tbody id="videoList">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script type="text/javascript" src="/ui/correction/online_video.js"></script>
