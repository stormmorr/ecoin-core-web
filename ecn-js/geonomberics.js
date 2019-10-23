/*

classtarget.js - osirem.com
Copyright OSIREM LTD (C) 2016
www.osirem.com www.qage.org www.geopomp.com

This source is proprietary, and cannot be used, in part or in full without
the express permission of the original author. The original author retain the
rights to use, modify, and/or relicense this code without notice.

*/

var g_ComponentStamp = 0;

var g_SchemaTop = 0;
var g_SchemaRef = [];

var COSA = 3458697;

function classElement_Cpp_Script()
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

function geonombericEQ(f_X, f_advancePeriod)
{
	var t = (new Date()).getTime() + f_advancePeriod;
	
	var f_Result = new BiVector();
	var f_Finger = Math.sin(f_X * (t / COSA);
	
	var f_Bound = 0.5;
	
	if(f_Finger > f_Bound)
		{
		return true;
		}
	else
		{
		return false;
		}
		
	return false;
}

function geo_nomboricOsc(f_geo, f_Range)
{
	var t = (new Date()).getTime() + f_advancePeriod;
	
	var f_AdvancedStack = 53.7891;
	var f_Result = new BiVector();
	var f_Finger = Math.asinh(f_geo * (t * f_AdvancedStack));
	
	f_Finger *= f_Range;
	
	var f_Osc1 = 
	
	return f_Finger;
}