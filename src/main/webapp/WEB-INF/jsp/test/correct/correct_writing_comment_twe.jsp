<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="euc-kr">
	<title>Writing 첨삭</title>
    <link rel="stylesheet" href="/common/exam/css/gh-buttons.css" />
    <script src="//code.jquery.com/jquery.min.js"></script>
	<script type="text/javascript" src="/common/exam/ckeditor/ckeditor.js"></script></head>
	<script type="text/javascript" src="/ui/test/correct/correct_writing_comment_twe.js"></script>
	<style type="text/css">
		.notice {
			font-size: 12px;
			position:relative;
		}
		.correct_btn li {
			float:left;
			width:80px;
			text-align:center;
			margin-left:15px;
			margin-bottom:10px;
			
		}
		.pattern {
			width:100%;
			min-height:35px;
			margin:auto;
			overflow:auto;
			overflow-x:hidden;
			
		}
		.correct_btn {
			width:100%;
			position:relative;
		}
	</style>	
<body>
	<input type="hidden" id="practice_result_id" value="${resultInfo.id}">
	<div id="wrap1">
		<div class="notice" id="head"> Drag(Select text range) -&gt; Press &quot;Ctrl&quot; key</div>
		<div class="pattern">
		    <ul class="correct_btn">
		        <li id="correct_0" class="button" onclick="correct(0)">0:템플릿 오류</li>
		        <li id="correct_1" class="button" onclick="correct(1)">1:이해불가</li>
		        <li id="correct_2" class="button" onclick="correct(2)">2:오타</li>
		        <li id="correct_3" class="button" onclick="correct(3)">3:접속사 오류</li>
		        <li id="correct_4" class="button" onclick="correct(4)">4:동사 오류</li>
		        <li id="correct_5" class="button" onclick="correct(5)">5:명사 오류</li>
		        <li id="correct_6" class="button" onclick="correct(6)">6:구문오류</li>
		        <li id="correct_7" class="button" onclick="correct(7)">7:분사</li>
		        <li id="correct_8" class="button" onclick="correct(8)">8:관사 오류</li>
		        <li id="correct_9" class="button" onclick="correct(9)">9:뉘앙스 오류</li>
		        <li id="correct_10" class="button" onclick="correct(10)">10:논리 오류</li>
		    </ul>
		</div><!--pattern-->
		<br>
		<div align="center">
			<textarea cols="100" id="writing_editor1" name="writing_editor1" rows="35" style="width:100%;height:550px;">${commentInfo.comment}</textarea>
		</div>
		<div align="center" style="margin-top:5px;">
			<input name="Submit" type="button" value="완료" onclick="savePen()" />
		</div>
	</div>
</body>
</html>