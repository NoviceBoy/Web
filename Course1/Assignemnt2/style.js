var tracked = false
var info = $("#info").html()
$("button").click(function(){
	console.log("hello");
	tracked=true
	$(".image").attr( "src", "image01.jpg");
	$("#info").html( "<h1>Not so fast dude!!!<br><br></h1>");
	});
var restart = function() {
	if (tracked == true ){
		$(".image").attr( "src", "image02.jpg");
		$("#info").html(info);
		tracked = false;
	}
};
setInterval( restart, 2000);