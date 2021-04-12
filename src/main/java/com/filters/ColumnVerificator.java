package com.filters;

import java.io.IOException;
import java.io.PrintWriter;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;

@WebFilter("/searchForEquals")
public class ColumnVerificator implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		final String[] validColumns = {"number_or_email", "fullName", "username", "userpassword", "birthday"};
		final String columnSended = request.getParameter("sqlColumn");
		for(int i = 0; i < validColumns.length; i++) {
			if(validColumns[i].equals(columnSended)) {
				chain.doFilter(request, response);
				return;
			}
		}
		ObjectMapper mapper = new ObjectMapper();
		PrintWriter out = response.getWriter();
		out.print(mapper.writeValueAsString("an erro was found sending the request"));
		out.flush();
		out.close();
	}
}
