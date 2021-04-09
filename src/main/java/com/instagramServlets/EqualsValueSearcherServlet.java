package com.instagramServlets;

import java.io.IOException; 
import java.io.PrintWriter;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.database.MySql;

public class EqualsValueSearcherServlet extends HttpServlet {
	
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    MySql sql = new MySql();
    final boolean result = sql.hasEqualValue(request.getParameter("input"), request.getParameter("sqlColumn"));
    PrintWriter out = response.getWriter();
    ObjectMapper mapper = new ObjectMapper();
    out.print(mapper.writeValueAsString(result));
    out.flush();
    out.close();
  }
}
