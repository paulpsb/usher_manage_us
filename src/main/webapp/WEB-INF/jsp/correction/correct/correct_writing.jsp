<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="euc-kr">
		<title>Writing 첨삭</title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
	    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
		<link rel="stylesheet" href="/common/exam/css/exam.css" />
		<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet" type="text/css">
	    <script src="//code.jquery.com/jquery.min.js"></script>
	    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
	    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
	    <script src="https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js"></script>
	    <script type="text/javascript" src="/assets/js/common.js"></script>
	    <script type="text/javascript" src="/ui/correction/correct/correct_writing.js"></script>
	</head>
	<body class="toefl">
		<input type="hidden" id="correction_exams_answer_id" value="${resultInfo.id}">
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
						<nav role="navigation" aria-label="Top Level Lavigation">
							<ul class="nav">
								<li class="nav-item">
									<button class="btn btn-primary" id="btn_script" onclick="click_script()" style="display:none;">스크립트 보기</button>
									<button class="btn btn-primary" id="btn_rubric" onclick="click_rubric()" style="display:none;">Rubric 등록/수정</button>
									<button class="btn btn-primary" id="btn_comment_twe" onclick="click_comment_twe()" style="display:none;">첨삭 등록/수정</button>
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
				</div>
			</div>
		</div>
		<div class="container-fluid" id="div_container" style="overflow-y:auto;">
			<div class="container">
				<div class="container" style="width:1019px;padding:0px;background:#e7e2e2;color:#000000">
					<p style="margin:0;padding:0;width:100%;padding:10px;background:#a52626;color:#ffffff;" id="writing_question"></p>
					<p style="width:50%;float:left;padding-left:30px;" id="reg_date"></p>
					<p style="width:50%;float:left;padding-right:30px;text-align:right;"  id="writing_exam_time"></p>
					<p style="margin-top:20px;padding:30px;" id="writing_answer"></p>
				</div>	
				<div class="container" style="width:1019px;padding:0px;background:#e7e2e2;color:#000000">
					<p style="margin:0;padding:0;width:100%;padding:10px;background:#a52626;color:#ffffff;"><b>개인첨삭</b></p>
					<p style="width:50%;float:left;padding-left:30px;" id="writing_user_date"></p>
					<p style="width:50%;float:left;padding-right:30px;text-align:right;"  id="writing_user_writer"></p>
					<p style="margin-top:20px;padding:30px;" id="writing_user_data"></p>
				</div>	
				<div class="container" style="width:1019px;padding:0px;background:#e7e2e2;color:#000000">
					<p style="margin:0;padding:0;width:100%;padding:10px;background:#a52626;color:#ffffff;"><b>Rubric</b></p>
					<p style="width:30%;float:left;padding-left:30px;" id="rubric_date"></p>
					<p style="width:40%;float:left;text-align:center;" id="rubric_score"></p>
					<p style="width:30%;float:left;padding-right:30px;text-align:right;"  id="rubric_writer"></p>
					<p style="margin-top:20px;padding:30px;" id="rubric_data"></p>
				</div>	
				<div class="container" style="width:1019px;padding:0px;background:#e7e2e2;color:#000000">
					<p style="margin:0;padding:0;width:100%;padding:10px;background:#a52626;color:#ffffff;"><b>첨삭</b></p>
					<p style="width:50%;float:left;padding-left:30px;" id="writing_comment_date"></p>
					<p style="width:50%;float:left;padding-right:30px;text-align:right;"  id="writing_comment_writer"></p>
					<p style="margin-top:20px;padding:30px;" id="writing_comment_data"></p>
					<p style="margin:0;padding:0;width:100%;padding:10px;background:#a52626;color:#ffffff;display:none;" id="writing_pen_comment_title"><b>총평</b></p>
					<p style="margin-top:20px;padding:30px;display:none;" id="writing_pen_comment_data"></p>
				</div>	
				<div id="div_review">
				
				</div>
				<div id="div_comment">
				
				</div>
				
			</div>
			<div class="container" style="width:1019px;padding:0px;background:#e7e2e2;color:#000000">
				<p style="margin:0;padding:0;width:100%;padding:10px;background:#a52626;color:#ffffff;"><b>오답 노트</b></p>
				<p style="width:50%;float:left;padding-left:30px;" id="writing_note_date"></p>
				<p style="width:50%;float:left;padding-right:30px;text-align:right;"  id="writing_note_writer"></p>
				<p style="margin-top:20px;padding:30px;" id="writing_note_data"></p>
			</div>	
		</div>
	</body>
</html>