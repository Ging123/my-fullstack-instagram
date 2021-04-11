package com.instagramServlets;

import java.io.IOException;
import java.io.PrintWriter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.registerUser.SingUpValidator;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/validateSingupForm")
public class ValidadeFormSingUpServlet extends HttpServlet {

	public static class Data {
		public String emailOrNumber;
		public String fullname;
		public String username;
		public String password;
	}
	
	
	public void doPost(HttpServletRequest request, HttpServletResponse response) {
		try {
			Data data = new ObjectMapper().readValue(request.getParameter("formData"), Data.class);
			SingUpValidator user = new SingUpValidator(data.emailOrNumber, data.fullname, data.username, data.password);
			final String erroMensage = user.isValid();
			PrintWriter out = response.getWriter();
			ObjectMapper mapper = new ObjectMapper();
			createSeasion(request, data);
			out.print(mapper.writeValueAsString(erroMensage));
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	private void createSeasion(HttpServletRequest request, Data formData) {
		HttpSession session = request.getSession();
		session.setAttribute("FirstFormSingupData", formData);
	}
}
