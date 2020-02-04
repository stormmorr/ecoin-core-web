/*

Wallet.js - osirem.com
Copyright OSIREM LTD (C) 2016
www.osirem.com www.qage.org www.geopomp.com

This source is proprietary, and cannot be used, in part or in full without
the express permission of the original author. The original author retain the
rights to use, modify, and/or relicense this code without notice.

*/

var g_EVALUE = 0.0;
var g_UpdateFinger = 0;
var g_TX = 5.09000015;

var g_WalletPopFeeder = new fillPopulusFeeder(1);
var g_WBlocker = 0;

function ecnWallet()
{
	this.m_vec_Key = [];
	this.m_idx_vec_Key = 0;
	
	this.m_vec_Adr = [];
	this.m_idx_vec_Adr = 0;
	
	this.m_vec_Prefix = [];
	this.m_idx_vec_Prefix = 0;
	
	this.m_EVALUE = 1.0;
	this.m_Price = 0.0;
	this.m_Unit = 0.0;
	this.m_TX = 0;

	this.m_Circulationamt = 0;
	
	this.m_Bank_ecoin = 0.0;
	
	this.m_Start = false;
	this.m_OK = false;
	
	this.m_ChangeIdx = 0;
	
	this.m_RefreshLVL = 2;
	this.m_RefreshCNT = 0;
	
	this.m_Bank_Adr = "";
	
	this.m_hdid = "eCookieHash1234";
	
	this.m_Open = false;
	this.m_CloudKeys = false;
	
	this.m_MinerAuthority = "";
	this.m_MinerAuthorityOn = false;
}

ecnWallet.prototype.newAddress = function (f_Prefix)
{
	const keyPair = bitcoin.ECPair.makeRandom();
	const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
	
	this.m_vec_Prefix[this.m_idx_vec_Prefix] = f_Prefix;
	this.m_idx_vec_Prefix++;
	this.m_vec_Adr[this.m_idx_vec_Adr] = address;
	this.m_idx_vec_Adr++;
	this.m_vec_Key[this.m_idx_vec_Key] = keyPair;
	this.m_idx_vec_Key++;
	
	if(f_Prefix == 1)
		{
		this.m_Bank_Adr = address;
		}
  
	return address;
}

ecnWallet.prototype.addKey = function (f_Key, f_Address, f_Prefix)
{
	this.m_vec_Prefix[this.m_idx_vec_Prefix] = f_Prefix;
	this.m_idx_vec_Prefix++;
	this.m_vec_Adr[this.m_idx_vec_Adr] = f_Address;
	this.m_idx_vec_Adr++;
	this.m_vec_Key[this.m_idx_vec_Key] = f_Key;
	this.m_idx_vec_Key++;
}

ecnWallet.prototype.addAddress = function (f_Address, f_LVL)
{
	this.m_vec_Adr[this.m_idx_vec_Adr] = f_Address;
	this.m_idx_vec_Adr++;
	
	if(f_LVL == 5)
		{
		this.m_Bank_Adr = f_Address;
		}
}

function ag_Key_Serialize(f_key)
{
	  /////////
	 // Pass
	//
	var f_Result = "";

	f_Result += f_key.__d + "::::";

	f_Result += f_key.__Q + "::::";

	return f_Result;
}

ecnWallet.prototype.Prepare = function ()
{
	var f_Result = "";
	
	f_Result += this.m_Bank_ecoin + "::::";
	f_Result += "0::::";
	f_Result += this.m_ChangeIdx + "::::";
	f_Result += this.m_idx_vec_Adr + "::::";
	
	for(var f_m = 0; f_m < this.m_idx_vec_Adr; f_m++)
		{
		f_Result = f_Result + this.m_vec_Prefix[f_m] + "::::";
		f_Result = f_Result + this.m_vec_Adr[f_m] + "::::";
		}
	
	for(var f_m = 0; f_m < this.m_idx_vec_Key; f_m++)
		{
		f_Result = f_Result + ag_Key_Serialize(this.m_vec_Key[f_m]);
		}

	return f_Result;
}

ecnWallet.prototype.Prepare_Start = function ()
{
	var f_Result = "";
	f_Result += "0.0::::";
	f_Result += "0::::";
	f_Result += "0::::";
	f_Result += "5::::";
	
	var f_Adr1f = this.newAddress(1)
	
	f_Result = f_Result + "1::::"
	
	f_Result = f_Result + f_Adr1f + "::::"
	
	this.m_Bank_Adr = f_Adr1f
	
	for(var f_m = 0; f_m < 4; f_m++)
		{
		f_Result = f_Result + "2::::"
		
		var f_Adre = this.newAddress(2)
		
		f_Result = f_Result + f_Adre + "::::"
		}
	
	for(var f_m = 0; f_m < this.m_idx_vec_Key; f_m++)
		{
		f_Result = f_Result + ag_Key_Serialize(this.m_vec_Key[f_m]);
		}

	this.m_Bank_ecoin = 0.0;

	return f_Result;
}

ecnWallet.prototype.Update = function ()
{	
	for(var f_x = 0; f_x < this.m_idx_vec_Key; f_x++)
		{
		var g_adrfield = [];
		g_adrfield[0] = "assetid";
		g_adrfield[1] = "assetofficeid";
		g_adrfield[2] = "owner";
		g_adrfield[3] = "amt";
		
		var g_adrvalue = [];
		g_adrvalue[0] = "1";
		g_adrvalue[1] = "3";
		g_adrvalue[2] = this.m_vec_Adr[f_x];
		g_adrvalue[3] = "0.0";
		
		var f_Resulttxadr = "";
		for(var f_i = 0; f_i < 4; f_i++)
			{
			f_Resulttxadr += g_adrfield[f_i] + "::::";
			f_Resulttxadr += g_adrvalue[f_i] + "::::";
			}

		var f_Query = "SELECT id FROM address WHERE owner = '" + this.m_vec_Adr[f_x] + "'";

		$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-insert.php", {type: "GWQ_INSERT", table: "address", count: 4, string: f_Resulttxadr, typeC: "GWQ_SELECT", queryC: f_Query, adr: this.m_vec_Adr[f_x]}, function(data, status) {}, "json");
		}
	
	var f_Owner = document.getElementById("owner");
	if(f_Owner != null)
		{
		f_Owner.innerHTML = this.GetAdr();
		}

	ag_GetBalance(true, function(f_Balance)
		{
		var f_PoundBalance = document.getElementById("poundsbalance");
		
		if(f_PoundBalance != null)
			{
			f_PoundBalance.innerHTML = f_Balance;
			}
			
		var f_OwnerBalance = document.getElementById("ownerbalance");
		
		if(f_OwnerBalance != null)
			{
			f_OwnerBalance.innerHTML = g_Wallet.m_Bank_ecoin;
			}
		});
}

function mysqlTimeStampToDate(timestamp)
{
    //function parses mysql datetime string and returns javascript Date object
    //input has to be in this format: 2010-09-24 11:30:12
    var regex=/^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9]) (?:([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
    var parts=timestamp.replace(regex,"$1 $2 $3 $4 $5 $6").split(' ');
    return new Date(parts[0],parts[1]-1,parts[2],parts[3],parts[4],parts[5]);
}

function ag_GetEValue(callback)
{
	var f_Circulationamt = 0.0;
	
	$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT price, tx, unit, visits, datet FROM coin WHERE assetofficeid = 3"}, function(data, status)
		{
		var resp = data;
		var result = resp.result;
		var resultcount = resp.resultcount;
	
		if(resultcount == 1)
			{
			g_Wallet.m_EVALUE = result[0];
			g_Wallet.m_Price = g_Wallet.m_EVALUE;
			
			g_Wallet.m_TX = result[1];
			g_Wallet.m_Unit = result[2];
			
			var f_DateTime = result[4];
			
			console.log("ECN::Stat::DB::ecnWallet.m_Price = " + g_Wallet.m_Price + " m_TX = " + g_Wallet.m_TX + " g_TX = " + g_TX);
			
			//var timet = (new Date()).getTime() + 1000;

			var f_Visits = parseInt(result[3]);
			
			g_EVALUE = g_Wallet.m_EVALUE;

				 //////////////
				//START COIN// mebbe inc softened calc (jobid) instead later on
			   //
			  // Equation
			 // Storage Wealth
			// Value/Worth
			var f_Now = new Date().getTime();
			
			//f_until += 60000 * 60 * 5;
			
			f_DateTime = parseInt(f_DateTime) + 11000;
			
			console.log("f_DateTime = " + f_DateTime + " f_Now = " + f_Now);
			
			if(f_Now > f_DateTime)
				{
				$.post("http://www.bitcoin-office.com/link-request-getamt-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT amt FROM address"}, function(data, status)
					{
					var response = data;
					var amtresult = response.ciramt;
					
					g_Wallet.m_Circulationamt = amtresult;
					
					$.post("http://www.bitcoin-office.com/link-request-getamt-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT amt FROM transactions"}, function(data, status)
						{
						var response = data;
						var amttxresult = response.ciramt;
						
						g_TX = amttxresult;

							 //////////////
							//START COIN// Note always calculates mebbe inc softened calc instead later on
						   //
						  // Equation
						 // Storage Wealth
						// Value/Worth
						if((g_Wallet.m_Price <= 0.0) || (g_TX != g_Wallet.m_TX) || true)
							{
							var f_StorageWealth = 50.0;
							
							g_Wallet.m_TX = g_TX;
							
							g_Wallet.m_Price = (parseFloat(f_StorageWealth) + parseFloat(g_Wallet.m_TX)) / parseFloat(g_Wallet.m_Circulationamt);
							
							g_EVALUE = g_Wallet.m_Price;
							console.log("------------- g_Wallet.m_Price = " + g_Wallet.m_Price);
							}

						console.log("ECN::Stat::Calc::g_Wallet.m_Price = " + g_Wallet.m_Price + " g_Wallet.m_TX = " + g_Wallet.m_TX + "g_TX = " + g_TX);

						var f_coinupvalue = [];
						var f_coinupfield = [];

						f_coinupfield[0] = "price";
						f_coinupfield[1] = "tx";
						f_coinupfield[2] = "unit";
						f_coinupfield[3] = "visits";
						f_coinupfield[4] = "datet";
						
						f_coinupvalue[0] = g_Wallet.m_Price;
						f_coinupvalue[1] = g_Wallet.m_TX;
						f_coinupvalue[2] = g_Wallet.m_Unit;
						f_coinupvalue[3] = f_Visits + 1;
						f_coinupvalue[4] = new Date().getTime();
						
						var f_ResultcoinUP = "";
						for(var f_i = 0; f_i < 5; f_i++)
							{
							f_ResultcoinUP += f_coinupfield[f_i] + "::::";
							f_ResultcoinUP += f_coinupvalue[f_i] + "::::";
							}

						$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-update.php", {type: "GWQ_UPDATE", table: "coin", count: 5, string: f_ResultcoinUP, id: 1}, function(data, status)
							{
							callback(g_Wallet.m_Price);
							}, "json");
						}, "json");
					}, "json");
				}
			else
				{
				var f_coinupvalue = [];
				var f_coinupfield = [];

				f_coinupfield[0] = "price";
				f_coinupfield[1] = "tx";
				f_coinupfield[2] = "unit";
				f_coinupfield[3] = "visits";
				f_coinupfield[4] = "datet";
				
				f_coinupvalue[0] = g_Wallet.m_Price;
				f_coinupvalue[1] = g_Wallet.m_TX;
				f_coinupvalue[2] = g_Wallet.m_Unit;
				f_coinupvalue[3] = f_Visits + 1;
				f_coinupvalue[4] = new Date().getTime();
				
				var f_ResultcoinUP = "";
				for(var f_i = 0; f_i < 5; f_i++)
					{
					f_ResultcoinUP += f_coinupfield[f_i] + "::::";
					f_ResultcoinUP += f_coinupvalue[f_i] + "::::";
					}

				$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-update.php", {type: "GWQ_UPDATE", table: "coin", count: 5, string: f_ResultcoinUP, id: 1}, function(data, status)
					{
					callback(g_Wallet.m_Price);
					}, "json");
				}
			}
		}, "json");
		
	//Execution -falls through
}

ecnWallet.prototype.GetEValue = function(callback)
{
	ag_GetEValue(function(f_Price)
		{
		callback(f_Price);
		});
		
	//Execution -falls through
}

  ////////////////////
 // Balance Combi
//
function ag_GetBalance(f_InPoundsSterling, callback)
{	
	g_Wallet.m_Bank_ecoin = 0.0;
	
	g_WBlocker = 1;
	
	g_WalletPopFeeder = new fillPopulusFeeder(ecn_adrcnt);
	
	for(var f_Helly = 0; f_Helly < ecn_adrcnt; f_Helly++)
		{
		if(ecn_walletadr_prefix[f_Helly] == 1)
			{
			$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast-block.php", {type: "GWQ_SELECT", query: "SELECT amt FROM address WHERE owner = '" + ecn_walletadr_address[f_Helly] + "'", block: f_Helly}, function(data, status)
				{
				var response = data;
				var balresult = response.result;
				var balresultcount = response.resultcount;
				var f_Block = response.block;

				if(balresultcount == 1)
					{
					g_Wallet.m_Bank_ecoin += parseFloat(balresult[0]);
					}
				
				g_WalletPopFeeder.acFeed(f_Block);
				
				if((g_WalletPopFeeder.acCheckEmpty() == true) && (g_WBlocker == 1))
					{
					g_WBlocker = 0;
					
					if(f_InPoundsSterling)
						{
						ag_GetEValue(function(f_Price) 
							{
							var f_Balance = parseFloat(g_Wallet.m_Bank_ecoin) * parseFloat(f_Price);
						
							f_Balance = parseFloat(f_Balance).toFixed(2);
							
							callback(f_Balance);
							}, g_Wallet);
						}
					else
						{
						callback(g_Wallet.m_Bank_ecoin);
						}
					callback(0.0);
					}
				}, "json");
			}
		else
			{
			g_WalletPopFeeder.acFeed(f_Helly);
				
			if((g_WalletPopFeeder.acCheckEmpty() == true) && (g_WBlocker == 1))
				{
				g_WBlocker = 0;
				
				if(f_InPoundsSterling)
					{
					g_Wallet.GetEValue(function(f_Price) 
						{
						var f_Balance = parseFloat(g_Wallet.m_Bank_ecoin) * parseFloat(f_Price);
					
						f_Balance = parseFloat(f_Balance).toFixed(2);
					
						callback(f_Balance);
						});
					}
				else
					{
					callback(g_Wallet.m_Bank_ecoin);
					}
				}
			}
		}
}

ecnWallet.prototype.GetNextChangeKey = function ()
{
	this.m_ChangeIdx++;
	
	this.Update();

	if(this.m_vec_Prefix[this.m_ChangeIdx] == 2)
		{
		var f_Key = this.m_vec_Key[this.m_ChangeIdx]
		}

	return f_Key;
}

ecnWallet.prototype.GetNextChangeAdr = function ()
{
	this.m_ChangeIdx++;
	
	this.Update();

	if(this.m_vec_Prefix[this.m_ChangeIdx] == 2)
		{
		var f_Adr = this.m_vec_Adr[this.m_ChangeIdx]
		}

	return f_Adr;
}

ecnWallet.prototype.GetNextChangeIdx = function ()
{
	while(this.m_vec_Prefix[this.m_ChangeIdx] != 2)
		{
		this.m_ChangeIdx++;
		
		if(this.m_ChangeIdx > this.m_idx_vec_Adr)
			{
			this.m_ChangeIdx = 0;
			}
		}

	return this.m_ChangeIdx;
}

ecnWallet.prototype.acFindChangeAdr = function (f_Adr)
{
	for(var f_helly = 0; f_helly < this.m_idx_vec_Adr; f_helly++)
		{
		if(this.m_vec_Prefix[f_helly] == 2)
			{
			if(this.m_vec_Adr[f_helly] == f_Adr)
				{
				return true;
				}
			}
		}

	return false;
}

ecnWallet.prototype.GetAdr = function ()
{
	if(this.m_MinerAuthorityOn == false || !this.m_MinerAuthority)
		{
		var f_Int = 0;
		while(this.m_vec_Prefix[f_Int] >= 2)
			{
			f_Int++;
			}
			
		return this.m_vec_Adr[f_Int];
		}
	else
		{
		return this.m_MinerAuthority;
		}
}

ecnWallet.prototype.SetAuthority = function (f_AuthorityAddress)
{
	this.m_MinerAuthority = f_AuthorityAddress;
	this.m_MinerAuthorityOn = true;
}