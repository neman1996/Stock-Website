var stockobj = null;
var one=0;
var two=0;
var n,nctx,b,bctx,d,dctx,ngrd,bgrd,dgrd;
function init(){
	ev = new EventSource("stock.php");
	ev.addEventListener("stock_update", update, false);
	n=document.getElementById("nifty");
	nctx= n.getContext("2d");
	b=document.getElementById("sensex");
	bctx= b.getContext("2d");
	d=document.getElementById("dax");
	dctx= d.getContext("2d");

	ngrd = nctx.createLinearGradient(0,0,0,260);
	ngrd.addColorStop(0,"black");
	ngrd.addColorStop(1,stocking(0,0));
	nctx.fillStyle=ngrd;
	nctx.fillRect(0,0,350,260);
	nctx.fillStyle="white";
	nctx.font = "40px Verdana";
	nctx.fillText("Loading",120,125);
	nctx.font = "25px Verdana";
	nctx.fillText("Nifty",135,240);

	bgrd = bctx.createLinearGradient(0,0,0,260);
	bgrd.addColorStop(0,"black");
	bgrd.addColorStop(1,stocking(0,0));
	bctx.fillStyle=bgrd;
	bctx.fillRect(0,0,350,260);
	bctx.fillStyle="white";
	bctx.font = "40px Verdana";
	bctx.fillText("Loading",110,125);
	bctx.font = "25px Verdana";
	bctx.fillText("Sensex",125,240);

	dgrd = dctx.createLinearGradient(0,0,0,260);
	dgrd.addColorStop(0,"black");
	dgrd.addColorStop(1,stocking(0,0));
	dctx.fillStyle=dgrd;
	dctx.fillRect(0,0,350,260);
	dctx.fillStyle="white";
	dctx.font = "40px Verdana";
	dctx.fillText("Loading",110,125);
	dctx.font = "25px Verdana";
	dctx.fillText("DAX",140,240);
}

function stocking(a,b)
{
	if (a<b)
		return "#00FF00";
	else if (a>b)
		return "red";
	else 
		return "#007AF4";
}

function update(obj)
{
	stockobj = JSON.parse(obj.data);
	console.log(stockobj);
	
	two=stockobj["NIFTY"];
	console.log(one,two);
	ngrd = nctx.createLinearGradient(0,0,0,260);
	ngrd.addColorStop(0,"black");
	ngrd.addColorStop(1,stocking(one,two));
	nctx.fillStyle=ngrd;
	nctx.fillRect(0,0,350,260);
	nctx.fillStyle="white";
	nctx.font = "40px Verdana";
	nctx.fillText(two,120,125);
	nctx.font = "25px Verdana";
	nctx.fillText("Nifty",135,240);
	
	two = stockobj["SENSEX"];
	bgrd = bctx.createLinearGradient(0,0,0,260);
	bgrd.addColorStop(0,"black");
	bgrd.addColorStop(1,stocking(one,two));
	bctx.fillStyle=bgrd;
	bctx.fillRect(0,0,350,260);
	bctx.fillStyle="white";
	bctx.font = "40px Verdana";
	bctx.fillText(two,110,125);
	bctx.font = "25px Verdana";
	bctx.fillText("Sensex",125,240);

	two = stockobj["DAX"];
	dgrd = dctx.createLinearGradient(0,0,0,260);
	dgrd.addColorStop(0,"black");
	dgrd.addColorStop(1,stocking(one,two));
	dctx.fillStyle=dgrd;
	dctx.fillRect(0,0,350,260);
	dctx.fillStyle="white";
	dctx.font = "40px Verdana";
	dctx.fillText(two,110,125);
	dctx.font = "25px Verdana";
	dctx.fillText("DAX",140,240);
}

function show_email(a)
{
	a.src="images/email1.jpg";
}

function hide_email(a)
{
	a.src="images/email.png";
}

function show_call(a)
{
	a.src="images/call1.jpg"
}

function hide_call(a)
{
	a.src="images/call.png"
}

function show_address(a)
{
	a.src="images/address1.jpg"
}

function hide_address(a)
{
	a.src="images/building.jpg"
}

function current()
{
	var nifty=parseInt(100+50*Math.random());
	var sensex=parseInt(200+50*Math.random());
	var dax=parseInt(70+50*Math.random());
	
	document.getElementById("nifty_value").innerHTML = nifty;
	document.getElementById("sensex_value").innerHTML = sensex;
	document.getElementById("dax_value").innerHTML = dax;
	document.getElementById("nifty_sellvalue").innerHTML = nifty;
	document.getElementById("sensex_sellvalue").innerHTML = sensex;
	document.getElementById("dax_sellvalue").innerHTML = dax;
	init();
}
