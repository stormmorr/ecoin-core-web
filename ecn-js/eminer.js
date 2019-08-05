var vShaderQuellcode;
var fShaderQuellcode;

var dataLoc;
var hash1Loc;
var midstateLoc;
var targetLoc;
var nonceLoc;

var maxCnt = 0;
var reportPeriod = 1000;
var jobPeriod = 25000;
var useTimeout = false;
var TotalHashes = 0;
var gl;
var canvas;
var debug = false;
var buf;
var gl_working = true;

var width;
var height;

var g_HeshTargeted;
var g_Cube = [];

var posAtrLoc;
var colAtrLoc;

var PI = 3.142;

var canvas;
var f_Hesh;

var g_indexBuffer;

function throwOnGLError(err, funcName, args) {
    throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to" + funcName;
};

function BuildHesh(clob, clobnom, clob_bckred, clob_bckgreen, clob_bckblue)
{
	var f_Hesh = new ecnHesh(clobnom, clob_bckred, clob_bckgreen, clob_bckblue);
	
	for(var f_i = 0; f_i < clobnom; f_i++)
		{
		var vertex_positions =  new Float32Array([clob[f_i * 48], clob[(f_i * 48) + 1], clob[(f_i * 48) + 2], clob[(f_i * 48) + 3], clob[(f_i * 48) + 4], clob[(f_i * 48) + 5],
                  clob[(f_i * 48) + 6], clob[(f_i * 48) + 7], clob[(f_i * 48) + 8], clob[(f_i * 48) + 9], clob[(f_i * 48) + 10], clob[(f_i * 48) + 11],
				  clob[(f_i * 48) + 12], clob[(f_i * 48) + 13], clob[(f_i * 48) + 14], clob[(f_i * 48) + 15], clob[(f_i * 48) + 16], clob[(f_i * 48) + 17],
				  clob[(f_i * 48) + 18], clob[(f_i * 48) + 19], clob[(f_i * 48) + 20], clob[(f_i * 48) + 21], clob[(f_i * 48) + 22], clob[(f_i * 48) + 23],
				  clob[(f_i * 48) + 24], clob[(f_i * 48) + 25], clob[(f_i * 48) + 26], clob[(f_i * 48) + 27], clob[(f_i * 48) + 28], clob[(f_i * 48) + 29],
				  clob[(f_i * 48) + 30], clob[(f_i * 48) + 31], clob[(f_i * 48) + 32], clob[(f_i * 48) + 33], clob[(f_i * 48) + 34], clob[(f_i * 48) + 35],
				  clob[(f_i * 48) + 36], clob[(f_i * 48) + 37], clob[(f_i * 48) + 38], clob[(f_i * 48) + 39], clob[(f_i * 48) + 40], clob[(f_i * 48) + 41],
				  clob[(f_i * 48) + 42], clob[(f_i * 48) + 43], clob[(f_i * 48) + 44], clob[(f_i * 48) + 45], clob[(f_i * 48) + 46], clob[(f_i * 48) + 47]
				  ]);
		
		f_Hesh.m_vec_Buffer[f_i] = gl.createBuffer();
		f_Hesh.m_idx_vec_Buffer++;
		
		gl.bindBuffer(gl.ARRAY_BUFFER, f_Hesh.m_vec_Buffer[f_i]);
		gl.bufferData(gl.ARRAY_BUFFER, vertex_positions, gl.STATIC_DRAW);
		}
		
	gl.clearColor(clob_bckred, clob_bckgreen, clob_bckblue, 1.0 );
    gl.clear(gl.COLOR_BUFFER_BIT);
		
	return f_Hesh;
}

function meinWebGLStart(threads)
{
	canvas = document.getElementById('cvs_egl');
	canvas.height = 800;
	canvas.width = 1000;

	gl = WebGLUtils.setupWebGL(canvas);

	if(!gl)
		{
		gl_working = false;
		alert("Fehler: WebGL-Context konnte nicht initialisiert werden");
		}

	var program = gl.createProgram();

	if(!program)
		{
		gl_working = false;
		}
		
	vShaderQuellcode = readScript('eshader-vs.js');
    fShaderQuellcode = readScript('eshader-fs.js');
		
	vShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vShader,vShaderQuellcode);
	gl.compileShader(vShader);
	if(!gl.getShaderParameter(vShader, gl.COMPILE_STATUS))
		{
		console.log(gl.getShaderInfoLog(vShader));
		}
	gl.attachShader(program,vShader);

	fShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fShader,fShaderQuellcode);
	gl.compileShader(fShader);
	if(!gl.getShaderParameter(fShader, gl.COMPILE_STATUS))
		{
		console.log(gl.getShaderInfoLog(fShader));
		}
	gl.attachShader(program,fShader);

	gl.linkProgram(program);
	gl.useProgram(program);

	posAtrLoc = gl.getAttribLocation(program, "vPos");
	gl.enableVertexAttribArray( posAtrLoc );

	colAtrLoc = gl.getAttribLocation(program, "vCol");
	gl.enableVertexAttribArray( colAtrLoc );
	
	modelUniLoc = gl.getUniformLocation(program, "model");
	viewUniLoc = gl.getUniformLocation(program, "view");
	projUniLoc = gl.getUniformLocation(program, "proj");
		
	g_indexBuffer = gl.createBuffer();
	
	var cubeIndices =
		[
			0,2,1, // -x
			1,2,3,

			4,5,6, // +x
			5,7,6,

			0,1,5, // -y
			0,5,4,

			2,6,7, // +y
			2,7,3,

			0,4,6, // -z
			0,6,2,

			1,3,7, // +z
			1,7,5,
		];
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(cubeIndices), gl.STATIC_DRAW);
	
	var model = new Float32Array([1.000000, 0.000000, 0.000000, 0.000000,
									0.000000, 1.000000, 0.000000, 0.000000,
									-0.000000, 0.000000, 1.000000, 0.000000,
									0.000000, 0.000000, 0.000000, 1.000000]);

	var view = new Float32Array([0.593852, -0.000000, 0.804574, -0.445389,
								  0.118900, 0.989020, -0.087760, 0.108629,
								  -0.795740, 0.147780, 0.587332, -12.568904,
								  0.000000, 0.000000, 0.000000, 1.000000]);

	var proj = new Float32Array([1.428148, 0.000000, 0.000000, 0.000000,
								  0.000000, 1.428148, 0.000000, 0.000000,
								  0.000000, 0.000000, -1.000100, -0.010001,
								  0.000000, 0.000000, -1.000000, 0.000000]);
								  
    gl.uniformMatrix4fv(modelUniLoc, false, model);
    gl.uniformMatrix4fv(viewUniLoc, false, view);
	gl.uniformMatrix4fv(projUniLoc, false, proj);
}

function readScript(n) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", n, false);
    xhr.send(null);
    var x = xhr.responseText;
    return x;
};

function onl() {
    vShaderQuellcode = readScript('eshader-vs.js');
    fShaderQuellcode = readScript('eshader-fs.js');
};

var theta = 0.0;
var thetaLoc;

var modelUniLoc;
var viewUniLoc;
var projUniLoc;

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = xAxis;

var thetaxx = 0.0;
var thetaxy = 0.0;
var thetaxz = 0.0;

var numVertices  = 36;

var thetax = [45.0, 45.0, 45.0];

var projection;

var g_vertices = [
        vec3( -0.5, -0.5,  0.5 ),
        vec3( -0.5,  0.5,  0.5 ),
        vec3(  0.5,  0.5,  0.5 ),
        vec3(  0.5, -0.5,  0.5 ),
        vec3( -0.5, -0.5, -0.5 ),
        vec3( -0.5,  0.5, -0.5 ),
        vec3(  0.5,  0.5, -0.5 ),
        vec3(  0.5, -0.5, -0.5 )
    ];

var g_vertexColors = [
	vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
	vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
	vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
	vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
	vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
	vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
	vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
	vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
];

// indices of the 12 triangles that compise the cube

var g_indices = [
    0,2,1, // -x
	1,2,3,

	4,5,6, // +x
	5,7,6,

	0,1,5, // -y
	0,5,4,

	2,6,7, // +y
	2,7,3,

	0,4,6, // -z
	0,6,2,

	1,3,7, // +z
	1,7,5
];

var g_gindices = [
    1, 0, 3,
    3, 2, 1,
    2, 3, 7,
    7, 6, 2,
    3, 0, 4,
    4, 7, 3,
    6, 5, 1,
    1, 2, 6,
    4, 5, 6,
    6, 7, 4,
    5, 4, 0,
    0, 1, 5
];

var iBuffer;
var vPositionize;
var vColorize;

function eminer(clob, clobnom, hellynom, clob_bckred, clob_bckgreen, clob_bckblue, f_thetaxx, f_thetaxy, f_thetaxz)
{	
	canvas = document.getElementById( "cvs_egl" );
	
    if(!gl) { gl = WebGLUtils.setupWebGL( canvas ); }
	
	thetaxx = f_thetaxx;
	thetaxy = f_thetaxy;
	thetaxz = f_thetaxz;

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
	
	gl.enable(gl.CULL_FACE);

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
	f_Hesh = new ecnHesh(clobnom, clob_bckred, clob_bckgreen, clob_bckblue);
		
	gl.clearColor(clob_bckred, clob_bckgreen, clob_bckblue, 1.0 );
    gl.clear(gl.COLOR_BUFFER_BIT);
	
	var f_Reject = false;
			
	for(var f_x = 0; f_x < hellynom; f_x++)
		{
		if(clob[f_x * 6] < -4.0)
			{
			clob[f_x * 6] = -2.3;
			f_Reject = true;
			}

		if(clob[(f_x * 6) + 1] < -4.0)
			{
			clob[(f_x * 6) + 1] = -2.3;
			f_Reject = true;
			}

		if(clob[(f_x * 6) + 2] < -4.0)
			{
			clob[(f_x * 6) + 2] = -2.3;
			f_Reject = true;
			}
			
		if(clob[f_x * 6] > 4.0)
			{
			clob[f_x * 6] = 2.3;
			f_Reject = true;
			}

		if(clob[(f_x * 6) + 1] > 4.0)
			{
			clob[(f_x * 6) + 1] = 2.3;
			f_Reject = true;
			}

		if(clob[(f_x * 6) + 2] > 4.0)
			{
			clob[(f_x * 6) + 2] = 2.3;
			f_Reject = true;
			}
			
		if(clob[(f_x * 6) + 3] <= 0.15)
			{
			clob[(f_x * 6) + 3] = Math.random();
			//f_Reject = true;
			}

		if(clob[(f_x * 6) + 4] <= 0.15)
			{
			clob[(f_x * 6) + 4] = Math.random();
			//f_Reject = true;
			}

		if(clob[(f_x * 6) + 5] <= 0.15)
			{
			clob[(f_x * 6) + 5] = Math.random();
			//f_Reject = true;
			}
		}
	
	var dim = 6 * 8;
	
	for(var f_i = 0; f_i < clobnom; f_i++)
		{
		var chug = dim * f_i;
		/*var vertices_blob = [
			vec3(clob[chug], clob[chug + 1], clob[chug + 2]), vec3(clob[chug + 3], clob[chug + 4], clob[chug + 5]),
			vec3(clob[chug + 6], clob[chug + 7], clob[chug + 8]), vec3(clob[chug + 9], clob[chug + 10], clob[chug + 11]),
			vec3(clob[chug + 12], clob[chug + 13], clob[chug + 14]), vec3(clob[chug + 15], clob[chug + 16], clob[chug + 17]),
			vec3(clob[chug + 18], clob[chug + 19], clob[chug + 20]), vec3(clob[chug + 21], clob[chug + 22], clob[chug + 23]),
			vec3(clob[chug + 24], clob[chug + 25], clob[chug + 26]), vec3(clob[chug + 27], clob[chug + 28], clob[chug + 29]),
			vec3(clob[chug + 30], clob[chug + 31], clob[chug + 32]), vec3(clob[chug + 33], clob[chug + 34], clob[chug + 35]),
			vec3(clob[chug + 36], clob[chug + 37], clob[chug + 38]), vec3(clob[chug + 39], clob[chug + 40], clob[chug + 41]),
			vec3(clob[chug + 42], clob[chug + 43], clob[chug + 44]), vec3(clob[chug + 45], clob[chug + 46], clob[chug + 47])
			];*/
			
		var vertex_blob = [
			vec3(clob[chug], clob[chug + 1], clob[chug + 2]),
			vec3(clob[chug + 6], clob[chug + 7], clob[chug + 8]),
			vec3(clob[chug + 12], clob[chug + 13], clob[chug + 14]),
			vec3(clob[chug + 18], clob[chug + 19], clob[chug + 20]),
			vec3(clob[chug + 24], clob[chug + 25], clob[chug + 26]),
			vec3(clob[chug + 30], clob[chug + 31], clob[chug + 32]),
			vec3(clob[chug + 36], clob[chug + 37], clob[chug + 38]),
			vec3(clob[chug + 42], clob[chug + 43], clob[chug + 44])
			];
			
		/*var vertices_blob = [
			vec3(clob[chug], clob[chug + 1], clob[chug + 2]), vec3(clob[chug + 3], clob[chug + 4], clob[chug + 5]),
			vec3(clob[chug + 6], clob[chug + 7], clob[chug + 8]), vec3(clob[chug + 9], clob[chug + 10], clob[chug + 11]),
			vec3(clob[chug + 12], clob[chug + 13], clob[chug + 14]), vec3(clob[chug + 15], clob[chug + 16], clob[chug + 17]),
			vec3(clob[chug + 18], clob[chug + 19], clob[chug + 20]), vec3(clob[chug + 21], clob[chug + 22], clob[chug + 23]),
			vec3(clob[chug], clob[chug + 1], clob[chug + 2]), vec3(clob[chug + 3], clob[chug + 4], clob[chug + 5]),
			vec3(clob[chug + 6], clob[chug + 7], clob[chug + 8]), vec3(clob[chug + 9], clob[chug + 10], clob[chug + 11]),
			vec3(clob[chug + 30], clob[chug + 31], clob[chug + 32]), vec3(clob[chug + 33], clob[chug + 34], clob[chug + 35]),
			vec3(clob[chug + 24], clob[chug + 25], clob[chug + 26]), vec3(clob[chug + 27], clob[chug + 28], clob[chug + 29]),
			vec3(clob[chug + 6], clob[chug + 7], clob[chug + 8]), vec3(clob[chug + 9], clob[chug + 10], clob[chug + 11]),
			vec3(clob[chug + 12], clob[chug + 13], clob[chug + 14]), vec3(clob[chug + 15], clob[chug + 16], clob[chug + 17]),
			vec3(clob[chug + 36], clob[chug + 37], clob[chug + 38]), vec3(clob[chug + 39], clob[chug + 40], clob[chug + 41]),
			vec3(clob[chug + 30], clob[chug + 31], clob[chug + 32]), vec3(clob[chug + 33], clob[chug + 34], clob[chug + 35]),
			vec3(clob[chug + 12], clob[chug + 13], clob[chug + 14]), vec3(clob[chug + 15], clob[chug + 16], clob[chug + 17]),
			vec3(clob[chug + 18], clob[chug + 19], clob[chug + 20]), vec3(clob[chug + 21], clob[chug + 22], clob[chug + 23]),
			vec3(clob[chug + 42], clob[chug + 43], clob[chug + 44]), vec3(clob[chug + 45], clob[chug + 46], clob[chug + 47]),
			vec3(clob[chug + 36], clob[chug + 37], clob[chug + 38]), vec3(clob[chug + 39], clob[chug + 40], clob[chug + 41]),
			vec3(clob[chug + 18], clob[chug + 19], clob[chug + 20]), vec3(clob[chug + 21], clob[chug + 22], clob[chug + 23]),
			vec3(clob[chug], clob[chug + 1], clob[chug + 2]), vec3(clob[chug + 3], clob[chug + 4], clob[chug + 5]),
			vec3(clob[chug + 24], clob[chug + 25], clob[chug + 26]), vec3(clob[chug + 27], clob[chug + 28], clob[chug + 29]),
			vec3(clob[chug + 42], clob[chug + 43], clob[chug + 44]), vec3(clob[chug + 45], clob[chug + 46], clob[chug + 47]),
			vec3(clob[chug + 42], clob[chug + 43], clob[chug + 44]), vec3(clob[chug + 45], clob[chug + 46], clob[chug + 47]),
			vec3(clob[chug + 24], clob[chug + 25], clob[chug + 26]), vec3(clob[chug + 27], clob[chug + 28], clob[chug + 29]),
			vec3(clob[chug + 30], clob[chug + 31], clob[chug + 32]), vec3(clob[chug + 33], clob[chug + 34], clob[chug + 35]),
			vec3(clob[chug + 36], clob[chug + 37], clob[chug + 38]), vec3(clob[chug + 39], clob[chug + 40], clob[chug + 41]),
			];*/

		f_Hesh.m_vec_Buffer[f_i] = gl.createBuffer();
		f_Hesh.m_idx_vec_Buffer++;
		
		gl.bindBuffer(gl.ARRAY_BUFFER, f_Hesh.m_vec_Buffer[f_i]);
		gl.bufferData(gl.ARRAY_BUFFER, flatten(vertex_blob), gl.STATIC_DRAW);
		}
		
	for(var f_i = 0; f_i < clobnom; f_i++)
		{
		var chug = dim * f_i;
		var color_blob = [
			vec3(clob[chug + 3], clob[chug + 4], clob[chug + 5]),
			vec3(clob[chug + 9], clob[chug + 10], clob[chug + 11]),
			vec3(clob[chug + 15], clob[chug + 16], clob[chug + 17]),
			vec3(clob[chug + 21], clob[chug + 22], clob[chug + 23]),
			vec3(clob[chug + 27], clob[chug + 28], clob[chug + 29]),
			vec3(clob[chug + 33], clob[chug + 34], clob[chug + 35]),
			vec3(clob[chug + 39], clob[chug + 40], clob[chug + 41]),
			vec3(clob[chug + 45], clob[chug + 46], clob[chug + 47])
			];

		f_Hesh.m_vec_ColorBuffer[f_i] = gl.createBuffer();
		f_Hesh.m_idx_vec_ColorBuffer++;
		
		gl.bindBuffer(gl.ARRAY_BUFFER, f_Hesh.m_vec_ColorBuffer[f_i]);
		gl.bufferData(gl.ARRAY_BUFFER, flatten(color_blob), gl.STATIC_DRAW);
		}

	/*g_indexBuffer = gl.createBuffer();
	
	var cubeIndices =
		[
			0,1,2, // -x
			1,2,3,

			4,6,5, // +x
			5,7,6,

			0,1,5, // -y
			0,5,4,

			2,6,7, // +y
			2,7,3,

			0,4,6, // -z
			0,6,2,

			1,3,7, // +z
			1,7,5,
		];
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, flatten(cubeIndices), gl.STATIC_DRAW);

    */// Associate out shader variables with our data buffer
    //var vPositionize = gl.getAttribLocation( program, "vPosition" );
    //gl.vertexAttribPointer( vPositionize, 3, gl.FLOAT, false, 0, 0 );
    //gl.enableVertexAttribArray( vPositionize );
	
	//var vColorize = gl.getAttribLocation( program, "vColor" );
    //gl.vertexAttribPointer(vColorize, 3, gl.FLOAT, false, 0, 12 );
    //gl.enableVertexAttribArray(vColorize);
	
	iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(g_gindices), gl.STATIC_DRAW);

    // color array atrribute buffer

    /*var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(g_vertexColors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    // vertex array attribute buffer

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(g_vertices), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );*/
	
	var aspectRatio = 1000.0 / 800.0;
	var fovAngleY = (70.0 * 3.142) / 180.0;

	// This is a simple example of change that can be made when the app is in
	// portrait or snapped view.
	if(aspectRatio < 1.0)
		{
		fovAngleY *= 2.0;
		}

	// Note that the OrientationTransform3D matrix is post-multiplied here
	// in order to correctly orient the scene to match the display orientation.
	// This post-multiplication step is required for any draw calls that are
	// made to the swap chain render target. For draw calls to other targets,
	// this transform should not be applied.

	// This sample makes use of a right-handed coordinate system using row-major matrices.
	var perspectiveMatrix = perspective(
		fovAngleY,
		aspectRatio,
		0.01,
		100.0
		);

	var g_projection = perspectiveMatrix;
	
	projection = ortho(-3, 3, -3, 3, 0, 100);
	
	modelUniLoc = gl.getUniformLocation(program, "model");
	viewUniLoc = gl.getUniformLocation(program, "view");
	projUniLoc = gl.getUniformLocation(program, "proj");
	
	thetaLoc = gl.getUniformLocation(program, "theta");
	
	vPositionize = gl.getAttribLocation( program, "vPosition" );
	vColorize = gl.getAttribLocation( program, "vColor" );
	
	var model = new Float32Array([1.000000, 0.000000, 0.000000, 0.000000,
									0.000000, 1.000000, 0.000000, 0.000000,
									-0.000000, 0.000000, 1.000000, 0.000000,
									0.000000, 0.000000, 0.000000, 1.000000]);

	var view = new Float32Array([0.593852, -0.000000, 0.804574, -0.445389,
								  0.118900, 0.989020, -0.087760, 0.108629,
								  -0.795740, 0.147780, 0.587332, -12.568904,
								  0.000000, 0.000000, 0.000000, 1.000000]);

	var proj = new Float32Array([1.428148, 0.000000, 0.000000, 0.000000,
								  0.000000, 1.428148, 0.000000, 0.000000,
								  0.000000, 0.000000, -1.000100, -0.010001,
								  0.000000, 0.000000, -1.000000, 0.000000]);
								  
    gl.uniformMatrix4fv(modelUniLoc, false, flatten(model));
    gl.uniformMatrix4fv(viewUniLoc, false, flatten(view));
	
	//gl.uniformMatrix4fv(projUniLoc, false, flatten(projection));
	
	//var heshjob = BuildHesh(clob, clobnom, clob_bckred, clob_bckgreen, clob_bckblue);
	
	gl.uniformMatrix4fv(projUniLoc, false, flatten(g_projection));
	
    render();
};

/*window.onload = function init()
{
    canvas = document.getElementById( "cvs_egl" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var vertices = [
        vec2(  0,  1 ),
        vec2(  -1,  0 ),
        vec2( 1,  0 ),
        vec2(  0, -1 )
    ];


    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation( program, "theta" );

    render();
};*/

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
	
	var modelView = mat4();
    modelView = mult(modelView, rotate(thetax[xAxis], [1, 0, 0] ));
    modelView = mult(modelView, rotate(thetax[yAxis], [0, 1, 0] ));
    modelView = mult(modelView, rotate(thetax[zAxis], [0, 0, 1] ));

	//console.log(JSON.stringify(modelView));
    gl.uniformMatrix4fv(modelUniLoc, false, flatten(modelView));

	// Eye is at (0,0.7,1.5), looking at point (0,-0.1,0) with the up-vector along the y-axis.
	var eye = vec3(-9.75, 1.75, 7.75);
	var at = vec3(0.75, -0.2, 0.0);
	var up = vec3(0.0, 1.0, 0.0);

	var view = lookAt(eye, at, up);
	
	gl.uniformMatrix4fv(viewUniLoc, false, flatten(view));
	
    thetax[xAxis] = thetaxx;
	thetax[yAxis] += 2.035;//thetaxy;
	thetax[zAxis] = thetaxz;
	theta += 0.25;
    gl.uniform1f( thetaLoc, theta );
	
	for(var f_i = 0; f_i < f_Hesh.m_idx_vec_Buffer; f_i++)
		{
		gl.bindBuffer(gl.ARRAY_BUFFER, f_Hesh.m_vec_Buffer[f_i]);
		gl.vertexAttribPointer(vPositionize, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(vPositionize);
		gl.bindBuffer(gl.ARRAY_BUFFER, f_Hesh.m_vec_ColorBuffer[f_i]);
		gl.vertexAttribPointer(vColorize, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(vColorize);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
		
		gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);
		//gl.drawArrays(gl.TRIANGLES, 0, 47);
		}
		
	//gl.drawElements(gl.POINTS, 36, gl.UNSIGNED_SHORT, 0);
	
	//gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);

    window.requestAnimFrame(render);
}