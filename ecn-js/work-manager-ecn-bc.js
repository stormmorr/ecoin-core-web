var console = window.console ?  window.console : { log: function() {} };
var worker = null;
var testmode = false;
var repeat_to = null;
var init = false;
var start = null;
var heshes_per_second = 0;
var total_heshed = 0;

var g_sharefield = new Array();
var g_sharevalue = new Array();
var g_cubefield = new Array();
var g_cubevalue = new Array();

var g_Wallet = new ecnWallet();

var g_admax = 100;

var g_EBlocker = 0;

function readScript(n)
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", n, false);
    xhr.send(null);
    var x = xhr.responseText;
    return x;
};

function onError(data)
	{
    $('#info').val(data.status + " " + data.responseText);
	}

function respobject(id, result, error)
	{
	this.id = id;
	this.result = result;
	this.error = error;
	}
	
function ag_PrepareInsert(f_Table, f_Count, f_Fields, f_Values)
{
	var f_sql = "INSERT INTO " + f_Table;
   
    var fields = new Array();
	var values = new Array();
	
	for(var i = 0; i < f_Count; i++)
		{
        fields[i] = f_Fields[i];
        values[i] = "'" + f_Values[i] + "'";
        }
		
    var f_ResFields = ' (' + fields.join(', ') + ')';
    var f_ResValues = '(' + values.join(', ') + ')';
        
    f_sql += f_ResFields + ' VALUES ' + f_ResValues;

    return f_sql;
}

function ag_PrepareUpdate(f_Table, f_Count, f_Fields, f_Values, f_Where)
{
	var f_sql = "UPDATE " + f_Table + " SET ";
   
	var updates = new Array();
	
	for(var i = 0; i < f_Count; i++)
		{
        updates[i] = "`" + f_Fields[i] + "` = '" + f_Values[i] + "'";
        }
		
    f_sql += updates.join(', ');
	
	f_sql += ' WHERE ' + f_Where;

    return f_sql;
}

function bin2hex(s)
{
    // Converts the binary representation of data to hex    
    //   
    // version: 812.316  
    // discuss at: http://phpjs.org/functions/bin2hex  
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)  
    // +   bugfixed by: Onno Marsman  
    // +   bugfixed by: Linuxworld  
    // *     example 1: bin2hex('Kev');  
    // *     returns 1: '4b6576'  
    // *     example 2: bin2hex(String.fromCharCode(0x00));  
    // *     returns 2: '00'  
    var v,i, f = 0, a = [];  
    s += '';  
    f = s.length;  
      
    for (i = 0; i<f; i++)
		{  
        a[i] = s.charCodeAt(i).toString(16).replace(/^([\da-f])$/,"0$1");  
		}  
      
    return a.join('');  
}

function ag_formInput(f_Array, f_Size)
{
	var f_InputResult = "";
	
	for(i = 0; i < f_Size; i++)
		{
		var f_Hex = bin2hex(f_Array[i]);
		
		f_InputResult += f_Hex;
		}
		
	return f_InputResult;
}

function onSuccess(jsonresp, f_admax)
{
	console.log("onSuccess...");
	
    if(worker)
		{
        try
			{
            worker.postMessage( { run: false } );
            worker.terminate();
			}
		catch(e)
			{
			console.log("worker overrun...");
			}
		}

    var response = jsonresp;
    var data = JSON.stringify(response);

    //$('#info').val(data);
	console.log(data);
		
	var job = {};

    job.run = true;
	job.end = false;
    job.work = data;
    job.admax = f_admax;
	
    job.responseTime = (new Date()).getTime();
	job.response = response;
	
	var f_Hesh = new ecnHesh();
				
	console.log("Prepped ecnHesh");

	job.hesh = f_Hesh;
	job.jobid = 3;
	job.targdiff = 105000.5;

    var t = 70.0; //Target mark threshold PLEASE SET GLOBAL OR IF HERE
    var d = 26; //Difficulty
	
    $('#target').val(t + "/" + d.toFixed(3));

	if(0)
		{
        var postMessage = function(m)
			{
            onWorkerMessage({ data: m });
			}
			
        worker = { postMessage : function(m) { worker.intMessage( { data: m} ); },
                   intMessage: function() {} };
        var m = readScript('ecn-js/miner-ecn-bc.js');
        var s = '(function() {' + m + ';\n' + 'onmessage({ data: job });' + ' worker.intMessage = onmessage; })';
        var run = eval(s);
        run();
		}
	else
		{
		shrsource = 2;
		shrinfo = 0;
		
        worker = new Worker("ecn-js/miner-ecn-bc.js");
        worker.onmessage = onWorkerMessage;
        worker.onerror = onWorkerError;
        worker.postMessage(job);
		}

    init = true;
}

function eSession(f_admax)
{
    testmode = false;
    start = (new Date()).getTime();
	
	g_admax = f_admax;
	
	console.log("Welcome to ecoin the visual light miner!");
	console.log("           Majority share for the Majority");
	console.log("...loading ecnWallet...");
	
	//ag_GatherTransactions(3);
	
	this.m_vec_Wallet = [];
	this.m_idx_vec_wallet = 0;
	
	//var f_Wallet = new ecnWallet();
	
	this.m_vec_Wallet[this.m_idx_vec_wallet] = g_Wallet;
	this.m_idx_vec_wallet++;
	
	this.f_TargetID = 1;
    
    ag_GetTargetFromID(this.f_TargetID, g_admax);
}

function ag_GetTargetFromID(f_TargetID, f_admax)
{
	$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast-target-volume.php", {targetid: 1}, function(data, status)
		{
		onSuccess(data, f_admax);
		}, "json");
}

function ag_Load_Share(f_ShareID, f_JobID, f_PEER, f_CurrentShareOffset, thetaxx, thetaxy, thetaxz)
{	
	$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast-ary.php", {shareid: f_ShareID, jobid: f_JobID, peer: f_PEER, offset: f_CurrentShareOffset, thetaxx, thetaxy, thetaxz}, function(data, status)
		{
		var clobnom = data.clobnom;
		var clobarray = data.clob;
		
		var f_ShareIDX = data.shareid;
		
		console.log("ECN displaying share id " + f_ShareIDX);

		eminer(clobarray, clobnom, data.hellynom, data.clob_bckred, data.clob_bckgreen, data.clob_bckblue, data.thetaxz, data.thetaxy, data.thetaxx);
		}, "json");
}

function ag_Wait(f_Length)
{						
	for(var f_X = 0; f_X < f_Length; f_X++)
		{
		for(var f_X = 0; f_X < f_Length; f_X++)
			{
			for(var f_X = 0; f_X < f_Length; f_X++)
				{
				}
			}
		}
}

function onWorkerMessage(event)
{
    var job = event.data;

	var f_Target = job.heshtarget;
	var f_Save = job.save;
	var f_TargetDifficulty = job.targdiff;
	
	if(f_Save == true)
		{
		var f_Hash = job.hash;
		var f_Hesh = job.hesh;
		
		console.log("Share Found! Mark = " + f_Target.m_Mark);
		
			////////////
		   //
		  // Hash
		 //
		var f_InputString = ag_formInput(f_Hash.m_vec_Input, f_Hash.m_idx_vec_Input);
		 
		var hash = sha256.create();
		hash.update(f_InputString);
		var f_InputHash = hash.hex();
		
		console.log(f_InputHash);

		// check GenesisBlock (assume)
		var f_previousblock = "0000000000000000000000000000000000000000000000000000000000000001";
		
		 ///////////////
		// post	
		$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id, jobid, blockledger, dated FROM block ORDER BY dated DESC LIMIT 1"}, function(data, status)
			{
			var resp = data;
			var resultcount = resp.resultcount;
		
			var g_JobID = 1;
			var f_BlockID = 1;
		
			if(resultcount > 0)
				{
				f_BlockID = resp.result[0];
				g_JobID = resp.result[1];
				g_JobID++;
				f_previousblock = resp.result[2];
				}
				
			var f_JobID = g_JobID;
			
			var f_Block = 0;
			
			var f_tx = "";
			
			g_EBlocker = 1;
			
			ag_GatherTransactions(g_JobID, f_Block, function(f_Results, f_Block, f_rotoner, f_TxLCount)
				{
				f_tx += f_Results;
				
				//console.log("f_Block: " + f_Block + " f_TxLCount: " + f_TxLCount + " g_EBlocker: " + g_EBlocker);
				
				if((f_Block >= (f_TxLCount - 1)) && (g_EBlocker == 1))
					{
					g_EBlocker = 0;
						
					var f_job = f_tx + f_previousblock;
					
					f_InputHash += f_job;
					
					//hey you could add a nonce here, btw extra nonce extended POW
					
					var sharehash = sha256.create();
					sharehash.update(f_InputHash);
					f_Hash.m_OutputHash = sharehash.hex();
					
					f_Hesh.m_Hash = f_Hash;

					$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id FROM share WHERE shareledger = '" + f_Hash.m_OutputHash + "'"}, function(data, status)
						{
						var response = data;
						var resultcount = response.resultcount;
					
						if(resultcount <= 0)
							{
							$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-long-share.php", {type: "GWQ_SHARE", mark: f_Target.m_Mark, jobid: f_JobID, hash: f_Hash.m_OutputHash, owner: "0360ce57376c9433e2a677216e8f5ef14f307b18a71b5c806f508084442ee1f7", bck_red: f_Hesh.m_bckred, bck_green: f_Hesh.m_bckgreen, bck_blue: f_Hesh.m_bckblue}, function(data, status)
								{		
								$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id FROM share WHERE shareledger = '" + f_Hash.m_OutputHash + "'"}, function(data, status)
									{
									var resp = data;
									var resultcount = resp.resultcount;
							
									if(resultcount == 1)
										{
										var resultid = resp.result[0];
									
										var f_ShareUniqueID = resultid;
										var f_ShareID = f_ShareUniqueID;
										
										console.log("Share " + f_ShareID + " Submitted!");
										
										//note use cookies instead of machine hdid
										ag_addGenesisTracking(f_ShareUniqueID, f_JobID, g_Wallet);
										
										for(var f_Int = 0; f_Int < f_Hesh.m_idx_vec_Cube; f_Int++)
											{
											$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-long-cube.php", {type: "GWQ_CUBE",
												vert1x: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[0].m_X,
												vert1y: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[0].m_Y,
												vert1z: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[0].m_Z,
												vert2x: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[1].m_X,
												vert2y: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[1].m_Y,
												vert2z: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[1].m_Z,
												vert3x: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[2].m_X,
												vert3y: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[2].m_Y,
												vert3z: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[2].m_Z,
												vert4x: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[3].m_X,
												vert4y: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[3].m_Y,
												vert4z: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[3].m_Z,
												vert5x: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[4].m_X,
												vert5y: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[4].m_Y,
												vert5z: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[4].m_Z,
												vert6x: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[5].m_X,
												vert6y: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[5].m_Y,
												vert6z: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[5].m_Z,
												vert7x: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[6].m_X,
												vert7y: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[6].m_Y,
												vert7z: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[6].m_Z,
												vert8x: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[7].m_X,
												vert8y: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[7].m_Y,
												vert8z: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[7].m_Z,
												vert1r: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[0].m_X,
												vert1g: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[0].m_Y,
												vert1b: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[0].m_Z,
												vert2r: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[1].m_X,
												vert2g: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[1].m_Y,
												vert2b: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[1].m_Z,
												vert3r: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[2].m_X,
												vert3g: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[2].m_Y,
												vert3b: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[2].m_Z,
												vert4r: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[3].m_X,
												vert4g: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[3].m_Y,
												vert4b: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[3].m_Z,
												vert5r: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[4].m_X,
												vert5g: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[4].m_Y,
												vert5b: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[4].m_Z,
												vert6r: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[5].m_X,
												vert6g: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[5].m_Y,
												vert6b: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[5].m_Z,
												vert7r: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[6].m_X,
												vert7g: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[6].m_Y,
												vert7b: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[6].m_Z,
												vert8r: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[7].m_X,
												vert8g: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[7].m_Y,
												vert8b: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[7].m_Z,
												jobid: f_JobID,
												shareid: f_ShareID}, function(data, status)
												{
												/*var response = data;
												var resultid = response.lastid;
												
												g_adifield[0] = "adindex";
												g_adifield[1] = "cubeindex";
												g_adifield[2] = "heshid";
										
												g_adivalue[0] = resultid;
												g_adivalue[1] = f_Hesh.m_vec_Cube[f_Int];
												g_adivalue[2] = f_ShareID;

												$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_INSERT", query: ag_PrepareInsert("adindex", 3, g_adifield, g_adivalue)}, function(data, status)
													{
													}, "json");*/
												}, "json");
											}
											
										if(f_ShareID > 0)
											{
											ag_Wait(3000000);
											
											ag_Load_Share(f_ShareID, f_JobID, 0, 0, 0.0, 0.0, 0.0);
											
											ag_GetTargetFromID(1, g_admax);
											}
										}
									}, "json");
								}, "json");
							}
						}, "json");
					}
				});
			}, "json");
		}
	else
		{
		console.log("HeshRate: " + heshes_per_second + " < Grade: " + f_TargetDifficulty);
		}

	if(!job.total_heshes) job.total_heshes = 1;

	var total_time = ((new Date().getTime()) - start) / 1000;
	total_heshed = job.total_heshes;
	heshes_per_second = total_heshed;

	$('#total-hashes').val(total_heshed);
	var newp = Number($('#hashes-per-second').val());
	$('#hashes-per-second').val(heshes_per_second);
}

function onWorkerError(event)
{
	console.log(event.data);
	throw event.data;
}