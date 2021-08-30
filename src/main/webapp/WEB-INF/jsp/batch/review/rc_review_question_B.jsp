<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div id="tmain">
	<div id="tmain_left">
		<c:if test="${questionInfo.question != '' && questionInfo.question != null  }">
			<p class="question"><c:out value="${questionInfo.question}" escapeXml="false"/></p>
		</c:if>
		<c:if test="${questionInfo.choice_a != '' && questionInfo.choice_a != null  }">
			<p class="choice" id="choice_A">
				<input type="checkbox" id="choiceA" name="answer" class="choiceR" value="A"> 
				<span class="choiceL">
					<c:out value="${questionInfo.choice_a}" escapeXml="false"/>
				</span>
			</p>
		</c:if>
		<c:if test="${questionInfo.choice_b != '' && questionInfo.choice_b != null  }">
			<p class="choice" id="choice_B">
				<input type="checkbox" id="choiceB" name="answer" class="choiceR" value="B"> 
				<span class="choiceL">
					<c:out value="${questionInfo.choice_b}" escapeXml="false"/>
				</span>
			</p>
		</c:if>
		<c:if test="${questionInfo.choice_c != '' && questionInfo.choice_c != null  }">
			<p class="choice" id="choice_C">
				<input type="checkbox" id="choiceC" name="answer" class="choiceR" value="C"> 
				<span class="choiceL">
					<c:out value="${questionInfo.choice_c}" escapeXml="false"/>
				</span>
			</p>
		</c:if>
		<c:if test="${questionInfo.choice_d != '' && questionInfo.choice_d != null  }">
			<p class="choice" id="choice_D">
				<input type="checkbox" id="choiceD" name="answer" class="choiceR" value="D"> 
				<span class="choiceL">
					<c:out value="${questionInfo.choice_d}" escapeXml="false"/>
				</span>
			</p>
		</c:if>
		<c:if test="${questionInfo.choice_e != '' && questionInfo.choice_e != null  }">
			<p class="choice" id="choice_E">
				<input type="checkbox" id="choiceE" name="answer" class="choiceR" value="E"> 
				<span class="choiceL">
					<c:out value="${questionInfo.choice_e}" escapeXml="false"/>
				</span>
			</p>
		</c:if>
		<c:if test="${questionInfo.choice_f != '' && questionInfo.choice_f != null  }">
			<p class="choice" id="choice_F">
				<input type="checkbox" id="choiceF" name="answer" class="choiceR" value="F"> 
				<span class="choiceL">
					<c:out value="${questionInfo.choice_f}" escapeXml="false"/>
				</span>
			</p>
		</c:if>
		<c:if test="${questionInfo.choice_g != '' && questionInfo.choice_g != null  }">
			<p class="choice" id="choice_G">
				<input type="checkbox" id="choiceG" name="answer" class="choiceR" value="G"> 
				<span class="choiceL">
					<c:out value="${questionInfo.choice_g}" escapeXml="false"/>
				</span>
			</p>
		</c:if>
		<c:if test="${questionInfo.choice_h != '' && questionInfo.choice_h != null  }">
			<p class="choice" id="choice_H">
				<input type="checkbox" id="choiceH" name="answer" class="choiceR" value="H"> 
				<span class="choiceL">
					<c:out value="${questionInfo.choice_h}" escapeXml="false"/>
				</span>
			</p>
		</c:if>
		<c:if test="${questionInfo.choice_i != '' && questionInfo.choice_i != null  }">
			<p class="choice" id="choice_I">
				<input type="checkbox" id="choiceI" name="answer" class="choiceR" value="I"> 
				<span class="choiceL">
					<c:out value="${questionInfo.choice_i}" escapeXml="false"/>
				</span>
			</p>
		</c:if>
		 <p class="additionalBottom">
		 	<c:out value="${questionInfo.marker}" escapeXml="false"/>
		 </p>
	</div>
	<div id="tmain_right">
    	<p class="titleArea">${questionInfo.passage}</p>
        <div class="passageArea">
        	${questionInfo.paragraph}
        </div>
	</div>
</div>