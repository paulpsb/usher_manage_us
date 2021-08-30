<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div id="tmainD">
	<input type="hidden" id="a1" name="answer[]" value="">
	<input type="hidden" id="a2" name="answer[]" value="">
	<input type="hidden" id="a3" name="answer[]" value="">
	<p class="DDirection">Directions:An introductory sentence for a brief summary of the passage is provided below.Complete the summary by selecting THREE answer choices that express the most important ideas in the passage.Some answer choices do not belong in summary because they express ideas that are not presented in the passage or are minor ideas in the passage.The Question is worth 2 points.</p>
	<div class="d85w center">
		<p class="qmarker p30h">Drag your answer choices to the spaces where they belong. To review the passage, click on <span class="bold">View Text</span>.</p>
	</div>
	<c:if test="${questionInfo.question != '' && questionInfo.question != null  }">
		<div class="question center"><c:out value="${questionInfo.question}" escapeXml="false"/></div>
	</c:if>		
	<div class="ansAreaD">
		<div class="ansBorder">
			<div id="d1" class="droppable" onDblClick="revertThis(this.id); return false;"></div>
		</div>
		<div class="ansBorder">
			<div id="d2" class="droppable" onDblClick="revertThis(this.id); return false;"></div>	
		</div>
		<div class="ansBorder">
			<div id="d3" class="droppable" onDblClick="revertThis(this.id); return false;"></div>
		</div>
	</div>
	<div class="midTitle"><p>Answer Choices</p></div>
	<div class="choiceArea">
		<c:if test="${questionInfo.choice_a != '' && questionInfo.choice_a != null  }">
			<div class="ansBorder"><div id="A" class="draggable"><c:out value="${questionInfo.choice_a}" escapeXml="false"/></div></div>
		</c:if>
		<c:if test="${questionInfo.choice_b != '' && questionInfo.choice_b != null  }">
			<div class="ansBorder"><div id="B" class="draggable"><c:out value="${questionInfo.choice_b}" escapeXml="false"/></div></div>
		</c:if>
		<c:if test="${questionInfo.choice_c != '' && questionInfo.choice_c != null  }">
			<div class="ansBorder"><div id="C" class="draggable"><c:out value="${questionInfo.choice_c}" escapeXml="false"/></div></div>
		</c:if>
		<c:if test="${questionInfo.choice_d != '' && questionInfo.choice_d != null  }">
			<div class="ansBorder"><div id="D" class="draggable"><c:out value="${questionInfo.choice_d}" escapeXml="false"/></div></div>
		</c:if>
		<c:if test="${questionInfo.choice_e != '' && questionInfo.choice_e != null  }">
			<div class="ansBorder"><div id="E" class="draggable"><c:out value="${questionInfo.choice_e}" escapeXml="false"/></div></div>
		</c:if>
		<c:if test="${questionInfo.choice_f != '' && questionInfo.choice_f != null  }">
			<div class="ansBorder"><div id="F" class="draggable"><c:out value="${questionInfo.choice_f}" escapeXml="false"/></div></div>
		</c:if>
		<c:if test="${questionInfo.choice_g != '' && questionInfo.choice_g != null  }">
			<div class="ansBorder"><div id="G" class="draggable"><c:out value="${questionInfo.choice_g}" escapeXml="false"/></div></div>
		</c:if>
		<c:if test="${questionInfo.choice_h != '' && questionInfo.choice_h != null  }">
			<div class="ansBorder"><div id="H" class="draggable"><c:out value="${questionInfo.choice_h}" escapeXml="false"/></div></div>
		</c:if>
		<c:if test="${questionInfo.choice_i != '' && questionInfo.choice_i != null  }">
			<div class="ansBorder"><div id="I" class="draggable"><c:out value="${questionInfo.choice_i}" escapeXml="false"/></div></div>
		</c:if>	
	</div>
	<div class="midTitle">
		<p>To review passage, Click "VIEW TEXT".</p>
	</div>
</div>
<script>
var s_arr=[];
s_arr['d1']="a1";
s_arr['d2']="a2";
s_arr['d3']="a3";
s_arr['d4']="a4";
s_arr['d5']="a5";
s_arr['d6']="a6";
s_arr['d7']="a7";
s_arr['d8']="a8";
s_arr['d9']="a9";

$(document).ready(function() {
	$(".draggable").draggable({
		revert: true
	});
	
	$(".droppable").droppable({
		drop: function (event, ui) {
			$(this).html(ui.draggable.text()+"<span class='hh'>"+ui.draggable.attr('id')+"</span>");
			$('#'+ui.draggable.attr('id')).hide();
			$('#'+s_arr[$(this).attr('id')]).val(ui.draggable.attr('id'));
			droppableDisable($(this).attr('id'));
		}
	});
});

function revertThis(id) {
	var orig= $('#'+id+ ' > span').text();
	$('#'+id).text('');
	$('#'+orig).show();
	droppableEnable(id);
	$('#'+s_arr[id]).val('');
}

function droppableDisable(id) {
	$('#'+id).droppable('option','disabled',true);
}

function droppableEnable(id) {
	$('#'+id).droppable('option','disabled',false);
}
</script>