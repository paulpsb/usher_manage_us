<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!doctype html public "-//w3c//dtd html 4.0 transitional//en">
<html>
<head>
	<title>타자연습 v1.0 </title>
    <meta httd-equiv="Content-Type" content="text/html; charset=euc-kr" />
	<meta name="generator" content="editplus">
	<meta name="author" content="">
	<meta name="keywords" content="">
	<meta name="description" content="">
	<script>
		
		var httd = new Httd();
		
		function Httd(){
			this.arrStrs = new Array(
					"In 1948, psychologist Edward Tolman introduced a theory that would change our understanding of animal cognition, the cognitive map.",
					"Tolman’s suggested that there was an internal mechanism that allowed the collection, encoding, saving, remembering,",
					"and interpretation of information about the relative positions and characteristics of different aspects of their environment.",
					"While Tolman’s theory was aimed at explaining human psychology, it has been used to explain aspects of the field of animal cognition.",
					"One animal behavior that is the result of this phenomenon is the ability of animals to migrate over long distances and return to a specific point.",
					"Due to the long distances that they cover on their migrations between feeding and breeding grounds, researchers have long used migratory animals to research the idea of cognitive mapping.",
					"Without some sort of innate system for negotiating these distances, these animals would not be able to return to the same places at the same time each year.",
					"Researchers have found that these animals use a three-pronged approach to develop a cognitive map for these long journeys.",
					"It appears that they build their cognitive maps by piloting using their senses to identify land marks in the environment,",
					"developing a sense of the cardinal directions through orientation and then using this data to perform a complex form of navigation",
					"that allows them to detect differing aspects of the environment and compare them to other locations and find their way.",
					"These migrations are performed by nearly every type of animal.",
					"The massive gray whale performs yearly migrations between the northern Pacific,",
					"where it feasts on the abundant invertebrates in the sediment on the ocean floor, and its breeding and birthing grounds off the tip of western Mexico’s Baja peninsula.",
					"This yearlong migration pattern, covering 20,000 Km, is the longest migration of all mammals,",
					"but pales in comparison to the arctic tern’s 70,000 Km yearly journey between the poles.",
					"Long migrations even occur in the short-lived insect kingdom.",
					"Perhaps the most well-documented of these is the monarch butterfly,",
					"which migrates over an area covering most of the United States, Mexico, Canada and some Caribbean islands;",
					"however none complete the entire journey due to their two month lifespans.",
					"Despite having never migrated before, these insects make a 4,000 Km journey between their wintering and summering sites.",
					"When they reach these northern sites they reproduce and die.",
					"After 2 or more generations have hatched, the remaining butterflies from the last generation migrate back with the onset of spring and the process repeats itself.",
					"Researchers have found that these migratory animals utilize a variety of environmental cues to develop the cognitive maps that allow them to make these long journeys.",
					"For instance, the gray whale appears to utilize the western coast of North America as its guiding feature.",
					"As they travel south, they remain close enough to the coast to ensure that it remains on their left side, and then on the right as they head up north again.",
					"They have even been seen thrusting their heads above water to locate the coast either visually or by listening for the crashing waves.",
					"Other animals, like the monarch butterfly, use other natural phenomena, such as the sun, moon, and stars, to keep themselves on the track.",
					"They use the sun to orient themselves and then rest in bushes and trees when it sets.",
					"Animals which migrate at night appear to use the stars to orient themselves, much like ancient mariners.",
					"Animals that utilize celestial features, such as the sun and stars, need internal tracking mechanisms, since their positions in the sky constantly change.",
					"Although scientists know relatively little about this mechanism, they have noted that animals seem to be able to account for the different positions of these objects as they travel.",
					"Another method that is understood is that of the indigo bunting.",
					"These songbirds travel at night and appear to use the North Star as their orienting point.",
					"Since the position of the North Star is relatively stable in the night sky, it becomes the focal point of their internal star maps, allowing them to either fly towards or away from it depending on their destination."
			);
			this.exString="";
			this.inputString="";
			this.speedCur=0;
			this.speedMax=0;
			
			this.accuracyTotal=0; //정확도
			this.accuracyCur=0; //정확도

			this.lengthTotal=0; //전체 글자수
			this.lengthTotalTrue=0; //전체 맞은 글자수
			this.lengthCurTrue=0; //현재 맞은 글자수
			
			this.timerInt;
			this.timerStopped=true;
			this.timerSec=0;

			this.setHttd=function(){
				/*** 임의 문장 선택 ***/
				var idx = Math.floor(Math.random(1)*this.arrStrs.length);
				this.exString = this.arrStrs[idx];
				
				/*** 문장/입력 객체 가져오기***/
				var objInputString = this.obj("httdInputString");
				var objExString = this.obj("exString");
				
				/*** 타이머 초기화 ***/
				this.timerStopped=true;
				this.timerInt=window.clearInterval(httd.timerInt);
				this.timerSec=0;

				/*** 문장 초기화 ***/
				objExString.innerHTML=this.exString;
				objInputString.value="";
				objInputString.focus();
			}
			this.keyUp=function(){
				var objInputString = this.obj("httdInputString");
				
				this.chkMiss();

				/*** 다른 문장으로 넘김 ***/
				if(this.exString.length<=objInputString.value.length){
					
					/*** 정확도 계산/출력 ***/
					this.lengthTotal += this.exString.length;
					this.lengthTotalTrue += this.lengthCurTrue;
					
					this.accuracyCur = Math.floor(this.lengthCurTrue/this.exString.length*100);
					this.accuracyTotal = Math.floor(this.lengthTotalTrue/this.lengthTotal*100);
					this.obj("prnAccuracyCur").innerHTML=this.accuracyCur;
					this.obj("prnAccuracyTotal").innerHTML=this.accuracyTotal;
					this.obj("barAccuracyCur").style.width=this.accuracyCur+"%";
					this.obj("barAccuracyTotal").style.width=this.accuracyTotal+"%";
					
					/*** 속도 계산/출력 ***/
					this.speedCur = Math.floor(this.lengthCurTrue / this.timerSec * 6000);
					if(this.speedMax<this.speedCur)this.speedMax = this.speedCur;
					this.obj("prnSpeedCur").innerHTML = this.speedCur;
					this.obj("prnSpeedMax").innerHTML = this.speedMax;
					this.obj("barSpeedCur").style.width=this.speedCur/10+"%";
					this.obj("barSpeedMax").style.width=this.speedMax/10+"%";

					this.setHttd();
					return false;
				}
				return true;
			}
			this.obj=function(id){
				return document.getElementById(id);
			}
			this.chkMiss=function(){
				var result="";
				this.lengthCurTrue=0;

				var objInputString = this.obj("httdInputString");
				this.inputString = objInputString.value;

				for(var i=0;i<this.exString.length;i++){
					if(this.exString.substring(i,i+1)!=this.inputString.substring(i,i+1) && i<this.inputString.length)
						result+="<font color=red>"+this.exString.substring(i,i+1)+"</font>";
					else{
						result+=this.exString.substring(i,i+1);
						this.lengthCurTrue++;
					}
				}
				var objExString = this.obj("exString");
				objExString.innerHTML=result;
			}
			this.chkTime=function(){
				if(this.timerStopped){
					this.timerStopped=false;
					this.timerSec=0;
					this.timerInt=window.setInterval("httd.addSec()",10);
				}
			}
			this.addSec=function(){
				this.timerSec++;
			}
		}
	</script>
	<style>
		#httdBox {border:1px solid #cccccc;width:600px;padding:4px;}
		#httdBox .smallBox {background-color:#f5f5f5;border:1px solid #cccccc;padding:2px;font-size:9pt;font-family:'malgun gothic';text-align:center;}
		#httdBox .ph {height:4px;font-size:0px;}
		#httdBox .textbox {width:95%;border:0px;background-color:#f5f5f5;text-align:center;outline:none}
		#httdBox #status {}
		#httdBox #status th{font-size:9pt;}
		#httdBox #status .bar {width:0px;font-size:0px;height:18px;}
		#httdBox #status .nums {font-size:9pt;height:18px;}
		#httdBox #status .barBgcolor {background-color:#cccccc}
	</style>
</head>
<body onload="httd.setHttd()">
	<h3>옥창타자연습 v1.0</h3>
	<div id="httdBox">

		<div id="exString" class="smallBox"></div>
		
		<div class="ph"></div>

		<div class="smallBox">
			<input type="text" class="textbox" id="httdInputString" onkeypress="return httd.keyUp()" onkeyup="httd.chkMiss()" onkeydown="httd.chkTime()">
		</div>

		<div class="ph"></div>
		
		<div id="status" class="smallBox">
			<table width="100%">
				<col width="80">
				<col width="">
				<col width="80">
				<tr>
					<th>정확도</th>
					<td>
						<div class="barBgcolor">
							<div id="barAccuracyCur" class="bar" style="background-color:#33ccff"></div>
						</div>
					</td>
					<td class="nums">
						<span id="prnAccuracyCur">0</span>%
					</td>
				</tr>
				<tr>
					<th>평균 정확도</th>
					<td>
						<div class="barBgcolor">
							<div id="barAccuracyTotal" class="bar" style="background-color:#3399cc"></div>
						</div>
					</td>
					<td class="nums">
						<span id="prnAccuracyTotal">0</span>%
					</td>
				</tr>
				<tr>
					<th>현재 속도</th>
					<td>
						<div class="barBgcolor">
							<div id="barSpeedCur" class="bar" style="background-color:#ffcc33"></div>
						</div>
					</td>
					<td class="nums">
						<span id="prnSpeedCur">0</span>타/분
					</td>
				</tr>
				<tr>
					<th>최고 속도</th>
					<td>
						<div class="barBgcolor">
							<div id="barSpeedMax" class="bar" style="background-color:#cc9933"></div>
						</div>
					</td>
					<td class="nums">
						<span id="prnSpeedMax">0</span>타/분
					</td>
				</tr>
			</table>
		</div>
	</div>
</body>
</html>