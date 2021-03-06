/*

ecn-wwb-principlerunners.js - osirem.com
Copyright OSIREM (C) 2019

This source is proprietary, and cannot be used, in part or in full without
the express permission of the original author. The original author retain the
rights to use, modify, and/or relicense this code without notice.

*/

  ///////////
 // ICOs
//
// Essential
g_EnablePR = true;

//Input Name
g_vec_scrInputName[g_idx_vec_scrInputName] = "firstinput";
g_idx_vec_scrInputName++;

//Input HTML
g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "<input type=\"number\" name=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" id=\"" + "wwh_icobase_input_" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" value=\"1\" min=\"1\" max=\"5\">";
g_idx_vec_scrInputHTML++;

//Input INSTA Type
g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrInputType++;

g_vec_scrInputArg[g_idx_vec_scrInputArg] = -5;
g_idx_vec_scrInputArg++;

//Input Perfect Definition for Execution, if function put after with wrappings
var firstinput = 0;

g_vec_scrInputName[g_idx_vec_scrInputName] = "ac_takeMeasureINTV1";
g_idx_vec_scrInputName++;

g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "Ex";
g_idx_vec_scrInputHTML++;

g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrInputType++;

g_vec_scrInputArg[g_idx_vec_scrInputArg] = 4;
g_idx_vec_scrInputArg++;

var g_vec_Input_Pack_takeMeasure = [];
var g_idx_vec_Input_Pack_takeMeasure = 0;

var g_vec_Input_PackB_takeMeasure = [];
var g_idx_vec_Input_PackB_takeMeasure = 0;

g_vec_scrInputTestCuteFunc[g_idx_vec_scrInputTestCuteFunc] = function(f_Target, f_testARG)
	{
	var g_ThisCuteName = "ac_takeMeasureINTV1(";
	var f_Achievement = new classAchievement();
	
	//PULL ANALYTICAL FUNCTIONS EXAMPLES GIVEN
	/*if(g_idx_vec_Input_Pack_takeMeasure > 0)
		{
		for(var f_XY = 0; f_XY < g_idx_vec_Input_Pack_takeMeasure; f_XY++)
			{
			var f_Pack = g_vec_Input_Pack_takeMeasure[f_XY];
			
			if(f_Pack[4][0] == g_ThisType)
				{
				var f_Found = true;
				
				for(var f_Jet = 0; (f_Jet < g_ThisName.length) && (f_Jet < f_Pack[3][0].length); f_Jet++)
					{
					if(g_ThisName.charAt(f_Jet) != f_Pack[3][0].charAt(f_Jet))
						{
						f_Found = false;
						}
					}
					
				if(f_Found == true)
					{
					var f_vec_Pack = [];
					var f_idx_vec_Pack = 0;
					
					f_vec_Pack[f_idx_vec_Pack] = f_XY;
					f_idx_vec_Pack++;
					
					f_vec_Pack[f_idx_vec_Pack] = f_testARG.f_indexInsta;
					f_idx_vec_Pack++;
					
					f_vec_Pack[f_idx_vec_Pack] = f_testARG.f_indexFunction;
					f_idx_vec_Pack++;
					
					f_vec_Pack[f_idx_vec_Pack] = f_testARG.build_LastNameClose;
					f_idx_vec_Pack++;
					
					f_vec_Pack[f_idx_vec_Pack] = f_testARG.build_LastTypeClose;
					f_idx_vec_Pack++;
						
					g_vec_Input_PackB_takeMeasure[g_idx_vec_Input_PackB_takeMeasure] = f_vec_Pack;
					g_idx_vec_Input_PackB_takeMeasure++;
					}
				}
				
			//console.log("g_idx_vec_Input_PackB_takeMeasure = " + g_idx_vec_Input_PackB_takeMeasure);
			}
		}
		
	if(g_idx_vec_Input_PackB_takeMeasure > 0)
		{
		for(var f_Helly = 0; f_Helly < g_idx_vec_Input_PackB_takeMeasure; f_Helly++)
			{
			var f_PackB = g_vec_Input_PackB_takeMeasure[f_Helly];
			
			for(var f_Test = 0; f_Test < f_PackB[4].length; f_Test++)
				{
				if(f_PackB[4][f_Test] != -5)
					{
					if(f_PackB[4][f_Test] == INSTA_TYPE_CONDITIONAL)
						{
						f_Achievement.m_Mark.m_vec_Int[5] += 35;
						f_Achievement.m_Mark.m_vec_Int[6] += 25;
						f_Achievement.m_Success = true;	
						}
					}
				}
			}
		}

	if(g_ThisName.length == g_ThisCuteName.length)
		{
		var f_Found = true;
			
		for(var f_Jet = 0; (f_Jet < g_ThisName.length) && (f_Jet < g_ThisCuteName.length); f_Jet++)
			{
			if(g_ThisName.charAt(f_Jet) != g_ThisCuteName.charAt(f_Jet))
				{
				f_Found = false;
				}
			}
			
		if((f_Found == true) && (f_testARG.f_indexInsta >= 1))
			{
			var f_vec_Pack = [];
			var f_idx_vec_Pack = 0;
			
			f_vec_Pack[f_idx_vec_Pack] = false;
			f_idx_vec_Pack++;
			
			f_vec_Pack[f_idx_vec_Pack] = f_testARG.f_indexInsta;
			f_idx_vec_Pack++;
			
			f_vec_Pack[f_idx_vec_Pack] = f_testARG.f_indexFunction;
			f_idx_vec_Pack++;
			
			f_vec_Pack[f_idx_vec_Pack] = f_testARG.build_LastNameClose;
			f_idx_vec_Pack++;
			
			f_vec_Pack[f_idx_vec_Pack] = f_testARG.build_LastTypeClose;
			f_idx_vec_Pack++;

			g_vec_Input_Pack_takeMeasure[g_idx_vec_Input_Pack_takeMeasure] = f_vec_Pack;
			g_idx_vec_Input_Pack_takeMeasure++;
			}
		}*/

	return f_Achievement;
	}
g_idx_vec_scrInputTestCuteFunc++;

g_vec_scrInputName[g_idx_vec_scrInputName] = "ag_GenName";
g_idx_vec_scrInputName++;

g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "Ex";
g_idx_vec_scrInputHTML++;

g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrInputType++;

g_vec_scrInputArg[g_idx_vec_scrInputArg] = 1;
g_idx_vec_scrInputArg++;

g_vec_scrInputName[g_idx_vec_scrInputName] = "g_X";
g_idx_vec_scrInputName++;

g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "<input type=\"text\" name=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" id=\"" + "wwh_icobase_input_" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" value=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\">";
g_idx_vec_scrInputHTML++;

g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrInputType++;

g_vec_scrInputArg[g_idx_vec_scrInputArg] = -5;
g_idx_vec_scrInputArg++;

var g_X = 0.0;

g_vec_scrInputName[g_idx_vec_scrInputName] = "g_Y";
g_idx_vec_scrInputName++;

g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "<input type=\"text\" name=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" id=\"" + "wwh_icobase_input_" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" value=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\">";
g_idx_vec_scrInputHTML++;

g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrInputType++;

g_vec_scrInputArg[g_idx_vec_scrInputArg] = -5;
g_idx_vec_scrInputArg++;

var g_Y = 0.0;

g_vec_scrInputName[g_idx_vec_scrInputName] = "g_Z";
g_idx_vec_scrInputName++;

g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "<input type=\"text\" name=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" id=\"" + "wwh_icobase_input_" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" value=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\">";
g_idx_vec_scrInputHTML++;

g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrInputType++;

g_vec_scrInputArg[g_idx_vec_scrInputArg] = -5;
g_idx_vec_scrInputArg++;

var g_Z = 0.0;

g_vec_scrInputName[g_idx_vec_scrInputName] = "f_URL";
g_idx_vec_scrInputName++;

g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "Ex";
g_idx_vec_scrInputHTML++;

g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrInputType++;

g_vec_scrInputArg[g_idx_vec_scrInputArg] = -5;
g_idx_vec_scrInputArg++;

var f_URL = "www.google.com";

   ///////////////////////
  // Primary Control
 // CuteTestFunction
//
g_vec_scrControlTestCuteFunc[g_idx_vec_scrControlTestCuteFunc] = function(f_Target, f_testARG)
	{
	var f_Achievement = new classAchievement();
	
	if(g_ThisLine[0].m_Type == INSTA_TYPE_VAR_CALL)
		{
		if(g_ThisLine[1].m_Type == INSTA_TYPE_VAR_CALL || g_ThisLine[1].m_Type == INSTA_TYPE_DATA)
			{
			if(g_ThisLine.length == 2)
				{
				f_Achievement.m_Mark.m_vec_Int[6] += 10000;
				}
			}
		}
	else if(g_ThisLine[0].m_Type == INSTA_TYPE_DATA)
		{
		f_Achievement.m_Mark.m_vec_Int[4] += 50000;
		}
	else if(g_ThisLine[0].m_Type == INSTA_TYPE_FUNC_CALL)
		{
		if(g_ThisLine.length <= 4)
			{
			f_Achievement.m_Mark.m_vec_Int[5] += 5000;
			}
			
		for(var f_Helly = 1; f_Helly < g_ThisLine.length; f_Helly++)
			{
			if(g_ThisLine[f_Helly].m_Type == INSTA_TYPE_VAR_CALL || g_ThisLine[f_Helly].m_Type == INSTA_TYPE_DATA)
				{
				f_Achievement.m_Mark.m_vec_Int[5] += 10000;
				}
			}
		}
	else if(g_ThisLine[0].m_Type == INSTA_TYPE_VAR_DEF)
		{
		if(g_ThisLine[1].m_Type == INSTA_TYPE_VAR_CALL || g_ThisLine[1].m_Type == INSTA_TYPE_DATA)
			{
			if(g_ThisLine.length == 2)
				{
				f_Achievement.m_Mark.m_vec_Int[6] += 10000;
				}
			}
		}

	return f_Achievement;
	}
g_idx_vec_scrControlTestCuteFunc++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "loadDoc";
g_idx_vec_scrControlName++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlArg[g_idx_vec_scrControlArg] = 1;
g_idx_vec_scrControlArg++;

g_vec_scrControlTestCuteFunc[g_idx_vec_scrControlTestCuteFunc] =  function(f_Target,  f_testARG)
{
	var f_Achievement = new classAchievement();
	
	// Url detection
	//var f_Insta  = list interaction with ag_Char if one packs listing
	//f_testARG.m_Line[f_testARG.f_indexInsta + 1].m_String.length
	
	return f_Achievement;
}

var f_ControlBridge3 = new classBridge();

f_ControlBridge3.ac_add_Path(g_idx_vec_scrControlName - 1, INSTA_TYPE_FUNC_CALL, LINE_TYPE_CONTROL);
f_ControlBridge3.ac_add_Path(6, INSTA_TYPE_VAR_CALL, LINE_TYPE_INPUT);
f_ControlBridge3.ac_add_Path(9, INSTA_TYPE_DATA, LINE_TYPE_OUTPUT);
f_ControlBridge3.ac_add_Path(5, INSTA_TYPE_FUNC_CALL, LINE_TYPE_CONTROL);
f_ControlBridge3.ac_add_Path(6, INSTA_TYPE_FUNC_CALL, LINE_TYPE_CONTROL);

g_vec_control_Bridge[g_idx_vec_control_Bridge] = f_ControlBridge3;
g_idx_vec_control_Bridge++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.cos";
g_idx_vec_scrControlName++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlArg[g_idx_vec_scrControlArg] = 1;
g_idx_vec_scrControlArg++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.sin";
g_idx_vec_scrControlName++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlArg[g_idx_vec_scrControlArg] = 1;
g_idx_vec_scrControlArg++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.sqrt";
g_idx_vec_scrControlName++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlArg[g_idx_vec_scrControlArg] = 1;
g_idx_vec_scrControlArg++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "if(";
g_idx_vec_scrControlName++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_CONDITIONAL;
g_idx_vec_scrControlType++;

g_vec_scrControlArg[g_idx_vec_scrControlArg] = -5;
g_idx_vec_scrControlArg++;

var f_ControlBridge1 = new classBridge();

f_ControlBridge1.ac_add_Path(g_idx_vec_scrControlName - 1, INSTA_TYPE_CONDITIONAL, LINE_TYPE_CONTROL);
f_ControlBridge1.ac_add_Path(0, INSTA_TYPE_FUNC_CALL, LINE_TYPE_INPUT);
f_ControlBridge1.ac_add_Path(1, INSTA_TYPE_FUNC_CALL, LINE_TYPE_INPUT);

g_vec_control_Bridge[g_idx_vec_control_Bridge] = f_ControlBridge1;
g_idx_vec_control_Bridge++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "workUrl";
g_idx_vec_scrControlName++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlArg[g_idx_vec_scrControlArg] = 1;
g_idx_vec_scrControlArg++;

g_vec_scrControlTestCuteFunc[g_idx_vec_scrControlTestCuteFunc] = function(f_Target, f_testARG)
	{
	var g_ThisCuteName = "f_Finger";
	var f_Achievement = new classAchievement();
	
	var f_Found = true;
	
	for(var f_Jet = 0; (f_Jet < g_ThisLine[1].m_String.length) && (f_Jet < g_ThisCuteName.length); f_Jet++)
		{
		if(g_ThisLine[1].m_String.charAt(f_Jet) != g_ThisCuteName.charAt(f_Jet))
			{
			f_Found = false;
			}
		}
	
	//is CuteName in [1]
	if(f_Found == true)
		{
		if(g_ThisLine[0].m_Type == INSTA_TYPE_CONDITIONAL)
			{
			f_Achievement.m_Mark.m_vec_Int[6] += 15000;
			}
		else
			{
			f_Achievement.m_Mark.m_vec_Int[2] += 1000000;
			}
			
		if(g_ThisLine.length == 3)
			{
			f_Achievement.m_Mark.m_vec_Int[5] += 3000;
			
			if(g_ThisLine[3].m_Type == INSTA_TYPE_DATA)
				{
				f_Achievement.m_Mark.m_vec_Int[6] += 5000;
				}
			}
		}

	return f_Achievement;
	}
g_idx_vec_scrControlTestCuteFunc++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "selectOut";
g_idx_vec_scrControlName++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlArg[g_idx_vec_scrControlArg] = 1;
g_idx_vec_scrControlArg++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "ag_Output";
g_idx_vec_scrControlName++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlArg[g_idx_vec_scrControlArg] = 1;
g_idx_vec_scrControlArg++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "f_conURL";
g_idx_vec_scrControlName++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlArg[g_idx_vec_scrControlArg] = 1;
g_idx_vec_scrControlArg++;

var f_conURL = "www.google.com";

g_vec_scrControlName[g_idx_vec_scrControlName] = "f_Finger";
g_idx_vec_scrControlName++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlArg[g_idx_vec_scrControlArg] = -5;
g_idx_vec_scrControlArg++;

var f_Finger = 0;

g_vec_scrControlTestCuteFunc[g_idx_vec_scrControlTestCuteFunc] = function(f_Target, f_testARG)
	{
	var g_ThisCuteName = "f_Finger";
	var f_Achievement = new classAchievement();
	
	var f_Found = true;
	
	for(var f_Jet = 0; (f_Jet < g_ThisLine[1].m_String.length) && (f_Jet < g_ThisCuteName.length); f_Jet++)
		{
		if(g_ThisLine[1].m_String.charAt(f_Jet) != g_ThisCuteName.charAt(f_Jet))
			{
			f_Found = false;
			}
		}
	
	//is CuteName in [1]
	if(f_Found == true)
		{
		if(g_ThisLine[0].m_Type == INSTA_TYPE_CONDITIONAL)
			{
			f_Achievement.m_Mark.m_vec_Int[6] += 15000;
			}
		else
			{
			f_Achievement.m_Mark.m_vec_Int[2] += 1000000;
			}
			
		if(g_ThisLine.length == 3)
			{
			f_Achievement.m_Mark.m_vec_Int[5] += 3000;
			
			if(g_ThisLine[3].m_Type == INSTA_TYPE_DATA)
				{
				f_Achievement.m_Mark.m_vec_Int[6] += 5000;
				}
			}
		}

	return f_Achievement;
	}
g_idx_vec_scrControlTestCuteFunc++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "f_Incrementor";
g_idx_vec_scrControlName++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlArg[g_idx_vec_scrControlArg] = -5;
g_idx_vec_scrControlArg++;

var f_Incrementor = 0;

g_vec_scrControlName[g_idx_vec_scrControlName] = "f_ResultC1";
g_idx_vec_scrControlName++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlArg[g_idx_vec_scrControlArg] = -5;
g_idx_vec_scrControlArg++;

var f_ResultC1 = 0.0;

g_vec_scrControlName[g_idx_vec_scrControlName] = "ag_Char";
g_idx_vec_scrControlName++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlArg[g_idx_vec_scrControlArg] = 2;
g_idx_vec_scrControlArg++;

g_vec_scrControlTestCuteFunc[g_idx_vec_scrControlTestCuteFunc] = function(f_Target, f_testARG)
	{
	var g_ThisCuteName = "ag_Char(";
	var f_Achievement = new classAchievement();
	
	var f_Found = true;
	
	for(var f_Jet = 0; (f_Jet < g_ThisLine[1].m_String.length) && (f_Jet < g_ThisCuteName.length); f_Jet++)
		{
		if(g_ThisLine[1].m_String.charAt(f_Jet) != g_ThisCuteName.charAt(f_Jet))
			{
			f_Found = false;
			}
		}
	
	//is CuteName in [1]
	if(f_Found == true)
		{
		if(g_ThisLine[0].m_Type == INSTA_TYPE_VAR_CALL)
			{
			f_Achievement.m_Mark.m_vec_Int[6] += 5000;
			}
		else
			{
			f_Achievement.m_Mark.m_vec_Int[2] += 1000000;
			}
			
		if(g_ThisLine.length == 4)
			{
			f_Achievement.m_Mark.m_vec_Int[5] += 1000;
			
			if(g_ThisLine[2].m_Type == INSTA_TYPE_VAR_CALL)
				{
				f_Achievement.m_Mark.m_vec_Int[6] += 5000;
				}
				
			if(g_ThisLine[3].m_Type == INSTA_TYPE_VAR_CALL)
				{
				f_Achievement.m_Mark.m_vec_Int[6] += 5000;
				}
			}
		}

	return f_Achievement;
	}
g_idx_vec_scrControlTestCuteFunc++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "f_Result";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrOutputType++;

g_vec_scrOutputArg[g_idx_vec_scrOutputArg] = -5;
g_idx_vec_scrOutputArg++;

var f_Result = "";

var f_OutputBridge1 = new classBridge();

f_OutputBridge1.ac_add_Path(g_idx_vec_scrOutputName - 1, INSTA_TYPE_VAR_CALL, LINE_TYPE_OUTPUT);
f_OutputBridge1.ac_add_Path(0, INSTA_TYPE_FUNC_CALL, LINE_TYPE_INPUT);
f_OutputBridge1.ac_add_Path(1, INSTA_TYPE_FUNC_CALL, LINE_TYPE_INPUT);
f_OutputBridge1.ac_add_Path(-5, INSTA_TYPE_VAR_CALL, LINE_TYPE_NORMAL);

g_vec_output_Bridge[g_idx_vec_output_Bridge] = f_OutputBridge1;
g_idx_vec_output_Bridge++;

/*g_vec_scrOutputName[g_idx_vec_scrOutputName] = "window.getElementById(wwb_base_output1).innerHTML";
g_idx_vec_scrOutputName++;

g_vec_scrOutputArg[g_idx_vec_scrOutputArg] = -5;
g_idx_vec_scrOutputArg++;

var f_OutputBridge2 = new classBridge();

f_OutputBridge2.ac_add_Path(g_idx_vec_scrOutputName - 1, INSTA_TYPE_FUNC_CALL, LINE_TYPE_OUTPUT);
f_OutputBridge2.ac_add_Path(-5, INSTA_TYPE_VAR_DEF, LINE_TYPE_INPUT);

g_vec_output_Bridge[g_idx_vec_output_Bridge] = f_OutputBridge2;
g_idx_vec_output_Bridge++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrOutputType++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "window.getElementById(wwb_navbar_output1).innerHTML";
g_idx_vec_scrOutputName++;

g_vec_scrOutputArg[g_idx_vec_scrOutputArg] = -5;
g_idx_vec_scrOutputArg++;

var f_OutputBridge2 = new classBridge();

f_OutputBridge2.ac_add_Path(g_idx_vec_scrOutputName - 1, INSTA_TYPE_FUNC_CALL, LINE_TYPE_OUTPUT);
f_OutputBridge2.ac_add_Path(-5, INSTA_TYPE_VAR_DEF, LINE_TYPE_INPUT);

g_vec_output_Bridge[g_idx_vec_output_Bridge] = f_OutputBridge2;
g_idx_vec_output_Bridge++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrOutputType++;

g_vec_scrOutputArg[g_idx_vec_scrOutputArg] = -5;
g_idx_vec_scrOutputArg++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "window.getElementById(wwb_content1_output1).innerHTML";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrOutputType++;

g_vec_scrOutputArg[g_idx_vec_scrOutputArg] = -5;
g_idx_vec_scrOutputArg++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "window.getElementById(wwb_deploy_output1).innerHTML";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrOutputType++;

g_vec_scrOutputArg[g_idx_vec_scrOutputArg] = -5;
g_idx_vec_scrOutputArg++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "window.getElementById(wwb_mission_output1).innerHTML";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrOutputType++;

g_vec_scrOutputArg[g_idx_vec_scrOutputArg] = -5;
g_idx_vec_scrOutputArg++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "window.getElementById(wwb_mission_output2).innerHTML";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrOutputType++;

g_vec_scrOutputArg[g_idx_vec_scrOutputArg] = -5;
g_idx_vec_scrOutputArg++;*/

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "wwb_base_output1";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_DATA;
g_idx_vec_scrOutputType++;

g_vec_scrOutputArg[g_idx_vec_scrOutputArg] = -5;
g_idx_vec_scrOutputArg++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "wwb_navbar_output1";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_DATA;
g_idx_vec_scrOutputType++;

g_vec_scrOutputArg[g_idx_vec_scrOutputArg] = -5;
g_idx_vec_scrOutputArg++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "wwb_content1_output1";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_DATA;
g_idx_vec_scrOutputType++;

g_vec_scrOutputArg[g_idx_vec_scrOutputArg] = -5;
g_idx_vec_scrOutputArg++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "wwb_deploy_output1";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_DATA;
g_idx_vec_scrOutputType++;

g_vec_scrOutputArg[g_idx_vec_scrOutputArg] = -5;
g_idx_vec_scrOutputArg++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "wwb_mission_output1";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_DATA;
g_idx_vec_scrOutputType++;

g_vec_scrOutputArg[g_idx_vec_scrOutputArg] = -5;
g_idx_vec_scrOutputArg++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "wwb_mission_output2";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_DATA;
g_idx_vec_scrOutputType++;

g_vec_scrOutputArg[g_idx_vec_scrOutputArg] = -5;
g_idx_vec_scrOutputArg++;

var g_OutputDivCount = 7; //Html div count + plus 'cutebay' added makes 7

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "ag_Archive";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrOutputType++;

g_vec_scrOutputArg[g_idx_vec_scrOutputArg] = 1;
g_idx_vec_scrOutputArg++;

var f_OutputBridge2 = new classBridge();

f_OutputBridge2.ac_add_Path(g_idx_vec_scrOutputName - 1, INSTA_TYPE_FUNC_CALL, LINE_TYPE_OUTPUT);
f_OutputBridge2.ac_add_Path(-5, INSTA_TYPE_VAR_DEF, LINE_TYPE_INPUT);

g_vec_output_Bridge[g_idx_vec_output_Bridge] = f_OutputBridge2;
g_idx_vec_output_Bridge++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "ag_ElementButton";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrOutputType++;

g_vec_scrOutputArg[g_idx_vec_scrOutputArg] = 2;
g_idx_vec_scrOutputArg++;

g_vec_scrOutputTestCuteFunc[g_idx_vec_scrOutputTestCuteFunc] = function(f_Target, f_testARG)
	{
	var g_ThisCuteName = "ag_ElementButton(";
	var f_Achievement = new classAchievement();
	
	var f_Found = true;
	
	for(var f_Jet = 0; (f_Jet < g_ThisLine[1].m_String.length) && (f_Jet < g_ThisCuteName.length); f_Jet++)
		{
		if(g_ThisLine[0].m_String.charAt(f_Jet) != g_ThisCuteName.charAt(f_Jet))
			{
			f_Found = false;
			}
		}
	
	//is CuteName in [1]
	if(f_Found == true)
		{	
		if(g_ThisLine.length == 2)
			{
			f_Achievement.m_Mark.m_vec_Int[5] += 5000;
			
			if(g_ThisLine[1].m_Type == INSTA_TYPE_VAR_CALL)
				{	
				f_Achievement.m_Mark.m_vec_Int[6] += 300000;
				}
			else if(g_ThisLine[1].m_Type == INSTA_TYPE_DATA)
				{
				f_Achievement.m_Mark.m_vec_Int[6] += 500000;
				}
			else
				{
				f_Achievement.m_Mark.m_vec_Int[2] += 1000000;	
				}
			}
		else
			{
			if(g_ThisLine.length == 3)
				{
				f_Achievement.m_Mark.m_vec_Int[5] += 5000;
				
				if(g_ThisLine[1].m_Type == INSTA_TYPE_VAR_CALL)
					{	
					f_Achievement.m_Mark.m_vec_Int[6] += 300000;
					}
				else if(g_ThisLine[1].m_Type == INSTA_TYPE_DATA)
					{
					f_Achievement.m_Mark.m_vec_Int[6] += 500000;
					}
				else
					{
					f_Achievement.m_Mark.m_vec_Int[2] += 1000000;
					}
					
				if(g_ThisLine[2].m_Type == INSTA_TYPE_VAR_CALL)
					{	
					f_Achievement.m_Mark.m_vec_Int[6] += 300000;
					}
				else if(g_ThisLine[2].m_Type == INSTA_TYPE_DATA)
					{
					if(ag_DetectButtonJava(g_ThisLine[2].m_String) == true)
						{
						f_Achievement.m_Mark.m_vec_Int[6] += 5000000;
						}
					else
						{
						f_Achievement.m_Mark.m_vec_Int[1] += 1000000;
						}
					}
				}	
			}
		}

	return f_Achievement;
	}
g_idx_vec_scrOutputTestCuteFunc++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "ag_ElementHeading";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrOutputType++;

g_vec_scrOutputArg[g_idx_vec_scrOutputArg] = 2;
g_idx_vec_scrOutputArg++;

g_vec_scrOutputTestCuteFunc[g_idx_vec_scrOutputTestCuteFunc] = function(f_Target, f_testARG)
	{
	var g_ThisCuteName = "ag_ElementHeading(";
	var f_Achievement = new classAchievement();
	
	var f_Found = true;
	
	for(var f_Jet = 0; (f_Jet < g_ThisLine[1].m_String.length) && (f_Jet < g_ThisCuteName.length); f_Jet++)
		{
		if(g_ThisLine[0].m_String.charAt(f_Jet) != g_ThisCuteName.charAt(f_Jet))
			{
			f_Found = false;
			}
		}
	
	//is CuteName in [1]
	if(f_Found == true)
		{	
		if(g_ThisLine.length == 2)
			{
			f_Achievement.m_Mark.m_vec_Int[5] += 5000;
			
			if(g_ThisLine[1].m_Type == INSTA_TYPE_VAR_CALL)
				{	
				f_Achievement.m_Mark.m_vec_Int[6] += 300000;
				}
			else if(g_ThisLine[1].m_Type == INSTA_TYPE_DATA)
				{
				f_Achievement.m_Mark.m_vec_Int[6] += 500000;
				}
			else
				{
				f_Achievement.m_Mark.m_vec_Int[2] += 1000000;	
				}
			}
		else
			{
			if(g_ThisLine.length == 3)
				{
				f_Achievement.m_Mark.m_vec_Int[5] += 5000;
				
				if(g_ThisLine[1].m_Type == INSTA_TYPE_VAR_CALL)
					{	
					f_Achievement.m_Mark.m_vec_Int[6] += 300000;
					}
				else if(g_ThisLine[1].m_Type == INSTA_TYPE_DATA)
					{
					f_Achievement.m_Mark.m_vec_Int[6] += 500000;
					}
				else
					{
					f_Achievement.m_Mark.m_vec_Int[2] += 1000000;
					}
					
				if(g_ThisLine[2].m_Type == INSTA_TYPE_VAR_CALL)
					{	
					f_Achievement.m_Mark.m_vec_Int[6] += 300000;
					}
				else if(g_ThisLine[2].m_Type == INSTA_TYPE_DATA)
					{
					if(ag_DetectButtonJava(g_ThisLine[2].m_String) == true)
						{
						f_Achievement.m_Mark.m_vec_Int[6] += 5000000;
						}
					else
						{
						f_Achievement.m_Mark.m_vec_Int[1] += 1000000;
						}
					}
				}	
			}
		}

	return f_Achievement;
	}
g_idx_vec_scrOutputTestCuteFunc++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "ag_ElementNavbar";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrOutputType++;

g_vec_scrOutputArg[g_idx_vec_scrOutputArg] = 1;
g_idx_vec_scrOutputArg++;

g_vec_scrOutputTestCuteFunc[g_idx_vec_scrOutputTestCuteFunc] = function(f_Target, f_testARG)
	{
	var g_ThisCuteName = "ag_ElementHeading(";
	var f_Achievement = new classAchievement();
	
	var f_Found = true;
	
	for(var f_Jet = 0; (f_Jet < g_ThisLine[1].m_String.length) && (f_Jet < g_ThisCuteName.length); f_Jet++)
		{
		if(g_ThisLine[0].m_String.charAt(f_Jet) != g_ThisCuteName.charAt(f_Jet))
			{
			f_Found = false;
			}
		}
	
	//is CuteName in [1]
	if(f_Found == true)
		{	
		if(g_ThisLine.length == 2)
			{
			f_Achievement.m_Mark.m_vec_Int[5] += 5000;
			
			if(g_ThisLine[1].m_Type == INSTA_TYPE_VAR_CALL)
				{	
				f_Achievement.m_Mark.m_vec_Int[6] += 300000;
				}
			else if(g_ThisLine[1].m_Type == INSTA_TYPE_DATA)
				{
				f_Achievement.m_Mark.m_vec_Int[6] += 500000;
				}
			else
				{
				f_Achievement.m_Mark.m_vec_Int[2] += 1000000;	
				}
			}
		else
			{
			if(g_ThisLine.length == 3)
				{
				f_Achievement.m_Mark.m_vec_Int[5] += 5000;
				
				if(g_ThisLine[1].m_Type == INSTA_TYPE_VAR_CALL)
					{	
					f_Achievement.m_Mark.m_vec_Int[6] += 300000;
					}
				else if(g_ThisLine[1].m_Type == INSTA_TYPE_DATA)
					{
					f_Achievement.m_Mark.m_vec_Int[6] += 500000;
					}
				else
					{
					f_Achievement.m_Mark.m_vec_Int[2] += 1000000;
					}
					
				if(g_ThisLine[2].m_Type == INSTA_TYPE_VAR_CALL)
					{	
					f_Achievement.m_Mark.m_vec_Int[6] += 300000;
					}
				else if(g_ThisLine[2].m_Type == INSTA_TYPE_DATA)
					{
					if(ag_DetectButtonJava(g_ThisLine[2].m_String) == true)
						{
						f_Achievement.m_Mark.m_vec_Int[6] += 5000000;
						}
					else
						{
						f_Achievement.m_Mark.m_vec_Int[1] += 1000000;
						}
					}
				}	
			}
		}

	return f_Achievement;
	}
g_idx_vec_scrOutputTestCuteFunc++;

  /////////////
 // Math
//
/*g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.abs";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.acos";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.acosh";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.asin";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.asinh";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.atan";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.atan2";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.atanh";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.acosh";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.cbrt";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.ceil";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.cos";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.atan2";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.atanh";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.acosh";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.cbrt";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.ceil";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.cosh";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.exp";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.floor";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.log";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.max";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.min";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.pow";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.random";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.round";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.sin";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.sinh";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.sqrt";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.tan";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.tanh";
g_idx_vec_scrControlName++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.trunc";
g_idx_vec_scrControlName++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;*/

var g_SchemaRef = new BiVector(0.0);

var g_ElementIndex = 0;

   //////////////////
  //
 // Start App
//
function ag_StartApp()
{
	g_SchemaRef.m_X = 1.5623;
	g_SchemaRef.m_Y = 0.1789;
	g_SchemaRef.m_Z = 0.2943;
	
	g_ElementIndex = 0;
}

   //////////////////
  //
 // ICO Functions
//
var g_vec_Store = [];
var g_idx_vec_Store = 0;

function ag_Archive(f_Data)
{
	if(f_Data != undefined)
		{
		g_cuteMark.m_vec_Int[5] += 50000;
		}
	else
		{
		g_cuteMark.m_vec_Int[4] += 50000;
		}
	
	g_vec_Store[g_idx_vec_Store] = f_Data;
	g_idx_vec_Store++;
}

function ac_takeMeasureINTV1(f_StartRange, f_EndRange, f_WeightRangetoStart)  // scale resolution 1-3
{
	//precute
	if(parseInt(f_StartRange) >= 0)
		{
		g_cuteMark.m_vec_Int[5] += 10000;
		}
	else
		{
		g_cuteMark.m_vec_Int[4] += 10000;
		}
		
	if(parseInt(f_EndRange) >= 0)
		{
		g_cuteMark.m_vec_Int[5] += 50000;
		}
	else
		{
		g_cuteMark.m_vec_Int[4] += 50000;
		}
		
	if(parseInt(f_WeightRangetoStart) >= 0)
		{
		g_cuteMark.m_vec_Int[5] += 30000;
		}
	else
		{
		g_cuteMark.m_vec_Int[4] += 30000;
		}
		
	var m_Depth = 3;
	m_Depth--;
	
	//Assume Elements
	var f_Vertex = g_Collection.m_vec_Element[g_ElementIndex];
	
	g_ElementIndex++;
	if(g_ElementIndex >= g_Collection.m_idx_vec_Element)
		{
		g_ElementIndex = 0;
		}

	if(m_Depth >= 1)
		{
		var f_Float = 0;
		for(var f_helly = 0; f_helly < f_Vertex.m_idx_vec_Vertex; f_helly++)
			{
			g_SchemaRef.m_X = g_SchemaRef.m_X + (f_Vertex.m_vec_Vertex[f_helly].m_X * 0.3);
			g_SchemaRef.m_Y = g_SchemaRef.m_Y + (f_Vertex.m_vec_Vertex[f_helly].m_Y * 0.1);
			g_SchemaRef.m_Z = g_SchemaRef.m_Z + (f_Vertex.m_vec_Vertex[f_helly].m_Z * 0.3);

			var f_Vec = new BiVector();
			
			f_Vec.m_X = g_SchemaRef.m_X;
			f_Vec.m_Y = g_SchemaRef.m_Y;
			f_Vec.m_Z = g_SchemaRef.m_Z;
			
			f_Float += f_Vec.dot();
			}

		var f_Theta = Math.sin(f_Float);
		var f_RangeVal = (f_Theta * f_EndRange);
		if(f_RangeVal < 0.0)
			{
			f_RangeVal = f_RangeVal * -1;
			}
		var f_Float = f_RangeVal - (f_WeightRangetoStart / 2);
		var f_Int = parseInt(f_Float) + f_StartRange;
		return f_Int;
		}

	return 1;
}

function ag_GenName(f_Vertex)
{
	var f_CharAry = [];
	var f_idx_Char = 0;
	
	//Assume Elements
	var f_Vertex = g_Collection.m_vec_Element[g_ElementIndex];
	
	g_ElementIndex++;
	if(g_ElementIndex >= g_Collection.m_idx_vec_Element)
		{
		g_ElementIndex = 0;
		}
	
	var f_CharCount = [];
	f_CharCount[0] = ac_takeMeasureINTV1(2, 5, 1);
	f_CharCount[1] = ac_takeMeasureINTV1(2, 8, 1);
	f_CharCount[2] = ac_takeMeasureINTV1(2, 15, 1);
	var f_Select = ac_takeMeasureINTV1(0, 3, 0);
	
	for(var f_helly = 0; f_helly < f_CharCount[f_Select]; f_helly++)
		{
		var f_Jet = f_helly;
		while(f_Jet >= 8)
			{
			f_Jet -= 8;
			}
			
		g_SchemaRef.m_X = g_SchemaRef.m_X + (f_Vertex.m_vec_Vertex[f_Jet].m_X * 0.3);
		g_SchemaRef.m_Y = g_SchemaRef.m_Y + (f_Vertex.m_vec_Vertex[f_Jet].m_Y * 0.1);
		g_SchemaRef.m_Z = g_SchemaRef.m_Z + (f_Vertex.m_vec_Vertex[f_Jet].m_Z * 0.3);

		var f_Vec = new BiVector();
		f_Vec.m_X = g_SchemaRef.m_X - f_Vertex.m_vec_Vertex[f_Jet].m_X;
		f_Vec.m_Y = g_SchemaRef.m_Y - f_Vertex.m_vec_Vertex[f_Jet].m_Y;
		f_Vec.m_Z = g_SchemaRef.m_Z - f_Vertex.m_vec_Vertex[f_Jet].m_Z;
		
		var f_CharFlt = f_Vec.dot();
		f_CharFlt =	Math.cos(f_CharFlt) * 25.0;
		
		if(f_CharFlt < 0)
			{
			f_CharFlt = f_CharFlt * -1;
			}
			
		var f_CharInt = parseInt(f_CharFlt);
		f_CharInt += 97;
		
		f_CharAry.push(f_CharInt);
		f_idx_Char++;
		}
		
	var f_Result = "";	
	var f_CountMain = 0;
	var f_Scope = true;
	for(var f_Splace = 0; f_Splace < f_idx_Char; f_Splace++)
		{
		f_Result += String.fromCharCode(f_CharAry[f_Splace]);
		f_CountMain++;
		
		if(f_Scope == true)
			{
			if(f_CountMain >= 2)
				{
				var f_Finger = ac_takeMeasureINTV1(0, 7, 0);
				
				if(f_Finger <= 1)
					{
					f_Result += "a";
					}
				else if(f_Finger == 2)
					{
					f_Result += "e";
					}
				else if(f_Finger == 3)
					{
					f_Result += "i";
					}
				else if(f_Finger == 4)
					{
					f_Result += "o";
					}
				else if(f_Finger == 5)
					{
					f_Result += "u";
					}
				else
					{
					var f_FingerB = ac_takeMeasureINTV1(0, 10, 0);
					
					if(f_FingerB > 8)
						{
						f_Result += "_";
						}
					}
					
				f_Scope = false;
				}
			}
		else
			{
			var f_Finger = ac_takeMeasureINTV1(0, 7, 0);
				
			if(f_Finger <= 1)
				{
				f_Result += "a";
				}
			else if(f_Finger == 2)
				{
				f_Result += "e";
				}
			else if(f_Finger == 3)
				{
				f_Result += "i";
				}
			else if(f_Finger == 4)
				{
				f_Result += "o";
				}
			else if(f_Finger == 5)
				{
				f_Result += "u";
				}
			else
				{
				var f_FingerB = ac_takeMeasureINTV1(0, 10, 0);
					
				if(f_FingerB > 8)
					{
					f_Result += "_";
					}
				}
			}
		}

	return f_Result;
}

function ag_GenArray()
{
	var f_Size = ac_takeMeasureINTV1(5, 50, 2);
	var f_Array = [];
	var f_TypeFinger = ac_takeMeasureINTV1(0, 20, 0);
	var f_ElementSizeFinger = ac_takeMeasureINTV1(0, 20, 0);
	
	for(var f_XY = 0; f_XY < f_Size; f_XY++)
		{
		var f_Element = 0;
		
		if(f_TypeFinger <= 8)
			{
			f_Element = ac_takeMeasureINTV1(500, 1000000 * f_TypeFinger, 0);
			}
		else if(f_TypeFinger > 13 && f_TypeFinger <= 20)
			{
			var f_ElementA = ac_takeMeasureINTV1(500, 5000, 0);
			var f_ElementB = ac_takeMeasureINTV1(500, 5000, 0);
			f_Element = f_ElementA / f_ElementB;
			}
		else if(f_TypeFinger > 8 && f_TypeFinger <= 13)
			{
			for(var f_Elem = 0; f_Elem < f_ElementSizeFinger; f_Elem++)
				{
				var f_ElementA = ag_GenName();
				var f_ElementB = ag_GenName();
				
				if(f_Elem < f_ElementSizeFinger - 1)
					{
					f_Element += f_ElementA + " ";
					}
				else
					{
					f_Element += f_ElementA;
					}
				}
			}
		
		f_Array.push(f_Element);
		}
	
	return f_Array;
}

var g_OutFinger = 0;

function selectOut(f_Finger)
{
	if(f_Finger != undefined)
		{
		g_cuteMark.m_vec_Int[5] += 50000;
		}
	else
		{
		g_cuteMark.m_vec_Int[4] += 50000;
		}
	
	g_OutFinger = f_Finger;
}

function ag_Output(f_DATA)
{
	if(f_DATA != undefined)
		{
		g_cuteMark.m_vec_Int[5] += 50000;
		}
	else
		{
		g_cuteMark.m_vec_Int[4] += 50000;
		}
	
	var f_VarCall_List = new classListO(INSTA_TYPE_VAR_CALL);
				
	if(g_OutFinger > f_VarCall_List.m_idx_vec_List)
		{
		g_OutFinger = f_VarCall_List.m_idx_vec_List - 1;
		}
	
	if(g_OutFinger < 0)
		{
		g_OutFinger = 0;
		}
		
	var f_inputFactorFinger = f_VarCall_List.m_idx_vec_List;

	return f_VarCall_List.m_vec_List[g_OutFinger];
	
	//eval(f_VarCall_List.m_vec_List[g_OutFinger] + " += " + f_DATA);
}

function httpGet(theUrl, cb)
{
	if(window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
		}
	else
		{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		
	xmlhttp.onreadystatechange=function()
		{
		if(xmlhttp.readyState==4 && xmlhttp.status==200)
			{
			cb(xmlhttp.responseText);
			}
		}
		
    xmlhttp.open("GET", theUrl, false);
    xmlhttp.send();    
}

  ////////////////////
 // Member Functions
//      Code
function loadDoc(f_URL, f_ID)
{
	if(f_URL == undefined)
		{
		var f_URL = "https://www.google.com/search?q=" + ag_GenName() + "+" + ag_GenName();
		}
	else if(isUrl(f_URL) == false)
		{
		f_URL = "https://www.google.com/search?q=" + ag_GenName() + "+" + ag_GenName() + "+" + ag_GenName();
		}
		
	if(f_ID == undefined)
		{
		var f_ID = Math.random() * g_OutputDivCount;
		var f_Index = parseInt(f_ID);
		}
	else
		{		
		var f_Index = parseInt(f_ID);
				
		while(f_Index < 0)
			{
			f_Index /= 10;
			f_Index += g_OutputDivCount;
			}
			
		while(f_Index > g_OutputDivCount)
			{
			f_Index /= 10;
			f_Index -= g_OutputDivCount;
			}
		}
	
	var f_OutputDivName = "cutebay";
	
	if(f_Index > 0)
		{
		f_OutputDivName = g_vec_scrOutputName[f_Index];
		}
		
	httpGet(f_URL, function(f_String)
		{
		var f_CountDepth = 2;
		
		var lastPartA_String = f_String.split("<p", f_CountDepth).pop();

		var lastPartB_String = lastPartA_String.split(">", 2)[0];

		//Xdocument.getElementById(f_OutputDivName).innerHTML += lastPartB_String;
		});
}

function workUrl(f_URL)
{	
	loadDoc(f_URL, 1);
}
	
function ag_Char(f_String, f_Index)
{
	if(f_String != undefined)
		{
		g_cuteMark.m_vec_Int[5] += 50000;
		}
	else
		{
		g_cuteMark.m_vec_Int[4] += 50000;
		}
		
	if(f_Index != undefined)
		{
		g_cuteMark.m_vec_Int[5] += 50000;
		}
	else
		{
		g_cuteMark.m_vec_Int[4] += 50000;
		}
	
	if(f_String == undefined)
		{
		var f_String = "http://www.google.com";
		}
		
	if(f_Index == undefined)
		{
		var f_Indexv = Math.random() * 25;
		var f_Index = parseInt(f_Indexv);
		return f_Index;
		}
		
	return f_String.charAt(f_Index);
}

//FIXME DATA should conditionally send java functions in string quotes
function ag_DetectButtonJava(f_StringB)
{
	var f_CompleteList = g_Complete_FUNC_CALL;
	
	for(var f_Jet = 0; f_Jet < f_CompleteList.m_idx_vec_List; f_Jet++)
		{
		var f_Found = true;
		
		for(var f_Jet = 0; (f_Jet < f_CompleteList.m_vec_List[f_Jet].length) && (f_Jet < f_StringB.length); f_Jet++)
			{
			if(f_CompleteList.m_vec_List[f_Jet].charAt(f_Jet) != f_StringB.charAt(f_Jet))
				{
				f_Found = false;
				}
			}
			
		//is JavaFuncName
		if(f_Found == true)
			{
			return true;
			}
		}
		
	return false;
}

function ag_ElementButton(f_StringA, f_StringB)
{
	var f_StringElement = "";
	
	if(f_StringA != undefined)
		{
		g_cuteMark.m_vec_Int[5] += 50000;
		
		if(f_StringA.length > 5)
			{
			g_cuteMark.m_vec_Int[5] += 50000;
			}
		else
			{
			g_cuteMark.m_vec_Int[4] += 50000;
			}
		}
	else
		{
		g_cuteMark.m_vec_Int[4] += 50000;
		}
		
	if(f_StringB != undefined)
		{
		g_cuteMark.m_vec_Int[5] += 50000;
		
		if(f_StringB.length > 10)
			{
			g_cuteMark.m_vec_Int[5] += 50000;
			}
		else
			{
			g_cuteMark.m_vec_Int[4] += 50000;
			}
		}
	else
		{
		g_cuteMark.m_vec_Int[4] += 50000;
		}
	
	//Xconsole.log("ECN-Function-ag_ElementButton f_StringA = " + f_StringA + " f_StringB = " + f_StringB)
	
	if(f_StringB != null)
		{
		f_StringElement += "<button onclick=\"" + f_StringB + "\">";
	
		//FIXME DETECT HTML
		//if(ag_DetectButtonHTML(f_StringB))
			
		if(f_StringA != null)
			{
			f_StringElement += f_StringA + "</button>";
			}
		else
			{
			f_StringElement += "Execute</button>";
			}
			
		//Xconsole.log("F_STRINGELEMENT = " + f_StringElement);
			
		//Xdocument.getElementById("cutebay").innerHTML += f_StringElement;
		}
}

function ag_ElementHeading(f_StringA, f_StringB)
{
	var f_StringElement = "";
	
	if(f_StringA != undefined)
		{
		g_cuteMark.m_vec_Int[5] += 50000;
		
		if(f_StringA.length > 5)
			{
			g_cuteMark.m_vec_Int[5] += 50000;
			}
		else
			{
			g_cuteMark.m_vec_Int[4] += 50000;
			}
		}
	else
		{
		g_cuteMark.m_vec_Int[4] += 50000;
		}
		
	if(f_StringB != undefined)
		{
		g_cuteMark.m_vec_Int[5] += 50000;
		
		if(f_StringB.length > 10)
			{
			g_cuteMark.m_vec_Int[5] += 50000;
			}
		else
			{
			g_cuteMark.m_vec_Int[4] += 50000;
			}
		}
	else
		{
		g_cuteMark.m_vec_Int[4] += 50000;
		}
	
	//Xconsole.log("ECN-Function-ag_ElementHeading f_StringA = " + f_StringA + " f_StringB = " + f_StringB);
	
	if(f_StringB != null)
		{
		f_StringElement += "<h1 onhover=\"eval(" + f_StringB + ");\">";
	
		//FIXME DETECT HTML
		//if(ag_DetectButtonHTML(f_StringB))

		if(f_StringA != null)
			{
			f_StringElement += f_StringA + "</h1>";
			}
		else
			{
			f_StringElement += f_StringB + "</h1>";
			}

		//Xdocument.getElementById("cutebay").innerHTML += f_StringElement;
		}
	else
		{
		f_StringElement += "<h1>";
	
		//FIXME DETECT HTML
		//if(ag_DetectButtonHTML(f_StringB))

		if(f_StringA != null)
			{
			f_StringElement += f_StringA + "</h1>";
			}
		else
			{
			f_StringElement += f_StringB + "</h1>";
			}

		//Xdocument.getElementById("cutebay").innerHTML += f_StringElement;
		}
}

function ag_ElementNavbar(f_Array)
{
	var f_StringElement = "";
	
	//Xconsole.log("ECN-Function-ag_ElementNavbar f_Array = " + JSON.stringify(f_Array));
	
	if(f_Array == undefined)
		{
		g_Mark.m_vec_Int[3] += 100000;
		
		var f_Array = ag_GenArray();
		}
	else
		{
		g_Mark.m_vec_Int[6] += 100000;

		if(f_Array.length >= 5)
			{
			g_Mark.m_vec_Int[6] += 200000;	
			}
		else
			{
			g_Mark.m_vec_Int[1] += 1000;
			}
		}
	
	//Xconsole.log("ECN-Function-redux-ag_ElementNavbar f_Array.length = " + f_Array.length);
	
	//FIXME perraps build paragraph quality detection
	if(f_Array != null)
		{
		f_StringElement += "<table>";
			
		for(var f_Jet = 0; f_Jet < f_Array.length; f_Jet++)
			{
			f_StringElement += "<tr><td>" + f_Array[f_Jet] + "<td><tr>";
			}
			
		f_StringElement += "</table>";
			
		//Xdocument.getElementById("cutebay").innerHTML += f_StringElement;
		}
}

function isUrl(s)
{
    if(!isUrl.rx_url)
		{
        // taken from https://gist.github.com/dperini/729294
        isUrl.rx_url=/^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        // valid prefixes
        isUrl.prefixes=['http:\/\/', 'https:\/\/', 'ftp:\/\/', 'www.'];
        // taken from https://w3techs.com/technologies/overview/top_level_domain/all
        isUrl.domains=['com','ru','net','org','de','jp','uk','br','pl','in','it','fr','au','info','nl','ir','cn','es','cz','kr','ua','ca','eu','biz','za','gr','co','ro','se','tw','mx','vn','tr','ch','hu','at','be','dk','tv','me','ar','no','us','sk','xyz','fi','id','cl','by','nz','il','ie','pt','kz','io','my','lt','hk','cc','sg','edu','pk','su','bg','th','top','lv','hr','pe','club','rs','ae','az','si','ph','pro','ng','tk','ee','asia','mobi'];
		}

    if(!isUrl.rx_url.test(s))
		{
		return false;
		}
		
    for(let i = 0; i < isUrl.prefixes.length; i++)
		{
		if(s.startsWith(isUrl.prefixes[i]))
			{
			return true;
			}
		}
		
    for(let i = 0; i < isUrl.domains.length; i++)
		{
		if(s.endsWith('.'+isUrl.domains[i]) || s.includes('.'+isUrl.domains[i]+'\/') ||s.includes('.'+isUrl.domains[i]+'?'))
			{
			return true;
			}
		}
    return false;
}

function isEmail(s)
	{
    if(!isEmail.rx_email)
		{
		// taken from http://stackoverflow.com/a/16016476/460084
		var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
		var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
		var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
		var sQuotedPair = '\\x5c[\\x00-\\x7f]';
		var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
		var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
		var sDomain_ref = sAtom;
		var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
		var sWord = '(' + sAtom + '|' + sQuotedString + ')';
		var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
		var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
		var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
		var sValidEmail = '^' + sAddrSpec + '$'; // as whole string

		isEmail.rx_email = new RegExp(sValidEmail);
		}

	return isEmail.rx_email.test(s);
}