//Cube Sub-Systems ECN ecoin miner utility
//Proprietry and can only be used as per MIT License

var g_Wallet = new ecnWallet();

var ecn_walletadr_prefix = [];
var ecn_walletadr_address = [];
var ecn_walletadr_masterkey = [];

var username = "osirem";

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

var ecn_cookiehash = getCookie("ecn_cookiehash");
var ecn_adrcnt = getCookie("ecn_adrcnt");

if(ecn_cookiehash == "")
	{
	var f_InputToHash = "";
	var hash = sha256.create();
	
	f_InputToHash += username;
	f_InputToHash += getip;
	
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
			ecn_walletadr_prefix[f_i - 1] = getCookie("ecn_walletadr_prefix" + f_i);
			ecn_walletadr_address[f_i - 1] = getCookie("ecn_walletadr_address" + f_i);
			ecn_walletadr_masterkey[f_i - 1] = getCookie("ecn_walletadr_masterkey" + f_i);
			const f_Key = bitcoin.ECPair.fromWIF(ecn_walletadr_masterkey[f_i - 1]);
			
			g_Wallet.addKey(f_Key, ecn_walletadr_address[f_i - 1], ecn_walletadr_prefix[f_i - 1]);
			}
		}
	else
		{
		for(var f_i = 1; f_i <= ecn_adrcnt; f_i++)
			{
			ecn_walletadr_prefix[f_i - 1] = getCookie("ecn_walletadr_prefix" + f_i);
			ecn_walletadr_address[f_i - 1] = getCookie("ecn_walletadr_address" + f_i);
			ecn_walletadr_masterkey[f_i - 1] = getCookie("ecn_walletadr_masterkey" + f_i);
			
			const f_Key = bitcoin.ECPair.fromWIF(ecn_walletadr_masterkey[f_i - 1]);
			
			g_Wallet.addKey(f_Key, ecn_walletadr_address[f_i - 1], ecn_walletadr_prefix[f_i - 1]);
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
	
	$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id, keyadr, keymas FROM multiwallet WHERE owner = '" + ecn_walletadr_address[0] + "' AND status >= 0"}, function(data, status)
		{
		var resp = data;
		var resultcount = resp.resultcount;
		console.log(JSON.stringify(resp));
		
		console.log("ECN::Linked ADR FROM multiwallet ::: resultcount = " + resultcount);
		
		if(resultcount == 1)
			{			
			var f_MultiWalletID = resp.result[0];
			var f_Multikeyadr = resp.result[1];
			var f_Multikeymas = resp.result[2];
			
			ecn_walletadr_prefix[ecn_adrcnt] = 1;
			ecn_walletadr_address[ecn_adrcnt] = f_Multikeyadr;
			ecn_walletadr_masterkey[ecn_adrcnt] = f_Multikeymas;
			
			if(f_Multikeymas != "withheld")
				{
				const f_Key = bitcoin.ECPair.fromWIF(ecn_walletadr_masterkey[ecn_adrcnt]);
			
				g_Wallet.addKey(f_Key, ecn_walletadr_address[ecn_adrcnt], ecn_walletadr_prefix[ecn_adrcnt]);
				}
			
			ecn_adrcnt++;
			}
		else if(resultcount > 1)
			{
			console.log("ECN::Links");
			
			for(var f_Jet = 0; f_Jet < resultcount; f_Jet++)
				{
				var f_MultiWalletID = resp.result[f_Jet].id;
				var f_Multikeyadr = resp.result[f_Jet].keyadr;
				var f_Multikeymas = resp.result[f_Jet].keymas;
				
				ecn_walletadr_prefix[ecn_adrcnt] = 1;
				ecn_walletadr_address[ecn_adrcnt] = f_Multikeyadr;
				ecn_walletadr_masterkey[ecn_adrcnt] = f_Multikeymas;
				
				if(f_Multikeymas != "withheld")
					{
					const f_Key = bitcoin.ECPair.fromWIF(ecn_walletadr_masterkey[ecn_adrcnt]);
				
					g_Wallet.addKey(f_Key, ecn_walletadr_address[ecn_adrcnt], ecn_walletadr_prefix[ecn_adrcnt]);
					}
				
				ecn_adrcnt++;
				}
			}
		else
			{
			console.log("ECN::NoLinks");
			}
			
		g_Wallet.Update();

		console.log("ECN:::WALLET ADDRESS: " + g_Wallet.GetAdr());
		}, "json");
	}