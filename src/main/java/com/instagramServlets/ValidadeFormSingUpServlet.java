package com.instagramServlets;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.registerUser.SingUpValidator;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class ValidadeFormSingUpServlet extends HttpServlet {
	
	static class Data {
		public String emailOrNumber;
		public String fullname;
		public String username;
		public String password;
	}
	
	public void doPost(HttpServletRequest request, HttpServletResponse response) {
		try {
			Data data = new ObjectMapper().readValue(request.getParameter("formData"), Data.class);
			SingUpValidator user = new SingUpValidator(data.emailOrNumber, data.fullname, data.username, data.password);
			System.out.println(user.isValid());
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}
}
