/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
// GUI CallBack

var indexPalette=1;
var dy=0;
var transx=0;
var transy=0;
var ratioZoom=1;
var GetInitCoordx=0;
var GetInitCoordy=0;
var lblx ;
var lbly ; 
var lblState;
var start_drag=0;
var dx=0;
var start = null; 
var outline = null; 
var offset = null; 

var selectedIndex=0;
var bOver=0;
var bDragging = 0;
var nbrClick=0;
var itemFocused = 0;
var selectedPalette;
var selectedIndexOver=-1;
var selectedItemOver;
var selectedItem;
var previousSelectedItem;

var indexRec=0;
var recX;
var recY;
var transX=0;
var w;
var h;
var offsetX=0;//40;
var offsetY=0;//200;
var mouseX;
var mouseY;
var activeView = "ROOM";

function addPalette(){
    var index =  window.localStorage.getItem("stock:index");
    var id = "pal_"+index;
    addNewRowPalette("palette30","g"+id,ID_HEADER,index);
}

function addProductBtn(){
    if(activeView=="ROOM")
        addPalette();
    else
        addCaisse();
}
function addCaisse(){
    var index =  window.localStorage.getItem("stock:index");
    var id = "cai_"+index;
    addNewRowCaisse("caisse25","g"+id,ID_HEADER,index,selectedPalette);
}
function vuePaletteBtnPressed(){
    activeView="ROOM";
    var btn = document.getElementById("vuePalette");
    btn.disabled=true;
    document.getElementById('addBtn').value= "Ajouter une palette";
    drawcaps();
}
function vueCartonBtnPressed(){
    activeView="CARTON";
    var btn = document.getElementById("vuePalette");
    btn.disabled=false;
    var btnCarton = document.getElementById("vueCarton");
    btnCarton.disabled=true;
    selectedPalette = selectedItem.getAttributeNS(null,"id");
    document.getElementById('addBtn').value= "Ajouter un carton";
    var btnAdd = document.getElementById("addBtn");
    btnAdd.disabled=false;
    drawcaps();
}

function setEvents(rectId){
    $('#'+rectId).bind('click', svgClicked);
    $('#'+rectId).bind('mouseover', svgOver);
    $('#'+rectId).bind('mouseout', svgOut);
}

function drawText(group,id,strokeColor,texte,lineNumber,transx,transy){
    var svg = $('#svgbasics').svg('get');
    var police="Verdana";
    var color = strokeColor;
    var taille = 15;
    var opacite = 1;
    var epaisseurTrait = 1;
    var marqueId = id+"_txt"+lineNumber;
    var g = svg.group(group,{
        fontWeight: 'bold', 
        fontSize: taille, 
        fill: color,
        transform:"translate(0,0)"
    }); 
    svg.text(g, transx, transy-(-15*lineNumber), texte);    
}
var virtRect;
function drawVirtualRect(x,y,w,h){
    var svg = $('#svgbasics').svg('get');
    var group = svg.group(null,"gVirtRect");

    svg.rect(group, x, y, w, h, 1, 1, {
        id:"virtRect",
        fill: "none", 
        stroke: "black", 
        strokeWidth: 5,
        transform:"translate(0,0)"
    }); 
    return group;
}
function drawRect(arrow){
    
    var rectId= arrow[ID_HEADER];
    var x = arrow[X_HEADER];
    var y = arrow[HEIGHT_HEADER];
    var w = arrow[WIDTH_HEADER];
    var h = arrow[HEIGHT_HEADER];
    var transx = arrow[TRANSX_HEADER];
    var transy = arrow[TRANSY_HEADER];
    var quantite = arrow[QUANTITE_HEADER];
    var view = arrow[VIEW_HEADER];
    var strokeColor = arrow[STROKECOLOR_HEADER];
    var fillColor = arrow[FILLCOLOR_HEADER];
    var police="Verdana";
    
    var taille = 2;
    var opacite = 1;
    var epaisseurTrait = 4;
    
    
    var svg = $('#svgbasics').svg('get');
    var group = svg.group(null,rectId,{
        transform:"translate("+transx+","+transy+")"
    });

    svg.rect(group, x, y, w, h, 1, 1, {
        id:rectId+"sub",
        fill: fillColor, 
        stroke: strokeColor, 
        strokeWidth: epaisseurTrait,
        transform:"translate(0,0)"
    }); 
    
    if (! ( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) )) {        
        $('#'+rectId).bind('click', svgClicked);
        $('#'+rectId).bind('mouseover', svgOver);
        $('#'+rectId).bind('mouseout', svgOut); 
    //$('#'+rectId).bind('contextmenu', svgRightClicked); 
    //document.addEventListener('contextmenu',svgRichtClicked, false);
    }
    return group;
}

function initEventHandler(){
    
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        ratioZoom=1;
        document.addEventListener('touchmove', function(event) {
            event.preventDefault();
            var touch = event.touches[0];
            //console.log("Touch x:" + touch.pageX + ", y:" + touch.pageY);
            var touch = event.touches[0];
            mouseX = touch.pageX;
            mouseY = touch.pageY;
            tmouseMove(event);
        }, false);

        document.addEventListener('touchstart', function(event) {
            //event.preventDefault();
            var touch = event.touches[0];
            mouseX = touch.pageX;
            mouseY = touch.pageY;
            tmouseDown(event);
        });
        document.addEventListener('touchend', function(event) {
            //event.preventDefault();
            lblState.setValue("up",undefined);
            tmouseUp(event);
        }, false);
    }else{
        //EnableContext();
        ratioZoom=1;
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
        //lblDrag.setValue("drag=0");
        selectedItem=null;
        //selectedItemOver=null;
        selectedIndex=-1;
    //selectedIndexOver=-1;
    }
                    
} 
function resetClick(){
    nbrClick=0;
}
function svgClicked() { 
    //lblState.setValue("click",undefined);
                    
    nbrClick = parseInt(nbrClick)+1;
    window.setTimeout(resetClick,200);
    //lblIndex.setValue("nbrclick="+nbrClick);
    if(nbrClick==2){
        if(activeView=="ROOM")
            vueCartonBtnPressed();
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
        //lbltransx.setValue(transx,undefined);
        //lbltransy.setValue(transy,undefined);
        //lblItemSelected.setValue(item,undefined);
        //lblIndex.setValue("index="+selectedIndex);
        //lblState.setValue(item);
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


           


function tmouseMove(e){
    var touch = e.touches[0];
    mouseX = touch.pageX;
    mouseY = touch.pageY;
    //lblState.setValue("tmove",undefined);
    if(start_drag==1){
        bDragging=1;
        dx = (mouseX-GetInitCoordx)*ratioZoom - (-transx);
        dy = (mouseY-GetInitCoordy)*ratioZoom- (-transy);
        $(selectedItem).attr("transform", "translate("+dx+","+dy+")");
        //lbltransx.setValue("dx="+dx,undefined);
        //lbltransy.setValue("dy="+dy,undefined);
    }else{
                    
        bDragging=0;
    }
}
function tmouseDown(e){
    var arrow=[];
    var touch = e.changedTouches.item(0);
                mouseX = touch.pageX;
                mouseY = touch.pageY;
    var xoff = parseFloat(document.getElementById("xoff").value);
    var yoff = parseFloat(document.getElementById("yoff").value);
    //alert("xoff="+xoff);
    //alert("yoff="+yoff);
    //draw virtual rect
    virtRect = drawVirtualRect(mouseX-80/ratioZoom-(-xoff/ratioZoom),mouseY-40/ratioZoom-(-yoff/ratioZoom),160/ratioZoom,80/ratioZoom);
                //if(mouseX>=1100)
                //    return;
    //lblState.setValue("down1",undefined);
    //lbltransx.setValue("x="+mouseX+" X1="+lx +" X2="+lw,undefined);
    //lbltransy.setValue("y="+mouseY+" Y1="+ly +" Y2="+lh,undefined);
    
                
    for(var j=0;j<arrec.length;j++){
        arrow = arrec[j];//.split("");
        var lx=arrow[X_HEADER]+arrow[TRANSX_HEADER];
        var ly=arrow[Y_HEADER]+arrow[TRANSY_HEADER];
        var lw=arrow[WIDTH_HEADER]+lx;
        var lh=arrow[HEIGHT_HEADER]+ly;
        var posx = mouseX + xoff/ratioZoom;
        var posy = mouseY + yoff/ratioZoom;
        document.getElementById("verb1").value="x="+posx+" X1="+lx +" X2="+lw;
        document.getElementById("verb2").value="y="+posy+" Y1="+ly +" Y2="+lh;
        
        if( (posx>lx) && (posx<lw) && (posy>ly) && (posy<lh) ) {
            selectedRect = j;
            previousSelectedItem = selectedItem;
            selectedItem= document.getElementById(arrow[ID_HEADER]);
            var item = selectedItem.getAttributeNS(null,"id");
            
            selectedIndex = getRowNumArrec(item,ID_HEADER);
            selectedRow = selectedIndex;
            
            
            
            //lblDrag.setValue(item);
            //lbltransx.setValue("x="+mouseX+" X1="+lx +" X2="+lw,undefined);
            //lbltransy.setValue("y="+mouseY+" Y1="+ly +" Y2="+lh,undefined);
                
            $(previousSelectedItem.firstChild).attr('stroke','black'); 
            $(selectedItem.firstChild).attr('stroke','red'); 
            
            if(activeView=="ROOM"){
                var btnCarton = document.getElementById("vueCarton");
                btnCarton.disabled=false;
            }
            transx=arrow[TRANSX_HEADER];
            transy=arrow[TRANSY_HEADER];
            bOver=1;
            break;
        }else
            bOver=0;
    }
    if(bOver==1){
        GetInitCoordx = mouseX;
        GetInitCoordy = mouseY;
        start_drag = 1;
    }else
        start_drag = 0;
}
function mouseDown(e){
    //if(e.clientX>=1100)
    //    return;
                
    if(bOver==1){
        //lblState.setValue("downOver",undefined);
                    
        if((selectedIndexOver != selectedIndex)&&(itemFocused==1)&&(selectedIndexOver!=-1) ){
            $(selectedItem.firstChild).attr('stroke', 'black');
            selectedItem=selectedItemOver;
            selectedIndex=selectedIndexOver;
            GetInitCoordx = e.clientX;
            GetInitCoordy = e.clientY;
            var arrow = arrec[selectedIndex];
            transx = arrow[TRANSX_HEADER];
            transy = arrow[TRANSY_HEADER];
            selectedRow = selectedIndex;
            start_drag = 1;
            var count = getNbrCaisse(selectedIndex);
            var arrow = arrec[selectedRow];
            arrow[QUANTITE_HEADER]=count;
        }
                    
        if((selectedIndexOver == selectedIndex)&&(itemFocused==1)&&(selectedIndexOver!=-1)){
            start_drag = 1;
            //lblDrag.setValue("drag=1");
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
            var btnCarton = document.getElementById("vueCarton");
            btnCarton.disabled=false;
        }
        //lblIndex.setValue(selectedIndex);
        //lbltransx.setValue(transx,undefined);
        //lbltransy.setValue(transy,undefined);
        var item = selectedItem.getAttributeNS(null,"id");
        //lblItemSelected.setValue("id="+item,undefined)
    }else{
        //lblState.setValue("downOut",undefined);
        start_drag = 0;
        //lblDrag.setValue("drag=0");
        if ((start_drag==0)&&(itemFocused==1)){
            itemFocused=0;
            $(selectedItem.firstChild).attr('stroke', 'black'); 
        }
    }
}
            
function mouseUp(e){
    //lblState.setValue("Mouse is up",undefined);
    
    if((start_drag) &&(bDragging)){
        var arrow = arrec[selectedRow];
        arrow[TRANSX_HEADER]=dx;//*ratioZoom;
        arrow[TRANSY_HEADER]=dy;//*ratioZoom;
        changeArrayRow(selectedRow,arrow);
        //lblDrag.setValue("drag=0");
        //lbltransx.setValue(dx,undefined);
        //lbltransy.setValue(dy,undefined);
    }
    start_drag = 0;
    bDragging = 0;
    dx=0;
    dy=0;
                
                
                
}
function tmouseUp(e){
    var svg = $('#svgbasics').svg('get');
    svg.getElementById("gVirtRect"); 
    svg.remove(virtRect);
    //lblState.setValue("Mouse is up",undefined);
    var touch = e.changedTouches.item(0);
    mouseX = touch.pageX;
    mouseY = touch.pageY;
                
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

function mouseMove(e){
    nbrClick=0;
    //lblState.setValue("move",undefined);
    //lblx.setValue(e.clientX,undefined);
    //lbly.setValue(e.clientY,undefined);
    if(start_drag==1){
                    
        bDragging=1;
        dx = (e.clientX-GetInitCoordx)*ratioZoom - (-transx);
        dy = (e.clientY-GetInitCoordy)*ratioZoom- (-transy);
        $(selectedItem).attr("transform", "translate("+dx+","+dy+")");
    }else{
                    
        bDragging=0;
    }
}

