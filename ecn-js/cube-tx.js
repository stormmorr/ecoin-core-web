/*

cube-tx.js - osirem.com
Copyright OSIREM LTD (C) 2016
www.osirem.com www.qage.org www.geopomp.com

This source is proprietary, and cannot be used, in part or in full without
the express permission of the original author. The original author retain the
rights to use, modify, and/or relicense this code without notice.

*/
//OSIREM TX VERSION

function BiRand(f_Seed, f_Reset)
{
	if(f_Reset == false)
		{
		this.m_Seed = f_Seed;
		}
	else
		{
		this.m_Seed = Math.random();
		}
		
	this.m_ProgressCount = 0;
	this.m_Value = Math.random();
}

BiRand.prototype.acGet = function ()
{
	this.m_Value = Math.random() * this.m_Seed;
	this.m_Seed = Math.random();
	this.m_ProgressCount++;
	return this.m_Value;
}

function BiVector(f_X, f_Y, f_Z)
{
	this.m_X = f_X;
	this.m_Y = f_Y;
	this.m_Z = f_Z;
}

BiVector.prototype.mul = function (f_X, f_Y, f_Z)
{
	var f_Result = new BiVector(0.0);
	f_Result.m_X = this.m_X * f_X;
	f_Result.m_Y = this.m_Y * f_Y;
	f_Result.m_Z = this.m_Z * f_Z;
	return f_Result;
}

BiVector.prototype.add = function (f_X, f_Y, f_Z)
{
	var f_Result = new BiVector(0.0);
	f_Result.m_X = this.m_X + f_X;
	f_Result.m_Y = this.m_Y + f_Y;
	f_Result.m_Z = this.m_Z + f_Z;
	return f_Result;
}

BiVector.prototype.sub = function (f_X, f_Y, f_Z)
{
	var f_Result = new BiVector(0.0);
	f_Result.m_X = this.m_X - f_X;
	f_Result.m_Y = this.m_Y - f_Y;
	f_Result.m_Z = this.m_Z - f_Z;
	return f_Result;
}

BiVector.prototype.cross = function (f_V1X, f_V1Y, f_V1Z, f_V2X, f_V2Y, f_V2Z)
{
	this.m_X = f_V1Y * f_V2X - f_V1Z * f_V2Y;
	this.m_Y = f_V1Z * f_V2X - f_V1X * f_V2Z;
	this.m_Z = f_V1X * f_V2Y - f_V1Y * f_V2X;
}

BiVector.prototype.dot = function ()
{
	return (this.m_X * this.m_X + this.m_Y * this.m_Y + this.m_Z * this.m_Z);
}

BiVector.prototype.acLength = function ()
{
	var f_Length = Math.sqrt(this.dot());
	return f_Length;
}

BiVector.prototype.acPushRandSphere = function (f_Radius, f_Seed)
{
	f_Radius *= 1.5;
	
	for(var f_Cntr = 0; f_Cntr < 7; f_Cntr++)
		{
		var f_BiRand = new BiRand(f_Seed, false);
		var f_Vector = new BiVector((f_BiRand.acGet() - 0.5) * f_Radius,
									(f_BiRand.acGet() - 0.5) * f_Radius, 
									(f_BiRand.acGet() - 0.5) * f_Radius);
									
		this.m_X += f_Vector.m_X * f_Radius;
		this.m_Y += f_Vector.m_Y * f_Radius;
		this.m_Z += f_Vector.m_Z * f_Radius;
		}
}

BiVector.prototype.acNorm = function ()
{
	var len = this.m_X * this.m_X + this.m_Y * this.m_Y + this.m_Z * this.m_Z;
	if(len > 0)
		{
		len = 1.0 / Math.sqrt(len);
		this.m_X *= len;
		this.m_Y *= len;
		this.m_Z *= len;
		}
}

BiVector.prototype.acFix = function (f_DecimalPlaces)
{
	this.m_X = parseFloat(this.m_X.toFixed(f_DecimalPlaces));
	this.m_Y = parseFloat(this.m_Y.toFixed(f_DecimalPlaces));
	this.m_Z = parseFloat(this.m_Z.toFixed(f_DecimalPlaces));
}

function aabb()
{
	this._min = new BiVector(-99999.9);
	this._max = new BiVector(99999.9);
}

function MAX(a,b)
{
	if(a > b)
		{
		return a;
		}
	else
		{
		return b;
		}
}

function MIN(a,b)
{
	if(a < b)
		{
		return a;
		}
	else
		{
		return b;
		}
}

aabb.prototype.add = function (f_Vector)
{
	this._min.m_X = MIN(this._min.m_X, f_Vector.m_X);
	this._min.m_Y = MIN(this._min.m_Y, f_Vector.m_Y);
	this._min.m_Z = MIN(this._min.m_Z, f_Vector.m_Z);
	this._max.m_X = MAX(this._max.m_X, f_Vector.m_X);
	this._max.m_Y = MAX(this._max.m_Y, f_Vector.m_Y);
	this._max.m_Z = MAX(this._max.m_Z, f_Vector.m_Z);
}

aabb.prototype.collide = function (b)
{
	if(this._min.m_X > b._max.m_X) return false;
	if(this._min.m_Y > b._max.m_Y) return false;
	if(this._min.m_Z > b._max.m_Z) return false;

	if(this._max.m_X < b._min.m_X) return false;
	if(this._max.m_Y < b._min.m_Y) return false;
	if(this._max.m_Z < b._min.m_Z) return false;

	return true;
}

aabb.prototype.inside = function (p)
{
	if(p.m_X < this._min.m_X || p.m_X > this._max.m_X) return false;
	if(p.m_Y < this._min.m_Y || p.m_Y > this._max.m_Y) return false;
	if(p.m_Z < this._min.m_Z || p.m_Z > this._max.m_Z) return false;

	return true;
}

aabb.prototype.width = function ()
{
	return this._max.m_X - this._min.m_X;
}

aabb.prototype.height = function ()
{
	return this._max.m_Y - this._min.m_Y;
}

aabb.prototype.depth = function ()
{
	return this._max.m_Z - this._min.m_Z;
}

aabb.prototype.center = function ()
{
	var f_Vector = new BiVector((this._min.m_X + this._max.m_X) * 0.5,
								(this._min.m_Y + this._max.m_Y) * 0.5,
								(this._min.m_Z + this._max.m_Z) * 0.5);
	return f_Vector;
}

aabb.prototype.volume = function ()
{
	var f_Volume = this.width() * this.height() * this.depth();
	return f_Volume;
}

function CubeBicycle()
{
	this.m_vec_Vertex = [];
	this.m_idx_vec_Vertex = 0;

	this.m_vec_Color = [];
	this.m_idx_vec_Color = 0;

	this.m_vec_Indices = [];
	this.m_indexCount = 0;

	this.m_Refresh = 0; 
}

CubeBicycle.prototype.avGrow = function(f_Amount)
{
	for(var f_Count = 0; f_Count < this.m_idx_vec_Vertex; f_Count++)
		{
		this.m_vec_Vertex[f_Count].m_X += f_Amount;
		this.m_vec_Vertex[f_Count].m_Y += f_Amount;
		this.m_vec_Vertex[f_Count].m_Z += f_Amount;
		}
}

CubeBicycle.prototype.avTranslate = function(f_Vector)
{
	for(var f_Count = 0; f_Count < this.m_idx_vec_Vertex; f_Count++)
		{
		this.m_vec_Vertex[f_Count].add(f_Vector);
		}
}

function CubeKEY()
{
	this.m_Link = new CubeBicycle();
}

CubeKEY.prototype.acAddBicycle = function(f_Bicycle)
{
	this.m_Link = f_Bicycle;
}

function CubeTXIN()
{
	this.m_txid = -1;
	this.m_prvtxid = -1;
	this.m_prvtxoutid = -1;
	this.m_txinid = -1;
	this.m_gnshareid = -1;
	this.m_vout = "";
	this.m_pubkey = "";
	this.m_vec_sig = [];
	this.m_idx_vec_sig = 0;
	this.m_sigstr = "";
	this.m_amt = 0.0;
}

function CubeTXOUT()
{
	this.m_txid = -1;
	this.m_txoutid = -1;
	this.m_adrid = -1;
	this.m_owner = "";
	this.m_pubkey = "";
	this.m_txoutamt = 0.0;
	this.m_owneramt = 0.0;
	this.m_Flag = 0;
}

function CubeTransaction()
{
	this.m_vec_txin = [];
	this.m_idx_vec_txin = 0;
	this.m_vec_txout = [];
	this.m_idx_vec_txout = 0;
	
	this.m_status = 1;
	this.m_Hash = "";
	this.m_hdid = "";
	this.m_owner = "";
	this.m_amt = 0.0;
	this.m_gnshareid = -1;
	this.m_txid = -1;
	this.m_jobid = -1;
	this.m_confirmation = 0;
	this.m_locktime = 1;
	this.m_fresh = true;
}

CubeTransaction.prototype.acHash = function()
{
	var f_InputHash = "";

	for(var f_x = 0; f_x < this.m_idx_vec_txin; f_x++)
		{
		f_InputHash += this.m_vec_txin[f_x].m_txid;
		f_InputHash += this.m_vec_txin[f_x].m_prvtxid;
		f_InputHash += this.m_vec_txin[f_x].m_prvtxoutid;
		f_InputHash += this.m_vec_txin[f_x].m_gnshareid;
		f_InputHash += this.m_vec_txin[f_x].m_vout;
		f_InputHash += this.m_vec_txin[f_x].m_pubkey;
		f_InputHash += this.m_vec_txin[f_x].m_sigstr;
		}

	for(var f_y = 0; f_y < this.m_idx_vec_txout; f_y++)
		{
		f_InputHash += this.m_vec_txout[f_y].m_txid;
		f_InputHash += this.m_vec_txout[f_y].m_adrid;
		f_InputHash += this.m_vec_txout[f_y].m_owner;
		f_InputHash += this.m_vec_txout[f_y].m_pubkey;
		f_InputHash += this.m_vec_txout[f_y].m_txoutamt;
		f_InputHash += this.m_vec_txout[f_y].m_owneramt;
		}

	//add extra data like status etc.
	f_InputHash += this.m_owner;
	f_InputHash += this.m_status;
	f_InputHash += this.m_amt;
	f_InputHash += this.m_txid;
	f_InputHash += this.m_jobid;
	f_InputHash += this.m_confirmation;
	f_InputHash += this.m_hdid;
	
	var hash = sha256.create();
	hash.update(f_InputHash);
	this.m_Hash = hash.hex();
}

CubeTransaction.prototype.acSetAmounts = function(f_A, f_B, f_amt)
{
	var f_txin = new CubeTXIN();

	f_txin.m_vout = f_A;
	
	this.m_vec_txin[this.m_idx_vec_txin] = f_txin;
	this.m_idx_vec_txin++;

	var f_txout = new CubeTXOUT();

	f_txout.m_owner = f_B;
	f_txout.m_txoutamt = f_amt;
	f_txout.m_owneramt = f_amt;
	this.m_amt = f_amt;
	
	this.m_vec_txout[this.m_idx_vec_txout] = f_txout;
	this.m_idx_vec_txout++;
	
	this.m_owner = f_B;
	this.m_amt = f_amt;
}

CubeTransaction.prototype.isValid = function()
{
	var f_Valid = true;

	if(this.m_idx_vec_txout < 1)
		{
		return false;
		}

	if(this.m_idx_vec_txin != 1)
		{
		var f_txin = new CubeTXIN();

		f_txin.m_vout = "Genesis Tracking";
		this.m_vec_txin[this.m_idx_vec_txin] = f_txin;
		this.m_idx_vec_txin++;
		
		if(this.m_txid > -1)
			{
			this.acUpdateSync();
			}
		else
			{
			ag_SynchronizeTX(this);
			}
		}

	if(this.m_vec_txin[0].m_txid == -1)
		{
		f_Valid = false;
		}

	if(this.m_vec_txout[0].m_txid == -1)
		{
		f_Valid = false;
		}

	return f_Valid;
}

function ag_SynchronizeTX(f_tx)
{
	/*$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id FROM transactions WHERE hash = '" + f_tx.m_Hash + "'"}, function(data, status)
		{
		var response = data;
		var resultcount = response.resultcount;

		if(resultcount == 0)
			{*/
			console.log(JSON.stringify(f_tx));
			
			var g_syncfield = [];
			g_syncfield[0] = "status";
			g_syncfield[1] = "locktime";
			g_syncfield[2] = "confirmation";
			g_syncfield[3] = "hdid";
			g_syncfield[4] = "shareid";
			g_syncfield[5] = "gnshareid";
			g_syncfield[6] = "jobid";
			g_syncfield[7] = "hash";
			g_syncfield[8] = "amt";
			g_syncfield[9] = "owner";
			g_syncfield[10] = "locktime";
			
			var g_syncvalue = [];
			g_syncvalue[0] = "1";
			g_syncvalue[1] = "1";
			g_syncvalue[2] = "0";
			g_syncvalue[3] = f_tx.m_hdid;
			g_syncvalue[4] = "0";
			g_syncvalue[5] = f_tx.m_vec_txin[0].m_gnshareid;
			g_syncvalue[6] = f_tx.m_jobid;
			g_syncvalue[7] = f_tx.m_Hash;
			g_syncvalue[8] = f_tx.m_amt;
			g_syncvalue[9] = f_tx.m_vec_txout[0].m_owner;
			g_syncvalue[10] = f_tx.m_locktime;
			
			var f_Resulttxsync = "";
			for(var f_i = 0; f_i < 11; f_i++)
				{
				f_Resulttxsync += g_syncfield[f_i] + "::::";
				f_Resulttxsync += g_syncvalue[f_i] + "::::";
				}
				
			console.log("INSERT : " + f_Resulttxsync);

			$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-insert.php", {type: "GWQ_INSERT", typeC: "GWQ_INSERT", table: "transactions", count: 11, string: f_Resulttxsync}, function(data, status)
				{
				var response = data;
				
				console.log(JSON.stringify(response));
				
				$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id FROM transactions WHERE hash = '" + f_tx.m_Hash + "'"}, function(data, status)
					{
					var resp = data;
					var resultcount = resp.resultcount;
					
					if(resultcount == 1)
						{
						var f_SyncUniqueID = resp.result[0];
						
						var g_txinsyncfield = [];
						g_txinsyncfield[0] = "transactionid";
						g_txinsyncfield[1] = "vout";
						g_txinsyncfield[2] = "pubkey";
						g_txinsyncfield[3] = "vsign";
						g_txinsyncfield[4] = "amt";
						g_txinsyncfield[5] = "gnshareid";

						var g_txinsyncvalue = [];
						g_txinsyncvalue[0] = f_SyncUniqueID;
						g_txinsyncvalue[1] = f_tx.m_vec_txin[0].m_vout;
						g_txinsyncvalue[2] = f_tx.m_vec_txin[0].m_pubkey;
						g_txinsyncvalue[3] = f_tx.m_vec_txin[0].m_sigstr;
						g_txinsyncvalue[4] = f_tx.m_amt;
						g_txinsyncvalue[5] = f_tx.m_vec_txin[0].m_gnshareid;
						
						var f_Resulttxinsync = "";
						for(var f_i = 0; f_i < 6; f_i++)
							{
							f_Resulttxinsync += g_txinsyncfield[f_i] + "::::";
							f_Resulttxinsync += g_txinsyncvalue[f_i] + "::::";
							}

						$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-insert.php", {type: "GWQ_INSERT", typeC: "GWQ_INSERT", table: "txin", count: 6, string: f_Resulttxinsync}, function(data, status)
							{
							var response = data;

							for(var f_XY = 0; f_XY < f_tx.m_idx_vec_txout; f_XY++)
								{
								var g_txoutsyncfield = [];
								g_txoutsyncfield[0] = "transactionid";
								g_txoutsyncfield[1] = "adrid";
								g_txoutsyncfield[2] = "owner";
								g_txoutsyncfield[3] = "pubkey";
								g_txoutsyncfield[4] = "txoutamt";
								g_txoutsyncfield[5] = "owneramt";

								var g_txoutsyncvalue = [];
								g_txoutsyncvalue[0] = f_SyncUniqueID;
								g_txoutsyncvalue[1] = 1;
								g_txoutsyncvalue[2] = f_tx.m_vec_txout[f_XY].m_owner;
								g_txoutsyncvalue[3] = f_tx.m_vec_txout[f_XY].m_pubkey;
								g_txoutsyncvalue[4] = f_tx.m_vec_txout[f_XY].m_txoutamt;
								g_txoutsyncvalue[5] = f_tx.m_vec_txout[f_XY].m_owneramt;

								var f_Resulttxoutsync = "";
								for(var f_i = 0; f_i < 6; f_i++)
									{
									f_Resulttxoutsync += g_txoutsyncfield[f_i] + "::::";
									f_Resulttxoutsync += g_txoutsyncvalue[f_i] + "::::";
									}

								$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-insert.php", {type: "GWQ_INSERT", typeC: "GWQ_INSERT", table: "txout", count: 6, string: f_Resulttxoutsync}, function(data, status)
									{
									var response = data;
									
									console.log("Inserted TX " + f_SyncUniqueID + " Insert txout!");
									//INSERT CALLBACK HERE
									}, "json");
								}
							}, "json");
						}
					}, "json");
				}, "json");
			//}
		//}, "json");
}

CubeTransaction.prototype.acUpdateSync = function()
{
	var g_syncfield = [];
	g_syncfield[0] = "status";
	g_syncfield[1] = "locktime";
	g_syncfield[2] = "confirmation";
	g_syncfield[3] = "hdid";
	g_syncfield[4] = "gnshareid";
	g_syncfield[5] = "jobid";
	g_syncfield[6] = "hash";
	g_syncfield[7] = "amt";
	g_syncfield[8] = "owner";
	g_syncfield[9] = "locktime";

	var g_syncvalue = [];
	g_syncvalue[0] = this.m_status;
	g_syncvalue[1] = "1";
	g_syncvalue[2] = this.m_confirmation;
	g_syncvalue[3] = this.m_hdid;
	g_syncvalue[4] = this.m_vec_txin[0].m_gnshareid;
	g_syncvalue[5] = this.m_jobid;
	g_syncvalue[6] = this.m_Hash;
	g_syncvalue[7] = this.m_amt;
	g_syncvalue[8] = this.m_vec_txout[0].m_owner;
	g_syncvalue[9] = this.m_locktime;

	var f_Resulttxsync = "";
	for(var f_i = 0; f_i < 10; f_i++)
		{
		f_Resulttxsync += g_syncfield[f_i] + "::::";
		f_Resulttxsync += g_syncvalue[f_i] + "::::";
		}
		
	console.log(f_Resulttxsync);

	$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-update.php", {type: "GWQ_UPDATE", table: "transactions", count: 10, string: f_Resulttxsync, id: this.m_txid}, function(data, status) {}, "json");
		
	var f_SyncUniqueID = this.m_txid;
	
	var g_txinsyncfield = [];
	g_txinsyncfield[0] = "transactionid";
	g_txinsyncfield[1] = "vout";
	g_txinsyncfield[2] = "pubkey";
	g_txinsyncfield[3] = "vsign";
	g_txinsyncfield[4] = "amt";
	g_txinsyncfield[5] = "gnshareid";

	var g_txinsyncvalue = [];
	g_txinsyncvalue[0] = f_SyncUniqueID;
	g_txinsyncvalue[1] = this.m_vec_txin[0].m_vout;
	g_txinsyncvalue[2] = this.m_vec_txin[0].m_pubkey;
	g_txinsyncvalue[3] = this.m_vec_txin[0].m_sigstr;
	g_txinsyncvalue[4] = this.m_amt;
	g_txinsyncvalue[5] = this.m_vec_txin[0].m_gnshareid;
	
	var f_Resulttxinsync = "";
	for(var f_i = 0; f_i < 6; f_i++)
		{
		f_Resulttxinsync += g_txinsyncfield[f_i] + "::::";
		f_Resulttxinsync += g_txinsyncvalue[f_i] + "::::";
		}

	$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-update.php", {type: "GWQ_UPDATE", table: "txin", count: 6, string: f_Resulttxinsync, id: this.m_vec_txin[0].m_txinid}, function(data, status) {}, "json");
	
	console.log("TXOUT: " + this.m_idx_vec_txout);

	for(var f_XY = 0; f_XY < this.m_idx_vec_txout; f_XY++)
		{
		var g_txoutsyncfield = [];
		g_txoutsyncfield[0] = "transactionid";
		g_txoutsyncfield[1] = "adrid";
		g_txoutsyncfield[2] = "owner";
		g_txoutsyncfield[3] = "pubkey";
		g_txoutsyncfield[4] = "txoutamt";
		g_txoutsyncfield[5] = "owneramt";

		var g_txoutsyncvalue = [];
		g_txoutsyncvalue[0] = f_SyncUniqueID;
		g_txoutsyncvalue[1] = 1;
		g_txoutsyncvalue[2] = this.m_vec_txout[f_XY].m_owner;
		g_txoutsyncvalue[3] = this.m_vec_txout[f_XY].m_pubkey;
		g_txoutsyncvalue[4] = this.m_vec_txout[f_XY].m_txoutamt;
		g_txoutsyncvalue[5] = this.m_vec_txout[f_XY].m_owneramt;
		
		var f_Resulttxoutsync = "";
		for(var f_i = 0; f_i < 6; f_i++)
			{
			f_Resulttxoutsync += g_txoutsyncfield[f_i] + "::::";
			f_Resulttxoutsync += g_txoutsyncvalue[f_i] + "::::";
			}

		$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-update.php", {type: "GWQ_UPDATE", table: "txout", count: 6, string: f_Resulttxoutsync, id: this.m_vec_txout[0].m_txoutid}, function(data, status)
			{
			console.log("Updated TX " + f_SyncUniqueID + " txout!");
			}, "json");
		}
}

function ag_getTX(f_txid, f_txoutid, f_Utilityid, f_transaction, callback) //f_txoutid: optional, sets flag upon found for use later
{
	$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id, hash, amt, confirmation, jobid, hdid, gnshareid, owner, status, locktime FROM transactions WHERE id = " + f_txid}, function(data, status)
		{
		var response = data;
		var resultcount = response.resultcount;
		var result = response.result;

		var f_TxLCount = resultcount;
		
		console.log("f_TxLCount: " + f_TxLCount);

		//assume remote connection for windows
		if(f_TxLCount > 0)
			{
			var f_TX = new CubeTransaction();
				
			f_TX.m_txid = result[0];
			f_TX.m_Hash = result[1];
			f_TX.m_confirmation = result[3];
			f_TX.m_amt = result[2];
			f_TX.m_jobid = result[4];
			f_TX.m_hdid = result[5];
			var f_gnsharesupport = result[6];
			f_TX.m_gnshareid = f_gnsharesupport;
			f_TX.m_owner = result[7];
			f_TX.m_status = result[8];
			f_TX.m_locktime = result[9];
			
			$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id, adrid, owner, pubkey, txoutamt, owneramt, dated FROM txout WHERE transactionid = " + f_txid}, function(data, status)
				{
				var response = data;
				var resultcount = response.resultcount;
				var result = response.result;
			
				var f_TxoutLCount = resultcount;
				
				console.log("f_TxoutLCount: " + f_TxoutLCount);
				
				var f_Trl = true;

				if(f_TxoutLCount == 1)
					{
					var f_txout = new CubeTXOUT();

					f_txout.m_txid = f_txid;
					f_txout.m_txoutid = result[0];
					f_txout.m_adrid = result[1];
					f_txout.m_owner = result[2];
					f_txout.m_pubkey = result[3];
					f_txout.m_txoutamt = result[4];
					f_txout.m_owneramt = result[5];
					f_TX.m_owner = f_txout.m_owner;

					//verify flag
					if(f_txout.m_txoutid == f_txoutid)
						{
						f_txout.m_Flag = 1;
						}

					f_TX.m_vec_txout[f_TX.m_idx_vec_txout] = f_txout;
					f_TX.m_idx_vec_txout++;
					f_Trl = true;
					}
				else if(f_TxoutLCount > 1)
					{
					for(var f_jet = 0; f_jet < f_TxoutLCount; f_jet++)
						{
						var f_txout = new CubeTXOUT();

						f_txout.m_txid = f_txid;
						f_txout.m_txoutid = result[f_jet].id;
						f_txout.m_adrid = result[f_jet].adrid;
						f_txout.m_owner = result[f_jet].owner;
						f_txout.m_pubkey = result[f_jet].pubkey;
						f_txout.m_txoutamt = result[f_jet].txoutamt;
						f_txout.m_owneramt = result[f_jet].owneramt;

						//verify flag
						if(f_txout.m_txoutid == f_txoutid)
							{
							f_txout.m_Flag = 1;
							}

						f_TX.m_vec_txout[f_TX.m_idx_vec_txout] = f_txout;
						f_TX.m_idx_vec_txout++;
						}
						
					f_Trl = true;
					}
				else
					{
					console.log("ECN-ERROR TX invalid on position");
					f_Trl = false;
					}

				if(f_Trl == true)
					{
					console.log("f_Tx");
				
					$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id, vout, pubkey, vsign, amt, dated FROM txin WHERE transactionid = " + f_txid}, function(data, status)
						{
						var response = data;
						var resultcount = response.resultcount;
						var result = response.result;
					
						var f_TxinLCount = resultcount;
						
						console.log("f_TxinLCount: " + f_TxinLCount);

						if(f_TxinLCount == 1)
							{
							var f_txin = new CubeTXIN();

							f_txin.m_txinid = result[0];
							f_txin.m_vout = result[1];
							f_txin.m_pubkey = result[2];
							f_txin.m_sigstr = result[3];
							var f_txinrow4 = result[4];

							  ///////////////////
							 // Detect Genesis
							// Tracking
							var f_vout = result[1];

							if(f_vout == "Genesis Tracking")
								{ //generate coin
								if(f_TxoutLCount == 1)
									{
									var f_NewJobID = parseInt(f_TX.m_jobid);
									f_NewJobID--;
									
									console.log("Genesis sync-share Tracking f_TX.m_vec_txout[0].m_owner: " + f_TX.m_vec_txout[0].m_owner + " f_NewJobID: " + f_NewJobID);

									$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-calc-owner.php", {owner: f_TX.m_vec_txout[0].m_owner, jobid: f_NewJobID}, function(data, status)
										{
										var response = data;
										var resultamount = response.amount;
									
										var f_Amount = resultamount;
										
										console.log("f_Amount: " + f_Amount);
										
										ag_OwnerBalance(f_TX.m_vec_txout[0].m_owner, 0, function(f_OwnerBalance)
											{
											var f_peerAmount = f_OwnerBalance;

											var f_full_reward = f_peerAmount + f_Amount;

											f_TX.m_amt = f_Amount;
											f_txin.m_txid = f_txid;
											f_txin.m_amt = f_full_reward;
											f_txin.m_gnshareid = f_gnsharesupport;
											f_TX.m_vec_txout[0].m_txoutamt = f_Amount;
											f_TX.m_vec_txout[0].m_owneramt = f_full_reward;
											
											f_TX.m_vec_txin[f_TX.m_idx_vec_txin] = f_txin;
											f_TX.m_idx_vec_txin++;
											
											callback(f_TX, f_Utilityid, f_transaction);
											});
										}, "json");
									}
								else
									{
									callback(f_TX, f_Utilityid, f_transaction);
									}
								}
							else
								{
								if(f_vout == "Genesis Coin")
									{ //generate coin
									if(f_TxoutLCount == 1)
										{
										var f_Amount = 1.0;
										
										console.log("Genesis Coin");
										
										ag_OwnerBalance(f_TX.m_owner, 0, function(f_OwnerBalance)
											{
											var f_peerAmount = f_OwnerBalance;

											var f_full_reward = f_peerAmount + f_Amount;

											f_TX.m_amt = f_Amount;
											f_txin.m_txid = f_txid;
											f_txin.m_amt = f_full_reward;
											f_TX.m_vec_txout[0].m_txoutamt = f_Amount;
											f_TX.m_vec_txout[0].m_owneramt = f_full_reward;
											
											f_TX.m_vec_txin[f_TX.m_idx_vec_txin] = f_txin;
											f_TX.m_idx_vec_txin++;
											
											callback(f_TX, f_Utilityid, f_transaction);
											}, "json");
										}
									else
										{
										callback(f_TX, f_Utilityid, f_transaction);
										}
									}
								else
									{
									console.log("callback(f_TX)");
									
									f_txin.m_txid = f_txid;
									f_txin.m_amt = f_txinrow4;
									f_txin.m_gnshareid = f_gnsharesupport;
									
									f_TX.m_vec_txin[f_TX.m_idx_vec_txin] = f_txin;
									f_TX.m_idx_vec_txin++;
									
									callback(f_TX, f_Utilityid, f_transaction);
									}
								}
							}
						else
							{
							f_TX.m_fresh = false;
							callback(f_TX, f_Utilityid, f_transaction);
							}
						}, "json");
					}
				else
					{
					f_TX.m_fresh = false;
					callback(f_TX, f_Utilityid, f_transaction);
					}
				}, "json");
			}
		else
			{
			f_TX.m_fresh = false;
			callback(f_TX, f_Utilityid, f_transaction);
			}
		}, "json");
}

function ag_GenesisProtectionTX(f_JobID, f_Result, f_Block, callback, escape_callback)
{
	$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id, hash, confirmation, owner, jobid, locktime FROM transactions WHERE (jobid < " + f_JobID + " AND status = 1 AND confirmation < 6) OR (jobid = " + f_JobID + " AND status = 1)"}, function(data, status)
		{
		var response = data;
		var resultcount = response.resultcount;

		console.log("resultcount = " + resultcount);
		
		var f_TxLCount = 0;
		
		if(resultcount > 1)
			{
			f_TxLCount = resultcount;
			var result = response.result;
			
			//temporary count restriction
			if(f_TxLCount > 5)
				{
				f_TxLCount = 5;
				}
				
			//Build the TX Table
			var f_vec_TX = [];
			var f_idx_vec_TX = 0;
			for(var f_Helly = 0; f_Helly < f_TxLCount; f_Helly++)
				{
				var TX = new CubeTransaction();
				TX.m_txid = result[f_Helly].id;
				TX.m_Hash = result[f_Helly].hash;
				TX.m_confirmation = result[f_Helly].confirmation;
				TX.m_owner = result[f_Helly].owner;
				TX.m_jobid = result[f_Helly].jobid;
				TX.m_locktime = result[f_Helly].locktime;
				TX.m_status = 1;
				f_vec_TX[f_idx_vec_TX] = TX;
				f_idx_vec_TX++;
				}
				
			var f_TxLCountScan = f_TxLCount;
			
			for(var f_Jet = 0; f_Jet < f_TxLCountScan; f_Jet++)
				{
				var f_txid = f_vec_TX[f_Jet].m_txid;
				var f_txowner = f_vec_TX[f_Jet].m_owner;
				var f_txjobid = f_vec_TX[f_Jet].m_jobid;
				var f_txlc = f_vec_TX[f_Jet].m_locktime;
				
				for(var f_RM = 0; f_RM < f_TxLCountScan; f_RM++)
					{
					if(f_Jet != f_RM)
						{
						if(f_vec_TX[f_RM].m_status != -5)
							{
							var f_RMid = f_vec_TX[f_RM].m_txid;
							var f_RMowner = f_vec_TX[f_RM].m_owner;
							var f_RMjobid = f_vec_TX[f_RM].m_jobid;
							var f_RMlc = f_vec_TX[f_RM].m_locktime;
							
							if(((f_txlc == 2) && (f_RMlc == 2)) && (f_txowner == f_RMowner) && (f_txjobid == f_RMjobid))
								{
								if(f_txid > f_RMid)
									{
									f_vec_TX[f_RM].m_status = -5;
									
									ag_getTX(f_RMid, -3, f_RM, new CubeTransaction(), function(f_TransactionA, f_Index, f_TransactionF)
										{
										f_TransactionA.m_fresh = false;
								
										callback(false, f_TransactionA, "", "", 0, f_Index, 1, f_TxLCount);
										});
									}
								}
							}
						}
					}
				}
			
			for(var f_t = 0; f_t < f_TxLCountScan; f_t++)
				{
				if(f_vec_TX[f_t].m_status != -5)
					{
					ag_getTX(f_vec_TX[f_t].m_txid, -3, f_t, new CubeTransaction(), function(f_TransactionA, f_Index, f_TransactionF)
						{
						if(f_TransactionA.isValid() == true)
							{
							f_TransactionA.m_fresh = true;
				
							callback(true, f_TransactionA, f_TransactionA.m_Hash, f_TransactionA.m_Hash, f_TransactionA.m_confirmation, f_Index, 1, f_TxLCount);
							}
						else
							{
							f_TransactionA.m_fresh = false;
					
							callback(false, f_TransactionA, "", "", 0, f_Index, 1, f_TxLCount);
							}
						});
					}
				}
			}
		else if(resultcount == 1)
			{
			console.log("ECN::response.result[0]:: " + response.result[0]);
			ag_getTX(response.result[0], -3, response.result[4], new CubeTransaction(), function(f_TransactionA, f_jobA, f_TransactionF)
				{
				if(f_TransactionA.isValid() == true)
					{
					console.log("ECN::Single TX Mode::Valid::" + JSON.stringify(f_TransactionA));
					callback(true, f_TransactionA, response.result[1], response.result[1], response.result[2], 0, 0, 1);
					}
				else
					{
					console.log("ECN::Single TX Mode::notValid::" + JSON.stringify(f_TransactionA));
					callback(false, f_TransactionA, response.result[1], response.result[1], response.result[2], 0, 0, 1);
					}
				});
			}
		else
			{
			var f_Result = "0000000000000000000000000000000000000000000000000000000000000001";
			console.log(f_Result);
			escape_callback(f_Result);
			}
		}, "json");
}

function ag_get_TXfromvout(f_vout, callback)
{
	$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id, transactionid, dated FROM txout WHERE owner = '" + f_vout + "' ORDER BY dated DESC LIMIT 1"}, function(data, status)
		{
		var response = data;
		var result = response.result;
		var resultcount = response.resultcount;
		
		var f_TxLCount = resultcount;
		
		console.log("f_TxLCount " + f_TxLCount);

		//assume remote connection for windows
		if(f_TxLCount > 0)
			{
			ag_getTX(result[1], result[0], 1, new CubeTransaction(), function(f_TX, f_jobid, f_trx)
				{
				console.log("f_TX: " + JSON.stringify(f_TX));
				callback(f_TX);
				});
			}
		else
			{
			callback(new CubeTransaction());
			}
		}, "json");
}

function ag_VerifyTXIN(f_txin, f_amt, callback)
{
	//trace source of wealth
	ag_get_TXfromvout(f_txin.m_vout, function(f_PrevTX)
		{
		var f_Verified = true;
		
		if(f_PrevTX.isValid() == false)
			{
			console.log("ECN-VERIFY-FAIL Previous TX appears invalid");
				
			f_Verified = false;
			}

		var f_find = false;
		for(var f_Z = 0; f_Z < f_PrevTX.m_idx_vec_txout; f_Z++)
			{
			var f_txout = f_PrevTX.m_vec_txout[f_Z];

			if(f_txout.m_Flag == 1)
				{
				f_find = true;

				if(f_txout.m_owneramt < f_amt)
					{
					console.log("ECN-VERIFY-FAIL m_owneramt: " + f_txout.m_owneramt + " < f_amount: " + f_amt);

					f_Verified = false;
					}
				}
			}

		if(f_find == false)
			{
			f_Verified = false;
			}
			
		callback(f_Verified);
		});
}

function ag_OwnerBalance(f_owner, f_JetID, callback)
{
	$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id, amt, owner FROM address WHERE owner = '" + f_owner + "'"}, function(data, status)
		{
		var response = data;
		var result = response.result;
		var resultcount = response.resultcount;
		
		var f_AddressCount = resultcount;

		//assume remote connection for windows
		if(f_AddressCount > 0)
			{
			callback(result[1], f_JetID);
			}
		else
			{
			callback(0.0, f_JetID);
			}
		}, "json");
}

function ag_Verify(f_Verified, f_Transaction, f_hash, f_Result, callback)
{
	var f_Chek = false;
	
	if(f_Transaction.isValid())
		{
		if((f_Verified == true) && (f_Transaction.m_vec_txin[0].m_gnshareid <= 0) && (f_Transaction.m_vec_txin[0].m_gnshareid != -2) && (f_Transaction.m_vec_txin[0].m_vout != "Genesis Coin") && (f_Transaction.m_vec_txin[0].m_vout != "Genesis Tracking"))
			{
			console.log("10");
			ag_VerifyTXIN(f_Transaction.m_vec_txin[0], f_Transaction.m_amt, function(f_Verified)
				{
				f_Transaction.m_fresh = f_Verified;
				console.log("20");
				callback(f_Verified, f_Transaction, f_hash, f_Result);
				});
			
			f_Chek = true;
			}
		}

	if(!f_Chek)
		{
		console.log("callback-ag_Verify-exiting");
		callback(f_Verified, f_Transaction, f_hash, f_Result)
		}
}

function ag_PrepareVerifyTX(f_Verified, f_Transaction, f_hash, f_Result, callback)
{
	var f_ChekTX = false;
	
	console.log("ag_PrepareVerifyTX");
	
	if(f_Transaction.isValid())
		{
		console.log("ag_PrepareVerifyTXf_Transaction.isValid())");
		if((f_Transaction.m_vec_txin[0].m_gnshareid > 0) || (f_Transaction.m_vec_txin[0].m_vout == "Genesis Coin") || (f_Transaction.m_vec_txin[0].m_vout == "Genesis Tracking"))
			{
			if(f_Transaction.m_vec_txin[0].m_vout == "Genesis Tracking")
				{
				if((f_Transaction.m_vec_txout[0].m_txoutamt <= 0.0) || (f_Transaction.m_vec_txout[0].m_txoutamt > 50.0))
					{
					console.log("ECN-VERIFY-FAIL m_txoutamt <= 0.0 || m_txoutamt > 50.0");
					
					f_Verified = false;
					f_Transaction.m_fresh = false;
					}
				}
			}
		else
			{
			var f_combout = 0.0; //gathered tx value
			
			console.log("tro");
				
			for(var f_tro = 0; f_tro < f_Transaction.m_idx_vec_txout; f_tro++)
				{
				if(f_tro < 1)
					{
					console.log("tro: " + f_tro);
					f_combout += parseFloat(f_Transaction.m_vec_txout[f_tro].m_txoutamt) * 1.075268817204301;
						
					if((f_combout < f_Transaction.m_amt - 0.150) && (f_combout > f_Transaction.m_amt + 0.150))
						{
						console.log("ECN-VERIFY-FAIL f_combout != f_Transaction.m_amt");
							
						f_Verified = false;
						f_Transaction.m_fresh = false;
						}
					}
				else
					{
					f_combout += parseFloat(f_Transaction.m_vec_txout[f_tro].m_txoutamt);
						
					/*ag_OwnerBalance(f_Transaction.m_vec_txin[0].m_vout, 0, function(f_Amount)
						{
						if(f_combout != f_Amount)
							{
							console.log("ECN-VERIFY-FAIL f_combout != f_Amount");
								
							f_Verified = false;
							f_Transaction.m_fresh = false;
							}

						callback(f_Verified, f_Transaction, f_hash, f_Result);
						});*/
						
					//f_ChekTX = true;
					}
				}
			}
		}
			
	//if(!f_ChekTX)
	//	{
		console.log("callback(f_Verified = " + f_Verified + ")");
		callback(f_Verified, f_Transaction, f_hash, f_Result);
	//	}
}

function ag_addGenesisTracking(f_gnid, f_JobID, g_Wallet)
{
	var f_jobid = parseInt(f_JobID) + 1;

	var f_query = "SELECT id FROM transactions WHERE hdid = 'eCookieHash1234' AND jobid = " + f_jobid + " AND locktime = 2 AND owner = '" + g_Wallet.GetAdr() + "' AND status = 1";

	console.log("ECN-Stat-Select f_query = " + f_query);
	
	$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: f_query}, function(data, status)
		{
		var response = data;
		var result = response.result;
		var resultcount = response.resultcount;
		
		var f_hdLCount = resultcount;

		if(f_hdLCount == 0)
			{
			console.log("ECN::Stat::: Genesis Tracking " + g_Wallet.GetAdr());
				
			var f_tx = new CubeTransaction();
			var f_txin = new CubeTXIN();

			f_txin.m_vout = "Genesis Tracking";

			f_tx.m_vec_txin[f_tx.m_idx_vec_txin] = f_txin;
			f_tx.m_idx_vec_txin++;

			var f_txout = new CubeTXOUT();

			f_txout.m_owner = g_Wallet.GetAdr();
			f_txout.m_txoutamt = -1.0;
			f_txout.m_owneramt = -1.0;

			f_tx.m_vec_txout[f_tx.m_idx_vec_txout] = f_txout;
			f_tx.m_idx_vec_txout++;

			f_tx.m_owner = g_Wallet.GetAdr();
			f_tx.m_amt = -1.0;

			f_tx.m_vec_txin[0].m_gnshareid = f_gnid;
			
			f_tx.m_locktime = 2;

			f_tx.m_jobid = parseInt(f_JobID) + 1;

			f_tx.m_hdid = g_Wallet.m_hdid;

			f_tx.acHash();

			var f_TXstr = JSON.stringify(f_tx);
			console.log("GENESISTRACKING tx = " + f_TXstr);
			console.log("GENESISTRACKING f_tx.m_owner = " + f_tx.m_owner);
			console.log("GENESISTRACKING g_Wallet.GetAdr() = " + g_Wallet.GetAdr());

			ag_SynchronizeTX(f_tx);
			}
		}, "json");
}

function ag_GatherFunction(f_JobID, f_Result, f_Block, callback)
{
	ag_GenesisProtectionTX(f_JobID, f_Result, f_Block, function(f_Verified, f_Transaction, f_hash, f_Result, f_conf, f_Block, f_rotoner, f_TxLCount)
		{
		ag_PrepareVerifyTX(f_Verified, f_Transaction, f_hash, f_Result, function(f_Verified, f_Transaction, f_hash, f_Result)
			{
			ag_Verify(f_Verified, f_Transaction, f_hash, f_Result, function(f_Verified, f_Transaction, f_hash, f_Result)
				{
				if(f_Verified == true)
					{ //stack tx hash
					f_Transaction.m_confirmation++;

					if(f_Transaction.m_confirmation == 6)
						{
						if(f_Transaction.isValid())
							{
							for(var f_Jet = 0; f_Jet < f_Transaction.m_idx_vec_txout; f_Jet++)
								{
								if(f_Transaction.m_vec_txin[0].m_gnshareid != -2)
									{
									ag_OwnerBalance(f_Transaction.m_vec_txout[f_Jet].m_owner, f_Jet, function(f_Amount, af_Jet)
										{
										var f_finalBalance = parseFloat(f_Amount) + parseFloat(f_Transaction.m_vec_txout[af_Jet].m_txoutamt);

										$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-owner.php", {type: "GWQ_OWNER", owner: f_Transaction.m_vec_txout[af_Jet].m_owner, amt: f_finalBalance}, function(data, status) {}, "json");
										
										f_Transaction.m_vec_txout[af_Jet].m_owneramt = f_finalBalance;
										
										if(af_Jet >= (f_Transaction.m_idx_vec_txout - 1))
											{
											f_Transaction.acHash();
					
											f_Result += f_Transaction.m_Hash;

											f_Transaction.acUpdateSync();

											//Decided to return here so 1 tx confirmation = 1 share
											callback(f_Result, f_Block, f_rotoner, f_TxLCount);
											}
										});
									}
								else
									{ // Change Transaction
									ag_OwnerBalance(f_Transaction.m_vec_txout[f_Jet].m_owner, f_Jet, function(f_Amount, af_Jet)
										{
										var f_finalBalance = parseFloat(f_Amount) + parseFloat(f_Transaction.m_vec_txout[af_Jet].m_txoutamt);
										
										f_Transaction.m_vec_txout[af_Jet].m_owneramt = f_finalBalance;
										
										if(af_Jet >= (f_Transaction.m_idx_vec_txout - 1))
											{
											f_Transaction.acHash();
					
											f_Result += f_Transaction.m_Hash;

											f_Transaction.acUpdateSync();

											//Decided to return here so 1 tx confirmation = 1 share
											callback(f_Result, f_Block, f_rotoner, f_TxLCount);
											}
										});
									}
								}
							}
						else
							{
							f_Result = f_Result + "00000000000000000000000000000001";
							}
						}
					else
						{
						f_Result = f_Result + f_hash;
						
						if((f_Transaction.m_confirmation < 6) && (f_Transaction.m_fresh == true))
							{
								//  Increase Confirmation
							$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-tx-confirmation.php", {type: "GWQ_CONFIRMATION", txid: f_Transaction.m_txid, confirmation: f_Transaction.m_confirmation}, function(data, status) {}, "json");
							}
						}

					callback(f_Result, f_Block, f_rotoner, f_TxLCount);
					}
				else
					{
					if(f_Transaction.m_fresh == false)
						{
						//DELETE transaction or flag as suspicious
						$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-tx-status.php", {type: "GWQ_TX_STATUS", txid: f_Transaction.m_txid, status: -5}, function(data, status) {}, "json");
						}
					else
						{	//unverified yet to be checked transaction hash of 1
						if(f_conf < 6)
							{
							f_Result = f_Result + "00000000000000000000000000000001";
							}
						else
							{
							f_Result = f_Result + f_hash;
							}
						}
						
					callback(f_Result, f_Block, f_rotoner, f_TxLCount);
					}
				});
			});
		}, function(f_Result)
			{
			callback(f_Result, 0, 0, 0);
			});
}

function ag_GatherTransactions(f_JobID, f_Block, callback)
{
	console.log("ag_GatherTransactions");

	var f_Result = "";
	
	ag_GatherFunction(f_JobID, f_Result, f_Block, function(f_Results, f_Block, f_rotoner, f_TxLCount)
		{
		callback(f_Results, f_Block, f_rotoner, f_TxLCount);
		});
}

function ag_VoteShareUp(f_ShareID, f_DisplayType)
{
	$.post("http://www.bitcoin-office.com/link-request-vote-share-up.php", {shareid: f_ShareID}, function(data, status)
		{
		var response = data;
		var result = response.result;
		var resultcount = response.resultcount;
		var score = response.score;
		
		if(f_DisplayType == 1)
			{
			if(result == "Vote!")
				{
				var f_Text = "ECN::Stat::: Voted on share " + f_ShareID;
				console.log(f_Text);
				document.getElementById("votingresults").innerHTML = f_Text;
				document.getElementById("voteresult").innerHTML = "Current Vote is " + score;
				}
			else if(result == "Block Found!")
				{
				var f_Text = "ECN::Stat::: by you Block Found! Voting on share " + f_ShareID;
				console.log(f_Text);
				document.getElementById("votingresults").innerHTML = f_Text;
				}
			else if(result == "Sorry only one vote per wallet...")
				{
				var f_Text = "ECN::Error::: Sorry only one vote per wallet...";
				console.log(f_Text);
				document.getElementById("votingresults").innerHTML = f_Text;
				}
			else
				{
				var f_Text = "ECN::Error::: Sorry unknown error";
				console.log(f_Text);
				document.getElementById("votingresults").innerHTML = f_Text;
				}
			}
		else if(f_DisplayType == 2)
			{
			if(result == "Vote!")
				{
				var f_Text = "ECN::Stat::: Voted on share " + f_ShareID;
				console.log(f_Text);
				alert(f_Text);
				}
			else if(result == "Block Found!")
				{
				var f_Text = "ECN::Stat::: by you Block Found! Voting on share " + f_ShareID;
				console.log(f_Text);
				alert(f_Text);
				}
			else if(result == "Sorry only one vote per wallet...")
				{
				var f_Text = "ECN::Error::: Sorry only one vote per wallet...";
				console.log(f_Text);
				alert(f_Text);
				}
			else
				{
				var f_Text = "ECN::Error::: Sorry unknown error";
				console.log(f_Text);
				alert(f_Text);
				}
			}
		}, "json");
}

/*CubeTransaction.prototype.acGetTXOutsFromTiers = function()
{
	var f_InputHash = "";
	
	$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id FROM share WHERE shareledger = '" + f_Hash.m_OutputHash + "'"}, function(data, status)
				{
				var response = data;
				var resultcount = response.resultcount;
				
				console.log("resultcount: " + resultcount);
			
				if(resultcount <= 0)
					{
					console.log("Inserting share!");
					
					$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-long-share.php", {type: "GWQ_SHARE", mark: f_Target.m_Mark, jobid: f_JobID, hash: f_Hash.m_OutputHash, owner: "0360ce57376c9433e2a677216e8f5ef14f307b18a71b5c806f508084442ee1f7", bck_red: f_Hesh.m_bckred, bck_green: f_Hesh.m_bckgreen, bck_blue: f_Hesh.m_bckblue}, function(data, status)
						{
						ag_Wait(3000);

	for(var f_x = 0; f_x < this.m_idx_vec_txin; f_x++)
		{
		f_InputHash += this.m_vec_txin[f_x].m_txid;
		f_InputHash += this.m_vec_txin[f_x].m_prvtxid;
		f_InputHash += this.m_vec_txin[f_x].m_prvtxoutid;
		f_InputHash += this.m_vec_txin[f_x].m_gnshareid;
		f_InputHash += this.m_vec_txin[f_x].m_vout;
		f_InputHash += this.m_vec_txin[f_x].m_pubkey;
		f_InputHash += this.m_vec_txin[f_x].m_sigstr;
		}

	for(var f_y = 0; f_y < m_idx_vec_txout; f_y++)
		{
		f_InputHash += this.m_vec_txout[f_y].m_txid;
		f_InputHash += this.m_vec_txout[f_y].m_adrid;
		f_InputHash += this.m_vec_txout[f_y].m_owner;
		f_InputHash += this.m_vec_txout[f_y].m_pubkey;
		f_InputHash += this.m_vec_txout[f_y].m_txoutamt;
		f_InputHash += this.m_vec_txout[f_y].m_owneramt;
		}

	//add extra data like status etc.
	f_InputHash += this.m_amt;
	f_InputHash += this.m_txid;
	f_InputHash += this.m_jobid;
	f_InputHash += this.m_confirmation;
	f_InputHash += this.m_hdid;
	
	var hash = sha256.create();
	hash.update(f_InputHash);
	this.m_Hash = hash.hex();
}*/