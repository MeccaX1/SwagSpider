function relativetoabsolute(carta) {
	var aleft=$(carta).parent().offset().left;
	var atop=$(carta).parent().offset().top;
	if(carte[get_Hid(carta)].ishidden) atop+=numcarteprec(carta)*dim.cardshift;
	$(carta).css({"left":aleft,"top":atop});
}

function animascala(carta) {
	gira(carta);
	$(carta).css("position","fixed");
	relativetoabsolute(carta);
	$(carta).animate({left: $("#scala").offset().left,top: $("#scala").offset().top},100,function(){
		carta=$(this).prev();
		$(this).appendTo("#scala");
		$(this).css("position","relative");
		$(this).css({left:0,top:dim.topover(this)});
		if(carte[get_Hid(this)].id==13) {
			if(exist(carta) && carte[get_Hid(carta)].ishidden) gira(carta); //scopre carta prima
			return;
		}
		animascala(carta);	
	});
}
function animadistribuzione(carta,li) {
	gira(carta);
	$(carta).css({"z-index":1,"position":"fixed"});
	relativetoabsolute(carta);
	$(carta).appendTo(li);
	$(carta).animate({left: $(li).offset().left,top: $(li).offset().top+(numcarteprec(carta)*dim.cardshift)},100,function(){	
		$(this).css({"z-index":0,"position":"relative"});
		$(this).css({"left":0,"top":dim.topshift(this)});
		li=$(li).next(); if(exist(li)) animadistribuzione($("#mazzo").children().last(),li);	
	});
}