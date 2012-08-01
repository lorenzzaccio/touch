/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

            function loadHeader(){
                var k=1
                tableHeader[0] = " ";
                tableHeader[k++] = "id";
                tableHeader[k++] = "index";
                tableHeader[k++] = "x";
                tableHeader[k++] = "y";
                tableHeader[k++] = "transx";
                tableHeader[k++] = "transy";
                tableHeader[k++] = "rotation";
                tableHeader[k++] = "forme";
                tableHeader[k++] = "largeur";
                tableHeader[k++] = "hauteur";
                tableHeader[k++] = "arg1";
                tableHeader[k++] = "arg2";
                tableHeader[k++] = "texte";	
                tableHeader[k++] = "fillColor";
                tableHeader[k++] = "strokeColor";
                tableHeader[k++] = "type";
                tableHeader[k++] = "lieu";
                tableHeader[k++] = "room";
                tableHeader[k++] = "marchandise";
                tableHeader[k++] = "quantité";
                tableHeader[k++] = "classement";
                return tableHeader;
            }
            
            function insertRow(arrow,tableId,functionToCall){
                var theTable = document.getElementById(tableId);
                var buttonnode;
                var nbrRow = document.getElementById(tableId).rows.length;//-2 if header
                buttonnode= document.createElement('input');
                buttonnode.setAttribute('type','button');
                buttonnode.setAttribute('name','btn'+nbrRow);
                buttonnode.setAttribute('value','remove');
                buttonnode.onclick = function(){removeRow(this.parentNode.parentNode.rowIndex,tableId)}; 
                var nbrCols = COL_NUMBER;
                var z = 0;
                var ci = 0;
                var value;
                if(theTable.tBodies.length>0){
                    var row=theTable.tBodies[z].insertRow(-1); //insert at the end
                    for( var x = 0; x < nbrCols; x++ ) {
                        var y = document.createElement('td');
                        if(x==0)
                            y.appendChild(buttonnode);
                        else{
                            if(x<arrow.length)
                                y.appendChild(document.createTextNode(arrow[x]));
                            else
                                y.appendChild(document.createTextNode(""));
                            y.onclick = function(){ 
                                value=prompt("Please enter value:","");
                                if (value!=null && value!="")
                                {
                                    ci = this.cellIndex;
                                }
                            }
                        }
                        row.appendChild(y);
                        theTable.tBodies[z].appendChild(row);
                    }
                    var rowLength = document.getElementById(tableId).rows.length;
                    row.onclick = function(){
                        var rowLength = document.getElementById(tableId).rows.length;
                        if(ci==0)
                            changeCell(tableId,rowLength-1,ci,value);
                        else
                            changeCell(tableId,row.rowIndex,ci,value);
                        functionToCall();
                    } 
                }
            }
            
            function addNewRow(tableId,type){
                var arrow = new Array(COL_NUMBER);
                arrow = loadDefaultValue(type);
                insertRow(arrow,tableId,drawcaps);
                var nbrRow = document.getElementById(tableId).rows.length -1;//-2 si il y a le header
                setCookie(COOKIE_NAME+nbrRow,arrow,5);
                drawcaps();
            }
            
            function addNewRow(tableId,type,id,col){
                var arrow = new Array(COL_NUMBER);
                arrow = loadDefaultValue(type);
                arrow[col]=id;
                insertRow(arrow,tableId,drawcaps);
                //var nbrRow = document.getElementById(tableId).rows.length -1;//-2 si il y a le header
                var index = id.split("_");
                var selIndex = index[1];
                setCookie(COOKIE_NAME+selIndex,arrow,5);
                drawcaps();
            }
            function addNewRowPalette(type,id,col,selIndex){
                var arrow = new Array(COL_NUMBER);
                arrow = loadDefaultValue(type);
                arrow[col]=id;
                arrow[INDEX_HEADER]=selIndex;
                var l = arrec.length;
                arrec[l] = arrow;
                setCookie(COOKIE_NAME+selIndex,arrow,5);
                recordLine(arrow);
                drawcaps();
            }
        
            function addNewRowCaisse(newRow,selIndex){
                var arrow = new Array(COL_NUMBER);
                var index = arrec.length;
                arrow = newRow;
                arrec[index]=arrow;
                setCookie(COOKIE_NAME+selIndex,arrow,5);
                recordLine(arrow);
                drawcaps();
            }
            
            function addNewRow2(tableId,newRow){
                var val = allocateCookieId();
                var arrow = new Array(COL_NUMBER);
                arrow = newRow;
                insertRow(arrow,tableId,drawcaps);
                var selIndex = val - (-1);
                setCookie(COOKIE_NAME+selIndex,arrow,5);
                drawcaps();
            }
            
            
            function getRowNum(tableId,id,col){
                var j=0;
                var val;
                var theTable = document.getElementById(tableId);
                var rowCount = theTable.rows.length;
                for(j=0;j<rowCount;j++){
                    val = getCell("myTable",j,col);
                    if(val==id)
                        return j;
                }
                return 0;
            }
            function getRowNumArrec(id,col){
                var j=0;
                var val;
                var rowCount = arrec.length;
                for(j=0;j<rowCount;j++){
                    var arrow = arrec[j];
                    val = arrow[col];
                    if(val==id)
                        return j;
                }
                return 0;
            }
            
            function searchInTable(tableId,col,regex){
                var j;
                var val;
                var counter=0;
                var theTable = document.getElementById(tableId);
                var rowCount = theTable.rows.length;
                for(j=0;j<rowCount;j++){
                    val = getCell("myTable",j,col);
                    if(regex==val)
                        counter=counter+1;
                }
                return counter;
            }
            function searchInArray(col,regex){
                var j;
                var val;
                var counter=0;
                var rowCount = arrec.length;
                for(j=0;j<rowCount;j++){
                    var arrow = arrec[j];
                    val = arrow[col];
                    if(regex==val)
                        counter=counter+1;
                }
                return counter;
            }
            
            function getCell(tableId,row,col){
                var tablebody;
                var rowtable;
                var cell;
                var cellText;
                var text;
                
                var theTable = document.getElementById(tableId);
                var rowCount = theTable.rows.length;
                if(rowCount>0){
                    tablebody = theTable.getElementsByTagName("tbody")[0];
                    rowtable  = tablebody.getElementsByTagName("tr")[row];
                    cell       = rowtable.getElementsByTagName("td")[col];
                    cellText = cell.childNodes[0];
                    text = cellText.data;
                }
                else
                    text = 0;
                return text
            }
            
            function addHeader(tableId){
                var theTable = document.getElementById(tableId);
                for( var x = 0; x < theTable.tHead.rows.length; x++ ) {
                    var y = document.createElement('td');
                    y.appendChild(document.createTextNode('Thead cell text'));
                    theTable.tHead.rows[x].appendChild(y);
                }
            }
            function changeCell(tableId,row,col,newValue)
            {
                var arrCook = new Array(COL_NUMBER);
                var x=document.getElementById(tableId).rows[row].cells;
                if(col>0){
                    x[col].innerHTML=newValue;
                }
                for(var i = 1;i<COL_NUMBER;i++){
                    arrCook[i] = x[i].innerHTML;
                }
                
                setCookie(COOKIE_NAME+(row),arrCook,5);
            }
            function changeArrayRow(row,arrow)
            {
                var num = arrow[INDEX_HEADER];
                setCookie(COOKIE_NAME+(num),arrow,5);
                updateLine(arrow);
            }
            
            function changeArrayValue(row,col,newValue)
            {
                var arrow = arrec[row];
                var num = arrow[INDEX_HEADER];
                arrow[col] = newValue;
                setCookie(COOKIE_NAME+(num),arrow,5);
                updateLine(arrow);
            }
            
            function createHeader(divId,tableId,headers){
                var root=document.getElementById(divId);
                //var nrRows=indexId;
                var nrCols=COL_NUMBER;
                var tab=document.createElement('table');
                tab.className="";//tablesorter";
                tab.border=1;
                tab.cellPadding=0;
                tab.cellSpacing=1;
                tab.id = tableId;
                var tbh=document.createElement('thead');
                var rowh = document.createElement('tr');
                var cellh;
                for(var k=0;k<nrCols;k++){
                    cellh = document.createElement('th');
                    cellh.className="header";
                    cellh.appendChild(document.createTextNode(headers[k]));
                    rowh.appendChild(cellh);
                }
                tbh.appendChild(rowh);
	
                var tbo=document.createElement('tbody');
                tab.appendChild(tbo);
                
                root.appendChild(tab);

            }
            
            function readRow(tableId,index){
                var arrow = [];
                var rowLength = document.getElementById(tableId).rows[index].cells.length;
                var arrow = Array(rowLength);
                var i;
                for (i=1; i<rowLength; i++){
                    arrow[i] = document.getElementById(tableId).rows[index].cells[i].childNodes[0].data;
                }
                return arrow;
            }

            function removeRow(i,tableId){
                var index = getCell("myTable",i,INDEX_HEADER);
                document.getElementById(tableId).deleteRow(i);
                //remove it from cookie
                deleteCookie(index);
                
            }