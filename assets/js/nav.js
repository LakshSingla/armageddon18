function setGameMenuEventListeners(){
	$("#game-menu li").click(function(e){
		console.log("click")
		var id = this.getAttribute("data");
		console.log(id)
		var desc = formData[id].desc;
		var head = formData[id].name;

		$("#body h2").text(head);
		$("#body .content").text(desc);
	})
}

