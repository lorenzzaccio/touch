/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var COL_NUMBER = 22;
var COOKIE_NAME="stock";

var typeArr =  [];
typeArr[0] = "palette30";
typeArr[1] = "palette60";
typeArr[2] = "paletteEurope";
typeArr[3] = "caisse25";
typeArr[4] = "caisse16";
typeArr[5] = "divers";

function copyRow(oriRow){
    var dupRow = [];
    var j=0;
    for(j=0;j<oriRow.length;j++)
        dupRow[j]=oriRow[j];
    return dupRow;
}            
    
function loadDefaultValue(type){
    var defaultValue=[];
    alert(selArr[TYPE_HEADER] + "  "+itemFocused);
    if((type==selArr[TYPE_HEADER])&&(itemFocused==1)){
        defaultValue = copyRow(selArr);
        defaultValue[TRANSX_HEADER]=0;
        defaultValue[TRANSY_HEADER]=0;
        //defaultValue[FILLCOLOR_HEADER] = '#'+document.getElementById("colorBtn").value;
        defaultValue[ARG1_HEADER] = document.getElementById("prefix").value;
        defaultValue[ARG2_HEADER] = document.getElementById("article").value;
        defaultValue[QUANTITE_HEADER] = document.getElementById("nbrCoiffes").value;
        return defaultValue;
    }
    
    if(type==typeArr[0]){
        var k = 1;
        defaultValue[0] = 0;            //index
        defaultValue[k++] = "#pal";     //component id
        defaultValue[k++] = 20;         //x
        defaultValue[k++] = 20;         //y
        defaultValue[k++] = 0;          //transx
        defaultValue[k++] = 0;          //transy
        defaultValue[k++] = 0;          //rotation
        defaultValue[k++] = "rectangle" //forme
        defaultValue[k++] = 160          //largeur
        defaultValue[k++] = 80          //hauteur
        defaultValue[k++] = 0           //arg
        defaultValue[k++] = 0           //arg  
        defaultValue[k++] = "P30"       //texte
        defaultValue[k++] = "orange";   //fill color
        defaultValue[k++] = "purple";   //stroke color
        defaultValue[k++] = "palette30";//type
        defaultValue[k++] = "ay";       //lieu de stockage
        defaultValue[k++] = "room";     //contenant parent
        defaultValue[k++] = "caisses";  //type de marchandise
        defaultValue[k++] = 12;         //quantité
        defaultValue[k++] = 10;         //classement
        defaultValue[k++] = 0;         //sync
    }
                
    if(type==typeArr[1]){
        var k=1;
        defaultValue[0] = 0;            //index
        //defaultValue[k++] = 0;          //index
        defaultValue[k++] = "#pal";    //component id
        defaultValue[k++] = 20;         //x
        defaultValue[k++] = 20;         //y
        defaultValue[k++] = 0;         //transx
        defaultValue[k++] = 0;         //transy
        defaultValue[k++] = 0;         //rotation
        defaultValue[k++] = "rectangle" //forme
        defaultValue[k++] = 20          //largeur
        defaultValue[k++] = 20          //hauteur
        defaultValue[k++] = 0           //arg
        defaultValue[k++] = 0           //arg 
        defaultValue[k++] = "P60"       //texte
        defaultValue[k++] = "yellow";   //fill color
        defaultValue[k++] = "blue";   //stroke color
        defaultValue[k++] = "palette60";//type
        defaultValue[k++] = "ay";       //lieu de stockage
        defaultValue[k++] = "room";     //contenant parent
        defaultValue[k++] = "caisses";  //type de marchandise
        defaultValue[k++] = 24;         //quantité
        defaultValue[k++] = 10;          //classement
        defaultValue[k++] = 0;         //sync
    }
    if(type==typeArr[2]){
        var k=1;
        defaultValue[0] = 0;            //index
        //defaultValue[k++] = 0;       
        defaultValue[k++] = "#pal";    //component id
        defaultValue[k++] = 20;         //x
        defaultValue[k++] = 20;         //y
        defaultValue[k++] = 0;         //transx
        defaultValue[k++] = 0;         //transy
        defaultValue[k++] = 0;         //rotation
        defaultValue[k++] = "rectangle" //forme
        defaultValue[k++] = 20          //largeur
        defaultValue[k++] = 15          //hauteur
        defaultValue[k++] = 0           //arg
        defaultValue[k++] = 0           //arg  
        defaultValue[k++] = "PE"       //texte
        defaultValue[k++] = "yellow";   //fill color
        defaultValue[k++] = "blue";   //stroke color
        defaultValue[k++] = "paletteEurope";//type
        defaultValue[k++] = "ay";       //lieu de stockage
        defaultValue[k++] = "room";     //contenant parent
        defaultValue[k++] = "caisses";  //type de marchandise
        defaultValue[k++] = 12;         //quantite
        defaultValue[k++] = 10;         //classement
        defaultValue[k++] = 0;          //sync
    }
    if(type==typeArr[3]){
        var k=1;
        defaultValue[0] = 0;            //index
        //defaultValue[k++] = 0;          
        defaultValue[k++] = "#cai";    //component id
        defaultValue[k++] = 20;         //x
        defaultValue[k++] = 20;         //y
        defaultValue[k++] = 0;         //transx
        defaultValue[k++] = 0;         //transy
        defaultValue[k++] = 0;         //rotation
        defaultValue[k++] = "rectangle" //forme
        defaultValue[k++] = 160          //largeur
        defaultValue[k++] = 80          //hauteur
        defaultValue[k++] = 0           //arg
        defaultValue[k++] = 0           //arg  
        defaultValue[k++] = "caisse25"  //texte
        defaultValue[k++] = "pink";   //fill color
        defaultValue[k++] = "gray";   //stroke color
        defaultValue[k++] = "caisse25";//type
        defaultValue[k++] = "ay";       //lieu de stockage
        defaultValue[k++] = "gpal_0";     //contenant parent
        defaultValue[k++] = "coiffes";  //type de marchandise
        defaultValue[k++] = 2500;       //quantite
        defaultValue[k++] = 20;          //classement
        defaultValue[k++] = 0;         //sync
    }
    return defaultValue;
}

 
            
            
            
function getCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
            return unescape(y);
        }
    }
    return 0;
}
            
function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}
            
//read cookie and insert it in a new row of the table 
function readCookie(){
    var arrow = [] ;
    var i = 0;
    do{
        arrow = getCookie(COOKIE_NAME+i);// all items in the array.
        if (arrow==null || arrow=="")
        {
        //alert("no cookie");
        }else{
            var mySplitResult = arrow.split(",");
            insertRow(mySplitResult,"myTable",drawcaps);
        }    
        i++;
    } while(arrow != null && arrow != "");
}
            
function recordLine(arrow){
    var entry = {
        //btn: arrow[BTN_HEADER],
        index: parseInt(arrow[INDEX_HEADER]),
        id: arrow[ID_HEADER],
        x: parseInt(arrow[X_HEADER]),
        y: parseInt(arrow[Y_HEADER]),
        transx: parseInt(arrow[TRANSX_HEADER]),
        transy:parseInt(arrow[TRANSY_HEADER]),
        rotate:parseInt(arrow[ROTATE_HEADER]),
        forme:arrow[FORME_HEADER],
        width:parseInt(arrow[WIDTH_HEADER]),
        height:parseInt(arrow[HEIGHT_HEADER]),
        arg1:arrow[ARG1_HEADER],
        arg2:arrow[ARG2_HEADER],
        texte:arrow[TEXTE_HEADER],
        fillcolor:arrow[FILLCOLOR_HEADER],
        strokecolor:arrow[STROKECOLOR_HEADER],
        type:arrow[TYPE_HEADER],
        lieu:arrow[LIEU_HEADER],
        view:arrow[VIEW_HEADER],
        ware:arrow[WARE_HEADER],
        quantity:parseInt(arrow[QUANTITE_HEADER]),
        order:parseInt(arrow[ORDER_HEADER]),
        sync:parseInt(arrow[SYNC_HEADER])
    };
    stock.storeAdd(entry);
}
            
function recordLineArticle(arrow){
    var entry = {
        //index: parseInt(arrow[INDEX_HEADER]),
        prefix: arrow[0],
        art: parseInt(arrow[1])
    };
    article.storeAdd(entry);
}
            
function sendPhp(arrow){
    send_array(arrow);
/*
                var TABLE_NAME = "stockplan";
                var request = "insert into "+TABLE_NAME+" VALUES(";
                for(var i=1;i<arrow.length;i++){
                    if(i==1)
                        arrow[i]='null';
                    request = request+"'"+arrow[i]+"'";
                    if((i+1)<arrow.length) 
                        request=request+",";
                    else
                        request=request+")";
                }
                //setDb("\""+request+"\"");
                return request;*/
}
            
function updatePhp(val1,val2,cond1,cond2){
    update(val1,val2,cond1,cond2);
}
function syncM2SPhp(){
    var j=0;
    var rowCount = arrec.length;
    for(j=0;j<rowCount;j++){
        var arrow = arrec[j];
        syncM2S(arrow);
    } 
}
function updateLine(arrow){
    var entry = {
        //btn: arrow[BTN_HEADER],
        index: parseInt(arrow[INDEX_HEADER]),
        id: arrow[ID_HEADER],
        x: parseInt(arrow[X_HEADER]),
        y: parseInt(arrow[Y_HEADER]),
        transx: parseInt(arrow[TRANSX_HEADER]),
        transy:parseInt(arrow[TRANSY_HEADER]),
        rotate:parseInt(arrow[ROTATE_HEADER]),
        forme:arrow[FORME_HEADER],
        width:parseInt(arrow[WIDTH_HEADER]),
        height:parseInt(arrow[HEIGHT_HEADER]),
        arg1:arrow[ARG1_HEADER],
        arg2:arrow[ARG2_HEADER],
        texte:arrow[TEXTE_HEADER],
        fillcolor:arrow[FILLCOLOR_HEADER],
        strokecolor:arrow[STROKECOLOR_HEADER],
        type:arrow[TYPE_HEADER],
        lieu:arrow[LIEU_HEADER],
        view:arrow[VIEW_HEADER],
        ware:arrow[WARE_HEADER],
        quantity:parseInt(arrow[QUANTITE_HEADER]),
        order:parseInt(arrow[ORDER_HEADER]),
        sync:parseInt(arrow[SYNC_HEADER])
    };
    stock.storeUpdate(entry);
                
}
function loadTableFromCookie(){
                
    var cookieList = [];
    var i = 0;
    var cookieList = document.cookie.split(';');
                
    for(i=0;i<cookieList.length;i++){
        var name = cookieList[i].split("=");
        if(name[0].match(COOKIE_NAME)){
            var arrow = [] ;
            arrow = getCookie($.trim(name[0]));
            var mySplitResult = arrow.split(",");
            insertRow(mySplitResult,"myTable",undefined);
        }
    }
}
function loadArrayFromCookie(){
                
    var cookieList = [];
    var i = 0;
    var cookieList = document.cookie.split(';');
                
    for(i=0;i<cookieList.length;i++){
        var name = cookieList[i].split("=");
        if(name[0].match(COOKIE_NAME)){
            var index = arrec.length;
            var arrow = [] ;
            arrow = getCookie($.trim(name[0]));
            var mySplitResult = arrow.split(",");
            arrec[index]=mySplitResult;
        }
    }
}
            
function allocateCookieId(){
    var cookieList = [];
    var i = 0;
    var maxVal=0;
    var cookieList = document.cookie.split(';');
    for(i=0;i<cookieList.length;i++){
        var name = cookieList[i].split("=");
        var nameVal = $.trim(name[0])
        if(nameVal.match(COOKIE_NAME)){
            var newVal = nameVal.split(COOKIE_NAME);
            if(parseInt(newVal[1]) > parseInt(maxVal))
                maxVal=newVal[1];
        }
    }
    return maxVal;
}
            
function listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1] + "\n";
    }
    return aString;
}


function deleteCookie(index)
{
    var d = new Date();
    document.cookie = COOKIE_NAME+index+"=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
}
            
function getRowCookie(cookieName){
    var cookie = $.cookie(cookieName);
    var items = cookie ? eval("([" + cookie + "])") : [];
    return items;
}
            
function updateViewCookie(){
    var tabView = [];
    tabView[0] = zoomx;
    tabView[1] = zoomy;
    tabView[2] = zoomw;
    tabView[3] = zoomh;
    tabView[4] = ratioZoom;
    setCookie("viewbox",tabView,5);
}
function readViewCookie(){
    var tabView = [];
    var tmp = getCookie("viewbox");
    if (tmp==0){
        zoomx=0;
        zoomy=0;
        zoomw=screenW;
        zoomh=screenH;
        ratioZoom=1;
        return
    }
    tabView = tmp.split(",");
    if(!isNumber(tabView[0]) || !isNumber(tabView[1]) || !isNumber(tabView[2])|| !isNumber(tabView[3])|| !isNumber(tabView[4])){
        zoomx=0;
        zoomy=0;
        zoomw=screenW;
        zoomh=screenH;
        ratioZoom=1;
    }else{
        zoomx=tabView[0];
        zoomy=tabView[1];
        zoomw=tabView[2];
        zoomh=tabView[3];
        ratioZoom=tabView[4];
    }
                
}
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
