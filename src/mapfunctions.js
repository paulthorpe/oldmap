// GLOBAL VARIABLES
//3 day outlook 
var Days = new Array(3);
//is LinkBox shown
IsVisible = false;
//Current League
CurrentLeague = "Prem";

//Team object arrays
var Prem = new Array(5);
var Div1 = new Array(4);
var Conf = new Array(3);

//--------------------------------------------
//JQUERY Startup 
$(document).ready(
	function(){
		//setup element events with Jquery
		$("#swl1").bind("mouseover","0",SelectWeather);
		$("#swl1").bind("mouseout","0",SelectWeather);
		$("#swl2").bind("mouseover","1",SelectWeather);
		$("#swl2").bind("mouseout","1",SelectWeather);	
		$("#swl3").bind("mouseover","2",SelectWeather);
		$("#swl3").bind("mouseout","2",SelectWeather);

		$("#Southampton").bind("mouseover",{Division: "Prem",TeamIndex: "0"},ShowTeam);
		$("#Southampton").bind("mouseout","Prem",HideTeam);
		$("#Southampton").bind("click","Southampton",ShowPopUp);

		$("#London").bind("mouseover",{Division: "Prem",TeamIndex: "1"},ShowTeam);
		$("#London").bind("mouseout","Prem",HideTeam);
		$("#London").bind("click","London",ShowPopUp);

		$("#Brighton").bind("mouseover",{Division: "Prem",TeamIndex: "2"},ShowTeam);
		$("#Brighton").bind("mouseout","Prem",HideTeam);
		$("#Brighton").bind("click","Brighton",ShowPopUp);		

		$("#Another_place_A").bind("mouseover",{Division: "Div1",TeamIndex: "0"},ShowTeam);
		$("#Another_place_A").bind("mouseout","Div1",HideTeam);
		$("#Another_place_A").bind("click","Another_place_A",ShowPopUp);		

		$("#Another_place_B").bind("mouseover",{Division: "Div1",TeamIndex: "1"},ShowTeam);
		$("#Another_place_B").bind("mouseout","Div1",HideTeam);
		$("#Another_place_B").bind("click","Another_place_B",ShowPopUp);		

		$("#Hebrides").bind("mouseover",{Division: "Div1",TeamIndex: "2"},ShowTeam);
		$("#Hebrides").bind("mouseout","Div1",HideTeam);
		$("#Hebrides").bind("click","Hebrides",ShowPopUp);		
		
		$("#Another_place_D").bind("mouseover",{Division: "conf",TeamIndex: "0"},ShowTeam);
		$("#Another_place_D").bind("mouseout","Conf",HideTeam);
		$("#Another_place_D").bind("click","Another_place_D",ShowPopUp);				

		$("#Another_place_E").bind("mouseover",{Division: "conf",TeamIndex: "1"},ShowTeam);
		$("#Another_place_E").bind("mouseout","Conf",HideTeam);
		$("#Another_place_E").bind("click","Another_place_E",ShowPopUp);				

		$("#Another_place_F").bind("mouseover",{Division: "conf",TeamIndex: "2"},ShowTeam);
		$("#Another_place_F").bind("mouseout","Conf",HideTeam);
		$("#Another_place_F").bind("click","Another_place_F",ShowPopUp);	

		$("#switchA").bind("click","Prem",LeagueSwitch);
		$("#switchB").bind("click","Div1",LeagueSwitch);
		$("#switchC").bind("click","Conf",LeagueSwitch);

		$("#closebox").bind("click",HideLinks);
		$("#closebox").bind("mouseover",Underline);
		$("#closebox").bind("mouseout",NoUnderline);

		$("#officalsite").bind("mouseover",Underline);
		$("#officalsite").bind("mouseout",NoUnderline);

		//call main init
		init();
	}	
);

//--------------------------------------------
// Team Detail object
//object holds a single teams details
function TeamDetail(TeamName,TeamStadium,TeamCapacity,TeamManager,TeamPosition,TeamFormed)
{
	this.Name = TeamName;
	this.Stadium = TeamStadium;
	this.Capacity = TeamCapacity ;
	this.Manager = TeamManager;
	this.Position = TeamPosition;
	this.Formed = TeamFormed;
}

function init()
{
	//initalise Infomap
	CreateTeamDetails();
	Outlook();
	//Correctdate.innerHTML = GetCurrentDate();
}

function CreateTeamDetails()
{
	// Sites of interest A
	var Team = new TeamDetail("Southampton","Great shopping","","","","");
	Prem[0] = Team;
			
	Team = new TeamDetail("London","Lots to do","","","","");
	Prem[1] = Team;
			
	Team = new TeamDetail("Brighton","Nice sea front","","","","");
	Prem[2] = Team;
			
	// Sites of interest B
	Team = new TeamDetail("Another place A","Another place","","","","");
	Div1[0] = Team;
	
	Team = new TeamDetail("Another place B","Another place","","","","");
	Div1[1] = Team;
	
	Team = new TeamDetail("Hebrides","Great Views","","","","");
	Div1[2] = Team;
			
	// Sites of interest C
	Team = new TeamDetail("Another place D","Another place","","","","");
	Conf[0] = Team;
	
	Team = new TeamDetail("Another place E","Another place","","","","");
	Conf[1] = Team;
			
	Team = new TeamDetail("Another place F","Another place","","","","");
	Conf[2] = Team;
}

function GetCurrentDate()
{
	var now = new Date();
	var Day = now.getDay();
	var theDate = now.getDate();
	var theMonth = now.getMonth();
	var theYear = now.getYear();

	var Whole = CalcDay(Day).substring(0,3) + " " + CalcDate(theDate) + " " + CalcMonth(theMonth) + " " + theYear
			
	return Whole
}

function Outlook()
{
	//calculate the 3 day outlook today, tomorrow and the next day
	var now = new Date();
	var Today = now.getDay();
			
	//set next two days
	for(var i = 0;i < Days.length;i++)
	{
		Days[i] = CalcDay(Today);
		//sunday is 0 need to catch if it is saturday
		if(Today == 6)
		{
			Today = 0;
		}
		else
		{
			Today++;
		}
	}

	//write days out
	$("#Day1").text(Days[0].substring(0,3));
	$("#Day2").text(Days[1].substring(0,3));
	$("#Day3").text(Days[2].substring(0,3));
}

function SelectWeather(event)
{
	//hightlight and lowlight weather icons
	var CurrentImage = this.src;
	var lIndex = parseInt(event.data);

	if(!IsVisible)
	{
		if(CurrentImage.indexOf('images/infomapimages/selectweather.gif') != -1)
		{
			this.src = "images/infomapimages/selectweatherlight.gif";
			
			//hide all weather
			$("#RegionA").css("visibility","hidden");
			$("#RegionB").css("visibility","hidden");
			$("#RegionC").css("visibility","hidden");
			$("#RegionD").css("visibility","hidden");
			$("#RegionE").css("visibility","hidden");
			$("#RegionF").css("visibility","hidden");
			$("#RegionG").css("visibility","hidden");
			$("#RegionH").css("visibility","hidden");
		}
		else
		{
			this.src = "images/infomapimages/selectweather.gif";
			$(this).css("cursor","pointer");

			//fill weather and show			
			if(lIndex == 0)
			{
				$("#RegionA").html("<img src='images/infomapimages/icons/Weather01.gif'>");
				$("#RegionB").html("<img src='images/infomapimages/icons/Weather02.gif'>");		
				$("#RegionC").html("<img src='images/infomapimages/icons/Weather03.gif'>");
				$("#RegionD").html("<img src='images/infomapimages/icons/Weather04.gif'>");
				$("#RegionE").html("<img src='images/infomapimages/icons/Weather05.gif'>");
				$("#RegionF").html("<img src='images/infomapimages/icons/Weather11.gif'>");
				$("#RegionG").html("<img src='images/infomapimages/icons/Weather12.gif'>");
				$("#RegionH").html("<img src='images/infomapimages/icons/Weather11.gif'>");
			}
			else if(lIndex == 1)
			{
				$("#RegionA").html("<img src='images/infomapimages/icons/Weather06.gif'>");
				$("#RegionB").html("<img src='images/infomapimages/icons/Weather07.gif'>");
				$("#RegionC").html("<img src='images/infomapimages/icons/Weather08.gif'>");
				$("#RegionD").html("<img src='images/infomapimages/icons/Weather09.gif'>");
				$("#RegionE").html("<img src='images/infomapimages/icons/Weather10.gif'>");
				$("#RegionF").html("<img src='images/infomapimages/icons/Weather02.gif'>");
				$("#RegionG").html("<img src='images/infomapimages/icons/Weather03.gif'>");
				$("#RegionH").html("<img src='images/infomapimages/icons/Weather01.gif'>");
			}
			else
			{
				$("#RegionA").html("<img src='images/infomapimages/icons/Weather01.gif'>");
				$("#RegionB").html("<img src='images/infomapimages/icons/Weather02.gif'>");
				$("#RegionC").html("<img src='images/infomapimages/icons/Weather04.gif'>");
				$("#RegionD").html("<img src='images/infomapimages/icons/Weather08.gif'>");
				$("#RegionE").html("<img src='images/infomapimages/icons/Weather09.gif'>");
				$("#RegionF").html("<img src='images/infomapimages/icons/Weather05.gif'>");
				$("#RegionG").html("<img src='images/infomapimages/icons/Weather04.gif'>");
				$("#RegionH").html("<img src='images/infomapimages/icons/Weather05.gif'>");
			}

			//Show all weather
			$("#RegionA").css("visibility","visible");
			$("#RegionB").css("visibility","visible");
			$("#RegionC").css("visibility","visible");
			$("#RegionD").css("visibility","visible");
			$("#RegionE").css("visibility","visible");
			$("#RegionF").css("visibility","visible");
			$("#RegionG").css("visibility","visible");
			$("#RegionH").css("visibility","visible");
		}
	}
}

function ShowTeam(event)
{
	//show selected team details box
	switch(event.data.Division.toLowerCase())
	{
		case "prem":
		{
			$(this).children().attr("src","images/infomapimages/flag/pdot2.gif");
			break;
		}
		case "div1":
		{
			$(this).children().attr("src","images/infomapimages/flag/d2dot2.gif")
			break;
		}
		case "conf":
		{
			$(this).children().attr("src","images/infomapimages/flag/cdot2.gif");
			break;
		}
	}

	ShowTeamDetails(event.data.TeamIndex);
}

function HideTeam(event)
{
	//hide selected team details box
	switch(event.data)
	{
		case "Prem":
		{
			$(this).children().attr("src","images/infomapimages/flag/pdot1.gif");
			break;
		}
		case "Div1":
		{
			$(this).children().attr("src","images/infomapimages/flag/d2dot1.gif");
			break;
		}
		case "Conf":
		{
			$(this).children().attr("src","images/infomapimages/flag/cdot1.gif");
			break;
		}
	}

	//ensure the details box is hidden
	$("#TeamInfo").css("visibility","hidden");
}

function ShowTeamDetails(lTeamIndex)
{
	var elm = eval(CurrentLeague);

	//set up team details
	$("#Name").text(elm[lTeamIndex].Name);
	$("#Stadium").text(elm[lTeamIndex].Stadium);

	//Capacity.innerHTML = elm[lTeamIndex].Capacity;
	//Formed.innerHTML = elm[lTeamIndex].Formed;
	//Manager.innerHTML = elm[lTeamIndex].Manager;
	//Pos.innerHTML = elm[lTeamIndex].Position;

	//show details box
	$("#TeamInfo").css("visibility","visible");
}

function LeagueSwitch(event)
{
	//show correct league markers
	CurrentLeague = event.data;
	$("#LinkBox").css("visibility","hidden");
	$("#LinkBox").css("z-index",1);
	IsVisible = false;

	switch(event.data)
	{
		case "Prem":
		{
			$("#AllDotsPrem").css("visibility","visible");
			$("#AllDotsDiv1").css("visibility","hidden");
			$("#AllDotsConf").css("visibility","hidden");	
			break;
		}
		case "Div1":
		{
			$("#AllDotsPrem").css("visibility","hidden");
			$("#AllDotsDiv1").css("visibility","visible");
			$("#AllDotsConf").css("visibility","hidden");	
			break;
		}
		case "Conf":
		{	
			$("#AllDotsPrem").css("visibility","hidden");
			$("#AllDotsDiv1").css("visibility","hidden");
			$("#AllDotsConf").css("visibility","visible");	
			break;
		}
	}
}

function ShowPopUp(event)
{
	//offset contstants
	var OFFSET_LEFTP = 320;
	var OFFSET_TOPP = 170;
	var OFFSET_LEFTD = 330;
	var OFFSET_TOPD = 180;
	var OFFSET_LEFTC = 340;
	var OFFSET_TOPC = 180;

	//hide details box
	$("#TeamInfo").css("visibility","hidden");

	var objLeft = $(this).css("left");
	var objTop = $(this).css("top");
			
	//add offset (absolute to relative increment)

	if(CurrentLeague == "Prem")
	{
		objLeft = parseInt(objLeft) + OFFSET_LEFTP;
		objTop = parseInt(objTop) + OFFSET_TOPP;
	}
	else if(CurrentLeague == "Div1")
	{
		objLeft = parseInt(objLeft) + OFFSET_LEFTD;
		objTop = parseInt(objTop) + OFFSET_TOPD;
	}
	else
	{
		objLeft = parseInt(objLeft) + OFFSET_LEFTC;
		objTop = parseInt(objTop) + OFFSET_TOPC;
	}

	$("#LinkBox").css("left",objLeft);
	$("#LinkBox").css("top",objTop);			
	$("#LinkBox").css("z-index",20);
	$("#LinkBox").css("visibility","visible");
	IsVisible = true;
}

function HideLinks()
{
	if(IsVisible)
	{
		$("#LinkBox").css("visibility","hidden");
		$("#LinkBox").css("z-index",1);
		IsVisible = false;
	}
}

//--------------------------------------------------------------------
//helper functions

function NoUnderline()
{
	$(this).addClass("WhiteLinks");
}

function Underline()
{
	$(this).addClass("WhiteLinksClear");
}

function CalcDay(lToday)
{
	var strDay;
	//what day is it
	switch(lToday)
	{
		case 0:
		{
			strDay = "Sunday";
			break;
		}
		case 1:
		{
			strDay = "Monday";
			break;
		}
		case 2:
		{
			strDay = "Tuesday";
			break;
		}
		case 3:
		{
			strDay = "Wednesday";
			break;
		}
		case 4:
		{
			strDay = "Thursday";
			break;
		}
		case 5:
		{
			strDay = "Friday";
			break;
		}
		default:
		{
			strDay = "Saturday";
			break;
		}
	}

	return strDay;
}

function CalcMonth(lMonth)
{
	var strMonth;
	switch(lMonth)
	{
		case 0:
		{
			strMonth = "Jan";
			break;
		}
		case 1:
		{
			strMonth = "Feb";
			break;
		}
		case 2:
		{
			strMonth= "Mar";
			break;
		}
		case 3:
		{
			strMonth= "Apr";
			break;
		}
		case 4:
		{
			strMonth= "May";
			break;
		}
		case 5:
		{
			strMonth= "Jun";
			break;
		}
		case 6:
		{
			strMonth= "Jul";
			break;
		}
		case 7:
		{
			strMonth= "Aug";
			break;
		}
		case 8:
		{
			strMonth= "Sep";
			break;
		}
		case 9:
		{
			strMonth= "Oct";
			break;
		}
		case 10:
		{
			strMonth= "Nov";
			break;
		}
		case 11:
		{
			strMonth= "Dec";
			break;
		}
	}

	return strMonth;
}

function CalcDate(lDate)
{
	var Whole;	
	var suffix;
			
	if(lDate == 1 || lDate == 21 || lDate == 31)
	{
		suffix = "st"
	}
	else if(lDate == 2 || lDate == 22)
	{
		suffix = "nd"
	}
	else if(lDate == 3 || lDate == 23)
	{
		suffix = "rd"
	}
	else
	{
		suffix = "th"
	}

	return lDate + suffix;
}

