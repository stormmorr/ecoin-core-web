var CUBE_ADMAX = 26;
var g_swit = 0.75;
var g_Result = false;

var g_ShareID = 1;

var g_sharefield = new Array();
var g_sharevalue = new Array();
var g_cubefield = new Array();
var g_cubevalue = new Array();

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

function ag_Gen_Hasha(f_Hesh, g_Target, f_JobID)
{
	//g_cube_Bit_container->acRefresh();

	// Hash Generator
	var f_Hash = new ecnHash();
	
	// Hesh Generator
	//var f_Hesh = new ecnHesh();
	
	f_Hesh.m_idx_vec_Cube = 0;

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
		var f_Vector1 = new BiVector(-0.5);
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

		var f_offsetvec = new BiVector(((Math.random() - 0.5) * 5.0), ((Math.random() - 0.5) * 5.0), ((Math.random() - 0.5) * 5.0));

		f_Vector1.add(f_offsetvec);
		f_Vector2.add(f_offsetvec);
		f_Vector3.add(f_offsetvec);
		f_Vector4.add(f_offsetvec);
		f_Vector5.add(f_offsetvec);
		f_Vector6.add(f_offsetvec);
		f_Vector7.add(f_offsetvec);
		f_Vector8.add(f_offsetvec);

		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector1.m_X * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector1.m_Y * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector1.m_Z * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector2.m_X * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector2.m_Y * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector2.m_Z * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector3.m_X * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector3.m_Y * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector3.m_Z * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector4.m_X * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector4.m_Y * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector4.m_Z * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector5.m_X * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector5.m_Y * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector5.m_Z * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector6.m_X * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector6.m_Y * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector6.m_Z * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector7.m_X * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector7.m_Y * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector7.m_Z * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector8.m_X * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector8.m_Y * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Vector8.m_Z * 1000);

		f_Bike.m_vec_Vertex[0] = f_Vector1;
		f_Bike.m_vec_Vertex[1] = f_Vector2;
		f_Bike.m_vec_Vertex[2] = f_Vector3;
		f_Bike.m_vec_Vertex[3] = f_Vector4;
		f_Bike.m_vec_Vertex[4] = f_Vector5;
		f_Bike.m_vec_Vertex[5] = f_Vector6;
		f_Bike.m_vec_Vertex[6] = f_Vector7;
		f_Bike.m_vec_Vertex[7] = f_Vector8;
		
		f_Hesh.m_idx_vec_Vertex = 8;
		
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color1.m_X * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color1.m_Y * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color1.m_Z * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color2.m_X * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color2.m_Y * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color2.m_Z * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color3.m_X * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color3.m_Y * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color3.m_Z * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color4.m_X * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color4.m_Y * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color4.m_Z * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color5.m_X * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color5.m_Y * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color5.m_Z * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color6.m_X * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color6.m_Y * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color6.m_Z * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color7.m_X * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color7.m_Y * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color7.m_Z * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color8.m_X * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color8.m_Y * 1000);
		f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_Color8.m_Z * 1000);

		f_Bike.m_vec_Color[0] = f_Color1;
		f_Bike.m_vec_Color[1] = f_Color2;
		f_Bike.m_vec_Color[2] = f_Color3;
		f_Bike.m_vec_Color[3] = f_Color4;
		f_Bike.m_vec_Color[4] = f_Color5;
		f_Bike.m_vec_Color[5] = f_Color6;
		f_Bike.m_vec_Color[6] = f_Color7;
		f_Bike.m_vec_Color[7] = f_Color8;
		
		var f_KEY = new CubeKEY(f_Bike)
		
		f_Hesh.m_vec_Key[f_Hesh.m_idx_vec_Key++] = f_KEY;
		}

	var f_LimitSense = CUBE_ADMAX * Math.random();

	while(f_Hesh.m_idx_vec_Cube < f_LimitSense)
		{
		var g_Fingat = Math.random() * 100;

		if(g_Fingat > ((f_LimitSense / CUBE_ADMAX) * 80))
			{
			var f_Finger = Math.random() * CUBE_ADMAX;
			f_Hesh.m_idx_vec_Cube[f_Hesh.m_idx_vec_Cube++] = f_Finger;
			f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = f_Finger;
			}
		}

	var f_ColorBCK = new BiVector(Math.random(), Math.random(), Math.random());

	f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_ColorBCK.m_X * 1000);
	f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_ColorBCK.m_Y * 1000);
	f_Hash.m_vec_Input[f_Hash.m_idx_vec_Input++] = parseInt(f_ColorBCK.m_Z * 1000);

		////////////
	   //
	  // Hash
	 //
	var f_ShareID = 1;
	var f_BlockID = 1;
	var f_JobID = 1;	//Fixme pass out jobid
	var f_EslID = 1;
	var f_TargetID = 1;
	var f_Difficulty = 70.8; //Target Mark Threshold

	  ////////////
	 // HESH   //
	// Target //
	//Cube::CubeHESH* f_Hesh = Cube::g_BicycleContainer[0].getHesh();

	f_Hesh.m_Hash = f_Hash;

	f_Hesh.m_bckred = f_ColorBCK.m_X;
	f_Hesh.m_bckgreen = f_ColorBCK.m_Y;
	f_Hesh.m_bckblue = f_ColorBCK.m_Z;

	var f_Target = new classTarget();
	
	f_Target.acFromHesh(f_Hesh);

	//classTargetScript* f_TargetScript = new classTargetScript(f_Hesh);

	//f_TargetScript->acPrint();

	var g_Result = g_Target.acCompare(f_Target, 18.55, f_Difficulty, true);
										//15.95


	if(g_Result)
		{
		g_sharevalue[0] = f_Target.m_Mark;
		g_sharevalue[1] = "unknown";
		g_sharevalue[2] = "3";
		g_sharevalue[4] = f_EslID;
		g_sharevalue[5] = f_TargetID;
		g_sharevalue[6] = "jsd8932o39aeru";
		g_sharevalue[7] = f_Difficulty;

		    ////////////
		   //
		  // Hash
		 //
		var f_InputString = ag_formInput(f_Hash.m_vec_Input, f_Hash.m_idx_vec_Input);
		 
		var hash = sha256.create();
		hash.update(f_InputString);
		var f_InputHash = hash.hex();

		// check GenesisBlock (assume)
		var f_previousblock = "0000000000000000000000000000000000000000000000000000000000000001";

		//Cube::g_Count_Muti.ac_Fire();
		//Cube::g_Other_Muti.ac_Fire();
		//Cube::g_Share_Muti.ac_Fire();
		
		 ///////////////
		// post
	
		//console.log("GetWorkQuery()");
	
		$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id, jobid, blockledger, dated FROM block ORDER BY dated DESC LIMIT 1"}, function(data, status)
			{
			var resp = data;
			var result = resp.result;
		
			var g_JobID = 1;
		
			if(result)
				{
				g_JobID = result["jobid"];
				g_JobID++;
				f_previousblock = result["blockledger"];
				}
				
			f_JobID = g_JobID;
			
			g_sharevalue[3] = f_JobID;
			
			//var f_tx = ag_GatherTransactions(g_JobID);
			
			var f_tx = "0000000000000000000000000000000000000000000000000000000000000001";
			
			var f_job = f_tx + f_previousblock;
			
			f_InputHash += f_job;
			
			//hey you could add a nonce here, btw extra nonce extended POW
			
			var sharehash = sha256.create();
			sharehash.update(f_InputString);
			f_Hash.m_OutputHash = sharehash.hex();
			
			f_Hesh.m_Hash = f_Hash;
			
			g_sharevalue[8] = 0;
			g_sharevalue[9] = 10;
			g_sharevalue[10] = f_Hash.m_OutputHash;
			g_sharevalue[11] = f_Hash.m_OutputHash;
			g_sharevalue[12] = g_Wallet.GetAdr();
			g_sharevalue[13] = f_Hesh.m_bckred;
			g_sharevalue[14] = f_Hesh.m_bckgreen;
			g_sharevalue[15] = f_Hesh.m_bckblue;
			g_sharevalue[16] = 0.0;

			$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id FROM share WHERE shareledger = " + f_Hash.m_OutputHash}, function(data, status)
				{
				var response = data;
				var testresult = response.result;
			
				if(testresult["id"] <= 0)
					{
					$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_INSERT", query: ag_PrepareInsert("share", 17, g_sharefield, g_sharevalue)}, function(data, status)
						{
						var response = data;
						var resultid = response.lastid;
					
						var f_ShareUniqueID = resultid;
						var f_ShareID = f_ShareUniqueID;
						g_ShareID = f_ShareID;
						
						//note use cookies instead of machine hdid
						ag_addGenesisTracking(f_ShareUniqueID);
						
						for(var f_Int = 0; f_Int < f_Hesh.m_idx_vec_Cube; f_Int++)
							{
							var f_KEY = f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]];

							for(var f_Int2 = 0; f_Int2 < 8; f_Int2++)
								{
								g_cubevalue[f_Int2 * 3] = f_KEY.m_Link.m_vec_Vertex[f_Int2].m_X;
								g_cubevalue[(f_Int2 * 3) + 1] = f_KEY.m_Link.m_vec_Vertex[f_Int2].m_Y;
								g_cubevalue[(f_Int2 * 3) + 2] = f_KEY.m_Link.m_vec_Vertex[f_Int2].m_Z;
								}

							for(var f_Int3 = 0; f_Int3 < 8; f_Int3++)
								{
								g_cubevalue[(24 + (f_Int3 * 3))] = f_KEY.m_Link.m_vec_Color[f_Int3].m_X;
								g_cubevalue[(24 + (f_Int3 * 3)) + 1] = f_KEY.m_Link.m_vec_Color[f_Int3].m_Y;
								g_cubevalue[(24 + (f_Int3 * 3)) + 2] = f_KEY.m_Link.m_vec_Color[f_Int3].m_Z;
								}
							
							g_cubevalue[48] = f_BlockID;
							g_cubevalue[49] = f_ShareID;
							g_cubevalue[50] = f_JobID;
							g_cubevalue[51] = f_EslID;
							g_cubevalue[52] = f_TargetID;
							g_cubevalue[53] = "jsd8932o39aeru";
							g_cubevalue[54] = f_Difficulty;

							g_CubeFieldCount = 55;
							
							$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_INSERT", query: ag_PrepareInsert("cube", 55, g_cubefield, g_cubevalue)}, function(data, status)
								{
								/*var response = data;
								var resultid = response.lastid;
						
								g_adivalue[0] = resultid;
								g_adivalue[1] = f_Hesh.m_vec_Cube[f_Int];
								g_adivalue[2] = f_ShareID;

								$.post("http://www.bitcoin-office.com/link-request-getwork-ecn-fast.php", {type: "GWQ_INSERT", query: ag_PrepareInsert("adindex", 3, g_adifield, g_adivalue)}, function(data, status)
									{
									}, "json");*/
								}, "json");
							}
						}, "json");
					}
				}, "json");
			}, "json");
		}
	else
		{
		g_Result = false;
		}
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