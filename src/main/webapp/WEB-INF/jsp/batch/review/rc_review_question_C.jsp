<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<input type="hidden" id="answer" name="answer" value="" />
<div id="tmain">
	<div id="tmain_left">
		<c:if test="${questionInfo.question != '' && questionInfo.question != null  }">
			<p class="square_fixed">
				Look at the four squares[■] that indicate where the following sentence could be added to the passage. Where would the sentence best fit? Click on a square to add the sentence to the passage.
			</p>
			<p class="question marker1"><c:out value="${questionInfo.question}" escapeXml="false"/></p>
		</c:if>

		 <p class="additionalBottom">
		 	<c:out value="${questionInfo.marker}"/>
		 </p>
	</div>
	<div id="tmain_right">
    	<p class="titleArea">${questionInfo.passage}</p>
        <div class="passageArea">
        	${questionInfo.paragraph}
        </div>
	</div>
	<div id="inserted_value" style="display:none;">${questionInfo.question}</div>
</div>
<script>
function ans(choice) {
	
	var v_inserted = $("#inserted_value").html();
	$('#answer').val(choice);
	var selected='SQ'+choice;

	var code=["SQA","SQB","SQC","SQD"];
	for(i=0; i < 4; i++) {
		if(code[i]!= selected) {
			$('#'+code[i]).text("■");
			$('#'+code[i]).css('background-color','');
		} else {
			$('#'+code[i]).html(v_inserted);
			$('#'+code[i]).css('background-color','#CCC');
			$('#'+code[i]).css('font-weight','bold');
		}
		
	}
	
}
</script>