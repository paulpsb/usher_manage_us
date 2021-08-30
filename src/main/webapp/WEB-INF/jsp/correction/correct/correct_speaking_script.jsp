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
	    <script type="text/javascript" src="/assets/js/common.js"></script>
	    <script type="text/javascript" src="/ui/correction/correct/correct_speaking_script.js"></script>
	</head>
	<body>
		<input type="hidden" id="section" value="${resultInfo.section}">
		<input type="hidden" id="book" value="${resultInfo.book}">
		<input type="hidden" id="volume" value="${resultInfo.volume}">
		<input type="hidden" id="group" value="${resultInfo.group}">
		<input type="hidden" id="article" value="${resultInfo.article}">
		<div style="padding:5px;">
			<table class="table table-bordered">
				<colgroup>
					<col style="width:50%;" />
					<col style="width:50%;" />
				</colgroup>
				<tbody>
					<tr>
						<th class="text-center bg-danger text-white">Question</th>
						<th class="text-center bg-danger text-white">Sound</th>
					</tr>
					<tr>
						<td>
							<p id="question"></p>
						</td>
						<td rowspan="3">
							<div id="div_sound"></div>
							<p id="sound_script"></p>
						</td>
					</tr>
					<tr>
						<th class="text-center bg-danger text-white">지문</th>
					</tr>
					<tr>
						<td>
							<p id="title" class="text-center"></p>
							<p id="passage"></p>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</body>
</html>