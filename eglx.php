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

		if(empty($_GET["vote"]))
			{
			$g_VoteC = 0;
			}
		else
			{
			$g_VoteC = $_GET["vote"];
			}
			
		//Initiate the database class
		$database = new DBM();
			
		if(empty($_GET["block"]))
			{
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
			
		$shrquery = "SELECT id, score FROM share WHERE id = " . $f_ShareIDX;
		
		$shrresults = $database->get_row($shrquery);
		
		$g_Vote = $shrresults[1];
			
		$getip = $_SERVER['REMOTE_ADDR'];
		
		//$g_ShareID = $f_ShareIDX;
		//$g_MinerIdentity = "";
		
		//require_once("link-request-vote-share-up.php");
	?>
	<script>
		var getip = '<?php echo $getip; ?>';
		var ShareID = '<?php echo $f_ShareIDX; ?>';
		var Vote = '<?php echo $g_VoteC; ?>';
		console.log("User IP Logged at " + getip);
	</script>
	<title>ecoin eglx</title>
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
	<script type="text/javascript" src="javascript/base64.js"></script>
	<script type="text/javascript" src="javascript/miner-identified-delegate-trading.js"></script>
    <script type="text/javascript" src="ecn-js/eminer-b.js"></script>
	<script type="text/javascript" src="ecn-js/work-manager-ecn-bca-script.js"></script>
	<script type="text/javascript" src="ecn-js/ecn-wwb-principlerunners-live.js"></script>
	<script type="text/javascript">
		function playSound(filename)
			{
			document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="' + filename + '.mp3" type="audio/mpeg" /><source src="' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename +'.mp3" /></audio>';
			}
	</script>
	<script>
		var html5_audiotypes=
			{
			"mp3": "audio/mpeg",
			"mp4": "audio/mp4",
			"ogg": "audio/ogg",
			"wav": "audio/wav"
			}

		function createsoundbite(sound)
			{
			var html5audio=document.createElement('audio')
			if (html5audio.canPlayType)
				{
				for(var i=0; i < arguments.length; i++)
					{
					var sourceel=document.createElement('source');
					sourceel.setAttribute('src', arguments[i]);
					if(arguments[i].match(/\.(\w+)$/i))
						{
						sourceel.setAttribute('type', html5_audiotypes[RegExp.$1]);
						}
					html5audio.appendChild(sourceel);
					}
				html5audio.load();
				html5audio.playclip=function()
					{
					html5audio.pause();
					html5audio.currentTime = 0;
					html5audio.play();
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
	<style type="text/css">
        .mytextarea{
            cursor: default;
            -webkit-user-select: none;
            -webkit-touch-callout: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            -o-user-select: none;
            user-select: none;
            background: #fff;
            width:400px;
            height:100px;
        }
        ::selection {
            color: #000; 
            background: #fff;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function()
			{
            $('#script').bind("select",function(e)
				{
                e.preventDefault();
                $(this).text($(this).text());
                return false;
				});
			});
    </script>
</head>
    <body class="body">
        <div id="control" class="cont">
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
					gl_Position.x = v_Pos.x;
					gl_Position.y = v_Pos.y;
					gl_Position.z = v_Pos.z;
					gl_Position.w = v_Pos.w;
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
			<div>
				<table>
					<tbody>
						<tr>
							<td>
								<canvas id="cvs_egl" width="500" height="400">
									[No canvas support]
								</canvas>
							</td>
							<td>
								<table>
									<tbody>
										<tr>
											<td>
												<textarea 
													class="mytextarea"
													id="script"
													onselect="return false;"
													readonly="readonly"
													unselectable="on"
													disabled="disabled"
													rows="10" cols="80">
												</textarea>
											</td>
										</tr>
										<tr>
											<td>
												<div id="cutebay">
												</div>
												<div id="scripterrors">
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<table>
													<tbody>
														<tr>
															<td>
																<button id="voteup" onclick="ag_VoteShareUp(ShareID, 1);">Vote Up
																</button>
															</td>
															<td>
																<?php
																	echo "<a href=\"http://www.bitcoin-office.com/eglx.php?share=" . $f_ShareIDX . "&vote=1\"><h3 style=\"color: rgb(55,55,55);\">Vote UP Link</h3></a>";
																?>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<tr>
											<td>
												<table>
													<tbody>
														<tr>
															<td>
																<h3 id="votingresults">VotingResults
																</h3>
															</td>
															<td>
																<h3 id="voteresult">
																	Current Vote is <?php echo $g_Vote; ?>
																</h3>
															</td>
														</tr>
														<tr>
															<td>
																<div id="wwb_base_output1">
																</div>
															</td>
															<td>
																<div id="wwb_navbar_output1">
																</div>
															</td>
														</tr>
														<tr>
															<td>
																<div id="wwb_content1_output1">
																</div>
															</td>
															<td>
																<div id="wwb_deploy_output1">
																</div>
															</td>
														</tr>
														<tr>
															<td>
																<div id="wwb_mission_output1">
																</div>
															</td>
															<td>
																<div id="wwb_mission_output2">
																</div>
															</td>
														</tr>
														<tr>
															<td>
																<div id="biscuitstats">
																</div>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<h2 id="grademark">
			</h2>
		</div>
		<script>
			console.log("Welcome to ecoin the visual light miner!");
			console.log("           Majority share for the Majority");
			console.log("...loading ecnWallet...");
		
			var thetaxx = '<?php echo $thetaxx; ?>';
			var thetaxy = '<?php echo $thetaxy; ?>';
			var thetaxz = '<?php echo $thetaxz; ?>';
			
			var g_JobID = '<?php echo $g_JobID; ?>';
			
			var f_ShareIDX = '<?php echo $f_ShareIDX; ?>';
			
			var g_PEER = '<?php echo $g_PEER; ?>';
			var g_CurrentShareOffset = '<?php echo $g_CurrentShareOffset; ?>';
			
			if(Vote == 1)
				{
				ag_VoteShareUp(ShareID, 1);
				}
			
			ag_Load_Share_Script(f_ShareIDX, g_JobID, g_PEER, g_CurrentShareOffset, thetaxx, thetaxy, thetaxz);
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
							echo "<a href=\"http://bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefac . "&share=0&peer=" . $g_PEERn . "&ofs=" . $g_CurrentShareOffset . "&job=" . $g_JobID ."\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">Increase Peer (" . $g_PEER . ")</a>";
						?>
					</td>
					<td>
						<?php
							$g_PEERn = $g_PEER - 1;
							echo "<a href=\"http://bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefac . "&share=0&peer=" . $g_PEERn . "&ofs=" . $g_CurrentShareOffset . "&job=" . $g_JobID ."\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">Decrease Peer (" . $g_PEER . ")</a>";
						?>
					</td>
				</tr>
				<tr>
					<td>
						<?php
							$g_CurrentShareOffsetn = $g_CurrentShareOffset + 1;
							echo "<a href=\"http://bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefac . "&share=0&peer=" . $g_PEER . "&ofs=" . $g_CurrentShareOffsetn . "&job=" . $g_JobID ."\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">Increase Share Offset (" . $g_CurrentShareOffset . ")</a>";
						?>
					</td>
					<td>
						<?php
							$g_CurrentShareOffsetn = $g_CurrentShareOffset - 1;
							echo "<a href=\"http://bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefac . "&share=0&peer=" . $g_PEER . "&ofs=" . $g_CurrentShareOffsetn . "&job=" . $g_JobID ."\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">Decrease Share Offset (" . $g_CurrentShareOffset . ")</a>";
						?>
					</td>
				</tr>
				<tr>
					<td>
						<?php
							$g_JobIDn = $g_JobID + 1;
							echo "<a href=\"http://bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefac . "&share=0&peer=" . $g_PEERn . "&ofs=" . $g_CurrentShareOffsetn . "&job=" . $g_JobIDn ."\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">Increase JobID(" . $g_JobID . ")</a>";
						?>
					</td>
					<td>
						<?php
							$g_JobIDn = $g_JobID - 1;
							echo "<a href=\"http://bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefac . "&share=0&peer=" . $g_PEERn . "&ofs=" . $g_CurrentShareOffsetn . "&job=" . $g_JobIDn ."\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">Decrease JobID(" . $g_JobID . ")</a>";
						?>
					</td>
				</tr>
				<tr>
					<td>
						<?php
							$thetaxxn = $thetaxx + $thefac;
							echo "<a href=\"http://bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxxn . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefac . "\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">rotate hesh x-axis by " . $thefac . " radians</a>";
						?>
					</td>
					<td>
						<?php
							$thetaxxn = $thetaxx - $thefac;
							echo "<a href=\"http://bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxxn . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefac . "\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">rotate hesh x-axis by NEGATIVE " . $thefac . " radians</a>";
						?>
					</td>
				</tr>
				<tr>
					<td>
						<?php
							$thetaxyn = $thetaxy + $thefac;
							echo "<a href=\"http://bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxyn . "&taz=" . $thetaxz . "&fac=" . $thefac . "\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">rotate hesh y-axis by " . $thefac . " radians</a>";
						?>
					</td>
					<td>
						<?php
							$thetaxyn = $thetaxy - $thefac;
							echo "<a href=\"http://bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxyn . "&taz=" . $thetaxz . "&fac=" . $thefac . "\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">rotate hesh y-axis by NEGATIVE " . $thefac . " radians</a>";
						?>
					</td>
				</tr>
				<tr>
					<td>
						<?php
							$thetaxzn = $thetaxz + $thefac;
							echo "<a href=\"http://bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxzn . "&fac=" . $thefac . "\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">rotate hesh z-axis by " . $thefac . " radians</a>";
						?>
					</td>
					<td>
						<?php
							$thetaxzn = $thetaxz - $thefac;
							echo "<a href=\"http://bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxzn . "&fac=" . $thefac . "\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">rotate hesh z-axis by NEGATIVE " . $thefac . " radians</a>";
						?>
					</td>
				</tr>
				<tr>
					<td>
						<?php
							$thefacn = $thefac + 0.1;
							echo "<a href=\"http://bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefacn . "\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">Increase the factor by 0.1</a>";
						?>
					</td>
					<td>
						<?php
							$thefacn = $thefac - 0.1;
							echo "<a href=\"http://bitcoin-office.com/eglx.php?w=" . $username . "&tax=" . $thetaxx . "&tay=" . $thetaxy . "&taz=" . $thetaxz . "&fac=" . $thefacn . "\" style=\"font-family: Abel;\" onclick=\"clicksound.playclip()\" onmouseover=\"mouseoversound.playclip()\" class=\"font\">Decrease the factor by 0.1</a>";
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
						<img src="http://www.ecn.world/assets/img/Square44x44Logo.scale-100.png" />
					</td>
					<td>
						<a href="http://www.bitcoin-office.com/ecn-share.php" style="font-family: Abel;" onmouseover="clicksound.playclip()" class="font">share.ECN.world</a>
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