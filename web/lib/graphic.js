/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function graphic(g,globalVar){
    this.g = g;
    //update(globalVar);
}
graphic.prototype.update = function (globalVar){
    this.transx = globalVar.transx;
    this.transy = globalVar.transy;
    
}
graphic.prototype.createMarque = function (cote,distBord,texte,police,couleur,opacite,taille,epaisseurTrait,a,r,ax,ay,fx,fy,bAxeSym){
                var h = this.getHauteurDev();
                var marqueId = 'pathChannel'+cote;
                var alpha = (4-cote)*(a)/4;
                var ex = ax + calculG(r+100,alpha,distBord);
                var ey = ay + 100 + h - distBord  - calculF(r+100,alpha,distBord );
                
                var axeSymId = 'pathAxeSym'+cote;
		var svg = $('#svgbasics').svg('get');
                if(bAxeSym == true ){
                    var groupMarque = svg.group(g,axeSymId,{fill: "none", stroke: "red", strokeWidth:"0.5",transform:"translate("+transx+", "+transy+")"});
                    var pathAxeSym = svg.createPath();
                    svg.path(groupMarque, pathAxeSym.move(ex,ey).line(fx, fy), {id: axeSymId}); 
                }
                
                var fontSizeVert = 4*taille/7;
                var ex = ax + calculG(r,alpha,distBord);
                var ey = ay + h - distBord - calculF(r,alpha,distBord);
                
                //var groupText = svg.group(g,"tt",{fill: "blue", stroke: "blue",strokeWidth:epaisseurTrait,transform:"translate("+transx+", "+transy+")"});
                var defs = svg.defs(); 
                var path = svg.createPath(); 
                svg.path(defs, path.move(ex+fontSizeVert/2,ey).line(fx+fontSizeVert/2, fy), {id: marqueId}); 
                svg.use('#'+marqueId, {fill: "none", stroke: "none",transform:"translate("+transx+", "+transy+")"}); 
                
                var text = svg.text(g,"", {fontFamily: police, fontSize: taille, fill: couleur, opacity:opacite,strokeWidth:epaisseurTrait,transform:"translate("+transx+", "+transy+")"}); 
                var texts = svg.createText(); 
                svg.textpath(text, '#'+marqueId, texts.string(texte)); 
            }
            
graphic.prototype.createMarquexy = function(cote,distBord,texte,police,couleur,opacite,taille,epaisseurTrait,ax,ay,bAxeSym){
                var diamBase = this.getDiamBase();
                var axeSymId = 'pathAxeSymAv'+cote;
		var svg = $('#svgbasics').svg('get');
                var defs = svg.defs(); 
                
                if(bAxeSym == true ){
                    //creation de l'axe
                    var groupMarque = svg.group(g,axeSymId,{fill: "none", stroke: "red", strokeWidth:"0.5",transform:"translate("+transx+", "+transy+")"});
                    var pathAxeSym = svg.createPath();
                    svg.path(groupMarque, pathAxeSym.move(ax+diamBase/2,ay-(-100)).line(ax+diamBase/2, ay - this.getHauteurDev() - 100), {id: axeSymId}); 
                }
                //creation du chemin de texte
                var fontSizeVert = 4*taille/7;
                var marqueId = 'pathVueVert'+cote;
                var path = svg.createPath(); 
                svg.path(defs, path.move(ax+(diamBase/2)+fontSizeVert/2,ay - distBord).line(ax+(diamBase/2)+fontSizeVert/2, ay- distBord -100), {id: marqueId}); 
                svg.use('#'+marqueId, {fill: "none",  stroke: "none",transform:"translate("+transx+", "+transy+")"}); 
                
                //creation de la marque
                var text = svg.text(g,"", {fontFamily: police, fontSize: taille, fill: couleur, opacity:opacite, strokeWidth:epaisseurTrait,transform:"translate("+transx+", "+transy+")"}); 
                var texts = svg.createText(); 
                svg.textpath(text, '#'+marqueId, texts.string(texte)); 
            }
            
graphic.prototype.drawPalette30 = function(){
                var fillcolor = "black";
                var strokeColor = "black";
                var strokeThin = 1;
                var opacite = 1;
                var svg = $('#svgbasics').svg('get');
                /*var pathMask = svg.createPath();
                var group = svg.group(g,"pal30",{fill:fillcolor , opacity : opacite,stroke: strokeColor, strokeWidth: strokeThin,transform:"translate(0,0)"});  //transform:"scale("+zoomx+","+zoomy+")"
                
                svg.path(group,pathMask.move(300, 20).line(0,800,0));*/
    //trait de séparation des vues
    var g = svg.group({stroke: 'black', strokeWidth: 10}); 
    svg.line(g, 600, 100, 600, 800); 
    
    //
    var g1 = svg.group({stroke: 'black', strokeWidth: 5}); 
    
    
   //vue avant coté gauche
   svg.line(g1, 270, 100, 270, 800); 
    for(i=0;i<9;i++){
        svg.line(g1, 0, 90+(i*90), 540, 90+(i*90));
    }
    //vue arriere coté droit
    svg.line(g1, 870, 100, 870, 800); 
    for(i=0;i<9;i++){
        svg.line(g1, 660, 90+(i*90), 1080, 90+(i*90));
    }
            }
graphic.prototype.drawVue = function(nomGroupe,orix,oriy,b,h,diamTete,color1,color2,strokeColor,opacite){
                var ax = orix;
                var ay = oriy;
                var epaisseurRondelle = - 5;
                var largeurBombe = 3;
                var epaisseurBombe = -3;
                var diamTeteSansBombe = (diamTete-2*largeurBombe)/2;
                var angleDeg_bombe = 90;
                var angleDeg_jonc = 180;
                var epaisseurTete = Math.abs(epaisseurBombe)+ Math.abs(epaisseurRondelle);
                var hauteurSansBombe = h-epaisseurTete;
                var largeurConeUnCote = (this.getDiamBase()-diamTete)/2;// Math.tan(b)*hauteurSansBombe; 
                var hauteurJusqueHauteurSansBombe = 1;
                var epaisseurJonc = 4;
                var hauteurJusqueDeboitage = hauteurSansBombe - hauteurJusqueHauteurSansBombe - epaisseurJonc;
                
                var largeurBombeCustom = largeurBombe - (epaisseurBombe*Math.sin(Math.PI/2 - degToRad(angleDeg_bombe)));
                var epaisseurBombeCustom = epaisseurBombe -  (largeurBombe*Math.sin(Math.PI/2 - degToRad(angleDeg_bombe)));
                
                var svg = $('#svgbasics').svg('get');
	
                var defs = svg.defs(); 
                svg.linearGradient(defs, "Gradient", [["0%", color1,"100%"], ["100%", color2,"100%"]], ax, ay, ax+200, ay, {gradientUnits: "userSpaceOnUse"}); 
                
                var fillcolor = "url(#Gradient)";
                
                var strokeThin =0.1;
                var group = svg.group(g,nomGroupe,{fill:fillcolor , opacity : opacite,stroke: strokeColor, strokeWidth: strokeThin,transform:"translate("+transx+", "+transy+")"});  //transform:"scale("+zoomx+","+zoomy+")"
                
                var pathMask = svg.createPath(); 
                svg.path(group,pathMask.move(ax, ay).line(Math.tan(b)*hauteurJusqueDeboitage,-hauteurJusqueDeboitage,1).arc(Math.abs(epaisseurJonc), Math.abs(epaisseurJonc), angleDeg_jonc, false, false, 0, -epaisseurJonc,true).line(Math.tan(b)*hauteurJusqueHauteurSansBombe,-hauteurJusqueHauteurSansBombe,1).arc(Math.abs(largeurBombe), Math.abs(epaisseurBombe), angleDeg_bombe, false, true, largeurBombeCustom, epaisseurBombeCustom,true).curveQ(diamTeteSansBombe, epaisseurRondelle, 2*diamTeteSansBombe,  0,1,0).arc(Math.abs(largeurBombe), Math.abs(epaisseurBombe), angleDeg_bombe, false, true, largeurBombeCustom, -epaisseurBombeCustom,true).line(Math.tan(b)*hauteurJusqueHauteurSansBombe,hauteurJusqueHauteurSansBombe,1).arc(Math.abs(epaisseurJonc), Math.abs(epaisseurJonc), angleDeg_jonc, false, false, 0, epaisseurJonc,true).line(largeurConeUnCote,hauteurJusqueDeboitage,1).close());
                $("#"+nomGroupe, svg.root()).bind('click', svgClicked). bind('mouseover', svgOver).bind('mouseout', svgOut);
            }
            
graphic.prototype.createCotation = function(pointAx,pointAy,distance,angle,posTextex,posTextey,value,largeurCote){
                var svg = $('#svgbasics').svg('get');
                var masktest = svg.group(g,"maskGrouptest",{fill: "none" , stroke: "red", strokeWidth: "0.2",transform:"translate("+transx+", "+transy+")"});  //transform:"scale("+zoomx+","+zoomy+")"
                var pathMasktest = svg.createPath(); 
                svg.path(masktest,pathMasktest.move(pointAx, pointAy).line(distance,0,1));
                svg.path(masktest,pathMasktest.move(pointAx, pointAy+largeurCote).line(0,-2*largeurCote,1));
                svg.path(masktest,pathMasktest.move(pointAx - (-distance), pointAy+largeurCote).line(0,-2*largeurCote,1));
                var result=Math.round(value*10)/10;
                this.createTextPath(pointAx+posTextex,pointAy-2+posTextey,distance,angle,"red", 0.2,result,"arial",5);
            } 
            
graphic.prototype.createLinePath = function(pointAx,pointAy,distance,angle,color, epaisseurTrait,marqueId){
                var svg = $('#svgbasics').svg('get');
                var group = svg.group(g,"groupLinePath",{fill: "none" , stroke: "none", strokeWidth: "0.2",transform:"translate("+transx+", "+transy+")"}); 
                var pathMasktest = svg.createPath(); 
                svg.path(group, pathMasktest.move(pointAx,pointAy).line(distance*Math.cos(degToRad(angle)),distance*Math.sin(degToRad(angle)),1), {id: marqueId}); 
                svg.use('#'+marqueId, {fill: "none", stroke: "none",transform:"translate("+transx+", "+transy+")"}); 
            }
            
graphic.prototype.createTextPath = function(pointAx,pointAy,distance,angle,color, epaisseurTrait,texte,police,taille){
                var marqueId = 'pathText'+pointAx;
                this.createLinePath(pointAx+(distance/2)*Math.cos(degToRad(angle)),pointAy+(distance/2)*Math.sin(degToRad(angle)),distance,angle,"none", epaisseurTrait,marqueId);
                var svg = $('#svgbasics').svg('get');
                //creation de la marque
                var text = svg.text(g,"", {id:"toto",fontFamily: police, fontSize: taille, fill: color, strokeWidth:epaisseurTrait,transform:"translate("+transx+", "+transy+")"}); 
                var texts = svg.createText(); 
                svg.textpath(text, '#'+marqueId, texts.string(texte)); 
            }
 
     
graphic.prototype.drawOreilleVueAvant = function(orix,oriy,b,h,diamTete,color1,color2,strokeColor,opacite,hauteurBande,largeurBande,profondeurEncoche){
                var ax = orix;
                var ay = oriy;
                var epaisseurBombe = -3;
                var epaisseurTete = Math.abs(epaisseurBombe);
                var decalagey = this.getHauteurCaps() - hauteurBande - largeurBande - epaisseurTete;
                var decalagex = Math.tan(b) * decalagey; 
                var svg = $('#svgbasics').svg('get');
                var defs = svg.defs(); 
                svg.linearGradient(defs, "Gradient", [["0%", color1,"100%"], ["100%", color2,"100%"]], ax, ay, ax+200, ay, {gradientUnits: "userSpaceOnUse"}); 
                
                var fillcolor = "url(#Gradient)";
                var angle1 = 60;
                var largeur1x = 2;
                var largeur1y =0;
                var largeur2x =  profondeurEncoche*Math.sin(degToRad(angle1));
                var largeur2y =  profondeurEncoche*Math.cos(degToRad(angle1));
                var largeur3x = 0;
                var largeur3y = largeurBande - profondeurEncoche*(Math.sin(degToRad(angle1))+Math.cos(degToRad(angle1))) ;
                var largeur4x = profondeurEncoche*Math.cos(degToRad(angle1));
                var largeur4y = profondeurEncoche*Math.sin(degToRad(angle1));
                var largeur5x = largeur1x+largeur2x+Math.tan(b)*largeurBande;
                var largeur5y = 0;
                
                var strokeThin =0.1;
                var mask = svg.group(g,"maskGroup",{fill:fillcolor , opacity:opacite ,stroke: strokeColor, strokeWidth: strokeThin,transform:"translate("+transx+", "+transy+")"});  //transform:"scale("+zoomx+","+zoomy+")"
                var pathMask = svg.createPath(); 
                svg.path(mask,pathMask.move(ax+decalagex, ay-decalagey).line(-largeur1x,largeur1y,1).line(-largeur2x,-largeur2y,1).line(largeur3x,-largeur3y,1).line(largeur4x,-largeur4y,1).line(largeur5x,largeur5y,1).close());
            }
            
graphic.prototype.drawOreilleVueArr = function(orix,oriy,b,h,diamTete,color1,color2,strokeColor,opacite,hauteurBande,largeurBande,profondeurEncoche){
                var ax = orix;
                var ay = oriy;
                var epaisseurBombe = -3;
                var epaisseurTete = Math.abs(epaisseurBombe);
                //var epaisseurTete = 3;
                var decalagey = this.getHauteurCaps() - hauteurBande - largeurBande - epaisseurTete;
                var decalagex = this.getDiamBase() - Math.tan(b) * decalagey -1; 
                var svg = $('#svgbasics').svg('get');
                var defs = svg.defs(); 
                svg.linearGradient(defs, "Gradient", [["0%", color1,"100%"], ["100%", color2,"100%"]], ax, ay, ax+200, ay, {gradientUnits: "userSpaceOnUse"}); 
                
                var fillcolor = color2;//url(#Gradient)";
                var angle1 = 60;
                var largeur1x = 2;
                var largeur1y =0;
                var largeur2x =  profondeurEncoche*Math.sin(degToRad(angle1));
                var largeur2y =  profondeurEncoche*Math.cos(degToRad(angle1));
                var largeur3x = 0;
                var largeur3y = largeurBande - profondeurEncoche*(Math.sin(degToRad(angle1))+Math.cos(degToRad(angle1))) ;
                var largeur4x = profondeurEncoche*Math.cos(degToRad(angle1));
                var largeur4y = profondeurEncoche*Math.sin(degToRad(angle1));
                var largeur5x = largeur1x+largeur2x+Math.tan(b)*largeurBande;
                var largeur5y = 0;
                
                var strokeThin =0.1;
                var mask = svg.group(g,"maskGroup",{fill:fillcolor ,opacity : opacite, stroke: strokeColor, strokeWidth: strokeThin,transform:"translate("+transx+", "+transy+")"});  //transform:"scale("+zoomx+","+zoomy+")"
                var pathMask = svg.createPath(); 
                svg.path(mask,pathMask.move(ax+decalagex, ay-decalagey).line(largeur1x,largeur1y,1).line(largeur2x,-largeur2y,1).line(largeur3x,-largeur3y,1).line(-largeur4x,-largeur4y,1).line(-largeur5x,largeur5y,1).close());
            }
            
graphic.prototype.drawVueLiseret = function(orix,oriy,b,h,diamTete,color1,color2,strokeColor,opacite,distBord,epaisseurLiseret){
                var ax = orix;
                var ay = oriy;
                var svg = $('#svgbasics').svg('get');
	
                var defs = svg.defs(); 
                //svg.linearGradient(defs, "Gradient", [[0, color1, 0], [1, color2, 1]], orix, oriy, orix+100, oriy, {gradientUnits: "userSpaceOnUse"}); 
                var fillcolor = color1;//"url(#Gradient)";
                var strokeColor = color1;
                var l1x = this.getDiamBase()- (distBord)*(Math.tan(b));
                var l1y = 0;
                var l2x = Math.tan(b)*(epaisseurLiseret);
                var l2y = epaisseurLiseret;
                var l3x = this.getDiamBase()- (distBord+epaisseurLiseret)*(Math.tan(b));
                var l3y = 0;
                var l4x = Math.tan(b)*(epaisseurLiseret);
                var l4y = epaisseurLiseret;
                var dx =  Math.tan(b)*(distBord);
                var strokeThin =0.1;
                var mask = svg.group(g,"maskGroup",{fill:fillcolor ,opacity:opacite, stroke: strokeColor, strokeWidth: strokeThin,transform:"translate("+transx+", "+transy+")"});  //transform:"scale("+zoomx+","+zoomy+")"
                var pathMask = svg.createPath(); 
                svg.path(mask,pathMask.move(ax+dx, ay-(distBord)).line(l1x,l1y,1).line(-l2x,-l2y,1).line(-l3x,l3y,1).line(-l4x,l4y,1).close());
            }
            

graphic.prototype.drawDev = function(ax,ay,r,a,h1,bord_liseret,hauteurDuBord,color1,color2,strokeColor,opacite){
                var svg = $('#svgbasics').svg('get');
                var defs = svg.defs(); 
                svg.linearGradient(defs, "Gradient", [["0%", color1,"100%"], ["100%", color2,"100%"]], ax, ay, ax, ay+3*h1/2, {gradientUnits: "userSpaceOnUse"}); 
                var fillcolor = "url(#Gradient)";
                var strokeThin =0.1;
                
                var mask = svg.group(g,"maskGroup",{fill:fillcolor,opacity:opacite,stroke: strokeColor, strokeWidth: strokeThin,transform:"translate("+transx+", "+transy+")"});
                /*for (var attrib in boxStyles) {
                        svg.use('#maskGroup', {attrib: boxStyles[attrib]});
			//this.textboxRect.setAttributeNS(null,attrib,this.boxStyles[attrib]);
		}*/
                var pathMask = svg.createPath(); 
                var largeurBandeDechirement = 23;
                var angleEncocheBande = 45;
                var longueurEncocheBande = 4;
                var hauteurBandeDechirement = 5;
                var haut = ay+h1-bord_liseret - hauteurDuBord;
                //svg.path(mask,pathMask.move(ax, haut).line(0,h1,1).curveQ(ps1x(r,a,hauteurDuBord), 0, calculG(r,a,hauteurDuBord),  - calculF(r,a,hauteurDuBord),1,0).line(-p2x(r,a,h1),-p2y(r,a,h1),1).curveQ( ax+ps1x(r,a,h1+hauteurDuBord),haut,ax,haut,0,0).line(0,0,1).close());	
                
                svg.path(mask,pathMask.move(ax, haut).line(0,hauteurBandeDechirement,1).line(longueurEncocheBande*Math.cos(degToRad(angleEncocheBande)),longueurEncocheBande*Math.sin(degToRad(angleEncocheBande)),1).line(-longueurEncocheBande*Math.cos(degToRad(angleEncocheBande)),longueurEncocheBande*Math.sin(degToRad(angleEncocheBande)),1).line(0,largeurBandeDechirement,1).line(longueurEncocheBande*Math.cos(degToRad(angleEncocheBande)),longueurEncocheBande*Math.sin(degToRad(angleEncocheBande)),1).line(-longueurEncocheBande*Math.cos(degToRad(angleEncocheBande)),longueurEncocheBande*Math.sin(degToRad(angleEncocheBande)),1).line(0,h1-largeurBandeDechirement-hauteurBandeDechirement-4*longueurEncocheBande*Math.sin(degToRad(angleEncocheBande)),1).curveQ(ps1x(r,a,hauteurDuBord), 0, calculG(r,a,hauteurDuBord),  - calculF(r,a,hauteurDuBord),1,0).line(-p2x(r,a,h1),-p2y(r,a,h1),1).curveQ( ax+ps1x(r,a,h1+hauteurDuBord),haut,ax,haut,0,0).line(0,0,1).close());	
            }
            
graphic.prototype.drawTireteDev = function(r,h,angle_dev,ax,ay,color1,epaisseur,hauteurBandeTiret){
                var svg = $('#svgbasics').svg('get');
                var group = svg.group(g,"tireteDevGroup",{fill:'none' , stroke: color1, strokeWidth: epaisseur,transform:"translate("+transx+", "+transy+")"});
                var pathMask = svg.createPath(); 
	
                var hauteurTiret = 2;
                var beta = 45;
                var largeurTiret = Math.sin(degToRad(beta));
                var intersticeTiret = 1;
                var nbrTirets = (r-h+hauteurBandeTiret)*angle_dev /(largeurTiret + intersticeTiret);
                var alpha = angle_dev/nbrTirets;
                var pasx ;
                var pasy ;
                var pasInclinaisonx ;
                var pasInclinaisony ;
                var dxTiret ;
                var dyTiret ;
          
                var pathMask = svg.createPath();
                var decalagex = 10;
                var decalagey= hauteurBandeTiret;
                for(var i= 2;i<nbrTirets;i++){
                    pasx = calculG(r,alpha*(i),h-decalagey);
                    pasy = calculF(r,alpha*(i),h-decalagey);
                    dxTiret = hauteurTiret*Math.sin(beta);
                    dyTiret = hauteurTiret*Math.cos(beta);
                    svg.path(group,pathMask.move(ax + pasx ,ay+ decalagey -pasy).line(dxTiret,dyTiret,1).close());//.arc(rayonCannelure, rayonCannelure,180, false, false, dxCannelure, -dyCannelure,true).line(-pasInclinaisonx,-pasInclinaisony,1).arc(rayonCannelure, rayonCannelure,180, false, false, -dxCannelure, dyCannelure,true).close(),{id:"toto"+i});
                }
            }
            
graphic.prototype.drawTireteVue = function(r,h,conicite,ax,ay,color1,epaisseur,hauteurBandeTiret){
                var svg = $('#svgbasics').svg('get');
                var mask = svg.group(g,"maskGroup",{fill:'none' , stroke: color1, strokeWidth: epaisseur,transform:"translate("+transx+", "+transy+")"});
                var pathMask = svg.createPath(); 
	
                var hauteurTiret = 2;
                var beta = 45;
                var largeurTiret = Math.sin(degToRad(beta));
                var intersticeTiret = 1;
                var rCone = this.getDiamTete()/(2*Math.sin(degToRad(conicite)));
                var nbrTirets = (rCone+hauteurBandeTiret)*2*Math.tan(degToRad(conicite)) /(largeurTiret + intersticeTiret);
                
                //var alpha = conicite/nbrTirets;
                var pasx ;
                var pasy ;
                //var pasInclinaisonx ;
                //var pasInclinaisony ;
                var dxTiret ;
                var dyTiret ;
          
                var pathMask = svg.createPath();
                var decalagex = 10;
                var decalagey= hauteurBandeTiret;
                ax = ax + (this.getHauteurCaps()-hauteurBandeTiret)*Math.tan(degToRad(conicite));// (rCone+decalagey)*Math.sin(degToRad(conicite)) - getDiamTete()/2;
                for(var i= 0;i<nbrTirets-2;i++){
                    pasx = i*(largeurTiret + intersticeTiret);
                    pasy = 0;//calculF(r,alpha*(i),h-decalagey);
                    dxTiret = hauteurTiret*Math.sin(beta);
                    dyTiret = hauteurTiret*Math.cos(beta);
                    //alert(radToDeg(alpha));
                    svg.path(mask,pathMask.move(ax + pasx ,ay+ decalagey -pasy).line(dxTiret,dyTiret,1).close());//.arc(rayonCannelure, rayonCannelure,180, false, false, dxCannelure, -dyCannelure,true).line(-pasInclinaisonx,-pasInclinaisony,1).arc(rayonCannelure, rayonCannelure,180, false, false, -dxCannelure, dyCannelure,true).close(),{id:"toto"+i});
                }
            }
graphic.prototype.drawCannelureVue = function(r,h,conicite,ax,ay,color1,epaisseur,hauteurBandeCannelure){
                var svg = $('#svgbasics').svg('get');
                var mask = svg.group(g,"maskGroup",{fill:'none' , stroke: color1, strokeWidth: epaisseur,transform:"translate("+transx+", "+transy+")"});
                var pathMask = svg.createPath(); 
	
                var hauteurCannelure = 25;
                var largeurCannelure = 3;
                var intersticeCannelure = 2;
                var rCone = this.getDiamTete()/(2*Math.sin(degToRad(conicite)));
                var nbrCannelures =(rCone+hauteurBandeCannelure-2)*2*Math.tan(degToRad(conicite)) /(largeurCannelure + intersticeCannelure);
                //var nbrCannelures = degToRad(2*conicite)*(rCone) /(largeurCannelure + intersticeCannelure);
                var alpha = degToRad(2*conicite/nbrCannelures);
                var pasx ;
                var pasy ;
                var pasInclinaisonx ;
                var pasInclinaisony ;
                var dxCannelure ;
                var dyCannelure ;
                var rayonCannelure = largeurCannelure/2;
                ax = ax + (this.getHauteurCaps()-hauteurBandeCannelure)*Math.tan(degToRad(conicite)); //(rCone+hauteurBandeCannelure+0.5*hauteurCannelure)*Math.sin(degToRad(conicite)) - getDiamTete()/2;
                
                var pathMask = svg.createPath();
                for(var i= 0;i<nbrCannelures;i++){
                    pasx = i*(largeurCannelure + intersticeCannelure);//(rCone+hauteurBandeCannelure+0.5*hauteurCannelure)*Math.sin(alpha*i);
                    pasy = 0;
                    pasInclinaisonx = 0;//hauteurCannelure*Math.sin(alpha*i);
                    pasInclinaisony = hauteurCannelure;//*Math.cos(alpha*i);
                    dxCannelure = largeurCannelure;//*Math.cos(alpha*i);
                    dyCannelure = 0;//largeurCannelure*Math.sin(alpha*i);
                    svg.path(mask,pathMask.move(ax + pasx ,ay+ hauteurBandeCannelure -pasy).line(pasInclinaisonx,pasInclinaisony,1).arc(rayonCannelure, rayonCannelure,180, false, false, dxCannelure, -dyCannelure,true).line(-pasInclinaisonx,-pasInclinaisony,1).arc(rayonCannelure, rayonCannelure,180, false, false, -dxCannelure, dyCannelure,true).close(),{id:"toto"+i});
                    //svg.path(mask,pathMask.move(ax + pasx ,ay+ hauteurBandeCannelure -pasy).line(pasInclinaisonx,pasInclinaisony,1).arc(rayonCannelure, rayonCannelure,180, false, false, dxCannelure, -dyCannelure,true).line(-pasInclinaisonx,-pasInclinaisony,1).arc(rayonCannelure, rayonCannelure,180, false, false, -dxCannelure, dyCannelure,true).close(),{id:"toto"+i});
                }    
            }
            
            
graphic.prototype.drawCannelureDev = function(r,h,angle_dev,ax,ay,color1,epaisseur,hauteurBandeCannelure){
                var svg = $('#svgbasics').svg('get');
                var group = svg.group(g,"canneDevGroup",{fill:'none' , stroke: color1, strokeWidth: epaisseur,transform:"translate("+transx+", "+transy+")"});
                var pathMask = svg.createPath(); 
	
                var hauteurCannelure = 25;
                var largeurCannelure = 3;
                var intersticeCannelure = 2;
                var nbrCannelures = (r-h)*angle_dev /(largeurCannelure + intersticeCannelure);
                var alpha = angle_dev/nbrCannelures;
                var pasx = calculG(r,alpha,h);
                var pasy = 0;
                var pasInclinaisonx ;
                var pasInclinaisony ;
                var dxCannelure ;
                var dyCannelure ;
                var rayonCannelure = largeurCannelure/2;
                var pathMask = svg.createPath();
                for(var i= 1;i<nbrCannelures;i++){
                    pasx = calculG(r,alpha*(i),h-hauteurBandeCannelure);
                    pasy = calculF(r,alpha*(i),h);
                    pasInclinaisonx = hauteurCannelure*Math.sin(alpha*i);
                    pasInclinaisony = hauteurCannelure*Math.cos(alpha*i);
                    dxCannelure = largeurCannelure*Math.cos(alpha*i);
                    dyCannelure = largeurCannelure*Math.sin(alpha*i);
                    svg.path(group,pathMask.move(ax + pasx ,ay+ hauteurBandeCannelure -pasy).line(pasInclinaisonx,pasInclinaisony,1).arc(rayonCannelure, rayonCannelure,180, false, false, dxCannelure, -dyCannelure,true).line(-pasInclinaisonx,-pasInclinaisony,1).arc(rayonCannelure, rayonCannelure,180, false, false, -dxCannelure, dyCannelure,true).close(),{id:"toto"+i});
               }
            }
            
graphic.prototype.drawLiseret = function(ax,ay,r,a,h1,largeurLiseret,hauteurBord,couleurLiseret1,couleurLiseret2,strokeLiseret,opacite){
                var strokeThin =1;
                var hauteurDuBord = hauteurBord;
                var fillcolor = couleurLiseret1;//"url(#Gradient)";
                var strokeThin =0;
                var svg = $('#svgbasics').svg('get');
                var mask = svg.group(g,"maskGroup",{fill:fillcolor , opacity:opacite,stroke: couleurLiseret1, strokeWidth: strokeThin,transform:"translate("+transx+", "+transy+")"});  //transform:"scale("+zoomx+","+zoomy+")"
                var pathMask = svg.createPath(); 
	
                var haut = ay+h1-largeurLiseret - hauteurDuBord;
                svg.path(mask,pathMask.move(ax, haut).line(0,largeurLiseret,1).curveQ(ps1x(r,a,hauteurDuBord), 0, calculG(r,a,hauteurDuBord),  - calculF(r,a,hauteurDuBord),1,0).line(-p2x(r,a,largeurLiseret),-p2y(r,a,largeurLiseret),1).curveQ( ax+ps1x(r,a,largeurLiseret+hauteurDuBord),haut,ax,haut,0,0).line(0,0,1).close());	
            }


function seek (el){
    var length = el.childNodes.length;

    if (length==0)
        return 0;
    
    for(i=0;i<length;i++){
        if((el.childNodes.item(i).nodeName=='g') || (el.childNodes.item(i).nodeName=='path')){
            console.log("value ="+el.childNodes.item(i).getAttributeNS(null, 'id'));
            var color = el.childNodes.item(i).getAttributeNS(null, 'style');
            if(color != null){
                var val = color.split(":");
                console.log("color ="+val[1]);
            }
            if(seek(el.childNodes.item(i))==0){
                //console.log("type ="+el.childNodes.item(i).nodeType);
                //console.log("name ="+el.childNodes.item(i).nodeName);
                //console.log("value ="+el.childNodes.item(i).nodeValue);
            }
        }
   }
}
function setColorLogo (el,colorValue){
    var length = el.childNodes.length;

    if (length==0)
        return 0;
    
    for(i=0;i<length;i++){
        if((el.childNodes.item(i).nodeName=='g') || (el.childNodes.item(i).nodeName=='path')){
            console.log("value ="+el.childNodes.item(i).getAttributeNS(null, 'id'));
            var color = el.childNodes.item(i).getAttributeNS(null, 'style');
            if(color != null){
                var val = color.split(":");
                if(val[0]=="fill")
                    el.childNodes.item(i).setAttributeNS(null, "style","fill:"+colorValue);
                //console.log("color ="+val[1]);
            }
            if(setColorLogo(el.childNodes.item(i))==0){
                //console.log("type ="+el.childNodes.item(i).nodeType);
                //console.log("name ="+el.childNodes.item(i).nodeName);
                //console.log("value ="+el.childNodes.item(i).nodeValue);
            }
        }
   }
}

graphic.prototype.displayLogo = function(ax,ay,color,index,opacite,scaleValue,widthStroke,urlFile,angleDev,bCenter){
                var svg = $('#svgbasics').svg('get');
                    if(tabLogo[index]!=""){
                        //petit hack pour avoir la valeur de diamBase
                        var diamBase = parseInt(this.getDiamBase());
                        $.get(urlFile, null, function(data) {
                        tabLogo[index] = data.documentElement;
                        var w = tabLogo[index].getAttributeNS(null, 'width');
                        var h = tabLogo[index].getAttributeNS(null, 'height');
                        //var color = tabLogo[index].getAttributeNS(null, 'fill');
                        console.log("width ="+w*scaleValue);
                        console.log("height ="+h*scaleValue); 
                        //seek(tabLogo[index]);
                        setColorLogo(tabLogo[index],color);
                        var posx;
                        var posy;
                        
                        if(bCenter==1){
                            posx = ax-(w*scaleValue/2) + (diamBase)/2;
                            posy = ay-(h*scaleValue);
                        }else{
                            posx = ax;
                            posy = ay-(h*scaleValue);
                        }
                        
                        var group = svg.group(g,"logo"+index,{fill:color ,opacity : opacite, stroke: color, strokeWidth: widthStroke,transform:"translate("+posx+", "+posy+") translate("+translogox+", "+translogoy+") scale("+scaleValue+") rotate("+(-angleDev)+" "+ax+" "+ay+")"});
                        svg.add(group,tabLogo[index],{id:"logo"+index});
                    }, 'xml');
                    }
                                    
                    $("#logo"+index, svg.root()).bind('click', svgClicked). bind('mouseover', svgOver).bind('mouseout', svgOut); 
            }
            


graphic.prototype.displayLogoDev = function(ax,ay,color,distanceBord,index,opacite,scaleValue,urlFile,angleDev,fx,fy){
                var svg = $('#svgbasics').svg('get');
                    if(tabLogo[index]!=""){
                        $.get(urlFile, null, function(data) {
                        tabLogo[index] = data.documentElement;
                        var w = tabLogo[index].getAttributeNS(null, 'width');
                        var height = tabLogo[index].getAttributeNS(null, 'height');
                        //seek(tabLogo[index]);
                        setColorLogo(tabLogo[index],color);
                        /*
                          
                         var length = tabLogo[index].childNodes.length;
                        for(i=0;i<length;i++){
                            console.log("type ="+tabLogo[index].childNodes.item(i).nodeType);
                            console.log("name ="+tabLogo[index].childNodes.item(i).nodeName);
                            console.log("value ="+tabLogo[index].childNodes.item(i).nodeValue);
                            if(tabLogo[index].childNodes.item(i).nodeName=='g'){
                                var color = tabLogo[index].childNodes.item(i).getAttributeNS(null, 'fill');
                                console.log("color ="+color);
                            }
                        }
                        */
                        var posx = ax-(w*scaleValue/2) ;
                        var posy = ay-(height*scaleValue);
                        
                        //var group = svg.group(g,"logo"+index,{fill:'none' , opacity:opacite,stroke: 'black', strokeWidth: '0',transform:" translate("+translogox+", "+translogoy+") rotate("+(-angleDev)+" "+fx+" "+fy+") translate("+posx+", "+posy+") scale("+scaleValue+")"});//rotate("+(-angleDev)+" "+ax+" "+ay+")scale("+scaleValue+")
                        var group = svg.group(g,"logo"+index,{fill:color , opacity:opacite,stroke: color, strokeWidth: '0',transform:" translate("+translogox+", "+translogoy+") rotate("+(-angleDev)+" "+fx+" "+fy+") translate("+posx+", "+posy+") scale("+scaleValue+")"});//rotate("+(-angleDev)+" "+ax+" "+ay+")scale("+scaleValue+")
                        svg.add(group,tabLogo[index],{id:"logo"+index});
                    }, 'xml');
                    }
                                    
                    $("#logo"+index, svg.root()).bind('click', svgClicked). bind('mouseover', svgOver).bind('mouseout', svgOut); 
            }
            
graphic.prototype.calculPrimaires = function(diamTete,hauteurCaps,b_degre,b_min){
                var b_deg = (((b_min/60)*100)/100 - (-b_degre));
                var b_rad = degToRad(b_deg);
	
                var diamBase = 	(diamTete -(-2*hauteurCaps*Math.tan(b_rad)));
                var a = Math.PI*Math.cos(b_rad)*(diamBase-diamTete)/hauteurCaps;//conicité développée
                var h1 = hauteurCaps/Math.cos(b_rad);
                var r = Math.PI*diamBase/a;
	
                primaire[0] = diamBase;
                primaire[1] = a;
                primaire[2] = h1;
                primaire[3] = r;
                primaire[4] = b_deg;
                primaire[5] = b_rad;
                primaire[6] = diamTete;
                primaire[7] = hauteurCaps;
            }

graphic.prototype.getDiamBase = function(){
                return primaire[0];
            }

graphic.prototype.getAngleDev = function(){
                return primaire[1];
            }

graphic.prototype.getHauteurDev = function(){
                return primaire[2];
            }

graphic.prototype.getRayonDev = function(){
                return primaire[3];
            }
            
graphic.prototype.getConicityDeg = function(){
                return primaire[4];
            }
            
graphic.prototype.getConicityRad = function(){
                return primaire[5];
            }
            
graphic.prototype.getDiamTete = function(){
                return primaire[6];
            }
            
graphic.prototype.getHauteurCaps = function(){
                return primaire[7];
            }

graphic.prototype.setOrigin = function(){
                x0 = 5;
                y0 = (-this.getRayonDev()+this.getHauteurDev()+35) ;	
            }

graphic.prototype.getOriX = function(){
                return x0;	
            }

graphic.prototype.getOriY = function(){
                return y0;
            }
            
graphic.prototype.updateViewBox = function(){	
                var svg = $('#svgbasics').svg('get');
                svg.configure({viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh})
            }


            
graphic.prototype.xcoord=function(cote,distBord,texte,police,couleur,taille,epaisseurTrait,a,r,ax,ay,fx,fy){
                var alpha = (4-cote)*(a)/4;
                var ex = ax + calculG(r,alpha,distBord);
                return ex;
                
            }
graphic.prototype.ycoord = function(cote,distBord,texte,police,couleur,taille,epaisseurTrait,a,r,ax,ay,fx,fy){
                var alpha = (4-cote)*(a)/4;
                var h = this.getHauteurDev();
                var ey = ay + h - distBord - calculF(r,alpha,distBord);
                return ey;
            }
            
