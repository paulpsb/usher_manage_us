<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>Usher Institute</title>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<!-- <link href="/images/common/title.ico" type="image/x-icon" rel="shortcut icon" /> -->
<!--<link href="/common/api/css/common.css" type="text/css" rel="stylesheet" />-->
<link href="/common/api/css/jquery-ui.min.css" type="text/css" rel="stylesheet" />
<link href="/common/api/css/common.css" type="text/css" rel="stylesheet" />
<link href="/common/api/css/voca_test.css" type="text/css" rel="stylesheet" />
<link href="/common/api/css/jplayer.blue.monday.min.css" type="text/css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="/common/api/css/style.css">
<link rel="stylesheet" type="text/css" href="/common/api/css/reset.css">
<link rel="stylesheet" type="text/css" href="/common/api/css/question_popup.css">
<link href="/common/api/css/voca_test.css" media="all" rel="stylesheet" />
<link href="/common/api/css/chain_style.css" media="all" rel="stylesheet" />

<style>
.ud{text-decoration: underline;}
</style>
<script type="text/javascript" src="/common/api/js/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="/common/api/js/jquery-ui.min.js"></script>
<script type="text/javascript" src="/common/api/js/jquery-migrate-1.2.1.js"></script>

<script type="text/javascript" src="/common/api/js/jquery.plugin.js"></script>
<script type="text/javascript" src="/common/api/js/jquery.countdown.js"></script>
<script type="text/javascript" src="/common/api/js/jquery.selection.js"></script>
<script type="text/javascript" src="/common/api/js/jquery.cookie.js"></script>
<script type="text/javascript" src="/common/api/js/jquery.validate.min.js"></script>
<script type="text/javascript" src="/common/api/js/shine.js"></script>

<script type="text/javascript" src="/common/api/js/recorder.js"></script>
<script type="text/javascript" src="/common/api/js/sp_record.js"></script>
<script type="text/javascript" src="/common/api/js/module.js"></script>
<script type="text/javascript" src="/common/api/js/FileSaver.js"></script>
<script type="text/javascript" src="/common/api/js/canvas-toBlob.js"></script>
<script type="text/javascript" src="/common/api/js/asher_canvas.js"></script>
<script type="text/javascript" src="/common/api/js/jquery.jplayer.min.js"></script>
<script type="text/javascript" src="/common/api/js/jplayer.playlist.min.js"></script>
<script type="text/javascript" src="/common/api/js/asher_player.js"></script>
<script type="text/javascript" src="/common/api/js/asher_tagging.js"></script>
<script type="text/javascript" src="/common/api/js/chain_line.js"></script>
<script type="text/javascript" src="/common/api/js/diff_match_patch.js"></script>
<script type="text/javascript" src="/common/api/js/chain_text_diff.js"></script>
<script type="text/javascript" src="/ui/exam/modify/chain_form.js"></script>
<script>
$(document).ready(function(){
	function noCTRL(e)
	{
		var msg = "Ctrl + C / Ctrl + V키를 금지합니다 ";
		
		
			if (event.ctrlKey && event.keyCode==86) //CTRL+V
			{
				alert(msg);
				event.keyCode = 0;
				window.event.returnValue = false;
			}
			else if (event.ctrlKey && event.keyCode==67) //CTRL+C (Copy)
			{
				alert(msg);
				event.keyCode = 0;
				window.event.returnValue = false;
			}
	} 
	
	document.onkeydown = function(){
		if(event.keyCode > 111 && event.keyCode<124){
			event.keyCode = 505;
		}
		if(event.keyCode == 505){
			return false;
		}
			
	}
});
</script>
</head>
<body style="overflow: auto;">
	<input type="hidden" id="chain_id" value="${chainInfo.id}">

	<div id='main_wrap' style="margin: 0 auto; width: 1366px; position: relative;  height: 768px;">
		<div id="header" style="background: rgb(156, 37, 37);">
			<div class="logo">
				<h1 style="font-size: 20px; margin: 0px; padding: 0px; color: rgb(221, 221, 221); position: absolute; top: 30px; left: 35px;">USHER</h1>
				<h2 style="font-size: 18px; margin: 0px; padding: 0px; color: rgb(255, 255, 255); font-weight: bold; position: absolute; top: 30px; left: 100px;">묶기 정답 확인/수정</h2>
			</div>
			<div class="hmenu">
				<ul>
					<li>
						<img id="btnMainNext" src="/common/api/img/titleBtnNext.gif" style="cursor: pointer; display: block;">
						<img id="btnMainClose" src="/common/api/img/titleBtnNext.gif" style="cursor: pointer; display: none;">
					</li>
				</ul>
			</div>
		</div>
		<div id="contents" style="height: 638px;">
			<div id="wrap" style="text-align: center;">
				<div id='control' style='z-index:9999'>
					<!-- 
					<div id="one_word_sel" style="display:none;">
						<input type="button" value="( 추가"><input type="button" value="( 제거"> 
						<input type="button" value=") 추가"><input type="button" value=") 제거"> 
						<input type="button" value="[ 추가"><input type="button" value="[ 제거"> 
						<input type="button" value="] 추가"><input type="button" value="] 제거">
					</div>
					<span id="word_sel">
						<input type="button" value="()"><input type="button" value="[]">
					</span>
					 -->
					<input type="button" class="green" value="주어">
					<input type="button" class="yellow" value="동사">
					<input type="button" class="cornflowerblue" value="←">
					<input type="button" class="antiquewhite" value="후치수식">
					<input type="button" class="hotpink" value=" ←">
					<input type="button" class="coral" value="  ←" >
					<input type="button" value="수식어 추가" >
					<span id="unlink" style="display:none">
						<input type="button" value="연결 끊기" />
					</span>
				</div>
				<div class='voca_cont' >
					<div class='basic'>
						<div class='btn_wrap' style="width: 550px;clear: both;">
							<a href='#' style="float: left; height: 27px;"><img src="/common/fs/image/exam/btn_return.gif" id='rollback' alt="되돌리기"/></a>
						</div>
						<div class='text_wrap' id='note' style="clear: both;">
						</div>
					</div>
				</div>				
			</div>
		</div>
	</div>
</body>
</html>