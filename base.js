const express = require('express');
const serialport = require('serialport');
const fs = require('fs');
const vm = require('vm');
var http = require('http');
var myData = 0;
const app = express();
const Readline = serialport.parsers.Readline;
const parser = new Readline();
var mySerialPort = new serialport("/dev/ttyACM0", {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
});
var datEvents;
mySerialPort.pipe(parser);
parser.on('data', function(input) {
         myData = JSON.parse(input);
	this.datEvents= new eventLoad(myData.id,myData.mesure);
});
app.get('/', function (req, res) {
	fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});
app.use(express.static('assets'));
const eventLoad = function(id,data){
high=0;
low=0;
switch (id){
 case "1":
		high=150;
		if(data>=high){
			console.log("il pleut, on ferme la veranda?");
			io.emit('message', 'close_door');
		}
		break;
 case "2": 
		high=80;
		if(data>=high){
			console.log("L'humidité est importante "+data+"doit on aerer ? ");
			io.emit('message', 'open_door');
		}
		break;

 case "3": 	
		high=24;
		low=18;
		if(data>=high){
			console.log("il fait "+data+", doit on activer l'air froid? F");
			io.emit('message', 'clim_on');
	 	} else if (data<=low) {
			 console.log("il fait "+data+", doit on activer l'air chaud? C");
			 io.emit('message', 'clim_chaud_on');
		} else{
			console.log("il fait "+data+", on eteint la climatisation!");
			io.emit('message', 'clim_off');
		}
		break;
 case "4":  	
		high=100;
		low=90;
		if(data<=low){
			console.log("il fait nuit "+data+" doit on allumer les lampes led basse energie (Up)? U");
			io.emit('message', 'light_on');
		}else if (data>=high) {
			console.log("il fait jour "+data+" doit on eteindre les lampes (Down)? D");
			io.emit('message', 'light_off');
		}
		break;
	};
};
var server = http.createServer(app).listen(3004);
var io = require('socket.io').listen(server);
io.on('connection', function (socket) {
    console.log('Un client est connecté !');
socket.on('disconnect', function () {
	console.log('A user disconnected');
   	});
socket.on('join',function(data){
	console.log(data);
	});				
});
