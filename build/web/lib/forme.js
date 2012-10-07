/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function forme(id,parentNode,x,y,width,height,fillColor,strokeWidth,strokeColor,functionToCall,funcOut) {	
	var nrArguments = 11;
	if (arguments.length > 0) {
		if (arguments.length == nrArguments) {
			this.init(id,parentNode,x,y,width,height,fillColor,strokeWidth,strokeColor,functionToCall,funcOut);
		}
		else {
			alert("Error in form ("+id+"): wrong nr of arguments! You have to pass over "+nrArguments+" parameters.");		
		}
	}
}

forme.prototype.init = function(id,parentNode,x,y,width,height,fillColor,strokeWidth,strokeColor,functionToCall,funcOut) {
	this.id = id; //the id where all new content is appended to
	this.parentNode = parentNode; //the id or node reference of the parent group where the button can be appended
	this.functionToCall = functionToCall; //function to be called if button was pressed
        this.funcOut=funcOut;
	//this.buttonType = buttonType; //button type: currently either "rect" or "ellipse"
	//this.buttonText = buttonText; //default value to be filled in when button is created
	//this.symbolId = symbolId; //id to a symbol to be used as a button graphics
	this.x = x; //left of button rectangle
	this.y = y; //top of button rectangle
	this.width = width; //button rectangle width
	this.height = height; //button rectangle height
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
	//this.textStyles = textStyles; //array of literals containing text styles
	//if (!this.textStyles["font-size"]) {
	//	this.textStyles["font-size"] = 12;
	//}	
	//this.buttonStyles = buttonStyles; //the fill color of the button rectangle or ellipse
	//this.shadeLightStyles = shadeLightStyles; //light fill color simulating 3d effect
	//this.shadeDarkStyles = shadeDarkStyles; //dark fill color simulating 3d effect
	//this.shadowOffset = shadowOffset; //shadow offset in viewBox units
	//this.upperLeftLine = null; //later a reference to the upper left line simulating 3d effect
	this.buttonRect = null; //later a reference to the button area (rect)
	//this.buttonTextElement = null; //later a reference to the button text
	//this.buttonSymbolInstance = null; //later a reference to the button symbol
	//this.deActivateRect = null; //later a reference to a rectangle that can be used to deactivate the button
	//this.activated = true; //a property indicating if button is activated or not
	//this.lowerRightLine = null; //later a reference to the lower right line simulating 3d effect
	this.createForme(); //method to initialize button
	this.timer = new Timer(this); //a Timer instance for calling the functionToCall
	this.timerMs = 200; //a constant of this object that is used in conjunction with the timer - functionToCall is called after 200 ms
}

//create button
forme.prototype.createForme = function() {
	var result = this.testParent();
		if (result) {
			//create buttonRect
                        this.buttonRect = document.createElementNS(svgNS,"rect");
                        this.buttonRect.setAttributeNS(null,"x",this.x);
                        this.buttonRect.setAttributeNS(null,"y",this.y);
                        this.buttonRect.setAttributeNS(null,"width",this.width);
			this.buttonRect.setAttributeNS(null,"height",this.height);
                        this.buttonRect.setAttributeNS(null,"fill",this.fillColor);
                        this.buttonRect.setAttributeNS(null,"stroke",this.strokeColor);
                        this.buttonRect.setAttributeNS(null,"strokeWidth",this.strokeWidth);
				
			this.buttonRect.addEventListener("mousedown",this,false);
			this.buttonRect.addEventListener("mouseup",this,false);
			this.buttonRect.addEventListener("click",this,false);
                        this.buttonRect.addEventListener("mouseover",this.functionToCall,false);
			this.buttonRect.addEventListener("mouseout",this.funcOut,false);
			this.parentGroup.appendChild(this.buttonRect);
		}
		else {
			alert("could not create or reference 'parentNode' of button with id '"+this.id+"'");			
		}
}

//test if parent group exists
forme.prototype.testParent = function() {
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
