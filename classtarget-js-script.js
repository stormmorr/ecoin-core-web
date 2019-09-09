/*

classtarget-js-script.js - osirem.com
Copyright OSIREM (C) 2019
www.osirem.com

This source is proprietary, and cannot be used, in part or in full without
the express permission of the original author. The original author retain the
rights to use, modify, and/or relicense this code without notice.

*/

var INSTA_TYPE_VAR_DEF = 0;
var INSTA_TYPE_VAR_CALL = 1;
var INSTA_TYPE_FUNC_DEF = 2;
var INSTA_TYPE_FUNC_CALL = 3;
var INSTA_TYPE_CONDITIONAL = 4;
var INSTA_TYPE_LOOP_DEF = 5;
var INSTA_TYPE_DATA = 6;
var INSTA_TYPE_COUNT = 7;
var INSTA_TYPE_LM_OPER_EQUALS = 8;

var LINE_TYPE_START = 0;
var LINE_TYPE_NORMAL = 1;
var LINE_TYPE_INPUT = 2;
var LINE_TYPE_CONTROL = 3;
var LINE_TYPE_OUTPUT = 4;
var LINE_TYPE_COUNT = 5;

var VAR_TYPE_INT = 0;
var VAR_TYPE_FLT = 1;
var VAR_TYPE_HEX = 2;
var VAR_TYPE_BIN = 3;

var COMPONENT_CNT_BASE = 2;
var VARIABLE_STATE_NORMAL = 1;
var VARIABLE_STATE_POINTER = 2;
var ELEMENT_SCRIPT_LANGUAGE_C = 1;
var ELEMENT_SCRIPT_LANGUAGE_ESL = 2;
var COMPONENT_TYPE_VARINSTA = 1;
var COMPONENT_TYPE_FUNCTIONCALL = 2;
var COMPONENT_TYPE_FUNCTIONDEF = 3;
var VARIABLE_TYPE_INT = 1;
var COMPONENT_ELEMENT_TYPE_VARIABLE = 1;
var COMPONENT_ELEMENT_TYPE_FUNCTION = 2;
var COMPONENT_ELEMENT_TYPE_PROG = 3;
var PROG_TYPE_OPERATOR = 1;
var PROG_TYPE_BKT = 2;
var PROG_TYPE_PAREN = 3;
var OPERATOR_TYPE_PLUS = 1;

var CLS_TARGET_SCRIPT_TYPE_ESL = 1;

var g_FunctionStamp = 0;
var g_MasterTarget = new classTarget_JScript();

var g_vec_scrInputName = [];
var g_idx_vec_scrInputName = 0;

var g_vec_scrInputHTML = [];
var g_idx_vec_scrInputHTML = 0;

var g_vec_scrInputType = [];
var g_idx_vec_scrInputType = 0;

var g_vec_scrControlName = [];
var g_idx_vec_scrControlName = 0;

var g_vec_scrControlType = [];
var g_idx_vec_scrControlType = 0;

var g_vec_scrOutputName = [];
var g_idx_vec_scrOutputName = 0;

var g_vec_scrOutputType = [];
var g_idx_vec_scrOutputType = 0;

var g_vec_control_Bridge = [];
var g_idx_vec_control_Bridge = 0;

var g_vec_output_Bridge = [];
var g_idx_vec_output_Bridge = 0;

function classTarget_JScript()
{
	this.m_Collection = new classCollection();

	this.m_vec_Function = [];
	this.m_idx_vec_Function = 0;
	
	this.m_Mark = 0.0;
	
	this.m_vec_Name = [];
	this.m_idx_vec_Name = 0;
	
	this.m_SchemaTop = 0;
	this.m_SchemaRef = [];
	
	for(var f_Count = 0; f_Count < 18; f_Count++)
		{
		this.m_SchemaRef.push(new BiVector());
		}

	this.m_LastType = -5;
	this.m_LastTypeII = -5;
	this.m_LastTypeIII = -5;

	this.m_Factor = [];

	for(var f_XY = 0; f_XY < INSTA_TYPE_COUNT; f_XY++)
		{
		this.m_Factor[f_XY] = new classFactor();
		}

	this.m_Factor[8] = new classFactor();

	this.m_InstaCountMap = 0;

	this.m_String = "";

	  ////////////////////////////////////
	 // LEGACY of Structured Analysis
	//
	this.m_vec_Result = [];
	this.m_idx_vec_Result = 0;
	
	this.m_vec_CountLock = [];
	this.m_idx_vec_CountLock = 0;

	this.m_GRCinput = [];
	
	for(var f_XY = 0; f_XY < INSTA_TYPE_COUNT; f_XY++)
		{
		this.m_GRCinput[f_XY] = 0;
		}
		
	this.m_GRMinput = [];
	
	for(var f_XY = 0; f_XY < INSTA_TYPE_COUNT; f_XY++)
		{
		this.m_GRMinput[f_XY] = 0;
		}
		
	this.m_GRCcontrol= [];
	
	for(var f_XY = 0; f_XY < INSTA_TYPE_COUNT; f_XY++)
		{
		this.m_GRCcontrol[f_XY] = 0;
		}
		
	this.m_GRMcontrol = [];
	
	for(var f_XY = 0; f_XY < INSTA_TYPE_COUNT; f_XY++)
		{
		this.m_GRMcontrol[f_XY] = 0;
		}
		
	this.m_GRCoutput = [];
	
	for(var f_XY = 0; f_XY < INSTA_TYPE_COUNT; f_XY++)
		{
		this.m_GRCoutput[f_XY] = 0;
		}
		
	this.m_GRMoutput = [];
	
	for(var f_XY = 0; f_XY < INSTA_TYPE_COUNT; f_XY++)
		{
		this.m_GRMoutput[f_XY] = 0;
		}
}

classTarget_JScript.prototype.acPowerDown = function()
{
	for(var f_Atom = 0; f_Atom < this.m_idx_vec_Function; f_Atom++)
		{
		eval("function " + this.m_vec_Function[f_Atom].m_Name + "() {}");
		}
}

function clsName(f_Name, f_BitCount, f_INSTA, f_index_Insta, f_index_Function)
{
	this.m_Name = f_Name;
	this.m_BitCount = f_BitCount;
	this.m_INSTA_Type = f_INSTA;
	this.m_index_Insta = f_index_Insta;
	this.m_index_Function = f_index_Function;
	this.m_vec_Name = [];
	this.m_idx_vec_Name = 0;
}

function classBridge()
{
	this.m_vec_A = [];
	this.m_vec_Type = [];
	this.m_vec_LineType = [];
	this.m_idx_vec = 0;
}

classBridge.prototype.ac_add_Path = function(f_A, f_Type, f_LineType)
{
	this.m_vec_A[this.m_idx_vec] = f_A;
	this.m_vec_Type[this.m_idx_vec] = f_Type;
	this.m_vec_LineType[this.m_idx_vec] = f_LineType;
	this.m_idx_vec++;
}

function classListI(f_INSTA)
{
	this.m_vec_List = [];
	this.m_idx_vec_List = 0;
	
	for(var f_JET = 0; f_JET < g_idx_vec_scrInputType; f_JET++)
		{
		if(g_vec_scrInputType[f_JET] == f_INSTA)
			{
			this.m_vec_List[this.m_idx_vec_List] = g_vec_scrInputName[f_JET];
			this.m_idx_vec_List++;
			}
		}
}

function classListC(f_INSTA)
{
	this.m_vec_List = [];
	this.m_idx_vec_List = 0;
	
	for(var f_JET = 0; f_JET < g_idx_vec_scrControlType; f_JET++)
		{
		if(g_vec_scrControlType[f_JET] == f_INSTA)
			{
			this.m_vec_List[this.m_idx_vec_List] = g_vec_scrControlName[f_JET];
			this.m_idx_vec_List++;
			}
		}
}

function classListO(f_INSTA)
{
	this.m_vec_List = [];
	this.m_idx_vec_List = 0;
	
	for(var f_JET = 0; f_JET < g_idx_vec_scrOutputType; f_JET++)
		{
		if(g_vec_scrOutputType[f_JET] == f_INSTA)
			{
			this.m_vec_List[this.m_idx_vec_List] = g_vec_scrOutputName[f_JET];
			this.m_idx_vec_List++;
			}
		}
}

function classList_Target_Name(f_INSTA, f_Target)
{
	this.m_vec_List = [];
	this.m_idx_vec_List = 0;
	
	for(var f_JET = 0; f_JET < f_Target.m_idx_vec_Name; f_JET++)
		{
		if(f_Target.m_vec_Name[f_JET].m_INSTA_Type == f_INSTA)
			{
			this.m_vec_List[this.m_idx_vec_List] = f_Target.m_vec_Name[f_JET].m_Name;
			this.m_idx_vec_List++;
			}
		}
}

//fixme: add three ways lazy bear approach to changing variable insta names
classTarget_JScript.prototype.acMakeUnison = function(f_Target, f_Name, f_BitCount, f_INSTA, f_Element, f_index_Insta, f_index_Function)
{
	if(f_INSTA == INSTA_TYPE_VAR_CALL)
		{
		if(f_index_Function <= 100)
			{
			if(f_index_Insta > 0)
				{
				var f_VarCall_List = new classListI(INSTA_TYPE_VAR_CALL);
				
				var f_inputFactorFinger = this.ac_takeMeasurementINTV1(f_Element, 0, f_VarCall_List.m_idx_vec_List, 0, 3, 5);
				
				return f_VarCall_List.m_vec_List[f_inputFactorFinger];
				}
			else
				{
				if(this.ac_takeMeasurementINTV1(f_Element, 0, 1, 0, 3, 1))
					{
					var f_VarCall_List = new classListO(INSTA_TYPE_VAR_CALL);
				
					var f_inputFactorFinger = this.ac_takeMeasurementINTV1(f_Element, 0, f_VarCall_List.m_idx_vec_List, 0, 3, 5);
				
					return f_VarCall_List.m_vec_List[f_inputFactorFinger];
					}
				else
					{
					var f_VarCall_List = new classListC(INSTA_TYPE_VAR_CALL);
				
					var f_inputFactorFinger = this.ac_takeMeasurementINTV1(f_Element, 0, f_VarCall_List.m_idx_vec_List, 0, 3, 5);
				
					return f_VarCall_List.m_vec_List[f_inputFactorFinger];	
					}
				}
			}
		else if((f_index_Function > 100) &&
				(f_index_Function <= 500))
			{
			if(f_index_Insta > 0)
				{
				var f_FingerFactorial = this.ac_takeMeasurementINTV1(f_Element, 0, 5, 0, 3, 2);
				
				if(f_FingerFactorial >= 2)
					{
					var f_VarCall_List = new classListO(INSTA_TYPE_VAR_CALL);
				
					var f_inputFactorFinger = this.ac_takeMeasurementINTV1(f_Element, 0, f_VarCall_List.m_idx_vec_List, 0, 3, 5);
				
					return f_VarCall_List.m_vec_List[f_inputFactorFinger];
					}
				else
					{
					var f_VarCall_List = new classListC(INSTA_TYPE_VAR_CALL);
				
					var f_inputFactorFinger = this.ac_takeMeasurementINTV1(f_Element, 0, f_VarCall_List.m_idx_vec_List, 0, 3, 1);
				
					return f_VarCall_List.m_vec_List[f_inputFactorFinger];
					}
				}
			else
				{
				var f_clsName = new clsName(f_Name, f_BitCount, f_INSTA, f_index_Insta, f_index_Function);
		
				f_clsName.m_vec_Name[f_clsName.m_idx_vec_Name] = f_clsName;
				f_clsName.m_idx_vec_Name++;
				
				f_Target.m_vec_Name[f_Target.m_idx_vec_Name] = f_clsName;
				f_Target.m_idx_vec_Name++;
				
				return f_Name;
				}
			}
		else if((f_index_Function > 500) &&
				(f_index_Function <= 750))
			{
			var f_VarCall_List_Name = new classList_Target_Name(INSTA_TYPE_VAR_CALL, f_Target);
			
			var f_nameFactorFinger = this.ac_takeMeasurementINTV1(f_Element, 0, f_VarCall_List_Name.m_idx_vec_List, 0, 3, 7);
		
			return f_VarCall_List_Name.m_vec_List[f_nameFactorFinger];
			}
		else if(f_index_Function <= 1000)
			{
			if(f_index_Insta > 0)
				{
				var f_VarCall_List_Control = new classListC(INSTA_TYPE_VAR_CALL);
			
				var f_controlFactorFinger = this.ac_takeMeasurementINTV1(f_Element, 0, f_VarCall_List_Control.m_idx_vec_List, 0, 3, 7);
			
				return f_VarCall_List_Control.m_vec_List[f_controlFactorFinger];
				}
			else
				{
				var f_VarCall_List_Output = new classListO(INSTA_TYPE_VAR_CALL);
			
				var f_outputFactorFinger = this.ac_takeMeasurementINTV1(f_Element, 0, f_VarCall_List_Output.m_idx_vec_List, 0, 3, 7);
			
				return f_VarCall_List_Output.m_vec_List[f_outputFactorFinger];
				}
			}
		else
			{
			var f_VarCall_List_Name = new classList_Target_Name(INSTA_TYPE_VAR_CALL, f_Target);
			
			var f_nameFactorFinger = this.ac_takeMeasurementINTV1(f_Element, 0, f_VarCall_List_Name.m_idx_vec_List, 0, 3, 7);
		
			return f_VarCall_List_Name.m_vec_List[f_nameFactorFinger];
			}
		}
	else if(f_INSTA == INSTA_TYPE_FUNC_CALL)
		{
		if(f_index_Function <= 100)
			{
			if(f_index_Insta > 0)
				{
				var f_VarCall_List = new classListI(INSTA_TYPE_FUNC_CALL);
				
				var f_inputFactorFinger = this.ac_takeMeasurementINTV1(f_Element, 0, f_VarCall_List.m_idx_vec_List, 0, 3, 5);
				
				return f_VarCall_List.m_vec_List[f_inputFactorFinger];
				}
			else
				{
				if(this.ac_takeMeasurementINTV1(f_Element, 0, 1, 0, 3, 1))
					{
					var f_VarCall_List = new classListO(INSTA_TYPE_FUNC_CALL);
				
					var f_inputFactorFinger = this.ac_takeMeasurementINTV1(f_Element, 0, f_VarCall_List.m_idx_vec_List, 0, 3, 5);
				
					return f_VarCall_List.m_vec_List[f_inputFactorFinger];
					}
				else
					{
					var f_VarCall_List = new classListC(INSTA_TYPE_FUNC_CALL);
				
					var f_inputFactorFinger = this.ac_takeMeasurementINTV1(f_Element, 0, f_VarCall_List.m_idx_vec_List, 0, 3, 5);
				
					return f_VarCall_List.m_vec_List[f_inputFactorFinger];	
					}
				}
			}
		else if((f_index_Function > 100) &&
				(f_index_Function <= 500))
			{
			if(f_index_Insta > 0)
				{
				var f_FingerFactorial = this.ac_takeMeasurementINTV1(f_Element, 0, 5, 0, 3, 2);
				
				if(f_FingerFactorial >= 2)
					{
					var f_VarCall_List = new classListO(INSTA_TYPE_FUNC_CALL);
				
					var f_inputFactorFinger = this.ac_takeMeasurementINTV1(f_Element, 0, f_VarCall_List.m_idx_vec_List, 0, 3, 5);
				
					return f_VarCall_List.m_vec_List[f_inputFactorFinger];
					}
				else
					{
					var f_VarCall_List = new classListC(INSTA_TYPE_FUNC_CALL);
				
					var f_inputFactorFinger = this.ac_takeMeasurementINTV1(f_Element, 0, f_VarCall_List.m_idx_vec_List, 0, 3, 1);
				
					return f_VarCall_List.m_vec_List[f_inputFactorFinger];
					}
				}
			else
				{
				var f_clsName = new clsName(f_Name, f_BitCount, f_INSTA, f_index_Insta, f_index_Function);
		
				f_clsName.m_vec_Name[f_clsName.m_idx_vec_Name] = f_clsName;
				f_clsName.m_idx_vec_Name++;
				
				f_Target.m_vec_Name[f_Target.m_idx_vec_Name] = f_clsName;
				f_Target.m_idx_vec_Name++;
				
				return f_Name;
				}
			}
		else if((f_index_Function > 500) &&
				(f_index_Function <= 750))
			{
			var f_VarCall_List_Name = new classList_Target_Name(INSTA_TYPE_FUNC_CALL, f_Target);
			
			var f_nameFactorFinger = this.ac_takeMeasurementINTV1(f_Element, 0, f_VarCall_List_Name.m_idx_vec_List, 0, 3, 7);
		
			return f_VarCall_List_Name.m_vec_List[f_nameFactorFinger];
			}
		else if(f_index_Function <= 1000)
			{
			if(f_index_Insta > 0)
				{
				var f_VarCall_List_Control = new classListC(INSTA_TYPE_FUNC_CALL);
			
				var f_controlFactorFinger = this.ac_takeMeasurementINTV1(f_Element, 0, f_VarCall_List_Control.m_idx_vec_List, 0, 3, 7);
			
				return f_VarCall_List_Control.m_vec_List[f_controlFactorFinger];
				}
			else
				{
				var f_VarCall_List_Output = new classListO(INSTA_TYPE_FUNC_CALL);
			
				var f_outputFactorFinger = this.ac_takeMeasurementINTV1(f_Element, 0, f_VarCall_List_Output.m_idx_vec_List, 0, 3, 7);
			
				return f_VarCall_List_Output.m_vec_List[f_outputFactorFinger];
				}
			}
		else
			{
			var f_VarCall_List_Name = new classList_Target_Name(INSTA_TYPE_FUNC_CALL, f_Target);
			
			var f_nameFactorFinger = this.ac_takeMeasurementINTV1(f_Element, 0, f_VarCall_List_Name.m_idx_vec_List, 0, 3, 7);
		
			return f_VarCall_List_Name.m_vec_List[f_nameFactorFinger];
			}
		}
	else
		{
		var f_FingerFactorial = this.ac_takeMeasurementINTV1(f_Element, 0, 5, 0, 3, 2);
				
		if(f_FingerFactorial >= 2)
			{
			var f_VarCall_List_Name = new classList_Target_Name(INSTA_TYPE_FUNC_CALL, f_Target);
		
			var f_nameFactorFinger = this.ac_takeMeasurementINTV1(f_Element, 0, f_VarCall_List_Name.m_idx_vec_List, 0, 3, 5);
		
			return f_VarCall_List_Name.m_vec_List[f_nameFactorFinger];
			}
		else
			{
			var f_clsName = new clsName(f_Name, f_BitCount, f_INSTA, f_index_Insta, f_index_Function);
		
			f_clsName.m_vec_Name[f_clsName.m_idx_vec_Name] = f_clsName;
			f_clsName.m_idx_vec_Name++;
			
			f_Target.m_vec_Name[f_Target.m_idx_vec_Name] = f_clsName;
			f_Target.m_idx_vec_Name++;
			
			return f_Name;
			}
		}
		
	var f_clsName = new clsName(f_Name, f_BitCount, f_INSTA, f_index_Insta, f_index_Function);
		
	f_clsName.m_vec_Name[f_clsName.m_idx_vec_Name] = f_clsName;
	f_clsName.m_idx_vec_Name++;
	
	f_Target.m_vec_Name[f_Target.m_idx_vec_Name] = f_clsName;
	f_Target.m_idx_vec_Name++;
	
	return f_Name;
}

classTarget_JScript.prototype.acGatherNames = function()
{
	//FROZEN//
	//AJAX bitcoin-office.com for gathering names
	//presents Math functions feel free to edit
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.abs(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	/*this.m_vec_Name[this.m_idx_vec_Name].m_Code = function(f_IN)
		 {
	     var f_Input = f_IN;
		 var f_Output = 
	     }*/
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.acos(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.acosh(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.asin(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.asinh(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.atan(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.atan2(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.atanh(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.acosh(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.cbrt(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.ceil(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.cos(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.atan2(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.atanh(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.acosh(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.cbrt(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.ceil(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.cosh(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.exp(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.floor(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.log(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.max(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.min(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.pow(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.random(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.round(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.sin(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.sinh(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.sqrt(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.tan(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.tanh(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
	
	this.m_vec_Name[this.m_idx_vec_Name] = new clsName("Math.trunc(", 0, INSTA_TYPE_FUNC_CALL, 0, 0);
	this.m_idx_vec_Name++;
}

classTarget_JScript.prototype.ac_next_InputName = function(f_Type)
{
	var f_BoolScan = true;
	
	while((g_vec_scrInputType[this.m_GRCinput[f_Type]] != f_Type) && (f_BoolScan == true))
		{
		this.m_GRCinput[f_Type]++;
		
		if(this.m_GRCinput[f_Type] >= g_idx_vec_scrInputType)
			{
			f_BoolScan = false;
			}
		}
		
	this.m_GRMinput[f_Type] = this.m_GRCinput[f_Type];
	this.m_GRMinput[f_Type]++;
	
	if(f_BoolScan == true)
		{
		while((g_vec_scrInputType[this.m_GRMinput[f_Type]] != f_Type) && (f_BoolScan == true))
			{
			this.m_GRMinput[f_Type]++;
			
			if(this.m_GRMinput[f_Type] >= g_idx_vec_scrInputType)
				{
				f_BoolScan = false;
				}
			}
		}
	else
		{
		throw("Should not reach this point");
		}
		
	if(f_BoolScan == true)
		{
		return g_vec_scrInputName[this.m_GRCinput[f_Type]];
		}
	else
		{
		this.m_GRMinput[f_Type] = -5;
		return g_vec_scrInputName[this.m_GRCinput[f_Type]];
		}
}

classTarget_JScript.prototype.ac_next_ControlName = function(f_Type)
{
	var f_BoolScan = true;
	
	while((g_vec_scrControlType[this.m_GRCcontrol[f_Type]] != f_Type) && (f_BoolScan == true))
		{
		this.m_GRCcontrol[f_Type]++;
		
		if(this.m_GRCcontrol[f_Type] >= g_idx_vec_scrControlType)
			{
			f_BoolScan = false;
			}
		}
		
	this.m_GRMcontrol[f_Type] = this.m_GRCcontrol[f_Type];
	this.m_GRMcontrol[f_Type]++;
	
	if(f_BoolScan == true)
		{
		while((g_vec_scrControlType[this.m_GRMcontrol[f_Type]] != f_Type) && (f_BoolScan == true))
			{
			this.m_GRMcontrol[f_Type]++;
			
			if(this.m_GRMcontrol[f_Type] >= g_idx_vec_scrControlType)
				{
				f_BoolScan = false;
				}
			}
		}
	else
		{
		throw("Should not reach this point");
		}
		
	if(f_BoolScan == true)
		{
		return g_vec_scrControlName[this.m_GRCcontrol[f_Type]];
		}
	else
		{
		this.m_GRMcontrol[f_Type] = -5;
		return g_vec_scrControlName[this.m_GRCcontrol[f_Type]];
		}
}

classTarget_JScript.prototype.ac_next_OutputName = function(f_Type, f_Repeat)
{
	var f_BoolScan = true;
	
	while((g_vec_scrOutputType[this.m_GRCoutput[f_Type]] != f_Type) && (f_BoolScan == true))
		{
		this.m_GRCoutput[f_Type]++;
		
		if(this.m_GRCoutput[f_Type] >= g_idx_vec_scrOutputType)
			{
			f_BoolScan = false;
			}
		}
		
	this.m_GRMoutput[f_Type] = this.m_GRCoutput[f_Type];
	this.m_GRMoutput[f_Type]++;
	
	if(f_BoolScan == true)
		{
		while((g_vec_scrOutputType[this.m_GRMoutput[f_Type]] != f_Type) && (f_BoolScan == true))
			{
			this.m_GRMoutput[f_Type]++;
			
			if(this.m_GRMoutput[f_Type] >= g_idx_vec_scrOutputType)
				{
				f_BoolScan = false;
				}
			}
		}
	else
		{
		throw("Should not reach this point");
		}
		
	if(f_BoolScan == true)
		{
		return g_vec_scrOutputName[this.m_GRCoutput[f_Type]];
		}
	else
		{
		this.m_GRMoutput[f_Type] = -5;
		return g_vec_scrOutputName[this.m_GRCoutput[f_Type]];
		}
}

classTarget_JScript.prototype.acMerge_ICOtoName = function()
{
	//Input
	for(var f_XY = 0; f_XY < g_idx_vec_scrInputName; f_XY++)
		{
		this.m_vec_Name[this.m_idx_vec_Name] = new clsName(g_vec_scrInputName[f_XY], 0, g_vec_scrInputType[f_XY], 0, 0);
		this.m_idx_vec_Name++;
		}

	//Control
	for(var f_XY = 0; f_XY < g_idx_vec_scrControlName; f_XY++)
		{
		this.m_vec_Name[this.m_idx_vec_Name] = new clsName(g_vec_scrControlName[f_XY], 0, g_vec_scrControlType[f_XY], 0, 0);
		this.m_idx_vec_Name++;
		}
		
	//Output
	for(var f_XY = 0; f_XY < g_idx_vec_scrOutputName; f_XY++)
		{
		this.m_vec_Name[this.m_idx_vec_Name] = new clsName(g_vec_scrOutputName[f_XY], 0, g_vec_scrOutputType[f_XY], 0, 0);
		this.m_idx_vec_Name++;
		}
}

classTarget_JScript.prototype.acGatherICO_default = function()
{
	 //////////////////////////
	// 
	g_vec_scrInputName[g_idx_vec_scrInputName] = "ac_takeMeasurementINTV1";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "ag_GenerateName";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "g_X";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "g_Y";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "g_Z";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.cos";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrControlType++;
	
	g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.sin";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrControlType++;
	
	g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.sqrt";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrControlType++;

	g_vec_scrControlName[g_idx_vec_scrControlName] = "if(";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_CONDITIONAL;
	g_idx_vec_scrControlType++;
	
	g_vec_scrOutputName[g_idx_vec_scrOutputName] = "";
	g_idx_vec_scrOutputName++;
	
	g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrOutputType++;
	
	g_vec_scrOutputName[g_idx_vec_scrOutputName] = "playSound";
	g_idx_vec_scrOutputName++;
	
	g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrOutputType++;
}

function classBridgeResult()
{
	this.m_vec_LineIndex = [];
	this.m_vec_Position_Equals = [];
	this.m_vec_Position_Argument = [];
	this.m_vec_String_Equal = [];
	this.m_idx_vec = 0;
}

classTarget_JScript.prototype.acScan_Code_Bridges = function(f_Function, f_String, f_Type)
{
	var f_Result = new classBridgeResult();

	for(var f_XY = 0; f_XY < f_Function.m_idx_vec_CodeLineStorage; f_XY++)
		{
		var f_Line = f_Function.m_vec_CodeLineStorage[f_XY];

		for(var f_I = 0; f_I < f_Line.length; f_I++)
			{
			var f_Found = true;
			
			for(var f_Grand = 0; (f_Grand < f_Line[f_I].m_String.length) && (f_Grand < f_String.length); f_Grand++)
				{
				if(f_Line[f_I].m_String.charAt(f_Grand) != f_String.charAt(f_Grand))
					{
					f_Found = false;
					}
				}
			
			if(f_Found == true)
				{
				f_Result.m_vec_LineIndex[f_Result.m_idx_vec] = f_XY;

				if(f_I == 0)
					{
					f_Result.m_vec_Position_Equals[f_Result.m_idx_vec] = f_I;
					f_Result.m_vec_Position_Argument[f_Result.m_idx_vec] = -5;
					f_Result.m_vec_String_Equal[f_Result.m_idx_vec] = "E";
					}
				else
					{
					var f_Function = false;
					var f_Index = 0;

					for(var f_jet = 0; f_jet < f_I; f_jet++)
						{
						if(f_Line[f_jet].m_Type == INSTA_TYPE_FUNC_CALL)
							{
							f_Function = true;
							f_Index = f_jet;
							}
						}

					if(f_Function == true)
						{
						f_Result.m_vec_Position_Equals[f_Result.m_idx_vec] = f_I;
						f_Result.m_vec_Position_Argument[f_Result.m_idx_vec] = f_I - f_Index;
						f_Result.m_vec_String_Equal[f_Result.m_idx_vec] = "F";
						}
					else
						{
						f_Result.m_vec_Position_Equals[f_Result.m_idx_vec] = f_I;
						f_Result.m_vec_Position_Argument[f_Result.m_idx_vec] = -5;
						f_Result.m_vec_String_Equal[f_Result.m_idx_vec] = f_Line[0].m_String;
						}
					}

				f_Result.m_idx_vec++;
				}
			}
		}

	return f_Result;
}

classTarget_JScript.prototype.acMark_Bridges = function()
{
	var f_Mark = new classMark();
	
	var f_vec_Scanlist = [];
	var f_idx_vec_Scanlist = 0;
	
	var f_Function = this.m_vec_Function[0];
	
	for(var f_Helly = 0; f_Helly < g_idx_vec_control_Bridge; f_Helly++)
		{
		var f_Bridge = g_vec_control_Bridge[f_Helly];
		
		if(f_Bridge.m_vec_Type[0] == INSTA_TYPE_CONDITIONAL)
			{
			if((f_Bridge.m_vec_LineType[1] == LINE_TYPE_INPUT) &&
			   (f_Bridge.m_vec_LineType[2] == LINE_TYPE_INPUT))
				{
				//Scan, Search Wider			
				var f_BridgeResultB = this.acScan_Code_Bridges(f_Function, g_vec_scrInputName[f_Bridge.m_vec_A[1]]);
				var f_BridgeResultC = this.acScan_Code_Bridges(f_Function, g_vec_scrInputName[f_Bridge.m_vec_A[2]]);
				
				if(f_BridgeResultB.m_idx_vec == 0 &&
				   f_BridgeResultC.m_idx_vec == 0)
					{
					f_Mark.m_vec_Int[4] += 30;
					}
				else
					{
					if(f_BridgeResultB.m_idx_vec >= 1)
						{
						for(var f_jet = 0; f_jet < f_BridgeResultB.m_idx_vec; f_jet++)
							{
							if(f_BridgeResultB.m_vec_Position_Equals[f_jet] >= 1 ||
							   f_BridgeResultB.m_vec_Position_Argument[f_jet] != -5)
								{
								f_Mark.m_vec_Int[6] += 3;
								
								f_vec_Scanlist[f_idx_vec_Scanlist] = f_BridgeResultB.m_vec_String_Equal[f_jet];
								f_idx_vec_Scanlist++;
								}
							}
						}
					
					if(f_BridgeResultC.m_idx_vec >= 1)
						{
						for(var f_jet = 0; f_jet < f_BridgeResultC.m_idx_vec; f_jet++)
							{
							if((f_BridgeResultC.m_vec_Position_Equals[f_jet] >= 1) ||
							   (f_BridgeResultC.m_vec_Position_Argument[f_jet] != -5))
								{
								f_Mark.m_vec_Int[6] += 3;
								
								f_vec_Scanlist[f_idx_vec_Scanlist] = f_BridgeResultC.m_vec_String_Equal[f_jet];
								f_idx_vec_Scanlist++;
								}
							}
						}
					}
				}
			}
		}
		
	for(var f_Helly = 0; f_Helly < g_idx_vec_output_Bridge; f_Helly++)
		{
		var f_Bridge = g_vec_output_Bridge[f_Helly];
		
		if(f_Bridge.m_vec_Type[0] == INSTA_TYPE_VAR_CALL)
			{
			if(f_Bridge.m_vec_LineType[1] == LINE_TYPE_INPUT &&
			   f_Bridge.m_vec_LineType[2] == LINE_TYPE_INPUT &&
			   f_Bridge.m_vec_LineType[3] == LINE_TYPE_INPUT)
				{
				//Scan, Search Wider
				var f_BridgeResultA = this.acScan_Code_Bridges(f_Function, g_vec_scrOutputName[f_Bridge.m_vec_A[0]]);
				
				if(f_BridgeResultA.m_idx_vec == 0)
					{
					f_Mark.m_vec_Int[4] += 15;
					}
				else
					{
					for(var f_jet = 0; f_jet < f_BridgeResultA.m_idx_vec; f_jet++)
						{
						if((f_BridgeResultA.m_vec_Position_Equals[f_jet] == 0) &&
						   (f_BridgeResultA.m_vec_Position_Argument[f_jet] == -5))
							{
							f_Mark.m_vec_Int[5] += 3;
							}
						}
					}
					
				for(var f_XY = 0; f_XY < f_idx_vec_Scanlist; f_XY++)
					{
					var f_BridgeResult = this.acScan_Code_Bridges(f_Function, f_vec_Scanlist[f_XY]);
				
					if(f_BridgeResultA.m_idx_vec == 0)
						{
						f_Mark.m_vec_Int[4] += 15;
						}
					else
						{
						for(var f_jet = 0; f_jet < f_BridgeResultA.m_idx_vec; f_jet++)
							{
							if((f_BridgeResultA.m_vec_Position_Equals[f_jet] == 0) &&
							   (f_BridgeResultA.m_vec_Position_Argument[f_jet] == -5))
								{
								f_Mark.m_vec_Int[5] += 3;
								}
							}
						}
					}
				}
			}
		if(f_Bridge.m_vec_A[1] == -5)
			{
			var f_ReturnBridgeResult = this.acScan_Code_Bridges(f_Function, g_vec_scrOutputName[f_Bridge.m_vec_A[0]]);
			
			if(f_ReturnBridgeResult.m_idx_vec == 0)
				{
				f_Mark.m_vec_Int[4] += 15;
				}
			else
				{
				for(var f_forge = 0; f_forge < f_ReturnBridgeResult.m_idx_vec; f_forge++)
					{
					if((f_ReturnBridgeResult.m_vec_Position_Equals[f_forge] == 0) &&
						(f_ReturnBridgeResult.m_vec_Position_Argument [f_forge] == -5))
						{
						f_Mark.m_vec_Int[6] += 5;
						}
					}
				}
			}
		}
		
	//console.log("f_Mark=" + JSON.stringify(f_Mark));
		
	return f_Mark;
}

classTarget_JScript.prototype.acGatherICO_jscript_base = function()
{
	 //////////////////////////
	//
	g_vec_scrInputName[g_idx_vec_scrInputName] = "firstinput";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "<input type=\"number\" name=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" id=\"" + "wwh_icobase_input_" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" value=\"1\" min=\"1\" max=\"5\">";
	g_idx_vec_scrInputHTML++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrInputType++;
	
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "wwb_ecnbase_ac_takeMeasurementINTV1";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "Ex";
	g_idx_vec_scrInputHTML++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrInputType++;
	
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "wwb_ecnbase_ag_GenerateName";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "Ex";
	g_idx_vec_scrInputHTML++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "wwb_ecnbase_acMakeUnison";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "Ex";
	g_idx_vec_scrInputHTML++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "g_X";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "<input type=\"text\" name=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" id=\"" + "wwh_icobase_input_" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" value=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\">";
	g_idx_vec_scrInputHTML++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "g_Y";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "<input type=\"text\" name=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" id=\"" + "wwh_icobase_input_" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" value=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\">";
	g_idx_vec_scrInputHTML++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "g_Z";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "<input type=\"text\" name=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" id=\"" + "wwh_icobase_input_" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" value=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\">";
	g_idx_vec_scrInputHTML++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.cos";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrControlType++;
	
	g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.sin";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrControlType++;
	
	g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.sqrt";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrControlType++;

	g_vec_scrControlName[g_idx_vec_scrControlName] = "if(";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_CONDITIONAL;
	g_idx_vec_scrControlType++;
	
	var f_ControlBridge1 = new classBridge();
	
	f_ControlBridge1.ac_add_Path(g_idx_vec_scrControlName - 1, INSTA_TYPE_CONDITIONAL, LINE_TYPE_CONTROL);
	f_ControlBridge1.ac_add_Path(0, INSTA_TYPE_FUNC_CALL, LINE_TYPE_INPUT);
	f_ControlBridge1.ac_add_Path(1, INSTA_TYPE_FUNC_CALL, LINE_TYPE_INPUT);
	
	g_vec_control_Bridge[g_idx_vec_control_Bridge] = f_ControlBridge1;
	g_idx_vec_control_Bridge++;
	
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
	
	g_vec_scrOutputName[g_idx_vec_scrOutputName] = "return ";
	g_idx_vec_scrOutputName++;
	
	g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrOutputType++;
	
	var f_OutputBridge2 = new classBridge();
	
	f_OutputBridge2.ac_add_Path(g_idx_vec_scrOutputName - 1, INSTA_TYPE_FUNC_CALL, LINE_TYPE_OUTPUT);
	f_OutputBridge2.ac_add_Path(-5, INSTA_TYPE_VAR_DEF, LINE_TYPE_INPUT);
	
	g_vec_output_Bridge[g_idx_vec_output_Bridge] = f_OutputBridge2;
	g_idx_vec_output_Bridge++;
}

classTarget_JScript.prototype.acGatherICO_html_base = function()
{
	 //////////////////////////
	// 
	g_vec_scrInputName[g_idx_vec_scrInputName] = "ac_takeMeasurementINTV1";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "ag_GenerateName";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "g_X";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "g_Y";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "g_Z";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.cos";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrControlType++;
	
	g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.sin";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrControlType++;
	
	g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.sqrt";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrControlType++;

	g_vec_scrControlName[g_idx_vec_scrControlName] = "if(";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_CONDITIONAL;
	g_idx_vec_scrControlType++;
	
	g_vec_scrOutputName[g_idx_vec_scrOutputName] = "";
	g_idx_vec_scrOutputName++;
	
	g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrOutputType++;
	
	g_vec_scrOutputName[g_idx_vec_scrOutputName] = "playSound";
	g_idx_vec_scrOutputName++;
	
	g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrOutputType++;
}

classTarget_JScript.prototype.acGatherICO_php_base = function()
{
	 //////////////////////////
	// 
	g_vec_scrInputName[g_idx_vec_scrInputName] = "ac_takeMeasurementINTV1";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "ag_GenerateName";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "g_X";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "g_Y";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "g_Z";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.cos";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrControlType++;
	
	g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.sin";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrControlType++;
	
	g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.sqrt";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrControlType++;

	g_vec_scrControlName[g_idx_vec_scrControlName] = "if(";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_CONDITIONAL;
	g_idx_vec_scrControlType++;
	
	g_vec_scrOutputName[g_idx_vec_scrOutputName] = "";
	g_idx_vec_scrOutputName++;
	
	g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrOutputType++;
	
	g_vec_scrOutputName[g_idx_vec_scrOutputName] = "playSound";
	g_idx_vec_scrOutputName++;
	
	g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrOutputType++;
}

classTarget_JScript.prototype.acGatherICO_php_base = function()
{
	 //////////////////////////
	// 
	g_vec_scrInputName[g_idx_vec_scrInputName] = "ac_takeMeasurementINTV1";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "ag_GenerateName";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "g_X";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "g_Y";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrInputName[g_idx_vec_scrInputName] = "g_Z";
	g_idx_vec_scrInputName++;
	
	g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
	g_idx_vec_scrInputType++;
	
	g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.cos";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrControlType++;
	
	g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.sin";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrControlType++;
	
	g_vec_scrControlName[g_idx_vec_scrControlName] = "Math.sqrt";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrControlType++;

	g_vec_scrControlName[g_idx_vec_scrControlName] = "if(";
	g_idx_vec_scrControlName++;
	
	g_vec_scrControlType[g_idx_vec_scrControlType] = INSTA_TYPE_CONDITIONAL;
	g_idx_vec_scrControlType++;
	
	g_vec_scrOutputName[g_idx_vec_scrOutputName] = "$output +=";
	g_idx_vec_scrOutputName++;
	
	g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_VAR_CALL;
	g_idx_vec_scrOutputType++;
	
	g_vec_scrOutputName[g_idx_vec_scrOutputName] = "write(";
	g_idx_vec_scrOutputName++;
	
	g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_VAR_CALL;
	g_idx_vec_scrOutputType++;
	
	g_vec_scrOutputName[g_idx_vec_scrOutputName] = "playSound";
	g_idx_vec_scrOutputName++;
	
	g_vec_scrOutputType[g_idx_vec_scrOutputType] = INSTA_TYPE_FUNC_CALL;
	g_idx_vec_scrOutputType++;
}

classTarget_JScript.prototype.acGen_SuperName = function(f_GeoName)
{
	this.m_vec_Name[this.m_idx_vec_Name] = "wwb_" + f_GeoName;
	this.m_idx_vec_Name++;
}

function classFactor()
{
	this.m_Use = 0;
}

classTarget_JScript.prototype.acResetFactor = function(f_Type)
{
	this.m_Factor[f_Type].m_Use = 0;
}

classTarget_JScript.prototype.acDecFactor = function(f_Type)
{
	this.m_Factor[f_Type].m_Use--;
}

classTarget_JScript.prototype.acResetFactors = function(f_Type)
{
	for(var f_XY = 0; f_XY < INSTA_TYPE_COUNT; f_XY++)
		{
		this.m_Factor[f_XY].m_Use = 0;
		}
}

classTarget_JScript.prototype.acResetLine = function()
{
	this.m_Factor[INSTA_TYPE_VAR_DEF].m_Use = 0;
	this.m_Factor[INSTA_TYPE_VAR_CALL].m_Use = 0;
	this.m_Factor[INSTA_TYPE_FUNC_DEF].m_Use = 0;
	this.m_Factor[INSTA_TYPE_FUNC_CALL].m_Use 
	this.m_Factor[INSTA_TYPE_LOOP_DEF].m_Use = 0;
	this.m_Factor[INSTA_TYPE_CONDITIONAL].m_Use = 0;
	this.m_Factor[INSTA_TYPE_DATA].m_Use = 0;
	this.m_Factor[INSTA_TYPE_LM_OPER_EQUALS].m_Use = 0;
	this.m_LastType = -5;
	this.m_LastTypeII = -5;
	this.m_LastTypeIII = -5;
}

classTarget_JScript.prototype.acFactorise = function(f_Answer, f_AboveLine, f_ProbabilityExt, f_Element)
{
	var f_Finger = this.ac_takeMeasurementINTV1(f_Element, 1, f_ProbabilityExt, 0, 3, 3);

	if(f_Finger >= f_AboveLine)
		{
		return f_Answer;
		}
	else
		{
		if(f_Answer == true)
			{
			return false;
			}
		else
			{
			return true;
			}
		}
}

classTarget_JScript.prototype.acFactorStrength = function(f_Type, f_Function, f_Element)
{
	this.m_LastTypeII = this.m_LastType;
	this.m_LastTypeIII = this.m_LastTypeII;
	
	if(f_Type == INSTA_TYPE_VAR_DEF)
		{
		if(this.m_Factor[INSTA_TYPE_VAR_DEF].m_Use > 0)
			{
			return false;
			}
		
		if(this.m_Factor[INSTA_TYPE_FUNC_CALL].m_Use > 0)
			{
			return false;
			}
			
		if(this.m_Factor[INSTA_TYPE_VAR_CALL].m_Use > 0)
			{
			return false;
			}
			
		if(this.m_Factor[INSTA_TYPE_CONDITIONAL].m_Use > 0)
			{
			return false;
			}
			
		if(this.m_Factor[INSTA_TYPE_LOOP_DEF].m_Use > 0)
			{
			return false;
			}
			
		if(this.m_Factor[INSTA_TYPE_DATA].m_Use > 0)
			{
			return false;
			}
			
		if(this.m_Factor[INSTA_TYPE_FUNC_DEF].m_Use > 0)
			{
			return false;
			}
		
		this.m_LastType = f_Type;
		this.m_Factor[f_Type].m_Use++;
		return true;
		}
	else if(f_Type == INSTA_TYPE_VAR_CALL)
		{
		if(this.m_LastType == INSTA_TYPE_VAR_CALL)
			{
			return false;
			}
			
		if(this.m_LastType == INSTA_TYPE_DATA)
			{
			return false;
			}
			
		this.m_LastType = f_Type;
		this.m_Factor[f_Type].m_Use++;
		return true;
		}
	else if(f_Type == INSTA_TYPE_FUNC_DEF)
		{
		var f_Found = false;
		for(var f_XY = 0; f_XY < this.m_idx_vec_Function; f_XY++)
			{
			for(var f_helly = 0; f_helly < this.m_vec_Function[f_XY].m_idx_vec_Insta; f_helly++)
				{
				var f_searchInsta = this.m_vec_Function[f_XY].m_vec_Insta[f_helly];
				
				if(f_searchInsta.m_Type == INSTA_TYPE_FUNC_DEF)
					{
					f_Found = true;
					}
				}
			}
			
		for(var f_helly = 0; f_helly < f_Function.m_idx_vec_Insta; f_helly++)
			{
			var f_searchInsta = f_Function.m_vec_Insta[f_helly];
			
			if(f_searchInsta.m_Type == INSTA_TYPE_FUNC_DEF)
				{
				f_Found = true;
				}
			}
		
		if(f_Found == true)
			{
			return false;
			}
		else
			{
			var f_Bool = this.acFactorise(true, 4, 5, f_Element);
			
			if(f_Bool == true)
				{
				this.m_LastType = f_Type;
				this.m_Factor[f_Type].m_Use++;
				return true;
				}
			else
				{
				return false;
				}
			}
		}
	else if(f_Type == INSTA_TYPE_FUNC_CALL)
		{
		var f_Bool = this.acFactorise(true, 5, 6, f_Element);
			
		if(f_Bool == true)
			{
			this.m_LastType = f_Type;
			this.m_Factor[f_Type].m_Use++;
			return true;
			}
		else
			{
			return false;
			}
		}
	else if(f_Type == INSTA_TYPE_CONDITIONAL)
		{
		if(this.m_LastType == INSTA_TYPE_CONDITIONAL)
		    {
		    return false;
		    }
		
		if(this.m_LastType == INSTA_TYPE_VAR_DEF)
		    {
		    return false;
		    }
		
		if(this.m_LastType == INSTA_TYPE_FUNC_DEF)
		    {
		    return false;
		    }
		
		if(this.m_LastType == INSTA_TYPE_FUNC_CALL)
		    {
		    return false;
		    }
		
		if(this.m_LastType == INSTA_TYPE_LOOP_DEF)
		    {
		    return false;
		    }
			
		if(this.m_LastType != -5)
			{
		    return false;
		    }
		
		this.m_LastType = f_Type;
		this.m_Factor[f_Type].m_Use++;
		return true;
		}
	else if(f_Type == INSTA_TYPE_LOOP_DEF)
		{
		if(this.m_LastType != -5)
		    {
		    return false;
		    }
			
		var f_Bool = this.acFactorise(true, 9, 10, f_Element);
			
		if(f_Bool == true)
			{
			this.m_LastType = f_Type;
			this.m_Factor[f_Type].m_Use++;
			return true;
			}
		else
			{
			return false;
			}
		}
	else if(f_Type == INSTA_TYPE_DATA)
		{
		if(this.m_LastType == -5)
		    {
			return false;
			}
			
		if(this.m_LastType == INSTA_TYPE_VAR_DEF)
		    {
			return false;
		    }
			
		if(this.m_LastType == INSTA_TYPE_FUNC_DEF)
		    {
			return false;
		    }
			
		if(this.m_LastType == INSTA_TYPE_CONDITIONAL)
		    {
			return false;
		    }
			
		if(this.m_LastType == INSTA_TYPE_LOOP_DEF)
		    {
			return false;
		    }
			
		if(this.m_LastType == INSTA_TYPE_VAR_CALL)
			{
			return false;
			}
			
		if(this.m_LastType == INSTA_TYPE_DATA)
			{
			return false;
			}
			
		this.m_LastType = f_Type;
		this.m_Factor[f_Type].m_Use++;
		return true;
		}
		
	return true;
}

function classCountLock(f_Count, f_StringC, f_Type)
{
	this.m_Count = f_Count;
	this.m_String = f_StringC;
	this.m_Factor = f_Type;
}

classTarget_JScript.prototype.acFromHesh = function(f_Hesh, f_Target)
{
	for(var f_Count = 0; f_Count < f_Hesh.m_idx_vec_Cube; f_Count++)
		{
		var f_Element = new classElement();
		f_Element.acFromBicycle(f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Count]].m_Link);
		
		this.m_Collection.m_vec_Element[this.m_Collection.m_idx_vec_Element] = f_Element;
		this.m_Collection.m_idx_vec_Element++;
		}
		
	this.m_SchemaTop = 0;
	this.m_SchemaRef[0].m_X = 0.120;
	this.m_SchemaRef[0].m_Y = 0.70;
	this.m_SchemaRef[0].m_Z = 0.95;
	this.m_SchemaRef[1].m_X = 0.120;
	this.m_SchemaRef[1].m_Y = 0.70;
	this.m_SchemaRef[1].m_Z = 0.95;
	this.m_SchemaRef[2].m_X = 0.120;
	this.m_SchemaRef[2].m_Y = 0.70;
	this.m_SchemaRef[2].m_Z = 0.95;
	this.m_SchemaRef[3].m_X = 0.120;
	this.m_SchemaRef[3].m_Y = 0.70;
	this.m_SchemaRef[3].m_Z = 0.95;
	this.m_SchemaRef[4].m_X = 0.120;
	this.m_SchemaRef[4].m_Y = 0.70;
	this.m_SchemaRef[4].m_Z = 0.95;
	this.m_SchemaRef[5].m_X = 0.120;
	this.m_SchemaRef[5].m_Y = 0.70;
	this.m_SchemaRef[5].m_Z = 0.95;
	this.m_SchemaRef[6].m_X = 0.120;
	this.m_SchemaRef[6].m_Y = 0.70;
	this.m_SchemaRef[6].m_Z = 0.95;
	this.m_SchemaRef[7].m_X = 0.120;
	this.m_SchemaRef[7].m_Y = 0.70;
	this.m_SchemaRef[7].m_Z = 0.95;
	this.m_SchemaRef[8].m_X = 0.120;
	this.m_SchemaRef[8].m_Y = 0.70;
	this.m_SchemaRef[8].m_Z = 0.95;
	this.m_SchemaRef[9].m_X = 0.120;
	this.m_SchemaRef[9].m_Y = 0.70;
	this.m_SchemaRef[9].m_Z = 0.95;
	this.m_SchemaRef[10].m_X = 0.120;
	this.m_SchemaRef[10].m_Y = 0.70;
	this.m_SchemaRef[10].m_Z = 0.95;
	this.m_SchemaRef[11].m_X = 0.120;
	this.m_SchemaRef[11].m_Y = 0.70;
	this.m_SchemaRef[11].m_Z = 0.95;
	this.m_SchemaRef[12].m_X = 0.120;
	this.m_SchemaRef[12].m_Y = 0.70;
	this.m_SchemaRef[12].m_Z = 0.95;
	this.m_SchemaRef[13].m_X = 0.120;
	this.m_SchemaRef[13].m_Y = 0.70;
	this.m_SchemaRef[13].m_Z = 0.95;
	this.m_SchemaRef[14].m_X = 0.120;
	this.m_SchemaRef[14].m_Y = 0.70;
	this.m_SchemaRef[14].m_Z = 0.95;
	this.m_SchemaRef[15].m_X = 0.120;
	this.m_SchemaRef[15].m_Y = 0.70;
	this.m_SchemaRef[15].m_Z = 0.95;
	this.m_SchemaRef[16].m_X = 0.120;
	this.m_SchemaRef[16].m_Y = 0.70;
	this.m_SchemaRef[16].m_Z = 0.95;
	this.m_SchemaRef[17].m_X = 0.120;
	this.m_SchemaRef[17].m_Y = 0.70;
	this.m_SchemaRef[17].m_Z = 0.95;
	g_SchemaSize = 3;
	
	var f_Element = this.m_Collection.m_vec_Element[0];
	
	var f_FunctionCount = this.ac_takeMeasurementINTV1(f_Element, 1, 3, 0, 3, 1);

	for(var f_jet = 0; f_jet < f_FunctionCount; f_jet++)
		{
		var f_FunctionType = this.ac_takeMeasurementINTV1(f_Element, 1, 3, 0, 3, 2);
		var f_ArgumentCount = this.ac_takeMeasurementINTV1(f_Element, 0, 6, 2, 3, 3);
		var f_InstaCountMap = this.ac_takeMeasurementINTV1(f_Element, 1, 500, 20, 3, 4);
		this.m_InstaCountMap = f_InstaCountMap;
		
		var f_vec_CodeLineStorage = [];
		var f_idx_vec_CodeLineStorage = 0;
		var f_vec_CodeLine = [];
		var f_idx_vec_CodeLine = 0;

		var f_Function = new classFunction();
		f_Function.m_Type = f_FunctionType;
		f_Function.m_Name = ag_GenerateName(this.ac_takeMeasurement(f_Element));
		
		var f_StringA = "function " + f_Function.m_Name + "(";
		var f_Insta = new classInsta(f_StringA, INSTA_TYPE_FUNC_DEF);

		f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta] = f_Insta;
		f_Function.m_idx_vec_Insta++;
		
		for(var f_Int = 0; f_Int < f_ArgumentCount; f_Int++)
			{
			if(f_Int > 0)
				{
				f_StringA += ", ";
				}
				
			var f_VarNameA = this.acMakeUnison(f_Target, ag_GenerateName(this.ac_takeMeasurement(f_Element)), 1, INSTA_TYPE_VAR_DEF, f_Element, f_Function.m_idx_vec_Insta, this.m_idx_vec_Function);
			var f_Insta = new classInsta(f_VarNameA, INSTA_TYPE_VAR_DEF);

			f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta] = f_Insta;
			f_Function.m_idx_vec_Insta++;
			
			f_StringA += f_VarNameA;
			}

		f_Function.m_vec_String += f_StringA;
		
		f_Function.m_vec_String += ")\n	{\n";
		
		this.acResetLine();
		
		this.m_idx_vec_CountLock = 0;
		
		this.m_vec_CountLock[this.m_idx_vec_CountLock] = new classCountLock(f_InstaCountMap, "\n}//endfunc " + f_Function.m_Name + "\n", INSTA_TYPE_FUNC_DEF);
		this.m_idx_vec_CountLock++;

		var f_ElementID = 0;
		
		while(this.m_InstaCountMap > 0)
			{
			f_Element = this.m_Collection.m_vec_Element[f_ElementID];
			
			f_ElementID++;
			
			if(f_ElementID >= this.m_Collection.m_idx_vec_Element)
				{
				f_ElementID = 0;
				}
				
			var f_Contact = false;
				
			var f_InstaType = this.ac_takeMeasurementINTV1(f_Element, 0, INSTA_TYPE_COUNT, 2, 3, 6);

			if(f_InstaType == INSTA_TYPE_VAR_DEF)
				{
				if(this.acFactorStrength(INSTA_TYPE_VAR_DEF, f_Function, f_Element) == true)
					{
					 //////////
					// space
					if(this.m_LastTypeII == -5)
						{
						for(var f_cv2 = 0; f_cv2 < this.m_idx_vec_CountLock; f_cv2++)
							{
							if(this.m_vec_CountLock[f_cv2].m_String.search("}") != -1)
								{
								f_Function.m_vec_String += "	";
								}
							}
						}
						
					var f_Name = this.acMakeUnison(f_Target, ag_GenerateName(this.ac_takeMeasurement(f_Element)), 1, INSTA_TYPE_VAR_DEF, f_Element, f_Function.m_idx_vec_Insta, this.m_idx_vec_Function);
					var f_StringB = "var " + f_Name + " = ";
					var f_Insta = new classInsta(f_StringB, INSTA_TYPE_VAR_DEF);

					f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta] = f_Insta;
					f_Function.m_idx_vec_Insta++;

					f_Function.m_vec_String += f_StringB;
					this.m_InstaCountMap--;
					
					//var f_InstaCount = this.ac_takeMeasurementINTV1(f_Element, 1, 4, 3, 3, 6);
					
					//this.m_vec_CountLock[this.m_idx_vec_CountLock] = new classCountLock(f_InstaCount, ";\n", INSTA_TYPE_VAR_DEF);
					//this.m_idx_vec_CountLock++;
					f_Contact = true;
					}
				}
			else if(f_InstaType == INSTA_TYPE_VAR_CALL)
				{
				if(this.acFactorStrength(INSTA_TYPE_VAR_CALL, f_Function, f_Element) == true)
					{
					 //////////
					// space
					if(this.m_LastTypeII == -5)
						{
						for(var f_cv2 = 0; f_cv2 < this.m_idx_vec_CountLock; f_cv2++)
							{
							if(this.m_vec_CountLock[f_cv2].m_String.search("}") != -1)
								{
								f_Function.m_vec_String += "	";
								}
							}
						}
						
					 ///////////////////
					// preleah
					if(this.m_Factor[INSTA_TYPE_FUNC_DEF].m_Use >= 1)
						{
						if(this.m_LastTypeII == INSTA_TYPE_VAR_CALL)
							{
							f_Function.m_vec_String += ", ";
							}
							
						if(this.m_LastTypeII == INSTA_TYPE_DATA)
							{
							f_Function.m_vec_String += ", ";
							}
						}
					else if(this.m_Factor[INSTA_TYPE_CONDITIONAL].m_Use >= 1)
						{
						if(this.m_LastTypeII == INSTA_TYPE_VAR_CALL)
							{
							var f_fingerCount = this.ac_takeMeasurementINTV1(f_Element, 0, 6, 1, 3, 2);
								
							if(f_fingerCount <= 1)
								{
								f_Function.m_vec_String += " == ";
								}
							else if(f_fingerCount == 2)
								{
								f_Function.m_vec_String += " >= ";
								}
							else if(f_fingerCount == 3)
								{
								f_Function.m_vec_String += " <= ";
								}
							else if(f_fingerCount == 4)
								{
								f_Function.m_vec_String += " > ";
								}
							else if(f_fingerCount >= 5)
								{
								f_Function.m_vec_String += " < ";
								}
							}
						else
							{
							if(this.m_Factor[INSTA_TYPE_FUNC_CALL].m_Use >= 1)
								{
								if(this.m_LastTypeII == INSTA_TYPE_VAR_CALL)
									{
									f_Function.m_vec_String += ", ";
									}

								if(this.m_LastTypeII == INSTA_TYPE_DATA)
									{
									f_Function.m_vec_String += ", ";
									}
								}
							}
						}
					else if(this.m_Factor[INSTA_TYPE_FUNC_CALL].m_Use >= 1)
						{
						if(this.m_LastTypeII == INSTA_TYPE_VAR_CALL)
							{
							f_Function.m_vec_String += ", ";
							}

						if(this.m_LastTypeII == INSTA_TYPE_DATA)
							{
							f_Function.m_vec_String += ", ";
							}
						}
					else
					    {
						if(this.m_Factor[INSTA_TYPE_LM_OPER_EQUALS].m_Use == 0)
						    {
							if(this.m_LastTypeII == INSTA_TYPE_VAR_CALL)
								{
								var f_fingerCount = this.ac_takeMeasurementINTV1(f_Element, 0, 6, 0, 3, 1);
								
								this.m_Factor[INSTA_TYPE_LM_OPER_EQUALS].m_Use++;
								
								if(f_fingerCount <= 1)
									{
									f_Function.m_vec_String += " = ";
									}
								else if(f_fingerCount == 2)
									{
									f_Function.m_vec_String += " -= ";
									}
								else if(f_fingerCount == 3)
									{
									f_Function.m_vec_String += " *= ";
									}
								else if(f_fingerCount == 4)
									{
									f_Function.m_vec_String += " /= ";
									}
								else if(f_fingerCount >= 5)
									{
									f_Function.m_vec_String += " += ";
									}
								}
							}
						else
							{
							if(this.m_LastTypeII == INSTA_TYPE_VAR_CALL)
								{
								if(this.m_Factor[INSTA_TYPE_LM_OPER_EQUALS].m_Use == 0)
									{
									var f_fingerCount = this.ac_takeMeasurementINTV1(f_Element, 0, 6, 0, 3, 1);
									
									this.m_Factor[INSTA_TYPE_LM_OPER_EQUALS].m_Use++;
									
									if(f_fingerCount <= 1)
										{
										f_Function.m_vec_String += " = ";
										}
									else if(f_fingerCount == 2)
										{
										f_Function.m_vec_String += " -= ";
										}
									else if(f_fingerCount == 3)
										{
										f_Function.m_vec_String += " *= ";
										}
									else if(f_fingerCount == 4)
										{
										f_Function.m_vec_String += " /= ";
										}
									else if(f_fingerCount >= 5)
										{
										f_Function.m_vec_String += " += ";
										}
									}
								else
									{
									var f_fingerCount = this.ac_takeMeasurementINTV1(f_Element, 0, 5, 0, 3, 2);
									
									if(f_fingerCount <= 1)
										{
										f_Function.m_vec_String += " - ";
										}
									else if(f_fingerCount == 2)
										{
										f_Function.m_vec_String += " * ";
										}
									else if(f_fingerCount == 3)
										{
										f_Function.m_vec_String += " / ";
										}
									else if(f_fingerCount >= 4)
										{
										f_Function.m_vec_String += " + ";
										}
									}
								}
							}
						}
						
					var f_Name = this.acMakeUnison(f_Target, ag_GenerateName(this.ac_takeMeasurement(f_Element)), 1, INSTA_TYPE_VAR_CALL, f_Element, f_Function.m_idx_vec_Insta, this.m_idx_vec_Function);
					var f_StringB = f_Name;
					var f_Insta = new classInsta(f_StringB, INSTA_TYPE_VAR_CALL);

					f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta] = f_Insta;
					f_Function.m_idx_vec_Insta++;

					f_Function.m_vec_String += f_StringB;
					this.m_InstaCountMap--;
					f_Contact = true;
					}
				}
			else if(f_InstaType == INSTA_TYPE_CONDITIONAL)
				{
				if(this.acFactorStrength(INSTA_TYPE_CONDITIONAL, f_Function, f_Element) == true)
					{
					 //////////
					// space
					if(this.m_LastTypeII == -5)
						{
						for(var f_cv2 = 0; f_cv2 < this.m_idx_vec_CountLock; f_cv2++)
							{
							if(this.m_vec_CountLock[f_cv2].m_String.search("}") != -1)
								{
								f_Function.m_vec_String += "	";
								}
							}
						}
						
					var f_StringB = "if(";
					var f_Insta = new classInsta(f_StringB, INSTA_TYPE_CONDITIONAL);

					f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta] = f_Insta;
					f_Function.m_idx_vec_Insta++;

					f_Function.m_vec_String += f_StringB;
					this.m_InstaCountMap--;
					
					var f_InstaCount = 2 + this.ac_takeMeasurementINTV1(f_Element, 1, 3, 0, 3, 5);
					
					var f_conInstaCount = [];
					f_conInstaCount[0] = 3 + this.ac_takeMeasurementINTV1(f_Element, 0, 2, 0, 3, 4);
					f_conInstaCount[1] = 3 + this.ac_takeMeasurementINTV1(f_Element, 1, 12, 0, 3, 5);
					f_conInstaCount[2] = 3 + this.ac_takeMeasurementINTV1(f_Element, 2, 25, 4, 3, 6);
					var f_Select = this.ac_takeMeasurementINTV1(f_Element, 0, 3, 1, 3, 3);
					
					this.m_vec_CountLock[this.m_idx_vec_CountLock] = new classCountLock(f_conInstaCount[f_Select], "\n}\n", INSTA_TYPE_CONDITIONAL);
					this.m_idx_vec_CountLock++;
					
					this.m_vec_CountLock[this.m_idx_vec_CountLock] = new classCountLock(f_InstaCount, ")\n	{", INSTA_TYPE_CONDITIONAL);
					this.m_idx_vec_CountLock++;
					f_Contact = true;
					}
				}
			else if(f_InstaType == INSTA_TYPE_LOOP_DEF)
				{
				if(this.acFactorStrength(INSTA_TYPE_LOOP_DEF, f_Function, f_Element) == true)
					{
					 //////////
					// space
					if(this.m_LastTypeII == -5)
						{
						for(var f_cv2 = 0; f_cv2 < this.m_idx_vec_CountLock; f_cv2++)
							{
							if(this.m_vec_CountLock[f_cv2].m_String.search("}") != -1)
								{
								f_Function.m_vec_String += "	";
								}
							}
						}
						
					var f_Name = this.acMakeUnison(f_Target, ag_GenerateName(this.ac_takeMeasurement(f_Element)), 1, INSTA_TYPE_VAR_DEF, f_Element, f_Function.m_idx_vec_Insta, this.m_idx_vec_Function);
					var f_forVarName = ag_GenerateName(this.ac_takeMeasurement(f_Element));
					var f_Str = "for(var " + f_forVarName + " = 0; " + f_forVarName + " < " + f_Name + "; " + f_forVarName + "++)\n	{\n 	";
					var f_Insta = new classInsta(f_Str, INSTA_TYPE_LOOP_DEF);

					f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta] = f_Insta;
					f_Function.m_idx_vec_Insta++;
					
					f_Function.m_vec_String += f_Str;
					this.m_InstaCountMap--;
					
					var f_loopInstaCount = this.ac_takeMeasurementINTV1(f_Element, 8, 105, 8, 3, 1);
					
					this.m_vec_CountLock[this.m_idx_vec_CountLock] = new classCountLock(f_loopInstaCount, "\n}\n", INSTA_TYPE_LOOP_DEF);
					this.m_idx_vec_CountLock++;
					f_Contact = true;
					}
				}
			else if(f_InstaType == INSTA_TYPE_FUNC_CALL)
				{
				if(this.acFactorStrength(INSTA_TYPE_FUNC_CALL, f_Function, f_Element) == true)
					{
					 //////////
					// space
					if(this.m_LastTypeII == -5)
						{
						for(var f_cv2 = 0; f_cv2 < this.m_idx_vec_CountLock; f_cv2++)
							{
							if(this.m_vec_CountLock[f_cv2].m_String.search("}") != -1)
								{
								f_Function.m_vec_String += "	";
								}
							}
						}
						
					 ///////////////////
					// preleah
					if(this.m_Factor[INSTA_TYPE_FUNC_DEF].m_Use >= 1)
						{
						if(this.m_LastTypeII == INSTA_TYPE_VAR_CALL)
							{
							f_Function.m_vec_String += ", ";
							}
							
						if(this.m_LastTypeII == INSTA_TYPE_DATA)
							{
							f_Function.m_vec_String += ", ";
							}
						}
					else if(this.m_Factor[INSTA_TYPE_CONDITIONAL].m_Use >= 1)
						{
						if(this.m_LastTypeII == INSTA_TYPE_VAR_CALL)
							{
							var f_fingerCount = this.ac_takeMeasurementINTV1(f_Element, 0, 6, 1, 3, 2);
								
							if(f_fingerCount <= 1)
								{
								f_Function.m_vec_String += " == ";
								}
							else if(f_fingerCount == 2)
								{
								f_Function.m_vec_String += " >= ";
								}
							else if(f_fingerCount == 3)
								{
								f_Function.m_vec_String += " <= ";
								}
							else if(f_fingerCount == 4)
								{
								f_Function.m_vec_String += " > ";
								}
							else if(f_fingerCount >= 5)
								{
								f_Function.m_vec_String += " < ";
								}
							}
						else
							{
							if(this.m_Factor[INSTA_TYPE_FUNC_CALL].m_Use >= 1)
								{
								if(this.m_LastTypeII == INSTA_TYPE_VAR_CALL)
									{
									f_Function.m_vec_String += ", ";
									}

								if(this.m_LastTypeII == INSTA_TYPE_DATA)
									{
									f_Function.m_vec_String += ", ";
									}
								}
							}
						}
					else if(this.m_Factor[INSTA_TYPE_FUNC_CALL].m_Use >= 2)
						{
						if(this.m_LastTypeII == INSTA_TYPE_VAR_CALL)
							{
							f_Function.m_vec_String += ", ";
							}

						if(this.m_LastTypeII == INSTA_TYPE_DATA)
							{
							f_Function.m_vec_String += ", ";
							}
						}
					else
					    {
						if(this.m_Factor[INSTA_TYPE_LM_OPER_EQUALS].m_Use == 0)
						    {
							if(this.m_LastTypeII == INSTA_TYPE_VAR_CALL)
								{
								var f_fingerCount = this.ac_takeMeasurementINTV1(f_Element, 0, 6, 0, 3, 1);
								
								this.m_Factor[INSTA_TYPE_LM_OPER_EQUALS].m_Use++;
								
								if(f_fingerCount <= 1)
									{
									f_Function.m_vec_String += " = ";
									}
								else if(f_fingerCount == 2)
									{
									f_Function.m_vec_String += " -= ";
									}
								else if(f_fingerCount == 3)
									{
									f_Function.m_vec_String += " *= ";
									}
								else if(f_fingerCount == 4)
									{
									f_Function.m_vec_String += " /= ";
									}
								else if(f_fingerCount >= 5)
									{
									f_Function.m_vec_String += " += ";
									}
								}
							}
						else
							{
							if(this.m_LastTypeII == INSTA_TYPE_VAR_CALL)
								{
								if(this.m_Factor[INSTA_TYPE_LM_OPER_EQUALS].m_Use == 0)
									{
									var f_fingerCount = this.ac_takeMeasurementINTV1(f_Element, 0, 6, 0, 3, 1);
									
									this.m_Factor[INSTA_TYPE_LM_OPER_EQUALS].m_Use++;
									
									if(f_fingerCount <= 1)
										{
										f_Function.m_vec_String += " = ";
										}
									else if(f_fingerCount == 2)
										{
										f_Function.m_vec_String += " -= ";
										}
									else if(f_fingerCount == 3)
										{
										f_Function.m_vec_String += " *= ";
										}
									else if(f_fingerCount == 4)
										{
										f_Function.m_vec_String += " /= ";
										}
									else if(f_fingerCount >= 5)
										{
										f_Function.m_vec_String += " += ";
										}
									}
								else
									{
									var f_fingerCount = this.ac_takeMeasurementINTV1(f_Element, 0, 5, 0, 3, 2);
									
									if(f_fingerCount <= 1)
										{
										f_Function.m_vec_String += " - ";
										}
									else if(f_fingerCount == 2)
										{
										f_Function.m_vec_String += " * ";
										}
									else if(f_fingerCount == 3)
										{
										f_Function.m_vec_String += " / ";
										}
									else if(f_fingerCount >= 4)
										{
										f_Function.m_vec_String += " + ";
										}
									}
								}
							}
						}
						
					//target restriction point
					var f_FunctionName = this.acMakeUnison(f_Target, ag_GenerateName(this.ac_takeMeasurement(f_Element)), 1, INSTA_TYPE_FUNC_CALL, f_Element, f_Function.m_idx_vec_Insta, this.m_idx_vec_Function);
					var f_StringB = f_FunctionName + "(";
					
					var f_Insta = new classInsta(f_StringB, INSTA_TYPE_FUNC_CALL);
							
					f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta] = f_Insta;
					f_Function.m_idx_vec_Insta++;
					
					f_Function.m_vec_String += f_StringB;
					this.m_InstaCountMap--;
					
					var f_arguInstaCount = this.ac_takeMeasurementINTV1(f_Element, 1, 3, 0, 3, 4);
					
					this.m_vec_CountLock[this.m_idx_vec_CountLock] = new classCountLock(f_arguInstaCount, ")", INSTA_TYPE_FUNC_CALL);
					this.m_idx_vec_CountLock++;
				    f_Contact = true;
					}
				}
			else if(f_InstaType == INSTA_TYPE_DATA)
				{
				if(this.acFactorStrength(INSTA_TYPE_DATA, f_Function, f_Element) == true)
					{
					 //////////
					// space
					if(this.m_LastTypeII == -5)
						{
						for(var f_cv2 = 0; f_cv2 < this.m_idx_vec_CountLock; f_cv2++)
							{
							if(this.m_vec_CountLock[f_cv2].m_String.search("}") != -1)
								{
								f_Function.m_vec_String += "	";
								}
							}
						}
						
					 ///////////////////
					// preleah
					if(this.m_Factor[INSTA_TYPE_FUNC_DEF].m_Use >= 1)
						{
						if(this.m_LastTypeII == INSTA_TYPE_VAR_CALL)
							{
							f_Function.m_vec_String += ", ";
							}
							
						if(this.m_LastTypeII == INSTA_TYPE_DATA)
							{
							f_Function.m_vec_String += ", ";
							}
						}
					else if(this.m_Factor[INSTA_TYPE_CONDITIONAL].m_Use >= 1)
						{
						if(this.m_LastTypeII == INSTA_TYPE_VAR_CALL)
							{
							var f_fingerCount = this.ac_takeMeasurementINTV1(f_Element, 0, 6, 1, 3, 2);
								
							if(f_fingerCount <= 1)
								{
								f_Function.m_vec_String += " == ";
								}
							else if(f_fingerCount == 2)
								{
								f_Function.m_vec_String += " >= ";
								}
							else if(f_fingerCount == 3)
								{
								f_Function.m_vec_String += " <= ";
								}
							else if(f_fingerCount == 4)
								{
								f_Function.m_vec_String += " > ";
								}
							else if(f_fingerCount >= 5)
								{
								f_Function.m_vec_String += " < ";
								}
							}
						else
							{
							if(this.m_Factor[INSTA_TYPE_FUNC_CALL].m_Use >= 1)
								{
								if(this.m_LastTypeII == INSTA_TYPE_VAR_CALL)
									{
									f_Function.m_vec_String += ", ";
									}

								if(this.m_LastTypeII == INSTA_TYPE_DATA)
									{
									f_Function.m_vec_String += ", ";
									}
								}
							}
						}
					else if(this.m_Factor[INSTA_TYPE_FUNC_CALL].m_Use >= 1)
						{
						if(this.m_LastTypeII == INSTA_TYPE_VAR_CALL)
							{
							f_Function.m_vec_String += ", ";
							}

						if(this.m_LastTypeII == INSTA_TYPE_DATA)
							{
							f_Function.m_vec_String += ", ";
							}
						}
					else
					    {
						if(this.m_Factor[INSTA_TYPE_LM_OPER_EQUALS].m_Use == 0)
						    {
							if(this.m_LastTypeII == INSTA_TYPE_VAR_CALL)
								{
								var f_fingerCount = this.ac_takeMeasurementINTV1(f_Element, 0, 6, 0, 3, 1);
								
								this.m_Factor[INSTA_TYPE_LM_OPER_EQUALS].m_Use++;
								
								if(f_fingerCount <= 1)
									{
									f_Function.m_vec_String += " = ";
									}
								else if(f_fingerCount == 2)
									{
									f_Function.m_vec_String += " -= ";
									}
								else if(f_fingerCount == 3)
									{
									f_Function.m_vec_String += " *= ";
									}
								else if(f_fingerCount == 4)
									{
									f_Function.m_vec_String += " /= ";
									}
								else if(f_fingerCount >= 5)
									{
									f_Function.m_vec_String += " += ";
									}
								}
							}
						else
							{
							if(this.m_LastTypeII == INSTA_TYPE_VAR_CALL)
								{
								if(this.m_Factor[INSTA_TYPE_LM_OPER_EQUALS].m_Use == 0)
									{
									var f_fingerCount = this.ac_takeMeasurementINTV1(f_Element, 0, 6, 0, 3, 1);
									
									this.m_Factor[INSTA_TYPE_LM_OPER_EQUALS].m_Use++;
									
									if(f_fingerCount <= 1)
										{
										f_Function.m_vec_String += " = ";
										}
									else if(f_fingerCount == 2)
										{
										f_Function.m_vec_String += " -= ";
										}
									else if(f_fingerCount == 3)
										{
										f_Function.m_vec_String += " *= ";
										}
									else if(f_fingerCount == 4)
										{
										f_Function.m_vec_String += " /= ";
										}
									else if(f_fingerCount >= 5)
										{
										f_Function.m_vec_String += " += ";
										}
									}
								else
									{
									var f_fingerCount = this.ac_takeMeasurementINTV1(f_Element, 0, 5, 0, 3, 2);
									
									if(f_fingerCount <= 1)
										{
										f_Function.m_vec_String += " - ";
										}
									else if(f_fingerCount == 2)
										{
										f_Function.m_vec_String += " * ";
										}
									else if(f_fingerCount == 3)
										{
										f_Function.m_vec_String += " / ";
										}
									else if(f_fingerCount >= 4)
										{
										f_Function.m_vec_String += " + ";
										}
									}
								}
							}
						}

					//target restriction point
					var f_StringB = "";
					var f_Scale = 32;
					var f_VarType = this.ac_takeMeasurementINTV1(f_Element, 0, 3, 4, 3, 1);
					var f_VarSize = this.ac_takeMeasurementINTV1(f_Element, 1, f_Scale, 7, 3, 0);
					
					if(f_VarType == VAR_TYPE_INT)
						{
						f_StringB += this.ac_takeMeasurementINTV1(f_Element, 1, 10, 2, 3, 7) * f_VarSize;
						}
					else if(f_VarType >= VAR_TYPE_FLT)
						{
						f_StringB += parseFloat(this.ac_takeMeasurementINTV1(f_Element, 1, 10, 2, 3, 7)) * parseFloat(f_VarSize);
						}
					/*else if(f_VarType == VAR_TYPE_HEX)
						{
						for(var f_Flx = 0; f_Flx < f_VarSize; f_Flx++)
							{
							f_StringB += ag_GenerateName(this.ac_takeMeasurement(f_Element));
							}
						}
					else if(f_VarType == VAR_TYPE_BIN)
						{
						for(var f_Flx = 0; f_Flx < f_VarSize; f_Flx++)
							{
							f_StringB += ag_GenerateName(this.ac_takeMeasurement(f_Element));
							}
						}*/
					
					var f_Insta = new classInsta(f_StringB, INSTA_TYPE_DATA);
							
					f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta] = f_Insta;
					f_Function.m_idx_vec_Insta++;
					
					f_Function.m_vec_String += f_StringB;
					this.m_InstaCountMap--;
					f_Contact = true;
					}
				}
			else if(f_InstaType == INSTA_TYPE_FUNC_DEF)
				{
				/*if(this.acFactorStrength(INSTA_TYPE_FUNC_DEF, f_Function, f_Element) == true)
					{
					var f_Insta = new classInsta(f_StringB, INSTA_TYPE_FUNC_DEF);
							
					f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta] = f_Insta;
					f_Function.m_idx_vec_Insta++;
					
					f_Function.m_vec_String += f_StringB;
					this.m_InstaCountMap--;
					}*/
				}
				
			  ///////////////////
			 //
			// Count Map
			if(f_Contact == true)
				{
				f_vec_CodeLine[f_idx_vec_CodeLine] = f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta - 1];
				f_idx_vec_CodeLine++;
					
				if(this.m_idx_vec_CountLock > 0)
					{
					for(var f_cv = this.m_idx_vec_CountLock - 1; f_cv >= 0; f_cv--)
					     {
					     var f_Caramel = f_cv;

					     this.m_vec_CountLock[f_Caramel].m_Count--;
					
					     if(this.m_vec_CountLock[f_Caramel].m_Count <= 0)
							{
							var f_on = true;

							if(f_Caramel < (this.m_idx_vec_CountLock - 1))
								{
								f_on = false;
								}
								
							if(f_on == true)
								{
								var f_Lock = this.m_vec_CountLock[f_Caramel];

								f_Function.m_vec_String += f_Lock.m_String;

								if(f_Lock.m_String.search("\n") != -1)
									{
									this.acResetLine();
									f_vec_CodeLineStorage[f_idx_vec_CodeLineStorage] = f_vec_CodeLine;
									f_idx_vec_CodeLineStorage++;
									f_idx_vec_CodeLine = 0;
									}

								this.acDecFactor(f_Lock.m_Factor);

								this.m_idx_vec_CountLock--;
								
								for(var f_XY = f_Caramel; f_XY < this.m_idx_vec_CountLock; f_XY++)
									{
									this.m_vec_CountLock[f_XY] = this.m_vec_CountLock[f_XY + 1];
									}
								
								if(f_Lock.m_String == ")")
									{
									var f_ont = true;
									
									for(var f_cv1 = 0; f_cv1 < this.m_idx_vec_CountLock; f_cv1++)
										{
										for(var f_cv3 = 0; f_cv3 < this.m_vec_CountLock[f_cv1].m_String.length; f_cv3++)
											{
											if(this.m_vec_CountLock[f_cv1].m_String.charAt(f_cv3) == ')')
												{
												f_ont = false;
												}
											}
										}
										
									if(f_ont == true)
										{
										this.acResetLine();
										f_vec_CodeLineStorage[f_idx_vec_CodeLineStorage] = f_vec_CodeLine;
										f_idx_vec_CodeLineStorage++;
										f_idx_vec_CodeLine = 0;
										f_Function.m_vec_String += ";\n";
										}
									}
								}
							else
								{
								this.m_vec_CountLock[f_Caramel].m_Count = 1;
								}
							}
						}
					}
				}
			}

		this.m_String += f_Function.m_vec_String;
		
//#if 0
		//m_vec_Code.push_back(new Code(m_String));
		//m_CodeLine = new CodeLine(m_vec_Code);

		//CodeLine* f_CodeLine = NULL;
		//int f_Chk = 0;

		//f_CodeLine = new CodeLine(f_Line, m_Chk, m_System);

		//m_vec_CodeLine.push_back(f_CodeLine);
//#endif

		f_Function.m_vec_CodeLineStorage = f_vec_CodeLineStorage;
		f_Function.m_idx_vec_CodeLineStorage = f_idx_vec_CodeLineStorage;

		this.m_vec_Function[this.m_idx_vec_Function] = f_Function;
		this.m_idx_vec_Function++;
		}
		
	  ////////////////
	 //
	// The Producers
	/*for(var f_XY = 0; f_XY < this.m_idx_vec_Function; f_XY++)
		{
		var f_Function = this.m_vec_Function[f_XY];
		
		var f_Thing = new classThing(f_Function);
		
		f_Function.m_vec_Thing[f_Function.m_idx_vec_Thing] = f_Thing;
		f_Function.m_idx_vec_Thing++;
		}*/
		
	

//#if 1
	//g_hasha.init(); //reset hasher state
	//g_hasha.process(m_Data.begin(), m_Data.end());
	//g_hasha.finish();
	//picosha2::get_hash_hex_string(g_hasha, m_Hash);
//#endif
}

classTarget_JScript.prototype.acMergeUpper = function()
{
	/*for(var f_XY = 0; f_XY < this.m_CollectionScript.m_idx_vec_ElementScript; f_XY++)
		{
		//this.m_CollectionScript.m_vec_Element[this.m_CollectionScript.m_idx_vec_Element] = g_MasterTarget.m_CollectionScript.m_vec_Element[f_XY];
		//this.m_CollectionScript.m_idx_vec_Element++;
		//this.m_CollectionScript.m_vec_ElementScript[this.m_CollectionScript.m_idx_vec_ElementScript] = g_MasterTarget.m_CollectionScript.m_vec_ElementScript[f_XY];
		//this.m_CollectionScript.m_idx_vec_ElementScript++;
		}*/
	
	for(var f_Count = 0; f_Count < g_MasterTarget.m_idx_vec_Name; f_Count++)
		{
		this.m_vec_Name[this.m_idx_vec_Name] = g_MasterTarget.m_vec_Name[f_Count];
		this.m_idx_vec_Name++;
		}
}
			
classTarget_JScript.prototype.acMergeSave = function()
{
	/*for(var f_XY = 0; f_XY < this.m_CollectionScript.m_idx_vec_ElementScript; f_XY++)
		{
		g_MasterTarget.m_CollectionScript.m_vec_Element[g_MasterTarget.m_CollectionScript.m_idx_vec_Element] = this.m_CollectionScript.m_vec_Element[f_XY];
		g_MasterTarget.m_CollectionScript.m_idx_vec_Element++;
		//g_MasterTarget.m_CollectionScript.m_vec_ElementScript[g_MasterTarget.m_CollectionScript.m_idx_vec_ElementScript] = this.m_CollectionScript.m_vec_ElementScript[f_XY];
		//g_MasterTarget.m_CollectionScript.m_idx_vec_ElementScript++;
		}*/
		
	for(var f_CAP = 0; f_CAP < this.m_idx_vec_Name; f_CAP++)
		{
		g_MasterTarget.m_idx_vec_Name[g_MasterTarget.m_idx_vec_Name] = this.m_vec_Name[f_CAP];
		g_MasterTarget.m_idx_vec_Name++;
		}
		
	g_MasterTarget.m_String += this.m_String;
}

classTarget_JScript.prototype.acPsuecute = function(f_Insta, f_Function)
{
	if(f_Insta.m_Type == INSTA_TYPE_VAR)
		{
		var f_STR_clsName = this.m_vec_Name[0].m_vec_Name[0];
		
		for(var f_CountA = 0; f_CountA < this.m_idx_vec_Name; f_CountA++)
			{
			for(var f_CountB = 0; f_CountB < this.m_vec_Name[f_Count].m_idx_vec_Name; f_CountB++)
				{
				var f_clsName = this.m_vec_Name[f_Count].m_vec_Name[f_CountB];
				
				if((f_clsName.m_Name == f_Insta.m_String) && ((f_clsName.m_INSTA_Type == INSTA_TYPE_VAR_INT) || (f_clsName.m_INSTA_Type == INSTA_TYPE_VAR_INT_PNTR) || (f_clsName.m_INSTA_Type == INSTA_TYPE_VAR)))
					{
					if((f_clsName.m_index_Insta == f_index_Insta) && (f_clsName.m_index_Function == f_index_Function))
						{
						var f_VarInsta = this.m_CollectionScript.m_vec_ElementScript[f_clsName.m_index_ElementScript].m_vec_Insta[f_clsName.m_index_Insta];
						var f_Ins = this.m_CollectionScript.m_vec_ElementScript[f_STR_clsName.m_index_ElementScript].m_vec_Insta[f_STR_clsName.m_index_Insta];
						
						  //////////////////////////////
						 //
						// Recover Value of Variable
						f_VarInsta.m_Value = f_Ins.m_Value;
						
						  ///////////////////////////
						 //
						// Execute Next
						if((f_clsName.m_index_Insta + 1) < this.m_CollectionScript.m_vec_ElementScript[f_STR_clsName.m_index_ElementScript].m_idx_vec_Insta)
							{
							var f_NextIns = this.m_CollectionScript.m_vec_ElementScript[f_STR_clsName.m_index_ElementScript].m_vec_Insta[f_clsName.m_index_Insta + 1];
							var f_NextCom = this.m_CollectionScript.m_vec_ElementScript[f_STR_clsName.m_index_ElementScript].m_vec_Function[f_clsName.m_index_Function];
							
							this.acPsuecute(f_NextIns, f_NextCom);
							}
						}
						
					f_STR_clsName = f_clsName;
					}
				}
			}
		}
	else if(f_Insta.m_Type == INSTA_TYPE_VAR_INT)
		{
		var f_STR_clsName = this.m_vec_Name[0].m_vec_Name[0];
		
		for(var f_CountA = 0; f_CountA < this.m_idx_vec_Name; f_CountA++)
			{
			for(var f_CountB = 0; f_CountB < this.m_vec_Name[f_Count].m_idx_vec_Name; f_CountB++)
				{
				var f_clsName = this.m_vec_Name[f_Count].m_vec_Name[f_CountB];
				
				if((f_clsName.m_Name == f_Insta.m_String) && ((f_clsName.m_INSTA_Type == INSTA_TYPE_VAR_INT) || (f_clsName.m_INSTA_Type == INSTA_TYPE_VAR_INT_PNTR) || (f_clsName.m_INSTA_Type == INSTA_TYPE_VAR)))
					{
					if((f_clsName.m_index_Insta == f_index_Insta) && (f_clsName.m_index_Function == f_index_Function))
						{
						var f_VarInsta = this.m_CollectionScript.m_vec_ElementScript[f_clsName.m_index_ElementScript].m_vec_Insta[f_clsName.m_index_Insta];
						var f_Ins = this.m_CollectionScript.m_vec_ElementScript[f_STR_clsName.m_index_ElementScript].m_vec_Insta[f_STR_clsName.m_index_Insta];
						
						  //////////////////////////////
						 //
						// Recover Value of Variable
						f_VarInsta.m_Value = f_Ins.m_Value;
						
						  ///////////////////////////
						 //
						// Execute Next
						if((f_clsName.m_index_Insta + 1) < this.m_CollectionScript.m_vec_ElementScript[f_STR_clsName.m_index_ElementScript].m_idx_vec_Insta)
							{
							var f_NextIns = this.m_CollectionScript.m_vec_ElementScript[f_STR_clsName.m_index_ElementScript].m_vec_Insta[f_clsName.m_index_Insta + 1];
							var f_NextCom = this.m_CollectionScript.m_vec_ElementScript[f_STR_clsName.m_index_ElementScript].m_vec_Function[f_clsName.m_index_Function];
							
							this.acPsuecute(f_NextIns, f_NextCom);
							}
						}
						
					f_STR_clsName = f_clsName;
					}
				}
			}
		}
	else if(f_Insta.m_Type == INSTA_TYPE_VAR_INT_PNTR)
		{
		var f_STR_clsName = this.m_vec_Name[0].m_vec_Name[0];
		
		for(var f_CountA = 0; f_CountA < this.m_idx_vec_Name; f_CountA++)
			{
			for(var f_CountB = 0; f_CountB < this.m_vec_Name[f_Count].m_idx_vec_Name; f_CountB++)
				{
				var f_clsName = this.m_vec_Name[f_Count].m_vec_Name[f_CountB];
				
				if((f_clsName.m_Name == f_Insta.m_String) && ((f_clsName.m_INSTA_Type == INSTA_TYPE_VAR_INT) || (f_clsName.m_INSTA_Type == INSTA_TYPE_VAR_INT_PNTR) || (f_clsName.m_INSTA_Type == INSTA_TYPE_VAR)))
					{
					if((f_clsName.m_index_Insta == f_index_Insta) && (f_clsName.m_index_Function == f_index_Function))
						{
						var f_VarInsta = this.m_CollectionScript.m_vec_ElementScript[f_clsName.m_index_ElementScript].m_vec_Insta[f_clsName.m_index_Insta];
						var f_Ins = this.m_CollectionScript.m_vec_ElementScript[f_STR_clsName.m_index_ElementScript].m_vec_Insta[f_STR_clsName.m_index_Insta];
						
						  //////////////////////////////
						 //
						// Recover Value of Variable
						f_VarInsta.m_Value = f_Ins.m_Value;
						
						  ///////////////////////////
						 //
						// Execute Next
						if((f_clsName.m_index_Insta + 1) < this.m_CollectionScript.m_vec_ElementScript[f_STR_clsName.m_index_ElementScript].m_idx_vec_Insta)
							{
							var f_NextIns = this.m_CollectionScript.m_vec_ElementScript[f_STR_clsName.m_index_ElementScript].m_vec_Insta[f_clsName.m_index_Insta + 1];
							var f_NextCom = this.m_CollectionScript.m_vec_ElementScript[f_STR_clsName.m_index_ElementScript].m_vec_Function[f_clsName.m_index_Function];
							
							this.acPsuecute(f_NextIns, f_NextCom);
							}
						}
						
					f_STR_clsName = f_clsName;
					}
				}
			}
		}
	else if(f_Insta.m_Type == INSTA_TYPE_FUNC_CALL)
		{
		this.acSetLiveReady_Local();
		
		for(var f_CountA = 0; f_CountA < this.m_idx_vec_Name; f_CountA++)
			{
			for(var f_CountB = 0; f_CountB < this.m_vec_Name[f_Count].m_idx_vec_Name; f_CountB++)
				{
				var f_clsName = this.m_vec_Name[f_Count].m_vec_Name[f_CountB];
				
				if(f_clsName.m_Name == f_Insta.m_String && f_clsName.m_INSTA_Type == INSTA_TYPE_FUNC_DEF)
					{
					var f_Ins = this.m_CollectionScript.m_vec_ElementScript[f_clsName.m_index_ElementScript].m_vec_Insta[f_clsName.m_index_Insta];
					var f_Com = this.m_CollectionScript.m_vec_ElementScript[f_clsName.m_index_ElementScript].m_vec_Function[f_clsName.m_index_Function];
						
					this.acPsuecute(f_Ins, f_Com);
					}
				}
			}
		}
	else if(f_Insta.m_Type == INSTA_TYPE_OPER_EQUALS)
		{
		}
	else if(f_Insta.m_Type == INSTA_TYPE_VAR)
		{
		}
	else if(f_Insta.m_Type == INSTA_TYPE_VAR)
		{
		}
	else if(f_Insta.m_Type == INSTA_TYPE_VAR)
		{
		}
	else if(f_Insta.m_Type == INSTA_TYPE_VAR)
		{
		}
}

classTarget_JScript.prototype.acSetLiveReady = function()
{
	for(var f_CountX = 0; f_CountX < this.m_CollectionScript.m_idx_vec_ElementScript; f_CountX++)
		{
		for(var f_CountY = 0; f_CountY < this.m_CollectionScript.m_vec_ElementScript[f_CountX].m_idx_vec_Function; f_CountY++)
			{
			var f_Function = this.m_CollectionScript.m_vec_ElementScript[f_CountX].m_vec_Function[f_CountY];
			
			for(var f_Helly = 0; f_Helly < f_Function.m_idx_vec_Insta; f_Helly++)
				{
				var f_Insta = f_Function.m_vec_Insta[f_Helly];
				
				f_Insta.m_Value = null;
				}
			}
		}
}

classTarget_JScript.prototype.acGatherInstas = function()
{
	for(var f_CountX = 0; f_CountX < this.m_CollectionScript.m_idx_vec_ElementScript; f_CountX++)
		{
		for(var f_CountY = 0; f_CountY < this.m_CollectionScript.m_vec_ElementScript[f_CountX].m_idx_vec_Function; f_CountY++)
			{
			var f_Function = this.m_CollectionScript.m_vec_ElementScript[f_CountX].m_vec_Function[f_CountY];
			
			for(var f_Helly = 0; f_Helly < f_Function.m_idx_vec_Insta; f_Helly++)
				{
				var f_Insta = f_Function.m_vec_Insta[f_Helly];
				
				if(f_Insta.m_Type == INSTA_TYPE_VAR)
					{
					g_MasterTarget.m_vec_ResultInsta[g_MasterTarget.m_idx_vec_ResultInsta] = f_Insta;
					g_MasterTarget.m_idx_vec_ResultInsta++;
					}
				}
			}
		}
}

classTarget_JScript.prototype.acLive_Psuecute = function()
{
	var f_LiveSet = this.acMergeUpper();
	
	var f_InputMap = this.acGen_InputMap();
	
	this.acSetLiveReady();
	
	for(var f_CountX = 0; f_CountX < this.m_CollectionScript.m_idx_vec_ElementScript; f_CountX++)
		{
		for(var f_CountY = 0; f_CountY < this.m_CollectionScript.m_vec_ElementScript[f_CountX].m_idx_vec_Function; f_CountY++)
			{
			var f_Function = this.m_CollectionScript.m_vec_ElementScript[f_CountX].m_vec_Function[f_CountY];
			
			if(f_Function.m_idx_vec_Insta > 0)
				{
				this.acPsuecute(f_Function.m_vec_Insta[0], f_Function);
				}
			
			/*testing insta gen*/
			
			/*for(var f_Helly = 0; f_Helly < f_Function.m_idx_vec_Insta; f_Helly++)
				{
				var f_Insta = f_Function.m_vec_Insta[f_Helly];
				
				this.acPsuecute(f_Insta, f_Function);
				}*/
			}
		}
}

//reveals things
//and that is what to do
//in a code chunk find the two things
function classThing(f_Function)
{
	this.m_Inputs = [];
	this.m_Order = 0;
	this.m_Language = "";
	this.m_CodeType = 0;
	this.m_PurposeLayer = 0;
	this.m_NominalityPerc = 50;
	this.m_StabilityPerc = 100;
	
	 //////////
	// hold out for aquisition
	this.m_Aquisition = [];
}

function classStateLayer()
{
	this.m_Level = 0;
	this.m_vec_Thing = [];
	this.m_Aquisition = [];
}

classTarget_JScript.prototype.acCompare = function(f_Target, f_QualityRank, f_Grade)
{
	f_Target.m_Mark = 0.0;
	
	 /////////////////////
	// Prime Evaluation
	//for(var f_XY = 0; f_XY < this.m_idx_vec_Function; f_XY++)
	//	{
		//var f_Mark = f_Function.acInterrogate(f_QualityRank);
		
		//f_Mark.acIncrement(f_Function.acMark_Bridges());
		
		var f_Mark = this.acMark_Bridges();
		
		f_Target.m_Mark = f_Mark.acSumStuff(f_QualityRank);
	//	}
	//else
	//	{
	//	return false;
	//	}
	
	 ///////////////////////
	// Prime Conditional
	if(f_Target.m_Mark >= f_Grade)
		{
		return true;
		}
	else
		{
		return false;
		}
}

classTarget_JScript.prototype.acCompareStructure = function(f_Target, f_QualityRank, f_Grade, f_testVolumes)
{
	f_Target.m_Mark = 0.0;
	
	 /////////////////////
	//Prime Conditional
	if(this.m_CollectionScript.m_idx_vec_ElementScript < f_Target.m_Collection.m_idx_vec_ElementScript)
		{
		for(var f_Count = 0; f_Count < this.m_Collection.m_idx_vec_Element; f_Count++)
			{
			var f_Element = this.m_Collection.m_vec_Element[f_Count];
			var f_TestElement = f_Target.m_Collection.m_vec_Element[f_Count];

			f_Target.m_Mark += f_Element.acCompare(f_TestElement, f_QualityRank, f_testVolumes);
			}
		}
	else
		{
		for(var f_Count = 0; f_Count < this.m_Collection.m_idx_vec_Element; f_Count++)
			{
			var f_fakeMark = 0.0;

			var f_Element = this.m_Collection.m_vec_Element[f_Count];
			var f_TestElement = f_Target.m_Collection.m_vec_Element[0];

			var f_Mark = f_Element.acCompare(f_TestElement, f_QualityRank, f_testVolumes);
			f_fakeMark = f_Mark;

			for(var f_Cam = 0; f_Cam < f_Target.m_Collection.m_idx_vec_Element; f_Cam++)
				{
				var f_Element = this.m_Collection.m_vec_Element[f_Count];
				var f_TestElement = f_Target.m_Collection.m_vec_Element[f_Cam];

				var f_Mark = f_Element.acCompare(f_TestElement, f_QualityRank, f_testVolumes);
				if(f_Mark < f_fakeMark)
					{
					f_fakeMark = f_Mark;
					}
				}

			f_Target.m_Mark += f_fakeMark;
			}
		}

	if((f_Target.m_Mark <= f_Grade) && (f_Target.m_Mark != 0.0) && (f_Target.m_Mark > 1060.0))
		{
		return true;
		}
	else
		{
		return false;
		}

	/*if(Math.random() < 0.1)
		{
		console.log("CubeHESHGen(" + f_True + ")QualityRank[" + f_QualityRank + "]:Mark " + f_Target.m_Mark + " < Diff(" + f_Grade + ")tVol=" + f_testVolumes);
		}*/
}

function classInsta(f_StringC, f_Type)
{
	this.m_Type = f_Type;
	this.m_String = f_StringC;
	
	this.m_Value = null;
}

classInsta.prototype.acInterrogation = function(f_LineCount, f_InstaCount, f_Line, f_LineSize)
{	
	var f_Mark = new classMark();
	
	 //////////////////////
	// Calc Results
	for(var f_Count = 0; f_Count < f_LineSize; f_Count++)
		{
		if(f_Line[f_Count].m_Type != f_Target.m_vec_CodeLineStorage[f_LineCount][f_InstaCount].m_Type)
			{
			f_Mark.m_vec_Int[0]++;
			}
			
		if(f_Count >= 1)
			{
			for(var f_inputCount = 0; f_inputCount < f_Target.m_idx_vec_CodeInputs; f_inputCount++)
				{
				if(f_Line[f_Count].m_String != f_Target.m_vec_CodeInput[f_inputCount])
					{
					f_Mark.m_vec_Int[3]++;
					}
				}
			}
			
		if(f_Line[f_Count].m_String != f_Target.m_vec_CodeLineStorage[f_LineCount][f_InstaCount].m_String)
			{
			f_Mark.m_vec_Int[1]++;
			}
		}

	return f_Mark;
}

function classMark()
{
	this.m_vec_Int = [];
	this.m_idx_flip = 5;
	this.m_idx_vec_Int = 7;
	
	for(var f_X = 0; f_X < this.m_idx_vec_Int; f_X++)
		{
		this.m_vec_Int[f_X] = 0;
		}
}

classMark.prototype.acReset = function()
{
	for(var f_X = 0; f_X < this.m_idx_vec_Int; f_X++)
		{
		this.m_vec_Int[f_X] = 0;
		}
}

classMark.prototype.acIncrement = function(f_Mark)
{
	for(var f_X = 0; f_X < this.m_idx_vec_Int; f_X++)
		{
		this.m_vec_Int[f_X] += f_Mark.m_vec_Int[f_X];
		}
}

classMark.prototype.acSumStuff = function(f_QualityRank)
{
	var f_Mark = 0.0;

	   ////////////////
	  //
	 //
	// Movin to positive Marking Scheme
	for(var f_X = this.m_idx_flip; f_X < this.m_idx_vec_Int; f_X++)
		{
		f_Mark += this.m_vec_Int[f_X] * f_QualityRank; //adjustment
		}
	
	for(var f_X = 0; f_X < this.m_idx_flip; f_X++)
		{
		f_Mark -= this.m_vec_Int[f_X] * f_QualityRank;
		}
		
	return f_Mark;
}

function classFunction()
{
	this.m_vec_String = "";
	
	this.m_Type = 0;
	this.m_Status = 0;

	this.m_Name;
	this.m_Hash;
	this.m_String;

	//>?
	this.m_Level = [];
	this.m_vec_Code = [];
	
	this.m_vec_Insta = [];
	this.m_idx_vec_Insta = 0;
	
	this.m_vec_CodeLineStorage = [];
	this.m_idx_vec_CodeLineStorage = 0;
	
	this.m_vec_CodeLineStorageFlag = [];
	this.m_idx_vec_CodeLineStorageFlag = 0;

	this.m_Mark = new classMark();
}

classFunction.prototype.acInsertAuthority = function(f_Element, f_Index)
{
	//generate mebbe linked lists of input control output data for each class name and then
	//call insertAuthority
}

classFunction.prototype.acTestElement = function(f_Element, f_Index)
{
	var f_Mark = new classMark();
	
	//test element and producers return results
	//if(f_Element.m_Type == 
	//}
	//var f_Input = 
	
	return f_Mark;
}

classFunction.prototype.acInterrogate = function(f_QualityRank)
{
	this.m_Mark.acReset();
	
	for(var f_XY = 0; f_XY < this.m_idx_vec_CodeLineStorage; f_XY++)
		{
		for(var f_helly = 0; f_Helly < this.m_vec_CodeLineStorage[f_XY].length; f_Helly++)
			{
			var f_Insta = this.m_vec_CodeLineStorage[f_XY][f_Helly];
			
			var f_MarkAdjust = f_Insta.acInterrogation(f_XY, f_Helly, this.m_vec_CodeLineStorage[f_XY], this.m_vec_CodeLineStorage[f_XY].length);

			this.m_Mark.acIncrement(f_MarkAdjust);
			}
		}
		
	return this.m_Mark;
}

function classTestSchema()
{
	this.m_Type = 0;
	this.m_Status = 0;

	this.m_Center = new BiVector(0.0);
	this.m_Volume = 0.0;

	this.m_Data = "";
	this.m_Hash = "";

	this.m_aabb = new aabb();

	this.m_vec_Collission = [];
	this.m_idx_vec_Collission = 0;
	this.m_vec_IsIn = [];
	this.m_idx_vec_IsIn = 0;

	var f_ReferencePoint = [];
}

classTarget_JScript.prototype.ac_takeMeasurement = function(f_Vertex)
{
	if(this.m_SchemaTop == 0)
		{
		var f_CharAry = [];
		var f_idx_Char = 0;
		
		var f_CharCount = [];
		f_CharCount[0] = this.ac_takeMeasurementINTV1(f_Vertex, 2, 5, 1, 3, 4);
		f_CharCount[1] = this.ac_takeMeasurementINTV1(f_Vertex, 2, 8, 1, 3, 5);
		f_CharCount[2] = this.ac_takeMeasurementINTV1(f_Vertex, 2, 15, 1, 3, 6);
		var f_Select = this.ac_takeMeasurementINTV1(f_Vertex, 0, 3, 1, 3, 3);
		
		for(var f_helly = 0; f_helly < f_CharCount[f_Select]; f_helly++)
			{
			var f_Jet = f_helly;
			while(f_Jet >= 8)
				{
				f_Jet -= 8;
				}
				
			this.m_SchemaRef[this.m_SchemaTop].m_X = this.m_SchemaRef[this.m_SchemaTop].m_X + (f_Vertex.m_vec_Vertex[f_Jet].m_X * 0.3);
			this.m_SchemaRef[this.m_SchemaTop].m_Y = this.m_SchemaRef[this.m_SchemaTop].m_Y + (f_Vertex.m_vec_Vertex[f_Jet].m_Y * 0.1);
			this.m_SchemaRef[this.m_SchemaTop].m_Z = this.m_SchemaRef[this.m_SchemaTop].m_Z + (f_Vertex.m_vec_Vertex[f_Jet].m_Z * 0.3);

			var f_Vec = new BiVector();
			f_Vec.m_X = this.m_SchemaRef[this.m_SchemaTop].m_X - f_Vertex.m_vec_Vertex[f_Jet].m_X;
			f_Vec.m_Y = this.m_SchemaRef[this.m_SchemaTop].m_Y - f_Vertex.m_vec_Vertex[f_Jet].m_Y;
			f_Vec.m_Z = this.m_SchemaRef[this.m_SchemaTop].m_Z - f_Vertex.m_vec_Vertex[f_Jet].m_Z;
			
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
					var f_Finger = this.ac_takeMeasurementINTV1(f_Vertex, 0, 7, 0, 3, 3);
					
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
						var f_FingerB = this.ac_takeMeasurementINTV1(f_Vertex, 0, 10, 0, 3, 3);
						
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
				var f_Finger = this.ac_takeMeasurementINTV1(f_Vertex, 0, 7, 0, 3, 3);
					
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
					var f_FingerB = this.ac_takeMeasurementINTV1(f_Vertex, 0, 10, 0, 3, 3);
						
					if(f_FingerB > 8)
						{
						f_Result += "_";
						}
					}
				}
			}

		return f_Result;
		}
	else if(this.m_SchemaTop == 1)
		{
		var f_CharAry = [];
		var f_idx_Char = 0;

		var f_CharCount = [];
		f_CharCount[0] = this.ac_takeMeasurementINTV1(f_Vertex, 2, 5, 1, 3, 4);
		f_CharCount[1] = this.ac_takeMeasurementINTV1(f_Vertex, 2, 8, 1, 3, 5);
		f_CharCount[2] = this.ac_takeMeasurementINTV1(f_Vertex, 2, 15, 1, 3, 6);
		var f_Select = this.ac_takeMeasurementINTV1(f_Vertex, 0, 3, 1, 3, 3);
		
		for(var f_helly = 0; f_helly < f_CharCount[f_Select]; f_helly++)
			{
			var f_Jet = f_helly;
			while(f_Jet >= 8)
				{
				f_Jet -= 8;
				}
				
			this.m_SchemaRef[this.m_SchemaTop].m_X = this.m_SchemaRef[this.m_SchemaTop].m_X + (f_Vertex.m_vec_Vertex[f_Jet].m_X * 0.3);
			this.m_SchemaRef[this.m_SchemaTop].m_Y = this.m_SchemaRef[this.m_SchemaTop].m_Y + (f_Vertex.m_vec_Vertex[f_Jet].m_Y * 0.1);
			this.m_SchemaRef[this.m_SchemaTop].m_Z = this.m_SchemaRef[this.m_SchemaTop].m_Z + (f_Vertex.m_vec_Vertex[f_Jet].m_Z * 0.3);

			var f_Vec = new BiVector();
			f_Vec.m_X = this.m_SchemaRef[this.m_SchemaTop].m_X - f_Vertex.m_vec_Vertex[f_Jet].m_X;
			f_Vec.m_Y = this.m_SchemaRef[this.m_SchemaTop].m_Y - f_Vertex.m_vec_Vertex[f_Jet].m_Y;
			f_Vec.m_Z = this.m_SchemaRef[this.m_SchemaTop].m_Z - f_Vertex.m_vec_Vertex[f_Jet].m_Z;
			
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
					var f_Finger = this.ac_takeMeasurementINTV1(f_Vertex, 1, 5, 0, 3, 3);
					
					if(f_Finger == 1)
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
						
					f_Scope = false;
					}
				}
			else
				{
				var f_Finger = this.ac_takeMeasurementINTV1(f_Vertex, 1, 5, 0, 3, 3);
					
				if(f_Finger == 1)
					{
					f_Result += "u";
					}
				else if(f_Finger == 2)
					{
					f_Result += "i";
					}
				else if(f_Finger == 3)
					{
					f_Result += "a";
					}
				else if(f_Finger == 4)
					{
					f_Result += "e";
					}
				else if(f_Finger == 5)
					{
					f_Result += "o";
					}
					
				f_Scope = true;
				}
			}

		return f_Result;
		}

	return "abeebc";
}

//element level specify schema
classTarget_JScript.prototype.ac_takeMeasurementINTV1 = function(f_Vertex, f_StartRange, f_EndRange, f_WeightRangetoStart, f_Depth, f_Cap)  // scale resolution 1-3
{
	var m_Depth = f_Depth;
	m_Depth--;
	
	f_Cap = 0;
	
	if(m_Depth >= 1)
		{
		if(this.m_SchemaTop == 0)
			{		//All distance test
			var f_Float = 0;
			for(var f_helly = 0; f_helly < f_Vertex.m_idx_vec_Vertex; f_helly++)
				{
				this.m_SchemaRef[this.m_SchemaTop].m_X = this.m_SchemaRef[f_Cap].m_X + (f_Vertex.m_vec_Vertex[f_helly].m_X * 0.3);
				this.m_SchemaRef[this.m_SchemaTop].m_Y = this.m_SchemaRef[f_Cap].m_Y + (f_Vertex.m_vec_Vertex[f_helly].m_Y * 0.1);
				this.m_SchemaRef[this.m_SchemaTop].m_Z = this.m_SchemaRef[f_Cap].m_Z + (f_Vertex.m_vec_Vertex[f_helly].m_Z * 0.3);

				var f_Vec = new BiVector();
				
				f_Vec.m_X = this.m_SchemaRef[this.m_SchemaTop].m_X - f_Vertex.m_vec_Vertex[f_helly].m_X;
				f_Vec.m_Y = this.m_SchemaRef[this.m_SchemaTop].m_Y - f_Vertex.m_vec_Vertex[f_helly].m_Y;
				f_Vec.m_Z = this.m_SchemaRef[this.m_SchemaTop].m_Z - f_Vertex.m_vec_Vertex[f_helly].m_Z;
				
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
		else if(this.m_SchemaTop == 1)
			{
			var f_Int = 0;
			var f_IntMax = 10 * 150 * 4;
			for(var f_helly = 0; f_helly < f_Vertex.m_idx_vec_Element; f_helly++)
				{
				for(var f_jet = 0; f_jet < f_Vertex.m_idx_vec_Element; f_jet++)
					{
					this.m_SchemaRef[this.m_SchemaTop].m_X = this.m_SchemaRef[f_Cap].m_X + (f_Vertex.m_vec_Vertex[f_helly].m_X * 0.3);
					this.m_SchemaRef[this.m_SchemaTop].m_Y = this.m_SchemaRef[f_Cap].m_Y + (f_Vertex.m_vec_Vertex[f_helly].m_Y * 0.1);
					this.m_SchemaRef[this.m_SchemaTop].m_Z = this.m_SchemaRef[f_Cap].m_Z + (f_Vertex.m_vec_Vertex[f_helly].m_Z * 0.3);

					f_Int += f_Vertex.m_vec_Element[f_helly].m_Volume * f_helly;
					}
				}
			var f_Result = (((f_Int / f_IntMax) / (f_WeightRangetoStart + 1)) * f_EndRange) + f_StartRange;
			f_Result = parseInt(f_Result);
			return f_Result;
			}
		else if(this.m_SchemaTop == 2)
			{
			var f_Int = 0;
			var f_IntMax = 10 * 150 * 4;
			for(var f_helly = 0; f_helly < f_Vertex.m_idx_vec_Element; f_helly++)
				{
				for(var f_jet = 0; f_jet < f_Vertex.m_idx_vec_Element; f_jet++)
					{
					this.m_SchemaRef[this.m_SchemaTop].m_X = this.m_SchemaRef[f_Cap].m_X + (f_Vertex.m_vec_Vertex[f_helly].m_X * 0.3);
					this.m_SchemaRef[this.m_SchemaTop].m_Y = this.m_SchemaRef[f_Cap].m_Y + (f_Vertex.m_vec_Vertex[f_helly].m_Y * 0.1);
					this.m_SchemaRef[this.m_SchemaTop].m_Z = this.m_SchemaRef[f_Cap].m_Z + (f_Vertex.m_vec_Vertex[f_helly].m_Z * 0.3);

					f_Int += f_Vertex.m_vec_Element[f_helly].m_Volume * f_helly;
					}
				}
			var f_Result = (((parseInt(f_Int) / f_IntMax) / (f_WeightRangetoStart + 1)) * f_EndRange) + f_StartRange;
			f_Result = parseInt(f_Result);
			return f_Result;
			}
		}
	else
		{
		if(this.m_SchemaTop == 0)
			{		//All distance test
			var f_Float = 0;
			for(var f_helly = 0; f_helly < f_Vertex.m_idx_vec_Vertex; f_helly++)
				{
				this.m_SchemaRef[this.m_SchemaTop].m_X = this.m_SchemaRef[0].m_X + (f_Vertex.m_vec_Vertex[f_helly].m_X * 0.3);
				this.m_SchemaRef[this.m_SchemaTop].m_Y = this.m_SchemaRef[0].m_Y + (f_Vertex.m_vec_Vertex[f_helly].m_Y * 0.1);
				this.m_SchemaRef[this.m_SchemaTop].m_Z = this.m_SchemaRef[0].m_Z + (f_Vertex.m_vec_Vertex[f_helly].m_Z * 0.3);

				var f_Vec = new BiVector();
				
				f_Vec.m_X = this.m_SchemaRef[this.m_SchemaTop].m_X - f_Vertex.m_vec_Vertex[f_helly].m_X;
				f_Vec.m_Y = this.m_SchemaRef[this.m_SchemaTop].m_Y - f_Vertex.m_vec_Vertex[f_helly].m_Y;
				f_Vec.m_Z = this.m_SchemaRef[this.m_SchemaTop].m_Z - f_Vertex.m_vec_Vertex[f_helly].m_Z;
				
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
		else if(this.m_SchemaTop == 1)
			{
			var f_Int = 0;
			var f_IntMax = 10 * 150 * 4;
			for(var f_helly = 0; f_helly < f_Vertex.m_idx_vec_Element; f_helly++)
				{
				for(var f_jet = 0; f_jet < f_Vertex.m_idx_vec_Element; f_jet++)
					{
					this.m_SchemaRef[this.m_SchemaTop].m_X = this.m_SchemaRef[f_Cap].m_X + (f_Vertex.m_vec_Vertex[f_helly].m_X * 0.3);
					this.m_SchemaRef[this.m_SchemaTop].m_Y = this.m_SchemaRef[f_Cap].m_Y + (f_Vertex.m_vec_Vertex[f_helly].m_Y * 0.1);
					this.m_SchemaRef[this.m_SchemaTop].m_Z = this.m_SchemaRef[f_Cap].m_Z + (f_Vertex.m_vec_Vertex[f_helly].m_Z * 0.3);

					f_Int += f_Vertex.m_vec_Element[f_helly].m_Volume * f_helly;
					}
				}
			var f_Result = (((parseInt(f_Int) / f_IntMax) / (f_WeightRangetoStart + 1)) * f_EndRange) + f_StartRange;
			f_Result = parseInt(f_Result);
			return f_Result;
			}
		else if(this.m_SchemaTop == 2)
			{
			var f_Int = 0;
			var f_IntMax = 10 * 150 * 4;
			for(var f_helly = 0; f_helly < f_Vertex.m_idx_vec_Element; f_helly++)
				{
				for(var f_jet = 0; f_jet < f_Vertex.m_idx_vec_Element; f_jet++)
					{
					this.m_SchemaRef[this.m_SchemaTop].m_X = this.m_SchemaRef[f_Cap].m_X + (f_Vertex.m_vec_Vertex[f_helly].m_X * 0.3);
					this.m_SchemaRef[this.m_SchemaTop].m_Y = this.m_SchemaRef[f_Cap].m_Y + (f_Vertex.m_vec_Vertex[f_helly].m_Y * 0.1);
					this.m_SchemaRef[this.m_SchemaTop].m_Z = this.m_SchemaRef[f_Cap].m_Z + (f_Vertex.m_vec_Vertex[f_helly].m_Z * 0.3);

					f_Int += f_Vertex.m_vec_Element[f_helly].m_Volume * f_helly;
					}
				}
			var f_Result = (((parseInt(f_Int) / f_IntMax) / (f_WeightRangetoStart + 1)) * f_EndRange) + f_StartRange;
			f_Result = parseInt(f_Result);
			return f_Result;
			}
		}

	return 1;
}

function ag_NameStamp(f_Measurement, f_Type, f_BitCount)
{
	var f_Result = "";
	g_FunctionStamp++;

	if(f_Type == COMPONENT_TYPE_VARINSTA)
		{
		var f_Char = "";
		f_Char = "Variable" + g_FunctionStamp + "-" + f_BitCount;
		f_Result += f_Char;
		}
	if(f_Type == COMPONENT_TYPE_FUNCTIONCALL)
		{
		var f_Char = "";
		f_Char = "FunctionCall" + g_FunctionStamp + "-" + f_BitCount;
		f_Result += f_Char;
		}

	return f_Result;
}

function ag_GenerateName(f_Measurement)
{
	return f_Measurement;
}

function ag_GenerateValue(f_Measurement)
{
//#pragma message("generate several methods and results for differing value types")
	var f_ValueStream = f_Measurement;

	var f_Int = f_ValueStream;

	var f_Char = "";
	f_Char = f_Int;

	var f_Result = f_Char;

	return f_Result;
}