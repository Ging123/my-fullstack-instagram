package com.instagramServlets;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.instagramServlets.ValidadeFormSingUpServlet.Data;
import com.registerUser.DateValidator;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

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
			System.out.println(date.validate());
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}
}
