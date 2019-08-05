//////////////////////////////////////////////////////////////////////////////////////
//////////---==={{{[[[\\\_BOSS Utility Javascript For LEAHBOSS_///]]]}}}===--- ///////////
//////////////////////////////////////////////////////////////////////////////////////////
/* LEAHCAKEBOSS Sub-Systems (c) Copyright OSIREM LTD 2015
    BOSS cookie-utility.js
    Copyright OSIREM (C) 2015
	www.osirem.com

	This source is proprietary, and cannot be used, in part or in full without
	the express permission of the original author. The original author retain
	the rights to use, modify, and/or relicense this code without notice.
*/

function setCookie(cname, cvalue, exdays)
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
		{
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if(c.indexOf(name) == 0) return c.substring(name.length,c.length);
		}
		
    return "";
}

function checkAccountCookie()
{
    var chk_account = getCookie("account1");
	var chk_cnt = getCookie("cnt");
	
    if(chk_account != "")
		{
        if(chk_cnt != "")
			{
			return 1;
			}
		else
			{
			return 0;
			}
		}
	else
		{
        return 0;
		}
}

function checkCookie(cname)
{
    var chk_cookie = getCookie(cname);
	
    if(chk_cookie != "")
		{
        return 1;
		}
	else
		{
        return 0;
		}
}

function insertCampaign(UID, val)
{
	if(val == false)
		{
		var chk_accountcookie = checkAccountCookie();
		
		if(chk_accountcookie == 0)
			{
			if (UID != "" && UID != null)
				{
				setCookie("account1", UID, 2500);
				setCookie("cnt", 1, 2500);
				}
			}
		else
			{
			var string_cnt = getCookie("cnt");
			var cnt = parseInt(string_cnt);
			var account = "account";
			cnt = cnt + 1;
			var new_string_cnt = String(cnt);
			var new_account = account + new_string_cnt;
			
			if (UID != "" && UID != null)
				{
				setCookie(new_account, UID, 2500);
				setCookie("cnt", cnt, 2500);
				}
			}
		}
}

function printViewAccounts()
{
	var chk_account = checkAccountCookie();
	
	if(chk_accounts);
		{
		var cnt = getCookie("cnt");
		
		for(var poke = 0; poke < cnts; poke++)
			{
			var string_poke = String(poke + 1);
			var accountmag = "account" + string_poke;
			var accountcam = "Campaign " + string_poke;
			var acc_str = getCookie(accountmag);

			if(getCookie("current") == acc_str)
				{
				document.write("<li class=\"current\"><a href=\"view-responders.php?argUID=");
				document.write(acc_str);
				document.write("\">");
				document.write(accountcam);
				document.write(" UID ");
				document.write(acc_str);
				document.write("</a></li>");
				}
			else
				{
				document.write("<li><a href=\"view-responders.php?argUID=" + acc_str + "\">" + accountmag + " UID " + acc_str + "</a></li>");
				}
			}
		}
}