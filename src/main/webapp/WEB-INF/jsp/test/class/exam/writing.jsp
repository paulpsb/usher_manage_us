<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="euc-kr">
		<title>Writing 모의고사</title>
		<link rel="stylesheet" href="/assets/exam/css/bootstrap.min.css">
	    <link rel="stylesheet" href="/assets/exam/css/jquery-ui.min.css">
		<link rel="stylesheet" href="/assets/exam/css/exam.css" />
		<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet" type="text/css">
		
	    <script type="text/javascript" src="/assets/exam/js/jquery.min.js"></script>
	    <script type="text/javascript" src="/assets/exam/js/jquery-ui.min.js"></script>
	    <script type="text/javascript" src="/assets/exam/js/popper.min.js"></script>		
	    <script type="text/javascript" src="/assets/exam/js/bootstrap.min.js"></script>
	    <script src="https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js"></script>
	    <script type="text/javascript" src="/assets/exam/js/common.js"></script>
	    <script type="text/javascript" src="/ui/test/class/exam/writing.js"></script>
	</head>
	<body class="toefl">
		<input type="hidden" id="practice_problem_id" value="${writingExamInfo.id}">	
		<div class="container-fluid header-bar">
			<div class="container ">
				<header>
					<div class="navbar navbar-ipt navbar-default">
						<div class="navbar-header">
							<div class="">
								<div class="logos">
									<div class="logo">
										<img src="/common/exam/images/logo.png" style="height:35px;">
									</div>
								</div>
							</div>
						</div>
						<p id="toplabel" style="font-size:14px; user-select:none; -ms-user-select:none; -moz-user-select:none; color:rgb(0,0,0);text-align:center; position:relative; left:-20px; top:14px; width:281px; height:18px; line-height:1.5; z-index:1">
							<b><span id="writing_label"></span></b>
						</p>
						<nav role="navigation" aria-label="Top Level Lavigation">
							<ul class="nav">
								<li class="nav-item">
									<button class="btn btn-primary" id="btn_continue" onclick="click_continue()" style="display:none;">Continue</button>
									<button class="btn btn-primary" id="btn_next" onclick="click_next()" style="display:none;">Next</button>
								</li>
							</ul>
						</nav>
					</div>
				</header>
			</div>
		</div>	
		<div class="brand-bar"></div>
		<div class="container-fluid toolbar">
			<div class="container">
				<div class="row container-ipt" id="secondlevelnav" role="navigation" aria-label="Second Level Navigation">
					<div>
						
					</div>
				</div>
			</div>
		</div>
		<div class="container-fluid">
			<div id="direction" class="container" style="display:none;width:1019px;height:678px;border:1px solid #000;overflow-x:hidden;overflow-y:auto;">
				<h1 style="text-align:center;font-size:27px;">${directionInfo.title}</h1>
				<div style="width:900px;margin-left:50px;margin-right:50px;font-size:16px;">
					${directionInfo.direction}
				</div>
				<h1 style="text-align:center;font-size:27px;margin-top:20px;">${directionInfo.usher_title}</h1>
				<div style="width:900px;margin-left:50px;margin-right:50px;font-size:16px;">
					${directionInfo.usher_direction}
				</div>				
			</div>
			<div id="content" class="container" style="width:1019px;height:678px;border:1px solid #000;padding:0;">

			</div>		
		</div>
	</body>
</html>