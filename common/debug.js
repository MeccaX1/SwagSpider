/* <div style="width:75px; position:absolute; right:0px; padding:10px; background-color:gray;">
		carta 1 <br>
		box:&nbsp&nbsp <input style="width:25px" type="text" id="c1b"> <br>
		carta: <input style="width:25px" type="text" id="c1"> <br>
		carta 2 <br>
		box:&nbsp&nbsp <input style="width:25px" type="text" id="c2b"> <br>
		carta: <input style="width:25px" type="text" id="c2"> <br>
		<button onclick="scambiacarte()"> SCAMBIA </button>
	</div> */

var HTMLdebug='<div style="width:75px; position:absolute; right:0px; padding:10px; background-color:gray;"> carta 1 <br> box:&nbsp&nbsp <input style="width:25px" type="text" id="c1b"> <br> carta: <input style="width:25px" type="text" id="c1"> <br> carta 2 <br> box:&nbsp&nbsp <input style="width:25px" type="text" id="c2b"> <br> carta: <input style="width:25px" type="text" id="c2"> <br> <button onclick="scambiacarte()"> SCAMBIA </button> </div> ';
function loaddebug() { if($("#debug input").val()=="ignazio") $("body").append(HTMLdebug); }

function set_Hid(carta,id) { $(carta).attr("id",id); }
function get_val(campo) { return parseInt($(campo).val()); }
function scambiacarte() {
	var carta1=$("li:nth-child("+get_val($("#c1b"))+")").children(":nth-child("+get_val($("#c1"))+")");
	var carta2=$("li:nth-child("+get_val($("#c2b"))+")").children(":nth-child("+get_val($("#c2"))+")");
	
	var tmpHid=get_Hid(carta1);
	set_Hid(carta1,get_Hid(carta2));
	set_Hid(carta2,tmpHid);
	
	assegnaimg(carta1,get_Hid(carta1));
	assegnaimg(carta2,get_Hid(carta2));
}