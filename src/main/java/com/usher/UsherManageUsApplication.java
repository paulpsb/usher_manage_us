package com.usher;

import java.util.Date;
import java.util.TimeZone;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@Controller
public class UsherManageUsApplication {
	@PostConstruct
	public void started() {
		TimeZone.setDefault(TimeZone.getTimeZone("America/Chihuahua"));
		System.out.println("현재시각 : " + new Date());
	}
	public static void main(String[] args) {
		SpringApplication.run(UsherManageUsApplication.class, args);
	}

	@RequestMapping(value="/")
	public String index(HttpServletRequest request,
						ModelMap modelMap) throws Exception {
		return "redirect:/login.do";
	}
}
