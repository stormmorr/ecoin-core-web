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
	
	<script>
		var g_IP = '<?php echo $_SERVER['REMOTE_ADDR']; ?>';
		var username = '<?php echo $username; ?>';
	</script>
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
	<script type="text/javascript" src="ecn-js/cube-etx.js"></script>
	<script type="text/javascript" src="ecn-js/classtarget.js"></script>
	<script type="text/javascript" src="ecn-js/wallet.js"></script>
	<script type="text/javascript" src="javascript/miner-identified.js"></script>
    <script type="text/javascript" src="ecn-js/eminer-b.js"></script>
	<script type="text/javascript" src="ecn-js/work-manager-ecn-bc.js"></script>
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
		function startm()
			{
			playSound('bing');
			
			document.getElementById('start1').style.display = 'none';
			document.getElementById('start2').style.display = 'none';
			
				////////
			   //
			  //
			 // Mine Icon
			//
			var finger1 = Math.floor(Math.random()*22);
			var finger2 = Math.floor(Math.random()*22);
			var finger3 = Math.floor(Math.random()*22);
			
			var fname1 = "img/stack/progressicons/" + finger1 + ".gif";
			var fname2 = "img/stack/progressicons/" + finger2 + ".gif";
			var fname3 = "img/stack/progressicons/" + finger3 + ".gif";
			
			document.getElementById('hashpower1').innerHTML = '<img src="' + fname1 + '\" width="33" height="33"/>';
			document.getElementById('hashpower2').innerHTML = '<img src="' + fname2 + '\" width="33" height="33"/>';
			document.getElementById('hashpower3').innerHTML = '<img src="' + fname3 + '\" width="33" height="33"/>';
			
			var f_admax = <?php echo $f_admax; ?>;
			
			var f_Session = new eSession(f_admax);
			}
			
		function transactm()
			{
			playSound('bing');
			
			var f_A = document.getElementById('textA').value;
			var f_B = document.getElementById('textB').value;
			var f_AMT = document.getElementById('textAMT').value;
			
			$.post("link-request-getwork-ecn-fast.php", {type: "GWQ_SELECT", query: "SELECT id, jobid, blockledger, dated FROM block ORDER BY dated DESC LIMIT 1"}, function(data, status)
				{
				var resp = data;
				var resultcount = resp.resultcount;
			
				var g_JobID = 1;
				var f_BlockID = 1;
			
				if(resultcount > 0)
					{
					f_BlockID = resp.result[0];
					g_JobID = resp.result[1];
					g_JobID++;
					}
					
				var f_JobID = g_JobID;
			
				ag_GenerateTransaction(f_A, f_B, f_AMT, g_Wallet, f_JobID);
				}, "json");
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
</head>
    <body class="body">
        <div id="control" class="cont">
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
										<img class="callout5" src="http://leahboss.bid/boss/image/callout.gif" />
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
										<img class="callout5" src="http://leahboss.bid/boss/image/callout.gif" />
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
										<img class="callout5" src="http://leahboss.bid/boss/image/callout.gif" />
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
										<img class="callout5" src="http://leahboss.bid/boss/image/callout.gif" />
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
										<img class="callout5" src="http://leahboss.bid/boss/image/callout.gif" />
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
										<img class="callout5" src="http://leahboss.bid/boss/image/callout.gif" />
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
										<img class="callout5" src="http://leahboss.bid/boss/image/callout.gif" />
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
										<img class="callout5" src="http://leahboss.bid/boss/image/callout.gif" />
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
										<img class="callout5" src="http://leahboss.bid/boss/image/callout.gif" />
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
										<img class="callout5" src="http://leahboss.bid/boss/image/callout.gif" />
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
										<img class="callout5" src="http://leahboss.bid/boss/image/callout.gif" />
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
										<img class="callout5" src="http://leahboss.bid/boss/image/callout.gif" />
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
			<h2 style="font-family: Abel;" class="font"><a href="http://www.bitcoin-office.com">Bitcoin Office</a></h2>
			<br />
		</div>
		<div>
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
					//v_Pos.x /= 15.0;
					//v_Pos.y /= 15.0;
					//v_Pos.z /= 15.0;
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
					gl_Position.x /= 6.0;
					gl_Position.y /= 6.0;
					gl_Position.z /= 6.0;
					gl_Position.x -= 0.25;
					gl_Position.y += 0.25;
					gl_Position.x *= 3.0;
					gl_Position.y *= 3.0;
					gl_Position.z *= 3.0;
					//gl_Position.w /= 15.0;
					//gl_Position.x = 0.0;
					//gl_Position.y = 0.0;
					//gl_Position.z += 30.0;
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
			<button id="start1" onclick="startm();" class="btn btn-primary">Mine ECN</button>
			<?php echo "<a href=\"http://www.bitcoin-office.com/egl.php?w=" . $username . "\">Stop Miner</a>"; ?>
			<div>
				<canvas id="cvs_egl" width="1500" height="1000">
					[No canvas support]
				</canvas>
			</div>
			<button id="start2" onclick="startm();" class="btn btn-primary">Mine ECN</button>
			<?php echo "<a href=\"http://www.bitcoin-office.com/egl.php?w=" . $username . "\">Stop Miner</a>"; ?>
			<div id="sound"></div>
			<textarea id="textA"></textarea>
			<script>
				document.getElementById("textA").value = g_Wallet.GetAdr();
			</script>
			<textarea id="textB">1MqjK1sRQFo79QRPiqsBB2BTjkm1kLFMpX</textarea>
			<textarea id="textAMT">0.5</textarea>
			<button id="starttx1" onclick="transactm();" class="btn btn-primary">Generate Transaction</button>
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
						<a href="http://www.ecn.world" style="font-family: Abel;" onclick="mouseoversound.playclip()" onmouseover="clicksound.playclip()" class="font">ECN.world</a>
					</td>
				</tr>
				<tr>
					<td>
						<img src="http://www.ecn.world/assets/img/Square44x44Logo.scale-100.png" />
					</td>
					<td>
						<a href="http://www.bitcoin-office.com/ecn-stat.php" style="font-family: Abel;" onclick="mouseoversound.playclip()" onmouseover="clicksound.playclip()" class="font">stat.ECN.world</a>
					</td>
				</tr>
				<tr>
					<td>
						<img src="http://www.bitcoin-office.com/favicon-32x32.png" />
					</td>
					<td>
						<a href="http://www.bitcoin-office.com" style="font-family: Abel;" onclick="mouseoversound.playclip()" onmouseover="clicksound.playclip()" class="font">Bitcoin Office</a>
					</td>
				</tr>
				<tr>
					<td>
						<img src="http://www.bitcoin-office.com/favicon-32x32.png" />
					</td>
					<td>
						<a href="http://www.bitcoin-office.com/gridseed.php?miner=ecn-seed-b.php&admax=9&size=1&auto=1" style="font-family: Abel;" onclick="mouseoversound.playclip()" onmouseover="clicksound.playclip()" class="font">Bitcoin Office eGridseed</a>
					</td>
				</tr>
				<tr>
					<td>
						<img src="http://www.bitcoin-office.com/favicon-32x32.png" />
					</td>
					<td>
						<a href="http://www.bitcoin-office.com/eglx.php" style="font-family: Abel;" onclick="mouseoversound.playclip()" onmouseover="clicksound.playclip()" class="font">Bitcoin Office eViewer</a>
					</td>
				</tr>
			</tbody>
		</table>
		</div>
	</body>
</html>