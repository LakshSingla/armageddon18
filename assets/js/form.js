var open = false;
function initEventListeners(){
	$('#register-tab li').click(function(){
		loadForm(this.getAttribute("data"))
	})
	$('.link').click(function(e){
		
		var data = this.getAttribute("data");
		
		if(data == "home"){
			$("#body").html(templates['about'])
			hideCanvas();
			hideForm();
		}else{
			
			
			if(data=="bits" || data=="others"){
				loadForm(data)
			}else{
				loadCanvas(templates[data].valueOf(), data)
				if(data == "game-menu"){
					setGameMenuEventListeners();
				}
			}
			
			if(window.innerWidth <= 768){
				closeMenu();
			}

		}
	})
	$('.form').click((e)=>{
		if($('.form input').index(e.target) == -1)
			updateFocus()
	})
	$('.form select').on("change", function(e){
		setGame(this.value)
	})

	$('#ham').click(()=>{
		open = !open;
		if(open)openMenu();
		else closeMenu();
	})

	$("#cross").click(()=>{
		$("#cross").fadeOut();
		hideCanvas();
		hideForm();
	})

	$("#submit").click(submitForm)

	setGameMenuEventListeners();


}


function openMenu(){

	$("#menu").removeClass("hidden-menu")
	$("#menu").fadeIn();
}
function closeMenu(){
	$("#menu").fadeOut();

	setTimeout(()=>($("#menu").addClass("hidden-menu")), 400);
}

function loadForm(mode){
	hideCanvas();
	console.log(mode)
	console.log($("#menu")[0].offsetHeight)
	if(window.innerWidth > 768){
		$('.form').css('top', $("#menu")[0].offsetHeight)
		
	}else{
		$('.form').css('top', 0)
		$('.form').css('height', window.innerHeight);
		$('#cross').fadeIn();
		$('.secondary').css('pointer-events', 'initial');
	}
	$('.form')[0].setAttribute("data", mode);
	
	setGame(1);
	$('.form').removeClass("hidden");
}

function hideForm(){
	$('.form').css('top', '100%')
	$('.secondary').css('pointer-events', 'none');
	setTimeout(()=>{$('.form').addClass("hidden")}, 1000);
}

function loadCanvas(html, name){

	hideForm();
	$('.canvas').html(html);
	if(window.innerWidth> 768){
		$('.canvas').css('top', $("#menu")[0].offsetHeight)
		$('.canvas').css('height', window.innerHeight - $("#menu")[0].offsetHeight);
	}else{
		$('.canvas').css('top', 0)
		$('.canvas').css('height', window.innerHeight);
		$('#cross').fadeIn();
		$('.secondary').css('pointer-events', 'initial');
	}
	$('.canvas').removeClass("hidden");
	$('.canvas')[0].setAttribute("data", name);
}

function hideCanvas(){
	$('.canvas').css('top', '100%')
	$('.secondary').css('pointer-events', 'initial');
	setTimeout(()=>{$('.canvas').addClass("hidden")}, 1000);
}

function updateFocus(){
	
	$('.form .clicked').each(function(i, el){
		
		if(el.querySelector("input") && el.querySelector("input").value == ""){
			$(el).removeClass("clicked");
			console.log(el)
			
		}
	})
}

function setGame(id){

	var count = formData[id].no_of_participants;
	var html = "";
	var mode = $('.form')[0].getAttribute("data");
	
	(new Array(count)).fill(0).map((_, i)=>{
		html += createGroup(mode, i);
	});
	$('.form .group').html(html)
	$('.form')[0].setAttribute("nop", count);
	setInputEventListener();
}

function createGroup(mode, i){
	var html = "<p>Member "+ (i+1) +"</p>";
	if(mode=="bits"){
		
		html += createField("Email", "email" + i);
		html += createField("Phone", "phone"+ i, (type, e)=>{
			if(type == "label"){
				
				return e + "<label>+91-</label>"
			}
			return e;
		});
	}else{
		html += createField("Email", "email"+ i);
	}
	return html;
}

function createField(label, name, wrapper=(t, e)=>e){
	var str = '<div class="field">'
	str += wrapper("label", '<label>' + label + '</label>')
	str += wrapper("input", '<input name="' + name + '" type="text">')
	str += '</div>'
	return str
}

function setInputEventListener(){
	$('.form input').on("focus", function(e){
		updateFocus();
		$(this).closest('.field').addClass("clicked");
	})

}


function submitForm(e){
	e.preventDefault();
	var data_ = getFormObj($(".form form"));
	

	var j = $('.form')[0].getAttribute("nop");
	
	data_.email_list = [];
	var bitsMode = ($('.form')[0].getAttribute("data") == "bits");
	if(bitsMode)data_.phone_list = [];
	for(var i = 0; i< j; i++){
		
		data_.email_list.push(data_["email" + i]);
		if(bitsMode){
			data_.phone_list.push(data_["phone" + i]);
		}
	}
	if(data_.team_name.length > 30){
		showMsg("Team name should be less than 30 charecters");
		return;
	}
	
	if(bitsMode){
		for(var i of data_.phone_list){
			
			if(isNaN(parseInt(i)) || i.length < 10){
				showMsg("Please enter valid phone numbers");
				return;
			}
		}
	}
	
	var url = base_url;
	if(bitsMode)url+="register_team_bitsian/";
	else url+="register_team_non_bitsian/";
	var dataString = JSON.stringify(data_);
	
	$.ajax({
		url,
		method: "POST",
		data: dataString,
		success: function(data){
			
			showMsg(data.message);
		}
	})
}


function showMsg(text){
	$("#msg").html(text);
	$("#msg").fadeIn()
	setTimeout(()=>{$("#msg").fadeOut()}, 5000)
}

function getFormObj(ele){
	
	var obj = {};
	if($(ele).hasClass("field")){
		var e;
		if($(ele).has("input").length > 0){
			e = $(ele).find("input");
		}
		else{
			e = $(ele).find("select");
		}
		obj[e[0].name] = e[0].value;
		return obj;
	}

	Array.prototype.forEach.call($(ele).children(), function(el, i){
		obj = Object.assign(
			obj,
			(getFormObj(el))
			)
	})
	return obj;
}