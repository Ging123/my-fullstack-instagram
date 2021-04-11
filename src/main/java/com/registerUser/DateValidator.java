package com.registerUser;

import java.time.LocalDate;
import java.time.Year;
import java.util.Calendar;
import java.util.Date;

public class DateValidator {
	
	private int month;
	private int day;
	private int year;
	
	
	public DateValidator(String month, String day, String year) {
	  this.month = Integer.parseInt(month);
		this.day = Integer.parseInt(day);
		this.year = Integer.parseInt(year);
	}
	
	
	public boolean validate() {
		final int minYear = Year.now().getValue() - 13;
		if(this.year < minYear) {
			return true;
		}
		if(this.year == minYear) {
			return validateMonth();
		}
		return false;
	}
	
	
	private boolean validateMonth() {
		LocalDate today = LocalDate.now();
		final int currentMonth = today.getMonthValue();
		if(this.month < currentMonth) {
			return true;
		}
		if(this.month == currentMonth) {
			return validateDay();
		}
		return false;
	}
	
	
	private boolean validateDay() {
		Date today = new Date(); 
		Calendar cal = Calendar.getInstance();
		cal.setTime(today);
		final int currentDay = cal.get(Calendar.DAY_OF_MONTH);
		if(this.day <= currentDay) {
			return true;
		}
		return false;
	}
}
