                function alertColorValues() {
			values = myMapApp.colourPickers["myColourPicker1"].getValues();
			var newValue = values.fill.red+","+values.fill.green+","+values.fill.blue;
                        var hexColor = color_d2h(newValue);
                        $(selectedItem.firstChild).attr('fill', hexColor);
                        //changeCell(tableId,selectedRow,FILLCOLOR_HEADER,hexColor);
                        changeArrayValue(selectedRow,FILLCOLOR_HEADER,hexColor);
                        
                        newValue = values.stroke.red+","+values.stroke.green+","+values.stroke.blue;
                        hexColor = color_d2h(newValue);
                        $(selectedItem.firstChild).attr('stroke', hexColor); 
                        //changeCell(tableId,selectedRow,STROKECOLOR_HEADER,hexColor);
                        changeArrayValue(selectedRow,STROKECOLOR_HEADER,hexColor);
                        //var opacity = values.fill.alpha;
                        //changeCell(tableId,selectedRow,selectedCol-(-1),opacity);
                        //drawcaps();
                }
                
                
                function addBtnPressed(){
                    addNewRow("myTable",selectedValueCombo);
                }
                
                function exportBtnPressed(){
                    exportSvg();
                }
                
                function refreshBtnPressed(){
                    drawcaps();
                }
                
                function setValueTextBox(arr){
                    for(var i = 1 ; i<10 ; i++){
                        textboxgui[i].setValue(arr[i+1],undefined);
                    }
                }
                
                function setValueLabel(arr){
                    for(var i = 1 ; i<10 ; i++){
                        var textVal = arr[i+1].toString();
                        labelboxgui[i].setValue(textVal,undefined);
                    }
                }
                function buttonPressed(buttonId,evt,textVal) {
			if(document.getElementById(tableId)!= null)
                            rowLength = document.getElementById(tableId).rows.length;    
                        if(buttonId == "textbutton1" ){
                            if(tableIndex>1)
                                tableIndex--;
                            var arrow= readRow(tableId,tableIndex);
                            setValueTextBox(arrow);
                        }
                        if(buttonId == "textbutton2" ){
                            if(tableIndex<rowLength-1)
                            tableIndex++;
                            var arrow= readRow(tableId,tableIndex);
                            setValueTextBox(arrow);
                        }
                        selectedRow = tableIndex;
                        
                        if(arrow[1]=="vueDev"){
                                var tableHeader = loadHeaderDev();
                                setValueLabel(tableHeader);
                            }
                        if(arrow[1]=="texte"){
                                var tableHeader = loadHeaderTexte();
                                setValueLabel(tableHeader);
                            }
                        if( (arrow[1]=="vueAvant") || (arrow[1]=="vueArriere") ){
                                var tableHeader = loadHeaderVue();
                                setValueLabel(tableHeader);
                            }
                       if (arrow[1]=="liseret"){
                                var tableHeader = loadHeaderLiseret();
                                setValueLabel(tableHeader);
                            }
                       if (arrow[1]=="cotation"){
                                var tableHeader = loadHeaderCotation();
                                setValueLabel(tableHeader);
                            }
                       if (arrow[1]=="logo"){
                                var tableHeader = loadHeaderLogo();
                                setValueLabel(tableHeader);
                            }
                       if (arrow[1]=="cartouche"){
                                var tableHeader = loadHeaderCartouche();
                                setValueLabel(tableHeader);
                            }
                }
                function showVal(valType,groupId,value) {
			//valType can be "change" (on mouse move or click) or "release" (mouseup or mouseout)
			if (valType == "change") {
				statusChange("Value of Slider '"+groupId+"' = "+Math.round(value));
			}
			if (valType == "release") {
				statusChange("Slider '"+groupId+"' was released, value = "+Math.round(value));
                                var ratio = Math.round(value);
                                //zoom(ratio);
                                zoom(ratio);
			}
		}
                
                function statVert(valType,groupId,value) {
			//valType can be "change" (on mouse move or click) or "release" (mouseup or mouseout)
			if (valType == "change") {
				statusChange("Value of Slider '"+groupId+"' = "+Math.round(value));
			}
			if (valType == "release") {
				statusChange("Slider '"+groupId+"' was released, value = "+Math.round(value));
                                var ratio = Math.round(value);
                                //moveVert(ratio);
                                zoom(ratio);
			}
		}
                
                function zoom(valType,groupId,val){
                    
                    var ratio = Math.round(val);
                    var diff = curseurZoom - ratio;
                    
                    zoomw = zoomw - (-10*diff);
                    zoomh = zoomh - (-10*diff);
                    curseurZoom = ratio;
                    ratioZoom = zoomw/842;
                    var svg = $('#svgbasics').svg('get');
                    svg.configure({viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh})
                    updateViewCookie()
                }
                
                function moveVert(valType,groupId,val){
                    var ratio = Math.round(val);
                    var svg = $('#svgbasics').svg('get');
                    zoomy = 200/ratioZoom  - (8*ratio/ratioZoom);//ratioZoom;
                    svg.configure({viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh})
                    updateViewCookie()
                }
                function moveHori(valType,groupId,val){
                    var ratio = Math.round(val);
                    var svg = $('#svgbasics').svg('get');
                    zoomx = 300/ratioZoom  - (8*ratio/ratioZoom);//ratioZoom;
                    svg.configure({viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh})
                    updateViewCookie()
                }
    
		function writeOutTextContent(textboxId,value,changeType) {
			
                        /*
                                var num = textboxId.split("text");
                                var w= this.textboxText.getBBox().width;

				document.getElementById("resultText").firstChild.nodeValue = "Content of "+textboxId+" is \""+value+"\" and size = "+w;
                               */ 
                                var numBox = textboxId.split("text");
                                //var lblName = labelboxgui[numBox[1]].getValue();
                                selectedCol = numBox[1];
                                //if(lblName=="Couleur")
                               //     showCP();
                               // else{
                               //     hideCP();
                               //     console.log("key pressed="+changeType);
                                    if(changeType == "change"){
                                    changeCell(tableId,selectedRow,selectedCol,value);
                               //     drawcaps();
                                    }
                               // }
                                
                                
                                
			//}
		}
                function showCP(){
                    myMapApp.buttons["okbutton"].showButton();
                    myMapApp.colourPickers["myColourPicker1"].show();
                }
                function hideCP(){
                    myMapApp.buttons["okbutton"].hideButton();
                    myMapApp.colourPickers["myColourPicker1"].hide();
                }
                
                function createTextBox(id,newGroup,value,maxChars,x,y,w,h,textOffsetY){
                //var gmenu = parentNode.group({id: 'menuGroup'});
                //var newGroup = parentNode.group(gmenu,id+"Group");
                //var menu = $('#svgmenu').svg('get');
                //first a few styling parameters:
                var textStyles = {"font-family":"Arial,Helvetica","font-size":12,"fill":"dimgray"};
                var boxStyles = {"fill":"white","stroke":"dimgray","stroke-width":1.5};
                var cursorStyles = {"stroke":"red","stroke-width":1.5};
                var selBoxStyles = {"fill":"blue","opacity":0.8};
                var textbox1 = new textbox(id,newGroup,value,maxChars,x,y,w,h,textOffsetY,textStyles,boxStyles,cursorStyles,selBoxStyles,"[a-zA-Z ]",undefined);
                 //var textbox1 = new textbox("toto","totoGroup","Textbox1",25,100,100,200,30,22,textStyles,boxStyles,cursorStyles,selBoxStyles,"[a-zA-Z ]",writeOutTextContent);
                return textbox1;
            }
            
            function createCombo(parentGroup){
                //first a few styling parameters:
                var comboBoxCellHeight = 16;
                var comboBoxTextpadding = 3;
                var comboBoxtextStyles = {"font-family":"Arial,Helvetica","font-size":11,"fill":"dimgray"};
                var comboBoxStyles = {"stroke":"dimgray","stroke-width":1,"fill":"white"};
                var comboBoxScrollbarStyles = {"stroke":"dimgray","stroke-width":1,"fill":"whitesmoke"};
                var comboBoxSmallrectStyles = {"stroke":"dimgray","stroke-width":1,"fill":"lightgray"};
                var comboBoxHighlightStyles = {"fill":"dimgray","fill-opacity":0.3};
                var comboBoxTriangleStyles = {"fill":"dimgray"};
                //var newGroup = svgCreateGroup(document,display,"mainGroup");
                //var newGroup = menu.group(parentGroup,'combo1Group');
                //this array contains the values
                var roses = new Array({key:"Butterscotch",value:false},{key:"Ci Peace",value:false},{key:"Impatient",value:false},{key:"Lady Hillingdon",value:false},{key:"Lavaglut",value:false},{key:"Mission Bells",value:false},{key:"Sexy Rexy",value:false},{key:"Souvenir de Pierre Notting",value:false},{key:"Sunflare",value:false},{key:"Whisky Mac",value:false},{key:"Whisper Floribunda",value:false});
                //now the initialization of the combobox
                var comboRoses = new combobox("combo1",parentGroup,roses,170,0,0,comboBoxCellHeight,comboBoxTextpadding,5,true,50,comboBoxtextStyles,comboBoxStyles,comboBoxScrollbarStyles,comboBoxSmallrectStyles,comboBoxHighlightStyles,comboBoxTriangleStyles,showRoses);
                //return comboRoses;
        }
            
        function showRoses(comboboxName,selectedValues,selectedIndizes) {
            var rosesString = selectedValues.join(",");
            if (rosesString.length == 0) {
                    rosesString = " ";
            }
            //document.getElementById("textbox1").firstChild.nodeValue = rosesString;
            textboxgui[1].setValue(rosesString,undefined);
        }