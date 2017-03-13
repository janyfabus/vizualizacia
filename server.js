//impoertovanie dôležitých vecí
var express 	= require('express'),
	app 		= express(),
	http 		= require('http').Server(app),
	data 		= require("./js/prepare_data");

data.start();

//nastavíme mu verejný priečino JS kde budú javascripty
app.use("/js", express.static(__dirname + '/js'));


//ak ideš na / tak to vráti subor index.html
app.get('/', function(req, res) {
	res.sendFile('/index.html' , { root : __dirname});
});

//odošle vyrátané data
app.post('/getData', function(req, res) {
	res.send(data.getData());
});

//server bude počúvať na porte 3000(http://localhost:3000/)
http.listen(3000, function(){
	console.log('listening on *:3000');
});