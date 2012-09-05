/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
// GUI CallBack

var indexPalette=1;
var dy=0;
var transx=0;
var transy=0;
var rotate_deg = 0;
var texte = "";
var ratioZoom=1;
var GetInitCoordx=0;
var GetInitCoordy=0;
var GetInitCoordxVirtRect = 0;
GetInitCoordyVirtRect = 0;
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
var back_drag=0;
var x_ori_back = 0;
var y_ori_back = 0;
var dx_back = 0;
var dy_back = 0;

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
    toggleVuePaletteMenu();
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
    toggleVueCartonMenu();
    drawcaps();
}

function setEvents(rectId){
    $('#'+rectId).bind('click', svgClicked);
    $('#'+rectId).bind('mouseover', svgOver);
    $('#'+rectId).bind('mouseout', svgOut);
}

function drawText(group,id,strokeColor,texte,lineNumber,transx,transy,rotate){
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
    }); // rotate("+rotate+")";
    svg.text(g, transx, transy-(-15*(lineNumber-4)), texte);    
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
function drawPalyRect(){
    var svg = $('#svgbasics').svg('get');
    var group = svg.group(null,"gPlayRect");

    svg.rect(group, 0, 0, 840, 840, 1, 1, {
        id:"playRect",
        fill: "none", 
        stroke: "blue", 
        strokeWidth: 10,
        transform:"translate(0,0)"
    }); 
    return group;
}
function drawRect(arrow){
    
    var rectId= arrow[ID_HEADER];
    var x = arrow[X_HEADER];
    var y = arrow[Y_HEADER];
    var w = arrow[WIDTH_HEADER];
    var h = arrow[HEIGHT_HEADER];
    var transx = arrow[TRANSX_HEADER];
    var transy = arrow[TRANSY_HEADER];
    var rotate = arrow[ROTATE_HEADER];
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
        transform:"translate("+transx+","+transy+") rotate("+rotate+")"
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
function rotate(){
    var arrow = arrec[selectedIndex];
    var prec_rotate = parseInt(arrow[ROTATE_HEADER]);
    var rot = prec_rotate + 45;
    arrow[ROTATE_HEADER] = rot;
    var xl = parseInt(arrow[X_HEADER]) + parseInt(arrow[TRANSX_HEADER]);
    var yl = parseInt(arrow[Y_HEADER]) + parseInt(arrow[TRANSY_HEADER]);
    $(selectedItem).attr("transform", "translate("+parseInt(arrow[TRANSX_HEADER])+","+parseInt(arrow[TRANSY_HEADER])+") rotate("+rot+")");
    changeArrayRow(selectedRow,arrow);
}