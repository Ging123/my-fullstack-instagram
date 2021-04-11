package com.instagramServlets;

import java.io.IOException;
import java.io.PrintWriter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.instagramServlets.ValidadeFormSingUpServlet.Data;
import com.registerUser.DateValidator;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/validateDate")
public class validateDateSingup extends HttpServlet {

	public static class DateTyped {
		public String month;
		public String day;
		public String year;
	}
	
	public void doPost(HttpServletRequest request, HttpServletResponse response) {
		try {
			DateTyped dateTyped = new ObjectMapper().readValue(request.getParameter("formData"), DateTyped.class);
			DateValidator date = new DateValidator(dateTyped.month, dateTyped.day, dateTyped.year);
			if(date.validate()) {
				registerUser(request, response, dateTyped);
				return;
			}
			returnAnErroMensage(response, "invalid date");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	private void registerUser(HttpServletRequest request, HttpServletResponse response,DateTyped date) {
		HttpSession verifySession = request.getSession(false); 
		if(verifySession != null) {
			HttpSession session = request.getSession();
			session.setAttribute("secondFormularySingup", date);
			RegisterUserServlet register = new RegisterUserServlet();
			register.doPost(request, response);
			return;
		}
		returnAnErroMensage(response, "some input that you typed is invalid");
	}
	
	
	private void returnAnErroMensage(HttpServletResponse response, String erroMensage) {
		PrintWriter out;
		try {
			out = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			out.print(mapper.writeValueAsString(erroMensage));
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
