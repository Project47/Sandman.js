window.onload=doFirst;

function doFirst()
{

   // alert(123435465*12345671234567890234567890);
//document.getElementById("body").addEventListener("mousedown",change,false);
//document.getElementById("temp").addEventListener("mousedown",change,false);
    count=0;
document.getElementById("body").addEventListener("touchmove",addd,false);
document.getElementById("body").addEventListener("touchstart",ad,false);
document.getElementById("body").addEventListener("touchend",change,false);

document.getElementById("body").addEventListener("mousemove",addd,false);
document.getElementById("body").addEventListener("mousedown",ad,false);
document.getElementById("body").addEventListener("mouseup",change,false);
     ptX = new Array();
     ptY = new Array();
 chX = new Array();
     chY = new Array();
    ptr2=0;
     ptr=0;
//alert("11");
}

function ad(e)
{

 //   alert(count);
e.preventDefault(); 
    count=0;
}


function addd(e){
  
    ptX[ptr]=e.touches[0].pageX;
    ptY[ptr]=e.touches[0].pageY;
    ptr++;
document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + "x: "+e.touches[0].pageX + "y:" +e.touches[0].pageY +"|||";
    count=count+1;

}
function change(e){
//document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + e.clientX;
    alert(count);
    alert("PTR:" + ptr);
    document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + "<br />NEW POINTS FROM HERE <br />";

    if(ptr<20) {return;}
    else{
    i=0;
	dif=Math.floor(ptr/20);
    while(ptr2<20)
    {
	chX[ptr2]=ptX[i];
	chY[ptr2]=ptY[i];
	i=i+dif;
	ptr2=ptr2+1;	
document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + "x: "+chX[ptr2-1] + "y:" +chY[ptr2-1] +"|||";

}
    alert("dif=" + dif);
    }
    chain = new Array();
    chainPtr=0;
    var region=0;
    var slope=0;
    i=0;

document.getElementById("temp").innerHTML="";

    while(i<ptr2){
	slope=-1*(chY[i+1]-chY[i])/(chX[i+1]-chX[i]);
	if(slope>=2.414 || slope<-2.414)
	{
	    if((chY[i+1]-chY[i])>=0) chain[chainPtr]=6;
	    else chain[chainPtr]=2;
	  
	}
	else if (slope>=0.414 && slope<2.414)
	{
	    if((chX[i+1]-chX[i])>=0) chain[chainPtr]=1;
	    else chain[chainPtr]=5;
	  
	}
	else if (slope<=0.414 && slope>-0.414)
	{
	    if((chX[i+1]-chX[i])>=0) chain[chainPtr]=0;
	    else chain[chainPtr]=4;
	  
	}
	
	else if (slope>=-2.414 && slope<-0.414)
	{
	    if((chX[i+1]-chX[i])>=0) chain[chainPtr]=7;
	    else chain[chainPtr]=3;
	  
	}
	i++;
	chainPtr++;
	document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + chain[chainPtr-1];
    }





}
