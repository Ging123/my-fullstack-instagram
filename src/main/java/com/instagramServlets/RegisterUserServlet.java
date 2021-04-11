package com.instagramServlets;

import com.database.MySql;
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
			Data data = (Data) session.getAttribute("FirstFormSingupData");
			DateTyped birthDayData = (DateTyped) session.getAttribute("secondFormularySingup");
			final String birthDay = "'" + birthDayData.year + "-" + birthDayData.month + "-" + birthDayData.day + "'";
			MySql mysql = new MySql();
			mysql.insert(birthDay, data.emailOrNumber, data.fullname, data.username, data.password);
			session.invalidate();
		}
	}
}
