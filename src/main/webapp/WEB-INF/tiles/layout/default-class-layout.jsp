<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Usher Manage</title>
		<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
		<meta content="" name="description" />
		<meta content="" name="author" />
		
		<!-- ================== BEGIN BASE CSS STYLE ================== -->
		<link href="/assets/css/apple/app.min.css" rel="stylesheet" />
		<link href="/assets/css/apple/default.css" rel="stylesheet" />
		<link href="/assets/plugins/ionicons/css/ionicons.min.css" rel="stylesheet" />
		<!-- ================== END BASE CSS STYLE ================== -->
		
		<link href="/assets/plugins/bootstrap-datepicker/dist/css/bootstrap-datepicker.css" rel="stylesheet" />
		<link href="/assets/plugins/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css" rel="stylesheet" />
		<link href="/assets/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css" rel="stylesheet">			
		<!-- ================== BEGIN PAGE LEVEL STYLE ================== -->
	    <script src="//code.jquery.com/jquery.min.js"></script>
	    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
		<script src="/assets/plugins/bootstrap-datepicker/dist/js/bootstrap-datepicker.js"></script>
		
		<link href="/assets/plugins/datatables.net-bs4/css/dataTables.bootstrap4.min.css" rel="stylesheet" />
		<link href="/assets/plugins/datatables.net-fixedcolumns-bs4/css/fixedColumns.bootstrap4.css" rel="stylesheet" />
		
		<link href="/assets/plugins/fullcalendar/dist/fullcalendar.print.css" rel="stylesheet" media='print' />
		<link href="/assets/plugins/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
		<!-- ================== END PAGE LEVEL STYLE ================== -->		
		
		<link rel="stylesheet" type="text/css" href="/common/api/css/style.css">
		<link href="/common/api/css/voca_test.css" media="all" rel="stylesheet" />
		<link href="/common/api/css/chain_style.css" media="all" rel="stylesheet" />
		
	</head>
	<body style="overflow-y:auto;overflow-x:hidden;background-color:#fff;">
		<!-- begin #page-loader -->
		<div id="page-loader" class="fade show">
			<span class="spinner"></span>
		</div>
		<!-- begin #page-container -->
		<div id="page-container" class="page-container fade">
			<tiles:insertAttribute name="content" />
		</div>
		<!-- end page container -->	
		
		<script src="/assets/js/common.js"></script>
		<script src="/assets/js/constants.js"></script>
		
	<!-- ================== BEGIN BASE JS ================== -->
	<script src="/assets/js/app.min.js"></script>
	<script src="/assets/js/theme/apple.min.js"></script>
	<!-- ================== END BASE JS ================== -->
	
<!-- ================== BEGIN PAGE LEVEL JS ================== -->
<script src="/assets/plugins/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="/assets/plugins/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
<script src="/assets/plugins/datatables.net-fixedcolumns/js/dataTables.fixedColumns.js"></script>
<script src="/assets/plugins/datatables.net-fixedcolumns-bs4/js/fixedColumns.bootstrap4.js"></script>
	
	<!-- ================== BEGIN PAGE LEVEL JS ================== -->
	<script src="/assets/plugins/moment/min/moment.min.js"></script>
	<script src="/assets/plugins/fullcalendar/dist/fullcalendar.min.js"></script>
	<!-- ================== END PAGE LEVEL JS ================== -->
	<script src="/assets/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js"></script>
	<script src="/assets/plugins/sweetalert/dist/sweetalert.min.js"></script>	
	<script type="text/javascript" src="/common/api/js/chain_line.js"></script>
<script type="text/javascript" src="/common/api/js/diff_match_patch.js"></script>
<script type="text/javascript" src="/common/api/js/chain_text_diff.js"></script>

	
	</body>
</html>