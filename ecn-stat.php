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
			
		if(empty($_GET["owner"]))
			{
			$owner = "";
			}
		else
			{
			$owner = $_GET["owner"];
			}
		
		if(empty($_GET["w"]))
			{
			$username = "osirem";
			}
		else
			{
			$username = $_GET["w"];
			}
			
		if(empty($_GET["safemode"]))
			{
			$safemode = "unsafe";
			}
		else
			{
			$safemode = "safemode";
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
	<title>stat.ecn.world</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="ecoin statistics global for all ECN world existence">
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
    <script type="text/javascript" src="ecn-js/eminer.js"></script>
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
										<img class="callout5" src="http://www.bitolyl.com/leahboss/boss/image/callout.gif" />
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
										<img class="callout5" src="http://www.bitolyl.com/leahboss/boss/image/callout.gif" />
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
										<img class="callout5" src="http://www.bitolyl.com/leahboss/boss/image/callout.gif" />
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
										<img class="callout5" src="http://www.bitolyl.com/leahboss/boss/image/callout.gif" />
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
										<img class="callout5" src="http://www.bitolyl.com/leahboss/boss/image/callout.gif" />
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
										<img class="callout5" src="http://www.bitolyl.com/leahboss/boss/image/callout.gif" />
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
										<img class="callout5" src="http://www.bitolyl.com/leahboss/boss/image/callout.gif" />
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
										<img class="callout5" src="http://www.bitolyl.com/leahboss/boss/image/callout.gif" />
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
										<img class="callout5" src="http://www.bitolyl.com/leahboss/boss/image/callout.gif" />
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
										<img class="callout5" src="http://www.bitolyl.com/leahboss/boss/image/callout.gif" />
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
										<img class="callout5" src="http://www.bitolyl.com/leahboss/boss/image/callout.gif" />
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
										<img class="callout5" src="http://www.bitolyl.com/leahboss/boss/image/callout.gif" />
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
		<table>
			<tbody>
				<tr>
					<td>
						<h2 style="font-family: Abel;" class="font">ECN</h2>
					</td>
					<td>
						<h2 style="font-family: Abel;" class="font">ecoin Statistics</h2>
					</td>
					<td>
						<h2 style="font-family: Abel;" class="font">Majority Work-Tools</h2>
					</td>
					<td>
						<h2 style="font-family: Abel;" class="font">Majority Rewards</h2>
					</td>
				</tr>
				<tr>
					<td>
						<h2 style="font-family: Abel;" class="font">TXID</h2>
					</td>
					<td>
						<div id="owner"></div>
						<script>
							document.getElementById("owner").innerHTML = "<h2 style=\"font-family: Abel;\" class=\"font\">" + g_Wallet.GetAdr() + "</h2>";
						</script>
					</td>
					<td>
						<script>
							g_Wallet.GetBalance(false, function(f_Balance)
								{
								document.getElementById("ownerbalance").innerHTML = "<h2 style=\"font-family: Abel;\" class=\"font\">" + f_Balance + " ECN ecoin</h2>";
									
								g_Wallet.GetBalance(true, function(f_PoundsBalance)
									{
									document.getElementById("poundsbalance").innerHTML = "<h2 style=\"font-family: Abel;\" class=\"font\">£" + f_PoundsBalance + "</h2>";
									});
								});
						</script>
						<div id="ownerbalance"></div>
					</td>
					<td>
						<div id="poundsbalance"></div>
					</td>
				</tr>
			</tbody>
		</table>
		<table>
			<tbody>
				<?php
					if($owner != "")
						{
						$f_txquery = "SELECT id, owner, amt, dated FROM transactions WHERE owner = '" . $owner . "'";
				
						$tx_num_row = $database->num_rows($f_txquery);
						
						if($tx_num_row >= 1)
							{
							if($tx_num_row == 1)
								{
								$tx_row = $database->get_row($f_txquery);
								
								echo "<tr>";
								echo "<td>";
								echo "<h2 style=\"font-family: Abel;\" class=\"font\">" . $tx_row[0] . "</h2>";
								echo "</td>";
								echo "<td>";
								echo "<h2 style=\"font-family: Abel;\" class=\"font\">" . $tx_row[1] . "</h2>";
								echo "</td>";
								echo "<td>";
								echo "<h2 style=\"font-family: Abel;\" class=\"font\">" . $tx_row[2] . "</h2>";
								echo "</td>";
								echo "<td>";
								echo "<h2 style=\"font-family: Abel;\" class=\"font\">" . $tx_row[3] . "</h2>";
								echo "</td>";
								echo "</tr>";
								}
							else
								{
								$tx_results = $database->get_results($f_txquery);
			
								// Loop through each row of results..
								foreach($tx_results as $tx_result)
									{	
									echo "<tr>";
									echo "<td>";
									echo "<h2 style=\"font-family: Abel;\" class=\"font\">" . $tx_result["id"] . "</h2>";
									echo "</td>";
									echo "<td>";
									echo "<h2 style=\"font-family: Abel;\" class=\"font\">" . $tx_result["owner"] . "</h2>";
									echo "</td>";
									echo "<td>";
									echo "<h2 style=\"font-family: Abel;\" class=\"font\">" . $tx_result["amt"] . "</h2>";
									echo "</td>";
									echo "<td>";
									echo "<h2 style=\"font-family: Abel;\" class=\"font\">" . $tx_result["dated"] . "</h2>";
									echo "</td>";
									echo "</tr>";
									}
								}
							}
							
						echo "<tr>";
						echo "<td>";
						echo "</td>";
						echo "<td>";
						echo "<h2 style=\"font-family: Abel;\" class=\"font\"><a href=\"ecn-stat.php\">CLOSE TRANSACTION WINDOW RESULTS</a></h2>";
						echo "</td>";
						echo "</tr>";
						}
				?>
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
					<td>
						<div id="loading"></div>
						<script>
							document.getElementById("loading").innerHTML = "<a href=\"ecn-stat.php?owner=" + g_Wallet.GetAdr() + "\" style=\"font-family: Abel;\" onclick=\"mouseoversound.playclip()\" onmouseover=\"clicksound.playclip()\" class=\"font\">LOAD ACTIVE TRANSACTIONS OF WALLET</a>";
						</script>
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