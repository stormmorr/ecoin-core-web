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
var INSTA_TYPE_OPER_EQUALS = 4;
var INSTA_TYPE_OPER_CALL = 5;
var INSTA_TYPE_CONDITIONAL = 6;
var INSTA_TYPE_LOOP_DEF = 7;
var INSTA_TYPE_DATA = 8;
var INSTA_TYPE_COUNT = 9;

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

	this.m_LastType = 0;
	this.m_LastTypeII = 0;
	
	this.m_Factor = [];
	
	for(var f_XY = 0; f_XY < INSTA_TYPE_COUNT; f_XY++)
		{
		this.m_Factor[f_XY] = new classFactor();
		}
		
	this.m_InstaCountMap = 0;
		
	this.m_String = "";

	  ////////////////////////////////////
	 // LEGACY of Structured Analysis
	//
	this.m_vec_Result = [];
	this.m_idx_vec_Result = 0;
	
	this.m_vec_CountLock = [];
	this.m_idx_vec_CountLock = 0;
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
	this.m_Name = 0;
	this.m_BitCount = f_BitCount;
	this.m_INSTA_Type = f_INSTA;
	this.m_index_Insta = f_index_Insta;
	this.m_index_Function = f_index_Function;
	this.m_vec_Name = [];
	this.m_idx_vec_Name = 0;
}

//fixme: add three ways lazy bear approach to changing variable insta names
classTarget_JScript.prototype.acMakeUnison = function(f_Name, f_BitCount, f_INSTA, f_Element, f_index_Insta, f_index_Function)
{
	if(this.m_idx_Name >= 1)
		{
		var f_FactorFinger = parseInt(this.ac_takeMeasurementINTV1(f_Element, 1, (g_idxName - 1), 1, 3, 5));
		
		if(this.m_vec_Name[f_FactorFinger].m_INSTA_Type != f_INSTA)
			{
			var f_clsName = new clsName(f_Name, f_BitCount, f_INSTA, f_index_Insta, f_index_Function);
			
			f_clsName.m_vec_Name[f_clsName.m_idx_vec_Name] = f_clsName;
			f_clsName.m_idx_vec_Name++;
			
			this.m_vec_Name[this.m_idx_vec_Name] = f_clsName;
			this.m_idx_vec_Name++;
			
			return f_Name;
			}
		else
			{
			var f_clsName = new clsName(f_Name, f_BitCount, f_INSTA, f_index_Insta, f_index_Function);
			
			this.m_vec_Name[f_FactorFinger].m_vec_Name[this.m_vec_Name[f_FactorFinger].m_idx_vec_Name] = f_clsName;
			this.m_vec_Name[f_FactorFinger].m_idx_vec_Name++;
			return this.m_vec_Name[f_FactorFinger].m_Name;
			}
		}
		
	return f_Name;
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
	this.m_Factor[INSTA_TYPE_FUNC_CALL].m_Use = 0;
	this.m_Factor[INSTA_TYPE_OPER_CALL].m_Use = 0;
	this.m_Factor[INSTA_TYPE_OPER_EQUALS].m_Use = 0;
	this.m_Factor[INSTA_TYPE_LOOP_DEF].m_Use = 0;
	this.m_Factor[INSTA_TYPE_CONDITIONAL].m_Use = 0;
	this.m_Factor[INSTA_TYPE_DATA].m_Use = 0;
	this.m_LastType = -5;
	this.m_LastTypeII = -5;
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
			
		if(this.m_Factor[INSTA_TYPE_OPER_EQUALS].m_Use > 0)
			{
			return false;
			}
			
		if(this.m_Factor[INSTA_TYPE_OPER_CALL].m_Use > 0)
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
	else if(f_Type == INSTA_TYPE_OPER_EQUALS)
		{
		if(this.m_Factor[INSTA_TYPE_FUNC_CALL].m_Use > 0)
			{
			return false;
			}
			
		if(this.m_Factor[INSTA_TYPE_OPER_EQUALS].m_Use > 0)
			{
			return false;
			}

		if(this.m_Factor[INSTA_TYPE_LOOP_DEF].m_Use > 0)
			{
			return false;
			}
			
		if(this.m_LastType == INSTA_TYPE_VAR_DEF)
			{
			this.m_LastType = f_Type;
			this.m_Factor[f_Type].m_Use++;
			return true;
			}
		
		if(this.m_Factor[INSTA_TYPE_CONDITIONAL].m_Use > 0)
			{
			 /////////////
			// Leah
			if(this.m_LastType == INSTA_TYPE_VAR_CALL)
				{
				this.m_LastType = f_Type;
				this.m_Factor[f_Type].m_Use++;
				return true;
				}
			}
			
		if(this.m_LastType == INSTA_TYPE_OPER_CALL || this.m_LastType == INSTA_TYPE_OPER_EQUALS)
			{
			return false;
			}
			
		if(this.m_LastType == INSTA_TYPE_FUNC_DEF)
			{
			return false;
			}
		
		this.m_LastType = f_Type;
		this.m_Factor[f_Type].m_Use++;
		return true;
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
	else if(f_Type == INSTA_TYPE_OPER_CALL)
		{
		if(this.m_LastType == -5)
			{
		    return false;
		    }
		
		if(this.m_Factor[INSTA_TYPE_OPER_EQUALS].m_Use == 0)
			{
			return false;
			}
			
		if(this.m_Factor[INSTA_TYPE_FUNC_DEF].m_Use == 0)
			{
			return false;
			}
			
		if(this.m_LastType == INSTA_TYPE_OPER_CALL)
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
			
		if(this.m_LastType == INSTA_TYPE_OPER_EQUALS)
		    {
			this.m_LastType = f_Type;
			this.m_Factor[f_Type].m_Use++;
		    return true;
		    }
			
		if(this.m_LastType == INSTA_TYPE_OPER_CALL)
		    {
			this.m_LastType = f_Type;
			this.m_Factor[f_Type].m_Use++;
		    return true;
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

classTarget_JScript.prototype.acFromHesh = function(f_Hesh)
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
	
	var f_FunctionCount = this.ac_takeMeasurementINTV1(f_Element, 1, 3, 1, 3, 1);

	for(var f_jet = 0; f_jet < f_FunctionCount; f_jet++)
		{
		var f_FunctionType = this.ac_takeMeasurementINTV1(f_Element, 1, 3, 0, 3, 2);
		var f_ArgumentCount = this.ac_takeMeasurementINTV1(f_Element, 0, 3, 3, 3, 3);
		var f_InstaCountMap = this.ac_takeMeasurementINTV1(f_Element, 1, 500, 20, 3, 4);
		this.m_InstaCountMap = f_InstaCountMap;

		var f_Function = new classFunction();
		f_Function.m_Type = f_FunctionType;
		f_Function.m_Name = ag_GenerateName(this.ac_takeMeasurement(f_Element));
		
		var f_StringA = "function " + f_Function.m_Name + "(";
		var f_Insta = new classInsta(f_StringA, INSTA_TYPE_FUNC_DEF);

		f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta] = f_Insta;
		f_Function.m_idx_vec_Insta++;

		f_Function.m_vec_String += f_StringA;
		
		this.m_LastType = INSTA_TYPE_FUNC_DEF;
		this.m_Factor[INSTA_TYPE_FUNC_DEF].m_Use++;
		
		this.m_idx_vec_CountLock = 0;
		
		this.m_vec_CountLock[this.m_idx_vec_CountLock] = new classCountLock(f_InstaCountMap, "\n}//endfunc " + f_Function.m_Name + "\n", INSTA_TYPE_FUNC_DEF);
		this.m_idx_vec_CountLock++;
		
		this.m_vec_CountLock[this.m_idx_vec_CountLock] = new classCountLock(f_ArgumentCount, ")\n	{\n", INSTA_TYPE_FUNC_DEF);
		this.m_idx_vec_CountLock++;

		var f_ElementID = 0;
		
		while(this.m_InstaCountMap > 0)
			{
			f_Element = this.m_Collection.m_vec_Element[f_ElementID];
			
			f_ElementID++;
			
			var f_Contact = false;
			
			if(f_ElementID >= this.m_Collection.m_idx_vec_Element)
				{
				f_ElementID = 0;
				}
				
			var f_InstaType = this.ac_takeMeasurementINTV1(f_Element, 1, INSTA_TYPE_COUNT, 2, 3, 6);

			if(f_InstaType == INSTA_TYPE_VAR_DEF)
				{
				if(this.acFactorStrength(INSTA_TYPE_VAR_DEF, f_Function, f_Element) == true)
					{
					var f_Name = this.acMakeUnison(ag_GenerateName(this.ac_takeMeasurement(f_Element)), 1, INSTA_TYPE_VAR_DEF, f_Element, f_Function.m_idx_vec_Insta, this.m_idx_vec_Function);
					var f_StringB = "var " + f_Name + " = ";
					var f_Insta = new classInsta(f_StringB, INSTA_TYPE_VAR_DEF);

					f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta] = f_Insta;
					f_Function.m_idx_vec_Insta++;

					f_Function.m_vec_String += f_StringB;
					this.m_InstaCountMap--;
					
					var f_InstaCount = this.ac_takeMeasurementINTV1(f_Element, 1, 4, 3, 3, 6);
					
					this.m_vec_CountLock[this.m_idx_vec_CountLock] = new classCountLock(f_InstaCount, ";\n", INSTA_TYPE_VAR_DEF);
					this.m_idx_vec_CountLock++;
					f_Contact = true;
					}
				}
			else if(f_InstaType == INSTA_TYPE_VAR_CALL)
				{
				if(this.acFactorStrength(INSTA_TYPE_VAR_CALL, f_Function, f_Element) == true)
					{
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
							f_Function.m_vec_String += " == ";
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
						
					var f_Name = this.acMakeUnison(ag_GenerateName(this.ac_takeMeasurement(f_Element)), 1, INSTA_TYPE_VAR_CALL, f_Element, f_Function.m_idx_vec_Insta, this.m_idx_vec_Function);
					var f_StringB = f_Name;
					var f_Insta = new classInsta(f_StringB, INSTA_TYPE_VAR_CALL);

					f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta] = f_Insta;
					f_Function.m_idx_vec_Insta++;

					f_Function.m_vec_String += f_StringB;
					this.m_InstaCountMap--;
					f_Contact = true;
					
					if(this.m_LastTypeII == -5)
						{
						var f_InstaCount = this.ac_takeMeasurementINTV1(f_Element, 1, 4, 3, 3, 1);
					
						this.m_vec_CountLock[this.m_idx_vec_CountLock] = new classCountLock(f_InstaCount, ";\n", INSTA_TYPE_VAR_DEF);
						this.m_idx_vec_CountLock++;
						}
					}
				}
			else if(f_InstaType == INSTA_TYPE_CONDITIONAL)
				{
				if(this.acFactorStrength(INSTA_TYPE_CONDITIONAL, f_Function, f_Element) == true)
					{
					var f_StringB = "if(";
					var f_Insta = new classInsta(f_StringB, INSTA_TYPE_CONDITIONAL);

					f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta] = f_Insta;
					f_Function.m_idx_vec_Insta++;

					f_Function.m_vec_String += f_StringB;
					this.m_InstaCountMap--;
					
					var f_InstaCount = this.ac_takeMeasurementINTV1(f_Element, 3, 7, 4, 3, 5);
					var f_conInstaCount = this.ac_takeMeasurementINTV1(f_Element, 1, 30, 15, 3, 3);
					
					this.m_vec_CountLock[this.m_idx_vec_CountLock] = new classCountLock(f_conInstaCount, "\n}\n", INSTA_TYPE_CONDITIONAL);
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
					var f_Name = this.acMakeUnison(ag_GenerateName(this.ac_takeMeasurement(f_Element)), 1, INSTA_TYPE_VAR_DEF, f_Element, f_Function.m_idx_vec_Insta, this.m_idx_vec_Function);
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
					//target restriction point
					var f_FunctionName = this.acMakeUnison(ag_GenerateName(this.ac_takeMeasurement(f_Element)), 1, INSTA_TYPE_FUNC_CALL, f_Element, f_Function.m_idx_vec_Insta, this.m_idx_vec_Function);
					var f_StringB = f_FunctionName + "(";
					
					var f_Insta = new classInsta(f_StringB, INSTA_TYPE_FUNC_CALL);
							
					f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta] = f_Insta;
					f_Function.m_idx_vec_Insta++;
					
					f_Function.m_vec_String += f_StringB;
					this.m_InstaCountMap--;
					
					var f_arguInstaCount = this.ac_takeMeasurementINTV1(f_Element, 0, 3, 3, 3, 4);
					
					this.m_FuncLock++;
					 
					this.m_vec_CountLock[this.m_idx_vec_CountLock] = new classCountLock(f_arguInstaCount, ")", INSTA_TYPE_FUNC_CALL);
					this.m_idx_vec_CountLock++;
				    f_Contact = true;
					
					if(this.m_LastTypeII == -5)
						{
						var f_InstaCount = this.ac_takeMeasurementINTV1(f_Element, 0, 2, 1, 3, 5);
					
						this.m_vec_CountLock[this.m_idx_vec_CountLock] = new classCountLock(f_InstaCount, ";\n", INSTA_TYPE_VAR_DEF);
						this.m_idx_vec_CountLock++;
						}
					}
				}
			else if(f_InstaType == INSTA_TYPE_OPER_EQUALS)
				{
				if(this.acFactorStrength(INSTA_TYPE_OPER_EQUALS, f_Function, f_Element) == true)
					{
					var f_opertype = this.ac_takeMeasurementINTV1(f_Element, 0, 3, 1, 3, 4);
					
					var f_StringB = "";
					
					if(f_opertype == 0)
					    {
				        f_StringB = " = ";
				        }
				     else if(f_opertype == 1)
				        {
					    f_StringB = " -= ";
					    }
					else if(f_opertype >= 2)
					    {
						f_StringB = " += ";
						}
						
					var f_Insta = new classInsta(f_StringB, INSTA_TYPE_OPER_EQUALS);
							
					f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta] = f_Insta;
					f_Function.m_idx_vec_Insta++;
					
					f_Function.m_vec_String += f_StringB;
					this.m_InstaCountMap--;
					f_Contact = true;
					}
				}
			else if(f_InstaType == INSTA_TYPE_OPER_CALL)
				{
				if(this.acFactorStrength(INSTA_TYPE_OPER_CALL, f_Function, f_Element) == true)
					{
					var f_operInstaCount = this.ac_takeMeasurementINTV1(f_Element, 0, 4, 1, 3, 4);
						
					if(f_operInstaCount == 0)
						{
						var f_StringB = " + ";
						var f_Insta = new classInsta(f_StringB, INSTA_TYPE_VAR_CALL);

						f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta] = f_Insta;
						f_Function.m_idx_vec_Insta++;

						f_Function.m_vec_String += f_StringB;
						this.m_InstaCountMap--;
						f_Contact = true;
						}
					else if(f_operInstaCount == 1)
						{
						var f_StringB = " - ";
						var f_Insta = new classInsta(f_StringB, INSTA_TYPE_VAR_CALL);

						f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta] = f_Insta;
						f_Function.m_idx_vec_Insta++;

						f_Function.m_vec_String += f_StringB;
						this.m_InstaCountMap--;
						f_Contact = true;
						}
					else if(f_operInstaCount == 2)
						{
						var f_StringB = " * ";
						var f_Insta = new classInsta(f_StringB, INSTA_TYPE_VAR_CALL);

						f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta] = f_Insta;
						f_Function.m_idx_vec_Insta++;

						f_Function.m_vec_String += f_StringB;
						this.m_InstaCountMap--;
						f_Contact = true;
						}
					else if(f_operInstaCount == 3)
						{
						var f_StringB = " / ";
						var f_Insta = new classInsta(f_StringB, INSTA_TYPE_VAR_CALL);

						f_Function.m_vec_Insta[f_Function.m_idx_vec_Insta] = f_Insta;
						f_Function.m_idx_vec_Insta++;

						f_Function.m_vec_String += f_StringB;
						this.m_InstaCountMap--;
						f_Contact = true;
						}
					}
				}
			else if(f_InstaType == INSTA_TYPE_DATA)
				{
				if(this.acFactorStrength(INSTA_TYPE_DATA, f_Function, f_Element) == true)
					{
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
									//f_Function.m_vec_String += "ECNMSG-newl-";
									}

								this.acDecFactor(f_Lock.m_Factor);

								for(var f_XY = f_Caramel; f_XY < this.m_idx_vec_CountLock - 1; f_XY++)
									{
									this.m_vec_CountLock[f_XY] = this.m_vec_CountLock[f_XY + 1];
									}

								this.m_idx_vec_CountLock--;
								
								if(f_Lock.m_String == ")");
									{
									var f_ont = true;
									
									for(var f_cv1 = 0; f_cv1 < this.m_idx_vec_CountLock; f_cv1++)
										{
										if(this.m_vec_CountLock[f_cv1].m_Factor == INSTA_TYPE_FUNC_CALL)
											{
											f_ont = false;
											}
										}
										
									if(f_ont == true)
										{
										this.acResetLine();
										f_Function.m_vec_String += ";\n";
										//f_Function.m_vec_String += "ECNMSG-newg-";
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

classTarget_JScript.prototype.acCompare = function(f_Target, f_QualityRank, f_Grade, f_testVolumes)
{
	f_Target.m_Mark = 0.0;
	
	 /////////////////////
	//Prime Evaluation
	if(this.m_idx_vec_Function > 0)
		{
		try
			{
			eval(this.m_vec_Function[0].m_String);
			}
		catch(e)
			{
			console.log(JSON.stringify(e));
			f_Target.m_Mark = 10000000000.0;
			}
			
		if(f_Target.m_Mark = 0.0)
			{
			var f_ExecuteStr = this.m_vec_Function[0].m_Name + "();";
			
			eval(f_ExecuteStr); 
			}

		if(f_Target.m_Mark <= f_Grade)
			{
			return true;
			}
		else
			{
			return false;
			}
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

function classFunction()
{
	this.m_vec_String = "";
	
	this.m_Type = 0;
	this.m_Status = 0;

	this.m_Name;
	this.m_Hash;
	this.m_String;

	this.m_Level = [];

	this.m_vec_Code = [];
	
	this.m_vec_Insta = [];
	this.m_idx_vec_Insta = 0;
};

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
		
		for(var f_helly = 0; f_helly < (f_Vertex.m_idx_vec_Vertex / 2); f_helly++)
			{
			this.m_SchemaRef[this.m_SchemaTop].m_X = this.m_SchemaRef[this.m_SchemaTop].m_X + (f_Vertex.m_vec_Vertex[f_helly].m_X * 0.3);
			this.m_SchemaRef[this.m_SchemaTop].m_Y = this.m_SchemaRef[this.m_SchemaTop].m_Y + (f_Vertex.m_vec_Vertex[f_helly].m_Y * 0.1);
			this.m_SchemaRef[this.m_SchemaTop].m_Z = this.m_SchemaRef[this.m_SchemaTop].m_Z + (f_Vertex.m_vec_Vertex[f_helly].m_Z * 0.3);

			var f_Vec = new BiVector();
			f_Vec.m_X = this.m_SchemaRef[this.m_SchemaTop].m_X - f_Vertex.m_vec_Vertex[f_helly].m_X;
			f_Vec.m_Y = this.m_SchemaRef[this.m_SchemaTop].m_Y - f_Vertex.m_vec_Vertex[f_helly].m_Y;
			f_Vec.m_Z = this.m_SchemaRef[this.m_SchemaTop].m_Z - f_Vertex.m_vec_Vertex[f_helly].m_Z;
			
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
				}
			}

		return f_Result;
		}
	else if(this.m_SchemaTop == 1)
		{
		var f_CharAry = [];
		var f_idx_Char = 0;

		for(var f_helly = 0; f_helly < (f_Vertex.m_idx_vec_Vertex / 2); f_helly++)
			{
			this.m_SchemaRef[this.m_SchemaTop].m_X = this.m_SchemaRef[this.m_SchemaTop].m_X + (f_Vertex.m_vec_Vertex[f_helly].m_X * 0.3);
			this.m_SchemaRef[this.m_SchemaTop].m_Y = this.m_SchemaRef[this.m_SchemaTop].m_Y + (f_Vertex.m_vec_Vertex[f_helly].m_Y * 0.1);
			this.m_SchemaRef[this.m_SchemaTop].m_Z = this.m_SchemaRef[this.m_SchemaTop].m_Z + (f_Vertex.m_vec_Vertex[f_helly].m_Z * 0.3);

			var f_Vec = new BiVector();
			f_Vec.m_X = this.m_SchemaRef[this.m_SchemaTop].m_X - f_Vertex.m_vec_Vertex[f_helly].m_X;
			f_Vec.m_Y = this.m_SchemaRef[this.m_SchemaTop].m_Y - f_Vertex.m_vec_Vertex[f_helly].m_Y;
			f_Vec.m_Z = this.m_SchemaRef[this.m_SchemaTop].m_Z - f_Vertex.m_vec_Vertex[f_helly].m_Z;
			
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
			var f_Int = (f_Theta * f_EndRange) + f_StartRange;
			f_Int = f_Int - (f_WeightRangetoStart / 2);
			f_Int = parseInt(f_Int);
			if(f_Int < 0)
				{
				f_Int = f_Int * -1;
				}
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
			var f_Int = (f_Theta * f_EndRange) + f_StartRange;
			f_Int = f_Int - (f_WeightRangetoStart / 2);
			f_Int = parseInt(f_Int);
			if(f_Int < 0)
				{
				f_Int = f_Int * -1;
				}
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