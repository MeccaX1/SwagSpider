	var contmosse=0; var contscale=8;
	var numcarte=13*contscale;

	var carte;
	var cartamossa,altrecarte; var move;

	var dim;
	function dimension() {
		this.h=$("li").height();
		this.w=$("li").width();
		this.cardshift=this.h/100*18;
		this.topshift=function(carta) { return ( 0-(numcarteprec(carta)*(this.h-this.cardshift)) ); };
		this.topover=function(carta) { return ( 0-(numcarteprec(carta)*this.h) ); };
	}

	function carta(id,seme) { //classe carta (da non confondere con la variabile "carta" che punta ad un oggetto HTML!)
		this.id=id;
		this.seme=seme;
		this.ishidden=true;
	}
	
	function assegnaimg(carta,Hid) { $(carta).children().attr("src",numtosrc(carte[Hid])); }
	function numcarteprec(carta) { return $(carta).prevAll().length; }
	function get_Hid(carta) { return parseInt($(carta).attr("id")); } //returna l'HTML-id della carta (che identifica la carta nell'array)
	function exist(obj) { return $(obj).length; } //returna true se esiste
	function gira(carta) {
		var tmpHid=get_Hid(carta);
		if(carte[tmpHid].ishidden) carte[tmpHid].ishidden=false;
		else carte[tmpHid].ishidden=true;
		assegnaimg(carta,tmpHid);
	}

	function follow(e) {
		if(move) {
			$(cartamossa).css("z-index",1); //le carte mosse stanno sopra a tutto
			$(cartamossa).offset({top:(e.pageY-dim.h/2),left:(e.pageX-dim.w/2)});

			var carteprec=1;
			$(altrecarte).each(function() {
				$(this).css("z-index",carteprec+1);
				$(this).offset({top:(e.pageY-dim.h/2+carteprec*dim.cardshift),left:(e.pageX-dim.w/2)});
				carteprec++;
			});
		}
	}

	function stick() {
		//calcola il box più vicino a dove è stata rilasciata la carta
		var distmin=Math.abs($(cartamossa).offset().left-$("li:first-child").offset().left);
		var closestbox=$("li:first-child");
		$("li:not(:first-child)").each(function() {
			var distofthis=Math.abs($(cartamossa).offset().left-$(this).offset().left);
			if(distofthis<distmin) {
				distmin=distofthis;
				closestbox=this;
			}
		});

		//controlla che la carta possa effetivamente essere posata nel suddetto box
		if( !exist($(closestbox).children()) || carte[get_Hid(cartamossa)].id == carte[get_Hid($(closestbox).children().last())].id-1 ) {
			if(exist($(cartamossa).prev()) && carte[get_Hid($(cartamossa).prev())].ishidden) gira($(cartamossa).prev()); //gira, se esiste, la carta prima di quella mossa
			$(cartamossa).appendTo(closestbox); 
			$(altrecarte).appendTo(closestbox);
			contmosse++; $("#contmosse").text("mosse: " + contmosse);
		}

		//posizionamento carta nel suddetto box o nel box originario
		$(cartamossa).css("z-index",0);
		$(cartamossa).css({"left":0,"top":dim.topshift(cartamossa)});
		$(altrecarte).css("z-index",0);
		$(altrecarte).each(function() { $(this).css({"left":0,"top":dim.topshift(this)}); });

		checkscala();
	}

	function checkscala() {
		var cartatmp=$("li").has(cartamossa).children().last(); //presunto asso
		if(carte[get_Hid(cartatmp)].id==1) { //se è un asso
			var seme=carte[get_Hid(cartatmp)].seme; cartatmp=$(cartatmp).prev(); var cont=2; 
			while(exist(cartatmp) && !carte[get_Hid(cartatmp)].ishidden && cont<=13) { //controllo tutte le carte sopra l'asso
				if(carte[get_Hid(cartatmp)].seme!=seme || carte[get_Hid(cartatmp)].id!=cont) return;
				cont++; if(cont>13) continue;
				cartatmp=$(cartatmp).prev();
			} 
			if(cont<=13) return;

			cartatmp=$(cartatmp).nextAll().last();
			animascala(cartatmp);
			contscale--; $("#contscale").text("scale rimanenti: " + contscale);
			if(contscale==0) setTimeout(function(){ 
				alert("HAI VINTO!\nmosse totali: " + contmosse);
				if(confirm("vuoi iniziare una nuova partita?")) window.open(window.location,'_self');
			}, 2000);	
		}
	}

	function mescola() {
		var index = carte.length; var newindex; var cartatmp;
		while (index!=0) {
			newindex = Math.floor(Math.random() * carte.length); //altro modo di mescolare è ' [...] * index); '
			index--;
			
			cartatmp=Object.assign({}, carte[newindex]);
			carte[newindex]=carte[index];
			carte[index]=cartatmp;
		}
	}

	function genera_id(num) {
		if(num%13==0) return 13;
		else return (num%13);
	}

	function numtosrc(carta) { //calcola percorso immagine
		var percorso="carte/"; var ext=".svg";

		if(carta.ishidden) return (percorso+"cover.png");
		switch(carta.seme) {
			case 'P': {
				percorso+="picche/";
				switch(carta.id) {
					case 1: percorso+="ace_of_spades"; break;
					case 2: percorso+="2_of_spades"; break;
					case 3: percorso+="3_of_spades"; break;
					case 4: percorso+="4_of_spades"; break;
					case 5: percorso+="5_of_spades"; break;
					case 6: percorso+="6_of_spades"; break;
					case 7: percorso+="7_of_spades"; break;
					case 8: percorso+="8_of_spades"; break;
					case 9: percorso+="9_of_spades"; break;
					case 10: percorso+="10_of_spades"; break;
					case 11: percorso+="jack_of_spades"; break;
					case 12: percorso+="queen_of_spades"; break;
					case 13: percorso+="king_of_spades"; break;
					default: alert("id carta non previsto!"); break;
				} break;
			}
			case 'C': {
				percorso+="cuori/";
				switch(carta.id) {
					case 1: percorso+="ace_of_hearts"; break;
					case 2: percorso+="2_of_hearts"; break;
					case 3: percorso+="3_of_hearts"; break;
					case 4: percorso+="4_of_hearts"; break;
					case 5: percorso+="5_of_hearts"; break;
					case 6: percorso+="6_of_hearts"; break;
					case 7: percorso+="7_of_hearts"; break;
					case 8: percorso+="8_of_hearts"; break;
					case 9: percorso+="9_of_hearts"; break;
					case 10: percorso+="10_of_hearts"; break;
					case 11: percorso+="jack_of_hearts"; break;
					case 12: percorso+="queen_of_hearts"; break;
					case 13: percorso+="king_of_hearts"; break;
					default: alert("id carta non previsto!"); break;
				} break;
			}
			case 'Q': {
				percorso+="quadri/";
				switch(carta.id) {
					case 1: percorso+="ace_of_diamonds"; break;
					case 2: percorso+="2_of_diamonds"; break;
					case 3: percorso+="3_of_diamonds"; break;
					case 4: percorso+="4_of_diamonds"; break;
					case 5: percorso+="5_of_diamonds"; break;
					case 6: percorso+="6_of_diamonds"; break;
					case 7: percorso+="7_of_diamonds"; break;
					case 8: percorso+="8_of_diamonds"; break;
					case 9: percorso+="9_of_diamonds"; break;
					case 10: percorso+="10_of_diamonds"; break;
					case 11: percorso+="jack_of_diamonds"; break;
					case 12: percorso+="queen_of_diamonds"; break;
					case 13: percorso+="king_of_diamonds"; break;
					default: alert("id carta non previsto!"); break;
				} break;
			}
			case 'F': {
				percorso+="fiori/";
				switch(carta.id) {
					case 1: percorso+="ace_of_clubs"; break;
					case 2: percorso+="2_of_clubs"; break;
					case 3: percorso+="3_of_clubs"; break;
					case 4: percorso+="4_of_clubs"; break;
					case 5: percorso+="5_of_clubs"; break;
					case 6: percorso+="6_of_clubs"; break;
					case 7: percorso+="7_of_clubs"; break;
					case 8: percorso+="8_of_clubs"; break;
					case 9: percorso+="9_of_clubs"; break;
					case 10: percorso+="10_of_clubs"; break;
					case 11: percorso+="jack_of_clubs"; break;
					case 12: percorso+="queen_of_clubs"; break;
					case 13: percorso+="king_of_clubs"; break;
					default: alert("id carta non previsto!"); break;
				} break;
			}
			default: alert("seme carta non previsto!"); break;
		}
		return (percorso+ext);
	}

	function loadHTML() { //creazione HTML delle carte
		var cont=0; var htmlcarta='<div class="cont_carta"><img class="carta"></img></div> ';

		$("li").each(function() { //creazione carte box
			for(var i=0;i<5;i++) {
				if(i==4 && $(this).index()>3) continue; //nei primi 4 box ci sono 6 carte, negli altri 5
				$(this).append(htmlcarta);
				cartamossa=$(this).children().last();
				$(cartamossa).attr("id",cont);
				$(cartamossa).css({"left":0,"top":dim.topshift(cartamossa)});
				assegnaimg(cartamossa,cont);
				cont++;
			}
		});

		for(var i=cont;i<numcarte;i++) { //creazione carte mazzo
			$("#mazzo").append(htmlcarta);
			cartamossa=$("#mazzo").children().last();
			$(cartamossa).attr("id",i);
			$(cartamossa).css({"left":0,"top":dim.topover(cartamossa)});
			assegnaimg(cartamossa,i);
		}
		animadistribuzione($("#mazzo").children().last(),$("li").first());
	}

	function loadEvents() {
		$("body").on('dragstart selectstart',function(){ return false; }); //evita bug da selezione
		$(document).on('mousemove',follow);
		$(".cont_carta").on('mousedown',function(){
			cartamossa=this;
			if(!carte[get_Hid(cartamossa)].ishidden){
				var blocco=false; var seme=carte[get_Hid(cartamossa)].seme;
				altrecarte=$(cartamossa).nextAll();
				$(altrecarte).each(function() { if(carte[get_Hid(this)].seme != seme || carte[get_Hid(this)].id != carte[get_Hid($(this).prev())].id-1) blocco=true; });
				if(!blocco) move=true;
			}
		});
		$(".cont_carta").on('mouseup',function(){ if(move) { move=false; stick(); } });
		$("#mazzo").click(function(){ if(exist($("#mazzo").children())) animadistribuzione($("#mazzo").children().last(),$("li").first()); });
	}

	function start() {
		dim= new dimension();
		carte= new Array();
		for(var i=0;i<numcarte;i++) { //genera mazzo
			if (i<numcarte/4) carte[i]= new carta(genera_id(i+1),'P');
			else if (i<numcarte/2) carte[i]= new carta(genera_id(i+1),'C');
			else if (i<(numcarte/2+numcarte/4)) carte[i]= new carta(genera_id(i+1),'F');
			else carte[i]= new carta(genera_id(i+1),'Q');
		}
		mescola(); //mescola mazzo

		loadHTML();
		loadEvents(); //eventi richiamati dopo la generazione delle carte (altrimenti non sono assegnati)
}