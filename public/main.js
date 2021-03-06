$(document).ready(function() {

	console.log("document ready");
	writeStreams();


	$(".content").on("submit", ".form-signin", function(event) {
		event.preventDefault();
		console.log("submit");

		var username = $(".content").find("input#inputUser").val();
		var password = $(".content").find("input#inputPassword").val();

		console.log(username);
		console.log(password);

		var data = JSON.stringify({"user":username, "password":password});

		console.log(data);

		
		$.ajax({
			'type': "POST",
			'contentType': 'application/json',
			'url': "/login",
			'data': data,
			statusCode: {
				401: function() {
					$(".feedback").empty();
					$(".feedback").append("<h4>Wrong Credentials</h4>");
					$(".content").find("input#inputPassword").val('');
					$(".content").find("input#inputUser").val('');
				},
				200: function(data) {
					console.log("POST /login RES TOKEN: " + data);
					sessionStorage.token = data;
					writeStreams();
				}
			}
			/*
			success: function(data) {
				console.log("POST /login RES TOKEN: " + data);
				sessionStorage.token = data;
				writeStreams();
			}
			*/
		})
		
	})
	

	//Play Button on Streams Table
	$(".content").on("click", ".play", function(event) {
		console.log("play click");
		var streamID = $(this).attr('id');
		//console.log(streamID);

		if(streamID.length){
			console.log("streamid: " + streamID);
			var reqUrl = "/streams/" + streamID;
			//console.log("req url: " + reqUrl); 
			
			var data = JSON.stringify({"token":sessionStorage.token});
			console.log("play click token: " + data);

			$.ajax({
				'type': "POST",
				'contentType': 'application/json',
				'url': reqUrl,
				'data': data,
				success: function() {
					writeStreams();
				}
			})
		}
	})

	function writeStreams() {
		console.log("writeStreams");

		var data = JSON.stringify({"token":sessionStorage.token});
		console.log(data);

		$.ajax({
			'type': "POST",
			'contentType': 'application/json',
			'url': "/streams",
			'data': data,
			success: function(res) {
				//console.log(res);
				$(".feedback").empty();
				$(".content").empty();
				$(".content").append(res);
			}
		})
	}//End writeStreams


})//END Ready