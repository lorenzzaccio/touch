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

var indexRec=0;
var recX;
var recY;
var transX=0;
var w;
var h;
var offsetX=40;
var offsetY=200;
var mouseX;
var mouseY;
var activeView = "ROOM";

function addPalette(){
    var fillColor="yellow";
    var strokeColor="purple";
    var rowLength = 0;
    //if(document.getElementById(tableId)!= null)
    //    rowLength = document.getElementById(tableId).rows.length;   
    //rowLength = arrec.length;
    //indexPalette = rowLength ;
    var index =  window.localStorage.getItem("stock:index")
    var id = "pal_"+index;
    //addNewRow("myTable","palette30","g"+id,ID_HEADER);
    //var selIndex = allocateCookieId() - (-1);
    //arrow[INDEX_HEADER] = selIndex;
    addNewRowPalette("palette30","g"+id,ID_HEADER,id);
}

function addProductBtn(){
    if(activeView=="ROOM")
        addPalette();
    else
        addCaisse();
}

function addCaisse(){
    var rowLength = 0;
    if(document.getElementById(tableId)!= null)
        rowLength = document.getElementById(tableId).rows.length;   
    
    //var val = allocateCookieId();
    //indexPalette = val -(-1) ;
    var index =  window.localStorage.getItem("stock:index")
    indexPalette = index;
    var id = "cai_"+indexPalette;
    var arrow = new Array(COL_NUMBER);
    arrow[BTN_HEADER]="";
    arrow[ID_HEADER]="g"+id;
    arrow[INDEX_HEADER]=index;
    arrow[X_HEADER]=20;
    arrow[Y_HEADER]=20;
    arrow[TRANSX_HEADER]=0;
    arrow[TRANSY_HEADER]=0;
    arrow[ROTATE_HEADER]=0;
    arrow[FORME_HEADER]="rectangle";
    arrow[WIDTH_HEADER]=160;
    arrow[HEIGHT_HEADER]=80;
    arrow[ARG1_HEADER]=0;
    arrow[ARG2_HEADER]=0;
    arrow[TEXTE_HEADER]="caisse";
    arrow[FILLCOLOR_HEADER]="orange";
    arrow[STROKECOLOR_HEADER]="purple";
    arrow[TYPE_HEADER]="caisse25";
    arrow[LIEU_HEADER]="ay";
    arrow[VIEW_HEADER]=selectedPalette;
    arrow[WARE_HEADER]="coiffes";
    arrow[QUANTITE_HEADER]=2500;
    arrow[ORDER_HEADER]=20;
    
    //addNewRow2("myTable",arrow);
    //var val = allocateCookieId();
    var selIndex = allocateCookieId() - (-1);
    arrow[INDEX_HEADER] = selIndex;
    addNewRowCaisse(arrow,selIndex);
}
function vuePaletteBtnPressed(){
    activeView="ROOM";
    drawcaps();
}
function vueCartonBtnPressed(){
    activeView="CARTON";
    selectedPalette = selectedItem.getAttributeNS(null,"id");
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
/*
function drawRect(rectId,fillColor,strokeColor,x,y,width,height,transx,transy){
    var svg = $('#svgbasics').svg('get');
    var group = svg.group(null,rectId,{
        transform:"translate("+transx+","+transy+")"
    });

    var police="Verdana";
    var color = strokeColor;
    var taille = 2;
    var opacite = 1;
    var epaisseurTrait = 4;
    recX = x;
    recY=y;
    w = width;
    h = height;
    svg.rect(group, x, y, width, height, 1, 1, {
        id:rectId+"sub",
        fill: fillColor, 
        stroke: strokeColor, 
        strokeWidth: epaisseurTrait,
        transform:"translate(0,0)"
    }); 
    
    var arrow = [];
    arrow[ID_HEADER]=rectId;
    arrow[X_HEADER]=x;
    arrow[HEIGHT_HEADER]=y;
    arrow[WIDTH_HEADER]=width;
    arrow[HEIGHT_HEADER]=height;
    arrow[TRANSX_HEADER]=transx;
    arrow[TRANSY_HEADER]=transy;
    arrow[QUANTITE_HEADER]=0;
    arrow[VIEW_HEADER]=0;
    
    arrec[indexRec]=arrow;
    indexRec=indexRec+1;
    if (! ( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) )) {        
        $('#'+rectId).bind('click', svgClicked);
        $('#'+rectId).bind('mouseover', svgOver);
        $('#'+rectId).bind('mouseout', svgOut); 
    //$('#'+rectId).bind('contextmenu', svgRightClicked); 
    //document.addEventListener('contextmenu',svgRichtClicked, false);
    }
    return group;
}
*/
function initEventHandler(){
    
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        ratioZoom=1;
        document.addEventListener('touchmove', function(event) {
            //event.preventDefault();
            var touch = event.touches[0];
            //console.log("Touch x:" + touch.pageX + ", y:" + touch.pageY);
            var touch = event.touches[0];
            mouseX = touch.pageX;
            mouseY = touch.pageY;
            tmouseMove(event);
        }, false);

        document.addEventListener('touchstart', function(event) {
            event.preventDefault();
            var touch = event.touches[0];
            mouseX = touch.pageX;
            mouseY = touch.pageY;
            tmouseDown(event);
        });
        document.addEventListener('touchend', function(event) {
            event.preventDefault();
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
    if(e.clientX>=1100)
       return;
    if(bOver==0){
        nbrClick=0;
        if(itemFocused==1){
            itemFocused=0;
            $(selectedItem.firstChild).attr('stroke', 'black');
        //hideCP();
        }
        start_drag=0;
        lblDrag.setValue("drag=0");
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
    lblState.setValue("click",undefined);
                    
    nbrClick = parseInt(nbrClick)+1;
    //if(nbrClick==1){
    window.setTimeout(resetClick,200);
    //}
    lblIndex.setValue("nbrclick="+nbrClick);
    if(nbrClick==2){
        vueCartonBtnPressed();
    } 
} 
 
function svgOver() {        
    bOver=1;
    if( (itemFocused==1) && (start_drag==0)){
        selectedItemOver=this;
        var item = selectedItemOver.getAttributeNS(null,"id");
        if(item!=selectedIndex){
            var row = getRowNumArrec(item,ID_HEADER);
            selectedIndexOver = row;
        }else
            selectedIndexOver=-1;
    }
                    
    if( (itemFocused==0) && (start_drag==0)){
        selectedItem = this;
        var item = selectedItem.getAttributeNS(null,"id");
        lblState.setValue(item);
        var row = getRowNumArrec(item,ID_HEADER);
        selectedIndex = row;//index[1];
        lblIndex.setValue(selectedIndex);
        var arrow = arrec[selectedIndex];
        transx = arrow[TRANSX_HEADER];//getCell("myTable",selectedIndex,TRANSX_HEADER);
        transy = arrow[TRANSY_HEADER];//getCell("myTable",selectedIndex,TRANSY_HEADER);
        lbltransx.setValue(transx,undefined);
        lbltransy.setValue(transy,undefined);
        lblItemSelected.setValue(item,undefined);
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

function tmouseDown(e){
    var touch = e.changedTouches.item(0);
                mouseX = touch.pageX;
                mouseY = touch.pageY;
                if(mouseX>=1100)
                    return;
    lblState.setValue("down1",undefined);
    lbltransx.setValue("x="+mouseX+" X1="+lx +" X2="+lw,undefined);
            lbltransy.setValue("y="+mouseY+" Y1="+ly +" Y2="+lh,undefined);
                
    for(var j=0;j<arrec.length;j++){
        arrow = arrec[j];//.split("");
        var lx=arrow[X_HEADER]+arrow[TRANSX_HEADER]+offsetX;
        var ly=arrow[Y_HEADER]+arrow[TRANSY_HEADER]+offsetY;
        var lw=arrow[WIDTH_HEADER]+lx;
        var lh=arrow[HEIGHT_HEADER]+ly;
        if( (mouseX>lx) && (mouseX<lw) && (mouseY>ly) && (mouseY<lh) ) {
            selectedRect = j;
            selectedItem= document.getElementById(arrow[ID_HEADER]);
            var item = selectedItem.getAttributeNS(null,"id");
            lblDrag.setValue(item);
            
            lbltransx.setValue("x="+mouseX+" X1="+lx +" X2="+lw,undefined);
            lbltransy.setValue("y="+mouseY+" Y1="+ly +" Y2="+lh,undefined);
                
            $(selectedItem.firstChild).attr('stroke', 'lime'); 
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
           
function tmouseUp(e){
    lblState.setValue("Mouse is up",undefined);
    var touch = e.changedTouches.item(0);
    mouseX = touch.pageX;
    mouseY = touch.pageY;
    $(selectedItem.firstChild).attr('stroke', 'black'); 
    lbltransx.setValue(mouseX,undefined);
    lbltransy.setValue(mouseY,undefined);
                
    if((start_drag) &&(bDragging)){
        start_drag = 0;
        transx=dx;
        transy=dy;
        arrow[TRANSX_HEADER]=transx;
        arrow[TRANSY_HEADER]=transy;
        arrec[selectedRect]=arrow;
        transx=0;
        transy=0;
    }
    start_drag = 0;
    bDragging = 0;
    dx=0;
    dy=0;
                
}

function tmouseMove(e){
    var touch = e.touches[0];
    mouseX = touch.pageX;
    mouseY = touch.pageY;
    lblState.setValue("tmove",undefined);
    if(start_drag==1){
        bDragging=1;
        dx = (mouseX-GetInitCoordx)*ratioZoom - (-transx);
        dy = (mouseY-GetInitCoordy)*ratioZoom- (-transy);
        $(selectedItem).attr("transform", "translate("+dx+","+dy+")");
        lbltransx.setValue("dx="+dx,undefined);
        lbltransy.setValue("dy="+dy,undefined);
    }else{
                    
        bDragging=0;
    }
}

function mouseDown(e){
    if(e.clientX>=1100)
        return;
                
    if(bOver==1){
        lblState.setValue("downOver",undefined);
                    
        if((selectedIndexOver != selectedIndex)&&(itemFocused==1)&&(selectedIndexOver!=-1) ){
            $(selectedItem.firstChild).attr('stroke', 'black');
            selectedItem=selectedItemOver;
            selectedIndex=selectedIndexOver;
            GetInitCoordx = e.clientX;
            GetInitCoordy = e.clientY;
            var arrow = arrec[selectedIndex];
            transx = arrow[TRANSX_HEADER];//getCell("myTable",selectedIndex,TRANSX_HEADER);
            transy = arrow[TRANSY_HEADER];
            //var arrow = [];
            //arrow = readRow(tableId,selectedIndex);
            selectedRow = selectedIndex;
            start_drag = 1;
            var count = getNbrCaisse(selectedIndex);
            //changeCell(tableId,selectedRow,QUANTITE_HEADER,count);
            var arrow = arrec[selectedRow];
            arrow[QUANTITE_HEADER]=count;
        }
                    
        if((selectedIndexOver == selectedIndex)&&(itemFocused==1)&&(selectedIndexOver!=-1)){
            start_drag = 1;
            lblDrag.setValue("drag=1");
        }
        if((selectedItem)&&(itemFocused==0)){
            itemFocused=1;
            start_drag = 1;
            GetInitCoordx = e.clientX;
            GetInitCoordy = e.clientY;
            var arrow = arrec[selectedIndex];
            transx = arrow[TRANSX_HEADER];//getCell("myTable",selectedIndex,TRANSX_HEADER);
            transy = arrow[TRANSY_HEADER];
            //var arrow = [];
            //arrow = readRow(tableId,selectedIndex);
            selectedRow = selectedIndex;
        }
        $(selectedItem.firstChild).attr('stroke','red'); 
        lblIndex.setValue(selectedIndex);
        lbltransx.setValue(transx,undefined);
        lbltransy.setValue(transy,undefined);
        var item = selectedItem.getAttributeNS(null,"id");
        lblItemSelected.setValue(item,undefined)
    }else{
        lblState.setValue("downOut",undefined);
        start_drag = 0;
        lblDrag.setValue("drag=0");
        if ((start_drag==0)&&(itemFocused==1)){
            itemFocused=0;
            $(selectedItem.firstChild).attr('stroke', 'black'); 
        }
    }
}
            
function mouseUp(e){
    lblState.setValue("Mouse is up",undefined);
    if((start_drag) &&(bDragging)){
        //changeCell(tableId,selectedRow,TRANSX_HEADER,dx);
        //changeCell(tableId,selectedRow,TRANSY_HEADER,dy);
        var arrow = arrec[selectedRow];
        arrow[TRANSX_HEADER]=dx;
        arrow[TRANSY_HEADER]=dy;
        changeArrayRow(selectedRow,arrow);
        //changeArrayValue(selectedRow,TRANSX_HEADER,dx);
        //changeArrayValue(selectedRow,TRANSY_HEADER,dy);
        start_drag = 0;
        lblDrag.setValue("drag=0");
        lbltransx.setValue(dx,undefined);
        lbltransy.setValue(dy,undefined);
    }
    start_drag = 0;
    bDragging = 0;
    dx=0;
    dy=0;
                
                
                
}
            
function mouseMove(e){
    nbrClick=0;
    lblState.setValue("move",undefined);
    lblx.setValue(e.clientX,undefined);
    lbly.setValue(e.clientY,undefined);
    if(start_drag==1){
                    
        bDragging=1;
        dx = (e.clientX-GetInitCoordx)*ratioZoom - (-transx);
        dy = (e.clientY-GetInitCoordy)*ratioZoom- (-transy);
        $(selectedItem).attr("transform", "translate("+dx+","+dy+")");
    }else{
                    
        bDragging=0;
    }
}

