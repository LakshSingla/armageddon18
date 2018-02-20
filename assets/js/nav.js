function setGameMenuEventListeners(){
	$("#game-menu li").click(function(e){
		var id = this.getAttribute("data");
		var desc = formData[id].desc;
		var head = formData[id].name;

		$("#body h2").text(head);
		$("#body .content").text(desc);
		if(window.innerWidth < 768){
			$("#cross").click();
		}
	})
}

