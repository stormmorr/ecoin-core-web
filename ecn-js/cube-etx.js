/*

cube-etx.js - osirem.com
Copyright OSIREM LTD (C) 2016
www.osirem.com www.qage.org www.geopomp.com

This source is proprietary, and cannot be used, in part or in full without
the express permission of the original author. The original author retain the
rights to use, modify, and/or relicense this code without notice.

*/

function ag_GenerateTransaction(f_A, f_B, f_amt, f_ecnWallet, f_JobID)
{
		///////////////
	   // Research
	  // Entropy
	 // Key
	// Privacy
	var f_Found = false;
	var f_Index = 0;
	for(var f_Helly = 0; f_Helly < f_ecnWallet.m_idx_vec_Adr; f_Helly++)
		{
		//if(f_ecnWallet.m_vec_Adr[f_Helly].length >= 27)
			//{
			if(f_ecnWallet.m_vec_Adr[f_Helly] == f_A)
				{
				f_Found = true;
				f_Index = f_Helly;
				}
			//}
		}

	if(f_Found)
		{
		var key = f_ecnWallet.m_vec_Key[f_Index];

		 ////////////////////////
		// Tier Level Payment
		if(f_amt < 0.0)
			{
			f_amt *= -1;
			
			var f_tx = new CubeTransaction();
			
			f_tx.acSetAmounts(f_A, f_B, f_amt);
			
			f_amt *= -1;

			 ////////////////////
			// close and sync
			f_tx.acHash();

			f_tx.m_vec_txin[0].m_sig = key.Sign(f_tx.m_hash);

			f_tx.m_jobid = f_JobID;

			ag_SynchronizeTX(f_tx);
			
			var f_hashTX = f_tx.m_hash;
			
			$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id FROM transaction WHERE hash = '" + f_hashTX + "'"}, function(data, status)
				{
				var response = data;
				var resultcount = response.resultcount;
				
				if(resultcount == 1)
					{
					var f_TXID = response.result[0];
					
					$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-payee.php", {type: "GWQ_PAYEE", txid: f_TXID, owner: f_A, payowner: f_B, amount: f_amt, query: "SELECT id, owner, payowner, fltamt, amt FROM payee WHERE amt < fltamt AND owner = '" + f_B + "'"}, function(data, status)
						{
						console.log("ECN::successfully completed synchronisation of tier transaction");
						
						return 1;
						}, "json");
					}
				else
					{
					console.log("ECN::transaction failed duplicates");

					return -2;	
					}
				}, "json");
			}   ////////////////////////
		else   // NORMAL TRANSACTION //
			{ ////////////////////////
			 ////////////////////////
			// Prev Transaction ////
			console.log("ECN::f_A " + f_A);
			ag_get_TXfromvout(f_A, function(f_prvTX)
				{
				if(f_prvTX.isValid() == false)
					{
					console.log("ECN::transaction failed invalid prvout");
					
					console.log("EWALLETADR: " + g_Wallet.GetAdr());
						
					return -5;
					}

				var f_tx = new CubeTransaction();
				
				var f_AfterAmount = 0.93 * f_amt;
				
				f_tx.acSetAmounts(f_A, f_B, f_AfterAmount);
				
				f_tx.m_vec_txout[0].m_txoutamt = f_AfterAmount;
				f_tx.m_vec_txout[0].m_owneramt = f_AfterAmount;
				
				console.log("ECN::f_AfterAmount " + f_AfterAmount);

				ag_OwnerBalance(f_prvTX.m_vec_txout[0].m_owner, 0, function(f_owneramt, af_Jet)
					{
					if(f_amt > f_owneramt)
						{
						console.log("ECN::transaction failed not enough ecoin in prvout");

						return -3;
						}
					else
						{	// Eviscerate the coin
						ag_OwnerBalance(f_tx.m_vec_txin[0].m_vout, 0, function(f_OwnerBalance, af_Jet)
							{
							var f_finalBalance = f_OwnerBalance - f_amt;

							$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-owner.php", {type: "GWQ_OWNER", owner: f_tx.m_vec_txin[0].m_vout, amt: f_finalBalance}, function(data, status)
								{
								if(f_amt != f_owneramt)
									{
									var f_txout = new CubeTXOUT();
									
									var f_ChangeIndex = f_ecnWallet.GetNextChangeIdx();

									f_txout.m_owner = f_ecnWallet.m_vec_Adr[f_ChangeIndex];

									ag_OwnerBalance(f_txout.m_owner, 0, function(f_change_value, af_Jet)
										{
										f_change_value = parseFloat(f_change_value) + (parseFloat(f_owneramt) - parseFloat(f_amt));
										
										f_txout.m_txoutamt = f_owneramt - f_amt;
										f_txout.m_owneramt = f_change_value;
										f_tx.m_vec_txout[f_tx.m_idx_vec_txout] = f_txout;
										f_tx.m_idx_vec_txout++;

										var f_changetoadrtx = new CubeTransaction();
										
										f_changetoadrtx.acSetAmounts(f_txout.m_owner, f_A, parseFloat(f_change_value));

										f_changetoadrtx.m_vec_txin[0].m_gnshareid = -2;

										f_changetoadrtx.acHash();

										var f_chkey = f_ecnWallet.m_vec_Key[f_ChangeIndex];
										
										var f_Hash = Buffer.alloc(32, 0);
										
										for(var f_I = 0; f_I < 32; f_I++)
											{
											f_Hash[f_I] = f_changetoadrtx.m_Hash.charAt((f_I * 2)) + f_changetoadrtx.m_Hash.charAt((f_I * 2) + 1);
											}
											
										//console.log("m_Hash: " + f_changetoadrtx.m_Hash);
										//console.log("f_Hash: " + f_Hash);

										f_changetoadrtx.m_vec_txin[0].m_sig = f_chkey.sign(f_Hash);

										f_changetoadrtx.m_jobid = f_JobID;

										ag_SynchronizeTX(f_changetoadrtx);

										console.log("ECN::successfully completed synchronisation of return change transaction");

										 ////////////////////
										// close and sync
										f_tx.acHash();
										
										var f_HashR = Buffer.alloc(32, 0);
										
										for(var f_I = 0; f_I < 32; f_I++)
											{
											f_HashR[f_I] = f_tx.m_Hash.charAt((f_I * 2)) + f_tx.m_Hash.charAt((f_I * 2) + 1);
											}

										f_tx.m_vec_txin[0].m_sig = key.sign(f_HashR);

										f_tx.m_jobid = f_JobID;

										ag_SynchronizeTX(f_tx);
										
										var f_hashTX = f_tx.m_Hash;
										
										/*$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id FROM transaction WHERE hash = '" + f_hashTX + "'"}, function(data, status)
											{
											var response = data;
											var resultcount = response.resultcount;
											
											console.log("Rresultcount: " + resultcount);
											
											if(resultcount == 1)
												{
												var f_TXID = response.result[0];
												
												console.log("f_TXID: " + f_TXID);
												
												$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-payee.php", {type: "GWQ_PAYEE", txid: f_TXID, amount: f_amt, query: "SELECT id, owner, payowner, fltamt, amt FROM payee WHERE amt < fltamt AND owner = '" + f_B + "'"}, function(data, status)
													{
													printf("ECN::successfully completed synchronisation of transaction");
													
													return 1;
													}, "json");
												}
											else
												{
												printf("ECN::transaction failed duplicates");

												return -2;	
												}
											}, "json");*/
										});
									}
								else
									{/////////////////////////
									// close and sync exact
									f_tx.acHash();
									
									var f_HashE = Buffer.alloc(32, 0);
										
									for(var f_I = 0; f_I < 32; f_I++)
										{
										f_HashE[f_I] = f_tx.m_Hash.charAt((f_I * 2)) + f_tx.m_Hash.charAt((f_I * 2) + 1);
										}

									f_tx.m_vec_txin[0].m_sig = key.sign(f_HashE);

									f_tx.m_jobid = f_JobID;

									ag_SynchronizeTX(f_tx);
									
									var f_hashTX = f_tx.m_Hash;
										
									/*$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id FROM transaction WHERE hash = '" + f_hashTX + "'"}, function(data, status)
										{
										var response = data;
										var resultcount = response.resultcount;
										
										if(resultcount == 1)
											{
											var f_TXID = response.result[0];
											
											$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-payee.php", {type: "GWQ_PAYEE", amount: f_amt, query: "SELECT id, owner, payowner, tradeperc, fltamt, amt FROM payee WHERE transactionid = " + f_TXID}, function(data, status)
												{
												printf("ECN::successfully completed exact synchronisation of transaction");
												
												return 1;
												}, "json");
											}
										else
											{
											printf("ECN::transaction failed duplicates");

											return -2;
											}
										}, "json");*/
									}
								}, "json");
							});
						}
					});
				});
			}
		}
	else
		{
		console.log("ECN::transaction failed finding the wallet key for requested address");

		return -4;
		}
}