Array.prototype.contains = function(item)
{
	for (var i = 0; i < this.length; i++)
		if (item == this[i])
			return true;
	return false;
}

function calculateStats()
{
	var ba;
	var obp;
	var hits = 0;
	var pa = 0;
	var walks = 0;
	var runs = 0;
	var rbi = 0;

	var select = document.getElementById("HistorySelect");
	if (gameData != null) {
	
		for (var i = 0; i < gameData.length; i++) {
			if (select.value == "All" || gameData[i][1].substr(0, 4) == select.value) {
				hits += gameData[i][2];
				pa += gameData[i][3];
				walks += gameData[i][4];
				runs += gameData[i][5];
				rbi += gameData[i][6];
			}
		}
		
		if (pa > 0 && (pa-walks) > 0) {
			ba = hits / (pa - walks);
			obp = (hits + walks) / pa;
			
			ba = Math.round(ba * 1000) / 1000;
			obp = Math.round(obp * 1000) / 1000;
		}
		if(isNaN(ba)) {
			ba = 0;
		}
		if(isNaN(obp)) {
			obp = 0;
		}
		ba += "";
		obp += "";
		if (ba.length == 1) {
			ba += ".";
		}
		if (obp.length == 1) {
			obp += ".";
		}
		while (ba.length < 5) {
			ba += "0";
		}
		while (obp.length < 5) {
			obp += "0";
		}
		
		document.getElementById("BAHistory").value = ba;
		document.getElementById("OBPHistory").value = obp;
		document.getElementById("RunsHistory").value = runs;
		document.getElementById("RBIHistory").value = rbi;
		
		hits = 0;
		pa = 0;
		walks = 0;
		runs = 0;
		rbi = 0;
		
		select = document.getElementById("SeasonSelect");
		
		for (var i = 0; i < gameData.length; i++) 
			if (select.value == "All" || gameData[i][1].substr(0, 4) == select.value) {
				hits += gameData[i][2];
				pa += gameData[i][3];
				walks += gameData[i][4];
				runs += gameData[i][5];
				rbi += gameData[i][6];
			}
		
		if (pa > 0 && (pa - walks) > 0) {
			ba = hits / (pa - walks);
			obp = (hits + walks) / pa;
			
			ba = Math.round(ba * 1000) / 1000;
			obp = Math.round(obp * 1000) / 1000;
		}
		if(isNaN(ba)) {
			ba = 0;
		}
		if(isNaN(obp)) {
			obp = 0;
		}
		
		ba = formatPercentage(ba);
		obp = formatPercentage(obp);
		
		document.getElementById("BAStat").value = ba;
		document.getElementById("OBPStat").value = obp;
		document.getElementById("RunsStat").value = runs;
		document.getElementById("RBIStat").value = rbi;
	}
}

function toDeleteLater(){
	ba += "";
		obp += "";
		
		if (ba.length == 1) {
			ba += ".";
		}
		if (obp.length == 1) {
			obp += ".";
		}
		while (ba.length < 5) {
			ba += "0";
		}
		while (obp.length < 5) {
			obp += "0";
		}
}

function getYears()
{
	var years = new Array();
	if (gameData == null) {
		return;
	}
	for (var i = 0; i < gameData.length; i++)
		if (!years.contains(gameData[i][1].substr(0,4)))
			years.push(gameData[i][1].substr(0,4));
	var text = "<option value = 'All'>All</option>\n";
	for (var i = 0; i < years.length; i++)
		text += "<option value='" + years[i] + "'>" + years[i] + "</option>\n";
	document.getElementById("HistorySelect").innerHTML = text;
	document.getElementById("SeasonSelect").innerHTML = text;
}

function populateList()
{
	var text = "";
	if (gameData == null) {
		return;
	}
	for (var i = 0; i < gameData.length; i++)
	{
		text += "<option>" + gameData[i][1].substr(0,4) + " vs " + gameData[i][0] + "</option>";
	}
	document.getElementById("PriorSelect").innerHTML = text;
	displayPriorGame();
}

var MLBName;
function populateMLBList()
{
	var text = "";
	if(window.MLB === undefined) {
		return;
	}
	for (var i = 0; i < MLB.length; i++)
	{
		text += "<option value='" + MLB[i] + "';>" + MLB[i] + "</option>"; 
	}
	document.getElementById("GraphStatsMsg").innerHTML = "Comparisons in the<br> graphs can only be made<br> on months where both players have games.";
	document.getElementById("GraphMLBSelect").innerHTML = "<option value='none'>No Comparison</option>" + text;
	document.getElementById("MLBSelect").innerHTML = "<option>Choose MLB Player</option><option>New Player</option>" + text;
}

function displayPriorGame()
{
	if(gameData == null) {
		return;
	}
	var choice = document.getElementById("PriorSelect").selectedIndex;
	var ba;
	var obp;
	var hits = gameData[choice][2];
	var pa = gameData[choice][3];
	var walks = gameData[choice][4];
	var runs = gameData[choice][5];
	var rbi = gameData[choice][6];
	ba = hits / (pa - walks);
	obp = (hits + walks) / pa;
	ba = Math.round(ba * 1000) / 1000;
	obp = Math.round(obp * 1000) / 1000;

        ba += "";
        obp += "";

	if (ba.length == 1) { ba += "."; }
	if (obp.length == 1) { obp += "."; }
	while (ba.length < 5) { ba += "0";}
	while (obp.length < 5) { obp += "0";} 
	if (hits == 0) { ba = "0.000"; }
	document.getElementById("PriorBA").value = ba;
	document.getElementById("PriorOBP").value = obp;
	document.getElementById("PriorRuns").value = runs;
	document.getElementById("PriorRBI").value = rbi;
}