<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">Direction 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area" class="row mb-3">
		<div class="col-2">
			<input type="hidden" id="direction_id" name="direction_id">
			<select class="form-control" id="search_section">
				<option value="READING">Reading</option>
				<option value="GRAMMAR">Grammar</option>
				<option value="LISTENING">Listening</option>
			</select>
		</div>
		<div class="col-10 text-right">
			<button type="button" class="btn btn-primary" onclick="form_search()"><i class="fa fa-search fa-fw"></i> 조회</button>
			<button type="button" class="btn btn-primary" onclick="form_save()"><i class="fa fa-save fa-fw"></i> 저장</button>
		</div>		
	</div>
	<div class="row">
		<div class="col-md-6">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">Direction</h4>
				</div>
				<div class="panel-body">
					<div class="form-group row m-b-15">
						<label class="col-form-label col-md-1 text-right">제목</label>
						<div class="col-md-11">
							<input type="text" class="form-control m-b-5" id="title" name="title"/>
						</div>
					</div>					
					<div class="form-group row m-b-15">
						<div class="col-md-12">
							<textarea class="ckeditor" id="direction" name="direction" rows="30"></textarea>
						</div>
					</div>					
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<div class="panel panel-inverse" data-sortable-id="table-basic-1">
				<div class="panel-heading">
					<h4 class="panel-title">Usher Direction</h4>
				</div>
				<div class="panel-body">
					<div class="form-group row m-b-15">
						<label class="col-form-label col-md-1 text-right">제목</label>
						<div class="col-md-11">
							<input type="text" class="form-control m-b-5" id="usher_title" name="usher_title"/>
						</div>
					</div>					
					<div class="form-group row m-b-15">
						<div class="col-md-12">
							<textarea class="ckeditor" id="usher_direction" name="usher_direction" rows="30"></textarea>
						</div>
					</div>					
				</div>
			</div>
		</div>
	</div>	
</div>
<!-- end #content -->
<script src="/assets/plugins/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="/ui/batch/direction.js"></script>
