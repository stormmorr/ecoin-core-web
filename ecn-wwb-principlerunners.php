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
			
		if(empty($_GET["auth"]))
			{
			$auth = ""; //Global Giveaway Wallets
			}
		else
			{
			$auth = $_GET["auth"]; //Personal Wallet Storage
			}
		
		$getip = $_SERVER['REMOTE_ADDR'];
	?>
	<script>
		var getip = '<?php echo $getip; ?>';
		var auth = '<?php echo $auth; ?>';
		var auto = '<?php echo $auto; ?>';
		console.log("User IP Logged at " + getip + " Miner Authority " + auth);
	</script>
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
	<script type="text/javascript" src="javascript/cookie-utility.js"></script>
	<script type="text/javascript" src="javascript/date-time.js"></script>
	<script type="text/javascript" src="ecn-js/json2.js"></script>
	<script type="text/javascript" src="ecn-js/hesh.js"></script>
	<script type="text/javascript" src="ecn-js/cube.js"></script>
	<script type="text/javascript" src="ecn-js/classtarget.js"></script>
	<script type="text/javascript" src="ecn-js/classtarget-js-script.js"></script>
	<script type="text/javascript" src="ecn-js/wallet.js"></script>
	<script type="text/javascript" src="javascript/miner-identified.js"></script>
	<script type="text/javascript" src="ecn-js/eminer.js"></script>
	<script type="text/javascript" src="ecn-js/work-manager-ecn-bca-script.js"></script>
	<script type="text/javascript" src="ecn-js/ecn-wwb-principlerunners.js"></script>
	<script>
		function playSound(filename)
			{   
			document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="' + filename + '.mp3" type="audio/mpeg" /><source src="' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename +'.mp3" /></audio>';
			}
	</script>
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-41053310-24"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments)};
	  gtag('js', new Date());

	  gtag('config', 'UA-41053310-24');
	</script>
</head>
    <body class="body" onload="onceLoaded();">
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
							<div id="scriptninja">
							</div>
							<!--<textarea 
								class="mytextarea"
								onclick="ag_ClearText();"
								id="script"
								onselect="return false;"
								readonly="readonly"
								unselectable="on"
								disabled="disabled"
								rows="10" cols="80">
							</textarea>-->
						</td>
					</tr>
					<tr>
						<td>
							<div id="biscuitstats">
							</div>
						</td>
						<td>
							<div id="cutebay">
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div id="viewlink">
							</div>
						</td>
						<td>
							<div id="voting">
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
			<br /><br />
			<div>
				<table>
					<tbody>
						<tr>
							<td>
								<a href="http://www.ecn.world">Manage on the e.X.t.r.a. ecoin Exchange</a>
							</td>
							<td>
								<a href="http://www.bitcoin-office.com/ecn-share.php">ecn.share View-My-Authority</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	<br />
	
	<script>
		function onceLoaded()
			{
			var f_admax = 5;
			var f_Session = new eSession(f_admax);
			
			if(auth == "") //Global Giveaway Wallets
				{
				document.getElementById("wwh_base_intro").innerHTML = "<h3>Wallet ADR " + ecn_walletadr_address[0] + "</h3>";
				
				g_Wallet.SetAuthority(ecn_walletadr_address[0]);
				}
			else
				{
				document.getElementById("wwh_base_intro").innerHTML = "<h3>MinerAuth ADR " + auth + "</h3>";
				
				g_Wallet.SetAuthority(auth);
				}
			
			if(auto > 0)
				{
				eStartMiner();
				}
			}
	</script>
	</body>
</html>