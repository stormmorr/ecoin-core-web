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
var g_TX = 25.0;

function ecnWallet() {
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
	this.m_Start = false;
	this.m_OK = false;
	this.m_ChangeIdx = 0;
	this.m_RefreshLVL = 2;
	this.m_RefreshEValueLVL = 2;
	this.m_RefreshCNT = 0;
	this.m_RefreshEValueCNT = 4;
	this.m_Bank_egold = 0.0;
	this.m_Bank_Adr = "03b9d9cc4930fcff9cdb3a015a21bf37c48a4dc4734d0d235b429347cb76ae86";
	this.m_hdid = "eCookieHash1234";
	this.m_Open = false;
	this.m_CloudKeys = false;
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

ecnWallet.prototype.acSpend = function (f_egoldspend)
{
	if(f_egoldspend > 0)
		{
		if(this.m_Bank_egold - f_egoldspend >= 0)
			{
			this.m_Bank_egold -= f_egoldspend;

			this.Update();

			return true;
			}
		}

	return false;
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
	f_Result += this.m_Bank_egold + "::::";
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
	f_Result += g_WALLETBANK + "0.0::::";
	f_Result += g_HESHSAVEID + "0::::";
	f_Result += m_Bank_egold + "5000::::";
	f_Result += m_ChangeIdx + "0::::";
	f_Result += m_idx_vec_Adr + "5::::";
	
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
	this.m_Bank_egold = 5000;

	return f_Result;
}

ecnWallet.prototype.Update = function ()
{
	console.log("RES¬this.m_idx_vec_Key = " + this.m_idx_vec_Key);
	
	for(var f_x = 0; f_x < this.m_idx_vec_Key; f_x++)
		{
		console.log("f_x" + f_x);
		console.log("f_adr = " + this.m_vec_Adr[f_x]);
			
		//$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id FROM address WHERE owner = '" + this.m_vec_Adr[f_x] + "'", adr: this.m_vec_Adr[f_x]}, function(data, status)
		//	{
			//var response = data;
			//var resultcount = response.resultcount;
		
			console.log("'R'");
			
			//if(resultcount <= 0)
			//	{
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
				console.log(f_Query);

				$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-insert.php", {type: "GWQ_INSERT", table: "address", count: 4, string: f_Resulttxadr, typeC: "GWQ_SELECT", queryC: f_Query, adr: this.m_vec_Adr[f_x]}, function(data, status)
					{
					var response = data;
					var resultcount = response.resultcount;
					
					console.log("RESP¬" + JSON.stringify(response));
					}, "json");
			//	}
		//	}, 'json');
		}
}

ecnWallet.prototype.GetBalance = function(f_InPoundsSterling, callback)
{
	if(this.m_RefreshLVL > 0)
		{
		this.m_Bank_ecoin = 0.0;

		if(this.m_RefreshLVL > 1)
			{
			//RefreshLVL == 2 rerun the verification
			}
			
		this.m_RefreshLVL = 0;

		$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT amt FROM address WHERE owner = '" + g_Wallet.GetAdr() + "'"}, function(data, status)
			{
			var response = data;
			var balresult = response.result;
			var balresultcount = response.resultcount;

			if(balresultcount == 1)
				{
				this.m_Bank_ecoin = balresult[0];
				g_Bank_ecoin = balresult[0];
			
				if(f_InPoundsSterling)
					{
					this.GetEValue(function(f_Price) 
						{
						var f_Balance = parseFloat(g_Bank_ecoin) * parseFloat(f_Price);
					
						callback(f_Balance);
						});
					}
				else
					{
					callback(this.m_Bank_ecoin);
					}
				}
			else
				{
				callback(0.0);
				}
			}, "json");
		}
	else
		{
		this.m_RefreshCNT++;
		if(this.m_RefreshCNT > 5)
			{
			this.m_RefreshCNT = 0;
			this.m_RefreshLVL = 2;
			}

		g_Bank_ecoin = this.m_Bank_ecoin;
			
		if(f_InPoundsSterling)
			{
			this.GetEValue(function(f_Price)
				{
				var f_Balance = parseFloat(g_Bank_ecoin) * parseFloat(f_Price);
				
				console.log("insidewarm1 f_Price = " + f_Price + " Balance " + f_Balance + " this.m_Bank_ecoin " + g_Bank_ecoin);
				
				callback(f_Balance);
				});
			}
		else
			{
			callback(this.m_Bank_ecoin);
			}
		}
}

ecnWallet.prototype.GetEValue = function(callback)
{
	var f_Circulationamt = 0.0;

	if(this.m_RefreshEValueLVL > 1)
		{
		$.post("http://www.bitcoin-office.com/link-request-getamt-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT amt FROM address"}, function(data, status)
			{
			var response = data;
			var amtresult = response.ciramt;
			
			this.m_Circulationamt = amtresult;
			
			$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT price, tx, unit, visits FROM coin WHERE assetofficeid = 3"}, function(data, status)
				{
				var resp = data;
				var result = resp.result;
				var resultcount = resp.resultcount;
			
				if(resultcount == 1)
					{
					console.log("result[0] " + result[0]);
					this.m_EVALUE = result[0];
					this.m_Unit = result[2];
					this.m_TX = result[1];
					var f_Visits = parseInt(result[3]);
					this.m_Price = this.m_EVALUE;
					g_EVALUE = this.m_EVALUE;

					if(g_TX < this.m_TX)
						{
						g_TX = this.m_TX;
						}
						
					  //////////////
					 //START COIN//
					//
					if(this.m_Price <= 0.0)
						{
						var f_StorageWealth = 50.0;
						this.m_TX = 5.09;
						this.m_Price = (f_StorageWealth + this.m_TX) / this.f_Circulationamt;
						g_EVALUE = this.m_Price;
						}

					   ////////////////////
					  // Equation
					 // Storage Wealth
					// Value/Worth
					if(g_TX != this.m_TX)
						{
						if(this.m_Circulationamt > 0.0)
							{
							this.m_Price = ((g_EVALUE * this.m_Circulationamt) + this.m_TX) / this.m_Circulationamt;
							g_EVALUE = this.m_Price;
							}

						var f_coinupvalue = [];
						var f_coinupfield = [];

						f_coinupfield[0] = "price";
						f_coinupfield[1] = "tx";
						f_coinupfield[2] = "unit";
						f_coinupfield[3] = "visits";
						f_coinupvalue[0] = this.m_Price;
						f_coinupvalue[1] = this.m_TX;
						f_coinupvalue[2] = this.m_Unit;
						f_coinupvalue[3] = f_Visits + 1;
						
						var f_ResultcoinUP = "";
						for(var f_i = 0; f_i < 4; f_i++)
							{
							f_ResultcoinUP += f_coinupfield[f_i] + "::::";
							f_ResultcoinUP += f_coinupvalue[f_i] + "::::";
							}

						$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-update.php", {type: "GWQ_UPDATE", table: "coin", count: 4, string: f_ResultcoinUP, id: 2}, function(data, status)
							{
							g_TX = this.m_TX;
							
							this.m_RefreshEValueLVL = 1;
							
							callback(g_EVALUE);
							}, "json");
						}
					else
						{
						this.m_RefreshEValueLVL = 1;
							
						callback(g_EVALUE);
						}
					}
				else
					{
					var f_coinupfield = [];
					f_coinupfield[0] = "assetofficeid";
					f_coinupfield[1] = "price";
					f_coinupfield[2] = "tx";
					f_coinupfield[3] = "unit";
					f_coinupfield[4] = "visits";
					var f_coinupvalue = [];
					f_coinupvalue[0] = 3;
					f_coinupvalue[1] = 1.5;
					f_coinupvalue[2] = 15.0;
					f_coinupvalue[3] = 5.0;
					f_coinupvalue[4] = 2100;
					
					var f_Resulttxcoin = "";
					for(var f_i = 0; f_i < 5; f_i++)
						{
						f_Resulttxcoin += f_coinupfield[f_i] + "::::";
						f_Resulttxcoin += f_coinupvalue[f_i] + "::::";
						}

					$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-insert.php", {type: "GWQ_INSERT", table: "coin", count: 5, string: f_Resulttxcoin}, function(data, status)
						{
						this.m_Price = 1.5;
						this.m_TX = 15.0;
						g_TX = this.m_TX;
						this.m_RefreshEValueLVL = 1;
						
						callback(this.m_Price);
						}, "json");
					}
				}, "json");
			}, "json");
		}
		
	this.m_RefreshEValueCNT--;
	if(this.m_RefreshEValueCNT <= 0)
		{
		this.m_RefreshEValueCNT = 8;
		this.m_RefreshEValueLVL = 2;
		}
		
	callback(this.m_Price);
}

ecnWallet.prototype.GetNextChangeKey = function ()
{
	this.m_ChangeIdx++;
	
	this.Update()

	if(this.m_vec_Prefix[this.m_ChangeIdx] == 2)
		{
		var f_Key = this.m_vec_Key[this.m_ChangeIdx]
		}

	return f_Key;
}

ecnWallet.prototype.GetNextChangeAdr = function ()
{
	this.m_ChangeIdx++;
	
	this.Update()

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

ecnWallet.prototype.GetGold = function ()
{
	return this.m_Bank_egold;
}

ecnWallet.prototype.SetGold = function (f_eGold)
{
	this.m_Bank_egold += f_eGold;

	this.Update();
}

ecnWallet.prototype.GetAdr = function ()
{
	var f_Int = 0;
	while(this.m_vec_Prefix[f_Int] >= 2)
		{
		f_Int++;
		}
		
	return this.m_vec_Adr[f_Int];
	//return "2xAWTzERJzdxyvSHvuKXFaEHZpfZ";
}