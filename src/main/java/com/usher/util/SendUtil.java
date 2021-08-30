package com.usher.util;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.swing.JOptionPane;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.URL;
import java.net.URLEncoder;
import java.net.UnknownHostException;


/**
 * E-Mail/알림톡미 Util
 *
 */
public class SendUtil{
	private SendUtil(){
		
	}
	
	public static void sendKakao(String resvHp, String tmp_id, String variable) throws Exception
	{
		resvHp = resvHp.replaceAll("!\"#[$]%&\\(\\)\\{\\}@`[*]:[+];-.<>,\\^~|'\\[\\]", "");
		
		String AUTH_KEY_KAKAO = "JJZVYVCRCR10619";
		String API_URL_KAKAO  = "http://221.139.14.189/API/alimtalk_api";
		
		String param = "api_key="+AUTH_KEY_KAKAO;
		param += "&template_code="+tmp_id;
		param += "&variable="+variable;
		param += "&callback=025955679";
		param += "&dstaddr="+resvHp;
		param += "&next_type=1";
		param += "&send_reserve=0";
		
		URL url = new URL(API_URL_KAKAO);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		
		conn.setUseCaches(false);
		conn.setDoInput(true);
	    conn.setDoOutput(true);
        conn.setRequestMethod("POST");
        
        OutputStream output = conn.getOutputStream();
        output.write(param.getBytes("utf-8"));
        output.flush();
        output.close();
        
        if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
            throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
        }
        
        BufferedReader br = new BufferedReader(new InputStreamReader(
                (conn.getInputStream())));
        
        String buffer;
        StringBuffer response = new StringBuffer();
        while ((buffer = br.readLine()) != null) {
        	response.append(buffer);
        }

        System.out.println(response.toString());
        conn.disconnect();
        
	}
	public static void sendEmail(String resvEmail, String subject, String content){
        Properties p = System.getProperties();
        p.put("mail.smtp.starttls.enable", "true");    
        p.put("mail.smtp.host", "smtp.gmail.com");      // smtp 서버 호스트
        p.put("mail.smtp.auth","true");
        p.put("mail.smtp.port", "587");                 // gmail 포트
            
        Authenticator auth = new MyAuthentication();    //구글 계정 인증
          
        //session 생성 및  MimeMessage생성
        Session session = Session.getDefaultInstance(p, auth);
        MimeMessage msg = new MimeMessage(session);
        String fromName = "어셔어학원";
        String charSet = "UTF-8";
		
        try{
            // 편지보낸시간 설정
            msg.setSentDate(new Date());
              
            // 송신자 설정
            InternetAddress from = new InternetAddress() ;
            from = new InternetAddress(new String(fromName.getBytes(charSet), "UTF-8") + "<consultingwithusher@gmail.com>");
            msg.setFrom(from);
              
            // 수신자 설정
            InternetAddress to = new InternetAddress(resvEmail);
            msg.setRecipient(Message.RecipientType.TO, to);
             
            // 제목 설정
            msg.setSubject(subject, "UTF-8");
             
            //msg.setText(content, "UTF-8");  //내용 설정
            msg.setContent(content,"text/html; charset=UTF-8");
             
            // 메일 송신
            Transport.send(msg);   
             
            System.out.println("메일 발송을 완료하였습니다.");
        }catch (AddressException addr_e) {  //예외처리 주소를 입력하지 않을 경우
            addr_e.printStackTrace();
        }catch (MessagingException msg_e) { //메시지에 이상이 있을 경우
            msg_e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
	
	public static String getEmailTemplete()
	{
		StringBuffer sb = new StringBuffer();
		
		sb.append("<!DOCTYPE>");
		sb.append("<html>");
		sb.append("<head>");
		sb.append("<title></title>");
		sb.append("<meta charset='utf-8'>");
		sb.append("</head>");
		sb.append("<body>");
		sb.append("	<table width='800' border='0' cellpadding='0' cellspacing='0' style='width800px; margin:0 auto; background: #ffffff; border-collapse: separate; border-style: hidden; mso-table-lspace: 0pt; mso-table-rspace: 0pt;'>");
		sb.append("		<tr>");
		sb.append("			<td>");
		sb.append("				<p style='font-size:18px; font-family:'Malgun Gothic', 'Dotum', sans-serif; line-height:150%;'>");
		sb.append("					어셔어학원 ZOOM 온라인 참여강의<br />");
		sb.append("					상담예약을 해주셔서 감사합니다.<br /><br />");
		sb.append("					ZOOM 온라인 참여강의를 수강하기 위해서는 필수적으로 온라인 배치고사와 온라인 상담을 통해 반 배치를 받으셔야 합니다.<br />");
		sb.append("					온라인 배치고사의 URL은 <a href='http://chanmgang.usher.co.kr' target='_blank'>chanmgang.usher.co.kr</a> 입니다. 회원가입 후 이용해주세요. 반드시 스마트폰이나 테블릿이 아닌 PC로 시험을 치르셔야 합니다.<br /><br />");
		sb.append("					온라인 배치고사 소요시간은 약 1시간 30분입니다.<br />");
		sb.append("					편하신 시간에 배치고사를 치르시고 온라인 상담에 참여해주세요<br /><br />");
		sb.append("					온라인 상담은 한국시간 기준으로<br />");
		sb.append("					월요일 ~ 금요일 오후 6시 30분으로 예정되어 있으며<br />");
		sb.append("					참가 방법은 온라인 배치고사가 완료되면<br />");
		sb.append("					카카오톡 메세지와 이메일로 안내 해 드리겠습니다.<br /><br />");
		sb.append("					이 외 문의사항은 어셔어학원 카카오톡 플러스 친구로 연락주시면 어셔어학원 전문 상담사가 성실히 답변 드리겠습니다.<br /><br />");
		sb.append("					감사합니다.");
		sb.append("				</p>");
		sb.append("			</td>");
		sb.append("		</tr>");
		sb.append("	</table>");
		sb.append("</body>");
		sb.append("</html>");

		return sb.toString();
	}
}