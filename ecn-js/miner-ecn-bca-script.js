var CUBE_ADMAX = 5;
var g_swit = 0.75;
var g_Result = false;

var reportPeriod = 1000;
var HighPeriod = 15000;
var jobPeriod = 25000;
var jobPeriodnonces = 360000;
var maxNonce = 0xFFFFFFFF;
var maxCnt = 5;
var g_Mark = 0.0;
var run = true;

var TotalHeshes = 0;

var g_Highton = null;
var g_HightonMark = -500000000000;
var g_HightonTarget = null;

importScripts('hesh.js');
importScripts('cube.js');
importScripts('classtarget.js');
importScripts('classtarget-js-script.js');
importScripts('ecn-wwb-principlerunners.js');

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

function ag_CompileTarget(response)
{
	var hellynom = response.helly;
	var hollynom = response.holly;
	var tvob = response.tvob;
	var tcob = response.tcob;

	var f_Collection = new classCollection();
	
	var f_Multiples = 1;
	
	for(var f_XY = 0; f_XY < f_Multiples; f_XY++)
		{
		for(var f_EleID = 0; f_EleID < hellynom; f_EleID++)
			{
			var f_NewElement = new classElement();
			
			f_NewElement.acFromVolume(tvob[f_EleID]);
			
			f_NewElement.m_vec_Leg[f_NewElement.m_idx_vec_Leg] = new classLeg();
			f_NewElement.m_vec_Leg[f_NewElement.m_idx_vec_Leg].acSetPos(f_NewElement);
			
			f_NewElement.m_idx_vec_Leg++;
			f_NewElement.m_Index = (f_EleID + (f_XY * hellynom));
			f_Collection.m_vec_Element[f_Collection.m_idx_vec_Element] = f_NewElement;
			f_Collection.m_idx_vec_Element++;
			}

		for(var f_ElindexID = 0; f_ElindexID < hollynom; f_ElindexID++)
			{
			var f_Mul = parseInt(f_XY) * parseInt(hellynom);
			f_Collection.m_vec_Element[parseInt(tcob[f_ElindexID][0]) + parseInt(f_Mul)].m_vec_Element[f_Collection.m_vec_Element[parseInt(tcob[f_ElindexID][0]) + parseInt(f_Mul)].m_idx_vec_Element++] = f_Collection.m_vec_Element[parseInt(tcob[f_ElindexID][1]) + parseInt(f_Mul)];
			f_Collection.m_vec_Element[parseInt(tcob[f_ElindexID][0]) + parseInt(f_Mul)].m_vec_Leg[f_Collection.m_vec_Element[parseInt(tcob[f_ElindexID][0]) + parseInt(f_Mul)].m_idx_vec_Leg++] = f_Collection.m_vec_Element[parseInt(tcob[f_ElindexID][1]) + parseInt(f_Mul)].m_vec_Leg[0];
			}
		}
		
	var f_Target = new classTarget();
			
	f_Target.acSetCollection(f_Collection);
	
	console.log("Loaded classTarget ID 1x" + f_Multiples);
	
	return f_Target;
}

function ag_CompileTarget_Script(response)
{
	var hellynom = response.helly;
	var hollynom = response.holly;
	var tvob = response.tvob;
	var tcob = response.tcob;
	
	var f_Target = new classTarget_JScript();
	
	//f_Target.acMerge_ICOtoName();
	
	var f_FunctionCount = 1;
	for(var f_funcCount = 0; f_funcCount < f_FunctionCount; f_funcCount++)
		{
		var f_Function = new classFunction();
		f_Function.m_Name = "DemoFunction";

		f_Target.m_vec_Function[f_Target.m_idx_vec_Function] = f_Function;
		f_Target.m_idx_vec_Function++;
		}	
		
	console.log("Loaded classTarget-jscript-base ID 1x");
	
	return f_Target;
}

function ag_Gen_Hesha(job, progress_report, cb)
{
	var data = job.data;
	var f_JobID = job.jobid;
	var g_Target = ag_CompileTarget_Script(job.response);	
	
	var hashes = 0;
    var timet = (new Date()).getTime() + 1000;
	var h = (new Date()).getTime() + HighPeriod;

	job.targdiff = 150000000; //Target Mark Threshold
	var f_TargetFails = 0;
	job.save = false;
	job.end = false;
	run = true;
	CUBE_ADMAX = job.admax;

	while(run)
		{
		// Hash Generator
		var f_Hash = new ecnHash();
		
		// Hesh Generator
		var f_Hesh = new ecnHesh();

		   /////////////
		  /////////////
		 // getWork
		//
		//g_Schedular[0]->getWork(ESL_PATTERN_LAST);

		for(var f_Int = 0; f_Int < CUBE_ADMAX; f_Int++)
			{
			var f_Bike = new CubeBicycle();//f_Hesh.vec_Key[f_Int];

			// Load mesh vertices. Each vertex has a position and a color.
			var f_BiRand = new BiRand(1.0, true);
			var f_Vector1 = new BiVector(-0.5, -0.5, -0.5);
			f_Vector1.acPushRandSphere(g_swit, f_BiRand.m_Seed);
			f_BiRand.acGet();
			var f_Vector2 = new BiVector(-0.5, -0.5, 0.5);
			f_Vector2.acPushRandSphere(g_swit, f_BiRand.m_Seed);
			f_BiRand.acGet();
			var f_Vector3 = new BiVector(-0.5, 0.5, -0.5);
			f_Vector3.acPushRandSphere(g_swit, f_BiRand.m_Seed);
			f_BiRand.acGet();
			var f_Vector4 = new BiVector(-0.5, 0.5, 0.5);
			f_Vector4.acPushRandSphere(g_swit, f_BiRand.m_Seed);
			f_BiRand.acGet();
			var f_Vector5 = new BiVector(0.5, -0.5, -0.5);
			f_Vector5.acPushRandSphere(g_swit, f_BiRand.m_Seed);
			f_BiRand.acGet();
			var f_Vector6 = new BiVector(0.5, -0.5, 0.5);
			f_Vector6.acPushRandSphere(g_swit, f_BiRand.m_Seed);
			f_BiRand.acGet();
			var f_Vector7 = new BiVector(0.5, 0.5, -0.5);
			f_Vector7.acPushRandSphere(g_swit, f_BiRand.m_Seed);
			f_BiRand.acGet();
			var f_Vector8 = new BiVector(0.5, 0.5, 0.5);
			f_Vector8.acPushRandSphere(g_swit, f_BiRand.m_Seed);

			var f_Color1 = new BiVector(Math.random(), Math.random(), Math.random());
			var f_Color2 = new BiVector(Math.random(), Math.random(), Math.random());
			var f_Color3 = new BiVector(Math.random(), Math.random(), Math.random());
			var f_Color4 = new BiVector(Math.random(), Math.random(), Math.random());
			var f_Color5 = new BiVector(Math.random(), Math.random(), Math.random());
			var f_Color6 = new BiVector(Math.random(), Math.random(), Math.random());
			var f_Color7 = new BiVector(Math.random(), Math.random(), Math.random());
			var f_Color8 = new BiVector(Math.random(), Math.random(), Math.random());
			
			f_Color1.acFix(8);
			f_Color2.acFix(8);
			f_Color3.acFix(8);
			f_Color4.acFix(8);
			f_Color5.acFix(8);
			f_Color6.acFix(8);
			f_Color7.acFix(8);
			f_Color8.acFix(8);

			  ///////////////////
			 // staging
			//
			var f_offsetvec = new BiVector(((Math.random() - 0.5) * 5.0), ((Math.random() - 0.5) * 5.0), ((Math.random() - 0.5) * 5.0));

			f_Vector1.add(f_offsetvec.m_X, f_offsetvec.m_Y, f_offsetvec.m_Z);
			f_Vector2.add(f_offsetvec.m_X, f_offsetvec.m_Y, f_offsetvec.m_Z);
			f_Vector3.add(f_offsetvec.m_X, f_offsetvec.m_Y, f_offsetvec.m_Z);
			f_Vector4.add(f_offsetvec.m_X, f_offsetvec.m_Y, f_offsetvec.m_Z);
			f_Vector5.add(f_offsetvec.m_X, f_offsetvec.m_Y, f_offsetvec.m_Z);
			f_Vector6.add(f_offsetvec.m_X, f_offsetvec.m_Y, f_offsetvec.m_Z);
			f_Vector7.add(f_offsetvec.m_X, f_offsetvec.m_Y, f_offsetvec.m_Z);
			f_Vector8.add(f_offsetvec.m_X, f_offsetvec.m_Y, f_offsetvec.m_Z);
			
			f_Vector1.add(-0.5, 0.5, 0.0);
			f_Vector2.add(-0.5, 0.5, 0.0);
			f_Vector3.add(-0.5, 0.5, 0.0);
			f_Vector4.add(-0.5, 0.5, 0.0);
			f_Vector5.add(-0.5, 0.5, 0.0);
			f_Vector6.add(-0.5, 0.5, 0.0);
			f_Vector7.add(-0.5, 0.5, 0.0);
			f_Vector8.add(-0.5, 0.5, 0.0);
			
			f_Vector1.mul(2.0, 2.0, 2.0);
			f_Vector2.mul(2.0, 2.0, 2.0);
			f_Vector3.mul(2.0, 2.0, 2.0);
			f_Vector4.mul(2.0, 2.0, 2.0);
			f_Vector5.mul(2.0, 2.0, 2.0);
			f_Vector6.mul(2.0, 2.0, 2.0);
			f_Vector7.mul(2.0, 2.0, 2.0);
			f_Vector8.mul(2.0, 2.0, 2.0);
			
			f_Vector1.acFix(8);
			f_Vector2.acFix(8);
			f_Vector3.acFix(8);
			f_Vector4.acFix(8);
			f_Vector5.acFix(8);
			f_Vector6.acFix(8);
			f_Vector7.acFix(8);
			f_Vector8.acFix(8);
			
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector1.m_X * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector1.m_Y * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector1.m_Z * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector2.m_X * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector2.m_Y * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector2.m_Z * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector3.m_X * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector3.m_Y * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector3.m_Z * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector4.m_X * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector4.m_Y * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector4.m_Z * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector5.m_X * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector5.m_Y * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector5.m_Z * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector6.m_X * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector6.m_Y * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector6.m_Z * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector7.m_X * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector7.m_Y * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector7.m_Z * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector8.m_X * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector8.m_Y * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Vector8.m_Z * 1000);
			f_Hash.m_idx_vec_Input++;

			f_Bike.m_vec_Vertex[0] = f_Vector1;
			f_Bike.m_vec_Vertex[1] = f_Vector2;
			f_Bike.m_vec_Vertex[2] = f_Vector3;
			f_Bike.m_vec_Vertex[3] = f_Vector4;
			f_Bike.m_vec_Vertex[4] = f_Vector5;
			f_Bike.m_vec_Vertex[5] = f_Vector6;
			f_Bike.m_vec_Vertex[6] = f_Vector7;
			f_Bike.m_vec_Vertex[7] = f_Vector8;
			
			f_Bike.m_idx_vec_Vertex = 8;
			
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color1.m_X * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color1.m_Y * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color1.m_Z * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color2.m_X * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color2.m_Y * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color2.m_Z * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color3.m_X * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color3.m_Y * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color3.m_Z * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color4.m_X * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color4.m_Y * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color4.m_Z * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color5.m_X * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color5.m_Y * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color5.m_Z * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color6.m_X * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color6.m_Y * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color6.m_Z * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color7.m_X * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color7.m_Y * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color7.m_Z * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color8.m_X * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color8.m_Y * 1000);
			f_Hash.m_idx_vec_Input++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_Color8.m_Z * 1000);
			f_Hash.m_idx_vec_Input++;

			f_Bike.m_vec_Color[0] = f_Color1;
			f_Bike.m_vec_Color[1] = f_Color2;
			f_Bike.m_vec_Color[2] = f_Color3;
			f_Bike.m_vec_Color[3] = f_Color4;
			f_Bike.m_vec_Color[4] = f_Color5;
			f_Bike.m_vec_Color[5] = f_Color6;
			f_Bike.m_vec_Color[6] = f_Color7;
			f_Bike.m_vec_Color[7] = f_Color8;
			
			f_Bike.m_idx_vec_Color = 8;
			
			var f_KEY = new CubeKEY();
			
			f_KEY.acAddBicycle(f_Bike);
			
			f_Hesh.m_vec_Key[f_Hesh.m_idx_vec_Key] = f_KEY;
			f_Hesh.m_idx_vec_Key++;
			}
			
		//Sense Limits
		for(var f_Integer = 0; f_Integer < CUBE_ADMAX; f_Integer++)
			{
			f_Hesh.m_vec_Cube[f_Hesh.m_idx_vec_Cube] = f_Integer;
			f_Hesh.m_idx_vec_Cube++;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = f_Integer;
			f_Hash.m_idx_vec_Input++;
			}

		var f_ColorBCK = new BiVector(Math.random(), Math.random(), Math.random());

		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_ColorBCK.m_X * 1000);
		f_Hash.m_idx_vec_Input++;
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_ColorBCK.m_Y * 1000);
		f_Hash.m_idx_vec_Input++;
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input] = parseInt(f_ColorBCK.m_Z * 1000);
		f_Hash.m_idx_vec_Input++;

		  ////////////
		 // HESH   //
		// Target //
		f_Hesh.m_Hash = f_Hash;

		f_Hesh.m_bckred = f_ColorBCK.m_X;
		f_Hesh.m_bckgreen = f_ColorBCK.m_Y;
		f_Hesh.m_bckblue = f_ColorBCK.m_Z;

		var f_TargetScript = new classTarget_JScript();
		
		//pre-stage
		g_Target.m_idx_vec_Name = 0;
		
		f_TargetScript.acFromHesh(f_Hesh, g_Target);

		if((f_TargetScript.m_idx_vec_Function >= 1) || 1)
			{
			var g_Result1 = true;
			
			try
				{
				eval(f_TargetScript.m_vec_Function[0].m_vec_String);
				}
			catch(e)
				{
				if(false) //test print each fail
					{
					job.hesh = f_Hesh;
					job.hash = f_Hash;
					job.heshtarget = f_TargetScript;
					job.result = "_ECNJSSCRIPTSHARE_";
					job.save = true;
					job.mark = g_Target.m_Mark;
					run = false;
					cb(job);
					throw(e);
					}
					
				g_Result1 = false;
				}
				
			f_TargetScript.acPowerDown();
			
			if((g_Result1 == true)/* && (f_TargetScript.m_vec_Function[0].m_vec_String.length > 500)*/)
				{
				//console.log("ECN-Script Passed first evaluation stage");
			
				var f_ClearCute = true;
				
				try
					{
					eval(f_TargetScript.m_vec_Function[0].m_vec_String);
					
					g_Target.acEvalNames();
					
					ag_StartApp();
					
					eval(f_TargetScript.m_vec_Function[0].m_Name + "();");
					}
				catch(e)
					{
					f_ClearCute = false;
					//console.log(f_TargetScript.m_vec_Function[0].m_vec_String);	//Solving Biscuit syntax errors with following lines uncommented
					//throw(e);
					}
					
				f_TargetScript.acPowerDown();
					
				if(f_ClearCute == true)
					{
					console.log("ECN-Script Passed second evaluation stage");
					
					var f_Result2 = f_TargetScript.acCompare(g_Target, 5.0, job.targdiff);
				
					if(f_Result2 == true)
						{
						job.hesh = f_Hesh;
						job.hash = f_Hash;
						job.heshtarget = f_TargetScript;
						job.result = "_ECNJSSCRIPTSHARE_";
						job.save = true;
						job.mark = g_Target.m_Mark;
						run = false;
						cb(job);
						}
					else
						{
						f_TargetFails++;
						
						if(f_TargetFails > 10)
							{
							job.targdiff -= 100;
							f_TargetFails = 0;
							}
							
						if(g_Target.m_Mark > g_HightonMark)
							{
							g_HightonMark = g_Target.m_Mark;
							g_Highton = f_Hesh;
							g_HightonTarget = f_TargetScript;
							}
						}
					}
				else
					{
					//console.log("ERRORS in script!");
					}
				}
				
			TotalHeshes++;
			
			if(h < (new Date()).getTime())
				{
				if(g_HightonMark > job.targdiff / 150.0)
					{
					h = (new Date()).getTime() + HighPeriod;
					job.hesh = g_Highton;
					job.hash = g_Highton.m_Hash;
					job.heshtarget = g_HightonTarget;
					job.result = "_ECNHIGHTON_";
					job.save = true;
					job.mark = g_HightonMark;
					run = false;
					cb(job);
					}
				else
					{
					h = (new Date()).getTime() + HighPeriod;
					}
				}
			else
				{
				if(timet < (new Date()).getTime())
					{	
					timet = (new Date()).getTime() + reportPeriod;
					job.hesh = f_Hesh;
					job.hash = f_Hash;
					job.heshtarget = f_TargetScript;
					job.result = "_ECNREPORT_";
					job.save = false;
					job.mark = g_HightonMark;
					progress_report();
					}
				}
			}
		}
}

///// Web Worker /////

onmessage = function(event)
{
    var job = event.data;

    sendProgressUpdate(job);

    var result = function(job)
		{
        postMessage(job);
		};

    ag_Gen_Hesha(event.data, function() { sendProgressUpdate(job); }, result);
};

function sendProgressUpdate(job)
{
	job.total_heshes = TotalHeshes;
	TotalHeshes = 0;

    postMessage(job);
}