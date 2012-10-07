/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function createRootSvg(ref,x,y,h,w){
                    var NS="http://www.w3.org/2000/svg";
                    var svg=document.createElementNS(NS,ref);
                    svg.width=w;
                    svg.height=h;
                    return svg;
                }
                
                function createLine(id,x1,y1,x2,y2,color,strokeWidth){
                    var svg = 'http://www.w3.org/2000/svg';
                    elt = document.createElementNS(svg,'line');
                    elt.setAttributeNS(null,'id',id);
                    elt.setAttributeNS(null,'stroke',color);
                    elt.setAttributeNS(null,'stroke-width',strokeWidth);
                    elt.setAttributeNS(null,'stroke-opacity','0.5');
                    elt.setAttributeNS(null,'x1',x1);
                    elt.setAttributeNS(null,'y1',y1);
                    elt.setAttributeNS(null,'x2',x2);
                    elt.setAttributeNS(null,'y2',y2);
                    Display().appendChild( elt );
                }
                
                function createRect(id,x,y,h,w,fill){
                    var svg = 'http://www.w3.org/2000/svg';
                    var elt = document.createElementNS(svg,'rect');
                    elt.setAttributeNS(null,'id',id);
                    elt.setAttributeNS(null,'fill',fill);
                    elt.setAttributeNS(null,'stroke','yellow');
                    elt.setAttributeNS(null,'stroke-width','3');
                    elt.setAttributeNS(null,'stroke-opacity','0.5');
                    elt.setAttributeNS(null,'x',x);
                    elt.setAttributeNS(null,'y',y);
                    elt.setAttributeNS(null,'width',w);
                    elt.setAttributeNS(null,'height',h);
                    Display().appendChild( elt );
                }
