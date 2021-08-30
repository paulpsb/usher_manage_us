<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
		<link href="/assets/plugins/gritter/css/jquery.gritter.css" rel="stylesheet" />
		<!-- ================== END PAGE LEVEL STYLE ================== -->		
	</head>
	<body>
		<!-- begin #page-loader -->
		<div id="page-loader" class="fade show">
			<span class="spinner"></span>
		</div>
		<!-- begin #page-container -->
		<div id="page-container" class="page-container fade page-without-sidebar page-header-fixed page-with-top-menu">
			<!-- begin #header -->
			<div id="header" class="header navbar-default">
				<!-- begin navbar-header -->
				<div class="navbar-header">
					<a href="/main/dashboard_teacher.do" class="navbar-brand"><span class="navbar-logo"><i class="ion-ios-cloud"></i></span> <b class="mr-1">Usher</b> Institute</a>
					<button type="button" class="navbar-toggle" data-click="top-menu-toggled">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
				</div>
				<!-- end navbar-header --><!-- begin header-nav -->
				<ul class="navbar-nav navbar-right">
					<li class="navbar-form">
						<div class="form-group">
							<input id="search_student_name_school" type="text" class="form-control" placeholder="Enter Student and School" value="${searchInfo.student_name}">
							<button type="button" class="btn btn-search" onClick="cfmSearchStudentSchool()"><i class="ion-ios-search"></i></button>
						</div>
					</li>
					<li class="dropdown navbar-user">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<img src="../assets/img/user/user-13.jpg" alt="" /> 
							<span class="d-none d-md-inline">${userInfo.last_name}${userInfo.first_name}</span> <b class="caret"></b>
						</a>
						<div class="dropdown-menu dropdown-menu-right">
							<c:if test="${userInfo.group_id == 3 or userInfo.group_id == 4}">
								<a href="/main/dashboard_teacher.do?user_id=${userInfo.user_id}" class="dropdown-item">강사홈</a>
							</c:if>
							<a href="javascript:cfmLogout();" class="dropdown-item">Log Out</a>
						</div>
					</li>
				</ul>
				<!-- end header-nav -->
			</div>
			<!-- end #header -->
			<tiles:insertAttribute name="header" />	
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
<script src="/assets/plugins/gritter/js/jquery.gritter.js"></script>
<script src="/assets/plugins/chart.js/dist/Chart.min.js"></script>
	
</body>
</html>