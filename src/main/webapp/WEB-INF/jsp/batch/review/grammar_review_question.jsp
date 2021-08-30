<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div id="tmain">
	<div id="tmain_left">
		<c:if test="${questionInfo.question != '' && questionInfo.question != null  }">
			<p class="question"><c:out value="${questionInfo.question}" escapeXml="false"/></p>
		</c:if>
	</div>
	<div id="tmain_right">
		<p class="question"></p>
		<c:if test="${questionInfo.choice_a != '' && questionInfo.choice_a != null  }">
			<p class="choice" id="choice_A">
				<input type="radio" id="choiceA" name="answer" class="choiceR" value="A"> 
				<span class="choiceL">
					<c:out value="${questionInfo.choice_a}" escapeXml="false"/>
				</span>
			</p>
		</c:if>
		<c:if test="${questionInfo.choice_b != '' && questionInfo.choice_b != null  }">
			<p class="choice" id="choice_B">
				<input type="radio" id="choiceB" name="answer" class="choiceR" value="B"> 
				<span class="choiceL">
					<c:out value="${questionInfo.choice_b}" escapeXml="false"/>
				</span>
			</p>
		</c:if>
		<c:if test="${questionInfo.choice_c != '' && questionInfo.choice_c != null  }">
			<p class="choice" id="choice_C">
				<input type="radio" id="choiceC" name="answer" class="choiceR" value="C"> 
				<span class="choiceL">
					<c:out value="${questionInfo.choice_c}" escapeXml="false"/>
				</span>
			</p>
		</c:if>
		<c:if test="${questionInfo.choice_d != '' && questionInfo.choice_d != null  }">
			<p class="choice" id="choice_D">
				<input type="radio" id="choiceD" name="answer" class="choiceR" value="D"> 
				<span class="choiceL">
					<c:out value="${questionInfo.choice_d}" escapeXml="false"/>
				</span>
			</p>
		</c:if>
		<c:if test="${questionInfo.choice_e != '' && questionInfo.choice_e != null  }">
			<p class="choice" id="choice_D">
				<input type="radio" id="choiceE" name="answer" class="choiceR" value="E"> 
				<span class="choiceL">
					<c:out value="${questionInfo.choice_e}" escapeXml="false"/>
				</span>
			</p>
		</c:if>
		<c:if test="${questionInfo.choice_f != '' && questionInfo.choice_f != null  }">
			<p class="choice" id="choice_F">
				<input type="radio" id="choiceF" name="answer" class="choiceR" value="F"> 
				<span class="choiceL">
					<c:out value="${questionInfo.choice_f}" escapeXml="false"/>
				</span>
			</p>
		</c:if>
		<c:if test="${questionInfo.choice_g != '' && questionInfo.choice_g != null  }">
			<p class="choice" id="choice_G">
				<input type="radio" id="choiceG" name="answer" class="choiceR" value="G"> 
				<span class="choiceL">
					<c:out value="${questionInfo.choice_g}" escapeXml="false"/>
				</span>
			</p>
		</c:if>
		<c:if test="${questionInfo.choice_h != '' && questionInfo.choice_h != null  }">
			<p class="choice" id="choice_H">
				<input type="radio" id="choiceH" name="answer" class="choiceR" value="H"> 
				<span class="choiceL">
					<c:out value="${questionInfo.choice_h}" escapeXml="false"/>
				</span>
			</p>
		</c:if>
		<c:if test="${questionInfo.choice_i != '' && questionInfo.choice_i != null  }">
			<p class="choice" id="choice_I">
				<input type="radio" id="choiceI" name="answer" class="choiceR" value="I"> 
				<span class="choiceL">
					<c:out value="${questionInfo.choice_i}" escapeXml="false"/>
				</span>
			</p>
		</c:if>
	</div>
</div>