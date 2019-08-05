/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////---==={{{[[[\\\_BOSS Date Selecting Utility Javascript For LEAHBOSS_///]]]}}}===--- ///////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/* LEAHCAKEBOSS Sub-Systems (c) Copyright OSIREM LTD 2015
    BOSS date-time.js
    Copyright OSIREM (C) 2015
	www.osirem.com

	This source is proprietary, and cannot be used, in part or in full without
	the express permission of the original author. The original author retain
	the rights to use, modify, and/or relicense this code without notice.
*/

function getdtDay(index)
{
	var result = "";
	if(index == 0) result = "Sun";
	if(index == 1) result = "Mon";
	if(index == 2) result = "Teus";
	if(index == 3) result = "Wed";
	if(index == 4) result = "Thur";
	if(index == 5) result = "Fri";
	if(index == 6) result = "Sat";
	
	return result;
}

function getdtMonth(index)
{
	var result = "";
	if(index == 0) result = "January";
	if(index == 1) result = "Febuary";
	if(index == 2) result = "March";
	if(index == 3) result = "April";
	if(index == 4) result = "May";
	if(index == 5) result = "June";
	if(index == 6) result = "July";
	if(index == 7) result = "August";
	if(index == 8) result = "September";
	if(index == 9) result = "October";
	if(index == 10) result = "November";
	if(index == 11) result = "December";
	
	return result;
}

function getdtMon(index)
{
	var result = "";
	if(index == 0) result = "Jan";
	if(index == 1) result = "Feb";
	if(index == 2) result = "Mar";
	if(index == 3) result = "Apr";
	if(index == 4) result = "May";
	if(index == 5) result = "June";
	if(index == 6) result = "July";
	if(index == 7) result = "Aug";
	if(index == 8) result = "Sep";
	if(index == 9) result = "Oct";
	if(index == 10) result = "Nov";
	if(index == 11) result = "Dec";
	
	return result;
}

function getdtMonthLength(index)
{
	var result = 0;
	if(index == 0) result = 31;
	if(index == 1) result = 28;
	if(index == 2) result = 31;
	if(index == 3) result = 30;
	if(index == 4) result = 31;
	if(index == 5) result = 30;
	if(index == 6) result = 31;
	if(index == 7) result = 31;
	if(index == 8) result = 30;
	if(index == 9) result = 31;
	if(index == 10) result = 30;
	if(index == 11) result = 31;
	
	return result;
}

function getdtNumDays(daysBefore)
{
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth(); //January is 0!
	var yyyy = today.getFullYear();
	var days = daysBefore;
	
	while(days > 0)
		{
		if(days >= dd)
			{
			days = days - dd;
			
			mm = mm - 1;
			if(mm < 0)
				{
				yyyy = yyyy - 1;
				mm = 12 - mm;
				}
				
			dd = getdtMonthLength(mm);
			}
		else
			{
			dd = dd - days;
			days = 0;
			}
		}
		
	var date = new Date();
	date.setDate(date.getDate() - daysBefore);
	var day = date.getDay();
	var dayofdate = getdtDay(day);

	var results = [];
	results[0] = dd;
	results[1] = dayofdate;

	return results;
}

function getdtNumDaysMon(daysBefore)
{
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth(); //January is 0!
	var yyyy = today.getFullYear();
	var days = daysBefore;
	
	while(days > 0)
		{
		if(days >= dd)
			{
			days = days - dd;
			
			mm = mm - 1;
			if(mm < 0)
				{
				yyyy = yyyy - 1;
				mm = 12 - mm;
				}
				
			dd = getdtMonthLength(mm);
			}
		else
			{
			dd = dd - days;
			days = 0;
			}
		}
		
	var date = new Date();
	date.setDate(date.getDate() - daysBefore);
	var month = date.getMonth();
	var monthofdate = getdtMon(month);

	var results = [];
	results[0] = dd;
	results[1] = monthofdate;

	return results;
}