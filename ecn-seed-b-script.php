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
		
		if(empty($_GET["mid"]))
			{
			$minerbodid = 12;
			}
		else
			{
			$minerbodid = $_GET["mid"];
			}
		
		if(empty($_GET["w"]))
			{
			$username = "osirem";
			}
		else
			{
			$username = $_GET["w"];
			}
			
		if(empty($_GET["fac"]))
			{
			$thefac = 300.0;
			}
		else
			{
			$thefac = $_GET["fac"];
			}
			
		if(empty($_GET["tax"]))
			{
			$thetaxx = 0.0;
			}
		else
			{
			$thetaxx = $_GET["tax"];
			}
			
		if(empty($_GET["tay"]))
			{
			$thetaxy = 0.0;
			}
		else
			{
			$thetaxy = $_GET["tay"];
			}
			
		if(empty($_GET["taz"]))
			{
			$thetaxz = 0.0;
			}
		else
			{
			$thetaxz = $_GET["taz"];
			}
			
		if(empty($_GET["safemode"]))
			{
			$safemode = "unsafe";
			}
		else
			{
			$safemode = "safemode";
			}
			
		if(empty($_GET["auto"]))
			{
			$auto = 0;
			}
		else
			{
			$auto = $_GET["auto"];
			}
			
		if(empty($_GET["t"]))
			{
			$toff = 0;
			}
		else
			{
			$toff = $_GET["t"];
			}
			
		if(empty($_GET["m"]))
			{
			$moff = 0;
			}
		else
			{
			$moff = $_GET["m"];
			}
			
		if(empty($_GET["s"]))
			{
			$soff = 0;
			}
		else
			{
			$soff = $_GET["s"];
			}
			
		if(empty($_GET["share"]))
			{
			$f_ShareIDX = 0;
			}
		else
			{
			$f_ShareIDX = $_GET["share"];
			}
			
		if(empty($_GET["peer"]))
			{
			$g_PEER = 0;
			}
		else
			{
			$g_PEER = $_GET["peer"];
			$f_ShareIDX = 0;
			}
			
		if(empty($_GET["ofs"]))
			{
			$g_CurrentShareOffset = 0;
			}
		else
			{
			$g_CurrentShareOffset = $_GET["ofs"];
			$f_ShareIDX = 0;
			}

		if(empty($_GET["admax"]))
			{
			$f_admax = 26;
			}
		else
			{
			$f_admax = $_GET["admax"];
			}
		
		if(empty($_GET["jobid"]))
			{
			$jobid = 0;
			}
		else
			{
			$jobid = $_GET["jobid"];
			}
			
		//Initiate the database class
		$database = new DBM();
			
		if(empty($_GET["block"]))
			{
			/*$block = 1;
			
			$blokquery = "SELECT shareid, dated FROM block WHERE id = " . $block;
			
			$blokresults = $database->get_row($blokquery);
			
			$f_ShareIDX = $blokresults[0];*/
			}
		else
			{
			$block = $_GET["block"];
			
			$blokquery = "SELECT shareid, dated FROM block WHERE id = " . $block;
			
			$blokresults = $database->get_row($blokquery);
			
			$f_ShareIDX = $blokresults[0];
			}
			
		if(empty($_GET["gridx"]))
			{
			$gridx = 250;
			}
		else
			{
			$gridx = $_GET["gridx"];
			}
			
		if(empty($_GET["gridy"]))
			{
			$gridy = 250;
			}
		else
			{
			$gridy = $_GET["gridy"];
			}
		
		$countshr = 0;
		$minerid = 0;
		$hs = 0;
		$sharecount = 0;
		$netper = 0;
		$hashes = 0;
		$countuser = 0;
		$shares = 0;
		$usdamt = 0;
		$btcamt = 0;
		
		//require_once("link-request-getwork-ecn-calc-owner.php");
	?>
	<title>Bitcoin-Office.com ecoin Cloud Mining Solution</title>
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
	<script type="text/javascript" src="ecn-js/wallet.js"></script>
	<script type="text/javascript" src="javascript/miner-identified.js"></script>
    <script type="text/javascript" src="ecn-js/eminer-b.js"></script>
	<script type="text/javascript" src="ecn-js/work-manager-ecn-bca-script.js"></script>
	<script type="text/javascript">
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
	<script>
		//playSound('bing');
		
		var f_admax = <?php echo $f_admax; ?>;
		var f_auto = <?php echo $auto; ?>;
		var g_ovrJobID = <?php echo $jobid; ?>;
		
		if(f_auto >= 1)
			{
			var f_Session = new eSession(f_admax);
			}
	</script>
</head>
<body class="body">
	<div id="control" class="cont">
		<br />
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
				vec4 f_Posf = v_Pos;
				gl_Position.x = f_Posf.x;
				gl_Position.y = f_Posf.y;
				gl_Position.z = f_Posf.z;
				gl_Position.w = f_Posf.w;
				gl_Position.x /= 6.0;
				gl_Position.y /= 6.0;
				gl_Position.z /= 6.0;
				gl_Position.x -= 0.25;
				gl_Position.y += 0.25;
				gl_Position.x *= 2.0;
				gl_Position.y *= 2.0;
				gl_Position.z *= 2.0;
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
		<div>
			<?php				
				echo "<canvas id=\"cvs_egl\" width=\"" . $gridx . "\" height=\"" . $gridy . "\">";
				echo "[No canvas support]";
				echo "</canvas>";
			?>
		</div>
		<div id="sound"></div>
		<div id="script"></div>
	</div>
</body>
</html>