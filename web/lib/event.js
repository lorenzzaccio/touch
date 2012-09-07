/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function initEventHandler(){
    
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        //ratioZoom=1;
        
        document.addEventListener('touchmove', function(event) {
            event.preventDefault();
            tmouseMove(event);
        }, false);

        document.addEventListener('touchstart', function(event) {
            tmouseDown(event);
        });
        document.addEventListener('touchend', function(event) {
            tmouseUp(event);
        }, false);
        document.addEventListener('gesturestart', function(event) {
            gestureStart(event);
        }, false);
        document.addEventListener('gesturechange', function(event) {
            gestureChange(event);
        }, false);
        document.addEventListener('gestureend', function(event) {
            gestureEnd(event);
        }, false);
    }else{
        //ratioZoom=1;
        $("svg").bind('mousedown',mouseDown);
        $("svg").bind("mouseup", mouseUp);
        $("svg").bind("mousemove", mouseMove);
        $("svg").bind('click', svgClickedBckg);
    } 
}

function svgClickedBckg(e) { 
    //if(e.clientX>=1100)
    //   return;
    if(bOver==0){
        
        if(activeView=="ROOM"){
            var btnCarton = document.getElementById("vueCarton");
            btnCarton.disabled=true;
        }
        nbrClick=0;
        if(itemFocused==1){
            itemFocused=0;
            $(selectedItem.firstChild).attr('stroke', 'black');
        //hideCP();
        }
        start_drag=0;
        selectedItem=null;
        selectedIndex=-1;
    }                
} 
function resetClick(){
    nbrClick=0;
}
function svgClicked() { 
    //lblState.setValue("click",undefined);
    back_drag=0;                
    nbrClick = parseInt(nbrClick)+1;
    window.setTimeout(resetClick,200);
    //lblIndex.setValue("nbrclick="+nbrClick);
    if(nbrClick==2){
        if(activeView=="ROOM")
            vueCartonBtnPressed();
        else{
            if(activeView=="CARTON")
                vuePaletteBtnPressed();
        }
    } 
} 
 
function svgOver() {        
    var item;
    bOver=1;
    if( (itemFocused==1) && (start_drag==0)){
        selectedItemOver=this;
        item = selectedItemOver.getAttributeNS(null,"id");
        var row = getRowNumArrec(item,ID_HEADER);
        if(row!=selectedIndex){
            selectedIndexOver = row;
        }else
            selectedIndexOver=selectedIndex;
    }
                    
    if( (itemFocused==0) && (start_drag==0)){
        selectedItem = this;
        item = selectedItem.getAttributeNS(null,"id");
        
        selectedIndex = getRowNumArrec(item,ID_HEADER);
        
        var arrow = arrec[selectedIndex];
        transx = arrow[TRANSX_HEADER];//getCell("myTable",selectedIndex,TRANSX_HEADER);
        transy = arrow[TRANSY_HEADER];//getCell("myTable",selectedIndex,TRANSY_HEADER);
    }
    if((selectedIndexOver != selectedIndex)&&(start_drag==0))
        $(this.firstChild).attr('stroke', 'lime'); 
                
} 

function svgOut() { 
    bOver=0;
    nbrClick=0;
    if(itemFocused==0)
        $(this.firstChild).attr('stroke', 'black'); 
    if((selectedIndexOver != selectedIndex)&& (start_drag==0) && (selectedIndexOver!=-1) && (itemFocused==1))
        $(selectedItemOver.firstChild).attr('stroke', 'black'); 
    selectedIndexOver=-1;
    selectedItemOver = null;
}
            
function svgDrag(event, ui){
    // update coordinates manually, since top/left style props don't work on SVG
    $(this).attr('x', ui.position.left); 
    $(this).attr('y', ui.position.top); 
}
        
function getNbrCaisse(lclSelectedItem){
    var item = selectedItem.getAttributeNS(null,"id");
    return searchInArray(VIEW_HEADER,item);
}


           

function mouseMove(e){
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
        $(selectedItem).attr("transform", "translate("+dx+","+dy+") rotate("+rotate_deg+")");
    }else{
                    
        bDragging=0;
    }
}
function tmouseMove(e){
    var touch = e.touches[0];
    mouseX = touch.pageX;
    mouseY = touch.pageY;
    /*
    var coords = myMapApp.calcCoordTouch(e);
    var vx = coords.x.toFixed(1);
    var vy = coords.y.toFixed(1);
    document.getElementById("verb4").value="x="+vx;
    document.getElementById("verb5").value="y="+vy;
    */
    //virtual rect
    /* 
     var svg = $('#svgbasics').svg('get');
    var vr = svg.getElementById("gVirtRect"); 
    dx = (mouseX-GetInitCoordxVirtRect)/ratioZoom;
    dy = (mouseY-GetInitCoordyVirtRect)/ratioZoom;
    $(virtRect).attr("transform", "translate("+dx+","+dy+")");
    */
    if(back_drag==1){
        document.getElementById("verb5").value="back_dragging";
        dx_back = (mouseX-x_ori_back);//ratioZoom;
        dy_back = (mouseY-y_ori_back);//ratioZoom;  
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
        document.getElementById("verb5").value="dragging";
        bDragging=1;
        dx = (mouseX-GetInitCoordx)/ratioZoom - (-transx);
        dy = (mouseY-GetInitCoordy)/ratioZoom - (-transy);
        document.getElementById("verb1").value="dx="+dx+" mouseX="+transx;
        document.getElementById("verb2").value="dy="+dy;
        $(selectedItem).attr("transform", "translate("+dx+","+dy+")");
    }else{          
        bDragging=0;
    }
}

function tmouseDown(e){
    var arrow=[];
    var touch = e.changedTouches.item(0);
    var el = e.target;
    var id = el.parentNode.getAttributeNS(null,"id");
    document.getElementById("verb4").value="id="+id;
    mouseX = touch.pageX;
    mouseY = touch.pageY;
    /*
    //draw virtual rect
    virtRect = drawVirtualRect(mouseX-(-xoff),mouseY-(-yoff),160,80);
    GetInitCoordxVirtRect = mouseX;
    GetInitCoordyVirtRect = mouseY;
    */
    if((id!="svgbasics")&&( (id.indexOf("gpal")!=-1)||(id.indexOf("gcai") != -1))){
        selectedItem = el.parentNode;
        document.getElementById("verb5").value="selItem="+selectedItem;
        previousSelectedItem = selectedItem;
        selectedItem= el.parentNode;
        var item = id;
        selectedIndex = getRowNumArrec(item,ID_HEADER);
        selectedRow = selectedIndex;
        selArr = arrec[selectedRow];
        document.getElementById("verb3").value="row="+selectedRow;
        $(previousSelectedItem.firstChild).attr('stroke','black'); 
        $(selectedItem.firstChild).attr('stroke','red'); 
            
        if(activeView=="ROOM"){
            var btnCarton = document.getElementById("vueCarton");
            btnCarton.disabled=false;
        }
        arrow = arrec[selectedIndex];
        transx = arrow[TRANSX_HEADER];
        transy = arrow[TRANSY_HEADER];
        rotate_deg = parseInt(arrow[ROTATE_HEADER]);
        bOver=1;
        back_drag=0;
        start_drag = 1;
        itemFocused=1;
    }else{
        bOver=0;
        if(id=="svgbasics"){
            itemFocused=0;
            $(selectedItem.firstChild).attr('stroke','black'); 
        }
    }
        
    if(bOver==1){
        GetInitCoordx = mouseX;
        GetInitCoordy = mouseY;
        start_drag = 1;
        back_drag=0;
    }else{
        start_drag = 0;
        if(back_drag==0){
            back_drag=1;
            x_ori_back=mouseX-zoomx/ratioZoom;
            y_ori_back=mouseY-zoomy/ratioZoom;
        }
    }
}

function mouseDown(e){
    //if(e.clientX>=1100)
    //    return;      
    /*var coords = myMapApp.calcCoord(e);
    var vx = coords.x.toFixed(1);
    var vy = coords.y.toFixed(1);
    document.getElementById("verb1").value="x="+vx;
    document.getElementById("verb2").value="y="+vy;
    */
    var el = e.target;
    var id = el.parentNode.getAttributeNS(null,"id");
    document.getElementById("verb4").value="id="+id;
    if(bOver==1){
        back_drag=0;           
        if((selectedIndexOver != selectedIndex)&&(itemFocused==1)&&(selectedIndexOver!=-1) ){
            $(selectedItem.firstChild).attr('stroke', 'black');
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
        
        
        $(selectedItem.firstChild).attr('stroke','red'); 
        
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
        var item = selectedItem.getAttributeNS(null,"id");
        selArr = arrec[selectedRow];
    }else{
        start_drag = 0;
        if ((start_drag==0)&&(itemFocused==1)){
            itemFocused=0;
            $(selectedItem.firstChild).attr('stroke', 'black'); 
        }
        if(back_drag==0){
            back_drag=1;
            x_ori_back=e.clientX-zoomx/ratioZoom;
            y_ori_back=e.clientY-zoomy/ratioZoom;
        }
    }
}
            
function mouseUp(e){
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
function tmouseUp(e){
    back_drag=0;
    //var svg = $('#svgbasics').svg('get');
    //svg.getElementById("gVirtRect"); 
    //svg.remove(virtRect);
    //var touch = e.changedTouches.item(0);
                
    if((start_drag) &&(bDragging)){
        start_drag = 0;
        var arrow = arrec[selectedRow];
        arrow[TRANSX_HEADER]=dx;
        arrow[TRANSY_HEADER]=dy;
        changeArrayRow(selectedRow,arrow);
        transx=0;
        transy=0;
    }
    start_drag = 0;
    bDragging = 0;
    dx=0;
    dy=0;
                
}
function gestureStart(event) {
    event.preventDefault();
    handlingGesture = true;
    var node = event.target;
			
    x = parseInt(node.getAttributeNS(null, 'x'));
    y = parseInt(node.getAttributeNS(null, 'y'));
			
    width = parseInt(node.getAttributeNS(null, 'width'));
    height = parseInt(node.getAttributeNS(null, 'height'));
						
    var transform = (node.getAttributeNS(null, 'transform'));
    rotation = parseInt(transform.split('rotate(')[1].split(' ')[0]); // ouch
	
    if(isNaN(rotation)) {
        rotation = 0;
    }
}
		
function gestureChange(event) {
    event.preventDefault();
    var node = event.target;
			
    // scale
    /*var newWidth = width * event.scale;
    var newHeight = height * event.scale;
			
    var newX = x - (newWidth - width)/2;
    var newY = y - (newHeight - height)/2; 
						
    node.setAttributeNS(null, 'width', newWidth);
    node.setAttributeNS(null, 'height', newHeight);
    node.setAttributeNS(null, 'x', newX);
    node.setAttributeNS(null, 'y', newY);*/
    /*
     *var mydiv = document.getElementById("svgbasics");
    var curr_width = mydiv.offsetWidth;
    ratioZoom = newWidth/curr_width;
    var toto = document.getElementById("wheelvalue");
    var svg = $('#svgbasics').svg('get');
    toto.value=ratioZoom; 
    svg.configure({viewBox: newX+' '+newY+' '+newWidth+' '+newHeight});
    updateViewCookie();
    */
   
   var newWidth = width / event.scale;
    var newHeight = height / event.scale;
    //dx_back = (mouseX-x_ori_back);//ratioZoom;
    //dy_back = (mouseY-y_ori_back);//ratioZoom;  
    document.getElementById("verb3").value="y="+dx_back;
    var svg = $('#svgbasics').svg('get');
    zoomw =  parseInt(newWidth);
    zoomh =  parseInt(newHeight);
    svg.configure({
        viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh
    });  
/*    
    // rotation
    var newRotation = rotation + event.rotation;
    var centerX = newX + newWidth/2;
    var centerY = newY + newHeight/2;
    setRotation(node, newRotation, centerX, centerY);
    */
}
		
function gestureEnd(event) {
    rotation = rotation + event.rotation;
    updateViewCookie();
}
		
function setRotation(node, rotation, x, y) {
    var centerX = x + width/2;
    var centerY = y + height/2;
		
    node.setAttributeNS(null, 'transform', 'rotate('+ rotation +' '+ x +' '+ y +')');
}

