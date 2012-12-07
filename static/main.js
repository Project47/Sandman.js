window.onload=doFirst;

function doFirst()
{
console.log("hello to sdlfnsdv");
//alert("in");
   // //alert(123435465*12345671234567890234567890);
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
////alert("11");
}

function ad(e)
{

 //   //alert(count);
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
    //alert(count);
    //alert("PTR:" + ptr);
    document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + "<br />NEW POINTS FROM HERE <br />";

   // if(ptr<20) {return;}
    
    i=1;
var leng=path_length();
	dif=(leng/21);
	D=0;
add=0;
	ptr2=0;
//alert("diff= "+dif);
	//alert("outside loop");
    while(i<ptr)
    {
//	//alert("1");
	add=(ptX[i]-ptX[i-1])*(ptX[i]-ptX[i-1])+(ptY[i]-ptY[i-1])*(ptY[i]-ptY[i-1]);
	dist=Math.sqrt(add);

document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML +"  i: "+i+ "  dist: " + dist + "  ptr2:" + ptr2 + "<br />";
	if((D+dist)>=dif)
	{
	    chX[ptr2]=ptX[i-1]+((dif-D)/dist)*(ptX[i]-ptX[i-1]);
	    chY[ptr2]=ptY[i-1]+((dif-D)/dist)*(ptY[i]-ptY[i-1]);
	    ptX[i]=chX[ptr2];
	    ptY[i]=chY[ptr2];
	    D=0;
	    ptr2=ptr2+1;
	}
	else
	 {   D=D+dist;}
	i=i+1;
	
    }
document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + "x: "+chX[ptr2-1] + "y:" +chY[ptr2-1] +"|||";


    //alert("ptr2=" +ptr2 );
    
    chain = new Array();
    chainPtr=0;
    var region=0;
    var slope=0;
    i=0;

//document.getElementById("temp").innerHTML="";

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
//	document.getElementById("temp").innerHTML=document.getElementById("temp").innerHTML + chain[chainPtr-1];
    }
//alert("sdfghjkl");
document.getElementById("temp").innerHTML="";
var y=1;
var len=0;
var temp=0;
alert("b4loop");
alert(ptr2);
while(y<ptr2)
{
temp=(chX[y]-chX[y-1])*(chX[y]-chX[y-1])+(chY[y]-chY[y-1])*(chY[y]-chY[y-1]);
document.getElementById("temp").innerHTML= document.getElementById("temp").innerHTML + Math.sqrt(temp) + "<br />";
y=y+1;
}

}

function path_length()
{
var y=1;
var len=0;
var temp=0;
////alert("b4loop");
while(y<ptr)
{
temp=(ptX[y]-ptX[y-1])*(ptX[y]-ptX[y-1])+(ptY[y]-ptY[y-1])*(ptY[y]-ptY[y-1]);
len = len + Math.sqrt(temp);
y=y+1;
}
////alert("length="+len);
return len;
}
