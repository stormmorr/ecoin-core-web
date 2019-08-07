//Cube Sub-Systems ECN ecoin miner utility
//Proprietry and can only be used as per MIT License

var g_Wallet = new ecnWallet();

var ecn_walletadr_prefix = [];
var ecn_walletadr_address = [];
var ecn_walletadr_masterkey = [];

var username = "osirem";
var g_IP = "192.168.0.11";

function hextoBase64(f_Hex)
{
	var hexArray = f_Hex
		.replace(/\r|\n/g, "")
		.replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
		.replace(/ +$/, "")
		.split(" ");
	var byteString = String.fromCharCode.apply(null, hexArray);
	var base64string = window.btoa(byteString);
	return base64string;
}

function result_error(err)
{
	console.log("ECN-Error result to wallet error: " + JSON.stringify(err));
}

function makeBaseAuth(user, pswd)
{ 
	var token = user + ':' + pswd;
	var hash = "";
	if(btoa)
		{
		hash = btoa(token);
		}
	return "Basic " + hash;
}

var auth = makeBaseAuth('root','osiPROP37');
var url = 'http://www.bitcoin-office.com/tracking/login.php?username=root&password=osiPROP37';
var url2 = 'http://www.bitcoin-office.com/tracking/result.php?username=root&password=osiPROP37';

$.ajax({
	url : url,
	method: 'GET',
	xhrFields: { withCredentials: true },
	dataType: 'text',
	//beforeSend : function(req)
	//	{
    //    req.setRequestHeader('Authorization', 'Basic cm9vdDpvc2lQUk9QMzc=');
	//	},
    crossDomain: true,
    success: login_success,
	error: login_success
	});

function login_success(err)
{
	console.log("ECN-logged in with Credentials:(err):" + JSON.stringify(err));
	
	$.ajax({
		url : url2,
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'text',
		//beforeSend : function(req)
		//	{
		//	req.setRequestHeader('Authorization', 'Basic cm9vdDpvc2lQUk9QMzc=');
		//	},
		crossDomain: true,
		success: result_success,
		error: result_error
		});
}

function login_error(err)
{
	console.log("ECN-error continuing with Credentials:(err):" + JSON.stringify(err));
	
	$.ajax({
		url : url2,
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'text',
		//beforeSend : function(req)
		//	{
		//	req.setRequestHeader('Authorization', 'Basic cm9vdDpvc2lQUk9QMzc=');
		//	},
		crossDomain: true,
		success: result_success,
		error: result_error
		});
}

function result_success(data, status)
{
	var ecn_cookiehash = getCookie("ecn_cookiehash");
	var ecn_adrcnt = getCookie("ecn_adrcnt");
		
	if(ecn_cookiehash == "")
		{
		var f_InputToHash = "";
		var hash = sha256.create();
		
		f_InputToHash += username;
		f_InputToHash += g_IP;
		
		hash.update(f_InputToHash);
		var f_hash = hash.hex();
		
		ecn_cookiehash = hextoBase64(f_hash);
		
		setCookie("ecn_cookiehash", ecn_cookiehash, 2500);
		}
		
	g_Wallet.m_hdid = ecn_cookiehash;

	if(ecn_adrcnt == "")
		{
		var f_adrmain = g_Wallet.newAddress(1);
		
		setCookie("ecn_walletadr_prefix1", "1", 2500);
		setCookie("ecn_walletadr_address1", f_adrmain, 2500);
		setCookie("ecn_walletadr_masterkey1", g_Wallet.m_vec_Key[g_Wallet.m_idx_vec_Key - 1].toWIF(), 2500);
		
		var f_adrchange1 = g_Wallet.newAddress(2);
		
		setCookie("ecn_walletadr_prefix2", "2", 2500);
		setCookie("ecn_walletadr_address2", f_adrchange1, 2500);
		setCookie("ecn_walletadr_masterkey2", g_Wallet.m_vec_Key[g_Wallet.m_idx_vec_Key - 1].toWIF(), 2500);
		
		var f_adrchange2 = g_Wallet.newAddress(2);
		
		setCookie("ecn_walletadr_prefix3", "2", 2500);
		setCookie("ecn_walletadr_address3", f_adrchange2, 2500);
		setCookie("ecn_walletadr_masterkey3", g_Wallet.m_vec_Key[g_Wallet.m_idx_vec_Key - 1].toWIF(), 2500);
		
		var f_adrchange3 = g_Wallet.newAddress(2);
		
		setCookie("ecn_walletadr_prefix4", "2", 2500);
		setCookie("ecn_walletadr_address4", f_adrchange3, 2500);
		setCookie("ecn_walletadr_masterkey4", g_Wallet.m_vec_Key[g_Wallet.m_idx_vec_Key - 1].toWIF(), 2500);
		
		var f_adrchange4 = g_Wallet.newAddress(2);
		
		setCookie("ecn_walletadr_prefix5", "2", 2500);
		setCookie("ecn_walletadr_address5", f_adrchange4, 2500);
		setCookie("ecn_walletadr_masterkey5", g_Wallet.m_vec_Key[g_Wallet.m_idx_vec_Key - 1].toWIF(), 2500);

		ecn_adrcnt = 5;
		setCookie("ecn_adrcnt", ecn_adrcnt, 2500);
		}
	else
		{
		if(ecn_adrcnt >= 5)
			{
			for(var f_i = 1; f_i <= ecn_adrcnt; f_i++)
				{
				ecn_walletadr_prefix = getCookie("ecn_walletadr_prefix" + f_i);
				ecn_walletadr_address = getCookie("ecn_walletadr_address" + f_i);
				ecn_walletadr_masterkey = getCookie("ecn_walletadr_masterkey" + f_i);
				const f_Key = bitcoin.ECPair.fromWIF(ecn_walletadr_masterkey);
				
				g_Wallet.addKey(f_Key, ecn_walletadr_address, ecn_walletadr_prefix);
				console.log("masterkey: " + ecn_walletadr_masterkey);
				console.log("address: " + ecn_walletadr_address);
				}
			}
		else
			{
			for(var f_i = 1; f_i <= ecn_adrcnt; f_i++)
				{
				ecn_walletadr_prefix = getCookie("ecn_walletadr_prefix" + f_i);
				ecn_walletadr_address = getCookie("ecn_walletadr_address" + f_i);
				ecn_walletadr_masterkey = getCookie("ecn_walletadr_masterkey" + f_i);
				
				const f_Key = bitcoin.ECPair.fromWIF(ecn_walletadr_masterkey);
				
				g_Wallet.addKey(f_Key, ecn_walletadr_address, ecn_walletadr_prefix);
				}
				
			for(var f_trl = ecn_adrcnt; f_trl <= 5; f_trl++)
				{
				var f_adrchange = g_Wallet.newAddress(2);
		
				setCookie("ecn_walletadr_prefix" + f_trl, "1", 2500);
				setCookie("ecn_walletadr_address" + f_trl, f_adrchange, 2500);
				setCookie("ecn_walletadr_masterkey" + f_trl, g_Wallet.m_vec_Key[g_Wallet.m_idx_vec_Key - 1].toWIF(), 2500);
				}
				
			ecn_adrcnt = 5;
			setCookie("ecn_adrcnt", ecn_adrcnt, 2500);
			}
		}
		
	$.ajax({
		url : url,
		method: 'GET',
		xhrFields: { withCredentials: true },
		dataType: 'text',
		//beforeSend : function(req)
		//	{
		//    req.setRequestHeader('Authorization', 'Basic cm9vdDpvc2lQUk9QMzc=');
		//	},
		crossDomain: true,
		success: function(err)
			{
			g_Wallet.Update();
			console.log("ECN-save keys success");
			},
		error: function(err)
			{
			console.log("ECN-Failed to save keys");
			},
		});	
}