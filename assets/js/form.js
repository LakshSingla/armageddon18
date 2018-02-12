var open = false;
function initEventListeners(){
	$('#register-tab li').click(function(){
		loadForm(this.getAttribute("data"))
	})
	$('.link').click(function(e){
		console.log("click")
		var data = this.getAttribute("data");
		console.log(data)
		if(data == "home"){
			$("#body").html(templates['about'])
			hideCanvas();
			hideForm();
		}else{
			
			
			if(data=="bits" || data=="others"){
				loadForm(data)
			}else{
				loadCanvas(templates[data].valueOf(), data)
			}
			console.log(window.innerWidth <= 768);
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
		$('.form')[0].setAttribute("data", mode);
	}else{
		$('.form').css('top', 0)
		$('.form').css('height', window.innerHeight);
		$('#cross').fadeIn();
		$('.secondary').css('pointer-events', 'initial');
	}
	// $('.form').css('top', '0')
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
	console.log("updare")
	$('.form .clicked').each(function(i, el){
		
		if(el.querySelector("input") && el.querySelector("input").value == ""){
			$(el).removeClass("clicked");
			console.log(el)
			$(el)[0].querySelector("input").setAttribute("placeholder","");
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
		
		html += createField("Email", "email" + i, "");
		html += createField("Phone", "phone"+ i, "+91");
	}else{
		html += createField("Email", "email"+ i, "");
	}
	return html;
}

function createField(label, name, placeholderData){
	return '<div class="field">\
	<label>' + label + '</label>\
	<input name="' + name + '" type="text" placeholderData="'+ placeholderData+'">\
	</div>'
}

function setInputEventListener(){
	$('.form input').on("focus", function(e){
		updateFocus();
		$(this).parent().addClass("clicked");
		this.setAttribute("placeholder",this.getAttribute("placeholderData"))
	})

}


function submitForm(e){
	e.preventDefault();
	var data_ = getFormObj($(".form form"));
	console.log(data_);

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
	console.log(data_);
	for(var i of data_.phone_list){
		console.log(isNaN(parseInt(i)))
		if(isNaN(parseInt(i)) || i.length < 10){
			showMsg("Please enter valid phone numbers");
			return;
		}
	}
	
	var url = base_url;
	if(bitsMode)url+="register_team_bitsian/";
	else url+="register_team_non_bitsian/";
	var dataString = JSON.stringify(data_);
	console.log(dataString);
	$.ajax({
		url,
		method: "POST",
		data: dataString,
		success: function(data){
			console.log(data)
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
	// console.log(ele)
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
		obj = {
			...obj,
			...(getFormObj(el))
		}
	})
	return obj;
}