<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<?php
		ini_set('display_errors', 1);
		ini_set("memory_limit", -1);
		ini_set('max_execution_time', 0);
		error_reporting(E_ALL);
		set_time_limit(0);

		date_default_timezone_set('Europe/London');
		$date = date('Y/m/d h:i:s', time());

		require_once('filesystem.class.php');
        require_once('credentials.class.php');

		$username = "";

		$assetofficeid = 3;

		require_once('configglobal.inc.php');
		require_once('class.db.php');

		if(empty($_GET["geo"]))
			{
			$g_geoName = "wwg_base_geo";
			}
		else
			{
			$g_geoName = $_GET["geo"];
			}

		if(empty($_GET["strand"]))
			{
			$g_strand = -5;
			}
		else
			{
			$g_strand = $_GET["strand"];
			}

		if(empty($_GET["auto"]))
			{
			$auto = -5;
			}
		else
			{
			$auto = $_GET["auto"];
			}

		 ///////////////////
		// Biscuit Inputs
		$ICO = [];
	?>
	<title>wwb-base</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Earn 0.05 Bitcoin a week on GPU of standard Gaming PC for FREE GPU/CPU mining software free bitcoin. One Click register for free bitcoin cloud mining software provided by OSIREM LTD for Globalscape.services. Cpu mining calculator within earn bitcoin free. Cryptocurrency cpu mining, ethereum mining software through Globalscape.services">
	<meta name="keywords" content="investment blocks, investments, bitcoin, exchange, spend bitcoin, bit.ly, bitcoin investments, buy bitcoin, buy bitcoins, invest in bitcoin, invest bitcoin, bitcoin exchange rate, how to invest in bitcoin, double bitcoin, bitcoin stock, invest btc, bitcoin price, bitcoin wallet, bitcoin exchange, bitcoin mining, buy bitcoin with credit card, buy bitcoins with credit card, bitcoin buy, bitcoin trading, where to buy bitcoins, buy bitcoin instantly, bitcoin miner, bitcoin exchange rate, local bitcoin, bitcoin value, buy bitcoins online, bitcoin calculator, buy bitcoin with debit card, btc, buy bitcoin online, bitcoin credit card, bitcoin chart, bitcoin rate, bitcoin account, buy bitcoins instantly, buy bitcoin credit card, bitcoin market, bitcoins for sale, cpu mining coins, cpu mining calculator, cpu mining software, cpu mining vs gpu mining, geforce nvidia drivers windows, geforce nvidia drivers for windows, mining rig frame diy, mining rig calculator, free bitcoin cloud mining software">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
	<link href="styles/pageext.css" rel="stylesheet" type="text/css" />
    <link href="styles/style.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="css/example.css" />
	
	<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
	
	<script src="bower_components/js-sha256/build/sha256.min.js"></script>
	<script src="bower_components/bitcoinjs-lib-for-browsers/dist/bitcoinjs-lib-4.0.2.min.js"></script>
	<script type="text/javascript" src="common/webgl-utils.js"></script>
	<script type="text/javascript" src="common/initShaders.js"></script>
	<script type="text/javascript" src="common/MV.js"></script>
	<script type="text/javascript" src="ecn-js/json2.js"></script>
	<script type="text/javascript" src="ecn-js/hesh.js"></script>
	<script type="text/javascript" src="ecn-js/cube.js"></script>
	<script type="text/javascript" src="ecn-js/classtarget.js"></script>
	<script type="text/javascript" src="ecn-js/classtarget-js-script.js"></script>
	<script type="text/javascript" src="ecn-js/wallet.js"></script>
    <script type="text/javascript" src="ecn-js/eminer.js"></script>
	<!--<script type="text/javascript" src="ecn-js/work-manager-ecn-bca.js"></script>-->
	<script type="text/javascript" src="ecn-js/work-manager-ecn-bca-script.js"></script>
	<script>
		function playSound(filename)
			{   
			document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="' + filename + '.mp3" type="audio/mpeg" /><source src="' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename +'.mp3" /></audio>';
			}
	</script>
	<script>
		var f_Strand = -5;
    </script>
	<script>
		g_vec_scrInputName[g_idx_vec_scrInputName] = "firstinput";
		g_idx_vec_scrInputName++;
		
		g_vec_scrInputHTML[g_idx_vec_scrInputHTML] = "<input type=\"number\" name=\"" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" id=\"" + "wwh_icobase_input_" + g_vec_scrInputName[g_idx_vec_scrInputName - 1] + "\" value=\"1\" min=\"1\" max=\"5\">";
		g_idx_vec_scrInputHTML++;
		
		g_vec_scrInputType[g_idx_vec_scrInputType] = INSTA_TYPE_VAR_CALL;
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
	</script>
	<script>
		var g_X = 0.0;
		var g_Y = 0.0;
		var g_Z = 0.0;
	</script>
	<script>
		//if(f_Strand > 0)
		//	{
		//	var f_Base = ag_LoadBase(f_Base);
		//	ag_ExecuteBase(f_Base);
		//	var f_Share = ag_LoadScriptShare(g_Wallet.GetAdr(), f_geoProgramName);
		//	ag_ExecuteShare(f_Share);
		//	}
	</script>
</head>
    <body class="body">
        <div id="control" class="cont">
			<h2 style="font-family: Abel;" class="font">Biscuit Base ecoin-Example C</h2>
			<div id="wwh_base_title">
			</div>
			<div id="wwh_base_intro">
			</div>
			<div id="wwh_base_inputcanvas">
			</div>
			<div id="wwh_base_outputcanvas">
			</div>
			<table>
				<tbody>
					<tr>
						<td>
							<table>
								<tbody>
									<tr>
										<td>
											<canvas id="cvs_egl" width="150" height="150">
												[No canvas support]
											</canvas>
										</td>
									</tr>
									<tr>
										<td>
											<h2 id="grademark" style="font-family: Abel;font-size: 9px;" class="font">GradeMark - press start miner</h2>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
						<td>
							<div id="script">
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div>
			<script id="vertex-shader" type="x-shader/x-vertex">
				uniform mat4 model;
				uniform mat4 view;
				uniform mat4 proj;
				uniform float theta;
				attribute vec3 vPosition;
				attribute vec3 vColor;
				varying vec3 col;
				void main()
					{
					vec4 v_Pos = vec4(vPosition.z * -1.0, vPosition.y, vPosition.x, 1.0);
					col = vColor;
					//v_Pos = proj * model * v_Pos;
					//f_Pos = proj * f_Pos;
					//vec3 pos = model * view * f_Pos).xyz;
					//gl_Position = f_Pos;
					vec4 f_Posf = v_Pos;
					gl_Position.x = f_Posf.x;
					gl_Position.y = f_Posf.y;
					gl_Position.z = f_Posf.z;
					gl_Position.w = f_Posf.w;
					//gl_Position.x += sin(theta);
					//gl_Position.z *= cos(theta);
					//gl_Position.x /= theta;
					//gl_Position.y /= theta;
					gl_Position.x /= 4.0;
					gl_Position.y /= 4.0;
					gl_Position.z /= 4.0;
					}
			</script>
			<script id="fragment-shader" type="x-shader/x-fragment">
				precision mediump float;
				varying vec3 col;
				void main()
					{
					gl_FragColor = vec4(col, 1.0);
					}
			</script>
			<button id="start1" onclick="eStartMiner();playSound('bing');" class="btn btn-primary">Mine ECN</button>
			<a href="http://bitcoin-office.com/ecnb.php">Stop Miner</a>
			<div id="sound"></div>
		</div>
	<br />
	<script>
		var f_admax = 15;
		var f_Session = new eSession(f_admax);
		
		var auto = '<?php echo $auto; ?>';
		
		if(auto > 0)
			{
			eStartMiner();
			}
	</script>
	</body>
</html>