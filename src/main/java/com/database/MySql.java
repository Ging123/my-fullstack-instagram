package com.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class MySql {
	
  private final String dbUrl = "jdbc:mysql://localhost:3306/instagram";
  private final String driver = "com.mysql.cj.jdbc.Driver";
	
	
  public boolean hasEqualValue(final String value, final String column) {
    final String query = "select " + column + " from instagram_users where " + column + " = " + value;
    try {
      Class.forName(driver);
      Connection con = DriverManager.getConnection(dbUrl, "root", "root");
      Statement st = con.createStatement();
      ResultSet rs = st.executeQuery(query);
      if(rs != null && rs.next()) {
        return true;
      }
      return false;
    } catch (ClassNotFoundException | SQLException e) {
	    e.printStackTrace();
    	return false;
    }	
  }
  
  
  public void insert(String userBirthDay, String... userData) {
  	final String allColumns = " (number_or_email, fullName, username, userpassword, birthday) ";
  	final String values = generateValuesValid(userBirthDay, userData);
  	final String query = "insert into instagram_users" + allColumns + values;
  	try {
			Class.forName(driver);
			Connection con = DriverManager.getConnection(dbUrl, "root", "root");
			Statement st = con.createStatement();
			st.execute(query);
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
  	
  }
  
  
  private String generateValuesValid(String userBirthDay, String[] values) {
  	ObjectMapper mapper = new ObjectMapper();
  	String allValues = "";
  	try {
  		for(int i = 0; i < values.length; i++) {
  			values[i] = mapper.writeValueAsString(values[i]) + ",";
  			allValues += values[i];
  		}
  	} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
  	return "values (" + allValues + userBirthDay + ")";
  }
}
