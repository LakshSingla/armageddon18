var base_url = "https://bits-apogee.org/2018/armageddon/";
window.onload = function(){

	var components;
	if(window.innerWidth > 768){
		components = {
			"left" : ["head", "body"],
			"right" : ["menu", "game-menu", "register-tab", "canvas", "form"]
		}
	}else{
		components = {
			"screen": {
				"top": ["head", "ham", "menu"],
				"main": ["heading","body"],
				"secondary": ["form", "canvas", "game-menu", "cross"]
			}
		}
	}
	makePage(components);
	init();

	hideLoader();
}

function hideLoader(){
	$(".loader").fadeOut();
}

function init(){
	initEventListeners();
	$("#menu").addClass('hidden-menu');
	$("#game-menu").addClass('hidden-menu');
	$("#cross").fadeOut();
	$("#msg").fadeOut();

	getGame();
	// updateGameMenu();
	// updateFormOptions();
}

function makePage(comp){
	var html = resolve(comp);
	$(".wrapper").html(html);
	
}

function makeSection(name, inner){
	return "<section class='"+ name +"'>" + inner + "</section>";
}

function resolve(a){
	if(typeof a == "string"){
		return templates[a].valueOf();
	}

	if(Array.isArray(a)){
		return a.map(e=> resolve(e)).join("");
	}

	if(typeof a == "object"){
		var k = "";
		for(var i in a){
			k += makeSection(i, resolve(a[i]));
		}
		return k;
	}
}


function getGame(){
	console.log("getGame")
	$.ajax({
		url: base_url + 'get_games',
		method: "GET",
		success: function(data){
			console.log(data);	
			templates["gameList"] = "";
			data.games.forEach(e=>{
				formData[e.id] = {
					"name": e.name,
					"no_of_participants": e.no_of_participants,
					"desc": (e.description?e.description:"")
				}
				templates["gameList"] += "<li class='list' data='"+ e.id +"'>" + e.name + "</li>"
			})
			console.log(formData)
			updateGameMenu();
			updateFormOptions();

		}
	})
}



function createContactCard(name, imgSrc, email, desig){
	var html = "<div class='contact-card'>\
					<div class='image'><img src='" + imgSrc + "'></img></div>\
					<div class='details'>\
						<div class='name'> " + name + "</div>\
						<div class='desig'>" + desig +"</div>\
						<div class='email'>" + email +"</div>\
					</div>\
				</div>"
	return html;
}


addContact(createContactCard("eee", "./assets/images/unknown.jpg", "sdj@bfs.com", "asdfghjk"));
addContact(createContactCard("eee", "./assets/images/unknown.jpg", "sdj@bfs.com", "asdfghjk"));
addContact(createContactCard("eee", "./assets/images/unknown.jpg", "sdj@bfs.com", "asdfghjk"));

function addContact(html){
	templates["contactInfo"] += html;
}


function updateGameMenu(){
	console.log(templates['gameList'])
	$('#game-menu nav').html(templates['gameList']);
	setGameMenuEventListeners();
}

function updateFormOptions(){
	// console.log("eee", formData)
	$('.form select').html(templates['formOptions'].valueOf());
}
