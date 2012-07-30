/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var COL_NUMBER = 22;
var COOKIE_NAME="stock";
var defaultValue=[];
var typeArr =  [];
typeArr[0] = "palette30";
typeArr[1] = "palette60";
typeArr[2] = "paletteEurope";
typeArr[3] = "caisse25";
typeArr[4] = "caisse16";
typeArr[5] = "divers";

            
function loadDefaultValue(type){
                if(type==typeArr[0]){
                    var k = 1;
                    defaultValue[0] = 0;
                    defaultValue[k++] = "#pal";     //component id
                    defaultValue[k++] = 0;          //index
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
                }
                
                if(type==typeArr[1]){
                    var k=0;
                    defaultValue[0] = 0;
                    defaultValue[k++] = "#pal";    //component id
                    defaultValue[k++] = 0;          //index
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
                }
                 if(type==typeArr[2]){
                    var k=0;
                    defaultValue[0] = 0;
                    defaultValue[k++] = "#pal";    //component id
                    defaultValue[k++] = 0;          //index
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
                    defaultValue[k++] = 10;          //classement
                }
                 if(type==typeArr[3]){
                    var k=0;
                    defaultValue[0] = 0;
                    defaultValue[k++] = "#cai";    //component id
                    defaultValue[k++] = 0;          //index
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
                    defaultValue[k++] = "caisse25"  //texte
                    defaultValue[k++] = "pink";   //fill color
                    defaultValue[k++] = "gray";   //stroke color
                    defaultValue[k++] = "caisse25";//type
                    defaultValue[k++] = "ay";       //lieu de stockage
                    defaultValue[k++] = "gpal_0";     //contenant parent
                    defaultValue[k++] = "coiffes";  //type de marchandise
                    defaultValue[k++] = 2500;       //quantite
                    defaultValue[k++] = 20;          //classement
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
                setCookie("viewbox",tabView,5);
            }