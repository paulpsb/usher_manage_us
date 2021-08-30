<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<input type="hidden" id="course_id" value="${classInfo.course_id}">
<input type="hidden" id="section" value="${classInfo.section}">
<input type="hidden" id="class_date" value="${classInfo.date}">
<input type="hidden" id="user_id" value="${classInfo.user_id}">

<div class="bg-white">
	<div class="row bg-red p-t-20 p-l-20">
		<div class="col-2">
			<h4>GR 수업</h4>
		</div>
		<div class="col-1 text-right">
			<button type="button" class="btn btn-default btn-lg" onclick="date_prev()"><</button>
		</div>
		<div class="col-2" >
			<input type="text" id="select_date_text" class="form-control form-control-lg text-center" readonly>
		</div>
		<div class="col-1">
			<button id="btn_next" type="button" class="btn btn-default btn-lg" onclick="date_next()" disabled>></button>
			<div class="input-group date" id="datepicker-disabled-past" data-date-format="yyyy-dd-mm" data-date-end-date="Date.default" style="width:auto;display:inline-block;">
				<input id="search_date" type="hidden" placeholder="Select Date"  value="${classInfo.date}"/>
				<button type="button" class="btn btn-default btn-lg"><i class="fa fa-calendar"></i></button>
			</div>					
		</div>
		<div class="col-4 mb-4">
			<select id="search_schedule" class="form-control form-control-lg">
			</select>
		</div>
		<div class="offset-1 col-1">
			<button type="button" class="btn btn-primary btn-lg btn-block" onClick="close_class()">수업종료</button>
		</div>
		<div class="offset-2 col-2 mb-2">
			<button type="button" class="subject analysis btn btn-info btn-lg btn-block" onClick="change_subject('analysis')">분석</button>
		</div>
		<div class="col-2">
			<button type="button" class="subject passage btn btn-grey btn-lg btn-block" onClick="change_subject('passage')">지문보기</button>
		</div>
		<div class="col-2">
			<button type="button" class="subject passage_chain btn btn-grey btn-lg btn-block" onClick="change_subject('passage_chain')">지문 묶기 보기(소)</button>
		</div>
		<div class="col-2">
			<button type="button" class="subject passage_chain_half btn btn-grey btn-lg btn-block" onClick="change_subject('passage_chain_half')">지문 묶기 보기(대)</button>
		</div>
		<div class="col-2">
			<button type="button" class="subject exam btn btn-grey btn-lg btn-block" onClick="change_subject('exam')">시험지 보기</button>
		</div>
	</div>
	<div class="row">
		<div class="col-12 text-center mt-1 mb-1" id="grammar_button" style="display:none;">
			<button class="btn btn-primary" id="btn_prev" onclick="click_exam_prev()">Prev</button>&nbsp;&nbsp;
			<span id="grammar_review_question" style="font-weight:bold; font-size:1.15em;padding:10px 0;"></span>&nbsp;&nbsp;
			<button class="btn btn-primary" id="btn_next" onclick="click_exam_next()">Next</button>
			<button class="btn btn-info" id="btn_exam_sound" onclick="click_exam_show_answer()">답 확인</button>
		</div>
	</div>
	<div class="row">
		<div class="col-12" id="grammar_content">
			
		</div>
	</div>
</div>
	<script>
	$('#datepicker-disabled-past').datepicker({
		todayHighlight: true,
		autoclose : true,
		format: "yyyy-mm-dd",
		orientation: "bottom right"
	}).on("changeDate", function(e) {
		change_date();
		search_reload();
	});
	</script>

<script type="text/javascript" src="/ui/test/class/grammar_class.js"></script>