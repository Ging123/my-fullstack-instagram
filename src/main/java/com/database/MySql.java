package com.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

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
}
