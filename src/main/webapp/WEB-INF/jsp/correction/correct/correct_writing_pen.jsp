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
	<script type="text/javascript" src="/ui/correction/correct/correct_writing_pen.js"></script>
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
		.buttons {
			position: relative;
			overflow: visible;
			display: inline-block;
			padding: 0.5em 1em;
			border: 1px solid #d4d4d4;
			margin: 0;
			text-decoration: none;
			text-align: center;
			text-shadow: 1px 1px 0 #fff;
			font: 11px/normal sans-serif;
			color: #333;
			white-space: nowrap;
			outline: none;
			background-color: #ececec;
			background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#f4f4f4), to(#ececec));
			background-image: -moz-linear-gradient(#f4f4f4, #ececec);
			background-image: -ms-linear-gradient(#f4f4f4, #ececec);
			background-image: -o-linear-gradient(#f4f4f4, #ececec);
			background-image: linear-gradient(#f4f4f4, #ececec);
			-moz-background-clip: padding;
			background-clip: padding-box;
			border-radius: 0.2em;
			zoom: 1;
			
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
		.correct_title_red {
			color:red;
		}
	</style>	
<body>
	<input type="hidden" id="correction_exams_answer_id" value="${resultInfo.id}">
	<div id="wrap1">
		<!-- <div class="notice" id="head"> Drag(Select text range) -&gt; Press &quot;Ctrl&quot; key</div>  -->
		<div class="pattern">
		    <ul class="correct_btn">
		         <li id="correct_0" class="button" onclick="correct(0)">0:템플릿 오류(F1)</li>
		        <li id="correct_1" class="button" onclick="correct(1)">1:이해불가(F2)</li>
		        <li id="correct_2" class="button" onclick="correct(2)">2:오타(F3)</li>
		        <li id="correct_3" class="button" onclick="correct(3)">3:접속사 오류(F4)</li>
		        <li id="correct_4" class="button" onclick="correct(4)">4:동사 오류(F5)</li>
		        <li id="correct_5" class="button" onclick="correct(5)">5:명사 오류(F6)</li>
		        <li id="correct_6" class="button" onclick="correct(6)">6:구문오류(F7)</li>
		        <li id="correct_7" class="button" onclick="correct(7)">7:분사(F8)</li>
		        <li id="correct_8" class="button" onclick="correct(8)">8:관사 오류(F9)</li>
		        <li id="correct_9" class="button" onclick="correct(9)">9:뉘앙스 오류(F10)</li>
		        <li id="correct_10" class="button" onclick="correct(10)">10:논리 오류(F11)</li>
		    </ul>
		</div><!--pattern-->
		<div style="font-size: 12px;padding:10px;">
			<p>학생이 틀린 부분에 해당하는 <span class="correct_title_red">버튼</span>이나 <span class="correct_title_red">단축키</span>를 누르면 빨간색 줄이 나옵니다 그 뒷부분에 부가적인 설명을 작성하세요.(자동으로 나오는 문구는 건들지 말고 그 뒤부터 작성하세요)</p>
			<p>
				- 문법적인 부분 뿐만이 아니라 <span class="correct_title_red">내용도 첨삭</span>을 해주셔야 합니다.<br>
				- 단지 이해가 안가는 문장을 붙잡고 이해하려고 하시지 마시고, 이해가 안가는 문장은 1번인 <span class="correct_title_red">이해 불가</span>를 눌러주시고, 그 <span class="correct_title_red">설명</span>을 적어주세요<br>
				- 논리적으로 오류가 있다고 생각하는 부분은 드래그 후 <span class="correct_title_red">논리 오류</span>를 눌러주시고, 그 <span class="correct_title_red">설명</span>을 적어주세요
			</p>
		</div>
		<div align="center">
			<textarea cols="100" id="writing_editor1" name="writing_editor1" rows="35" style="width:100%;height:550px;">${penInfo.pen_comment}</textarea>
		</div>
		<div style="font-size: 12px;padding:10px;">
			<p>
				- 첨삭 종료 후 글에 대한 총평을 적어주세요.<br>
				- (최소 40자/각각에 문단에 내용적인 부분에 대한 부가 설명은 각 바디 문단에 대한 가장 큰 문제가 무엇이었는지 총평에 각 한 문장식, 총 두 문장 남겨주세요
			</p>
			<p class="correct_title_red" style="text-align:right;">
				총평 글자 수 : <span id="pen_comment_review_count"></span>자/40자
			</p>
		</div>
		<div align="center">
			<textarea cols="100" id="pen_comment_review" name="pen_comment_review" rows="35" style="width:100%;height:150px;">${penInfo.pen_comment_review}</textarea>
		</div>
		<div align="center" style="margin-top:5px;">
			<input name="Submit" type="button" value="완료" onclick="savePen()" />
		</div>
	</div>
</body>
</html>