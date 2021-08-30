<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="euc-kr">
	<title>배치고사</title>
    <link rel="stylesheet" href="/assets/batch/css/reset.css" />
	<link rel="stylesheet" href="/assets/batch/css/main.css" />
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="/assets/js/common.js" ></script>
</head>
<body>
<input type="hidden" id="result_id" value="${resultInfo.id}">
<div id="tpo_head_wrapper">
	<div id="header">
    	<div id="head1">
        	<ul class="left">
            	<li><span class="text_logo">Usher Institute</span></li>
            	<li><span class="subject"></span></li>
            </ul>
            <ul id="head_btn" class="head_btn right">
                <li id="helpBtn"><a href="javascript:go_help()"><img src="/assets/batch/img/tpo_help.png" /></a></li>
                <li id="reviewBtn"><a href="javascript:go_review()"><img src="/assets/batch/img/tpo_review.png" /></a></li>
                <li id="prevBtn"><img src="/assets/batch/img/tpo_back_no.png" /></li>
                <li id="nextBtn"><a href="javascript:go_next()"><img src="/assets/batch/img/tpo_next.png" /></a></li>
            </ul>
        </div>
        
        <div class="clear"></div>
        
        <div id="head2">
        	<div class="qnum"><span id="qtxt">Question</span> <span id="qnum"></span> of <span id="totalCount"></span></div>
            <div class="timeToggle">
            	<span class="time"></span>
            </div>        	
        </div>
        
        <div class="clear"></div>
	</div><!--header-->
</div><!--tpo_wrapper-->
<div id="content" style="display:none;"></div>
<div id="review" style="width:100%;height:600px;overflow-y:auto;">
	<div id="tmainD">
		<table style="width:100%;padding:5px;">
			<colgroup>
				<col style="width:5%;" />
				<col style="width:75%;" />
				<col style="width:10%;" />
				<col style="width:10%;" />
			</colgroup>		
			<thead>
				<tr>
					<th style="border:1px solid #000;background-color:#ccc;padding:5px;" colspan="2">Question</th>
					<th style="border:1px solid #000;background-color:#ccc;padding:5px;">Answer</th>
					<th style="border:1px solid #000;background-color:#ccc;padding:5px;">User Answer</th>
				</tr>
			</thead>
			<tbody id="questionList">

			</tbody>
		</table>
	</div>
</div>
<script type="text/javascript" src="/ui/batch/review/grammar_review.js"></script>
</body>
</html>