<?php
include_once '/home/netpg/www/html/common.inc.php';
//include_once '../../inc/header.php';
include_once 'lib.fb/fb.php';


$log    = new CLog("student/exam/interpret_result.php");
$db     = new CMySQL($log->pname, DB_CMODE_SELECT);


$type = getvar('type', 'RC1');
$chapter = getvar('chapter', 'A1');
$total_size = getvar('total_size', '0');
$ikey = getvar('ikey', '-1');



/* [S] 오답에 대한 정답 데이터 by ein1 150403 */
$SQL = "SELECT A.type, A.chapter, A.p_graph, A.q_num, A.p_kor, A.p_eng
FROM ush_interpret A WHERE A.type='$type' AND A.chapter='$chapter'
ORDER BY A.q_num";
$RS = $db->selectDB($SQL);
$OK_DATA = Array();

foreach($RS as $VAL)
{

    $OK_DATA[$VAL['p_graph']."-".$VAL['q_num']]['p_eng'] = $VAL['p_eng'];
    $OK_DATA[$VAL['p_graph']."-".$VAL['q_num']]['p_kor'] = $VAL['p_kor'];
}
/* [E] 오답에 대한 정답 데이터 */

$sql = "SELECT A.type, A.chapter, A.p_graph, A.q_num, A.p_eng
FROM ush_user_interpret_result A WHERE A.type='$type' AND A.chapter='$chapter' and index_no = $ikey";
$rs_user_w = $db->getValue($sql);
/* [S] 오답에 대한 입력 데이터 */

$p_graph = explode('|', $rs_user_w['p_graph']);
$q_num  = explode('|', $rs_user_w['q_num']);
$p_eng  = explode('|', $rs_user_w['p_eng']);

$W_DATA = Array();
for($i=0; $i<sizeof($p_graph); $i++)
{
    $W_DATA[$p_graph[$i]."-".$q_num[$i]]['p_eng'] = $p_eng[$i];
}

/* [E] 오답에 대한 입력 데이터  */


?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//en" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title> new document </title>
<meta charset="utf-8" />
<meta content="editplus" name="generator" />
<meta content="" name="author" />
<meta content="" name="keywords" />
<meta content="" name="description" />
<link rel="stylesheet" type="text/css" href="pub/style.css">

</head>
<body style="background:#f5f5f5">
<div style=" margin: 0 auto; width: 1366px; position: relative;  background: #f5f5f5; height: 768px;">
    <div id="header" style="height:200px">
        <div class="logo">
            <h1 style="font-size: 46px;color: #fff; font-weight:bold; font-style: italic;position:absolute;top:15px;left:30px">TOEFL</h1>
            <h2 style="font-size: 12px;color: #fff; font-weight:bold;position:absolute;top:27px;left:200px;">TOEFL iBT<br />Complete Practical Test</h2>
        </div>
        <div class="hmenu1">
            <ul>
                <li><img src="pub_images/btn01.png" /></li>
                <li><img src="pub_images/btn02.png" /></li>
                <li><img src="pub_images/btn03.png" /></li>
                <li><img src="pub_images/btn04.png" /></li>
                <li><img src="pub_images/btn05.png" /></li>
            </ul>
        </div>
        <div class="hmenu2">
        	<span><input type="button" value="PAUSE TEST" style="width:100px;margin-right:10px" /><input type="button" style="width:90px;background:url(pub_images/btn_guess.png) no-repeat 0 0" /></span>
            <span style="padding-top:5px">Translation Test</span>
            <span><input type="button" value="Hide Time" style="margin-right:10px" /><input type="button" value="Continue" /></span>
        </div>
        <div style="position:absolute;top:120px;width:100%;height:80px;background:#ddd">
        	  header
        </div>
    </div>
    <form id="frm_exam_interpret">
    <input type="hidden" name="type" value='<?php echo $type;?>' />
    <input type='hidden' name='chapter' value='<?php echo $chapter;?>' />
    <input type='hidden' name='total_size' value='<?php echo $total_size;?>' />
    <input type='hidden' name='ikey' value='<?php echo $ikey;?>' />
    <div style="background: #fff; height:519px;" id="contents">
    	<div class="trans_test">
            <div>
                <p style="margin-bottom:12px;font-size:15px;color:#69394d">귀하의 영작문을 REVIEW 해보세요. 틀린부분은 붉은색 밑줄로 나타납니다.</p>
                <?php
				$i=1;
                /* 작성 데이터를 돌리고 정답과 비교한다. */
                foreach($OK_DATA as $Q_NUM => $W) {
                    //print_r($OK_DATA);
                    # 품사 갯수
                    $P_CNT = 1;


                    # 영문이 틀린 경우
                    $QUESTION = $W_DATA[$Q_NUM]['p_eng'];
                    // 입력 안 한 경우
                    if(empty($W_DATA[$Q_NUM]['p_eng']))
                    {
                    ?>
                <div class="qna" style='display:none'>
                    <div style="border-right:none;background:#e4e4e4">
                        <h3>Q<?php echo $i;?></h3>
                        <p style="margin-left:10px;color:#333"><?php echo $W['p_kor'] ?></p>
                    </div>
                    <div>
                        <h3 style="color:#69394d">A</h3>
                        <p style="padding:30px 30px 0 40px;border-top:2px dashed #858585;color:#555;line-height:28px">정답:<span style="display:block"><?=$W['p_eng']?></span></p>
                    </div>
                </div>
                    <?php
                    }
                    // 길이가 다른 경우
					else if(strlen(trim(preg_replace('/\s\s+/',' ',$W['p_eng']))) != strlen(trim(preg_replace('/\s\s+/',' ',$W_DATA[$Q_NUM]['p_eng']))))
                    {
						$html = '';

						function diff($old, $new){
						    $old_origin = $old;
                            $new_origin = $new;

                            foreach($old as $oindex => $ovalue){
                                $nkeys = array_keys($new, $ovalue);
                                foreach($nkeys as $nindex){
                                    $matrix[$oindex][$nindex] = isset($matrix[$oindex - 1][$nindex - 1]) ?
                                        $matrix[$oindex - 1][$nindex - 1] + 1 : 1;
                                    if($matrix[$oindex][$nindex] > $maxlen){
                                        $maxlen = $matrix[$oindex][$nindex];
                                        $omax = $oindex + 1 - $maxlen;
                                        $nmax = $nindex + 1 - $maxlen;
                                    }
                                }
                            }
                            if($maxlen == 0) return array(array('d'=>$old, 'i'=>$new));
                            return array_merge(
                                diff(array_slice($old, 0, $omax), array_slice($new, 0, $nmax)),
                                array_slice($new, $nmax, $maxlen),
                                diff(array_slice($old, $omax + $maxlen), array_slice($new, $nmax + $maxlen)));
                        }
                        function htmlDiff($old, $new){
                            //echo($old.$new);
                            $diff = diff(explode(' ', $old), explode(' ', $new));
                            //fb($diff);
                            foreach($diff as $k){
                                if(is_array($k)){
                                    
                                    if(count($k['d']) == count($k['i'])){
                                        $how_long = count($k['d']);
                                        for($i=0;$i<$how_long;$i++){
                                            $not_words = array('~','!','@','#','$','%','^','&','*','(',')','_','+','=','-','\\','|','/','?',',','.');
                                            $old = str_replace($not_words,'',$k['d'][$i]);
                                            $new = str_replace($not_words,'',$k['i'][$i]);
                                            if (strcasecmp($old, $new) == 0) {
                                                $ret .= $k['i'][$i] . ' ';

                                            }else{
                                                $ret .= "<span style='color:red'>".$k['d'][$i]."</span> ";
                                            }
                                        }
                                        continue;
                                    }

                                    if(!empty($k['d']) && !empty($k['i'])){
                                        $how_long = count($k['d'])>count($k['i'])?count($k['d']):count($k['i']);

                                        $ret .= "<span style='color:red'>".implode(' ',$k['d'])."</span> ";

                                    }else{
                                        $ret .= (!empty($k['d'])?"<del>".implode(' ',$k['d'])."</del> ":'').
                                        (!empty($k['i'])?"<span style='color:red'>".implode(' ',$k['i'])."</span> ":'');
                                    }
                                }
                                else $ret .= $k . ' ';
                            }
                            return $ret;
                        }
                    ?>
                <div class="qna" style='display:none'>
                    <div style="border-right:none;background:#e4e4e4">
                        <h3>Q<?php echo $i;?></h3>
                        <p style="margin-left:10px;color:#333"><?php echo $W['p_kor'] ?></p>
                    </div>
                    <div>
                        <h3 style="color:#69394d">A</h3>
                        <?=htmlDiff($W_DATA[$Q_NUM]['p_eng'],str_replace(PHP_EOL,'',$W['p_eng']))?>
                        <!--span class="Differences" style="color: red;"><?php echo $W_DATA[$Q_NUM]['p_eng'] ?></span-->
                        <p style="padding:30px 30px 0 40px;border-top:2px dashed #858585;color:#555;line-height:28px">정답:<span style="display:block"><?=$W['p_eng']?></span></p>
                    </div>
                </div>
                    <?php
                    }
                    // 길이가 같은 경우 오타 검사
                    else
                    {
                        $QUESTION = "";
                        for($i=0; $i<strlen($W['p_eng']); $i++)
                        {
                            if(strcasecmp(trim(preg_replace('/\s\s+/',' ',$W['p_eng'][$i])),trim(preg_replace('/\s\s+/',' ',$W_DATA[$Q_NUM]['p_eng'][$i]))))
                            {
                                $QUESTION .= '<span style="color: red;">'.$W_DATA[$Q_NUM]['p_eng'][$i].'</span>';
                            }
                            else
                            {
                                $QUESTION .= $W_DATA[$Q_NUM]['p_eng'][$i];
                            }
                        }
                        ?>
                <div class="qna" style='display:none'>
                    <div style="border-right:none;background:#e4e4e4">
                        <h3>Q<?php echo $i;?></h3>
                        <p style="margin-left:10px;color:#333"><?php echo $W['p_kor'] ?></p>
                    </div>
                    <div>
                        <h3 style="color:#69394d">A</h3>
                        <?=$QUESTION?>
                        <p style="padding:30px 30px 0 40px;border-top:2px dashed #858585;color:#555;line-height:28px">정답:<span style="display:block"><?=$W['p_eng']?></span></p>
                    </div>
                </div>
                    <?php
                    }
					$i++;
                } ?>
            </div>
            <a href="#" id="prev" style="position:absolute;top:150px;left:30px"><img src="pub_images/btn_left.png" alt="" /></a>
            <a href="#" id="next" style="position:absolute;top:150px;right:30px"><img src="pub_images/btn_right.png" alt="" /></a>
        </div>
    </div>
    </form>
    <div style="position: absolute; bottom: 0px; height: 49px; line-height: 49px; border-top: 1px solid #888; background: #ccc; width: 100%;" id="footer">
        <table width="100%" cellspacing="0" cellpadding="0" style="table-layout: fixed;">
            <tbody>
                <tr>
                    <td width="40" height="49" align="left" style="padding-left: 10px; font-size: 17px; font-weight: bold;">사전</td>
                    <td width="310"><input type="text" placeholder="ex) apple" style="height:31px; border: 1px solid #888; width: 305px; font-size: 14px; color: #A20000; text-indent: 2px; font-weight: bold; " value="" /></td>
                    <td width="50"><input type="button" class="btn1" style="width:35px;height:31px;background:url(pub_images/btn_search.png) no-repeat 0 0" /></td>
                    <td align="left"><input type="button" class="btn1" value="자세히보기" style="width:90px" /><input type="button" class="btn1" value="튜토리얼" style="width:80px;margin-left:10px" /></td>
                    <td align="right" style="padding-right: 30px; "><input type="button" class="btn2" onclick="" value="시작 (00:00:00)" style="width:130px" /><input type="button" class="btn2" onclick="" value="종료(NEXT)" style="width:100px;margin-left:10px" /></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>



<script type="text/javascript" src="/api/js/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="/api/js/jquery-ui.min.js"></script>
<script type="text/javascript" src="/api/js/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="/api/js/module.js"></script>
<script type="text/javascript">
$(document).ready(function(){


    var page = 1;
    $("#contents .qna").eq(0).show();
   // $(".change_wrap tr[name!='paragraph_"+page+"']").hide();
    $('#prev').on('click', function(e){
        if(page!='1'){
            $("#contents .qna").eq(page-1).hide();
            $("#contents .qna").eq(page-2).show();
            page = page - 1;

        }

    });

    $('#next').on('click', function(e){
        if(page!='<?php echo $total_size;?>'){
            $("#contents .qna").eq(page).show();
            $("#contents .qna").eq(page-1).hide();
            page = page + 1;
            //$("table tr[name='paragraph_"+page+"']").show();
            //$("table tr[name!='paragraph_"+page+"']").hide();
            if(page==3){
               //$(this).val('저장');
            }
        }

    });
});

function shTime(obj){

    if($(obj).val() == "SHOW TIME")
    {

        $(obj).parent().next().show();
        $(obj).val("HIDE TIME")
    }
    else
    {
        $(obj).parent().next().hide();
        $(obj).val("SHOW TIME")
    }
}


</script>
</body>
</html>
