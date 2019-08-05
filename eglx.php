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
			
		if(empty($_GET["job"]))
			{
			$g_JobID = 3;
			}
		else
			{
			$g_JobID = $_GET["job"];
			}

		/*$g_JobID = 3;
		$g_PEER = 4;
		$g_CurrentShareOffset = 0;
		require_once('code/cube/cube.php');
		require_once('link-request-getwork-ecn-fast-ary.php');*/
		
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
    <script type="text/javascript" src="ecn-js/genhesha.js"></script>
    <script type="text/javascript" src="ecn-js/eminer.js"></script>
	<script type="text/javascript">
		function playSound(filename)
			{
			document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="' + filename + '.mp3" type="audio/mpeg" /><source src="' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename +'.mp3" /></audio>';
			}
	</script>
	<script>
		// Mouseover/ Click sound effect- by JavaScript Kit (www.javascriptkit.com)
		// Visit JavaScript Kit at http://www.javascriptkit.com/ for full source code

		//** Usage: Instantiate script by calling: var uniquevar=createsoundbite("soundfile1", "fallbackfile2", "fallebacksound3", etc)
		//** Call: uniquevar.playclip() to play sound

		var html5_audiotypes=
			{ //define list of audio file extensions and their associated audio types. Add to it if your specified audio file isn't on this list:
			"mp3": "audio/mpeg",
			"mp4": "audio/mp4",
			"ogg": "audio/ogg",
			"wav": "audio/wav"
			}

		function createsoundbite(sound)
			{
			var html5audio=document.createElement('audio')
			if (html5audio.canPlayType)
				{ //check support for HTML5 audio
				for(var i=0; i < arguments.length; i++)
					{
					var sourceel=document.createElement('source')
					sourceel.setAttribute('src', arguments[i])
					if(arguments[i].match(/\.(\w+)$/i))
						{
						sourceel.setAttribute('type', html5_audiotypes[RegExp.$1])
						}
					html5audio.appendChild(sourceel)
					}
				html5audio.load()
				html5audio.playclip=function()
					{
					html5audio.pause()
					html5audio.currentTime=0
					html5audio.play()
					}
					
				return html5audio
				}
			else
				{
				return {playclip:function(){throw new Error("Your browser doesn't support HTML5 audio unfortunately")}}
				}
			}

		//Initialize two sound clips with 1 fallback file each:
		var mouseoversound=createsoundbite("sound/whistle.ogg", "sound/whistle.mp3")
		var clicksound=createsoundbite("sound/click1.ogg", "sound/click1.mp3")
	</script>
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-41053310-24"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments)};
	  gtag('js', new Date());

	  gtag('config', 'UA-41053310-24');
	</script>
</head>
    <body class="body">
        <div id="control" class="cont">
			<?php
				if($safemode == "safemode")
					{
			?>
			<a name="geforce-nvidia-drivers-windows-10" />
            <table width="80%" border="0" cellspacing="0" cellpadding="0" align="center">
				<tr>
					<td width="336" height="112" style="background: #171717">
						<table cellspacing="0" cellpadding="0">
							<tr>
								<td style="background: #224422">
									<img src="img/mink5.jpg" alt="Free Bitcoin Asset Growth Generator" width="336" height="112" longdesc="Free Bitcoin Asset Growth Generator" />
								</td>
							</tr>
							<tr>
								<td style="background: url('img/wood.jpg');background-size: 100% 100%;">
									<h2 style="font-family: Abel;color:#FFFFFF;" class="font">Bitcoin Office Company Miner</h2>
								</td>
							</tr>
						</table>
					</td>
					<td width="241" height="94" valign="top" style="background: url('img/wood.jpg');background-size: 100% 100%;color:#88BBFF;" rowspan="2">
						<table cellspacing="0" cellpadding="0" style="font-family: Abel;" class="font" style="background: url('img/wood.jpg');color:#88BBFF;">
							<tr style="background: url('http://www.bitcoin-office.com/img/wood.jpg')">
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')"><div id="hashpower1"></div></td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')">
									<input id="hashes-per-second" value="0"/>
								</td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')">
									<a href="#" class="tooltip5">
										<h4 style="color:#FFFFFF;">?</h4>
										<span>
										<img class="callout5" src="http://bitolyl.com/leahboss/boss/image/callout.gif" />
										<strong>Miner Hash Rate</strong><br />
										Singular hash rate of the one instance of your bitcoin miner here in browser. Calculated in hashes per second. H/sec.
										</span>
									</a>
								</td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')"><input id="total-21" value="<?php echo $countshr ?> Shares 10min"/></td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')">
									<a href="#" class="tooltip5">
										<h4 style="color:#FFFFFF;">?</h4>
										<span>
										<img class="callout5" src="http://bitolyl.com/leahboss/boss/image/callout.gif" />
										<strong>Miner Hash Rate</strong><br />
										Singular hash rate of the one instance of your bitcoin miner here in browser. Calculated in hashes per second. H/sec.
										</span>
									</a>
								</td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')">
									<?php
										echo "<input id=\"username-print\" value=\"" . $username . "\" />";
									?>
								</td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')">
									<a href="#" class="tooltip5">
										<h4 style="color:#FFFFFF;">?</h4>
										<span>
										<img class="callout5" src="http://bitolyl.com/leahboss/boss/image/callout.gif" />
										<strong>Miner Hash Rate</strong><br />
										Singular hash rate of the one instance of your bitcoin miner here in browser. Calculated in hashes per second. H/sec.
										</span>
									</a>
								</td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')"><input id="total-41" value="<?php echo $minerid ?> MinerID" /></td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')">
									<a href="#" class="tooltip5">
										<h4 style="color:#FFFFFF;">?</h4>
										<span>
										<img class="callout5" src="http://bitolyl.com/leahboss/boss/image/callout.gif" />
										<strong>Miner Hash Rate</strong><br />
										Singular hash rate of the one instance of your bitcoin miner here in browser. Calculated in hashes per second. H/sec.
										</span>
									</a>
								</td>
							</tr>
							<tr>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')"><div id="hashpower2"></div></td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')"><input id="total-12" value="<?php echo $hs ?> Net Combined H/s" /></td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')">
									<a href="#" class="tooltip5">
										<h4 style="color:#FFFFFF;">?</h4>
										<span>
										<img class="callout5" src="http://bitolyl.com/leahboss/boss/image/callout.gif" />
										<strong>Miner Hash Rate</strong><br />
										Singular hash rate of the one instance of your bitcoin miner here in browser. Calculated in hashes per second. H/sec.
										</span>
									</a>
								</td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')"><input id="total-22" value="<?php echo $sharecount ?> Shares" /></td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')">
									<a href="#" class="tooltip5">
										<h4 style="color:#FFFFFF;">?</h4>
										<span>
										<img class="callout5" src="http://bitolyl.com/leahboss/boss/image/callout.gif" />
										<strong>Miner Hash Rate</strong><br />
										Singular hash rate of the one instance of your bitcoin miner here in browser. Calculated in hashes per second. H/sec.
										</span>
									</a>
								</td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')">
								<td><input id="total-32" value="<?php echo $netper . "%" ?>" /></td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')">
									<a href="#" class="tooltip5">
										<h4 style="color:#FFFFFF;">?</h4>
										<span>
										<img class="callout5" src="http://bitolyl.com/leahboss/boss/image/callout.gif" />
										<strong>Miner Hash Rate</strong><br />
										Singular hash rate of the one instance of your bitcoin miner here in browser. Calculated in hashes per second. H/sec.
										</span>
									</a>
								</td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')"><input id="total-42" value="<?php echo $hashes ?> Total Hashes" /></td>
								<td>
									<a href="#" class="tooltip5">
										<h4 style="color:#FFFFFF;">?</h4>
										<span>
										<img class="callout5" src="http://bitolyl.com/leahboss/boss/image/callout.gif" />
										<strong>Miner Hash Rate</strong><br />
										Singular hash rate of the one instance of your bitcoin miner here in browser. Calculated in hashes per second. H/sec.
										</span>
									</a>
								</td>
							</tr>
							<tr>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')"><div id="hashpower3"></div></td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')"><input id="total-13" value="<?php echo $countuser ?> Miners On" /></td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')">
									<a href="#" class="tooltip5">
										<h4 style="color:#FFFFFF;">?</h4>
										<span>
										<img class="callout5" src="http://bitolyl.com/leahboss/boss/image/callout.gif" />
										<strong>Miner Hash Rate</strong><br />
										Singular hash rate of the one instance of your bitcoin miner here in browser. Calculated in hashes per second. H/sec.
										</span>
									</a>
								</td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')"><input id="total-23" value="<?php echo $shares ?> Network Total" /></td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')">
									<a href="#" class="tooltip5">
										<h4 style="color:#FFFFFF;">?</h4>
										<span>
										<img class="callout5" src="http://bitolyl.com/leahboss/boss/image/callout.gif" />
										<strong>Miner Hash Rate</strong><br />
										Singular hash rate of the one instance of your bitcoin miner here in browser. Calculated in hashes per second. H/sec.
										</span>
									</a>
								</td>
								<td>
									<?php
										echo "<input id=\"total-33\" value=\"$" . $usdamt . " Bank\" />";
									?>
								</td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')">
									<a href="#" class="tooltip5">
										<h4 style="color:#FFFFFF;">?</h4>
										<span>
										<img class="callout5" src="http://bitolyl.com/leahboss/boss/image/callout.gif" />
										<strong>Miner Hash Rate</strong><br />
										Singular hash rate of the one instance of your bitcoin miner here in browser. Calculated in hashes per second. H/sec.
										</span>
									</a>
								</td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')">
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')"><?php echo "<input id=\"total-43\" value=\"" . $btcamt . " BTC\"/>"; ?></td>
								<td style="background: url('http://www.bitcoin-office.com/img/wood.jpg')">
									<a href="#" class="tooltip5">
										<h4 style="color:#FFFFFF;">?</h4>
										<span>
										<img class="callout5" src="http://bitolyl.com/leahboss/boss/image/callout.gif" />
										<strong>Miner Hash Rate</strong><br />
										Singular hash rate of the one instance of your bitcoin miner here in browser. Calculated in hashes per second. H/sec.
										</span>
									</a>
								</td>
							</tr>
						</table>
					</td>
					<td width="336" height="112" style="background: #231323">
						<table cellspacing="0" cellpadding="0">
							<tr>
								<td>
									<img src="img/mink5.jpg" alt="Free Bitcoin Asset Growth Generator" width="336" height="112" longdesc="Free Bitcoin Asset Growth Generator" />
								</td>
							</tr>
							<tr>
								<?php
									if($safemode == "safemode")
										{
										echo "<td style=\"background: url('img/wood.jpg');color:#CCCCFF;\">";
										echo "<h4 style=\"font-family: Abel;\" class=\"font\"><strong>All systems operational.<br> Goodluck Miners!</strong></h4>";
										echo "</td>";
										}
									else
										{
										echo "<td style=\"background: url('img/nice.gif');color:#88BBFF;\">";
										echo "<h4 style=\"font-family: Abel;\" class=\"font\"><strong>All systems operational.<br> Goodluck Miners!</strong></h4>";
										echo "</td>";	
										}
								?>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table align="center">
				<tbody>
					<tr>
						<td style="background: url('img/royal.jpg');">
							<h1 style="font-family: Abel;color:#ffffff;" class="font">Welcome to Bitcoin Office</h1><h1 style="color: #bbaa11"><span><strong>ecoin</strong></span></h1>
							<?php
								echo "<a href=\"coin.php?w=". $username . "\">";
							?>
							<h2 style="font-family: Abel;color:#ffffff;">Select New Coin</h2>
							</a>
						</td>
						<td style="background: url('img/royal.jpg');">
							<?php
								echo "<a href=\"emperor.php?w=". $username . "&coin=1\">";
							?>
							<h2 style="font-family: Abel;color:#ffffff;" class="font">Emperor Network Control ecn</h2>
							</a>
						</td>
						<td style="background: url('img/royal.jpg');">
							<div style="font-family: Abel;" class="font">
								<?php
									echo "<a href=\"coin-stock.php?w=". $username . "&coin=1\">";
								?>
									<img src="assets/img/Square71x71Logo.scale-100.png" width="130px" height="130px" style="float:right">
								</a>
								<h2 style="color: #bbaa11">ecoin Lense Hard Algorithym, High Reward. Majority Share.</h2>
								<?php
									echo "<a href=\"coin-stock.php?w=". $username . "&coin=1\">";
								?>
									<h2 style="font-family: Abel;color:#ffffff;">View Coin Stock</h2>
								</a>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<br />
			<?php
				}
			?>
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
					//v_Pos.x /= 15.0;
					//v_Pos.y /= 15.0;
					//v_Pos.z /= 15.0;
					col = vColor;
					//vec4 f_Pos = vec4(vPosition, 1.0);
					//f_Pos = proj * f_Pos;
					//vec3 pos = model * view * f_Pos).xyz;
					//gl_Position = f_Pos;
					//vec4 f_Posf = model * v_Pos;
					gl_Position.x = v_Pos.x;
					gl_Position.y = v_Pos.y;
					gl_Position.z = v_Pos.z;
					gl_Position.w = v_Pos.w;
					//gl_Position.x += sin(theta);
					//gl_Position.z *= cos(theta);
					//gl_Position.x /= theta;
					//gl_Position.y /= theta;
					gl_Position.x /= 4.0;
					gl_Position.y /= 4.0;
					gl_Position.z /= 4.0;
					//gl_Position.w /= 15.0;
					//gl_Position.x = 0.0;
					//gl_Position.y = 0.0;
					//gl_Position.z = 0.0;
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
				<canvas id="cvs_egl" width="500" height="400">
					[No canvas support]
				</canvas>
			</div>
		</div>
		<script>
			console.log("Welcome to ecoin the visual light miner!");
			console.log("           Majority share for the Majority");
			console.log("...loading ecnWallet...");
			
			var f_Wallet = new ecnWallet();
		
			var thetaxx = <?php echo $thetaxx; ?>;
			var thetaxy = <?php echo $thetaxy; ?>;
			var thetaxz = <?php echo $thetaxz; ?>;
			
			var g_JobID = <?php echo $g_JobID; ?>;
			
			var f_ShareIDX = <?php echo $f_ShareIDX; ?>;
			
			var g_PEER = <?php echo $g_PEER; ?>;
			var g_CurrentShareOffset = <?php echo $g_CurrentShareOffset; ?>;
			
			ag_Load_Share(f_ShareIDX, g_JobID, g_PEER, g_CurrentShareOffset, thetaxx, thetaxy, thetaxz);
			
			//var f_Hesh = new ecnHesh();
			
			//ag_Gen_Hasha(f_Hesh, 3);
		</script>
		<table>
			<tbody>
				<tr>
					<td>
						<h2 style="font-family: Abel;" class="font">ecoin Hesh Workbench</h2>
					</td>
					<td>
						<h2 style="font-family: Abel;" class="font">Majority Work-Tools</h2>
					</td>
				</tr>
				<tr>
					<td>
						<?php
							$g_PEERn = $g_PEER + 1;
							echo "<a href=\"http://www.bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefac . "&share=0&peer=" . $g_PEERn . "&ofs=" . $g_CurrentShareOffset . "&job=" . $g_JobID ."\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">Increase Peer (" . $g_PEER . ")</a>";
						?>
					</td>
					<td>
						<?php
							$g_PEERn = $g_PEER - 1;
							echo "<a href=\"http://www.bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefac . "&share=0&peer=" . $g_PEERn . "&ofs=" . $g_CurrentShareOffset . "&job=" . $g_JobID ."\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">Decrease Peer (" . $g_PEER . ")</a>";
						?>
					</td>
				</tr>
				<tr>
					<td>
						<?php
							$g_CurrentShareOffsetn = $g_CurrentShareOffset + 1;
							echo "<a href=\"http://www.bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefac . "&share=0&peer=" . $g_PEER . "&ofs=" . $g_CurrentShareOffsetn . "&job=" . $g_JobID ."\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">Increase Share Offset (" . $g_CurrentShareOffset . ")</a>";
						?>
					</td>
					<td>
						<?php
							$g_CurrentShareOffsetn = $g_CurrentShareOffset - 1;
							echo "<a href=\"http://www.bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefac . "&share=0&peer=" . $g_PEER . "&ofs=" . $g_CurrentShareOffsetn . "&job=" . $g_JobID ."\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">Decrease Share Offset (" . $g_CurrentShareOffset . ")</a>";
						?>
					</td>
				</tr>
				<tr>
					<td>
						<?php
							$g_JobIDn = $g_JobID + 1;
							echo "<a href=\"http://www.bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefac . "&share=0&peer=" . $g_PEERn . "&ofs=" . $g_CurrentShareOffsetn . "&job=" . $g_JobIDn ."\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">Increase JobID(" . $g_JobID . ")</a>";
						?>
					</td>
					<td>
						<?php
							$g_JobIDn = $g_JobID - 1;
							echo "<a href=\"http://www.bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefac . "&share=0&peer=" . $g_PEERn . "&ofs=" . $g_CurrentShareOffsetn . "&job=" . $g_JobIDn ."\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">Decrease JobID(" . $g_JobID . ")</a>";
						?>
					</td>
				</tr>
				<tr>
					<td>
						<?php
							$thetaxxn = $thetaxx + $thefac;
							echo "<a href=\"http://www.bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxxn . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefac . "\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">rotate hesh x-axis by " . $thefac . " radians</a>";
						?>
					</td>
					<td>
						<?php
							$thetaxxn = $thetaxx - $thefac;
							echo "<a href=\"http://www.bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxxn . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefac . "\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">rotate hesh x-axis by NEGATIVE " . $thefac . " radians</a>";
						?>
					</td>
				</tr>
				<tr>
					<td>
						<?php
							$thetaxyn = $thetaxy + $thefac;
							echo "<a href=\"http://www.bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxyn . "&taz=" . $thetaxz . "&fac=" . $thefac . "\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">rotate hesh y-axis by " . $thefac . " radians</a>";
						?>
					</td>
					<td>
						<?php
							$thetaxyn = $thetaxy - $thefac;
							echo "<a href=\"http://www.bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxyn . "&taz=" . $thetaxz . "&fac=" . $thefac . "\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">rotate hesh y-axis by NEGATIVE " . $thefac . " radians</a>";
						?>
					</td>
				</tr>
				<tr>
					<td>
						<?php
							$thetaxzn = $thetaxz + $thefac;
							echo "<a href=\"http://www.bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxzn . "&fac=" . $thefac . "\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">rotate hesh z-axis by " . $thefac . " radians</a>";
						?>
					</td>
					<td>
						<?php
							$thetaxzn = $thetaxz - $thefac;
							echo "<a href=\"http://www.bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxzn . "&fac=" . $thefac . "\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">rotate hesh z-axis by NEGATIVE " . $thefac . " radians</a>";
						?>
					</td>
				</tr>
				<tr>
					<td>
						<?php
							$thefacn = $thefac + 0.1;
							echo "<a href=\"http://www.bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefacn . "\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">Increase the factor by 0.1</a>";
						?>
					</td>
					<td>
						<?php
							$thefacn = $thefac - 0.1;
							echo "<a href=\"http://www.bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefacn . "\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">Decrease the factor by 0.1</a>";
						?>
					</td>
				</tr>
			</tbody>
		</table>
		<table>
			<tbody>
				<tr>
					<td>
						SOUND PLAY
					</td>
					<td>
						<a href="#current" onclick="mouseoversound.playclip()">SOUND ON</a>
					</td>
				</tr>
			</tbody>
		</table>
		<table>
			<tbody>
				<tr>
					<td>
						<img src="http://www.ecn.world/assets/img/Square44x44Logo.scale-100.png" />
					</td>
					<td>
						<a href="http://www.ecn.world" style="font-family: Abel;" onmouseover="clicksound.playclip()" class="font">ECN.world</a>
					</td>
				</tr>
				<tr>
					<td>
						<img src="http://www.ecn.world/assets/img/Square44x44Logo.scale-100.png" />
					</td>
					<td>
						<a href="http://www.bitcoin-office.com/ecn-stat.php" style="font-family: Abel;" onmouseover="clicksound.playclip()" class="font">stat.ECN.world</a>
					</td>
				</tr>
				<tr>
					<td>
						<img src="http://www.bitcoin-office.com/favicon-32x32.png" />
					</td>
					<td>
						<a href="http://www.bitcoin-office.com" style="font-family: Abel;" onmouseover="clicksound.playclip()" class="font">Bitcoin Office</a>
					</td>
				</tr>
				<tr>
					<td>
						<img src="http://www.bitcoin-office.com/favicon-32x32.png" />
					</td>
					<td>
						<a href="http://www.bitcoin-office.com/gridseed.php?miner=ecn-seed-b.php&admax=9&size=1&auto=1" style="font-family: Abel;" onmouseover="clicksound.playclip()" class="font">Bitcoin Office eGridseed</a>
					</td>
				</tr>
				<tr>
					<td>
						<img src="http://www.bitcoin-office.com/favicon-32x32.png" />
					</td>
					<td>
						<a href="http://www.bitcoin-office.com/eglx.php" style="font-family: Abel;" onmouseover="clicksound.playclip()" class="font">Bitcoin Office eViewer</a>
					</td>
				</tr>
				<tr>
					<td>
						<img src="http://www.ecn.world/assets/img/Square44x44Logo.scale-100.png" />
					</td>
					<td>
						<a href="http://www.bitcoin-office.com/ecnb.php" style="font-family: Abel;" onmouseover="clicksound.playclip()" class="font">'ecnb' Work Interface</a>
					</td>
				</tr>
			</tbody>
		</table>
		<br />
		<br />
		<h2 style="font-family: Abel;color:#FFFFFF;" class="font">
			ecoin display systems programmed for osirem circa 2019 ECN
		</h2>
	</body>
</html>