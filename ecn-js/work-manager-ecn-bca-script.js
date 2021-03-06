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

var g_admax = 5;

var g_EBlocker = 0;

var g_vec_TargetFunc = [];
var g_idx_vec_TargetFunc = 0;

var g_ConstantMining = false;

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
	//console.log(data);
		
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
	job.targdiff = 30;
	job.globaltarget = g_Target;

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
        var m = readScript('ecn-js/miner-ecn-bca-script.js');
        var s = '(function() {' + m + ';\n' + 'onmessage({ data: job });' + ' worker.intMessage = onmessage; })';
        var run = eval(s);
        run();
		}
	else
		{
		shrsource = 2;
		shrinfo = 0;
		
        worker = new Worker("ecn-js/miner-ecn-bca-script.js");
        worker.onmessage = onWorkerMessage;
        worker.onerror = onWorkerError;
		worker.addEventListener('message', onWorkerMessage, false);
		worker.addEventListener('error', onWorkerError, false);
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
	
	//Input
	for(var f_XY = 0; f_XY < g_idx_vec_scrInputHTML; f_XY++)
		{
		if(g_vec_scrInputHTML[f_XY] != "Ex")
			{
			document.getElementById("wwh_base_inputcanvas").innerHTML += g_vec_scrInputHTML[f_XY];
			}
		}
}

function eStartMiner()
{
	console.log("Starting ecn miner");
	
	var f_TargetID = 1;
    
    ag_GetTargetFromID(f_TargetID, g_admax);
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

function ag_CompileTarget_Script(response)
{
	var hellynom = response.helly;
	var hollynom = response.holly;
	var tvob = response.tvob;
	var tcob = response.tcob;
	
	var f_Target = new classTarget_JScript();
	
	//f_Target.acMergeUpper();
	
	var f_FunctionCount = 1;
	for(var f_funcCount = 0; f_funcCount < f_FunctionCount; f_funcCount++)
		{
		var f_Function = new classFunction();
		f_Function.m_Name = "";
		
		 ////////////////
		// Demo 
		
		//Inputs Var		
		/*while(f_Target.m_GRMinput[INSTA_TYPE_VAR_CALL] > -5)
			{
			var f_vec_Line = [];
			var f_idx_vec_Line = 0;
			
			if(f_Target.m_GRMinput[INSTA_TYPE_VAR_CALL] > -5)
				{
				var f_NewInstaVarDef = new classInsta();
				f_NewInstaVarDef.m_Type = INSTA_TYPE_VAR_DEF;
				f_NewInstaVarDef.m_String = "var * = ";
				f_NewInstaVarDef.m_value = 0.0;
			
				var f_NewInstaInputCall = new classInsta();
				f_NewInstaInputCall.m_Type = INSTA_TYPE_VAR_CALL;
				f_NewInstaInputCall.m_String = f_Target.ac_next_InputName(INSTA_TYPE_VAR_CALL);
				f_NewInstaInputCall.m_value = 0.0;
			
				f_vec_Line[f_idx_vec_Line] = f_NewInstaVarDef;
				f_idx_vec_Line++;
				f_vec_Line[f_idx_vec_Line] = f_NewInstaInputCall;
				f_idx_vec_Line++;
			
				f_Function.m_vec_CodeLineStorage[f_Function.m_idx_vec_CodeLineStorage] = f_vec_Line;
				f_Function.m_idx_vec_CodeLineStorage++;
				}
			}*/
			
		//Output string
		/*while(f_Target.m_GRMoutput[INSTA_TYPE_FUNC_CALL] > -5)
			{
			var f_NewInstaVarDef = new classInsta();
			f_NewInstaVarDef.m_Type = INSTA_TYPE_FUNC_CALL;
			f_NewInstaVarDef.m_String = f_Target.ac_next_OutputName(INSTA_TYPE_FUNC_CALL);
			f_NewInstaVarDef.m_value = 0.0;
				
			while(f_Target.m_GRMoutput[INSTA_TYPE_VAR_CALL] > -5)
				{
				var f_NewInstaInputCall = new classInsta();
				f_NewInstaInputCall.m_Type = INSTA_TYPE_VAR_CALL;
				f_NewInstaInputCall.m_String = f_Target.ac_next_OutputName(INSTA_TYPE_VAR_CALL);
				f_NewInstaInputCall.m_value = 0.0;
			
				f_vec_Line[f_idx_vec_Line] = f_NewInstaVarDef;
				f_idx_vec_Line++;
				f_vec_Line[f_idx_vec_Line] = f_NewInstaInputCall;
				f_idx_vec_Line++;
			
				f_Function.m_vec_CodeLineStorage[f_Function.m_idx_vec_CodeLineStorage] = f_vec_Line;
				f_Function.m_idx_vec_CodeLineStorage++;
				}
			}*/
			
		f_Target.m_vec_Function[f_Target.m_idx_vec_Function] = f_Function;
		f_Target.m_idx_vec_Function++;
		}	
		
	console.log("Loaded classTarget-jscript-base ID 1x");
	
	return f_Target;
}

var f_Hesh = new ecnHesh();
var g_Target = new classTarget_JScript();

function ag_Load_Share_Script(f_ShareID, f_JobID, f_PEER, f_CurrentShareOffset, thetaxx, thetaxy, thetaxz)
{	
	$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast-ary.php", {shareid: f_ShareID, jobid: f_JobID, peer: f_PEER, offset: f_CurrentShareOffset, thetaxx, thetaxy, thetaxz}, function(data, status)
		{
		var clobnom = data.clobnom;
		var clobarray = data.clob;
		
		var f_ShareIDX = data.shareid;

		console.log("ECN displaying share id " + f_ShareIDX);

		eminer(clobarray, clobnom, data.hellynom, data.clob_bckred, data.clob_bckgreen, data.clob_bckblue, data.thetaxz, data.thetaxy, data.thetaxx);

		// Hesh Generator
		for(var f_Int = 0; f_Int < clobnom; f_Int++)
			{
			var f_Bike = new CubeBicycle();
			
			var f_Vector1v = new BiVector(parseFloat(clobarray[(f_Int * (8 * 6))]), parseFloat(clobarray[(f_Int * (8 * 6)) + 1]), parseFloat(clobarray[(f_Int * (8 * 6)) + 2]));
			var f_Vector1c = new BiVector(parseFloat(clobarray[(f_Int * (8 * 6)) + 3]), parseFloat(clobarray[(f_Int * (8 * 6)) + 4]), parseFloat(clobarray[(f_Int * (8 * 6)) + 5]));
			var f_Vector2v = new BiVector(parseFloat(clobarray[(f_Int * (8 * 6)) + 6]), parseFloat(clobarray[(f_Int * (8 * 6)) + 7]), parseFloat(clobarray[(f_Int * (8 * 6)) + 8]));
			var f_Vector2c = new BiVector(parseFloat(clobarray[(f_Int * (8 * 6)) + 9]), parseFloat(clobarray[(f_Int * (8 * 6)) + 10]), parseFloat(clobarray[(f_Int * (8 * 6)) + 11]));			
			var f_Vector3v = new BiVector(parseFloat(clobarray[(f_Int * (8 * 6)) + 12]), parseFloat(clobarray[(f_Int * (8 * 6)) + 13]), parseFloat(clobarray[(f_Int * (8 * 6)) + 14]));
			var f_Vector3c = new BiVector(parseFloat(clobarray[(f_Int * (8 * 6)) + 15]), parseFloat(clobarray[(f_Int * (8 * 6)) + 16]), parseFloat(clobarray[(f_Int * (8 * 6)) + 17]));
			var f_Vector4v = new BiVector(parseFloat(clobarray[(f_Int * (8 * 6)) + 18]), parseFloat(clobarray[(f_Int * (8 * 6)) + 19]), parseFloat(clobarray[(f_Int * (8 * 6)) + 20]));
			var f_Vector4c = new BiVector(parseFloat(clobarray[(f_Int * (8 * 6)) + 21]), parseFloat(clobarray[(f_Int * (8 * 6)) + 22]), parseFloat(clobarray[(f_Int * (8 * 6)) + 23]));
			var f_Vector5v = new BiVector(parseFloat(clobarray[(f_Int * (8 * 6)) + 24]), parseFloat(clobarray[(f_Int * (8 * 6)) + 25]), parseFloat(clobarray[(f_Int * (8 * 6)) + 26]));
			var f_Vector5c = new BiVector(parseFloat(clobarray[(f_Int * (8 * 6)) + 27]), parseFloat(clobarray[(f_Int * (8 * 6)) + 28]), parseFloat(clobarray[(f_Int * (8 * 6)) + 29]));
			var f_Vector6v = new BiVector(parseFloat(clobarray[(f_Int * (8 * 6)) + 30]), parseFloat(clobarray[(f_Int * (8 * 6)) + 31]), parseFloat(clobarray[(f_Int * (8 * 6)) + 32]));
			var f_Vector6c = new BiVector(parseFloat(clobarray[(f_Int * (8 * 6)) + 33]), parseFloat(clobarray[(f_Int * (8 * 6)) + 34]), parseFloat(clobarray[(f_Int * (8 * 6)) + 35]));
			var f_Vector7v = new BiVector(parseFloat(clobarray[(f_Int * (8 * 6)) + 36]), parseFloat(clobarray[(f_Int * (8 * 6)) + 37]), parseFloat(clobarray[(f_Int * (8 * 6)) + 38]));
			var f_Vector7c = new BiVector(parseFloat(clobarray[(f_Int * (8 * 6)) + 39]), parseFloat(clobarray[(f_Int * (8 * 6)) + 40]), parseFloat(clobarray[(f_Int * (8 * 6)) + 41]));
			var f_Vector8v = new BiVector(parseFloat(clobarray[(f_Int * (8 * 6)) + 42]), parseFloat(clobarray[(f_Int * (8 * 6)) + 43]), parseFloat(clobarray[(f_Int * (8 * 6)) + 44]));
			var f_Vector8c = new BiVector(parseFloat(clobarray[(f_Int * (8 * 6)) + 45]), parseFloat(clobarray[(f_Int * (8 * 6)) + 46]), parseFloat(clobarray[(f_Int * (8 * 6)) + 47]));

			f_Bike.m_vec_Vertex[0] = f_Vector1v;
			f_Bike.m_vec_Vertex[1] = f_Vector2v;
			f_Bike.m_vec_Vertex[2] = f_Vector3v;
			f_Bike.m_vec_Vertex[3] = f_Vector4v;
			f_Bike.m_vec_Vertex[4] = f_Vector5v;
			f_Bike.m_vec_Vertex[5] = f_Vector6v;
			f_Bike.m_vec_Vertex[6] = f_Vector7v;
			f_Bike.m_vec_Vertex[7] = f_Vector8v;

			f_Bike.m_idx_vec_Vertex = 8;

			f_Bike.m_vec_Color[0] = f_Vector1c;
			f_Bike.m_vec_Color[1] = f_Vector2c;
			f_Bike.m_vec_Color[2] = f_Vector3c;
			f_Bike.m_vec_Color[3] = f_Vector4c;
			f_Bike.m_vec_Color[4] = f_Vector5c;
			f_Bike.m_vec_Color[5] = f_Vector6c;
			f_Bike.m_vec_Color[6] = f_Vector7c;
			f_Bike.m_vec_Color[7] = f_Vector8c;
			
			f_Bike.m_idx_vec_Color = 8;
			
			var f_KEY = new CubeKEY();
			
			f_KEY.acAddBicycle(f_Bike);
			
			f_Hesh.m_vec_Key[f_Hesh.m_idx_vec_Key] = f_KEY;
			f_Hesh.m_idx_vec_Key++;
			}

		for(var f_Integer = 0; f_Integer < clobnom; f_Integer++)
			{
			f_Hesh.m_vec_Cube[f_Hesh.m_idx_vec_Cube] = f_Integer;
			f_Hesh.m_idx_vec_Cube++;
			}

		var f_ColorBCK = new BiVector(data.clob_bckred, data.clob_bckgreen, data.clob_bckblue);

		  ////////////
		 // HESH   //
		// Target //
		//f_Hesh.m_Hash = f_Hash;

		f_Hesh.m_bckred = f_ColorBCK.m_X;
		f_Hesh.m_bckgreen = f_ColorBCK.m_Y;
		f_Hesh.m_bckblue = f_ColorBCK.m_Z;
		
		 //////////////////
		// Affinity
		$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast-target-volume.php", {targetid: 1}, function(data2, status)
			{
			var response = data2;
			
			g_Target = ag_CompileTarget_Script(response);

			var f_TargetScript = new classTarget_JScript();
	
			//f_TargetScript.acMerge_ICOtoName();
			//f_TargetScript.acMergeUpper();
			
			f_TargetScript.acFromHesh(f_Hesh, g_Target);
			
			//document.getElementById('script').innerHTML = "<textarea unselectable=\"on\" rows=\"10\" cols=\"80\" style=\"user-select: none;\">" + f_TargetScript.m_String + "</textarea>";
			document.getElementById('script').innerHTML = f_TargetScript.m_String;
			
			g_vec_TargetFunc[g_idx_vec_TargetFunc] = f_TargetScript;
			g_idx_vec_TargetFunc++;
			
			ag_ElementButton("Execute", "ag_LaunchTime();");
			
			console.log("Checkin' Script!");
			
			var f_ClearCute = true;
			var f_LaunchString = ag_LaunchPrep(f_TargetScript.m_vec_Function[0].m_vec_String);
			try
				{
				//g_Target.acEvalNames();
				ag_Eval(g_Target);
					
				eval(f_LaunchString);
				
				ag_StartApp();
				
				ag_LaunchFunction();
				}
			catch(e)
				{
				//console.log(f_LaunchString);
				//console.log(JSON.stringify(e)); //*****UNCOMMENT FOR SYNTAX THEN PROPER ERROR SOLVE *****
				//document.getElementById("scripterrors").innerHTML = "<h3>" + JSON.stringify(e) + "</h3>";
				throw(e);
				f_ClearCute = false;
				}
				
			if(f_ClearCute == true)
				{
				console.log("ALL good! script is clean!");
				
				//var f_Function = new Function(f_TargetScript.m_vec_Function[0].m_vec_String);
				
				//f_Function();
				}
			else
				{
				console.log("ERRORS in script!");
				}

			  ///////////////
			 // share info
			//
			$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id, mark FROM share WHERE id = " + f_ShareID}, function(data, status)
				{
				var resp = data;
				var resultcount = resp.resultcount;

				if(resultcount == 1)
					{
					document.getElementById('grademark').innerHTML = 'GradeMark(highest) - ' + resp.result[1];
					}
				}, "json");
			}, "json");
		}, "json");
}

function ag_LaunchPrep(f_String)
{
	var f_Result = "";
	var f_LP_CT = 0;
	
	for(var f_CharCnt = 0; f_CharCnt < f_String.length; f_CharCnt++)
		{
		var f_Char = f_String.charAt(f_CharCnt);
		
		if(f_LP_CT == 0)
			{
			if(f_Char == ' ')
				{
				f_Result += f_Char + "ag_LaunchFunction(";
				f_LP_CT++;
				}
			else
				{
				f_Result += f_Char;	
				}
			}
		else if(f_LP_CT == 1)
			{
			if(f_Char == ')')
				{
				f_Result += f_Char;
				f_LP_CT++;
				}
			}
		else if(f_LP_CT == 2)
			{
			if(f_Char == '{')
				{
				f_Result += f_Char + "firstinput++;document.getElementById('cutebay').innerHTML += firstinput;";
				f_LP_CT++;
				}
			else
				{
				f_Result += f_Char;	
				}
			}
		else
			{
			f_Result += f_Char;
			}
		}
		
	var f_ListInputVarCall = new classListI(INSTA_TYPE_VAR_CALL);
				
	if(f_ListInputVarCall.m_idx_vec_List >= 1)
		{
		for(var f_XY = 0; f_XY < f_ListInputVarCall.m_idx_vec_List; f_XY++)
			{
			var f_Value = 0;
			eval("f_Value = " + f_ListInputVarCall.m_vec_List[f_XY] + ";");
			
			if(f_Value != 0)
				{
				f_Result += "document.getElementById('wwb_base_output1').innerHTML += " + f_ListInputVarCall.m_vec_List[f_XY] + ";";
				}
			}
		}
		
	var f_ListControlVarCall = new classListC(INSTA_TYPE_VAR_CALL);
				
	if(f_ListControlVarCall.m_idx_vec_List >= 1)
		{
		for(var f_XY = 0; f_XY < f_ListControlVarCall.m_idx_vec_List; f_XY++)
			{
			var f_Value = 0;
			eval("f_Value = " + f_ListControlVarCall.m_vec_List[f_XY] + ";");
			
			if(f_Value != 0)
				{
				f_Result += "document.getElementById('wwb_base_output1').innerHTML += " + f_ListControlVarCall.m_vec_List[f_XY] + ";";
				}
			}
		}
		
	var f_ListOutputVarCall = new classListO(INSTA_TYPE_VAR_CALL);
				
	if(f_ListOutputVarCall.m_idx_vec_List >= 1)
		{
		for(var f_XY = 0; f_XY < f_ListOutputVarCall.m_idx_vec_List; f_XY++)
			{
			var f_Value = 0;
			eval("f_Value = " + f_ListOutputVarCall.m_vec_List[f_XY] + ";");
			
			if(f_Value != 0)
				{
				f_Result += "document.getElementById('wwb_base_output1').innerHTML += " + f_ListOutputVarCall.m_vec_List[f_XY] + ";";
				}
			}
		}
		
	/*f_Result += "document.getElementById('wwb_base_output1').innerHTML += f_Result;";
	f_Result += "document.getElementById('wwb_base_output1').innerHTML += f_URL;";
	f_Result += "document.getElementById('wwb_base_output1').innerHTML += f_ResultC1;";
	f_Result += "document.getElementById('wwb_base_output1').innerHTML += f_X;";
	f_Result += "document.getElementById('wwb_base_output1').innerHTML += f_Y;";
	f_Result += "document.getElementById('wwb_base_output1').innerHTML += f_Z;";*/
		
	return f_Result;
}

function ag_LaunchPrepInline(f_String)
{
	var f_Result = "";
	var f_LP_CT = 0;
	
	for(var f_CharCnt = 0; f_CharCnt < f_String.length; f_CharCnt++)
		{
		var f_Char = f_String.charAt(f_CharCnt);
		
		if(f_LP_CT == 0)
			{
			if(f_Char == '{')
				{
				f_LP_CT++;
				}
			else
				{
				//do nothing
				}
			}
		else if(f_LP_CT == 1)
			{
			if(f_Char == '}')
				{
				var f_CharB = f_String.charAt(f_CharCnt + 1);
				var f_CharC = f_String.charAt(f_CharCnt + 2);
				var f_CharD = f_String.charAt(f_CharCnt + 3);
				//do nothing
				if(f_CharB == '/')
					{
					if(f_CharC == '/')
						{
						if(f_CharD == 'e')
							{
							f_LP_CT++;
							}
						else
							{
							f_Result += f_Char;
							}
						}
					else
						{
						f_Result += f_Char;
						}
					}
				else
					{
					f_Result += f_Char;
					}
				}
			else
				{
				f_Result += f_Char;
				}
			}
		else if(f_LP_CT == 2)
			{
			//do nothing
			}
		else
			{
			f_Result += f_Char;
			}
		}
		
	var f_ListInputVarCall = new classListI(INSTA_TYPE_VAR_CALL);
				
	if(f_ListInputVarCall.m_idx_vec_List >= 1)
		{
		for(var f_XY = 0; f_XY < f_ListInputVarCall.m_idx_vec_List; f_XY++)
			{
			var f_Value = 0;
			eval("f_Value = " + f_ListInputVarCall.m_vec_List[f_XY] + ";");
			
			if((f_Value != 0) || 1)
				{
				f_Result += "document.getElementById('wwb_base_output1').innerHTML += " + f_ListInputVarCall.m_vec_List[f_XY] + ";";
				}
			}
		}
		
	var f_ListControlVarCall = new classListC(INSTA_TYPE_VAR_CALL);
				
	if(f_ListControlVarCall.m_idx_vec_List >= 1)
		{
		for(var f_XY = 0; f_XY < f_ListControlVarCall.m_idx_vec_List; f_XY++)
			{
			var f_Value = 0;
			eval("f_Value = " + f_ListControlVarCall.m_vec_List[f_XY] + ";");
			
			if((f_Value != 0) || 1)
				{
				f_Result += "document.getElementById('wwb_base_output1').innerHTML += " + f_ListControlVarCall.m_vec_List[f_XY] + ";";
				}
			}
		}
		
	var f_ListOutputVarCall = new classListO(INSTA_TYPE_VAR_CALL);
				
	if(f_ListOutputVarCall.m_idx_vec_List >= 1)
		{
		for(var f_XY = 0; f_XY < f_ListOutputVarCall.m_idx_vec_List; f_XY++)
			{
			var f_Value = 0;
			eval("f_Value = " + f_ListOutputVarCall.m_vec_List[f_XY] + ";");
			
			if((f_Value != 0) || 1)
				{
				f_Result += "document.getElementById('wwb_base_output1').innerHTML += " + f_ListOutputVarCall.m_vec_List[f_XY] + ";";
				}
			}
		}
		
	return f_Result;
}

function ag_LaunchTime()
{
	if(g_idx_vec_TargetFunc >= 1)
		{
		var f_ClearCute = true;
		var f_LaunchStringInline = ag_LaunchPrepInline(g_vec_TargetFunc[0].m_vec_Function[0].m_vec_String);
		try
			{
			ag_Eval(g_Target);
			
			ag_StartApp();
				
			eval(f_LaunchStringInline);
			
			//ag_LaunchFunction();
			}
		catch(e)
			{
			console.log(f_LaunchStringInline);
			//console.log(JSON.stringify(e)); //*****UNCOMMENT FOR SYNTAX THEN PROPER ERROR SOLVE *****
			//document.getElementById("scripterrors").innerHTML = "<h3>" + JSON.stringify(e) + "</h3>";
			throw(e);
			}
				
		if(f_ClearCute == true)
			{
			console.log("Finished Execution number = " + firstinput);
			}
		}
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

var g_Target = new classTarget_JScript();
var g_PopulusFeeder = new fillPopulusFeeder(1);

function fillPopulusFeeder(f_Size)
{
	this.m_vec_Bool = [];
	this.m_Size = f_Size;
	
	for(var f_Jet = 0; f_Jet < f_Size; f_Jet++)
		{
		this.m_vec_Bool[f_Jet] = true;	
		}
}

fillPopulusFeeder.prototype.acFeed = function (f_Index)
{
	this.m_vec_Bool[f_Index] = false;
	console.log("FED Populus Check idx = " + JSON.stringify(f_Index));
}

fillPopulusFeeder.prototype.acCheckEmpty = function ()
{
	var f_Result = true;
	
	for(var f_Jet = 0; f_Jet < this.m_Size; f_Jet++)
		{
		if(this.m_vec_Bool[f_Jet] == true)
			{
			f_Result = false;
			console.log("ECN-Check Populus Feeder Still Full on " + f_Jet + " Size " + this.m_Size);
			}
		}
		
	if(f_Result == true)
		{
		console.log("ECN Populus Feeder Empty!");
		}
		
	return f_Result;
}

function onWorkerMessage(event)
{
    var job = event.data;

	var f_Target = job.heshtarget;
	var f_GTarget = job.globaltarget;
	var f_Save = job.save;
	var f_TargetDifficulty = job.targdiff;
	var f_ShareResult = job.result;
	var f_HighGrade = job.mark;
		
	if(f_Save == true)
		{
		var f_Hash = job.hash;
		var f_Hesh = job.hesh;
		
		console.log("Share Found! Mark = " + f_HighGrade);
		
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
		
			var g_JobID = 0;
			var f_BlockID = 0;
		
			if(resultcount == 1)
				{
				f_BlockID = resp.result[0];
				g_JobID = resp.result[1];
				g_JobID++;
				f_previousblock = resp.result[2];
				}
				
			console.log("f_previousblock = " + f_previousblock);
				
			var f_JobID = g_JobID;
			var f_Block = 0;
			var f_tx = "";
			
			$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id FROM transactions WHERE (jobid < " + f_JobID + " AND status = 1 AND confirmation < 6) OR (jobid = " + f_JobID + " AND status = 1)"}, function(data, status)
				{
				var txresp = data;
				var txresultcount = txresp.resultcount;
				
				g_EBlocker = 1;
				g_Results = "";
				
				if(txresultcount > 5)
					{
					txresultcount = 5;
					}
				
				g_PopulusFeeder = new fillPopulusFeeder(txresultcount);
				
				ag_GatherTransactions(g_JobID, f_Block, function(f_Results, f_Block, f_rotoner, f_TxLCount)
					{
					if(f_Results != undefined)
						{
						f_tx += f_Results;
						}
					
					console.log("online");
					
					g_PopulusFeeder.acFeed(f_Block);
					
					if((g_PopulusFeeder.acCheckEmpty() == true) && (g_EBlocker == 1))
						{
						g_EBlocker = 0;
						
						console.log("f_tx = " + f_tx);
						
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
								console.log("online4");
								$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-long-share.php", {type: "GWQ_SHARE", mark: f_HighGrade, jobid: f_JobID, hash: f_Hash.m_OutputHash, owner: g_Wallet.GetAdr(), bck_red: f_Hesh.m_bckred, bck_green: f_Hesh.m_bckgreen, bck_blue: f_Hesh.m_bckblue}, function(data, status)
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
													vert1x: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[0].m_X.toFixed(8),
													vert1y: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[0].m_Y.toFixed(8),
													vert1z: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[0].m_Z.toFixed(8),
													vert2x: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[1].m_X.toFixed(8),
													vert2y: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[1].m_Y.toFixed(8),
													vert2z: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[1].m_Z.toFixed(8),
													vert3x: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[2].m_X.toFixed(8),
													vert3y: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[2].m_Y.toFixed(8),
													vert3z: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[2].m_Z.toFixed(8),
													vert4x: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[3].m_X.toFixed(8),
													vert4y: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[3].m_Y.toFixed(8),
													vert4z: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[3].m_Z.toFixed(8),
													vert5x: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[4].m_X.toFixed(8),
													vert5y: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[4].m_Y.toFixed(8),
													vert5z: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[4].m_Z.toFixed(8),
													vert6x: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[5].m_X.toFixed(8),
													vert6y: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[5].m_Y.toFixed(8),
													vert6z: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[5].m_Z.toFixed(8),
													vert7x: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[6].m_X.toFixed(8),
													vert7y: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[6].m_Y.toFixed(8),
													vert7z: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[6].m_Z.toFixed(8),
													vert8x: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[7].m_X.toFixed(8),
													vert8y: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[7].m_Y.toFixed(8),
													vert8z: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Vertex[7].m_Z.toFixed(8),
													vert1r: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[0].m_X.toFixed(8),
													vert1g: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[0].m_Y.toFixed(8),
													vert1b: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[0].m_Z.toFixed(8),
													vert2r: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[1].m_X.toFixed(8),
													vert2g: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[1].m_Y.toFixed(8),
													vert2b: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[1].m_Z.toFixed(8),
													vert3r: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[2].m_X.toFixed(8),
													vert3g: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[2].m_Y.toFixed(8),
													vert3b: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[2].m_Z.toFixed(8),
													vert4r: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[3].m_X.toFixed(8),
													vert4g: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[3].m_Y.toFixed(8),
													vert4b: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[3].m_Z.toFixed(8),
													vert5r: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[4].m_X.toFixed(8),
													vert5g: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[4].m_Y.toFixed(8),
													vert5b: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[4].m_Z.toFixed(8),
													vert6r: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[5].m_X.toFixed(8),
													vert6g: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[5].m_Y.toFixed(8),
													vert6b: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[5].m_Z.toFixed(8),
													vert7r: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[6].m_X.toFixed(8),
													vert7g: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[6].m_Y.toFixed(8),
													vert7b: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[6].m_Z.toFixed(8),
													vert8r: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[7].m_X.toFixed(8),
													vert8g: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[7].m_Y.toFixed(8),
													vert8b: f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link.m_vec_Color[7].m_Z.toFixed(8),
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
												
												if((f_ShareResult == "_ECNJSSCRIPTSHARE_") ||
												   (f_ShareResult == "_ECNHIGHTON_"))
													{
													console.log("ECN-SHARESCRIPT v1.1 " + f_ShareResult);
													
													document.getElementById('script').innerHTML = f_Target.m_String;
													document.getElementById('grademark').innerHTML = 'GradeMark(highest) - ' + f_HighGrade;
													
													g_vec_TargetFunc[g_idx_vec_TargetFunc] = f_Target;
													g_idx_vec_TargetFunc++;
													
													ag_ElementButton("Execute", "ag_LaunchTime();");
													
													document.getElementById('voting').innerHTML = "<button onclick=\"ag_VoteShareUp(" + f_ShareID + ", 2);\" style=\"font-family: Abel;\" class=\"font\">Vote Up</button>";
													document.getElementById('viewlink').innerHTML = "<a href=\"http://www.bitcoin-office.com/eglx.php?share=" + f_ShareID + "\" style=\"font-family: Abel;\" class=\"font\">eglx shareView</a>";
													
													console.log("Checkin' Script");
													
													ag_StoreElements(f_Target);

													var f_ClearCute = true;
													var f_LaunchString = ag_LaunchPrep(f_Target.m_vec_Function[0].m_vec_String);
													try
														{
														ag_Eval(g_Target);
														
														eval(f_LaunchString);
														
														ag_StartApp();
														
														ag_LaunchFunction();
														}
													catch(e)
														{
														//console.log(f_LaunchString);
														//console.log(JSON.stringify(e)); //*****UNCOMMENT FOR SYNTAX THEN PROPER ERROR SOLVE *****
														//document.getElementById("scripterrors").innerHTML = "<h3>" + JSON.stringify(e) + "</h3>";
														//throw(e);
														f_ClearCute = false;
														}
													
													if(f_ClearCute == true)
														{
														console.log("ALL good! script is clean!");
														}
													else
														{
														console.log("ERRORS in script!");
														}
														
													if(g_ConstantMining >= 1)
														{
														ag_GetTargetFromID(1, g_admax);
														}
													}
												else
													{
													ag_GetTargetFromID(1, g_admax);
													}
												}
											}
										}, "json");
									}, "json");
								}
							}, "json");
						}
					});
				}, "json");
			}, "json");
		}
	else
		{
		console.log("HeshRate: " + heshes_per_second + " < Grade: " + f_TargetDifficulty + " HighestMark: " + f_HighGrade);
		document.getElementById('grademark').innerHTML = 'GradeMark(highest) - ' + f_HighGrade;
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