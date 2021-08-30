<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="euc-kr">
	<title>Speaking 첨삭</title>
	<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
	<script type="text/javascript" src="/ui/test/correct/correct_speaking_comment_twe.js"></script>
	<script src="https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js"></script>
	<style type="text/css">
		.pattern {
			width:100%;
			min-height:35px;
			margin:auto;
			overflow:auto;
			overflow-x:hidden;
			text-align:center;
			
		}
	</style>	
<body>
	<input type="hidden" id="practice_result_id" value="${resultInfo.id}">
	<div id="wrap1">
		<div class="pattern">
	        <button id="btn_record" onclick="btn_record_click();" style="width:120px;padding:1em 1em;font-size:20px;">Record</button>
	        <button id="btn_pause" onclick="btn_pause_click()" style="width:120px;padding:1em 1em;font-size:20px;" disabled>Pause</button>
	        <button id="btn_stop" onclick="btn_stop_click()" style="width:120px;padding:1em 1em;font-size:20px;">Stop</button>
		</div><!--pattern-->
		<div id="div_result" style="width:86%;text-align:center;background-color:#000;color:#fff;padding:1em;margin:1em;">
			PRESS RECORD BUTTON TO START CORRECTION
		</div>
		<div id="div_progressbar" style="width:80%;height:10px;border:1px solid #000;margin:auto;"></div>
		<div id="speaking_time" style="width:100%;text-align:center">00:00 / 00:00</div>
	</div>
</body>
</html>