/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var textboxgui = [];
var labelboxgui = [];
var svgRoot;
var svgEle;
var svgNode;
var gmenu ;
var menu;
var myMapApp ;
var textbox1;
var textbox2;
var display;
var rectBg;
var curseurZoom;
var tableIndex = 1;
var rowLength = 1;
var tableId = "myTable";
var selectedRow=0;
var selectedCol = 0;
var selectedValueCombo = "";
var step = 10;

    function addRow(tableId){
                var add = 0;
                var type = trim(document.getElementById('typeCombo').value);
                addRow(tableId,type);
   }


	
            function populateFontCombo(comboName){
                var fontArray = [];
                fontArray = font_init(fonts);	
            }

            function left(){
                var svg = $('#svgbasics').svg('get');
                zoomx = zoomx + step/ratioZoom;
                svg.configure({viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh})
                updateViewCookie()
            }
            function right(){
                var svg = $('#svgbasics').svg('get');
                zoomx = zoomx - step/ratioZoom;
                svg.configure({viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh})
                updateViewCookie()
            }
            function down(){
                var svg = $('#svgbasics').svg('get');
                zoomy = zoomy  - step/ratioZoom;
                svg.configure({viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh})
                updateViewCookie()
            }
            
            function up(){
                var svg = $('#svgbasics').svg('get');
                zoomy = zoomy  + step/ratioZoom;
                svg.configure({viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh})
                updateViewCookie()
            }
            
            function zoommoins(){
                var svg = $('#svgbasics').svg('get');
                zoomw = zoomw  + step/ratioZoom;
                zoomh = zoomh  + step/ratioZoom;
                svg.configure({viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh})
                updateViewCookie()
            }
            
            function zoomplus(){
                var svg = $('#svgbasics').svg('get');
                zoomw = zoomw  - step/ratioZoom;
                zoomh = zoomh  - step/ratioZoom;
                svg.configure({viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh})
                updateViewCookie()
            }     

//MENU

//var BTN_HEADER=0;
var k=0;
var INDEX_HEADER=0;
var ID_HEADER=1;
var X_HEADER=2;
var Y_HEADER=3;
var TRANSX_HEADER=4;
var TRANSY_HEADER=5;
var ROTATE_HEADER=6;
var FORME_HEADER=7;
var WIDTH_HEADER=8;
var HEIGHT_HEADER=9;
var ARG1_HEADER=10;
var ARG2_HEADER=11;
var TEXTE_HEADER=12;
var FILLCOLOR_HEADER=13;
var STROKECOLOR_HEADER=14;
var TYPE_HEADER=15;
var LIEU_HEADER=16;
var VIEW_HEADER = 17;
var WARE_HEADER= 18;
var QUANTITE_HEADER=19;
var ORDER_HEADER=20;
var SYNC_HEADER=21;

function rectOver(){
    rectOver=true;
}

function rectOut(){
    rectOver=false;
}

function initialize() {
                        display = getDisplay(document,'mainMenu');
                        myMapApp = new mapApp(display,false,undefined);
                        //styles
                        var textStyles = {"font-family":"Arial,Helvetica","font-size":32,"fill":"dimgray"};
                        var boxStyles = {"fill":"orange","stroke":"dimgray","stroke-width":1.5};
                        var labelboxStyles = {"fill":"none","stroke":"none","stroke-width":1.5};
                        var cursorStyles = {"stroke":"red","stroke-width":1.5};
                        var selBoxStyles = {"fill":"blue","opacity":0.5};
			var textYOffset = 35;
                        var oriy = -350;
                        var orix = 50;
                        var endy = 1000;
                        var endx = 1000;
                        
                        var rowLength = 0;
                        //first a few styles
                        var buttonTextStyles = {"font-family":"Arial,Helvetica","fill":"black","font-size":32};
                        var buttonStyles = {"fill":"orange"};
                        var shadeLightStyles = {"fill":"white"};
                        var shadeDarkStyles = {"fill":"navy"};
                        
                        
                        var arrow = new Array(COL_NUMBER);
                        if(document.getElementById(tableId)!= null)
                            rowLength = document.getElementById(tableId).rows.length;    
                        if(rowLength>0){
                            arrow= readRow(tableId,tableIndex);
                        }
                        //display.rec(100,100,300,500);
                        /*
                         myMapApp.forme["cadreMenu"]= new forme("cadreMenu","mainMenu",20,-520,1000,1000,"yellow","2","purple",rectOver,rectOut);
                        var rect= document.createElementNS(svgNS,"rect");
                        rect.setAttributeNS(null,"x",10);
			rect.setAttributeNS(null,"y",10);
			rect.setAttributeNS(null,"width",500);
			rect.setAttributeNS(null,"height",1000);
                        rect.setAttributeNS(null,"fill","red");
                        rect.setAttributeNS(null,"stroke","purple");
                         */        
                                            /*        
                        //bouton Créer Palette$
                        myMapApp.buttons["vueCartonBtn"]= new button("vueCartonBtn","mainMenu",vueCartonBtnPressed,"rect","vue carton",undefined,orix+200,oriy-150,200,50,buttonTextStyles,buttonStyles,shadeLightStyles,shadeDarkStyles,1);
                        myMapApp.buttons["vuePaletteBtn"]= new button("vueRoomBtn","mainMenu",vuePaletteBtnPressed,"rect","vue palette",undefined,orix+400,oriy-150,200,50,buttonTextStyles,buttonStyles,shadeLightStyles,shadeDarkStyles,1);
                        */
                        //myMapApp.buttons["addProductBtn"]= new button("addProductBtn","mainMenu",addProductBtn,"rect","Ajouter Produit",undefined,orix+100,oriy+0,300,50,buttonTextStyles,buttonStyles,shadeLightStyles,shadeDarkStyles,1);
                        
                       var t=1400;
                        lblx = new label("lblx","mainMenu","",25,orix +100,oriy +100,800,50,textYOffset,textStyles,labelboxStyles,cursorStyles,selBoxStyles,undefined,undefined);//"[a-zA-Z ]"
                        lbly = new label("lbly","mainMenu","",25,orix +100,oriy +130,800,50,textYOffset,textStyles,labelboxStyles,cursorStyles,selBoxStyles,undefined,undefined);//"[a-zA-Z ]"
                        lblState = new label("lblState","mainMenu","",50,orix +100,oriy +160,850,50,textYOffset,textStyles,labelboxStyles,cursorStyles,selBoxStyles,undefined,undefined);//"[a-zA-Z ]"
                        lblItemSelected = new label("lblItemSelected","mainMenu","",25,orix +100,oriy +190,850,50,textYOffset,textStyles,labelboxStyles,cursorStyles,selBoxStyles,undefined,undefined);//"[a-zA-Z ]"
                        lblDrag = new label("lblDrag","mainMenu","",25,orix +100,oriy +210,850,50,textYOffset,textStyles,labelboxStyles,cursorStyles,selBoxStyles,undefined,undefined);//"[a-zA-Z ]"
                        lbltransx = new label("lbltransx","mainMenu","",25,orix +100,oriy +240,800,50,textYOffset,textStyles,labelboxStyles,cursorStyles,selBoxStyles,undefined,undefined);//"[a-zA-Z ]"
                        lbltransy = new label("lbltransy","mainMenu","",25,orix +100,oriy +270,800,50,textYOffset,textStyles,labelboxStyles,cursorStyles,selBoxStyles,undefined,undefined);//"[a-zA-Z ]"
                        lblIndex = new label("lblIndex","mainMenu","",25,orix +100,oriy +300,850,50,textYOffset,textStyles,labelboxStyles,cursorStyles,selBoxStyles,undefined,undefined);//"[a-zA-Z ]"
                           
                        /*
                        lblTexte = new label("lbl"+TEXTE_HEADER,"mainMenu",tableHeader[TEXTE_HEADER],25,orix +200,oriy - (-30-60*1),250,50,textYOffset,textStyles,labelboxStyles,cursorStyles,selBoxStyles,undefined,undefined);//"[a-zA-Z ]"
                        txtTexte = new textbox("text"+TEXTE_HEADER,"mainMenu",arrow[TEXTE_HEADER],25,orix + 450,oriy - (-30-60*1),400,50,textYOffset,textStyles,boxStyles,cursorStyles,selBoxStyles,undefined,writeOutTextContent);//"[a-zA-Z ]"
                        
                        lblQuantite = new label("lbl"+QUANTITE_HEADER,"mainMenu",tableHeader[QUANTITE_HEADER],25,orix +200,oriy - (-30-60*2),250,50,textYOffset,textStyles,labelboxStyles,cursorStyles,selBoxStyles,undefined,undefined);//"[a-zA-Z ]"
                        txtQuantite = new textbox("text"+QUANTITE_HEADER,"mainMenu",arrow[QUANTITE_HEADER],25,orix + 450,oriy - (-30-60*2),400,50,textYOffset,textStyles,boxStyles,cursorStyles,selBoxStyles,undefined,writeOutTextContent);//"[a-zA-Z ]"
                        */    
                        /*
			//create new textboxes
                        for(var i = 1 ; i<10 ; i++){
                            var gg = svgCreateGroup(document,display,"textbox"+i);
                            labelboxgui[i] = new label("lbl"+i,"mainBackground",tableHeader[i+1],25,orix +100,oriy - (-30-60*i),250,50,textYOffset,textStyles,labelboxStyles,cursorStyles,selBoxStyles,undefined,undefined);//"[a-zA-Z ]"
                            textboxgui[i] = new textbox("text"+i,"mainBackground",arrow[i+1],25,orix + 350,oriy - (-30-60*i),400,50,textYOffset,textStyles,boxStyles,cursorStyles,selBoxStyles,undefined,writeOutTextContent);//"[a-zA-Z ]"
                            }
                        
                        //first the slider styles
                        var sliderStyles={"stroke":"dimgray","stroke-width":10};
                        var invisSliderWidth = 45;
                        curseurZoom = 50;
                        
                        zoomslider = new slider("zoomslider","zoomslider",endx,oriy,0,endx,endy,100,curseurZoom,sliderStyles,invisSliderWidth,"sliderSymbol",zoom,true);
                        vertslider = new slider("vertslider","vertslider",orix,oriy,0,orix,endy,100,50,sliderStyles,invisSliderWidth,"vertsliderSymbol",moveVert,true);
                        horislider = new slider("horislider","horislider",orix,oriy,0,endx,oriy,100,50,sliderStyles,invisSliderWidth,"horisliderSymbol",moveHori,true);
                
                        
                        //now create a new button instance
                        var textbutton1 = new button("textbutton1","textbuttons",buttonPressed,"rect","<<<<<<<<<<",undefined,orix+50,oriy+900,400,100,buttonTextStyles,buttonStyles,shadeLightStyles,shadeDarkStyles,1);
                        var textbutton2 = new button("textbutton2","textbuttons",buttonPressed,"rect",">>>>>>>>>>",undefined,orix + 500,oriy+900,400,100,buttonTextStyles,buttonStyles,shadeLightStyles,shadeDarkStyles,1);
                        */
                        //first some colour picker styles
                        //var cpBgStyles = {"fill":"gainsboro"};
                        //var cpTextStyles = {"font-family":"Arial,Helvetica","font-size":32,"fill":"dimgray"};
                        //myMapApp.colourPickers["myColourPicker1"] = new colourPicker("colourPicker1","mainMenu",orix,oriy+400,1000,800,cpBgStyles,cpTextStyles,"sliderSymbolCp",false,true,false,false,true,false,0,360,7,"0,255,0,1","0,0,0,0.7",undefined);
                        //create ok button
			//myMapApp.buttons["okbutton"] = new button("okbutton","mainMenu",alertColorValues,"rect","OK",undefined,orix+770,oriy + 720,120,120,buttonTextStyles,buttonStyles,shadeLightStyles,shadeDarkStyles,1);
                        //hideCP();
                        /*
                        //combo
                        //first a few styling parameters:
                        var comboBoxCellHeight = 40;
                        var comboBoxTextpadding = 3;
                        var comboBoxtextStyles = {"font-family":"Arial,Helvetica","font-size":32,"fill":"dimgray"};
                        var comboBoxStyles = {"stroke":"dimgray","stroke-width":1,"fill":"white"};
                        var comboBoxScrollbarStyles = {"stroke":"dimgray","stroke-width":1,"fill":"whitesmoke"};
                        var comboBoxSmallrectStyles = {"stroke":"dimgray","stroke-width":1,"fill":"lightgray"};
                        var comboBoxHighlightStyles = {"fill":"dimgray","fill-opacity":0.3};
                        var comboBoxTriangleStyles = {"fill":"dimgray"};
                        //this array contains the values
                        var optionArr = new Array({key:"vueDev",value:false},{key:"vueAvant",value:false},{key:"vueArriere",value:false},{key:"vueCoteDroit",value:false},{key:"vueCoteGauche",value:false},{key:"texte",value:false},{key:"liseret",value:false},{key:"logo",value:false},{key:"cotation",value:false},{key:"cartouche",value:false});
                        //now the initialization of the combobox
                        var optionCombo = new combobox("optionCombo","combo1",optionArr,400,orix,oriy-150,comboBoxCellHeight,comboBoxTextpadding,3,true,50,comboBoxtextStyles,comboBoxStyles,comboBoxScrollbarStyles,comboBoxSmallrectStyles,comboBoxHighlightStyles,comboBoxTriangleStyles,showRoses);
                        myMapApp.buttons["addBtn"]= new button("addBtn","textbuttons",addBtnPressed,"rect","add",undefined,orix+450,oriy-150,100,50,buttonTextStyles,buttonStyles,shadeLightStyles,shadeDarkStyles,1);
                        myMapApp.buttons["refreshBtn"]= new button("refreshBtn","textbuttons",refreshBtnPressed,"rect","refresh",undefined,orix+600,oriy-150,150,50,buttonTextStyles,buttonStyles,shadeLightStyles,shadeDarkStyles,1);
                        */
                        
            
            }
            
            function showRoses(comboboxName,selectedValues,selectedIndizes) {
                selectedValueCombo = selectedValues.join(",");
                if (selectedValueCombo.length == 0) {
                    selectedValueCombo = " ";
                }
                //document.getElementById("selectedRoses").firstChild.nodeValue = rosesString;
            }

            function initMenu(){
                if(rowLength>0){
                    tableIndex =1;
                    selectedRow = 1;
                    var arrow= readRow(tableId,tableIndex);
                    setValueTextBox(arrow);
                }
            }