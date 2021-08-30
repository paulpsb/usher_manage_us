<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="euc-kr">
	<title>Writing 질문</title>
    <link rel="stylesheet" href="/common/exam/css/gh-buttons.css" />
    <script src="//code.jquery.com/jquery.min.js"></script>
	<script type="text/javascript" src="/common/exam/ckeditor/ckeditor.js"></script></head>
	<script type="text/javascript" src="/ui/correction/correct/correct_writing_comment.js"></script>
<body>
	<input type="hidden" id="correction_exams_comment_id" value="${commentInfo.id}">
	<div id="wrap1">
		<div style="max-height:250px;overflow-y:auto;border:1px solid #fff;">
			<p style="margin:0;padding:0;padding:10px;background:#a52626;color:#ffffff;"><b>질문 </b></p>
			<p style="width:100%;text-align:right;"><b>작성일 : </b>${commentInfo.date}</p>
			<div style="width:95%;padding:10px;">${commentInfo.question}</div>
			
		</div>
		<div align="center">
			<p style="margin:0;padding:0;padding:10px;background:#a52626;color:#ffffff;"><b>답변 </b></p>
			<textarea cols="100" id="writing_editor1" name="writing_editor1" rows="35" style="width:100%;height:550px;">${commentInfo.comment}</textarea>
		</div>
		
		<div align="center" style="margin-top:5px;">
			<input name="Submit" type="button" value="완료" onclick="saveComment()" />
		</div>
	</div>
</body>
</html>