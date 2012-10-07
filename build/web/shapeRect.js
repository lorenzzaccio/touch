/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var svgNS = "http://www.w3.org/2000/svg";
function shaperect(id,parentNode,x,y,w,h,fillColor,strokeColor){
    alert("coucou1");
    this.init(id,parentNode,x,y,w,h,fillColor,strokeColor);
}
shaperect.prototype.init = function(id,parentNode,x,y,w,h,fillColor,strokeColor){
    this.id=id;
    this.parentNode=parentNode;
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.fillColor=fillColor;
    this.strokeColor=strokeColor;
    this.buttonRect = null; //later a reference to the button area (rect)
    this.createRect();
}
shaperect.prototype.createRect = function() {
    var result = this.testParent();
    if (result) {
        this.buttonRect = document.createElementNS(svgNS,"rect");
        this.buttonRect.setAttributeNS(null,"x",this.x);
        this.buttonRect.setAttributeNS(null,"y",this.y);
        this.buttonRect.setAttributeNS(null,"width",this.w);
        this.buttonRect.setAttributeNS(null,"height",this.h);
        this.buttonRect.setAttributeNS(null,"stroke",this.strokeColor);
        this.buttonRect.setAttributeNS(null,"fill",this.fillColor);
    
        this.buttonRect.addEventListener("touchstart=",function(ev){alert("start!");},false);
        this.buttonRect.addEventListener("touchmove=",function(ev){alert("move !");},false);
        this.buttonRect.addEventListener("touchend=",function(ev){alert("end !");},false);
        this.buttonRect.addEventListener("mousedown",function(ev){alert("mouse down!");},false);
	this.buttonRect.addEventListener("mouseup",function(ev){this.handleEvent(ev);},false);
	this.buttonRect.addEventListener("click",function(ev){this.handleEvent(ev);},false);
        this.parentGroup.appendChild(this.buttonRect);
    }
}
//event handling
shaperect.prototype.handleEvent = function(evt) {
   alert("event!)");
   if (evt.type == "ontouchstart") {
        alert("touch start");
    }
    if (evt.type == "ontouchmove") {
        alert("touch move");
    }
    if (evt.type == "ontouchend") {
        alert("touch end");
    }
}
//test if parent group exists
shaperect.prototype.testParent = function() {
    //test if of type object
    var nodeValid = false;
    this.parentGroup = document.createElementNS(svgNS,"g");
    if (typeof(this.parentNode) == "object") {
    	if (this.parentNode.nodeName == "svg" || this.parentNode.nodeName == "g" || this.parentNode.nodeName == "svg:svg" || this.parentNode.nodeName == "svg:g") {
    		this.parentNode.appendChild(this.parentGroup);
    		nodeValid = true;
    	}
    }
    else if (typeof(this.parentNode) == "string") { 
    	//first test if button group exists
    	if (!document.getElementById(this.parentNode)) {
        	this.parentGroup.setAttributeNS(null,"id",this.parentNode);
        	document.documentElement.appendChild(this.parentGroup);
        	nodeValid = true;
   		}
   		else {
       		document.getElementById(this.parentNode).appendChild(this.parentGroup);
       		nodeValid = true;
   		}
   	}
   	return nodeValid;
}