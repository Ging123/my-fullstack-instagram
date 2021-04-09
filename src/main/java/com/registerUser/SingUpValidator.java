package com.registerUser;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.database.MySql;

public class SingUpValidator {
	
	
	private String emailOrNumber;
	private String fullname;
	private String username;
	private String password;
	
	public SingUpValidator(String emailOrNumber, String fullname, String username, String password ) {
		this.emailOrNumber = emailOrNumber;
		this.fullname = fullname;
		this.username = username;
		this.password = password;
	}
	
	
	public String isValid() {
		final String erroMensageOfEmailOrNumberTyped = validateEmailOrNumber();
		final String erroMensageOffullname = validateFullname();
		final String erroMensageOfUsername = validateUsername();
		final String erroMensageOfPassword = validatePassword();
		if(erroMensageOfEmailOrNumberTyped != "") {
			return erroMensageOfEmailOrNumberTyped;
		}		
		if(erroMensageOffullname != "") {
			return erroMensageOffullname;
		}
		if(erroMensageOfUsername != "") {
			return erroMensageOfUsername;
		}
		if(erroMensageOfPassword != "") {
			return erroMensageOfPassword;
		}
		return "";
	}
	
	
	private String validateEmailOrNumber() {
		if(emailOrNumber.length() <= 45) {
			final boolean isAValidEmail = validateWithRegex(emailOrNumber, "^\\w{1,}@{1}(outlook|hotmail|gmail).com{1}$");
			final boolean isAValidNumber = validateWithRegex(emailOrNumber, "^\\d{8}$");
			if(isAValidEmail || isAValidNumber) {
				return searchTheInputInDataBase("number_or_email", "email or number", emailOrNumber);
			}
			return "the email or number typed is invalid";
		}
		return  "invalid email or number size";
	}
	
	
	private String validateFullname() {
		if(fullname.length() <= 45 && fullname.length() > 2 && fullname != "") {
			final boolean isAInValidFullName = validateWithRegex(fullname, "\\d+");
			if(!isAInValidFullName) {
				return "";
			}
			return "the username typed is invalid";
		}
		return  "invalid full name size";
	}
	
	
	private String validateUsername() {
		if(username.length() <= 45 && username != "") {
			return searchTheInputInDataBase("username" , "username", username);
		}
		return "invalid username size";
	}
	
	
	private String validatePassword() {
		if(password.length() > 6) {
			return "";
		}
		return "invalid password size";
	}
	
	
	private boolean validateWithRegex(final String input, final String regex) {
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(input);
		if(m.find()) {
		  return true;
		}
		return false;
		}
	
	
	private String searchTheInputInDataBase(final String column, final String whatDoYouAreSearching, final String input) {
		MySql sql = new MySql();
		if(sql.hasEqualValue("'" + input + "'", column)) {
			return "this " + whatDoYouAreSearching  + " already exist";
		}
		return "";
	}
}
