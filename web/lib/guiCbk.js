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
var selectedIndexOver;
var selectedItemOver;
var arrec = [];
var indexRec=0;

function addPalette(){
    var fillColor="yellow";
    var strokeColor="purple";
    var rowLength = 0;
    if(document.getElementById(tableId)!= null)
        rowLength = document.getElementById(tableId).rows.length;   
    indexPalette = rowLength ;
    var id = "pal_"+indexPalette;
    addNewRow("myTable","palette30","g"+id,ID_HEADER);
}

function addProductBtn(){
    if(activeView=="ROOM")
        addPalette();
    else
        addCaisse();
}

function addCaisse(){
    var fillColor="yellow";
    var strokeColor="purple";
    var rowLength = 0;
    if(document.getElementById(tableId)!= null)
        rowLength = document.getElementById(tableId).rows.length;   
    
    var val = allocateCookieId();
    indexPalette = val -(-1) ;
    var id = "cai_"+indexPalette;
    var arrow = new Array(COL_NUMBER);
    arrow[BTN_HEADER]="";
    arrow[ID_HEADER]="g"+id;
    arrow[INDEX_HEADER]=rowLength;
    arrow[X_HEADER]=20;
    arrow[Y_HEADER]=20;
    arrow[TRANSX_HEADER]=0;
    arrow[TRANSY_HEADER]=0;
    arrow[ROTATE_HEADER]=0;
    arrow[FORME_HEADER]="rectangle";
    arrow[WIDTH_HEADER]=20;
    arrow[HEIGHT_HEADER]=10;
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
    
    addNewRow2("myTable",arrow);
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
    var taille = 2;
    var opacite = 1;
    var epaisseurTrait = 1;
    var marqueId = id+"_txt"+lineNumber;
    var g = svg.group(group,{fontWeight: 'bold', fontSize: taille, fill: color,transform:"translate(0,0)"}); 
    svg.text(g, 23, 23-(-4*lineNumber), texte);    
}

var recX;
var recY;
var transX=0;
var w;
var h;
var offsetX=40;
var offsetY=100;
var mouseX;
var mouseY;

var REC_ID=0;
var REC_X=1;
var REC_Y=2;
var REC_W=3;
var REC_H=4;
var REC_TRANSX=5;
var REC_TRANSY=6;
var arrow=[];

function drawRect(rectId,fillColor,strokeColor,x,y,width,height,transx,transy){
    //var height = 10;
    //var width=20;
    var svg = $('#svgbasics').svg('get');
    var group = svg.group(null,rectId,{transform:"translate("+transx+","+transy+")"});

    var police="Verdana";
    var color = strokeColor;
    var taille = 2;
    var opacite = 1;
    var epaisseurTrait = 4;
    recX = x;
    recY=y;
    w = width;
    h = height;
    svg.rect(group, x, y, width, height, 1, 1, {id:rectId+"sub",fill: fillColor, stroke: strokeColor, strokeWidth: epaisseurTrait,transform:"translate(0,0)"}); 
    
    var arrow = [];
    arrow[REC_ID]=rectId;
    arrow[REC_X]=x;
    arrow[REC_Y]=y;
    arrow[REC_W]=x+width;
    arrow[REC_H]=y+height;
    arrow[REC_TRANSX]=transx;
    arrow[REC_TRANSY]=transy;
    
    arrec[indexRec]=arrow;
    indexRec=indexRec+1;
    
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
    
    
    
}
}

            function svgClickedBckg(e) { 
                 //if(e.clientX>=1100)
                 //   return;
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
 
 
            function svgOver(e) { 
                
                var touch = e.touches[0];
                var mouseX = touch.pageX;
                var mouseY = touch.pageY;
                alert(mouseX);
                //if( (mouseX>recX) && (mouseX<(recX+parseFloat(w))) && (mouseY>recY) && (mouseY<recY+parseFloat(h)) ) 
                    $(this.firstChild()).attr('stroke', 'lime'); 
                
                lblItemSelected.setValue("OVER",undefined)
                bOver=1;
                /*
                if( (itemFocused==1) && (start_drag==0)){
                    selectedItemOver=this;
                    var item = selectedItemOver.getAttributeNS(null,"id");
                    var row = getRowNum("myTable",item,ID_HEADER);
                    //var index = item.split("_");
                    selectedIndexOver = row;//index[1];
                }
                    
                if( (itemFocused==0) && (start_drag==0)){
                    selectedItem = this;
                    var item = selectedItem.getAttributeNS(null,"id");
                    lblState.setValue(item);
                    var row = getRowNum("myTable",item,ID_HEADER);
                    //var index = item.split("_");
                    selectedIndex = row;//index[1];
                    lblIndex.setValue(selectedIndex);
                    transx = getCell("myTable",selectedIndex,TRANSX_HEADER);
                    transy = getCell("myTable",selectedIndex,TRANSY_HEADER);
                    lbltransx.setValue(transx,undefined);
                    lbltransy.setValue(transy,undefined);
                    lblItemSelected.setValue(item,undefined);
                }
                if((selectedIndexOver != selectedIndex)&&(start_drag==0))
                    $(this.firstChild).attr('stroke', 'lime'); 
                */
            } 

            function svgOut(e) { 
                var touch = e.touches[0];
                var mouseX = touch.pageX;
                var mouseY = touch.pageY;
                alert("out");
                //if ( (mouseX>recX) && (mouseX<(recX+parseFloat(w))) && (mouseY>recY) && (mouseY<recY+parseFloat(h)) ) 
                //    $(this.firstChild()).attr('stroke', 'lime'); 
                //else
                    $(this.firstChild()).attr('stroke', 'black'); 
                
                lblItemSelected.setValue("OUT",undefined)
                bOver=0;
                /*
                nbrClick=0;
                if(itemFocused==0)
                    $(this.firstChild).attr('stroke', 'black'); 
                if((selectedIndexOver != selectedIndex)&& (start_drag==0) && (selectedIndexOver!=null) && (itemFocused==1))
                    $(selectedItemOver.firstChild).attr('stroke', 'black'); 
                //if((selectedIndexOver != selectedIndex)&& (start_drag==0))
                //    $(this.firstChild).attr('stroke', 'black'); 
                selectedIndexOver=-1;
                selectedItemOver = null;
                */
            }
            
            function svgDrag(event, ui){
                // update coordinates manually, since top/left style props don't work on SVG
                $(this).attr('x', ui.position.left); 
                $(this).attr('y', ui.position.top); 
            }
        
            function getNbrCaisse(lclSelectedItem){
                var item = selectedItem.getAttributeNS(null,"id");
                return searchInTable("myTable",VIEW_HEADER,item);
            }
            var selectedRect=0;
            function tmouseDown(e){
                lblState.setValue("down1",undefined);
                
                for(var j=0;j<arrec.length;j++){
                    arrow = arrec[j];//.split("");
                    if( (mouseX>arrow[REC_X]+arrow[REC_TRANSX]+offsetX) && (mouseX<arrow[REC_W]+arrow[REC_TRANSX]+offsetX) && (mouseY>arrow[REC_Y]+arrow[REC_TRANSY]+offsetY) && (mouseY<arrow[REC_H]+arrow[REC_TRANSY]+offsetY) ) {
                        selectedRect = j;
                        selectedItem= document.getElementById(arrow[REC_ID]);
                        var item = selectedItem.getAttributeNS(null,"id");
                        lblDrag.setValue(item);
                        var lx=arrow[REC_X]+arrow[REC_TRANSX]+offsetX;
                        var ly=arrow[REC_Y]+arrow[REC_TRANSY]+offsetY;
                        var lw=arrow[REC_W]+arrow[REC_TRANSX]+offsetX;
                        var lh=arrow[REC_H]+arrow[REC_TRANSY]+offsetY;
                        lbltransx.setValue("x="+mouseX+" X1="+lx +" X2="+lw,undefined);
                        lbltransy.setValue("y="+mouseY+" Y1="+ly +" Y2="+lh,undefined);
                
                        $(selectedItem.firstChild).attr('stroke', 'lime'); 
                        transx=arrow[REC_TRANSX];
                        transy=arrow[REC_TRANSY];
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
                    arrow[REC_TRANSX]=transx;
                    arrow[REC_TRANSY]=transy;
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
