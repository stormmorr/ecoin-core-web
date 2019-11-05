/*

ecn-wwb-principlerunners.js - osirem.com
Copyright OSIREM (C) 2019

This source is proprietary, and cannot be used, in part or in full without
the express permission of the original author. The original author retain the
rights to use, modify, and/or relicense this code without notice.

*/

g_EnablePR = true;

g_vec_scrInputName[g_idx_vec_scrInputName] = "firstinput";
g_idx_vec_scrInputName++;

g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "<input type=\"number\" name=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" id=\"" + "wwh_icobase_input_" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" value=\"1\" min=\"1\" max=\"5\">";
g_idx_vec_scrInputHTML++;

g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrInputType++;

g_vec_scrInputNameCuteFunc[g_idx_vec_scrInputNameCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Name = f_Target.acMakeUnisonVARG(f_unisonARG);
	
	return f_Name;
	};
g_idx_vec_scrInputNameCuteFunc++;

//g_vec_scrInputPlaceCuteFunc[g_idx_vec_scrInputPlaceCuteFunc] = INSTA_TYPE_VAR_CALL;
//g_idx_vec_scrInputPlaceCuteFunc++;

g_vec_scrInputTestCuteFunc[g_idx_vec_scrInputTestCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Achievement = new classAchievement();
	
	//PULL ANALYTICAL FUNCTIONS EXAMPLES GIVEN
	//if(g_wwj_principalrunners_LastTypeClose[0] == )
	
	return f_Achievement;
	}
g_idx_vec_scrInputTestCuteFunc++;


g_vec_scrInputName[g_idx_vec_scrInputName] = "ac_takeMeasureINTV1";
g_idx_vec_scrInputName++;

g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "Ex";
g_idx_vec_scrInputHTML++;

g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrInputType++;

g_vec_scrInputNameCuteFunc[g_idx_vec_scrInputNameCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Name = f_Target.acMakeUnisonVARG(f_unisonARG);
	
	return f_Name;
	};
g_idx_vec_scrInputNameCuteFunc++;

//g_vec_scrInputPlaceCuteFunc[g_idx_vec_scrInputPlaceCuteFunc] = INSTA_TYPE_VAR_CALL;
//g_idx_vec_scrInputPlaceCuteFunc++;

var g_vec_Input_Pack_takeMeasure = [];
var g_idx_vec_Input_Pack_takeMeasure = 0;

var g_vec_Input_PackB_takeMeasure = [];
var g_idx_vec_Input_PackB_takeMeasure = 0;

g_vec_scrInputTestCuteFunc[g_idx_vec_scrInputTestCuteFunc] = function(f_Target, f_testARG)
	{
	var f_Achievement = new classAchievement();
	
	//PULL ANALYTICAL FUNCTIONS EXAMPLES GIVEN
	if(g_idx_vec_Input_Pack_takeMeasure > 0)
		{
		for(var f_XY = 0; f_XY < g_idx_vec_Input_Pack_takeMeasure; f_XY++)
			{
			var f_Pack = g_vec_Input_Pack_takeMeasure[f_XY];
			
			if(f_Pack[2] > (f_testARG.f_indexFunction - 300))
				{
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
						
					if(f_Found = true)
						{
						var f_vec_Pack = [];
						var f_idx_vec_Pack = 0;
						
						f_Pack[f_idx_vec_Pack] = f_XY;
						f_idx_vec_Pack++;
						
						f_Pack[f_idx_vec_Pack] = f_testARG.f_indexInsta;
						f_idx_vec_Pack++;
						
						f_Pack[f_idx_vec_Pack] = f_testARG.f_indexFunction;
						f_idx_vec_Pack++;
						
						f_Pack[f_idx_vec_Pack] = f_testARG.build_LastNameClose;
						f_idx_vec_Pack++;
						
						f_Pack[f_idx_vec_Pack] = f_testARG.build_LastTypeClose;
						f_idx_vec_Pack++;
							
						g_vec_Input_PackB_takeMeasure[g_idx_vec_Input_PackB_takeMeasure] = f_Pack;
						g_idx_vec_Input_PackB_takeMeasure++;
						}
					}
					
				for(var f_Helly = 0; f_Helly < g_idx_vec_Input_PackB_takeMeasure; f_Helly++)
					{
					var f_PackB = g_vec_Input_PackB_takeMeasure[f_Helly];
					
					if(f_PackB[0] == f_Helly)
						{
						var f_Void = false;
						for(var f_Test = 0; f_Test < f_PackB[4].length; f_Test++)
							{
							if(f_PackB[4][f_Test] == -5)
								{
								f_Void = true;
								}
								
							if(f_Void == false)
								{
								if(f_PackB[4][f_Test] == INSTA_TYPE_CONDITIONAL)
									{
									f_Achievement.m_Mark.m_vec_Int[4] += 100;
									f_Achievement.m_Mark.m_vec_Int[5] += 50;
									f_Achievement.m_Success = true;	
									}
								}
							}
						}
					}
				}
			}
		}
		
	var f_Found = true;
		
	for(var f_Jet = 0; (f_Jet < g_ThisName.length) && (f_Jet < g_vec_scrInputName[g_idx_vec_scrInputName - 1].length); f_Jet++)
		{
		if(g_ThisName.charAt(f_Jet) != g_vec_scrInputName[g_idx_vec_scrInputName - 1].charAt(f_Jet))
			{
			f_Found = false;
			}
		}
		
	if(f_Found = true && (f_testARG.f_indexInsta >= 1))
		{
		var f_vec_Pack = [];
		var f_idx_vec_Pack = 0;
		
		f_Pack[f_idx_vec_Pack] = g_ThisOne;
		f_idx_vec_Pack++;
		
		f_Pack[f_idx_vec_Pack] = f_testARG.f_indexInsta;
		f_idx_vec_Pack++;
		
		f_Pack[f_idx_vec_Pack] = f_testARG.f_indexFunction;
		f_idx_vec_Pack++;
		
		f_Pack[f_idx_vec_Pack] = f_testARG.build_LastNameClose;
		f_idx_vec_Pack++;
		
		f_Pack[f_idx_vec_Pack] = f_testARG.build_LastTypeClose;
		f_idx_vec_Pack++;
			
		g_vec_Input_Pack_takeMeasure[g_idx_vec_Input_Pack_takeMeasure] = f_Pack;
		g_idx_vec_Input_Pack_takeMeasure++;
		}

	return f_Achievement;
	}
g_idx_vec_scrInputTestCuteFunc++;


g_vec_scrInputName[g_idx_vec_scrInputName] = "ag_GenerateName";
g_idx_vec_scrInputName++;

g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "Ex";
g_idx_vec_scrInputHTML++;

g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrInputType++;

g_vec_scrInputNameCuteFunc[g_idx_vec_scrInputNameCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Name = f_Target.acMakeUnisonVARG(f_unisonARG);
	
	return f_Name;
	}
g_idx_vec_scrInputNameCuteFunc++;

//g_vec_scrInputPlaceCuteFunc[g_idx_vec_scrInputPlaceCuteFunc] = INSTA_TYPE_VAR_CALL;
//g_idx_vec_scrInputPlaceCuteFunc++;

g_vec_scrInputTestCuteFunc[g_idx_vec_scrInputTestCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Achievement = new classAchievement();
	
	//PULL ANALYTICAL FUNCTIONS EXAMPLES GIVEN
	//if(g_wwj_principalrunners_LastTypeClose[0] == )
	
	return f_Achievement;
	}
g_idx_vec_scrInputTestCuteFunc++;

g_vec_scrInputName[g_idx_vec_scrInputName] = "g_X";
g_idx_vec_scrInputName++;

g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "<input type=\"text\" name=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" id=\"" + "wwh_icobase_input_" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" value=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\">";
g_idx_vec_scrInputHTML++;

g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrInputType++;

g_vec_scrInputNameCuteFunc[g_idx_vec_scrInputNameCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Name = f_Target.acMakeUnisonVARG(f_unisonARG);
	
	return f_Name;
	}
g_idx_vec_scrInputNameCuteFunc++;

//g_vec_scrInputPlaceCuteFunc[g_idx_vec_scrInputPlaceCuteFunc] = INSTA_TYPE_VAR_CALL;
//g_idx_vec_scrInputPlaceCuteFunc++;

g_vec_scrInputTestCuteFunc[g_idx_vec_scrInputTestCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Achievement = new classAchievement();
	
	//PULL ANALYTICAL FUNCTIONS EXAMPLES GIVEN
	//if(g_wwj_principalrunners_LastTypeClose[0] == )
	
	return f_Achievement;
	}
g_idx_vec_scrInputTestCuteFunc++;

g_vec_scrInputName[g_idx_vec_scrInputName] = "g_Y";
g_idx_vec_scrInputName++;

g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "<input type=\"text\" name=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" id=\"" + "wwh_icobase_input_" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" value=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\">";
g_idx_vec_scrInputHTML++;

g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrInputType++;

g_vec_scrInputNameCuteFunc[g_idx_vec_scrInputNameCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Name = f_Target.acMakeUnisonVARG(f_unisonARG);
	
	return f_Name;
	}
g_idx_vec_scrInputNameCuteFunc++;

//g_vec_scrInputPlaceCuteFunc[g_idx_vec_scrInputPlaceCuteFunc] = INSTA_TYPE_VAR_CALL;
//g_idx_vec_scrInputPlaceCuteFunc++;

g_vec_scrInputTestCuteFunc[g_idx_vec_scrInputTestCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Achievement = new classAchievement();
	
	//PULL ANALYTICAL FUNCTIONS EXAMPLES GIVEN
	//if(g_wwj_principalrunners_LastTypeClose[0] == )
	
	return f_Achievement;
	}
g_idx_vec_scrInputTestCuteFunc++;

g_vec_scrInputName[g_idx_vec_scrInputName] = "g_Z";
g_idx_vec_scrInputName++;

g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "<input type=\"text\" name=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" id=\"" + "wwh_icobase_input_" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" value=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\">";
g_idx_vec_scrInputHTML++;

g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrInputType++;

g_vec_scrInputNameCuteFunc[g_idx_vec_scrInputNameCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Name = f_Target.acMakeUnisonVARG(f_unisonARG);
	
	return f_Name;
	};
g_idx_vec_scrInputNameCuteFunc++;

//g_vec_scrInputPlaceCuteFunc[g_idx_vec_scrInputPlaceCuteFunc] = INSTA_TYPE_VAR_CALL;
//g_idx_vec_scrInputPlaceCuteFunc++;

g_vec_scrInputTestCuteFunc[g_idx_vec_scrInputTestCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Achievement = new classAchievement();
	
	//PULL ANALYTICAL FUNCTIONS EXAMPLES GIVEN
	//if(g_wwj_principalrunners_LastTypeClose[0] == )
	
	return f_Achievement;
	}
g_idx_vec_scrInputTestCuteFunc++;

g_vec_scrInputName[g_idx_vec_scrInputName] = "f_URL";
g_idx_vec_scrInputName++;

g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "Ex";
g_idx_vec_scrInputHTML++;

g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrInputType++;

g_vec_scrInputNameCuteFunc[g_idx_vec_scrInputNameCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Name = f_Target.acMakeUnisonVARG(f_unisonARG);
	
	return f_Name;
	}
g_idx_vec_scrInputNameCuteFunc++;

//g_vec_scrInputPlaceCuteFunc[g_idx_vec_scrInputPlaceCuteFunc] = INSTA_TYPE_VAR_CALL;
//g_idx_vec_scrInputPlaceCuteFunc++;

g_vec_scrInputTestCuteFunc[g_idx_vec_scrInputTestCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Achievement = new classAchievement();
	
	//PULL ANALYTICAL FUNCTIONS EXAMPLES GIVEN
	//if(g_wwj_principalrunners_LastTypeClose[0] == )
	
	return f_Achievement;
	}
g_idx_vec_scrInputTestCuteFunc++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "loadDoc";
g_idx_vec_scrControlName++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlNameCuteFunc[g_idx_vec_scrControlNameCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Name = f_Target.acMakeUnisonVARG(f_unisonARG);
	
	return f_Name;
	}
g_idx_vec_scrControlNameCuteFunc++;

//g_vec_scrControlPlaceCuteFunc[g_idx_vec_scrControlPlaceCuteFunc] = INSTA_TYPE_VAR_CALL;
//g_idx_vec_scrControlPlaceCuteFunc++;

g_vec_scrControlTestCuteFunc[g_idx_vec_scrControlTestCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Achievement = new classAchievement();

	return f_Achievement;
	}
g_idx_vec_scrControlTestCuteFunc++;

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

g_vec_scrControlNameCuteFunc[g_idx_vec_scrControlNameCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Name = f_Target.acMakeUnisonVARG(f_unisonARG);
	
	return f_Name;
	};
g_idx_vec_scrControlNameCuteFunc++;

//g_vec_scrControlPlaceCuteFunc[g_idx_vec_scrControlPlaceCuteFunc] = INSTA_TYPE_VAR_CALL;
//g_idx_vec_scrControlPlaceCuteFunc++;

g_vec_scrControlTestCuteFunc[g_idx_vec_scrControlTestCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Achievement = new classAchievement();
	
	//PULL ANALYTICAL FUNCTIONS EXAMPLES GIVEN
	//if(g_wwj_principalrunners_LastTypeClose[0] == )
	
	return f_Achievement;
	}
g_idx_vec_scrControlTestCuteFunc++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.sin";
g_idx_vec_scrControlName++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlNameCuteFunc[g_idx_vec_scrControlNameCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Name = f_Target.acMakeUnisonVARG(f_unisonARG);
	
	return f_Name;
	};
g_idx_vec_scrControlNameCuteFunc++;

//g_vec_scrControlPlaceCuteFunc[g_idx_vec_scrControlPlaceCuteFunc] = INSTA_TYPE_VAR_CALL;
//g_idx_vec_scrControlPlaceCuteFunc++;

g_vec_scrControlTestCuteFunc[g_idx_vec_scrControlTestCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Achievement = new classAchievement();
	
	//PULL ANALYTICAL FUNCTIONS EXAMPLES GIVEN
	//if(g_wwj_principalrunners_LastTypeClose[0] == )
	
	return f_Achievement;
	}
g_idx_vec_scrControlTestCuteFunc++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.sqrt";
g_idx_vec_scrControlName++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlNameCuteFunc[g_idx_vec_scrControlNameCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Name = f_Target.acMakeUnisonVARG(f_unisonARG);
	
	return f_Name;
	};
g_idx_vec_scrControlNameCuteFunc++;

//g_vec_scrControlPlaceCuteFunc[g_idx_vec_scrControlPlaceCuteFunc] = INSTA_TYPE_VAR_CALL;
//g_idx_vec_scrControlPlaceCuteFunc++;

g_vec_scrControlTestCuteFunc[g_idx_vec_scrControlTestCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Achievement = new classAchievement();
	
	//PULL ANALYTICAL FUNCTIONS EXAMPLES GIVEN
	//if(g_wwj_principalrunners_LastTypeClose[0] == )
	
	return f_Achievement;
	}
g_idx_vec_scrControlTestCuteFunc++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "if(";
g_idx_vec_scrControlName++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_CONDITIONAL;
g_idx_vec_scrControlType++;

g_vec_scrControlNameCuteFunc[g_idx_vec_scrControlNameCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Name = f_Target.acMakeUnisonVARG(f_unisonARG);
	
	return f_Name;
	};
g_idx_vec_scrControlNameCuteFunc++;

//g_vec_scrControlPlaceCuteFunc[g_idx_vec_scrControlPlaceCuteFunc] = INSTA_TYPE_VAR_CALL;
//g_idx_vec_scrControlPlaceCuteFunc++;

g_vec_scrControlTestCuteFunc[g_idx_vec_scrControlTestCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Achievement = new classAchievement();
	
	//PULL ANALYTICAL FUNCTIONS EXAMPLES GIVEN
	//if(g_wwj_principalrunners_LastTypeClose[0] == )
	
	return f_Achievement;
	}
g_idx_vec_scrControlTestCuteFunc++;

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

g_vec_scrControlNameCuteFunc[g_idx_vec_scrControlNameCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Name = f_Target.acMakeUnisonVARG(f_unisonARG);
	
	return f_Name;
	};
g_idx_vec_scrControlNameCuteFunc++;

//g_vec_scrControlPlaceCuteFunc[g_idx_vec_scrControlPlaceCuteFunc] = INSTA_TYPE_VAR_CALL;
//g_idx_vec_scrControlPlaceCuteFunc++;

g_vec_scrControlTestCuteFunc[g_idx_vec_scrControlTestCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Achievement = new classAchievement();
	
	//PULL ANALYTICAL FUNCTIONS EXAMPLES GIVEN
	//if(g_wwj_principalrunners_LastTypeClose[0] == )
	
	return f_Achievement;
	}
g_idx_vec_scrControlTestCuteFunc++;

g_vec_scrControlName[g_idx_vec_scrControlName] = "selectOut";
g_idx_vec_scrControlName++;

g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
g_idx_vec_scrControlType++;

g_vec_scrControlNameCuteFunc[g_idx_vec_scrControlNameCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Name = f_Target.acMakeUnisonVARG(f_unisonARG);
	
	return f_Name;
	};
g_idx_vec_scrControlNameCuteFunc++;

//g_vec_scrControlPlaceCuteFunc[g_idx_vec_scrControlPlaceCuteFunc] = INSTA_TYPE_VAR_CALL;
//g_idx_vec_scrControlPlaceCuteFunc++;

g_vec_scrControlTestCuteFunc[g_idx_vec_scrControlTestCuteFunc] = function(f_Target, f_unisonARG)
	{
	var f_Achievement = new classAchievement();
	
	//PULL ANALYTICAL FUNCTIONS EXAMPLES GIVEN
	//if(g_wwj_principalrunners_LastTypeClose[0] == )
	
	return f_Achievement;
	}
g_idx_vec_scrControlTestCuteFunc++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "f_Result";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrOutputType++;

var f_OutputBridge1 = new classBridge();

f_OutputBridge1.ac_add_Path(g_idx_vec_scrOutputName - 1, INSTA_TYPE_VAR_CALL, LINE_TYPE_OUTPUT);
f_OutputBridge1.ac_add_Path(0, INSTA_TYPE_FUNC_CALL, LINE_TYPE_INPUT);
f_OutputBridge1.ac_add_Path(1, INSTA_TYPE_FUNC_CALL, LINE_TYPE_INPUT);
f_OutputBridge1.ac_add_Path(-5, INSTA_TYPE_VAR_CALL, LINE_TYPE_NORMAL);

g_vec_output_Bridge[g_idx_vec_output_Bridge] = f_OutputBridge1;
g_idx_vec_output_Bridge++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "window.getElementById(wwb_base_output1).innerHTML";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrOutputType++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "window.getElementById(wwb_navbar_output1).innerHTML";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrOutputType++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "window.getElementById(wwb_content1_output1).innerHTML";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrOutputType++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "window.getElementById(wwb_deploy_output1).innerHTML";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrOutputType++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "window.getElementById(wwb_mission_output1).innerHTML";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrOutputType++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "window.getElementById(wwb_mission_output2).innerHTML";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_VAR_CALL;
g_idx_vec_scrOutputType++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "wwb_base_output1";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_DATA;
g_idx_vec_scrOutputType++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "wwb_navbar_output1";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_DATA;
g_idx_vec_scrOutputType++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "wwb_content1_output1";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_DATA;
g_idx_vec_scrOutputType++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "wwb_deploy_output1";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_DATA;
g_idx_vec_scrOutputType++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "wwb_mission_output1";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_DATA;
g_idx_vec_scrOutputType++;

g_vec_scrOutputName[g_idx_vec_scrOutputName] = "wwb_mission_output2";
g_idx_vec_scrOutputName++;

g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_DATA;
g_idx_vec_scrOutputType++;

var f_OutputBridge2 = new classBridge();

f_OutputBridge2.ac_add_Path(g_idx_vec_scrOutputName - 1, INSTA_TYPE_FUNC_CALL, LINE_TYPE_OUTPUT);
f_OutputBridge2.ac_add_Path(-5, INSTA_TYPE_VAR_DEF, LINE_TYPE_INPUT);

g_vec_output_Bridge[g_idx_vec_output_Bridge] = f_OutputBridge2;
g_idx_vec_output_Bridge++;

  ////////////////////
 // Member Functions
//      Code
function loadDoc(f_URL, f_ID)
	{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function()
		{
		if(this.readyState == 4 && this.status == 200)
			{
			document.getElementById(f_ID).innerHTML = this.responseText;
			}
		};
	xhttp.open("GET", f_URL, true);
	xhttp.send();
	}