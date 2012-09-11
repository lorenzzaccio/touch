/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function rect(parentNode,id,x,y,width,height,fillColor,strokeWidth,strokeColor){
    this.init(parentNode,id,x,y,width,height,fillColor,strokeWidth,strokeColor);
}

rect.prototype.init = function(parentNode,id,x,y,width,height,fillColor,strokeWidth,strokeColor){
    this.parentNode = parentNode;
    this.id= id;
    this.x = x;
    this.y=y;
    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
    this.strokeWidth = strokeWidth;
    this.strokeColor = strokeColor;
    var result = this.testParent();
    if (result) {
        //create buttonRect
        //if (this.buttonType == "rect") {
        this.rect = document.createElementNS(svgNS,"rect");
        this.rect.setAttributeNS(null,"x",this.x);
        this.rect.setAttributeNS(null,"y",this.y);
        this.rect.setAttributeNS(null,"width",this.width);
        this.rect.setAttributeNS(null,"height",this.height);
        this.rect.setAttributeNS(null,"fill",this.fillColor);
        this.rect.setAttributeNS(null,"stroke-width",this.strokeWidth);
        this.rect.setAttributeNS(null,"stroke",this.strokeColor);
        /*}
			else if (this.buttonType == "ellipse") {
				this.buttonRect = document.createElementNS(svgNS,"ellipse");
				this.buttonRect.setAttributeNS(null,"cx",this.x + this.width * 0.5);
				this.buttonRect.setAttributeNS(null,"cy",this.y + this.height * 0.5);
				this.buttonRect.setAttributeNS(null,"rx",this.width * 0.5);
				this.buttonRect.setAttributeNS(null,"ry",this.height * 0.5);
			}*/
        //for (var attrib in this.buttonStyles) {
        //    this.rect.setAttributeNS(null,attrib,this.buttonStyles[attrib]);
        //}	
        this.rect.setAttributeNS(null,"cursor","pointer");
        this.rect.addEventListener("mouseover",this,false);
        this.rect.addEventListener("mouseout",this,false);
        this.rect.addEventListener("mousedown",this,false);
        this.rect.addEventListener("mouseup",this,false);
        this.rect.addEventListener("mousemove",this,false);
        this.rect.addEventListener("click",this,false);
        this.parentGroup.appendChild(this.rect);
    }
}

rect.prototype.bind = function(event,functionToCall){
    this.rect.addEventListener(event,functionToCall,false);
}
rect.prototype.testParent = function() {
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
rect.prototype.handleEvent = function(evt) {
	//alert("id="+this.id);
        if(evt.type=="mouseover"){
            this.mouseOver(evt);
        }
        if(evt.type=="mouseout"){
            this.mouseOut(evt);
        }
        if(evt.type=="mousedown"){
            this.mouseDown(evt);
        }
        if(evt.type=="mouseup"){
            this.mouseUp(evt);
        }
        if(evt.type=="mousemove"){
            this.mouseMove(evt);
        }
        /*if (evt.type == "SVGResize" || evt.type == "resize" || evt.type == "SVGScroll" || evt.type == "SVGZoom") {
		this.resetFactors();
	}*/
	/*if ((evt.type == "mouseover" || evt.type == "mouseout" || evt.type == "mousemove") ) {
		alert(evt.type);
	}*/
}
rect.prototype.mouseOver=function(evt){
    var item;
    bOver=1;
    if( (itemFocused==1) && (start_drag==0)){
        selectedItemOver=this;
        
        item = this.id;//selectedItemOver.getAttributeNS(null,"id");
        var row = getRowNumArrec(item,ID_HEADER);
        if(row!=selectedIndex){
            selectedIndexOver = row;
        }else
            selectedIndexOver=selectedIndex;
    }
                    
    if( (itemFocused==0) && (start_drag==0)){
        selectedItem = this;
        item = this.id;
        //item = selectedItem.getAttributeNS(null,"id");
        
        selectedIndex = getRowNumArrec(item,ID_HEADER);
        
        var arrow = arrec[selectedIndex];
        transx = arrow[TRANSX_HEADER];//getCell("myTable",selectedIndex,TRANSX_HEADER);
        transy = arrow[TRANSY_HEADER];//getCell("myTable",selectedIndex,TRANSY_HEADER);
    }
    if((selectedIndexOver != selectedIndex)&&(start_drag==0))
        //$(this.firstChild).attr('stroke', 'lime');
    this.rect.setAttributeNS(null,"stroke","#FF0000");
}

rect.prototype.mouseOut=function(evt)  { 
    bOver=0;
    nbrClick=0;
    if(itemFocused==0)
        //$(this.firstChild).attr('stroke', 'black'); 
    this.rect.setAttributeNS(null,"stroke","#000000");
    if((selectedIndexOver != selectedIndex)&& (start_drag==0) && (selectedIndexOver!=-1) && (itemFocused==1))
        //$(selectedItemOver.firstChild).attr('stroke', 'black'); 
    this.rect.setAttributeNS(null,"stroke","#000000");
    selectedIndexOver=-1;
    selectedItemOver = null;
}
rect.prototype.mouseDown=function(e){
    //if(e.clientX>=1100)
    //    return;      
    //var el = e.target;
    var id = this.id;//el.parentNode.getAttributeNS(null,"id");
    document.getElementById("verb4").value="id="+id;
    
    if(bOver==1){
        back_drag=0;           
        if((selectedIndexOver != selectedIndex)&&(itemFocused==1)&&(selectedIndexOver!=-1) ){
            //$(selectedItem.firstChild).attr('stroke', 'black');
            this.rect.setAttributeNS(null,"stroke","#000000");
            selectedItem=selectedItemOver;
            document.getElementById("verb5").value="selItem="+selectedItem;
            selectedIndex=selectedIndexOver;
            GetInitCoordx = e.clientX;
            GetInitCoordy = e.clientY;
            var arrow = arrec[selectedIndex];
            transx = arrow[TRANSX_HEADER];
            transy = arrow[TRANSY_HEADER];
            rotate_deg = parseInt(arrow[ROTATE_HEADER]);
            selectedRow = selectedIndex;
            start_drag = 1;
            if(activeView=="ROOM"){
                var count = getNbrCaisse(selectedIndex);
                var arrow = arrec[selectedRow];
                arrow[QUANTITE_HEADER]=count;
            }
        }
                    
        if((selectedIndexOver == selectedIndex)&&(itemFocused==1)&&(selectedIndexOver!=-1)){
            start_drag = 1;
        }
        
        if((selectedItem)&&(itemFocused==0)){
            itemFocused=1;
            start_drag = 1;
            GetInitCoordx = e.clientX;
            GetInitCoordy = e.clientY;
            var arrow = arrec[selectedIndex];
            transx = arrow[TRANSX_HEADER];
            transy = arrow[TRANSY_HEADER];
            selectedRow = selectedIndex;
            
        }
        
        
        //$(selectedItem.firstChild).attr('stroke','red'); 
        this.rect.setAttributeNS(null,"stroke","#FF0000");
        if(activeView=="ROOM"){
            if(selectedItem){
                var arrow = arrec[selectedIndex];
                document.getElementById("textePalette").value = arrow[TEXTE_HEADER];
                document.getElementById("nbrCarton").value=arrow[QUANTITE_HEADER];
                rotate_deg = parseInt(arrow[ROTATE_HEADER]);
            }
            var btnCarton = document.getElementById("vueCarton");
            btnCarton.disabled=false;
        }
        
        if(activeView=="CARTON"){
            if(selectedItem){
                var arrow = arrec[selectedIndex];
                document.getElementById("prefix").value=arrow[ARG1_HEADER];
                document.getElementById("article").value=arrow[ARG2_HEADER];
                document.getElementById("nbrCoiffes").value=arrow[QUANTITE_HEADER];
                rotate_deg = parseInt(arrow[ROTATE_HEADER]);
            }
            var btnCarton = document.getElementById("vueCarton");
            btnCarton.disabled=false;
        }
        var item = this.id;//selectedItem.getAttributeNS(null,"id");
        selArr = arrec[selectedRow];
    }else{
        start_drag = 0;
        if ((start_drag==0)&&(itemFocused==1)){
            itemFocused=0;
            //$(selectedItem.firstChild).attr('stroke', 'black'); 
            this.rect.setAttributeNS(null,"stroke","#000000");
        }
        if(back_drag==0){
            back_drag=1;
            x_ori_back=e.clientX-zoomx/ratioZoom;
            y_ori_back=e.clientY-zoomy/ratioZoom;
        }
        pressTimer = window.setTimeout(setLongClick,1000);
    }
}
rect.prototype.mouseUp = function(evt)  {
  clearTimeout(pressTimer);
    if(back_drag==1){
        back_drag=0;
        updateViewCookie();
    }
    if((start_drag) &&(bDragging)){
        var arrow = arrec[selectedRow];
        arrow[TRANSX_HEADER]=dx;//*ratioZoom;
        arrow[TRANSY_HEADER]=dy;//*ratioZoom;
        changeArrayRow(selectedRow,arrow);
    }
    start_drag = 0;
    bDragging = 0;
    dx=0;
    dy=0;            
}
rect.prototype.mouseMove = function(e){
    nbrClick=0;
    /*var coords = myMapApp.calcCoord(e);
    var vx = coords.x.toFixed(1);
    var vy = coords.y.toFixed(1);
    document.getElementById("verb1").value="x="+vx;
    document.getElementById("verb2").value="y="+vy;
*/    
    if(back_drag==1){
        dx_back = (e.clientX-x_ori_back)*ratioZoom;
        dy_back = (e.clientY-y_ori_back)*ratioZoom;  
        document.getElementById("verb3").value="y="+dx_back;
        var svg = $('#svgbasics').svg('get');
        zoomx =  parseInt(dx_back);
        zoomy =  parseInt(dy_back);
        svg.configure({
            viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh
        });        
    }else{
        back_drag=0;
    }
    if(start_drag==1){
        if(!bDragging){            
            bDragging=1;
        //$(selectedItem).attr("transform", "rotate("+arrow[ROTATE_HEADER]+")");
        }
        dx = (e.clientX-GetInitCoordx)*ratioZoom - (-transx);
        dy = (e.clientY-GetInitCoordy)*ratioZoom- (-transy);
        this.rect.setAttributeNS(null,"transform", "translate("+dx+","+dy+") rotate("+rotate_deg+")");
        //$(selectedItem).attr("transform", "translate("+dx+","+dy+") rotate("+rotate_deg+")");
    }else{
                    
        bDragging=0;
    }
}