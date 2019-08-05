/*

classtarget.js - osirem.com
Copyright OSIREM LTD (C) 2016
www.osirem.com www.qage.org www.geopomp.com

This source is proprietary, and cannot be used, in part or in full without
the express permission of the original author. The original author retain the
rights to use, modify, and/or relicense this code without notice.

*/

var INSTA_TYPE_VAR_INT = 1;
var INSTA_TYPE_VAR_INT_PNTR = 2;
var INSTA_TYPE_FUNC_DEF = 3;
var INSTA_TYPE_FUNC_CALL = 4;
var INSTA_TYPE_FUNC_ARGU = 5;
var INSTA_TYPE_OPER = 6;
var INSTA_TYPE_OPER_EQUALS = 7;
var INSTA_TYPE_DATA = 8;

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

var g_ComponentStamp = 0;

var g_SchemaTop = 0;
var g_SchemaRef = [];
var g_MasterTarget = new classTarget_CppScript();

function classElement_CppScript()
{	
	this.m_vec_ElementScript = [];
	this.m_idx_vec_ElementScript = 0;

	this.m_vec_Component = [];
	this.m_idx_vec_Component = 0;
	
	this.m_vec_Collission = [];
	this.m_idx_vec_Collission = 0;
	this.m_vec_IsIn = [];
	this.m_idx_vec_IsIn = 0;

	this.m_aabb = new aabb();
	
	this.m_Center = new BiVector(0.0);
	this.m_Volume = 0.0;
	
	this.m_Data = "";
	this.m_Hash = "";
	
	this.m_Base = 0;
	this.m_Index = 0;

	  ////////////////////////////////////
	 // LEGACY of Structured Analysis
	//
	this.m_vec_Result = [];
	this.m_idx_vec_Result = 0;
};

classElement_CppScript.prototype.acCompare = function(f_ElementScript, f_QualityRank, f_testVolumes)
{
	var f_Mark = 0.0;

	if(this.m_idx_vec_ElementScript < f_Element.m_idx_vec_ElementScript)
		{
		f_Mark += 37.8;
		}
	else
		{
		if(f_testVolumes == true)
			{
			for(var f_Count = 0; f_Count < this.m_idx_vec_Element; f_Count++)
				{
				var f_TestElement = this.m_vec_Element[f_Count];

				if(f_Count < f_Element.m_idx_vec_Element)
					{
					f_Mark += 0.0;//this.acVolumeCheck(
						
					var f_sizeTestElement = f_Element.m_vec_Element[f_Count];

					if((f_TestElement.m_Volume < (f_sizeTestElement.m_Volume - f_QualityRank)) || (f_TestElement.m_Volume > (f_sizeTestElement.m_Volume + f_QualityRank)))
						{
						var f_Float = f_TestElement.m_Volume - f_sizeTestElement.m_Volume;

						if(f_Float >= 0)
							{
							f_Mark += f_Float;
							}
						else
							{
							f_Mark -= f_Float;
							}
						}
					}
				}
			}
		}

	if(this.m_idx_vec_Surface < f_Element.m_idx_vec_Surface)
		{
		f_Mark += 14.8;
		}

	if(this.m_idx_vec_Leg < f_Element.m_idx_vec_Leg)
		{
		f_Mark += 8.58;
		}

	return f_Mark;
}

function classCollection_CppScript()
{
	this.m_Type = 0;
	this.m_Status = 0;

	this.m_Scale = 1.0;

	this.m_vec_ElementScript = [];
	this.m_idx_vec_ElementScript = 0;
}

function classTarget_CppScript()
{
	this.m_Collection = new classCollection();
	this.m_CollectionScript = new classCollection_CppScript();

	this.m_Mark = 0.0;
	
	this.m_vec_Name = [];
	this.m_idx_vec_Name = 0;
	
	for(var f_Count = 0; f_Count < 3; f_Count++)
		{
		g_SchemaRef.push(new BiVector());
		}
}

function clsName(f_Name, f_BitCount, f_INSTA, f_index_ElementScript, f_index_Insta, f_index_Component)
{
	this.m_Name = 0;
	this.m_BitCount = f_BitCount;
	this.m_INSTA_Type = f_INSTA;
	this.m_index_ElementScript = f_index_ElementScript;
	this.m_index_Insta = f_index_Insta;
	this.m_index_Component = f_index_Component;
	this.m_vec_Name = [];
	this.m_idx_vec_Name = 0;
}

//fixme: add three ways lazy bear approach to changing variable insta names
classTarget_CppScript.prototype.acMakeUnison = function(f_Name, f_BitCount, f_INSTA, f_Element, f_index_ElementScript, f_index_Insta, f_index_Component)
{
	if(this.m_idx_Name >= 1)
		{
		var f_FactorFinger = parseInt(ag_takeMeasurementINTV1(f_Element, 1, (g_idxName - 1), 1, 1));
		
		if(this.m_vec_Name[f_FactorFinger].m_INSTA_Type != f_INSTA)
			{
			var f_clsName = new clsName(f_Name, f_BitCount, f_INSTA, f_index_ElementScript, f_index_Insta, f_index_Component);
			
			f_clsName.m_vec_Name[f_clsName.m_idx_vec_Name] = f_clsName;
			f_clsName.m_idx_vec_Name++;
			
			this.m_vec_Name[this.m_idx_vec_Name] = f_clsName;
			this.m_idx_vec_Name++;
			
			return f_Name;
			}
		else
			{
			var f_clsName = new clsName(f_Name, f_BitCount, f_INSTA, f_index_ElementScript, f_index_Insta, f_index_Component);
			
			this.m_vec_Name[f_FactorFinger].m_vec_Name[this.m_vec_Name[f_FactorFinger].m_idx_vec_Name] = f_clsName;
			this.m_vec_Name[f_FactorFinger].m_idx_vec_Name++;
			return this.m_vec_Name[f_FactorFinger].m_Name;
			}
		}
		
	return f_Name;
}

classTarget_CppScript.prototype.acFromHesh = function(f_Hesh)
{
	for(var f_Count = 0; f_Count < f_Hesh.m_idx_vec_Cube; f_Count++)
		{
		var f_Element = new classElement();
		f_Element.acFromBicycle(f_Hesh.m_vec_Key[f_Hesh.m_vec_Cube[f_Int]].m_Link);
		
		this.m_Collection.m_vec_Element[this.m_idx_vec_Element] = f_Element;
		this.m_idx_vec_Element++;
		
		var f_ElementScript = new classElement_CppScript();
		f_ElementScript.acGen_fromElement(f_Element, f_Count + g_MasterTarget.m_CollectionScript.m_idx_vec_ElementScript);
		
		this.m_CollectionScript.m_vec_ElementScript[this.m_idx_vec_ElementScript] = f_ElementScript;
		this.m_idx_vec_ElementScript++;
		}
}

classTarget_CppScript.prototype.acMergeUpper = function()
{
	for(var f_XY = 0; f_XY < this.m_CollectionScript.m_idx_vec_ElementScript; f_XY++)
		{
		this.m_CollectionScript.m_vec_Element[this.m_CollectionScript.m_idx_vec_Element] = g_MasterTarget.m_CollectionScript.m_vec_Element[f_XY];
		this.m_CollectionScript.m_idx_vec_Element++;
		this.m_CollectionScript.m_vec_ElementScript[this.m_CollectionScript.m_idx_vec_ElementScript] = g_MasterTarget.m_CollectionScript.m_vec_ElementScript[f_XY];
		this.m_CollectionScript.m_idx_vec_ElementScript++;
		}
	
	for(var f_Count = 0; f_Count < g_MasterTarget.m_CollectionScript.m_idx_vec_ElementScript; f_Count++)
		{
		this.m_vec_Name[this.m_idx_vec_Name] = g_MasterTarget.m_vec_Name[f_Count];
		this.m_idx_vec_Name++;
		}
}
			
classTarget_CppScript.prototype.acMergeSave = function()
{
	for(var f_XY = 0; f_XY < this.m_CollectionScript.m_idx_vec_ElementScript; f_XY++)
		{
		g_MasterTarget.m_CollectionScript.m_vec_Element[g_MasterTarget.m_CollectionScript.m_idx_vec_Element] = this.m_CollectionScript.m_vec_Element[f_XY];
		g_MasterTarget.m_CollectionScript.m_idx_vec_Element++;
		g_MasterTarget.m_CollectionScript.m_vec_ElementScript[g_MasterTarget.m_CollectionScript.m_idx_vec_ElementScript] = this.m_CollectionScript.m_vec_ElementScript[f_XY];
		g_MasterTarget.m_CollectionScript.m_idx_vec_ElementScript++;
		}
		
	for(var f_CAP = 0; f_CAP < this.m_idx_vec_Name; f_CAP++)
		{
		g_MasterTarget.m_idx_vec_Name[g_MasterTarget.m_idx_vec_Name] = this.m_vec_Name[f_CAP];
		g_MasterTarget.m_idx_vec_Name++;
		}
}

classTarget_CppScript.prototype.acPsuecute = function(f_Insta, f_Component)
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
					if((f_clsName.m_index_Insta == f_index_Insta) && (f_clsName.m_index_Component == f_index_Component))
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
							var f_NextCom = this.m_CollectionScript.m_vec_ElementScript[f_STR_clsName.m_index_ElementScript].m_vec_Component[f_clsName.m_index_Component];
							
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
					if((f_clsName.m_index_Insta == f_index_Insta) && (f_clsName.m_index_Component == f_index_Component))
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
							var f_NextCom = this.m_CollectionScript.m_vec_ElementScript[f_STR_clsName.m_index_ElementScript].m_vec_Component[f_clsName.m_index_Component];
							
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
					if((f_clsName.m_index_Insta == f_index_Insta) && (f_clsName.m_index_Component == f_index_Component))
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
							var f_NextCom = this.m_CollectionScript.m_vec_ElementScript[f_STR_clsName.m_index_ElementScript].m_vec_Component[f_clsName.m_index_Component];
							
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
					var f_Com = this.m_CollectionScript.m_vec_ElementScript[f_clsName.m_index_ElementScript].m_vec_Component[f_clsName.m_index_Component];
						
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

classTarget_CppScript.prototype.acSetLiveReady = function()
{
	for(var f_CountX = 0; f_CountX < this.m_CollectionScript.m_idx_vec_ElementScript; f_CountX++)
		{
		for(var f_CountY = 0; f_CountY < this.m_CollectionScript.m_vec_ElementScript[f_CountX].m_idx_vec_Component; f_CountY++)
			{
			var f_Component = this.m_CollectionScript.m_vec_ElementScript[f_CountX].m_vec_Component[f_CountY];
			
			for(var f_Helly = 0; f_Helly < f_Component.m_idx_vec_Insta; f_Helly++)
				{
				var f_Insta = f_Component.m_vec_Insta[f_Helly];
				
				f_Insta.m_Value = null;
				}
			}
		}
}

classTarget_CppScript.prototype.acGatherInstas = function()
{
	for(var f_CountX = 0; f_CountX < this.m_CollectionScript.m_idx_vec_ElementScript; f_CountX++)
		{
		for(var f_CountY = 0; f_CountY < this.m_CollectionScript.m_vec_ElementScript[f_CountX].m_idx_vec_Component; f_CountY++)
			{
			var f_Component = this.m_CollectionScript.m_vec_ElementScript[f_CountX].m_vec_Component[f_CountY];
			
			for(var f_Helly = 0; f_Helly < f_Component.m_idx_vec_Insta; f_Helly++)
				{
				var f_Insta = f_Component.m_vec_Insta[f_Helly];
				
				if(f_Insta.m_Type == INSTA_TYPE_VAR)
					{
					g_MasterTarget.m_vec_ResultInsta[g_MasterTarget.m_idx_vec_ResultInsta] = f_Insta;
					g_MasterTarget.m_idx_vec_ResultInsta++;
					}
				}
			}
		}
}

classTarget_CppScript.prototype.acLive_Psuecute = function()
{
	var f_LiveSet = this.acMergeUpper();
	
	var f_InputMap = this.acGen_InputMap();
	
	this.acSetLiveReady();
	
	for(var f_CountX = 0; f_CountX < this.m_CollectionScript.m_idx_vec_ElementScript; f_CountX++)
		{
		for(var f_CountY = 0; f_CountY < this.m_CollectionScript.m_vec_ElementScript[f_CountX].m_idx_vec_Component; f_CountY++)
			{
			var f_Component = this.m_CollectionScript.m_vec_ElementScript[f_CountX].m_vec_Component[f_CountY];
			
			if(f_Component.m_idx_vec_Insta > 0)
				{
				this.acPsuecute(f_Component.m_vec_Insta[0], f_Component);
				}
			
			/*testing insta gen*/
			
			/*for(var f_Helly = 0; f_Helly < f_Component.m_idx_vec_Insta; f_Helly++)
				{
				var f_Insta = f_Component.m_vec_Insta[f_Helly];
				
				this.acPsuecute(f_Insta, f_Component);
				}*/
			}
		}
}

//reveals things
//and that is what to do
//in a code chunk find the two things
function classThing(f_Component)
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

classTarget_CppScript.prototype.acCompare = function(f_Target, f_QualityRank, f_Grade, f_testVolumes)
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

classTarget_CppScript.prototype.acCompareStructure = function(f_Target, f_QualityRank, f_Grade, f_testVolumes)
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

function classInsta(f_String, f_Type)
{
	this.m_Type = f_Type;
	this.m_String = f_String;
	
	this.m_Value = null;
}

function classComponent()
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

classElement_CppScript.prototype.acGen_fromElement = function(f_Element, f_index_ElementScript)
{
	g_SchemaTop = 0;
	g_SchemaRef[0].m_X = 0.120;
	g_SchemaRef[0].m_Y = 0.70;
	g_SchemaRef[0].m_Z = 0.95;
	g_SchemaRef[1].m_X = 0.120;
	g_SchemaRef[1].m_Y = 0.70;
	g_SchemaRef[1].m_Z = 0.95;
	g_SchemaRef[2].m_X = 0.120;
	g_SchemaRef[2].m_Y = 0.70;
	g_SchemaRef[2].m_Z = 0.95;
	g_SchemaSize = 3;

	var f_WordCount = ag_takeMeasurementINTV1(f_Element, 1, 5, 1, 1);
	
	var f_ProgOpen = [];

	for(var f_jet = 0; f_jet < f_WordCount; f_jet++)
		{
		var f_ComponentType = ag_takeMeasurementINTV1(f_Element, 1, 3, 0, 1);
		var f_BitCount = ag_takeMeasurementINTV1(f_Element, 1, 20, 2, 1);

		var f_Component = new classComponent(f_ComponentType);
		f_Component.m_Type = f_ComponentType;
		f_Component.m_Name = ag_NameStamp(ag_takeMeasurement(f_Element), f_ComponentType, f_BitCount);

		for(var f_XYZ = 0; f_XYZ < f_BitCount; f_XYZ++)
			{
			if(f_XYZ == 0)
				{
				if(f_ComponentType == COMPONENT_TYPE_VARINSTA)
					{
					var f_VariableType = ag_takeMeasurementINTV1(f_Element, 1, 1, 0, 1);
					var f_VariableState = ag_takeMeasurementINTV1(f_Element, 1, 2, 3, 1);

					if(f_VariableType == VARIABLE_TYPE_INT)
						{
						//#pragma message("add a few more states, special or otherwise")
						if(f_VariableState == VARIABLE_STATE_NORMAL)
							{
							f_Component.m_vec_String += "int ";
							
							var f_Insta = new classInsta("int", INSTA_TYPE_VAR_INT);
							
							f_Component.m_vec_Insta[f_Component.m_idx_vec_Insta] = f_Insta;
							f_Component.m_idx_vec_Insta++;
							}
						else
							{
							f_Component.m_vec_String += "int* ";
							
							var f_Insta = new classInsta("int*", INSTA_TYPE_VAR_INT_PNTR);
							
							f_Component.m_vec_Insta[f_Component.m_idx_vec_Insta] = f_Insta;
							f_Component.m_idx_vec_Insta++;
							}
						}
					}
				else if(f_ComponentType == COMPONENT_TYPE_FUNCTIONCALL)
					{
					//target restriction point
					var f_FunctionName = this.acMakeUnison(ag_GenerateName(ag_takeMeasurement(f_Element), f_XYZ, INSTA_TYPE_FUNC_CALL, f_Element, f_index_ElementScript));
					f_Component.m_vec_String += f_FunctionName;
					f_Component.m_vec_String += "[";
					f_ProgOpen.push(3);
					
					var f_Insta = new classInsta(f_FunctionName, INSTA_TYPE_FUNC_CALL);
							
					f_Component.m_vec_Insta[f_Component.m_idx_vec_Insta] = f_Insta;
					f_Component.m_idx_vec_Insta++;
					}
				else if(f_ComponentType == COMPONENT_TYPE_FUNCTIONDEF)
					{
					//target restriction point
					var f_FunctionName = this.acMakeUnison(ag_GenerateName(ag_takeMeasurement(f_Element), f_XYZ, INSTA_TYPE_FUNC_CALL, f_Element, f_index_ElementScript));
					f_Component.m_vec_String += "FUNCTION DEFINITION: ";
					f_Component.m_vec_String += f_FunctionName;
					f_Component.m_vec_String += "(";
					f_ProgOpen.push(4);
					
					var f_Insta = new classInsta(f_FunctionName, INSTA_TYPE_FUNC_CALL);
							
					f_Component.m_vec_Insta[f_Component.m_idx_vec_Insta] = f_Insta;
					f_Component.m_idx_vec_Insta++;
					}

				if(f_BitCount == 1) //1
					{
					f_Component.m_vec_String += this.acMakeUnison(ag_GenerateName(ag_takeMeasurement(f_Element, f_XYZ, INSTA_TYPE_FUNC_DEF, f_Element, f_index_ElementScript)));
					}
				else
					{
					f_Component.m_vec_String += " = ";
					
					var f_Insta = new classInsta(" = ", INSTA_TYPE_OPER_EQUALS);
							
					f_Component.m_vec_Insta[f_Component.m_idx_vec_Insta] = f_Insta;
					f_Component.m_idx_vec_Insta++;
					}
				}
			else
				{
				if(f_BitCount == COMPONENT_CNT_BASE) //2
					{
					f_Component.m_vec_String += this.acMakeUnison(ag_GenerateValue(ag_takeMeasurement(f_Element)));
					}
				else
					{
					f_Component.m_vec_String += this.acMakeUnison(ag_GenerateName(ag_takeMeasurement(f_Element)));

					var f_AddType = ag_takeMeasurementINTV1(f_Element, 1, 3, 2, 1);
							
					if(f_AddType == COMPONENT_ELEMENT_TYPE_VARIABLE)
						{
						var f_VariableName = this.acMakeUnison(ag_GenerateName(ag_takeMeasurement(f_Element), f_XYZ, INSTA_TYPE_VAR, f_Element));
						
						f_Component.m_vec_String += f_VariableName;
						
						var f_Insta = new classInsta(f_VariableName, INSTA_TYPE_VAR);
							
						f_Component.m_vec_Insta[f_Component.m_idx_vec_Insta] = f_Insta;
						f_Component.m_idx_vec_Insta++;
						}
					else if(f_AddType == COMPONENT_ELEMENT_TYPE_FUNCTION) 
						{
						var f_FunctionName = this.acMakeUnison(ag_GenerateName(ag_takeMeasurement(f_Element), f_XYZ, INSTA_TYPE_FUNC_CALL, f_Element));
						
						f_Component.m_vec_String += f_FunctionName;
						f_Component.m_vec_String += "(";
						f_ProgOpen.push(3);
						
						var f_Insta = new classInsta(f_FunctionName, INSTA_TYPE_FUNC_CALL);
							
						f_Component.m_vec_Insta[f_Component.m_idx_vec_Insta] = f_Insta;
						f_Component.m_idx_vec_Insta++;
						}
					else if(f_AddType == COMPONENT_ELEMENT_TYPE_PROG)
						{
						var f_ProgType = ag_takeMeasurementINTV1(f_Element, 1, 3, 0, 1);

						if(f_ProgType == PROG_TYPE_OPERATOR)
							{
							var f_OperatorType = ag_takeMeasurementINTV1(f_Element, 1, 1, 0, 1);

							if(f_OperatorType == OPERATOR_TYPE_PLUS)
								{
								f_Component.m_vec_String += " + ";
								}
							else if(f_OperatorType == PROG_TYPE_BKT)
								{
								f_ProgOpen.push(1);
								f_Component.m_vec_String += "[";
								}
							else if(f_OperatorType == PROG_TYPE_PAREN)
								{
								f_ProgOpen.push(2);
								f_Component.m_vec_String += " {";
								}
							}
						}
					}

				if(f_ProgOpen.length >= 1)
					{
					if((f_ProgOpen[f_ProgOpen.length - 1] == 1))
						{
						f_Component.m_vec_String += "]";
						f_ProgOpen.pop();
						}

					if((f_ProgOpen[f_ProgOpen.length - 1] == 2))
						{
						f_Component.m_vec_String += "}";
						f_ProgOpen.pop();
						}
						
					if((f_ProgOpen[f_ProgOpen.length - 1] == 3))
						{
						f_Component.m_vec_String += ")";
						f_ProgOpen.pop();
						}
						
					if((f_ProgOpen[f_ProgOpen.length - 1] == 4))
						{
						f_Component.m_vec_String += ")";
						f_ProgOpen.pop();
						}
					}
				}
			}

		 ////////
		//Post process events
		f_Component.m_vec_String.push_back(";");

		f_Component.m_vec_String = "";
		for(var f_Comb = 0; f_Comb < f_Component.m_vec_String.length; f_Comb++)
			{
			f_Component.m_String += f_Component.m_vec_String[f_Comb];
			}

//#if 0
		//m_vec_Code.push_back(new Code(m_String));
		//m_CodeLine = new CodeLine(m_vec_Code);

		//CodeLine* f_CodeLine = NULL;
		//int f_Chk = 0;

		//f_CodeLine = new CodeLine(f_Line, m_Chk, m_System);

		//m_vec_CodeLine.push_back(f_CodeLine);
//#endif

		this.m_vec_Component[this.m_idx_vec_Component] = f_Component;
		this.m_idx_vec_Component++;
		}

	this.m_Data = "";

	for(var f_RS = 0; f_RS < this.m_vec_Component.length; f_RS++)
		{
		this.m_Data += this.m_vec_Component[f_RS].m_String;
		}
		
	  ////////////////
	 //
	// The Producers
	for(var f_XY = 0; f_XY < this.m_idx_vec_Component; f_XY++)
		{
		var f_Component = this.m_vec_Component[f_XY];
		
		var f_Thing = new classThing(f_Component);
		
		f_Component.m_vec_Thing[f_Component.m_idx_vec_Thing] = f_Thing;
		f_Component.m_idx_vec_Thing++;
		}

//#if 1
	//g_hasha.init(); //reset hasher state
	//g_hasha.process(m_Data.begin(), m_Data.end());
	//g_hasha.finish();
	//picosha2::get_hash_hex_string(g_hasha, m_Hash);
//#endif
}

function ag_takeMeasurement(f_Vertex)
{
	if(g_SchemaTop == 0)
		{
		var f_CharAry = [];
		var f_idx_Char = 0;
		
		for(var f_helly = 0; f_helly < f_Vertex.m_idx_vec_Vertex; f_helly++)
			{
			g_SchemaRef[g_SchemaTop].m_X = g_SchemaRef[g_SchemaTop].m_X + (f_Vertex.m_vec_Vertex[f_helly].m_X * 0.3);
			g_SchemaRef[g_SchemaTop].m_Y = g_SchemaRef[g_SchemaTop].m_Y + (f_Vertex.m_vec_Vertex[f_helly].m_Y * 0.1);
			g_SchemaRef[g_SchemaTop].m_Z = g_SchemaRef[g_SchemaTop].m_Z + (f_Vertex.m_vec_Vertex[f_helly].m_Z * 0.3);

			f_CharAry.push(((g_SchemaRef[g_SchemaTop] - f_Vertex.m_vec_Vertex[f_helly]).dot()) * 32.0);
			f_idx_Char++;
			}
			
		var f_vec_ResultInt = [];
		var f_idx_vec_ResultInt = 0;
		
		for(var f_forge = 0; f_forge < f_idx_Char; f_forge++)
			{
			var f_strint = parseInt(f_Char[f_forge]);
			f_ResultInt.push(f_strint);
			f_idx_vec_ResultInt++;
			}
			
		var f_Result = "";	
		var f_CountMain = 0;
		var f_Scope = true;
		for(var f_Splace = 0; f_Splace < f_idx_vec_ResultInt; f_Splace++)
			{
			f_Result += String.fromCharCode(f_ResultInt[f_Splace]);
			f_CountMain++;
			
			if(f_Scope == true)
				{
				if(f_CountMain >= 2)
					{
					var f_Finger = Math.random() * 50.0;
					
					if(f_Finger >= 0.0 && f_Finger < 10.0)
						{
						f_Result += "a";
						}
					else if(f_Finger >= 10.0 && f_Finger < 20.0)
						{
						f_Result += "e";
						}
					else if(f_Finger >= 20.0 && f_Finger < 30.0)
						{
						f_Result += "i";
						}
					else if(f_Finger >= 30.0 && f_Finger < 40.0)
						{
						f_Result += "o";
						}
					else if(f_Finger >= 40.0 && f_Finger < 50.0)
						{
						f_Result += "u";
						}
						
					f_Scope = false;
					}
				}
			else
				{
				var f_Finger = Math.random() * 50.0;
					
				if(f_Finger >= 0.0 && f_Finger < 10.0)
					{
					f_Result += "a";
					}
				else if(f_Finger >= 10.0 && f_Finger < 20.0)
					{
					f_Result += "e";
					}
				else if(f_Finger >= 20.0 && f_Finger < 30.0)
					{
					f_Result += "i";
					}
				else if(f_Finger >= 30.0 && f_Finger < 40.0)
					{
					f_Result += "o";
					}
				else if(f_Finger >= 40.0 && f_Finger < 50.0)
					{
					f_Result += "u";
					}
				}
			}

		return f_Result;
		}
	else if(g_SchemaTop == 1)
		{
		var f_CharAry = [];
		var f_idx_Char = 0;

		for(var f_helly = 0; f_helly < f_Vertex.m_idx_vec_Vertex; f_helly++)
			{
			g_SchemaRef[g_SchemaTop].m_X = g_SchemaRef[g_SchemaTop].m_X + (f_Vertex.m_vec_Vertex[f_helly].m_X * 0.3);
			g_SchemaRef[g_SchemaTop].m_Y = g_SchemaRef[g_SchemaTop].m_Y + (f_Vertex.m_vec_Vertex[f_helly].m_Y * 0.1);
			g_SchemaRef[g_SchemaTop].m_Z = g_SchemaRef[g_SchemaTop].m_Z + (f_Vertex.m_vec_Vertex[f_helly].m_Z * 0.3);
			
			var f_Float = (g_SchemaRef[g_SchemaTop] - f_Vertex.m_vec_Element[f_helly].m_vec_Vertex[ag_takeMeasurementINTV1(f_Vertex.m_vec_Element[f_helly], 0, f_Vertex.m_vec_Element[f_helly].m_idx_vec_Vertex, 0)]).dot();

			f_CharAry.push(f_Float * 32.0);
			f_idx_Char++;
			}
			
		var f_vec_ResultInt = [];
		var f_idx_vec_ResultInt = 0;
		
		for(var f_forge = 0; f_forge < f_idx_Char; f_forge++)
			{
			var f_strint = parseInt(f_Char[f_forge]);
			f_ResultInt.push(f_strint);
			f_idx_vec_ResultInt++;
			}
			
		var f_Result = "";	
		var f_CountMain = 0;
		var f_Scope = true;
		for(var f_Splace = 0; f_Splace < f_idx_vec_ResultInt; f_Splace++)
			{
			f_Result += String.fromCharCode(f_ResultInt[f_Splace]);
			f_CountMain++;
			
			if(f_Scope == true)
				{
				if(f_CountMain >= 2)
					{
					var f_Finger = Math.random() * 50.0;
					
					if(f_Finger >= 0.0 && f_Finger < 10.0)
						{
						f_Result += "a";
						}
					else if(f_Finger >= 10.0 && f_Finger < 20.0)
						{
						f_Result += "e";
						}
					else if(f_Finger >= 20.0 && f_Finger < 30.0)
						{
						f_Result += "i";
						}
					else if(f_Finger >= 30.0 && f_Finger < 40.0)
						{
						f_Result += "o";
						}
					else if(f_Finger >= 40.0 && f_Finger < 50.0)
						{
						f_Result += "u";
						}
						
					f_Scope = false;
					}
				}
			else
				{
				var f_Finger = Math.random() * 50.0;
					
				if(f_Finger >= 0.0 && f_Finger < 10.0)
					{
					f_Result += "a";
					}
				else if(f_Finger >= 10.0 && f_Finger < 20.0)
					{
					f_Result += "e";
					}
				else if(f_Finger >= 20.0 && f_Finger < 30.0)
					{
					f_Result += "i";
					}
				else if(f_Finger >= 30.0 && f_Finger < 40.0)
					{
					f_Result += "o";
					}
				else if(f_Finger >= 40.0 && f_Finger < 50.0)
					{
					f_Result += "u";
					}
				}
			}

		return f_Result;
		}

	return "abeebc";
}

//element level specify schema
function ag_takeMeasurementINTV1(f_Vertex, f_StartRange, f_EndRange, f_WeightRangetoStart, f_Depth) // scale resolution 1-3
{
	var m_Depth = f_Depth;
	m_Depth--;
	
	if(m_Depth >= 1)
		{
		if(g_SchemaTop == 0)
			{		//All distance test
			var f_Float = 0;
			for(var f_helly = 0; f_helly < f_Vertex.m_idx_vec_Vertex; f_helly++)
				{
				g_SchemaRef[g_SchemaTop].m_X = g_SchemaRef[ag_takeMeasurementINTV1(f_Vertex, 0, g_SchemaSize, 3, m_Depth)].m_X + (f_Vertex.m_vec_Vertex[f_helly].m_X * 0.3);
				g_SchemaRef[g_SchemaTop].m_Y = g_SchemaRef[ag_takeMeasurementINTV1(f_Vertex, 0, g_SchemaSize, 3, m_Depth)].m_Y + (f_Vertex.m_vec_Vertex[f_helly].m_Y * 0.1);
				g_SchemaRef[g_SchemaTop].m_Z = g_SchemaRef[ag_takeMeasurementINTV1(f_Vertex, 0, g_SchemaSize, 3, m_Depth)].m_Z + (f_Vertex.m_vec_Vertex[f_helly].m_Z * 0.3);

				var f_Vec = new BiVector();
				
				f_Vec.m_X = g_SchemaRef[g_SchemaTop].m_X - f_Vertex.m_vec_Vertex[f_helly].m_X;
				f_Vec.m_Y = g_SchemaRef[g_SchemaTop].m_Y - f_Vertex.m_vec_Vertex[f_helly].m_Y;
				f_Vec.m_Z = g_SchemaRef[g_SchemaTop].m_Z - f_Vertex.m_vec_Vertex[f_helly].m_Z;
				
				f_Float += f_Vec.dot();
				}

			var f_Theta = Math.sin(f_Float);
			var f_Int = (f_Theta * f_EndRange) + f_StartRange;
			f_Int = f_Int - (f_WeightRangetoStart / 2);
			return f_Int;
			}
		else if(g_SchemaTop == 1)
			{
			var f_Int = 0;
			var f_IntMax = 10 * 150 * 4;
			for(var f_helly = 0; f_helly < f_Vertex.m_idx_vec_Element; f_helly++)
				{
				for(var f_jet = 0; f_jet < f_Vertex.m_idx_vec_Element; f_jet++)
					{
					g_SchemaRef[g_SchemaTop].m_X = g_SchemaRef[ag_takeMeasurementINTV1(f_Vertex, 0, g_SchemaSize, 3, m_Depth)].m_X + (f_Vertex.m_vec_Vertex[f_helly].m_X * 0.3);
					g_SchemaRef[g_SchemaTop].m_Y = g_SchemaRef[ag_takeMeasurementINTV1(f_Vertex, 0, g_SchemaSize, 3, m_Depth)].m_Y + (f_Vertex.m_vec_Vertex[f_helly].m_Y * 0.1);
					g_SchemaRef[g_SchemaTop].m_Z = g_SchemaRef[ag_takeMeasurementINTV1(f_Vertex, 0, g_SchemaSize, 3, m_Depth)].m_Z + (f_Vertex.m_vec_Vertex[f_helly].m_Z * 0.3);

					f_Int += f_Vertex.m_vec_Element[f_helly].m_Volume * f_helly;
					}
				}
			var f_Result = (((f_Int / f_IntMax) / (f_WeightRangetoStart + 1)) * f_EndRange) + f_StartRange;
			return f_Result;
			}
		else if(g_SchemaTop == 2)
			{
			var f_Int = 0;
			var f_IntMax = 10 * 150 * 4;
			for(var f_helly = 0; f_helly < f_Vertex.m_idx_vec_Element; f_helly++)
				{
				for(var f_jet = 0; f_jet < f_Vertex.m_idx_vec_Element; f_jet++)
					{
					g_SchemaRef[g_SchemaTop].m_X = g_SchemaRef[ag_takeMeasurementINTV1(f_Vertex, 0, g_SchemaSize, 3, m_Depth)].m_X + (f_Vertex.m_vec_Vertex[f_helly].m_X * 0.3);
					g_SchemaRef[g_SchemaTop].m_Y = g_SchemaRef[ag_takeMeasurementINTV1(f_Vertex, 0, g_SchemaSize, 3, m_Depth)].m_Y + (f_Vertex.m_vec_Vertex[f_helly].m_Y * 0.1);
					g_SchemaRef[g_SchemaTop].m_Z = g_SchemaRef[ag_takeMeasurementINTV1(f_Vertex, 0, g_SchemaSize, 3, m_Depth)].m_Z + (f_Vertex.m_vec_Vertex[f_helly].m_Z * 0.3);

					f_Int += f_Vertex.m_vec_Element[f_helly].m_Volume * f_helly;
					}
				}
			var f_Result = (((f_Int / f_IntMax) / (f_WeightRangetoStart + 1)) * f_EndRange) + f_StartRange;
			return f_Result;
			}
		}

	return (Math.random() % f_EndRange) + f_StartRange;
}

function ag_NameStamp(f_Measurement, f_Type, f_BitCount)
{
	var f_Result = "";
	g_ComponentStamp++;

	if(f_Type == COMPONENT_TYPE_VARINSTA)
		{
		var f_Char = "";
		f_Char = "Variable" + g_ComponentStamp + "-" + f_BitCount;
		f_Result += f_Char;
		}
	if(f_Type == COMPONENT_TYPE_FUNCTIONCALL)
		{
		var f_Char = "";
		f_Char = "FunctionCall" + g_ComponentStamp + "-" + f_BitCount;
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