package com.instagramServlets;

import com.instagramServlets.ValidadeFormSingUpServlet.Data;
import com.instagramServlets.validateDateSingup.DateTyped;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet; 
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/registerUserInDb")
public class RegisterUserServlet extends HttpServlet {
	
	public void doPost(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession(false);
		if(session != null) {
			Data firstFormData = (Data) session.getAttribute("FirstFormSingupData");
			DateTyped birthDayData = (DateTyped) session.getAttribute("secondFormularySingup");
			
			session.invalidate();
		}
	}
}
