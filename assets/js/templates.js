

var templates = {
	"about": '<header>\
			<h2>ABOUT</h2>\
			</header>\
			<p class="content">Gear Up the gamer inside you as Armageddon returns to BTIS PILANI\'S Apogee Tech fest.\
Having a legacy started in 2010 and development over the years, this year\'s iteration\
features Prizes worth Rs.50000/- up for grabs across the games : CS GO, DOTA 2, and FIFA 18.\
Assemble your team, and put yourself to the test against the competition. Register now!</p>'
	,"rules":'<header>RULES</header><a class="rules__" href="https://bits-apogee.org/2018main/events.html">view rules</a>'
	,"contactInfo": ''
	,"contact":{
		"valueOf" : function(){
			return '<header>CONTACT</header><div>' + templates["contactInfo"] + '</div>'
		}
	}
	,"head": '<article class="tab" id="head">\
			<div id="logo">\
				<img src="./assets/images/apogee.png">\
			</div>\
			<h1>\
			</h1>\
		</article>'
	,"body":{
		valueOf:()=>{return '<article class="tab" id="body">' + templates["about"]+ '</article>'}
	}
	,"menu": {
		valueOf: function(){
			if(window.innerWidth > 768){
				return	'<nav class="tab" id="menu">\
						<li class="link" data="home">home</li>\
						<li class="link" data="rules">rules</li>\
						<li class="link" data="contact">contact</li>\
					</nav>'
			}else{
				return	'<nav class="tab" id="menu">\
						<li class="link" data="game-menu">games</li>\
						<li class="link" data="rules">rules</li>\
						<li class="link" data="contact">contact</li>\
						<li class="link" data="bits">register: bitsians</li>\
						<li class="link" data="others">register: others</li>\
					</nav>'
			}
		}
	}
	,"game-menu": {
		valueOf: function(){
		 	return '<article class="tab" id="game-menu">\
				<header>\
				<h2>GAMES</h2>\
				</header>\
				<nav class="list">' + templates["gameList"]+ '</nav>\
			</article>'
		}
	}
	,"gameList":'' 
	,"register-tab": '<article class="tab" id="register-tab">\
			<header>\
				<h2>REGISTER</h2>\
			</header>\
			<ul class="list">\
				<li data="bits">FOR BITSIANS</li>\
				<li data="others">FOR OTHERS</li>\
			</ul>\
		</article>'
	,"canvas": '<article class="popup canvas hidden"></article>'
	,"form": '<article class="popup form hidden">\
			<header>Register</header>\
			<form>\
				<div class="field">\
						<label>Name Of Clan</label>\
						<input name="team_name" type="text" autofocus="false" autocomplete="off" placeholderData="">\
					</div>\
					<div class="field select clicked">\
						<label>Game</label>\
						<select name="game_id"></select>\
					</div>\
					<div class="group">\
					</div>\
					\
					<button id="submit">SUBMIT</button>\
				</form>\
				<div id="msg">eee</div>\
			</article>'
	,"formOptions":{
		valueOf: function(){
			var str = "";
			for( var i in formData ){
				str += '<option value="' + i + '">' + formData[i].name + '</option>';
			}
			return str;
		}
	}
	,"heading": '<header class="tab" id="heading"><h1>Armageddon</h1></header>'
	,"cross": '<div id="cross">X</div>'
	,"ham": '<div id="ham"><span></span> <span></span> <span></span></div>'

}