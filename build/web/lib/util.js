/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

            

            
            
            
            
            function degToRad(angleDeg){
                var angleRad = (angleDeg/180) * Math.PI;
                return angleRad;
            
            }
            
            function radToDeg(angleRad){
                var angleDeg = (angleRad/Math.PI) * 180;
                return angleDeg;
            
            }
            
             function exportSvg(){
                var content ;//= loadSvg();
                document.getElementById("log").style.display = "block"; 
                
                var xml = $('#svgbasics').svg('get').toSVG();
                content = xml.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') ;
                $('#msg').html(content);
                document.getElementById("log").innerText = content;
            }
            

            function trim(str){
                var outStr = str.replace(/^\s+|\s+$/g, '') ;
                return outStr;
            }
            
            function doNothing(){}
            
            
            
            
	
            function phs1x(r,a,h){
                var phs1x = 	(r-h)*(2*Math.sin(a/2)*Math.cos(a/2)-Math.tan(a/2));
                return phs1x;
            }


            function ps1x(r,a,h){
                var ps1x = 	(r-h)*Math.tan(a/2);
                return ps1x;
            }

            function p2x(r,a,h){
                var p2x = 	(h*Math.sin(a));
                return p2x;
            }

            function p2y(r,a,h){
                var p2y = 	(h*Math.cos(a));
                return p2y;
            }

            function calculF(r,a,h){
                var f1 = 2*(r-h)*Math.sin(a/2)*Math.sin(a/2);
                return f1;
            }

            function calculG(r,a,h){
                var g1 = 2*(r-h)*Math.cos(a/2)*Math.sin(a/2);
                return g1;
            }

	
            function confirmation() {
                var x = window.confirm("Ce formulaire est envoyé à  " + document.frmOne.action);
                return x;
            }

            function random(range) {
                return Math.floor(Math.random() * range);
            }

            function controle(frmOne) {
                var test = document.frmOne.input.value;
                alert("Vous avez tapé : " + test);
                drawcaps();
            }

            function getFonts()
            {
                var nFontLen = dlgHelper.fonts.count;
                var rgFonts = new Array();
                for ( var i = 1; i < nFontLen + 1; i++ )
                    rgFonts[i] = dlgHelper.fonts(i); 

                rgFonts.sort();
                for ( var j = 0; j < nFontLen; j++ ){
                    alert(rgFonts[j]);
                }
                //document.write( rgFonts[j] + "<BR>" );
            }
            
            function createSpectrum(){
            $('#spektrum').svg(function (svg) {
                for (var l=380; l<780; l++) {
                var color=nm2rgb(l);
                var attr = {stroke:"none",fill:color};
                var i = (l-380)+14;
                svg.rect(4,i,35,1,attr); 
                }
            });
            
            $('#spektr_ind_Pfeil').svg(function(svg){
                var g1 = svg.group();
                var pointerL=svg.path(g1,gl_pointerLeft,gl_pointer_attr);
            });

            $("#spektr_Fr").draggable({axis:"y",
                containment: "#spektrum",
                //scroll: false,
                start: function(){$("#spektr_ind_Anz").html($("#spektr_Fr").css("top"));},
                drag:function(){$("#spektr_ind_Anz").html(parseInt($("#spektr_Fr").css("top"))+380+" nm");},
                stop:function(){
                gl_Color=parseInt($("#spektr_ind_Anz").html());
                newPlot();
                        }
             });
                    
            }
            
           function loadExtSvg() { 
                var svg = $('#svgbasics').svg('get'); 
                var img = svg.image(100, 50, 200, 200, "img/uluru.jpg"); 
                svg.title(img, "My image"); 
                svg.image(130, 100, 20, 20, "img/sun.png"); 
            }
 
            // Callback after loading external document 
            function loadDone(svg, error) { 
                svg.text(10, 20, error || 'Loaded into ' + this.id); 
            }
            
            /**
             * other stuff
             */
	 
            function font_init(fonts) {
                var results = [];
                var d = new Detector();
                fonts.push("cursive");
                fonts.push("monospace");
                fonts.push("serif");
                fonts.push("sans-serif");
                fonts.push("fantasy");
                fonts.push("default");
                fonts.push("Arial");
                fonts.push("Arial Black");
                fonts.push("Arial Narrow");
                fonts.push("Arial Rounded MT Bold");
                fonts.push("Bookman Old Style");
                fonts.push("Bradley Hand ITC");
                fonts.push("Century");
                fonts.push("Century Gothic");
                fonts.push("Comic Sans MS");
                fonts.push("Courier");
                fonts.push("Courier New");
                fonts.push("Georgia");
                fonts.push("Gentium");
                fonts.push("Impact");
                fonts.push("King");
                fonts.push("Lucida Console");
                fonts.push("Lalit");
                fonts.push("Modena");
                fonts.push("Monotype Corsiva");
                fonts.push("Papyrus");
                fonts.push("Tahoma");
                fonts.push("TeX");
                fonts.push("Times");
                fonts.push("Times New Roman");
                fonts.push("Trebuchet MS");
                fonts.push("Verdana");
                fonts.push("Verona");
                fonts.push("Zapfino");
                var fontArray = [];
                var j=0;
                var i = 0;
                for (i = 0; i < fonts.length; i++) {
                    var result = d.detect(fonts[i]);
                    if(result) {
                        fontArray.push(fonts[i]);
                    }
                }
                return fontArray;
            }
	
            function getDate(){
                var ladate=new Date()
                console.log(ladate.getFullYear() +"-"+(ladate.getMonth()+1)+"-"+ladate.getDate());
            }
            
            function taille_init(){
                var fontArray = [];
                var i = 0;
                var j = 0;
                for (i = 1; i <= 50; i++) {
                    fontArray.push(i);
                }
                return fontArray;
            }
            
            function svgClear(svg){
                while (svg.lastChild) {
                    svg.removeChild(svg.lastChild);
                }
            }
            
            function svgCreateGroup(doc,svg,id){
                var NS = 'http://www.w3.org/2000/svg';
                var g = doc.createElementNS(NS, "g");
                    g.setAttributeNS(null,'id',id);
                    g.setAttributeNS(null,'shape-rendering', 'inherit');
                    g.setAttributeNS(null,'pointer-events', 'all');
                    svg.appendChild(g);
                    return g;
            }
            
               function createRootSvg(doc,ref,x,y,h,w){
                    var NS="http://www.w3.org/2000/svg";
                    var svg=doc.createElementNS(NS,ref);
                    svg.width=w;
                    svg.height=h;
                    return svg;
                }
                
                function createLine(doc,group,id,x1,y1,x2,y2,color,strokeWidth){
                    var svg = 'http://www.w3.org/2000/svg';
                    var elt = doc.createElementNS(svg,'line');
                    elt.setAttributeNS(null,'id',id);
                    elt.setAttributeNS(null,'stroke',color);
                    elt.setAttributeNS(null,'stroke-width',strokeWidth);
                    elt.setAttributeNS(null,'stroke-opacity','0.5');
                    elt.setAttributeNS(null,'x1',x1);
                    elt.setAttributeNS(null,'y1',y1);
                    elt.setAttributeNS(null,'x2',x2);
                    elt.setAttributeNS(null,'y2',y2);
                    group.appendChild( elt );
                }
                
                function createRect(doc,group,id,x,y,h,w,fill,strokeColor,strokeWidth,opacity){
                    var svg = 'http://www.w3.org/2000/svg';
                    var elt = doc.createElementNS(svg,'rect');
                    elt.setAttributeNS(null,'id',id);
                    elt.setAttributeNS(null,'fill',fill);
                    elt.setAttributeNS(null,'stroke',strokeColor);
                    elt.setAttributeNS(null,'stroke-width',strokeWidth);
                    elt.setAttributeNS(null,'stroke-opacity',opacity);
                    elt.setAttributeNS(null,'x',x);
                    elt.setAttributeNS(null,'y',y);
                    elt.setAttributeNS(null,'width',w);
                    elt.setAttributeNS(null,'height',h);
                    group.appendChild( elt );
                }
                /*
                function createLabel(doc,group,id,x,y,texte,font,fontSize,fontColor,strokeColor,strokeWidth,opacity){
                    var data = doc.createTextNode(texte);
                    var svg = 'http://www.w3.org/2000/svg';
                    var elt = doc.createElementNS(svg,'text');
                    elt.setAttributeNS(null,'id',id);
                    elt.setAttributeNS(null,'fill',fontColor);
                    elt.setAttributeNS(null,'stroke',strokeColor);
                    elt.setAttributeNS(null,'stroke-width',strokeWidth);
                    //elt.setAttributeNS(null,'stroke-opacity',opacity);
                    elt.setAttributeNS(null,'x',x);
                    elt.setAttributeNS(null,'y',y);
                    elt.setAttributeNS(null,'font-family',font);
                    elt.setAttributeNS(null,'font-size',fontSize);
                    elt.setAttributeNS(null, "text-anchor", "middle");
                    elt.appendChild(data);
                    group.appendChild( elt );
                    return elt;
                }
                
                var svgns = "http://www.w3.org/2000/svg";
                
                    function createLabel(doc,id,groupId,texte,x,y,fontColor,fontSize,font,weight,anchor) {
                        var newText = doc.createElementNS(svgNS,"text");
                        newText.setAttributeNS(null,"id",id);
                        newText.setAttributeNS(null,"x",x);		
                        newText.setAttributeNS(null,"y",y);	
                        newText.setAttributeNS(null,"font-size",fontSize+"px");
                        newText.setAttributeNS(null,"text-anchor",anchor);
                        newText.setAttributeNS(null,"fill-opacity","1");
                        newText.setAttributeNS(null,"fill",fontColor);
                        newText.setAttributeNS(null,"style","font-family:"+font+"; font-weight:"+weight);
                        var textNode = doc.createTextNode(texte);
                        newText.appendChild(textNode);
                        doc.getElementById(groupId).appendChild(newText);
                        return newText;
                    }
                    */
                function makeShape(doc,x,y) {
                    var data = doc.createTextNode("Text");
                    var svgns    = 'http://www.w3.org/2000/svg';
                    var text = doc.createElementNS(svgns, "text");
                    text.setAttributeNS(null, "x", x);
                    text.setAttributeNS(null, "y", y);
                    text.setAttributeNS(null, "fill", "green");
                    text.setAttributeNS(null, "text-anchor", "start");
                    text.setAttributeNS(null,"style","font-family:times; font-weight:bold");
                    text.appendChild(data);
                    doc.documentElement.appendChild(text);
                }
                
                
                
                // Get the display element.
		function getDisplay(doc,id)
		{
			return doc.getElementById(id);
		}
                
                // Determine dimensions of the display element.
		// Return this as a 2-tuple (x,y) in an array
		function getDimensions(display)
		{
			// Our Rendering Element
			//var display = getDisplay();
			var width = parseInt( display.getAttributeNS(null,'width') );
			var height = parseInt( display.getAttributeNS(null,'height') );

			return [width,height];
		}
                
                function color_d2h(value){
                    var rgbString = "rgb("+value+")"; // get this in whatever way.

                    var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                    // parts now should be ["rgb(0, 70, 255", "0", "70", "255"]

                    delete (parts[0]);
                    for (var i = 1; i <= 3; ++i) {
                        parts[i] = parseInt(parts[i]).toString(16);
                        if (parts[i].length == 1) parts[i] = '0' + parts[i];
                    } 
                    var hexString ='#'+parts.join('').toUpperCase(); // "#0070FF"

                    return hexString;
                }
                function color_d2h_cp(value){
                    var rgbString = value; // get this in whatever way.

                    var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                    // parts now should be ["rgb(0, 70, 255", "0", "70", "255"]

                    delete (parts[0]);
                    for (var i = 1; i <= 3; ++i) {
                        parts[i] = parseInt(parts[i]).toString(16);
                        if (parts[i].length == 1) parts[i] = '0' + parts[i];
                    } 
                    var hexString ='#'+parts.join('').toUpperCase(); // "#0070FF"

                    return hexString;
                }
            function loadFile(urlFile){
                $.get(urlFile, null, function(data) {
                        tabLogo[0] = data.documentElement;
                        //svg.add(group,tabLogo[0]);
                    }, 'xml');
            }
            function add_option (select_id, text) {
                var select = document.getElementById(select_id);
                select.options[select.options.length] = new Option(text);
            }

            function load_combo (select_id, option_array) {
                for (var i = 0; i < option_array.length; i++) {
                    add_option (select_id, option_array[i]);
                }
            }
            
            function loadSvg(){
                $.get('dessin.svg', function(svg){
                    console.log( svg );
                }, 'text');
            }
            
            function addFooter(tableId){
                var theTable = document.getElementById(tableId);
                for( var x = 0; x < theTable.tFoot.rows.length; x++ ) {
                    var y = document.createElement('td');
                    y.appendChild(document.createTextNode('Tfoot cell text'));
                    theTable.tFoot.rows[x].appendChild(y);
                }
            }
            function setHexColor(hexColor){
                    //var hexColor = color_d2h_cp(newValue);
                    if(itemFocused == 1){
                        $(selectedItem.firstChild).attr('fill', '#'+hexColor);
                        changeArrayValue(selectedRow,FILLCOLOR_HEADER,'#'+hexColor);
                    }
                    selArr[FILLCOLOR_HEADER] = '#'+hexColor;
                }
                function setColor(newValue){
                    var hexColor = color_d2h_cp(newValue);
                    if(itemFocused == 1){
                        $(selectedItem.firstChild).attr('fill', '#'+hexColor);
                        changeArrayValue(selectedRow,FILLCOLOR_HEADER,'#'+hexColor);
                    }   
                    //newValue = values.stroke.red+","+values.stroke.green+","+values.stroke.blue;
                    //hexColor = color_d2h(newValue);
                    //$(selectedItem.firstChild).attr('stroke', hexColor); 
                    //changeArrayValue(selectedRow,STROKECOLOR_HEADER,hexColor);
                }