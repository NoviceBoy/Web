//playground.js

maxim1 = new Maxim();
maxim2 = new Maxim();
maxim3 = new Maxim();
maxim4 = new Maxim();
maxim5 = new Maxim();
maxim6 = new Maxim();
maxim7 = new Maxim();
maxim8 = new Maxim();

player1 = maxim1.loadFile("drums1.wav");
player1.setLooping(true);
player2 = maxim2.loadFile("bassline.wav");
player2.setLooping(true);
player3 = maxim3.loadFile("arp.wav");
player3.setLooping(true);
player4 = maxim4.loadFile("bassdrum1.wav");
player4.setLooping(true);
player5 = maxim5.loadFile("hihat2.wav");
player5.setLooping(true);
player6 = maxim6.loadFile("cymbal1.wav");
player6.setLooping(true);
player7 = maxim7.loadFile("snaredrum1.wav");
player7.setLooping(true);
player8 = maxim8.loadFile("arp.wav");
player8.setLooping(true);

playDrums = function(){
	player1.play();
}

stopDrums = function(){
	player1.stop();
}

playBass = function(){
	player2.play();
}

stopBass = function(){
	player2.stop();
}

playArp = function(){
	player3.play();
}

stopArp = function(){
	player3.stop();
}

playBassdrum = function(){
	player4.play();
}

stopBassdrum = function(){
	player4.stop();
}

playHithat = function(){
	player5.play();
}

stopHithat = function(){
	player5.stop();
}

playCymbal = function(){
	player6.play();
}

stopCymbal = function(){
	player6.stop();
}

playSnare = function(){
	player7.play();
}

stopSnare = function(){
	player7.stop();
}

playBass2 = function(){
	player8.play();
}

stopBass2 = function(){
	player8.stop();
}

playAll = function() {
	player1.play();
	player2.play();
	player3.play();
	player4.play();
	player5.play();
	player6.play();
	player7.play();
	player8.play();
}

stopAll = function() {

	player1.stop();
	player2.stop();
	player3.stop();
	player4.stop();
	player5.stop();
	player6.stop();
	player7.stop();
	player8.stop();
}

setSpeed = function(number, speed) {
	var playerArray = [ player1, player2, player3, player4, 
						player5, player6, player7, player8 ];
	playerArray[number - 1].speed( speed );

}

setVolume = function(number, volume) {
	var playerArray = [ player1, player2, player3, player4, 
						player5, player6, player7, player8 ]
	console.log( playerArray[ number - 1].isPlaying() )
	if ( playerArray[ number - 1].isPlaying() ) {
		playerArray[number - 1 ].volume( volume );
	} else {
		playerArray[number - 1 ].volume(0);
	}
}


