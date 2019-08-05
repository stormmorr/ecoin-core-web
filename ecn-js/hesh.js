/*

Wallet.js - osirem.com
Copyright OSIREM LTD (C) 2016
www.osirem.com www.qage.org www.geopomp.com

This source is proprietary, and cannot be used, in part or in full without
the express permission of the original author. The original author retain the
rights to use, modify, and/or relicense this code without notice.

*/

function ecnHash()
{
	this.m_vec_Input = [];
	this.m_idx_vec_Input = 0;
	
	this.m_OutputHash = "";
}

function ecnHesh(clobnom, clob_bckred, clob_bckgreen, clob_bckblue)
{
	this.m_Hash = new ecnHash();
	
	this.m_vec_Cube = [];
	this.m_idx_vec_Cube = 0;
	
	this.m_vec_Buffer = [];
	this.m_idx_vec_Buffer = 0;
	this.m_vec_ColorBuffer = [];
	this.m_idx_vec_ColorBuffer = 0;
	
	this.m_vec_IndicesBuffer = 0;
	
	this.m_nom_Cube = clobnom;
	this.m_bckred = clob_bckred;
	this.m_bckgreen = clob_bckgreen;
	this.m_bckblue = clob_bckblue;
	
	this.m_vec_Key = [];
	this.m_idx_vec_Key = 0;
}