/*

classtarget.js - osirem.com
Copyright OSIREM LTD (C) 2016
www.osirem.com www.qage.org www.geopomp.com

This source is proprietary, and cannot be used, in part or in full without
the express permission of the original author. The original author retain the
rights to use, modify, and/or relicense this code without notice.

*/

var g_CoolDown = 20000;
var g_CoolBoost = 25.0;

var g_RetargetingBoostDown = 1000;
var g_RetargetingBoost = 0;

function classCorner(f_Corner, f_X, f_Y, f_Z)
{
	this.m_Corner = f_Corner;
	this.m_X = f_X;
	this.m_Y = f_Y;
	this.m_Z = f_Z;
}

function classSurface()
{
	this.m_PropPlane = 0;
	this.m_Position = new BiVector(0.0);
	this.m_Orientation = 0;
}

classSurface.prototype.acSetPos = function(f_Element)
{
	this.m_Position = f_Element.m_Center;
}

function classLeg()
{
	this.m_Width = 0.0;
	this.m_Height = 0.0;
	this.m_Length = 0.0;
	
	this.m_Position = new BiVector(0.0);
	this.m_Orientation = 0;
}

classLeg.prototype.acSetPos = function(f_Element)
{
	this.m_Position = f_Element.m_Center;
}

function classResult()
{
	this.m_vec_Corner = [];
	this.m_idx_vec_Corner = 0;

	this.m_Dist01 = 0.0;
	this.m_Dist23 = 0.0;
	this.m_Dist45 = 0.0;
	this.m_Dist67 = 0.0;

	this.m_Dist02 = 0.0;
	this.m_Dist13 = 0.0;
	this.m_Dist46 = 0.0;
	this.m_Dist57 = 0.0;

	this.m_Dist04 = 0.0;
	this.m_Dist15 = 0.0;
	this.m_Dist26 = 0.0;
	this.m_Dist37 = 0.0;

	this.m_Dist01234567 = 0.0;
	this.m_Dist02134657 = 0.0;
	this.m_Dist04152637 = 0.0;

	this.m_SurfToLegRatio = 0.0;
	this.m_SurfToLegRatioX = 0.0;
	this.m_SurfToLegRatioY = 0.0;
	this.m_SurfToLegRatioZ = 0.0;
}

function classElement()
{
	this.m_vec_Element = [];
	this.m_idx_vec_Element = 0;
	this.m_vec_Surface = [];
	this.m_idx_vec_Surface = 0;
	this.m_vec_Leg = [];
	this.m_idx_vec_Leg = 0;
	
	this.m_vec_Collission = [];
	this.m_idx_vec_Collission = 0;
	this.m_vec_IsIn = [];
	this.m_idx_vec_IsIn = 0;
	
	this.m_vec_Result = [];
	this.m_idx_vec_Result = 0;
	
	//Values
	this.m_vec_Vertex = [];
	this.m_idx_vec_Vertex = 0;
	this.m_vec_Color = [];
	this.m_idx_vec_Color = 0;
	
	this.m_aabb = new aabb();
	
	this.m_Center = new BiVector(0.0);
	this.m_Volume = 0.0;
}

classElement.prototype.acFromBicycle = function(f_Bicycle)
{	
	this.m_vec_Vertex[0] = f_Bicycle.m_vec_Vertex[0];
	this.m_vec_Vertex[1] = f_Bicycle.m_vec_Vertex[1];
	this.m_vec_Vertex[2] = f_Bicycle.m_vec_Vertex[2];
	this.m_vec_Vertex[3] = f_Bicycle.m_vec_Vertex[3];
	this.m_vec_Vertex[4] = f_Bicycle.m_vec_Vertex[4];
	this.m_vec_Vertex[5] = f_Bicycle.m_vec_Vertex[5];
	this.m_vec_Vertex[6] = f_Bicycle.m_vec_Vertex[6];
	this.m_vec_Vertex[7] = f_Bicycle.m_vec_Vertex[7];

	this.m_vec_Color[0] = f_Bicycle.m_vec_Color[0];
	this.m_vec_Color[1] = f_Bicycle.m_vec_Color[1];
	this.m_vec_Color[2] = f_Bicycle.m_vec_Color[2];
	this.m_vec_Color[3] = f_Bicycle.m_vec_Color[3];
	this.m_vec_Color[4] = f_Bicycle.m_vec_Color[4];
	this.m_vec_Color[5] = f_Bicycle.m_vec_Color[5];
	this.m_vec_Color[6] = f_Bicycle.m_vec_Color[6];
	this.m_vec_Color[7] = f_Bicycle.m_vec_Color[7];
	
	for(var f_CountVertex = 0; f_CountVertex < 8; f_CountVertex++)
		{
		this.m_aabb.add(this.m_vec_Vertex[f_CountVertex]);
		}

	this.m_Center = this.m_aabb.center();
	this.m_Volume = this.m_aabb.volume();
}

classElement.prototype.acFromVolume = function(f_Volume)
{	
	this.m_Volume = f_Volume;
}

classElement.prototype.acColorise = function(f_R, f_G, f_B, f_A)
{
	this.m_R = f_R;
	this.m_G = f_G;
	this.m_B = f_B;
	this.m_A = f_A;
}

classElement.prototype.acCompare = function(f_Element, f_QualityRank, f_testVolumes)
{
	var f_Mark = 0.0;

	if(this.m_idx_vec_Element < f_Element.m_idx_vec_Element)
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

classElement.prototype.acStructuredAnalysis = function()
{
	var f_Result = new classResult();

	var f_Corner1 = new classCorner(this.m_vec_Vertex[0], this.m_vec_Vertex[1], this.m_vec_Vertex[4], this.m_vec_Vertex[2]);
	f_Result.m_vec_Corner[f_Result.m_idx_vec_Corner++] = f_Corner1;

	var f_Corner2 = new classCorner(this.m_vec_Vertex[1], this.m_vec_Vertex[0], this.m_vec_Vertex[5], this.m_vec_Vertex[3]);
	f_Result.m_vec_Corner[f_Result.m_idx_vec_Corner++] = f_Corner2;

	var f_Corner3 = new classCorner(this.m_vec_Vertex[2], this.m_vec_Vertex[3], this.m_vec_Vertex[6], this.m_vec_Vertex[0]);
	f_Result.m_vec_Corner[f_Result.m_idx_vec_Corner++] = f_Corner3;

	var f_Corner4 = new classCorner(this.m_vec_Vertex[3], this.m_vec_Vertex[2], this.m_vec_Vertex[7], this.m_vec_Vertex[1]);
	f_Result.m_vec_Corner[f_Result.m_idx_vec_Corner++] = f_Corner4;

	var f_Corner5 = new classCorner(this.m_vec_Vertex[4], this.m_vec_Vertex[5], this.m_vec_Vertex[0], this.m_vec_Vertex[6]);
	f_Result.m_vec_Corner[f_Result.m_idx_vec_Corner++] = f_Corner5;

	var f_Corner6 = new classCorner(this.m_vec_Vertex[5], this.m_vec_Vertex[4], this.m_vec_Vertex[1], this.m_vec_Vertex[7]);
	f_Result.m_vec_Corner[f_Result.m_idx_vec_Corner++] = f_Corner6;

	var f_Corner7 = new classCorner(this.m_vec_Vertex[6], this.m_vec_Vertex[7], this.m_vec_Vertex[2], this.m_vec_Vertex[4]);
	f_Result.m_vec_Corner[f_Result.m_idx_vec_Corner++] = f_Corner7;

	var f_Corner8 = new classCorner(this.m_vec_Vertex[7], this.m_vec_Vertex[6], this.m_vec_Vertex[3], this.m_vec_Vertex[5]);
	f_Result.m_vec_Corner[f_Result.m_idx_vec_Corner++] = f_Corner8;

	var f_Vec = new BiVector(0.0);

	f_Vec.m_X = this.m_vec_Vertex[1].m_X - this.m_vec_Vertex[0].m_X;
	f_Vec.m_Y = this.m_vec_Vertex[1].m_Y - this.m_vec_Vertex[0].m_Y;
	f_Vec.m_Z = this.m_vec_Vertex[1].m_Z - this.m_vec_Vertex[0].m_Z;
	
	f_Result.m_Dist01 = f_Vec.acLength();

	f_Vec.m_X = this.m_vec_Vertex[2].m_X - this.m_vec_Vertex[3].m_X;
	f_Vec.m_Y = this.m_vec_Vertex[2].m_Y - this.m_vec_Vertex[3].m_Y;
	f_Vec.m_Z = this.m_vec_Vertex[2].m_Z - this.m_vec_Vertex[3].m_Z;
	
	f_Result.m_Dist23 = f_Vec.acLength();
	
	f_Vec.m_X = this.m_vec_Vertex[4].m_X - this.m_vec_Vertex[5].m_X;
	f_Vec.m_Y = this.m_vec_Vertex[4].m_Y - this.m_vec_Vertex[5].m_Y;
	f_Vec.m_Z = this.m_vec_Vertex[4].m_Z - this.m_vec_Vertex[5].m_Z;

	f_Result.m_Dist45 = f_Vec.acLength();
	
	f_Vec.m_X = this.m_vec_Vertex[6].m_X - this.m_vec_Vertex[7].m_X;
	f_Vec.m_Y = this.m_vec_Vertex[6].m_Y - this.m_vec_Vertex[7].m_Y;
	f_Vec.m_Z = this.m_vec_Vertex[6].m_Z - this.m_vec_Vertex[7].m_Z;

	f_Result.m_Dist67 = f_Vec.acLength();
	
	f_Vec.m_X = this.m_vec_Vertex[0].m_X - this.m_vec_Vertex[2].m_X;
	f_Vec.m_Y = this.m_vec_Vertex[0].m_Y - this.m_vec_Vertex[2].m_Y;
	f_Vec.m_Z = this.m_vec_Vertex[0].m_Z - this.m_vec_Vertex[2].m_Z;

	f_Result.m_Dist02 = f_Vec.acLength();
	
	f_Vec.m_X = this.m_vec_Vertex[1].m_X - this.m_vec_Vertex[3].m_X;
	f_Vec.m_Y = this.m_vec_Vertex[1].m_Y - this.m_vec_Vertex[3].m_Y;
	f_Vec.m_Z = this.m_vec_Vertex[1].m_Z - this.m_vec_Vertex[3].m_Z;

	f_Result.m_Dist13 = f_Vec.acLength();
	
	f_Vec.m_X = this.m_vec_Vertex[4].m_X - this.m_vec_Vertex[6].m_X;
	f_Vec.m_Y = this.m_vec_Vertex[4].m_Y - this.m_vec_Vertex[6].m_Y;
	f_Vec.m_Z = this.m_vec_Vertex[4].m_Z - this.m_vec_Vertex[6].m_Z;

	f_Result.m_Dist46 = f_Vec.acLength();
	
	f_Vec.m_X = this.m_vec_Vertex[5].m_X - this.m_vec_Vertex[7].m_X;
	f_Vec.m_Y = this.m_vec_Vertex[5].m_Y - this.m_vec_Vertex[7].m_Y;
	f_Vec.m_Z = this.m_vec_Vertex[5].m_Z - this.m_vec_Vertex[7].m_Z;

	f_Result.m_Dist57 = f_Vec.acLength();
	
	f_Vec.m_X = this.m_vec_Vertex[0].m_X - this.m_vec_Vertex[4].m_X;
	f_Vec.m_Y = this.m_vec_Vertex[0].m_Y - this.m_vec_Vertex[4].m_Y;
	f_Vec.m_Z = this.m_vec_Vertex[0].m_Z - this.m_vec_Vertex[4].m_Z;

	f_Result.m_Dist04 = f_Vec.acLength();
	
	f_Vec.m_X = this.m_vec_Vertex[1].m_X - this.m_vec_Vertex[5].m_X;
	f_Vec.m_Y = this.m_vec_Vertex[1].m_Y - this.m_vec_Vertex[5].m_Y;
	f_Vec.m_Z = this.m_vec_Vertex[1].m_Z - this.m_vec_Vertex[5].m_Z;

	f_Result.m_Dist15 = f_Vec.acLength();
	
	f_Vec.m_X = this.m_vec_Vertex[2].m_X - this.m_vec_Vertex[6].m_X;
	f_Vec.m_Y = this.m_vec_Vertex[2].m_Y - this.m_vec_Vertex[6].m_Y;
	f_Vec.m_Z = this.m_vec_Vertex[2].m_Z - this.m_vec_Vertex[6].m_Z;

	f_Result.m_Dist26 = f_Vec.acLength();
	
	f_Vec.m_X = this.m_vec_Vertex[3].m_X - this.m_vec_Vertex[7].m_X;
	f_Vec.m_Y = this.m_vec_Vertex[3].m_Y - this.m_vec_Vertex[7].m_Y;
	f_Vec.m_Z = this.m_vec_Vertex[3].m_Z - this.m_vec_Vertex[7].m_Z;

	f_Result.m_Dist37 = f_Vec.acLength();

	f_Result.m_Dist01234567 = (f_Result.m_Dist01 + f_Result.m_Dist23 + f_Result.m_Dist45 + f_Result.m_Dist67) / 4.0; //X
	f_Result.m_Dist02134657 = (f_Result.m_Dist02 + f_Result.m_Dist13 + f_Result.m_Dist46 + f_Result.m_Dist57) / 4.0; //Z
	f_Result.m_Dist04152637 = (f_Result.m_Dist04 + f_Result.m_Dist15 + f_Result.m_Dist26 + f_Result.m_Dist37) / 4.0; //Y

	f_Result.m_SurfToLegRatioX = ((f_Result.m_Dist01234567 - f_Result.m_Dist02134657) + (f_Result.m_Dist01234567 - f_Result.m_Dist04152637));
	f_Result.m_SurfToLegRatioZ = ((f_Result.m_Dist02134657 - f_Result.m_Dist01234567) + (f_Result.m_Dist02134657 - f_Result.m_Dist04152637));
	f_Result.m_SurfToLegRatioY = ((f_Result.m_Dist04152637 - f_Result.m_Dist02134657) + (f_Result.m_Dist04152637 - f_Result.m_Dist01234567));

	if((f_Result.m_SurfToLegRatioX > f_Result.m_SurfToLegRatioY) && (f_Result.m_SurfToLegRatioX > f_Result.m_SurfToLegRatioZ))
		{
		if((f_Result.m_SurfToLegRatioY < f_Result.m_SurfToLegRatioX) && (f_Result.m_SurfToLegRatioY < f_Result.m_SurfToLegRatioZ))
			{
			f_Result.m_SurfToLegRatio = f_Result.m_SurfToLegRatioY / f_Result.m_SurfToLegRatioX;
			}
		else if((f_Result.m_SurfToLegRatioZ < f_Result.m_SurfToLegRatioX) && (f_Result.m_SurfToLegRatioZ < f_Result.m_SurfToLegRatioY))
			{
			f_Result.m_SurfToLegRatio = f_Result.m_SurfToLegRatioZ / f_Result.m_SurfToLegRatioX;
			}
		}
	else if((f_Result.m_SurfToLegRatioY > f_Result.m_SurfToLegRatioX) && (f_Result.m_SurfToLegRatioY > f_Result.m_SurfToLegRatioZ))
		{
		if((f_Result.m_SurfToLegRatioX < f_Result.m_SurfToLegRatioY) && (f_Result.m_SurfToLegRatioX < f_Result.m_SurfToLegRatioZ))
			{
			f_Result.m_SurfToLegRatio = f_Result.m_SurfToLegRatioX / f_Result.m_SurfToLegRatioY;
			}
		else if((f_Result.m_SurfToLegRatioZ < f_Result.m_SurfToLegRatioX) && (f_Result.m_SurfToLegRatioZ < f_Result.m_SurfToLegRatioY))
			{
			f_Result.m_SurfToLegRatio = f_Result.m_SurfToLegRatioZ / f_Result.m_SurfToLegRatioY;
			}
		}
	else if((f_Result.m_SurfToLegRatioZ > f_Result.m_SurfToLegRatioY) && (f_Result.m_SurfToLegRatioZ > f_Result.m_SurfToLegRatioX))
		{
		if((f_Result.m_SurfToLegRatioX < f_Result.m_SurfToLegRatioY) && (f_Result.m_SurfToLegRatioX < f_Result.m_SurfToLegRatioZ))
			{
			f_Result.m_SurfToLegRatio = f_Result.m_SurfToLegRatioX / f_Result.m_SurfToLegRatioZ;
			}
		else if((f_Result.m_SurfToLegRatioY < f_Result.m_SurfToLegRatioX) && (f_Result.m_SurfToLegRatioY < f_Result.m_SurfToLegRatioZ))
			{
			f_Result.m_SurfToLegRatio = f_Result.m_SurfToLegRatioY / f_Result.m_SurfToLegRatioZ;
			}
		}

	this.m_vec_Result[this.m_idx_vec_Result++] = f_Result;
	
	return f_Result;
}

/*class classElementScript
	{
	public:
		classElementScript(classElementScript* f_ElementScript) : m_Type(f_ElementScript->m_Type), m_Status(f_ElementScript->m_Status)
			{
			m_vec_Component.clear();

			for(int f_Str = 0; f_Str < f_ElementScript->m_vec_Component.size(); f_Str++)
				{
				m_vec_Component.push_back(f_ElementScript->m_vec_Component[f_Str]);
				}

			//m_Orten = f_Element->m_Orten;
			};
		classElementScript(classElement* f_Element) : m_Type(f_Element->m_Type), m_Status(f_Element->m_Status)
			{
			acGen_fromElement(f_Element);

			//m_Orten = f_Element->m_Orten;
			};
		classElementScript(uint f_Type) : m_Type(f_Type), m_Status(ELEM_Status_Birth)
			{
			m_vec_Component.clear();
			};
		classElementScript(uint f_Type, uint f_Status) : m_Type(f_Type), m_Status(f_Status)
			{
			m_vec_Component.clear();
			};
		classElementScript(float f_Volume) : m_Type(0), m_Status(0)
			{
			m_Volume = f_Volume;
			};
		classElementScript() : m_Type(0), m_Status(0)
			{
			};
		virtual ~classElementScript() {};

		classResult* acStructuredAnalysis(void);

		void acGen_fromElement(classElement* f_Element, int f_ScriptLanguageScheme = 1);

		uint m_Type;
		uint m_Status;

		BiVector m_Center;
		//BiOrientation m_Orten;
		classWorth m_Worth;

		vector<classElementScript*> m_vec_ElementScript;

		vector<classComponent*> m_vec_Component;
		std::string m_Data;
		std::string m_Hash;

		aabb* m_aabb;
		float m_Volume;

		vector<int> m_vec_Collission;
		vector<int> m_vec_IsIn;

		vector<classJoint*> m_vec_Joint;

		float acCompare(classElement* f_Element, float f_QualityRank, bool f_testVolumes);

		  ////////////////////////////////////
		 // LEGACY of Structured Analysis
		//
		vector<classResult*> m_vec_Result;
		int m_Base;
		int m_Index;
	};*/

function classCollection(f_Hesh)
{
	this.m_Type = 0;
	this.m_Status = 0;
	
	this.m_Scale = 1.0;

	this.m_vec_Element = [];
	this.m_idx_vec_Element = 0;
	this.m_vec_Surface = [];
	this.m_idx_vec_Surface = 0;
	this.m_vec_Leg = [];
	this.m_idx_vec_Leg = 0;
}

/*class classCollectionScript
{
	public:
		classCollectionScript(uint f_Type) : m_Type(f_Type), m_Status(ELEM_Status_Birth)
			{
			m_vec_ElementScript.clear();
			};
		classCollectionScript() : m_Type(Ground), m_Status(ELEM_Status_Birth)
			{
			m_vec_ElementScript.clear();
			};
		~classCollectionScript() {};

		void acClear(void)
			{
			m_vec_ElementScript.clear();
			}

		classWorth* acStructuredAnalysis(/*target*//*);

		uint m_Type;
		uint m_Status;

		float m_Scale;

		vector<classElementScript*> m_vec_ElementScript;
	};*/
	
function classTarget()
{	
	this.m_Mark = 0.0;
	
	this.m_Collection = [];
}

classTarget.prototype.acFromHesh = function(f_Hesh)
{
	this.m_Mark = 0.0;
	
	this.m_Collection = new classCollection();

	for(var f_Count = 0; f_Count < f_Hesh.m_idx_vec_Cube; f_Count++)
		{
		var f_Element = new classElement();
		
		f_Element.acFromBicycle(f_Hesh.m_vec_Key[f_Count].m_Link);

		var f_Result = f_Element.acStructuredAnalysis();

		if(f_Result.m_SurfToLegRatio > 0.17)
			{
			var f_Surface = new classSurface();
			
			f_Surface.acSetPos(f_Element);

			f_Element.m_vec_Element[f_Element.m_idx_vec_Element++] = f_Element;
			f_Element.m_vec_Surface[f_Element.m_idx_vec_Surface++] = f_Surface;
			this.m_Collection.m_vec_Element[this.m_Collection.m_idx_vec_Element++] = f_Element;
			this.m_Collection.m_vec_Surface[this.m_Collection.m_idx_vec_Surface++] = f_Surface;
			}
		else
			{
			var f_Leg = new classLeg();
			
			f_Leg.acSetPos(f_Element);
			
			f_Element.m_vec_Element[f_Element.m_idx_vec_Element++] = f_Element;
			f_Element.m_vec_Leg[f_Element.m_vec_Leg++] = f_Leg;
			this.m_Collection.m_vec_Element[this.m_Collection.m_idx_vec_Element++] = f_Element;
			this.m_Collection.m_vec_Leg[this.m_Collection.m_idx_vec_Leg++] = f_Leg;
			}
		}

	for(var f_Count = 0; f_Count < f_Hesh.m_idx_vec_Cube; f_Count++)
		{
		var f_Element = this.m_Collection.m_vec_Element[f_Count];

		for(var f_CountCollision = 0; f_CountCollision < f_Hesh.m_idx_vec_Cube; f_CountCollision++)
			{
			if(f_Count != f_CountCollision)
				{
				var f_ElementCollide = this.m_Collection.m_vec_Element[f_CountCollision];
				
				if(f_Element.m_aabb.collide(f_ElementCollide.m_aabb))
					{
					f_Element.m_vec_Collission[f_Element.m_idx_vec_Collission++] = f_CountCollision;
					
					if(f_Element.m_aabb.inside(f_ElementCollide.m_Center))
						{
						f_ElementCollide.m_vec_IsIn[f_ElementCollide.m_idx_vec_IsIn++] = f_CountCollision;
						}

					if(f_ElementCollide.m_aabb.inside(f_Element.m_Center))
						{
						f_Element.m_vec_IsIn[f_Element.m_idx_vec_IsIn++] = f_Count;
						}
					}
				}
			}
		}

	for(var f_Count = 0; f_Count < f_Hesh.m_idx_vec_Cube; f_Count++)
		{
		var f_Element = this.m_Collection.m_vec_Element[f_Count];

		if(f_Element.m_idx_vec_IsIn == 1)
			{
			var f_ParentElement = this.m_Collection.m_vec_Element[f_Element.m_vec_IsIn[0]];

			f_ParentElement.m_vec_Element[f_ParentElement.m_idx_vec_Element++] = f_Element;

			// Leg
			if(f_Element.m_idx_vec_Surface == 0 && f_Element.m_idx_vec_Leg >= 1)
				{
				f_ParentElement.m_vec_Leg[f_ParentElement.m_idx_vec_Leg++] = f_Element.m_vec_Leg[0];
				}
			else // Surface
				{
				if(f_Element.m_idx_vec_Surface == 0 && f_Element.m_idx_vec_Leg == 0)
					{
					//Do nothing
					}
				else // Surface
					{
					if(f_Element.m_idx_vec_Surface >= 1)
						{
						f_ParentElement.m_vec_Surface[f_ParentElement.m_idx_vec_Surface++] = f_Element.m_vec_Surface[0];
						}
					}
				}

			var f_ParentResult = f_ParentElement.m_vec_Result[f_ParentElement.m_idx_vec_Result - 1];
			var f_ElementResult = f_Element.m_vec_Result[f_ParentElement.m_idx_vec_Result - 1];

			for(var f_Coyu = 0; f_Coyu < 8; f_Coyu++)
				{
				f_ParentResult.m_vec_Corner[f_ParentResult.m_idx_vec_Corner++] = f_ElementResult.m_vec_Corner[f_Coyu];
				}

			//classJoint* f_Joint = new classJoint(f_ParentElement, f_Element);

			//f_Element->m_vec_Joint.push_back(f_Joint);
			//f_ParentElement->m_vec_Joint.push_back(f_Joint);
			}
		else if(f_Element.m_idx_vec_IsIn > 1)
			{
			var f_Size = 0.0;
			var f_Index = f_Count;
			
			if(f_Count == 0)
				{
				f_Size = this.m_Collection.m_vec_Element[f_Element.m_vec_IsIn[1]].m_Volume;
				}
			else
				{
				f_Size = this.m_Collection.m_vec_Element[f_Element.m_vec_IsIn[0]].m_Volume;
				}

			for(var f_CountSize = 0; f_CountSize < f_Hesh.m_idx_vec_Cube; f_CountSize++)
				{
				if(f_Count != f_CountSize)
					{
					var f_SizeElement = this.m_Collection.m_vec_Element[f_CountSize];

					if(f_SizeElement.m_Volume < f_Size)
						{
						f_Size = f_SizeElement.m_Volume;
						f_Index = f_CountSize;
						}
					}
				}
			
			var f_ParentElement = this.m_Collection.m_vec_Element[f_Index];

			f_ParentElement.m_vec_Element[f_ParentElement.m_idx_vec_Element++] = f_Element;

			// Leg
			if(f_Element.m_idx_vec_Surface == 0 && f_Element.m_idx_vec_Leg >= 1)
				{
				f_ParentElement.m_vec_Leg[f_ParentElement.m_idx_vec_Leg++] = f_Element.m_vec_Leg[0];
				}
			else // Surface
				{
				if(f_Element.m_idx_vec_Surface == 0 && f_Element.m_idx_vec_Leg == 0)
					{
					//Do nothing
					}
				else // Surface
					{
					if(f_Element.m_idx_vec_Surface >= 1)
						{
						f_ParentElement.m_vec_Surface[f_ParentElement.m_idx_vec_Surface++] = f_Element.m_vec_Surface[0];
						}
					}
				}

			var f_ParentResult = f_ParentElement.m_vec_Result[f_ParentElement.m_idx_vec_Result - 1];
			var f_ElementResult = f_Element.m_vec_Result[f_ParentElement.m_idx_vec_Result - 1];

			for(var f_Coyu = 0; f_Coyu < 8; f_Coyu++)
				{
				f_ParentResult.m_vec_Corner[f_ParentResult.m_idx_vec_Corner++] = f_ElementResult.m_vec_Corner[f_Coyu];
				}

			//classJoint* f_Joint = new classJoint(f_ParentElement, f_Element);

			//f_Element->m_vec_Joint.push_back(f_Joint);
			//f_ParentElement->m_vec_Joint.push_back(f_Joint);
			}
		}

	/*for(int f_Count = 0; f_Count < f_Hesh->m_adIndex.size(); f_Count++)
		{
		classElement* f_Element = m_Collection->m_vec_Element[f_Count];

		if(f_Element->m_vec_Collission.size() == 1)
			{
			classElement* f_FriendlyElement = m_Collection->m_vec_Element[f_Element->m_vec_Collission[0]];

			classJoint* f_Joint;
			if(f_Element->m_Volume >= f_FriendlyElement->m_Volume)
				{
				f_Joint = new classJoint(f_Element, f_FriendlyElement);
				}
			else
				{
				f_Joint = new classJoint(f_FriendlyElement, f_Element);
				}

			f_Element->m_vec_Joint.push_back(f_Joint);
			f_FriendlyElement->m_vec_Joint.push_back(f_Joint);
			}
		else if(f_Element->m_vec_Collission.size() > 1)
			{
			for(int f_CountElement = 0; f_CountElement < f_Element->m_vec_Collission.size(); f_CountElement++)
				{
				if(f_Count != f_CountElement)
					{
					classElement* f_FriendlyElement = m_Collection->m_vec_Element[f_Element->m_vec_Collission[f_CountElement]];

					classJoint* f_Joint;
					if(f_Element->m_Volume >= f_FriendlyElement->m_Volume)
						{
						f_Joint = new classJoint(f_Element, f_FriendlyElement);
						}
					else
						{
						f_Joint = new classJoint(f_FriendlyElement, f_Element);
						}

					f_Element->m_vec_Joint.push_back(f_Joint);
					f_FriendlyElement->m_vec_Joint.push_back(f_Joint);
					}
				}
			}
		}*/
}

classTarget.prototype.acSetCollection = function(f_Collection)
{
	this.m_Collection = f_Collection;
}

classTarget.prototype.acCompare = function(f_Target, f_QualityRank, f_Grade, f_testVolumes)
{
	f_Target.m_Mark = 0.0;
	
	 /////////////////////
	//Prime Conditional
	if(this.m_Collection.m_idx_vec_Element < f_Target.m_Collection.m_idx_vec_Element)
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